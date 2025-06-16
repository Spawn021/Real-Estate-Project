import Button from '../commons/Button'
import InputField from '../input/InputField'
import SearchItem from './SearchItem'
import { useForm } from 'react-hook-form'
import SelectLib from '../input/SelectLib'
import { usePropertyStore } from '@/store/usePropertyStore'
import { AiOutlineDown } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import withRouter from '@/hocs/withRouter'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'
import { useModalStore } from '@/store/useModalStore'
import qs from 'qs'
import { useSearchParams } from 'react-router-dom'
const Search = ({ navigate, direction = 'horizontal' }) => {
  const { register, handleSubmit, setValue, watch } = useForm()
  const [showPrice, setShowPrice] = useState(false)
  const { propertyTypes } = usePropertyStore()
  const { setModal } = useModalStore()
  const [searchParams] = useSearchParams()
  let params = Object.fromEntries([...searchParams])
  const rawQuery = new URLSearchParams(params).toString()
  params = qs.parse(rawQuery)

  useEffect(() => {
    if (params.address) {
      setValue('address', params.address)
    }
    if (params.propertyTypeId) {
      console.log(params.propertyTypeId)
      const propertyType = propertyTypes.find((type) => type.id === params.propertyTypeId)
      if (propertyType) {
        setValue('propertyType', {
          value: propertyType.id,
          label: propertyType.name,
          image: propertyType.image,
        })
      }
    }
    if (params.price) {
      if (params.price.gte) setValue('start', params.price.gte)
      if (params.price.lte) setValue('end', params.price.lte)
    }
  }, [propertyTypes, setValue])

  const onSubmit = (data) => {
    const { address, propertyType, start, end } = data
    const params = {}
    if (address) {
      params.address = address
    }
    if (propertyType) {
      params.propertyTypeId = propertyType.value
    }
    if (start || end) {
      params.price = {}
      if (start) params.price.gte = +start
      if (end) params.price.lte = +end
    }
    const queryString = qs.stringify(params, { encode: false })
    if (direction === 'vertical') setModal(false, null)
    navigate({
      pathname: '/properties',
      search: queryString,
    })
  }
  return (
    <form
      className={twMerge(
        clsx(
          ' bg-white rounded-md drop-shadow border mt-[-64px] z-20 relative py-8 gap-4',
          direction === 'vertical'
            ? 'flex flex-col w-[500px]'
            : 'grid grid-cols-4 w-[1096px] h-[128px] mx-auto',
        ),
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchItem
        title="Locations"
        className={direction === 'vertical' ? 'items-start justify-start' : ''}
      >
        <InputField
          id="address"
          register={register}
          placeholder="Type your require location"
          containerClassName="w-full"
          inputClassName="rounded-md "
        />
      </SearchItem>
      <SearchItem
        title="Propety Types"
        className={direction === 'vertical' ? 'items-start justify-start' : ''}
      >
        <SelectLib
          id="propertyType"
          register={register}
          placeholder="Select property type"
          containerClassName="w-full"
          value={watch('propertyType')}
          inputClassName="rounded-md border-none hover:border-none focus:border-none focus:ring-0"
          options={propertyTypes?.map((type) => ({
            value: type.id,
            label: type.name,
            image: type.image,
          }))}
          onChange={(option) => setValue('propertyType', option)}
        />
      </SearchItem>
      {direction === 'horizontal' ? (
        <SearchItem
          title="Rent Range"
          className={direction === 'vertical' ? 'items-start justify-start' : ''}
        >
          <Button
            onClick={() => setShowPrice(!showPrice)}
            className="bg-white text-main-700 rounded-md flex items-center justify-between px-4 py-2 w-full"
          >
            <span>Select rent range</span>
            <AiOutlineDown />
          </Button>
          {showPrice && (
            <div className="absolute top-full right-0 left-0 bg-white p-4 mx-4 rounded-md border shadow-lg ">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Type your price</span>

                <div className="flex items-center justify-center gap-4">
                  <InputField
                    id="start"
                    register={register}
                    placeholder="Min Price"
                    inputClassName="rounded-md w-full placeholder:text-sm  "
                  />
                  <InputField
                    id="end"
                    register={register}
                    placeholder="Max Price"
                    inputClassName="rounded-md w-full placeholder:text-sm "
                  />
                </div>
              </div>
            </div>
          )}
        </SearchItem>
      ) : (
        <div className="flex flex-col gap-2 px-4">
          <span className="font-semibold text-main-700">Rent Range</span>

          <div className="flex items-center justify-center gap-4">
            <InputField
              id="start"
              register={register}
              placeholder="Min Price"
              inputClassName="rounded-md w-full"
            />
            <InputField
              id="end"
              register={register}
              placeholder="Max Price"
              inputClassName="rounded-md w-full "
            />
          </div>
        </div>
      )}
      <div className="flex justify-center items-center">
        <Button onClick={handleSubmit(onSubmit)}>Search</Button>
      </div>
    </form>
  )
}
const SearchWithRouter = withRouter(Search)
export default SearchWithRouter
