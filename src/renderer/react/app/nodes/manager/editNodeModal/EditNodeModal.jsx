import { noop, mapValues } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withPropsOnChange } from 'recompose';
import { createForm, createFormField } from 'rc-form';
import { FormattedMessage } from 'react-intl';

import { nodeShape } from 'react/shapes/node';
import { formShape } from 'react/shapes/form';
import Button from 'react/components/general/button/Button';
import globalMessages from 'intl/global.messages';
import { selectEligibleNewParents, selectNodesMap } from 'redux/stores/nodes/selector';
import { connect } from 'redux/utils';

const enhancer = compose(
  connect((state, props) => ({
    nodesMap: selectNodesMap(state),
    eligibleNewParents: selectEligibleNewParents(state, props.node?.id),
  })),

  /**
   * Make a list of available parents and format it for select/options.
   */
  withPropsOnChange(
    ['eligibleNewParents', 'nodesMap'],
    ({ eligibleNewParents, nodesMap }) => ({
      // Call selector to get eligible new parents,
      // then format it into a select/options format.
      parentIdOptions: eligibleNewParents
        .map(currentNodeId => ({
          key: nodesMap[currentNodeId].id,
          value: nodesMap[currentNodeId].label,
        })),
    }),
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
    /** Callback for submission. */
    onSubmit: PropTypes.func,
    /** Callback for cancel. */
    onCancel: PropTypes.func,
    /** From createForm / Form. */
    form: formShape.isRequired,
    /** Parent ID available options. */
    parentIdOptions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })),
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
