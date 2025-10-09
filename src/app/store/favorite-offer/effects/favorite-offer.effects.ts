import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferApiService } from '../../../core/services/favorite-offer-api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as actions from '../actions/favorite-offer.actions';
import { changeFavoriteStatusFailure } from '../actions/favorite-offer.actions';

@Injectable()
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOffersApiService: FavoriteOfferApiService = inject(
    FavoriteOfferApiService,
  );

  loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadFavoriteOffers),
      switchMap(() =>
        this.favoriteOffersApiService.getOffers().pipe(
          map((offers) =>
            actions.loadFavoriteOffersSuccess({ favoriteOffers: offers }),
          ),
          catchError(() => of(actions.loadFavoriteOffersFailure())),
        ),
      ),
    ),
  );

  changeFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.changeFavoriteStatus),
      switchMap(({ offerId, status }) =>
        this.favoriteOffersApiService.changeStatus(offerId, status).pipe(
          map((offer) => actions.changeFavoriteStatusSuccess({ offer })),
          catchError(() => of(changeFavoriteStatusFailure())),
        ),
      ),
    ),
  );
}
