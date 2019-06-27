'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	waylonsmithers: {
		species: "Waylon Smithers",
		types: ["Normal"],
		gender: "M",
		baseStats: {hp: 200, atk: 200, def: 200, spa: 200, spd: 200, spe: 200},
		abilities: {0: "Cute Charm"},
		heightm: 0.7,
		weightkg: 21,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
};

exports.BattlePokedex = BattlePokedex;
