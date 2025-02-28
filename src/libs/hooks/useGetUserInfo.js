import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../../stores/useAuthstore';
import { supabase } from '../api/supabaseClient';

const getUserInfo = async (authId) => {
  let { data, error } = await supabase
    .from('users')
    .select('nickname, profile_img_url')
    .eq('id', authId);

  if (error) {
    throw new Error(error);
  }

  return data[0];
};

const useGetUserInfo = () => {
  const userId = useAuthStore((state) => state.userInfo.id);

  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });
};

export default useGetUserInfo;
