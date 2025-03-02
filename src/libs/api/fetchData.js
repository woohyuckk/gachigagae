import { supabase } from './supabaseClient';

// 충돌 방지를 위해 남겨놓았습니다
const fetchPlacesData = async () => {
  let { data, error } = await supabase.from('places').select(`*`);

  if (error) {
    console.log(error);
  }

  return data;
};

export default fetchPlacesData;
