import { supabase } from './supabaseClient';

// * 유저 id를 받아 좋아요 목록을 불러오는 함수
const fetchLikes = async (userId) => {
  const { data, error } = await supabase.from('likes').select(`*`).eq('user_id', userId);
  if (error) {
    console.log(error);
  }
  return data;
};

export default fetchLikes;
