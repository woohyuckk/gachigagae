import { fetchLikes } from './likesData';
import { supabase } from './supabaseClient';

/**
 * * 장소 목록을 가져오는 함수
 * @returns {Object[]} 응답 데이터 배열 (장소 목록)
 *    { address, category1, category2, charge, coordinates, created_at, description, id, image, tel, title, url }
 */
const fetchPlacesData = async (userId) => {
  const { data: places, error } = await supabase.from('places').select(`*`);
  const likes = await fetchLikes(userId);

  if (error) {
    throw error;
  }

  // 좋아요 여부 넣은 데이터로 가공
  const placesWithLikeStuats = places.map((place) => ({
    ...place,
    isLiked: likes.some((likePlace) => likePlace.place_id === place.id),
  }));

  return placesWithLikeStuats;
};

export default fetchPlacesData;
