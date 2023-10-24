import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonPostProps {}

const SkeletonPost = (props: SkeletonPostProps) => {
  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        padding: 10,
      }}
    >
      <SkeletonPlaceholder borderRadius={4}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: 50, height: 50, borderRadius: 50 }} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonPost;

const styles = StyleSheet.create({
  container: {},
});
