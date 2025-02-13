import MillionLint from "@million/lint";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
  },

};

export default MillionLint.next({
  enabled: true,
  rsc: true
})(nextConfig);
