import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-ui-lib';

type Props = {
  children: React.ReactNode;
  // onRefresh?: () => void;
  // refreshing?: boolean;
  // className?: any;
};

export const ScrollContainer = ({
  children,
}: // refreshing = false,
// className,
// onRefresh,
Props) => {
  return (
    // <ScrollView
    //   className={className}
    //   showsVerticalScrollIndicator={false}
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }
    //   style={{
    //     display: 'flex',
    //     flex: 1,
    //     flexDirection: 'column',
    //     backgroundColor: 'white',
    //   }}
    // >
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
    // </ScrollView>
  );
};
