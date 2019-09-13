// ==UserScript==
// @name           SpeedCoeff
// @version        0.1
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==



(async function(){

	function httpPost(theUrl, params) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", theUrl, false );
		xmlHttp.onreadystatechange = (function() {
			if (this.readyState == 4 && this.status == 200) {
				if (this.responseText == '{"ok":1}') {
					//console.log(this.responseText);
				} else {
					//alert(this.responseText);
				}
			}
		});
		xmlHttp.send(params);
		return xmlHttp.responseText;
	}

	function GetC(speed, avgSpeed, maxSpeed) {
		var c = (maxSpeed - avgSpeed)/100;
		var diffSpeed = speed - avgSpeed;
		return parseFloat((diffSpeed/c).toFixed(3));
	}

	function CalculateCoeff(obj, gameInfo, player) {
		try {
			var id = parseInt(obj.parentNode.previousSibling.getElementsByTagName('a')[0].href.replace(/[^\d]/g, ''));
			var speed = parseInt(obj.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('bitmore')[2].innerText);
			var avgSpeed = gameInfo.players.find(function(element) {
				return (element.user.id == +id)
			}).user.avg_speed.round();
			var maxSpeed = gameInfo.players.find(function(element) {
				return (element.user.id == +id)
			}).user.best_speed.round();
			//console.log(speed, avgSpeed, maxSpeed);

			var div = document.createElement('div');
			div.setAttribute('id', 'speed-coeff' + id);
			div.style.setProperty('display', 'none');
			div.style.setProperty('width', '100px');
			div.style.setProperty('height', '50px');
			div.innerHTML = '<p>&nbsp;</p><p style="text-align: center">' + GetC(speed, avgSpeed, maxSpeed) + '</p>';
			obj.parentNode.insertBefore(div, obj);
			return id;
		} catch(error) {
			return false;
		}
	}

	function Sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function GetGameInfo() {
		var gmid = document.location.href.slice(-6).replace(/[^\d]/g, '');
		var url = "http://klavogonki.ru/g/" + gmid + ".info";
		return JSON.parse(httpPost(url));
	}

	async function main() {
		try {
			if (document.getElementById('typetext').style.display === 'none') {
				await Sleep(1000);
				main();
				return;
			} else {
				var gameInfo = GetGameInfo();
				var player = document.getElementById('players').childNodes;
				for (var i = 0; i < player.length; i++) {
					var car = player[i].getElementsByClassName('car ng-isolate-scope')[0];
					car.onmouseenter = function() {
						if (CalculateCoeff(this, gameInfo, player)) {
							this.onmouseenter = function() {
								this.style.setProperty('display', 'none');
								this.previousSibling.style.setProperty('display', '');
							};
							this.previousSibling.onmouseleave = function() {
								this.style.setProperty('display', 'none');
								this.nextSibling.style.setProperty('display', '');
							};
						}
					}
				}
			}
		} catch(error) {
			console.log('erop');
			main();
			return;
		}
	}
	main();

})();
