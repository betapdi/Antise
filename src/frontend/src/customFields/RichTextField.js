import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const RichTextField = (props) => {
  const {
    field,
    form, //props of fastfield
    rows,
    label,
    placeholder,
    disabled, //our props
  } = props;

  const { name, value, onChange, onBlur } = field; //defaults

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#18191c]"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
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

RichTextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

RichTextField.defaultProps = {
  type: "richText",
  label: "",
  placeholder: "",
  disabled: false,
  rows: "4"
};

export default RichTextField;
