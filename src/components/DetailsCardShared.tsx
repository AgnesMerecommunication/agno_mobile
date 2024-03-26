import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomCircle from "./CustomCircle";
import { paletteColor } from "../themes/Utility";
import Entypo from "react-native-vector-icons/Entypo";
import { useAppSelector } from "../services/redux/hooks";
import { underSubscriptionType } from "../utils/data";
import * as Icons from "react-native-heroicons/outline";

export default function DetailsCardShared({sharedImage , sharedLink} : {sharedImage : Function , sharedLink : Function}){
    const [isVisible, setIsVisible] = useState(false);
    const user: any = useAppSelector(state => state.user.users);
    return(
        <>
            
            <TouchableOpacity
                onPress={() =>setIsVisible(!isVisible)}
                style={{position: 'absolute',right: 10}}>
                <CustomCircle
                  disabled={true}
                  borderColor={paletteColor.ORANGE}
                  size={40}
                  backgroundColor={paletteColor.ORANGE}
                  borderRadius={40}
                  borderWidth={1}>
                  <Entypo name="share" size={15} color={paletteColor.WHITE} />
                </CustomCircle>
              </TouchableOpacity>
               <View style={{right : 0, position : 'absolute', bottom : -0,zIndex : 1}}>
                {isVisible && (
                  <View style={{
                      position: 'absolute',
                      bottom: -60,right: -12, 
                      backgroundColor: 'white',
                      padding : 6,
                     borderRadius : 5,
                      elevation : 5
                    }}>
                      <TouchableOpacity onPress={() =>{
                        sharedImage();
                        setIsVisible(false);
                      }} style={{flexDirection : 'row', alignItems : 'center'}}><Icons.CreditCardIcon  color={paletteColor.BLACK}/> 
                        <Text style={{marginLeft : 5, color : paletteColor.BLACK}}>Partager ma carte</Text>
                      </TouchableOpacity>
                      {user?.underSubscriptionType === underSubscriptionType.PREMIUM &&<View style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                        marginVertical: 2,
                      }}></View>}
                      {user?.underSubscriptionType
                       === underSubscriptionType.PREMIUM && 
                         <TouchableOpacity onPress={() => {
                        sharedLink();
                        setIsVisible(false);
                    } } style={{flexDirection : 'row', alignItems : 'center'}}>
                      <Icons.GlobeAltIcon  color={paletteColor.BLACK}/> <Text style={{marginLeft : 5, color : paletteColor.BLACK}}>Partager mon site</Text>
                    </TouchableOpacity>}
                   
                  </View>
                  )}
               </View>
        </>
    )
}