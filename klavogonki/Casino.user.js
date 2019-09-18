// ==UserScript==
// @name           Casino
// @version        3.39
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/g/*
// @grant          unsafeWindow
// ==/UserScript==


unsafeWindow.casinoBlacklistAdd = false;
unsafeWindow.casinoBlacklistRemove = false;
function abc() {
    if (localStorage.casino == undefined) {
			localStorage.casino = "{\"blacklist\":[]}";
    }
	var blacklistShow = function(){ return JSON.parse(localStorage.casino).blacklist; };
	unsafeWindow.casinoBlacklistShow = blacklistShow();
	if (unsafeWindow.casinoBlacklistAdd) {
		let blacklist = JSON.parse(localStorage.casino);
		blacklist.blacklist[blacklist.blacklist.length] = unsafeWindow.casinoBlacklistAdd;
		localStorage.casino = JSON.stringify(blacklist);
		unsafeWindow.casinoBlacklistAdd = false;
	}
	if (unsafeWindow.casinoBlacklistRemove) {
		let blacklist = JSON.parse(localStorage.casino);
		blacklist.blacklist.splice(blacklist.blacklist.findIndex(function(element){return element == unsafeWindow.casinoBlacklistRemove}), 1)
		localStorage.casino = JSON.stringify(blacklist);
		unsafeWindow.casinoBlacklistRemove = false;
	}
}
setInterval(abc, 1000);

function main() {
	var gmid = document.location.href.slice(-6).replace(/[^\d]/g, '');
	var url = "http://klavogonki.ru/g/" + gmid + ".info";
	var gameInfo;

	var inputs = document.querySelectorAll( '[id^="chat-game"]' )[0].getElementsByTagName( 'input' );
	function PrintChat(text) {
		var announcement = text;
		inputs[0].value = announcement;
		inputs[1].click();
	}
	//console.log(gameInfo);

	async function a() {
		//waiting for start
		if (document.getElementById('typetext').style.display === 'none') {
			await Sleep(1000);
			a();
		//getting game info on start
		} else {
			gameInfo = JSON.parse(httpGet(url));
			console.log(gameInfo);
			document.getElementById("autosort").addEventListener('click', Start);
			return;
		}
	}

	async function c(id, main) {
		var amount;
		var params;
		var avgSpeed;
		var speed;
		var errCount;
		try {
			var myId = parseInt(document.querySelectorAll( '[class="player you ng-scope"]' )[0].querySelectorAll( '[href]' )[0].pathname.replace(/[^\d]/g, ''));
			var mySpeed = parseInt(document.querySelectorAll( '[class="player you ng-scope"]' )[0].getElementsByClassName('bitmore')[3].textContent);
			var myErrCount = parseInt(document.querySelectorAll( '[class="player you ng-scope"]' )[0].getElementsByClassName('bitmore')[4].textContent);
		} catch(error) {
			await Sleep(500);
			c(id, main);
			return;
		}
		var myAvgSpeed;
		var extraGameInfo = [];
		function extraGameInfoObj (a, b, c) {
			this.id = a;
			this.avgSpeed = b;
			this.name = c;
		}

		//sending scores
		function Send(amount, id, name, myErrCount, errCount) {
			//blacklist check
			if (JSON.parse(localStorage.casino).blacklist.find(function(element){return element == id})) {
				PrintChat('Упс! ' + name + ' оказался неплательщиком! В участии отказано! Казино вызвало охрану.');
				main.style.setProperty('background', '#fff');
				main.style.setProperty('border', 'solid #fff 0px');
				main.onmouseenter = '';
				main.onmouseleave = '';
				return;
			}

			var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAKRJREFUOMudk0ESwyAMA5dO/mV+hviZ/TL3RNJ2EmiiK7CyNKYAIJInEmVDZLZn7wslX7MLvfcl5BIQEQgREUTEPcBwFsLMcHdKL/8BhrOZfXSl/exX2yp/RODVAb6glwAzAz9c8WOKM8BpB9lydx2gUegS0HvfCxOitcZsT6Z7cBpv1UFrDTq4O0LUqFSvkylEXklSzoTIWxFuT7ASIkfdj7/zG88ZuXfMZDyDAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA3LTE1VDIzOjExOjM1KzAwOjAwBj7ISAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNy0xNVQyMzoxMTozNSswMDowMHdjcPQAAAAASUVORK5CYII=';
			var url = "http://klavogonki.ru/api/profile/send-scores";
			try {
				if (myErrCount || errCount) {
					amount += ((myErrCount - errCount) * 50);
					params = '{"respondentId":' + id + ',"message":"![](' + img + ') Выигрыш в БО-казино!","amount":' + amount + '}';
					httpPost(url, params);
					PrintChat(name + ' выигрывает ' + amount + ' очков!');
					main.style.setProperty('background', '#fff');
					main.style.setProperty('border', 'solid #fff 0px');
					main.onmouseenter = '';
					main.onmouseleave = '';
					return;
				} else {
					params = '{"respondentId":' + id + ',"message":"![](' + img + ') Выигрыш в БО-казино!","amount":' + amount + '}';
					httpPost(url, params);
					PrintChat(name + ' выигрывает ' + amount + ' очков!');
					main.style.setProperty('background', '#fff');
					main.style.setProperty('border', 'solid #fff 0px');
					main.onmouseenter = '';
					main.onmouseleave = '';
					return;
				}
			} catch(error) {
				alert('post scores error');
			}
		}

		//getting scores
		function Get(amount, id, name, myErrCount, errCount) {
			try {
				if (myErrCount || errCount) {
					amount += ((errCount - myErrCount) * 50);
					PrintChat(name + ' проигрывает ' + amount + ' очков!');
					main.style.setProperty('background', '#fff');
					main.style.setProperty('border', 'solid #fff 0px');
					main.onmouseenter = '';
					main.onmouseleave = '';
				} else {
					PrintChat(name + ' проигрывает ' + amount + ' очков!');
					main.style.setProperty('background', '#fff');
					main.style.setProperty('border', 'solid #fff 0px');
					main.onmouseenter = '';
					main.onmouseleave = '';
				}
			} catch(error) {
				alert('get scores error');
			}
		}

		//draw
		function Draw(id, name) {
			//blacklist check
			if (JSON.parse(localStorage.casino).blacklist.find(function(element){return element == id})) {
				PrintChat('Упс! ' + name + ' оказался неплательщиком! В участии отказано! Казино вызвало охрану.');
				main.style.setProperty('background', '#fff');
				main.style.setProperty('border', 'solid #fff 0px');
				main.onmouseenter = '';
				main.onmouseleave = '';
				return;
			}
			PrintChat(name + ', ничья!');
			main.style.setProperty('background', '#fff');
			main.style.setProperty('border', 'solid #fff 0px');
			main.onmouseenter = '';
			main.onmouseleave = '';
		}

		function DrawCSS() {
			main.onmouseenter = function() { main.style.setProperty('background', '#8d94fc') };
			main.onmouseleave = function() { main.style.setProperty('background', '#c6c9ff') };
			main.style.setProperty('background', '#c6c9ff');
			main.style.setProperty('border', 'solid #949dff 0px');
		}

		function WonCSS() {
			main.onmouseenter = function() { main.style.setProperty('background', '#fc8d8d') };
			main.onmouseleave = function() { main.style.setProperty('background', '#ffc6c6') };
			main.style.setProperty('background', '#ffc6c6');
			main.style.setProperty('border', 'solid #ff9494 1px');
		}

		function LostCSS() {
			main.onmouseenter = function() { main.style.setProperty('background', '#abfc8d') };
			main.onmouseleave = function() { main.style.setProperty('background', '#d5ffc6') };
			main.style.setProperty('background', '#d5ffc6');
			main.style.setProperty('border', 'solid #b1ff94 1px');
		}

		//list of players
		var playerList = document.getElementById('players').childNodes;

		for (let i = 0; i < playerList.length; i++) {
			//getting my average speed
			if (myId === parseInt(document.querySelectorAll( '[id^="car"]' )[i].getElementsByTagName('a')[0].href.replace(/[^\d]/g, ''))) {
				try {
					for (let j = 0; j < playerList.length; j++) {
						if (myId === gameInfo.players[j].user.id) {
							myAvgSpeed = Math.round(gameInfo.players[j].user.avg_speed * 0.9);
							break;
						}
					}
				} catch (error) {
					alert('getting my avgspeed error');
					await Sleep(500);
					c(id, main);
					return;
				}
			}

			//detecting speed and errors of player
			if (id === parseInt(document.querySelectorAll( '[id^="car"]' )[i].getElementsByTagName('a')[0].href.replace(/[^\d]/g, ''))) {
				try {
					speed = parseInt(document.querySelectorAll( '[id^="car"]' )[i].parentNode.childNodes[1].childNodes[2].childNodes[1].innerText);
					errCount = parseInt(document.querySelectorAll( '[id^="car"]' )[i].parentNode.childNodes[1].childNodes[2].childNodes[2].childNodes[0].innerText);
				} catch (error) {
					continue;
				}

				//detected players massive
				try {
					for (let j = 0; j < playerList.length; j++) {
						if (id === gameInfo.players[j].user.id) {
							extraGameInfo[i] = new extraGameInfoObj(gameInfo.players[j].user.id, gameInfo.players[j].user.avg_speed, gameInfo.players[j].name);
							if (extraGameInfo[i].name[0] == '_') {
								extraGameInfo[i].name = '\\' + extraGameInfo[i].name;
							}
							break;
						}
					}
				} catch (error) {
					alert('can\'t found id in gameInfo');
					await Sleep(500);
					c(id, main);
					return;
				}
				//limit computing
				try {
					if (extraGameInfo[i].id === 270277) {
						avgSpeed = Math.round(extraGameInfo[i].avgSpeed * 0.75); //Виталька
					}
					if (extraGameInfo[i].id === 488630) {
						avgSpeed = Math.round(extraGameInfo[i].avgSpeed * 0.7925); //_Daemon_
					} else {
						avgSpeed = Math.round(extraGameInfo[i].avgSpeed * 0.9);
					}
				} catch (error) {
					alert('limit computing error');
					await Sleep(500);
					c(id, main);
					return;
				}
				//determining winner
				try {
					//console.log('speed: ', speed, ', avgSpeed: ', avgSpeed, ', errCount: ', errCount,
					//			'\n mySpeed: ', mySpeed, ', myAvgSpeed: ', myAvgSpeed, ', myErrCount: ', myErrCount,
					//			'\n', id, playerList[i], main,
					//		    '\n', id, 'eq = ', ((id == 490344) || (id == 111001) || (id == 528143)));
					//host in a limit
					if (mySpeed > myAvgSpeed) {
						//player in a limit
						if (speed > avgSpeed) {
							//player got 0
							if (errCount == 0) {
                                //host got 0
                                if (myErrCount == 0) {
									DrawCSS();
									main.removeAttribute('disabled');
									main.onclick = function() {
										Draw(id, extraGameInfo[i].name);
										main.setAttribute('disabled', '');
									}
									main.value += ' ' + errCount + ' draw ' + myErrCount + ' me';
									return;
                                //host lose by errors
                                } else {
									main.removeAttribute('disabled');
									if ((id == 490344) || (id == 111001) || (id == 528143)) {
										WonCSS();
										main.onclick = function() {
											Send(450, id, extraGameInfo[i].name, myErrCount, errCount);
											main.setAttribute('disabled', '');
										};
										main.value += ' won ' + ((myErrCount - errCount) * 50 + 450) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
										return;
                                    } else {
										WonCSS();
										main.onclick = function() {
											Send(500, id, extraGameInfo[i].name);
											main.setAttribute('disabled', '');
										};
										main.value += ' won 500 with ' + errCount + ' vs ' + myErrCount + ' me';
										return;
                                    }
                                }
                            //player got 1+
							} else {
                                //host got 0
                                if (myErrCount == 0) {
									main.removeAttribute('disabled');
									if ((id == 490344) || (id == 111001) || (id == 528143)) {
										LostCSS();
										main.onclick = function() {
											Get(450, id, extraGameInfo[i].name, myErrCount, errCount);
											main.setAttribute('disabled', '');
										};
										main.value += ' lost ' + ((errCount - myErrCount) * 50 + 450) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
										return;
                                    } else {
										LostCSS();
										main.onclick = function() {
											Get(500, id, extraGameInfo[i].name);
											main.setAttribute('disabled', '');};
										main.value += ' lost 500 with ' + errCount + ' vs ' + myErrCount + ' me';
										return;
                                    }
                                //host got 1+
                                } else {
                                    //host got less
                                    if (myErrCount < errCount) {
										main.removeAttribute('disabled');
										if ((id == 490344) || (id == 111001) || (id == 528143)) {
											LostCSS();
											main.onclick = function() {
												Get(150, id, extraGameInfo[i].name, myErrCount, errCount);
												main.setAttribute('disabled', '');
											};
											main.value += ' lost ' + ((errCount - myErrCount) * 50 + 150) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
											return;
										} else {
											LostCSS();
											main.onclick = function() {
												Get(200, id, extraGameInfo[i].name);
												main.setAttribute('disabled', '');
											};
											main.value += ' lost 200 with ' + errCount + ' vs ' + myErrCount + ' me';
											return;
										}
                                    //host got more
                                    } else {
										if (myErrCount > errCount) {
											main.removeAttribute('disabled');
											if ((id == 490344) || (id == 111001) || (id == 528143)) {
												WonCSS();
												main.onclick = function() {
													Send(150, id, extraGameInfo[i].name, myErrCount, errCount);
													main.setAttribute('disabled', '');
												};
												main.value += ' won ' + ((myErrCount - errCount) * 50 + 150) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
												return;
											} else {
												WonCSS();
												main.onclick = function() {
													Send(200, id, extraGameInfo[i].name);
													main.setAttribute('disabled', '');
												};
												main.value += ' won 200 with ' + errCount + ' vs ' + myErrCount + ' me';
												return;
											}
										} else {
											DrawCSS();
											main.removeAttribute('disabled');
											main.onclick = function() {
												Draw(id, extraGameInfo[i].name);
												main.setAttribute('disabled', '');
											}
											main.value += ' ' + errCount + ' draw ' + myErrCount + ' me';
											return;
                                        }
                                    }
                                }
                            }
						//player not in a limit
						} else {
							//host got 0
							if (myErrCount == 0) {
								main.removeAttribute('disabled');
								if ((id == 490344) || (id == 111001) || (id == 528143)) {
									LostCSS();
									main.onclick = function() {
										Get(450, id, extraGameInfo[i].name, myErrCount, errCount);
										main.setAttribute('disabled', '');};
									main.value += ' lost ' + ((errCount - myErrCount) * 50 + 450) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								} else {
									LostCSS();
									main.onclick = function() {
										Get(500, id, extraGameInfo[i].name);
										main.setAttribute('disabled', '');
									};
									main.value += ' lost 500 with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								}
								//host got 1+
							} else {
								main.removeAttribute('disabled');
								if ((id == 490344) || (id == 111001) || (id == 528143)) {
									LostCSS();
									main.onclick = function() {
										Get(150, id, extraGameInfo[i].name, myErrCount, errCount);
										main.setAttribute('disabled', '');
									};
									main.value += ' lost ' + ((errCount - myErrCount) * 50 + 150) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								} else {
									LostCSS();
									main.onclick = function() {
										Get(200, id, extraGameInfo[i].name);
										main.setAttribute('disabled', '');
									};
									main.value += ' lost 200 with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
                                }
							}
						}
					//host not in a limit
					} else {
						//player in a limit
						if (speed > avgSpeed) {
							//player got 0
							if (errCount == 0) {
								main.removeAttribute('disabled');
								if ((id == 490344) || (id == 111001) || (id == 528143)) {
									WonCSS();
									main.onclick = function() {
										Send(450, id, extraGameInfo[i].name, myErrCount, errCount);
										main.setAttribute('disabled', '');
									};
									main.value += ' won ' + ((myErrCount - errCount) * 50 + 450) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								} else {
									WonCSS();
									main.onclick = function() {
										Send(500, id, extraGameInfo[i].name);
										main.setAttribute('disabled', '');
									};
									main.value += ' won 500 with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								}
								//player got 1+
							} else {
								main.removeAttribute('disabled');
								if ((id == 490344) || (id == 111001) || (id == 528143)) {
									WonCSS();
									if (myErrCount <= errCount) {
										main.onclick = function() {
											Send(200, id, extraGameInfo[i].name);
											main.setAttribute('disabled', '');
										};
										main.value += ' won 200 with ' + errCount + ' vs ' + myErrCount + ' me';
									} else {
										main.onclick = function() {
											Send(150, id, extraGameInfo[i].name, myErrCount, errCount);
											main.setAttribute('disabled', '');
										};
										main.value += ' won ' + ((myErrCount - errCount) * 50 + 150) + ' with ' + errCount + ' vs ' + myErrCount + ' me';
									}
									return;
								} else {
									WonCSS();
									main.onclick = function() {
										Send(200, id, extraGameInfo[i].name);
										main.setAttribute('disabled', '');
									};
									main.value += ' won 200 with ' + errCount + ' vs ' + myErrCount + ' me';
									return;
								}
							}
						//player not in a limit
						} else {
							DrawCSS();
							main.removeAttribute('disabled');
							main.onclick = function() {
								Draw(id, extraGameInfo[i].name);
								main.setAttribute('disabled', '');
							}
							main.value += ' ' + errCount + ' draw ' + myErrCount + ' me';
							return;
						}
					}
					console.log('poshel nahuy');
				} catch (error) {
					console.log(error);
				}
			}
		}
		await Sleep(500);
		c(id, main);
		return console.log('finish');
	}

	async function b () {
		var chatTime = document.getElementById('chat-game' + gmid).getElementsByClassName('time');
		for (let i = 0; i < chatTime.length; i++) {
			if (chatTime[i].onclick === null) {
				chatTime[i].onclick = function() {
					var id = this.parentNode.childNodes[1].firstElementChild.dataset.user;
					console.log(id);
					if (document.getElementById(id) === null) {
						var smartButton = document.createElement('div');
						smartButton.setAttribute('class', 'smartButton');
						var smartInput = document.createElement('input');
						smartInput.setAttribute('id', id);
						smartInput.setAttribute('value', this.parentNode.childNodes[1].textContent.replace(/[<>]/g, ''));
						smartInput.setAttribute('type', 'button');
						smartInput.setAttribute('disabled', '');
						smartInput.style.setProperty('border', '1px solid rgb(223, 223, 223');
						smartInput.style.setProperty('margin', '2px');
						smartInput.style.setProperty('font-family', 'consolas');
						//smartInput.onclick = function(){ c(parseInt(id), this); };
						smartButton.appendChild(smartInput);
						document.getElementById('sortable').insertBefore(smartButton, document.getElementById('players-block'));
						c(parseInt(id), smartInput);
					} else {
						document.getElementById(id).remove();
					}
				}
			}
		}
		await Sleep(1000);
		b();
	}


	a();
	b();
	function Start() {

		var id;
		var params;
		var avgSpeed;
		var amount;
		var extraGameInfo = [];
		var playerList = document.getElementById('players').childNodes;
		var speed;
		function extraGameInfoObj (a, b) {
			this.id = a;
			this.avgSpeed = b;
		}

		console.log('chlenix v2.0 = on');
		RemoveElementsByClass('QTDiv');

		for (let i = 0; i < playerList.length; i++) {
			var elem = document.createElement("div");
			elem.className = "QTDiv";
			elem.style.setProperty("hidden", "true", null);

			var input1 = document.createElement("input");
			input1.className = "QTbtn" + i;
			input1.style.setProperty("width", "55px", null);

			var input2 = document.createElement("input");
			input2.className = "QTbtn" + i;
			input2.style.setProperty("width", "45px", null);
			input2.setAttribute("type", "button");

			try {
				id = parseInt(document.querySelectorAll( '[id^="car"]' )[i].getElementsByTagName('a')[0].href.replace(/[^\d]/g, ''));
			} catch (error) {
				console.log('can\'t get id', playerList[i]);
			}

			try {
				speed = parseInt(document.querySelectorAll( '[id^="car"]' )[i].parentNode.childNodes[1].childNodes[2].childNodes[1].innerText);
			} catch (error) {
				try {
					speed = parseInt(document.querySelectorAll( '[id^="car"]' )[i].parentNode.childNodes[1].childNodes[3].childNodes[1].innerText);
				} catch (error) {
					//console.log('speed is undefined', playerList[i]);
					continue;
				}
			}
			try {
				for (let j = 0; j < playerList.length; j++) {
					if (id === gameInfo.players[j].user.id) {
						extraGameInfo[i] = new extraGameInfoObj(gameInfo.players[j].user.id, gameInfo.players[j].user.avg_speed);
						break;
					}
				}
			} catch (error) {
				console.log('extraGameInfo error');
			}

			try {
				if (extraGameInfo[i].id === 488630) {
					avgSpeed = Math.round(extraGameInfo[i].avgSpeed * 0.7925); //_Daemon_
				} else {
					avgSpeed = Math.round(extraGameInfo[i].avgSpeed * 0.9);
				}
			} catch (error) {
				console.log('avgSpeed computing error');
			}

			try {
				//console.log(avgSpeed, speed, playerList[i]);
				if (avgSpeed > speed) {
					CSS('red', i);
				} else {
					CSS('green', i);
				}
			} catch (error) {
				console.log('css avgspeed error');
			}

			input2.setAttribute("value", avgSpeed);
			input2.addEventListener('click', (function() {
				try {
					amount = this.parentElement.children[0].value;
					id = document.querySelectorAll( '[id^="car"]' )[i].getElementsByTagName('a')[0].href.replace(/[^\d]/g, '');
					var img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAAl2cEFnAAAAEAAAABAAXMatwwAAAKRJREFUOMudk0ESwyAMA5dO/mV+hviZ/TL3RNJ2EmiiK7CyNKYAIJInEmVDZLZn7wslX7MLvfcl5BIQEQgREUTEPcBwFsLMcHdKL/8BhrOZfXSl/exX2yp/RODVAb6glwAzAz9c8WOKM8BpB9lydx2gUegS0HvfCxOitcZsT6Z7cBpv1UFrDTq4O0LUqFSvkylEXklSzoTIWxFuT7ASIkfdj7/zG88ZuXfMZDyDAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA3LTE1VDIzOjExOjM1KzAwOjAwBj7ISAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNy0xNVQyMzoxMTozNSswMDowMHdjcPQAAAAASUVORK5CYII=';
					params = '{"respondentId":' + id + ',"message":"![](' + img + ') Выигрыш в БО-казино!","amount":' + amount + '}';
					url = "http://klavogonki.ru/api/profile/send-scores";
					this.parentElement.children[0].value = '';
				} catch (error) {
					console.log('some error in sending money request');
				}
				httpPost(url, params);
			}));

			elem.appendChild(input1);
			elem.appendChild(input2);

			try {
				document.querySelectorAll( '[id^="car"]' )[i].getElementsByTagName('td')[3].appendChild(elem);
				document.querySelectorAll('[class^="car ng-isolate-scope"]')[i].style.marginTop = '-14px';
			} catch (error) {
				console.log('some error in AddInputs()');
			}
		}
	}

	function CSS(color, i) {
		var cssBtnG =
			' .QTbtn' + i + ':hover { background: #abfc8d; ' +
			' color: #000; } ' +

			' .QTbtn' + i + ' {color: #666; ' +
			' font-family: consolas; ' +
			' font-size: 13px; ' +
			' padding: 0px; ' +
			' background: #d5ffc6; ' +
			' border: solid #b1ff94 1px; }' +

			' .QTinp {color: #666; ' +
			' font-family: consolas; ' +
			' font-size: 13px; ' +
			' padding: 0px; ' +
			' background: #d5ffc6; ' +
			' border: solid #b1ff94 1px; }';

		var cssBtnR =
			' .QTbtn' + i + ':hover { background: #fc8d8d; ' +
			' color: #000; } ' +

			' .QTbtn' + i + ' {color: #666; ' +
			' font-family: consolas; ' +
			' font-size: 13px; ' +
			' padding: 0px; ' +
			' background: #ffc6c6; ' +
			' border: solid #ff9494 1px; }' +

			' .QTinp {color: #666; ' +
			' font-family: consolas; ' +
			' font-size: 13px; ' +
			' padding: 0px; ' +
			' background: #d5ffc6; ' +
			' border: solid #b1ff94 1px; }';

		var style = document.createElement('style');
		if (color === 'red') {
			if (style.styleSheet) {
				style.styleSheet.cssText = cssBtnR;
			} else {
				style.appendChild(document.createTextNode(cssBtnR));
			}
		} else {
			if (style.styleSheet) {
				style.styleSheet.cssText = cssBtnG;
			} else {
				style.appendChild(document.createTextNode(cssBtnG));
			}
		}

		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function RemoveElementsByClass(className) {
		var elements = document.getElementsByClassName(className);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	function httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false );
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}

	function httpPost(theUrl, params) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "POST", theUrl, false );
		xmlHttp.onreadystatechange = (function() {
			if (this.readyState == 4 && this.status == 200) {
				if (this.responseText == '{"ok":1}') {
					console.log(this.responseText);
				} else {
					alert(this.responseText);
				}
			}
		});
		xmlHttp.send(params);
		return xmlHttp.responseText;
	}

	function Sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}


var inputs = document.querySelectorAll( '[id^="chat-game"]' )[0].getElementsByTagName( 'input' );
function PrintAnnouncement(text) {
	var announcement = text;
	inputs[0].value = announcement;
	inputs[1].click();
}

(function(){
	document.addEventListener('keydown', function(e) {
		if (e.keyCode == localStorage.casinoAnnouncementButton) {
			e.preventDefault();
			PrintAnnouncement(':excl: `Сыграешь против меня?` У кого из нас двоих меньше ошибок, тому __200__, но если __0__ ошибок, тогда __500__. Минимальная скорость: __-10%__ от средней до заезда. `Пишите, кто участвует`');
		}
	}, false);
	return false;
})();

window.addEventListener('load', function () {
	var inject = document.createElement('script');
	inject.appendChild(document.createTextNode('(' + main.toString() + ')()'));
	document.body.appendChild(inject);
});
