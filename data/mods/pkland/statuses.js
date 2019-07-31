'use strict';

/**@type {{[k: string]: ModdedEffectData}} */
let BattleStatuses = {
	static: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Static:</b> Static's the name, power's my game\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Static:</b> What a switchout\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Static:</b> I'll see you folks later\!`);
		},
	},
	erika: { // No single quotes causes issues
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Erika:</b> I wanted to know who you are\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Erika:</b> I'm just a little Eevee, sir or madam.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Erika:</b> I'm very serious that you've offended me.`);
		},
	},
	aqua: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Water'];
			this.add(`raw|<b>Aqua:</b> Remember me, ladies and gentlemen?`);
		    this.add('-start', source, 'typechange', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Aqua:</b> I'll let my pal to take over me.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Aqua:</b> Have a nice day.`);
		},
	},
	mizzy: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Fairy', 'Psychic'];
			this.add(`raw|<b>Mizzy:</b> What's up, frosty flakes?`);
		    this.add('-start', source, 'typechange', 'Fairy/Psychic');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mizzy:</b> Be right back, going to the Walmart store.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mizzy:</b> Never send a Wigglytuff to that dimension again\!`);
		},
		onSourceModifyDamage: function (damage, source, target, move) {
			if (move.typeMod > 0 && !target.illusion) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
     			this.add(`raw|<b>Mizzy:</b> Nothing can stand my Prism Armor power though.`);
			}
		},
	},
	zena: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Zena:</b> Did you call me out?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zena:</b> I'm made of 60 percent of cells\!`);
		},
		onFaint: function (pokemon) {
			let activeMon = pokemon.side.foe.active[0].template.speciesid;
			if (activeMon === 'mew') {
				this.add(`raw|<b>Zena:</b> You're going to miss me Aqua, cuz I QUIT\!`);
				this.add(`raw|<b>Aqua:</b> You can quit all ya want to! XD`);
			} else if (activeMon === 'victini') {
				this.add(`raw|<b>Zena:</b> When I see that guy, I think of a white Victini\!`);
			} else {
				this.add(`raw|<b>Zena:</b> Have a great good-bye\!`);
			}
		},
	},
	kyle: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kyle:</b> I'll show you\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kyle:</b> Too hard for me to stop\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Kyle:</b> We should play that again sometime\!`);
		},
	},
	serenestar: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Serene Star:</b> The world's famous admin of the Messies is here\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Serene Star:</b> I have to go to the bathroom.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Serene Star:</b> Not your average ice master.`);
		},
	},
	goby: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Goby:</b> My underwear is made of bologna\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Goby:</b> Time to go loco\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Goby:</b> I'm happy and I'm proud\!`);
		},
	},
	thehound: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Mr. Burns:</b> Smithers, release this hound\!`);
			this.add(`raw|<b>Smithers:</b> Yes, Mr. Burns.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<i>The Hound prepared to switch herself.</i>`);
		},
		onFaint: function () {
			this.add(`raw|<i>The Hound falls over.</i>`);
		},
	},
	felix: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Felix:</b> Felix the Meowth! The Wondeful Wonderful Meowth\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Felix:</b> Come to think of it, I don't even know if I could get back there myself.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Felix:</b> Righty-O\!`);
		},
	},
	chuck: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Chuck:</b> I didn't do much fight in here anyway...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Chuck:</b> I'll check out my pals.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Chuck:</b> How is this possible?`);
		},
	},
	abby: {
		noCopy: true,
		onStart: function (target, source) {
			this.add(`raw|<b>Abby:</b> Bangin' on a trash can, drummin' on a street light...`);
      			if (source.template.speciesid !== 'altariamega' || source.illusion) return;
			     source.types = ['Dragon', 'Fairy', 'Water'];
			     this.add('-start', source, 'typeadd', 'Water');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Abby:</b> To avoid music damage, I have to switch my banjo to a keyboard\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Abby:</b> OK, I'll stop playing music\!`);
		},
	},
	nappa: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Nappa:</b> I, for one, welcome our new Fighting-type overlords\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Nappa:</b> We'll be back in a moment, so stay tuned\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Nappa:</b> And that's for today's news.`);
		},
	},
	gidget: {
		noCopy: true,
		onStart: function (target) {
			this.add(`raw|<b>Gidget:</b> Go-Go Gidget Transform\!`);
			if (target.illusion) return;

			/** @type {{[forme: string]: string[]}} */
			let formes = {
				'Blastoise': ['Flamethrower', 'Ice Beam', 'Earth Power', 'Gidget Blast'],
				'Charizard': ['Seed Flare', 'Wing Attack', 'Earthquake', 'Gidget Blast'],
				'Venusaur': ['Water Spout', 'Sludge Bomb', 'Moonblast', 'Gidget Blast'],
				'Feraligatr': ['Ice Beam', 'Crunch', 'Meteor Mash', 'Gidget Blast'],
				'Typhlosion': ['Psychic Fangs', 'Solar Beam', 'Sunny Day', 'Gidget Blast'],
				'Meganium': ['Thunderbolt', 'Ancient Power', 'Earthquake', 'Gidget Blast'],
				'Swampert': ['Gunk Shot', 'Hammer Arm', 'Ice Punch', 'Gidget Blast'],
				'Blaziken': ['Shadow Sneak', 'Close Combat', 'Thunder Punch', 'Gidget Blast'],
				'Sceptile': ['Blue Flare', 'Dragon Pulse', 'Ancient Power', 'Gidget Blast'],
				'Empoleon': ['Psychic', 'Flash Cannon', 'Aura Sphere', 'Gidget Blast'],
				'Infernape': ['Seed Flare', 'Cross Chop', 'Dark Pulse', 'Gidget Blast'],
				'Torterra': ['Rock Slide', 'Earthquake', 'Volt Switch', 'Gidget Blast'],
				'Samurott': ['Earthquake', 'Sacred Sword', 'Swords Dance', 'Gidget Blast'],
				'Emboar': ['Foul Play', 'Close Combat', 'Thunder Punch', 'Gidget Blast'],
				'Serperior': ['Water Pulse', 'Ancient Power', 'Psystrike', 'Gidget Blast'],
				'Greninja': ['Earth Power', 'Dark Pulse', 'Gunk Shot', 'Gidget Blast'],
				'Delphox': ['Shadow Ball', 'Psychic', 'Moonblast', 'Gidget Blast'],
				'Chesnaught': ['Thunder Punch', 'Close Combat', 'Dark Pulse', 'Gidget Blast'],
				'Primarina': ['Ice Beam', 'Moonblast', 'Earthquake', 'Gidget Blast'],
				'Incineroar': ['Play Rough', 'Foul Play', 'Grass Knot', 'Gidget Blast'],
				'Decidueye': ['Close Combat', 'Phantom Force', 'Rock Slide', 'Gidget Blast'],
			};
			let forme = Object.keys(formes)[this.random(21)];
			this.add(`-anim`, target, 'Geomancy', target);
			target.formeChange(forme);
			this.add('-message', `${target.name} transformed into a ${forme}\!`);
			target.setAbility('Limber');
			// Update movepool
			target.moveSlots = [];
			if (!formes[forme]) throw new Error(`Can't find moveset for Gidget's forme: "${forme}".`); // should never happen
			for (const [i, moveid] of formes[forme].entries()) {
				let move = this.getMove(moveid);
				if (!move.id) continue;
				target.moveSlots.push({
					move: move.name,
					id: move.id,
					// @ts-ignore hacky change for Gidget's set
					pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (target.ppPercentages ? target.ppPercentages[i] : 1)),
					maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					used: false,
					virtual: true,
				});
				target.moves.push(move.id);
			}
		},
		onBeforeSwitchOut: function (pokemon) {
			if (pokemon.illusion) return;
			// @ts-ignore hacky change for Gidget's set
			pokemon.ppPercentages = pokemon.moveSlots.slice().map(m => {
				return m.pp / m.maxpp;
			});
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gidget:</b> I'll be here in a moment! Don't worry\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gidget:</b> It's simple if my name isn't Gadget\!`);
		},
	},
	sedna: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Sedna:</b> Today's logic: Gravity\!`);
			if (source.illusion) return;
			this.addPseudoWeather('gravity', source);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Sedna:</b> I'm gonna work on a Sky Dance accademy.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sedna:</b> And now I'm going home. :(`);
		},
	},
	skyla: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Skyla:</b> Good luck and have fun\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Skyla:</b> Have a nice day, darling\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Skyla:</b> I'll do my best\!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
	},
	kristami: {
		noCopy: true,
		onStart: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Kris Tami:</b> Think you're going to challenge me, ${foe.name}?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Kris Tami:</b> Good luck if you need me\!`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Kris Tami:</b> Great job, ${foe.name}!`);
		},
	},
	sekka: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Sekka:</b> It's Sekka's time to shine\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Sekka:</b> I had enough time for this\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Sekka:</b> But I've tried my best\!`);
		},
	},
	leonas: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Leonas:</b> No matter how hard I've tried\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Leonas:</b> Send me a card if you have time\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Leonas:</b> I have to go! Bye\!`);
		},
		// Simple Innate
		onBoost: function (boost, target, source, effect) {
			if (source.illusion) return;
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= 2;
			}
		},
	},
	anabelle: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Water', 'Psychic', 'Fairy'];
			this.add(`raw|<b>Anabelle:</b> I have a one-off start\!`);
			if (source.illusion) return;
			this.boost({spa: 3}, source);
			this.add('-start', source, 'typeadd', 'Fairy');
		},
		onSwitchOut: function () {
			this.add(`raw|<i>Anabelle summons an another friend of hers.</i>`);
		},
		onFaint: function () {
			this.add(`raw|<b>Anabelle:</b> I'm seriously missing the point\!`);
		},
	},
	crystal: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ["Water", "Ice"];
			this.add(`raw|<b>Crystal:</b> I\ll be using a Quiver Dance for you\!`);
      this.add('-anim', source, "Quiver Dance", source);
			this.add('-start', source, 'typeadd', 'Ice');
		},
		onMoveFail: function () {
			this.add(`raw|<b>Crystal:</b> Something's not right\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Crystal:</b> Seriously!?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Crystal:</b> I decided to come back for more\!`);
		},
	},
	speedy: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Speedy:</b> Cowabunga, man\!`);
			if (pokemon.illusion) return;
			this.boost({spe: 3}, pokemon);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Speedy:</b> Have fun and safe at PK Land\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Speedy:</b> Great game\!`);
		},
		// Huge Power innate
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk) {
			return this.chainModify(2);
		},
	},
	goldhooh: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gold Ho-Oh:</b> Welcome, ladies and gentlemen.`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Gold Ho-Oh:</b> Dare to switch out of me?`);
			if (pokemon.illusion) return;
			// Innate - heals 40% on switch out
			pokemon.heal(pokemon.maxhp * 0.2);
		},
		onFaint: function () {
			this.add(`raw|<b>Gold Ho-Oh:</b> I've own you a happy life.`);
		},
	},
	ajthekeldeo: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>AJ the Keldeo:</b> No fun here! =^u^=`);
			if (source.illusion) return;
			let target = source.side.foe.active[0];

			let removeAll = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb'];
			let silentRemove = ['reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist'];
			for (const sideCondition of removeAll) {
				if (target.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) this.add('-sideend', target.side, this.getEffect(sideCondition).name, '[from] move: No Fun Zone', '[of] ' + source);
				}
				if (source.side.removeSideCondition(sideCondition)) {
					if (!(silentRemove.includes(sideCondition))) this.add('-sideend', source.side, this.getEffect(sideCondition).name, '[from] move: No Fun Zone', '[of] ' + source);
				}
			}
			this.add('-clearallboost');
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (pokemon && pokemon.isActive) pokemon.clearBoosts();
				}
			}
			for (const clear in this.pseudoWeather) {
				if (clear.endsWith('mod') || clear.endsWith('clause')) continue;
				this.removePseudoWeather(clear);
			}
			this.clearWeather();
			this.clearTerrain();
		},
		onFaint: function () {
			this.add(`raw|<b>AJ the Keldeo:</b> Tell CJ to say hi\!`);
		},
	},
	shademaster: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehehe!\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehehehehehe!\!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Shade Master:</b> Nyhehehhehehehehehehehe!\!`);
		},
	},
	bulkupman: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Hey you\! Adults only\! Kids don't belong here\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You better go there before I got hurt\!`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> Am I blinded like this?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Bulk-Up Man:</b> You idiot\! What if my brother sees me? He'll be mad at me getting injured like that\!`);
		},
	},
	gemini: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gemini:</b> Intruders... bad... E-li-mi-nate intruders...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gemini:</b> Negative. Must... eliminate. Eliminate. Eliminate...`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Gemini:</b> Must... eliminate. Eliminate.`);
            this.add('-anim', source, "Explosion", source);
			this.add('message', 'Gemini exploded!');
		},
	},
	max: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<i>Plays some bubblegum dance music in a background.</i>`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Max:</b> Some funny things happen when I use moves.`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Max:</b> Geez! I'm surrounded by morons!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(1.5);
			}
		},
	},
	naru: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Naru:</b> Hi gays - I mean, guys!`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Naru:</b> OOOOOOOOOOOOOOOOOHHHHHH NOOOOOOOOOOOOOO!!!`);
		},
	},
	kasandra: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Kasandra:</b> Fathers lock your sons, cuz Kasandra's in town\!`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Kasandra:</b> My pal will watch you while I'm away.`);
			// @ts-ignore Hack for Kasandra's move
			if (pokemon.visionHP) delete pokemon.visionHP;
		},
		onFaint: function () {
			this.add(`raw|<b>Kasandra:</b> How did you know that I am a impersonator!?`);
		},
		onDamage: function (damage, pokemon) {
			// @ts-ignore Hack for Kasandra's move
			if (!pokemon.visionHP) return;
			// Prevent Kasandra from fainting while using a fake vision to prevent visual bug
			if (pokemon.hp - damage <= 0) return (pokemon.hp - 1);
		},
		onAfterDamage: function (damage, pokemon) {
			// @ts-ignore Hack for Kasandra's move
			if (!pokemon.visionHP || pokemon.hp > 1) return;
			// Now we handle the fake vision "fainting"
			// @ts-ignore Hack for Kasandra's move
			pokemon.hp = pokemon.visionHP;
			pokemon.formeChange(pokemon.baseTemplate.id);
			// Update movepool
				let newMovep = ['darkestlariat', 'psychicfangs', 'dragondance', 'nightburst'];
				pokemon.moveSlots = [];
				for (const [i, moveid] of newMovep.entries()) {
					let move = this.getMove(moveid);
					if (!move.id) continue;
					pokemon.moveSlots.push({
						move: move.name,
						id: move.id,
						// @ts-ignore hacky way to reduce a PP
						pp: Math.floor(((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5) * (pokemon.ppPercentages ? pokemon.ppPercentages[i] : 1)),
						maxpp: ((move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5),
						target: move.target,
						disabled: false,
						used: false,
						virtual: true,
					});
					pokemon.moves.push(move.id);
				}
			this.add('message', `${pokemon.name}'s illusion was uncovered!`);
			// @ts-ignore Hack for Kasandra's move
			delete pokemon.visionHP;
			this.add('-heal', pokemon, pokemon.getHealth, '[silent]');
		},
	},
	copykatt: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Copy Katt:</b> Copy is power\!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Copy Katt:</b> Going out to McDonald's for a while.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Copy Katt:</b> I'm faded\!`);
		},
	},
	blue: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Blue:</b> Water water everywhere!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blue:</b> I'll be back before Red gets here!`);
		},
		onFaint: function (pokemon) {
			let foe = pokemon.side.foe.active[0];
			this.add(`raw|<b>Blue:</b> Darn it, ${foe.name}! I'm no good for using water powers!`);
		},
		onModifySpe: function (spe, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifySpa: function (spa, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
		onModifyAtk: function (atk, pokemon) {
			if (this.isWeather(['raindance', 'primordialsea'])) {
				return this.chainModify(2);
			}
		},
	},
	blaze: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Blaze:</b> I have a power of Fire!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blaze:</b> I'll get rid of any coolness! Just you wait!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Blaze:</b> WAAAAAAH! I'M MELTING!`);
		},
	},
	river: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>River:</b> Welcome to Wave Man's Locker!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>River:</b> I'm going to tell my sister on you.`);
		},
		onFaint: function () {
			this.add(`raw|<b>River:</b> I'm such a young Vappy!`);
		},
	},
	forte: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Forte:</b> INTRUDER DETECTED`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Forte:</b> WARP TO AN ANOTHER PLACE`);
		},
		onFaint: function () {
			this.add(`raw|<b>Forte:</b> PERMANENT DAMAGE FAILED`);
		},
	},
	nyra: {
		noCopy: true,
		onStart: function () {
			this.add(`j|Nyra`);
			this.add(`raw|<b>Nyra:</b>${["Lights, camera, chaos!", "I had something surprise for you!", "This child needs attention!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Nyra:</b>${["Just asking you.", "You need something Come up with!", "This drama needs to be stop NOW!"][this.random(3)]}`);
			this.add(`l|Nyra`);
		},
		onFaint: function (source) {
			this.add(`raw|<b>Nyra:</b> Follow my friend's profile on ${["DeviantART:<br><a href='https://www.deviantart.com/parapararevolution90'>https://www.deviantart.com/parapararevolution90</a>", "FurAffinity:<br><a href='https://www.furaffinity.net/user/crystalgenerations/'>https://www.furaffinity.net/user/crystalgenerations/</a>"][this.random(2)]}`);
			this.add(`l|Nyra`);
		},
	},
	white: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>White:</b> I'm on my way!`);
			if (pokemon.illusion) return;
            this.boost({accuracy: -3}, pokemon);
		},
		onSwitchOut: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>White:</b> Letting a desire of delivering a healing star, ${trainer}!`);
			pokemon.side.addSideCondition('shiftheal');
		},
		onFaint: function () {
			this.add(`raw|<b>White:</b> Simply faded.`);
		},
		// Contrary Innate
		onBoost: function (boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			for (let i in boost) {
				// @ts-ignore
				boost[i] *= -1;
			}
		},
	},
	alphus: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Alphus:</b> ${["Garbage dump?", "Bees and wasps?", "Moles, freckles and warts?", "Red crocodiles?", "Feather brains?", "Spinach teeth?", "Suffering succotash?", "Black cars?", "Root beer?", "Rotten eggs?", "Doggy bones?", "Mexican bandits?", "Warble flies?", "Cat whiskers?", "Bran Flakes?", "Salt and pepper wind?", "Cheese wax?", "Croaking frogs?", "Super mushrooms?", "Popcorm shrimp?"][this.random(20)]} That rings a bell! XD`);
      			if (source.template.speciesid !== 'shedinja' || source.illusion) return;
			     source.setAbility('Wonder Guard');
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Alphus:</b> Going to ${["Long John Silvers", "Walmart", "Big Lots", "Family Dollar", "KFC"][this.random(5)]} in an hour!`);
		},
		onMoveFail: function () {
			this.add(`raw|<b>Alphus:</b> Dang it missed!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Alphus:</b> I've bullied too much!`);
		},
	},
	lyrica: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Lyrica:</b> What is this? Are you trying to make me hit myself to death?`);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Lyrica:</b> I've seen better Pokémon at the Pokémon Center!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Lyrica:</b> Oh darn. You made me break a tail.`);
		},
	},
	blade: {
		noCopy: true,
		onStart: function (target, source) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'silvally') {
            this.add(`raw|<b>Sekka:</b> Blade, come with me!`);
            this.add(`raw|<b>Blade:</b> I can't. I'm on the side of my friend's!`);
            this.add(`raw|<b>Sekka:</b> If you don't come with me, I'll shut down your club as a punishment!`);
			} else {
			this.add(`raw|<b>Blade:</b> I will get a revenge on my sister!`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Blade:</b> I'm out to the target practice!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Blade:</b> I didn't have to reload my attack yet!`);
		},
	},
	slashdown: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Slashdown:</b> I am the hero that flies in the day... ${["I am the video game console that can't be soft-modded", "I am the graphic tablet that draws every night", "I am the spinach that sticks to your teeth", "I am the internet meme that always post online", "I am that Super Paper Mario game that needs to be destroyed by Christmas", "I am an anti-bacterial soap that harms germs"][this.random(6)]}... I am Slashdown!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Slashdown:</b> Do you know what affects Pokémon? THE SECRET LAIR!`);
		},
		onFaint: function () {
			this.add(`c|~KrisTami|Don't you have to be a moron somewhere else?`);
			this.add(`raw|<b>Slashdown:</b> Not until 9 PM!`);
		},
	},
	zicko: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Zicko:</b> ${["Don't go around attacking me! It's hard to be cool when you're attacking me.", "Say hello to my epic sword power!", "Fainted or not, you're coming with me!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zicko:</b> Iron Sword is FOREVER!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zicko:</b> YOU'VE BETRAYED MY ACTIONS! AAAAAAAACTIONS!`);
		},
	},
	gyro: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gyro:</b> Yo, ladies and gentlemen! It is I, Gyro!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gyro:</b> No one should lay a finger on a Butterfinger!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyro:</b> I hope you’re happy!`);
		},
	},
	merick: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Merick:</b> 🎵Every second we're together,<br>I can't believe how much it's better!🎵`);
			this.add(`raw|<b>Merick:</b> 🎵And I need you never leave you🎵`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Merick:</b> 🎵I think it's time to get up and go!🎵`);
		},
		onFaint: function () {
			this.add(`raw|<b>Merick:</b> 🎵Keep love coming!🎵`);
		},
	},
	lorica: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Lorica:</b> Don't touch me, sucker!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Lorica:</b> Mind if I do!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Lorica:</b> Urge to freeze... Fading...`);
		},
	},
	gyl: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Gyl:</b> ${["Lions rule!", "Viva los Lionels!", "Leo would be proud of this!"][this.random(3)]}`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Gyl:</b> ${["Between you and me forever!", "Don't attack me, I'm sterile!", "Hold on tight!"][this.random(3)]}`);
		},
		onFaint: function () {
			this.add(`raw|<b>Gyl:</b> Watch this clip from the 90's PBS Kids! ${["<a>https://www.youtube.com/watch?v=tU3Q4X0t2SY</a>", "<a>https://www.youtube.com/watch?v=fYg3U-iqPd0</a>", "<a>https://www.youtube.com/watch?v=syRYjXmRsp4</a>"][this.random(3)]}`);
		},
	},
	jady: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Jady:</b> I wonder who that target is...`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Jady:</b> What is the big fat idea!?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Jady:</b> But I'm not finished yet!`);
		},
		onModifyDefPriority: 6,
		onModifyDef: function (def, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD: function (spd, pokemon) {
			if (pokemon.illusion) return;
			if (!pokemon.transformed) {
				return this.chainModify(2);
			}
		},
	},
	waylon: {
		noCopy: true,
		onStart: function (target, source) {
			source.types = ['Steel', 'Flying', 'Dragon'];
			this.add(`raw|<b>Waylon:</b> What is a Pokémon? A miserable little pile of secrets!`);
			if (source.illusion) return;
			this.add('-start', source, 'typeadd', 'Dragon');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Waylon:</b> Who can say what truly motivates the Pokémon?`);
		},
		onFaint: function () {
			this.add(`raw|<b>Waylon:</b> Thanks, but my cousins are in another team!`);
		},
	},
	charlie: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Charlie:</b> Today's show is brought to you by the letter C!`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Charlie:</b> It's gonna be wild!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Charlie:</b> And remember, friends are always best!`);
		},
      ///I'll Make You Blind! Innate
		onModifyAccuracyPriority: 10,
		onModifyAccuracy: function (accuracy, target, source, move) {
			if ((move.category === 'Special' || move.category === 'Physical') && typeof move.accuracy === 'number') {
				this.debug('I\'ll Make You Blind! - setting accuracy to 50');
				return 50;
			}
		},
      ///Hit Anything! Innate
		onModifyMovePriority: -5,
		onModifyMove: function (move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Electric'] = true;
				move.ignoreImmunity['Dragon'] = true;
				move.ignoreImmunity['Psychic'] = true;
				move.ignoreImmunity['Ground'] = true;
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
	},
	zig: {
		noCopy: true,
		onStart: function (source) {
			this.add(`raw|<b>Zig:</b> Hey there, Poké-folks! This is Zig saying remember to buckle up! `);
      			if (source.template.speciesid !== 'linoone' || source.illusion) return;
			     source.types = ['Normal', 'Electric'];
			     this.add('-start', source, 'typeadd', 'Electric');
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zig:</b> Gullible Pokémon never trust a lie!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zig:</b> This is Zyg saying to run away free!`);
		},
	},
	poppyseed: {
		noCopy: true,
		onStart: function () {
			this.add(`raw|<b>Poppy Seed:</b> Hello hi, hello hi! How are you doing?`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Poppy Seed:</b> Time to watch some cartoons!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Poppy Seed:</b> I'm just fired! Seriously!`);
		},
	},
	mirica: {
		noCopy: true,
		onStart: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>Mirica:</b> ${trainer} is my best friend ever.`);
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Mirica:</b> Kentucky serves best of its rights in the world.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Mirica:</b> Omega Sheron is forever, and my savior.`);
			this.add(`raw|<b>Mirica:</b> !dt Omega Sheron`);
			this.add(`raw|<ul class="utilichart"><li class="result"><span class="col numcol">Uber</span> <span class="col iconcol"><span class="picon" style="background: transparent ur (&quot;//play.pokemonshowdown.com/sprites/smicons-sheet.png?a5&quot;) no-repeat scroll -0px -960px"></span></span> <span class="col pokemonnamecol" style="white-space: nowrap"><a href=https://pokemonshowdown.com/dex/pokemon/rayquaza" target="_blank" rel="noopener">Rayquaza</a></span> <span class="col typecol"><img src=https://play.pokemonshowdown.com/sprites/types/Dragon.png" alt="Dragon" height="14" width="32"><img src="https://play.pokemonshowdown.com/sprites/types/Flying.png" alt="Flying" height="14" width="32"></span> <span style="float: left ; min-height: 26px"><span class="col abilitycol">Air Lock</span><span class="col abilitycol"></span></span><span style="float: left ; min-height: 26px"><span class="col statcol"><em>HP</em><br> 105</span> <span class="col statcol"><em>Atk</em><br> 150</span> <span class="col statcol"><em>Def</em><br> 90</span> <span class="col statcol"><em>SpA</em><br> 150</span> <span class="col statcol"><em>SpD</em><br>90</span><span class="col statcol"><em>Spe</em><br>95</span><span class="col bstcol"><em>BST<br> 680</em></span> </span></li><li style="clear: both"><br></li></ul>`);
			this.add(`raw|<font color="#686868">Dex#:</font>384&nbsp;| <font color="#686868">Gen:</font> 3&nbsp;| <font color="#686868">Height:</font>7 m&nbsp;| <font color="#686868">Weight:</font> 206.5 kg <em>(120 BP)</em>&nbsp;|<font color="#686868">Dex Colour:</font> Green&nbsp;| <font color="#686868">Egg Group(s):</font> Undiscovered&nbsp;| <font color="#686868">Does Not Evolve</font></font>`);
		},
	},
	montgomery: {
		noCopy: true,
		onStart: function (pokemon) {
			this.add(`raw|<b>Montgomery:</b> Hello my little fate-of-nothingness!`);
            pokemon.trySetStatus('brn', pokemon);
		},
		onSwitchOut: function (pokemon) {
			let trainer = pokemon.side.name
			this.add(`raw|<b>Montgomery:</b> ${trainer}, will you watch that brat for me?`);
		},
		onFaint: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Montgomery:</b> You mischievious ${enemy}! You took my life! I'll report you the Tiksi Branch!`);
		},
		//Guts Innate
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
	},
	harold: {
		noCopy: true,
		onStart: function (pokemon) {
			let enemy = pokemon.side.foe.name
			this.add(`raw|<b>Harold:</b> ${enemy}, your team are cruel, evil and are capable to cheat and wipe everything. Please don't block me for saying stuff!`);
			if (pokemon.illusion) return;
            this.boost({evasion: 3}, pokemon);
		},
		onSwitchOut: function (pokemon) {
			this.add(`raw|<b>Harold:</b> I'll take a screenshot and share with my friends at the forum.`);
		},
		onFaint: function (pokemon) {
			this.add(`raw|<b>Harold:</b> I've got blocked. Moron.`);
		},
	},
	millennium: {
		noCopy: true,
		onStart: function (target, source, pokemon) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'necrozma') {
            this.add(`raw|<b>Millennium:</b> Zatch, we meet again.`);
			} else {
			this.add(`raw|<b>Millennium:</b> Is something you can fight me?`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Millennium:</b> Let the world decide me.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Millennium:</b> Take care of yourself.`);
		},		
	},
	zatch: {
		noCopy: true,
		onStart: function (target, source, pokemon) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'arceus') {
            this.add(`raw|<b>Zatch:</b> Millennium, we meet again.`);
			} else {
			this.add(`raw|<b>Zatch:</b> Let my power control yours.`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Zatch:</b> I'll let the world wither to myself.`);
		},
		onFaint: function () {
			this.add(`raw|<b>Zatch:</b> Someday, we can be friends again.`);
		},
		// Ultra Burst Innate
		onUpdate: function (pokemon) {
			if (pokemon.template.speciesid !== 'necrozma' || pokemon.transformed || pokemon.illusion || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Ultra Burst');
			this.add(`raw|<b>Zatch:</b> Playtime's over! Behold my true power!`);
			pokemon.formeChange('Necrozma-Ultra', this.effect, true);
			let newHP = Math.floor(Math.floor(2 * pokemon.template.baseStats['hp'] + pokemon.set.ivs['hp'] + Math.floor(pokemon.set.evs['hp'] / 4) + 100) * pokemon.level / 100 + 10);
			pokemon.hp = newHP - (pokemon.maxhp - pokemon.hp);
			pokemon.maxhp = newHP;
			pokemon.heal(pokemon.maxhp / 4);
			this.add('-heal', pokemon, pokemon.getHealth);
			this.add('-message', pokemon.name + ' regained his true power through Ultra Burst!');
			this.add('-message', pokemon.name + '\'s ability is now Prism Power!');
			this.boost({atk: 1, def: 1, spa: 1, spd: 1, spe: 1}, pokemon);
		},		
	},
	omegasheron: {
		noCopy: true,
		onStart: function (target, source, pokemon) {
			let activeMon = target.side.foe.active[0].template.speciesid;
			if (activeMon === 'arceus' || activeMon === 'necrozma') {
            this.add(`raw|<b>Omega Sheron:</b> Between you and me, you are going to get punished by the hands of Omega Sheron!`);
			} else {
			this.add(`raw|<b>Omega Sheron:</b> Behold! The ULTIMATE Pokémon myself! I'm Omega Sheron! WAHAHAHAHA!`);
			}
		},
		onSwitchOut: function () {
			this.add(`raw|<b>Omega Sheron:</b> Give me something you got, like you always do!`);
		},
		onFaint: function () {
			this.add(`raw|<b>Omega Sheron:</b> You are a worthy opponent...`);
		},
	},
	// Lounge Custom effect
	lounge: {
		noCopy: true,
		duration: 5,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Lounge', '[silent]');
			this.add('-message', pokemon.name + ' was immobilized!');
		},
		onBeforeMovePriority: 8,
		onBeforeMove: function (pokemon) {
			if (!this.runEvent('Flinch', pokemon)) {
				return;
			}
			this.add('cant', pokemon, 'truant');
			return false;
		},
		onEnd: function (pokemon) {
			this.add('-end', pokemon, 'Lounge', '[silent]');
			this.add('-message', pokemon.name + ' became mobile again!');
		},
	},
	// Weak Trap Custom effect
	weaktrap: {
		duration: 5,
		onStart: function (pokemon) {
			this.add('-start', pokemon, 'Weak Trap', '[silent]');
			this.add('-message', pokemon.name + ' was weakened and trapped!');
		},
		onTrapPokemon: function (pokemon) {
			pokemon.tryTrap();
		},
		onModifyAtkPriority: 5,
		onModifyAtk: function (atk, pokemon) {
			return this.chainModify(0.5);
		},
		onModifyDefPriority: 5,
		onModifyDef: function (def, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpAPriority: 5,
		onModifySpA: function (spa, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpe: function (spe, pokemon) {
			return this.chainModify(0.5);
		},
		onModifySpDPriority: 5,
		onModifySpD: function (spd, pokemon) {
			return this.chainModify(0.5);
		},
		onEnd: function (pokemon) {
		this.add('-end', pokemon, 'Weak Trap', '[silent]');
		this.add('-message', pokemon.name + ' is no longer weak-trapped!');
		},
	},
	// Power Shield Effect
	powershield: {
            duration: 5,
			onStart: function (target) {
				this.add('-start', target, 'Power Shield', '[silent]');
				this.add('-message', `${target.name} is protected with Power Shield.`);
			},
			onTryHitPriority: 3,
			onTryHit: function (target, source, move) {
				if (move.id === 'doubledragon') return;
				this.add('-activate', target, 'move: Power Shield');
				let lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return null;
			},
			onEnd: function (target) {
				this.add('-end', target, 'Power Shield', '[silent]');
				this.add('-message', `${target.name}'s Power Shield has ended.`);
			},
	  },
	// Prevents glitch out from running more than once per turn per pokemon & boosts base power. From SSB.
	glitchout: {
		duration: 1,
		onTryHit: function (target, source, move) {
			if (move.basePower) {
				move.basePower += 20;
				this.debug('glitch out base power boost');
			}
		},
	},
	// Modified type setup for arceus and silvally
	arceus: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'coloraura') {
			type = pokemon.getItem().onPlate;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
	silvally: {
		inherit: true,
		onType: function (types, pokemon) {
		if (pokemon.transformed) return types;
		/** @type {string | undefined} */
		let type = 'Normal';
		if (pokemon.ability === 'rkssystem') {
			type = pokemon.getItem().onMemory;
			if (!type) {
				type = 'Normal';
			}
		}
		return [type];
		},
	},
};

exports.BattleStatuses = BattleStatuses;
