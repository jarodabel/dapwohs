import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { pokemonReducer, PokemonState } from './pokemon.reducer';

export interface State {
  pokemon: PokemonState;
}

export const reducers: ActionReducerMap<State> = {
  pokemon: pokemonReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
