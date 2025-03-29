/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    'rc-input',
    'rc-table',
    'rc-tree',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    '@ant-design/icons-svg',
    '@rc-component/util',
  ],
};

module.exports = nextConfig;
