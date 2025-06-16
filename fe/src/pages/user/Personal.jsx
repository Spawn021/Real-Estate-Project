import { apiUpdateProfile } from '@/apis/user'
import { Button, InputField, InputFile } from '@/components'
import { useUserStore } from '@/store/useUserStore'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegUser } from 'react-icons/fa6'
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'

const Personal = () => {
  const { current, getCurrent } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm()
  const avatar = watch('avatar')
  const [uploadedImages, setUploadedImages] = useState([])
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)
  useEffect(() => {
    if (current) {
      setValue('name', current.name || '')
      setValue('phone', current.phone || '')
      setValue('email', current.email || '')
      setValue('address', current.address || '')
      setValue('avatar', current.avatar || '')
    }
  }, [current, setValue])

  const handleGetImages = useCallback((images) => {
    setUploadedImages(images.map((img) => img.path))
  }, [])

  const onSubmit = async (data) => {
    let payload = {}
    if (isChangeAvatar) payload = { ...data, avatar: uploadedImages[0] }
    else payload = { ...data }
    const response = await apiUpdateProfile(payload)
    if (response.success) {
      getCurrent()
      setIsChangeAvatar(false)
      toast.success('Profile updated successfully')
    } else {
      toast.error(response.message || 'Failed to update profile')
    }
  }
  return (
    <div className="h-full">
      <div className="border-b h-14 flex items-center">
        <h1 className="text-2xl font-bold px-6 text-main-700">Personal Information</h1>
      </div>
      <form className="max-w-[900px] mx-auto my-6 space-y-4">
        <InputField
          id="name"
          register={register}
          errors={errors}
          label="Full Name"
          placeholder="Enter your full name"
          required
          validate={{
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Name must not exceed 50 characters',
            },
          }}
        />
        <InputField
          id="phone"
          register={register}
          errors={errors}
          label="Phone number"
          placeholder="Enter your phone number"
          required
          validate={{
            required: 'Phone number is required',
            pattern: {
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: 'Phone number is not valid',
            },
          }}
          readOnly={!current?.userRoles?.every((user) => user.roleCode === 'ROLE7')}
        />
        <InputField
          id="email"
          register={register}
          errors={errors}
          label="Email"
          placeholder="Enter your email address"
          validate={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Email is not valid',
            },
          }}
        />
        <InputField
          id="address"
          register={register}
          errors={errors}
          label="Address"
          placeholder="Enter your address"
          validate={{
            minLength: {
              value: 5,
              message: 'Address must be at least 5 characters long',
            },
            maxLength: {
              value: 100,
              message: 'Address must not exceed 100 characters',
            },
          }}
        />
        <div className="flex flex-col gap-3">
          <span className="text-base font-medium text-main-700 flex items-center gap-2">
            Avatar
            <span
              className="text-sm cursor-pointer text-orange-600 hover:underline"
              onClick={() => setIsChangeAvatar(!isChangeAvatar)}
            >
              {isChangeAvatar ? 'Unchange' : 'Change'}
            </span>
          </span>
          {isChangeAvatar ? (
            <InputFile
              id="avatar"
              validate={{
                required: 'Image is required',
              }}
              watch={watch}
              register={register}
              errors={errors}
              setValue={setValue}
              getImages={handleGetImages}
            />
          ) : avatar ? (
            <img
              src={current.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <FaRegUser className="text-gray-300 w-24 h-24" />
          )}
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Update</Button>
      </form>
    </div>
  )
}

export default Personal
