import { connect as rawConnect } from 'react-redux';

// Those two lines are there to make sure we always
// return the same object.
const emptyObject = {};
const defaultMapDispatchToProps = () => emptyObject;

/**
 * Wrap connect so it doesn't propagate dispatch
 * if we don't specify a second argument.
 *
 * @param {object|Function} mapStateToProps - MapStateToProps.
 * @param {object|Function} [mapDispatchToProps] - MapDispatchToProps.
 * @param {object|Function} [mergeProps] - MergeProps.
 */
export const connect = (
  mapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps,
  mergeProps = null,
) => rawConnect(mapStateToProps, mapDispatchToProps, mergeProps);
