/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import CustomText from '../../components/CustomText';
import {ModelCarte} from '../../constants/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCircle from '../../components/CustomCircle';
import {paletteColor} from '../../themes/Utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {renderActivityLoading} from '../../common/activityLoading';
import { isTablet } from '../../utils/deviceInfo';



const SelectScreen = () => {
  const [DATA_CARTE] = useState(ModelCarte.filter((item)=>item.horizontal == true));
  const navigation = useNavigation();
  const [isValidate] = useState(false);


  const getRender = ({item}: any) => (
    <TouchableOpacity
      style={{
        width: '100%',
        marginTop: '5%', borderRadius : 20
      }}
      onPress={() => handleTemplate(item)}>
      <View style={{alignItems: 'flex-end', top: 20, zIndex: 1, borderRadius : 20}}>
        {item.checked === true && (
          <CustomCircle
            disabled={true}
            borderColor={paletteColor.ORANGE}
            size={30}
            backgroundColor={paletteColor.ORANGE}
            borderRadius={30}
            borderWidth={1}>
            <MaterialCommunityIcons
              name="check"
              size={25}
              color={paletteColor.WHITE}
            />
          </CustomCircle>
        )}
      </View>
      <Image source={item.mod} style={{height: item.horizontal == true ? isTablet ? 600: 200 : isTablet ?800 :500, width: '100%',borderRadius : 10}} />
    </TouchableOpacity>
  );
  const handleTemplate = async (recupTemplate : any) => {
    navigation.navigate({
        name: 'StackHome',
        params: {recupTemplate},
      } as never);
  };
  
  return (
    <>
      <View style={{marginHorizontal: 17, marginTop : "10%"}}>
        <CustomText fontWeight="bold" marginTop={12} fontSize={18} textAlign="center">
          Veuillez Choisir une carte 
        </CustomText>
        <CustomTextInput
          marginTop={-5}
          placeholder="Rechercher une carte de visite"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
        />
        <FlatList
          contentInset={{top: 0, bottom: 220, left: 0, right: 0}}
          contentContainerStyle={{paddingBottom: 600}}
          keyExtractor={item => item.id.toString()}
          data={DATA_CARTE.slice(0,18)}
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {renderActivityLoading(isValidate)}
    </>
  );
};

export default SelectScreen;

//.slice(0,7)