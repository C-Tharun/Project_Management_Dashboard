output "postgres_endpoint" {
  description = "PostgreSQL connection endpoint"
  value       = "postgresql://${var.postgres_user}:${var.postgres_password}@localhost:5433/${var.postgres_db}"
}

output "node_app_endpoint" {
  description = "Node.js application endpoint"
  value       = "http://localhost:8001"
}

output "prometheus_endpoint" {
  description = "Prometheus endpoint"
  value       = "http://localhost:9091"
}

output "grafana_endpoint" {
  description = "Grafana endpoint"
  value       = "http://localhost:3002"
}

output "grafana_credentials" {
  description = "Grafana admin credentials"
  value = {
    username = var.grafana_admin_user
    password = var.grafana_admin_password
  }
  sensitive = true
} 