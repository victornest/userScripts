// ==UserScript==
// @name           KG_CollapseSettings 2077
// @version        0.2
// @description    Сворачиватель блока настроек
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http*://klavogonki.ru/g/*
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function() {

    function expand() {
        params.style['max-height'] = paramsHeight + 'px';
        arrow.style.transform = 'scaleY(-1)';
        btn.removeEventListener('click', expand);
        btn.addEventListener('click', collapse);
    }


    function collapse() {
        params.style['max-height'] = '34px';
        arrow.style.transform = 'scaleY(1)';
        btn.removeEventListener('click', collapse);
        btn.addEventListener('click', expand);
    }


    let btn = document.createElement('div');
    btn.id = 'collapse-settings-2077';
    btn.addEventListener('click', expand);
    let arrow = document.createElement('div');
    arrow.id = 'collapse-settings-2077-arrow';
    btn.insert(arrow);
    let params = document.querySelector('#params');
    params.insert(btn);

    let paramsHeight;
    new MutationObserver(function(muts, observer) {
        paramsHeight = muts[0].target.querySelector('#params').scrollHeight;
        console.log('asd');
    }).observe(document.querySelector('#play-right'), {attributes: true, childList: true});

    collapse();


    let arrowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAfQAAAH0Bx0gPAAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACeSURBVDiN1ZPBDcIwDEWfMwt7sAQLMEWvnaRRC0dG4tY9+FyMZKgTIZULkSwl9n9PudgkseeUXfQvBAYcgQNQJT2+gswKcAbuACsgYAKKJHrlv56cWQEGfwioPYnDNeSH12AMzTmTODyH3CiJGIiSJUocXj7hN0EiuThY/L6BN4JEcvVK4VSQSJpwU5BIUlgS1tsFMzsBSLo1M/+/TE92ZfjD1tAH3gAAAABJRU5ErkJggg==';

    (() => {
        let css = document.createElement('style');
        css.innerHTML =
            " #collapse-settings-2077 { " +
            " position: absolute; " +
            " width: 100%; " +
            " height: 34px; " +
            " top: 0; " +
            " } " +

            " #collapse-settings-2077-arrow { " +
            " position: relative; " +
            " width: 32px; " +
            " height: 32px; " +
            " top: 2px; " +
            " right: 5px; " +
            " float: right; " +
            " filter: invert(40%); " +
            " background: center no-repeat url(" + arrowImage + "); " +
            " transition: all 0.1s linear;" +
            " } " +

            " #params { " +
            " position: relative; " +
            " overflow: hidden; " +
            " border-radius: 16px; " +
            " transition: max-height 0.2s linear; " +
            " } " +

            "";
        document.head.append(css);
    })();

})();
