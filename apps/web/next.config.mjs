/** @type {import('next').NextConfig} */

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isDev = process.env.NODE_ENV === 'development';
const destination = isDev ? 'https://dev-api.moring.one' : 'https://api.moring.one';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true,
      },
    ];
  },
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.moring.one',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'file.moring.one',
        pathname: '/uploaded/**',
      },
      {
        protocol: 'https',
        hostname: 'file.moring.one',
        pathname: '/defaults/**',
      },
    ],
  },
};

export default nextConfig;
