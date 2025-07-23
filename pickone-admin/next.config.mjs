/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all domains
            },
            {
                protocol: 'http',
                hostname: '**', // Allow all domains for http
            },
        ],
    },
    // Configure for port 3001
    experimental: {
        serverComponentsExternalPackages: [],
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/:path*',
            },
        ];
    },
    // reactStrictMode: false,
};

export default nextConfig;
