/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/lib'],
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/s/:slug*',
        destination: '/api/script/:slug*',
      },
    ];
  },
};
