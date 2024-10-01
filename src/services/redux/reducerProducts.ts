import {Dispatch, createSlice} from '@reduxjs/toolkit';
import {
  addProduct,
  deleteOneProduct,
  getCategorie,
  getProduct,
  updateProduct,
} from '../apiServices';
import {NavigationProp} from '@react-navigation/native';
import {asyncGetToken} from '../asyncStorage';
import {notifyMessage} from '../../common/notifyMessage';

const initialState = {
  products: [],
  categorie: [],
  isLoading: false,
  isLoadingCategorie: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductSuccess(state, action) {
      state.products = action.payload;
    },
    getCategorieSuccess(state, action) {
      state.categorie = action.payload;
    },
    isLoadingState(state, action) {
      state.isLoading = action.payload;
    },
    isLoadingStateCategorie(state, action) {
      state.isLoadingCategorie = action.payload;
    },
  },
});
export const {
  getProductSuccess,
  getCategorieSuccess,
  isLoadingStateCategorie,
  isLoadingState,
} = productSlice.actions;
export default productSlice.reducer;

export const initializeListProduct = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      const result = await getProduct();

      dispatch(getProductSuccess(result.data));
      dispatch(isLoadingState(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);

      dispatch(isLoadingState(false));
    }
  };
};

export const initializeListCategorie = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateCategorie(true));
    try {
      const result = await getCategorie();

      dispatch(getCategorieSuccess(result.data));
      dispatch(isLoadingStateCategorie(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingStateCategorie(false));
    }
  };
};

export const removeOneProduct = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      await deleteOneProduct(id);
      const result = await getProduct();
      dispatch(getProductSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Products',
      } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const modifyOneProduct = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));
    const token = await asyncGetToken();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await updateProduct(id, data, config);
      const result = await getProduct();
      dispatch(getProductSuccess(result.data));
      dispatch(isLoadingState(false));

      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Products',
      } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const createProduct = (
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    const token = await asyncGetToken();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch(isLoadingState(true));
    try {
      await addProduct(data, config);
      const result = await getProduct();
      dispatch(getProductSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Products',
      } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};
