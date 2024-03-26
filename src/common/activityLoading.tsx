import {ActivityIndicator} from 'react-native';

export const renderActivityLoading = (isValidate: boolean) => {
  return (
    isValidate && (
      <ActivityIndicator
        style={{position: 'absolute', top: '50%', left: '50%'}}
        size="large"
      />
    )
  );
};
