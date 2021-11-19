import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PokemanTableComponent } from './components/pokemon-table/pokemon-table.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { PokemonService } from './services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemanTableComponent,
    DetailComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([PokemonService]),
    FormsModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
