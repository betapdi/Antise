import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const DateField = (props) => {
  const {
    field,
    form, //props of fastfield
    type,
    label,
    placeholder,
    disabled, //our props
  } = props;

  const { name, value, onChange, onBlur } = field; //defaults

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
              htmlFor={name}
              className="text-sm font-medium text-[#18191c]"
          >
              {label}
          </label>
        )}
          <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              className="block w-full border border-gray/100 rounded p-1"
          />
          <ErrorMessage
              name={name}
              component="div"
              className="text-red text-sm mt-1"
          />
      </div>
  );
};

DateField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

DateField.defaultProps = {
  type: "date",
  label: "",
  placeholder: "",
  disabled: false,
};

export default DateField;
