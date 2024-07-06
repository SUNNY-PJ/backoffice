// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/:path*/",
//         destination: `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/:path*/`,
//       },
//     ];
//   },
//   trailingSlash: true,
// };

// export default nextConfig;

// const nextConfig = {
//   trailingSlash: false,
//   async rewrites() {
//     return [
//       {
//         source: "/auth/kakao/callback",
//         destination: `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/auth/kakao/callback`,
//       },
//     ];
//   },
//   trailingSlash: true,
// };
// export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  // experimental: {
  //   nextScriptWorkers: true,
  // },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
