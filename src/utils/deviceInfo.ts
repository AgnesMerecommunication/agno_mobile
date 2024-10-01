import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isTablet = aspectRatio < 1.6; // Assumes 4:3 aspect ratio for tablets
export const isSmallDevice = width < 375; // Assumes iPhone 6/7/8 width as small device
