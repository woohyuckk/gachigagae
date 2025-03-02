import HOME_CONSTANT from '../../constants/homeConstant';
import { supabase } from './supabaseClient';

const fetchPlacesData = async ({ pageParam = null, category2 }) => {
  let response = supabase.from('places').select('*').order('id', { ascending: false }).limit(8);

  // 카테고리가 Home이 아닐 경우 Category2가져오기
  if (category2 !== HOME_CONSTANT.CATEGORY_HOME) {
    response = response.eq('category2', category2);
  }

  if (pageParam) {
    response = response.lt(`id`, pageParam.id);
  }

  const { data, error } = await response;

  if (error) {
    console.log(error);
  }

  return data;
};

const fetchData = {
  fetchPlacesData,
};

export default fetchData;
