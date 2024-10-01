import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import StackProducts from '../navigations/StackProducts';
import {Dimensions, View} from 'react-native';

const TabProducts = () => {
  return (
    <SafeAreaView>
      <View style={{marginTop: 0, height: Dimensions.get('screen').height}}>
        <StackProducts />
      </View>
    </SafeAreaView>
  );
};

export default TabProducts;
