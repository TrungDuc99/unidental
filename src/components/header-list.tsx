import { ArrowRight2 } from 'iconsax-react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import type { textVariants } from '@/ui';
import { Text, TouchableOpacity, View } from '@/ui';
import colors from '@/ui/theme/colors';

interface HeaderListProps {
  variantTitle?: keyof typeof textVariants;
  isUppercase?: boolean;
  title: string;
  titleViewDetail?: string;
}

const HeaderList = ({
  title,
  variantTitle = 'lg',
  isUppercase = true,
  titleViewDetail = 'Xem tất cả',
}: HeaderListProps) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    title: {
      textTransform: isUppercase ? 'uppercase' : 'none',
    },
  });
  return (
    <View style={styles.container}>
      <Text
        variant={variantTitle}
        className="font-semibold text-textprimary-100"
        style={styles.title}
      >
        {title}
      </Text>
      <TouchableOpacity className="flex flex-row items-center">
        <Text variant="sm" className="text-primary-510">
          {titleViewDetail}
        </Text>
        <ArrowRight2 size={15} color={colors.primary[510]} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderList;
