import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import StackCarte from '../navigations/StackCarte';
import {Dimensions, View} from 'react-native';

const TabCarte = () => {
  return (
    <SafeAreaView>
      <View style={{marginTop: 10, height: Dimensions.get('screen').height}}>
        <StackCarte />
      </View>
    </SafeAreaView>
  );
};

export default TabCarte;
