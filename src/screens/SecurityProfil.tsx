/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CreateAccordion from '../components/CreateAccordion';
import CustomTextInput from '../components/CustomTextInput';
import {paletteColor} from '../themes/Utility';
import CustomButton from '../components/CustomButton';
import {notifyMessage} from '../common/notifyMessage';
import {updatePassword} from '../services/apiServices';
import {useAppSelector} from '../services/redux/hooks';
import {asyncRemoveGetToken} from '../services/asyncStorage';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {useAuth} from '../hooks/AuthProvider';

const SecurityProfil = () => {
  const [expandedSecurity, setExpandedSecurity] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = useState({
    ancien: false,
    nouveau: false,
    confirm: false,
  });
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState('');
  const isLoading: any = useAppSelector(state => state.user.isLoading);
  const {dispatchAuhtContext} = useAuth();

  const handlePressSecu = () => setExpandedSecurity(!expandedSecurity);

  const handleUpdatePassword = async () => {
    if (oldPassword && newPassword && newPasswordConfirm) {
      if (newPassword === newPasswordConfirm) {
        const data = {oldPassword: oldPassword, newPassword: newPassword};
        try {
          await updatePassword(data);
          dispatchAuhtContext(actionReducer(actionTypeReducer.SIGN_OUT));
          asyncRemoveGetToken();
        } catch (error: any) {
          notifyMessage(error?.response?.data?.message);
        }
      } else {
        notifyMessage('mot de passe ne correspond pas');
      }
    } else {
      notifyMessage('Renseinez tous les champs svp !');
    }
  };
  return (
    <CreateAccordion
      title="securite"
      expanded={expandedSecurity}
      onPress={handlePressSecu}>
      <View style={styles.viewContainer}>
        <CustomTextInput
          onChangeText={e => setOldPassword(e)}
          backgroundColor={paletteColor.WHITE}
          colorIcon={paletteColor.ORANGE}
          verifIcon={true}
          secureTextEntry={secureTextEntry.ancien}
          onPress={() =>
            setSecureTextEntry({
              ...secureTextEntry,
              ancien: !secureTextEntry.ancien,
            })
          }
          title="Mot de passe actuel"
          placeholder="*******************"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          onChangeText={e => setNewPassword(e)}
          colorIcon={paletteColor.ORANGE}
          verifIcon={true}
          secureTextEntry={secureTextEntry.nouveau}
          onPress={() =>
            setSecureTextEntry({
              ...secureTextEntry,
              nouveau: !secureTextEntry.nouveau,
            })
          }
          title="Nouveau mot de passe"
          placeholder="*******************"
        />
        <CustomTextInput
          backgroundColor={paletteColor.WHITE}
          onChangeText={e => setNewPasswordConfirm(e)}
          colorIcon={paletteColor.ORANGE}
          verifIcon={true}
          secureTextEntry={secureTextEntry.confirm}
          onPress={() =>
            setSecureTextEntry({
              ...secureTextEntry,
              confirm: !secureTextEntry.confirm,
            })
          }
          title="Confirmer nouveau mot de passe"
          placeholder="*******************"
        />

        <View style={{marginVertical: 20}}>
          <CustomButton
            label="Enregistrer"
            disabled={isLoading}
            backgroundColor={
              isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
            }
            onPress={handleUpdatePassword}
          />
        </View>
      </View>
    </CreateAccordion>
  );
};

export default SecurityProfil;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
  },
});
