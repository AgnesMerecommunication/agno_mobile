import {Dispatch, createSlice} from '@reduxjs/toolkit';
import {getCountry, getInfoUser, updateInfoUser} from '../apiServices';
import {notifyMessage} from '../../common/notifyMessage';
import {NavigationProp} from '@react-navigation/native';
import {asyncGetToken, asyncGetUserId} from '../asyncStorage';

const initialState = {
  users: null,
  country: [],

  isLoading: false,
  isLoadingCountry: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserSuccess(state, action) {
      state.users = action.payload;
    },

    getCountrySuccess(state, action) {
      state.country = action.payload;
    },

    isLoadingState(state, action) {
      state.isLoading = action.payload;
    },
    isLoadingStateCountry(state, action) {
      state.isLoadingCountry = action.payload;
    },
  },
});
export const {
  getUserSuccess,
  isLoadingState,
  isLoadingStateCountry,
  getCountrySuccess,
} = userSlice.actions;
export default userSlice.reducer;

export const initializeInfoUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));
    try {
      const result = await getInfoUser();
      dispatch(getUserSuccess(result.data));
      dispatch(isLoadingState(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const initializeListCountry = () => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingStateCountry(true));
    try {
      const result = await getCountry();

      dispatch(getCountrySuccess(result.data));
      dispatch(isLoadingStateCountry(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingStateCountry(false));
    }
  };
};

export const modifyInfoUser = (
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
      const userId = await asyncGetUserId();
      await updateInfoUser(data, userId, config);
      const result = await getInfoUser();
      dispatch(getUserSuccess(result.data));
      dispatch(isLoadingState(false));
      if(navigation){
        navigation.goBack();
      }
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};
