// ==UserScript==
// @name           HighlightUnderlineFix
// @version        0.1
// @namespace      klavogonki
// @author         490344
// @description    Заменяет подчеркивание текста typefocus при подсветке на нижнюю границу
// @include        http*://klavogonki.ru/g/*
// @grant          none
// ==/UserScript==


const color = '#33a';
const thickness = '3px';

const errorColor = 'red';


let typetext = document.querySelector('#typetext');
observe((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type == 'childList') {
            if (mutation.target.getOpacity() == 1) {
                let typefocus = document.querySelector('#typefocus');
                if (mutation.target.className === 'highlight_error') {
                    typefocus.style.textDecoration = 0;
                    typefocus.style.borderBottom = errorColor + ' solid ' + thickness;
                    typefocus.style.color = errorColor;
                } else {
                    typefocus.style.textDecoration = 0;
                    typefocus.style.borderBottom = color + ' solid ' + thickness;
                    typefocus.style.color = color;
                }
            }
        }
    }
}, typetext);


function observe(func, target) {
    let targetNode = target;
    let config = { attributes: true, childList: true, subtree: true };
    let callback = func;
    let observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
