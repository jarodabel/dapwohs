export interface PokemonApiResponse {
  count: number;
  next: string;
  previous: string;
  results: any[];
  limit: number;
  offset: number;
}

export interface UniquePokemonApiResponse {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  species: any;
  sprites: any;
  stats: any[];
  types: any[];
  weight: number;
}
