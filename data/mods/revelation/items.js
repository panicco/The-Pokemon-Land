'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	//From the PKLand Team
	choicespike: {
		id: "choicespike",
		name: "Choice Spike",
		fling: {
			basePower: 10,
		},
		onStart: function (pokemon) {
			if (pokemon.volatiles['choicelock']) {
				this.debug('removing choicelock: ' + pokemon.volatiles.choicelock);
			}
			pokemon.removeVolatile('choicelock');
		},
		onModifyMove: function (move, pokemon) {
			pokemon.addVolatile('choicelock');
		},
		isChoice: true,
		desc: "Makes the user can only select the first move it executes.",
	},
	//Original Items
	safenecklace: {
		id: "safenecklace",
		name: "Safe Necklace",
		fling: {
			basePower: 40,
		},
			onSetStatus: function (status, target, source, effect, move) {
				if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'item: Safe Necklace');
						this.add('-message', `${target.name} is not affected by ${move.name} thanks to its Safe Necklace!`);
					}
					return null;
				}
			},
			onTryAddVolatile: function (status, target, source, effect, move) {
				if ((status.id === 'confusion' || status.id === 'yawn') && source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'item: Safe Necklace');
					this.add('-message', `${target.name} is not affected by ${move.name} thanks to its Safe Necklace!`);
					return null;
				}
			},
		desc: "Makes the user immune to statuses and confusion.",
	},
	auroradrop: {
		id: "auroradrop",
		name: "Aurora Drop",
		fling: {
			basePower: 130,
		},
			onSetStatus: function (status, target, source, effect, move) {
				if (source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'item: Aurora Drop');
						this.add('-message', `${target.name} is not affected by ${move.name} thanks to its Aurora Drop!`);
					}
					return null;
				}
			},
			onTryAddVolatile: function (status, target, source, effect, move) {
				if ((status.id === 'confusion' || status.id === 'yawn') && source && target !== source && effect && (!effect.infiltrates || target.side === source.side)) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'item: Aurora Drop');
					this.add('-message', `${target.name} is not affected by ${move.name} thanks to its Aurora Drop!`);
					return null;
				}
			},
		onTryHit: function (pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-activate', pokemon, 'item: Aurora Drop');
				this.add('-message', `${pokemon.name} is not affected by ${move.name} thanks to its Aurora Drop!`);
				return null;
			}
		},
		onDamage: function (damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				return false;
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'attract') return false;
			if (type === 'sandstorm' || type === 'hail') return false;
		},
		onSwitchOut: function (pokemon) {
			if (!pokemon.status) return;
			pokemon.setStatus('');
			pokemon.heal(pokemon.maxhp / 2);
		},
		onModifySpDPriority: 2,
		onModifySpD: function (spd, pokemon) {
				return this.chainModify(2);
		},
		onModifyDefPriority: 2,
		onModifyDef: function (def, pokemon) {
				return this.chainModify(2);
		},
		onModifyAtkPriority: 2,
		onModifyAtk: function (atk, pokemon) {
				return this.chainModify(2);
		},
		onModifySpAPriority: 2,
		onModifySpA: function (spa, pokemon) {
				return this.chainModify(2);
		},
		desc: "Makes the user immune to statuses, confusion, leech seed, indirect damages, taunt, torment, attract, etc. Also doubles the attacking power and defensive moves and will cure status and restore the half of its HP upon switching out.",
	},
};

exports.BattleItems = BattleItems;
