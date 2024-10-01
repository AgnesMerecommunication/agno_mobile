import AsyncStorage from '@react-native-async-storage/async-storage';
import {asyncStorageType} from '../utils/data';
const asyncPostToken = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(asyncStorageType.TOKEN, jsonValue);
  } catch (e) {
    console.log('asyncPostToken', e);
  }
};

const asyncGetToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncStorageType.TOKEN);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('asyncGetToken', e);
  }
};

const asyncPostUserId = async (value: any) => {
  try {
    await AsyncStorage.setItem(asyncStorageType.USERID, value);
  } catch (e) {
    console.log('asyncPostUserId', e);
  }
};
const asyncPostPublicKey = async (value: any) => {
  try {
    let key = await AsyncStorage.getItem(asyncStorageType.PUBLICKEY);
    if(key){
      await AsyncStorage.removeItem(asyncStorageType.PUBLICKEY);
    }
    await AsyncStorage.setItem(asyncStorageType.PUBLICKEY, value);
  } catch (e) {
    console.log('asyncPostPublicKey', e);
  }
};

const asyncGetPublicKey = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncStorageType.PUBLICKEY);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('asyncGetUserId', e);
  }
};


const asyncPostPrincipale = async (value: any) => {
  try {
    let key = await AsyncStorage.getItem(asyncStorageType.PRINCIPALE);
    if(key){
      await AsyncStorage.removeItem(asyncStorageType.PRINCIPALE);
    }
    await AsyncStorage.setItem(asyncStorageType.PRINCIPALE, value);
  } catch (e) {
    console.log('principale', e);
  }
};

const asyncGetPrincipale = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncStorageType.PRINCIPALE);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('principale', e);
  }
};


const asyncPostImage = async (value: any) => {
  try {
    let key = await AsyncStorage.getItem(asyncStorageType.IMAGE);
    if(key){
      await AsyncStorage.removeItem(asyncStorageType.IMAGE);
    }
    await AsyncStorage.setItem(asyncStorageType.IMAGE, value);
  } catch (e) {
    console.log('principale', e);
  }
};

const asyncGetImage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncStorageType.IMAGE);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('principale', e);
  }
};




const asyncGetUserId = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(asyncStorageType.USERID);
    return jsonValue != null ? jsonValue : null;
  } catch (e) {
    console.log('asyncGetUserId', e);
  }
};


const asyncRemoveGetToken = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

export {
  asyncPostToken,
  asyncGetToken,
  asyncRemoveGetToken,
  asyncPostUserId,
  asyncGetUserId,
  asyncGetPublicKey,
  asyncPostPublicKey,
  asyncGetImage,
  asyncPostImage,
  asyncGetPrincipale,
  asyncPostPrincipale
};
