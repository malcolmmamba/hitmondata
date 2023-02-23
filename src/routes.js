import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import PokemonList from './components/PokemonList';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App}>
            <Route path="pokedex" component={PokemonList} >
                <Route path=":name" component={PokemonList} />
            </Route>
            <Route path="pokemon_go/:query" component={PokemonList} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);

export default Routes;