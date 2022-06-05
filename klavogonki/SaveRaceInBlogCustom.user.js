// ==UserScript==
// @name          save_race_in_blog_custom
// @namespace     klavogonki
// @version       3.0.0
// @description   добавляет кнопку для сохранения результата любого заезда в бортжурнале
// @include       http://klavogonki.ru/g/*
// @include       https://klavogonki.ru/g/*
// @author        Lexin13, agile, 490344, vnest
// ==/UserScript==

function saveRaceInBlog () {
	var fullText;
	var link = document.querySelector('.dropmenu a');
	if (!link) {
		throw new Error('.dropmenu a element not found.');
	}

	var userId = parseInt(link.href.match(/\/u\/#\/(\d+)/)[1]);

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}

	function checkJSON (response) {
		try {
			var json = JSON.parse(response);
			if (!('players' in json)) {
				return false;
			}

			if ('text' in json) {
				fullText = json.text.text;
			}

			for (var i = 0; i < json.players.length; i++) {
				if ('record' in json.players[i] && json.players[i].record.user === userId) {
					return json.players[i].user.best_speed;
				}
			}

			return false;
		} catch (e) {
			return false;
		}
	}

	function saveResult (res, savePic) {
        var percent = parseFloat(((res.stats.speed + '00') / res.best).toFixed(1)); //округление процента до указанного количества знаков после запятой
        if(percent >= 95)
            percent = '**'+percent+'%**';
        else
            percent += '%';
		if (document.getElementById('spectrumCanvas') !== null) {
			if (document.getElementById('spectrumCanvas').firstElementChild !== null) {
				new Promise(function(resolve, reject) {
					document.getElementById('spectrumCanvas').firstElementChild.toBlob(function(blob) {
						resolve(blob);
					});
				}).then(result => {
					var reader = new FileReader();
					reader.readAsDataURL(result);
					reader.onloadend = function() {
						var gameTypes = {
							normal: 'Oбычный',
							abra: 'Абракадабра',
							referats: 'Яндекс.Рефераты',
							noerror: 'Безошибочный',
							marathon: 'Марафон',
							chars: 'Буквы',
							digits: 'Цифры',
							sprint: 'Спринт',
						};

						var text = '';//'Результат #' + res.id + ' в режиме ';
						var comp = document.getElementById("complexity-panel")
						comp = comp.innerText.slice(18, 23).trim();
						if (res.gameType === 'voc') {
							text += '*[' + res.vocName + '](/vocs/' + res.vocId + '/ "Перейти на страницу словаря")* | **' + comp + '** | **';
						} else {
							text += '*' + gameTypes[res.gameType] + '* | **' + comp + '** | **';
						}

						console.log('aaa', res.stats.speed);

						if (game.getGametype() == 'marathon') {
							text += res.stats.speed + ' зн/мин** | ' +
                            percent + ' | *' +
							res.stats.errors.replace('(', '[').replace(')', ']*\n\n') +
							'*![сложнограмма](' + reader.result + ')*\n\n' +
							res.author + '\n**' + res.title + '**\n![обложка](' + res.pic + ')\n\n';
						} else {
                            text += res.stats.speed + ' зн/мин** | ' +
                            percent + ' | *' +
							res.stats.errors.replace('(', '[').replace(')', ']* | *') +
							res.stats.time + '*\n\n' +
                            '*![сложнограмма](' + reader.result + ')*\n\n';
                            if(savePic) {
                                text += '\n![обложка](' + res.pic + ') ' + res.author + ' - **' + res.title + '**\n\n';
                            }

							res.typedHtml = res.typedHtml
							.replaceAll('<span class="error"> ', '<span class="error">˽')
							.replaceAll(' </span>', '˽</span>')
							.replaceAll('<s class="error"> ', '<s class="error">˽')
							.replaceAll(' </s>', '˽</s>');

							var typedMarked = res.typedHtml
							.replace(/<span class="error">|<\/span>/g, '**')
							.replace(/<s class="error">/g, '~~**')
							.replace(/<\/s>/g, '**~~');

							text += '> ' + typedMarked;
						}

						//if (confirm('Добавить запись в бортжурнал?')) {
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '/api/profile/add-journal-post');
						xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
						xhr.onload = function () {
							if (this.status !== 200) {
								throw new Error('Something went wrong.');
							}

							alert('Запись успешно добавлена.');
						};
						xhr.send(JSON.stringify({
							userId: userId,
							text: text,
							hidden: false,
						}));
					}
				});
				return;
			}
		}
		var gameTypes = {
			normal: 'Oбычный',
			abra: 'Абракадабра',
			referats: 'Яндекс.Рефераты',
			noerror: 'Безошибочный',
			marathon: 'Марафон',
			chars: 'Буквы',
			digits: 'Цифры',
			sprint: 'Спринт',
		};

		var text = '';//'Результат #' + res.id + ' в режиме ';
		if (res.gameType === 'voc') {
			text += '*[' + res.vocName + '](/vocs/' + res.vocId + '/ "Перейти на страницу словаря")* | **';
		} else {
			text += '*' + gameTypes[res.gameType] + '* | **';
		}

		if (game.getGametype() == 'marathon') {
			text += res.stats.speed + ' зн/мин** | *' +
				res.stats.errors.replace('(', '[').replace(')', ']*\n\n') +
				res.author + '\n**' + res.title + '**\n![обложка](' + res.pic + ')\n\n';
		} else {
			var gameType = game.getGametype();
			text += res.stats.speed + ' зн/мин** | ' +
            percent + ' | *' +
			res.stats.errors.replace('(', '[').replace(')', ']* | *') +
			res.stats.time + '*\n\n';

			if(savePic) {
				text += '\n![обложка](' + res.pic + ') ' + res.author + ' - **' + res.title + '**\n\n';
			}

			res.typedHtml = res.typedHtml
			.replaceAll('<span class="error"> ', '<span class="error">˽')
			.replaceAll(' </span>', '˽</span>')
			.replaceAll('<s class="error"> ', '<s class="error">˽')
			.replaceAll(' </s>', '˽</s>');

			var typedMarked = res.typedHtml
			.replace(/<span class="error">|<\/span>/g, '**')
			.replace(/<s class="error">/g, '~~**')
			.replace(/<\/s>/g, '**~~');

			text += '> ' + typedMarked;
		}

		//if (confirm('Добавить запись в бортжурнал?')) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/profile/add-journal-post');
		xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
		xhr.onload = function () {
			if (this.status !== 200) {
				throw new Error('Something went wrong.');
                alert('Произошла ошибка. Повторите снова.');
			}

			alert('Запись успешно добавлена.');
		};
		xhr.send(JSON.stringify({
			userId: userId,
			text: text,
			hidden: false,
		}));
	}
//}

function init (bestSpeed) {

	var gameType = game.getGametype();

	var container = document.createElement('div');
	container.style.fontSize = '10pt';
	container.style.display = 'flex';
	var link = document.createElement('a');
	link.style.color = '#ff3855';
	link.textContent = 'Сохранить в бортжурнале';

	// const gameTypeMiniBY = 'voc-25856'; // test
	const gameTypeMiniBY = 'voc-218696';
	const gameTypeMiniRU = 'voc-6018';
	const gameTypeMiniEN = 'voc-8835';
	const gameTypeNormalBY = 'voc-29616';
	const gameTypeNormalEN = 'voc-5539';
	const gameTypeSuffixBY = '.BY';
	const gameTypeSuffixRU = '.RU';
	const gameTypeSuffixEN = '.EN';
	const gameTypeMini = 'MiniMarathon';
	const gameTypeNormal = 'Normal';


	const vocCoversLocalStorageNamePrefix = 'KG_Covers.';
	var vocCoversLocalStorageName;

	switch (gameType) {
		case gameTypeMiniBY:
			vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeMini + gameTypeSuffixBY;
			break;
		case gameTypeMiniRU:
			vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeMini + gameTypeSuffixRU;
			break;
		case gameTypeMiniEN:
			vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeMini + gameTypeSuffixEN;
			break;
		case gameTypeNormalBY:
			vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeNormal + gameTypeSuffixBY;
			break;
		case gameTypeNormalEN:
			vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeNormal + gameTypeSuffixEN;
			break;
		default:
			break;
	}

	var coversMapJson = localStorage[vocCoversLocalStorageName];
	var vocCoversMap = coversMapJson ? JSON.parse(coversMapJson) : undefined;

	// var textKey = 'Behind every man now alive stand thirty ghosts, for that is the ratio by which the dead outnumber the living. Since the dawn of time, roughly a hundred billion human beings have walked the planet Eart';

	var textKey = fullText.substring(0, 200);

	var storeVocCover = (gameType == gameTypeMiniBY 
		|| gameType == gameTypeMiniRU 
		|| gameType == gameTypeMiniEN
		|| gameType == gameTypeNormalBY
		|| gameType == gameTypeNormalEN) && vocCoversMap 
		&& vocCoversMap[textKey] && vocCoversMap[textKey].title;
	
	if(storeVocCover) {
		const defaultCover = 'https://i.imgur.com/cUkkjem.jpg?1';
		
		var coverInfo = vocCoversMap[textKey];
		//if no cover - insert default
		var cover = coverInfo.cover ? coverInfo.cover : defaultCover;
		var coverTable = document.createElement('table');
		coverTable.id = 'book';
		coverTable.className = 'imobilco';
		coverTable.innerHTML = 
			`<tbody>
				<tr>
					<th>
						<div class="imobilco-container">
							<div class="imobilco-book">
								<span class="imobilco-cover"><span class="co itl"></span>
								<span class="co itr"></span><span class="co ibl"></span>
								<span class="co ibr"></span></span>
								<img src="${cover}" style="height: 168px;">
							</div>
						</div>
					</th>
					<td>
						<div>Вы набирали цитату из книги:</div>
						<div class="author">${coverInfo.author}</div>
						<div class="name">${coverInfo.title}</div>
					</td>
				</tr>
			</tbody>`;
		var bookInfo = document.getElementById('bookinfo');
		var bookInfoFirstDiv = bookInfo.firstElementChild;
		bookInfoFirstDiv.appendChild(coverTable);
	}
	
	var storeCover = false;

	if(gameType == 'normal' || gameType == 'noerror' || gameType == 'sprint'
	|| storeVocCover) {
		storeCover = true;
	}

	if(storeCover) {
		var linkWithPicture = document.createElement('a');
		linkWithPicture.style.color = '#5247A7';
		linkWithPicture.textContent = 'Сохранить в бортжурнале с обложкой';
	}

	if (gameType == 'marathon')
	{
		var raceTime = document.querySelector('.player.you.ng-scope').querySelector('.bitmore');
		raceTime.textContent = 0 + raceTime.textContent;
		var typed = { innerHTML: 'Упс! Текст потерялся...' };
		var pic = document.querySelector('.imobilco-book').querySelector('img').src;
		var author = document.querySelector('.author').innerText;
		var title = document.querySelector('#book .name').innerText;
	} else {
        if(storeCover) {
            pic = document.querySelector('.imobilco-book').querySelector('img').src;
            author = document.querySelector('.author').innerText;
            title = document.querySelector('#book .name').innerText;
        }
		var typed = document.querySelector('#errors_text p');
		if (!typed) {
			throw new Error('#errors_text p element not found.');
		}
	}

	var statsContainer = document.querySelector('.player.you .stats');
	if (!statsContainer) {
		throw new Error('.player.you .stats element not found.');
	}

	var matches = statsContainer.textContent.match(/(\d{2}:\d{2}\.\d)(\d+) зн\/мин(\d+ ошиб\S+ \([\d,%]+\))/);
	if (!matches) {
		throw new Error('result stats were not parsed.');
	}

	var span = document.querySelector('#gamedesc span');
	if (!span) {
		throw new Error('#gamedesc span element not found.');
	}

	var gameType = span.className.split('-').pop();
	var vocName = gameType === 'voc' ? span.textContent.replace(/[«»]/g, '') : '';
	var vocId = gameType === 'voc' ? parseInt(span.querySelector('a').href.match(/vocs\/(\d+)/)[1]) : '';

	var stats = {
		time: matches[1],
		speed: matches[2],
		errors: matches[3],
	};

	var resultData = {
		stats: stats,
        best: bestSpeed,
		typedHtml: typed.innerHTML,
		gameType: gameType,
		vocName: vocName,
		vocId: vocId,
		pic: pic,
		author: author,
		title: title
	};

	link.addEventListener('click', saveResult.bind(null, resultData, false));
	container.appendChild(link);
	if(storeCover) {
		linkWithPicture.addEventListener('click', saveResult.bind(null, resultData, true));
		container.appendChild(linkWithPicture);
	}
	

	var again = document.getElementById('again');
	if (!again) {
        	again = document.getElementById('bookinfo');
        	if (!again)
            		throw new Error('#again element not found.');
	}

	var cell = again.querySelector('td');
	if (cell) {
		container.style.float = 'left';
		again.insertBefore(container, again.firstChild);
	} else {
		again.parentNode.appendChild(container);
	}
}

// Saving the original prototype method:
var proxied = window.XMLHttpRequest.prototype.send;

window.XMLHttpRequest.prototype.send = function () {
	this.addEventListener('load', function () {
		var bestSpeed = checkJSON(this.responseText);
		if (bestSpeed && fullText) {
			init(bestSpeed);
		}
	}.bind(this));
	return proxied.apply(this, [].slice.call(arguments));
};
}

var script = document.createElement('script');
script.textContent = '(' + saveRaceInBlog.toString() + ')();';
document.body.appendChild(script);
