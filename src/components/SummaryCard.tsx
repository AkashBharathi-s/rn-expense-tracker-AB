import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';
import { formatCurrency } from '../utils';

interface SummaryCardProps {
  totalAmount: number;
  itemCount: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  totalAmount,
  itemCount,
}) => {
  const formattedTotal = formatCurrency(totalAmount);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>TOTAL AMOUNT SPENT</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>
            {itemCount} {itemCount === 1 ? 'expense' : 'expenses'}
          </Text>
        </View>
      </View>
      <Text style={styles.amount}>
        <Text style={styles.currencySymbol}>$</Text>
        {formattedTotal}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.xxl,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  countPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.pill,
  },
  countText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  amount: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  currencySymbol: {
    fontSize: 26,
    fontWeight: '600',
    marginRight: 2,
  },
});
