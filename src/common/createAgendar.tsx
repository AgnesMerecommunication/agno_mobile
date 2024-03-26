import {PermissionsAndroid, Platform} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

export const openCalendar = async (
  title: string,
  startDate: string,
  endDate: string,
  notes: string,
) => {
  const eventConfig = {
    title,
    startDate,
    endDate,
    notes,
    // navigationBarIOS: {
    //   tintColor: 'orange',
    //   backgroundColor: 'green',
    //   titleColor: 'blue',
    // },
  };

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission de  stockage',
          message:
            "APK a besoin d'un accès à votre stockage de fichié " +
            'pour que vous puissiez sauvegarder les fichiers.',
          buttonNeutral: 'Demandez-moi plus tard',
          buttonNegative: 'cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
          .then(eventInfo => {
            console.log('aclendar add', eventInfo);
          })
          .catch(error => {
            console.log('Error -> ' + error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  }
  if (Platform.OS === 'ios') {
    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {
        console.log('aclendar add', eventInfo);
      })
      .catch(error => {
        console.log('Error -> ' + error);
      });
  }
};
