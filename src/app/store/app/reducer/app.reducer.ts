import { AppState } from '../../../core/models/app.state';
import { ActionReducerMap } from '@ngrx/store';
import { offerReducer } from '../../offer/reducer/offer.reducer';
import { cityReducer } from '../../city/reducer/city.reducer';
import { userReducer } from '../../user/reducer/user.reducer';
import { favoriteOffersReducer } from '../../favorite-offer/reducer/favorite-offer.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  city: cityReducer,
  user: userReducer,
  favoriteOffers: favoriteOffersReducer,
};
