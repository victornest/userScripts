// ==UserScript==
// @name           stabiloCheat
// @version        0.04
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

	var injPlace = document.getElementById('params').getElementsByClassName('rc')[0];
	var injNode = document.createElement('div');
	var inputSpeed = document.createElement('input');
	var tfs = document.createElement('div');

	injNode.insert(inputSpeed);
	injNode.insert(tfs);
	injPlace.insertBefore(injNode, injPlace.childNodes[3]);

	inputSpeed.style.setProperty('display', 'inline');
	inputSpeed.style.setProperty('max-width', '40px');
	inputSpeed.style.setProperty('border', 'solid 1px #d5d5d5');
	inputSpeed.style.setProperty('text-align', 'center');
	inputSpeed.addEventListener('keyup', function () {
		document.getElementById('tfs').innerText = getTime(this.value);
	});

	tfs.style.setProperty('display', 'inline');
	tfs.style.setProperty('padding-left', '5px');
	tfs.setAttribute('id', 'tfs');

	function getTime(speed) {
		var time = (60 / (speed / length));
		if (time > 60) {
			time = (Math.floor(time / 60) + ':' + time % 60)
		}
		return time;
	}


})();
