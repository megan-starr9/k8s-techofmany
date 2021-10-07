import React from 'react';
import Link from 'next/link'
import withSessionUser from '@techofmany/auth/hooks/withSessionUser';
import LogoutLink from '@techofmany/auth/components/LogoutLink';

import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  const currentUser = withSessionUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <ul>
          <li className={styles.link}><Link href="/">Home</Link></li>
          <li className={styles.link}><Link href="/users">Users</Link></li>
        </ul>
        <ul>
          {currentUser && (
            <>
              <li className={styles.link}>
                <Link href={`/user/profile/${currentUser.id}`}>{currentUser.username}</Link>
              </li>
              <li className={styles.link}><LogoutLink /></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
