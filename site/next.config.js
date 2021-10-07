const withTM = require("next-transpile-modules")([
  "@techofmany/auth",
  "@techofmany/core",
  "@techofmany/media",
  "@techofmany/storage",
  "@techofmany/user",
]);

module.exports = withTM({
  distDir: 'dist',
  future: {
    webpack5: true
  },
});
