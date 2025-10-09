import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';

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
export const changeFavoriteStatus = createAction(
  '[Card component] Change Favorite Status',
  props<{
    offerId: string;
    status: number;
  }>(),
);
export const changeFavoriteStatusSuccess = createAction(
  '[Card component] Change Favorite Status Success',
  props<{
    offer: Offer;
  }>(),
);
export const changeFavoriteStatusFailure = createAction(
  '[Card component] Change Favorite Status Failure',
);
