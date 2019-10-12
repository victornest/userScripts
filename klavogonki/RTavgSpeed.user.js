// ==UserScript==
// @name           RTavgSpeed
// @version        0.10
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          unsafeWindow
// ==/UserScript==

(function() {
	var startTime;
	var endTime;
	async function checkInputActivity() {
		if (document.getElementById('inputtext').className == 'normal') {
			startTime = Date.now();
			checkInputDisability();
			main();
			return;
		} else {
			unsafeWindow.txt = text;
			await sleep(10);
			checkInputActivity();
			return;
		}
	}

	async function checkInputDisability() {
		if (document.getElementById('typeplayblock').style.display == 'none') {
			endTime = Date.now();
			var avgSpeed = ((60 / ((endTime - startTime) / 1000)) * length) + 4;
			//var speedpanel = document.getElementById('speedpanel');
			var avgSpeedLabel = document.getElementsByClassName('speedLabel')[0];
			//avgSpeedLabel.style.color = "red";
			avgSpeedLabel.innerText = avgSpeed.toFixed(0);
			console.log(avgSpeed);
			return;
		} else {
			await sleep(100);
			checkInputDisability();
			return;
		}
	}

	checkInputActivity();

	var proxied = window.XMLHttpRequest.prototype.send;
	var length;
	var text;
	window.XMLHttpRequest.prototype.send = function () {
		this.addEventListener('load', function () {
			try {
				var json = JSON.parse(this.responseText);
				if ('text' in json) {
					text = parseText(json.text.text);
					length = text.length;
				}
			} catch (e) {}
		}.bind(this));
		return proxied.apply(this, [].slice.call(arguments));
	};

	function parseText(text) {
		text = text.replace(RegExp(/[«»]/g), '"');
		text = text.replace(RegExp(/[−–—]/g), '-');
		return text;
	}

	function main() {
		var arrText = [];
		for (let i = 0; i < text.split(' ').length; i++) {
			if (i == text.split(' ').length - 1) {
				arrText.push(text.split(' ')[i]);
			} else {
				arrText.push(text.split(' ')[i] += ' ');
			}
		}

		var input = document.getElementById('inputtext');
		var iterCurrentRightString = 0;
		var iterLetters = 0;
		var iterWords = 0;
		var typingLength = 0;

		var speedpanel = document.getElementById('speedpanel');
		var avgSpeedLabel = speedpanel.childNodes[3].cloneNode();
		speedpanel.childNodes[3].style.display = 'none';
		avgSpeedLabel.className = 'speedLabel';
		speedpanel.insertBefore(avgSpeedLabel, speedpanel.childNodes[5]);
		avgSpeedLabel = document.getElementsByClassName('speedLabel')[0];

		input.addEventListener('keypress', async function(e) {
			checkError(e.key);
			//console.log({'word: ' : iterWords, 'letter: ' : iterLetters});
		});

		getAvgSpeed(startTime);







		//////////FUNCTIONS//////////

		async function getAvgSpeed(startTime) {
			if (document.getElementById('typeplayblock').style.display == 'none') {
				return;
			}
			var avgSpeed = ((60 / ((Date.now() - startTime) / 1000)) * currentRightLength()) + 4;
			avgSpeedLabel.innerText = avgSpeed.toFixed(0);
			avgSpeedLabel.style.color = "white";
			await sleep (50);
			getAvgSpeed(startTime);
			return;
		}

		function checkError(key) {
			if (checkInput(input.value + key)) {
				if ((input.value + key) == arrText[iterWords].slice(0, (input.value + key).length)) {
					iterCurrentRightString++;
					if ((input.value + key) == arrText[iterWords]) {
						iterCurrentRightString = 0;
						iterWords++;
					}
				}
			}
			return currentRightLength();
		}

		function checkInput(value) {
			for (var i = 0; i < value.length; i++) {
				if (arrText[iterWords][i] == value[i]) {
					continue;
				} else {
					console.log(value);
					return false;
				}
			}
			//console.log('input == true');
			return true;
		}

		function currentRightLength() {
			var length = 0;
			for (var i = 0; i < iterWords; i++) {
				length += arrText[i].length;
			}
			return (length + iterCurrentRightString);
		}
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

})();
