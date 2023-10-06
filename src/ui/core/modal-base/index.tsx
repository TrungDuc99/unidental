import { BlurView } from 'expo-blur';
import { CloseCircle } from 'iconsax-react-native';
import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

import { ScaleSize } from '@/configs';

import { TouchableOpacity } from '../touchable-opacity';
export type ModalBaseProps = {
  visible: boolean;
  onCancel?: () => void;
  content?: any;
};
const ModalBase = ({ visible, content, onCancel }: ModalBaseProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={[{ justifyContent: 'flex-end', margin: 0 }, styles.absolute]}
      visible={visible}
      onRequestClose={() => {
        onCancel && onCancel();
      }}
    >
      <BlurView style={styles.absolute} tint="dark" intensity={10} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => {
              onCancel && onCancel();
            }}
            style={{
              padding: 5,
              borderRadius: 1000,
              width: ScaleSize(42),
              height: ScaleSize(42),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              position: 'absolute',
              bottom: -70,
              left: 130,
            }}
          >
            <CloseCircle variant="Bulk" color="#DA202C" size={35} />
          </TouchableOpacity>
          {content && content}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,

    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,

    bottom: 0,
    right: 0,
  },
});

export default ModalBase;
