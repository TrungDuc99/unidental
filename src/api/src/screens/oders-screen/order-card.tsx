import {CardBase, TouchableOpacityBase} from '@components/base';
import {Colors, FontFamily, ScaleSize} from '@configs';
import {Barcode, Eye} from 'iconsax-react-native';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, View} from 'react-native-ui-lib';
import moment from 'moment';
type Oder = {
  number: string;
  date_created: string;
  status: string;
  total: number;
  id: any;
};

interface OderCardProps {
  item: Oder;
  onPress: (item: any) => void;
  key: string;
}

const OderCard = ({item, key, onPress}: OderCardProps) => {
  return (
    <Card key={item?.id} marginH-10 elevation={20} padding-10 paddingB-7 style={styles.container}>
      <View row marginV-3 style={styles.headerAction}>
        <Text style={{fontFamily: FontFamily.Bold, fontSize: ScaleSize(20)}}>
          {item?.number ?? ''}
        </Text>
        <View
          style={{
            paddingHorizontal: 7,

            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            backgroundColor:
              item?.status === 'processing'
                ? Colors.warnColor
                : item?.status === 'completed'
                ? Colors.successColor
                : item?.status === 'cancelled'
                ? Colors.errorColor
                : 'white',
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.Bold,
              fontSize: ScaleSize(12),
            }}
            color={'white'}
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
            <TouchableOpacityBase marginR-5 onPress={() => onPress(item)}>
              <Eye size={30} variant="Bulk" color={Colors.primaryColor} />
            </TouchableOpacityBase>
            {/* <TouchableOpacityBase>
              <Barcode size={30} variant="Bulk" color={Colors.primaryColor} />
            </TouchableOpacityBase> */}
          </View>
        </View>
      </View>
    </Card>
  );
};

export default OderCard;

const styles = StyleSheet.create({
  container: {},
  headerAction: {
    justifyContent: 'space-between',
  },
});
