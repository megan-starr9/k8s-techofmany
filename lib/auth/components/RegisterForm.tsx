import React, {
  useEffect,
} from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import currentUserState from '../state/currentUser';
import { emailAuthentication } from '../service';
import type { UserRegister } from '../types/Forms';

type RegisterFormProps = {
  onSuccess?: () => void;
  onFailure?: (e: Error) => void;
  successRedirect?: string;
};

function RegisterForm({
  onSuccess,
  onFailure,
  successRedirect,
}: RegisterFormProps) {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserRegister>();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const currentPassword = watch('password');

  const onSubmit = async (data: UserRegister) => {
    try {
      const newUser = await emailAuthentication(data);
      setCurrentUser(newUser);
      onSuccess && onSuccess();
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

      <label htmlFor="email">Email</label>
      <input type="email" {...register('email', { required: true })} />
      {errors.email && <span>You must enter a valid email.</span>}

      <label htmlFor="password">Password</label>
      <input type="password" {...register('password', { required: true })} />
      {errors.password && <span>You must enter a valid password.</span>}

      <label htmlFor="passwordConfirm">Password Confirmation</label>
      <input type="passwordConfirm" {...register('passwordConfirm', {
        validate: (value) => value === currentPassword,
      })} />
      {errors.passwordConfirm && <span>Passwords must match.</span>}

      <input type="submit" value="Submit" />
    </form>
  );
}

RegisterForm.defaultProps = {
  onFailure: (e) => console.log(e),
  successRedirect: '/',
};

export default RegisterForm;
