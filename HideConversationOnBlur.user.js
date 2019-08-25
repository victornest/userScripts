// ==UserScript==
// @name           HideConversationOnBlur
// @version        0.1
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/u/
// @grant          none
// ==/UserScript==

window.onblur = function() {
	document.getElementsByClassName('btn back')[0].click();
};
