import { SearchNormal1 } from 'iconsax-react-native';
import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Incubator, View } from 'react-native-ui-lib';

import { ScaleSize, Spacing } from '@/configs';
import { ActivityIndicator, colors } from '@/ui';

export interface SearchBarProps {
  onSubmit?: (value: string) => void;
  valueCurrent?: string;
  isLoading?: boolean;
  placeholder?: string;
  size?: 'small' | 'large';
  [x: string]: any;
}
const SearchBar = ({
  placeholder = 'Điền thông tin cần tìm',
  size = 'large',
  isLoading = false,
  valueCurrent = '',
  onSubmit,
  ...rest
}: SearchBarProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);
  const [value, setValue] = useState('');
  const typingRef = useRef<any>();

  const handleChangeText = (text: string) => {
    setValue(text);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    if (onSubmit) {
      typingRef.current = setTimeout(() => {
        onSubmit(text);
      }, 300);
    }
  };

  return (
    <Incubator.TextField
      {...rest}
      fieldStyle={styles.fieldStyle}
      containerStyle={{
        ...styles.container,
        height: size === 'large' ? ScaleSize(50) : ScaleSize(45),
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      placeholderTextColor="#A7A7A7"
      selectionColor={colors.primary[500]}
      value={value}
      onChangeText={handleChangeText}
      trailingAccessory={
        <View
          style={{
            padding: Spacing(1.8),
            borderRadius: 1000,
            backgroundColor: isFocus ? '#dee8fe' : 'white',
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <SearchNormal1
              color={Colors.primaryColor}
              size={size === 'large' ? ScaleSize(24) : ScaleSize(18)}
              variant={isFocus ? 'Bulk' : 'Linear'}
            />
          )}
        </View>
      }
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: ScaleSize(1),
    borderRadius: ScaleSize(100),
    backgroundColor: '#fff',
    marginVertical: Spacing(2),
    flexDirection: 'row',
    paddingLeft: Spacing(5),
    paddingRight: Spacing(1.2),
    borderColor: '#d0cfcf',
  },
  fieldStyle: {
    alignSelf: 'center',
  },
});
