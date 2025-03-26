import notifee, {AndroidNotificationSetting} from '@notifee/react-native';
import React, {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import NfcManager from 'react-native-nfc-manager';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import CheckConnection from './common/CheckConnection';
import ErrorNetwork from './common/ErrorNetwork';
import {navigate} from './navigations/navigationService';
import Navigation from './screens/Navigation';
import {store} from './services/redux/store';

const App = () => {
  useEffect(() => {
    const start = async () => {
      // Check NFC support
      const hasNFC = await NfcManager.isSupported();
      if (hasNFC) {
        NfcManager.start();
      }

      Linking.addEventListener('url', event => {
        const url = event.url;
        if (url === 'agno://agenda') {
          navigate({
            name: 'CreateBottom',
            screen: 'Agenda',
          } as never);
        }
      });

      SplashScreen.hide();

      if (Platform.OS === 'android') {
        const settings = await notifee.getNotificationSettings();
        if (settings.android.alarm == AndroidNotificationSetting.DISABLED) {
          await notifee.openAlarmPermissionSettings();
        }
      }
    };
    start();
  }, []);

  let connected = CheckConnection();
  if (connected === false || connected === null) {
    return <ErrorNetwork />;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
