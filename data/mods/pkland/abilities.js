'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	// Kyle
	desertcactus: {
		desc: "On switch-in, this Pokemon summons Sandstorm. If Sandstorm is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "Summons Sandstorm; If Sanstorm is active, this Pokemon heals 1/16 of its max HP each turn.",
		onStart: function (source) {
			this.setWeather('sandstorm');
		},
		onWeather: function (target, source, effect) {
			if (effect.id === 'sandstorm') {
				this.heal(target.maxhp / 16);
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "desertcactus",
		name: "Desert Cactus",
		isNonstandard: true,
	},
	// Serene Star
	snowpower: {
		desc: "On switch-in, this Pokemon summons Hail. If Hail is active, its Attack is doubled.",
		shortDesc: "If Hail is active, this Pokemon's Attack is doubled.",
		onStart: function (source) {
			this.setWeather('hail');
		},
		onModifyAtk: function (atk, pokemon) {
			if (this.isWeather('hail')) {
				return this.chainModify(2);
			}
		},
		id: "snowpower",
		name: "Snow Power!",
		isNonstandard: true,
	},	
// Felix
	luckynumberseven: {
		shortDesc: "This Pokemon's moves have their accuracy doubled.",
		onSourceModifyAccuracy: function (accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('enhancing accuracy');
			return accuracy * 2;
		},
		id: "luckynumberseven",
		name: "Lucky Number Seven",
		isNonstandard: true,
	},	
	// Nappa
	heroswill: {
		desc: "If this Pokemon is a Gallade, it will transform into Mega Gallade before using a physical or special attack. After using the attack, if this Pokemon was originally in its base forme, it will transform back into Gallade.",
		shortDesc: "Transforms into Mega Gallade before attacking, then reverts to a Gallade.",
		id: "heroswill",
		name: "Hero's Will",
		isNonstandard: true,
		onPrepareHit: function (source, target, move) {
			if (!target || !move) return;
			if (source.template.baseSpecies !== 'Gallade' || source.transformed) return;
			if (target !== source && move.category !== 'Status') {
				source.formeChange('Gallade-Mega', this.effect);
			}
		},
		onAfterMove: function (pokemon, move) {
			if (pokemon.template.baseSpecies !== 'Gallade' || pokemon.transformed) return;
			pokemon.formeChange('Gallade', this.effect);
		},
	},
  	// Skyla
	psychicshield: {
		desc: "This Pokemon cannot be afficted with status conditions, Taunt and Attract and prevents other Pokemon from lowering this Pokemon's stat stages.",
		shortDesc: "Prevent stats lowered; protects statuses.",
		id: "psychicshield",
		name: "Psychic Shield",
		isNonstandard: true,
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Psychic Shield');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Psychic Shield');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Psychic Shield');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit: function (pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Psychic Shield');
				return null;
			}
		},
		onSetStatus: function (status, target, source, effect) {
				if (effect && effect.status) this.add('-immune', target, '[from] ability: Psychic Shield');
				return false;
		},
		onTryAddVolatile: function (status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Psychic Shield');
				return null;
			}
		},
		onBoost: function (boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			for (let i in boost) {
				// @ts-ignore
				if (boost[i] < 0) {
					// @ts-ignore
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !effect.secondaries) this.add("-fail", target, "unboost", "[from] ability: Psychic Shield", "[of] " + target);
		},
	},
  // Kris Tami
  	chaosinnation: {
		desc: "On switch-in, this Pokemon harshly lowers the Defense, Special Defense and Speed of adjacent opposing Pokemon by 2 stages. Pokemon behind a substitute are immune.",
		shortDesc: "On switch-in, this Pokemon harshly lowers Def, SpD and Spe of opponents by 2 stages.",
		onStart: function (pokemon) {
			let activated = false;
			for (const target of pokemon.side.foe.active) {
				if (!target || !this.isAdjacent(target, pokemon)) continue;
				if (!activated) {
					this.add('-ability', pokemon, 'Chaos Innation', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({def: -2}, target, pokemon);
					this.boost({spd: -2}, target, pokemon);
					this.boost({spe: -2}, target, pokemon);
				}
			}
		},
		id: "chaosinnation",
		name: "Chaos Innation",
		isNonstandard: true,
	},
	// Crystal
	mistyguard: {
		desc: "As it switches in, this Pokemon summons Mist.",
		shortDesc: "On switch-in, this Pokemon Summons Mist.",
		id: "mistyguard",
		name: "Misty Guard",
		isNonstandard: true,
		onStart: function (pokemon) {
			pokemon.side.addSideCondition('mist');
		},
	},
	// Shade Master
	dimensionalchange: {
		desc: "If this Pokemon is a Giratina, it changes to an Origin Forme before attempting to use an attacking move, and changes to Alternate Forme before attempting to use Recover.",
		shortDesc: "If Giratina, changes Forme to Origin before attacks and Alternate before Recover.",
		id: "dimensionalchange",
		name: "Dimensional Change",
		isNonstandard: true,
		onBeforeMovePriority: 0.5,
		onBeforeMove: function (attacker, defender, move) {
			if (attacker.template.baseSpecies !== 'Giratina' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'recover') return;
			let targetSpecies = (move.id === 'recover' ? 'Giratina' : 'Giratina-Origin');
			if (attacker.template.species !== targetSpecies) attacker.formeChange(targetSpecies);
		},
	},
	// Bulk-Up Man
	earthforce: {
		shortDesc: "On switch-in, this Pokemon avoids all Water and Grass-type attacks.",
		onTryHit: function (target, source, move) {
			if (move.type === 'Water' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Earth Force');
				return null;
			}
			if (move.type === 'Grass' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Earth Force');
				return null;
			}
		},
		id: "earthforce",
		isNonstandard: true,
		name: "Earth Force",
	},
	destinysfire: {
		desc: "If Sunny Day is active, this Pokemon's Attack is doubled.",
		shortDesc: "If Sunny Day is active, this Pokemon's Attack is doubled.",
		id: "destinysfire",
		name: "Destiny's Fire",
		isNonstandard: true,
		onModifyAtk: function (atk) {
			if (this.isWeather(['sunnyday', 'desolateland'])) {
				return this.chainModify(2);
			}
		},
	},
	// Forte
	quickstart: {
		desc: "As this Pokemon switches in, its Attack and Speed are doubled for 5 turns. After five turns have passed, these effects are removed.",
		shortDesc: "On switch-in, this Pokemon's Attack and Speed are doubled for 5 turns.",
		id: "quickstart",
		name: "Quick Start",
		isNonstandard: true,
		onStart: function (pokemon) {
			pokemon.addVolatile('quickstart');
		},
		onEnd: function (pokemon) {
			delete pokemon.volatiles['quickstart'];
			this.add('-end', pokemon, 'Quick Start', '[silent]');
		},
		effect: {
			duration: 5,
			onStart: function (pokemon) {
				this.add('-activate', pokemon, 'ability: Quick Start');
				this.add('-start', pokemon, 'Quick Start', '[silent]');
				this.add('-message', `${pokemon.name} can get it going.`);
			},
			onModifyAtkPriority: 5,
			onModifyAtk: function (atk, pokemon) {
				return this.chainModify(2);
			},
			onModifySpe: function (spe, pokemon) {
				return this.chainModify(2);
			},
			onEnd: function (pokemon) {
				this.add('-end', pokemon, 'Quick Start', '[silent]');
				this.add('-message', `${pokemon.name}'s Quick Start has ended.`);
			},
		},
	},
	// White
	instantvictory: {
		desc: "Has a %5 chance to forcibly give the user's trainer the win upon hitting the target.",
		shortDesc: "%5 chance to win.",
		onModifyMove: function (move) {
			if (!move.secondaries) {
				move.secondaries = [];
			}
			move.secondaries.push({
				chance: 5,
		    onHit: function (target, source) {
            this.win(source.side);
			}
			});
		},
		id: "instantvictory",
		name: "Instant Victory",
		isNonstandard: true,
	},
	// Lorica
	frosttouch: {
		shortDesc: "30% chance a Pokemon making contact with this Pokemon will be frozen.",
		onAfterDamage: function (damage, target, source, move) {
			if (move && move.flags['contact']) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('frz', target);
				}
			}
		},
		isNonstandard: true,
		id: "frosttouch",
		name: "Frost Touch",
	},
	// Alphus
	shockpuppet: {
		desc: "If this Pokemon is a Ninjask, the first hit it takes in battle deals 0 neutral damage. Its disguise is then broken, and it transforms into a Shedinja. Confusion damage also breaks the disguise. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Ninjask: the first hit it takes in battle deals 0 damage.",
		id: "shockpuppet",
		name: "Shock Puppet",
		isNonstandard: true,
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
			if (effect && effect.effectType === 'Move' && target.template.speciesid === 'ninjask' && !target.transformed) {
				this.add('-activate', target, 'ability: Shock Puppet');
				this.effectData.busted = true;
				return 0;
			}
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target) return;
			if (target.template.speciesid !== 'ninjask' || target.transformed || (target.volatiles['substitute'] && !(move.flags['authentic'] || move.infiltrates))) return;
			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid === 'ninjask' && this.effectData.busted) {
				let templateid = 'Shedinja';
				pokemon.formeChange(templateid, this.effect, true);
				this.add('-message', `${pokemon.name || pokemon.species}'s true identity was revealed!`);
				pokemon.setAbility('Wonder Guard');
				this.add('-message', `${pokemon.name || pokemon.species} now has a Wonder Guard!`);
			}
		},
	isUnbreakable: true,
	},
	// Lyrica
	aurorasurge: {
		desc: "On switch-in, this Pokemon summons Aurora Terrain.",
		shortDesc: "On switch-in, this Pokemon summons Aurora Terrain.",
		id: "aurorasurge",
		name: "Aurora Surge",
		isNonstandard: true,
		onStart: function () {
			this.setTerrain('auroraterrain');
		},
	},
	// Gyl
	fireaura: {
		desc: "While this Pokemon is active, the power of Fire-type moves used by active Pokemon is multiplied by 1.33.",
		shortDesc: "While this Pokemon is active, a Fire move used by any Pokemon has 1.33x power.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Fire Aura');
			this.add('-message', `${pokemon.name} is radiating a fire aura!`);
		},
		onAnyBasePower: function (basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fire') return;
			if (!move.auraBooster) move.auraBooster = this.effectData.target;
			if (move.auraBooster !== this.effectData.target) return;
			return this.chainModify([move.hasAuraBreak ? 0x0C00 : 0x1547, 0x1000]);
		},
		isUnbreakable: true,
		isNonstandard: true,
		id: "fireaura",
		name: "Fire Aura",
	},
	// Jady
	extremethickfat: {
		desc: "If a Pokemon uses a Fire- or Ice-type attack against this Pokemon, that Pokemon's attacking stat is weaken severely when calculating the damage to this Pokemon.",
		shortDesc: "Fire/Ice-type moves against this Pokemon deal damage with a severely weakened attacking stat.",
		onModifyAtkPriority: 6,
		onSourceModifyAtk: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Extreme Thick Fat weaken');
				return this.chainModify(0.1);
			}
		},
		onModifySpAPriority: 5,
		onSourceModifySpA: function (atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Extreme Thick Fat weaken');
				return this.chainModify(0.1);
			}
		},
		id: "extremethickfat",
		name: "Extreme Thick Fat",
		isNonstandard: true,
	},
	// Waylon
	dragonsedge: {
		shortDesc: "This Pokemon is immune to super-effective moves.",
		onTryHit: function (target, source, move) {
			if (target.runEffectiveness(move) == 1) {
				this.add('-immune', target, '[from] ability: Dragon\'s Edge');
				return null;
			}
		},
		id: "dragonsedge",
		name: "Dragon's Edge",
		isNonstandard: true,
	},	
	// Zig
	voltshocker: {
		desc: "This Pokemon's Normal-type moves become Electric-type moves and have their power multiplied by 1.2. In addition, this Pokemon is immune to Electric-type moves and raises its Speed by 2 stages when hit by an Electric-type move.",
		shortDesc: "Normal-type moves become Electric with 1.2x power; Electric hits raises speed by 2.",
		onModifyMovePriority: -1,
		onModifyMove: function (move, pokemon) {
			if (move.type === 'Normal' && !['judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'weatherball'].includes(move.id) && !(move.isZ && move.category !== 'Status')) {
				move.type = 'Electric';
				move.galvanizeBoosted = true;
			}
		},
		onBasePowerPriority: 8,
		onBasePower: function (basePower, pokemon, target, move) {
			if (move.galvanizeBoosted) return this.chainModify([0x1333, 0x1000]);
		},
		onTryHit: function (target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({spe: 2})) {
					this.add('-immune', target, '[from] ability: Volt Shocker');
				}
				return null;
			}
		},
		id: "voltshocker",
		name: "Volt Shocker",
		isNonstandard: true,
	},	
	// Poppy Seed
	weakbinder: {
		desc: "Raises Accuracy and Evasion by 2 stages if this Pokemon is hit by a super-effective move.",
		shortDesc: "Raises Accuracy and Evasion by 2 stages when hit by supereffective moves.",
		id: "weakbinder",
		name: "Weak Binder",
		isNonstandard: true,
		onHit: function (target, source, move) {
			if (target.hp && move.category !== 'Status' && !move.damage && !move.damageCallback && move.typeMod > 0) {
				this.boost({accuracy: 2, evasion: 2});
			}
		},
	},
	// Mirica
	fantasysurge: {
		shortDesc: "On switch-in, this Pokemon summons Fantasy Mist.",
		onStart: function (pokemon) {
			pokemon.side.addSideCondition('fantasymist');
		},
		id: "fantasysurge",
		name: "Fantasy Surge",
		isNonstandard: true,
	},	
	//Montgomery
	"burningheal": {
		desc: "If this Pokemon is burned, it restores 1/8 of its maximum HP, rounded down, at the end of each turn instead of losing HP.",
		shortDesc: "This Pokemon is healed by 1/8 of its max HP each turn when burned; no HP loss.",
		onDamagePriority: 1,
		onDamage: function (damage, target, source, effect) {
			if (effect.id === 'brn') {
				this.heal(target.maxhp / 8);
				return false;
			}
		},
		id: "burningheal",
		name: "Burning Heal",
	},
	//Millennium
	coloraura: {
		desc: "If this Pokemon is an Arceus, its type changes to match its held Plate, Jewel or Z-Crystal, and it is immune to Normal and same-type moves.",
		shortDesc: "Arceus: type matches held Plate, Jewel or Z-Crystal; immunity to Normal and its own type.",
		// Color Aura's type-changing itself is implemented in statuses.js
		id: "coloraura",
		name: "Color Aura",
		isNonstandard: true,
		onTryHit: function (target, source, move) {
			let plateType = this.getItem(target.item).onPlate;
			if (target !== source && (move.type === 'Normal' || plateType === move.type)) {
				this.add('-immune', target, '[from] ability: Color Aura');
				return null;
			}
		}
	},
	// Zatch
	prismpower: {
		desc: "This Pokemon's attacks that are super effective against the target do 1.25x damage. This Pokemon receives 3/4 damage from supereffective attacks. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "3/4 damage from supereffectives; Boosts user's supereffective damage.",
		onModifyDamage: function (damage, source, target, move) {
			if (move && move.typeMod > 0) {
				return this.chainModify([0x1400, 0x1000]);
			}
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		isUnbreakable: true,
		id: "prismpower",
		name: "Prism Power",
		isNonstandard: true,
	},
	// Omega Sheron
	overdrive: {
		desc: "This Pokemon's moves and their effects ignore the Abilities of other Pokemon. This Pokemon can only be damaged by direct attacks. Curse and Substitute on use, Belly Drum, Pain Split, Struggle recoil, and confusion damage are considered direct damage. This Pokémon resists any type of move, including ones it is weak to. This Pokemon's attacking stat is multiplied by 1.5. This Pokemon has its major status condition cured when it switches out. This Pokemon restores 1/2 of its maximum HP, rounded down, when it switches out. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "Has many things.",
		onStart: function (pokemon) {
			this.add('-ability', pokemon, 'Overdrive');
			this.add('-message', `${pokemon.name}'s powers are surging in its aura!`);
		},
		onModifyMove: function (move) {
			move.ignoreAbility = true;
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onSwitchOut: function (pokemon) {
			pokemon.heal(pokemon.maxhp / 2);
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.status) return;
			pokemon.setStatus('');
		},
		onEffectiveness: function (typeMod, target) {
			return -1;
		},
		onModifyAtkPriority: 6,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 6,
		onModifySpA: function (spa, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
		isUnbreakable: true,
		id: "overdrive",
		name: "Overdrive",
		isNonstandard: true,
	},
/////////////////////////Modified Abilities
/////////////////////////Making Wonder Guard immune to Mold Breaker and its variants. Super-effective moves, Miracle Hold, Double Dragon, Multi-Breaker and Z-Raider can only damage Alphus.
	wonderguard: {
		inherit: true,
		desc: "This Pokemon can only be damaged by supereffective moves. Immune to indirect damage moves. It cannot be confused. Gaining this Ability while confused cures it. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Miracle Cure');
				pokemon.removeVolatile('confusion');
			}
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
			if (pokemon.volatiles['leechseed']) {
				this.add('-activate', pokemon, 'ability: Seed Guard');
				pokemon.removeVolatile('leechseed');
				// Taunt's volatile already sends the -end message when removed
			}
			if (pokemon.volatiles['partiallytrapped']) {
				this.add('-activate', pokemon, 'ability: Shard Shell');
				pokemon.removeVolatile('partiallytrapped');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion' || status.id === 'yawn') return null;
		},
		onHit: function (target, source, move) {
			if (move && move.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Wonder Guard');
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm' || type === 'hail') return false;
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onTryHit: function (target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'miraclehold' || move.id === 'powercontrol' || move.id === 'doubledragon' || move.id === 'zraider' || move.id === 'multibreaker' || move.id === 'struggle') return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[from] ability: Wonder Guard');
				return null;
			}
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		isUnbreakable: true,
	},
};

exports.BattleAbilities = BattleAbilities;
