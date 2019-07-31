'use strict';

/**@type {{[k: string]: ModdedAbilityData}} */
let BattleAbilities = {
	effortless: {
		shortDesc: "When this Pokemon's stat stages are raised or lowered, the effect is tripled instead.",
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 3;
			}
		},
		id: "effortless",
		name: "Effortless",
		isNonstandard: true,
	},
	sandheal: {
		desc: "If Sandstorm is active, this Pokemon restores 1/16 of its maximum HP, rounded down, at the end of each turn. This Pokemon takes no damage from Sandstorm.",
		shortDesc: "If Sandstorm is active, this Pokemon heals 1/16 of its max HP each turn; immunity to Sandstorm.",
		onWeather: function (target, source, effect) {
			if (effect.id === 'sandstorm') {
				this.heal(target.maxhp / 16);
			}
		},
		onImmunity: function (type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		id: "sandheal",
		name: "Sand Heal",
		isNonstandard: true,
	},
	mindawakening: {
		desc: "If this Pokemon, but not its substitute, is struck by a critical hit, its Special Attack is raised by 12 stages.",
		shortDesc: "If this Pokemon (not its substitute) takes a critical hit, its Special Attack is raised 12 stages.",
		onHit: function (target, source, move) {
			if (!target.hp) return;
			if (move && move.effectType === 'Move' && move.crit) {
				target.setBoost({spa: 6});
				this.add('-setboost', target, 'spa', 12, '[from] ability: Mind Awakening');
			}
		},
		id: "mindawakening",
		name: "Mind Awakening",
		isNonstandard: true,
	},
	miracleguard: {
		desc: "This Pokemon can only be damaged by supereffective moves. Immune to indirect damage moves. It cannot be confused. Gaining this Ability while confused cures it. Moongeist Beam, Sunsteel Strike, and the Mold Breaker, Teravolt, and Turboblaze Abilities cannot ignore this Ability.",
		shortDesc: "This Pokemon can only be damaged by supereffective moves.",
		onUpdate: function (pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Miracle Cure');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile: function (status, pokemon) {
			if (status.id === 'confusion') return null;
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
			if (target === source || move.id === 'struggle'|| move.id === 'liberation') return;
			this.debug('Miracle Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0) {
				this.add('-immune', target, '[from] ability: Miracle Guard');
				return null;
			}
		},
		isUnbreakable: true,
		id: "miracleguard",
		name: "Miracle Guard",
		isNonstandard: true,
	},
	typeshift: {
		desc: "If this Pokemon is an X-Type, its type changes to match the type of the last move that hit it, unless that type is already one of its types. This effect applies after all hits from a multi-hit move; Sheer Force prevents it from activating if the move has a secondary effect. The type also changes to match the type of the move it is about to use. This effect comes after all effects that change a move's type. X-Type changes forme while using this ability.",
		shortDesc: "X-Type: Changes type and form when hit or use move.",
		onPrepareHit: function (source, target, move) {
			if (move.hasBounced) return;
			let type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
			let template = this.getTemplate('X-Type-' + type);
				if (!source.formeChange(template, this.getAbility('typeshift'), true)) return;
				this.add('-message', `${source.name} transformed into a ${type}-type!`);
			}
		},
		onAfterMoveSecondary: function (target, source, move) {
			if (!target.hp) return;
			let type = move.type;
			if (target.isActive && move.effectType === 'Move' && move.category !== 'Status' && type !== '???' && !target.hasType(type)) {
			let template = this.getTemplate('X-Type-' + type);
			if (!target.formeChange(template, this.getAbility('typeshift'), true)) return false;				
				this.add('-message', `${target.name} transformed into a ${type}-type!`);

				if (target.side.active.length === 2 && target.position === 1) {
					const action = this.willMove(target);
				}
			}
		},
		id: "typeshift",
		name: "Type Shift",
		isNonstandard: true,
	},
};

exports.BattleAbilities = BattleAbilities;
