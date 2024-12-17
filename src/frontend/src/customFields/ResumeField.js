import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const ResumeField = (props) => {
  const { field, form, label, accept, placeholder, width, oldFile } = props;
  const { name, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const [fileDetail, setFileDetail] = useState(() => {
    const initialFile = oldFile; 
    return initialFile ? { name: initialFile.name, size: (initialFile.size / (1024 * 1024)).toFixed(2) + " MB" } : null;
  });

  // useEffect(() => {
  //   console.log(fileDetail)
  // }, [fileDetail])

  const handleOnChange = (event) => {
    const file = event.target.files[0]; 
    if (file) { 
      setFileDetail({name: file.name, size: (file.size / (1024 * 1024)).toFixed(2) + " MB"});
    } 

    form.setFieldValue(field.name, file); 
  }

  function truncateString(str, maxLength) { 
    if (str.length <= maxLength) {
      return str; 
    } 
    
    return str.slice(0, maxLength - 3) + '...'; 
  }

  const handleDeleteResume = (event) => {
    setFileDetail(null);
    form.setFieldValue(field.name, null);
  }

  return (
    (fileDetail == null ?
    <div className="cursor-pointer w-64 h-20 relative border-2 border-gray/100 hover:bg-gray/100 border-dashed rounded-lg p-6">
        <input
            id = {name}
            type="file"
            accept={accept}

            onChange={handleOnChange}
            className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
        />

        <div className="absolute top-0 left-2 flex flex-row">
          <img
              className="h-8 w-8 mt-5"
              src="/image/PlusCircle_hover.png"
              alt=""
          />

          <div className="ml-3">
              <h3 class="mt-3 text-sm font-medium text-gray-900">
              <label for="file-upload" class="relative">
                  <span>Add Cv/Resume</span>
              </label>
              </h3>
              <p class="mt-1 text-xs text-[#767f8c] font-inter">
                  {placeholder}
              </p>
          </div>
        </div>
    </div>

    :

    <div className="w-64 h-20 bg-gray/100 rounded-lg">
      <div className="w-full h-full flex flex-row justify-between">
        <img
            className="ml-2 h-8 w-8 my-auto"
            src="/image/FileText.png"
            alt=""
        />

        <div className="ml-2 w-3/5 my-auto">
            <h3 class="text-sm font-medium text-gray-900">
            <label for="file-upload" class="relative">
                <span>{truncateString(fileDetail.name, 22)}</span>
            </label>
            </h3>
            <p class="mt-1 text-xs text-[#767f8c] font-inter">
                {fileDetail.size}
            </p>
        </div>

        <button className="w-1/5 my-auto" onClick={handleDeleteResume}>
          <img
              className="h-6 w-6 mx-auto"
              src="/image/Trash.png"
              alt=""
          />
        </button>
      </div>
    </div>)
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
