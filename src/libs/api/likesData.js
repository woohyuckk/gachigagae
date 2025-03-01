import { supabase } from './supabaseClient';

/**
 * * 좋아요 목록을 불러오는 함수
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object[]} 응답 데이터 배열 (유저의 좋아요 목록) { created_at, id, place_id, user_id }
 */
export const fetchLikes = async (userId) => {
  const { data, error } = await supabase.from('likes').select(`*`).eq('user_id', userId);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * * 좋아요를 추가하는 함수
 * @param {Object} props
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
