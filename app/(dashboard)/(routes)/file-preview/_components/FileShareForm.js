import { Copy } from 'lucide-react';
import React, { useRef, useState } from 'react'

const FileShareForm = ({ file, onPasswordSave }) => {
  const [isPasswordEnable, setIsPasswordEnable] = useState(file?.password !== "");
  const [password, setPassword] = useState(file?.password);
  const shortUrlRef = useRef();

  const handleCopy = () => {
    const inputElement = shortUrlRef.current;
    if (inputElement) {
      inputElement.select();
      navigator.clipboard.writeText(inputElement.value);
      alert("Copied!");
    }
  }

  return file && (
    <div className=' flex flex-col gap-2' >
      <div>
        <label className=' text-[14px] text-gray-400 ' >ShortUrl</label>
        <div className=' flex gap-5 p-2 border rounded-md  ' >
          <input ref={shortUrlRef} type='text' value={file?.shortUrl} disabled className=' disabled:text-gray-500 bg-transparent outline-none w-full ' />
          <Copy className=' text-gray-400 hover:text-blue-200 cursor-pointer ' onClick={handleCopy} />
        </div>

      </div>
      <div className=' gap-3 flex mt-5' >
        <input id='pass' type='checkbox' checked={file?.password !== ""} onChange={(e) => setIsPasswordEnable(e.target.checked)} />
        <label htmlFor='pass' >Enable Password?</label>
      </div>

      {isPasswordEnable ? (
        <div className='flex gap-3 items-center' >
          <div className=' border rounded-md w-full p-2 ' >
            <input type='password' value={file?.password} className=' disabled:text-gray-500 bg-transparent outline-none w-full ' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='p-2 bg-primary text-white rounded-md disabled:bg-gray-400 hover:bg-blue-600 ' disabled={password?.length < 3} onClick={() => onPasswordSave(password)} >Save</button>
        </div>
      ) : null}
      <div className=' flex flex-col gap-4 p-3 border rounded-md mt-5  ' >
        <label className=' text-gray-500 ' >Send File to Email</label>
        <input type='email' className=' disabled:text-gray-500 bg-transparent outline-none p-2 border rounded-md  ' placeholder='example@gmail.com' />
        <button className='p-2 w-full bg-primary text-white rounded-md disabled:bg-gray-400 hover:bg-blue-600 ' disabled={false} onClick={() => onPasswordSave(password)} >Send Email</button>
      </div>
    </div>
  )
}

export default FileShareForm