import { DEFAULT_CITY } from '../../../core/constants/const';
import { City } from '../../../core/models/city';
import { createReducer } from '@ngrx/store';

const initialState: City = DEFAULT_CITY;

export const cityReducer = createReducer<City>(initialState);
