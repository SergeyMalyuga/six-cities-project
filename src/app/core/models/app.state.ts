import { OffersState } from './offers.state';
import { City } from './city';

export interface AppState {
  /* user: UserState;
  city: City;
  offers: OffersState;
  favoriteOffers: FavoriteOffersState;*/
  offers: OffersState;
  city: City;
}
