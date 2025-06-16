import clsx from 'clsx'
import Select from 'react-select'
import { twMerge } from 'tailwind-merge'

const SelectLib = ({
  label,
  id,
  register,
  errors,
  validate,
  containerClassName,
  placeholder,
  options = [],
  onChange,
  value,
}) => {
  return (
    <div className={twMerge(clsx('w-full flex flex-col gap-2', containerClassName))}>
      {label && (
        <label htmlFor={id} className="text-base font-medium text-main-700">
          {label}
        </label>
      )}
      <Select
        id={id}
        value={value}
        options={options}
        placeholder={placeholder}
        isClearable
        {...(register && register(id, validate))}
        isSearchable
        onChange={(option) => {
          if (onChange) {
            onChange(option)
          }
        }}
        formatOptionLabel={(option) => (
          <div className="flex items-center px-3">
            <img
              src={option.image}
              alt={option.label}
              className="w-6 h-6 mr-2 rounded-full"
            />
            <span className="text-sm">{option.label}</span>
          </div>
        )}
        className={{
          control: () => clsx(''),
          option: () => clsx(''),
          input: () => clsx(''),
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

export default SelectLib
