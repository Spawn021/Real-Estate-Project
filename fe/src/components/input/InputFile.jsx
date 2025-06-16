import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { apiUploadImage } from '@/apis/beyond'
import { CgSpinner } from 'react-icons/cg'
import { AiOutlineCloseCircle } from 'react-icons/ai'
const InputFile = ({
  label,
  id,
  validate,
  containerClassName,
  multiple = false,
  getImages,
  watch,
  register,
  errors,
  setValue,
}) => {
  const rawImages = watch(id)

  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleUpload = async (files) => {
    const formData = new FormData()
    const promise = []

    for (let file of files) {
      formData.append('file', file)
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      promise.push(apiUploadImage(formData))
    }
    setIsLoading(true)
    const response = await Promise.all(promise)
    setIsLoading(false)
    if (response && response.length > 0) {
      const uploadedImages = response
        .map((res) =>
          res.status === 200
            ? { path: res.data.secure_url, id: res.data.public_id }
            : null,
        )
        .filter((url) => url !== null)
      setImages(uploadedImages)
    }
  }

  useEffect(() => {
    if (rawImages && rawImages.length > 0 && rawImages instanceof FileList) {
      handleUpload(rawImages)
    } else setImages([])
  }, [rawImages])
  useEffect(() => {
    if (images && images.length > 0) {
      getImages(images)
    }
  }, [images, getImages])

  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && <span className="text-base font-medium text-main-700">{label}</span>}
      <input
        id={id}
        type="file"
        {...(register && register(id, validate))}
        className="hidden"
        multiple={multiple}
      ></input>
      <label
        htmlFor={id}
        className="h-[200px] bg-gray-100 w-full flex flex-col gap-2 items-center justify-center p-4 border border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition-colors"
      >
        {isLoading ? (
          <CgSpinner className="animate-spin text-main-700" size={24} />
        ) : images?.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 ">
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <img
                  key={index}
                  src={image.path}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full object-cover rounded"
                />
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setImages((prev) => {
                      const newImages = prev.filter((img) => img.id !== image.id)
                      if (newImages.length === 0) {
                        if (getImages) getImages([])
                        if (setValue) setValue(id, null)
                      }
                      return newImages
                    })
                  }}
                >
                  <AiOutlineCloseCircle
                    size={18}
                    className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-700 w-6 h-6 bg-gray-200 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className="text-5xl text-gray-300">
              <FaCloudUploadAlt />
            </span>
            Choose Image
            <small className="text-gray-500 text-sm italic">
              Only support image with extensions: .jpg, .jpeg, .png
            </small>
          </>
        )}
      </label>
      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default InputFile
