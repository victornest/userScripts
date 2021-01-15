// ==UserScript==
// @name         ChatlogBlacklist
// @namespace    klavogonki
// @version      0.1
// @description  make your chat log cleaner
// @author       http://klavogonki.ru/u/#/490344/
// @match        http*://klavogonki.ru/chatlogs/*
// @grant        none
// ==/UserScript==

(function() {

    let bl = new RegExp('Advisor|KlavoMedia|ПАНЧЕР|jemcik|2021г|BorisQuiz');
    let div = document.createElement('div');
    let newChatlog = document.createElement('div');
    for (let node of document.body.childNodes) {
        if (node.nodeName == 'BR') {

            if (div.querySelector('.mn')) {
                if (div.querySelector('.mn').innerText.match(bl)) {
                    div = document.createElement('div');
                } else {
                    newChatlog.append(div);
                    div = document.createElement('div');
                }
            }

            if (div.querySelector('.mne')) {
                if (div.querySelector('.mne').innerText.slice(0, 15).match(bl)) {
                    div = document.createElement('div');
                } else {
                    newChatlog.append(div);
                    div = document.createElement('div');
                }
            }


        } else {
            div.append(node.cloneNode(true));
        }
    }
    document.body.innerHTML = '';
    document.body.append(newChatlog);

})();
