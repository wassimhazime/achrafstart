var Encore = require("@symfony/webpack-encore");
var path = require("path");
var VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("app", "./assets/js/app.js")
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .enableVueLoader(() => {}, {
    runtimeCompilerBuild: false,
    useJsx: true,
  })
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .addPlugin(
    new VuetifyLoaderPlugin({
      match(originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith("core-")) {
          return [
            camelTag,
            `import ${camelTag} from '@/components/core/${camelTag.substring(
              4
            )}.vue'`,
          ];
        }
      },
    })
  )
  .addPlugin(
    new MiniCssExtractPlugin({
      filename: "style.css",
    })
  )
  .enableSassLoader((options) => {
    options.sourceMap = true;
    options.sassOptions = {
      outputStyle: "compressed",
      sourceComments: !Encore.isProduction(),
    };
    options.implementation = require("sass");
    //options.fiber = require("fibers");
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = 3;
  })
  .configureBabel(
    function (babelConfig) {
      if (Encore.isProduction()) {
        babelConfig.plugins.push("transform-remove-console");
      }
    },
    {
      // node_modules is not processed through Babel by default
      // but you can whitelist specific modules to process
      //   includeNodeModules: ["foundation-sites"],
      // or completely control the exclude rule (note that you
      // can't use both "includeNodeModules" and "exclude" at
      // the same time)
      //   exclude: /bower_components/,
    }
  );

var config = Encore.getWebpackConfig();

config.resolve = {
  alias: {
    vue$: path.resolve(__dirname, "./node_modules/vue/dist/vue.runtime.esm.js"),
    "@": path.resolve(__dirname, "./assets/js"),
  },
  extensions: ["*", ".js", ".vue", ".json"],
};
/* config.performance= {
  hints: false
}; */
// config.node= {
//     fs: "empty",
//   }

module.exports = config;
