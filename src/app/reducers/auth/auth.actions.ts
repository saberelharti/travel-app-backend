import {Action} from '@ngrx/store';

// Authentication status constants
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// New User constants
export const SET_NEW_USER = '[Auth] Set New User';
export const SET_OLD_USER = '[Auth] Set Old User';

// Authentication status classes
export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

// New User Classes
export class SetNewUser implements Action {
  readonly type = SET_NEW_USER;
}

export class SetOldUser implements Action {
  readonly type = SET_OLD_USER;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated | SetNewUser | SetOldUser;
