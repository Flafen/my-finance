import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  date: Date;
  amount: number;
  action: 'deposit' | 'withdraw';
  category?:
    | 'Food'
    | 'Transport'
    | 'Healthcare'
    | 'Education'
    | 'Shops'
    | 'Entertaiment'
    | 'Other';
}

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
  transactionHistory: [
    {
      date: new Date('18.11.2014'),
      amount: 132.22,
      action: 'withdraw',
      category: 'Education',
    },
    {
      date: new Date('19.11.2014'),
      amount: 245.52,
      action: 'withdraw',
      category: 'Entertaiment',
    },
    {
      date: new Date('20.11.2014'),
      amount: 6540,
      action: 'deposit',
    },
    {
      date: new Date('28.11.2014'),
      amount: 920.9,
      action: 'withdraw',
      category: 'Transport',
    },
  ],
};

const userInfoSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    newTransaction(state, action: PayloadAction<Transaction>) {
      state.transactionHistory = [...state.transactionHistory, action.payload];
    },
  },
});

export const { newTransaction } = userInfoSlice.actions;

export default userInfoSlice.reducer;
