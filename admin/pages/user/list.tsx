import Head from 'next/head'
import Link from 'next/link';
import { getUserList } from '@techofmany/user/service';
import type { User } from '@techofmany/user/types/User';

type UserListPageProps = {
  users: Array<User>,
};

export async function getServerSideProps() {
  const users = await getUserList();
  return { props: { users } }
}

export default function UserListPage({
  users,
}: UserListPageProps) {
  return (
    <div>
      <Head>
        <title>Site Users</title>
      </Head>

      <ul>
        {users.map((user) => (
          <li>
            <Link href={`/user/profile/${user.id}`}>{user.username}</Link> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
