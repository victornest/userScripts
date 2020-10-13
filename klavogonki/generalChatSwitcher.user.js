// ==UserScript==
// @name         generalChatSwitcher
// @version      0.2
// @description  Переключение вкладок чата
// @match        http://klavogonki.ru/g/*
// @match        https://klavogonki.ru/g/*
// ==/UserScript==

//активация общего чата при заходе в заезд
generalChatActivate();

//переключение вкладок нажатием таба, двойным нажатием - установление курсора в строку ввода чата
tabSwitcher();

//скроление чата alt + J / alt + K
chatScroll();

//время двойного нажатия (ms)
let dbltime = 300;
//расстояние скролла чата (px)
let scrollLength = 50;

let chatContent = document.querySelector('.messages-content');
let genTab = document.querySelector('#chat-title .general.c');
let gameTab = document.querySelector('#chat-title .game.c');
let genInput = document.querySelectorAll('.chat')[0].querySelector('.text');
let gameInput = document.querySelectorAll('.chat')[1].querySelector('.text');
let timesTabClicked = 0;

function focus() {
    if (genTab.hasClassName('active'))
        genInput.focus();
    else
        gameInput.focus();
}

function click() {
    if (!genTab.hasClassName('active'))
        genTab.click();
    else
        gameTab.click();
    chatContent.scrollTop = 100000;
}

function generalChatActivate() {
    window.addEventListener('load', function a() {
        if (!genTab.hasClassName('active')) {
            genTab.click();
            chatContent.scrollTop = 100000;
            setTimeout(a, 500);
        }
    });
}

function tabSwitcher() {
    window.addEventListener('keydown', function(e) {
        if (event.key === 'Tab') {
            e.preventDefault();
            timesTabClicked++;
            if (timesTabClicked < 2) {
                let t = setTimeout(function() {
                    if (timesTabClicked < 2) {
                        click();
                        timesTabClicked = 0;
                    } else {
                        timesTabClicked = 0;
                        clearTimeout(t);
                        focus();
                    }
                }, dbltime);
            }
        }
    });
}

function chatScroll() {
    const keys = {};
    window.addEventListener('keydown', function(e) {
        if ((e.code == 'AltLeft') || (e.code == 'AltRight'))
            e.preventDefault();
    });
    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;
    })
    window.addEventListener('keyup', (e) => {
        if ((keys['AltLeft'] || keys['AltRight']) && keys['KeyJ']) {
            chatContent.scrollBy({top: scrollLength, left: 0, behavior: 'smooth'});
        } else if ((keys['AltLeft'] || keys['AltRight']) && keys['KeyK']) {
            chatContent.scrollBy({top: -scrollLength, left: 0, behavior: 'smooth'});
        }
        keys[e.code] = false;
    })
}
