import { useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';

const useAuthListener = () => {
  const setUserInfo = useAuthStore().setUserInfo;

  useEffect(() => {
    // 인증 상태 변경 감지 및 자동 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const userInfo = {
        id: session?.user.id,
        email: session?.user.email,
      };

      //  public.users 추가 정보 가져오기 (nickname, profile_img_url) ---> tanstack 수정 필요
      async function getExtraUserInfo(userId) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('nickname, profile_img_url')
            .eq('id', userId);

          if (error) {
            throw new Error(error);
          }

          return {
            nickname: data.nickname || '',
            profile_img_url: data.profile_img_url || '',
          };
        } catch (error) {
          console.error('Error fetching user info from public.users:', error.message);
          return { nickname: '', profile_img_url: '' };
        }
      }

      if (session?.user.id) {
        const { nickname, profile_img_url } = getExtraUserInfo(session.user.id);
        userInfo.nickname = nickname;
        userInfo.profile_img_url = profile_img_url;
      }

      setUserInfo(userInfo);
      return () => {
        subscription.unsubscribe(); // Cleanup when unmounting
      };
    });
  }, []);
};

export default useAuthListener;
