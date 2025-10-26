#!/bin/bash
set -e

echo "🚀 Running post-create setup..."

if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env <<EOL
DATABASE_URL=postgresql://postgres:postgres@db:5432/skillswap?schema=public
NODE_ENV=development
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
EOL
    echo "✅ .env file created"
else
    echo "⚠️  .env file already exists, skipping..."
fi

echo "📦 Installing dependencies..."
npm install

echo "🗄️  Setting up database..."
npx prisma migrate deploy || echo "⚠️  Migration failed, you may need to run migrations manually"

echo "🔄 Generating Prisma Client..."
npx prisma generate

echo "✅ Post-create setup complete!"
echo "📝 Run 'npm run dev' to start the development server"
