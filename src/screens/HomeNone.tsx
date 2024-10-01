/* eslint-disable react-native/no-inline-styles */
import {  Text, View } from "react-native";
import PrincipalCardNoConnect from "../components/PrincipalCardNoConnect";
  
  const HomeNone = () => {
      return (
        <View style={{flexDirection : 'column' , justifyContent : 'center', 
            alignContent : 'center', alignItems : 'center'}}>
            <PrincipalCardNoConnect />
            <View style={{marginTop : 10,zIndex : -1}}>
                <Text  style={{ fontWeight: 'bold', textAlign: 'center' , zIndex : -1}}>
                Veuillez vous connecter pour accéder aux autres fonctionnalités de l'application.
                </Text>
            </View>
        </View>
      );
  };
  
  export default HomeNone;
 
  