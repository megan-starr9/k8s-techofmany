import React from 'react';
import Link from 'next/link'
import withUser from '@techofmany/auth/hooks/withUser';
import LogoutLink from '@techofmany/auth/components/LogoutLink';

import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  const user = withUser();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <ul>
          <li className={styles.link}><Link href="/">Home</Link></li>
          <li className={styles.link}><Link href="/videos">Videos</Link></li>
          <li className={styles.link}><Link href="/articles">Articles</Link></li>
        </ul>
        <ul>
          {user ? (
            <>
              <li className={styles.text}>Welcome back {user.username}</li>
              <li className={styles.link}><LogoutLink /></li>
            </>
          ) : (
            <>
              <li className={styles.link}><Link href="/auth/login">Login</Link></li>
              <li className={styles.link}><Link href="/auth/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
