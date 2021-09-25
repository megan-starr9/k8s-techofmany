import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import currentUserState, {
  UserState,
} from '../state/currentUser';
import { getSessionUser } from '../service';

/**
 * Access the current session user within the client
 */
export default function withSessionUser(): UserState {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    if (!currentUser) {
      getSessionUser().then((user) => {
        setCurrentUser(user);
      });
    }
  }, []);

  return currentUser;
}
