import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useInscription} from '../hooks/InscriptionProvider';
import {accountType} from '../utils/data';
import {paletteColor} from '../themes/Utility';
import {dataProfil} from '../constants/Data';
import {IDataInscription} from '../types/api';
import CustomTextIcon from '../components/CustomTextIcon';
import CustomText from '../components/CustomText';

const ChooseProfilInscription = () => {
  const [DATA_PROFIL, setDATA_PROFIL] = useState(dataProfil);
  const {setInscriptionData} = useInscription();

  const handleProfil = (item: {
    id: number;
    profil: string;
    status: boolean;
    title: string;
  }) => {
    setDATA_PROFIL(
      DATA_PROFIL.map(val =>
        val.id === item.id ? {...item, status: true} : {...val, status: false},
      ),
    );
    setInscriptionData((previousState: IDataInscription) => {
      return {
        ...previousState,
        accountType:
          item.profil === DATA_PROFIL[0].profil
            ? accountType.PERSONAL
            : accountType.PROFESSIONAL,
      };
    });
  };
  return (
    <View>
      {DATA_PROFIL.map(item => (
        <View key={item.id} style={{marginVertical: 10}}>
          <TouchableOpacity
            onPress={() => handleProfil(item)}
            style={{
              backgroundColor: item.status
                ? paletteColor.ORANGE_OPACITY
                : paletteColor.WHITE,
              borderRadius: 13,
              borderWidth: 1,
              borderColor: item.status
                ? paletteColor.ORANGE
                : paletteColor.GRAY,
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}>
            <CustomTextIcon
              color={item.status ? paletteColor.ORANGE : paletteColor.BLACK}
              colorText={item.status ? paletteColor.ORANGE : paletteColor.BLACK}
              nameIcon="account"
              title={item.profil}
            />
            <CustomText fontSize={13} marginTop={10}>
              {item.title}
            </CustomText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default ChooseProfilInscription;
