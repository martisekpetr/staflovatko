import React from 'react';
import PropTypes from 'prop-types';


export default class Select extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object, // eslint-disable-line
    className: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any, // eslint-disable-line
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })).isRequired,
  };

  static defaultProps = {
    name: '',
    label: '',
    className: null,
    disabled: false
  };

  render() {
    const {
      input, options, className,
      disabled, defaultValue, label
    } = this.props;

    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <select
          className={className || null}
          id={input.name}
          name={input.name}
          disabled={disabled}
          defaultValue={input.value || defaultValue}
          onChange={input.onChange} // eslint-disable-line
        >
          {
            options.map((option, index) => (
              <option
                value={option.value}
                key={index} // eslint-disable-line
              >
                { option.label }
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}
