import React, {useState} from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import BodyProject from '../components/BodyProject';
import CustomText from '../components/CustomText';
import BottomSheetComponent from '../components/BottomSheetComponent';
import RowJustifyContent from '../components/RowJustifyContent';
import {paletteColor} from '../themes/Utility';
import { getOneBusinessCardsByPublicKey, getOneBusinessCardsByQr} from '../services/apiServices';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {createBusinessCardSave} from '../services/redux/reducerCard';
import {renderActivityLoading} from '../common/activityLoading';
import {notifyMessage} from '../common/notifyMessage';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Scan = () => {
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [dataCard, setDataCard] = useState<any>({data: null, id: ''});
  const isLoadingCardSave: boolean = useAppSelector(
    state => state.cards.isLoadingCardSave,
  );
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  async function onSuccess(e: {data: string}) {
    if (e) {
      try {
        let publicKey = e.data.replace('https://agno.vercel.app/','');
        const result = await getOneBusinessCardsByPublicKey(publicKey);
        setIsVisibleBottom(true);
        setDataCard({id: result.data.id, data: result.data});
        /*const dataSuccess = e.data.split(',');
        if (dataSuccess[0] === 'agno') {
          const result = await getOneBusinessCardsByQr(dataSuccess[1]);
          setIsVisibleBottom(true);
          setDataCard({id: result.data.id, data: result.data});
        } else {
          notifyMessage('Qrcode incorrecte');
          navigation.goBack();
        }*/
      } catch (error: any) {
        Alert.alert('D', JSON.stringify(error));
        notifyMessage(error?.response?.data?.message);
        navigation.goBack();
      }
    }
  }

  function makeSlideOutTranslation(translationType: string, fromValue: number) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  }

  return (
    <BodyProject title="Annuler">
      <QRCodeScanner
        showMarker
        onRead={onSuccess}
        cameraStyle={{height: SCREEN_HEIGHT}}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <CustomText textAlign="center">
                <CustomText
                  fontWeight="bold"
                  fontSize={18}
                  textAlign="center"
                  color="white">
                  Placer correctement la {'\n'}
                </CustomText>
                <CustomText
                  fontWeight="bold"
                  fontSize={18}
                  textAlign="center"
                  color="white">
                  carte pour le scan
                </CustomText>
              </CustomText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <View style={{height: SCREEN_WIDTH * 0.73}} />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    'translateY',
                    SCREEN_WIDTH * -0.54,
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
      {isVisibleBottom && (
        <BottomSheetComponent isVisible={isVisibleBottom}>
          <CustomText
            fontWeight="500"
            marginTop={5}
            marginBottom={15}
            fontSize={18}
            textAlign="center">
            Capture prise
          </CustomText>
          <Image
            source={{
              uri: `${dataCard?.data?.picture}`,
            }}
            style={{height: 170}}
          />
          <TouchableOpacity
            onPress={() => {
              setIsVisibleBottom(false);
              navigation.goBack();
            }}>
            <RowJustifyContent
              justifyContent="flex-start"
              alignItems="center"
              marginTop={25}>
              <View style={styles.viewCarte} />
              <View>
                <CustomText fontSize={12} marginLeft={5}>
                  Reprendre le scan
                </CustomText>
              </View>
            </RowJustifyContent>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            onPress={() => {
              setIsVisibleBottom(false);
              if (dataCard?.id) {
                dispatch(createBusinessCardSave(dataCard?.id, navigation));
              }
            }}>
            <RowJustifyContent
              justifyContent="flex-start"
              alignItems="center"
              marginTop={35}
              marginBottom={'25%'}>
              <View style={styles.viewCarte} />
              <CustomText fontSize={12} marginLeft={5}>
                Enregistrer
              </CustomText>
            </RowJustifyContent>
          </TouchableOpacity>
        </BottomSheetComponent>
      )}
      {renderActivityLoading(isLoadingCardSave)}
    </BodyProject>
  );
};

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  separator: {
    marginTop: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: paletteColor.GRAY,
  },
  viewCarte: {
    width: 50,
    height: 50,
    backgroundColor: paletteColor.ORANGE_OPACITY,
    borderRadius: 50,
  },
});

export default Scan;
