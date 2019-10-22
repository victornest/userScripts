// ==UserScript==
// @name         TextInConsole
// @version      0.01
// @namespace    klavogonki
// @description  Вывод текста заезда в консоль
// @author       490344
// @include      http://klavogonki.ru/g/*
// @grant        none
// ==/UserScript==


(function() {
	var proxied = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            try {
                var json = JSON.parse(this.responseText);
                if ('text' in json) {
                    console.log(json.text.text);
					return;
                }
            } catch (e) {}
        }.bind(this));
        return proxied.apply(this, [].slice.call(arguments));
    };
})();
