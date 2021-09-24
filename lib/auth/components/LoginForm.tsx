import React from 'react';
import {
  useSetRecoilState
} from 'recoil';
import { useForm } from 'react-hook-form';
import { loginUser } from '../service';
import currentUserState from '../state/currentUser';

type LoginData = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export default function LoginForm({
  onSuccess,
}: LoginFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const onSubmit = async data => {
    await loginUser(data);
    setCurrentUser(data);
    onSuccess && onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Login</label>
      <input {...register('username', { required: true })} />
      {errors.username && <span>You must enter a valid login.</span>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password', { required: true })} />
      {errors.password && <span>You must enter a valid password.</span>}

      <input type="submit" value="Submit" />
    </form>
  );
}
