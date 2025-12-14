"use client";
import {IKImage, ImageKitProvider, IKUpload} from 'imagekitio-next';
import config from '@/lib/config';
import { useRef, useState } from 'react';
import Image from 'next/image';


const authenticator = async () =>{
    try{
        const response  = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        if(!response.ok){
            const errorText= await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            )
        }

        const data = await response.json();
        const {signature, token, expire} = data;
        return {
            signature,
            token,
            expire
        }
    }catch(error: any){
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}

const {env: {imagekit: {publicKey,urlEndpoint}}} = config;




const FileUpload = ({onFileChange}: {onFileChange: (filePath:string)=> void}) => {
    const ikUploadRef = useRef(null);

const [file,setFile] = useState<{filePath: string} | null>(null);

const onError = (error:any)=>{
    console.log(error);
};
const onSuccess = (res:any)=>{
    setFile(res);
    onFileChange(res.filePath);
};
  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <IKUpload ref = {ikUploadRef} className='hidden' onError={onError} onSuccess={onSuccess} fileName='test-upload.png'/>
        <button className='upload-btn' onClick={(e)=>{
            e.preventDefault();

            if(ikUploadRef.current){
                //@ts-ignore
                ikUploadRef.current?.click();
            }
        }}>
            <Image src="/icons/upload.svg" alt="upload icon" width={20} height={20}  className='object-contain'/>
            <p className='text-base text-light-100'>Upload a File</p>
            {file && <p className='upload-filename'> {file.filePath}</p>}
        </button>

        {file && (<IKImage
            path={file.filePath}
            alt={file.filePath}
            height={500}
            width={500}/>)}
        </ImageKitProvider>
  )
};

export default FileUpload