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
          <li className={styles.link}><Link href="/videos">Videos</Link></li>
          <li className={styles.link}><Link href="/articles">Articles</Link></li>
        </ul>
        <ul>
          {currentUser ? (
            <>
              <li className={styles.link}>
                <Link href={`/user/profile/${currentUser.id}`}>{currentUser.username}</Link>
              </li>
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
