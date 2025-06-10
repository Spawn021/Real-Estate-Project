import clsx from 'clsx'

import { twMerge } from 'tailwind-merge'

const TextArea = ({
  style = 'form-textarea',
  label,
  id,
  type = 'text',
  register,
  errors,
  validate,
  inputClassName,
  containerClassName,
  placeholder,
}) => {
  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        type={type}
        className={twMerge(clsx(style, 'placeholder:text-sm', inputClassName))}
        {...(register && register(id, validate))}
        placeholder={placeholder}
        rows={5}
      ></textarea>
      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default TextArea
