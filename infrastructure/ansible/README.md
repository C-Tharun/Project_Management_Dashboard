# Project Management System - Ansible Configuration

This directory contains Ansible playbooks and roles for deploying and configuring the Project Management System.

## Directory Structure

```
infrastructure/ansible/
├── inventory.ini          # Inventory file defining hosts and groups
├── site.yml              # Main playbook
├── roles/
│   ├── common/           # Common system configuration
│   ├── docker/           # Docker installation and configuration
│   ├── monitoring/       # Prometheus and Grafana setup
│   └── applications/     # Node.js, PostgreSQL, and Nginx setup
├── nginx/                # Nginx configuration files
├── prometheus/           # Prometheus configuration files
└── grafana/              # Grafana configuration files
```

## Prerequisites

- Ansible 2.9 or later
- Python 3.6 or later
- SSH access to target hosts
- Sudo privileges on target hosts

## Usage

1. Install Ansible:
   ```bash
   pip install ansible
   ```

2. Review and modify the inventory file (`inventory.ini`) to match your environment.

3. Run the playbook:
   ```bash
   ansible-playbook -i inventory.ini site.yml
   ```

## Configuration

### Inventory

The `inventory.ini` file defines the following groups:
- `servers`: All servers in the infrastructure
- `monitoring`: Servers running monitoring components
- `applications`: Servers running application components

### Roles

- `common`: Basic system configuration (packages, timezone, limits)
- `docker`: Docker installation and configuration
- `monitoring`: Prometheus and Grafana setup
- `applications`: Node.js, PostgreSQL, and Nginx setup

### Services

The playbook configures the following services:
- Nginx (port 80)
- Node.js application (port 8000)
- PostgreSQL (port 5432)
- Prometheus (port 9090)
- Grafana (port 3001)

## Monitoring

After deployment, you can access:
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

## Troubleshooting

1. Check Ansible logs for errors:
   ```bash
   ansible-playbook -i inventory.ini site.yml -vvv
   ```

2. Verify service status:
   ```bash
   systemctl status nginx
   systemctl status postgresql
   ```

3. Check application logs:
   ```bash
   journalctl -u nginx
   journalctl -u postgresql
   ``` 