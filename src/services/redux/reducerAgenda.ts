import {Dispatch, createSlice} from '@reduxjs/toolkit';
import {NavigationProp} from '@react-navigation/native';
import {
  addEvenement,
  deleteOneEvenement,
  getEvenement,
  updateEvenement,
} from '../apiServices';
// import {openCalendar} from '../../common/createAgendar';
import {notifyMessage} from '../../common/notifyMessage';
import { deleteAgenda, saveAgendaAll, updateAgenda } from '../../utils/AgendaUtilis';

const initialState = {
  agendas: [],
  isLoading: false,
};

export const agendaSlice = createSlice({
  name: 'agenda',
  initialState,
  reducers: {
    getEventSuccess(state, action) {
      state.agendas = action.payload;
    },

    isLoadingState(state, action) {
      state.isLoading = action.payload;
    },
  },
});
export const {getEventSuccess, isLoadingState} = agendaSlice.actions;
export default agendaSlice.reducer;

export const initializeListEvent = (page?: number, limit?: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));
    try {
      const result = await getEvenement(page, limit);
      dispatch(getEventSuccess(result.data));
      dispatch(isLoadingState(false));
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const removeOneEvent = (
  id: string,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      await deleteOneEvenement(id);
      const result = await getEvenement();
      await deleteAgenda(id);
      dispatch(getEventSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Agenda',
      } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const modifyOneEvent = (
  id: string,
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));

    try {
      await updateEvenement(id, data);
      const result = await getEvenement();
      updateAgenda(id, result.data);
      dispatch(getEventSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Agenda',
      } as never);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};

export const createEvent = (
  data: any,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(isLoadingState(true));
    try {
      
      await addEvenement(data);
      const result = await getEvenement();
      let dataAgenda = result.data;
      saveAgendaAll(dataAgenda);
      dispatch(getEventSuccess(result.data));
      dispatch(isLoadingState(false));
      navigation.navigate({
        name: 'CreateBottom',
        screen: 'Agenda',
      } as never);
      // openCalendar(data?.title, data?.from, data?.to, data?.description);
    } catch (error: any) {
      notifyMessage(error?.response?.data?.message);
      dispatch(isLoadingState(false));
    }
  };
};
