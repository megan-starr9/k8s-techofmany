import Head from 'next/head'
import { useRouter } from 'next/router'
import LoginForm from '@techofmany/auth/components/LoginForm';

export default function Login() {
  const router = useRouter();

  const onLoginSuccess = () => {
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <LoginForm onSuccess={onLoginSuccess} />
    </div>
  );
}
