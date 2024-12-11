import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";

const ResumeField = (props) => {
  const { field, form, label, accept, placeholder, width } = props;
  const { name, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="w-64 h-16 relative border-2 border-gray/100 border-dashed rounded-lg p-6">
        <input
            id = {name}
            type="file"
            accept={accept}

            onChange={(event) => form.setFieldValue(field.name, event.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 z-50"
        />

        <div className="absolute top-0 left-2 flex flex-row">
        <img
            className="h-8 w-8 mt-4"
            src="/image/PlusCircle_hover.png"
            alt=""
        />

        <div className="ml-3">
            <h3 class="mt-2 text-sm font-medium text-gray-900">
            <label for="file-upload" class="relative cursor-pointer">
                <span>Add Cv/Resume</span>
            </label>
            </h3>
            <p class="mt-1 text-xs text-[#767f8c] font-inter">
                {placeholder}
            </p>
        </div>
        </div>
    </div>
  );
};

ResumeField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  accept: PropTypes.string,
};

ResumeField.defaultProps = {
  accept: "application/pdf",
};

export default ResumeField;
