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
  enabled: false,
  rsc: true
})(nextConfig);
