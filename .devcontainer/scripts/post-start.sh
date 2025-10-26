#!/bin/bash
set -e

echo "🔄 Post-start tasks..."

if [ -f node_modules/.bin/prisma ]; then
    echo "📊 Checking database connection..."
    npx prisma db push --skip-generate || echo "⚠️  Database check failed"
fi

echo "✅ Container ready for development!"
