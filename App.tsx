import React, {useEffect} from 'react';
import Navigation from './src/screens/Navigation';
import {store} from './src/services/redux/store';
import {Provider} from 'react-redux';
import ErrorNetwork from './src/common/ErrorNetwork';
import CheckConnection from './src/common/CheckConnection';
import SplashScreen from 'react-native-splash-screen';
import { Linking } from 'react-native';
import { navigate } from './src/navigations/naviagationService';
import notifee, {AndroidNotificationSetting} from '@notifee/react-native';




const App = () => {
  useEffect(() => {
    const start = async ()=>{
      Linking.addEventListener('url', (event) => {
        const url = event.url;
        if (url === 'agno://agenda') {
          navigate({
            name: 'CreateBottom',
            screen: 'Agenda',
          } as never);
        }
      });
      SplashScreen.hide();
      const settings = await notifee.getNotificationSettings();
      if (settings.android.alarm == AndroidNotificationSetting.DISABLED) {
        await notifee.openAlarmPermissionSettings();
      }  
    }
    start();
  }, []);

  let connected = CheckConnection();
  if (connected === false || connected === null ) {
    return <ErrorNetwork />;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
