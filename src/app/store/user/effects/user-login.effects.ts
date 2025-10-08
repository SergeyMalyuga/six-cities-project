import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../../../core/services/user-api.service';
import * as actions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class UserLoginEffects {
  private actions$ = inject(Actions);
  private userApiService = inject(UserApiService);
  private authService = inject(AuthService);

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      switchMap(({ email, password }) =>
        this.userApiService.postUser(email, password).pipe(
          map((user) => {
            this.authService.setToken(user.token);
            return actions.loginSuccess({ user });
          }),
          catchError(() => of(actions.loginFailure())),
        ),
      ),
    ),
  );
}
