import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';

import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';
import CustomText from './CustomText';

const ButtonActionCircular = () => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [open, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Scan' as never);
                setOpen(false);
              }}
              style={styles.btnCenter}>
              <MaterialCommunityIcons
                name="qrcode"
                color={paletteColor.ORANGE}
              />
              <CustomText color={paletteColor.RED} fontSize={8}>
                Scan
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -70],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              style={styles.btnCenter}
              onPress={() => {
                navigation.navigate('TemplateCarte' as never);
                setOpen(false);
              }}>
              <MaterialCommunityIcons
                name="card-account-details"
                color={paletteColor.ORANGE}
              />
              <CustomText color={paletteColor.RED} fontSize={8}>
                Template
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <TouchableOpacity
              style={styles.btnCenter}
              onPress={() => {
                navigation.navigate('Photo' as never);
                setOpen(false);
              }}>
              <MaterialCommunityIcons
                name="camera"
                color={paletteColor.ORANGE}
              />
              <CustomText color={paletteColor.RED} fontSize={8}>
                Photo
              </CustomText>
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => setOpen(!open)}
          style={styles.addButton}>
            <View style={{backgroundColor : "#FEF8F2", width : 59 , height : 59, borderRadius : 50, padding : 2}}>
              <Animated.View
              style={[
                styles.addButtonInner,
                {
                  transform: [
                    {
                      rotate: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '45deg'],
                      }),
                    },
                  ],
                },
              ]}>
              <MaterialCommunityIcons
                name="plus"
                size={35}
                color={paletteColor.WHITE}
              />
              </Animated.View>
            </View>
       
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: paletteColor.BLACK,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: paletteColor.ORANGE,
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: paletteColor.WHITE,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 5.1,
  },
  itemIcon: {
    width: 32,
    height: 32,
    tintColor: paletteColor.WHITE,
  },
  btnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonActionCircular;
