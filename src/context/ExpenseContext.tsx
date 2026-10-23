import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../types/expense';
import { STORAGE_KEYS } from '../constants';

export type NewExpenseInput = Omit<Expense, 'id' | 'createdAt'>;

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  addExpense: (data: NewExpenseInput) => Promise<Expense>;
  deleteExpense: (id: string) => Promise<boolean>;
  refreshExpenses: () => Promise<void>;
  getExpenseById: (id: string) => Expense | undefined;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load expenses from AsyncStorage
  const loadExpenses = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (raw) {
        const parsed: Expense[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Sort newest first
          const sorted = parsed.sort((a, b) => b.createdAt - a.createdAt);
          setExpenses(sorted);
        } else {
          setExpenses([]);
        }
      } else {
        setExpenses([]);
      }
    } catch {
      setError('Could not load saved expenses. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  // Add a new expense
  const addExpense = async (data: NewExpenseInput): Promise<Expense> => {
    try {
      const newExpense: Expense = {
        ...data,
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        createdAt: Date.now(),
      };

      const updated = [newExpense, ...expenses];
      await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
      setExpenses(updated);
      return newExpense;
    } catch {
      throw new Error('Failed to save the new expense.');
    }
  };

  // Delete an expense by ID
  const deleteExpense = async (id: string): Promise<boolean> => {
    try {
      const updated = expenses.filter((e) => e.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
      setExpenses(updated);
      return true;
    } catch {
      throw new Error('Failed to delete expense.');
    }
  };

  // Refresh expenses
  const refreshExpenses = async () => {
    await loadExpenses(true);
  };

  // Retrieve an expense by ID from active state
  const getExpenseById = (id: string): Expense | undefined => {
    return expenses.find((e) => e.id === id);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        refreshing,
        error,
        addExpense,
        deleteExpense,
        refreshExpenses,
        getExpenseById,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

// Alias hook in case other code uses useExpenses
export const useExpenses = useExpense;
