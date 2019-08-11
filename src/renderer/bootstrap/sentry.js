import config from 'config';

export default (Sentry) => Sentry.init(config.sentry.config);
