import { OffersState } from './offers.state';
import { City } from './city';
import { UserState } from './user.state';

export interface AppState {
  /* user: UserState;
  city: City;
  offers: OffersState;
  favoriteOffers: FavoriteOffersState;*/
  user: UserState;
  offers: OffersState;
  city: City;
}
