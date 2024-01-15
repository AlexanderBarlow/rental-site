// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          os: false,
          path: false,
          crypto: false,
        },
        extensions: [".mjs", ".js", ".json"],
      };

      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });

      return webpackConfig;
    },
  },
};
