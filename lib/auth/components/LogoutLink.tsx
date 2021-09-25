import React from 'react';
import { useSetRecoilState } from 'recoil';
import currentUserState from '../state/currentUser';
import { logoutUser } from '../service';

type LogoutLinkProps = {
  onSuccess?: () => void;
  onFailure?: (e: Error) => void;
};

export default function LogoutLink({
  onSuccess,
  onFailure,
}: LogoutLinkProps) {
  const setCurrentUser = useSetRecoilState(currentUserState);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      onSuccess && onSuccess();
    } catch(e) {
      onFailure(e);
    }
  };

  return (
    <button onClick={handleLogout}>
      Sign Out
    </button>
  );
}
