module.exports = {
  exportPathMap: async (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) => {
    return {
      "/": { page: "/" },
      "/horoscope_of_the_month": { page: "/category" },
      "/women": { page: "/category" },
      "/men": { page: "/category" },
    };
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: "url-loader?limit=100000",
    });
    return config;
  },
};
