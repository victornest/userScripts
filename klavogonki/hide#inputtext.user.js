// ==UserScript==
// @name           hide #inputtext
// @version        0.01
// @namespace      klavogonki
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://klavogonki.ru/g/*
// @grant          GM_addStyle
// @run-at         document-start
// ==/UserScript==

GM_addStyle ( `
    #inputtext {
        opacity: 0;
    }
` );
