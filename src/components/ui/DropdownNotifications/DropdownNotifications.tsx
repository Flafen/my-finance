import { useEffect, useRef, useState } from 'react';
import styles from './DropdownNotifications.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationItem from './Notification/NotificationItem';

export interface NotificationItemProps {
  status: 'Denied' | 'Success' | 'Error';
  title: string;
  date: Date;
}

export default function DropdownNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: NotificationItemProps[] = [
    {
      status: 'Denied',
      title: '2FA verification failed',
      date: new Date('2024-03-24T09:08:56'),
    },
    {
      status: 'Success',
      title: 'Password has been changed',
      date: new Date('2024-02-14T18:21:56'),
    },
    {
      status: 'Error',
      title: 'Phone verification pending',
      date: new Date('2024-02-06T15:35:56'),
    },
    {
      status: 'Success',
      title: 'Account created',
      date: new Date('2024-02-04T13:53:56'),
    },
  ];

  const toggleNotifications = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
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
        onClick={toggleNotifications}
        icon={faBell}
      />
      {isOpen && (
        <div className={styles.dropdown_notifications}>
          <h3>Recent Notifications</h3>
          {notifications.map((item) => (
            <NotificationItem
              key={`${item.title}-${item.date.toISOString()}`}
              status={item.status}
              title={item.title}
              date={item.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
