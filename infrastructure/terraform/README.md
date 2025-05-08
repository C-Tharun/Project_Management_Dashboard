# Project Management System - Terraform Configuration

This directory contains Terraform configuration files for deploying the Project Management System infrastructure.

## Infrastructure Components

The Terraform configuration provisions the following components:
- PostgreSQL database
- Node.js application
- Prometheus monitoring
- Grafana dashboard
- Docker network and volumes

## Prerequisites

- Terraform 1.0.0 or later
- Docker installed and running
- Docker Compose (optional)

## Directory Structure

```
infrastructure/terraform/
├── main.tf              # Main Terraform configuration
├── variables.tf         # Variable definitions
├── outputs.tf           # Output definitions
├── prometheus/          # Prometheus configuration
│   └── prometheus.yml   # Prometheus configuration file
└── README.md           # Documentation
```

## Usage

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Review the planned changes:
   ```bash
   terraform plan
   ```

3. Apply the configuration:
   ```bash
   terraform apply
   ```

4. To destroy the infrastructure:
   ```bash
   terraform destroy
   ```

## Accessing Services

After successful deployment, you can access:
- Node.js Application: http://localhost:8000
- PostgreSQL Database: localhost:5432
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## Credentials

Default credentials:
- PostgreSQL:
  - Username: postgres
  - Password: postgres
  - Database: projectmanagement
- Grafana:
  - Username: admin
  - Password: admin

## Monitoring

The infrastructure includes:
- Prometheus for metrics collection
- Grafana for visualization
- Node.js application metrics endpoint

## Security Notes

- Default credentials should be changed in production
- Consider using environment variables or a secrets manager for sensitive data
- Enable authentication for Grafana in production 