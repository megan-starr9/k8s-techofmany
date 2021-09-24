import { useEffect } from 'react';
import {
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import currentUserState from '../state/currentUser';
import { getCurrentUser } from '../service';

/**
 * Access the current session user within the client
 */
export default function withUser() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const stateUser = useRecoilValue(currentUserState);

  useEffect(() => {
    if (!stateUser) {
      getCurrentUser().then((user) => {
        setCurrentUser(user);
      });
    }
  }, []);

  return stateUser;
}
