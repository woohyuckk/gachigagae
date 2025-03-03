import { supabase } from './supabaseClient';

const fetchLikesData = async () => {
  let { data, error } = await supabase.from('likes').select(`*`);

  if (error) {
    console.log(error);
  }

  return data;
};

export default fetchLikesData;
