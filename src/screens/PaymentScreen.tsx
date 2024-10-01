import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import BodyProject from '../components/BodyProject';
import {
  getCardStripe
} from '../services/apiServices';
import {asyncGetUserId} from '../services/asyncStorage';
import {paletteColor} from '../themes/Utility';
import {carte, couronne} from '../utils/images';
import { useAppSelector } from '../services/redux/hooks';
import { underSubscriptionType } from '../utils/data';
import CardPremium from '../components/CardPremium';

const PaymentScreen = () => {
  const [cardData, setCardData] = useState<any>([]);
  const user: any = useAppSelector(state => state.user.users);
  const getCard = async () => {
    const accountId = await asyncGetUserId();
    getCardStripe(accountId as string)
      .then(res => setCardData(res.data))
      .catch((err: any) => console.log('err', err?.response?.data));
  };
  useEffect(() => {
    getCard();
  }, []);

 


  return (
    <BodyProject title="Retour">
      <ScrollView>
        {user?.underSubscriptionType
                       === underSubscriptionType.PREMIUM  &&
        <View style={styles.container}>
          <View></View>
          <View
            style={{
              height: 150,
              backgroundColor: '#222776',
              width: '100%',
              borderRadius: 5,
              marginBottom: '5%',
              padding: '5%',
            }}>
              <View style={{flexDirection : 'row'}}>
                <View style={{width : '40%'}}>
                  <Image source={couronne} style={{width : 40, height : 40,right : 0,
                    position : 'absolute', zIndex : 2,marginBottom : 25, top : 0, 
                    transform : [{rotate : '40deg'}], marginRight : 2}}/>
                  <Image source={carte} style={{width : 110, height : 110,left : 0, zIndex : 0}}/>
                </View>
                <View style={{width : '60%'}}>
                    <Text style={{textAlign : 'center', color : paletteColor.WHITE, fontSize : 15}}>Félicitations, vous êtes en mode premium !</Text>
                    <Text style={{color : paletteColor.WHITE,marginTop : 12}}>DATE     : {user.subscriptionDate ?? ''}</Text>
                    <Text style={{color : paletteColor.WHITE,marginTop : 12}}>EXPIRE  : {user.subscriptionDate ?? ''}</Text>
                </View>
              </View>
          </View>
        </View>}
        {user?.underSubscriptionType  === underSubscriptionType.FREE  && <CardPremium/>}
      </ScrollView>
    </BodyProject>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1.5,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  expiryInput: {
    width: '45%',
  },
  cvvInput: {
    width: '45%',
  },
});

export default PaymentScreen;
