import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const IconTextField = (props) => {
  const {
    field,
    form, //props of fastfield
    type,
    label,
    placeholder,
    disabled, //our props
		imageName,
    heightInput,
    oldValue
  } = props;

  const { name, value, onChange, onBlur } = field; //defaults

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  useEffect(() => {
    if (oldValue != null) 
      form.setFieldValue(field.name, oldValue);
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {label && (  
        <label
        htmlFor="companyWebsite"
        className="text-sm font-medium text-[#18191c]"
        >
        	{label}
        </label>
      )}

        <div className="relative">
					<input
							id={name}
							name={name}
							type={type}
							placeholder={placeholder}
              onChange={onChange}
              defaultValue={oldValue}
							className={`block w-full border border-gray/100 rounded-md pl-10 p-1 ${heightInput}`}
					/>
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
							<img
							src={`/image/${imageName}`}
							alt="icon" 
							/>
					</div>
        </div>

        <ErrorMessage
					name={name}
					component="div"
					className="text-red text-sm mt-1"
        />
    </div>
  );
};

IconTextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

IconTextField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

export default IconTextField;
