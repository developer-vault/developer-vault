/**
 * Concat class names. Remove falsy values.
 *
 * @param {...string} classNames - Class names to concatenate.
 * @returns {string} The concatenated classnames.
 */
export function concat(...classNames) {
  return classNames.reduce(
    (res, className) => (className ? `${res} ${className}` : res),
    '',
  ).trim();
}

export default { concat };
