import React, { useEffect, useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Transaction } from '../../ui/AddTransactionModal/AddTransactionModal';
import {
  calculateDailyBalance,
  formatDateLabelShort,
} from '../../../utils/utils';
import { DailyBalance, BalanceHistory } from '../../../types/types';

function getCssVar(name: string, fallback: string) {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name) ||
    fallback
  );
}

interface BalanceChartProps {
  transactions: Transaction[];
  selectedYear: string;
  selectedMonth: string;
}

function getYear(dateStr: string) {
  return new Date(dateStr).getFullYear();
}
function getMonth(dateStr: string) {
  return new Date(dateStr).getMonth() + 1;
}

const BalanceChart: React.FC<BalanceChartProps> = ({
  transactions,
  selectedYear,
  selectedMonth,
}) => {
  const [dailyBalances, setDailyBalances] = useState<DailyBalance[]>([]);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { dailyBalances }: BalanceHistory =
      calculateDailyBalance(transactions);
    setDailyBalances(dailyBalances);
  }, [transactions]);

  // Получаем актуальные цвета при каждом рендере и смене темы
  const colors = useMemo(
    () => ({
      text: getCssVar('--text-color', '#232946').trim(),
      borderLine: getCssVar('--border-line-color', '#d1d9e6').trim(),
      liteBlue: getCssVar('--lite-blue-text-color', '#6c63ff').trim(),
      background: getCssVar('--background-color', '#f7f9fb').trim(),
      tooltipBg: getCssVar('--second-background-color', '#fff').trim(),
    }),
    [theme]
  );

  // Фильтрация по периоду для отображения графика
  const filteredData = useMemo(() => {
    return dailyBalances.filter((item) => {
      const year = getYear(item.date);
      const month = getMonth(item.date);
      const yearOk = selectedYear === 'all' || year === Number(selectedYear);
      const monthOk =
        selectedMonth === 'all' || month === Number(selectedMonth);
      return yearOk && monthOk;
    });
  }, [dailyBalances, selectedYear, selectedMonth]);

  const filteredTimeline = useMemo(
    () => filteredData.map((item) => item.date),
    [filteredData]
  );

  const option = {
    xAxis: {
      type: 'category' as const,
      data: filteredTimeline,
      axisLine: {
        lineStyle: {
          color: colors.borderLine,
        },
      },
      axisLabel: {
        color: colors.text,
        fontWeight: 500,
        fontFamily: 'inherit',
        formatter: function (value: string) {
          return formatDateLabelShort(value);
        },
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: colors.borderLine,
        },
      },
    },
    yAxis: {
      type: 'value' as const,
      axisLine: {
        lineStyle: {
          color: colors.borderLine,
        },
      },
      axisLabel: {
        color: colors.text,
      },
      splitLine: {
        lineStyle: {
          color: colors.borderLine,
          opacity: 0.25,
        },
      },
    },
    series: [
      {
        name: 'Daily Balance',
        data: filteredData.map((day) => day.balance),
        type: 'line' as const,
        smooth: true,
        lineStyle: {
          color: colors.liteBlue,
          width: 3,
        },
        itemStyle: {
          color: colors.liteBlue,
        },
        areaStyle: {
          color: {
            type: 'linear' as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colors.liteBlue,
                opacity: 0.25,
              },
              {
                offset: 1,
                color: colors.liteBlue,
                opacity: 0,
              },
            ],
          },
        },
        symbol: 'circle' as const,
        symbolSize: 6,
      },
    ],
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: colors.tooltipBg,
      borderColor: colors.borderLine,
      textStyle: {
        color: colors.text,
      },
      axisPointer: {
        type: 'line' as const,
        lineStyle: {
          color: colors.liteBlue,
          width: 1,
        },
      },
      formatter: function (params: any) {
        const dateLabel = formatDateLabelShort(params[0].axisValue);
        const value = params[0].data;
        return `<b>${dateLabel}</b><br/>Balance: <b>${value}</b>`;
      },
    },
    legend: {
      show: true,
      left: 'center',
      itemHeight: 13,
      itemWidth: 25,
      itemGap: 20,
      icon: 'rect',
      textStyle: { fontFamily: 'Open Sans', color: colors.text },
      lineStyle: { opacity: 0 },
      data: ['Daily Balance'],
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '400px', width: '100%' }}
    />
  );
};

export default BalanceChart;
