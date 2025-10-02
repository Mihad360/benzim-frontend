// webpack.config.js
module.exports = {
  // other configurations...
  resolve: {
    fallback: {
      global: require.resolve("global"), // Add this line to resolve the global object
    },
  },
};
