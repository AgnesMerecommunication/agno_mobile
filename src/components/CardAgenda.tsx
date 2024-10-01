import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {paletteColor} from '../themes/Utility';
import {formateTime} from '../utils/formateTime';
import {statusEvent} from '../utils/statusEvent';
import {formateDate} from '../utils/formateDate';

interface IPropsCardAgenda {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  item: {
    id: string;
    title: string;
    adresse: string;
    from: string;
    to: string;
    date: string;
    description: string;
    place: string;
    email: string;
    status: string;
  };
}

const CardAgenda = ({item, onPress}: IPropsCardAgenda) => {
  const {etat, color} = statusEvent(
    formateDate(new Date(item.from)),
    item.status,
  );
  return (
    <>
      <TouchableOpacity style={styles.cardNotif} onPress={onPress}>
        <View>
          <CustomText fontWeight="bold">{item.title}</CustomText>
          <CustomText color={paletteColor.GRAY}>{item.place}</CustomText>
          <CustomText>
            {formateTime(new Date(item.from))} -{' '}
            {formateTime(new Date(item.to))}
          </CustomText>
        </View>
        <View>
          <CustomText fontSize={11} textAlign="right" color={color}>
            {etat}
          </CustomText>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CardAgenda;

const styles = StyleSheet.create({
  cardNotif: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1.1,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
