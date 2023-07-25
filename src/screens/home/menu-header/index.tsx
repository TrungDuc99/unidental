import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-ui-lib';

import { Text, View } from '@/ui';
import { ClinicVisit } from '@/ui/icons/clinic-visit';

interface MainMenuProps {}

const MainMenu = (props: MainMenuProps) => {
  return (
    <View style={styles.container}>
      <Card style={styles.menu}>
        <View className="flex flex-row ">
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />

            <Text variant="xs" className="mt-2 text-center font-semibold">
              Niền răng
            </Text>
          </View>
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />

            <Text variant="xs" className="mt-2 text-center font-semibold">
              Cấy ghép IMPLANT
            </Text>
          </View>
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />
            <Text variant="xs" className="mt-2 text-center font-semibold">
              Răng sứ thẩm mỹ
            </Text>
          </View>
        </View>
        <View className="flex flex-row ">
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />
            <Text variant="xs" className="mt-2 text-center font-semibold">
              Mặt dán sứ VENEER
            </Text>
          </View>
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />
            <Text variant="xs" className="mt-2 text-center font-semibold">
              Tẩy trắng răng
            </Text>
          </View>
          <View style={styles.itemContainerMenu}>
            <ClinicVisit />
            <Text variant="xs" className="mt-2 text-center font-semibold">
              Răng giả tháo lắm
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default MainMenu;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  menu: {},
  itemContainerMenu: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRightWidth: 1,
    borderBottomWidth: 1,

    display: 'flex',
    alignItems: 'center',
    width: '33%',
    borderColor: '#F8F8F8',
  },
});
