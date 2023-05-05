import React, { Component } from 'react';
// import { Col, Row, Well } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { startCase, upperCase } from 'lodash'
// import { Link } from "react-router";

const Pokedex = require("pokeapi-js-wrapper");
const BrokenImage = "/arceus_sprites/pokeicon_l_0000_000_000_n_00000000_fn_n.png";

// import CHARIZARD from './charizard'

const otherForms = {

  "0037_000_011": "replaceme",
  "0038_000_011": "replaceme",
  "0058_000_041": "replaceme",
  "0059_000_041": "replaceme",
  "0100_000_041": "replaceme",
  "0101_000_041": "replaceme",
  "0157_000_041": "replaceme",
  "0185_001_001": "replaceme",
  "0190_001_001": "replaceme",
  "0201_011_000": "replaceme",
  "0201_012_000": "replaceme",
  "0201_013_000": "replaceme",
  "0201_014_000": "replaceme",
  "0201_015_000": "replaceme",
  "0201_016_000": "replaceme",
  "0201_017_000": "replaceme",
  "0201_018_000": "replaceme",
  "0201_019_000": "replaceme",
  "0201_020_000": "replaceme",
  "0201_021_000": "replaceme",
  "0201_022_000": "replaceme",
  "0201_023_000": "replaceme",
  "0201_024_000": "replaceme",
  "0201_025_000": "replaceme",
  "0201_026_000": "replaceme",
  "0201_027_000": "replaceme",
  "0201_028_000": "replaceme",
  "0201_029_000": "replaceme",
  "0201_030_000": "replaceme",
  "0201_031_000": "replaceme",
  "0201_032_000": "replaceme",
  "0201_033_000": "replaceme",
  "0201_034_000": "replaceme",
  "0201_035_000": "replaceme",
  "0201_036_000": "replaceme",
  "0201_037_000": "replaceme",
  "0201_038_000": "replaceme",
  "0211_000_041": "replaceme",
  "0215_000_041": "replaceme",
  "0215_001_041": "replaceme",
  "0412_011_000": "replaceme",
  "0412_012_000": "replaceme",
  "0412_013_000": "replaceme",
  "0413_011_000": "replaceme",
  "0413_012_000": "replaceme",
  "0413_013_000": "replaceme",
  "0421_011_000": "replaceme",
  "0421_012_000": "replaceme",
  "0422_011_000": "replaceme",
  "0422_012_000": "replaceme",
  "0423_011_000": "replaceme",
  "0423_012_000": "replaceme",
  "0479_011_000": "replaceme",
  "0479_012_000": "replaceme",
  "0479_013_000": "replaceme",
  "0479_014_000": "replaceme",
  "0479_015_000": "replaceme",
  "0479_016_000": "replaceme",
  "0483_011_000": "replaceme",
  "0483_012_000": "replaceme",
  "0484_011_000": "replaceme",
  "0484_012_000": "replaceme",
  "0487_011_000": "replaceme",
  "0487_012_000": "replaceme",
  "0492_011_000": "replaceme",
  "0492_012_000": "replaceme",
  "0493_011_000": "replaceme",
  "0493_012_000": "replaceme",
  "0493_013_000": "replaceme",
  "0493_014_000": "replaceme",
  "0493_015_000": "replaceme",
  "0493_016_000": "replaceme",
  "0493_017_000": "replaceme",
  "0493_018_000": "replaceme",
  "0493_019_000": "replaceme",
  "0493_020_000": "replaceme",
  "0493_021_000": "replaceme",
  "0493_022_000": "replaceme",
  "0493_023_000": "replaceme",
  "0493_024_000": "replaceme",
  "0493_025_000": "replaceme",
  "0493_026_000": "replaceme",
  "0493_027_000": "replaceme",
  "0493_028_000": "replaceme",
  "0503_000_041": "replaceme",
  "0549_000_041": "replaceme",
  "0550_000_041": "replaceme",
  "0570_000_041": "replaceme",
  "0571_000_041": "replaceme",
  "0628_000_041": "replaceme",
  "0641_011_000": "replaceme",
  "0641_012_000": "replaceme",
  "0642_011_000": "replaceme",
  "0642_012_000": "replaceme",
  "0645_011_000": "replaceme",
  "0645_012_000": "replaceme",
  "0751_000_041": "replaceme",
  "0764_000_041": "replaceme",
  "0765_000_041": "replaceme",
  "0843_000_041": "replaceme",
  "1003_000_041": "replaceme",
  "1004_011_041": "replaceme",
  "1004_012_041": "replaceme",
  "1005_000_041": "replaceme",
  "1006_000_041": "replaceme",
  "1006_001_041": "replaceme"
}

const padNum = (i, j = 4, k = '0') => i.toString().padStart(j, k)

export default class ArceusList extends Component {
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

  imageOnLoad(event) {
    // console.log(`Picture successfully ${event.currentTarget.src} loaded.`);
    if (event.currentTarget.className !== "error") {
      event.currentTarget.className = "arceus_thumbnail";
    }
  };
  imageOnError(event) {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error";
  };
  sprite(dexNum, gender = 0, variant = 0) {
    return typeof dexNum === 'number' ? (
      <img
        src={`/arceus_sprites/pokeicon_l_${padNum(dexNum)}_${padNum(gender, 3)}_${padNum(variant, 3)}_n_00000000_fn_n.png`}
        onLoad={e => this.imageOnLoad(e)}
        onError={e => this.imageOnError(e)}
        alt={'Pokedex #' + dexNum} key={dexNum} className="arceus_thumbnail" />
    ) : (
      <img
        src={`/arceus_sprites/pokeicon_l_${dexNum}_n_00000000_fn_n.png`}
        onLoad={e => this.imageOnLoad(e)}
        onError={e => this.imageOnError(e)}
        alt={'Pokedex #' + dexNum} key={dexNum} className="arceus_thumbnail" />
    )
  }

  render() {
    const dashToRange = str => {
      const [a, b] = str.split('-')
      return Array.from({length: parseInt(b, 10) - parseInt(a, 10) + 1}, (_, i) => i + parseInt(a, 10))
    }
    if (this.props.params.query) {
      const list_array = this.props.params.query.split(',')
      return list_array.length ? (
        <div>
          {list_array.map(i => i.includes('-') ? dashToRange(i).map(this.sprite) : this.sprite(i))}
        </div>
      ) : <div>Invalid array</div>
    }
    const { data } = this.state;
    if (!data) {
      return (
        <div>
          <Row>
            <h3>Hisui Pokedex</h3>
            { Array.from(Array(1009).keys()).map(i => (
              <a href={'pokedex/' + i}>
                {this.sprite(i)}
              </a>
            ))}
          </Row>
          <Row>
            <h3>Gender Differences</h3>
            { Array.from(Array(1009).keys()).map(i => (
              <a href={'pokedex/' + i}>
                {this.sprite(i, 1)}
              </a>
            ))}
          </Row>
          <Row>
            <h3>Hisuian Forms</h3>
            { Array.from(Array(1009).keys()).map(i => (
              <a href={'pokedex/' + i}>
                {this.sprite(i, 0, 41)}
              </a>
            ))}
          </Row>
          <Row>
            <h3>Non-standard</h3>
            { Object.entries(otherForms).map(pair => {
              const [url, caption] = pair;
              return (
                <div className="arceus_thumbnail">
                  <img
                    src={`/arceus_sprites/pokeicon_l_${url}_n_00000000_fn_n.png`}
                    onLoad={e => this.imageOnLoad(e)}
                    onError={e => this.imageOnError(e)}
                    alt={'Pokedex #' + url}
                    key={url}
                  />
                  {caption}
                </div>
              )
            })}
          </Row>
        </div>
      )
    }
    const { id, name, stats, types, ...other_data } = data;
    console.log('fikser murder', other_data, data)
    return (
      <div>
        {this.sprite(id)}
        <h3>#{id} {name}</h3>
        { types.map(t => <div key={t.slot}>{upperCase(t.type.name)}</div>) }
        { stats.map(s => <div key={s.stat.name}>{startCase(s.stat.name)}: {s.base_stat}</div>) }
      </div>
    )
  }
}