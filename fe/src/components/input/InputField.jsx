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
  required = false,
  readOnly,
}) => {
  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}
          {required && <sup className="text-red-500">*</sup>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={twMerge(
          clsx(
            style,
            'placeholder:text-[16px]',
            inputClassName,
            readOnly && 'bg-gray-300 cursor-not-allowed focus:ring-0',
          ),
        )}
        {...(register && register(id, validate))}
        placeholder={placeholder}
        readOnly={readOnly}
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
