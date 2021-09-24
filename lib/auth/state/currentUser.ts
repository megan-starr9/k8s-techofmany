import { atom } from 'recoil';

const currentUserState = atom({
  key: 'currentUserState',
  default: null,
});

export default currentUserState;
