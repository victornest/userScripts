// ==UserScript==
// @name         ZenMode
// @version      0.02
// @namespace    klavogonki
// @description  Максимальная концентрация, максимальный дзен
// @author       http://klavogonki.ru/u/#/490344/
// @include      http://klavogonki.ru/g/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(() => {


    const theme = 'classic';

    let globalOpacity = '100%';
    let bgColor = 'none';
    let fontColor = '#222';
    let errorBgColor = 'rgb(170,0,0)';
    let errorFontColor = 'white';

    switch(theme) {
        case 'classic':
            bgColor = 'none';
            fontColor = '#222';
            errorBgColor = 'rgb(170,0,0)';
            errorFontColor = 'white';
            break;
        case 'night':
            bgColor = '#222';
            fontColor = '#aaa';
            errorBgColor = '#660000';
            errorFontColor = '#aaa';
            break;
    }


    function hideAllElements() {
        for (let e of document.body.childElements()) {
            e.style.display = 'none';
        }
    }

    function moveMainBlock() {
        document.body.insert(document.querySelector('#main-block'));
    }

    function beautifyMainBlock() {
        document.querySelector('#hiddentext').innerText = 'ctrl + enter';
        document.querySelector('#inputtext').value = '';
    }

    function applyStyle() {
        let style = '<style>'+
            '#game-minifier, #main-block{position:absolute !important;top:50%;left:50%;transform:translate(-50%,-50%);}'+
            'body {opacity:'+globalOpacity+';background:'+bgColor+';}'+
            '.tl, .tr, .bl, .br {background:none !important;}'+
            '#typeblock {background:none !important;}'+
            '#keyboard_cont, #report, #errorwork, #errors_tab, #book, #again, #next-competition-2077,'+
                '.note, .handle, .bar, .hotkey{display:none;}'+
            '#game-minifier span {color:'+fontColor+';margin:20px !important;font-size:14pt;font-family:calibri,sans-serif;}'+
            '#game-minifier {margin:auto !important;text-align:center;}'+
            '#main-block {margin:auto !important;}'+
            '#typeblock #bookinfo #again td {padding:10px 20px !important;}'+
            '#typeblock #bookinfo a {text-decoration:none;}'+
            '#typetext {color:'+fontColor+';}'+
            '#hiddentext {background-color:#00000000 !important;text-shadow:none !important;color:#888 !important;font-weight:normal !important;border:2px solid #555;}'+
            '#waiting_timeout {margin:auto !important;display:table;font-size:3em;}'+
            '#inputtext {color:'+fontColor+';outline:none;border:2px solid #555;box-shadow:none !important;background:none !important;margin:10px auto !important;display:table;width:400px;text-align:center;font-family:monospace !important;}'+
            '#inputtext.error {color:'+errorFontColor+' !important;background:'+errorBgColor+' !important;}'+
            '</style>';
        document.body.insert(style);
    }

    function doTimer() {
        let timer = document.querySelector('#waiting_timeout');
        let inputtext = document.querySelector('#inputtext');
        //document.querySelector('#typeplayblock').insert(timer);
        new MutationObserver(function(muts, observer) {
            for(let mut of muts) {
                inputtext.placeholder = document.querySelector('#waiting_timeout').innerText;
                if ((+timer.innerText.replace(' ', '') === 0) || (+timer.innerText.replace(':', '') === 0)) {
                    inputtext.style.textAlign = 'left';
                    inputtext.style.setProperty('font-family', document.querySelector('#fontsize_cont').style['font-family'], 'important');
                    inputtext.placeholder = '';
                    timer.style.display = 'none';
                }
            }
        }).observe(timer, {attributes: true, childList: true});
    }

    function beautifyTitle() {
        document.title = '.';
        document.querySelector('[rel=icon]').href = 'http://google.com/favicon.ico';
        let observer = new MutationObserver(function(muts, observer) {
            observer.disconnect();
            document.title = '.';
            console.log('a');
            observer.observe(document.querySelector('title'), {attributes: true, childList: true});
        }).observe(document.querySelector('title'), {attributes: true, childList: true});
    }

    function minify() {
        hideAllElements();
        moveMainBlock();
        beautifyMainBlock();
        applyStyle();
        doTimer();
        beautifyTitle();
    }

    function waitForStats() {

        if (document.querySelector('.you'))
            if (document.querySelector('.you').querySelector('.rating'))
                new MutationObserver(function(muts, observer) {
                    for(let mut of muts) {
                        if (mut.addedNodes.length > 0) {

                            // скрытие инфы по отрывку книги/режиму
                            document.querySelector('#bookinfo').childElements()[0].style.display = 'none';

                            let result = document.createElement('div');
                            result.id = 'game-minifier';
                            if (document.querySelector('#gamedesc').innerText.match(/соревнование/) !== null) {
                                result.append((()=>{
                                    let count = document.querySelector('#players-count-lbl').firstElementChild.innerText.replace(/([^0-9])+/g, '');
                                    let e=document.createElement('span');
                                    e.innerText='Место: '+mut.addedNodes[0].innerText.replace(/([^0-9])+/g, '')+' / '+count;
                                    return e;
                                })()); // place
                            }
                            result.append((()=>{let e=document.createElement('span');e.innerText=mut.target.querySelector('.stats').childElements()[0].innerText;return e;})()); // time
                            result.append((()=>{let e=document.createElement('span');e.innerText=mut.target.querySelector('.stats').childElements()[1].innerText;return e;})()); // speed
                            result.append((()=>{let e=document.createElement('span');e.innerText=mut.target.querySelector('.stats').childElements()[2].innerText;return e;})()); // error
                            let mb = document.querySelector('#main-block');
                            document.body.insertBefore(result, mb);
                            mb.style.display = 'none';

                        }
                    }
                }).observe(document.querySelector('.you').querySelector('.rating'), {attributes: true, childList: true});
            else
                setTimeout(waitForStats, 100);
        else
            setTimeout(waitForStats, 100);

    }

    function init() {

        if (document.querySelector('#typeblock')) {
            minify();
            waitForStats();
        } else {
            setTimeout(init, 100);
        }

    }

    init();


})();
