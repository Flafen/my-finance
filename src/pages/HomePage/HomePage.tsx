import React, { useEffect, useState, useMemo } from 'react';
import { SmallInfoCard } from '../../components/common/SmallInfoCard/SmallInfoCard';
import styles from './HomePage.module.scss';
import AddTransactionModal from '../../components/ui/AddTransactionModal/AddTransactionModal';
import CustomButton from '../../components/common/CustomButton/CustomButton';
import { useAppSelector } from '../../utils/hooks';
import { calculateMonthlySummaries, getPreviousMonth } from '../../utils/utils';
import BalanceChart from '../../components/charts/BalanceHistoryChart/BalanceHistoryChart';

function getCssVar(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name) ||
    fallback
  );
}

function getYear(date: string | Date) {
  return new Date(date).getFullYear();
}
function getMonth(date: string | Date) {
  return new Date(date).getMonth() + 1;
}

const months = [
  { value: 'all', label: 'All year' },
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const transactions = useAppSelector(
    (state) => state.userInfo.transactionHistory
  );

  // Для фильтрации графика
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Получаем список годов для фильтра
  const years = useMemo(() => {
    const set = new Set<number>();
    (transactions ?? []).forEach((t) => set.add(getYear(t.date)));
    return Array.from(set).sort((a, b) => b - a);
  }, [transactions]);

  // Фильтрация транзакций по выбранному периоду

  const monthlyDetails = calculateMonthlySummaries(transactions ?? []);
  const currentMonth = monthlyDetails.find(
    (item) => item.month === new Date().toISOString().slice(0, 7)
  );
  const lastMonth = monthlyDetails.find(
    (item) =>
      item.month === getPreviousMonth(new Date().toISOString().slice(0, 7))
  );

  const colors = useMemo(
    () => ({
      text: getCssVar('--text-color', '#232946').trim(),
      borderLine: getCssVar('--border-line-color', '#d1d9e6').trim(),
      background: getCssVar('--background-color', '#f7f9fb').trim(),
    }),
    []
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
      <div
        style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}
      >
        <div>
          <label
            style={{ color: colors.text, fontWeight: 500, marginRight: 8 }}
            htmlFor="year"
          >
            Years:
          </label>
          <select
            value={selectedYear}
            id="year"
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedMonth('all');
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.borderLine}`,
              background: colors.background,
              color: colors.text,
              fontWeight: 500,
            }}
          >
            <option value="all">All</option>
            {years.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            style={{ color: colors.text, fontWeight: 500, marginRight: 8 }}
            htmlFor="month"
          >
            Month:
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            id="month"
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.borderLine}`,
              background: colors.background,
              color: colors.text,
              fontWeight: 500,
            }}
            disabled={selectedYear === 'all'}
          >
            {months.map((m) => (
              <option
                key={m.value}
                value={m.value}
              >
                {m.label}
              </option>
            ))}
          </select>
        </div>
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

      {transactions ? (
        <BalanceChart
          transactions={transactions}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      ) : (
        'No data'
      )}
    </>
  );
}
