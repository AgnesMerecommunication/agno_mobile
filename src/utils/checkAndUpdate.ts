import { Alert } from 'react-native';
import * as RNFS from '@dr.pogodin/react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { baseUrl } from './urls';
import axios from 'axios';



export const checkAndUpdateAppOnline = async () => {
  const versionUrl = baseUrl + '/local-files/version/app'; // URL du fichier version.json sur votre serveur
  const bundlePath = `${RNFS.DocumentDirectoryPath}/index.android.bundle`;

  try {
    // Récupérer la version actuelle de l'application
    const currentVersion = await AsyncStorage.getItem('appVersion');
   // Alert.alert(currentVersion ?? '');
    // Récupérer la version disponible sur le serveur
    const versionResponse = await axios.get(versionUrl);
    const { version: serverVersion} = await versionResponse.data;
   
    if (Number.parseFloat(currentVersion ?? '1.0') < serverVersion) {
      const bundleUrl = baseUrl +  "/local-files/download/app/android/" + serverVersion; // URL du fichier index.android.bundle sur votre serveur
      // Télécharger et remplacer le fichier index.android.bundle
      const newBundleResponse = await axios.get(bundleUrl);
      Alert.alert("s", newBundleResponse.status + "");
      const bundleContent = await newBundleResponse.data;
      Alert.alert("Index", bundleContent);
      // Écrire le nouveau bundle dans le répertoire approprié
      await RNFS.writeFile(bundlePath, bundleContent, 'utf8');
      // Mettre à jour la version stockée localement
      await AsyncStorage.setItem('appVersion', serverVersion +"");
      // Redémarrer l'application pour appliquer les changements
      RNRestart.Restart();
    }
  } catch (error) {
    console.error('App update error:', error);
    Alert.alert('Erreur', JSON.stringify(error));
  }
};


