import { ScrollView, TouchableOpacity, View } from "react-native";
import { BottomSheet } from '@rneui/themed';
import CardPremium from "./CardPremium";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { paletteColor } from "../themes/Utility";
import { useState } from "react";

interface IPropsPremiumModal {
    isVisible: boolean | undefined;
    onBackdropPress?(): void;
    close?() : void
  }
export default function PremiumModal(props : IPropsPremiumModal){ 
    return(
        <BottomSheet modalProps={{}} isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress}
    >
       <View style={{marginTop : 8, marginLeft : 12}}>
            <TouchableOpacity onPress={props.onBackdropPress}>
                <XCircleIcon color={paletteColor.RED} fill="white"  size={25}/>
            </TouchableOpacity>
        </View>
            <ScrollView>
                <CardPremium modal={true} close={props.close}/>
             </ScrollView>
    </BottomSheet>
    )
}