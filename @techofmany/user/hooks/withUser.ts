import {
  useEffect,
  useState,
} from 'react';
import type { User } from '@techofmany/storage/types/User';
import { getUser } from '../service';


/**
 * Access the current session user within the client
 */
export default function withUser(id: string): User {
  const [user, setUser] = useState();

  useEffect(() => {
    id && getUser(id).then((user) => {
      setUser(user);
    });
  }, [id]);

  return user;
}
