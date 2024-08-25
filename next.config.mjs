/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "192.168.1.19",
        port: "",
        pathname: "/storage/images/**", 
      },
    ],
  },
};

export default nextConfig;
