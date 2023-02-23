import React, { Component } from 'react';
// import { Col, Row, Well } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { startCase, upperCase } from 'lodash'
import { Link } from "react-router";

const Pokedex = require("pokeapi-js-wrapper");

// import CHARIZARD from './charizard'

export default class PokemonList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        const P = new Pokedex.Pokedex();
        const { name } = this.props.params;
        if (name) {
            (async () => {
                const data = await P.getPokemonByName(name);
                console.log(data)
                this.setState({data})
            })()
        }
    }

    render() {
        const sprite = i => <img src={`/sprites/${i}.png`} alt={'Pokemon #' + i} key={i} style={{ width: '128px'}} />
        const dashToRange = str => {
            const [a, b] = str.split('-')
            return Array.from({length: parseInt(b) - parseInt(a) + 1}, (_, i) => i + parseInt(a))
        }
        if (this.props.params.query) {
            const list_array = this.props.params.query.split(',')
            return list_array.length ? (
                <div>
                    {list_array.map(i => i.includes('-') ? dashToRange(i).map(sprite) : sprite(i))}
                </div>
            ) : <div>Invalid array</div>
        }
        const { data } = this.state;
        if (!data) {
            return (
                <Row>
                    { Array.from(Array(1009).keys()).map(i => <a href={'pokedex/' + i}>{sprite(i)}</a>)}
                </Row>
            )
        }
        const { id, name, stats, types, ...other_data } = data;
        console.log('fikser murder', other_data, data)
        return (
            <div>
                {sprite(id)}
                <h3>#{id} {name}</h3>
                { types.map(t => <div key={t.slot}>{upperCase(t.type.name)}</div>) }
                { stats.map(s => <div key={s.stat.name}>{startCase(s.stat.name)}: {s.base_stat}</div>) }
            </div>
        )
    }
}