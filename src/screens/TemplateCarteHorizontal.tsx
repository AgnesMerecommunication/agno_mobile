/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { FlatList, Image, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import {ModelCarte} from '../constants/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCircle from '../components/CustomCircle';
import {paletteColor} from '../themes/Utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../services/redux/hooks';
import {renderActivityLoading} from '../common/activityLoading';
import { underSubscriptionType } from '../utils/data';
import PremiumModal from '../components/PremiumModal';


const TemplateCarteListHorizontal = () => {
  const [DATA_CARTE] = useState(ModelCarte.filter((item)=>item.horizontal == true));
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();
  const user: any = useAppSelector(state => state.user.users);
  const [isValidate, setIsValidate] = useState(false);


  

 
  const getRender = ({item, index}: any) => (
    <TouchableOpacity
      style={{
        width: '100%',
        marginTop: '5%', borderRadius : 20
      }}
      onPress={() => handleTemplate(item, index)}>
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
      <Image source={item.mod} style={{height: item.horizontal == true ? 200 : 500, width: '100%',borderRadius : 10}} />
    </TouchableOpacity>
  );
  const handleTemplate = async (recupTemplate : any, index : number) => {
   if(index > 2 && (user?.underSubscriptionType === underSubscriptionType.FREE ||
    user?.underSubscriptionType === underSubscriptionType.PREMIUM_LAPSED)){
      setShowModal(true);
    }else {
      navigation.navigate({
        name: 'FormulaireCarte',
        params: {recupTemplate},
      } as never);
    }
  };
  
  return (
    <>
      <View style={{marginHorizontal: 17}}>
        <CustomText fontWeight="bold" marginTop={12} fontSize={18} textAlign="center">
          Choisissez une carte
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
          data={DATA_CARTE}
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
        />
        <PremiumModal isVisible={showModal} onBackdropPress={()=> setShowModal(false)} close={()=> setShowModal(false)}/>

      </View>
      {renderActivityLoading(isValidate)}
    </>
  );
};

export default TemplateCarteListHorizontal;
