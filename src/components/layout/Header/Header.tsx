import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faWallet } from '@fortawesome/free-solid-svg-icons';
import ToogleTheme from '../../ui/ToggleTheme/ToogleTheme';
import DropdownUserMenu from '../../ui/DropdownUserMenu/DropdownUserMenu';
import DropdownNotifications from '../../ui/DropdownNotifications/DropdownNotifications';

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_wrapper}>
        <div className={styles.menu_item}>
          <a href="/">
            <FontAwesomeIcon icon={faHouse} />
          </a>
          <span className={styles.tooltip}>Home</span>
        </div>
        <div className={styles.menu_item}>
          <a href="/wallets">
            <FontAwesomeIcon icon={faWallet} />
          </a>
          <span className={styles.tooltip}>Wallets</span>
        </div>
      </div>
      <div className={styles.menu_wrapper}>
        <ToogleTheme />
        <DropdownNotifications />
        <DropdownUserMenu />
      </div>
    </div>
  );
}
