import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const CheckConnection = (): boolean | null => {
  const [netInfo, setNetInfo] = useState<boolean | null>(null); // Commencer par `null`

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return netInfo; // Peut être `true`, `false` ou `null`
};

export default CheckConnection;
