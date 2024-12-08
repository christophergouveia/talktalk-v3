import MillionLint from "@million/lint";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");

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
})(withNextIntl(nextConfig));
