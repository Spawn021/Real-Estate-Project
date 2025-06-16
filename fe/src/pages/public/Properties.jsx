import { apiGetProperties } from '@/apis/property'
import {
  Breadcrumb,
  Button,
  CardProperty,
  InputSelect,
  Pagination,
  Search,
} from '@/components'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CiBoxList } from 'react-icons/ci'
import { useModalStore } from '@/store/useModalStore'
import withRouter from '@/hocs/withRouter'

const Properties = ({ location, navigate }) => {
  const [properties, setProperties] = useState([])
  const [meta, setMeta] = useState({})
  const [mode, setMode] = useState('ALL')
  const [searchParams, setSearchParams] = useSearchParams()

  const { register, watch } = useForm()
  const params = Object.fromEntries([...searchParams])
  const sort = watch('sort')
  useEffect(() => {
    const fetchProperties = async (params) => {
      const response = await apiGetProperties({
        limit: import.meta.env.VITE_LIMIT,
        ...params,
      })
      if (response.success) {
        setProperties(response.properties)
        setMeta(response.meta || {})
      } else {
        toast.error(response.message || 'Failed to fetch properties')
        setProperties([])
        setMeta({})
      }
    }
    if (sort) {
      setSearchParams({ ...params, sort })
    }
    fetchProperties(params)
  }, [searchParams, sort])

  const handlePageChange = (page) => {
    setSearchParams({ ...params, page: String(page) })
  }
  const { setModal } = useModalStore()
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src="/properties.png" alt="Properties" className="w-full h-auto" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <h1 className="text-white text-3xl font-bold">Properties</h1>
          <div className="text-gray-200">
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-24">
        <div className="my-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-10">
            <div onClick={() => setModal(true, <Search direction="vertical" />)}>
              <CiBoxList className="text-2xl text-gray-500 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
              <span>Sort by: </span>
              <InputSelect
                id="sort"
                register={register}
                placeholder={'Select'}
                containerClassName="w-[8em] "
                inputClassName="rounded-md border-none hover:border-none focus:border-none focus:ring-0 cursor-pointer"
                options={[
                  { value: 'name', label: 'A - Z' },
                  { value: '-name', label: 'Z - A' },
                  { value: 'createdAt', label: 'Newest' },
                  { value: '-createdAt', label: 'Lastest' },
                ]}
              />
            </div>
            <Button onClick={() => navigate(location.pathname)}>Reset Filter</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setMode('ALL')}
              className={twMerge(
                clsx(
                  'bg-transparent text-black border-none',
                  mode === 'ALL' && 'font-bold',
                ),
              )}
            >
              All Properties
            </Button>
            <Button
              onClick={() => setMode('SALE')}
              className={twMerge(
                clsx(
                  'bg-transparent text-black border-none',
                  mode === 'SALE' && 'font-bold',
                ),
              )}
            >
              For Sale
            </Button>
            <Button
              onClick={() => setMode('RENT')}
              className={twMerge(
                clsx(
                  'bg-transparent text-black border-none',
                  mode === 'RENT' && 'font-bold',
                ),
              )}
            >
              For Rent
            </Button>
          </div>
        </div>
        {properties.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {properties.map((el, index) => (
              <CardProperty key={index} properties={el} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <span className="text-gray-500">No properties found</span>
          </div>
        )}
        {meta.totalPages > 1 && (
          <div className="flex items-center justify-center my-8">
            <Pagination
              totalCount={meta?.totalCount}
              totalPages={meta?.totalPages}
              currentPage={meta?.currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
const PropertiesWithRouter = withRouter(Properties)
export default PropertiesWithRouter
