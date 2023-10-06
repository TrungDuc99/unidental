/* eslint-disable max-lines-per-function */

import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoading = () => {
  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        padding: 10,

        marginBottom: 10,
      }}
    >
      <SkeletonPlaceholder borderRadius={4}>
        {/* First row */}

        {/* Second row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          {/* First box */}
          <View>
            <View
              style={{
                width: 40,
                height: 10,
                borderRadius: 4,
                marginBottom: 4,
              }}
            />
            <View style={{ width: 50, height: 10, borderRadius: 4 }} />
          </View>
          {/* Second box */}
          <View
            style={{
              width: 50,
              height: 20,
              borderRadius: 4,
              marginBottom: 5,
            }}
          />
        </View>

        {/* Third row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          {/* First box */}
          <View>
            <View
              style={{
                width: 40,
                height: 10,
                borderRadius: 4,
                marginBottom: 4,
              }}
            />
            <View style={{ width: 50, height: 10, borderRadius: 4 }} />
          </View>
          {/* Second box */}
          <View
            style={{
              width: 35,
              height: 30,
              borderRadius: 4,
              marginBottom: 5,
            }}
          />
        </View>

        {/* Fourth row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* First box */}
          <View>
            <View
              style={{
                width: 40,
                height: 10,
                borderRadius: 4,
                marginBottom: 4,
              }}
            />
            <View style={{ width: 50, height: 10, borderRadius: 4 }} />
          </View>
          {/* Second box */}
          <View style={{ width: 30, height: 30, borderRadius: 50 }} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SkeletonLoading;

const styles = StyleSheet.create({
  container: {},
});
