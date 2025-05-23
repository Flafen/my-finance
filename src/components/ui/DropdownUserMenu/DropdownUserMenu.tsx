import React, { useEffect, useRef, useState } from 'react';
import styles from './DropdownUserMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen, faWallet, faCog } from '@fortawesome/free-solid-svg-icons';
import user from '../../../assets/photo/i.webp';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks';
import { logout } from '../../../store/slices/authSlice';

export default function DropdownUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
    >
      <FontAwesomeIcon
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        style={{ cursor: 'pointer' }}
        icon={faUser}
      />
      {isOpen && (
        <div className={styles.dropdown_menu}>
          <div
            style={{ display: 'flex', alignItems: 'center', padding: '0 15px' }}
          >
            <img
              src={user}
              alt="user_photo"
            />
            <div>
              <p className={styles.user_name}>Vlad Nasulin</p>
              <p>mail@mail.com</p>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/profile">
                <FontAwesomeIcon
                  style={{ color: '#2F2CD8' }}
                  icon={faUser}
                />
                Profile
              </Link>
            </li>
            <li>
              <Link to="wallets">
                <FontAwesomeIcon
                  style={{ color: '#2F2CD8' }}
                  icon={faWallet}
                />
                Wallets
              </Link>
            </li>
            <li>
              <Link to="settings">
                <FontAwesomeIcon
                  style={{ color: '#2F2CD8' }}
                  icon={faCog}
                />
                Settings
              </Link>
            </li>
            <li
              onClick={() => {
                handleLogout();
              }}
            >
              <Link to="/">
                <FontAwesomeIcon
                  icon={faDoorOpen}
                  style={{ color: 'red' }}
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
