import { supabase } from './supabaseClient';

/**
 * * 유저 id를 받아 좋아요 목록을 불러오는 함수
 * @param {string} userId - 현재 로그인한 유저의 uuid
 * @returns {Object[]} 응답 데이터 배열 (유저의 좋아요 목록) { created_at, id, place_id, user_id }
 */
const fetchLikes = async (userId) => {
  const { data, error } = await supabase.from('likes').select(`*`).eq('user_id', userId);
  if (error) {
    throw error;
  }
  return data;
};

export default fetchLikes;
