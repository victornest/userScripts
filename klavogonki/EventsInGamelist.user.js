// ==UserScript==
// @name           Events in gamelist
// @version        0.15
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/gamelist/
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

(function() {
	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}

//fitting head
	document.getElementById('logo').firstElementChild.firstElementChild.style.setProperty('width', '100%');
	document.getElementsByClassName('right')[1].style.setProperty('padding-top', '0px');
	document.getElementsByClassName('right')[1].childNodes[1].style.setProperty('height', '0');

//insert table
	var table = document.createElement('div');
	table.innerHTML = "<table><tbody></tbody></table>";
	document.getElementsByClassName('minwidth_container')[0].insertBefore(table, document.getElementsByClassName('minwidth_container')[0].childNodes[5]);
	table.style.setProperty('padding', '7px 0px 6px 0px');
	table.setAttribute('class', 'event-table');
	table = document.getElementsByClassName('minwidth_container')[0].childNodes[5].firstElementChild.firstElementChild;
	table.setAttribute('class', 'event-table-tbody');
	table.style.setProperty('position', 'relative');
	table.style.setProperty('left', '10px');
	table.style.setProperty('top', '15%');
	table.style.setProperty('z-index', '1');

//getting events
    var el = document.createElement('html');
	el.innerHTML = httpGet('http://klavogonki.ru/forum/events/');

//insert events
	var title = el.getElementsByClassName('item');
	var dateNow = new Date(Date.now());
	var j = 0;
	for (let i = 0; i < 10; i++) {
		//console.log('f');
		let date = parseInt(title[i + 20].firstElementChild.firstElementChild.innerText.trim().slice(1, 3));
		let month = parseInt(title[i + 20].firstElementChild.firstElementChild.innerText.trim().slice(4, 6)) - 1;
		let year = parseInt('20' + title[i + 20].firstElementChild.firstElementChild.innerText.trim().slice(7, 9));
		//console.log('now', dateNow.getDate(), dateNow.getMonth(), dateNow.getFullYear(), '\n', 'event', date, month, year);
		if ((dateNow.getDate() <= date) && (dateNow.getMonth() <= month) && (dateNow.getFullYear() <= year)) {
			table.innerHTML += '<tr><td><a></a></td></tr>';
			table.childNodes[j].childNodes[0].firstElementChild.innerText = title[i + 20].firstElementChild.firstElementChild.innerText.trim();
			table.childNodes[j].childNodes[0].firstElementChild.href = title[i + 20].firstElementChild.firstElementChild.firstElementChild.href;
			j++;
		}
	}
	for (let i = 0; i < j; i++) {
		table.getElementsByTagName('a')[i].setAttribute('class', 'quickEvent');
		table.getElementsByTagName('td')[i].style.setProperty('height', '20px');
	}

	var css =
		' :root { ' +
		' --mainColor: #ff9800; } ' +

		' #head { ' +
		' position: absolute; ' +
		' background: white url(/img/top_back_gray.gif) repeat-x 0% 10% !important;' +
		' border-bottom-left-radius: 60px; ' +
		' border-bottom-right-radius: 60px; ' +
		' box-shadow: 0px 0px 10px -3px; ' +
		' width: -moz-available; ' +
		' top: 44px; } ' +

		' #logo { ' +
		' width: 108px; }' +

		' #content { ' +
		' padding-top: 50px; } ' +

		' .event-table { ' +
		' max-height: 50px; ' +
		' overflow: hidden; } ' +

		' .event-table:hover { ' +
		' overflow: visible; }' +

		' .event-table-tbody { ' +
		' background: rgba(235,235,235,0.9); ' +
		' box-shadow: 0px 0px 5px 1px gray; } ' +

		' a.quickEvent { ' +
		' background: linear-gradient( to right, var(--mainColor) 0%, var(--mainColor) 5px, transparent 5px); ' +
		' background-repeat: repeat-x; ' +
		' background-size: 100%; ' +
		' color: #000; ' +
		' padding-left: 10px; ' +
		' margin-top: 10px; ' +
		' text-decoration: none; } ' +

		' a.quickEvent:hover { ' +
		' color: #454545; ' +
		' background: linear-gradient( to right, var(--mainColor) 0%, var(--mainColor) 5px, transparent ); } ';

	var style = document.createElement('style');
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	document.getElementsByTagName('head')[0].appendChild(style);

})();
