import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/outline';
import {paletteColor} from '../themes/Utility';
import CardPremium from './CardPremium';

interface IPropsPremiumModal {
  isVisible: boolean | undefined;
  onBackdropPress?(): void;
  close?(): void;
}

export default function PremiumModal(props: IPropsPremiumModal) {
  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal
      visible={props.isVisible}
      transparent
      animationType="fade"
      onRequestClose={props.onBackdropPress}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={props.onBackdropPress}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              maxHeight: screenHeight * 0.8,
              borderRadius: 12,
              overflow: 'hidden',
            }}>
            <View
              style={{
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 8,
                borderBottomWidth: 0.5,
                borderBottomColor: '#e0e0e0',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={props.onBackdropPress}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <XCircleIcon color={paletteColor.RED} fill="white" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={true}
              contentContainerStyle={{
                paddingVertical: 8,
              }}>
              <CardPremium _modal={true} close={props.close} />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}
