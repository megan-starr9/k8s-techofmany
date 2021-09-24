import Head from 'next/head'
import { useRouter } from 'next/router'
import RegisterForm from '@techofmany/auth/components/RegisterForm';

export default function Register() {
  const router = useRouter();

  const onRegisterSuccess = () => {
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Register an Account</title>
      </Head>

      <RegisterForm onSuccess={onRegisterSuccess} />
    </div>
  );
}
