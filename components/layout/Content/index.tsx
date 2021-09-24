import React from 'react';

import styles from './Content.module.scss';

type Props = React.PropsWithChildren<{}>;

const Header: React.FC<Props> = ({ children }) => (
  <main className={styles.content}>
    <div className={styles.inner}>
      {children}
    </div>
  </main>
);

export default Header;
