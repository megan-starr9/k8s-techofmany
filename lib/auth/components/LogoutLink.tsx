import React from 'react';
import {
  useSetRecoilState
} from 'recoil';
import { logoutUser } from '../service';
import currentUserState from '../state/currentUser';

type LogoutLinkProps = {
  onLogout: () => void;
};

export default function LogoutLink({
  onLogout,
}: LogoutLinkProps) {
  const setCurrentUser = useSetRecoilState(currentUserState);

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    onLogout && onLogout();
  };

  return (
    <button onClick={handleLogout}>
      Sign Out
    </button>
  );
}
