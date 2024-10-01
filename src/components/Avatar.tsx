import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../services/redux/hooks";
import { person } from "../utils/images";
import { useNavigation } from "@react-navigation/native";



export default function Avatar(){
    const user: any = useAppSelector(state => state.user.users);
    const navigation = useNavigation();
    return(
        <TouchableOpacity
              activeOpacity={0.8}
              style={styles.imgProfil}
              onPress={() => navigate('Profil' as never)}>
                <View style={{width : 25, height : 25, overflow : 'hidden',borderRadius : 50}}>
                  <Image
                  source={
                    user?.picture
                      ? {
                          uri: user?.picture + '?' + new Date(),
                        }
                      : person
                  }
                  style={styles.imgProfil}
                />
                </View>

            </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    imgProfil: {
      width: '100%',
      height: '100%',
    }
  });
  