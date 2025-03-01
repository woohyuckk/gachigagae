import { supabase } from './supabaseClient';

const fetchPlacesData = async () => {
  let { data, error } = await supabase.from('places').select(`*`).limit(8);

  if (error) {
    console.log(error);
  }

  return data;
};

const fetchLimitPlacesData = async ({ pageParam = null }) => {
  let response = supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(10);

  if (pageParam) {
    response = response
      .lt('created_at', pageParam.created_at)
      .or(`created_at.eq.${pageParam.created_at}, id.lt.${pageParam.id}`);
  }
  // console.log(pageParam);

  const { data, error } = await response;
  console.log(data);

  if (error) {
    console.log(error);
  }

  return data;
};

const fetchData = {
  fetchPlacesData,
  fetchLimitPlacesData,
};

export default fetchData;
