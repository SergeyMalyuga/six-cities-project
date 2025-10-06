import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../../../core/services/user-api.service';
import * as actions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserAuthEffects {
  private actions$ = inject(Actions);
  private userApiService = inject(UserApiService);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.checkAuth),
      switchMap(() =>
        this.userApiService.checkAuthStatus().pipe(
          map((user) => actions.checkAuthSuccess({ user })),
          catchError(() => of(actions.checkAuthFailure())),
        ),
      ),
    ),
  );
}
