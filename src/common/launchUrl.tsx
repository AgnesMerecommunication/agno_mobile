import {Linking} from 'react-native';

export const launchUrl = (url: string) => {
  Linking.openURL(url).catch(err =>
    console.log("impmossible d'ouvrir ce lien", err),
  );
};
