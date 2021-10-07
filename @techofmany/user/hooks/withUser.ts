import {
  useEffect,
  useState,
} from 'react';
import { getUser } from '../service';
import type { User } from '../types/User';

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
