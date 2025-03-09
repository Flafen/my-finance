import styles from './NotificationItem.module.scss';
import { NotificationItemProps } from '../DropdownNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

const NotificationItem: React.FC<NotificationItemProps> = ({
  status,
  title,
  date,
}) => {
  return (
    <div className={styles.notification_wrapper}>
      <div>
        {status === 'Success' && (
          <div className={styles.success}>
            <FontAwesomeIcon
              icon={faCheck}
              style={{ fontSize: '20px', color: '#FFF' }}
            />
          </div>
        )}
        {status === 'Error' && (
          <div className={styles.error}>
            <FontAwesomeIcon
              icon={faExclamation}
              style={{ fontSize: '20px', color: '#FFF' }}
            />
          </div>
        )}
        {status === 'Denied' && (
          <div className={styles.denied}>
            <FontAwesomeIcon
              icon={faXmark}
              style={{ fontSize: '20px', color: '#FFF' }}
            />
          </div>
        )}
      </div>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date.toLocaleString().replace(',', '')}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
