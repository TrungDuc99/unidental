import {Colors, FontFamily, ScaleSize, Spacing} from '@configs';
import {SearchStatus} from 'iconsax-react-native';
import React, {useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Incubator} from 'react-native-ui-lib';
import TouchableOpacityBase from '../touchable-opacity-base';

export type SearchBarProps = {
  onSubmit: (value: string) => void;
  useCollapse?: boolean;
};
const SearchBarBase = ({onSubmit, useCollapse = false, ...rest}: SearchBarProps) => {
  const borderAnim: any = useRef(new Animated.Value(useCollapse ? 50 : ScaleSize(16))).current;

  const backgroundAnim: any = useRef(new Animated.Value(useCollapse ? 0 : 1)).current;
  const [value, setValue] = useState('');
  const [collapse, setCollapse] = useState(useCollapse);
  const typingRef = useRef<any>();
  const handleSubmit = (text: string) => {
    setValue(text);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }
    typingRef.current = setTimeout(() => {
      onSubmit && onSubmit(text);
    }, 300);
  };

  const styles = StyleSheet.create({
    fieldStyle: {
      width: collapse ? 0 : undefined,
      backgroundColor: backgroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.primaryColor, '#fff'],
      }),
      height: ScaleSize(52),
      borderRadius: ScaleSize(16),
      paddingHorizontal: collapse ? 0 : Spacing(2.6),
    },
    container: {
      flexDirection: 'row',
      justifyContent: collapse ? 'center' : 'space-between',
      alignItems: collapse ? 'center' : 'stretch',
      backgroundColor: backgroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.primaryColor, '#fff'],
      }),
      height: ScaleSize(52),
      borderRadius: borderAnim,
      fontFamily: FontFamily.Medium,
      shadowColor: Colors.primaryColor,
      shadowOffset: {
        width: 2,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,

      borderColor: '#EDECEC',
      borderWidth: ScaleSize(1),
    },
    searchBtn: {
      position: 'absolute',
      ...(collapse
        ? {
            right: Spacing(0),
            left: ScaleSize(0),
          }
        : {
            right: Spacing(2.6),
          }),
      top: 0,
      bottom: 0,
    },
  });
  return (
    <Animated.View style={styles.container}>
      <Incubator.TextField
        {...rest}
        label=""
        value={value}
        onChangeText={handleSubmit}
        placeholder="Nhập thông tin cần tìm..."
        placeholderTextColor="#949494"
        selectionColor={Colors.primaryColor}
        fieldStyle={styles.fieldStyle}
      />
      <TouchableOpacityBase style={styles.searchBtn} center>
        <SearchStatus variant="Linear" color={collapse ? '#fff' : '#9E9E9E'} />
      </TouchableOpacityBase>
    </Animated.View>
  );
};

export default SearchBarBase;
