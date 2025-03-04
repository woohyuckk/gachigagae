import { useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import MapOverlay from './MapOverlay';
/**
 *
 * @param {boolean} isOverlayOpen
 * @param {number}  : latitude, longitude
 * @returns
 */
const KaKaoMap = ({ latitude, longitude, placeInfo=null }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  useKakaoLoader();

  const centerPosition = {
    lat: latitude,
    lng: longitude,
  };

  const handleOverlayToggle = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <div className="w-full h-72 ">
      <Map
        center={centerPosition}
        className="w-full h-full object-cover rounded-lg shadow-md  cursor-pointer"
        level={2}
      >
        <MapMarker position={{ lat: latitude, lng: longitude }} onClick={handleOverlayToggle} />

        {isOverlayOpen && (
          <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
            <MapOverlay placeInfo={placeInfo} handleOverlayToggle={handleOverlayToggle} />
          </CustomOverlayMap>
        )}

        <ZoomControl position={'RIGHT'} />
      </Map>
    </div>
  );
};

export default KaKaoMap;
