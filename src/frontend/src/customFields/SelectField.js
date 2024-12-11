import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const SelectField = (props) => {
  const {
    field,
    form, //props of fastfield
    type,
    label,
    placeholder,
    disabled, //our props
    options,
    heightInput
  } = props;

  const { name, value, onChange, onBlur } = field; //defaults

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor="organizationType"
            className="text-sm font-medium text-[#18191c]"
        >
            {label}
          </label>
        )}

        <select
            id={name}
            name={name}
            className={`block w-full border border-gray/100 rounded-md p-1 px-4 ${heightInput}`}
            defaultValue=""
        >
            {options.map((option, index) => (
                <option value={option.value} disabled={index === 0} >{option.key}</option>
            ))}
        </select>

        <ErrorMessage
            name={name}
            component="div"
            className="text-red text-sm mt-1"
        />
    </div>
  );
};

SelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectField.defaultProps = {
  type: "select",
  label: "",
  placeholder: "",
  disabled: false,
};

export default SelectField;
