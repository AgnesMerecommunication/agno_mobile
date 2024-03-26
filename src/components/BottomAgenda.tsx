/* eslint-disable react/react-in-jsx-scope */
import {useNavigation} from '@react-navigation/native';
import BottomSheetComponent from './BottomSheetComponent';
import CustomText from './CustomText';
import CustomTextIcon from './CustomTextIcon';
import {Dimensions, View} from 'react-native';
import RowJustifyContent from './RowJustifyContent';
import CustomButton from './CustomButton';
import {paletteColor} from '../themes/Utility';
import {formateDate} from '../utils/formateDate';
import {formateTime} from '../utils/formateTime';
// import {openCalendar} from '../common/createAgendar';

interface IPropsBottomAgenda {
  item: {
    id: string;
    title: string;
    adresse: string;
    from: string;
    to: string;
    date: string;
    description: string;
    email: string;
  };

  isVisible: boolean | undefined;
  onBackdropPress?(): void;
  onPressEdite: ((params: any) => any) | undefined;
  onPressDelete: ((params: any) => any) | undefined;
}

const BottomAgenda = ({
  item,
  isVisible,
  onBackdropPress,
  onPressEdite,
  onPressDelete,
}: IPropsBottomAgenda) => {
  const navigation = useNavigation();

  return (
    <BottomSheetComponent
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <RowJustifyContent>
        <CustomText fontWeight="500" marginTop={5} fontSize={18}>
          {item?.title}
        </CustomText>
        {/* <CustomTextIcon
          onPress={() => {
            console.log('calendar');

            openCalendar(item?.title, item?.from, item?.to, item?.description);
          }}
          color={paletteColor.RED}
          nameIcon="plus"
          title="Ajouter angenda"
        /> */}
      </RowJustifyContent>
      <CustomTextIcon
        onPress={() => navigation.navigate('UpdateProfil' as never)}
        color={paletteColor.RED}
        nameIcon="calendar"
        title={formateDate(new Date(item?.date))}
      />
      <CustomTextIcon
        onPress={() => navigation.navigate('UpdateProfil' as never)}
        color={paletteColor.RED}
        nameIcon="clock-outline"
        title={`De ${formateTime(new Date(item?.from))} a ${formateTime(
          new Date(item?.to),
        )}`}
      />
      <CustomTextIcon
        onPress={() => navigation.navigate('UpdateProfil' as never)}
        color={paletteColor.RED}
        nameIcon="email"
        title={item?.email}
      />
      <CustomText marginTop={10} fontWeight="bold">
        Description
      </CustomText>
      <CustomText>{item?.description}</CustomText>
      <RowJustifyContent
        justifyContent="space-around"
        marginBottom={'10%'}
        marginTop={'10%'}>
        <View style={{width: Dimensions.get('screen').width / 2.7}}>
          <CustomButton
            label="Supprimer"
            colorText={paletteColor.RED}
            backgroundColor="transparent"
            borderWidth={1}
            borderColor={paletteColor.RED}
            onPress={onPressDelete}
          />
        </View>
        <View style={{width: Dimensions.get('screen').width / 2.7}}>
          <CustomButton label="Editer" onPress={onPressEdite} />
        </View>
      </RowJustifyContent>
    </BottomSheetComponent>
  );
};
export default BottomAgenda;
