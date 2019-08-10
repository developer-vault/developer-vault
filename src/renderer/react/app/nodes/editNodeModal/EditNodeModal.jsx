import { noop, mapValues } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { createForm, createFormField } from 'rc-form';
import { createSelector } from 'reselect';

import { listDescendants } from 'services/node';
import { nodeShape } from 'react/shapes/node';
import { formShape } from 'react/shapes/form';

/**
 * Maps props to a rc-form friendly default value.
 *
 * @param {object} props - Props.
 * @returns {object} - Values.
 */
const defaultValueMapper
  = props => mapValues(props.node || {}, value => createFormField({ value }));

/**
 * Make a list of available parents.
 */
const getOptionsSelector = createSelector(
  props => props.node,
  props => props.nodeList,
  (selectedNode, nodeList) => {
    if (!selectedNode) {
      return [];
    }

    // Non available parents are current node and all its descendants.
    const nonAvailableParents = [selectedNode.id, ...listDescendants(selectedNode.id, nodeList)];

    // Now filter the nodes and makes it select/option friendly.
    return Object.values(nodeList)
      .filter(node => !nonAvailableParents.includes(node.id))
      .map(node => ({ key: node.id, value: node.label }));
  },
);

const enhancer = compose(
  createForm({
    mapPropsToFields: defaultValueMapper,
  }),
);

class EditNodeModal extends React.PureComponent {
  static propTypes = {
    /** Current node given for edition. */
    node: nodeShape,
    /** List of nodes in the store. */
    // RESELECT
    // eslint-disable-next-line react/no-unused-prop-types
    nodeList: PropTypes.objectOf(nodeShape),
    /** Callback for submission. */
    onSubmit: PropTypes.func,
    /** Callback for cancel. */
    onCancel: PropTypes.func,
    /** From createForm / Form. */
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
          parentId: formValues.parentId === '' ? null : formValues.parentId,
        });
      }
    });
  };

  /** @returns {object} JSX. */
  render() {
    const {
      node, onCancel, form,
    } = this.props;
    const { getFieldDecorator } = form;

    const options = getOptionsSelector(this.props);

    return (
      <React.Fragment>
        { !!node
          && (
            <div>
              Name:
              {getFieldDecorator('label', {
                rules: [{
                  required: true,
                }],
              })(<input />)}

              Parent:
              {getFieldDecorator('parentId', {
                initialValue: '',
                normalize: value => value || '',
              })(
                <select>
                  <option key="" value="">-</option>
                  {(options || []).map(option => (
                    <option
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </option>
                  ))}
                </select>,
              )}
              <br />
              <button type="button" onClick={this.submit}>OK</button>
              <button type="button" onClick={onCancel}>Cancel</button>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default enhancer(EditNodeModal);
