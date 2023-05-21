const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose", "bcrypt", "jsonwebtoken"],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
