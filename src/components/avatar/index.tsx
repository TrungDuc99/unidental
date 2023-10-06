import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Image } from '@/ui';

interface AvatarProps {
  image: any;
  width?: number;
  height?: number;
}

const Avatar = (props: AvatarProps) => {
  const { width, height, image } = props;
  return (
    <Image
      source={{ uri: image }}
      style={{
        width: width ? width : 40,
        height: height ? height : 40,
        borderRadius: 1000,
      }}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {},
});
