import {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import {notifyMessage} from '../../common/notifyMessage';
import {paletteColor} from '../../themes/Utility';

interface SharedCardProps {
  sharedImage: () => Promise<void>;
  sharedLink: () => Promise<void>;
}

export default function SharedCard({sharedImage, sharedLink}: SharedCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (
    shareFunction: () => Promise<void>,
    type: 'card' | 'link',
  ) => {
    try {
      setIsSharing(true);
      await shareFunction();
      setIsVisible(false);
    } catch (error) {
      notifyMessage(
        type === 'card'
          ? 'Erreur lors du partage de la carte'
          : 'Erreur lors du partage du lien',
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={{alignItems: 'center', position: 'relative'}}>
      <Pressable onPress={() => setIsVisible(!isVisible)}>
        <View style={{alignItems: 'center'}}>
          <Icons.ShareIcon size={30} color={paletteColor.ORANGE} />
          <Text style={{fontWeight: 'bold', color: paletteColor.BLACK}}>
            Partager
          </Text>
        </View>
      </Pressable>

      {isVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            right: -12,
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 8,
            elevation: 5,
            zIndex: 1,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            minWidth: 200,
          }}>
          <TouchableOpacity
            onPress={() => handleShare(sharedImage, 'card')}
            disabled={isSharing}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            {isSharing ? (
              <ActivityIndicator size="small" color={paletteColor.ORANGE} />
            ) : (
              <Icons.CreditCardIcon color={paletteColor.BLACK} />
            )}
            <Text style={{marginLeft: 12, color: paletteColor.BLACK}}>
              Partager ma carte
            </Text>
          </TouchableOpacity>

          <View
            style={{
              borderBottomColor: 'rgba(0,0,0,0.1)',
              borderBottomWidth: 1,
              marginVertical: 8,
            }}
          />

          <TouchableOpacity
            onPress={() => handleShare(sharedLink, 'link')}
            disabled={isSharing}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            {isSharing ? (
              <ActivityIndicator size="small" color={paletteColor.ORANGE} />
            ) : (
              <Icons.GlobeAltIcon color={paletteColor.BLACK} />
            )}
            <Text style={{marginLeft: 12, color: paletteColor.BLACK}}>
              Partager mon site
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
