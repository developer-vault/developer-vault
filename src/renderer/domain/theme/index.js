import { getModuleByName } from '../modules';

/**
 * Return the name of the theme the user is using.
 * TODO: add the possibility to chose a favorite theme.
 *
 * @returns {string} - Theme name.
 */
export const getSelectedTheme = () => 'dracula';

/**
 * Given a list of CSS variables, parse them and set them
 * in the document.
 *
 * @param {object} variables - Variables to set.
 */
export const setCssVariables = (variables) => {
  Object.keys(variables).forEach((key) => {
    const value = variables[key];

    document
      .documentElement
      .style
      .setProperty(`--theme-${key}`, value);
  });
};

/**
 * Bootstrap theme.
 */
export const bootstrapTheme = () => {
  const themeName = getSelectedTheme();

  const themeModule = getModuleByName(themeName);

  // Put colors in CSS variables of the document.
  setCssVariables(themeModule.colors);
};
