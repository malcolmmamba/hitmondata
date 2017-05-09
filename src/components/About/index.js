import React, { Component } from 'react';
import { Col, Row, Well } from 'react-bootstrap'
import _ from 'lodash'

import CHARIZARD from './charizard'
import './style.css';

export default class About extends Component {
    render() {
        const pkmn = CHARIZARD;
        console.log("PKMN");
        console.log(pkmn);

        return (
            <Row>
                <Col sm={12} md={6} lg={3}>
                    <Well className="text-center">
                        <img src={
                            "https://www.pkparaiso.com/imagenes/shuffle/sprites/" +
                            (pkmn.id < 100 ? "0" : "") +
                            (pkmn.id < 10 ? "0" : "") +
                            pkmn.id +
                            ".png"
                        } alt={_.startCase(pkmn.name)} />
                        <h2>{_.startCase(pkmn.name)}</h2>
                    </Well>
                    {
                        pkmn.types.forEach(
                            function (a) {
                                return <div>{_.startCase(a.type.name)}</div>
                            }
                        )
                    }
                </Col>
                <Col sm={12} md={6} lg={9}>
                    NAxhN sada
                </Col>
            </Row>
        );
    }
}