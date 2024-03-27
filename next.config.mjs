/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://locahost:3000/api*',
          },
        ]
      },
};

export default nextConfig;
