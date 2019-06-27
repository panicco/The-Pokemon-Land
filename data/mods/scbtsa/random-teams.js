'use strict';

const RandomTeams = require('../../random-teams');

class randomSCBTSATeams extends RandomTeams {
	randomSCBTSATeam() {
		let team = [];
		let sets = {
			/*
			// Example:
			'Username': {
				species: 'Species', ability: 'Ability', item: 'Item', gender: '',
				moves: ['Move Name', ['Move Name', 'Move Name']],
				signatureMove: 'Move Name',
				evs: {stat: number}, ivs: {stat: number}, nature: 'Nature', level: 100, shiny: false,
			},
			// Species, ability, and item need to be captialized properly ex: Ludicolo, Swift Swim, Life Orb
			// Gender can be M, F, N, or left as an empty string
			// each slot in moves needs to be a string (the move name, captialized properly ex: Hydro Pump), or an array of strings (also move names)
			// signatureMove also needs to be capitalized properly ex: Scripting
			// You can skip Evs (defaults to 82 all) and/or Ivs (defaults to 31 all), or just skip part of the Evs (skipped evs are 0) and/or Ivs (skipped Ivs are 31)
			// You can also skip shiny, defaults to false. Level can be skipped (defaults to 100).
			// Nature needs to be a valid nature with the first letter capitalized ex: Modest
			*/
			// Please keep sets organized alphabetically based on staff member name!
			'Amida': {
				species: 'Latias', ability: 'Psychic Surge', item: 'Latiasite', gender: 'F',
				moves: [['Nasty Plot', 'Quiver Dance'], 'Mist Ball', ['Swagger', 'Flatter']],
				signatureMove: 'Wonder Gift',
				evs: {spa: 252, spe: 4, spd: 252}, nature: 'Calm',
			},
			'Haze': {
				species: 'Flareon', ability: 'Water Absorb', item: 'Life Orb', gender: 'M',
				moves: ['Thousand Arrows', 'Iron Tail', ['Waterfall', 'Volt Tackle', 'Flare Blitz', 'Zen Headbutt', 'Foul Play', 'Ice Hammer', 'Wood Hammer', 'Play Rough']],
				signatureMove: 'Power Bomb',
				evs: {spe: 252, hp: 4, atk: 252}, nature: 'Adamant',
			},
			'Aqua': {
				species: 'Mew', ability: 'Primordial Sea', item: 'Leftovers', gender: 'M',
				moves: [['Origin Pulse', 'Psystrike', 'Freeze Dry', 'Ice Beam'], 'Recover', 'Calm Mind'],
				signatureMove: 'Aqua Sphere',
				evs: {hp: 252, def: 4, spd: 252}, nature: 'Calm', shiny: true,
			},
			'Dynamo': {
				species: 'Shinx', ability: 'Levitate', item: 'Quick Claw', gender: 'M',
				moves: [['Ice Fang', 'Fire Fang'], 'Thunder Fang', 'Psychic Fangs'],
				signatureMove: 'Iron Fangs',
				evs: {spe: 252, spa: 4, atk: 252}, nature: 'Calm', shiny: true,
			},
			'Mizzy': {
				species: 'Wigglytuff', ability: 'Neuroforce', item: 'Expert Belt', gender: 'F',
				moves: ['Dazzling Gleam', ['Ice Beam', 'Thunderbolt', 'Flamethrower'], 'Calm Mind'],
				signatureMove: 'Prism Rocket',
				evs: {hp: 252, spd: 4, spa: 252}, nature: 'Rash',
			},
           'Sedna': {
				species: 'Marill', ability: 'Air Lock', item: 'Terrain Extender', gender: 'F',
				moves: [['Play Rough', 'Dazzling Gleam'], 'Dragon Pulse', ['Aqua Tail', 'Surf']],
				signatureMove: 'Sky Dance',
				evs: {spa: 252, spe: 4, atk: 252}, nature: 'Quiet',
			},
           'Zodiac': {
				species: 'Duosion', ability: 'Energy of Power', item: 'Eviolite ', gender: 'M',
				moves: ['Nasty Plot', ['Toxic', 'Thunder Wave'], 'Recover'],
				signatureMove: 'Psy Burst',
				evs: {hp: 252, spd: 4, spa: 252}, nature: 'Modest',
			},
           'Vixie': {
				species: 'Comfey', ability: 'Vitality', item: 'Misty Seed ', gender: 'F',
				moves: ['Aqua Ring', ['Fleur Cannon', 'Light of Ruin'], 'Baton Pass'],
				signatureMove: 'Flower Dance',
				evs: {spd: 252, spa: 4, spe: 252}, nature: 'Calm',
			},
         'Bulk-Up Man': {
				species: 'Rhydon', ability: 'Earth Force', item: 'Snowball', gender: 'M',
				moves: ['Stone Edge', 'Bulk-Up', ['Fire Punch', 'Ice Punch', 'Thunder Punch']],
				signatureMove: 'Gaia Gaizer',
				evs: {atk: 252, spd: 4, def: 252}, nature: 'Brave',
			},
         'Naru': {
				species: 'Espeon', ability: 'Aroma Veil', item: 'Lum Berry', gender: 'M',
				moves: ['Psychic', 'Celebrate', 'Dazzling Gleam'],
				signatureMove: 'Surprise, Pal!',
				evs: {hp: 252, spa: 4, spe: 252}, nature: 'Calm',
			},
         'Arthur': {
				species: 'Latios', ability: 'Psychic Surge', item: 'Latiosite', gender: 'M',
				moves: ['Splash'],
				signatureMove: 'Wonder Shift',
				evs: {spa: 252, spe: 4, spd: 252}, nature: 'Modest',
			},
         'Tara': {
				species: 'Magearna', ability: 'Contrary', item: 'Sitrus Berry', gender: 'F',
				moves: ['Fleur Cannon', 'V-create', 'Stored Power'],
				signatureMove: 'Light Rain',
				evs: {spa: 252, hp: 4, spd: 252}, nature: 'Quiet',
			},
		'Zanna': {
				species: 'Shuppet', ability: 'Sight Seer', item: 'Spooky Plate', gender: 'F',
				moves: ['Shadow Sneak', 'Dragon Dance', 'Anchor Shot'],
				signatureMove: 'Normalizer',
				evs: {atk: 252, hp: 4, spe: 252}, nature: 'Naughty'
			},
		'Gyro': {
				species: 'Sandslash', ability: 'Fur Coat', item: 'Defense Claw', gender: 'M',
				moves: ['Power Whip', 'Flare Blitz', 'Waterfall'],
				signatureMove: 'Terra Smash',
				evs: {atk: 252, hp: 4, def: 252}, nature: 'Lax'
			},
		'Flippit': {
				species: 'Inkay', ability: 'Contrary', item: 'Leftovers', gender: 'M',
				moves: [['Close Combat', 'V-create'], 'Recover', 'Octazooka'],
				signatureMove: 'Expedia',
				evs: {spd: 252, hp: 4, def: 252}, nature: 'Calm'
			},
		'Jill': {
				species: 'Stunky', ability: 'Levitate', item: 'Air Balloon', gender: 'F',
				moves: [['Ice Beam', 'Water Pulse'], 'Gastro Acid', 'Flamethrower'],
				signatureMove: 'Toilet Humor',
				evs: {spe: 252, atk: 4, spa: 252}, nature: 'Naive'
			},
		'Shinni': {
				species: 'Togetic', ability: 'On-Power', item: 'Sitris Berry', gender: 'M',
				moves: ['Earth Power', ['Ice Beam', 'Thunderbolt'], ['Dazzling Gleam', 'Moonblast']],
				signatureMove: 'Vroom!',
				evs: {spd: 252, spa: 4, spe: 252}, nature: 'Calm'
			},
		'Alphus': {
				species: 'Dialga', ability: 'Magic Bounce', item: 'Adamant Orb', gender: 'M',
				moves: ['Tail Glow', 'Doom Desire', ['King\'s Shield', 'Spiky Shield']],
				signatureMove: 'Cosmic Force Storm',
				evs: {spa: 252, def: 4, hp: 252}, nature: 'Quiet'
			},
		};
		let pool = Object.keys(sets);
		/** @type {{[type: string]: number}} */
		let typePool = {};
		while (pool.length && team.length < 6) {
			let name = this.sampleNoReplace(pool);
			let scbSet = sets[name];
			// Enforce typing limits
			let types = this.getTemplate(scbSet.species).types;
			if (name === 'Abby') types = ["Dragon", "Fairy", "Water"];
			if (name === 'Anabelle') types = ["Water", "Fairy", "Psychic"];
			if (name === 'Crystal') types = ["Water", "Ice"];
			if (name === 'Mizzy') types = ["Fairy", "Psychic"];
			if (name === 'Aqua') types = ["Water"];
			if (name === 'Waylon') types = ["Steel", "Flying", "Dragon"];
			if (name === 'Zig') types = ["Normal", "Electric"];
			let rejected = false;
			for (let type of types) {
				if (typePool[type] === undefined) typePool[type] = 0;
				if (typePool[type] >= 2) {
					// Reject
					rejected = true;
					break;
				}
			}
			if (rejected) continue;
			// Update type counts
			for (let type of types) {
				typePool[type]++;
			}
			/** @type {PokemonSet} */
			let set = {
				name: name,
				species: scbSet.species,
				item: Array.isArray(scbSet.item) ? this.sampleNoReplace(scbSet.item) : scbSet.item,
				ability: Array.isArray(scbSet.ability) ? this.sampleNoReplace(scbSet.ability) : scbSet.ability,
				moves: [],
				nature: Array.isArray(scbSet.nature) ? this.sampleNoReplace(scbSet.nature) : scbSet.nature,
				gender: scbSet.gender,
				evs: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
				ivs: {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31},
				level: scbSet.level || 100,
				shiny: scbSet.shiny,
			};
			if (scbSet.ivs) {
				for (let iv in scbSet.ivs) {
					// IVs from the set override the default of 31, assume the hardcoded IVs are legal
					// @ts-ignore StatsTable has no index signature
					set.ivs[iv] = scbSet.ivs[iv];
				}
			}
			if (scbSet.evs) {
				for (let ev in scbSet.evs) {
					// EVs from the set override the default of 0, assume the hardcoded EVs are legal
					// @ts-ignore StatsTable has no index signature
					set.evs[ev] = scbSet.evs[ev];
				}
			} else {
				set.evs = {hp: 84, atk: 84, def: 84, spa: 84, spd: 84, spe: 84};
			}
			while (set.moves.length < 3 && scbSet.moves.length > 0) {
				let move = this.sampleNoReplace(scbSet.moves);
				if (Array.isArray(move)) move = this.sampleNoReplace(move);
				set.moves.push(move);
			}
			set.moves.push(scbSet.signatureMove);
			if (name === 'Maxim' && set.item === 'Choice Scarf') set.moves[3] = 'Meteor Mass';
			team.push(set);
		}
		return team;
	}
}

module.exports = randomSCBTSATeams;
