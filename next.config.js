const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
        pathname: "**",
      }
      // NextJS <Image> component needs to whitelist domains for src={}
      // "lh3.googleusercontent.com",
      // "pbs.twimg.com",
      // "images.unsplash.com",
      // "logos-world.net",
    ],
  },
};

module.exports = nextConfig;
