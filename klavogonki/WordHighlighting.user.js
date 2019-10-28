// ==UserScript==
// @name         WordHighlighting
// @namespace    klavogonki
// @version      0.03
// @author       490344
// @include      http://klavogonki.ru/g/*
// @include      https://klavogonki.ru/g/*
// @grant        none
// ==/UserScript==

(function() {

	if (localStorage.wordHighlighting === undefined) {
		localStorage.wordHighlighting = JSON.stringify({
			color: '#6fff7d',
			transparency: 128
		});
	} else {
		let data = JSON.parse(localStorage.wordHighlighting);
		if ((data.color.slice(0, 1) !== '#') && (data.color.length !== 7))
			data.color = '#6fff7d';
		if ((data.transparency < 0) || (data.transparency > 255))
			data.transparency = 128;
		localStorage.wordHighlighting = JSON.stringify(data);
	}

//adding observation for #typefocus
	const targetNode = document.getElementById('typetext');
	const config = { attributes: true, childList: true, subtree: true };
	const callback = function(mutationsList, observer) {
		for(let mutation of mutationsList) {
			if (mutation.type === 'childList') {
				observer.disconnect();
				if (document.getElementById('WH-span') !== null) {
					document.getElementById('WH-span').remove();
				}
				var el = document.createElement('span');
				el.setAttribute('id', 'WH-span');
				document.getElementById('typefocus').insert(el);
				highlightCss();
				observer.observe(targetNode, config);
			}
		}
	};
	var observer = new MutationObserver(callback);

//adding color button and transparency
	var injPlace = document.getElementById('param_highlight').parentNode;

	var settingsContainer = document.createElement('div');
	var color = document.createElement('input');
	var transparency = document.createElement('input');

	settingsContainer.style.setProperty('display', 'inline');

	color.setAttribute('id', 'WH-color');
	color.type = 'color';
	color.addEventListener('input', function() {
		highlightCss();
		let data = JSON.parse(localStorage.wordHighlighting);
		data.color = color.value;
		localStorage.wordHighlighting = JSON.stringify(data);
	});
	color.value = JSON.parse(localStorage.wordHighlighting).color;

	transparency.setAttribute('id', 'WH-transparency');
	transparency.type = 'range';
	transparency.min = 0;
	transparency.max = 255;
	transparency.step = 1;
	transparency.valueAsNumber = 0;
	transparency.addEventListener('input', function() {
		highlightCss();
		let data = JSON.parse(localStorage.wordHighlighting);
		data.transparency = transparency.valueAsNumber;
		localStorage.wordHighlighting = JSON.stringify(data);
	});
	transparency.value = JSON.parse(localStorage.wordHighlighting).transparency;

	settingsContainer.insert(color);
	settingsContainer.insert(transparency);
	injPlace.insertBefore(settingsContainer, injPlace.getElementsByTagName('br')[0]);

	waitingForStart();
	settingsCss();

//FUNCTIONS

	async function waitingForStart() {
		if (!document.getElementById('typefocus')) {
			await sleep(100);
			waitingForStart();
		} else {
			observer.observe(targetNode, config);
		}
	}

	function highlightCss() {
		if (document.getElementById('WH-style') !== null)
			document.getElementById('WH-style').remove();
		var css =
			' #typeblock { ' +
			' z-index: 10; } ' +

			' .highlight { ' +
			' position: relative; ' +
			' text-decoration: none !important; ' +
			' color: #222222 !important; }' +

			' #WH-span::before { ' +
			' content: ""; ' +
			' position: absolute; ' +
			' border-radius: 10px; ' +
			' background: ' + color.value + decimalToHex(transparency.valueAsNumber) + '; ' +
			' top: -2px; ' +
			' left: -4px; ' +
			' width: ' + (document.getElementById('typefocus').getWidth() + 8) + 'px; ' +
			' height: ' + (document.getElementById('typefocus').getHeight() + 5) + 'px; ' +
			' z-index: -1; } ' +

			' .highlight_error { ' +
			' position: relative; ' +
			' text-decoration: none !important; ';


		var style = document.createElement('style');
		style.setAttribute('id', 'WH-style');
		if (style.styleSheet)
			style.stylesheet.cssText = css;
		else
			style.appendChild(document.createTextNode(css));
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function settingsCss() {
		var css =
			' #WH-color { ' +
			' border: none; ' +
			' padding: 0 0; ' +
			' width: 15px; ' +
			' height: 15px; ' +
			' top: 3px !important; ' +
			' left: 10px; } ' +

			' #WH-transparency { ' +
			' padding: 0 0; ' +
			' left: 20px; ' +
			' top: 8px !important; } ' +

			' #typetext { ' +
			' word-break: keep-all; } ';

		var style = document.createElement('style');
		if (style.styleSheet)
			style.stylesheet.cssText = css;
		else
			style.appendChild(document.createTextNode(css));
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function decimalToHex(d) {
		var hex = d.toString(16);
		while (hex.length < 2) {
			hex = "0" + hex;
		}
		return hex;
	}

	function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();
