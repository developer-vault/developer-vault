module.exports = {
  'src/**/*.{js,jsx}': [
    'eslint --fix',
    'git add',
  ],

  'src/**/*.scss': [
    'stylelint --fix',
    'git add',
  ],
};
