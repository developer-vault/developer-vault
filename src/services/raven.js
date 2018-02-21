import Raven from 'raven-js';
import config from 'config';

const raven = Raven.config(config.raven.dsn, config.raven.options).install();

export default raven;
