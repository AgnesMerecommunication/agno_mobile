import {View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const AppLoading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator />
    </View>
  );
};

export default AppLoading;
