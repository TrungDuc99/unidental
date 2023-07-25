import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import { EmptyList, View } from '@/ui';

import { Card } from './card';
const data = [
  {
    id: '1',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2023/03/IMG_20230301_103952-1024x1024.jpg',
    title: 'CẤY IMPLANT KHÔNG ĐƠN GIẢN LÀ PHỤC HÌNH RĂNG MÀ CÒN LÀ NGHỆ THUẬT',
    decription:
      'CẤY IMPLANT KHÔNG ĐƠN GIẢN LÀ PHỤC HÌNH RĂNG MÀ CÒN LÀ NGHỆ THUẬT Theo đúng quy trình của 1 case cấy implant đó là : thăm khám tư vấn, chụp XQ, cấy chân trụ, gắn healing, gắn mão răng. Và để cấy được 1 trụ implant xuống sao cho ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '2',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2023/02/IMG_20230209_102857-1024x1024.jpg',
    title: 'TRỒNG RĂNG CHỈ TỪ 6 TRIỆU TRỌN GÓI',
    decription:
      '  🎯 CẤY GHÉP IMPLANT CHỈ TỪ 6 TRIỆU TRỌN GÓI XU HƯỚNG TRỒNG RĂNG THỜI 4.0 Mất răng không chỉ xảy ra với người có tuổi, mà tỉ lệ người trẻ tuổi bị mất răng sớm ngày càng tăng cao. Do chế độ ăn uống và vệ sinh, cùng ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '3',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2022/10/1ef5542a3a7ffd21a46e-1024x594.jpg',
    title: 'HƯỚNG DẪN CÁC KÊNH SERVICE HỖ TRỢ KHÁCH HÀNG',
    decription:
      'HƯỚNG DẪN CÁC KÊNH SERVICE HỖ TRỢ KHÁCH HÀNG Chào các bạn khách hàng đang sử dụng dịch vụ tại nha khoa Uni Dental. Hiện tại Zalo của nha khoa là kênh liên lạc tổng hợp bao gồm: hẹn lịch khám, giải đáp, tư vấn, thắc mắc. Trong khi Zalo ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '4',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2022/09/b7a21baa7623b27deb32-1024x1024.jpg',
    title: 'THỜI GIAN TÁI KHÁM CÁC LOẠI MẮC CÀI',
    decription:
      'THỜI GIAN TÁI KHÁM CÁC LOẠI MẮC CÀI Chào các bạn. Sẽ có rất nhiều bạn có thể đang thắc mắc hoặc bức xúc việc ” Tại sao nha khoa hẹn tái khám không đúng ngày”. Vậy thời gian tái khám của mắc cài thường và mắc cài tự buộc ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '5',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2022/08/117391983_173682697596501_1567021151330714363_n.jpg',
    title: 'SO SÁNH 3 DÒNG TRỤ PHỔ BIẾN NHẤT HIỆN NAY',
    decription:
      'Cũng giống như thẩm mỹ răng sứ thì trụ Implant  cũng có nhiều loại khác nhau. Chính vì vậy, hầu hết khách hàng khi đến thăm khám tại Nha khoa Uni Dental đều có chung một mối lo lắng đó là, đâu mới là loại trụ tốt nhất hiện nay ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '5',
    image:
      'http://nhakhoauni.com/wp-content/uploads/2021/01/khi-nao-nen-di-nieng-rang.png.jpg',
    title: 'KHI NÀO NÊN ĐI NIỀNG RĂNG?',
    decription:
      'Niềng răng – chỉnh nha là một thủ thuật nha khoa làm cho hàm răng trở nên thẳng hàng và đều đặn, đồng thời nắn chỉnh khớp cắn đạt tỷ lệ chuẩn. Vậy khi nào nên đi niềng răng – chỉnh nha? Theo các chuyên gia nha khoa, bạn nên tiến ...					',
    createdAt: new Date(),
    content: '',
  },
  {
    id: '5',
    image: 'http://nhakhoauni.com/wp-content/uploads/2019/09/nguyenham.jpg',
    title: 'Chi phí bọc răng sứ nguyên hàm bao nhiêu tiền?',
    decription:
      'Bạn đang có nhu cầu tân trang hàm răng của mình? Bạn phân vân không biết nên lựa chọn hình thức bọc răng nào phù hợp? Nếu bạn đang băn khoăn, hãy tham khảo ngay phương án bọc răng sứ nguyên hàm đang rất HOT hiện nay. Trong bài viết này, ...					',
    createdAt: new Date(),
    content: '',
  },
];
export const Feed = () => {
  // const { data, isLoading, isError } = usePosts();
  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: any }) => <Card {...item} />,
    []
  );

  // if (isError) {
  //   return (
  //     <View>
  //       <Text> Error Loading data </Text>
  //     </View>
  //   );
  // }
  return (
    <View className="flex-1 ">
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        estimatedItemSize={300}
      />
    </View>
  );
};
