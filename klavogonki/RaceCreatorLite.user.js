// ==UserScript==
// @name         RaceCreatorLite
// @namespace    klavogonki
// @version      0.1
// @author       490344
// @include      http://klavogonki.ru/g/*
// @include      https://klavogonki.ru/g/*
// @grant        none
// ==/UserScript==

(function() {

    var inviteDiv = document.querySelector('#invite .rc')
    // убираем бесполезную ссылку
    inviteDiv.childElements()[1].style.display = 'none'
    // поднимаем кнопку приглашения наверх
    inviteDiv.childElements()[2].insertBefore(inviteDiv.childElements()[2].childElements()[2], inviteDiv.childElements()[2].childElements()[1])

    var RCLDiv = document.createElement('div');
    var RCLButton = document.createElement('button');
    var RCLGametype = document.createElement('input');
    var RCLTimeout = document.createElement('select');
    var RCLMode = document.createElement('input');
    var option = (value, text) => {
        var x = document.createElement('option');
        x.setAttribute('value', value);
        x.textContent = text;
        return x;
    }
    var currentTimeout = '10';
    if (document.querySelector('#gamedesc').textContent.match('таймаут') != null) {
        currentTimeout = document.querySelector('#gamedesc').textContent.match(/(\d+)/)[0];
        if (currentTimeout == '1')
            currentTimeout = '60';
        if (currentTimeout == '2')
            currentTimeout = '120';
    }

    RCLDiv.setAttribute('id', 'RCLDiv');
    RCLDiv.insert(RCLButton);
    RCLDiv.insert(RCLGametype);
    RCLDiv.insert(RCLTimeout);
    RCLDiv.insert(RCLMode);

    RCLButton.setAttribute('id', 'RCLButton');
    RCLButton.setAttribute('type', 'button');
    RCLButton.textContent = 'В чат!';
    RCLButton.onclick = create;

    RCLGametype.setAttribute('id', 'RCLGametype');
    RCLGametype.value = game.getGametype();
    RCLGametype.setAttribute('title', 'Обычный - normal\n' +
                                      'По словарю - voc-#\n' +
                                      'Безошибочный - noerror\n' +
                                      'Буквы - chars\n' +
                                      'Марафон - marathon\n' +
                                      'Спринт - sprint\n' +
                                      'Абракадабра - abra\n' +
                                      'Цифры - digits\n' +
                                      'Я.Рефераты - referats\n'
                            );

    RCLTimeout.setAttribute('id', 'RCLTimeout');
    RCLTimeout.insert(option('5', '5 секунд'));
    RCLTimeout.insert(option('10', '10 секунд'));
    RCLTimeout.insert(option('20', '20 секунд'));
    RCLTimeout.insert(option('30', '30 секунд'));
    RCLTimeout.insert(option('45', '45 секунд'));
    RCLTimeout.insert(option('60', '1 минута'));
    RCLTimeout.insert(option('120', '2 минуты'));
    RCLTimeout.value = currentTimeout;

    RCLMode.setAttribute('id', 'RCLMode');
    RCLMode.setAttribute('type', 'checkbox');
    RCLMode.checked = true;
    RCLMode.setAttribute('title', 'Галочка - открытый, иначе - дружеский');

    inviteDiv.childElements()[2].insertBefore(RCLDiv, inviteDiv.childElements()[2].childElements()[1]);

    RCLGametype.setAttribute('style',
                             'width: 70px; ' +
                             'text-align: center; ' +
                             'outline: none; ' +
                             'border: gray solid 1px; ' +
                             'margin: 5px 10px 0px 0px; '
                            );
    RCLButton.setAttribute('style',
                           'outline: none; ' +
                           'border: gray solid 1px; ' +
                           'margin: 5px 10px 0px 0px; '
                          );
    RCLTimeout.setAttribute('style',
                            'outline: none; ' +
                            'border: gray solid 1px; ' +
                            'margin: 5px 10px 0px 0px; '
                           );
    RCLMode.setAttribute('style',
                         ''
                        );

    function create() {

        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseURL;
        }

        var gametype = '';
        if (RCLGametype.value.match('voc'))
            gametype = 'voc&voc=' + RCLGametype.value.match(/(\d+)/)[0];
        else
            gametype = RCLGametype.value;

        var mode = 'normal';
        if (!RCLMode.checked)
            mode = 'private';

        var gamechatInput = (value) => { document.querySelectorAll('.chat')[1].querySelector('.text').value = value}
        var gamechatSend = () => { document.querySelectorAll('.chat')[1].querySelector('.send').click() }
        var newRaceUrl = httpGet('http://klavogonki.ru/create/?' +
                                 'gametype=' + gametype +
                                 '&type=' + mode +
                                 '&level_from=1&level_to=9' +
                                 '&timeout=' + RCLTimeout.value +
                                 '&submit=1'
                                );
        gamechatInput(newRaceUrl + ' начнется через ' + RCLTimeout.value + ' секунд');
        gamechatSend();
    }
})();
