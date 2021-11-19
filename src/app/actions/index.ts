import { createAction } from '@ngrx/store';
import { PokemonApiResponse } from '../types';

const GetPokemon = 'GetPokemon';
const NextPokemon = 'NextPokemon';
const PrevPokemon = 'PrevPokemon';
const SavePokemonResult = 'SavePokemonResult';
const SearchForPokemon = 'SearchForPokemon';
const NextWithoutApiRequest = 'NextWithoutApiRequest';
const MarkAsCaught = 'MarkAsCaught';
const MarkAsWishList = 'MarkAsWishList';

export const getPokemon =  createAction(GetPokemon);
export const nextPokemon = createAction(NextPokemon);
export const prevPokemon = createAction(PrevPokemon);
export const nextPokemonWithoutApiRequest = createAction(NextWithoutApiRequest);

export const savePageResult = createAction(SavePokemonResult, (payload: PokemonApiResponse) => ({payload}));

export const searchForPokemon = createAction(SearchForPokemon, (payload: string) => ({payload}));

export const markAsCaught = createAction(MarkAsCaught, (payload: string) => ({payload}));
export const markAsWishList = createAction(MarkAsWishList, (payload: string) => ({payload}));
