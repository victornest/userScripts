// ==UserScript==
// @name           KG_NextCompetition 2077
// @version        0.1
// @description    Добавляет в блок ввода текста таймер со ссылкой на следующий икс
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http*://klavogonki.ru/g/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function() {

    function httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }


    function getBegintime() {
        let url = 'http://klavogonki.ru/gamelist.data/'
        let resp = JSON.parse(httpGet(url))
        resp.gamelist.forEach(x => {
            if (x.params.competition && x.type == 'open') {
                begintime = x.begintime;
                multiplier = x.params.regular_competition;
                gmid = x.id;
                return;
            }
        });

        if (begintime != null) {
            return updateTimer();
        } else {
            timer.innerText = 'иксы отдыхают';
            return setTimeout(getBegintime, 10000)
        }
    }


    function share() {
        if (gmid != null) {
            gamechatInput('http://klavogonki.ru/g/?gmid=' + gmid + ' ' + min + ':' + sec);
            gamechatSend();
        } else {
            console.log('чето беда какая-то картинка есть, а гмида нет');
        }
    }


    function updateTimer() {
        if (begintime) {
            let timenow = Date.now().toString().slice(0, -3);
            let remaining = begintime - timenow;
            if (remaining > 0) {
                if (remaining < 30 && timer.style.color == 'red')
                    timer.style.color = '#af0000';
                else if (remaining < 30)
                    timer.style.color = 'red';
                else if (remaining < 60)
                    timer.style.color = '#af0000';
                else if (remaining < 300)
                    timer.style.color = '#222222';

                min = (() => {
                    if ((remaining / 60).floor().toString().length == 2)
                        return (remaining / 60).floor();
                    if ((remaining / 60).floor() >= 1)
                        return '0' + (remaining / 60).floor();
                    if ((remaining / 60).floor() == 0)
                        return '00';
                })();
                sec = (() => {
                    if ((remaining % 60).toString().length == 2)
                        return (remaining % 60);
                    if ((remaining % 60).toString().length == 1)
                        return '0' + (remaining % 60);
                })();
                if (multiplier > 0) {
                    timer.innerHTML = '<span style="color: #c1a300">x' + multiplier + '</span> ' + min + ':' + sec;
                } else {
                    timer.innerHTML = '<span style="color: darkgrey">x1</span> ' + min + ':' + sec;
                }
                timer.innerHTML += '<a href="/g/?gmid=' + gmid + '" id="next-competition-2077-link" title="Перейти"></a>';
                shareBtn.display = '';
                shareBtn.style.cursor = 'pointer';
                shareBtn.addEventListener('click', share);
                setTimeout(updateTimer, 1000);
            } else {
                shareBtn.display = 'none';
                shareBtn.style.cursor = 'auto';
                shareBtn.removeEventListener('click', share);
                timer.style.color = 'darkgrey';
                begintime = multiplier = gmid = min = sec = null;
                getBegintime();
            }
        } else {
            console.log('updateTimer: begintime error', begintime);
            setTimeout(getBegintime, 10000);
        }
    }


    let gamechatInput = (value) => { document.querySelectorAll('.chat')[1].querySelector('.text').value = value};
    let gamechatSend = () => { document.querySelectorAll('.chat')[1].querySelector('.send').click() };
    let shareBtn = document.createElement('img');
    shareBtn.id = 'next-competition-2077-share';
    shareBtn.title = 'Отправить в чат';
    shareBtn.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAABEElEQVQokY1SQWqEQBDsWZYhH/Awgj/IbZQc/ILeB7yO3zDkMaJ3PfqAHPQVgh78QPDSSw2MrMkm2YYG265uuqpGMDM9E23bcl3XDnn5D1+WJYdh6AaSJKF1XR8PYWue5w4cRREtyyK6rhNpmpJSiq4AAYAN+DFNE2mtqSgKAhD9fd9fpJRf+AYOQAYvpNaam6Y56u85DANnWcYXN3kXQRD8yfEHJ5z3TFyttSSE8Lp/ENH7tm1sjBHgQkSvUsrxtNjfrZT69LyQ4GqtPfEDJ/SO87TWb37TOI4CMkNuyA51YYPvHy8CJgLko6oqJ7f3Deb2fe/scD4hMDDP80MZwM8Yc9SntxfHsStw3q8iEtENXYyp64IWBssAAAAASUVORK5CYII=';
    let timer = document.createElement('div');
    timer.id = 'next-competition-2077';
    let insertNode = document.querySelector('#typeplayblock').parentNode;
    insertNode.insert(timer);
    insertNode.insert(shareBtn);
    let begintime;
    let multiplier;
    let gmid;
    let min;
    let sec;
    getBegintime();


    (() => {
        let css = document.createElement('style');
        css.innerHTML =
            " #next-competition-2077 { " +
            " position: absolute; " +
            " right: 30px; " +
            " bottom: 10px; " +
            " color: darkgrey; " +
            " } " +

            " #next-competition-2077-link { " +
            " position: absolute; " +
            " width: 100%; " +
            " height: 100%; " +
            " left: 0; " +
            " border: none !important; " +
            " } " +

            " #next-competition-2077-share { " +
            " position: absolute; " +
            " right: 12px; " +
            " width: 12px; " +
            " bottom: 12px; " +
            " opacity: .5; " +
            " } " +
            " #next-competition-2077-share:hover { " +
            " opacity: 1; " +
            " } " +

            "";
        document.head.append(css);
    })();

})();
