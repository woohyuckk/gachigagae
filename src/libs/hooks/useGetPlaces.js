import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DETAIL_QUERY_KEY } from '../../constants/queryKeyConstants';
import fetchPlaceInfo from '../api/placesData';

export const useGetPlaceInfo = (userId) => {
  const { id } = useParams();
  const idNumber = Number(id);

  const placeInfo = useQuery({
    queryKey: DETAIL_QUERY_KEY.PLACE_PLACE_ID(idNumber),
    queryFn: () => fetchPlaceInfo(userId, idNumber),
  });
  return placeInfo;
};

export default useGetPlaceInfo;
