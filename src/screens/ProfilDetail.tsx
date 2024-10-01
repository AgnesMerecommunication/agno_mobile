import { Image, Text, TouchableOpacity, View } from "react-native";
import { IContact } from "../types/api";
import BodyProject from "../components/BodyProject";
import {useNavigation} from '@react-navigation/native';
import { avatar } from "../utils/images";
import ProfilDetailCarte from "../navigations/ProfileDetailCart";



export default function ProfilDetail({route}: any){
    const item = route.params as IContact
    const navigation = useNavigation();
    return(
        <BodyProject title={'Information'} onPress={()=>navigation.goBack()}>
            <View style={{paddingHorizontal : 12, marginBottom : 12}}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        marginTop: '5%',flexDirection : 'row'
                    }}
                        onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
       {item.picture ? <TouchableOpacity
              activeOpacity={0.8}
              style={{width : 75,height : 75, borderRadius : 50,overflow : 'hidden'}}
              onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
              <Image source={{uri: item.picture}} style={{height : '100%', width : '100%'}}/>
        </TouchableOpacity> : <TouchableOpacity
              activeOpacity={0.8}
              style={{width : 75,height : 75, borderRadius : 50,overflow : 'hidden'}}
              onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
              <Image source={avatar} style={{height : '100%', width : '100%'}}/>
        </TouchableOpacity>} 
        <View style={{marginLeft : 5, paddingTop : 7}}>
          <Text style={{fontWeight : 'bold', fontSize : 15}}>{item.name}</Text>
          <Text>{item.email ?? ''}</Text>
          <Text>{item.phone ?? ''}</Text>
        </View>
                </TouchableOpacity>
            </View>
            <ProfilDetailCarte contact={item} />
        </BodyProject>
    )
}