import { AppState } from '../../../core/models/app.state';
import { ActionReducerMap } from '@ngrx/store';
import { offerReducer } from '../../offer/reducer/offer.reducer';
import {cityReducer} from '../../city/reducer/city.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  city: cityReducer,
};
