// ==UserScript==
// @name         RaceCreatorLite
// @namespace    klavogonki
// @version      0.2
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
    var RCLMin = document.createElement('select');
    var RCLMax = document.createElement('select');
    var RCLMode = document.createElement('input');
    var option = (value, text) => {
        var x = document.createElement('option');
        x.setAttribute('value', value);
        x.textContent = text;
        return x;
    }

    var gmid = document.URL.match(/(\d+)/)[0];
    var info = httpGet('http://klavogonki.ru/g/' + gmid + '.info');
    info = JSON.parse(info.response).params;
    var currentMin = info.level_from;
    var currentMax = info.level_to;
    var currentTimeout = info.timeout;
    if (currentTimeout > 120)
        currentTimeout = '10';
    var currentGametype = info.gametype.match(/(\d+)/) ? info.gametype.match(/(\d+)/)[0] : info.gametype;
    var currentMode = info.type;

    RCLDiv.setAttribute('id', 'RCLDiv');
    RCLDiv.insert(RCLButton);
    RCLDiv.insert(RCLGametype);
    RCLDiv.insert(RCLTimeout);
    RCLDiv.insert(RCLMin);
    RCLDiv.insert(RCLMax);
    RCLDiv.insert(RCLMode);

    RCLButton.setAttribute('id', 'RCLButton');
    RCLButton.setAttribute('type', 'button');
    RCLButton.textContent = 'В чат!';
    RCLButton.setAttribute('title', 'Создать заезд и отправить ссылку в чат');
    RCLButton.onclick = create;

    RCLGametype.setAttribute('id', 'RCLGametype');
    RCLGametype.value = currentGametype;
    RCLGametype.setAttribute('title', 'Обычный - normal\n' +
                                      'По словарю - id словаря\n' +
                                      'Безошибочный - noerror\n' +
                                      'Буквы - chars\n' +
                                      'Марафон - marathon\n' +
                                      'Спринт - sprint\n' +
                                      'Абракадабра - abra\n' +
                                      'Цифры - digits\n' +
                                      'Я.Рефераты - referats\n'
                            );

    RCLTimeout.setAttribute('id', 'RCLTimeout');
    RCLTimeout.setAttribute('title', 'Таймаут');
    RCLTimeout.insert(option('5', '5 секунд'));
    RCLTimeout.insert(option('10', '10 секунд'));
    RCLTimeout.insert(option('20', '20 секунд'));
    RCLTimeout.insert(option('30', '30 секунд'));
    RCLTimeout.insert(option('45', '45 секунд'));
    RCLTimeout.insert(option('60', '1 минута'));
    RCLTimeout.insert(option('120', '2 минуты'));
    RCLTimeout.value = currentTimeout;

    RCLMin.setAttribute('id', 'RCLMin');
    RCLMin.setAttribute('title', 'Минимальный ранг');
    RCLMin.insert(option('1', 'Новичок'));
    RCLMin.insert(option('2', 'Любитель'));
    RCLMin.insert(option('3', 'Таксист'));
    RCLMin.insert(option('4', 'Профи'));
    RCLMin.insert(option('5', 'Гонщик'));
    RCLMin.insert(option('6', 'Маньяк'));
    RCLMin.insert(option('7', 'Супермен'));
    RCLMin.insert(option('8', 'Кибергонщик'));
    RCLMin.insert(option('9', 'Экстракибер'));
    RCLMin.value = currentMin;

    RCLMax.setAttribute('id', 'RCLMin');
    RCLMax.setAttribute('title', 'Максимальный ранг');
    RCLMax.insert(option('1', 'Новичок'));
    RCLMax.insert(option('2', 'Любитель'));
    RCLMax.insert(option('3', 'Таксист'));
    RCLMax.insert(option('4', 'Профи'));
    RCLMax.insert(option('5', 'Гонщик'));
    RCLMax.insert(option('6', 'Маньяк'));
    RCLMax.insert(option('7', 'Супермен'));
    RCLMax.insert(option('8', 'Кибергонщик'));
    RCLMax.insert(option('9', 'Экстракибер'));
    RCLMax.value = currentMax;

    RCLMode.setAttribute('id', 'RCLMode');
    RCLMode.setAttribute('type', 'checkbox');
    if (currentMode == 'normal')
        RCLMode.checked = true;
    else
        RCLMode.checked = false;
    RCLMode.setAttribute('title', 'Галочка - открытый, иначе - дружеский');

    inviteDiv.childElements()[2].insertBefore(RCLDiv, inviteDiv.childElements()[2].childElements()[1]);

    RCLGametype.setAttribute('style',
                             'width: 70px; ' +
                             'text-align: center; ' +
                             'outline: none; ' +
                             'border: gray solid 1px; ' +
                             'margin: 5px -1px 0px 0px; '
                            );
    RCLButton.setAttribute('style',
                           'outline: none; ' +
                           'border: gray solid 1px; ' +
                           'margin: 5px -1px 0px 0px; '
                          );
    RCLTimeout.setAttribute('style',
                            'outline: none; ' +
                            'border: gray solid 1px; ' +
                            'margin: 5px -1px 0px 0px; '
                           );
    RCLMin.setAttribute('style',
                        'outline: none; ' +
                        'border: gray solid 1px; ' +
                        'margin: 5px -1px 0px 0px; ' +
                        'width: 45px'
                       );
    RCLMax.setAttribute('style',
                        'outline: none; ' +
                        'border: gray solid 1px; ' +
                        'margin: 5px 5px 0px 0px; ' +
                        'width: 45px'
                       );
    RCLMode.setAttribute('style',
                         ''
                        );

    function create() {
        var gametype = '';
        if (RCLGametype.value.match(/(\d+)/))
            gametype = 'voc&voc=' + RCLGametype.value;
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
                                 '&level_from=' + RCLMin.value +
                                 '&level_to=' + RCLMax.value +
                                 '&timeout=' + RCLTimeout.value +
                                 '&submit=1'
                                );
        if ((RCLMin.value == '1') && (RCLMax.value == '9'))
            gamechatInput(newRaceUrl.responseURL +
                          ' **' + RCLTimeout.value + ' секунд**'
                         );
        else
            gamechatInput(newRaceUrl.responseURL + ' ' +
                          RCLMin.options[RCLMin.selectedIndex].text + ' — ' +
                          RCLMax.options[RCLMax.selectedIndex].text +
                          ' **' + RCLTimeout.value + ' секунд**'
                         );
        gamechatSend();
    }

    function httpGet(theUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open( "GET", theUrl, false ); // false for synchronous request
        xhr.send( null );
        return xhr;
    }

})();
