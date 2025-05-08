variable "postgres_user" {
  description = "PostgreSQL username"
  type        = string
  default     = "postgres"
}

variable "postgres_password" {
  description = "PostgreSQL password"
  type        = string
  default     = "postgres"
}

variable "postgres_db" {
  description = "PostgreSQL database name"
  type        = string
  default     = "projectmanagement"
}

variable "node_env" {
  description = "Node.js environment"
  type        = string
  default     = "production"
}

variable "grafana_admin_user" {
  description = "Grafana admin username"
  type        = string
  default     = "admin"
}

variable "grafana_admin_password" {
  description = "Grafana admin password"
  type        = string
  default     = "admin"
} 