import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  info,
  icon
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
      {icon ? (
        <span className="input-icon">
          <span className={icon} />
        </span>
      ) : null}
      <input
        className="TextFieldGroup"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        spellCheck="false"
      />
      <div className="info">{info}</div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  required: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
