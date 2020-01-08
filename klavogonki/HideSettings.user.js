// ==UserScript==
// @name           HideSettings
// @version        0.1
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

function main() {
    var playR = document.getElementById('play-right');
	var btn = document.createElement('div');
	btn.innerText = '🍆';
	btn.style.setProperty('position', 'absolute');
	btn.style.setProperty('top', playR.positionedOffset()[1] + 25 + 'px');
	playR.style.setProperty('display', 'none');
	playR.parentNode.insert(btn);

	function show() {
		playR.style.removeProperty('display');
		btn.removeEventListener('click', show)
		btn.addEventListener('click', hide);
	}
	function hide() {
		playR.style.setProperty('display', 'none');
		btn.removeEventListener('click', hide)
		btn.addEventListener('click', show);
	}
	btn.addEventListener('click', show);
}

var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + main + ")()"));
document.body.appendChild(inject);
