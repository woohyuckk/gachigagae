import { useMutation } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';

export const useAuthMutate = () => {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  const { mutate: signUp } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await supabase.auth.signUp({ email, password });
      return data;
    },
  });

  const { mutate: loginUserInfo } = useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await supabase.from('users').select('*').eq('id', id).single();
      return data;
    },
    onSuccess: (data) => {
      const { id, email, nickname, profile_img_url } = data;
      setUserInfo({ id, email, nickname, profile_img_url });
    },
  });

  const { mutate: updateUserInfo } = useMutation({
    mutationFn: async ({ nickname, email }) => {
      const { data } = await supabase
        .from('users')
        .update({ nickname })
        .eq('email', email)
        .select()
        .single();
      return data;
    },
    onSuccess: (data) => {
      const { id, nickname, email } = data;
      setUserInfo({ id, email, nickname });
    },
  });

  return { signUp, updateUserInfo, loginUserInfo };
};
