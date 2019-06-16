import {AuthActions, SET_AUTHENTICATED, SET_NEW_USER, SET_OLD_USER, SET_UNAUTHENTICATED} from './auth.actions';


export interface State {
  isAuthenticated: boolean;
  isNewUser?: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isNewUser: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        isNewUser: false
      };
    case SET_NEW_USER:
      return {
        isAuthenticated: false,
        isNewUser: true
      };
    case SET_OLD_USER:
      return {
        isAuthenticated: false,
        isNewUser: false
      };
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getIsNewUser = (state: State) => state.isNewUser;
