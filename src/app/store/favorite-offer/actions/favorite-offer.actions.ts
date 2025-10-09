import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadFavoriteOffers = createAction(
  '[App component] Load FavoriteOffers]',
);
export const loadFavoriteOffersSuccess = createAction(
  '[App component] Load FavoriteOffersSuccess',
  props<{
    favoriteOffers: OfferPreview[];
  }>(),
);
export const loadFavoriteOffersFailure = createAction(
  '[App component] Load FavoriteOffersFailure',
);
