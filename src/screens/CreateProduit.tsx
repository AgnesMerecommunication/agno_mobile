/* eslint-disable react-native/no-inline-styles */
import {Alert, Platform, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {paletteColor} from '../themes/Utility';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import DropDownPicker from 'react-native-dropdown-picker';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {renderActivityLoading} from '../common/activityLoading';
import {
  createProduct,
  modifyOneProduct,
} from '../services/redux/reducerProducts';
import {useNavigation} from '@react-navigation/native';
import SelectPictue from '../components/SelectPictue';
import {notifyMessage} from '../common/notifyMessage';
import {uuidCustome} from '../constants/Data';
import {productType} from '../utils/data';
import SelectDocument from '../components/SelectDocument';

const CreateProduit = ({route}: any) => {
  const navigation = useNavigation();
  const dataUpdate = route.params?.dataUpdate;
  const update = route.params?.update;
  const type = route.params?.type;
  const dispatch = useAppDispatch();
  const formData = new FormData();

  const categorie: any = useAppSelector(state => state.products.categorie);
  const isLoading: boolean = useAppSelector(state => state.products.isLoading);

  const [description, setDescription] = useState(
    update === true ? dataUpdate?.description : '',
  );
  const [title, setTitle] = useState(update === true ? dataUpdate?.title : '');
  const [price, setPrice] = useState(update === true ? dataUpdate?.price : '');
  const [fileProduct, setFileProduct] = useState<any>({
    uri: update === true ? dataUpdate?.picture : null,
    type: 'image/jpeg',
    name: uuidCustome.slice(0, 11) + '.' + 'jpeg',
  });

  const [verifFile, setVerifFile] = useState<any>({
    camera: false,
    picker: false,
  });
  const [verifFileDocument, setVerifFileDocument] = useState<any>({
    picker: false,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    update === true ? dataUpdate?.categories.split(',') : [],
  );
  const [items, setItems] = useState(
    categorie.map((obj: {name: string; id: string}) => {
      return {label: obj.name.toUpperCase(), value: obj.name};
    }),
  );

  const handleSubmit = () => {
    try{
      let error = false;
      formData.append('title', title);
      formData.append('type', type);
      formData.append('categories', value.join(','));
      formData.append('description', description);
      formData.append('picture', fileProduct.uri !== null ? fileProduct : '');
      if (type !== productType.PORTFOLIO && type !== productType.CATALOG_DOCUMENT) {
        if (title && price && value) {
          formData.append('price', price);
         } else {
          error = true;
          notifyMessage('vide');
        }
      } else {
        if (!title && !value) {
            error = true;
            notifyMessage('vide');
          }
      }
      
      if(error == false){
        update === true //@ts-ignore
            ? dispatch(modifyOneProduct(dataUpdate?.id, formData, navigation))   : dispatch(createProduct(formData, navigation));
      }
    }catch(e){
        Alert.alert("Error", JSON.stringify(e));
    }
    
  };

  return (
    <BodyProject title="Retour">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewContainer}>
          <View>
            <CustomText
              fontWeight="bold"
              fontSize={20}
              marginTop="5%"
              marginBottom="2%">
              Ajouter un produit
            </CustomText>
            {type != productType.CATALOG_DOCUMENT &&<SelectPictue
              title="produit"
              onChangeGallery={(image: {uri: any; type: any; name: string}) => {
                const file = image;
                setFileProduct(file);
                setVerifFile({picker: true, camera: false});
              }}
              onChangeCamera={(image: {uri: any; type: any; name: string}) => {
                const file = image;
                setFileProduct(file);
                setVerifFile({picker: false, camera: true});
              }}
              verifFile={verifFile}
            />}
            {type == productType.CATALOG_DOCUMENT && <SelectDocument title="Document"
             onChangeDocument={(file : {uri : any,type : any, name : string}) => { 
                setFileProduct(file);
                verifFileDocument({picker: true})
            } } verifFile={verifFileDocument}/>}
            <CustomTextInput
              onChangeText={e => {
                setTitle(e);
              }}
              backgroundColor="white"
              title={`Titre`}
              defaultValue={title}
              placeholder={'titre'}
              marginTop={20}
            />

            {(type !== productType.PORTFOLIO &&  type !== productType.CATALOG_DOCUMENT)  ? (
              <CustomTextInput
                onChangeText={e => {
                  setPrice(e);
                }}
                backgroundColor="white"
                title={`Prix`}
                defaultValue={price}
                placeholder={'titre'}
                marginTop={20}
              />
            ) : undefined}

            <CustomText marginTop={15}>Categories</CustomText>
            <DropDownPicker
              style={{
                marginTop: 10,
                height: 55,
                borderColor: paletteColor.GRAY,
                borderWidth: 0.5,
                borderRadius: 25,
              }}
              placeholder=""
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={true}
              mode="BADGE"
              badgeDotColors={[
                '#e76f51',
                '#00b4d8',
                '#e9c46a',
                '#e76f51',
                '#8ac926',
                '#00b4d8',
                '#e9c46a',
              ]}
            />
            <CustomText marginBottom={5} marginTop={15}>
              Description
            </CustomText>
            <TextInput
              defaultValue={description}
              onChangeText={e => {
                setDescription(e);
              }}
              style={styles.textArea}
              multiline={true}
              numberOfLines={8}
              placeholder="description"
              placeholderTextColor={paletteColor.GRAY}
            />
          </View>
          <View style={{  margin: 5,width: '100%'}}>
              <CustomButton
                onPress={handleSubmit}
                label="Enregistrer"
                disabled={isLoading}
                backgroundColor={
                  isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
                }
              />
            </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              width: '100%',
            }}>           
          </View>
        </View>
        {renderActivityLoading(isLoading)}
      </ScrollView>
    </BodyProject>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
    justifyContent: 'space-between',
  },
  textArea: {
    textAlignVertical: 'top',
    borderColor: paletteColor.GRAY,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 13,
    paddingBottom: Platform.OS === 'ios' ? 100 : 0,
    color: paletteColor.BLACK,
    backgroundColor: 'white',
    padding: '2%',
  },
});
export default CreateProduit;
