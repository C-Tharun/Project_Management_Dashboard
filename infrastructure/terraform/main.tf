terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  host = "npipe:////.//pipe//docker_engine"
}

# Create a Docker network
resource "docker_network" "project_network" {
  name   = "project_network"
  driver = "bridge"
}

# Create volumes for persistent data
resource "docker_volume" "grafana_data" {
  name = "grafana_data"
}

resource "docker_volume" "prometheus_data" {
  name = "prometheus_data"
}

resource "docker_volume" "postgres_data" {
  name = "postgres_data"
}

# Create and configure the PostgreSQL container
resource "docker_container" "postgres" {
  name  = "postgres"
  image = "postgres:15"
  restart = "always"
  
  env = [
    "POSTGRES_USER=postgres",
    "POSTGRES_PASSWORD=postgres",
    "POSTGRES_DB=projectmanagement"
  ]
  
  ports {
    internal = 5432
    external = 5433
  }
  
  volumes {
    volume_name = docker_volume.postgres_data.name
    container_path = "/var/lib/postgresql/data"
  }
  
  networks_advanced {
    name = docker_network.project_network.name
  }
}

# Create and configure the Node.js application container
resource "docker_container" "node_app" {
  name  = "node_app"
  image = "node:18"
  restart = "always"
  
  env = [
    "NODE_ENV=production",
    "DATABASE_URL=postgresql://postgres:postgres@postgres:5432/projectmanagement"
  ]
  
  ports {
    internal = 8000
    external = 8001
  }
  
  networks_advanced {
    name = docker_network.project_network.name
  }
  
  depends_on = [docker_container.postgres]
}

# Create and configure the Prometheus container
resource "docker_container" "prometheus" {
  name  = "prometheus"
  image = "prom/prometheus:latest"
  restart = "always"
  
  ports {
    internal = 9090
    external = 9091
  }
  
  volumes {
    host_path      = "${abspath(path.module)}/prometheus/prometheus.yml"
    container_path = "/etc/prometheus/prometheus.yml"
  }
  
  volumes {
    volume_name = docker_volume.prometheus_data.name
    container_path = "/prometheus"
  }
  
  networks_advanced {
    name = docker_network.project_network.name
  }
}

# Create and configure the Grafana container
resource "docker_container" "grafana" {
  name  = "grafana"
  image = "grafana/grafana:latest"
  restart = "always"
  
  ports {
    internal = 3000
    external = 3002
  }
  
  volumes {
    volume_name = docker_volume.grafana_data.name
    container_path = "/var/lib/grafana"
  }
  
  env = [
    "GF_SECURITY_ADMIN_USER=admin",
    "GF_SECURITY_ADMIN_PASSWORD=admin",
    "GF_AUTH_ANONYMOUS_ENABLED=true",
    "GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer"
  ]
  
  networks_advanced {
    name = docker_network.project_network.name
  }
  
  depends_on = [docker_container.prometheus]
} 