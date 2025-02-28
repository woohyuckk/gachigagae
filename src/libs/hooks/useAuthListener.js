import { useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';

const useAuthListener = () => {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    // 인증 상태 변경 감지 및 자동 업데이트
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const userInfo = {
        id: session?.user.id,
        email: session?.user.email,
      };

      // 즉시 실행 함수 : public.users 추가 정보 가져오기
      (async () => {
        const { data } = await supabase
          .from('users')
          .select('nickname, profile_img_url')
          .eq('id', userInfo.id);
        const extraInfo = data[0];
        const { nickname, profile_img_url } = extraInfo;
        userInfo['nickname'] = nickname || '';
        userInfo['profile_img_url'] = profile_img_url || '';
        setUserInfo(userInfo); // userInfo set
      })();
    });

    return () => {
      subscription.unsubscribe(); // Cleanup when unmounting
    };
  }, []);
};

export default useAuthListener;
