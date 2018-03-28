/**
 * Returns a component's name.
 *
 * @param {Object} ReactComponent - A React Component.
 * @returns {string} - The component's name.
 */
export const getDisplayName = ReactComponent => ReactComponent.displayName || ReactComponent.name || 'Component';

/**
 * Generate a HOC displayName.
 *
 * @see {@link https://reactjs.org/docs/higher-order-components.html}
 * @param {string} HocName - The HOC name.
 * @param {Object} ReactComponent - The wrapped component.
 * @returns {string} - The HOC displayName.
 * @example static displayName = generateHocDisplayName('isAuthenticated', WrappedComponent);
 */
export const generateHocDisplayName = (HocName, ReactComponent) => `${HocName}(${getDisplayName(ReactComponent)})`;
