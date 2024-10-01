/* eslint-disable react-hooks/exhaustive-deps */
import {StatusBar, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainNavigation from '../navigations/ContainNavigation';
import {StripeProvider} from '@stripe/stripe-react-native';
import AuthProvider from '../hooks/AuthProvider';
import InscriptionProvider from '../hooks/InscriptionProvider';

const Navigation = () => {
  const [publishable, setPublishable] = useState('pk_test_51NvMREGHbvr30JNZgfW7sMGoXUw4QvxU863HNT2lileFLMTBsWC3ng02cFkFBSfMINwXK3NvesIDhtTwOmpzRY1400bamYgtDK');

  const initializePaymentSheet = async () => {
    setPublishable(
      'pk_test_51NvMREGHbvr30JNZgfW7sMGoXUw4QvxU863HNT2lileFLMTBsWC3ng02cFkFBSfMINwXK3NvesIDhtTwOmpzRY1400bamYgtDK',
    );
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey={publishable}>
      <AuthProvider>
        <InscriptionProvider>
          <View style={{flex: 1}}>
            <StatusBar
              translucent={true}
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <ContainNavigation />
          </View>
        </InscriptionProvider>
      </AuthProvider>
    </StripeProvider>
  );
};

export default Navigation;
