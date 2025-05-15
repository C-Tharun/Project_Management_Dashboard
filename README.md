# Project Management Dashboard

A modern, full-stack Project Management Dashboard for teams, built with Next.js, Node.js, PostgreSQL, and a robust DevOps toolchain. This application enables efficient project and task management, real-time collaboration, and insightful analytics.

---

## Features

- **Project & Task Management**: Create, update, and track projects and tasks with deadlines, priorities, and statuses.
- **Multiple Views**: Board, List, Table, and Timeline views for tasks.
- **User & Team Management**: Assign roles, manage teams, and control access.
- **Authentication**: Secure login and registration via AWS Cognito.
- **Responsive UI**: Built with Tailwind CSS and Material UI Data Grid.
- **Dark Mode**: Seamless light/dark theme switching.
- **Search**: Global search for tasks, projects, and users.
- **Monitoring**: Integrated Prometheus and Grafana dashboards.
- **Error Tracking**: Sentry integration for error monitoring.
- **DevOps Ready**: Dockerized, with CI/CD, IaC, and cloud deployment.

---

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) (React)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material UI Data Grid](https://mui.com/x/react-data-grid/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PgAdmin](https://www.pgadmin.org/)

### DevOps & Infrastructure

- [Docker](https://www.docker.com/) & Docker Compose
- [Terraform](https://www.terraform.io/) (IaC)
- [Ansible](https://www.ansible.com/) (Provisioning)
- [AWS Lambda](https://aws.amazon.com/lambda/) (Serverless)
- [AWS Cognito](https://aws.amazon.com/cognito/) (Authentication)
- [Prometheus](https://prometheus.io/) & [Grafana](https://grafana.com/) (Monitoring)
- [Sentry](https://sentry.io/) (Error Tracking)
- [GitHub Actions](https://github.com/features/actions) (CI/CD)
- [Vercel](https://vercel.com/) (Frontend Hosting)

---

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL
- Terraform & Ansible (for infrastructure)
- AWS account (for cloud deployment)

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/project-management-dashboard.git
   cd project-management-dashboard
   ```

2. **Start services with Docker Compose:**
   ```sh
   docker-compose up --build
   ```

3. **Frontend:**
   ```sh
   cd client
   npm install
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Backend:**
   ```sh
   cd server
   npm install
   npm run dev
   # API at http://localhost:8000
   ```

5. **Database:**
   - Configure `.env` in `server/` (see [server/.env](server/.env))
   - Access PgAdmin or connect via `psql`.

---

## Infrastructure & Deployment

### Infrastructure as Code

- **Terraform**: Provision PostgreSQL, Node.js app, Prometheus, Grafana, Docker networks/volumes.
  ```sh
  cd infrastructure/terraform
  terraform init
  terraform apply
  ```

- **Ansible**: Configure servers, install Docker, deploy monitoring stack.
  ```sh
  cd infrastructure/ansible
  ansible-playbook -i inventory.ini site.yml
  ```

### CI/CD

- **GitHub Actions**: Automated workflows for linting, testing, building, and deploying both frontend and backend.
- **Vercel**: Deploys the Next.js frontend automatically on push.

### AWS Integration

- **AWS Lambda**: Serverless backend functions.
- **AWS Cognito**: User authentication and management.

---

## Monitoring & Observability

- **Prometheus**: Metrics collection.
- **Grafana**: Metrics visualization (http://localhost:3001, default admin/admin).
- **Sentry**: Error tracking for both frontend and backend.

---

## Environment Variables

See [client/.env.local](client/.env.local) and [server/.env](server/.env) for configuration.

Example for `server/.env`:
```env
PORT=8000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/projectmanagement?schema=public"
```

---


## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---


## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Material UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AWS](https://aws.amazon.com/)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)
