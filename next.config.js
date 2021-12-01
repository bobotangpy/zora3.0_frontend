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
};
