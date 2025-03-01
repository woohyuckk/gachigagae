import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KaKaoMap = ({ latitude, longitude }) => {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      className="w-full h-full object-cover rounded-lg shadow-md  cursor-pointer"
    >
      <MapMarker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default KaKaoMap;
