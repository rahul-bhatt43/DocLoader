"use client"
import React, { useState } from 'react'
import AlertMessage from './AlertMessage'
import FilePreview from './FilePreview'
import ProgressBar from './ProgressBar'

const UploadForm = ({ fileUpload, progressState }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [file, setFile] = useState()
  const [alertMessage, setAlertMessage] = useState("")

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault();
    if (isDragOver) {
      const file = e.dataTransfer.files[0];
      // console.log("first:: ", e.dataTransfer.files[0]);


      if (file?.size > 2000000) {
        setIsDragOver(false)
        setAlertMessage("File is greater than 2 MB")
        return;
      }
      setAlertMessage("");
      setFile(file);
      setIsDragOver(false);
    } else {
      const file = e.target.files[0];
      // console.log("Wodfnvkfjn:: ", e.target.files[0]);

      if (file?.size > 2000000) {
        setIsDragOver(false)
        setAlertMessage("File is greater than 2 MB")
        return;
      }
      setAlertMessage("");
      setFile(file);
      setIsDragOver(false);
    }
    // console.log(file);
    // handle file upload logic here
  };

  return (
    <div onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop} className=' text-center ' >
      <div className={`flex items-center justify-center w-full ${isDragOver ? 'border-primary border-2' : 'border-2 border-primary border-dashed'}`}>
        {/* <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"> */}
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 cursor-pointer bg-gray-50  hover:bg-gray-100 ">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-primary dark:text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" /></svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or <strong className=' text-primary ' >drag</strong> and <strong className=' text-primary ' >drop</strong> </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
          </div>
          <input accept="*" id="dropzone-file" type="file" className="hidden" onChange={(e) => handleDrop(e)} />
        </label>
      </div>

      {alertMessage !== "" ? (<AlertMessage msg={alertMessage} />) : null}

      {file && <FilePreview file={file} removeFile={() => setFile(null)} />}



      {
        progressState > 0 ? (
          <ProgressBar progressState={progressState} />
        ) : (<button onClick={() => fileUpload(file && file)} disabled={!file} className=' disabled:bg-gray-400 bg-primary p-2 rounded-full text-white mt-2 w-[30%] ' >Upload</button>)
      }

    </div>
  )
}

export default UploadForm