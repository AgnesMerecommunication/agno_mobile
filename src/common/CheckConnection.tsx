import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

let currentNetwork: boolean | null;

const CheckConnection = () => {
  const [netInfo, setNetInfo] = useState(true as boolean | null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return netInfo;
};

export default CheckConnection;
