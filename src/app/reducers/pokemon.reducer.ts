import { createReducer, on } from '@ngrx/store';
import { markAsCaught, markAsWishList, nextPokemonWithoutApiRequest, prevPokemon, savePageResult } from '../actions';

export const limit = 30;

interface Pokemon {
  name: string;
  url: string;
  link: string;
  id: string;
  caught: boolean;
  wishList: boolean;
}

export type PokemonState = {
  all: Pokemon[];
  pokePaging: any;
  currentPokemon: Pokemon[];
};

const setPokePaging = (state: PokemonState, { type, payload }: any) => {
  const currentPokemon = [...payload.results].map((p) => {
    const id = p.url.split('/')[6];
    return {...p, link: `details/${id}`, id};
  });
  const inStateCount = state.all.length + currentPokemon.length;
  const offset = state.pokePaging.offset + limit;
  return {
    ...state,
    all: [...state.all, ...currentPokemon],
    pokePaging: {
      ...payload,
      inStateCount,
      limit,
      offset,
    },
    currentPokemon,
  };
};

const setCurrentPokemon = (state: PokemonState, { type }: any) => {
  let currentPokemon: Pokemon[];
  let newOffset: number;
  if (type === prevPokemon.type) {
    let min = state.pokePaging.offset - (limit*2);
    newOffset = state.pokePaging.offset - limit;
    if(min < 0) {
      min = 0;
      newOffset = limit;
    }
    currentPokemon = state.all.slice(min, newOffset);
    console.log(min, newOffset);
  } else {
    const min = state.pokePaging.offset
    newOffset = state.pokePaging.offset + limit;
    currentPokemon = state.all.slice(min, newOffset);
    console.log(min, newOffset);
  }
  return {
    ...state,
    pokePaging: {
      ...state.pokePaging,
      offset: newOffset,
    },
    currentPokemon,
  };
};

const setPokemonToCaught = (state: PokemonState, { type, payload }: any) => {
  const mapFn = (p: Pokemon) => {
    if (p.id === payload) {
      const caught = p?.caught ? false : true;
      return {...p, caught};
    }
    return p;
  }
  const all = state.all.map(mapFn);
  const currentPokemon = state.currentPokemon.map(mapFn);
  return {
    ...state,
    all,
    currentPokemon,
  };
};

const setPokemonToWishList = (state: PokemonState, { type, payload }: any) => {
  const mapFn = (p: Pokemon) => {
    if (p.id === payload) {
      const wishList = p?.wishList ? false : true;
      return {...p, wishList};
    }
    return p;
  }
  const all = state.all.map(mapFn);
  const currentPokemon = state.currentPokemon.map(mapFn);
  return {
    ...state,
    all,
    currentPokemon,
  };
};

const initialState: PokemonState = {
  all: [],
  pokePaging: {
    offset: 0,
  },
  currentPokemon: [],
};

export const pokemonReducer = createReducer(
  initialState,
  on(savePageResult, setPokePaging),
  on(prevPokemon, setCurrentPokemon),
  on(nextPokemonWithoutApiRequest, setCurrentPokemon),
  on(markAsCaught, setPokemonToCaught),
  on(markAsWishList, setPokemonToWishList),
);

export function permissionsReducerFn(state: PokemonState, action: any) {
  return pokemonReducer(state, action);
}
