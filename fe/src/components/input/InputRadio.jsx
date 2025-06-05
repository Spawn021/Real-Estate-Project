import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

const InputRadio = ({
  style = 'form-radio',
  label,
  id,
  register,
  errors,
  validate,
  inputClassName,
  containerClassName,
  options = [],
}) => {
  return (
    <div className={twMerge(clsx('w-full flex items-center gap-4', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}:
        </label>
      )}
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            name={id}
            id={option.value}
            value={option.value}
            className={twMerge(clsx(style, inputClassName, 'cursor-pointer'))}
            {...(register && register(id, validate))}
          />

          <label
            htmlFor={option.value}
            className="text-base font-medium text-main-700 cursor-pointer"
          >
            {option.label}
          </label>
        </div>
      ))}

      {errors && errors[id] && (
        <span className="text-sm text-red-500">
          {errors[id].message || 'This field is required'}
        </span>
      )}
    </div>
  )
}

export default InputRadio
