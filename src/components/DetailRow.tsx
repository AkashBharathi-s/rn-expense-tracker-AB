import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../constants';

interface DetailRowProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
  showDivider?: boolean;
}

export const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  children,
  showDivider = true,
}) => {
  return (
    <>
      <View style={styles.infoRow}>
        <Text style={styles.infoKey}>{label}</Text>
        {value !== undefined ? (
          <Text style={styles.infoVal}>{value}</Text>
        ) : (
          children
        )}
      </View>
      {showDivider && <View style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  infoKey: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  infoVal: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    maxWidth: '65%',
    textAlign: 'right',
  },
});
