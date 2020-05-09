// ==UserScript==
// @name           SpamFilter
// @namespace      klavogonki
// @include        http*://klavogonki.ru/g*
// @author         Великий и медицинский
// @version        1.0
// @description    Спам-фильтр

// ==/UserScript==

(function() {

	var targetNode = document.querySelector('.messages-content').childNodes[3];
	var config = { attributes: true, childList: true, subtree: true };
	var callback = function(mutationsList, observer) {
		for(let mutation of mutationsList) {
			checkId();
		}
	};
	var observer = new MutationObserver(callback);
	observer.observe(targetNode, config);

	function checkId() {
		var list = document.querySelector('.messages-content').querySelectorAll('.username');
		for (var i = 0; i <= list.length; i++) {
			if (list[i].firstElementChild.attributes[0].nodeValue.length > 8)
				document.querySelector('.messages-content').querySelectorAll('.username')[i].parentNode.style.display = 'none';
		}
	}

})();
