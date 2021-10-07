import React, {
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { emailAuthentication } from '../../service';
import currentUserState from '../../lib/state/currentUser';
import type { UserLogin } from '../../types/Forms';

type LoginFormProps = {
  onSuccess?: () => void;
  onFailure?: (e: Error) => void;
  successRedirect?: string;
};

function LoginForm({
  onSuccess,
  onFailure,
  successRedirect,
}: LoginFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const onSubmit = async (data: UserLogin) => {
    try {
      const user = await emailAuthentication(data);
      setCurrentUser(user);
      onSuccess();
    } catch(e) {
      onFailure(e);
    }
  };

  useEffect(() => {
    currentUser && router.push(successRedirect);
  }, [currentUser]);

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

LoginForm.defaultProps = {
  onSuccess: () => {},
  onFailure: (e) => console.log(e),
  successRedirect: '/',
};

export default LoginForm;
