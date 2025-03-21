import IInitialState from '../../types/reducer/initialState';
import {actionTypeReducer} from './actionReducer';

export const initialState: IInitialState = {
  isLoading: true,
  userToken: null,
  isAuthenticated: false,
};

export default function reducerAuth(
  state: IInitialState = initialState,
  action: {type: string; token?: string | null},
) {
  switch (action.type) {
    case actionTypeReducer.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        isAuthenticated: action.token !== null,
      };
    case actionTypeReducer.SIGN_IN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case actionTypeReducer.SIGN_OUT:
      return {
        ...state,
        userToken: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
