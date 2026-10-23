/**
 * Formats a numeric amount to two decimal places with comma separation.
 * Example: 1250.5 -> "1,250.50"
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Returns today's date formatted as YYYY-MM-DD.
 */
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a timestamp into a human-readable date and time.
 * Example: 1729000000000 -> "Oct 15, 2024, 7:06 PM"
 */
export function formatFullDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

/**
 * Validates that a string matches YYYY-MM-DD format.
 */
export function isValidDateFormat(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.trim() || !dateRegex.test(dateString.trim())) {
    return false;
  }
  const [year, month, day] = dateString.split('-').map(Number);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  return true;
}
