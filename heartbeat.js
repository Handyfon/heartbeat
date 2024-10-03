Hooks.once('init', function() {
	const reloadSettings = debounce(() => setheartbeat(null,null,'init'), 100);
	//console.log("Heartbeat found...");
	game.settings.register('heartbeat', 'enabledForThisUser', {
        name: 'Enabled for this user',
        hint: 'If heartbeat should be enabled for this user',
        scope: 'client',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'additionalActorTypes', {
        name: 'Additional Actor Types',
        hint: 'Comma-separated list of additional actor types to include (e.g., mecha, vehicle)',
        scope: 'world',
        config: true,
        default: 'mecha',
        type: String,
        onChange: () => { reloadSettings(); },
    });
	game.settings.register('heartbeat', 'enableTakeDamageffect', {
        name: 'Enable Damage Animation',
        hint: 'Enables the animation that is played when a character takes damage or regains hp',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'invertDamageOverlay', {
        name: 'Invert Damage Animation',
        hint: 'Some systems may calculate damage differently. Enable this to display the correct color for the damage animation.',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'enableDamageOverlay', {
        name: 'Enable Damage Overlay',
        hint: 'Enables the overlay that stays until the character gets healed.',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'gmPreview', {
        name: 'GM Preview',
        hint: 'Lets you preview the effect by clicking on tokens',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'gmPreviewIgnoreNPC', {
        name: 'GM Preview Ignore NPCS',
        hint: 'Ignore NPCS when previewing the effect',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'heartbeatbutton', {
        name: 'Heartbeat Button Location ',
        hint: 'You can set where the small heart button will be displayed.',
        scope: 'world',
        config: true,
        type: String,
		default: 'topright',
		onChange: () => {reloadSettings();},
		choices: {
			"hidden": "hidden",
			"topright": "top right (standard)",
			"topleft": "top left",
			"macrobar" : "next to macro bar"
		},
    });
	game.settings.register('heartbeat', 'wounds', {
        name: 'Invert HP (More HP BAD)',
        hint: 'Use a different calculation where more hp == bad for systems like swade',
        scope: 'world',
        config: true,
        default: false,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });	
	game.settings.register('heartbeat', 'hpPath', {
        name: 'HP Data Path',
        hint: 'This is the path that points towards the HP value of an actor (standard DnD5e: system.attributes.hp.value)',
        scope: 'world',
        config: true,
        default: "system.attributes.hp.value",
        type: String,
		onChange: () => {reloadSettings();},
    });	
	game.settings.register('heartbeat', 'maxhpPath', {
        name: 'Max HP Data Path',
        hint: 'This is the path that points towards the HP value of an actor (standard DnD5e: system.attributes.hp.max)',
        scope: 'world',
        config: true,
        default: "system.attributes.hp.max",
        type: String,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'start_heartbeat_offset', {
        name: 'Start Heartbeat HP%',
        hint: 'Defines at which percentage the overlay should start to appear',
        scope: 'world',
        config: true,
        default: '50',
		type: Number,
		range: {
			min: 1,
			max: 99,
			step: 1
		},
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'heartbeat_offset', {
        name: 'Heartbeat FX HP%',
        hint: 'Defines at which percentage the animation and sound should start',
        scope: 'world',
        config: true,
        default: '10',
		type: Number,
		range: {
			min: 1,
			max: 99,
			step: 1
		},
		onChange: () => {reloadSettings();},
    });		
	game.settings.register('heartbeat', 'effect_multiplier', {
        name: 'Effect Multiplier',
        hint: 'Defines how strong the overlay is',
        scope: 'world',
        config: true,
        default: '0.5',
		type: Number,
		range: {
			min: 0.01,
			max: 1,
			step: 0.01
		},
		onChange: () => {reloadSettings();},
    });	
	game.settings.register('heartbeat', 'sfx_heartbeat', {
        name: 'Heartbeat Sound',
        hint: 'path to the sound',
        scope: 'world',
        config: true,
        default: 'modules/heartbeat/sfx/heartbeat_sfx.mp3',
        type: String,
		filePicker: 'audio',
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'sfx_heartbeat_vol', {
        name: 'Heartbeat Sound Volume',
        hint: 'volume of the sound',
        scope: 'world',
        config: true,
        default: '0.1',
		type: Number,
		range: {
			min: 0,
			max: 1,
			step: 0.01
		},
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'canvasBlur', {
        name: 'enable CanvasBlur',
        hint: 'The canvas will be blurry at a lower percentage of health;',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'canvasBrightness', {
        name: 'enable CanvasBrightness',
        hint: 'The canvas will get darker at a lower percentage of health;',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'massiveDamageSound', {
        name: 'enable Massive Damage Sound',
        hint: 'a custom sound that will be played when players take over 50% damage in one attack',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'tokenDeath', {
        name: 'Token Death (Black Screen)',
        hint: 'The Screen will be black and white once a character reaches 0 hp',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'sfx_massivedamage', {
        name: 'Massive Damage Sound',
        hint: 'path to the sound',
        scope: 'world',
        config: true,
        default: 'modules/heartbeat/sfx/ear_ringing_sfx.mp3',
        type: String,
		filePicker: 'audio',
		onChange: () => {reloadSettings();},
    });
	game.settings.register('heartbeat', 'bloodOverlay_path', {
        name: 'Bloody Overlay Path',
        hint: 'Spath to the blood overlay',
        scope: 'world',
        config: true,
        default: "modules/heartbeat/images/bloody.webp",
		type: String,
		filePicker: 'image',
    });
	game.settings.register('heartbeat', 'blood_blur', {
        name: 'Blood Blur',
        hint: 'How blurry the blood will be on the screen (a setting between 0-30 is recommended)',
        scope: 'world',
        config: true,
        default: '5',
		type: Number,
		range: {
			min: 0,
			max: 90,
			step: 1
		},
		onChange: () => {reloadSettings();},
	});
	game.settings.register('heartbeat', 'enableSplatter', {
		name: 'Enable Massive Damage Splatter',
		hint: 'Enables persistent splatter effect (images) when massive damage is taken',
		scope: 'world',
		config: true,
		default: true,
		type: Boolean,
		onChange: () => {reloadSettings();},
	});
	game.settings.register('heartbeat', 'splatterThreshold', {
		name: 'Splatter Threshold (%)',
		hint: 'The minimum percentage of maximum HP lost in a single hit to trigger the splatter effect.',
		scope: 'world',
		config: true,
		default: 20,
		type: Number,
		range: {
			min: 1,
			max: 100,
			step: 1
		},
		onChange: () => { reloadSettings(); },
	});
	game.settings.register('heartbeat', 'splatterDuration', {
		name: 'Splatter Duration',
		hint: 'Duration (in seconds) for which splatter remains visible before fading out',
		scope: 'world',
		config: true,
		default: 30, // Default to 10 seconds
		type: Number,
		onChange: () => {reloadSettings();},
	});

	console.log("Heartbeat enabled!");
});
Hooks.once('ready', function() {
	if(game.settings.get('heartbeat', 'enableTakeDamageffect'))
		$('body').append('<img class="hearbeat" id="heartbeat" src="'+ game.settings.get('heartbeat', 'bloodOverlay_path') +'" style="pointer-events:none; position: absolute;width: inherit;height: inherit;opacity: 0.0;">')
	if(game.settings.get('heartbeat', 'enableDamageOverlay'))
		$('body').append('<img class="hearbeatDMGOverlay" id="hearbeatDMGOverlay" style="pointer-events:none; position: absolute;width: inherit;height: inherit;opacity: 0.0;">')
	
	if(canvas.tokens.controlled[0] != undefined){
		setheartbeat(null,canvas.tokens.controlled[0], 'ready');
	}

	//CREATE HEARTBEAT BUTTON
	// Create the button element
	let buttonLocation = game.settings.get('heartbeat', 'heartbeatbutton');
	if(buttonLocation == 'hidden') return;

	const heartbeatButton = document.createElement('button');
	heartbeatButton.setAttribute('type', 'button');
	heartbeatButton.setAttribute('id', 'heartbeat-button');
	heartbeatButton.textContent = ''; // Set the button's text content
	heartbeatButton.title = "";
	//"hidden": "hidden",
	//"topright": "top right (standard)",
	//"topleft": "top left",
	//"macrobar" : "next to macro bar",
	heartbeatButton.onclick = function() {
		toggleHeartBeatForCurrentUser(); // Call your toggleHeartBeatForCurrentUser function
	};
	if(buttonLocation == 'topright'){
		heartbeatButton.style = "left: calc(0px - 1.4rem);top: calc(35px - 1.4rem);";
		$("#sidebar")[0].append(heartbeatButton);
	}
	if(buttonLocation == 'topleft'){
		heartbeatButton.style = "left: calc(128px - 1.4rem);top: calc(39px - 1.4rem);";
		$("#ui-left")[0].append(heartbeatButton);
	}
	if(buttonLocation == 'macrobar'){
		heartbeatButton.style = "left: calc(600px - 1.4rem);bottom: calc(47px - 1.4rem);";
		$("#ui-bottom")[0].append(heartbeatButton);
	}

	// Change style based on setting
	if(game.settings.get('heartbeat', 'enabledForThisUser'))
		changeHeartBeatButtton('on');
	else{
		changeHeartBeatButtton('off');
}

	
});
function toggleHeartBeatForCurrentUser(){
	let newval = !game.settings.get('heartbeat', 'enabledForThisUser');
	game.settings.set('heartbeat', 'enabledForThisUser', newval);
	if(newval){
		changeHeartBeatButtton('on');
		//TODO: Try enabling heartbeat
	}
	else{
		disableHeartBeat();
		changeHeartBeatButtton('off');
	}
}
function changeHeartBeatButtton(enableDisable) {
	let button = $('#heartbeat-button')[0];
	if(button == undefined)return;
	if (enableDisable === 'on') {
	  button.textContent = '❤️'; // Set the button's text content
	  button.title = 'Heartbeat Active - Click to disable';
	}
	if (enableDisable === 'beat') {
	  button.textContent = '💓'; // Set the button's text content
	  button.title = 'Heartbeat Beating';
	  //button.classList.add('animatedHeartBeatButton');
	  //button.classList.remove('animatedHeartBeatButton');
	}
	if (enableDisable === 'off') {
	  button.textContent = '🖤'; // Set the button's text content
	  button.title = 'Heartbeat Inactive - Click to enable';
	}
	if (enableDisable === 'special') {
		button.textContent = '💛'; // Set the button's text content
		button.title = 'Heartbeat Inactive - Disabled for this actor';
	  }
  }
Hooks.on("controlToken", (t, e) => {
	if(game.user.isGM && game.settings.get('heartbeat', 'gmPreview'))
		if(t.actor.type != 'character' && game.settings.get('heartbeat', 'gmPreviewIgnoreNPC')){
			disableHeartBeat();
			return;
		}
	else{
		setheartbeat(null, t, 'controlToken');
	}

});
Hooks.on("sightRefresh", (t, e) => {
	if(game.user.isGM && game.settings.get('heartbeat', 'gmPreview')){
		let tokens = canvas.tokens.controlled;
		if(tokens.length == 0) disableHeartBeat();
	}
});
function getNewHPValue(actor, updates, hpPath) {
    // Create a copy of the actor's data
    let actorData = duplicate(actor);

    // Merge the updates into the actor's data
    mergeObject(actorData, updates, { inplace: true });

    // Retrieve the new HP value
    let newHP = deep_value(actorData, hpPath);

    return newHP;
}
Hooks.on('preUpdateActor', (actor, updates, options, userId) => {
    if (!game.settings.get('heartbeat', 'enabledForThisUser')) return;

    // Get the HP path from settings
    let hpPath = game.settings.get('heartbeat', 'hpPath');

    // Retrieve the old HP from the actor's current data
    let oldHP = deep_value(actor, hpPath);

    // Store old HP in options
    options.oldHP = oldHP;
});
Hooks.on('updateActor', (actor, updates, options, userId) => {
    if (!game.settings.get('heartbeat', 'enabledForThisUser')) return;

    if (options.oldHP == null) return;
    let hpPath = game.settings.get('heartbeat', 'hpPath');

    // Retrieve the new HP from the actor's updated data
    let newHP = deep_value(actor, hpPath);

    if (options.oldHP == null || newHP == null) return;

    let damageTaken = newHP - options.oldHP;

    let tokens = canvas.tokens.controlled;
    if (game.user.isGM && game.settings.get('heartbeat', 'gmPreview')) {
        if (tokens.length > 1 || tokens.length == 0) return;
        else if (!isActorTypeAllowed(actor)) {
            disableHeartBeat();
            return;
        }
        setheartbeat(damageTaken, tokens[0], 'updateActor');
    } else if (tokens.length == 1 && !canvas.tokens.controlled[0].actor.actorLink) {
        console.log("Heartbeat | Your selected token has been updated: " + actor.name);
        setheartbeat(damageTaken, tokens[0], 'updateActor');
    } else if (game.user.character != undefined) {
        if (game.user.character.id == actor.id) {
            console.log("Heartbeat | Your character has been updated: " + actor.name);
            setheartbeat(damageTaken, null, 'updateActor');
        }
    }
});
function isActorTypeAllowed(actor) {
    // Retrieve additional actor types from settings
    let additionalTypesSetting = game.settings.get('heartbeat', 'additionalActorTypes');
    let additionalActorTypes = additionalTypesSetting.split(',')
        .map(type => type.trim().toLowerCase())
        .filter(type => type);

    // Combine default types with additional types
    let allowedActorTypes = ['character', 'npc', ...additionalActorTypes];

    // Check if the actor's type is in the allowed list
    return allowedActorTypes.includes(actor.type.toLowerCase());
}
function disableHeartBeat(){
	console.log("Heatbeat | Overlay disabled");
	document.getElementById("heartbeat").style.opacity = 0;
	$("#board")[0].style.filter = '';
	if(game.settings.get('heartbeat', 'enabledForThisUser'))
		changeHeartBeatButtton('on');
	game.audio.playing.forEach(function(sound) {
		if(sound.src == game.settings.get('heartbeat', 'sfx_heartbeat'))sound.stop()
	});
}

async function damage(percent, dhp = null, maxHp) {
    if (!game.settings.get('heartbeat', 'enableDamageOverlay')) return;
    let damageAmount = dhp || 0;

    // Invert damage overlay if setting is enabled
    if (game.settings.get('heartbeat', 'invertDamageOverlay'))
        dhp = -dhp;

    // Set the damage overlay color based on whether HP increased or decreased
    if (dhp > 0) {
        $("#hearbeatDMGOverlay")[0].style.background = "radial-gradient(circle, rgba(255, 255, 255, 0%) 27%, rgb(0, 145, 25) 100%)";
    } else {
        $("#hearbeatDMGOverlay")[0].style.background = "radial-gradient(circle, rgba(255, 255, 255, 0%) 27%, rgb(145, 0, 0) 100%)";
    }

    // Calculate duration for the animation
    let duration = 1 + damageAmount / 1000 + (1 - percent);
    if (game.settings.get('heartbeat', 'wounds'))
        duration = 1;

    // Start the damage overlay animation
    $("#hearbeatDMGOverlay")[0].style.animation = "HeartBeatFadeOut " + duration + "s";
    await delay(duration * 1000);
    $("#hearbeatDMGOverlay")[0].style.animation = "";
	
    if (maxHp > 0 && dhp != null && dhp <= 0) {
        let damagePercentage = (Math.abs(dhp) / maxHp) * 100;
        let splatterThreshold = game.settings.get('heartbeat', 'splatterThreshold');
        if (damagePercentage >= splatterThreshold && game.settings.get('heartbeat', 'enableScratch')) {
            spawnSplatter();
        }
    }
}

function deep_value(obj, path) {
    return path.split('.').reduce((accumulator, key) => {
        if (accumulator && accumulator[key] !== undefined) {
            return accumulator[key];
        } else {
            return undefined;
        }
    }, obj);
}

function setheartbeat(damageTaken = null, token = null, source = null){
	//console.log("SETHEARTBEAT " + source);
	//console.log("damageTaken:" + damageTaken);
	if(!game.settings.get('heartbeat', 'enabledForThisUser'))return;
	let character;
	//ui.notifications.notify(dhp);
	if(token != null) character = token.actor; //IF character is the controlled character
	if(game.user.character != null && !game.user.isGM) character = game.user.character; //GM Users always use selected token
	if(game.user.character == null && token == null){
		if(canvas.tokens.controlled.length == 1){
			character = canvas.tokens.controlled[0].actor;
		}
		else{
			return;
		}
	};
	let additionalTypesSetting = game.settings.get('heartbeat', 'additionalActorTypes');
	let additionalActorTypes = additionalTypesSetting.split(',').map(type => type.trim().toLowerCase()).filter(type => type);
	let allowedActorTypes = ['character', 'npc', ...additionalActorTypes];

	let path = game.settings.get('heartbeat', 'hpPath');
	let maxhpPath = game.settings.get('heartbeat', 'maxhpPath');
	let hp = deep_value(character, path);
	//console.log(character);
	let maxHp = deep_value(character, maxhpPath);
	let woundSystem = game.settings.get('heartbeat', 'wounds');
	let effect_multiplier = game.settings.get('heartbeat', 'effect_multiplier');
	if(maxHp == 0){
		disableHeartBeat();
		changeHeartBeatButtton('special');
		return;
	}
	if (!allowedActorTypes.includes(character.type.toLowerCase())) {//NEW WAY TO CHECK FOR SHEET TYPES
		disableHeartBeat();
		changeHeartBeatButtton('special');
		return;
	}

	if(hp == null){
	ui.notifications.warn("Heartbeat | The HP Data Path seems to be incorrect, check your module settings to fix this");
	console.log(character.system);
	return;
	}
	if(maxHp == null){
	ui.notifications.warn("Heartbeat | The MAX-HP Data Path seems to be incorrect, check your module settings to fix this");
	console.log(character.system);
	maxHp = 100;
	}
	changeHeartBeatButtton('beat');
	let percent = hp / maxHp;

	if(damageTaken){
		damage(percent, damageTaken, maxHp);
	}
	let blur = 'blur(' +game.settings.get("heartbeat", "blood_blur")+ 'px)';
	document.getElementById("heartbeat").style.filter = blur;

	if(woundSystem){
		//add canvas blur and brightness
		if(percent >= game.settings.get('heartbeat', 'start_heartbeat_offset')/100 && percent != 0){
			document.getElementById("heartbeat").style.opacity = percent;
			//if heartbeat above % enable animation
			if(percent >= game.settings.get('heartbeat', 'heartbeat_offset')/100 && percent < 1){
				document.getElementById("heartbeat").classList.add("animated")
			}
			else{
				document.getElementById("heartbeat").classList.remove("animated")
			}
			if(percent != 1 && percent != 0){
				//0 == 100%
				//ui.notifications.notify("percent " + percent);
				let blurvalue = percent*(2*effect_multiplier); // value in px
				let brightnessvalue = 1-percent*effect_multiplier; // value in % of 1
				let red_overlayvalue = 1-percent;  // value in % of 1
				//console.log("Hearbeat | " + percent);
				//console.log("Hearbeat | Blurvalue:" + blurvalue);
				//console.log("Hearbeat | Brightnessvalue:" + brightnessvalue);
				//console.log('blur('+blurvalue+'px ' + 'brightness('+brightnessvalue+')');
				let style = '';
				if(game.settings.get('heartbeat', 'canvasBlur')){
					style += 'blur('+blurvalue+'px )';
				}
				if(game.settings.get('heartbeat', 'canvasBrightness')){
					style += 'brightness('+brightnessvalue+')';
				}
				$("#board")[0].style.filter = style;
			}
			else{
				$("#board")[0].style.filter = '';
			}
		}
		else{
			$("#board")[0].style.filter = '';
			document.getElementById("heartbeat").style.opacity = 0;
		}
		//play sound if low on health
		let soundsrc = game.settings.get('heartbeat', 'sfx_heartbeat');
		if(percent >= game.settings.get('heartbeat', 'heartbeat_offset')/100 && percent != 1){//play sound
			let alreadyplaying = false;
			game.audio.playing.forEach(function(sound) {
			if(sound.src == game.settings.get('heartbeat', 'sfx_heartbeat')) alreadyplaying = true;
			});
			if(!alreadyplaying)
				AudioHelper.play({src:soundsrc, volume: game.settings.get('heartbeat', 'sfx_heartbeat_vol'), autoplay: true, loop: true }, false);
		}
		else{
			game.audio.playing.forEach(function(sound) {
				if(sound.src == game.settings.get('heartbeat', 'sfx_heartbeat'))sound.stop()
			});
		}
		//unconscious
		if(percent == 1 && game.settings.get('heartbeat', 'tokenDeath')){
			$("#board")[0].style.filter = 'grayscale(1) brightness(0.2)';
			$("#heartbeat")[0].style.filter = 'blur(0) grayscale(1) brightness(0.1)';
		}
		return;
	}
	//if heartbeat below % enable animation
	if(percent <= game.settings.get('heartbeat', 'heartbeat_offset')/100 && percent != 0){
		document.getElementById("heartbeat").classList.add("animated")
	}
	else{
		document.getElementById("heartbeat").classList.remove("animated")
	}

	//add canvas blur and brightness
	if(percent <= game.settings.get('heartbeat', 'start_heartbeat_offset')/100 && percent != 0){
		document.getElementById("heartbeat").style.opacity = game.settings.get('heartbeat', 'effect_multiplier') - percent;
		let blurvalue = (1-percent*2); // value in px
		let brightnessvalue = 1 - (0.8-percent); // value in px
		//ui.notifications.notify("brightness" + brightnessvalue);
		let red_overlayvalue = (1-percent*2); 
		//console.log("Hearbeat | " + percent);
		//console.log("Hearbeat | Blurvalue:" + blurvalue);
		//console.log("Hearbeat | Brightnessvalue:" + brightnessvalue);
		//console.log('blur('+blurvalue+'px ' + 'brightness('+brightnessvalue+')');
		let style = '';
		if(game.settings.get('heartbeat', 'canvasBlur')){
			style += 'blur('+blurvalue+'px )';
		}
		if(game.settings.get('heartbeat', 'canvasBrightness')){
			style += 'brightness('+brightnessvalue+')';
		}
		$("#board")[0].style.filter = style;
	}
	else{
		$("#board")[0].style.filter = '';
		document.getElementById("heartbeat").style.opacity = 0;
	}

	//play sound if low on health
	let soundsrc = game.settings.get('heartbeat', 'sfx_heartbeat');
	if(percent <= game.settings.get('heartbeat', 'heartbeat_offset')/100 && percent != 0){//play sound
		let alreadyplaying = false;
		game.audio.playing.forEach(function(sound) {
		if(sound.src == game.settings.get('heartbeat', 'sfx_heartbeat')) alreadyplaying = true;
		});
		if(!alreadyplaying)
			AudioHelper.play({src:soundsrc, volume: game.settings.get('heartbeat', 'sfx_heartbeat_vol'), autoplay: true, loop: true }, false);
	}
	else{
		game.audio.playing.forEach(function(sound) {
			if(sound.src == game.settings.get('heartbeat', 'sfx_heartbeat'))sound.stop()
		});
	}
	//unconscious
	if(percent == 0 && game.settings.get('heartbeat', 'tokenDeath')){
		$("#board")[0].style.filter = 'grayscale(1) brightness(0.2)';
		$("#heartbeat")[0].style.filter = 'blur(0) grayscale(1) brightness(0.1)';
		document.getElementById("heartbeat").style.opacity = 1;
			//massive damage sound
		if(game.settings.get('heartbeat', 'enableSplatter') && damageTaken != null) {
			spawnSplatter();
			spawnSplatter();
			spawnSplatter();
		}
	}
	if(damageTaken){
		if(damageTaken && game.settings.get('heartbeat', 'invertDamageOverlay')){
			if(damageTaken >= maxHp/2 && percent < 0.50 && game.settings.get('heartbeat', 'massiveDamageSound')){
				AudioHelper.play({src:game.settings.get('heartbeat', 'sfx_massivedamage'), volume: 0.05, autoplay: true, loop: false }, false);
				// Massive damage splatter
				if(game.settings.get('heartbeat', 'enableSplatter')&& damageTaken != null) {
					spawnSplatter();
				}
			}
		}
		else{
			if(-damageTaken >= maxHp/2 && percent < 0.50 && game.settings.get('heartbeat', 'massiveDamageSound')){
				AudioHelper.play({src:game.settings.get('heartbeat', 'sfx_massivedamage'), volume: 0.05, autoplay: true, loop: false }, false);
				// Massive damage splatter
				if(game.settings.get('heartbeat', 'enableSplatter')&& damageTaken != null) {
					spawnSplatter();
				}
			}
		}
	}
	//massive damage Splatter
}

let splatterImages = [];
const delay = ms => new Promise(res => setTimeout(res, ms));
let bloodImages = [];
for(let i = 1; i <= 11; i++) {
    let num = i.toString().padStart(2, '0'); // pad with leading zero
    bloodImages.push(`modules/heartbeat/images/BloodStains/Blood_${num}.png`);
}

function spawnSplatter() {
    let randomIndex = Math.floor(Math.random() * bloodImages.length);
    let imgSrc = bloodImages[randomIndex];
    let splatterImg = document.createElement('img');
    splatterImg.src = imgSrc;
    splatterImg.classList.add('HeartbeatSplatterImage');
    splatterImg.style.pointerEvents = 'none';
    splatterImg.style.position = 'fixed';

    let boardElement = $("#board")[0];
    let boardRect = boardElement.getBoundingClientRect();

    // Remove boardRect.left and boardRect.top from the calculation
    let posX = boardRect.x + Math.random();
    let posY = boardRect.y + Math.random();

    splatterImg.style.left = posX + 'px';
    splatterImg.style.top = posY + 'px';

    let rotation = Math.random() * 360;
    let scale = 0.5 + Math.random() * (3.0 - 0.5);
    splatterImg.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    splatterImg.style.opacity = '1';
    splatterImg.style.zIndex = 10;

    document.body.appendChild(splatterImg);
    splatterImages.push(splatterImg);

    let duration = Number(game.settings.get('heartbeat', 'splatterDuration')) * 1000;

    splatterImg.style.transition = `opacity ${duration / 1000}s linear`;

    setTimeout(() => {
        splatterImg.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        removeSplatterImage(splatterImg);
    }, duration);
}


function removeSplatterImage(splatterImg) {
    if (splatterImg) {
        splatterImg.remove();
        splatterImages = splatterImages.filter(img => img !== splatterImg);
    }
}
