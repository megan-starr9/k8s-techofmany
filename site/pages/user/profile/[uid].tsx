import Head from 'next/head'
import { getUser } from '@techofmany/user/service';
import type { User } from '@techofmany/storage/types/User';

type ProfileProps = {
  user: User;
};

export async function getServerSideProps(context) {
  const user = await getUser(context.params.uid?.toString());
  return { props: { user } }
}

export default function Profile({
  user,
}: ProfileProps) {
  return (
    <div>
      <Head>
        <title>{user.username}'s Profile</title>
      </Head>

      <ul>
        <li>Name: {user.username}</li>
        <li>Email: {user.email}</li>
      </ul>
    </div>
  )
}
