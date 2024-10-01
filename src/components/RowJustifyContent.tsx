import {FlexAlignType, View} from 'react-native';
import React from 'react';

interface PropsRow {
  children: any;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  alignItems?: FlexAlignType | undefined;
  marginTop?: string | number | undefined;
  marginBottom?: string | number | undefined;
  flex?: number | undefined;
  top?: string | number | undefined;
}

const RowJustifyContent = ({
  flex,
  children,
  justifyContent = 'space-between',
  alignItems,
  marginBottom,
  marginTop,
  top,
}: PropsRow) => {
  return (
    <View
      style={{
        flex,
        flexDirection: 'row',
        justifyContent,
        alignItems,
        marginTop,
        marginBottom,
        top,
      }}>
      {children}
    </View>
  );
};

export default RowJustifyContent;
