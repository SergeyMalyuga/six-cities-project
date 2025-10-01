import { OffersState } from '../../../core/models/offers.state';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../../core/models/offers';
import { createReducer, on } from '@ngrx/store';
import {
  loadOffers,
  loadOffersFailure,
  loadOffersSuccess,
} from '../actions/offer.actions';

export const offerAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
const initialState: OffersState = offerAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const offerReducer = createReducer<OffersState>(
  initialState,
  on(loadOffers, (state: OffersState) => ({
    ...state,
  })),
  on(loadOffersSuccess, (state: OffersState, { offers }) =>
    offerAdapter.setAll(offers, state),
  ),
  on(loadOffersFailure, (state: OffersState) => ({
    ...state,
  })),
);
