import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../components/ui/AddTransactionModal/AddTransactionModal';
import userTransactions from '../../assets/data/userTransactions.json';

const transactions = userTransactions.transactionHistory.map((transaction) => ({
  ...transaction,
  date: new Date(transaction.date),
  action: transaction.action as 'withdraw' | 'deposit',
  category: transaction.category as
    | 'Food'
    | 'Transport'
    | 'Healthcare'
    | 'Education'
    | 'Shops'
    | 'Entertaiment'
    | 'Other'
    | undefined,
}));

export interface User {
  id: string;
  name: string;
  email: string;
  transactionHistory: Transaction[] | [];
}

const initialState: User = {
  id: '1',
  name: 'Vlad Nasulin',
  email: 'mail@mail.ru',
  transactionHistory: transactions,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    newTransaction(state, action: PayloadAction<Transaction>) {
      state.transactionHistory = [...state.transactionHistory, action.payload];
    },
  },
});

export const { newTransaction } = userInfoSlice.actions;

export default userInfoSlice.reducer;
