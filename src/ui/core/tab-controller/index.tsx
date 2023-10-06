import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../view';
import type { Tab } from './item-tab';
import TabItem from './item-tab';

interface TabControllerProps {
  tabs: Tab[];
  onPressTab: (tab: Tab) => void;
}

const TabController = ({ tabs, onPressTab }: TabControllerProps) => {
  const [tabCurrent, setTabCurrent] = useState<any>(1);
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        return (
          <View key={tab.value} style={styles.tab}>
            <TabItem
              tabsLength={tabs.length}
              index={index}
              item={tab}
              tabCurrent={tabCurrent}
              onPress={(value) => {
                setTabCurrent(value.value);
                onPressTab(value);
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

export default TabController;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
  },
  tab: {
    padding: 2,
    flex: 1,
  },
});
