const path = require("path");

module.exports = {
  webpack: function (config) {
    config.devtool = "source-map";
    config.output.filename = "static/js/bundle.js";
    config.mode = 'development';
    config.optimization = {
      minimize: false,
    };
    config.resolve = {
      extensions: [".js", ".html"],
      alias: {
        "@actions": path.resolve(__dirname, "src/core/actions"),
        "@core": path.resolve(__dirname, "src/core"),
        "@views": path.resolve(__dirname, "src/core/views"),
        "@components": path.resolve(__dirname, "src/core/views/components"),
        "@factory": path.resolve(__dirname, "src/core/factory"),
        "@hooks": path.resolve(__dirname, "src/core/views/hooks"),
        "@features": path.resolve(__dirname, "src/core/views/features"),
        "@constants": path.resolve(__dirname, "src/core/constants"),
        "@contexts": path.resolve(__dirname, "src/core/contexts"),
        "@utils": path.resolve(__dirname, "src/utils"),
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
    return config;
  },
};
