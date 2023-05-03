import React from 'react';
import {renderTypeBadge, typeColor} from "../PokemonType/helpers";
import {SpriteSV} from "./SpriteSV";
import {hasSprite, masterlist} from "./helpers";

const checker = word => {
	switch (word) {
		case 'Mega':
			return '-mega';
		case 'Primal':
			return '-primal';
		case 'Alolan':
			return '-alola';
		case 'Galarian':
			return '-galar';
		case 'Gigantamax':
			return '-gmax';
		case 'Hisuian':
			return '-hisui';
		case 'Paldea':
			return '-paldea';
	}
}

export const PokedexCard = pair => {
	console.log('pairya', pair)
	if (Array.isArray(pair)) {
		const [url, values] = pair;
		const modifier = checker(values[0]) || checker(values[2]) || '';
		const dest_url = `/pokedex/${values[1].toLowerCase()}${modifier}`;
		return (
			<a href={dest_url} key={url} className="dex_card" style={{ background: `linear-gradient(35deg, ${typeColor[values[3]]}A0 0%, ${typeColor[values[4] || values[3]]}80 100%)`, backdropFilter: 'opacity(0.6)' }}>
				<div className="flex flex-col" style={{height: '100%', alignItems: 'center'}}>
					{SpriteSV(url, 120)}
					<div className="dex_info">
						<div className="dex_name">
							{values[1]}
						</div>
						<div className="dex_id">
							{url}
						</div>
						<div className="dex_form">
							{[values[0], values[2]].filter(x => x).join(' ')}
						</div>
						{
							(values[3] || values[4]) &&
							<div className="types_container">
								{values[3] && renderTypeBadge(values[3])}
								{values[4] && renderTypeBadge(values[4])}
							</div>
						}
					</div>
				</div>
			</a>
		)
	} else {
		if (typeof pair === 'string' && hasSprite(pair)) {
			return PokedexCard([pair, masterlist[pair]]);
		} else if (typeof pair === 'string' || typeof pair === 'number') {
			return PokedexCard([`${pair}-0`, masterlist[`${pair}-0`]]);
		} else {
			console.error("what's wrong with you?", pair, typeof pair)
		}
	}
}