import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import ArceusList from './components/ArceusList';
import PokedexPage from './components/Pokedex/PokedexPage';
import PokemonType from './components/PokemonType/PokemonType';
import PokemonList from './components/PokemonList';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <Route path="pokedex" exact component={PokemonList} />
      <Route path="pokedex/:name" component={PokedexPage} />
      <Route path="region/:query" component={PokemonList} />
      <Route path="type/:typ" component={PokemonType} />
      <Route path="pokemon_go/:query" component={PokemonList} />
      <Route path="arceus" component={ArceusList} >
        <Route path=":name" component={ArceusList} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;