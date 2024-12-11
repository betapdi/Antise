import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";

const ImageField = (props) => {
  const { field, form, label, accept, placeholder, width } = props;
  const { name, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const [preview, setPreview] = useState(''); 
  const handleFileChange = (event) => { 
    const file = event.target.files[0]; 
    if (file && file.type.startsWith('image/')) { 
      const reader = new FileReader(); 
      reader.onloadend = () => { 
        setPreview(reader.result); 
      }; 
      
      reader.readAsDataURL(file); 
    } 

    form.setFieldValue(field.name, file); 
  };

  return (
    <div className={`flex flex-col gap-2 ${width} h-full`}>
      {label && (
        <label className="ps-1 text-[#18191c] text-sm font-medium font-['Inter'] leading-7">
          {label}
        </label>
      )}

      <div
        className="w-full h-48 relative border-2 border-gray/100 border-dashed rounded-lg p-6"
        id="dropzone"
      >
        <input
          id = {name}

          type="file"
          accept={accept}

          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 z-50"
        />
        {preview ? ( 
          <img src={preview} className="absolute top-4 left-0 max-h-40 max-w-full" id="preview" alt="Preview" /> 
        ) :
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="/image/icon_upload_gray.svg"
            alt=""
          />

          <h3 class="mt-2 text-sm font-medium text-gray-900">
            <label for="file-upload" class="relative cursor-pointer">
              <span>Drag and drop</span>
              <span class="text-indigo-600"> or browse</span>
              <span> to upload</span>
            </label>
          </h3>
          <p class="mt-1 text-xs text-[#767f8c] font-inter">
            {placeholder}
          </p>
        </div>
        }
      </div>
    </div>
  );
};

ImageField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  accept: PropTypes.string,
};

ImageField.defaultProps = {
  accept: "image/*",
};

export default ImageField;
