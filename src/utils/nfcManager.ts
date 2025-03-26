import NfcManager from 'react-native-nfc-manager';

class NfcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NfcError';
  }
}

export const initNfc = async () => {
  try {
    const isSupported = await NfcManager.isSupported();
    if (!isSupported) {
      throw new NfcError('NFC is not supported on this device');
    }
    await NfcManager.start();
    return true;
  } catch (error) {
    if (error instanceof NfcError) {
      console.warn(error.message);
    } else {
      console.warn('Failed to initialize NFC:', error);
    }
    return false;
  }
};

export const cleanupNfc = () => {
  try {
    NfcManager.cancelTechnologyRequest();
  } catch (error) {
    throw new NfcError('Failed to cleanup NFC');
  }
};
