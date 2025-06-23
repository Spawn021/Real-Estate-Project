import { apiGetLongtitudeAndLatitude } from '@/apis/beyond'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const Map = ({ address = '', zoom = 12 }) => {
  const [center, setCenter] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchCenter = async () => {
      setIsLoading(true)
      if (address) {
        const response = await apiGetLongtitudeAndLatitude(address)
        setIsLoading(false)
        if (response.status === 200 && response.data.features.length > 0) {
          setCenter([
            response.data.features[0]?.geometry?.coordinates[1],
            response.data.features[0]?.geometry?.coordinates[0],
          ])
        } else {
          window.navigator.geolocation.getCurrentPosition(
            (position) => {
              setCenter([position.coords.latitude, position.coords.longitude])
            },
            (error) => {
              console.error('Error getting location:', error)
            },
          )
        }
      } else {
        setIsLoading(false)
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter([position.coords.latitude, position.coords.longitude])
          },
          (error) => {
            console.error('Error getting location:', error)
          },
        )
      }
    }
    fetchCenter()
  }, [address])

  return (
    <div className="w-full h-[400px]">
      {isLoading ? (
        <CgSpinner className="animate-spin text-main-700" size={24} />
      ) : (
        center &&
        center.length > 0 && (
          <MapContainer
            key={center.join(',')}
            center={center}
            zoom={zoom}
            className="w-full h-full"
          >
            <TileLayer url={url} attribution={attribution} />
            <Marker position={center}>
              <Popup>{address ? address : 'Your current location'}</Popup>
            </Marker>
          </MapContainer>
        )
      )}
    </div>
  )
}

export default Map
