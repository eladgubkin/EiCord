import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  info,
  rows,
  cols
}) => {
  return (
    <div className="field-wrap">
      <label>
        {error ? (
          <span className="label err-color">
            {label} - <span className="error">{error}</span>
          </span>
        ) : (
          <span className="label">{label}</span>
        )}
      </label>
      <textarea
        rows={rows}
        cols={cols}
        className="TextAreaFieldGroup"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
      <div className="info">{info}</div>
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  required: PropTypes.string,
  rows: PropTypes.string,
  cols: PropTypes.string
};

TextAreaFieldGroup.defaultProps = {
  type: 'text'
};

export default TextAreaFieldGroup;
