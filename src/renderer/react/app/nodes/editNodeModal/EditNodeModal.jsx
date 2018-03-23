/* eslint-disable function-paren-newline */

import React from 'react';
import PropTypes from 'prop-types';
import { noop, mapValues } from 'lodash';
import { createForm, createFormField } from 'rc-form';
import memoize from 'fast-memoize';

import { nodeShape } from 'react/shapes/node';
import { formShape } from 'react/shapes/form';

/**
 * Maps props to a rc-form friendly default value.
 *
 * @param {Object} props - Props.
 * @returns {Object} - Values.
 */
const defaultValueMapper = props =>
  mapValues(props.node || {}, value => createFormField({ value }));

/**
 * Make a list of available parents.
 *
 * TODO (sylvainar) : Filter, avoid recursivity.
 *
 * @param {Object} nodeList - List of nodes in the store.
 * @returns {Object[]} - Values for the select.
 */
const getOptions = nodeList =>
  Object.values(nodeList).map(node => ({ key: node.id, value: node.label }));

/** Same but memoized. */
const memoizedGetOptions = memoize(getOptions);

@createForm({
  mapPropsToFields: defaultValueMapper,
})
export default class EditNodeModal extends React.PureComponent {
  static propTypes = {
    /** Current node given for edition. */
    node: nodeShape,
    /** List of nodes in the store. */
    nodeList: PropTypes.objectOf(nodeShape),
    /** Callback for submission. */
    onSubmit: PropTypes.func,
    /** Callback for cancel. */
    onCancel: PropTypes.func,
    /** @createForm / Form */
    form: formShape.isRequired,
  };

  static defaultProps = {
    node: null,
    nodeList: {},
    onSubmit: noop,
    onCancel: noop,
  };

  /**
   * Handle form submission.
   */
  submit = () => {
    this.props.form.validateFields((error, formValues) => {
      if (!error) {
        const { id } = this.props.node;
        this.props.onSubmit({
          ...formValues,
          id,
        });
      }
    });
  };

  /** Render component. */
  render() {
    const {
      node, onCancel, form, nodeList,
    } = this.props;
    const { getFieldDecorator } = form;

    const options = memoizedGetOptions(nodeList);

    return (
      <React.Fragment>
        {!!node &&
        <div>
          Name:
          {getFieldDecorator('label', {
            rules: [{
              required: true,
            }],
          })(<input />)}

          Parent:
          {getFieldDecorator('parent', {})(
            <select>
              {options.map(option => <option key={option.key}>{option.value}</option>)}
            </select>,
          )}
          <br />
          <button onClick={this.submit}>OK</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
        }
      </React.Fragment>
    );
  }
}

