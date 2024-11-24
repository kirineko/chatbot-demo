/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 防止 webpack 打包 punycode
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: false,
    };
    return config;
  },
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  },
};

module.exports = nextConfig;
