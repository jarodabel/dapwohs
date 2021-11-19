import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { getPokemon, searchForPokemon } from 'src/app/actions';
import { State } from 'src/app/reducers';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UniquePokemonApiResponse } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name: string = '';
  showNavigateToPokemon = {
    show: false,
    name: '',
    link: '',
  };

  constructor(private store: Store<State>, private pokemonService: PokemonService) { }

  async search() {
    if(!this.name) {
      return;
    }
    try {
      const pokemon = await this.pokemonService.getPokemonByName(this.name).pipe(take(1)).toPromise() as UniquePokemonApiResponse;

      this.showNavigateToPokemon = {
        show: true,
        name: pokemon.name,
        link: `/details/${pokemon.id}`,
      }
    } catch(error) {
      if (error instanceof HttpErrorResponse) {
        console.log(error);
      }
    }
  }
}
