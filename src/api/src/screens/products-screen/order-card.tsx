import {CardBase, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize} from '@configs';
import {Barcode, Eye} from 'iconsax-react-native';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, View} from 'react-native-ui-lib';
import moment from 'moment';
import {WIDTH} from '@utils';
type Oder = {
  number: string;
  date_created: string;
  status: string;
  total: number;
};

interface OderCardProps {
  item: Oder;
  onPress: any;
  key: string;
}

const OderCard = ({item, key, onPress}: OderCardProps) => {
  return (
    <Card key={key} marginH-10 elevation={20} padding-10 paddingB-7 style={styles.container}>
      <View row marginV-3 style={styles.headerAction}>
        <Text style={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(20)}}>
          {item?.number ?? ''}
        </Text>
        <Text
          color={
            item?.status === 'processing'
              ? Colors.warnColor
              : item?.status === 'completed'
              ? Colors.successColor
              : item?.status === 'cancelled'
              ? Colors.errorColor
              : 'white'
          }
        >
          {item?.status === 'processing'
            ? 'Đang xử lý'
            : item?.status === 'completed'
            ? 'Đã hoàn thành'
            : item?.status === 'cancelled'
            ? 'Đã hủy'
            : item?.status}
        </Text>
      </View>
      <View row marginV-3 style={styles.headerAction}>
        <Text style={{fontFamily: FontFamily.SemiBold, fontSize: ScaleSize(15)}}>Tổng</Text>
        <Text style={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(20)}}>
          {item?.total ?? 0}/
          <Text style={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(12)}}>1 mục</Text>
        </Text>
      </View>
      <View row marginV-3 style={styles.headerAction}>
        <Text style={{fontFamily: FontFamily.SemiBold, fontSize: ScaleSize(15)}}>Ngày</Text>
        <Text style={{fontFamily: FontFamily.Medium, fontSize: ScaleSize(15)}}>
          {moment(item.date_created).format('DD/MM/YYYY - HH:mm')}
        </Text>
      </View>
      <View>
        <View spread marginT-10 row>
          <View />
          <View row>
            <TouchableOpacityBase
              marginR-5
              onPress={() => {
                console.log(item);
              }}
            >
              <Eye size={30} variant="Bulk" color={Colors.primaryColor} />
            </TouchableOpacityBase>
            <TouchableOpacityBase>
              <Barcode size={30} variant="Bulk" color={Colors.primaryColor} />
            </TouchableOpacityBase>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default OderCard;

const styles = StyleSheet.create({
  container: {
    minWidth: (WIDTH - 15) / 2,
  },
  headerAction: {
    justifyContent: 'space-between',
  },
});
