import {IContact, ILogin} from '../types/api';
import axiosInstance from '../utils/axios';
//BUSINESS-CARD


export const getBusinessCards = async (
  page: number | string | undefined = '',
  limit: number | string | undefined = '',
) => {
  const result = await axiosInstance.get(
    `/business-cards?page=${page}&limit=${limit}`,
  );
  return result.data;
};

export const getBusinessCardSaves = async () => {
  const result = await axiosInstance.get('/exchanged-cards');
  return result.data;
};

export const deleteOneBusinessCards = async (id: string) => {
  const result = await axiosInstance.delete(`/business-cards/${id}`);
  return result.data;
};

export const deleteOneBusinessCardSave = async (id: string) => {
  const result = await axiosInstance.delete(`/exchanged-cards/${id}`);
  return result.data;
};

export const getOneBusinessCards = async (id: string) => {
  const result = await axiosInstance.get(`/business-cards/${id}`);
  return result.data;
};

export const getOneBusinessCardsByQr = async (qr: string) => {
  const result = await axiosInstance.get(`/business-cards/qr/${qr}`);
  return result.data;
};

export const getOneBusinessCardsByPublicKey = async (key: string) => {
  const result = await axiosInstance.get(`/accounts/${key}/card`);
  return result.data;
};

export const addBusinessCards = async (data: any, config: any) => {
  const result = await axiosInstance.post('/business-cards', data, config);
  return result.data;
};

export const addBusinessCardSave = async (cardId: string) => {
  const result = await axiosInstance.post(
    `/exchanged-cards?cardId=${cardId}&isShot=false}`,
  );

  return result.data;
};

export const addPhotoCardSave = async (
  isShot: boolean,
  config: any,
  data: any,
) => {
  const result = await axiosInstance.post(
    `/exchanged-cards?cardId=&isShot=${isShot}`,
    data,
    config,
  );

  return result.data;
};

export const updateBusinessCards = async (
  id: string,
  data: any,
  config: any,
) => {
  const result = await axiosInstance.put(`/business-cards/${id}`, data, config);
  return result.data;
};

//EVENEMENT

export const getEvenement = async (
  page: number | string | undefined = '',
  limit: number | string | undefined = '',
) => {
  const result = await axiosInstance.get(`/events?page=${page}&limit=${limit}`);
  return result.data;
};

export const deleteOneEvenement = async (id: string) => {
  const result = await axiosInstance.delete(`/events/${id}`);
  return result.data;
};

export const addEvenement = async (data: any) => {
  const result = await axiosInstance.post('/events', data);
  return result.data;
};

export const updateEvenement = async (id: string, data: any) => {
  const result = await axiosInstance.put(`/events/${id}`, data);
  return result.data;
};

//Product

export const getCategorie = async () => {
  const result = await axiosInstance.get('/categories');
  return result.data;
};

export const getProduct = async () => {
  const result = await axiosInstance.get('/products');
  return result.data;
};

export const deleteOneProduct = async (id: string) => {
  const result = await axiosInstance.delete(`/products/${id}`);
  return result.data;
};

export const addProduct = async (data: any, config: any) => {
  const result = await axiosInstance.post('/products', data, config);
  return result.data;
};

export const updateProduct = async (id: string, data: any, config: any) => {
  const result = await axiosInstance.put(`/products/${id}`, data, config);
  return result.data;
};

// Users

export const authentificationLogin = async (data: ILogin) => {
  const result = await axiosInstance.post('/auth/login', data);
  return result.data;
};

export const createAccount = async (data: any, config: any) => {
  const result = await axiosInstance.post('/accounts', data, config);
  return result.data;
};

export const getInfoUser = async () => {
  const result = await axiosInstance.get('/accounts/me');
  return result.data;
};

export const resetPassword = async (email: any) => {
  const result = await axiosInstance.post('/accounts/reset-password', email);

  return result.data;
};

export const updateInfoUser = async (data: any, idUser: any, config: any) => {
  const result = await axiosInstance.put(`/accounts/${idUser}`, data, config);
  return result.data;
};

export const updatePassword = async (data: any) => {
  const result = await axiosInstance.put('/accounts/change-password', data);
  return result.data;
};

export const getCountry = async () => {
  const result = await axiosInstance.get('/countries');
  return result.data;
};

// Paiement

export const fetchPaymentSheetParams = async (accountId?: string) => {
  const result = await axiosInstance.post('/stripe/payment-sheet', {
    accountId: accountId,
  });
  return result.data.data;
};

export const fetchPaymentSheeReplacement = async (accountId?: string) => {
  const result = await axiosInstance.post(
    '/stripe/payment-sheet/card-addition-or-replacement',
    {
      accountId: accountId,
    },
  );
  return result.data.data;
};

export const saveSetupIntentStripe = async (data: any) => {
  const result = await axiosInstance.post('/stripe/save/setup-intent', data);
  return result.data;
};

export const subscriptionsStripe = async (data: any) => {
  const result = await axiosInstance.post('/stripe/subscriptions', data);
  return result.data;
};

export const getCardStripe = async (accountId: string) => {
  const result = await axiosInstance.get(
    `/stripe/${accountId}/active-payment-method`,
  );

  return result.data;
};

//Contact
export const createContact = async (contact : any)=>{
   const result = await axiosInstance.post("/accounts/contacts/create", contact);
   return result.data;
}
export const addContact = async(accountPublicKey : string) => {
  const result = await axiosInstance.post("/accounts/contacts/ajout",{
    key : accountPublicKey
  });
  return result.data;
}

export const getContact = async ({page, limit, search} : {page? : number, limit? : number, search? : string}) => {
  const result = await axiosInstance.get('/accounts/contacts/by-account?page=' + page + '&limit=' + limit  + (search != null ? '&search=' + search : ''));
  return result.data;
}
export const updateContact = async(id : string, contact : any)=> {
  const result = await axiosInstance.put("/accounts/contacts/" + id, contact);
  return  result.data;
}

export const deleteContact = async (id : string)=>{
  const result = await axiosInstance.delete("/accounts/contacts/" + id);
  return result.data;
}
