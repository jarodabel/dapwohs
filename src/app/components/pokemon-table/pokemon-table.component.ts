import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, take, tap, withLatestFrom } from 'rxjs';
import { getPokemon, markAsCaught, markAsWishList, nextPokemon, prevPokemon } from 'src/app/actions';
import { State } from 'src/app/reducers';
import { selectPokemonList, selectPokePaging } from 'src/app/selectors';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss'],
})
export class PokemanTableComponent implements OnInit {
  loading = false;
  pokemon$ = this.store.pipe(
    select(selectPokemonList)
  );
  pagingInfo$ = this.store.pipe(select(selectPokePaging), tap(() => (this.loading = false)));
  count$ = this.pagingInfo$.pipe(map((pagingInfo) => pagingInfo.count));
  min$ = this.pagingInfo$.pipe(
    map((pagingInfo) => pagingInfo.offset - pagingInfo.limit),
    filter((offset) => offset >= 0)
  );
  max$ = this.pagingInfo$.pipe(
    map((pagingInfo) => pagingInfo.offset),
    withLatestFrom(this.count$),
    map(([max, count]) => (max < count ? max : count)),
    filter((offset) => offset >= 0)
  );
  maxCount$ = combineLatest([this.max$, this.count$]).pipe(map(([max, count]) => max === count));
  currentRange$ = combineLatest([this.min$, this.max$]).pipe(
    map(([min, max]) => `${min + 1} - ${max}`)
  );

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.shouldLoad();
  }

  async shouldLoad() {
    const pagingInfo = await this.pagingInfo$.pipe(take(1)).toPromise();
    if (pagingInfo.offset === 0) {
      this.store.dispatch(getPokemon());
    }
  }

  next() {
    this.loading = true;
    this.store.dispatch(nextPokemon());
  }

  previous() {
    this.loading = true;
    this.store.dispatch(prevPokemon());
  }

  addToPokemonCaught($event: Event, id: string) {
    console.log('add to caught', id);
    $event.stopPropagation();
    this.store.dispatch(markAsCaught(id));
  }

  addToPokemonWishList($event: Event, id: string) {
    $event.stopPropagation();
    this.store.dispatch(markAsWishList(id));
  }
}
