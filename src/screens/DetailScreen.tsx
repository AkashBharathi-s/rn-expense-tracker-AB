import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/expense';
import { useExpense } from '../context';
import { AppButton, CategoryBadge, DetailRow, StateHandler } from '../components';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';
import { formatCurrency, formatFullDateTime } from '../utils';

type RouteProps = RouteProp<RootStackParamList, 'ExpenseDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExpenseDetail'>;

export const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { expenseId } = route.params;

  const { getExpenseById, deleteExpense, loading } = useExpense();
  const expense = getExpenseById(expenseId);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Failed to delete expense.');
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expense?.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StateHandler loading={true} />
      </SafeAreaView>
    );
  }

  if (!expense) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StateHandler
          error="Expense not found. It may have been already deleted."
          onRetry={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.amountBanner}>
            <Text style={styles.amountLabel}>AMOUNT SPENT</Text>
            <Text style={styles.amountValue}>
              <Text style={styles.currency}>$</Text>
              {formatCurrency(expense.amount)}
            </Text>
          </View>

          <View style={styles.infoSection}>
            <DetailRow label="Title" value={expense.title} />
            <DetailRow label="Category">
              <CategoryBadge category={expense.category} size="medium" />
            </DetailRow>
            <DetailRow label="Expense Date" value={expense.date} />
            <DetailRow
              label="Recorded On"
              value={formatFullDateTime(expense.createdAt)}
              showDivider={false}
            />
          </View>
        </View>

        <AppButton
          title="Delete Expense"
          icon="🗑️"
          onPress={confirmDelete}
          variant="danger"
          loading={deleting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export const ExpenseDetailScreen = DetailScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: SPACING.lg, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: SPACING.xxl,
  },
  amountBanner: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  amountLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    color: COLORS.primaryDark,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  currency: {
    fontSize: 26,
    fontWeight: '600',
    color: COLORS.primary,
  },
  infoSection: { padding: SPACING.xl },
});
