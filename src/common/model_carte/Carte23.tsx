/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte23 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
       // justifyContent: 'space-between',
      }}>
      <View style={{
            marginLeft  : 40,
            marginRight : 20,
            paddingTop : 32,
            flexDirection : 'row',
            alignContent : 'center',
            justifyContent : 'center'
        }}>
        {data.nom.length > 0 && (
            <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
               color={"#073447"}
             fontWeight="700" fontSize={20}>
               {data.nom}
            </CustomText>
          )}
      </View>
      <View
        style={{
            marginLeft  : 30,
            marginRight : 20,
            paddingTop : 0,
            flexDirection : 'row',
            alignContent : 'center',
            justifyContent : 'center'
        }}>
        {/*<View style={{width : 12, height:12, backgroundColor: 'black', marginRight : 2,marginTop:0}}></View>*/}
        {data.titrePro.length > 0 && (
            <CustomText padding={0} marginTop={0} marginLeft={40}  color={"#073447"} fontWeight="600" fontSize={12}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>{/*#0BAE6B*/}
      <View style={{height : 85, width : 85, marginLeft : 220, marginTop : 0,
         flexDirection : 'row', justifyContent : 'center', alignItems : "center", borderColor : "#0BAE6B",  
         borderWidth : 2}}>
              <QRCode
                size={75} 
                value={code}
              />
        </View>
    <View style={{position : 'absolute', marginTop : 115, marginLeft : 0}}>
    {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }} resizeMode='contain'
            style={{width: 270, height: 60}}
          />
        )}
    </View>
       
    <View style={{position : 'absolute', marginTop : 185, marginLeft : 0, flexDirection : 'row'}}>
      <CustomText padding={0} marginTop={0} marginLeft={10}  color={paletteColor.RED} fontWeight="900" fontSize={12}>
        AGNO
      </CustomText>
      <CustomText padding={0} marginTop={0} marginLeft={2}  color={paletteColor.ORANGE} fontWeight="900" fontSize={12}>
        CARD 
      </CustomText>
    </View>
        
    </View>
  );
};

export default Carte23;
