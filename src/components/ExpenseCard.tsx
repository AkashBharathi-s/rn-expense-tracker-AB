import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types/expense';
import { CategoryBadge } from './CategoryBadge';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';
import { formatCurrency } from '../utils';

interface ExpenseCardProps {
  expense: Expense;
  onPress: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onPress,
}) => {
  const formattedAmount = formatCurrency(expense.amount);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${expense.title}, ${expense.category}, $${formattedAmount}`}
    >
      <View style={styles.leftCol}>
        <Text style={styles.title} numberOfLines={1}>
          {expense.title}
        </Text>
        <View style={styles.metaRow}>
          <CategoryBadge category={expense.category} size="small" />
          <Text style={styles.date}>{expense.date}</Text>
        </View>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.amount}>
          <Text style={styles.currency}>$</Text>
          {formattedAmount}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: 6,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftCol: {
    flex: 1,
    marginRight: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  date: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  rightCol: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 6,
  },
  amount: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  currency: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  chevron: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.textMuted,
    marginTop: -2,
  },
});
