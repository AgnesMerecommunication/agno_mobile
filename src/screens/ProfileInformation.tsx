import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import { paletteColor } from "../themes/Utility";
import { IContact } from "../types/api";
import { launchUrl } from "../common/launchUrl";
import CustomTextIcon from "../components/CustomTextIcon";


export default function ProfilInformation(){
    const route = useRoute();
    let item = route.params as IContact;
    return(
        <View>
 {(!item?.instagram ||
            !item?.facebook ||
            !item?.twitter ||
            !item?.linkedin ||
            !item?.whatsapp) && (
            <Text  style={{textAlign : 'center', marginTop : 12, fontWeight : 'bold'}}>
              Aucun lien vers un reseau social
            </Text>
          )}
          <View style={{marginBottom: '10%'}}>
            {item?.facebook && (
              <CustomTextIcon
                onPress={() => launchUrl(item?.facebook ?? '')}
                colorText={paletteColor.ORANGE}
                nameIcon="facebook"
                title={item?.facebook}
              />
            )}
            {item?.instagram && (
              <CustomTextIcon
                onPress={() => launchUrl(item?.instagram ?? '')}
                colorText={paletteColor.ORANGE}
                nameIcon="instagram"
                title={item?.twitter ?? ''}
                color="#AE479B"
              />
            )}

            {item?.twitter && (
              <CustomTextIcon
                onPress={() => launchUrl(item?.twitter ?? '')}
                colorText={paletteColor.ORANGE}
                nameIcon="twitter"
                title={item?.twitter}
                color="#1D9CEA"
              />
            )}
            {item?.linkedin && (
              <CustomTextIcon
                onPress={() => launchUrl(item?.linkedin ?? '')}
                colorText={paletteColor.ORANGE}
                nameIcon="linkedin"
                title={item?.linkedin}
                color="#0078B5"
              />
            )}
            {item?.whatsapp && (
              <CustomTextIcon
                onPress={() => launchUrl(`https://wa.me/${item?.whatsapp}`)}
                colorText={paletteColor.ORANGE}
                nameIcon="whatsapp"
                title={item?.whatsapp}
                color={paletteColor.GREEN}
              />
            )}
          </View>
        </View>
    )
}