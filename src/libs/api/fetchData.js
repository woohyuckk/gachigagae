import { supabase } from './supabaseClient';

const fetchPlacesData = async () => {
  try {
    let { data, error } = await supabase.from('places').select(`*`);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPlacesData;
