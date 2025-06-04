import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const InputField = ({
  style = 'form-input',
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
      <input
        id={id}
        type={type}
        className={twMerge(clsx(style, 'placeholder:text-sm', inputClassName))}
        {...(register && register(id, validate))}
        placeholder={placeholder}
      ></input>
      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default InputField
