export interface DailyBalance {
  date: string; // "yyyy-mm-dd"
  balance: number;
}

export interface BalanceHistory {
  dailyBalances: DailyBalance[];
  timeline: string[];
}
