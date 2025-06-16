import { Button, InputField, InputFile, InputText, TextArea, Title } from '@/components'
import { CiCirclePlus } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { apiCreatePropertyType } from '@/apis/propertyType'
import { toast } from 'react-toastify'

const CreatePropertyType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm()
  const [uploadedImages, setUploadedImages] = useState([])

  const handleGetImages = useCallback((images) => {
    setUploadedImages(images.map((img) => img.path))
  }, [])

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      images: uploadedImages,
    }
    const { images, ...rest } = payload
    const response = await apiCreatePropertyType({ ...rest, image: images[0] })
    if (response.success) {
      toast.success(response.message)
      reset()
      setUploadedImages([])
      setValue('images', null)
    } else {
      toast.error(response.message || 'Failed to create property type')
    }
  }
  return (
    <div>
      <Title title="Create Property Type">
        <Button onClick={handleSubmit(onSubmit)}>
          <CiCirclePlus size={20} />
          <span>Create</span>
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4">
        <InputField
          id="name"
          register={register}
          errors={errors}
          label="Property Type Name"
          validate={{
            required: 'Property type name is required',
            minLength: {
              value: 3,
              message: 'Property type name must be at least 3 characters long',
            },
          }}
        />
        <TextArea
          id="description"
          register={register}
          errors={errors}
          label="Description"
          validate={{
            required: 'Description is required',
          }}
        />
        <InputFile
          id="images"
          label="Image"
          validate={{
            required: 'Image is required',
          }}
          watch={watch}
          register={register}
          errors={errors}
          setValue={setValue}
          getImages={handleGetImages}
          value={uploadedImages}
        />
      </form>
    </div>
  )
}

export default CreatePropertyType
