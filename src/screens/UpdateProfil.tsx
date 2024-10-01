/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BodyProject from '../components/BodyProject';
import CustomCircle from '../components/CustomCircle';
import {paletteColor} from '../themes/Utility';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CreateAccordion from '../components/CreateAccordion';
import SecurityProfil from './SecurityProfil';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {person} from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import {modifyInfoUser} from '../services/redux/reducerUser';
import {notifyMessage} from '../common/notifyMessage';
import {getExtension, uuidCustome} from '../constants/Data';
import DropDownPicker from 'react-native-dropdown-picker';
import {sexeUser} from '../utils/data';
import ReseauSociauProfil from './ReseauSociauProfil';
const UpdateProfil = () => {
  const [expandedInfo, setExpandedInfo] = useState(true);
  const handlePress = () => setExpandedInfo(!expandedInfo);
  const user: any = useAppSelector(state => state.user.users);
  const listCountry: any = useAppSelector(state => state.user.country);
  const isLoading: any = useAppSelector(state => state.user.isLoading);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [dataUser, setDataUser] = useState<any>({
    firstName: user?.firstName,
    file: {
      uri: user?.picture,
      type: 'image/jpeg',
      name: uuidCustome.slice(0, 11) + '.' + 'jpeg',
    },
  });
  const [dataInfoUser, setDataInfoUser] = useState({
    email: user?.email,
    phone: user?.phone,
    town: user?.town,
    address: user?.address,
  });
  const [gender, setGender] = useState(sexeUser);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user?.gender);
  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState(user?.country?.id);
  const [verifFile, setVerifFile] = useState<any>({
    camera: false,
    picker: false,
  });
  const [country, setCountry] = useState(
    listCountry.map((obj: {langFR: string; id: string}) => {
      return {label: obj.langFR, value: obj.id};
    }),
  );

  const handleUserName = () => {
    if (dataUser.firstName) {
      const formData = new FormData();
    formData.append('firstName', dataUser.firstName);
    formData.append('picture', dataUser.file.uri ? dataUser.file : '');
    //@ts-ignore
      dispatch(modifyInfoUser(formData, navigation));
    } else {
      notifyMessage('Renseignez le Nom ou le Prenom svp !');
    }
  };

  const handleSubmitInfo = () => {
    const formData = new FormData();
    formData.append('email', dataInfoUser.email);
    formData.append('phone', dataInfoUser.phone);
    formData.append('town', dataInfoUser.town ? dataInfoUser.town : '');
    formData.append(
      'address',
      dataInfoUser.address ? dataInfoUser.address : '',
    );
    formData.append('gender', value ? value : '');
    formData.append('country', valueCountry ? valueCountry : '');

    if (dataInfoUser.email && dataInfoUser.phone) {
        //@ts-ignore
      dispatch(modifyInfoUser(formData, navigation));
    } else {
      notifyMessage("Renseignez l'email et le Contact svp !");
    }
  };
  const choosePicker = async () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const newFile = {
          uri: image.path,
          type: image.mime,
          name: uuidCustome.slice(0, 11) + '.' + getExtension(image.path),
        };
        setDataUser({...dataUser, file: newFile});
      })
      .catch(e => console.log(e));
  };
  return (
    <BodyProject title="Retour">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={choosePicker} style={styles.imgProfil}>
            <Image
              source={
                dataUser.file.uri
                  ? {
                      uri: dataUser.file.uri,
                    }
                  : person
              }
              style={styles.imgProfil}
            />
            <View style={{top: -30, left: 50}}>
              <CustomCircle
                size={35}
                backgroundColor={paletteColor.ORANGE}
                borderRadius={40}
                disabled={true}>
                <FontAwesome5
                  name="camera"
                  size={16}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
            </View>
          </TouchableOpacity>
        </View>
        {/*<SelectPictue
          title=""
          onChangeGallery={(image: {uri: any; type: any; name: string}) => {
            const file = image;
        
            setVerifFile({picker: true, camera: false});
          }}
          onChangeCamera={(image: {uri: any; type: any; name: string}) => {
            const file = image;
          
            setVerifFile({picker: false, camera: true});
          }}
        verifFile={verifFile}
      />*/}
        <View style={styles.viewContainer}>
          <CustomTextInput
            backgroundColor={paletteColor.WHITE}
            title="Nom et prénoms" placeholder='Entrer votre  nom et vos prénoms'
            defaultValue={dataUser.firstName}
            onChangeText={e => setDataUser({...dataUser, firstName: e})}
          />


          <View style={{marginVertical: 20}}>
            <CustomButton
              label="Enregistrer"
              onPress={handleUserName}
              disabled={isLoading}
              backgroundColor={
                isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
              }
            />
          </View>
        </View>
        <CreateAccordion
          title="Information"
          expanded={expandedInfo}
          onPress={handlePress}>
          <View style={styles.viewContainer}>
            <CustomTextInput
              backgroundColor={paletteColor.WHITE}
              title="email"
              marginTop="5%"
              defaultValue={dataInfoUser.email}
              onChangeText={e => setDataInfoUser({...dataInfoUser, email: e})}
            />

            <CustomTextInput
              backgroundColor={paletteColor.WHITE}
              title="contact"
              marginTop={20}
              keyboardType="phone-pad"
              placeholder="+225 0103456677"
              defaultValue={dataInfoUser.phone}
              onChangeText={e => setDataInfoUser({...dataInfoUser, phone: e})}
            />
            <DropDownPicker
              style={{
                marginTop: 10,
                height: 55,
                borderColor: paletteColor.GRAY,
                borderWidth: 0.5,
                borderRadius: 25,
                zIndex: open ? 100 : 0,
              }}
              placeholder=""
              open={open}
              value={value}
              items={gender}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setGender}
              listMode="SCROLLVIEW"
            />
            <DropDownPicker
              style={{
                marginTop: 10,
                borderColor: paletteColor.GRAY,
                borderWidth: 0.5,
                borderRadius: 25,
                zIndex: openCountry ? 100 : 0,
              }}
              placeholder=""
              open={openCountry}
              value={valueCountry}
              items={country}
              setOpen={setOpenCountry}
              setValue={setValueCountry}
              setItems={setCountry}
              listMode="MODAL"
            />

            <CustomTextInput
              backgroundColor={paletteColor.WHITE}
              title="ville"
              marginTop={20}
              defaultValue={dataInfoUser.town}
              onChangeText={e => setDataInfoUser({...dataInfoUser, town: e})}
            />

            <CustomTextInput
              backgroundColor={paletteColor.WHITE}
              title="adresse"
              defaultValue={dataInfoUser.address}
              onChangeText={e => setDataInfoUser({...dataInfoUser, address: e})}
            />
            <View style={{marginVertical: 20}}>
              <CustomButton
                label="Enregistrer"
                onPress={handleSubmitInfo}
                disabled={isLoading}
                backgroundColor={
                  isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
                }
              />
            </View>
          </View>
        </CreateAccordion>
        <ReseauSociauProfil />
        <SecurityProfil />
      </KeyboardAwareScrollView>
    </BodyProject>
  );
};

export default UpdateProfil;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
  },
  textContainer: {},
  textArea: {
    textAlignVertical: 'top',
    borderColor: paletteColor.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 13,
  },
  imgProfil: {
    resizeMode: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: '4%',
  },
  phoneNumberView: {
    borderColor: paletteColor.GRAY,
    borderRadius: 13,
    borderWidth: StyleSheet.hairlineWidth,
    color: '#E5E5E5',
    flexShrink: 22,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
});
