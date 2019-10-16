// ==UserScript==
// @name           stabiloCheat
// @version        0.07
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

	window.XMLHttpRequest.prototype.send = function () {
		this.addEventListener('load', function () {
			try {
				var json = JSON.parse(this.responseText);
				if ('text' in json) {
					text = json.text;
					length = json.text.length;
					if (localStorage.stabiloCheat) {
						document.getElementById('inputSpeed').value = +localStorage.stabiloCheat;
						getTime(document.getElementById('inputSpeed').value);
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
	var tfsInputInjNode = document.createElement('div');
	var inputSpeed = document.createElement('input');
	var tfs = document.createElement('div');

	tfsInputInjNode.insert(inputSpeed);
	tfsInputInjNode.insert(tfs);
	tfsInputInjPlace.insertBefore(tfsInputInjNode, tfsInputInjPlace.childNodes[3]);

	inputSpeed.style.setProperty('display', 'inline');
	inputSpeed.style.setProperty('max-width', '40px');
	inputSpeed.style.setProperty('border', 'solid 1px #d5d5d5');
	inputSpeed.style.setProperty('text-align', 'center');
	inputSpeed.setAttribute('id', 'inputSpeed');
	inputSpeed.addEventListener('keyup', function () {
		getTime(this.value);
		localStorage.stabiloCheat = this.value;
		setInt(inputSpeed.value, length);
	});

	tfs.setAttribute('id', 'tfs');
	tfs.style.setProperty('display', 'inline');
	tfs.style.setProperty('padding', '0 5px 0 5px');
	tfs.style.setProperty('border-right', 'solid black 1px');

	function getTime(speed) {
		var time = (60 / (speed / length)).toFixed(2);
		if (time > 60) {
			console.log(time);
			time = (Math.floor(time / 60) + ':' + (time % 60).toFixed(1));
		}
		document.getElementById('tfs').innerText = time;
		return;
	}




// ******** REMAINING TIME BAR ********

	var rtBarInjPlace = document.getElementById('sortable');
	var rtBarInjNode = document.createElement('div');
	var rtBar = document.createElement('input');
	var colorBar = document.createElement('div');

	rtBarInjNode.insert(rtBar);
	rtBarInjNode.insert(colorBar);
	//console.log(rtBarInjPlace.childNodes);
	rtBarInjPlace.insertBefore(rtBarInjNode, rtBarInjPlace.childNodes[1]);

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

	var colorProgressBar = colorBar.cloneNode();
	colorBar.insert(colorProgressBar);

	colorProgressBar.style.setProperty('background', 'white');
	colorProgressBar.style.setProperty('max-width', '740px');
	colorProgressBar.style.setProperty('width', '0px');
	colorProgressBar.style.setProperty('transition-property', 'width');
	colorProgressBar.style.setProperty('transition-timing-function', 'cubic-bezier(0,0,1,1)');

	colorBar.style.setProperty('width', '740px');
	colorBar.style.setProperty('background', 'linear-gradient(90deg, #ffece5, #ff5435 80%, red 95%');
	colorBar.style.setProperty('box-shadow', '2px 2px 10px -7px');


	var b = [];
	var timer;
	var timeA = 0;
	var passedTime = 0;

	async function checkInputActivity() {
		if (document.getElementById('inputtext').className == 'normal') {
			//console.log((1000 * (60 / (inputSpeed.value / length))) + 'ms');
			colorProgressBar.style.setProperty('transition-duration', (1000 * (60 / (inputSpeed.value / length))) + 'ms');
			colorProgressBar.style.setProperty('width', '740px');
			timeA = Date.now();
			timer = setTimeout(startBar(), interval);
			//console.log((60 / (inputSpeed.value / length)));
			return;
		} else {
			await sleep(10);
			checkInputActivity();
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

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}());
