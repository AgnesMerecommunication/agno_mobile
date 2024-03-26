import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { StyleSheet, View, Text, FlexAlignType } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface BottomSheetComponentProps {
  isVisible: boolean | undefined;
  onBackdropPress?(): void;
  children: any;
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined;
  alignItems?: FlexAlignType | undefined
};

const BottomSheetComponent = ({ isVisible, onBackdropPress, children, justifyContent, alignItems }: BottomSheetComponentProps) => {
  return (<SafeAreaProvider>
    <BottomSheet modalProps={{}} isVisible={isVisible}
      onBackdropPress={onBackdropPress}
    >
      <ListItem
        containerStyle={{ marginHorizontal: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
        <ListItem.Content style={{ justifyContent, alignItems }}>
          {children}
        </ListItem.Content>
      </ListItem>

    </BottomSheet>
  </SafeAreaProvider>)
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});

export default BottomSheetComponent;