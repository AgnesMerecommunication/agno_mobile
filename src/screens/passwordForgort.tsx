import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {} from 'react-native-keyboard-aware-scroll-view';
import BodyProject from '../components/BodyProject';
import {renderActivityLoading} from '../common/activityLoading';
import CustomText from '../components/CustomText';
import {paletteColor} from '../themes/Utility';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {resetPassword} from '../services/apiServices';
import {notifyMessage} from '../common/notifyMessage';

const PasswordForgot = () => {
  const [mail, setMail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const handleSubmit = async () => {
    if (mail) {
      const data = {email: mail};
      setIsLoading(true);
      try {
        await resetPassword(data);
        setIsLoading(false);
        notifyMessage(
          'votre mot de passe à été changé avec succès verifier boite mail',
        );
        navigation.navigate('Login' as never);
      } catch (error: any) {
        notifyMessage(error?.response?.data?.message);

        setIsLoading(false);
      }
    } else {
      notifyMessage('Renseignez votre email svp !');
    }
  };
  return (
    <BodyProject title="Retour">
      <View style={styles.container}>
        {renderActivityLoading(isLoading)}
        <>
          <CustomText
            textAlign="center"
            color={paletteColor.BLUE}
            fontWeight="bold"
            fontSize={30}
            marginTop="5%">
            Mot de passe oublié
          </CustomText>

          <CustomText textAlign="center">
            entrez votre email pour recevoir un nouveau mot de passe temporaire
          </CustomText>

          <View style={styles.viewButton}>
            <CustomTextInput
              onChangeText={e => setMail(e)}
              title={'email'}
              placeholder="email@email.com"
            />
          </View>

          <View style={styles.viewButton}>
            <CustomButton
              disabled={isLoading}
              label={'Valider'}
              backgroundColor={
                isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
              }
              onPress={handleSubmit}
            />
          </View>
        </>
      </View>
    </BodyProject>
  );
};

export default PasswordForgot;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 17,
  },

  viewButton: {marginTop: 20},
});
