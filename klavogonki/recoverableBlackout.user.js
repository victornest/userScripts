// ==UserScript==
// @name           recoverableBlackout
// @version        0.01
// @namespace      klavogonki
// @namespace      klavogonki
// @description    Восстановление затемнения при фокусе на строке ввода
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

document.addEventListener('load', function() {
	var inputtext = document.getElementById('inputtext');
	var mainblock = document.getElementById('main-block');
	var shadow = document.getElementById('shadow');
	var kruglieUgolki = document.getElementById('typeblock').firstElementChild;

	inputtext.addEventListener('focus', function(){
		mainblock.style.setProperty('z-index', '1000');
		shadow.style.removeProperty('display');
		kruglieUgolki.className = 'tl r2';
	});
}());
