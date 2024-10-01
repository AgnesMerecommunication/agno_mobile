import {Dispatch, createSlice} from '@reduxjs/toolkit';
import {
  addBusinessCardSave,
  addBusinessCards,
  addPhotoCardSave,
  deleteOneBusinessCardSave,
  deleteOneBusinessCards,
  getBusinessCardSaves,
  getBusinessCards,
  updateBusinessCards,
} from '../apiServices';
import {asyncGetToken} from '../asyncStorage';
import {CommonActions, NavigationProp} from '@react-navigation/native';
import {notifyMessage} from '../../common/notifyMessage';

const initialState = {
  cards: [],
  cardSaves: [],
  isLoading: false,
  isLoadingCardSave: false,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCardSuccess(state, action) {
      state.cards = action.payload;
    },
    isLoadingState(state, action) {
      state.isLoading = action.payload;
    },
    getCardSaveSuccess(state, action) {
      state.cardSaves = action.payload;
    },
    isLoadingStateSave(state, action) {
      state.isLoadingCardSave = action.payload;
    },
  },
});
export const {
  getCardSaveSuccess,
  isLoadingStateSave,
  getCardSuccess,
  isLoadingState,
} = cardSlice.actions;
export default cardSlice.reducer;

export const initializeListCard = (page?: number, limit?: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));
    try {
      const result = await getBusinessCards(page, limit);
      dispatch(getCardSuccess(result.data));
      dispatch(isLoadingState(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const initializeListCardSave = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const result = await getBusinessCardSaves();

      dispatch(getCardSaveSuccess(result.data));
      dispatch(isLoadingStateSave(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);

      dispatch(isLoadingStateSave(false));
    }
  };
};

export const removeOneBusinessCard = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      await deleteOneBusinessCards(id);
      const result = await getBusinessCards();
      dispatch(getCardSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({name :'CreateBottom', screen : 'StackCarte' } as never);
      } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------
export const removeOneBusinessCardSave = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      await deleteOneBusinessCardSave(id);
      const result = await getBusinessCardSaves();
      dispatch(getCardSaveSuccess(result.data));
      dispatch(isLoadingStateSave(false));
      navigation.navigate({name :'CreateBottom', screen : 'StackCarte' } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingStateSave(false));
    }
  };
};

//--------------------------------------------------------------------------------------------------------------------------------

export const modifyOneBusinessCard = (
  id: string,
  data: any,
  navigation?: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      const token = await asyncGetToken();
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      await updateBusinessCards(id, data, config);
      const result = await getBusinessCards();
      dispatch(getCardSuccess(result.data));
      dispatch(isLoadingState(false));
      if(navigation != null){
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'CreateBottom',
                state: {
                  routes: [{name: 'StackCarte'}],
                },
              },
            ],
          }),
        );
      }    
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const createBusinessCard = (
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      const token = await asyncGetToken();
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      await addBusinessCards(data, config);
      const result = await getBusinessCards();
      dispatch(getCardSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({name :'CreateBottom', screen : 'StackCarte' } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};
export const createBusinessCardSave = (
  cardId: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      await addBusinessCardSave(cardId);
      const result = await getBusinessCardSaves();
      dispatch(getCardSaveSuccess(result.data));
      dispatch(isLoadingStateSave(false));
      navigation.navigate({name :'CreateBottom', screen : 'StackCarte' } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingStateSave(false));
    }
  };
};

export const createPhotoCardSave = (
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateSave(true));

    try {
      const token = await asyncGetToken();
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      await addPhotoCardSave(true, config, data);
      const result = await getBusinessCardSaves();
      dispatch(getCardSaveSuccess(result.data));
      dispatch(isLoadingStateSave(false));
      navigation.navigate({name :'CreateBottom', screen : 'StackCarte' } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingStateSave(false));
    }
  };
};
