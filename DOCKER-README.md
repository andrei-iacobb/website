# 🐳 Docker SSR Portfolio Deployment

This guide explains how to deploy your blazing-fast server-side rendered portfolio using Docker.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- 2GB+ available RAM
- Basic familiarity with command line

### One-Command Deployment

```bash
# Development (port 3001)
./deploy-docker.sh dev

# Production (port 80)
./deploy-docker.sh deploy
```

## 📋 Available Commands

| Command | Description | Port |
|---------|-------------|------|
| `./deploy-docker.sh dev` | Development environment | 3001 |
| `./deploy-docker.sh deploy` | Production deployment | 80 |
| `./deploy-docker.sh build` | Build Docker images only | - |
| `./deploy-docker.sh stop` | Stop all services | - |
| `./deploy-docker.sh logs [env]` | View logs (dev/prod) | - |
| `./deploy-docker.sh health` | Health check | - |
| `./deploy-docker.sh clean` | Clean Docker resources | - |
| `./deploy-docker.sh ssl` | Setup SSL certificates | - |

## 🏗️ Architecture

### Production Stack
- **Next.js App**: SSR application with standalone output
- **Nginx**: Reverse proxy with caching and compression
- **Health Checks**: Automated monitoring
- **Security**: Non-root containers, read-only filesystems

### Multi-Stage Docker Build
1. **Dependencies**: Install packages with pnpm
2. **Builder**: Compile Next.js application
3. **Runner**: Lightweight production image (Node.js Alpine)

## ⚡ Performance Optimizations

### SSR Optimizations
- ✅ **Server-Side Rendering** - Instant page loads
- ✅ **Static Generation** - Pre-rendered content
- ✅ **Image Optimization** - WebP/AVIF formats
- ✅ **Standalone Output** - Minimal runtime dependencies

### Docker Optimizations
- ✅ **Multi-stage builds** - Smaller final images
- ✅ **Layer caching** - Faster rebuilds
- ✅ **pnpm** - Efficient package management
- ✅ **Non-root user** - Enhanced security

### Nginx Optimizations
- ✅ **Aggressive caching** - Static assets cached for 1 year
- ✅ **Gzip compression** - Reduced bandwidth usage
- ✅ **Rate limiting** - DoS protection
- ✅ **Security headers** - XSS/CSRF protection

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Resource Limits
- **App Container**: 1GB RAM, 1 CPU (limit)
- **Nginx Container**: 256MB RAM, 0.5 CPU (limit)
- **Security**: Read-only containers, no new privileges

## 📊 Monitoring

### Health Checks
- **Application**: `http://localhost/health`
- **Nginx**: Built-in health monitoring
- **Auto-restart**: Unhealthy containers restart automatically

### Example Health Response
```json
{
  "status": "healthy",
  "timestamp": "2025-01-09T13:00:00.000Z",
  "uptime": "3600 seconds",
  "environment": "production",
  "version": "0.1.0"
}
```

## 🔐 Security Features

- **Non-root containers** - Runs as user `nextjs`
- **Read-only filesystems** - Prevents tampering
- **Security headers** - HSTS, CSP, XSS protection
- **Rate limiting** - API and static resource protection
- **Minimal attack surface** - Alpine Linux base

## 🌐 SSL/HTTPS Setup

1. Update domain in `docker-compose.prod.yml`:
```yaml
command: certonly --webroot -w /var/www/certbot --force-renewal --email your@email.com -d yourdomain.com --agree-tos
```

2. Run SSL setup:
```bash
./deploy-docker.sh ssl
```

## 🛠️ Development

### Hot Reloading
Development mode includes hot reloading:
```bash
./deploy-docker.sh dev
# Visit http://localhost:3001
```

### Debug Logs
```bash
# Production logs
./deploy-docker.sh logs

# Development logs
./deploy-docker.sh logs dev

# Follow specific service
docker-compose -f docker-compose.prod.yml logs -f portfolio
```

## 🧹 Maintenance

### Update Deployment
```bash
# Pull latest code
git pull

# Rebuild and deploy
./deploy-docker.sh deploy
```

### Clean Up Resources
```bash
# Remove old images and containers
./deploy-docker.sh clean

# Full system cleanup
docker system prune -af --volumes
```

## 📈 Performance Metrics

Expected performance with this setup:
- **First Load**: ~125KB compressed
- **Time to Interactive**: <2 seconds
- **Lighthouse Score**: 95+ (Performance)
- **Docker Image Size**: ~150MB (production)

## 🔍 Troubleshooting

### Common Issues

**Port already in use**
```bash
./deploy-docker.sh stop
./deploy-docker.sh deploy
```

**Build fails**
```bash
./deploy-docker.sh clean
./deploy-docker.sh build
```

**Health check fails**
```bash
./deploy-docker.sh logs
curl http://localhost/health
```

### Log Analysis
```bash
# Check application logs
docker-compose -f docker-compose.prod.yml logs portfolio

# Check nginx logs
docker-compose -f docker-compose.prod.yml logs nginx

# Check all services
docker-compose -f docker-compose.prod.yml logs
```

## 🚀 Deployment to Production

1. **Prepare server** with Docker and Docker Compose
2. **Clone repository** to production server
3. **Update configuration** (domains, emails, etc.)
4. **Deploy**: `./deploy-docker.sh deploy`
5. **Setup SSL**: `./deploy-docker.sh ssl`
6. **Monitor**: `./deploy-docker.sh health`

Your SSR portfolio is now ready for production with enterprise-grade performance and security! 🎉 