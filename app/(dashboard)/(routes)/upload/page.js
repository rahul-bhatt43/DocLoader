"use client"
import React, { useState } from 'react'
import UploadForm from './_components/UploadForm'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { app } from '@/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import { generateRandomString } from '@/app/_utils/GenerateRandomStrings'
import { useRouter } from 'next/navigation'
import SuccessUploaded from './_components/SuccessUploaded'

const Upload = () => {

  const router = useRouter();

  const db = getFirestore(app);
  const { user } = useUser();

  const storage = getStorage(app);

  const [progressState, setProgressState] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);


  const uploadFile = (file) => {

    const metadata = {
      contentType: file?.type
    };

    const storageRef = ref(storage, 'doclaoder/' + file?.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    const docId = generateRandomString(8);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgressState(progress);
        if (progress === 100) {
          setUploadCompleted(true);
          setTimeout(() => {
            setUploadCompleted(false);
            router.push(`/file-preview/${docId}`);
          }, 2000)
        }
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          saveInfoToStore(file, downloadURL, docId);
        });
      });
  }

  const saveInfoToStore = async (file, fileUrl, docId) => {
    await setDoc(doc(db, "uploads", docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl: fileUrl,
      userEmail: user?.primaryEmailAddress.emailAddress || "",
      userName: user?.fullName || "",
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
  }

  return (
    <div className='p-5 px-8 md:px-28 ' >
      <h2 className=' text-[20px] text-center m-5 ' >Start <strong className=' text-primary ' >Uploading</strong> file and <strong className=' text-primary ' >Share</strong> it</h2>
      {
        uploadCompleted ? (<SuccessUploaded />) : (
          <UploadForm fileUpload={(file) => uploadFile(file)} progressState={progressState} />
        )
      }
    </div>
  )
}

export default Upload