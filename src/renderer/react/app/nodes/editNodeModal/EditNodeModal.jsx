import { noop, mapValues } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withPropsOnChange } from 'recompose';
import { createForm, createFormField } from 'rc-form';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { listDescendants } from 'services/node';
import { nodeShape } from 'react/shapes/node';
import { formShape } from 'react/shapes/form';
import Button from 'react/components/general/button/Button';
import globalMessages from 'config/global.messages';
import { getNodesMap } from 'redux/stores/nodes/selector';

const enhancer = compose(
  connect(state => ({
    nodesMap: getNodesMap(state),
  }), null),

  /**
   * Make a list of available parents and format it for select/options.
   */
  withPropsOnChange(
    ['node', 'nodesMap'],
    ({ node, nodesMap }) => {
      if (!node) {
        return [];
      }

      // Non available parents are current node and all its descendants.
      const nonAvailableParents = [node.id, ...listDescendants(node.id, nodesMap)];

      // Now filter the nodes and makes it select/option friendly.
      const options = Object.values(nodesMap)
        .filter(currentNode => !nonAvailableParents.includes(currentNode.id))
        .map(currentNode => ({ key: currentNode.id, value: currentNode.label }));

      return { parentIdOptions: options };
    },
  ),

  createForm({
    // Maps props to a rc-form friendly default value.
    mapPropsToFields: props => mapValues(
      props.node || {},
      value => createFormField({ value }),
    ),
  }),
);

class EditNodeModal extends React.PureComponent {
  static propTypes = {
    /** Current node given for edition. */
    node: nodeShape,
    /** List of nodes in the store. */
    nodesMap: PropTypes.objectOf(nodeShape).isRequired,
    /** Callback for submission. */
    onSubmit: PropTypes.func,
    /** Callback for cancel. */
    onCancel: PropTypes.func,
    /** From createForm / Form. */
    form: formShape.isRequired,
    /** Parent ID available options. */
    parentIdOptions: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  };

  static defaultProps = {
    node: null,
    onSubmit: noop,
    onCancel: noop,
    parentIdOptions: [],
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
      node, onCancel, form, parentIdOptions,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <>
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
                  {(parentIdOptions || []).map(option => (
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
              <Button
                onClick={this.submit}
                label={<FormattedMessage {...globalMessages.OK} />}
              />
              <Button
                onClick={onCancel}
                label={<FormattedMessage {...globalMessages.CANCEL} />}
              />
            </div>
          )}
      </>
    );
  }
}

export default enhancer(EditNodeModal);
