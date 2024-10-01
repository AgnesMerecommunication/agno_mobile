import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';

interface PropsSelected {
  onSelect: (selectedItem: any, index: number) => void;
  label?: string | number | undefined;
  data: any[];
  buttonTextAfterSelection: (selectedItem: any, index: number) => string;
  rowTextForSelection: (item: any, index: number) => string;
  defaultButtonText?: string | undefined;
}

const CustomSelected = ({
  onSelect,
  label,
  data,
  buttonTextAfterSelection,
  rowTextForSelection,
  defaultButtonText,
}: PropsSelected) => {
  return (
    <View>
      <CustomText marginTop={18}>{label}</CustomText>
      <SelectDropdown
        buttonStyle={{
          marginTop: 10,
          height: 55,
          borderColor: paletteColor.GRAY,
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 13,
          width: '100%',
        }}
        buttonTextStyle={{
          textAlign: 'left',
        }}
        defaultButtonText={defaultButtonText}
        data={data}
        renderDropdownIcon={() => (
          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={paletteColor.ORANGE}
          />
        )}
        onSelect={onSelect}
        buttonTextAfterSelection={buttonTextAfterSelection}
        rowTextForSelection={rowTextForSelection}
        // buttonTextAfterSelection={(selectedItem, index) => {
        //         return selectedItem.title
        // }}
        // rowTextForSelection={(item, index) => {
        //     // text represented for each item in dropdown
        //     // if data array is an array of objects then return item.property to represent item in dropdown
        //     return item.title
        // }}
      />
    </View>
  );
};

export default CustomSelected;
