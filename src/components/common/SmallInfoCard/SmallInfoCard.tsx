import React from 'react';
import styles from './SmallInfoCard.module.scss';
import { getMoneyString } from '../../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurnDown, faTurnUp } from '@fortawesome/free-solid-svg-icons';

export interface SmallInfoCardProps {
  title: string;
  amount: number | undefined;
  lastMonthAmount: number | undefined;
}

export const SmallInfoCard: React.FC<SmallInfoCardProps> = ({
  title,
  amount,
  lastMonthAmount,
}) => {
  let safetyAmount;
  if (amount === undefined) {
    safetyAmount = 0;
  } else {
    safetyAmount = amount;
  }
  let safetyLastMonthAmount;
  if (lastMonthAmount === undefined) {
    safetyLastMonthAmount = 0;
  } else {
    safetyLastMonthAmount = lastMonthAmount;
  }
  const balanceDynamic = safetyLastMonthAmount < safetyAmount;
  const detailIcon = balanceDynamic ? (
    <FontAwesomeIcon
      icon={faTurnUp}
      color="var(--success-color)"
    />
  ) : (
    <FontAwesomeIcon
      icon={faTurnDown}
      color="var(--denied-color)"
    />
  );

  const percent = (
    Math.abs(safetyAmount / safetyLastMonthAmount - 1) * 100
  ).toFixed(2);
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{getMoneyString(safetyAmount)}</p>
      <div
        style={{
          borderTop: '1px solid var(--border-line-color)',
          width: '100%',
          margin: '16px 0 10px 0',
        }}
      />
      {lastMonthAmount === undefined ? (
        <p className={styles.footer_details}>
          <span style={{ fontWeight: 600 }}>
            You have no transaction to compare.
          </span>
        </p>
      ) : (
        <span style={{ display: 'flex', gap: '5px' }}>
          {detailIcon}
          <p className={styles.footer_details}>
            {percent}% Last month{' '}
            <span style={{ fontWeight: 600 }}>
              {getMoneyString(safetyLastMonthAmount)}
            </span>
          </p>
        </span>
      )}
    </div>
  );
};
