/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "a0.muscache.com",
      },
      {
        hostname: "gzlrmpyzprvpprhztioi.supabase.co",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
