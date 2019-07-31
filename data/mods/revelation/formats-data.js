'use strict';

/**@type {{[k: string]: ModdedTemplateFormatsData}} */
let BattleFormatsData = {
	xtype: {
		eventPokemon: [
			{"generation": 7, "level": 40, "moves": ["irondefense", "signalbeam", "varishot", "extremespeed"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		isNonstandard: false,
		tier: "OU",
		doublesTier: "DOU",
	},
	xtypebug: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypedark: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypedragon: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypeelectric: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypefairy: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypefighting: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypefire: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypeflying: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypeghost: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypegrass: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypeground: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypeice: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypepoison: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypepsychic: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtyperock: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypesteel: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypewater: {
		eventOnly: true,
		isNonstandard: false,
	},
	xtypelight: {
		eventOnly: true,
		isNonstandard: false,
	},
	//New Forms of Existing Pokémon
	mewmega: {
		requiredMove: "Psy Rush",
		tier: "OU",
		doublesTier: "DOU",
	},
	//Modded Pokémon From Let's Go!
	pikachustarter: {
		inherit: true,
		randomBattleMoves: ["zippyzap", "splishysplash", "thunderbolt", "calmmind", "substitute"],
		isNonstandard: false,
		tier: "OU",
		doublesTier: "DOU",
	},
	eeveestarter: {
		inherit: true,
		randomBattleMoves: ["sparklyswirl", "sizzlyslide", "sappyseed", "protect", "buzzybuzz", "bouncybubble"],
		isNonstandard: false,
		tier: "OU",
		doublesTier: "DOU",
	},
	meltan: {
		inherit: true,
		randomBattleMoves: ["flashcannon", "thunderbolt", "toxic", "protect"],
		isNonstandard: false,
		tier: "UU",
		doublesTier: "DOU",
	},
	melmetal: {
		inherit: true,
		randomBattleMoves: ["doubleironbash", "earthquake", "rockslide", "icepunch", "thunderwave"],
		isNonstandard: false,
		tier: "OU",
		doublesTier: "DOU",
	},	
};

exports.BattleFormatsData = BattleFormatsData;
