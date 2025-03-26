export type RootStackParamList = {
  StackLogin: {
    screen?: keyof AuthStackParamList;
    params?: any;
  };
  StackHome: undefined;
  Profil: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  InscriptionStepper: undefined;
  PasswordForgot: undefined;
  CreateAgenda: undefined;
  StackHome: undefined;
  StackCarte: undefined;
};
