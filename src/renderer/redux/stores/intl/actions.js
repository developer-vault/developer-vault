import { ACTIONS } from './constants';

export const updateLocale = ({ locale, messages }) => ({
  type: ACTIONS.UPDATE_LOCALE,
  payload: {
    locale,
    messages,
  },
});
