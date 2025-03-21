import {ICreateCards, IDataInscription} from '../types/api';

export const asyncStorageType = {
  TOKEN: 'token',
  USERID: 'userId',
  PUBLICKEY: 'publicKey',
  PRINCIPALE: 'principale',
  IMAGE: '@image_base64',
};

export const cardId = {
  card1: 1,
  card2: 2,
  card3: 3,
  card4: 4,
  card5: 5,
  card6: 6,
  card7: 7,
  card8: 8,
  card9: 9,
  card10: 10,
  card11: 11,
  card12: 12,
  card13: 13,
  card14: 14,
  card15: 15,
  card16: 16,
  card17: 17,
  card18: 18,
  card19: 19,
  card20: 20,
  card21: 21,
  card22: 22,
  card23: 23,
  card24: 24,
  card25: 25,
  card26: 26,
  card27: 27,
  card28: 28,
  card29: 29,
  card30: 30,
  card31: 31,
  card32: 32,
  card33: 33,
};

export const sexeUser = [
  {
    label: 'Homme',
    value: 'MALE',
  },
  {
    label: 'Femme',
    value: 'FEMALE',
  },
];

export const subscriptionType = {
  MONTHLY: 'MONTHLY',
  YEARLY: 'YEARLY',
};

export const underSubscriptionType = {
  FREE: 'STANDARD',
  PREMIUM: 'PREMIUM',
  PREMIUM_LAPSED: 'PREMIUM_LAPSED',
};

export const accountType = {
  PERSONAL: 'PERSONAL',
  PROFESSIONAL: 'PROFESSIONAL',
};

export const productType = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
  PORTFOLIO: 'PORTFOLIO',
  CATALOG_DOCUMENT: 'CATALOG',
};

export const initialDataInscription: IDataInscription = {
  firstName: '',
  email: '',
  phone: '',
  businessName: '',
  password: '',
  subscriptionType: subscriptionType.MONTHLY,
  underSubscriptionType: underSubscriptionType.FREE,
  accountType: accountType.PERSONAL,
  file: {
    uri: null,
    type: null,
    name: null,
  },
};
export const initialDataCreateCard: ICreateCards = {
  prenom: '',
  nom: '',
  nomEntreprise: '',
  titrePro: '',
  slogan: '',
  contact: [],
  email: '',
  adresse: '',
  web: '',
  modelId: null,
  file: {
    uri: '',
    type: '',
    name: '',
  },
};
