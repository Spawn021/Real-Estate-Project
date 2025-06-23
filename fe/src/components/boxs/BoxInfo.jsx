import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const BoxInfo = ({ data, containerClassName, role, roleStyle }) => {
  return (
    <div
      className={twMerge(
        clsx('flex items-center justify-center border-b pb-4', containerClassName),
      )}
    >
      <div>
        <img
          src={data?.avatar}
          alt={data?.name}
          className="w-24 h-24 object-cover rounded-full"
        />
        <div className="flex items-center mt-2 gap-2">
          <span className={twMerge(clsx('italic', roleStyle))}>{role}:</span>
          <h3 className="text-lg font-semibold">{data?.name}</h3>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <span>Phone:</span>
          <a href={`tel:${data?.phone}`} className="text-blue-500 hover:underline">
            {data?.phone}
          </a>
        </div>
      </div>
    </div>
  )
}

export default BoxInfo
