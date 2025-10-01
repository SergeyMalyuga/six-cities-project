import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

export const loadOffers = createAction('[App Component] Load offers');
export const loadOffersSuccess = createAction(
  '[App Component] Load offers success',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersFailure = createAction(
  '[App Component] Load offers failure',
);
