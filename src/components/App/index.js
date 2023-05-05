import React, { Component } from 'react';
// import { Nav, Navbar, NavItem } from 'react-bootstrap'

import './style.css';
// import {Route} from "react-router";
// import PokemonList from "../PokemonList";
// import ArceusList from "../ArceusList";
// import NotFound from "../NotFound";

class App extends Component {
    render() {
        return (
            <div style={{paddingBottom: '3rem'}}>
                <div className="flex card_list_anchors">
                    <a className="card_list_anchor" href="/pokedex">Pokédex</a>
                    <a className="card_list_anchor" href="/pokedex/vulpix-alola">Vulpix</a>
                    <a className="card_list_anchor" href="/pokemon_go/sorted">PoGo</a>
                    {/*<a className="card_list_anchor" href="/arceus">Arceus</a>*/}
                </div>
                {/*<Navbar inverse collapseOnSelect fixedTop>*/}
                {/*    <Navbar.Header>*/}
                {/*        <Navbar.Brand>*/}
                {/*            <a href="#">HitmonData</a>*/}
                {/*        </Navbar.Brand>*/}
                {/*        <Navbar.Toggle />*/}
                {/*    </Navbar.Header>*/}
                {/*    <Navbar.Collapse>*/}
                {/*        <Nav pullRight>*/}
                {/*            <NavItem eventKey="pokedex" href="/pokedex">Pokédex</NavItem>*/}
                {/*            <NavItem eventKey="slowpoke" href="/pokedex/slowpoke">Slowpoke</NavItem>*/}
                {/*            <NavItem eventKey="pogomal" href="/pokemon_go/4-6,13-15,19-20,27-31,37-38,50-53,58-62,69-80,83-85,95,98-99,109-110,113,116-119,122,126-127,129-130,133,144-146,150,152-157,173-181,186-189,201-205,207,215,220-221,223-225,228-230,234,236,238,242-250,265-272,276-277,280-282,290-291,298,304-306,309-310,313,320-321,327,333-334,338,341,349-352,357,360-362,366-369,371-373,377-384,387-398,412-417,420-423,439-440,442-458,479-485,487-489,495-497,501-508,524-526,529-530,532-537,540-545,550-556,561,566-567,570-579,582-594,602-604,610-612,615,619-620,624-626,636-646,656-658,661-681,686-693,696-699,701,703-707,710-711,713,717-718,722-766,769-776,778-800,803-806,808-818,821-830,833-861,864,868-892,894-900,902-1008">PoGo Mal</NavItem>*/}
                {/*            <NavItem eventKey="arceus" href="/arceus">Arceus</NavItem>*/}
                {/*        </Nav>*/}
                {/*    </Navbar.Collapse>*/}
                {/*</Navbar>*/}
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;