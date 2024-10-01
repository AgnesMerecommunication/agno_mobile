import {Alert, Dimensions, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import FloatingButton from '../components/FloatingButton';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import CardAgenda from '../components/CardAgenda';
import {
  initializeListEvent,
  removeOneEvent,
} from '../services/redux/reducerAgenda';
import {renderActivityLoading} from '../common/activityLoading';
import BottomAgenda from '../components/BottomAgenda';



const Agenda = () => {
  const navigation = useNavigation();
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [recupData, setRecupData] = useState<any>(null);
  const dispatch = useAppDispatch();

  const agendas: any = useAppSelector(state => state.agenda.agendas);
  const isLoading: any = useAppSelector(state => state.agenda.isLoading);
  useEffect(() => {
    dispatch(initializeListEvent());
  }, [dispatch]);
  const handleDelete = (id: string) => {
    setIsVisibleBottom(false);
    Alert.alert(
      'INFORMATION',
      'Voulez vous vraiment supprimer cette carte ? ',
      [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          onPress: () => {
            //@ts-ignore
            dispatch(removeOneEvent(id, navigation));
          },
        },
      ],
    );
  };
  const getRender = ({item}: any) => (
    <CardAgenda
      item={item}
      onPress={() => {
        setRecupData(item);
        setIsVisibleBottom(true);
      }}
    />
  );
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 17, marginTop : 20}}>
        <CustomText fontWeight="bold" fontSize={18}>
          Agenda
        </CustomText>

        <FloatingButton
          title="Ajouter un rendez-vous"
          onPress={() => navigation.navigate('CreateEvenement' as never)}
          top={Dimensions.get('screen').height / 1.5}
        />
        <FlatList
          contentInset={{top: 0, bottom: 300, left: 0, right: 0}}
          contentContainerStyle={{paddingBottom: 600}}
          keyExtractor={item => item.id.toString()}
          data={agendas}
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
        />
        {renderActivityLoading(isLoading)}
        <BottomAgenda
          item={recupData}
          onPressEdite={() => {
            setIsVisibleBottom(false);
            navigation.navigate({
              name: 'CreateEvenement',
              params: {update: true, dataUpdate: recupData},
            } as never);
          }}
          onPressDelete={() => handleDelete(recupData.id)}
          isVisible={isVisibleBottom}
          onBackdropPress={() => setIsVisibleBottom(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Agenda;
