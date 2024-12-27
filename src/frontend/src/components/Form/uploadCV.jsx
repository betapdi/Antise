import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function UploadCV() {
  return (
    <div className="w-full flex flex-col mx-auto p-8 bg-white shadow-md rounded">
         <h1 className="text-[#18191c] mb-3 text-lg font-medium font-['Inter'] leading-7">Add CV/Resume</h1>
         <Formik
            initialValues={{
                cvname: "",
                cv: null,
                }}
            validationSchema={Yup.object({
                cvname: Yup.string().required("Please fill your CV name"),
                cv: Yup.mixed()
                .nullable() // Allow null but enforce required check
                .required("Please upload your CV")
                .test(
                    "fileSize",
                    "File size is too large. Max file size is 5MB.",
                    (value) => !value || (value && value.size <= 5 * 1024 * 1024) // 5MB limit
                )
                .test(
                    "fileFormat",
                    "Unsupported file format. Only PDF is allowed.",
                    (value) => !value || (value && ["application/pdf"].includes(value.type)) // Allow only PDF
                ), 
            })}
            onSubmit={(values, { setSubmitting }) => {
                // console.log(values);
                setSubmitting(false);
            }}
        >
             {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="cvname" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Cv/Resume Name
              </label>
              <Field
                id="cvname"
                name="cvname"
                type="text"
                className="block w-full border border-gray/100 rounded px-3 py-2"
              />
              <ErrorMessage
                name="cvname"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div>
                <label htmlFor="cv" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                    Upload your CV/Reesume
                </label>
                <div className="w-full h-48 relative border-2 border-gray/100 border-dashed rounded-lg p-6" id="dropzone">
                    <Field name="cv" type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" />
                    <div className="text-center">
                                            <img className="mx-auto h-12 w-12" src={"/image/icon_upload_gray.svg"} alt=""/>

                                            <h3 class="mt-2 text-sm font-medium text-gray-900">
                                                <label for="file-upload" class="relative cursor-pointer">
                                                    <span>Drag and drop</span>
                                                    <span class="text-indigo-600"> or browse</span>
                                                    <span> to upload</span>
                                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
                                                </label>
                                            </h3>
                                            <p class="mt-1 text-xs text-[#767f8c] font-inter">
                                            A photo larger than 400 pixels work best. Max photo size 5 MB.
                                            </p>
                    </div>
                    <img src="" class="mt-4 mx-auto max-h-40 hidden" id="preview"/>
                </div>
              <ErrorMessage
                name="cv"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

          </Form>
        )}
        </Formik>
        <div className='flex flex-row justify-between items-center'>
            <button className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex">
                    <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Cancel</div>
            </button>
            <button className="px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 flex">
                    <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Add Cv/Resume</div>
            </button>
        </div>
    
    </div>
  )
}

export default UploadCV