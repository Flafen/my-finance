import React from 'react';
import {
  SmallInfoCard,
  // SmallInfoCardProps,
} from '../../components/common/SmallInfoCard/SmallInfoCard';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const details = {
    totalBalance: 23691,
    totalBalanceLastMonth: 25247,
    totalPeriodChange: 12091,
    totalPeriodChangeLastMonth: 10091,
    totalPeriodExpenses: 618,
    totalPeriodExpensesLastMonth: 938,
    totalPeriodIncome: 1900,
    totalPeriodIncomeLastMonth: 1690,
  };
  return (
    <>
      <h3 style={{ fontSize: '24px', margin: '8px 0' }}>Dashboard</h3>
      <p
        style={{
          fontSize: '14px',
          margin: 0,
          color: 'var(--lite-blue-text-color)',
        }}
      >
        Welcome My-Finance Management page
      </p>

      <div className={styles.total_stats}>
        <SmallInfoCard
          title={'Total Balance'}
          amount={details.totalBalance}
          lastMonthAmount={details.totalBalanceLastMonth}
        />
        <SmallInfoCard
          title={'Total Period Change'}
          amount={details.totalPeriodChange}
          lastMonthAmount={details.totalPeriodChangeLastMonth}
        />
        <SmallInfoCard
          title={'Total Period Expenses'}
          amount={details.totalPeriodExpenses}
          lastMonthAmount={details.totalPeriodExpensesLastMonth}
        />
        <SmallInfoCard
          title={'Total Period Income'}
          amount={details.totalPeriodIncome}
          lastMonthAmount={details.totalPeriodIncomeLastMonth}
        />
      </div>
    </>
  );
}
