"use client"
import { app } from '@/firebaseConfig'
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FileInfo from '../_components/FileInfo'
import FileShareForm from '../_components/FileShareForm'
import { ArrowLeftSquare } from 'lucide-react'

const FilePreview = ({ params }) => {
    const [fileInfoData, setFileInfoData] = useState(null);
    const db = getFirestore(app);
    useEffect(() => {
        getFileInfo();
    }, [])
    const getFileInfo = async () => {

        // console.log(params.field);
        const docRef = doc(db, "uploads", params?.field);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFileInfoData(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const onPasswordSave = async (password) => {
        const passRef = doc(db, 'uploads', params?.field);
        await updateDoc(passRef, {
            password: password
        })
        alert("saved!");
    }


    return (
        <div className=' py-10 md:px-20 px-4 ' >
            {
                fileInfoData ? (
                    <>
                        <Link href={'/upload'} className='flex gap-3' > <ArrowLeftSquare /> Goto Upload</Link>
                        <div className='grid grid-cols-1 md:grid-cols-2 mt-5 ' >
                            <FileInfo file={fileInfoData} />
                            <FileShareForm file={fileInfoData} onPasswordSave={(password) => onPasswordSave(password)} />
                        </div>
                    </>

                ) : (
                    <p>No file found or it is removed!</p>
                )
            }
        </div>
    )
}

export default FilePreview