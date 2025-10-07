import { UserState } from '../../../core/models/user.state';
import {
  AuthorizationStatus,
  DEFAULT_USER,
} from '../../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  checkAuth,
  checkAuthFailure,
  checkAuthSuccess, loginFailure, loginSuccess,
} from '../actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuth, (state) => ({
    ...state,
  })),
  on(checkAuthSuccess, (state: UserState, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(checkAuthFailure, (state) => ({
    ...state,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(loginSuccess, (state) => ({
    ...state,
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(loginFailure, (state) => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH,
  }))
);
