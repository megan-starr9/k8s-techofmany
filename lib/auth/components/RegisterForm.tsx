import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../service';

type RegisterData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export default function RegisterForm({
  onSuccess,
}: RegisterFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterData>();
  const onSubmit = async data => {
    await registerUser(data);
    onSuccess && onSuccess();
  };
  const currentPassword = watch('password');

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
