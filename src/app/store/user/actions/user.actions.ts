import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';

export const checkAuth = createAction('[App component] Check Auth');
export const checkAuthSuccess = createAction(
  '[App component] Check Auth Success',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[App component] Check Auth Failure',
);

export const login = createAction(
  '[App component] Login',
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[App component] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction('[App component] Login Failure');
