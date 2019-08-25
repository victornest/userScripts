// ==UserScript==
// @name           QuickNext
// @version        0.1
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==

(function(){
    document.addEventListener('keydown', function(e) {
        if ((e.keyCode === 17) && (e.location === 2)) {
            document.location = document.URL.replace(/[^\d]/g, '') + ".replay";
        }
    }, false);
  	return false;
})();
