export type Category = 'Food' | 'Travel' | 'Shopping' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string; // ISO date format YYYY-MM-DD
  createdAt: number; // Timestamp for strict newest-first sorting
}

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  ExpenseDetail: { expenseId: string };
};
