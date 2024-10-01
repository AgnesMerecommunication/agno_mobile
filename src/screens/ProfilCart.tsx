import { useRoute } from "@react-navigation/native";
import { Image, View } from "react-native";
import { IContact } from "../types/api";
import { Dimensions } from "react-native";
import { useEffect, useState } from "react";

export default function ProfilCard(){
    const route = useRoute();
    let item = route.params as IContact;
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    useEffect(()=>{
        if(item.card != null){
                  Image.getSize(item.card, (width, height)=>{
            const screenWidth = Dimensions.get('window').width;
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;
            setImageSize({ width: screenWidth, height: imageHeight });
        })
        }
  
    },[])

    return (
        <View style={{flex : 1,padding : 5, justifyContent : 'flex-start',alignItems : 'center'}}>
             <Image
              style={{
                height : imageSize.height,
                width : imageSize.width - 25,
                resizeMode: 'contain',
                borderRadius : 5
              }}
              source={{uri: item.card}}
            />
        </View>
    )
}