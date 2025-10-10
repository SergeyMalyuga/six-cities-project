import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../../core/models/offers';
import { FavoriteOffersState } from '../../../core/models/favorite-offers.state';
import { createReducer, on } from '@ngrx/store';
import {
  changeFavoriteStatus,
  changeFavoriteStatusFailure,
  changeFavoriteStatusSuccess,
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess,
} from '../actions/favorite-offer.actions';

export const favoriteOffersAdapter: EntityAdapter<OfferPreview> =
  createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOffersAdapter.getInitialState(
  {
    isLoading: false,
    error: null,
  },
);

export const favoriteOffersReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, (state) => ({
    ...state,
  })),
  on(loadFavoriteOffersSuccess, (state, { favoriteOffers }) =>
    favoriteOffersAdapter.setAll(favoriteOffers, state),
  ),
  on(loadFavoriteOffersFailure, (state) => ({
    ...state,
  })),
  on(changeFavoriteStatus, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(changeFavoriteStatusSuccess, (state, { offers }) =>
    favoriteOffersAdapter.setAll(offers, { ...state, isLoading: false }),
  ),
  on(changeFavoriteStatusFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
);
