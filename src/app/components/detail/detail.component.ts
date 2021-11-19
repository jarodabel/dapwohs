import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UniquePokemonApiResponse } from 'src/app/types';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  loading = true;
  error = false;
  pokemon: UniquePokemonApiResponse;
  params$ = this.route.params;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonDetails();
  }

  async getPokemonDetails() {
    try{
      const id = this.route.snapshot.paramMap.get('id');
      if(!id) {
        this.error = true;
        return;
      };
      // do not want to cast like this but i need to move on, perhaps the issue is related ts settings in this fresh project
      this.pokemon = await this.pokemonService.getPokemonById(id).pipe(take(1)).toPromise() || {} as UniquePokemonApiResponse;
      this.pokemon?.moves.sort((a, b) => a.move.name.localeCompare(b.move.name));
      this.loading = false;
    } catch(err) {
      this.error = true;
    }
  }
}
