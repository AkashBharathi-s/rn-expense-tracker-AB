import { Category } from '../types/expense';

export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderFocus: '#2563EB',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  dangerLight: '#FEF2F2',
  success: '#10B981',
  successLight: '#ECFDF5',
  white: '#FFFFFF',
  cardShadow: 'rgba(15, 23, 42, 0.06)',
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 34,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  fabBottom: 24,
  listBottom: 96,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  card: 20,
  pill: 999,
};

export const STORAGE_KEYS = {
  EXPENSES: '@expense_tracker_expenses_v1',
};

export const CATEGORY_CONFIG: Record<
  Category,
  { label: Category; emoji: string; color: string; bgColor: string }
> = {
  Food: {
    label: 'Food',
    emoji: '🍔',
    color: '#EA580C',
    bgColor: '#FFF7ED',
  },
  Travel: {
    label: 'Travel',
    emoji: '✈️',
    color: '#0284C7',
    bgColor: '#F0F9FF',
  },
  Shopping: {
    label: 'Shopping',
    emoji: '🛍️',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  Other: {
    label: 'Other',
    emoji: '📦',
    color: '#475569',
    bgColor: '#F1F5F9',
  },
};

export const CATEGORIES: Category[] = ['Food', 'Travel', 'Shopping', 'Other'];

