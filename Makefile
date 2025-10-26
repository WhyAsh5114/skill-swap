.PHONY: help dev build start lint clean reset-db migrate studio install

help:
	@echo "Skill Swap - Development Commands"
	@echo ""
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build production bundle"
	@echo "  make start        - Start production server"
	@echo "  make lint         - Run ESLint"
	@echo "  make install      - Install dependencies"
	@echo "  make migrate      - Run database migrations"
	@echo "  make studio       - Open Prisma Studio"
	@echo "  make reset-db     - Reset database"
	@echo "  make clean        - Clean build artifacts"
	@echo ""

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

install:
	npm install

migrate:
	npx prisma migrate dev

studio:
	npx prisma studio

reset-db:
	npx prisma migrate reset

clean:
	rm -rf .next node_modules .turbo
	npm install
