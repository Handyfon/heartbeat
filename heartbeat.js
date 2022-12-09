Hooks.once('init', function() {
	const reloadSettings = debounce(() => setheartbeat(), 100);
	//console.log("Heartbeat found...");
	game.settings.register('heartbeat', 'enableTakeDamageffect', {
        name: 'Enable Damage Animation',
        hint: 'Enables the animation that is played when a character takes damage or regains hp',
        scope: 'world',
        config: true,
        default: true,
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
	game.settings.register('heartbeat', 'hpPath', {
        name: 'HP Data Path',
        hint: 'This is the path that points towards the HP value of an actor (standard DnD5e: system.attributes.hp)',
        scope: 'world',
        config: true,
        default: "system.attributes.hp.value",
        type: String,
		onChange: () => {reloadSettings();},
    });	
	game.settings.register('heartbeat', 'maxhpPath', {
        name: 'Max HP Data Path',
        hint: 'This is the path that points towards the HP value of an actor (standard DnD5e: system.attributes.hp)',
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
	game.settings.register('heartbeat', 'massivedamage', {
        name: 'enable Massive Damage Sound',
        hint: 'a custom sound that will be played when players take over 50% damage in one attack',
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
	console.log("Heartbeat enabled!");
});
Hooks.once('ready', function() {
	if(game.settings.get('heartbeat', 'enableTakeDamageffect'))
		$('body').append('<img class="hearbeat" id="heartbeat" src="'+ game.settings.get('heartbeat', 'bloodOverlay_path') +'" style="pointer-events:none; position: absolute;width: inherit;height: inherit;opacity: 0.0;">')
	if(game.settings.get('heartbeat', 'enableDamageOverlay'))
		$('body').append('<img class="hearbeatDMGOverlay" id="hearbeatDMGOverlay" style="pointer-events:none; position: absolute;width: inherit;height: inherit;opacity: 0.0;">')
	setheartbeat();
});
Hooks.on("controlToken", (t, e) => {
	if(!game.user.isGM)return;
	if(game.settings.get('heartbeat', 'gmPreview'))
		if(t.document.disposition == -1 && game.settings.get('heartbeat', 'gmPreviewIgnoreNPC')){
			disableHeartBeat();
			return;
		}

		setheartbeat(null, t);
});
Hooks.on("sightRefresh", (t, e) => {
	if(game.user.isGM && game.settings.get('heartbeat', 'gmPreview')){
		let tokens = canvas.tokens.controlled;
		if(tokens.length == 0) disableHeartBeat();
	}
});
Hooks.on('updateActor', (actor, updates, options, userId) => {
	let damageTaken = 0;
	if(options.dhp) damageTaken = options.dhp;
	if(options.damageTaken) damageTaken = options.damageTaken;
	
	if(game.user.isGM && game.settings.get('heartbeat', 'gmPreview')){
		let tokens = canvas.tokens.controlled;
		if(tokens.length > 1) return;
		else
			if(tokens[0].document.disposition == -1 && game.settings.get('heartbeat', 'gmPreviewIgnoreNPC')){
			disableHeartBeat();
			return;
			}
			setheartbeat(damageTaken, tokens[0]);
	}
	else if(game.user.character.id == actor.id){
		//console.log("Hearbeat | Your actor has been updated: "+ actor.name);
		setheartbeat(damageTaken);
	}
});
function disableHeartBeat(){
	document.getElementById("heartbeat").style.opacity = 0;
	$("#board")[0].style.filter = '';
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function damage(percent, dhp = null){
	if(!game.settings.get('heartbeat', 'enableDamageOverlay'))return;
	let damage = dhp;
	
	if(dhp == null)
		damage = 0;
	if(dhp == null)
		damage = 0;
	
	if(dhp > 0){
		$("#hearbeatDMGOverlay")[0].style.background = "radial-gradient(circle, rgb(255 255 255 / 0%) 27%, rgb(0 145 25) 100%)";
	}
	else{
		$("#hearbeatDMGOverlay")[0].style.background = "radial-gradient(circle, rgb(255 255 255 / 0%) 27%, rgb(145 0 0) 100%)";
	}
	
	let duration = 1+damage/100+(1 - percent);
	$("#hearbeatDMGOverlay")[0].style.animation = "fadeOut "+duration+"s";
	await delay(duration*1000);
	$("#hearbeatDMGOverlay")[0].style.animation = "";
	
}

var deep_value = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

function setheartbeat(dhp = null, token = null){
	if(game.user.character == null && token == null)return;
	let character;
	if(token != null) character = token.actor;
	if(game.user.character != null) character = game.user.character;
	let path = game.settings.get('heartbeat', 'hpPath');
	let maxhpPath = game.settings.get('heartbeat', 'maxhpPath');
	let hp = deep_value(character, path);
	let maxHp = deep_value(character, maxhpPath);
	if(hp == null){
	ui.notifications.warn("Heartbeat | The HP Data Path seems to be incorrect, check your module settings to fix this");
	return;
	}
	if(maxHp == null){
	ui.notifications.warn("Heartbeat | The MAX-HP Data Path seems to be incorrect, check your module settings to fix this");
	maxHp = 100;
	}
	let percent = hp / maxHp;
	if(dhp){
		damage(percent, dhp);
	}
	if(!game.settings.get('heartbeat', 'enableTakeDamageffect'))return;
	//console.log("Hearbeat | " + percent);
	document.getElementById("heartbeat").style.opacity = game.settings.get('heartbeat', 'effect_multiplier') - percent;
	let blur = 'blur(' +game.settings.get("heartbeat", "blood_blur")+ 'px)';
	document.getElementById("heartbeat").style.filter = blur;

	//if heartbeat below % enable animation
	if(percent <= game.settings.get('heartbeat', 'heartbeat_offset')/100 && percent != 0){
		document.getElementById("heartbeat").classList.add("animated")
	}
	else{
		document.getElementById("heartbeat").classList.remove("animated")
	}

	//add canvas blur and brightness
	if(percent < game.settings.get('heartbeat', 'start_heartbeat_offset')/100 && percent != 0){
		let blurvalue = (1-percent*2); // value in px
		let brightnessvalue = 1 - (0.8 - percent); // value in px
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
		style += 'sepia('+red_overlayvalue+') hue-rotate(297deg) saturate(2.5)'
		$("#board")[0].style.filter = style;
	}
	else{
		$("#board")[0].style.filter = '';
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
	if(percent == 0){
		$("#board")[0].style.filter = 'grayscale(1) brightness(0.2)';
		$("#heartbeat")[0].style.filter = 'blur(0) grayscale(1) brightness(0.1)';
	}
	//massive damage sound
	if(dhp){
		if(-dhp >= maxHp/2 && percent < 0.50 && game.settings.get('heartbeat', 'massivedamage')){
			//console.log("Hearbeat | Massive Damage Detected: " + dhp);
			AudioHelper.play({src:game.settings.get('heartbeat', 'sfx_massivedamage'), volume: 0.05, autoplay: true, loop: false }, false);
		}
	}
}