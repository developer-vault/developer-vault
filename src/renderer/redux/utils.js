import { connect as rawConnect } from 'react-redux';

// Those two lines are there to make sure we always
// return the same object.
const emptyObject = {};
const defaultMapDispatchToProps = () => emptyObject;

/**
 * A proxy for react-redux's `connect` that does not expose `dispatch`
 * if `mapDispatchToProps` is not specified.
 *
 * @param {Function} [mapStateToProps] - Map state to props.
 * @param {Function} [mapDispatchToProps] - Map dispatch to props.
 * @param {Function} [mergeProps] - Merge props.
 * @returns {Function} HOC.
 */
export const connect = (
  mapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps,
  mergeProps,
) => rawConnect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
);
