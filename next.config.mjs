/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "vxbajvrcpirqiywsgoka.supabase.co",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
