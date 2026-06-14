# CellCycle 3D — developer convenience targets
# Usage: make <target>

COMPOSE ?= docker compose

.DEFAULT_GOAL := help

.PHONY: help up down build rebuild logs ps restart dev dev-down clean install local-dev local-build preview

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

## ---------- Docker (production-like nginx build) ----------
build: ## Build the production image
	$(COMPOSE) build

up: ## Start the app in detached mode (http://localhost:8080)
	$(COMPOSE) up -d app
	@echo "App available at http://localhost:$${APP_PORT:-8080}"

down: ## Stop and remove containers
	$(COMPOSE) down

rebuild: ## Rebuild image without cache and start detached
	$(COMPOSE) build --no-cache app
	$(COMPOSE) up -d app

restart: ## Restart the app container
	$(COMPOSE) restart app

logs: ## Follow app logs
	$(COMPOSE) logs -f app

ps: ## List running containers
	$(COMPOSE) ps

## ---------- Docker (hot-reload dev server) ----------
dev: ## Start the Vite dev server in a container (http://localhost:5173)
	$(COMPOSE) --profile dev up -d dev
	@echo "Dev server starting on http://localhost:5173 (run 'make logs-dev' to follow)"

logs-dev: ## Follow dev server logs
	$(COMPOSE) --profile dev logs -f dev

dev-down: ## Stop the dev server
	$(COMPOSE) --profile dev down

## ---------- Local (no Docker) ----------
install: ## Install dependencies locally
	npm install

local-dev: ## Run the Vite dev server on the host
	npm run dev

local-build: ## Build the static site locally into ./dist
	npm run build

preview: ## Preview the local production build
	npm run preview

## ---------- Housekeeping ----------
clean: ## Remove build artifacts, containers and the image
	$(COMPOSE) down --rmi local --remove-orphans || true
	rm -rf dist node_modules
