import { string } from "yup";

interface ILogin {
  email: string;
  password: string;
}

interface IDataInscription {
  firstName: string;
  email: string;
  phone: string;
  businessName: string;
  password: string;
  subscriptionType: string;
  underSubscriptionType: string;
  accountType: string;
  file: {
    uri: any;
    type: any;
    name: any;
  };
}

interface ICreateCards {
  prenom: string;
  nom: string;
  nomEntreprise: string;
  titrePro: string;
  slogan: string;
  contact: string[];
  email: string;
  adresse: string;
  web: string;
  modelId: number | null | undefined;
  file: {
    uri: any;
    type: any;
    name: string;
  };
}

interface IContact {
  id : string
  name?: string,
  email?: string,
  phone?: string,
  businessName?: string,
  gender?: string,
  town?: string,
  address?: string,
  linkedin?: string,
  twitter?: string,
  facebook?: string,
  instagram?: string,
  whatsapp?: string,
  picture?: string,
  card?: string,
  accountId : string
}

export type {ILogin, IDataInscription, ICreateCards, IContact};
