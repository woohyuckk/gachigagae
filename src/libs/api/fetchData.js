import homeUtils from '../utils/homeUtils';
import { supabase } from './supabaseClient';

const fetchPlacesData = async ({ pageParam = null, category2, userId }) => {
  let query = userId
    ? supabase
        .rpc('get_places_with_likes', {
          user_id: userId,
        })
        .order('id', { ascending: false })
        .limit(8)
    : supabase.from('places').select('*').order('id', { ascending: false }).limit(8);

  if (category2) {
    const catogoryName = homeUtils.translateCategoryName(category2);
    query = query.eq('category2', catogoryName);
  }

  if (pageParam) {
    query = query.lt(`id`, pageParam.id);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};

const fetchData = {
  fetchPlacesData,
};

export default fetchData;
