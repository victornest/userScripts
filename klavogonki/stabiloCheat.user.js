// ==UserScript==
// @name           stabiloCheat
// @version        0.11
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          unsafeWindow
// ==/UserScript==


document.addEventListener('load', function() {

	var proxied = window.XMLHttpRequest.prototype.send;
	var length;
	var text;
	var sourceTime;
	var interval;
	if (localStorage.stabiloCheat == undefined) {
		localStorage.stabiloCheat = JSON.stringify({speed: 500, showRemainingTime: true});
	} else {
		let data = JSON.parse(localStorage.stabiloCheat);
		if (data.speed == '')
			data.speed = 500;
		if (typeof(data.showRemainingTime) != 'boolean')
			data.showReminingTime = true;
	}

	window.XMLHttpRequest.prototype.send = function () {
		this.addEventListener('load', function () {
			try {
				var json = JSON.parse(this.responseText);
				if ('text' in json) {
					text = json.text;
					length = json.text.length;
					if (localStorage.stabiloCheat) {
						if (document.getElementById('inputSpeed').value == '') {
							document.getElementById('inputSpeed').value = JSON.parse(localStorage.stabiloCheat).speed;
							getTime(document.getElementById('inputSpeed').value);
						}
						rtBar.max = length;
						unsafeWindow.txt = text;
					}
					setInt(inputSpeed.value, length);
				}
			} catch (e) {}
		}.bind(this));
		return proxied.apply(this, [].slice.call(arguments));
	};


	unsafeWindow.timeForSpeed = function(speed) {
		var time = (60 / (speed / length));
		if (time > 60) {
			time = (Math.floor(time / 60) + ':' + (time % 60).toFixed(1));
		}
		return console.log(time.toFixed(2));
	};




// ******** TIME FOR SPEED INPUT ********

	var tfsInputInjPlace = document.getElementById('params').getElementsByClassName('rc')[0];

	var tfsContainer = document.createElement('div');
	var inputSpeed = document.createElement('input');
	var tfs = document.createElement('div');

	var bestSpeedLabel = document.createElement('div');

	var barSwitchContainer = document.createElement('div');
	var barSwitchBtn = document.createElement('input');
	var barSwitchBtnLabel = document.createElement('div');

	tfsContainer.insert(inputSpeed);
	tfsContainer.insert(tfs);
	tfsContainer.insert(barSwitchBtn);
	tfsContainer.insert(barSwitchBtnLabel);

	barSwitchContainer.insert(barSwitchBtn);
	barSwitchContainer.insert(barSwitchBtnLabel);

	tfsInputInjPlace.insertBefore(tfsContainer, tfsInputInjPlace.childNodes[3]);
	tfsInputInjPlace.insertBefore(bestSpeedLabel, tfsInputInjPlace.childNodes[4]);
	tfsInputInjPlace.insertBefore(barSwitchContainer, tfsInputInjPlace.childNodes[5]);

	barSwitchBtn.setAttribute('type', 'checkbox');
	barSwitchBtn.style.setProperty('outline', 'none');
	barSwitchBtn.style.setProperty('margin', '0 5px 0 5px');
	barSwitchBtn.style.setProperty('display', 'inline');
	barSwitchBtn.checked = JSON.parse(localStorage.stabiloCheat).showRemainingTime;
	barSwitchBtn.addEventListener('change', function () {
		if (this.checked) {
			document.getElementById('rtBar').style.removeProperty('display');
			let data = JSON.parse(localStorage.stabiloCheat);
			data.showRemainingTime = true;
			localStorage.stabiloCheat = JSON.stringify(data);
		} else {
			document.getElementById('rtBar').style.setProperty('display', 'none');
			let data = JSON.parse(localStorage.stabiloCheat);
			data.showRemainingTime = false;
			localStorage.stabiloCheat = JSON.stringify(data);
		}
	});

	barSwitchBtnLabel.innerText = 'Оставшееся время';
	barSwitchBtnLabel.style.setProperty('display', 'inline');

	inputSpeed.style.setProperty('display', 'inline');
	inputSpeed.style.setProperty('max-width', '40px');
	inputSpeed.style.setProperty('border', 'solid 1px #d5d5d5');
	inputSpeed.style.setProperty('text-align', 'center');
	inputSpeed.setAttribute('id', 'inputSpeed');
	inputSpeed.addEventListener('keydown', function (e) {
		if (+e.key == +e.key.replace(/[\^d]/g,'')) {
			let speed = this.value + e.key;
			if (getTime(speed) == 'Infinity:NaN') {
				document.getElementById('tfs').innerText = 'Вжух!';
				return;
			}
			let data = JSON.parse(localStorage.stabiloCheat);
			data.speed = speed;
			localStorage.stabiloCheat = JSON.stringify(data);
			setInt(speed, length);
		} else if (e.key == 'Backspace') {
			let speed = this.value.slice(0, -1);
			if (getTime(speed) == 'Infinity:NaN') {
				document.getElementById('tfs').innerText = 'Вжух!';
				return;
			}
			let data = JSON.parse(localStorage.stabiloCheat);
			data.speed = speed;
			localStorage.stabiloCheat = JSON.stringify(data);
			setInt(speed, length);
		} else if (['Delete', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].include(e.key)) {
			let speed = this.value;
			if (getTime(speed) == 'Infinity:NaN') {
				document.getElementById('tfs').innerText = 'Вжух!';
				return;
			}
			let data = JSON.parse(localStorage.stabiloCheat);
			data.speed = speed;
			localStorage.stabiloCheat = JSON.stringify(data);
			setInt(speed, length);
		} else {
			e.preventDefault();
		}
	});
	inputSpeed.addEventListener('keyup', function () {
		if (this.value == '') {
			document.getElementById('tfs').innerText = 'Вжух!';
		} else {
			let speed = this.value;
			if (getTime(speed) == 'Infinity:NaN') {
				document.getElementById('tfs').innerText = 'Вжух!';
				return;
			}
			let data = JSON.parse(localStorage.stabiloCheat);
			data.speed = speed;
			localStorage.stabiloCheat = JSON.stringify(data);
			setInt(speed, length);
		}
	});

	tfs.setAttribute('id', 'tfs');
	tfs.style.setProperty('display', 'inline');
	tfs.style.setProperty('padding', '0 5px');
	//tfs.style.setProperty('border-right', 'solid black 1px');


	function getTime(speed) {
		var time = (60 / (speed / length)).toFixed(2);
		if (time > 60) {
			console.log(time);
			time = (Math.floor(time / 60) + ':' + (time % 60).toFixed(1));
		}
		document.getElementById('tfs').innerText = time;
		return time;
	}




// ******** REMAINING TIME BAR ********

	var rtBarInjPlace = document.getElementById('sortable');
	var rtBarInjNode = document.createElement('div');
	var rtBar = document.createElement('input');
	var colorBar = document.createElement('div');

	rtBarInjNode.insert(rtBar);
	rtBarInjNode.insert(colorBar);
	//console.log(rtBarInjPlace.childNodes);
	rtBarInjPlace.insertBefore(rtBarInjNode, document.getElementById('main-block'));

	rtBar.type = 'range';
	rtBar.min = 0;
	// rtBar.max at line ~29
	rtBar.step = 1;
	rtBar.value = 0;
	rtBar.setAttribute('disabled', 'true');
	//rtBar.style.setProperty('width', '100%');
	rtBar.style.setProperty('display', 'none');

	rtBarInjNode.setAttribute('id', 'rtBar');
	rtBarInjNode.style.setProperty('padding-bottom', '30px');

	colorBar.style.setProperty('position', 'absolute');
	colorBar.style.setProperty('height', '30px');
	colorBar.style.setProperty('border-radius', '10px');
	colorBar.style.setProperty('z-index', '895');

	var colorProgressBar = colorBar.cloneNode();
	colorBar.insert(colorProgressBar);

	colorProgressBar.style.setProperty('background', '#797979e0');
	colorProgressBar.style.setProperty('max-width', '740px');
	colorProgressBar.style.setProperty('width', '0px');
	colorProgressBar.style.setProperty('transition-property', 'width');
	colorProgressBar.style.setProperty('transition-timing-function', 'cubic-bezier(0,0,1,1)');
	colorProgressBar.style.setProperty('z-index', '0');

	colorBar.style.setProperty('width', '740px');
	colorBar.style.setProperty('background', 'linear-gradient(90deg, #ffece5, #ff5435 80%, red 95%');
	colorBar.style.setProperty('box-shadow', '2px 2px 10px -8px');

	if (barSwitchBtn.checked) {
		document.getElementById('rtBar').style.removeProperty('display');
	} else {
		document.getElementById('rtBar').style.setProperty('display', 'none');
	}

	var b = [];
	var timer;
	var timeA = 0;
	var passedTime = 0;
	var gmid = document.location.href.slice(-6).replace(/[^\d]/g, '');
	var url = "http://klavogonki.ru/g/" + gmid + ".info";
	var gameInfo = JSON.parse(httpGet(url));
	var name = document.getElementsByClassName('name')[0].innerText.trim();
	var bestSpeed;

	for (let i = 0; i < gameInfo.players.length; i++) {
		if (gameInfo.players[i].name == name) {
			bestSpeed = gameInfo.players[i].user.best_speed;
		}
	}

	async function checkInputActivity() {
		if (document.getElementById('inputtext').className == 'normal') {
			//console.log((1000 * (60 / (inputSpeed.value / length))) + 'ms');
			colorProgressBar.style.setProperty('transition-duration', (1000 * (60 / (inputSpeed.value / length))) + 'ms');
			colorProgressBar.style.setProperty('width', '740px');
			timeA = Date.now();
			timer = setTimeout(startBar(), interval);
			checkInputDisability();
			//console.log((60 / (inputSpeed.value / length)));
			return;
		} else {
			await sleep(10);
			checkInputActivity();
			return;
		}
	}

	async function checkInputDisability() {
		let speed = document.getElementsByClassName('you')[0].getElementsByClassName('bitmore')[2];
		if (speed != undefined) {
			bestSpeedLabel.innerText = 'Скорость ' + ((speed.innerText * 100) / bestSpeed).toFixed(1) + '% от рекорда';
			return;
		} else {
			await sleep(100);
			checkInputDisability();
			return;
		}
	}

	checkInputActivity();

	function startBar() {
		if (rtBar.value != rtBar.max) {
			rtBar.value++;
			passedTime += Date.now() - timeA;
			b.push(Date.now() - timeA);
			/*console.table('proshlo: ', Date.now() - timeA,
						' over: ', Date.now() - timeA - interval,
						' passedTime: ', passedTime,
						' next after: ', (interval - (passedTime - (rtBar.value * interval))),
						' rtBar: ', rtBar.value);*/
			timer = setTimeout(startBar, (interval - (passedTime - (rtBar.value * interval))));
			timeA = Date.now();
			return;
		}
		clearInterval(timer);
		//var o = 0; for (let i = 0; i < b.length; i++) { o += b[i]; } console.log(o); // <-- complete in time
		return;
	}

	function setInt(speed, length) {
		interval = (1000 / (length / (60 / (speed / length)))).toFixed();
		return;
	}

	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}());
