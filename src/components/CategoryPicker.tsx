import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '../types/expense';
import { CATEGORIES, CATEGORY_CONFIG, COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';

interface CategoryPickerProps {
  selectedCategory: Category;
  onSelectCategory: (cat: Category) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <View style={styles.categoryRow}>
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const config = CATEGORY_CONFIG[cat];
        return (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              isSelected && {
                backgroundColor: config.bgColor,
                borderColor: config.color,
              },
            ]}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Select ${cat} category`}
          >
            <Text style={styles.categoryEmoji}>{config.emoji}</Text>
            <Text
              style={[
                styles.categoryLabel,
                isSelected && { color: config.color, fontWeight: '700' },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryChip: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: 14,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    gap: 6,
  },
  categoryEmoji: {
    fontSize: FONT_SIZES.lg,
  },
  categoryLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
