import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { getPokemon, nextPokemon, nextPokemonWithoutApiRequest, savePageResult } from '../actions';
import { State } from '../reducers';
import { limit } from '../reducers/pokemon.reducer';
import { selectNextUrl, selectPokePaging } from '../selectors';
import { PokemonApiResponse, UniquePokemonApiResponse } from '../types';

const pokeApi = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  getPokemonPaging$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPokemon),
        switchMap(() => this.getPokemonByPaging(limit, 0)),
        map((res: PokemonApiResponse) => savePageResult({...res}))
      ),
    { dispatch: true }
  );

  nextPokemonPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(nextPokemon),
        switchMap(() => this.store.pipe(select(selectPokePaging), take(1))),
        switchMap((pagingInfo) => {
          if(pagingInfo.offset + pagingInfo.limit <= pagingInfo.inStateCount) {
            return of(nextPokemonWithoutApiRequest());
          }
          if(pagingInfo.inStateCount >= pagingInfo.count) {
            return of();
          }
          return this.store.pipe(
            select(selectNextUrl),
            take(1),
            switchMap((url) => this.http.get<PokemonApiResponse>(url)),
            map((res: PokemonApiResponse) => savePageResult(res)),
          );
        }),
      ),
    { dispatch: true }
  );

  constructor(private http: HttpClient, private actions$: Actions, private store: Store<State>) {}

  getPokemonByName(name: string) {
    return this.http.get(`${pokeApi}/${name}`);
  }

  getPokemonById(id: string) {
    return this.http.get<UniquePokemonApiResponse>(`${pokeApi}/${id}`);
  }

  getPokemonByPaging(limit: number, offset: number) {
    return this.http.get<PokemonApiResponse>(
      `${pokeApi}?limit=${limit}&offset=${offset}`
    );
  }
}
