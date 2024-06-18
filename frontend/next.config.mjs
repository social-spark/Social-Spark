/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com'],
    },
    async rewrites() {
        return [
            {
                source:'/apis/:path*',
                destination: `${process.env.REST_API_URL}/apis/:path*`
            }
        ]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },


};

export default nextConfig;