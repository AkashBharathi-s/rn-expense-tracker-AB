import { isValidDateFormat } from './formatters';

export interface ExpenseFormValues {
  title: string;
  amount: string;
  date: string;
}

export interface ExpenseFormErrors {
  title?: string;
  amount?: string;
  date?: string;
}

export function validateExpenseForm(values: ExpenseFormValues): {
  isValid: boolean;
  errors: ExpenseFormErrors;
} {
  const errors: ExpenseFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Title cannot be empty';
  }

  const parsedAmount = parseFloat(values.amount.trim());
  if (!values.amount.trim()) {
    errors.amount = 'Amount cannot be empty';
  } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
    errors.amount = 'Amount must be a number greater than 0';
  }

  if (!isValidDateFormat(values.date.trim())) {
    errors.date = 'Date must be in YYYY-MM-DD format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
