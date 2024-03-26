import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import {wifioff} from '../utils/images';

const ErrorNetwork = () => {
  return (
    <View>
      <View style={{alignItems: 'center', flex: 1, marginTop: '20%'}}>
        <Image source={wifioff} style={{height: 220, width: 220}} />
        <CustomText textAlign="center">error Connection</CustomText>
        <CustomText textAlign="center">login Again</CustomText>
      </View>
    </View>
  );
};

export default ErrorNetwork;
