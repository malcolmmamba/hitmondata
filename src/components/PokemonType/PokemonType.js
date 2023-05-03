import React, { Component } from 'react';
import { startCase, sortBy } from 'lodash'
import {PokedexCard} from "../Pokedex/PokedexCard";
import {fetchAllForms, masterlist, renderTypeBadge, statColors, statName, typeColor} from "./helpers";
import {formToSprite} from "../Pokedex/helpers";
import {SpriteSV} from "../Pokedex/SpriteSV";
// import {all} from "express/lib/application";

const Pokedex = require("pokeapi-js-wrapper");

const generateCard = p => {
	const dex_num = p.pokemon.url.split('/')[6];
	const dex_name = p.pokemon.name;
	if (dex_num < 1500) {
		return PokedexCard(dex_num)
	} else if (formToSprite[dex_name]) {
		return PokedexCard(formToSprite[dex_name])
	} else {
		return (
			<a href={'/pokedex/' + dex_name}>
				{/*<div className="flex flex-col" style={{height: '100%', alignItems: 'center'}}>*/}
				{/*	{SpriteSV(url, 120)}*/}
				{/*	<div className="dex_info">*/}
				{/*		<div className="dex_name">*/}
				{/*			{values[1]}*/}
				{/*		</div>*/}
				{/*		<div className="dex_id">*/}
				{/*			{url}*/}
				{/*		</div>*/}
				{/*		<div className="dex_form">*/}
				{/*			{[values[0], values[2]].filter(x => x).join(' ')}*/}
				{/*		</div>*/}
				{/*		{*/}
				{/*			(values[3] || values[4]) &&*/}
				{/*			<div className="types_container">*/}
				{/*				{values[3] && renderTypeBadge(values[3])}*/}
				{/*				{values[4] && renderTypeBadge(values[4])}*/}
				{/*			</div>*/}
				{/*		}*/}
				{/*	</div>*/}
				{/*</div>*/}
				<div className="dex_card">
					{dex_name}/{dex_num} is missing
				</div>
			</a>
		)
	}
}

export default class PokemonType extends Component {
	constructor(props) {
		console.log('pp props', props);
		super(props);
		this.state = {}
	}
	componentDidMount() {
		const P = new Pokedex.Pokedex();
		const { typ } = this.props.params;
		if (typ) {
			(async () => {
				const data = await P.getTypeByName(typ);
				this.setState({data})
			})()
		}
	}

	render() {
		const { data = {} } = this.state;
		const { id, name, moves, pokemon, ...unused_data } = data;
		// const spid = species && species.url && species.url.split('/');
		// console.log('fikser murder', id, spid && typeof spid[spid.length - 2], unused_data, data)

		console.log('eep', data, Object.keys(data).length)
		if (Object.keys(data).length) {
			return (
				<div>
					<div className="types_container" style={{margin: '1rem 0'}}>
						{Object.keys(typeColor).map(renderTypeBadge)}
					</div>
					<div className="card_list">
						{pokemon.map(generateCard)}
					</div>
				</div>
			)
		} else {
			return <div>Loading...</div>
		}
	}
}