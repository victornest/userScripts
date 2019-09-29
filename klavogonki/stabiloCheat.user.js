// ==UserScript==
// @name           stabiloCheat
// @version        0.03
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @grant          unsafeWindow
// ==/UserScript==

(function() {
	var proxied = window.XMLHttpRequest.prototype.send;
	var length;
    window.XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            try {
                var json = JSON.parse(this.responseText);
                if ('text' in json) {
                    length = (json.text.length);
                }
            } catch (e) {}
        }.bind(this));
        return proxied.apply(this, [].slice.call(arguments));
    };

	unsafeWindow.timeForSpeed = function(speed) {
		var time = (60 / (speed / length));
		if (time > 60) {
			time = (Math.floor(time / 60) + ':' + time % 60)
		}
		return console.log(time);
	};

})();
