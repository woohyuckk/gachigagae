import { supabase } from './supabaseClient';

const fetchPlacesData = async () => {
  let { data, error } = await supabase.from('places').select(`*`);

  if (error) {
    console.log(error);
  }

  return data;
};

export default fetchPlacesData;
