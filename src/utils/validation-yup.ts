import * as Yup from 'yup';

export const loginForm = Yup.object({
  email: Yup.string().email('Adresse électronique invalide').required('Requis'),
  password: Yup.string().required('Requis'),
});

export const eventForm = Yup.object({
  title: Yup.string().required('Requis'),
  email: Yup.string().required('Requis'),
  description: Yup.string(),
});
