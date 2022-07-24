/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  i18n: {
    locales: ["sk", "en"],
    defaultLocale: "sk",
  },
};

module.exports = nextConfig;
