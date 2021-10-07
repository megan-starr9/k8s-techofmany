import Head from 'next/head'
import RegisterForm from '@techofmany/auth/components/RegisterForm';

export default function Register() {
  return (
    <div>
      <Head>
        <title>Register an Account</title>
      </Head>

      <RegisterForm />
    </div>
  );
}
