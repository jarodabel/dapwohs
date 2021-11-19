import { createSelector } from '@ngrx/store';
import { State } from '../reducers';

const selectPokemon = (state: State) => state.pokemon;

export const selectPokemonList = createSelector(
  selectPokemon,
  (state) => {
    return state.currentPokemon;
  }
);

export const selectNextUrl = createSelector(
  selectPokemon,
  (state) => state.pokePaging.next,
);

export const selectPokePaging = createSelector(
  selectPokemon,
  (state) => state.pokePaging,
);
