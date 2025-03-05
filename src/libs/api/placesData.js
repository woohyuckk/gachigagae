import { supabase } from './supabaseClient';

/**
 * * 장소 목록을 가져오는 함수
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @param {number} placeId - 장소의 id
 * @returns {Object[]} 응답 데이터 (장소 한개)
 *    { address, category1, category2, charge, coordinates, created_at, description, id, image, is_liked, tel, title, url }
 */
const fetchPlaceInfo = async (userId, placeId) => {
  let query = userId
    ? supabase.rpc('get_places_with_likes', {
        user_id: userId,
      })
    : supabase.from('places').select(`*`);

  // 데이터 불러오기
  const { data: places, error } = await query.eq('id', placeId).single();

  if (error) {
    throw error;
  }

  return places;
};

export default fetchPlaceInfo;
