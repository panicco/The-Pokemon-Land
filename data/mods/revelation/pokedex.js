'use strict';

/**@type {{[k: string]: ModdedTemplateData}} */
let BattlePokedex = {
	necrozmaultra: {
		inherit: true,
		types: ['Psychic', 'Light'],
	},
	xtype: {
		species: "X-Type",
		types: ["Normal"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
		otherFormes: ["xtypebug", "xtypedark", "xtypedragon", "xtypeelectric", "xtypefairy", "xtypefighting", "xtypefire", "xtypeflying", "xtypeghost", "xtypegrass", "xtypeground", "xtypeice", "xtypepoison", "xtypepsychic", "xtyperock", "xtypesteel", "xtypewater"],
	},
	xtypebug: {
		species: "X-Type-Bug",
		baseSpecies: "X-Type",
		forme: "Bug",
		formeLetter: "B",
		types: ["Bug"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypedark: {
		species: "X-Type-Dark",
		baseSpecies: "X-Type",
		forme: "Dark",
		formeLetter: "D",
		types: ["Dark"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypedragon: {
		species: "X-Type-Dragon",
		baseSpecies: "X-Type",
		forme: "Dragon",
		formeLetter: "D",
		types: ["Dragon"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypeelectric: {
		species: "X-Type-Electric",
		baseSpecies: "X-Type",
		forme: "Electric",
		formeLetter: "E",
		types: ["Electric"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypefairy: {
		species: "X-Type-Fairy",
		baseSpecies: "X-Type",
		forme: "Fairy",
		formeLetter: "F",
		types: ["Fairy"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypefighting: {
		species: "X-Type-Fighting",
		baseSpecies: "X-Type",
		forme: "Fighting",
		formeLetter: "F",
		types: ["Fighting"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypefire: {
		species: "X-Type-Fire",
		baseSpecies: "X-Type",
		forme: "Fire",
		formeLetter: "F",
		types: ["Fire"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypeflying: {
		species: "X-Type-Flying",
		baseSpecies: "X-Type",
		forme: "Flying",
		formeLetter: "F",
		types: ["Flying"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypeghost: {
		species: "X-Type-Ghost",
		baseSpecies: "X-Type",
		forme: "Ghost",
		formeLetter: "G",
		types: ["Ghost"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypegrass: {
		species: "X-Type-Grass",
		baseSpecies: "X-Type",
		forme: "Grass",
		formeLetter: "G",
		types: ["Grass"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypeground: {
		species: "X-Type-Ground",
		baseSpecies: "X-Type",
		forme: "Ground",
		formeLetter: "G",
		types: ["Ground"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypeice: {
		species: "X-Type-Ice",
		baseSpecies: "X-Type",
		forme: "Ice",
		formeLetter: "I",
		types: ["Ice"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypepoison: {
		species: "X-Type-Poison",
		baseSpecies: "X-Type",
		forme: "Poison",
		formeLetter: "P",
		types: ["Poison"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypepsychic: {
		species: "X-Type-Psychic",
		baseSpecies: "X-Type",
		forme: "Psychic",
		formeLetter: "P",
		types: ["Psychic"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtyperock: {
		species: "X-Type-Rock",
		baseSpecies: "X-Type",
		forme: "Rock",
		formeLetter: "R",
		types: ["Rock"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypesteel: {
		species: "X-Type-Steel",
		baseSpecies: "X-Type",
		forme: "Steel",
		formeLetter: "S",
		types: ["Steel"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypewater: {
		species: "X-Type-Water",
		baseSpecies: "X-Type",
		forme: "Water",
		formeLetter: "W",
		types: ["Water"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	xtypelight: {
		species: "X-Type-",
		baseSpecies: "X-Type",
		forme: "Light",
		formeLetter: "L",
		types: ["Light"],
		gender: "N",
		baseStats: {hp: 115, atk: 115, def: 115, spa: 115, spd: 115, spe: 115},
		abilities: {0: "Type Shift"},
		heightm: 1.50,
		weightkg: 6.0,
		color: "Gray",
		eggGroups: ["Undiscovered"],
	},
	//Moddify Existing Pokémon
	mew: {
		inherit: true,
		otherFormes: ["mewmega"],
	},
	//New Forms of Existing Pokémon
	mewmega: {
		species: "Mew-Mega",
		baseSpecies: "Mew",
		forme: "Mega",
		formeLetter: "M",
		types: ["Psychic", "Fairy"],
		gender: "N",
		baseStats: {hp: 120, atk: 190, def: 130, spa: 190, spd: 130, spe: 170},
		abilities: {0: "Regenerator"},
		heightm: 0.4,
		weightkg: 4,
		color: "Pink",
		eggGroups: ["Undiscovered"],
	},
};

exports.BattlePokedex = BattlePokedex;