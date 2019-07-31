'use strict';

// Used for one of the special moves
const RandomPKLandTeams = require('./random-teams');
const Pokemon = require('../../../sim/pokemon');

/** @type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
// Static
	pikapower: {
		accuracy: 85,
		basePower: 90,
		category: "Special",
		desc: " Raises the user's Speed by 1 stage if this move knocks out the target.",
		shortDesc: "Raises user's Speed by 1 if this KOes the target.",
		id: "pikapower",
		name: "Pika Power!",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Charge', target);
			this.add('-anim', source, 'Electrify', target);
			this.add('-anim', source, 'Thunder', target);
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.boost({spe: 1}, pokemon, pokemon, move);
		},
		secondary: null,
		target: "normal",
		type: "Electric",
	},
// Erika
	evoimpact: {
		accuracy: true,
		category: "Status",
		desc: "The user transforms into a different Pokemon, and it uses a move dependent on the Pokemon: Vaporeon (Water Pulse), Jolteon (Thunderbolt), Flareon (Flamethrower), Espeon (Psychic), Umbreon (Dark Pulse), Leafeon (Leaf Storm), Glaceon (Ice Beam), and Sylveon (Moonblast). Reverts to an Eevee at the end of the turn.",
		shortDesc: " For turn: transforms, uses linked move.",
		id: "evoimpact",
		name: "Evo-Impact",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onHit: function (target, source, move) {
			let baseForme = source.template.id;
			/** @type {{[forme: string]: string}} */
			let formes = {
				vaporeon: 'Water Pulse',
				jolteon: 'Thunderbolt',
				flareon: 'Flamethrower',
				espeon: 'Psychic',
				umbreon: 'Dark Pulse',
				leafeon: 'Leaf Storm',
				glaceon: 'Ice Beam',
				sylveon: 'Moonblast',
			};
			let forme = Object.keys(formes)[this.random(8)];
			source.formeChange(forme, this.getAbility('quickstart'), true);
			this.useMove(formes[forme], source, target);
			source.formeChange(baseForme, this.getAbility('quickstart'), true);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
// Aqua
	aquasphere: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 50% chance to lower the target's Special Attack by 2 stages.",
		shortDesc: "50% chance to lower the target's Sp. Atk by 2.",
		id: "aquasphere",
		name: "Aqua Sphere",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Surf', source);
			this.add('-anim', source, 'Liquidation', source);
			this.add('-anim', source, 'Aura Sphere', target);
		},
		secondary: {
			chance: 50,
			boosts: {
				spa: -2,
			},
		},
		target: "normal",
		type: "Water",
	},
// Mizzy
	prismrocket: {
		accuracy: 95,
		basePower: 85,
		category: "Physical",
		desc: "This move is a special attack if the user's Special Attack stat is greater than its Attack stat; otherwise, it is a physical attack. 50% chance to lower the target's Speed. This move is super-effective against any type. This move and its effects ignore the Abilities of other Pokemon.",
		shortDesc: "Spcl. if Sp.Atk > Atk. Always supereffective. Lwrs Spe.",
		id: "prismrocket",
		name: "Prism Rocket",
		isNonstandard: true,
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		ignoreImmunity: true,
		onModifyMove: function (move, pokemon, target) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Comet Punch', target);
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		secondary: {
			chance: 50,
			boosts: {
				spe: -1,
			},
		},
		ignoreAbility: true,
		target: "normal",
		type: "Psychic",
	},
// Zena
	titanforce: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "Fails unless the user is a Ground type. If this move is successful, the user's Ground type becomes typeless as long as it remains active. Has a 100% chance to lower the target's Attack by 2 stages.",
		shortDesc: "User's Ground type becomes typeless; Lowers Attack.",
		id: "titanforce",
		name: "Titan Force",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (pokemon.hasType('Ground')) return;
			this.add('-fail', pokemon, 'move: Titan Force');
			this.attrLastMove('[still]');
			return null;
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Earthquake', target);
			this.add('-anim', source, 'Stomping Tantrum', target);
		},
		self: {
			onHit: function (pokemon) {
				pokemon.setType(pokemon.getTypes(true).map(type => type === "Ground" ? "???" : type));
				this.add('-start', pokemon, 'typechange', pokemon.types.join('/'), '[from] move: Titan Force');
				this.add('-message', `${pokemon.name} Earth'd itself out!`);
			},
		},
		secondary: {
			chance: 100,
			boosts: {
				atk: -2,
			},
		},
		target: "normal",
		type: "Ground",
	},
// Kyle
	desertdrain: {
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		id: "desertdrain",
		name: "Desert Drain",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, heal: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Leech Life", target);
		},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Ground",
	},
// Serene Star
	snowdance: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 50% chance to raise the user's Attack by 1 stage.",
		shortDesc: "50% chance to raise the user's Attack by 1.",
		id: "snowdance",
		isNonstandard: true,
		name: "Snow Dance",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Teeter Dance", source);
			this.add('-anim', source, "Mist", source);
			this.add('-anim', source, "Powder Snow", source);
			this.add('-anim', source, "Slam", target);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					atk: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
	},
// Goby	
	electroflash: {
		accuracy: 90,
		basePower: 75,
		category: "Special",
		desc: "Has a 100% chance to raise the user's Special Attack by 1 stage.",
		shortDesc: "100% chance to raise the user's Special Attack by 1.",
		id: "electroflash",
		isNonstandard: true,
		name: "Electro Flash",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Electrify", source);
			this.add('-anim', source, "Flash", target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "Electric",
	},
// The Hound
	darkflare: {
		accuracy: 85,
		basePower: 130,
		category: "Special",
		desc: "Summons Sunny Day after doing damage and combines Fire in its type effectiveness against the target.",
		shortDesc: "Summons Sunny Day. Combines Fire in its type effectiveness. Thaws user.",
		id: "darkflare",
		isNonstandard: true,
		name: "Dark Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dark Pulse", source);
			this.add('-anim', source, "Overheat", target);
		},
		onAfterMoveSecondarySelf: function () {
			this.setWeather('sunnyday');
		},
		onEffectiveness: function (typeMod, type, move) {
			return typeMod + this.getEffectiveness('Fire', type);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Felix	
	themagicbagoftricks: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to become confused and raises the user's Attack, Defense, Special Attack, Special Defense, Speed, Accuracy, and Evasion by 2 stages.",
		shortDesc: "Confuses adjacent Pokemon. Raises user's stats by 2.",
		id: "themagicbagoftricks",
		name: "The Magic Bag of Tricks",
		isNonstandard: true,
		pp: 1,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Celebrate', source);
			this.add('-anim', source, 'Present', target);
			this.add('-anim', source, 'Teeter Dance', target);
		},
		onHit: function () {
			let messages = ["On with the show!",
				"YOU MESSED THEM ALL UP WITH CATS, POPEYES, DOUG, ANGELICA, AND LITTLE KIDDIE SHOWS!",
				"Your TROLLFACE!!!!",
				"Hello, immortal pineapple-and-banana-pepper-pizza!",
				"Holy spinach teeth?",
				"I’ve had all sorts of succotash",
				"Clone your fork",
				"Holy cheese and crackers!",
				"This is bananas: P-Q-L-E-F-E-T!",
				"This garbage attracts flies and huge roaches like crazy",
				"That's Nick's garbage!",
				"I WON'T OBEY A BUNCH OF CORN AND BEANS!",
				"Don't eat pigs, don't eat BATS, Don't eat beetles, flies or gnats.",
				"No Boogers In My Burgers!.",
				"Listen the moles, freckles, and warts thing is getting old...",
				"You can draw all the bubblegum and chocolate Pop Rocks you want.",
				"paper in your ear?",
				"*Creates blue zits, blackheads and abscesses*",
				"*poofs Pac-Man away*",
				"STOP SENDING YOUR WHITE KNIGHTS AFTER AKIRA!",
				"OH WOW A TWITTER THAT'S ALIVE!",
				"MEGA ROBOTS MOD!",
				"ALL OVER MY NEW SWEATER!",
				"*they get on my face* AHHH!",
				"EWWW!!! BOOGERS!!!",
				"I DON'T LIKE THE VOMIT THING, YOU DO!!!",
				"WHAT IS SO GREAT ABOUT WALMART ANYWAY!?",
				"I WOULDN'T EAT FACE MOLES!",
				"WHAT ARE SPINACH TEETH!?",
				"I HATE SUCCOTASH AND SPINACH! HERE!",
				"SUCCOTASH DOESN'T SCARE ME!",
				"Crackers don't scare me.",
				"I hate hamburgers.",
				"Wowsers indeed",
				"THERE'S A MACARONI ON MY HEAD!",
				"AAAAAAH! THEY'RE REAL!!!!",
				"LAND WITHOUT BRAINS IS MORE LIKE IT!!",
				"There's a car! There's a car! There's a car! There's a car!",
				"Bon appétit!",
				"AAAAAAAHHHH! FIRE!",
				"GOTTA SWEEP SWEEP SWEEP!",
				"TURN THE RECORD OVER!",
				"PASTAAAAAA!!!",
				"Donuts, Donuts, Donuts, Donuts!!",
				"AAEEOOO! KILLER TOFU!",
				"Garbage Attack!",
				"Holy cheesewhiskers!!",
				"Um, do you still like making dinosaurs out of cheese wax?",
				"People still say beeswax? How old are you again, five?",
				"Oh won't you have some waffles of mine!",
				"AHOY! SPINACH!",
				"Don't go I WILL KNOCK YOUR TEETH OUT!!!!",
				"Forks?! Come on! *Crowd is booing*",
				"Hide your bananas.",
				"OOH WAH AH AH AH!",
				"Stupid Storks and Sausages!",
				"Popcorn Shrimp?",
				"Bran Flakes?",
				"HOLY BANANAS!!!",
				"THATS ALL FOLKS!"][this.random(60)];

			this.add(`raw|<center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/975px-Felix_the_cat.svg.png" height="210" width="200"><br><h1>"${messages}"</h1>`);
		},
		volatileStatus: 'confusion',
		self: {
			boosts: {
			atk: 2,
			def: 2,
			spa: 2,
			spd: 2,
			spe: 2,
			evasion: 2,
			accuracy: 2,
			},
		},
		secondary: null,
		isZ: "felixiumz",
		target: "allAdjacent",
		type: "Normal",
	},
// Chuck
	frenzydance: {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 30% chance to lower the target's Defense by 2 stages.",
		shortDesc: "30% chance to lower the target's Defense by 2.",
		id: "frenzydance",
		isNonstandard: true,
		name: "Frenzy Dance",
		pp: 20,
		priority: 2,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, "Night Slash", target);
		},
		onHit: function (target, source) {
			if (source.name === 'Chuck') {
			    this.add(`raw|<b>Chuck:</b> Bamm-Bamm-Bamm\!`);
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				def: -2,
			},
		},
		target: "normal",
		type: "Dark",
	},
// Abby	
	mermaidwhirl: {
		accuracy: 90,
		basePower: 80,
		category: "Special",
		desc: "Summons Rain Dance after doing damage. If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
		shortDesc: "Forces the target to switch to a random ally. Summons Rain Dance.",
		id: "mermaidwhirl",
		isNonstandard: true,
		name: "Mermaid Whirl",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		forceSwitch: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Surf", source);
			this.add('-anim', source, "Whirlwind", target);
		},
		onAfterMoveSecondarySelf: function () {
			this.setWeather('raindance');
		},
		secondary: null,
		target: "normal",
		type: "Water",
	},
 // Nappa
	herossword: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Ignores the target's stat stage changes, including evasiveness. This move's type effectiveness against Ghost is changed to be super effective no matter what this move's type is.",
		shortDesc: "Super effective on Ghost. Ignores stat stage changes.",
		id: "herossword",
		name: "Hero's Sword",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		ignoreEvasion: true,
		ignoreDefensive: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Secret Sword`", target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Ghost') return 1;
		},
		ignoreImmunity: {'Fighting': true},
		secondary: null,
		target: "normal",
		type: "Fighting",
	},
// Gidget
	gidgetblast: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move's type changes to match the user's primary type. Has a 30% chance to lower the target's Special Defense by 1 stage.",
		shortDesc: "Shares user's type. 30% chance to lower the target's Sp. Def by 1.",
		id: "gidgetblast",
		isNonstandard: true,
		name: "Gidget Blast",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Geomancy', source);
			switch (move.type) {
			case 'Fire':
				this.add('-anim', source, 'Fire Blast', target);
				break;
			case 'Water':
				this.add('-anim', source, 'Hydro Pump', target);
				break;
			case 'Grass':
				this.add('-anim', source, 'Leaf Storm', target);
				break;
			}
		},
		secondary: {
			chance: 30,
			boosts: {
				spd: -1,
			},
		},
		target: "normal",
		type: "Normal",
	},
// Sedna
	skydance: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the user's Attack, Special Attack, and Speed by 1 stage.",
		shortDesc: "Raises the user's Attack, Special Attack, and Speed by 1.",
		id: "skydance",
		name: "Sky Dance",
		isNonstandard: true,
		pp: 25,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Wing Attack`", source);
		},
		boosts: {
			atk: 1,
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Flying",
	},
// Skyla
	lugiassong: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers the user's Speed by 1 stage. Raises the user's Defense and Special Defense by 2 stages.",
		shortDesc: "Lowers Spe by 1; raises SpD, Def by 2.",
		id: "lugiassong",
		isViable: true,
		name: "Lugia's Song",
		pp: 40,
		priority: 0,
		flags: {snatch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Sing`", source);
			if (source.name === 'Skyla') {
			this.add(`raw|<b>Skyla:</b> 🎵You always love me more, miles away`);
			this.add(`raw|<b>Skyla:</b> I hear it in your voice, we're miles away`);
			this.add(`raw|<b>Skyla:</b> You're not afraid to tell me, miles away`);
			this.add(`raw|<b>Skyla:</b> I guess we're at our best when we're miles away🎵`);
			}
		},
		boosts: {
			def: 2,
			spd: 2,
			spe: -1,
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// Kris Tami
	psychoflare: {
		accuracy: 100,
		basePower: 130,
		category: "Special",
		desc: "Has a 30% chance to summon Psychic Terrain.",
		shortDesc: "30% chance to summon Psychic Terrain.",
		id: "psychoflare",
		name: "Psycho Flare",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Psycho Boost", source);
		},
		secondary: {
			chance: 30,
			self: {
				onHit: function () {
					this.setTerrain('psychicterrain');
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	// Sekka
	typechange: {
		accuracy: true,
		category: "Status",
		desc: "If the user is a Silvally, its item becomes a random Memory to match a type that resists or is immune to the type of the last move used by the target and will change forme. The determined type of the move is used rather than the original type. Fails if the target has not made a move.",
		shortDesc: "Silvally: Randomly changes user/move type.",
		id: "typechange",
		isNonstandard: true,
		name: "Type Change",
		pp: 5,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Conversion", source);
		},
		onHit: function (target, source) {
			if (!target.lastMove) {
				return false;
			}
			let possibleTypes = [];
			let attackType = target.lastMove.type;
			for (let type in this.data.TypeChart) {
				if (source.hasType(type)) continue;
				let typeCheck = this.data.TypeChart[type].damageTaken[attackType];
				if (typeCheck === 2 || typeCheck === 3) {
					possibleTypes.push(type);
				}
			}
			if (!possibleTypes.length) {
				return false;
			}
			let randomType = this.sample(possibleTypes);
			source.setItem(randomType + 'Memory');
			this.add('-item', source, source.getItem(), '[from] move: Type Change');
			let template = this.getTemplate('Silvally-' + randomType);
			source.formeChange(template, this.getAbility('rkssystem'), true);
			this.add('-start', source, 'typechange', randomType);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
	// Leonas
	turnover: {
		accuracy: 100,
		basePower: 20,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower + 20 * pokemon.positiveBoosts();
		},
		category: "Special",
		desc: "Power is equal to 20+(X*20), where X is the user's total stat stage changes that are greater than 0.",
		shortDesc: "+20 power for stat boosts.",
		id: "turnover",
		name: "Turn Over",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Submission", target);
			this.add('-anim', source, "Flash Cannon", target);
		},
      isNonstandard: true,
		secondary: null,
		target: "normal",
		type: "???",
	},
	// Anabelle
	fairypulse: {
		accuracy: 100,
		basePower: 85,
		category: "Special",
		desc: "Has a 40% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
		shortDesc: "40% chance to raise all stats by 1 (not acc/eva).",
		id: "fairypulse",
		name: "Fairy Pulse",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Aromatic Mist", source);
			this.add('-anim', source, "Hyper Voice", source);
		},
		secondary: {
			chance: 40,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spa: 1,
					spd: 1,
					spe: 1,
				},
			},
		},
		isNonstandard: true,
		target: "normal",
		type: "Fairy",
	},
	// Crystal
	crystalboom: {
		accuracy: 90,
		basePower: 110,
		category: "Special",
		desc: "Freezes the target and has a 50% chance to raise the user's Special Attack by 2 stages and Speed by 1 stage. If the target already has a status ailment, it is replaced with a freeze. Fails if the target is an Ice-type.",
		shortDesc: "50% chance to raise SpAtk by 2/Spe by 1.; replace status w/freeze",
		id: "crystalboom",
		name: "Crystal Boom",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (!pokemon.hasType('Ice') || target.hasType('Ice')) {
				this.add('-fail', pokemon, 'move: Crystal Boom');
				return null;
			}
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Mist", target);
			this.add('-anim', source, "Glaciate", target);
		},
		onHit: function (target, source) {
			target.setStatus('frz', source, null, true);
			// Cringy message
			if (this.random(5) === 1 || source.name === 'Crystal') this.add(`raw|<b>Crystal:</b> This is what you get! XD`);
		},
		secondary: {
			chance: 50,
			self: {
				boosts: {
					spa: 2,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Ice",
	},
		// Speedy
	chargespin: {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Nearly always goes first. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 30% chance to paralyze the foe.",
		shortDesc: "Strike first. Free from hazds./trap/seed. 30% chance to par foe.",
		id: "chargespin",
		name: "Charge Spin",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Rapid Spin", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Charge Spin', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Charge Spin', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
	},
	// Gold Ho-Oh
	goldenpassion: {
		accuracy: true,
		basePower: 170,
		category: "Physical",
		desc: "Fully restores the user's HP if this move knocks out the target. Causes the target to become a Fire type when hit. Fails if the target is an Arceus or a Silvally.",
		shortDesc: "Restore if it KOs foe; changes foe's type to Fire. Thaws user.",
		id: "goldenpassion",
		name: "Golden Passion",
		isNonstandard: true,
		pp: 1,
		priority: 0,
		flags: {defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Charge", source);
			this.add('-anim', source, "Eruption", source);
			this.add('-anim', source, "V-Create", target);
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (!target || target.fainted || target.hp <= 0) this.heal(pokemon.maxhp, pokemon, pokemon, move);
		},
		onHit: function (target) {
			if (!target.setType('Fire')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Fire');
		},
		isZ: "goldhoohniumz",
		secondary: null,
		target: "normal",
		type: "Fire",
	},
// AJ The Keldeo
	oblivionsword: {
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 30% chance to cause the target to flinch. If this move is successful and the user is a Keldeo, it changes to Resolute Forme if it is currently in Ordinary Forme, or changes to Ordinary Forme if it is currently in Resolute Forme. This forme change does not happen if the Keldeo has the Sheer Force Ability. The Resolute Forme reverts to Ordinary Forme when Keldeo is not active. Fighting-type attacks can hit if the target is a Ghost-type and the target loses its type-based immunity to Normal and Fighting.",
		shortDesc: "30% chance to flinch. Keldeo transforms. Hits Ghosts.",
		id: "oblivionsword",
		isNonstandard: true,
		name: "Oblivion Sword",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Judgment', source);
			this.add('-anim', source, 'Sacred Sword', target);
		},
		onEffectiveness: function (typeMod, type, move) {
			if (move.type !== 'Fighting') return;
			let target = this.activeTarget;
			if (!target) return; // avoid crashing when called from a chat plugin
			if (!target.runImmunity('Fighting')) {
				if (target.hasType('Ghost')) return 0;
			}
		},
		volatileStatus: 'foresight',
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Oblivion Sword');
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.hasType('Ghost') && ['Normal', 'Fighting'].includes(type)) return false;
			},
		},
		ignoreImmunity: true,
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		onHit: function (target, pokemon, move) {
			if (pokemon.baseTemplate.baseSpecies === 'Keldeo' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf: function (pokemon, target, move) {
			if (move.willChangeForme) {
				pokemon.formeChange(pokemon.template.speciesid === 'keldeoresolute' ? 'Keldeo' : 'Keldeo-Resolute', this.effect, false, '[msg]');
			}
		},
		target: "normal",
		type: "Fighting",
	},
// Shade Master
	blackwing: {
		accuracy: 80,
		basePower: 160,
		category: "Physical",
		desc: "Has a 100% chance to raise the user's Attack and Speed by 1 stage. If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage, and all the boosted stats (including Attack) reset to 0. Pokemon with the Magic Guard Ability are unaffected by crash damage, but still reset its own boosted stats.",
		shortDesc: "Raises Atk.-Spe./Hurts if misses/Clear boosts.",
		id: "blackwing",
		isNonstandard: true,
		name: "Black Wing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Dark Pulse', source);
			this.add('-anim', source, 'Steel Wing', target);
		},
		hasCustomRecoil: true,
		onMoveFail: function (target, source, move) {
			this.damage(source.maxhp / 2, source, source, 'crash');
			source.clearBoosts();
			this.add('-clearboost', source);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Dark",
	},
// Bulk-Up Man
	gaiagaizer: {
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "This move can hit airborne Pokemon, which includes Flying-type Pokemon, Pokemon with the Levitate Ability, Pokemon holding an Air Balloon, and Pokemon under the effect of Magnet Rise or Telekinesis. If the target is a Flying type and is not already grounded, this move deals neutral damage regardless of its other type(s). This move can hit a target using Bounce, Fly, or Sky Drop. If this move hits a target under the effect of Bounce, Fly, Magnet Rise, or Telekinesis, the effect ends. If the target is a Flying type that has not used Roost this turn or a Pokemon with the Levitate Ability, it loses its immunity to Ground-type attacks and the Arena Trap Ability as long as it remains active. During the effect, Magnet Rise fails for the target and Telekinesis fails against the target.",
		shortDesc: "Grounds adjacent foes. First hit neutral on Flying.",
		id: "gaiagaizer",
		isNonstandard: true,
		name: "Gaia Gaizer",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, nonsky: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Geomancy', source);
			this.add('-anim', source, 'Thousand Arrows', target);
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (move.type !== 'Ground') return;
			if (!target) return; // avoid crashing when called from a chat plugin
			// ignore effectiveness if the target is Flying type and immune to Ground
			if (!target.runImmunity('Ground')) {
				if (target.hasType('Flying')) return 0;
			}
		},
		volatileStatus: 'smackdown',
		ignoreImmunity: {'Ground': true},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Ground",
	},
// Gemini
	powerlauncher: {
		accuracy: 85,
		basePower: 120,
		category: "Special",
		desc: "Has a 50% chance to disable the target's last move unless it was is already disabled.",
		shortDesc: "50% chance to disable move.",
		id: "powerlauncher",
		isNonstandard: true,
		name: "Power Launcher",
		pp: 10,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Flash', source);
			this.add('-anim', source, 'Photon Geyser', target);
		},
		secondary: {
			chance: 50,
			volatileStatus: 'disable',
		},
		target: "normal",
		type: "Normal",
	},
// Max
		forcewin20: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Confuses the target and subjects it to the effects of Taunt, Torment, Heal Block, Embargo, and Encore. 10% chance to forcibly give the user's trainer the win. This move and its effects ignore the Abilities of other Pokemon. Fails if the target is Zatch, Millennium, or Omega Sheron.",
		shortDesc: "Dominates foe.",
		id: "forcewin20",
		name: "Forcewin 2.0",
		isNonstandard: true,
		pp: 5,
		priority: -2,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (target.name === 'Zatch' || target.name === 'Millennium' || target.name === 'Omega Sheron') {
				this.add('-fail', pokemon, 'move: Forcewin 2.0');
				if (source.name === 'Max') this.add(`raw|<b>Max:</b> That's Impossible!`);
				return null;
			}
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Entrainment", source);
			this.add('-anim', source, "Hyper Voice", source);
			this.add('-anim', source, "Lock On", target);
		},
		onHit: function (target, source) {
			target.addVolatile('taunt', source);
			target.addVolatile('embargo', source);
			target.addVolatile('torment', source);
			target.addVolatile('confusion', source);
			target.addVolatile('healblock', source);
			target.addVolatile('encore', source);
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> Yay Forcewin!`);
		},
		onTryHit: function (target, source, move) {
			if (target.name === 'Zatch' || target.name === 'Millennium' || target.name === 'Omega Sheron') {
				this.add('-fail', source, 'move: Forcewin 2.0');
				if (source.name === 'Max') this.add(`raw|<b>Max:</b> That's Impossible!`);
				return null;
			}
		},
		secondary: {
			chance: 10,
		    onHit: function (target, source) {
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> Finally...`);
			if (source.name === 'Max') this.add(`raw|<b>Max:</b> A pure win!`);
			this.win(source.side);
			}
		},
		ignoreAbility: true,
		target: "normal",
		type: "???",
	},
// Naru
	surprisepal: {
		accuracy: true,
		basePower: 0,
		category: "Special",
		desc: "Does not check accuracy. KOs the foes. The user faints afterwards. Fails if the target is Zatch, Millennium or Omega Sheron.",
		shortDesc: "KOs the foes. User faints.",
		id: "surprisepal",
		name: "Surprise, Pal!",
		isNonstandard: true,
		pp: 1,
		noPPBoosts: true,
		priority: 0,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function (target, pokemon) {
			this.attrLastMove('[still]');
			if (target.name === 'Zatch' || target.name === 'Millennium' || target.name === 'Omega Sheron') {
				this.add('-fail', pokemon, 'move: Suprise, Pal!');
				return null;
			}
		},
		onPrepareHit: function (target, source) {
			this.add('-activate', source, 'move: Celebrate');
			this.add('-anim', source, 'Light of Ruin', target);
			this.add('-anim', target, 'Explosion', target);
			this.add('-anim', source, 'Explosion', source);
		},
		onHit: function (target, source) {
			target.faint();
			source.faint();
		},
		secondary: null,
		target: "allAdjacent",
		type: "???",
	},
// Kasandra
	nightburst: {
		accuracy: true,
		basePower: 120,
		category: "Special",
		desc: "Raises the user's Attack, Special Attack, and Speed by 1 stage. Ignores the target's stat stage changes, including evasiveness. This move does not check accuracy.",
		shortDesc: "Raises the user's Attack, Special Attack, and Speed by 1 stage.",
		id: "nightburst",
		name: "Night Burst",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Night Daze', source);
		},
		self: {
			boosts: {
				atk: 1,
				spa: 1,
				spe: 1,
			},
		},
		secondary: null,
		ignoreEvasion: true,
		ignoreDefensive: true,
		target: "normal",
		type: "Dark",
	},
	// Kasandra
	miragevision: {
		accuracy: 100,
		category: "Special",
		basePower: 120,
		desc: "The user creates a substitute to take its place in battle. This substitute is a PK Land member. Upon the substitutes creation, this Pokemon's ability is suppressed until it switches out. These additions are removed when this substitute is no longer active. The substitute uses its species's base stats, types, ability, and weight but retains the user's max HP, stat stages, gender, level, status conditions, trapping, binding, and pseudo-statuses such as confusion. Its HP is 100% of the user's maximum HP. When this substitute falls to zero HP, it breaks, and the user reverts to the state in which it used this move. This substitute absorbs indirect damage and authentic moves but does not reset the counter of bad poison when broken and cannot be transfered through Baton Pass. Transforming into this substitute will not fail. If the user switches out while the substitute is up, the substitute will be removed and the user will revert to the state in which it used this move. The only PK Land member substitute that the user won't create is Gidget, Zatch, Millennium, and Omega Sheron",
		shortDesc: "Uses a Random Battle Pokemon as a Substitute.",
		id: "miragevision",
		name: "Mirage Vision",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Mean Look', source);
			this.add('-anim', source, 'Night Shade', source);
			this.add('-anim', source, "Transform", source);
		},
		onHit: function (target, source, move) {
			/** @type {{[forme: string]: string[]}} */
			let formes = {
				'Pikachu': ['Splishy Splash', 'Floaty Fall', 'Zippy Zap', 'Nasty Plot', 'Grass Knot', 'Night Burst'],
				'Eevee': ['Protect', 'Wish', 'Sizzly Slide', 'Bouncy Bubble', 'Buzzy Buzz', 'Glitzy Glow', 'Baddy Bad', 'Freezy Frost', 'Sappy Seed', 'Sparkly Swirl', 'Night Burst'],
				'Mew': ['Origin Pulse', 'Psystrike', 'Freeze Dry', 'Ice Beam', 'Recover', 'Calm Mind', 'Night Burst'],
				'Wigglytuff': ['Dazzling Gleam', 'Ice Beam', 'Thunderbolt', 'Flamethrower', 'Calm Mind', 'Night Burst'],
				'Zygarde': ['Thousand Arrows', 'Thousand Waves', 'Core Enforcer', 'Close Combat', 'Cosmic Power', 'Work Up', 'Noble Roar', 'Night Burst'],
				'Cacturne': ['Ingrain', 'Cross Chop', 'Recover', 'Seed Flare', 'Protect', 'Earthquake', 'Night Burst'],
				'Sandslash-Alola': ['Cross Chop', 'Zen Headbutt', 'Ice Punch', 'Blizzard', 'Icicle Crash', 'Liquidation', 'Night Burst'],
				'Dedenne': ['Dazzling Gleam', 'Calm Mind', 'Quiver Dance', 'Work Up', 'Power Trip', 'Stored Power', 'Night Burst'],
				'Houndoom': ['Night Daze', 'Dark Pulse', 'Overheat', 'Flamethrower', 'Blue Flare', 'Solar Beam', 'Night Burst'],
				'Meowth': ['Baton Pass', 'Play Rough', 'Zen Headbutt', 'Night Slash', 'Slash', 'Pay Day', 'Night Burst'],
				'Altaria': ['Hyper Voice', 'Dragon Pulse', 'Dragon Breath', 'Quiver Dance', 'Calm Mind', 'Night Burst'],
				'Gallade': ['Blaze Kick', 'Thunder Punch', 'Psycho Cut', 'Shift Gear', 'Night Burst'],
				'Marill': ['Play Rough', 'Dazzling Gleam', 'Dragon Pulse', 'Aqua Tail', 'Surf', 'Night Burst'],
				'Skuntank': ['Encore', 'Torment', 'Soak', 'Night Burst'],
				'Mimikyu': ['Swords Dance', 'Shadow Sneak', 'Mimic', 'Mirror Move', 'Me First', 'Copycat', 'Night Burst'],
				'Lugia': ['Aeroblast', 'Dazzling Gleam', 'Psychic', 'Water Pulse', 'Quiver Dance', 'Calm Mind', 'Night Burst'],
				'Mewtwo': ['Dark Pulse', 'Thunderbolt', 'Ice Beam', 'Flamethrower', 'Quiver Dance', 'Calm Mind', 'Night Burst'],
				'Silvally': ['Outrage', 'Play Rough', 'Extreme Speed', 'Ice Beam', 'Thunderbolt', 'Flamethrower', 'Multi-Attack', 'Night Burst'],
				'Serperior': ['V-Create', 'Draco Meteor', 'Leaf Storm', 'Overheat', 'Fleur Cannon', 'Psycho Boost', 'Close Combat', 'Superpower', 'Night Burst'],
				'Starmie': ['Psystrike', 'Psychic', 'Ice Beam', 'Surf', 'Dazzling Gleam', 'Water Pulse', 'Night Burst'],
				'Suicune': ['Water Pulse', 'Surf', 'Bouncy Bubble', 'Psychic', 'Dazzling Gleam', 'Freeze Dry', 'Night Burst'],
				'Jolteon': ['Extreme Speed', 'Quick Attack', 'Wild Charge', 'Aqua Tail', 'Close Combat', 'Endeavor', 'Night Burst'],
				'Ho-Oh': ['Sunny Day', 'Wish', 'Recover', 'Healing Wish', 'Wild Charge', 'Earthquake', 'Power Whip', 'Night Burst'],
				'Keldeo': ['Water Pulse', 'Ice Beam', 'Earth Power', 'Dark Pulse', 'Secret Sword', 'Sacred Sword', 'Night Burst'],
				'Rhydon': ['Stone Edge', 'Bulk-Up', 'Fire Punch', 'Ice Punch', 'Thunder Punch', 'Night Burst'],
				'Giratina': ['Shadow Force', 'Outrage', 'Water Pulse', 'Stone Edge', 'Recover', 'Night Burst'],
				'Porygon-Z': ['Cosmic Power', 'Flamethrower', 'Thunderbolt', 'Ice Beam', 'Recover', 'Night Burst'],
				'Umbreon': ['Coil', 'Quiver Dance', 'Power Trip', 'Night Burst'],
				'Espeon': ['Psychic', 'Celebrate', 'Dazzling Gleam', 'Night Burst'],
				'Mudkip': ['Quiver Dance', 'Rest', 'Sleep Talk', 'Night Burst'],
				'Flareon': ['Sunny Day', 'Solar Blade', 'Earthquake', 'Night Burst'],
				'Vaporeon': ['Rain Dance', 'Earth Power', 'Freeze Dry', 'Night Burst'],
				'Regigigas': ['Belly Drum', 'Iron Head', 'Stone Edge', 'Ice Punch', 'Dizzy Punch', 'Night Burst'],
				'Raichu-Alola': ['Thunderbolt', 'Water Pulse', 'Flamethrower', 'Ice Beam', 'Giga Drain', 'Dazzling Gleam', 'Earth Power', 'Air Slash', 'Tail Glow', 'Night Burst'],
				'Kangaskhan': ['Extreme Speed', 'Night Shade', 'Seismic Toss', 'Psywave', 'Nature\'s Madness', 'Night Burst'],
				'Victini': ['V-Create', 'Psychic', 'Psystrike', 'Psycho Boost', 'Bolt Strike', 'Glaciate', 'Blue Flare', 'Night Burst'],
				'Ninjask': ['Lunge', 'X-Scissor', 'Bug Buzz', 'Blue Flare', 'Bolt Strike', 'Steam Eruption', 'Glaciate', 'Foul Play', 'Play Rough', 'Iron Head', 'Photon Geyser', 'Aeroblast', 'Haze', 'Night Burst'],
				'Articuno': ['Ice Beam', 'Ice Hammer', 'Freeze Dry', 'Thousand Arrows', 'Water Spout', 'Night Burst'],
				'Type: Null': ['Extreme Speed', 'Crush Claw', 'Outrage', 'Psychic', 'Play Rough', 'Night Burst'],
				'Scizor': ['Foul Play', 'Anchor Shot', 'Fire Lash', 'Night Burst'],
				'Aegislash': ['Swords Dance', 'Recover', 'King\'s Shield', 'Night Burst'],
				'Sandslash': ['Leaf Blade', 'Sacred Fire', 'Thousand Arrows', 'Night Burst'],
				'Entei': ['Horn Leech', 'Thousand Arrows', 'Thousand Waves', 'Swords Dance', 'Dragon Dance', 'Knock Off', 'Fire Lash', 'Night Burst'],
				'Snorlax': ['Work Up', 'Stone Edge', 'Megahorn', 'Poison Jab', 'Psychic', 'Water Pulse', 'Flamethrower', 'Night Burst'],
				'Lumineon': ['Quiver Dance', 'Air Slash', 'Water Pulse', 'Night Burst'],
				'Skarmory': ['Trick', 'Roost', 'Recover', 'Dragon Dance', 'Steel Wing', 'King\'s Shield', 'Night Burst'],
				'Furret': ['Recover', 'Topsy-Turvy', 'Baton Pass', 'Night Burst'],
				'Zigzagoon': ['Extreme Speed', 'Anchor Shot', 'Slack Off', 'Night Burst'],
				'Butterfree': ['Baton Pass', 'Powder', 'Aqua Jet', 'Earth Power', 'Ancient Power', 'Ice Beam', 'Air Slash', 'Night Burst'],
				'Celebi': ['Seed Flare', 'Giga Drain', 'Petal Dance', 'Power Gem', 'Moongeist Beam', 'Moonblast', 'Night Burst'],
				'Heracross': ['Megahorn', 'Fell Stinger', 'Stone Edge', 'Meteor Mash', 'Sunsteel Strike', 'Night Burst'],
				'Gengar': ['Sludge Wave', 'Ice Beam', 'Focus Blast', 'Earth Power', 'Nasty Plot', 'Night Burst'],
			};
			let forme = Object.keys(formes)[this.random(52)];
			// Suppress Ability now to prevent starting new abilities when transforming
			source.addVolatile('gastroacid', source);
			// Tranform into it
			source.formeChange(forme);
			// Update movepool
			source.moveSlots = [];
			if (!formes[forme]) throw new Error(`Can't find moveset for Kasandra's forme: "${forme}".`); // should never happen
			for (const [i, moveid] of formes[forme].entries()) {
				let move = this.getMove(moveid);
				if (!move.id) continue;
				source.moveSlots.push({
					move: move.name,
					id: move.id,
					// @ts-ignore hacky change for Kasandra's set
					pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (source.ppPercentages ? source.ppPercentages[i] : 1)),
					maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					used: false,
					virtual: true,
				});
				source.moves.push(move.id);
			}
			// Update HP
			// @ts-ignore Hack for Kasandra's move
			source.visionHP = source.hp;
			source.heal(source.maxhp - source.hp, source, move);
			this.add('-heal', source, source.getHealth, '[silent]');
			this.add('message', `${source.name} pretended to be ${forme}\!`);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
	},
// Copy Cat
	clonecopy: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "The user performs a move from a dependent PK Land member. Some moves can't be copied, however. Brutal Swing is a default move.",
		shortDesc: "Uses a move depending on a Pokémon.",
		id: "clonecopy",
		name: "Clone Copy",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, move) {
			this.add('-anim', source, 'Geomancy', source);
		},
		onHit: function (target, source, move) {
			if (target.name === 'Static') {
			let move = this.getActiveMove('pikapower');
			this.useMove(move, source, target);
			} else if (target.name === 'Aqua') {
			let move = this.getActiveMove('aquasphere');
			this.useMove(move, source, target);
			} else if (target.name === 'Mizzy') {
			let move = this.getActiveMove('prismrocket');
			this.useMove(move, source, target);
			} else if (target.name === 'Kyle') {
			let move = this.getActiveMove('desertdrain');
			this.useMove(move, source, target);
			} else if (target.name === 'Serene Star') {
			let move = this.getActiveMove('snowdance');
			this.useMove(move, source, target);
			} else if (target.name === 'Goby') {
			let move = this.getActiveMove('electroflash');
			this.useMove(move, source, target);
			} else if (target.name === 'The Hound') {
			let move = this.getActiveMove('darkflare');
			this.useMove(move, source, target);
			} else if (target.name === 'Abby') {
			let move = this.getActiveMove('mermaidwhirl');
			this.useMove(move, source, target);
			} else if (target.name === 'Nappa') {
			let move = this.getActiveMove('herossword');
			this.useMove(move, source, target);
			} else if (target.name === 'Kris Tami') {
			let move = this.getActiveMove('psychoflare');
			this.useMove(move, source, target);
			} else if (target.name === 'Leonas') {
			let move = this.getActiveMove('turnover');
			this.useMove(move, source, target);
			} else if (target.name === 'Anabelle') {
			let move = this.getActiveMove('fairypulse');
			this.useMove(move, source, target);
			} else if (target.name === 'Speedy') {
			let move = this.getActiveMove('chargespin');
			this.useMove(move, source, target);
			} else if (target.name === 'AJ The Keldeo') {
			let move = this.getActiveMove('oblivionsword');
			this.useMove(move, source, target);
			} else if (target.name === 'Shade Master') {
			let move = this.getActiveMove('blackwing');
			this.useMove(move, source, target);
			} else if (target.name === 'Bulk-Up Man') {
			let move = this.getActiveMove('gaiagaizer');
			this.useMove(move, source, target);
			} else if (target.name === 'Gemini') {
			let move = this.getActiveMove('powerlauncher');
			this.useMove(move, source, target);
			} else if (target.name === 'Blue') {
			let move = this.getActiveMove('blueshower');
			this.useMove(move, source, target);
			} else if (target.name === 'Blaze') {
			let move = this.getActiveMove('atomicfire');
			this.useMove(move, source, target);
			} else if (target.name === 'River') {
			let move = this.getActiveMove('wavebomb');
			this.useMove(move, source, target);
			} else if (target.name === 'Forte') {
			let move = this.getActiveMove('fortecrush');
			this.useMove(move, source, target);
			} else if (target.name === 'Oblivia') {
			let move = this.getActiveMove('fun');
			this.useMove(move, source, target);
			} else if (target.name === 'Alphus') {
			let move = this.getActiveMove('miraclehold');
			this.useMove(move, source, target);
			} else if (target.name === 'Lyrica') {
			let move = this.getActiveMove('shiftattack');
			this.useMove(move, source, target);
			} else if (target.name === 'Slashdown') {
			let move = this.getActiveMove('powercontrol');
			this.useMove(move, source, target);
			} else if (target.name === 'Zicko') {
			let move = this.getActiveMove('ironsword');
			this.useMove(move, source, target);
			} else if (target.name === 'Gyl') {
			let move = this.getActiveMove('firerage');
			this.useMove(move, source, target);
			} else if (target.name === 'Adelaide') {
			let move = this.getActiveMove('frostwind');
			this.useMove(move, source, target);
			} else {
			let move = this.getActiveMove('brutalswing');
			this.useMove(move, source, target);
			}
		},
		secondary: null,
		target: "allAdjacent",
		type: "???",
	},
// Blue
  blueshower: {
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 50% chance to lower the target's Defense and Special Defense by 1 stage. This move's type effectiveness against Grass is changed to be super effective no matter what this move's type is.",
		shortDesc: "Chance to lower target's Def/SpDef by 1. Super effective on Grass.",
		id: "blueshower",
		isNonstandard: true,
		name: "Blue Shower",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Origin Pulse', source);
			this.add('-anim', source, 'Water Spout', target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Grass') return 1;
		},
		secondary: {
			chance: 50,
			boosts: {
				def: -1,
				spd: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	"atomicfire": {
		accuracy: 100,
		basePower: 85,
		category: "Physical",
		desc: "Has a 50% chance to burn the target. This move's type effectiveness against Rock is changed to be super effective no matter what this move's type is.",
		shortDesc: "50% burn. Super effective on Rock. Thaws user.",
		id: "atomicfire",
		name: "Atomic Fire",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Overheat', source);
			this.add('-anim', source, 'Flare Blitz', target);
		},
		onEffectiveness: function (typeMod, target, type) {
			if (type === 'Rock') return 1;
		},
		secondary: {
			chance: 50,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
	"wavebomb": {
		accuracy: 80,
		basePower: 85,
		category: "Special",
		desc: "Has a 70% chance to lower the target's speed by 2 stages and evasiveness by 1 stage.",
		shortDesc: "70% chc. to lower foe's Spe by 2 and Eva by 1.",
		id: "wavebomb",
		name: "Wave Bomb",
		pp: 5,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Water Pulse', source);
			this.add('-anim', source, 'Origin Pulse', source);
			this.add('-anim', source, 'Barrage', target);
		},
		secondary: {
			chance: 70,
			boosts: {
				spe: -2,
				evasion: -1,
			},
		},
		target: "normal",
		type: "Water",
	},
	fortecrush: {
		accuracy: 100,
		basePower: 150,
		basePowerCallback: function (pokemon, target, move) {
			if (!pokemon.item) {
				this.debug("Power and speed doubled for no item");
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Physical",
		shortDesc: "Power doubles if the user has no held item.",
		id: "fortecrush",
		isViable: true,
		name: "Forte Crush",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Explosion', source);
			this.add('-anim', source, 'Wring Out', target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Oblivia
	fun: {
		basePower: 100,
		accuracy: 100,
		category: "Special",
		desc: "Summons Gravity after doing damage and boosts the user's Speed by two stages.",
		shortDesc: "Sets Gravity after dmg; raises Spe. by 2.",
		id: "fun",
		name: "FUN!!!",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {mirror: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Moonlight', source);
			this.add('-anim', source, 'Gravity', source);
			this.add('-anim', source, 'Moonblast', target);
		},
		onAfterMoveSecondarySelf: function () {
			this.addPseudoWeather('gravity');
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 2,
				},
			},
		},
		target: "normal",
		type: "Psychic",
	},
	// Nyra
	rickrollpunch: {
		accuracy: 100,
		basePower: 30,
		category: "Physical",
		desc: "This move hits 5 times. After the first hit, the user's Attack or Speed are raised by 1. After the second hit, the user gains the either a Psychic or Fairy type. After the third hit, three layers of Spikes or a Stealth Rock is added to the opponent's side of the field. After the fourth hit, either Gravity or Mist is summoned. After the fifth hit, the target is either confused or paralyzed. This move can hit a Ghost-type target no matter what this move's type is.",
		shortDesc: "Hits 5 times with various effects on each hit.",
		id: "rickrollpunch",
		name: "Rickroll Punch",
		isNonstandard: true,
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Explosion", source);
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, 'Mega Punch', target);
		},
		multihit: 5,
		onAfterHit: function (target, source, move) {
			// @ts-ignore hack for Nyra's move
			if (!move.curHits) move.curHits = 1;
			let option = this.random(2);
			this.add('-anim', source, 'Mega Punch', target);
			// @ts-ignore hack for Nyra's move
			switch (move.curHits) {
			case 1:
				if (option) {
					this.boost({atk: 1}, source);
				} else {
					this.boost({spe: 1}, source);
				}
				break;
			case 2:
				if (option) {
					if (!source.setType('Psychic')) {
						this.add('-fail', source, 'move: Type Shift');
					} else {
						this.add('-start', source, 'typechange', 'Psychic');
					}
				} else {
					if (!source.setType('Fairy')) {
						this.add('-fail', source, 'move: Type Shift');
					} else {
						this.add('-start', source, 'typechange', 'Fairy');
					}
				}
				break;
			case 3:
				if (option) {
					target.side.addSideCondition('spikes');
					target.side.addSideCondition('spikes');
					target.side.addSideCondition('spikes');
				} else {
					target.side.addSideCondition('stealthrock');
				}
				break;
			case 4:
				if (option) {
					this.addPseudoWeather('gravity');
				} else {
					source.side.addSideCondition('mist');
				}
				break;
			case 5:
				if (option) {
					target.addVolatile('confusion');
				} else {
					target.trySetStatus('par', source);
				}
				break;
			}
			// @ts-ignore hack for Nyra's move
			move.curHits++;
		},
		onHit: function (target, source) {
			let messages = ["MUST WATCH: Live footage of a REAL Pokémon living in Harlan, KY.",
				"Click here to see the 10 amazing facts about Pokémon.",
				"Mr. Burns and Waylon Smithers has left out from final ten episodes <i>The Simpsons</i> TV show - here's what happened",
				"Cut Man from Mega Man announced as a DLC playable fighter in the <i>Super Smash Bros. Ultimate</i>.",
				"Must see - Rare mental disease that can potentiality kill you in minutes.",
				"Horrifying dead bird in the sewers - Must watch.",
				"This cat gained an ability to fly like a bird. Click here to watch it.",
				"An MP3 sound off effect of a guy recieving negatives comments about Chibiyima found in few copies of <i>Mario & Luigi: Bowser's Inside Story + Bowser Jr.'s Journey</i>.",
				"ParaParaRevolution90, SuperStar1990 and all the alt accounts finally banned on DeviantART - See the Kiwi Farms thread here.",
				"A perfect way to lose weight - by doing absolutely nothing."][this.random(10)];

			if (source.name === 'Nyra') this.add(`raw|<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0"><b>${messages}</b></a>`);
		},
		secondary: null,
		ignoreImmunity: {'Normal': true},
		target: "normal",
		type: "Normal",
	},
	// White
	naturalroom: {
		accuracy: true,
		category: "Status",
		desc: "For five turns, all the the moves deal neutral damage.",
		shortDesc: "Five turns: Moves deal neutral damage.",
		id: "naturalroom",
		name: "Natural Room",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "Moonlight", source);
			this.add('-anim', source, "Psychic Terrain", source);
		},
		pseudoWeather: 'naturalroom',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
			onStart: function (battle, source, effect) {
				this.add('-fieldstart', 'move: Natural Room');
				this.add('-message', `All the moves' effectivenesses assumed to their netrual state.`);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Natural Room');
				this.add('-message', `The Natural Room has lifted.`);
			},
		},
		secondary: null,
		target: "all",
		type: "Psychic",
	},
// Alphus
	miraclehold: {
		accuracy: 100,
		basePower: 170,
		category: "Special",
		desc: "Summons Negative Zone after doing damage. This move can hit a Dark-type target no matter what this move's type is.",
		shortDesc: "Summons Negative Zone; Hits Dark foes.",
		id: "miraclehold",
		name: "Miracle Hold",
		pp: 10,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Hyper Voice', source);
		},
		onAfterMoveSecondarySelf: function (source) {
			this.addPseudoWeather('negativezone', source);
		},
		ignoreImmunity: {'Psychic': true},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	negativezone: {
		accuracy: true,
		category: "Status",
		desc: "For five turns, all the move's effectiveness is inverted.",
		shortDesc: "5 turns: Effectivenesses inverted.",
		id: "negativezone",
		name: "Negative Zone",
		pp: 5,
		priority: 0,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Misty Terrain", source);
		},
		pseudoWeather: 'negativezone',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
		onEffectiveness: function (typeMod, target, source, type, move) {
			return -typeMod;
		},
			onStart: function (battle, source, effect) {
				this.add('-fieldstart', 'move: Negative Zone');
				this.add('-message', `All the moves' effectivenesses are inverted!`);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Negative Zone');
				this.add('-message', `The Negative Zone has lifted.`);
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Lyrica
	shiftattack: {
		accuracy: true,
		basePower: 160,
		category: "Physical",
		desc: "Does not check accuracy. When using a move, it replaces every non-fainted member of the user's team with a PK Land set that is randomly selected from all sets, except those with the move Shift Attack. Remaining HP and PP percentages, as well as status conditions, are transferred onto the replacement sets. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if the move misses, if there are no unfainted party members or if the user is not Lyrica. This move summons Switch Switch after doing damage. This move can hit a Dark-type target no matter what this move's type is.",
		shortDesc: "Replaces team with random sets; switches.",
		id: "shiftattack",
		name: "Shift Attack",
		isNonstandard: true,
		pp: 5,
		noPPBoosts: true,
		priority: 0,
		flags: {protect: 1, mirror: 1, authentic: 1, heal: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Rapid Spin', source);
			this.add('-anim', source, 'Dragon Dance', source);
			this.add('-anim', source, 'Meteor Mash', target);
		},
		onTryHit: function (target, source) {
			if (source.name !== 'Lyrica') {
				this.add('-fail', source);
				this.add('-hint', 'Only Lyrica can use Shift Attack.');
				return null;
			}
		},
		onHit: function (target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = source.side.pokemon;
			for (let pokemon of currentTeam) {
				carryOver.push({
					hp: pokemon.hp / pokemon.maxhp,
					status: pokemon.status,
					statusData: pokemon.statusData,
					pp: pokemon.moveSlots.slice().map(m => {
						return m.pp / m.maxpp;
					}),
				});
				// Handle pokemon with less than 4 moves
				while (carryOver[carryOver.length - 1].pp.length < 4) {
					carryOver[carryOver.length - 1].pp.push(100);
				}
			}
			// Generate a new team
			let generator = new RandomPKLandTeams(this.format, this.prng);
			let team = generator.generateTeam();
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === source.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				if (set.name === 'Lyrica') {
					// No way am I allowing 5 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				let pokemon = new Pokemon(set, source.side);
				this.effect = effect;

				pokemon.hp = Math.floor(pokemon.maxhp * oldSet.hp) || 1;
				pokemon.status = oldSet.status;
				if (oldSet.statusData) pokemon.statusData = oldSet.statusData;
				for (const [j, moveSlot] of pokemon.moveSlots.entries()) {
					moveSlot.pp = Math.floor(moveSlot.maxpp * oldSet.pp[j]);
				}
				pokemon.position = currentTeam[i].position;
				currentTeam[i] = pokemon;
			}
			this.add('message', `${source.name} shifted ${source.side.name}'s team away!`);
		},
		onAfterMoveSecondarySelf: function (source) {
			source.side.addSideCondition('shiftheal');
		},
		selfSwitch: true,
		ignoreImmunity: {'Psychic': true},
		secondary: null,
		target: "allAdjacent",
		type: "Psychic",
	},
	// Used for Lyrica's Shift Attack
	shiftheal: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The Pokemon brought out to replace it has its HP and PP fully restored along with having any major status condition cured. The new Pokemon is sent out at the end of the turn, and the healing happens before hazards take effect. Fails if the user is the last unfainted Pokemon in its party.",
		shortDesc: "Replacement is fully healed, with PP.",
		id: "shiftheal",
		isViable: true,
		name: "Shift Heal",
		pp: 10,
		priority: 0,
		flags: {snatch: 1, heal: 1},
		sideCondition: 'shiftheal',
		effect: {
			duration: 2,
			onStart: function (side, source) {
				this.debug('Shift Heal started on ' + side.name);
				this.effectData.positions = [];
				for (const i of side.active.keys()) {
					this.effectData.positions[i] = false;
				}
				this.effectData.positions[source.position] = true;
			},
			onRestart: function (side, source) {
				this.effectData.positions[source.position] = true;
			},
			onSwitchInPriority: 1,
			onSwitchIn: function (target) {
				const positions = /**@type {boolean[]} */ (this.effectData.positions);
				if (target.position !== this.effectData.sourcePosition) {
					return;
				}
				if (!target.fainted) {
					target.heal(target.maxhp);
					target.setStatus('');
					for (const moveSlot of target.moveSlots) {
						moveSlot.pp = moveSlot.maxpp;
					}
					this.add('-heal', target, target.getHealth, '[from] move: Shift Heal');
					positions[target.position] = false;
				}
				if (!positions.some(affected => affected === true)) {
					target.side.removeSideCondition('shiftheal');
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	// Used for Lyrica's ability
	auroraterrain: {
		accuracy: true,
		category: "Status",
		desc: "For 5 turns, the terrain becomes Aurora Terrain. During the effect, the power of Ice-type attacks is doubled and the power of Fire-type attacks is multiplied by 0.5, even if the user or the target is not grounded. Moves of any Pokemon have their secondary effect chance tripled while Aurora Terrain is active. Fails if the current terrain is Aurora Terrain.",
		shortDesc: "5 turns:Scndry.chnce.trpld.,+Ice/-Fire power even if float.",
		id: "auroraterrain",
		name: "Aurora Terrain",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'auroraterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
		onModifyMovePriority: -2,
		onModifyMove: function (move) {
			if (move.secondaries) {
				this.debug('tripling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 3;
				}
			}
		},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ice') {
					this.debug('aurora terrain boost');
					return this.chainModify(2);
				}
				if (move.type === 'Fire') {
					this.debug('aurora terrain weaken');
					return this.chainModify(0.2);
				}
			},
			onStart: function (battle, target, foe, side, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Aurora Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Aurora Terrain');
				}
			   target.clearBoosts();
			   this.add('-clearboost', target);
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Aurora Terrain');
			},
		},
		secondary: null,
		target: "self",
		type: "Ice",
	},
	// Blade
	multiattackburst: {
		accuracy: 100,
		basePower: 5,
		multihit: 18,
		category: "Special",
		desc: "Hits five times and ignores type immunities. This move deals type/categories damages such as dealing a special Electric-type damage, a physical Flying-type damage, and so on. Fails unless the user is Blade.",
		shortDesc: "Hits 18 times.",
		id: "multiattackburst",
		name: "Multi-Attack Burst",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, authentic: 1},
		ignoreImmunity: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onTryHit: function (target, pokemon) {
			if (pokemon.name !== 'Blade') {
				this.add('-fail', pokemon);
				this.add('-hint', 'Only Blade can use Multi-Attack Burst.');
				return null;
			}
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Judgment', source);
			this.add('-anim', source, 'Prismatic Laser', source);
                this.add('-anim', source, 'Hyper Beam', target);
		},
		onHit: function (target, source, move, type) {
			// @ts-ignore hack for Blade's move
			if (!move.curHits) move.curHits = 1;
			// @ts-ignore hack for Blade's move
			switch (move.curHits) {
			case 1:
			if (!source.setType('Water')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Water');
			}
                this.add('-anim', source, 'Water Gun', target);
				move.type = 'Water';
				move.category = 'Special';
				break;
			case 2:
			if (!source.setType('Fire')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fire');
			}
                this.add('-anim', source, 'Flamethrower', target);
				move.type = 'Fire';
				move.category = 'Special';
				break;
			case 3:
			if (!source.setType('Electric')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Electric');
			}
                this.add('-anim', source, 'Thunderbolt', target);
				move.type = 'Electric';
				move.category = 'Special';
				break;
			case 4:
			if (!source.setType('Grass')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Grass');
			}
                this.add('-anim', source, 'Razor Leaf', target);
				move.type = 'Grass';
				move.category = 'Special';
				break;
			case 5:
			if (!source.setType('Ice')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ice');
			}
                this.add('-anim', source, 'Ice Beam', target);
				move.type = 'Ice';
				move.category = 'Special';
				break;
			case 6:
			if (!source.setType('Psychic')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Psychic');
			}
                this.add('-anim', source, 'Psychic', target);
				move.type = 'Psychic';
				move.category = 'Special';
				break;
			case 7:
			if (!source.setType('Dark')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Dark');
			}
                this.add('-anim', source, 'Dark Pulse', target);
				move.type = 'Dark';
				move.category = 'Special';
				break;
			case 8:
			if (!source.setType('Dragon')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Dragon');
			}
                this.add('-anim', source, 'Dragon Breath', target);
				move.type = 'Dragon';
				move.category = 'Special';
				break;
			case 9:
			if (!source.setType('Fairy')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fairy');
			}
                this.add('-anim', source, 'Moonblast', target);
				move.type = 'Fairy';
				move.category = 'Special';
				break;
			case 10:
			if (!source.setType('Fighting')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Fighting');
			}
                this.add('-anim', source, 'Brick Break', target);
				move.type = 'Fighting';
				move.category = 'Physical';
				break;
			case 11:
			if (!source.setType('Flying')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Flying');
			}
                this.add('-anim', source, 'Wing Attack', target);
				move.type = 'Flying';
				move.category = 'Physical';
				break;
			case 12:
			if (!source.setType('Bug')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Bug');
			}
                this.add('-anim', source, 'Fell Stinger', target);
				move.type = 'Bug';
				move.category = 'Physical';
				break;
			case 13:
			if (!source.setType('Ground')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ground');
			}
                this.add('-anim', source, 'Earthquake', target);
				move.type = 'Ground';
				move.category = 'Physical';
				break;
			case 14:
			if (!source.setType('Rock')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Rock');
			}
                this.add('-anim', source, 'Stone Edge', target);
				move.type = 'Rock';
				move.category = 'Physical';
				break;
			case 15:
			if (!source.setType('Ghost')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Ghost');
			}
                this.add('-anim', source, 'Shadow Sneak', target);
				move.type = 'Ghost';
				move.category = 'Physical';
				break;
			case 16:
			if (!source.setType('Poison')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Poison');
			}
                this.add('-anim', source, 'Poison Jab', target);
				move.type = 'Poison';
				move.category = 'Physical';
				break;
			case 17:
			if (!source.setType('Steel')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Steel');
			}
                this.add('-anim', source, 'Iron Tail', target);
				move.type = 'Steel';
				move.category = 'Physical';
				break;
			case 18:
			if (!source.setType('Normal')) {
				this.add('-fail', source, 'move: Type Shift');
			} else {
				this.add('-start', source, 'typechange', 'Normal');
			}
                this.add('-anim', source, 'Multi-Attack', target);
				move.type = 'Normal';
				move.category = 'Physical';
				break;
			}
			// @ts-ignore hack for Blade's move
			move.curHits++;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Slashdown
	powercontrol: {
		accuracy: true,
		basePower: 130,
		category: "Physical",
		desc: "This move does not check accuracy. When it hits, the target's Ability is rendered ineffective as long as it remains active. If the target uses Baton Pass, the replacement will remain under this effect. If the target's Ability is Battle Bond, Comatose, Prism Power, Color Aura, Disguise, Multitype, Power Construct, RKS System, Schooling, Shields Down, or Stance Change, this effect does not happen, and receiving the effect through Baton Pass ends the effect immediately. Has a 50% chance to paralyze the target and %20 chance to make it inflicted with Lounge. This move can hit a Ground-type target no matter what this move's type is. The target with Lounge is unable to move for five turns.",
		shortDesc: "Nullifies abil. 100%:Para.,40%:Lounge.",
		id: "powercontrol",
		name: "Power Control",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
			if (target.name === 'Zatch' || target.name === 'Millennium' || target.name === 'Omega Sheron') {
				this.add('-fail', pokemon, 'move: Power Control');
				return null;
			}
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Plasma Fists", target);
		},
		onHit: function (target) {
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		onAfterSubDamage: function (damage, target) {
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'multitype', 'shockpuppet', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		secondaries: [
			{
			chance: 50,
			status: 'par',
			}, {
			chance: 20,
			volatileStatus: 'lounge', //Lounge's effect will go in statuses.js
			},
		],
		ignoreImmunity: {'Electric': true},
		target: "allAdjacent",
		type: "Electric",
	},	
	// Zicko
	ironsword: {
		accuracy: 100,
		basePower: 170,
		category: "Physical",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		id: "ironsword",
		name: "Iron Sword",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Iron Defense", source);
			this.add('-anim', source, "Secret Sword", target);
		},
		secondary: null,
		target: "normal",
		type: "Steel",
	},
	// Gyro
	escapethrust: {
		accuracy: 100,
		basePower: 110,
		category: "Physical",
		desc: "The user is replaced with another Pokemon in its party. The opponent is confused, weakened and trapped for 5 turns, and having its Accuracy and Evasion harshly lowered. This move fails unless the user already took damage this turn. After doing damage, the target's item is replaced with a Choice Scarf.",
		shortDesc: "User switches if hit; Confuses, weakened and traps; Acc. and Eva. lowered; Foe Item = Choice Spike.",
		id: "escapethrust",
		name: "Escape Thrust",
		isNonstandard: true,
		pp: 15,
		priority: -3,
		flags: {contact: 1, protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			if (source.volatiles['escapethrust'] && source.volatiles['escapethrust'].gotHit) {
				this.add('-anim', source, "Brutal Swing", source);
				this.add('-anim', source, "Mega Punch", target);
			}
		},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('escapethrust');
			this.add('-message', `${pokemon.name} is preparing to hit and run!`);
			this.attrLastMove('[still]');
			this.add('-anim', pokemon, "Detect", pokemon);
		},
		beforeMoveCallback: function (pokemon) {
			if (!pokemon.volatiles['escapethrust'] || !pokemon.volatiles['escapethrust'].gotHit) {
				this.add('-fail', pokemon, 'move: Escape Thrust');
				this.add('-hint', 'Escape Thrust only works when Gyro is hit in the same turn the move is used.');
				return true;
			}
		},
		onHit: function (target, source) {
			    target.addVolatile('confusion');
			    target.addVolatile('weaktrap'); //Weak Trap's effect will go in statuses.js
                this.boost({evasion: -2}, target);
                this.boost({accuracy: -2}, target);
		},
		onAfterHit: function (target, source) {
			if (source.hp) {
				let item = target.takeItem();
				if (item) {
					this.add('-enditem', target, item.name, '[from] move: Escape Thrust', '[of] ' + source);
					target.setItem('choicespike');
					this.add('-message', target.name + ' obtained a Choice Spike.');
				}
			}
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Escape Thrust');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side) {
					pokemon.volatiles['escapethrust'].gotHit = true;
				}
			},
		},
		selfSwitch: true,
		secondary: null,
		target: "normal",
		type: "Dark",
	},
	// Merick
	prestige: {
		accuracy: true,
		category: "Status",
		desc: "This move fails unless a foe uses a move on the user before the user can execute the move on the same turn. If this move is successful, the move raises the user's both Attack and Defense by 2 stages, lowers the foe's Attack and Defense by 2 stages, renders the foe's Ability ineffective as long as it remains active, and the user gains a random typing.",
		shortDesc: "User must be hit by a move before moving.",
		id: "prestige",
		name: "Prestige",
		isNonstandard: true,
		pp: 20,
		priority: -6,
		flags: {mirror: 1},
		beforeTurnCallback: function (pokemon) {
			pokemon.addVolatile('prestige');
			this.add('-message', `${pokemon.name} is going to show an honor.`);
		},
		beforeMoveCallback: function (pokemon) {
			if (pokemon.volatiles['prestige'] && !pokemon.volatiles['prestige'].gotHit) {
				this.add('cant', pokemon, 'Prestige', 'Prestige');
				this.add('-message', `${pokemon.name} eases itself.`);
				return true;
			}
			this.add('-message', `${pokemon.side.foe.active[0].name} was tricked!`);
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Parting Shot", target);
		},
		onHit: function (target, source) {
			this.boost({atk: -2, def: -2}, target);
			this.boost({atk: 2, def: 2}, source);
			const allTypes = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
			const type1 = allTypes[this.random(18)];
			const type2 = allTypes[this.random(18)];
			if (type1 === type2) {
				source.types = [type1];
				this.add('-start', source, 'typechange', `${type1}`);
			} else {
				source.types = [type1, type2];
				this.add('-start', source, 'typechange', `${type1}/${type2}`);
			}
			if (['battlebond', 'comatose', 'prismpower', 'coloraura', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'overdrive', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'].includes(target.ability)) return;
			target.addVolatile('gastroacid');
		},
		effect: {
			duration: 1,
			onStart: function (pokemon) {
				this.add('-singleturn', pokemon, 'move: Prestige');
			},
			onHit: function (pokemon, source, move) {
				if (pokemon.side !== source.side) {
					pokemon.volatiles['prestige'].gotHit = true;
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	// Lorica
	partofyourworld: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Summons a rainbow for 5 turns. Has a 20% chance to lower the target's Special Attack, and a 10% chance to flinch it.",
		shortDesc: "Summons rainbow for 5 turns. 20% to lower SpAtk, 10% to flinch.",
		id: "partofyourworld",
		name: "Part Of Your World",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Bubble Beam", target);
			this.add('-anim', source, "Aqua Tail", target);
		},
		secondaries: [
			{
				chance: 10,
				volatileStatus: 'flinch',
			}, {
				chance: 20,
				boosts: {
					spa: -2,
				},
			},
		],
		onAfterMoveSecondarySelf: function (source) {
			source.side.addSideCondition('waterpledge');
		},
		target: "normal",
		type: "Water",
	},
// Gyl
	firerage: {
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		desc: "Has a 100% chance to burn the target. Causes a sea of fire for 5 turns.",
		shortDesc: "100% chance to burn and traps the target. Thaws user.",
		id: "firerage",
		name: "Fire Rage",
		isNonstandard: true,
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Sacred Fire', source);
			this.add('-anim', source, 'Flame Charge', target);
		},
		onHit: function (target, source, move) {
			target.side.addSideCondition('firepledge');
		},
		secondary: {
			chance: 100,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
	},
// Jady
	coverage: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "If the target uses a Fighting-type move this turn, it is prevented from executing and the target loses a half of its maximum HP.",
		shortDesc: "If using a Fighting move, target loses 1/2 max HP.",
		id: "coverage",
		name: "Coverage",
		pp: 20,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'coverage',
		effect: {
			duration: 1,
			onStart: function (pokemon, target) {
				this.add('-singleturn', target, 'move: Coverage');
			    this.attrLastMove('[still]');
			    this.add('-anim', target, "Barrier", target);
                this.add('message', `${target.name} is covered with an air-filled shell!`);
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.type === 'Fighting') {
					this.add('-activate', pokemon, 'move: Coverage');
			        this.attrLastMove('[still]');
			        this.add('-anim', pokemon, "Explosion", pokemon);
					this.add('message', `When ${pokemon.name} hits ${target.name}, it exploded!`);
			 		this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 2), 1));
					return false;
				}
			},
		},
		secondary: null,
		isNonstandard: true,
		target: "normal",
		type: "Normal",
	},
	// Adelaide
	frostwind: {
		accuracy: 85,
		basePower: 100,
		category: "Special",
		desc: "Has a 50% chance to freeze the target.",
		shortDesc: "50% chance to freeze the target.",
		id: "frostwind",
		name: "Frost Wind",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Frost Breath', target);
		},
		secondary: {
			chance: 50,
			status: 'frz',
		},
		isNonstandard: true,
		target: "normal",
		type: "Ice",
	},
	// Waylon; Accuracy implemented in scripts.js.
	dragonwing: {
		accuracy: 75,
		basePower: 110,
		category: "Physical",
		desc: "Has a 100% chance to raise the user's Attack, Defense and Speed by 1 stage. If this user is a Dragon-type, this move does not check accuracy.",
		shortDesc: "100% chance to raise the user's Atk, Def and Spe by 1 stage. Dragon types can't miss.",
		id: "dragonwing",
		name: "Dragon Wing",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Outrage', source);
			this.add('-anim', source, 'Wing Attack', target);
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					atk: 1,
					def: 1,
					spe: 1,
				},
			},
		},
		isNonstandard: true,
		target: "normal",
		type: "Dragon",
	},
	// Charlie
	cooldrink: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user gains a random typing and 3 moves based on that typing (2 physical moves and 1 status move). The user's attacks deal damage based off the user's Defense. If used again, returns the user to its original moveset and typing. This move fails if the user is not Charlie.",
		shortDesc: "Charlie: Gains 3 random moves and typing.",
		id: "cooldrink",
		name: "Cool Drink",
		isNonstandard: true,
		pp: 20,
		priority: 0,
		flags: {},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Milk Drink", source);
		},
		onTryHit: function (target, source) {
			if (source.name !== 'Charlie') {
				this.add('-fail', source);
				this.add('-hint', 'Only Charlie can use Cool Drink.');
				return null;
			}
		},
		volatileStatus: 'cooldrink',
		effect: {
			noCopy: true,
			onStart: function (pokemon) {
				this.add('-start', pokemon, 'Cool Drink', '[silent]');
				this.add('-message', `${pokemon.name} drank some potion!`);
				const allTypes = ['Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];
				const type1 = allTypes[this.random(18)];
				const type2 = allTypes[this.random(18)];
				if (type1 === type2) {
					pokemon.types = [type1];
					this.add('-start', pokemon, 'typechange', `${type1}`);
				} else {
					pokemon.types = [type1, type2];
					this.add('-start', pokemon, 'typechange', `${type1}/${type2}`);
				}
				// @ts-ignore track percentages to keep Cool Drink from resetting pp
				pokemon.ppPercentages = pokemon.moveSlots.map(m =>
					m.pp / m.maxpp
				);
				// Get all possible moves sorted for convience in coding
				let newMovep = [];
				let statMove = [], offMove1 = [], offMove2 = [];
				for (const id in this.data.Movedex) {
					const move = this.data.Movedex[id];
					if (id !== move.id) continue;
					if (move.isZ || move.isNonstandard || !move.isViable || move.id === 'batonpass') continue;
					if (move.type && !pokemon.types.includes(move.type)) continue;
					// Time to sort!
					if (move.category === 'Status') statMove.push(move.id);
					if (move.category === 'Physical') {
						if (type1 === type2) {
							offMove1.push(move.id);
							offMove2.push(move.id);
						} else {
							if (move.type === type1) {
								offMove1.push(move.id);
							} else if (move.type === type2) {
								offMove2.push(move.id);
							}
						}
					}
				}
				const move1 = offMove1[this.random(offMove1.length)];
				offMove2 = offMove2.filter(move => move !== move1);
				if (!offMove2.length) offMove2 = ['revelationdance'];
				const move2 = offMove2[this.random(offMove2.length)];
				newMovep.push(move1);
				newMovep.push(move2);
				newMovep.push(!statMove.length ? 'recover' : statMove[this.random(statMove.length)]);
				newMovep.push('cooldrink');
				// Replace Moveset
				pokemon.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					const move = this.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						// @ts-ignore hacky way to reduce Cool Drink's PP
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			},
			onModifyAtkPriority: 1,
			onModifyAtk: function (atk, pokemon) {
				return pokemon.getStat('def');
			},
			onRestart: function (pokemon) {
				this.add('-message', `${pokemon.name} turns back to normal!`);
				delete pokemon.volatiles['cooldrink'];
				this.add('-end', pokemon, 'Cool Drink', '[silent]');
				pokemon.types = ['Normal'];
				this.add('-start', pokemon, 'typechange', 'Normal');
				// @ts-ignore track percentages to keep Cool Drink from resetting pp
				pokemon.ppPercentages = pokemon.moveSlots.slice().map(m => {
					return m.pp / m.maxpp;
				});
				// Update movepool
				let newMovep = ['recover', 'topsyturvy', 'batonpass', 'cooldrink'];
				pokemon.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					let move = this.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						// @ts-ignore hacky way to reduce Cool Drink's PP
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
	},
	// Zig
	"zigzapgoon": {
		accuracy: 100,
		basePower: 75,
		basePowerCallback: function (pokemon, target) {
			if (pokemon.template.speciesid !== 'linoone') {
				return 130;
			}
			return 75;
		},
		category: "Physical",
		desc: "This move has a 30% change to paralyze the target and 10% chance to lounge it. Summons Electric Terrain. If the user is a Zigzagoon, it changes to a Linoone and this move's power becomes 130. The target with Lounge is unable to move for five turns.",
		shortDesc: "30%: Paralyze. 10%: Lounge. Elec Terrain + Zigzagoon changes.",
		id: "zigzapgoon",
		isNonstandard: true,
		name: "Zig-Zap Goon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Extreme Evoboost', source);
			this.add('-anim', source, 'Gigavolt Havoc', target);
		},
		onHit: function () {
			this.setTerrain('electricterrain');
		},
		onAfterMove: function (pokemon) {
			if (pokemon.template.speciesid !== 'zigzagoon' || pokemon.transformed || pokemon.illusion) return;
			pokemon.formeChange('Linoone', this.effect, true);
			this.add('-message', pokemon.name + ' became a Linoone!');
			   pokemon.types = ['Normal', 'Electric'];
			   this.add('-start', pokemon, 'typeadd', 'Electric');
		},
		secondaries: [
			{
			chance: 30,
			status: 'par',
			}, {
			chance: 10,
			volatileStatus: 'lounge',
			},
		],
		target: "normal",
		type: "Electric",
	},
	// Poppy Seed
	"bugcrash": {
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 30% chance to summon Scripted Terrain",
		shortDesc: "30% chance to summon Scripted Terrain.",
		id: "bugcrash",
		isNonstandard: true,
		name: "Bug Crash",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Bug Buzz', source);
			this.add('-anim', source, 'Megahorn', target);
		},
		secondary: {
			chance: 30,
		    onHit: function () {
			this.setTerrain('scriptedterrain');
		   },
		},
		target: "normal",
		type: "Bug",
	},
	// From SSB
	scriptedterrain: {
		accuracy: 100,
		category: "Status",
		desc: "Sets Scripted Terrain for 5 turns. The power of Bug type moves is boosted by 1.5, and there is a 5% chance for every move used to become Glitch Out instead. At the end of a turn, every Pokemon has a 5% chance to transform into a Missingno. with 3 random moves and Glitch Out. Switching out will restore the Pokemon to its normal state. This terrain affects floating Pokemon.",
		shortDesc: "5 turns: +Bug power, glitchy effects.",
		id: "scriptedterrain",
		name: "Scripted Terrain",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {nonsky: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Calm Mind', source);
			this.add('-anim', source, 'Geomancy', source);
		},
		terrain: 'scriptedterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Bug') {
					this.debug('scripted terrain boost');
					return this.chainModify(1.5);
				}
			},
			onTryHitPriority: 4,
			onTryHit: function (target, source, effect) {
				if (!effect || effect.id === 'glitchout' || source.volatiles['glitchout']) return;
				if (this.random(20) === 1) {
					this.add('message', `${source.name}'s move was glitched by the Scripted Terrain!`);
					this.useMove('Glitch Out', source, source.side.foe.active[0]);
					return null;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Scripted Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Scripted Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onResidual: function () {
				this.eachEvent('Terrain');
			},
			onTerrain: function (pokemon) {
				if (pokemon.template.id === 'missingno') return;
				if (pokemon.fainted || !pokemon.hp) return;
				if (this.random(20) === 1) {
					this.debug('Scripted terrain corrupt');
					this.add('message', `${pokemon.name} was corrupted by a bug in the scripted terrain!`);
					// generate a movepool
					let moves = [];
					let pool = this.shuffle(Object.keys(this.data.Movedex));
					let metronome = this.getMove('metronome');
					for (let i of pool) {
						let move = this.getMove(i);
						if (i !== move.id) continue;
						if (move.isZ || move.isNonstandard) continue;
						if (metronome.noMetronome && metronome.noMetronome.includes(move.id)) continue;
						if (this.getMove(i).gen > this.gen) continue;
						moves.push(move);
						if (moves.length >= 3) break;
					}
					moves.push('glitchout');
					pokemon.formeChange('missingno');
					pokemon.moveSlots = [];
					for (let moveid of moves) {
						let move = this.getMove(moveid);
						if (!move.id) continue;
						pokemon.moveSlots.push({
							move: move.name,
							id: move.id,
							pp: 5,
							maxpp: 5,
							target: move.target,
							disabled: false,
							used: false,
							virtual: true,
						});
						pokemon.moves.push(move.id);
					}
				}
			},
			onEnd: function () {
				this.add('-fieldend', 'move: Scripted Terrain');
			},
		},
		secondary: null,
		target: "self",
		type: "Psychic",
	},
	glitchout: {
		accuracy: true,
		category: "Status",
		desc: "A random move is selected for use, other than After You, Assist, Baneful Bunker, Beak Blast, Belch, Bestow, Celebrate, Chatter, Copycat, Counter, Covet, Crafty Shield, Destiny Bond, Detect, Diamond Storm, Endure, Feint, Fleur Cannon, Focus Punch, Follow Me, Freeze Shock, Helping Hand, Hold Hands, Hyperspace Hole, Ice Burn, Instruct, King's Shield, Light of Ruin, Mat Block, Me First, Metronome, Mimic, Mind Blown, Mirror Coat, Mirror Move, Nature Power, Photon Geyser, Plasma Fists, Protect, Quash, Quick Guard, Rage Powder, Relic Song, Secret Sword, Shell Trap, Sketch, Sleep Talk, Snarl, Snatch, Snore, Spectral Thief, Spiky Shield, Spotlight, Steam Eruption, Struggle, Switcheroo, Techno Blast, Thief, Thousand Arrows, Thousand Waves, Transform, Trick, Trump Card, V-create, or Wide Guard. The selected move's Base Power is increased by 20.",
		shortDesc: "Uses a random move with Base Power +20.",
		id: "glitchout",
		name: "Glitch Out",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {},
		noMetronome: ['afteryou', 'assist', 'banefulbunker', 'beakblast', 'belch', 'bestow', 'celebrate', 'chatter', 'copycat', 'counter', 'covet', 'craftyshield', 'destinybond', 'detect', 'diamondstorm', 'dragonascent', 'endure', 'feint', 'fleurcannon', 'focuspunch', 'followme', 'freezeshock', 'helpinghand', 'holdhands', 'hyperspacefury', 'hyperspacehole', 'iceburn', 'instruct', 'kingsshield', 'lightofruin', 'matblock', 'mefirst', 'metronome', 'mimic', 'mindblown', 'mirrorcoat', 'mirrormove', 'naturepower', 'originpulse', 'photongeyser', 'plasmafists', 'precipiceblades', 'protect', 'quash', 'quickguard', 'ragepowder', 'relicsong', 'secretsword', 'shelltrap', 'sketch', 'sleeptalk', 'snarl', 'snatch', 'snore', 'spectralthief', 'spikyshield', 'spotlight', 'steameruption', 'struggle', 'switcheroo', 'technoblast', 'thief', 'thousandarrows', 'thousandwaves', 'transform', 'trick', 'trumpcard', 'vcreate', 'wideguard'],
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Bug Buzz', source);
			this.add('-anim', source, 'Metronome', source);
			source.addVolatile('glitchout');
		},
		onHit: function (target, source, effect) {
			let moves = [];
			for (let i in this.data.Movedex) {
				let move = this.data.Movedex[i];
				if (i !== move.id) continue;
				if (move.isZ || move.isNonstandard) continue;
				if (effect.noMetronome && effect.noMetronome.includes(move.id)) continue;
				if (this.getMove(i).gen > this.gen) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) {
				return false;
			}
			this.useMove(randomMove, target);
		},
		secondary: null,
		target: "self",
		type: "Bug",
	},
	// Mirica
	galaxydance: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Every Pokemon in the user's party restores 1/3 of its maximum HP, rounded down, restored 5 PP of its maximum, and is cured of its major status condition. ",
		shortDesc: "Cures the user's party of all status conditions and restores HP and PP.",
		id: "galaxydance",
		isNonstandard: true,
		name: "Galaxy Dance",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, dance: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Teeter Dance", source);
			this.add('-anim', source, "Wish", source);
			this.add('-anim', source, "Swift", target);
		},
		self: {
			onHit: function (pokemon, source, move) {
		    	this.attrLastMove('[still]');
		    	this.add('-anim', source, "Wish", source);
				this.add('-message', `A wishing star shot through your team area!`);
				source.heal(source.maxhp / 3);
				this.add('-heal', source, source.getHealth);
					for (const moveSlot of source.moveSlots) {
						moveSlot.pp += 5;
					}
				for (const ally of source.side.pokemon) {
					ally.heal(ally.maxhp / 3);
					ally.cureStatus();
					for (const moveSlot of ally.moveSlots) {
						moveSlot.pp += 5;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Move used for Mirica's Fantasy Surge
	fantasymist: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members are immune to super-effective moves. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from super-effective moves.",
		id: "fantasymist",
		name: "Fantasy Mist",
		pp: 30,
		priority: 0,
        isNonstandard: true,
		flags: {snatch: 1},
		sideCondition: 'fantasymist',
		effect: {
			duration: 5,
	    	onTryHit: function (target, source, move) {
	    		if (target.runEffectiveness(move) == 1) {
				this.add('-activate', target, 'move: Fantasy Mist');
				this.add('-message', `The Pokémon is protected by a Fantasy Mist!`);
				return null;
		    	}
	    	},
			onStart: function (side) {
				this.add('-sidestart', side, 'Fantasy Mist');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 3,
			onEnd: function (side) {
				this.add('-sideend', side, 'Fantasy Mist');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Psychic",
	},
	// Montgomery
	powerburn: {
		accuracy: 100,
		basePower: 130,
		basePowerCallback: function (pokemon, target, move) {
			if (pokemon.status === 'brn') return move.basePower * 2;
			return move.basePower;
		},
		category: "Physical",
		desc: "Has a 30% chance to burn the target. Power doubles if the user is burned. The target thaws out if it is frozen.",
		shortDesc: "30% chance to burn the target. Power 2x if the user is burned.",
		id: "powerburn",
        isNonstandard: true,
		name: "Power Burn",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, 'Outrage', source);
			this.add('-anim', source, 'Flare Blitz', target);
		},
		thawsTarget: true,
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fighting",
	},
	// Harold
	blastofshadows: {
		accuracy: 95,
		basePower: 100,
		category: "Special",
		desc: "If the target has not fainted, both the user and the target are forced to switch out and be replaced with a chosen unfainted ally. The target's replacement has its Defense and Special Defense lowered by 2 stages. Fails if either Pokemon is under the effect of Ingrain or Suction Cups.",
		shortDesc: "Both Pokemon switch. Opp. replacement: Def -2, Spd -2.",
		id: "blastofshadows",
        isNonstandard: true,
		name: "Blast of Shadows",
		pp: 10,
		priority: -6,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Night Shade", source);
			this.add('-anim', source, "Shadow Ball", target);
		},
		onTryHit: function (target, source, move) {
			target.side.addSideCondition('weakdrag');
		},
		onHit: function (target, source, move) {
			if (this.runEvent('DragOut', source, target, move)) {
				source.forceSwitchFlag = true;
			}
		},
		effect: {
			duration: 1,
			onSwitchIn: function (pokemon) {
				this.boost({def: -2, spd: -2}, pokemon, pokemon.side.foe.active[0], this.getActiveMove('weakdrag'));
			},
		},
		forceSwitch: true,
		target: "normal",
		type: "Ghost",
		zMovePower: 150,
	},
	// Loretta
	// Millennium
	colorshift: {
		accuracy: true,
		category: "Status",
		desc: "If the user is an Arceus, its item becomes a random Plate whose type matches one of the target's weaknesses, it changes forme, and it uses Multi-Breaker. Fails if the target has no weaknesses or if the user's species is not Arceus.",
		shortDesc: "Changes user/move type to a weakness of target.",
		id: "colorshift",
		name: "Color Shift",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
        breaksProtect: true,
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Conversion 2", source);
		},
		onHit: function (target, source) {
			if (source.baseTemplate.baseSpecies !== 'Arceus') return false;
			let targetTypes = target.getTypes(true).filter(type => type !== '???');
			if (!targetTypes.length) {
				if (target.addedType) {
					targetTypes = ['Normal'];
				} else {
					return false;
				}
			}
			let weaknesses = [];
			for (let type in this.data.TypeChart) {
				let typeMod = this.getEffectiveness(type, targetTypes);
				if (typeMod > 0 && this.getImmunity(type, target)) weaknesses.push(type);
			}
			if (!weaknesses.length) {
				return false;
			}
			let randomType = this.sample(weaknesses);
			source.setItem(randomType + 'jewel');
			this.add('-item', source, source.getItem(), '[from] move: Color Shift');
			let template = this.getTemplate('Arceus-' + randomType);
			source.formeChange(template, this.getAbility('coloraura'), true);
			let move = this.getActiveMove('multibreaker');
			this.useMove(move, source, target);
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMoveEffect: 'heal',
	},
/////Move used for Color Shift
	multibreaker: {
		accuracy: true,
		category: "Special",
		basePower: 180,
		basePowerCallback: function (pokemon, target) {
			if (target.name === 'Zatch') {
				return 255;
			}
			return 180;
		},
		desc: "This move's type depends on the user's held Jewel. This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, the effects of Reflect, Light Screen, Aurora Veil, Safeguard, and Mist end for the target's side, and the effects of Spikes, Permafrost, Stealth Rock, and Sticky Web end for the user's side, resets all of the target's stat stages to 0, and the effects of the Terrain and Weather ends for the field. Has a 80% chance to lower the target's Defense, Special Defense, Accuracy, and Speed by 2 stages and a 50% chance to paralyze it. Fails if the target has no weaknesses or if the user's species is not Arceus.",
		shortDesc: "Changes user/move type to a weakness of target. Does many things",
		id: "multibreaker",
		name: "Multi-Breaker",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {authentic: 1, protect: 1},
        breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			const item = pokemon.getItem();
			if (item.id && item.onPlate && !item.zMove) {
				move.type = item.onPlate;
			}
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source, pokemon) {
			this.add('-anim', source, "Destiny Bond", source);
			this.add('-anim', source, "Prismatic Laser", target);
		},
		onHit: function (target, source) {
				if (source.hp && source.removeVolatile('leechseed')) {
					this.add('-end', source, 'Leech Seed', '[from] move: Multi-Breaker', '[of] ' + source);
				}
			let removeThings = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
			let silentRemove = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
			for (const sideCondition of removeThings) {
				if (target.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) this.add('-sideend', target.side, this.getEffect(sideCondition).name, '[from] move: Multi-Breaker', '[of] ' + source);
				}
			}
			let removeHazards = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let silentRemove2 = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			for (const sideCondition of removeHazards) {
				if (source.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove2.includes(sideCondition))) this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: Multi-Breaker', '[of] ' + source);
				}
			}
			for (const clear in this.pseudoWeather) {
				if (clear.endsWith('mod') || clear.endsWith('clause')) continue;
				this.removePseudoWeather(clear);
			}
				if (source.hp && source.volatiles['partiallytrapped']) {
					source.removeVolatile('partiallytrapped');
				}
			this.clearWeather();
			this.clearTerrain();
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondaries: [
			{
				chance: 50,
				status: 'par',
			}, {
				chance: 80,
				boosts: {
			def: -2,
			spd: -2,
			spe: -2,
			accuracy: -2,
				},
			},
		],
		target: "normal",
		type: "Normal",
	},
// Zatch
  zraider: {
		accuracy: true,
		basePower: 180,
		basePowerCallback: function (pokemon, target) {
			if (target.name === 'Millennium') {
				return 255;
			}
			return 180;
		},
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 80% chance to lower the target's Defense, Special Defense, Accuracy, and Speed by 2 stages and a 50% chance to freeze it. This move and its effects ignore the Type Immunities and Abilities of other Pokemon. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. Summons Delta Stream afterwards.",
		shortDesc: "Does many things. Summons Delta Stream.",
		id: "zraider",
		name: "Z-Raider",
		isNonstandard: true,
		pp: 10,
		priority: 0,
		flags: {authentic: 1},
		breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Geomancy", source);
			this.add('-anim', source, "Dragon Dance", source);
			this.add('-anim', source, "Prismatic Laser", target);
		},
		self: {
			onHit: function (pokemon) {
				if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
					this.add('-end', pokemon, 'Leech Seed', '[from] move: Z-Raider', '[of] ' + pokemon);
				}
				let sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
				for (const condition of sideConditions) {
					if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
						this.add('-sideend', pokemon.side, this.getEffect(condition).name, '[from] move: Z-Raider', '[of] ' + pokemon);
					}
				}
				if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
					pokemon.removeVolatile('partiallytrapped');
				}
			},
		},
		secondaries: [
			{
				chance: 50,
				status: 'frz',
			}, {
				chance: 80,
				boosts: {
			def: -2,
			spd: -2,
			spe: -2,
			accuracy: -2,
				},
			},
		],
		onAfterMoveSecondarySelf: function (source, target) {
			this.setWeather('deltastream');
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		target: "normal",
		type: "Psychic",
	},
	worldoflight: {
		accuracy: true,
		basePower: 195,
		category: "Special",
		desc: "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Type Immunities and Abilities of other Pokemon. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. The user uses a Z-Shield afterwards.",
		shortDesc: "Physical if user's Atk > Sp. Atk. Ignrs. abilis./immunis.",
		id: "worldoflight",
		name: "World of Light",
		isNonstandard: true,
		pp: 1,
		priority: 0,
		flags: {authentic: 1},
		breaksProtect: true,
		onModifyMove: function (move, pokemon) {
			if (pokemon.getStat('atk', false, true) > pokemon.getStat('spa', false, true)) move.category = 'Physical';
		},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Cosmic Power", source);
			this.add('-anim', source, "Flash", source);
			this.add('-anim', source, "Light That Burns The Sky", target);
		},
		onAfterMoveSecondarySelf: function (source) {
			source.addVolatile('powershield');
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		isZ: "zatchiumz",
		secondary: null,
		target: "normal",
		type: "Psychic",
	},
	// Omega Sheron
	doubledragon: {
		accuracy: true,
		basePower: 180,
		basePowerCallback: function (pokemon, target) {
			if (target.name === 'Zatch' || target.name === 'Millennium') {
				return 255;
			}
			return 180;
		},
		category: "Physical",
		desc: "This move does not check accuracy. This move is a special attack if the user's Special Attack stat is greater than its Attack stat; otherwise, it is a physical attack. 90% chance to burn and confuse the target, 70% chance to paralyze, lounge and trap the target, 70% chance to badly poison the target and replaces every non-fainted member of the user's team with a PK Land set that is randomly selected from all sets, except those with the move Double Dragon, 30% chance to freeze and weak-trap the target, 10% chance to attract the target and make it sleep, and 7% chance to KO the target. This move is super-effective against any type. This move ignores the target's stat stage changes, including evasiveness. This move and its effects ignore the Abilities of other Pokemon. If used against Zatch or Millennium, the move's base power is 255. If this move is successful and the user has not fainted, it renders the foe's Ability ineffective as long as it remains active even when it had Battle Bond, Comatose, Prism Power, Color Aura, Disguise, Shock Puppet, Multitype, Power Construct, Overdrive, RKS System, Schooling, Shields Down, and Stance Change, resets all of the target's stat stages to 0, the effects of the Terrain and Weather ends for the field, and the user gains the effect of Aqua Ring, Magic Coat, Safeguard, Mist, Reflect, Light Screen, Aurora Veil, and a ???-type. If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Z-Shield, Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
		shortDesc: "Does many things.",
		id: "doubledragon",
		name: "Double Dragon",
		isNonstandard: true,
		pp: 5,
		priority: 0,
		flags: {authentic: 1},
        breaksProtect: true,
		onModifyMove: function (move, pokemon, target) {
			if (pokemon.getStat('spa', false, true) > pokemon.getStat('atk', false, true)) move.category = 'Special';
		},
		onTryMovePriority: 100,
		onTryMove: function (pokemon, target, move) {
			this.attrLastMove('[still]');		
			if (pokemon.template.species === 'Rayquaza-Mega') {
				return;
			}
			this.add('-fail', pokemon, 'move: Double Dragon');
			this.add('-hint', "Only a Pokemon whose form is Rayquaza-Mega can use this move.");
			return null;	
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Double Team", source);
			this.add('-anim', source, "Roar of Time", source);
			this.add('-anim', source, "Air Slash", target);
		},
		self: {
			onHit: function (pokemon, target, move) {
				pokemon.setType('???');
				this.add('-start', pokemon, 'typechange', '???');
                pokemon.addVolatile('aquaring');
                pokemon.addVolatile('magiccoat');
			    pokemon.side.addSideCondition('safeguard');
			    pokemon.side.addSideCondition('mist');
			    pokemon.side.addSideCondition('reflect');
			    pokemon.side.addSideCondition('lightscreen');
			    pokemon.side.addSideCondition('auroraveil');
			},
		},
			onHit: function (source, target, move) {
			    this.clearWeather();
			    this.clearTerrain();
			    source.clearBoosts();
			    this.add('-clearboost', source);
		     	target.addVolatile('gastroacid');
			},
		onAfterSubDamage: function (damage, target) {
			target.addVolatile('gastroacid');
		},
		onEffectiveness: function (typeMod, target) {
			return 1;
		},
		ignoreImmunity: true,
		ignoreAbility: true,
		ignoreEvasion: true,
		ignoreDefensive: true,
		secondaries: [
			{
			chance: 90,
			status: 'brn',
			volatileStatus: 'confusion',
			}, {
			chance: 70,
			status: 'par',
			volatileStatus: 'lounge', //Lounge's effect will go in statuses.js
			onHit: function (target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
			}, {
			chance: 50,
			status: 'tox',
	    	onHit: function (target, source) {
			// Store percent of HP left, percent of PP left, and status for each pokemon on the user's team
			let carryOver = [];
			let currentTeam = source.side.pokemon;
			for (let pokemon of currentTeam) {
				carryOver.push({
					hp: pokemon.hp / pokemon.maxhp,
					status: pokemon.status,
					statusData: pokemon.statusData,
					pp: pokemon.moveSlots.slice().map(m => {
						return m.pp / m.maxpp;
					}),
				});
				// Handle pokemon with less than 4 moves
				while (carryOver[carryOver.length - 1].pp.length < 4) {
					carryOver[carryOver.length - 1].pp.push(100);
				}
			}
			// Generate a new team
			let generator = new RandomPKLandTeams(this.format, this.prng);
			let team = generator.generateTeam();
			// Overwrite un-fainted pokemon other than the user
			for (let i = 0; i < currentTeam.length; i++) {
				if (currentTeam[i].fainted || !currentTeam[i].hp || currentTeam[i].position === source.position) continue;
				let set = team.shift();
				let oldSet = carryOver[i];
				if (set.name === 'Omega Sheron') {
					// No way am I allowing 5 of this mon on one team
					set = team.shift();
				}

				// Bit of a hack so client doesn't crash when formeChange is called for the new pokemon
				let effect = this.effect;
				this.effect = /** @type {Effect} */ ({id: ''});
				let pokemon = new Pokemon(set, source.side);
				this.effect = effect;

				pokemon.hp = Math.floor(pokemon.maxhp * oldSet.hp) || 1;
				pokemon.status = oldSet.status;
				if (oldSet.statusData) pokemon.statusData = oldSet.statusData;
				for (const [j, moveSlot] of pokemon.moveSlots.entries()) {
					moveSlot.pp = Math.floor(moveSlot.maxpp * oldSet.pp[j]);
				}
				pokemon.position = currentTeam[i].position;
				currentTeam[i] = pokemon;
			}
			this.add('message', `${source.name} shifted ${source.side.name}'s team away!`);
		},
			}, {
			chance: 30,
			status: 'frz',
			volatileStatus: 'weaktrap',
			}, {
			chance: 10,
			status: 'slp',
			volatileStatus: 'attract',
			}, {
			chance: 7,
			ohko: true,
			onHit: function (target, source) {
			this.add('-message', 'FATALITY!');
		      },
		   },
		],
		target: "normal",
		type: "Flying",
	},
	// Modified Moves \\
	"multiattack": {
		inherit: true,
		accuracy: true,
		basePower: 160,
	},
	"judgment": {
		inherit: true,
		accuracy: true,
		basePower: 180,
	},
	"gastroacid": {
		inherit: true,
		volatileStatus: 'gastroacid',
		onTryHit: function (pokemon) {
			let bannedAbilities = ['battlebond', 'comatose', 'coloraura', 'prismpower', 'overdrive', 'disguise', 'shockpuppet', 'multitype', 'powerconstruct', 'rkssystem', 'schooling', 'shieldsdown', 'stancechange'];
			if (bannedAbilities.includes(pokemon.ability)) {
				return false;
			}
		},
		effect: {
			// Ability suppression implemented in Pokemon.ignoringAbility() within sim/pokemon.js
			onStart: function (pokemon) {
				this.add('-endability', pokemon);
				this.singleEvent('End', this.getAbility(pokemon.ability), pokemon.abilityData, pokemon, pokemon, 'gastroacid');
			},
		},
	},
	// Cool Drink is immune to taunt
	"taunt": {
		inherit: true,
		volatileStatus: 'taunt',
		effect: {
			duration: 3,
			onStart: function (target) {
				if (target.activeTurns && !this.willMove(target)) {
					this.effectData.duration++;
				}
				this.add('-start', target, 'move: Taunt');
			},
			onResidualOrder: 12,
			onEnd: function (target) {
				this.add('-end', target, 'move: Taunt');
			},
			onDisableMove: function (pokemon) {
				for (const moveSlot of pokemon.moveSlots) {
					if (this.getMove(moveSlot.id).category === 'Status' && this.getMove(moveSlot.id).id !== 'cooldrink') {
						pokemon.disableMove(moveSlot.id);
					}
				}
			},
			onBeforeMovePriority: 5,
			onBeforeMove: function (attacker, defender, move) {
				if (!move.isZ && move.category === 'Status' && move.id !== 'cooldrink') {
					this.add('cant', attacker, 'move: Taunt', move);
					return false;
				}
			},
		},
	},
//////////////// Moves modded to match their Let's Go! counterparts
	"skyattack": {
		inherit: true,
		basePower: 200,
	},
	"teleport": {
		inherit: true,
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		priority: -6,
		selfSwitch: true,
		onTryHit: true,
	},
	"solarbeam": {
		inherit: true,
		basePower: 200,
	},
	"metronome": {
		inherit: true,
		onHit: function (target, source, effect) {
			let moves = [];
			for (let i in exports.BattleMovedex) {
				let move = this.getMove(i);
				if (i !== move.id) continue;
				if (move.gen !== 1) continue;
				// @ts-ignore
				if (effect.noMetronome.includes(move.id)) continue;
				moves.push(move);
			}
			let randomMove = '';
			if (moves.length) {
				moves.sort((a, b) => a.num - b.num);
				randomMove = this.sample(moves).id;
			}
			if (!randomMove) return false;
			this.useMove(randomMove, target);
		},
	},
	"megadrain": {
		inherit: true,
		basePower: 75,
		pp: 10,
	},
	"absorb": {
		inherit: true,
		basePower: 40,
		pp: 15,
	},
};

exports.BattleMovedex = BattleMovedex;
