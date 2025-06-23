import clsx from 'clsx'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../commons/Button'
import { HiMiniViewfinderCircle } from 'react-icons/hi2'
import { useModalStore } from '@/store/useModalStore'
import ImageDetail from './ImageDetail'
const TopImage = ({ images = [] }) => {
  const { setModal } = useModalStore()
  const handleOpenImageDetail = (index = 0) => {
    setModal(true, <ImageDetail images={images} startIndex={index} />)
  }
  return (
    <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 relative">
      <img
        src={images[0]}
        alt={`Property Image 1`}
        className="w-full h-full object-cover rounded-l-lg  col-span-2 row-span-2 cursor-pointer"
        onClick={() => handleOpenImageDetail(0)}
      />
      {images.slice(1, 5).map((image, index) => (
        <div
          key={index}
          className="w-full h-full relative"
          onClick={() => handleOpenImageDetail(index + 1)}
        >
          <img
            src={image}
            alt={`Property Image ${index + 2}`}
            className={twMerge(
              clsx(
                'w-full h-full object-cover cursor-pointer',
                index === 1 && 'rounded-tr-lg',
                index === 3 && 'rounded-br-lg',
              ),
            )}
          />
        </div>
      ))}
      <div className="absolute bottom-4 right-4 ">
        <Button
          onClick={() => setModal(true, <ImageDetail images={images} />)}
          className="bg-white border-main-600 text-main-600 font-bold flex items-center gap-2 hover:bg-main-600 hover:text-white transition-colors"
        >
          <HiMiniViewfinderCircle />
          <span>View All Images</span>
        </Button>
      </div>
    </div>
  )
}

export default memo(TopImage)
