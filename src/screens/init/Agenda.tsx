
import React, {useEffect, useState} from 'react';
import { View } from 'react-native-animatable';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Alert, Dimensions, FlatList, Pressable, SafeAreaView, Text } from 'react-native';
import CardAgenda from '../../components/CardAgenda';
import CustomText from '../../components/CustomText';
import FloatingButton from '../../components/FloatingButton';
import { renderActivityLoading } from '../../common/activityLoading';
import BottomAgenda from '../../components/BottomAgenda';
import { AgendaLocal, deleteAgenda, getAllAgenda } from '../../utils/AgendaLocalUtilities';
import { paletteColor } from '../../themes/Utility';

export default function AgendaScreen({route}: any){
    const navigation = useNavigation();
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [recupData, setRecupData] = useState<any>(null);
  const [agendas , setAgendas] = useState<AgendaLocal[]>([]);
  const [isLoading , setIsLoading] = useState(false);
  const isVisible = useIsFocused();

  const init =async ()=> {
    let agendasData = await getAllAgenda();
        setAgendas(agendasData ?? []);
        setIsLoading(false);
   
    }
  useEffect(() => {

    init();
   
  }, [isVisible]);
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
            deleteAgenda(id);
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
                        {agendas.length == 0 && <Text style={{marginTop : 20}}>Aucun agenda n'a été enregistré</Text>}
                        {agendas.length == 0 && <Pressable  onPress={()=>{
                            navigation.navigate('CreateAgenda' as never);
                        }} style={{borderColor : paletteColor.ORANGE, borderStyle : 'dashed', borderRadius : 10, 
                                alignItems : 'center', alignContent : 'center', padding : 12, marginVertical : 50, 
                                borderWidth : 1,marginTop : 12}}>
                            <Text style={{color : paletteColor.BLACK}}>Ajouter un agenda</Text>
                        </Pressable>}
                        <FloatingButton
                        title="Ajouter un rendez-vous"
                        onPress={() => navigation.navigate('CreateAgenda' as never)}
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
                            name: 'CreateAgenda',
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

}