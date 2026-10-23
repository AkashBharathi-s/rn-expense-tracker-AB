import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Expense } from '../types/expense';
import { useExpense } from '../context';
import { SummaryCard, ExpenseCard, EmptyState, StateHandler } from '../components';
import { COLORS, FONT_SIZES, SPACING } from '../constants';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { expenses, loading, refreshing, error, refreshExpenses } = useExpense();

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  const handleExpensePress = (item: Expense) => {
    navigation.navigate('ExpenseDetail', { expenseId: item.id });
  };

  const handleAddPress = () => {
    navigation.navigate('AddExpense');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        {loading && expenses.length === 0 ? (
          <StateHandler loading={true} />
        ) : error && expenses.length === 0 ? (
          <StateHandler error={error} onRetry={refreshExpenses} />
        ) : (
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseCard
                expense={item}
                onPress={() => handleExpensePress(item)}
              />
            )}
            ListHeaderComponent={
              <View>
                <SummaryCard
                  totalAmount={totalAmount}
                  itemCount={expenses.length}
                />
                {expenses.length > 0 && (
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>
                    <Text style={styles.sectionSubtitle}>Newest First</Text>
                  </View>
                )}
              </View>
            }
            ListEmptyComponent={<EmptyState onAddPress={handleAddPress} />}
            contentContainerStyle={[
              styles.listContent,
              expenses.length === 0 && styles.listContentEmpty,
            ]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshExpenses}
                tintColor={COLORS.primary}
                colors={[COLORS.primary]}
              />
            }
          />
        )}

        {/* Floating Add Expense Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={handleAddPress}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Add New Expense"
        >
          <Text style={styles.fabIcon}>+</Text>
          <Text style={styles.fabText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { paddingBottom: SPACING.listBottom },
  listContentEmpty: { flexGrow: 1 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.fabBottom,
    right: SPACING.xl,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.xl,
    borderRadius: 999,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    gap: 6,
  },
  fabIcon: { color: COLORS.white, fontSize: 22, fontWeight: '700', lineHeight: 22 },
  fabText: { color: COLORS.white, fontSize: FONT_SIZES.base, fontWeight: '700' },
});
