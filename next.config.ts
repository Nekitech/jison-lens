import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Отключить ошибки ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript
  },
};

export default nextConfig;
