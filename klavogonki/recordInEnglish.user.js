// ==UserScript==
// @name           record in english
// @version        0.1
// @namespace      klavogonki
// @author         490344
// @include        http*://klavogonki.ru/u/*
// @grant          none
// ==/UserScript==

(function () {

	var main = function(stats) {
		var statsBlock = stats;
		var id = document.URL.replace(/[^\d]/g, '');
		var clone = statsBlock.children[3].cloneNode(true)
		clone.querySelector('.title').textContent = 'Record in English'
		clone.querySelector('.xs').textContent = 'spm'
		clone.querySelector('.clickable').href = '#/' + id + '/stats/voc-5539/';
		var rec = recEng(id);
		var color = getColor(rec);
		clone.querySelector('.sm').textContent = rec;
		clone.querySelector('.sm').style.color = color;
		statsBlock.children[3].querySelector('.sm').style.color = getColor(statsBlock.children[3].querySelector('.sm').textContent);
		statsBlock.insertBefore(clone, statsBlock.children[4])
	}

	function getColor(rec) {
		if (rec > 799)
			return '#061956';
		if (rec > 699)
			return '#2E32CE';
		if (rec > 599)
			return '#5E0B9E';
		if (rec > 499)
			return '#BC0143';
		if (rec > 399)
			return '#BA5800';
		if (rec > 299)
			return '#8C8100';
		if (rec > 199)
			return '#187818';
		if (rec > 99)
			return '#4F9A97';
		else
			return '#8D8D8D';
	}

	var targetNode = document.body;
	var config = { childList: true };
	var callback = function(mutationsList) {
		for(let mutation of mutationsList) {
			if (document.querySelector('.stats .content')) {
				main(document.querySelector('.stats .content'), observer);
				main = '';
			}
		}
	};
	var observer = new MutationObserver(callback);
	observer.observe(targetNode, config);

	function recEng(id) {
		var req = new XMLHttpRequest();
		req.open('GET', 'http://klavogonki.ru/ajax/profile-popup?user_id=' + id + '&gametype=voc-5539', false);
		req.send(null);
		if(req.status == 200) {
			var a = document.createElement('html');
			a.innerHTML = req.responseText;
			a = a.getElementsByTagName('td')[5].firstChild.textContent.replace(/[^\d]/g, '');
			return a;
		} else {
			return (console.log('can\'t get url'))
		}
	}
}());
