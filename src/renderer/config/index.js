export default {
  sentry: {
    config: {
      dsn: process.env.VAULT_SENTRY_DSN,
      environment: process.env.VAULT_ENV || process.env.NODE_ENV,
      release: process.env.VAULT_VERSION,
    },
  },
};
