/* eslint-disable react-native/no-inline-styles */
import {Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {paletteColor} from '../themes/Utility';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import {formateDate} from '../utils/formateDate';
import {useFormik} from 'formik';
import {eventForm} from '../utils/validation-yup';
import {formateTime} from '../utils/formateTime';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {createEvent, modifyOneEvent} from '../services/redux/reducerAgenda';
import {useNavigation} from '@react-navigation/native';
import {renderActivityLoading} from '../common/activityLoading';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { lauchNotif} from '../utils/AgendaUtilis';
import notifee, { AndroidNotificationSetting} from '@notifee/react-native';







const CreateEvenement = ({route}: any) => {
  const dataUpdate = route.params?.dataUpdate;
  const update = route.params?.update;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isLoading: boolean = useAppSelector(state => state.agenda.isLoading);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [valueDate, setValueDate] = useState(
    update === true ? new Date(dataUpdate?.date) : null,
  );

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);
  const [valueTime, setValueTime] = useState({
    heureDebut: update === true ? new Date(dataUpdate?.from) : null,
    heureFin: update === true ? new Date(dataUpdate?.to) : null,
  });

  const handleNotificationPermission = async () => {
    const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
   // PERMISSIONS.ANDROID.;
    const result = await check(permission);
    if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
    } else {
      
    }
  };
  const formik = useFormik({
    initialValues: {
      title: update === true ? dataUpdate?.title : '',
      description: update === true ? dataUpdate?.description : '',
      place: update === true ? dataUpdate?.place : '',
      email: update === true ? dataUpdate?.email : '',
    },
    validationSchema: eventForm,
    onSubmit: async values => {
      try {
        if (valueDate && valueTime.heureDebut && valueTime.heureFin) {
          const data = {
            ...values,
            date: valueDate,
            from: valueTime.heureDebut,
            to: valueTime.heureFin,
          };
          update === true //@ts-ignore
            ? dispatch(modifyOneEvent(dataUpdate?.id, data, navigation))//@ts-ignore
            : dispatch(createEvent(data, navigation));
             // Demander la permission après l'envoi du formulaire
             if (Platform.OS === 'android') {
             await handleNotificationPermission();
            }
            const settings = await notifee.getNotificationSettings();
            if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
              //Create timestamp trigger
            } else {
              await notifee.openAlarmPermissionSettings();
            }
           // let now = Date.now();
            let time = new Date(valueDate.getFullYear(), valueDate.getMonth(),
             valueDate.getDate(), valueTime.heureDebut.getHours(), valueTime.heureDebut.getMinutes())
             await lauchNotif({agenda : values, time : time})
           /* time.setMinutes(time.getMinutes() - 10);
            if(now < time.getTime()){
              await notif(values.title, `L'evénement "${values.title}" arrivera dans  moins de 10  minutes.`, time.getTime());
              time.setMinutes(valueTime.heureDebut.getMinutes() - 30);
              if(now < time.getTime()){
                await notif(values.title, `L'evénement "${values.title}" arrivera dans  moins de 30  minutes.`, time.getTime());
              }
            }*/         
         //   await startBackgroundTask();
            
        }
      } catch (error) {
        console.log(error);
      }
     
    },
  });


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setValueDate(date);

    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (date: any) => {
    setValueTime({...valueTime, heureDebut: date});
    hideTimePicker();
  };

  const showTimePicker2 = () => {
    setTimePickerVisibility2(true);
  };

  const hideTimePicker2 = () => {
    setTimePickerVisibility2(false);
  };

  const handleConfirmTime2 = (date: any) => {
    setValueTime({...valueTime, heureFin: date});

    hideTimePicker2();
  };

  return (
    <BodyProject title="Retour">
      <ScrollView>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
          is24Hour={true}
          locale="en_GB"
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible2}
          mode="time"
          onConfirm={handleConfirmTime2}
          onCancel={hideTimePicker2}
          is24Hour={true}
          locale="en_GB"
        />
        <View style={styles.viewContainer}>
          <View>
            <CustomText
              fontWeight="bold"
              fontSize={20}
              marginTop="5%"
              marginBottom="2%">
              Rendez-vous
            </CustomText>

            <CustomTextInput
              defaultValue={formik.values.title}
              onChangeText={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              backgroundColor="white"
              title={'Titre*'}
              placeholder={'titre'}
              marginTop={20}
            />
            {formik.touched.title && formik.errors.title ? (
              <CustomText color={paletteColor.RED} fontSize={10}>
                {formik.errors.title}
              </CustomText>
            ) : null}
            <CustomTextInput
              onChangeText={formik.handleChange('place')}
              backgroundColor="white"
              title={`Lieu`}
              defaultValue={formik.values.place}
              placeholder={'abidjan, rue 225'}
              marginTop={20}
            />
            <CustomTextInput
              onChangeText={formik.handleChange('email')}
              backgroundColor="white"
              title={`Invitation par mail*`}
              defaultValue={formik.values.email}
              placeholder={'email@email.com'}
              marginTop={20}
            />
            {formik.touched.email && formik.errors.email ? (
              <CustomText color={paletteColor.RED} fontSize={10}>
                {formik.errors.email}
              </CustomText>
            ) : null}
            <View>
              <CustomTextInput
                onPress={showDatePicker}
                backgroundColor="white"
                disabled={true}
                title={'Date*'}
                placeholder="dd-mm-aaaa"
                marginTop={20}
                verifIcon={true}
                nameIcon="calendar"
                colorIcon={paletteColor.ORANGE}
                editable={false}
                value={valueDate ? formateDate(new Date(valueDate)) : undefined}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <View style={{width: '45%'}}>
                <CustomTextInput
                  onPress={showTimePicker}
                  backgroundColor="white"
                  disabled={true}
                  title={'De*'}
                  placeholder="08:00"
                  marginTop={20}
                  verifIcon={true}
                  nameIcon="clock-time-four-outline"
                  colorIcon={paletteColor.ORANGE}
                  editable={false}
                  value={
                    valueTime.heureDebut
                      ? formateTime(new Date(valueTime.heureDebut))
                      : undefined
                  }
                />
              </View>
              <View style={{width: '45%'}}>
                <CustomTextInput
                  onPress={showTimePicker2}
                  backgroundColor="white"
                  disabled={true}
                  title={'A*'}
                  placeholder="12:00"
                  marginTop={20}
                  verifIcon={true}
                  nameIcon="clock-time-four-outline"
                  colorIcon={paletteColor.ORANGE}
                  editable={false}
                  value={
                    valueTime.heureFin
                      ? formateTime(new Date(valueTime.heureFin))
                      : undefined
                  }
                />
              </View>
            </View>

            <CustomText>Description</CustomText>
            <TextInput
              defaultValue={formik.values.description}
              onChangeText={formik.handleChange('description')}
              style={styles.textArea}
              multiline={true}
              numberOfLines={8}
              placeholder="description"
              placeholderTextColor={paletteColor.GRAY}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <View style={{width: '45%'}}>
              <CustomButton
                label="Annuler"
                borderWidth={1}
                borderColor={
                  isLoading ? paletteColor.RED_OPACITY : paletteColor.RED
                }
                backgroundColor="transparent"
                colorText={paletteColor.RED}
                disabled={isLoading}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={{width: '45%'}}>
              <CustomButton
                label="Enregistrer"
                onPress={formik.handleSubmit}
                disabled={isLoading}
                backgroundColor={
                  isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
                }
              />
            </View>
          </View>
        </View>
        {renderActivityLoading(isLoading)}
      </ScrollView>
    </BodyProject>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
    justifyContent: 'space-between',
  },
  textArea: {
    textAlignVertical: 'top',
    borderColor: paletteColor.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 13,
    paddingBottom: Platform.OS === 'ios' ? 100 : 0,
    color: paletteColor.BLACK,
    backgroundColor: 'white',
    padding: '2%',
  },
});
export default CreateEvenement;


