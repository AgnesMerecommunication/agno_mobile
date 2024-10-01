import IInitialState from '../../types/reducer/initialState';
import {actionTypeReducer} from './actionReducer';

export const initialState: IInitialState = {
  isLoading: true,
  userToken: null,
};

export default function reducerAuth(
  state: any,
  action: {type: any; token?: any},
) {
  switch (action.type) {
    case actionTypeReducer.RESTORE_TOKEN:
      return {
        userToken: action.token,
        isLoading: false,
      };
    case actionTypeReducer.SIGN_IN:
      return {
        ...state,
        userToken: action.token,
      };
    case actionTypeReducer.SIGN_OUT:
      return {
        ...state,
        userToken: null,
      };
  }
}
