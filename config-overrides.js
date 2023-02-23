const path = require("path");

module.exports = {
  webpack: function (config) {
    config.devtool = "source-map";
    config.resolve = {
      extensions: [".js", ".html"],
      alias: {
        "@actions": path.resolve(__dirname, "src/core/actions"),
        "@core": path.resolve(__dirname, "src/core"),
        "@views": path.resolve(__dirname, "src/core/views"),
        "@components": path.resolve(__dirname, "src/core/views/components"),
        "@factory": path.resolve(__dirname, "src/core/factory"),
        "@hooks": path.resolve(__dirname, "src/core/views/hooks"),
        "@constants": path.resolve(__dirname, "src/core/constants"),
        "@contexts": path.resolve(__dirname, "src/core/contexts"),
        "@observers": path.resolve(__dirname, "src/core/observers"),
        "@theme": path.resolve(__dirname, "src/core/theme"),
        "@src": path.resolve(__dirname, "src"),
      },
    };
    config.module.rules.push({
      test: /\.js$/,
      loader: "esbuild-loader",
      options: {
        loader: "jsx",
        target: "es2020",
      },
    });
    console.log(JSON.stringify(config));
    return config;
  },
};
