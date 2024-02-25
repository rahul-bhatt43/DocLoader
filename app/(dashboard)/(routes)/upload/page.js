"use client"
import React from 'react'
import UploadForm from './_components/UploadForm'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '@/firebaseConfig'

const Upload = () => {

  const storage = getStorage(app);

  const uploadFile = (file) => {
    console.log(file);

    const metadata = {
      contentType: file?.type
    };

    const storageRef = ref(storage, 'doclaoder/' + file?.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
        // progress == 100 && getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log('File available at', downloadURL);
        // });
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      });
  }

  return (
    <div className='p-5 px-8 md:px-28 ' >
      <h2 className=' text-[20px] text-center m-5 ' >Start <strong className=' text-primary ' >Uploading</strong> file and <strong className=' text-primary ' >Share</strong> it</h2>
      <UploadForm fileUpload={(file) => uploadFile(file)} />
    </div>
  )
}

export default Upload