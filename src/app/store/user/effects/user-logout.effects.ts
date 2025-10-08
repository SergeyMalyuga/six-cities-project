import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserApiService} from '../../../core/services/user-api.service';
import * as actions from '../actions/user.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {logoutFailure} from '../actions/user.actions';

@Injectable()
export class UserLogoutEffect {
  private actions$ = inject(Actions);
  private userApiService: UserApiService = inject(UserApiService);

  logout$ = createEffect(() =>
    this.actions$.pipe(ofType(actions.logout), switchMap(() => this.userApiService.deleteUser()
      .pipe(map(() => actions.logoutSuccess()), catchError(() => of(logoutFailure()))))))
}
