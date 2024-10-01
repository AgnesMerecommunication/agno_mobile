import { Pressable, Text, View } from "react-native";
import { paletteColor } from "../themes/Utility";


export default function CouleurSelect({onPress,backgroundColor , 
    borderColor, colorText, single} : {onPress? : Function, backgroundColor : string,
        borderColor? : string,colorText? : string, single? : boolean }){
    
    return(
        <Pressable onPress={()=>{
                if(onPress != null){
                    onPress()
                }
                }} style={{marginVertical : 4}}>
             <View style={{flexDirection : 'row' , 
                alignItems : 'center'}}>  
                <View style={{height : 25, width : 25, borderRadius : 50,
                   backgroundColor :backgroundColor, 
                   marginRight : 8, borderColor : borderColor,borderWidth : 0.2}}/>
                <Text style={{fontWeight : 'bold', color : paletteColor.BLACK}}>{colorText}</Text>
              </View>            
        </Pressable>
    )
}