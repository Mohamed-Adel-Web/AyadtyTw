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
      {
        protocol: "https",
        hostname: "ayadty.com",
        port: "",
        pathname: "/logo.png",
      },
    ],
  },
};

export default nextConfig;
