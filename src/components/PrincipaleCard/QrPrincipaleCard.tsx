import { useState } from "react";
import { paletteColor } from "../../themes/Utility";
import { Pressable, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import QRCode from "react-native-qrcode-svg";
import { BottomSheet } from "@rneui/base";

export default function QrPrincipaleCard({value} : {value : string}){
    const [isVisible, setIsVisible] = useState(false); 
    return(
        <>
              <Pressable
                    onPress={() =>setIsVisible(!isVisible)}
                    >
                    <View style={{alignItems : 'center'}}>
                        <Icons.QrCodeIcon size={30} color={paletteColor.ORANGE}/>
                        <Text style={{fontWeight : 'bold', color : paletteColor.BLACK}}>QR Code</Text>
                    </View>
              </Pressable>
              <BottomSheet modalProps={{}} isVisible={isVisible}>
              <View style={{backgroundColor : 'white', height : 300, borderTopEndRadius : 10, borderTopLeftRadius : 10}}> 
                <View style={{flexDirection :'row', alignItems : 'flex-end',justifyContent : 'flex-end'}}> 
                <Pressable onPress={() =>setIsVisible(!isVisible)}>
                  <Icons.XCircleIcon size={40} color={paletteColor.RED}/>
                </Pressable> 
                </View> 
                <View style={{alignItems : 'center', alignContent : 'center'}}>
                  <QRCode
                    size={190}
                    value={value}
                  />  
                </View>    
              </View>
              
            </BottomSheet>
        </>
    )
}