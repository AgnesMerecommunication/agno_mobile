import { Image, StyleSheet, TouchableOpacity } from "react-native";
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
              onPress={() => navigation.navigate('Profil' as never)}>
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
            </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    imgProfil: {
      resizeMode: 'center',
      width: 35,
      height: 35,
      borderRadius: 50,
      marginRight : 12,
    }
  });
  