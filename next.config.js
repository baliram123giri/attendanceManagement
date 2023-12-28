// module.exports = {
//     webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//         config.externals.push({
//             'utf-8-validate': 'commonjs utf-8-validate',
//             'bufferutil': 'commonjs bufferutil',
//         })
//         return config
//     },
// }

module.exports = {

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Allow importing MP3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: 'asset/resource',
    });

    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });

    return config;
  },
  images: {
    domains: ['res.cloudinary.com'], // Add your image domain(s) here
  },
  reactStrictMode: false,
  // Add the experimental section here
  experimental: {
    webpackBuildWorker: true,
  },
};
