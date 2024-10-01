import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { paletteColor } from "../../themes/Utility";
import * as Icons from "react-native-heroicons/outline";


export default function SharedCard({sharedImage , sharedLink} : {sharedImage : Function , sharedLink : Function}){
    const [isVisible, setIsVisible] = useState(false);
    return(
        <>
            <View style={{alignItems : 'center',position : 'relative' }}>
            <Pressable  onPress={() =>setIsVisible(!isVisible)}>
                <View style={{alignItems : 'center'}}>
                    <Icons.ShareIcon size={30} color={paletteColor.ORANGE}/>
                    <Text style={{fontWeight : 'bold', color : paletteColor.BLACK}}>Partager</Text>
                </View>
                </Pressable>
                    <View style={{right : 0, position : 'absolute', bottom : -0,zIndex : 1, elevation : 4}}>
                        {isVisible && (
                          <View style={{
                              position: "absolute",
                              bottom: 60,right: -12, 
                              backgroundColor: 'white',
                              padding : 6,
                              borderRadius : 5,
                              elevation : 5, zIndex : 1
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
                            } } style={{flexDirection : 'row', alignItems : 'center', position : 'relative', zIndex : 1}}><Icons.GlobeAltIcon color={paletteColor.BLACK}/> 
                              <Text style={{marginLeft : 5, color : paletteColor.BLACK}}>Partager mon site </Text>
                            </TouchableOpacity>
                          </View>
                          )}
                    </View>
            </View>  
        </>
        
    )
}