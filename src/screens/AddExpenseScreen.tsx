import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Category } from '../types/expense';
import { useExpense } from '../context';
import { AppButton, CategoryPicker, FormField } from '../components';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';
import { getTodayDateString, validateExpenseForm, ExpenseFormErrors } from '../utils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;

export const AddExpenseScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addExpense } = useExpense();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [date, setDate] = useState(getTodayDateString());
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    const result = validateExpenseForm({ title, amount, date });
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const parsedAmount = parseFloat(amount.trim());
      await addExpense({
        title: title.trim(),
        amount: Math.round(parsedAmount * 100) / 100,
        category,
        date: date.trim(),
      });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Could not save expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <FormField
              label="Expense Title"
              required
              placeholder="e.g. Grocery store, Uber ride"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title && text.trim()) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              error={errors.title}
              maxLength={60}
            />

            <FormField
              label="Amount ($)"
              required
              prefix="$"
              placeholder="0.00"
              value={amount}
              onChangeText={(text) => {
                const sanitized = text.replace(/[^0-9.]/g, '');
                setAmount(sanitized);
                if (errors.amount && parseFloat(sanitized) > 0) {
                  setErrors((prev) => ({ ...prev, amount: undefined }));
                }
              }}
              error={errors.amount}
              keyboardType="decimal-pad"
            />

            <View style={styles.categorySection}>
              <Text style={styles.categoryLabel}>Category</Text>
              <CategoryPicker selectedCategory={category} onSelectCategory={setCategory} />
            </View>

            <FormField
              label="Date (YYYY-MM-DD)"
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={(text) => {
                setDate(text);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              error={errors.date}
              containerStyle={styles.lastField}
            />
          </View>

          <View style={styles.actionRow}>
            <AppButton title="Save Expense" onPress={handleSave} loading={isSubmitting} variant="primary" />
            <AppButton title="Cancel" onPress={() => navigation.goBack()} variant="ghost" disabled={isSubmitting} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  keyboardContainer: { flex: 1 },
  scrollContent: { padding: SPACING.lg, paddingBottom: 40 },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: SPACING.xl,
  },
  categorySection: { marginBottom: SPACING.xl },
  categoryLabel: { fontSize: FONT_SIZES.sm, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  lastField: { marginBottom: 0 },
  actionRow: { gap: SPACING.md },
});
