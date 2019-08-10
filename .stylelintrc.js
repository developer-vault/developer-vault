module.exports = {
  extends: ['stylelint-config-recommended-scss'],

  rules: {
    'no-descending-specificity': null,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
};
