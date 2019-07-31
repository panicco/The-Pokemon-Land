'use strict';

const RandomTeams = require('../../random-teams');
const Pokemon = require('../../../sim/pokemon');

/**@type {{[k: string]: ModdedMoveData}} */
let BattleMovedex = {
		freezeframe: {
        accuracy: 100,
		basePower: 70,
		category: "Special",
		desc: "Nearly always goes first. Has a 100% chance to freeze the foe.",
		shortDesc: "Always goes first. 100% chance to freeze the foe.",
		id: "freezeframe",
		isNonstandard: true,
		name: "Freeze Frame",
		pp: 15,
		priority: 2,
		flags: {protect: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Wrap", target);
			this.add('-anim', source, "Blizzard", target);
		},
		secondary: {
			chance: 100,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		contestType: "Cool",
	},
	fairyflare: {
		accuracy: 100,
		basePower: 120,
		category: "Special",
		desc: "Has a 100% chance to lower the target's Special Defense by 2 stages.",
		shortDesc: "100% chance to lower the target's Special Defense by 2.",
		id: "fairyflare",
		isNonstandard: true,
		name: "Fairy Flare",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Aromatic Mist", target);
			this.add('-anim', source, "Disarming Voice", target);
		},
		secondary: {
			chance: 100,
			boosts: {
				spd: -2,
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 230,
		contestType: "Beautiful",
	},
	magicglitter: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 30% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 2 stages.",
		shortDesc: "30% chance to raise all stats by 2 (not acc/eva).",
		id: "magicglitter",
		isNonstandard: true,
		name: "Magic Glitter",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Geomancy", target);
			this.add('-anim', source, "Dazzling Gleam", target);
		},
		secondary: {
			chance: 30,
			self: {
				boosts: {
					atk: 2,
					def: 2,
					spa: 2,
					spd: 2,
					spe: 2,
				},
			},
		},
		target: "normal",
		type: "Fairy",
		zMovePower: 250,
		contestType: "Beautiful",
	},
	badmockery: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move causes Taunt on the foe.",
		shortDesc: "Causes Taunt.",
		id: "badmockery",
		isNonstandard: true,
		name: "Bad Mockery",
		pp: 5,
		priority: 0,
		volatileStatus: 'taunt',
		flags: {protect: 1, reflectable: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Chatter", target);
			this.add('-anim', source, "Brutal Swing", target);
		},
		secondary: null,
		target: "normal",
		type: "Dark",
		zMovePower: 250,
		contestType: "Clever",
	},
	liberation: {
		accuracy: 100,
		basePower: 255,
		category: "Physical",
		desc: "If this move is successful, it has a 100% chance to both confuse and paralyze the target, maximizes all stats and the user's type becomes typeless as long as it remains active, the user must recharge on the following turn and cannot select a move, and it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally. The user steals the foe's boosts. The user gains the effects of Aqua Ring, Magic Coat, Aurora Veil, Light Screen, Reflect, Mist and Safeguard.",
		shortDesc: "Does many things turn 1. Can't move turn 2.",
		id: "liberation",
		isNonstandard: true,
		name: "Liberation",
		pp: 5,
		priority: 2,
		flags: {authentic: 1, protect: 1, recharge: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Geomancy", source);
			this.add('-anim', source, "Focus Energy", source);
			this.add('-anim', source, "Photon Geyser", target);
			this.add('-anim', source, "Giga Impact", target);
		},
		ignoreEvasion: true,
		ignoreDefensive: true,
        breaksProtect: true,
		self: {
			onHit: function (pokemon) {
				pokemon.setType('???');
				this.add('-start', pokemon, 'typechange', '???');
                this.boost({atk: 12}, pokemon);
                this.boost({spa: 12}, pokemon);
                this.boost({def: 12}, pokemon);
                this.boost({spd: 12}, pokemon);
                this.boost({spe: 12}, pokemon);
                this.boost({evasion: 12}, pokemon);
                this.boost({accuracy: 12}, pokemon);
                pokemon.addVolatile('aquaring');
                pokemon.addVolatile('magiccoat');
			    pokemon.side.addSideCondition('safeguard');
			    pokemon.side.addSideCondition('mist');
			    pokemon.side.addSideCondition('reflect');
			    pokemon.side.addSideCondition('lightscreen');
			    pokemon.side.addSideCondition('auroraveil');
			},
			volatileStatus: 'mustrecharge',
		},
		ignoreAbility: true,
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
            status: 'par',
		},
		stealsBoosts: true,
		target: "normal",
		type: "???",
		zMovePower: 350,
		contestType: "Clever",
	},
	varishot: {
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.",
		shortDesc: "Type varies based on the user's primary type.",
		id: "varishot",
		isNonstandard: true,
		name: "Vari-Shot",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Geomancy", target);
			this.add('-anim', source, "Hyper Beam", target);
		},
		onModifyMove: function (move, pokemon) {
			let type = pokemon.types[0];
			if (type === "Bird") type = "???";
			move.type = type;
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		zMovePower: 230,
		contestType: "Cool",
	},
	dragonfist: {
		accuracy: 100,
		basePower: 170,
		basePowerCallback: function (pokemon, target, move) {
			return move.basePower * pokemon.hp / pokemon.maxhp;
		},
		category: "Physical",
		desc: "Power is equal to (user's current HP * 170 / user's maximum HP), rounded down, but not less than 1.",
		shortDesc: "Less power as user's HP decreases.",
		id: "dragonfist",
		isNonstandard: true,
		name: "Dragon Fist",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Dragon Ascent", target);
			this.add('-anim', source, "Dragon Dance", target);
			this.add('-anim', source, "Mega Punch", target);
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		zMovePower: 250,
		contestType: "Cool",
	},
	glowingblitz: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "Resets all of the target's stat stages to 0.",
		id: "glowingblitz",
		isNonstandard: true,
		name: "Glowing Blitz",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Tail Glow", target);
			this.add('-anim', source, "Glitzy Glow", target);
		},
		onHit: function (target) {
			target.clearBoosts();
			this.add('-clearboost', target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 160,
		contestType: "Beautiful",
	},
	chillclaw: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Has a 30% chance to freeze the target.",
		id: "chillclaw",
		isNonstandard: true,
		name: "Chill Claw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Slash", target);
			this.add('-anim', source, "Glaciate", target);
		},
		secondary: {
			chance: 30,
			status: 'frz',
		},
		target: "normal",
		type: "Ice",
		zMovePower: 140,
		contestType: "Clever",
	},
	thunderclaw: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Has a 30% chance to paralyze the target.",
		id: "thunderclaw",
		isNonstandard: true,
		name: "Thunder Claw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Slash", target);
			this.add('-anim', source, "Thunder", target);
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
		target: "normal",
		type: "Electric",
		zMovePower: 140,
		contestType: "Clever",
	},
	flameclaw: {
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		shortDesc: "Has a 30% chance to burn the target.",
		id: "flameclaw",
		isNonstandard: true,
		name: "Flame Claw",
		pp: 20,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, defrost: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Slash", target);
			this.add('-anim', source, "Overheat", target);
		},
		secondary: {
			chance: 30,
			status: 'brn',
		},
		target: "normal",
		type: "Fire",
		zMovePower: 140,
		contestType: "Clever",
	},
	heat: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "Causes the target to become a Fire type. Fails if the target is an Arceus or a Silvally.",
		shortDesc: "Changes the target's type to Fire.",
		id: "heat",
		name: "Heat",
		isNonstandard: true,
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, mystery: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Tail Glow", target);
			this.add('-anim', source, "Will-O-Wisp", target);
		},
		onHit: function (target) {
			if (!target.setType('Fire')) {
				this.add('-fail', target);
				return null;
			}
			this.add('-start', target, 'typechange', 'Fire');
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		zMoveBoost: {spa: 1},
		contestType: "Cute",
	},
	lusterpunch: {
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 50% chance to lower the target's accuracy by 2 stages.",
		shortDesc: "50% chance to lower the target's accuracy by 2.",
		id: "lusterpunch",
		isNonstandard: true,
		name: "Luster Punch",
		pp: 15,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, punch: 1},
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Tail Glow", target);
			this.add('-anim', source, "Flash", target);
			this.add('-anim', source, "Mega Punch", target);
		},
		secondary: {
			chance: 50,
			boosts: {
				accuracy: -2,
			},
		},
		target: "normal",
		type: "Light",
		zMovePower: 150,
		contestType: "Tough",
	},
	permafrost: {
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Sets up a hazard on the opposing side of the field, having a %20 chance to freeze each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, is hit by Defog, or a grounded Ice-type Pokemon switches in. Safeguard prevents the opposing party from being frozen on switch-in, but a substitute does not.",
		shortDesc: "%20 chance to frz grnd foes on switch;Mx lyrs: 1",
		id: "permafrost",
		isViable: true,
		name: "Permafrost",
		pp: 20,
		priority: 0,
		flags: {reflectable: 1, nonsky: 1},
		sideCondition: 'permafrost',
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Freeze Dry", source);
			this.add('-anim', source, "Mist", source);
		},
		effect: {
			// this is a side condition
			onStart: function (side) {
				this.add('-sidestart', side, 'move: Permafrost');
				this.add('message', `Frost covered the ground\!`);
				this.effectData.layers = 1;
			},
			onRestart: function (side) {
				if (this.effectData.layers >= 1) return false;
				this.add('-sidestart', side, 'move: Permafrost');
				this.effectData.layers++;
			},
			onSwitchIn: function (pokemon) {
				if (!pokemon.isGrounded()) return;
				if (!pokemon.runImmunity('Ice')) return;
				if (pokemon.hasType('Ice')) {
					this.add('-sideend', pokemon.side, 'move: Permafrost', '[of] ' + pokemon);
					pokemon.side.removeSideCondition('permafrost');
				} else if (this.randomChance(30, 100)) {
					pokemon.trySetStatus('frz', pokemon.side.foe.active[0]);
				} else {
					this.add('message', `${pokemon.name} avoided the frost\!`);
				}
			},
		},
		secondary: null,
		target: "foeSide",
		type: "Ice",
		zMoveBoost: {spd: 1},
		contestType: "Clever",
	},
	sinisterhaze: {
		accuracy: 100,
		basePower: 0,
		category: "Status",
		desc: "If the target uses a super-effective move this turn, it is prevented from executing and the target loses a 1/3 of its maximum HP.",
		shortDesc: "If using a super-effective move, target loses 1/3 max HP.",
		id: "sinisterhaze",
		name: "Sinister Haze",
		pp: 30,
		priority: 1,
		flags: {protect: 1, reflectable: 1, mirror: 1, authentic: 1},
		volatileStatus: 'sinisterhaze',
		effect: {
			duration: 1,
			onStart: function (pokemon, target) {
				this.add('-singleturn', target, 'move: Coverage');
			    this.attrLastMove('[still]');
			    this.add('-anim', pokemon, "Octazooka", target);
			    this.add('-anim', target, "Haze", target);
                this.add('message', `${target.name} is covered with a black mist!`);
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.typeMod > 0) {
					this.add('-activate', pokemon, 'move: Sinister Haze');
			        this.attrLastMove('[still]');
			        this.add('-anim', pokemon, "Explosion", pokemon);
					this.add('message', `${pokemon.name} exploded!`);
			 		this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 3), 1));
					return false;
				}
			},
		},
		secondary: null,
		isViable: true,
		target: "normal",
		type: "Dark",
	},
////New Moves Require for Mega Evolution
	psyrush: {
		accuracy: 90,
		basePower: 180,
		category: "Psychical",
		desc: "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 1/2 recoil.",
		id: "psyrush",
		name: "Psy Rush",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		recoil: [1, 2],
		onTryMovePriority: 100,
		onTryMove: function () {
			this.attrLastMove('[still]');
		},
		onPrepareHit: function (target, source) {
			this.add('-anim', source, "Zen Headbutt", target);
		},
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMovePower: 250,
		contestType: "Cool",
	},
////Modded Moves from Let's Go!
	"absorb": {
		inherit: true,
		basePower: 40,
		pp: 15,
	},
	"baddybad": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"bouncybubble": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"buzzybuzz": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"doubleironbash": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"floatyfall": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"freezyfrost": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"glitzyglow": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"megadrain": {
		inherit: true,
		basePower: 75,
		pp: 10,
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
	"pikapapow": {
		inherit: true,
		// These moves have valid numbers in the code but are only usable when shaking the Switch remote
		isUnreleased: false,
	},
	"sappyseed": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"sizzlyslide": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"solarbeam": {
		inherit: true,
		basePower: 200,
	},
	"sparklyswirl": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
	"splishysplash": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
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
	"veeveevolley": {
		inherit: true,
		// These moves have valid numbers in the code but are only usable when shaking the Switch remote
		isUnreleased: false,
	},
	"zippyzap": {
		inherit: true,
		isNonstandard: false,
		isUnreleased: false,
	},
};

exports.BattleMovedex = BattleMovedex;
