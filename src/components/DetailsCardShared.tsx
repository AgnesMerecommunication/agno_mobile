import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { paletteColor } from "../themes/Utility";
import { useAppSelector } from "../services/redux/hooks";
import * as Icons from "react-native-heroicons/outline";

export default function DetailsCardShared({sharedImage , sharedLink} : {sharedImage : Function , sharedLink : Function}){
    const [isVisible, setIsVisible] = useState(false);

    const user: any = useAppSelector(state => state.user.users);
    return(
      <Pressable  onPress={() =>setIsVisible(!isVisible)}>
            <View style={{alignItems : 'center', }}>
                <View style={{alignItems : 'center'}}>
                    <Icons.ShareIcon size={30} color={paletteColor.ORANGE}/>
                </View>
                
                    <View style={{left : -15, position : 'absolute', top : -12,zIndex : 2, elevation : 4}}>
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
                                  
                              <View style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.5,
                                marginVertical: 2,
                              }}></View>
                         
                             <TouchableOpacity onPress={() => {
                                sharedLink();
                                setIsVisible(false);
                            } } style={{flexDirection : 'row', alignItems : 'center'}}><Icons.GlobeAltIcon color={paletteColor.BLACK}/> 
                              <Text style={{marginLeft : 5, color : paletteColor.BLACK}}>Partager mon site </Text>
                            </TouchableOpacity>
                          </View>
                          )}
                    </View>
                </View>
            </Pressable>
     
    )
}