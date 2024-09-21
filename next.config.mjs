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

// /** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
