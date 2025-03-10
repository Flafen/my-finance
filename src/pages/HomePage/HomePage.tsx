import React, { useEffect, useState } from 'react';
import {
  SmallInfoCard,
  // SmallInfoCardProps,
} from '../../components/common/SmallInfoCard/SmallInfoCard';
import styles from './HomePage.module.scss';
import AddTransactionModal from '../../components/ui/AddTransactionModal/AddTransactionModal';
import CustomButton from '../../components/common/CustomButton/CustomButton';
import { useAppSelector } from '../../utils/hooks';
import { calculateMonthlySummaries, getPreviousMonth } from '../../utils/utils';
import BalanceChart from '../../components/charts/BalanceHistoryChart/BalanceHistoryChart';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const transactions = useAppSelector(
    (state) => state.userInfo.transactionHistory
  );

  const monthlyDetails = calculateMonthlySummaries(transactions);
  const currentMonth = monthlyDetails.find(
    (item) => item.month === new Date().toISOString().slice(0, 7)
  );
  const lastMonth = monthlyDetails.find(
    (item) =>
      item.month === getPreviousMonth(new Date().toISOString().slice(0, 7))
  );

  useEffect(() => {
    console.log(currentMonth);
    console.log('Monthly transactions changed');
    console.log(monthlyDetails);
  }, [monthlyDetails, currentMonth]);

  return (
    <>
      <AddTransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
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
        </div>
        <CustomButton
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add transaction
        </CustomButton>
      </div>

      <div className={styles.total_stats}>
        <SmallInfoCard
          title={'Total Balance'}
          amount={currentMonth?.totalBalance}
          lastMonthAmount={lastMonth?.totalBalance}
        />
        <SmallInfoCard
          title={'Total Period Change'}
          amount={currentMonth?.totalPeriodChange}
          lastMonthAmount={lastMonth?.totalPeriodChange}
        />
        <SmallInfoCard
          title={'Total Period Expenses'}
          amount={currentMonth?.totalPeriodExpenses}
          lastMonthAmount={lastMonth?.totalPeriodExpenses}
        />
        <SmallInfoCard
          title={'Total Period Income'}
          amount={currentMonth?.totalPeriodIncome}
          lastMonthAmount={lastMonth?.totalPeriodIncome}
        />
      </div>
      <BalanceChart transactions={transactions} />
    </>
  );
}
