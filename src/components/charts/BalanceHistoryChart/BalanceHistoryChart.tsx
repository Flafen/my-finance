import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Transaction } from '../../ui/AddTransactionModal/AddTransactionModal';
import { calculateDailyBalance } from '../../../utils/utils';

export interface DailyBalance {
  date: string; // "yyyy-mm-dd"
  balance: number;
}

export interface BalanceHistory {
  dailyBalances: DailyBalance[];
  timeline: string[];
}

const BalanceChart: React.FC<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const { dailyBalances, timeline } = calculateDailyBalance(transactions);

  const option = {
    xAxis: {
      type: 'category' as const,
      data: timeline,
    },
    yAxis: {
      type: 'value' as const,
    },
    series: [
      {
        data: dailyBalances.map((day) => day.balance),
        type: 'line' as const,
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default BalanceChart;
