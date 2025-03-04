import { supabase } from './supabaseClient';

/**
 * * 좋아요한 장소 목록을 불러오는 함수
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object[]} 응답 데이터 배열 (place 배열)
 */
export const fetchLikePlaces = async (userId) => {
  if (!userId) {
    throw new Error('로그인이 필요합니다.');
  }
  // 데이터 불러오기
  const { data: places, error } = await supabase
    .rpc('get_places_with_likes', {
      user_id: userId,
    })
    .eq('is_liked', true);
  if (error) {
    throw error;
  }
  return places;
};

/**
 * * 좋아요를 추가하는 함수
 * @param {number} props.userId - 유저의 id
 * @param {number} props.placeId - 장소의 id
 */
export const addLikes = async ({ userId, placeId }) => {
  const data = { user_id: userId, place_id: placeId };
  const { error } = await supabase.from('likes').insert(data);
  if (error) {
    throw error;
  }
};

/**
 * * 좋아요를 삭제하는 함수
 * @param {number} props.userId - 유저의 id
 * @param {number} props.placeId - 장소의 id
 */
export const deleteLikes = async ({ userId, placeId }) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId);
  if (error) {
    throw error;
  }
};
