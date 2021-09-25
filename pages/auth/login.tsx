import Head from 'next/head'
import LoginForm from '@techofmany/auth/components/LoginForm';

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <LoginForm />
    </div>
  );
}
