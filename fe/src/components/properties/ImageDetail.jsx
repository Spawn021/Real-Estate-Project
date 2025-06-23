import { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import { FaChevronRight, FaChevronLeft, FaPlay, FaPause } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { BsFullscreen } from 'react-icons/bs'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import clsx from 'clsx'
import { useModalStore } from '@/store/useModalStore'

const ImageDetail = ({ images = [], startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex + 1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const { setModal } = useModalStore()
  const handle = useFullScreenHandle()
  const sliderRef = useRef(null)
  const intervalRef = useRef(null)
  const autoplaySpeed = 2000

  const NextArrow = ({ onClick, resetProgress }) => (
    <div
      className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 cursor-pointer text-white"
      onClick={() => {
        onClick()
        if (isPlaying) resetProgress()
      }}
    >
      <FaChevronRight size={30} />
    </div>
  )

  const PrevArrow = ({ onClick, resetProgress }) => (
    <div
      className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 cursor-pointer text-white"
      onClick={() => {
        onClick()
        if (isPlaying) resetProgress()
      }}
    >
      <FaChevronLeft size={30} />
    </div>
  )
  const resetProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    setProgressKey((prev) => prev + 1)

    intervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext()
        setProgressKey((prev) => prev + 1)
      }
    }, autoplaySpeed)
  }

  const settings = {
    customPaging: (i) => (
      <img
        src={images[i]}
        alt={`Thumb ${i + 1}`}
        className="w-full h-full object-cover rounded-lg border"
      />
    ),
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots slick-thumb',
    afterChange: (index) => setCurrentIndex(index + 1),
    nextArrow: <NextArrow resetProgress={resetProgress} />,
    prevArrow: <PrevArrow resetProgress={resetProgress} />,
  }

  const toggleFullScreen = () => {
    handle.active ? handle.exit() : handle.enter()
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (isPlaying) {
      resetProgress()
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  return (
    <FullScreen handle={handle}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[rgba(0,0,0,0.7)] w-screen h-screen flex flex-col gap-4"
      >
        <div className="h-[4px] bg-gray-700 w-full relative overflow-hidden">
          {isPlaying && (
            <div
              key={progressKey}
              className="h-full bg-red-600 absolute left-0 top-0 animate-slide-progress"
              style={{ animationDuration: `${autoplaySpeed}ms` }}
            />
          )}
        </div>

        <div className="flex justify-between items-center my-4 px-4">
          <div className="text-white text-xl font-bold">
            {currentIndex}/{images.length}
          </div>
          <div className="flex items-center gap-5">
            {isPlaying ? (
              <FaPause
                className="text-white text-[20px] cursor-pointer"
                onClick={togglePlay}
              />
            ) : (
              <FaPlay
                className="text-white text-[20px] cursor-pointer"
                onClick={togglePlay}
              />
            )}
            <BsFullscreen
              className="text-white text-[20px] cursor-pointer"
              onClick={toggleFullScreen}
            />
            <IoMdCloseCircleOutline
              className="text-white text-[30px] cursor-pointer"
              onClick={() => setModal(false, null)}
            />
          </div>
        </div>

        <div className={clsx('mx-auto w-[85vw]', handle.active && 'fullscreen-mode')}>
          <Slider ref={sliderRef} {...settings}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </Slider>
        </div>
      </div>
    </FullScreen>
  )
}

export default ImageDetail
