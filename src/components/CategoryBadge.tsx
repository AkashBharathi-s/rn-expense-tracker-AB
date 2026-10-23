import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Category } from '../types/expense';
import { CATEGORY_CONFIG, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants';

interface CategoryBadgeProps {
  category: Category;
  size?: 'small' | 'medium';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'small',
}) => {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Other;
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.bgColor, borderColor: config.color + '33' },
        isSmall ? styles.badgeSmall : styles.badgeMedium,
      ]}
    >
      <Text style={isSmall ? styles.emojiSmall : styles.emojiMedium}>
        {config.emoji}
      </Text>
      <Text
        style={[
          styles.label,
          { color: config.color },
          isSmall ? styles.labelSmall : styles.labelMedium,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    gap: SPACING.xs,
  },
  badgeMedium: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    gap: 6,
  },
  emojiSmall: {
    fontSize: FONT_SIZES.xs,
  },
  emojiMedium: {
    fontSize: FONT_SIZES.base,
  },
  label: {
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: FONT_SIZES.xs,
  },
  labelMedium: {
    fontSize: FONT_SIZES.sm,
  },
});
