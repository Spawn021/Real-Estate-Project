import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const InputSelect = ({
  style = 'form-select',
  label,
  id,
  type = 'text',
  register,
  errors,
  validate,
  inputClassName,
  containerClassName,
  placeholder,
  options = [],
}) => {
  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}
        </label>
      )}
      <select
        id={id}
        type={type}
        className={twMerge(clsx(style, inputClassName))}
        {...(register && register(id, validate))}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default InputSelect
