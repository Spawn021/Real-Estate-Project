import { apiGetPropertyById } from '@/apis/property'
import { BoxInfo, Breadcrumb, Map, RelatedProperties, TopImage } from '@/components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaMapLocationDot } from 'react-icons/fa6'
import DOMPurify from 'dompurify'
import { formatPrice } from '@/utils/helper'
import moment from 'moment'
const PropertyDetail = () => {
  const { pid } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      const response = await apiGetPropertyById(pid)
      if (response.success) {
        setProperty(response.property)
      }
    }
    const fetchRelatedProperties = async () => {
      const response = await apiGetPropertyById(pid)
      if (response.success) {
        setProperty(response.property)
      }
    }

    fetchPropertyDetail()
  }, [pid])
  useEffect(() => {}, [property])

  const InforCell = ({ label, value }) => (
    <tr>
      <td className="border p-3 text-center font-medium">{label}</td>
      <td className="border p-3 text-center">{value}</td>
    </tr>
  )
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src="/properties.png" alt="Properties" className="w-full h-auto" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <h1 className="text-white text-3xl font-bold">Properties</h1>
          <div className="text-gray-200">
            <Breadcrumb title={property?.name} />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-24">
        {property?.images && <TopImage images={property.images} />}
        <div className="grid grid-cols-10 gap-4 my-8">
          <div className="col-span-7">
            <h2 className="text-2xl font-bold mb-4 text-main-700 ">{property?.name}</h2>
            <span className="flex items-center mb-4 gap-2">
              <FaMapLocationDot className="inline-block text-main-700" />
              <p className="text-gray-700">{property?.address}</p>
            </span>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(property?.description),
              }}
              className="text-gray-700 mb-4"
            />
            <h3 className="text-lg font-semibold mb-4">Property's Information</h3>
            <table className="w-full text-gray-700 table-fixed">
              <thead>
                <tr>
                  <th className="border p-3 text-center bg-main-300 ">Characteristics</th>
                  <th className="border p-3 text-center bg-main-300 ">Value</th>
                </tr>
              </thead>
              <tbody>
                <InforCell label="Price" value={formatPrice(property?.price)} />
                <InforCell label="Size" value={`${property?.propertySize} ft`} />
                <InforCell label="Property Type" value={property?.propertyType.name} />
                <InforCell label="Bathrooms" value={property?.bathRoom} />
                <InforCell label="Bedrooms" value={property?.bedRoom} />
                <InforCell label="Build Year" value={property?.yearBuilt} />
                <InforCell label="Listing Type" value={property?.listingType} />
                <InforCell
                  label="isAvailable"
                  value={property?.isAvailable ? 'Yes' : 'No'}
                />
                <InforCell
                  label="Created At"
                  value={moment(property?.createdAt).format('DD/MM/YYYY')}
                />
              </tbody>
            </table>
            <div className="mt-8">
              {/* <Map address={property?.address} zoom={12} /> */}
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-4 ">
            <BoxInfo
              data={property?.postedByUser}
              role="Agent"
              roleStyle="text-green-600"
            />
            <BoxInfo data={property?.ownerUser} role="Owner" roleStyle="text-red-600" />
            <RelatedProperties />
          </div>
        </div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  )
}

export default PropertyDetail
