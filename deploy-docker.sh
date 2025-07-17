#!/bin/bash

# Docker deployment script for SSR Next.js Portfolio
# Usage: ./deploy-docker.sh [command] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project configuration
PROJECT_NAME="andrei-portfolio"
COMPOSE_FILE_DEV="docker-compose.yml"
COMPOSE_FILE_PROD="docker-compose.prod.yml"

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker and Docker Compose are installed
check_dependencies() {
    log_info "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    log_success "Dependencies check passed"
}

# Build the application
build() {
    log_info "Building the portfolio application..."
    
    # Clean previous builds
    log_info "Cleaning previous builds..."
    docker-compose -f $COMPOSE_FILE_PROD down --volumes --remove-orphans 2>/dev/null || true
    docker system prune -f
    
    # Build the application
    log_info "Building Docker images..."
    docker-compose -f $COMPOSE_FILE_PROD build --no-cache
    
    log_success "Build completed successfully"
}

# Start development environment
dev() {
    log_info "Starting development environment..."
    
    docker-compose -f $COMPOSE_FILE_DEV down 2>/dev/null || true
    docker-compose -f $COMPOSE_FILE_DEV up --build -d
    
    log_success "Development environment started"
    log_info "Portfolio available at: http://localhost:3001"
    log_info "Use 'docker-compose logs -f' to view logs"
}

# Deploy to production
deploy() {
    log_info "Deploying to production..."
    
    # Stop existing containers
    log_info "Stopping existing containers..."
    docker-compose -f $COMPOSE_FILE_PROD down
    
    # Build and start
    log_info "Starting production environment..."
    docker-compose -f $COMPOSE_FILE_PROD up --build -d
    
    # Wait for health checks
    log_info "Waiting for services to be healthy..."
    sleep 30
    
    # Check if services are running
    if docker-compose -f $COMPOSE_FILE_PROD ps | grep -q "healthy\|Up"; then
        log_success "Deployment successful!"
        log_info "Portfolio available at: http://localhost"
        log_info "Health check: http://localhost/health"
    else
        log_error "Deployment failed. Check logs with: docker-compose -f $COMPOSE_FILE_PROD logs"
        exit 1
    fi
}

# Stop all services
stop() {
    log_info "Stopping all services..."
    
    docker-compose -f $COMPOSE_FILE_DEV down 2>/dev/null || true
    docker-compose -f $COMPOSE_FILE_PROD down 2>/dev/null || true
    
    log_success "All services stopped"
}

# Show logs
logs() {
    local env=${1:-prod}
    
    if [ "$env" = "dev" ]; then
        docker-compose -f $COMPOSE_FILE_DEV logs -f
    else
        docker-compose -f $COMPOSE_FILE_PROD logs -f
    fi
}

# Health check
health() {
    log_info "Performing health check..."
    
    # Check if containers are running
    if docker-compose -f $COMPOSE_FILE_PROD ps | grep -q "Up"; then
        log_info "Containers are running"
        
        # Check application health endpoint
        if curl -f http://localhost/health > /dev/null 2>&1; then
            log_success "Application is healthy"
            curl -s http://localhost/health | jq . 2>/dev/null || curl -s http://localhost/health
        else
            log_warning "Application health check failed"
        fi
    else
        log_error "Containers are not running"
        exit 1
    fi
}

# Clean up Docker resources
clean() {
    log_info "Cleaning up Docker resources..."
    
    # Stop all containers
    stop
    
    # Remove unused images, networks, and volumes
    docker system prune -af
    docker volume prune -f
    
    log_success "Cleanup completed"
}

# Setup SSL certificates (requires domain configuration)
ssl() {
    log_info "Setting up SSL certificates..."
    log_warning "Make sure to update the domain in docker-compose.prod.yml first"
    
    docker-compose -f $COMPOSE_FILE_PROD --profile ssl run --rm certbot
    
    log_success "SSL setup completed"
}

# Show usage
usage() {
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  build       Build the application Docker images"
    echo "  dev         Start development environment (port 3001)"
    echo "  deploy      Deploy to production (port 80)"
    echo "  stop        Stop all services"
    echo "  logs [env]  Show logs (env: dev|prod, default: prod)"
    echo "  health      Check application health"
    echo "  clean       Clean up Docker resources"
    echo "  ssl         Setup SSL certificates (requires domain config)"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 dev                # Start development"
    echo "  $0 deploy             # Deploy to production"
    echo "  $0 logs dev           # Show development logs"
    echo "  $0 health             # Check health"
}

# Main script logic
main() {
    check_dependencies
    
    case "${1:-help}" in
        build)
            build
            ;;
        dev)
            dev
            ;;
        deploy)
            deploy
            ;;
        stop)
            stop
            ;;
        logs)
            logs $2
            ;;
        health)
            health
            ;;
        clean)
            clean
            ;;
        ssl)
            ssl
            ;;
        help|--help|-h)
            usage
            ;;
        *)
            log_error "Unknown command: $1"
            usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 