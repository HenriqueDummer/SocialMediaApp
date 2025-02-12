import { useQuery } from '@tanstack/react-query'

import type { PostType, UserType } from '../types/types'
import { Input } from './ui/input'

import { FaRegImage } from "react-icons/fa6";
import { IoSend, IoCloseCircleOutline } from "react-icons/io5";
import { Button } from './ui/button';
import { useRef, useState, type ChangeEvent } from 'react';

import { useMutation } from '@tanstack/react-query';
import { createPost } from './../utils/http';

const CreatePost = () => {

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {mutate: handleCreatePost} = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      console.log(res)
    }
  })

  const {data: authUser } = useQuery<UserType>({queryKey: ["authUser"]})

  const [inputData, setInputData] = useState({
    text: "",
    selectedFile: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setInputData((prev) => ({
          ...prev,
          selectedFile: reader.result as string,
        }));
      };
      reader.readAsDataURL(file)
    }
  }

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  }

  const handlePost = () => {
    handleCreatePost(inputData)
  }

  return (
    <div className="bg-light_bg p-4 rounded-xl flex">
          <div>
            <div
              className="w-20 aspect-square rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${authUser!.profilePicture})`,
              }}
            ></div>
          </div>
          <div className="ml-4 w-full">
            <Input onChange={(e) => handleTextInputChange(e)} className='w-full h-14 mt-2 text-xl text-slate-300 border-none' placeholder="What's happening?" />
            {inputData.selectedFile && (
              <div>
                <img className='w-full' src={inputData.selectedFile} alt="" />
              </div>
            )}
            <div className='mt-4 w-full flex justify-between'>
              <Input className='hidden' onChange={(e) => handleInputChange(e)} ref={fileInputRef} type="file" accept='image/png, image/jpeg, image/jpg' />
              <Button onClick={() => fileInputRef.current?.click()} className='bg-slate-700 px-4 flex items-center rounded-full' >
                Add image
                <FaRegImage />
              </Button>
              <Button onClick={() => handlePost()} className='bg-slate-700 px-4 rounded-full font-semibold flex items-center'>
                Post
                <IoSend/> 
              </Button>
            </div>
          </div>
        </div>
  )
}

export default CreatePost