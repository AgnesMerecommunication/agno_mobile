import {Dimensions, Image, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import BodyProject from '../components/BodyProject';
import SelectPictue from '../components/SelectPictue';
import RowJustifyContent from '../components/RowJustifyContent';
import CustomButton from '../components/CustomButton';
import {paletteColor} from '../themes/Utility';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {createPhotoCardSave} from '../services/redux/reducerCard';
import {useNavigation} from '@react-navigation/native';
import {renderActivityLoading} from '../common/activityLoading';


const Photo = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isLoadingCardSave: boolean = useAppSelector(
    state => state.cards.isLoadingCardSave,
  );
  
  const radioButtons = useMemo(() => ([
    {
      id: '1',
      label: 'horizontal',
      value: 'Horizontal'
  },
    {
        id: '2', // acts as primary key, should be unique and non-empty string
        label: 'vertical',
        value: 'Vertical'
    }
]), []);
  const [isVertical , setIsVertical] = useState<string | undefined>('1');

  const formData = new FormData();
  const [verifFile, setVerifFile] = useState<any>({
    camera: false,
    picker: false,
  });

  const [recupFile, setRecupFile] = useState<any>({
    uri: null,
    type: null,
    name: null,
  });

  return (
    <BodyProject title="Annuler">
      <View
        style={{
          marginHorizontal: 17,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {recupFile.uri ? (
          <>
            <Image
              source={{uri: recupFile.uri}}
              style={{height: 300, width: '100%'}}
            />
            <RowJustifyContent
              justifyContent="space-around"
              marginBottom={'10%'}
              marginTop={'10%'}>
              <View style={{width: Dimensions.get('screen').width / 2.7}}>
                <CustomButton
                  label="Supprimer"
                  colorText={paletteColor.RED}
                  backgroundColor="transparent"
                  borderWidth={1}
                  borderColor={paletteColor.RED}
                  onPress={() => {
                    setRecupFile({
                      uri: null,
                      type: null,
                      name: null,
                    });
                    setVerifFile({
                      camera: false,
                      picker: false,
                    });
                  }}
                />
              </View>
              <View
                style={{
                  width: Dimensions.get('screen').width / 2.7,
                  marginLeft: 5,
                }}>
                <CustomButton
                  label="Enregistrer"
                  onPress={() => {
                    formData.append(
                      'picture',
                      recupFile.uri !== null ? recupFile : null,
                    );
                    //@ts-ignore
                    dispatch(createPhotoCardSave(formData, navigation));
                  }}
                />
              </View>
            </RowJustifyContent>
          </>
        ) : (
          <View>
           <SelectPictue
            title=""
            circle={false}
            horizontal={isVertical == "1" ? true : false}
            onChangeGallery={(image: {uri: any; type: any; name: string}) => {
              const file = image;
              setRecupFile(file);
              setVerifFile({picker: true, camera: false});
            }}
            onChangeCamera={(image: {uri: any; type: any; name: string}) => {
              const file = image;
              setRecupFile(file);

              setVerifFile({picker: false, camera: true});
            }}
            verifFile={verifFile}
          />
        </View>
         
        )}
       
        {renderActivityLoading(isLoadingCardSave)}
      </View>
    </BodyProject>
  );
};

export default Photo;
