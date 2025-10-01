import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferApiService } from '../../../core/services/offer-api.service';
import * as actions from '../actions/offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class OfferEffects {
  private actions$ = inject(Actions);
  private offerApiService: OfferApiService = inject(OfferApiService);

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadOffers),
      switchMap(() =>
        this.offerApiService.getOffers().pipe(
          map((offers) => actions.loadOffersSuccess({ offers })),
          catchError(() => of(actions.loadOffersFailure())),
        ),
      ),
    ),
  );
}
