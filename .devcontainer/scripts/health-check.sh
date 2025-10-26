#!/bin/bash

echo "🔍 Skill Swap - Health Check"
echo "================================"
echo ""

check_service() {
    local service=$1
    local command=$2
    echo -n "Checking $service... "
    if eval "$command" &> /dev/null; then
        echo "✅ OK"
        return 0
    else
        echo "❌ FAILED"
        return 1
    fi
}

echo "📦 Node.js Environment"
check_service "Node.js" "node --version"
check_service "npm" "npm --version"
check_service "pnpm" "pnpm --version"
echo ""

echo "🗄️ Database"
check_service "PostgreSQL Connection" "pg_isready -h db -U postgres"
check_service "Database Exists" "psql -h db -U postgres -lqt | cut -d \| -f 1 | grep -qw skillswap"
echo ""

echo "📚 Prisma"
check_service "Prisma Client" "test -d node_modules/@prisma/client"
check_service "Prisma CLI" "which prisma"
echo ""

echo "🔧 Project Dependencies"
check_service "node_modules" "test -d node_modules"
check_service "Next.js" "test -d node_modules/next"
echo ""

echo "📁 Build Artifacts"
if [ -d .next ]; then
    echo "Next.js build directory: ✅ Exists"
else
    echo "Next.js build directory: ⚠️  Not built yet"
fi
echo ""

echo "🌐 Environment Variables"
if [ -f .env ]; then
    echo ".env file: ✅ Exists"
    if grep -q "DATABASE_URL" .env; then
        echo "DATABASE_URL: ✅ Set"
    else
        echo "DATABASE_URL: ❌ Missing"
    fi
else
    echo ".env file: ❌ Missing"
fi
echo ""

echo "================================"
echo "Health check complete!"
