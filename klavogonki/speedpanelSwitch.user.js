// ==UserScript==
// @name           speedpanel switch
// @version        0.1
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

(function() {
	var insert = document.getElementById('status-block');
	var panel = document.getElementById('speedpanel');
	var btn = document.createElement('input');
	btn.id = 'speedpanelswitch';
	btn.type = 'button';
	insert.insert(btn);

	btn.addEventListener('click', off);

	function off(){
		panel.style.display = 'none';
		btn.removeEventListener('click', off);
		btn.addEventListener('click', on);
	}
	function on(){
		panel.style.display = '';
		btn.removeEventListener('click', on);
		btn.addEventListener('click', off);
	}

	var css =
		'#speedpanelswitch {'+
		'box-shadow:inset 0px 1px 0px 0px #ffffff;'+
		'background:linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);'+
		'background-color:#f9f9f9;'+
		'border-radius:6px;'+
		'border:1px solid #dcdcdc;'+
		'position:absolute;'+
		'top:-15px;'+
		'left:0px;'+
		'width:40px;'+
		'height:15px;'+
		'}'+

		'#speedpanelswitch:hover {'+
		'background:linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);'+
		'background-color:#e9e9e9;'+
		'}'+

		'#speedpanelswitch:active {'+
		'left:1px;'+
		'}';


	var style = document.createElement('style');
	if (style.styleSheet)
		style.stylesheet.cssText = css;
	else
		style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
})();
