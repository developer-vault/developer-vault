export default {
  raven: {
    dsn: process.env.REACT_APP_SENTRY_DSN,
    options: {
      logger: 'developer-vault-client',
      environment: process.env.REACT_APP_ENV || process.env.NODE_ENV,
      release: process.env.REACT_APP_VERSION,
    },
  },
};
