import React, {useEffect} from 'react';
import Navigation from './src/screens/Navigation';
import {store} from './src/services/redux/store';
import {Provider} from 'react-redux';
import ErrorNetwork from './src/common/ErrorNetwork';
import CheckConnection from './src/common/CheckConnection';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  let connected = CheckConnection();
  if (connected === false) {
    return <ErrorNetwork />;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
