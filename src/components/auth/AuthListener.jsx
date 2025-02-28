import { useEffect } from 'react';
import { supabase } from '../../libs/api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';
import useGetUserInfo from '../../libs/hooks/useGetUserInfo';

const AuthListener = () => {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const { data: userData, isPending, Error } = useGetUserInfo();

  // 초기 렌더링 시 userInfo 전역상태 세팅
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === 'INITIAL_SESSION') {
        const userInfo = {
          id: session.user.id,
          email: session.user.email,
          nickname: userData?.nickname || '',
          profile_img_url: userData?.profile_img_url || '',
        };

        setUserInfo(userInfo);
      }
    });
    // cleanUp
    return () => {
      subscription.unsubscribe();
    };
  }, [userData]); // userData 변경 시 리렌더링

  if (isPending) return;
  if (Error) return;

  return <></>;
};

export default AuthListener;
