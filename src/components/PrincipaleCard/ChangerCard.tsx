import { useState } from "react";
import { paletteColor } from "../../themes/Utility";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { BottomSheet } from "@rneui/base";
import { ModelCarte } from "../../constants/Data";

export default function ChangerCard({items ,onChange} : {items : any[], onChange : Function}){
    const [isVisible, setIsVisible] = useState(false);
    const ImageCard = ({url, id} :  {url : string, id : number,key:any})=> {
        var cardNumber = ModelCarte.filter(item=>item.id == id)[0];
        return  <Image
        style={{
          height: cardNumber.horizontal == true ? 180 : 500,
         // height : 500,
          width :'100%',
          resizeMode: 'stretch',
          borderRadius : 10
        }}
        source={{uri: url+ '?' + new Date()}}
      />;
      }

    return (
        <>
            <Pressable onPress={() =>setIsVisible(!isVisible)} >
                <View style={{alignItems : 'center'}}>
                    <Icons.ArrowPathRoundedSquareIcon size={30} color={paletteColor.ORANGE}/>
                    <Text style={{fontWeight : 'bold', color : paletteColor.BLACK}}>Changer de carte</Text>
                </View>
            </Pressable>
            <BottomSheet modalProps={{}} isVisible={isVisible}>
              <View style={{backgroundColor : 'white', height : 500, borderTopEndRadius : 10,
                 borderTopLeftRadius : 10}}>
                <View style={{flexDirection :'row', alignItems : 'center',justifyContent : 'space-between', paddingHorizontal : 12, marginBottom : 5}}> 
                 <Text style={{fontWeight : '800', fontSize : 20, color : paletteColor.BLACK}}>Selectionnez une carte</Text>
                  <Pressable onPress={() =>setIsVisible(!isVisible)}>
                    <Icons.XCircleIcon size={40} color={paletteColor.RED}/>
                  </Pressable> 
                </View>  
                <View style={{paddingHorizontal : 10, paddingBottom : 50}}>
                  <ScrollView>
                    {items.map((item,index) => (
                      <Pressable key={index}
                        onPress={() => {
                            onChange(item);
                            setIsVisible(false);
                        }}
                        style={{
                          paddingLeft: 10,
                          alignContent : 'center',
                          justifyContent : 'center', elevation : 0,marginBottom : 12
                        }}>
                          <ImageCard key={item.updatedAt} 
                          url={item.picture} id={Number.parseInt(JSON.stringify(item.modelId))}/>
                      </Pressable>
                      ))}    
                    </ScrollView>
                 </View>   
              </View>  
            </BottomSheet>
        </>
    )
}