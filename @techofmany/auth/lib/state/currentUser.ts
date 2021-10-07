import {
  atom
} from 'recoil';
import type { User } from '../../types/User';

export type UserState = User | null;

const currentUserState = atom<UserState>({
  key: 'currentUserState',
  default: null,
});

export default currentUserState;
