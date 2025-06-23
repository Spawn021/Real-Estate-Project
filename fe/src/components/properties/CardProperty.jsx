import { formatPrice } from '@/utils/helper'
import { IoBedOutline } from 'react-icons/io5'
import { PiBathtub } from 'react-icons/pi'
import { SlSizeFullscreen } from 'react-icons/sl'
import { IoShareSocialOutline } from 'react-icons/io5'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { path } from '@/utils/path'

const CardProperty = ({ properties }) => {
  return (
    <Link to={`/${path.PROPERTIES}/${properties.id}`} className="border rounded-md ">
      <img
        src={properties.featureImage}
        alt={properties.name}
        className="w-full h-[240px] object-cover rounded-t-md"
      />
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-[18px] uppercase text-gray-700 hover:underline">
          {properties?.name}
        </h1>
        <span className="text-main-500 text-sm font-semibold">
          {formatPrice(properties?.price)}
        </span>
        <div className="flex items-center gap-3 text-gray-500 text-sm border-b pb-2">
          <div className="flex items-center gap-1">
            <IoBedOutline />
            <span>{properties?.bedRoom}</span>
          </div>
          <div className="flex items-center gap-1">
            <PiBathtub />
            <span>{properties?.bathRoom}</span>
          </div>
          <div className="flex items-center gap-1">
            <SlSizeFullscreen />
            <span>{properties?.propertySize} ft</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <img
              src={properties?.postedByUser?.avatar}
              alt={properties?.postedByUser?.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-600 text-sm font-semibold">
              {properties?.postedByUser?.name}
            </span>
            <span className="px-4 py-1 bg-green-600 flex items-center justify-center text-white text-xs font-semibold rounded-md border">
              Agent
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">
              {new Date(properties?.createdAt).toLocaleDateString()}
            </span>
            <div className="flex items-center gap-1 text-gray-500">
              <IoShareSocialOutline />
              <FaRegEye />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CardProperty
