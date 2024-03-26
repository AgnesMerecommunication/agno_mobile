interface ILogin {
  email: string;
  password: string;
}

interface IDataInscription {
  lastName: string;
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

export type {ILogin, IDataInscription, ICreateCards};
