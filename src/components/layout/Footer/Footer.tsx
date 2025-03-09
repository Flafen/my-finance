import React from 'react';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTelegram,
  faYoutube,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className={styles.footer__wrapper}>
      <p>© Copyright 2025 I All Rights Reserved</p>
      <div className={styles.footer__icons_wrapper}>
        <a href="/">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="/">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </div>
  );
}
