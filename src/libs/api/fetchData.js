import { supabase } from './supabaseClient';

/**
 * * 장소 목록을 가져오는 함수
 * @returns {Object[]} 응답 데이터 배열 (장소 목록)
 *    { address, category1, category2, charge, coordinates, created_at, description, id, image, tel, title, url }
 */
const fetchPlacesData = async () => {
  const { data, error } = await supabase.from('places').select(`*`);
  if (error) {
    throw error;
  }
  return data;
};

export default fetchPlacesData;
