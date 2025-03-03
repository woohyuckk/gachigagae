import homeUtils from '../utils/homeUtils';
import { supabase } from './supabaseClient';

/**
 * * 장소 목록을 가져오는 함수
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @param {string} category - 현재 페이지의 category ('Restaurant', 'Cafe' 또는 null)
 * @returns {Object[]} 응답 데이터 배열 (장소 목록)
 *    { address, category1, category2, charge, coordinates, created_at, description, id, image, is_liked, tel, title, url }
 */
const fetchPlacesData = async (userId, category) => {
  let query = userId
    ? supabase.rpc('get_places_with_likes', {
        user_id: userId,
      })
    : supabase.from('places').select(`*`);

  // 카테고리 있을 경우 eq 쿼리 추가
  if (category) {
    const catogoryName = homeUtils.translateCategoryName(category);
    query = query.eq('category2', catogoryName);
  }

  // 데이터 불러오기
  const { data: places, error } = await query;

  if (error) {
    throw error;
  }

  return places;
};

export default fetchPlacesData;
