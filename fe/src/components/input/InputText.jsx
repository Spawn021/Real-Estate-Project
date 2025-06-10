import { Editor } from '@tinymce/tinymce-react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
const InputText = ({
  label,
  containerClassName,
  height = 500,
  register,
  errors,
  validate,
  id,
  setValue,
}) => {
  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}
        </label>
      )}
      <Editor
        apiKey={import.meta.env.VITE_MCE_TINY_KEY}
        {...register(id, validate)}
        onEditorChange={(newValue, editor) =>
          setValue(id, newValue, { shouldValidate: true })
        }
        menubar={true}
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default InputText
