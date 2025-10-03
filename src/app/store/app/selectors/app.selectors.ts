import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { City } from '../../../core/models/city';
import { offerAdapter } from '../../offer/reducer/offer.reducer';
import {OffersState} from '../../../core/models/offers.state';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');
const selectCityState = createFeatureSelector<AppState['city']>('city');

const offerSelectors = offerAdapter.getSelectors();

export const selectCity = createSelector(selectCityState, (city: City) => city);

export const selectAllOffers = createSelector(
  selectOfferState,
  offerSelectors.selectAll,
);

export const selectIsLoading = createSelector(
  selectOfferState,
  (state: OffersState) => state.isLoading
)
