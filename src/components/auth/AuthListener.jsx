import React, { useEffect } from 'react';
import { supabase } from '../../libs/api/supabaseClient';
import useAuthStore from '../../stores/useAuthstore';
import useGetUserInfo from '../../libs/hooks/useGetUserInfo';

const AuthListener = () => {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);
  const logout = useAuthStore((state) => state.logout);
  const { data: userData, isPending, Error } = useGetUserInfo();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session) {
        const userInfo = {
          id: session.user.id,
          email: session.user.email,
          nickname: userData?.nickname || '',
          profile_img_url: userData?.profile_img_url || '',
        };

        setUserInfo(userInfo);
      } else {
        logout();
      }
    });
    // cleanUp
    return () => {
      subscription.unsubscribe();
    };
  }, [userData]); // userData 변경 시 리렌더링

  if (isPending) return <>pending...</>;
  if (Error) return <>error...</>;

  return <></>;
};

export default AuthListener;
