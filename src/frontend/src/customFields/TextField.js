import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const TextField = (props) => {
  const {
    field,
    form, //props of fastfield
    type,
    label,
    placeholder,
    disabled, //our props
    heightInput,
    focusStyle,
    borderColor,
    oldValue
  } = props;

  const { name, value, onChange, onBlur } = field; //defaults

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  useEffect(() => {
    console.log("TextField: ", oldValue)
    if (oldValue != null) 
      form.setFieldValue(field.name, oldValue);
  }, [])

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
        onChange={onChange}
        defaultValue={oldValue}
        className={`block w-full border ${focusStyle} ${borderColor} rounded-md p-1 px-4 ${heightInput}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red text-sm mt-1"
      />
    </div>
  );
};

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  borderColor: "border-gray/100",
  disabled: false,
};

export default TextField;
