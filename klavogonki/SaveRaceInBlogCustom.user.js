// ==UserScript==
// @name          save_race_in_blog_custom
// @namespace     klavogonki
// @version       3.3.2
// @description   добавляет кнопку для сохранения результата любого заезда в бортжурнале
// @match         http*://klavogonki.ru/g/*
// @author        Lexin13, agile, 490344, vnest
// @icon64        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEXUExURaCgoHJyckBAQB0dHQAAABMSEScnJ2NjY5qamlVVVWlpaTEvLEdHRzo6OrKysoeHhxoNBFcqEMBfLd5rKWZhW//77P/z5P/w3f/r0uXTva+hkNdoLP/87P/y2JyQgcpjLWZeVNVnLJxNI3BnXIJ3a6hUKHk8HbdbMbpdMsNhM+vg0r20qZaPhlhUT/bs3sS7r4aAeKaelKujmUxGP9jSynZxatLIvLRYKc1kLW41FJVJIYdEHoZCIp5PKn4+H3t7e5BHIBQKA0MgDF0yGXQ6IIJEKDQcFdFoMcJlO8RjMlQoD2c0G5RNL51SMq9ZL6ZVLbe3t8fHx9zKtfLfyMZiNGE0K/z8/NTU1OLi4vLy8u3t7f///wAAAJ7Wl6sAAABddFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AOGvnZAAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAoVSURBVHhe7Z15e9rIHcfxgS+MDbHFOgnuJm3TbbkSH3Gy7WZT3Lt71Gxbr0l5/6+jI+aL/JvjJ6QImBkeff7IE9BoNB/PPRqJymQelY3NrW0vqe7s7iGRKaQbVvYRmcfsIq0caYYHiMN3akivHd4wgOxLOESabXCGezg3FJBsC4xhHSeGA9vm2A1xVlBwijbDI5wTGExxtHxdwRnBgfRrWAwRPjx2IKBiGiJ4iBxDQcEw9HSElg04KOiGuwgbJrZM1A0RlNJoChr44DmwoGiGZhltNJ+cCJr4OOU0ajnni7Ozp89qSFACNCiqodFRNJrPYz/dsI3LOEQYnp2f/wIpmrEBEYJquIOAMxpfSj8/8zB2fIYkzYAIQTVEMJBkoMBTw7PzF0gTgAhBMdQmTE3YxfhqePYUaQIwISiGCAUaL2EX463hmdrawIRADdURd+OXkJvireH5r5AoCVQI1HADoSS0jPps+GskSgIVAjVEIEnjFdwka2ioZmFpuHqKG/4GamAtDNWm9CuogTU0/C3UQFHDKGq32/E/keVceXAaAN/Mp7jh76AGChlG7U63168J6v1ed9BWTo/ag9e9fr22U6v133Q76kEenwyjzoU6oq9fDpIIokH3Cl+DXidTTvpjGF2/xVmUN51pFNGgV8U3hNObDLMzXwyjwRuco1G9EHFEXWZV6FT+AdLwxLB9gzMsXHVap/ivhct5l/DDMGIyUFJNXdZ7izg4/DC01cDM9AeIxY4PhlEfwT+TK8RjxwPDKKWWZWMz7TLuDaMeAhfgbcp1nBtGKa1odrr8hdznobFY+zlU+dbGtWF7AWU0hi+nrg0HCEmY3v7g7n+wBzuI0MCxodnMNJpy+fyJTaPRfDc9+N48+JYbojo2HGjDlUbzce31nWHRkH4xzw1Hria6NYxeIyBofI1YpjzXJJSV55Pfa0e5AapjQ3W4pgqenLxUJBrv8TX4g6rYZ4qpW8OB2lVoy3YnJ6+IhLq0HqNcarvKtDVuDTsIJ3m8RZdAYjP0T96rmXiDSDWcGmrV0HQgVVEvozFqJjIV0a3hBcJJvkEUlJeyzZz1ISofpqfNeOOjoTrx1VZewau4izfq4BS1JWJ6RI8MG483krOS5WIeGVqq4TxKwxi3hsqoVB2yZEEd9HhZD9W29AOiyMxXOFHS8zAPW+r8Pncx/RYnSph5vltDdUyT21C5lpdjGm1cSiZHmfhSqYZbzPTJraE2t8iZiWoW9plrOTbsIqAkXyZqM2Q/54daRcyXiWoWsgs1jg3b6nq3PgVO42s1C688XafR+osc5fSJKsivCbs2bGsLwrZpoA11WiFaUsRn4tpQX4vKOsPQKmHKjVLXhq2Wtv8gW2ujVcLtmr0zjKJBp/MUqHsTiQ9YlqGZiRlaG13QWguj1k3vNOXZurr2iNfS8tC4fThf0RC8Mq/T7vTmPvNSh5BkaYbmrYt5ioag2RdG15luu27BaMryDLWBjYDujDcw1/O3L7S+kN26YvARSjHLM9S7/RjL0ilQh9tT+ohnRvsm+z1JKMUs0VBf+o4xV7gldBUc6Ivd0SUOZAFKMcs0jLThaYy9MppVUMwL1Yvk2xdwBCfBMg3NLkPQaBrDG0sVNPr6nBsfVmVoL1l6STVvKAq01ZlcRVSwMkP7n15tU20lVF/Kz72zY3WGTOl6fNThna2EGvcq9HvKc1mhIacoayNu0OjoOzDSdwDaWKUht/EkblT/aPUz7zbl3320UkOulWhwW0/ivbUKlh1yw9s//fkvCn/FEclqDa2dBk/XWLe4xpGE4e3fkKxH/o5jkhUbiq4/e0th7vFua7VwePsPJIri1lCMmTPuNb2ybfDGMTD8J5Kk4thQOGYak9juaOtl/BYp0nBuKBJqee5Aw7qwpv1thrYiKnBvKErqnNmrtYSKaqiu+DBZ6IOhSKsxJ6b0mLXfgfLAzdBsRSVeGIo2lc3Gfodb3FanYFwWemIoHJlsvMRxC+qA5jukx8AXQ1EbLQ9hpD4EpBp+j/QYeGMYL7dofWM9/UEu1fAHpMfAI8O4qJIFnK3LVnps4eWhIBokuzV6j48iMoRWD0HUuriqVq8u5voF15Y+kv2xX2VNkhvSeGiYGe0BMa/HNJ+HPi79ESnSCNhQa2q4cVvIhpE2KbErBm2oTy2H/0KiKCEb6rtzhOKt6Ri0obaJLGZ4qzPEEUlghmYmziU0w2yLPJTQDFutTVw5K+EZ5i2n4RnmWzYP0ZBd/mAI0DCnYoiGrehm/pJyApRiwjFsRZ3sL9qAUkxAhjlKKt28F5RhvMCjv0TWxj6MpoRlGDt2527eO4CQJDRD4RgNXvdO+Vuu+m+WhGcoiATtc+BsF/Sycb/Pe9mUhgml4YzScOWUhgml4YzScOWUhgml4YzScOWUhgml4YzScOWUhgml4YzchoPru8KM2LeXemA4OloII0Rn4trwDikszB0iNHBseI30LQAuF90aDpC6heDlW5QWmIVHR9eIVGONDJliWhomlKV0hruWxsv3CC+qv4/hOkTHhgvMRO6N5RB0ZdgaLGpQw45MIejMULQ2C3C8u+ZyMCmkDg1FPhYGEdnwwnCpwG99DaEnWFPDpIyuqyERXE9DKriWhorgGhqqfkszTH1wd4l8ofsty/DFOaL3gNJwDQxz/LZ6mIZn6qZhuBBCNzz/CWkCcCEEb6i9zRcuhMANtXZm3QzPz//9AilKgAvhswz7T3/ygWd6BgrgQphr+PLDN8xPE3oJXAjphu/CUQNwIbCG/zl5HpyeAC4E1vC/34anJ4ALgTUMFLgQSsPQgAuhNAwNuBBKw9CAC6E09J4t9ecJ4ELIZLhVP+TYzEm9GCIGXHh/f3d34/hodP8RiZTAhTDf8HDv54fx/aIYFwTRJIwLG9ZH48KpWipFDff81hMUNBx5L1jQMADBYoZHAQgWMtydCd6PH/zl0waSK4ELIcXwAYLjyiG+CQC4EHjDA2Thp318EQRwIfCGIyk4TvkRNw+BC4E3lH73x/gYCHAhsIabKKQ5Xs7kA3AhsIYb0nCEj6EAFwJreCwN7/AxFOBCYA0/rr0h+vuf8TEU4EIghhMEkmxJw/ss79byCKgQWEMMae4DK6ZQIfCGFWSiOrL1HagQeMO6NByPg+rzoUKghuooffsOivcPx7Utf1GHJFAhUEO1Md2ufZKGwtFj/pdjfqgX01mX6Dd5ZsCTiT5PQmPjNfkM9UwMQTGnodG9Hzz47pjTsIJwj1T3PhVfqF4mOQ0ntpdm7lZGyZKNf+Q1NGpiaECDoBvuImSoQIOgG1rLaUDAgmAYBl5OIUEwDcNWhAPBYmh2GQEBB4LFUB+BBwUUCDbDkAsqBAh2w0lYS/kEpJ/AGE4CW8xPQPIJnKE5lQoCiw5vOJkc4LRw0N84H5NmKI6GlZEfkWyFdMOYysahttrjJztWv8nk//FP5rXvMozAAAAAAElFTkSuQmCC
// ==/UserScript==

(async function () {
    'use strict';

	var fullText;
	var paramsFound = false;
	var qual;
    var inited;
    var textRequested;
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

   function httpPostForm(url, formData) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject(logError(xhr.statusText));
            xhr.send(formData);
        });
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

			if('params' in json) {
				qual = json.params.qual;
				paramsFound = true;
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
							hidden: localStorage['KG.save_race_in_blog_custom.save-hidden'] == 'true',
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
			hidden: localStorage['KG.save_race_in_blog_custom.save-hidden'] == 'true',
		}));
	}

    async function init (bestSpeed) {

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
        const gameTypeNormalUA = 'voc-123163';
        const gameTypeSuffixBY = '.BY';
        const gameTypeSuffixRU = '.RU';
        const gameTypeSuffixEN = '.EN';
        const gameTypeSuffixUA = '.UA';
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
            case gameTypeNormalUA:
                vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameTypeNormal + gameTypeSuffixUA;
                break;
            default:
                vocCoversLocalStorageName = vocCoversLocalStorageNamePrefix + gameType;
                break;
        }

        var coversMapJson = localStorage[vocCoversLocalStorageName];
        var vocCoversMap = coversMapJson ? JSON.parse(coversMapJson) : undefined;

        // var textKey = "Coming down the steps of \"Snooks\" Club, so nicknamed by George Forsyte in the late eighties, on that momentous mid-October afternoon of 1922, Sir Lawrence Mont, ninth baronet, set his fine nose toward";

        var textKey = fullText ? fullText.substring(0, 200) : undefined;

        var storeVocCover = !qual && fullText && gameType.startsWith('voc-') && vocCoversMap
        && vocCoversMap[textKey] && vocCoversMap[textKey].title;

        if(storeVocCover) {
            const defaultCover = 'https://i.imgur.com/j6uPT6r.png';

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

        if(!qual && fullText && (gameType == 'normal' || gameType == 'noerror' || gameType == 'sprint'
                                  || storeVocCover)) {
            storeCover = true;
        }

        if(storeCover) {
            var linkWithPicture = document.createElement('a');
            linkWithPicture.style.color = '#5247A7';
            linkWithPicture.textContent = 'Сохранить в бортжурнале с обложкой';
        }

        var saveHiddenElement = document.createElement("div");
        saveHiddenElement.id = "input-save-hidden";
        let saveHiddenCheckbox = document.createElement('input');
        saveHiddenCheckbox.setAttribute('type', 'checkbox');
        saveHiddenCheckbox.setAttribute('name', 'save-hidden');
        saveHiddenCheckbox.id = 'save-hidden-checkbox';
        saveHiddenCheckbox.checked = localStorage['KG.save_race_in_blog_custom.save-hidden'] == 'true';
        saveHiddenCheckbox.addEventListener('change', function () {
            console.debug('saveHiddenLabel change', saveHiddenCheckbox.checked);
            localStorage['KG.save_race_in_blog_custom.save-hidden'] = saveHiddenCheckbox.checked;
        });
        let saveHiddenLabel = document.createElement('label');
        saveHiddenLabel.setAttribute('for', 'save-hidden-checkbox');
        saveHiddenLabel.innerText = 'Скрытая запись';
        saveHiddenLabel.style.verticalAlign = 'middle';

        saveHiddenElement.appendChild(saveHiddenCheckbox);
        saveHiddenElement.appendChild(saveHiddenLabel);

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
            container.insertAdjacentHTML('beforeend', '<span>&nbsp;</span>');
            linkWithPicture.addEventListener('click', saveResult.bind(null, resultData, true));
            container.appendChild(linkWithPicture);
        }
        container.insertAdjacentHTML('beforeend', '<span>&nbsp;</span>');
        container.appendChild(saveHiddenElement);

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
            if(!inited) {
                var bestSpeed = checkJSON(this.responseText);

                if (paramsFound && bestSpeed && (qual || fullText)) {
                    inited = true;
                    init(bestSpeed);
                }

                if(!inited && !textRequested && checkGameDesc(/одиночный/)) {
                    textRequested = true;
                    let gameId = document.URL.match(/(\d+)/)[0];
                    let fullTextRequestUrl = `${location.protocol}//klavogonki.ru/g/${gameId}.info`;

                    let fullTextRequest = new FormData();
                    fullTextRequest.append("need_text", 1);

                    console.log("save_race_in_blog_custom - force text request");
                    httpPostForm(fullTextRequestUrl, fullTextRequest).then(textRequestResult => {
                        console.log("save_race_in_blog_custom - received text");
                        // var fullText = textRequestResult?.text?.text;
                    });
                }
            }
        }.bind(this));
        return proxied.apply(this, [].slice.call(arguments));
    };

    function checkGameDesc (re) {
        var desc = document.getElementById('gamedesc');
        if (!desc) {
            throw new Error('#gamedesc element not found.');
        }

        return re.test(desc.textContent);
    }
})();