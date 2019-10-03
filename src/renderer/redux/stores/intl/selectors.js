import { createSelector } from 'reselect';

export const selectLocale = state => state.intl.locale;

export const selectMessages = state => state.intl.messages;

export const selectLocaleBundle = createSelector(
  [
    selectLocale,
    selectMessages,
  ],
  (locale, messages) => ({
    locale,
    messages,
  }),
);
