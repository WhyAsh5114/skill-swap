/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
