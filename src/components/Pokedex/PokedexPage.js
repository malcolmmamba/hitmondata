import React, { Component } from 'react';
import { startCase, sortBy } from 'lodash'
import {PokedexCard} from "./PokedexCard";
import {fetchAllForms, masterlist, statColors, statName} from "./helpers";
// import {all} from "express/lib/application";

const Pokedex = require("pokeapi-js-wrapper");

const fetchGameSetThumbnail = {
	'red-blue': ['R/B', 'firebrick'],
	'yellow': ['Y', 'firebrick'],
	'gold-silver': ['G/S', 'goldenrod'],
	'crystal': ['C', 'goldenrod'],
	'ruby-sapphire': ['R/S', 'forestgreen'],
	'emerald': ['E', 'forestgreen'],
	'firered-leafgreen': ['FR/LG', 'forestgreen'],
	'diamond-pearl': ['D/P', 'teal'],
	'platinum': ['Pt', 'teal'],
	'heartgold-soulsilver': ['HG/SS', 'teal'],
	'black-white': ['B/W', 'slategray'],
	'colosseum': ['Col', 'slategray'],
	'xd': ['XD', 'slategray'],
	'black-2-white-2': ['B2/W2', 'slategray'],
	'x-y': ['X/Y', 'steelblue'],
	'omega-ruby-alpha-sapphire': ['OR/AS', 'steelblue'],
	'sun-moon': ['S/M', 'indigo'],
	'ultra-sun-ultra-moon': ['US/UM', 'indigo'],
	'lets-go-pikachu-lets-go-eevee': ['LGP/E', 'indigo'],
	'sword-shield': ['Sw/Sh', 'purple'],
	'scarlet-violet': ['S/V', 'orangered'],
}

const renderGameSet = (vgd) => {
	const { level_learned_at, move_learn_method, version_group } = vgd;
	const hasThumbnail = fetchGameSetThumbnail[version_group.name]
	const key = [version_group.name, move_learn_method.name, level_learned_at].join('-');
	return (
		<span key={key} title={key} className="game_thumbnail" style={{background: hasThumbnail ? hasThumbnail[1] : 'fuchsia'}}>
			{hasThumbnail ? hasThumbnail[0] : version_group.name}
		</span>
	)
}


const fetchGameThumbnail = {
	'red': ['Red', 'firebrick'],
	'blue': ['Blue', 'firebrick'],
	'yellow': ['Yellow', 'firebrick'],
	'gold': ['Gold', 'goldenrod'],
	'silver': ['Silver', 'goldenrod'],
	'crystal': ['Crystal', 'goldenrod'],
	'ruby': ['Ruby', 'forestgreen'],
	'sapphire': ['Sapphire', 'forestgreen'],
	'emerald': ['Emerald', 'forestgreen'],
	'firered': ['Fire Red', 'forestgreen'],
	'leafgreen': ['Leaf Green', 'forestgreen'],
	'diamond': ['Diamond', 'teal'],
	'pearl': ['Pearl', 'teal'],
	'platinum': ['Platinum', 'teal'],
	'heartgold': ['Heart Gold', 'teal'],
	'soulsilver': ['Soul Silver', 'teal'],
	'black': ['Black', 'slategray'],
	'white': ['White', 'slategray'],
	'colosseum': ['Colosseum', 'slategray'],
	'xd': ['XD', 'slategray'],
	'black-2': ['Black 2', 'slategray'],
	'white-2': ['White 2', 'slategray'],
	'x': ['X', 'steelblue'],
	'y': ['Y', 'steelblue'],
	'omega-ruby': ['Omega Ruby', 'steelblue'],
	'alpha-sapphire': ['Alpha Sapphire', 'steelblue'],
	'sun': ['Sun', 'indigo'],
	'moon': ['Moon', 'indigo'],
	'ultra-sun': ['Ultra Sun', 'indigo'],
	'ultra-moon': ['Ultra Moon', 'indigo'],
	'lets-go-pikachu': ["Let's Go Pikachu", 'indigo'],
	'lets-go-eevee': ["Let's Go Eevee", 'indigo'],
	'sword': ['Sword', 'purple'],
	'shield': ['Shield', 'purple'],
	'scarlet': ['Scarlet', 'orangered'],
	'violet': ['Violet', 'orangered'],
}

const renderGame = gi => {
	const { name } = gi.version;
	const hasBackground = fetchGameThumbnail[name]
	return (
		<span key={name} title={startCase(name)} className="game_thumbnail" style={{background: hasBackground ? hasBackground[1] : 'fuchsia'}}>
			{startCase(hasBackground[0])}
		</span>
	)
}

const renderAPISprite = ([key, value]) => {
	if (value === null) {
		return null
	} else if (typeof value === 'string') {
		return (
			<div key={key} style={{display: 'inline-block'}}>
				<img src={value} style={{maxHeight: '120px', maxWidth: '120px'}} />
				<em className="block">{key}</em>
			</div>
		)
	} else if (typeof value === 'object') {
		return Object.entries(value).length > 0 && (
			<div key={key}>
				{Object.entries(value).map(renderAPISprite)}
			</div>
		)
	}
}

const defaultForm = {
	'charizard x-mega': 'charizard-mega-x',
	'charizard y-mega': 'charizard-mega-y',
	"farfetch'd": 'farfetchd',
	'mr. mime': 'mr-mime',
	'mewtwo x-mega': 'mewtwo-mega-x',
	'mewtwo y-mega': 'mewtwo-mega-y',
	'deoxys': 'deoxys-normal',
	'mime jr.': 'mime-jr',
	'giratina': 'giratina-altered',
	'shaymin': 'shaymin-land',
	'basculin': 'basculin-red-striped',
	'darmanitan': 'darmanitan-standard',
	'tornadus': 'tornadus-incarnate',
	'thundurus': 'thundurus-incarnate',
	'landorus': 'landorus-incarnate',
	'enamorus': 'enamorus-incarnate',
	'keldeo': 'keldeo-ordinary',
	'meloetta': 'meloetta-aria',
	'flabébé': 'flabebe',
	'meowstic': 'meowstic-male',
	'aegislash': 'aegislash-blade',
	'pumpkaboo': 'pumpkaboo-average',
	'gourgeist': 'gourgeist-average',
	'zygarde': 'zygarde-50',
	'oricorio': 'oricorio-baile',
	'lycanroc': 'lycanroc-midday',
	'wishiwashi': 'wishiwashi-solo',
	'minior': 'minior-red-meteor',
	'toxtricity': 'toxtricity-amped',
	"sirfetch'd": 'sirfetchd',
	'eiscue': 'eiscue-ice',
	'indeedee': 'indeedee-male',
	'morpeko': 'morpeko-full-belly',
	'mr. rime': 'mr-rime',
	'urshifu': 'urshifu-single-strike',
	'basculegion': 'basculegion-male',
}

export default class PokedexPage extends Component {
	constructor(props) {
		console.log('pp props', props);
		super(props);
		this.state = {}
	}
	componentDidMount() {
		console.log('cdm', this.props);
		const P = new Pokedex.Pokedex();
		const { name } = this.props.params;
		if (name) {
			console.log('name', name);
			(async () => {
				const to_send = defaultForm[name] || name.replace(/\s+/g, '-');
				const data = await P.getPokemonByName(to_send);
				const spid = data.species && data.species.url && data.species.url.split('/');
				console.log(data, name, to_send)
				this.setState({data, all_forms: fetchAllForms(spid[spid.length - 2]) })
			})()
		}
	}

	render() {
		const { data = {}, all_forms = {} } = this.state;
		const { id, name, stats, types, abilities, game_indices, moves, height, weight, sprites, species, ...unused_data } = data;
		const spid = species && species.url && species.url.split('/');
		console.log('fikser murder', id, spid && typeof spid[spid.length - 2], unused_data, data)

		if (id) {
			return (
				<div>
					<div className="card_list">
						{Object.keys(all_forms).map(k => PokedexCard([k, masterlist[k]]))}
					</div>
					<div>
						<h3 className="card_list_header">Sprites</h3>
						<div>
							{Object.entries(sprites).map(renderAPISprite)}
						</div>

						<h3 className="card_list_header">Stats</h3>
						<table style={{width: '100%'}}>
							<tbody>
								<tr>
									<th>Height</th>
									<td>{`${height / 10.0}m`} / {`${Math.floor(height / 3.048)}'${Math.round((height / .254) % 12)}"`}</td>
								</tr>
								<tr>
									<th>Weight</th>
									<td>{`${weight / 10.0}kg`} / {`${Math.round(weight * .2205)}lbs`}</td>
								</tr>
								{ stats.map(s => (
									<tr key={s.stat.name}>
										<th style={{ width: '70px'}}>
											{statName[s.stat.name]}
										</th>
										<th style={{ background: '#00000010'}}>
											<div style={{background: statColors[s.stat.name], width: `${s.base_stat / 2.25}%`, padding: '2px 10px', borderRadius: '8px'}}>
												{s.base_stat}
											</div>
										</th>
									</tr>
								))}
							</tbody>
						</table>

						<h3 className="card_list_header">Abilities</h3>
						{ abilities.map(a => <div key={`${a.ability.url}-${a.slot}`}>{startCase(a.ability.name)} {a.is_hidden && <span>(Hidden)</span>}</div>) }

						{
							game_indices.length > 0 &&
							<div>
								<h3 className="card_list_header">Available in</h3>
								<div>{game_indices.map(renderGame)}</div>
							</div>
						}

						<h3 className="card_list_header">Moves</h3>
						<div style={{ overflowX: "auto" }}>
							<table className="move_list">
								<tbody>
									{sortBy(moves, m => m.move.name).map(m => (
										<tr key={m.move.url.split('/')[6]}>
											<th style={{ whiteSpace: 'nowrap', width: '150px' }}>
												{startCase(m.move.name)}
											</th>
											<td>
												{m.version_group_details.map(renderGameSet)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<h3 className="card_list_header">JSON Dump</h3>
						<code>{JSON.stringify(unused_data)}</code>
					</div>
				</div>
			)
		} else {
			return <div>Loading...</div>
		}
	}
}