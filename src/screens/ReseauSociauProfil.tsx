/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CreateAccordion from '../components/CreateAccordion';
import CustomTextInput from '../components/CustomTextInput';
import {paletteColor} from '../themes/Utility';
import CustomButton from '../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {modifyInfoUser} from '../services/redux/reducerUser';

const ReseauSociauProfil = () => {
  const [expandedSecurity, setExpandedSecurity] = React.useState(false);
  const handlePressSecu = () => setExpandedSecurity(!expandedSecurity);
  const user: any = useAppSelector(state => state.user.users);
  const isLoading: any = useAppSelector(state => state.user.isLoading);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [dataInfoUser, setDataInfoUser] = useState({
    linkedin: user?.linkedin,
    twitter: user?.twitter,
    facebook: user?.facebook,
    instagram: user?.instagram,
    whatsapp: user?.whatsapp,
  });
  const handleSubmitReseau = () => {
    const formData = new FormData();
    formData.append(
      'linkedin',
      dataInfoUser.linkedin ? dataInfoUser.linkedin : '',
    );
    formData.append(
      'twitter',
      dataInfoUser.twitter ? dataInfoUser.twitter : '',
    );
    formData.append(
      'facebook',
      dataInfoUser.facebook ? dataInfoUser.facebook : '',
    );
    formData.append(
      'instagram',
      dataInfoUser.instagram ? dataInfoUser.instagram : '',
    );
    formData.append(
      'whatsapp',
      dataInfoUser.whatsapp ? dataInfoUser.whatsapp : '',
    );
    //@ts-ignore
    dispatch(modifyInfoUser(formData, navigation));
  };

  return (
    <CreateAccordion
      title="Réseaux sociaux"
      expanded={expandedSecurity}
      onPress={handlePressSecu}>
      <View style={styles.viewContainer}>
        <CustomTextInput
          marginTop="5%"
          backgroundColor={paletteColor.WHITE}
          title="linked in"
          defaultValue={dataInfoUser.linkedin}
          onChangeText={e => setDataInfoUser({...dataInfoUser, linkedin: e})}
          verifIcon={true}
          nameIcon="linkedin"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          title="twitter"
          defaultValue={dataInfoUser.twitter}
          onChangeText={e => setDataInfoUser({...dataInfoUser, twitter: e})}
          verifIcon={true}
          nameIcon="twitter"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          title="facebook"
          defaultValue={dataInfoUser.facebook}
          onChangeText={e => setDataInfoUser({...dataInfoUser, facebook: e})}
          verifIcon={true}
          nameIcon="facebook"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          title="instagram"
          defaultValue={dataInfoUser.instagram}
          onChangeText={e => setDataInfoUser({...dataInfoUser, instagram: e})}
          verifIcon={true}
          nameIcon="instagram"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          title="whatsapp"
          defaultValue={dataInfoUser.whatsapp}
          onChangeText={e => setDataInfoUser({...dataInfoUser, whatsapp: e})}
          verifIcon={true}
          nameIcon="whatsapp"
        />
        <View style={{marginVertical: 20}}>
          <CustomButton
            label="Enregistrer"
            disabled={isLoading}
            backgroundColor={
              isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
            }
            onPress={handleSubmitReseau}
          />
        </View>
      </View>
    </CreateAccordion>
  );
};

export default ReseauSociauProfil;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
  },
});
