import {
  BalanceHistory,
  DailyBalance,
} from '../components/charts/BalanceHistoryChart/BalanceHistoryChart';
import { Transaction } from '../components/ui/AddTransactionModal/AddTransactionModal';
export const getMoneyString = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export interface MonthlySummary {
  month: string; // "YYYY-MM"
  totalBalance: number;
  totalPeriodChange: number;
  totalPeriodExpenses: number;
  totalPeriodIncome: number;
}

interface DatedObject {
  date: Date;
}

function sortByDate<T extends DatedObject>(array: T[]): T[] {
  return [...array].sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function calculateMonthlySummaries(
  transactions: Transaction[]
): MonthlySummary[] {
  const monthlySummaries: { [key: string]: MonthlySummary } = {};
  let previousBalance = 0;

  const sortedTransactions = sortByDate(transactions);

  sortedTransactions.forEach((transaction) => {
    const month = transaction.date.toISOString().slice(0, 7);

    if (!monthlySummaries[month]) {
      monthlySummaries[month] = {
        month,
        totalBalance: previousBalance,
        totalPeriodChange: 0,
        totalPeriodExpenses: 0,
        totalPeriodIncome: 0,
      };
    }

    const summary = monthlySummaries[month];

    if (transaction.action === 'deposit') {
      summary.totalBalance += transaction.amount;
      summary.totalPeriodChange += transaction.amount;
      summary.totalPeriodIncome += transaction.amount;
    } else if (transaction.action === 'withdraw') {
      summary.totalBalance -= transaction.amount;
      summary.totalPeriodChange -= transaction.amount;
      summary.totalPeriodExpenses += transaction.amount;
    }

    previousBalance = summary.totalBalance;
  });

  return Object.values(monthlySummaries).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

export function calculateDailyBalance(
  transactions: Transaction[]
): BalanceHistory {
  const sortedTransactions = sortByDate(transactions);

  const dailyBalances: DailyBalance[] = [];
  const timeline: string[] = [];
  let currentBalance = 0;

  sortedTransactions.forEach((transaction) => {
    const dateKey = transaction.date.toISOString().split('T')[0]; // "yyyy-mm-dd"

    const existingDay = dailyBalances.find((day) => day.date === dateKey);
    if (existingDay) {
      if (transaction.action === 'deposit') {
        existingDay.balance += transaction.amount;
      } else if (transaction.action === 'withdraw') {
        existingDay.balance -= transaction.amount;
      }
    } else {
      if (transaction.action === 'deposit') {
        currentBalance += transaction.amount;
      } else if (transaction.action === 'withdraw') {
        currentBalance -= transaction.amount;
      }
      dailyBalances.push({ date: dateKey, balance: currentBalance });
      timeline.push(dateKey);
    }
  });

  return { dailyBalances, timeline };
}

export const getPreviousMonth = (currentMonth: string): string => {
  const date = new Date(currentMonth);
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().slice(0, 7);
};
