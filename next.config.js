module.exports = {
  distDir: 'dist',
  publicRuntimeConfig: {
    ENABLE_AUTH: process.env.ENABLE_AUTH,
    ENABLE_PROFILES: process.env.ENABLE_PROFILES,
  }
}
