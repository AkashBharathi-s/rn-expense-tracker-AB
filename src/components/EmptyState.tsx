import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';
import { AppButton } from './AppButton';

interface EmptyStateProps {
  onAddPress: () => void;
  title?: string;
  description?: string;
  buttonTitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddPress,
  title = 'No expenses yet',
  description = 'Your tracked expenses will appear here. Start adding your spending to see the breakdown.',
  buttonTitle = '+ Add Your First Expense',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🧾</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <AppButton
        title={buttonTitle}
        onPress={onAddPress}
        size="medium"
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxxl,
    paddingVertical: 56,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.pill,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    fontSize: 38,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xxl,
  },
});
