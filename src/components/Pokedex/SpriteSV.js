import React from "react";

export const SpriteSV = (i, size = 128) => <img src={`https://raw.githubusercontent.com/malcolmmamba/hitmondata/master/public/sprites/${i.toString().includes('-0') ? i.toString().split('-0')[0] : i.toString()}.png`} alt={'Pokedex #' + i} key={i} style={{ height: `${size}px`}} />