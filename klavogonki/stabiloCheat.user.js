// ==UserScript==
// @name           stabiloCheat
// @version        0.20
// @namespace      klavogonki
// @author         490344
// @include        http://klavogonki.ru/g/*
// @include        https://klavogonki.ru/g/*
// @grant          unsafeWindow
// ==/UserScript==


document.addEventListener('load', function() {

    var proxied = window.XMLHttpRequest.prototype.send;
    var length;
    var text;
    var interval;
    var defaultColorPickerColors = ['#ffece5', '#ff5435', '#ff0000'];
    var defaultColorPickerPercents = [0, 90, 99];
    if (localStorage.stabiloCheat === undefined) {
        localStorage.stabiloCheat = JSON.stringify({
            speed: 500,
            showRemainingTime: true,
            showAvgSpeed: true,
            showScale: true,
            colorPicker: {
                color: [
                    '#ffffe8',
                    '#ffd900',
                    '#ff0000'
                ],
                percent: [
                    0,
                    90,
                    102
                ]
            }
        });
    } else {
        let data = JSON.parse(localStorage.stabiloCheat);
        if (data.speed === '')
            data.speed = 500;
        if (typeof(data.showRemainingTime) !== 'boolean')
            data.showRemainingTime = true;
        if (typeof(data.showAvgSpeed) !== 'boolean')
            data.showAvgSpeed = true;
		if (typeof(data.showScale) !== 'boolean')
			data.showScale = true;
        for (let i = 0; i < 3; i++) {
            if (data.colorPicker.color[i].slice(0, 1) !== '#')
                data.colorPicker.color[i] = defaultColorPickerColors[i];
            if (typeof(+data.colorPicker.percent[i]) !== 'number')
                data.colorPicker.percent[i] = defaultColorPickerPercents[i];
        }
        localStorage.stabiloCheat = JSON.stringify(data);
    }

    window.XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            try {
                var json = JSON.parse(this.responseText);
                if ('text' in json) {
                    text = json.text;
                    length = json.text.length;
                    if (localStorage.stabiloCheat) {
                        if (document.getElementById('inputSpeed').value === '') {
                            document.getElementById('inputSpeed').value = JSON.parse(localStorage.stabiloCheat).speed;
                            getTime(document.getElementById('inputSpeed').value);
                        }
                        rtBar.max = length;
                        unsafeWindow.txt = text;
                    }
                    setInt(inputSpeed.value, length);
                }
            } catch (e) {}
        }.bind(this));
        return proxied.apply(this, [].slice.call(arguments));
    };


    unsafeWindow.timeForSpeed = function(speed) {
        var time = (60 / (speed / length));
        if (time > 60) {
            time = (Math.floor(time / 60) + ':' + (time % 60).toFixed(1));
        }
        return console.log(time.toFixed(2));
    };

// settings panel

    // inject place
    var tfsInputInjPlace = document.getElementById('params').getElementsByClassName('rc')[0];

    //input for speed and result
    var tfsContainer = document.createElement('div');
    var inputSpeed = document.createElement('input');
    var tfs = document.createElement('div');

    inputSpeed.setAttribute('class', 'SC-input');
    inputSpeed.setAttribute('id', 'inputSpeed');
    inputSpeed.addEventListener('keydown', function (e) {
        if (+e.key === +e.key.replace(/[\^d]/g,'')) {
            let speed = this.value + e.key;
            if (getTime(speed) === 'Infinity:NaN') {
                document.getElementById('tfs').innerText = 'Вжух!';
                return;
            }
            let data = JSON.parse(localStorage.stabiloCheat);
            data.speed = speed;
            localStorage.stabiloCheat = JSON.stringify(data);
            setInt(speed, length);
        } else if (e.key === 'Backspace') {
            let speed = this.value.slice(0, -1);
            if (getTime(speed) === 'Infinity:NaN') {
                document.getElementById('tfs').innerText = 'Вжух!';
                return;
            }
            let data = JSON.parse(localStorage.stabiloCheat);
            data.speed = speed;
            localStorage.stabiloCheat = JSON.stringify(data);
            setInt(speed, length);
        } else if (['Delete', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].include(e.key)) {
            let speed = this.value;
            if (getTime(speed) === 'Infinity:NaN') {
                document.getElementById('tfs').innerText = 'Вжух!';
                return;
            }
            let data = JSON.parse(localStorage.stabiloCheat);
            data.speed = speed;
            localStorage.stabiloCheat = JSON.stringify(data);
            setInt(speed, length);
        } else {
            e.preventDefault();
        }
    });

    inputSpeed.addEventListener('keyup', function () {
        if (this.value === '') {
            document.getElementById('tfs').innerText = 'Вжух!';
        } else {
            let speed = this.value;
            if (getTime(speed) === 'Infinity:NaN') {
                document.getElementById('tfs').innerText = 'Вжух!';
                return;
            }
            let data = JSON.parse(localStorage.stabiloCheat);
            data.speed = speed;
            localStorage.stabiloCheat = JSON.stringify(data);
            setInt(speed, length);
        }
    });

    tfs.setAttribute('id', 'tfs');

    //best speed percent
    var bestSpeedLabel = document.createElement('div');
	//succesful coeff
	var succCoeff = document.createElement('div');

    //bar toggle on|off
    var barSwitchContainer = document.createElement('div');
    var barSwitchBtn = document.createElement('input');
    var barSwitchBtnLabel = document.createElement('label');

    barSwitchBtn.setAttribute('type', 'checkbox');
    barSwitchBtn.setAttribute('class', 'SC-checkbox');
	barSwitchBtn.setAttribute('id', 'SC-barSwitchBtn');
    barSwitchBtn.checked = JSON.parse(localStorage.stabiloCheat).showRemainingTime;
    barSwitchBtn.addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('SC-rtBar').style.removeProperty('display');
            let data = JSON.parse(localStorage.stabiloCheat);
            data.showRemainingTime = true;
            localStorage.stabiloCheat = JSON.stringify(data);
        } else {
            document.getElementById('SC-rtBar').style.setProperty('display', 'none');
            let data = JSON.parse(localStorage.stabiloCheat);
            data.showRemainingTime = false;
            localStorage.stabiloCheat = JSON.stringify(data);
        }
    });

	barSwitchBtnLabel.setAttribute('for', 'SC-barSwitchBtn');
    barSwitchBtnLabel.setAttribute('class', 'SC-label');
    barSwitchBtnLabel.innerText = 'Оставшееся время';

        //bar customize
    var barColorPickerColor = [
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input')
    ];
    var barColorPickerPercent = [
        document.createElement('input'),
        document.createElement('input'),
        document.createElement('input')
    ];

    function setAttr(name, key, value) {
        for (let i = 0; i < 3; i++) {
            name[i].setAttribute(key, value);
        }
    }
    setAttr(barColorPickerColor, 'class', 'SC-colorPicker');
    setAttr(barColorPickerColor, 'type', 'color');
    setAttr(barColorPickerPercent, 'class', 'SC-colorPercent');

    for (let i = 0; i < 3; i++) {
        let data = JSON.parse(localStorage.stabiloCheat);
        barColorPickerColor[i].value = data.colorPicker.color[i];
        barColorPickerPercent[i].value = data.colorPicker.percent[i];
    }

    for (let i = 0; i < 3; i++) {
        barColorPickerColor[i].addEventListener('change', function() {
            let data = JSON.parse(localStorage.stabiloCheat);
            data.colorPicker.color[i] = this.value;
            localStorage.stabiloCheat = JSON.stringify(data);
            colorBar.style.setProperty('background', 'linear-gradient(90deg, ' +
                barColorPickerColor[0].value + ' ' +
                barColorPickerPercent[0].value + '%, ' +
                barColorPickerColor[1].value + ' ' +
                barColorPickerPercent[1].value + '%, ' +
                barColorPickerColor[2].value + ' ' +
                barColorPickerPercent[2].value + '%)'
            );
        });
        barColorPickerPercent[i].addEventListener('keyup', function() {
            let data = JSON.parse(localStorage.stabiloCheat);
            data.colorPicker.percent[i] = this.value;
            localStorage.stabiloCheat = JSON.stringify(data);
            colorBar.style.setProperty('background', 'linear-gradient(90deg, ' +
                barColorPickerColor[0].value + ' ' +
                barColorPickerPercent[0].value + '%, ' +
                barColorPickerColor[1].value + ' ' +
                barColorPickerPercent[1].value + '%, ' +
                barColorPickerColor[2].value + ' ' +
                barColorPickerPercent[2].value + '%)'
            );
        });
    }

    //avg speed toggle on|off
    var avgSpeedContainer = document.createElement('div');
    var avgSpeedBtn = document.createElement('input');
    var avgSpeedLabel = document.createElement('label');

    avgSpeedBtn.setAttribute('type', 'checkbox');
    avgSpeedBtn.setAttribute('class', 'SC-checkbox');
	avgSpeedBtn.setAttribute('id', 'SC-avgSpeedBtn');
    avgSpeedBtn.checked = JSON.parse(localStorage.stabiloCheat).showAvgSpeed;
    avgSpeedBtn.addEventListener('change', function () {
        if (this.checked) {
			//
			let ctx = canvas.getContext('2d');
			if (scaleBtn.checked) {
				if (avgSpeedBtn.checked) {
					clearCanvas(ctx);
					drawWithoutCenter(ctx);
				} else {
					clearCanvas(ctx);
					drawWithCenter(ctx);
				}
			} else {
				clearCanvas(ctx);
			}
			//
            document.getElementById('SC-avgSpeedCount').style.removeProperty('display');
            let data = JSON.parse(localStorage.stabiloCheat);
            data.showAvgSpeed = true;
            localStorage.stabiloCheat = JSON.stringify(data);
        } else {
			//
			let ctx = canvas.getContext('2d');
			if (scaleBtn.checked) {
				if (avgSpeedBtn.checked) {
					clearCanvas(ctx);
					drawWithoutCenter(ctx);
				} else {
					clearCanvas(ctx);
					drawWithCenter(ctx);
				}
			} else {
				clearCanvas(ctx);
			}
			//
            document.getElementById('SC-avgSpeedCount').style.setProperty('display', 'none');
            let data = JSON.parse(localStorage.stabiloCheat);
            data.showAvgSpeed = false;
            localStorage.stabiloCheat = JSON.stringify(data);
        }
    });

    avgSpeedLabel.innerText = 'Средняя скорость';
    avgSpeedLabel.setAttribute('class', 'SC-label');
	avgSpeedLabel.setAttribute('for', 'SC-avgSpeedBtn');

	//scale toggle on|off
	var scaleContainer = document.createElement('div');
    var scaleBtn = document.createElement('input');
	var scaleLabel = document.createElement('label');

	scaleBtn.setAttribute('type', 'checkbox');
    scaleBtn.setAttribute('class', 'SC-checkbox');
	scaleBtn.setAttribute('id', 'SC-scaleBtn');
    scaleBtn.checked = JSON.parse(localStorage.stabiloCheat).showScale;
	scaleBtn.addEventListener('change', function () {
		let ctx = canvas.getContext('2d');
        if (this.checked) {
            if (avgSpeedBtn.checked) {
				clearCanvas(ctx);
				drawWithoutCenter(ctx);
			} else {
				clearCanvas(ctx);
				drawWithCenter(ctx);
			}
			let data = JSON.parse(localStorage.stabiloCheat);
            data.showScale = true;
            localStorage.stabiloCheat = JSON.stringify(data);
        } else {
            clearCanvas(ctx);
			let data = JSON.parse(localStorage.stabiloCheat);
            data.showScale = false;
            localStorage.stabiloCheat = JSON.stringify(data);
        }
    });

    scaleLabel.innerText = 'Шкала';
    scaleLabel.setAttribute('class', 'SC-label');
	scaleLabel.setAttribute('for', 'SC-scaleBtn');

    //inserting
    tfsContainer.insert(inputSpeed);
    tfsContainer.insert(tfs);
    barSwitchContainer.insert(barSwitchBtn);
    barSwitchContainer.insert(barSwitchBtnLabel);
    barSwitchContainer.insert(barColorPickerColor[0]);
    barSwitchContainer.insert(barColorPickerPercent[0]);
    barSwitchContainer.insert(barColorPickerColor[1]);
    barSwitchContainer.insert(barColorPickerPercent[1]);
    barSwitchContainer.insert(barColorPickerColor[2]);
    barSwitchContainer.insert(barColorPickerPercent[2]);
    avgSpeedContainer.insert(avgSpeedBtn);
    avgSpeedContainer.insert(avgSpeedLabel);
	scaleContainer.insert(scaleBtn);
	scaleContainer.insert(scaleLabel);
    tfsInputInjPlace.insertBefore(tfsContainer, tfsInputInjPlace.childNodes[3]);
    tfsInputInjPlace.insertBefore(bestSpeedLabel, tfsInputInjPlace.childNodes[4]);
	tfsInputInjPlace.insertBefore(succCoeff, tfsInputInjPlace.childNodes[5]);
    tfsInputInjPlace.insertBefore(barSwitchContainer, tfsInputInjPlace.childNodes[6]);
    tfsInputInjPlace.insertBefore(avgSpeedContainer, tfsInputInjPlace.childNodes[7]);
	tfsInputInjPlace.insertBefore(scaleContainer, tfsInputInjPlace.childNodes[8]);

// ******** REMAINING TIME BAR ********

    var rtBarInjPlace = document.getElementById('sortable');

    var rtBarInjNode = document.createElement('div');
    var rtBar = document.createElement('input');
    var colorBar = document.createElement('div');
	var canvas = document.createElement('canvas');

    rtBar.type = 'range';
    rtBar.min = 0;
    // rtBar.max at line ~43
    rtBar.step = 1;
    rtBar.value = 0;
    rtBar.setAttribute('disabled', 'true');
    rtBar.style.setProperty('display', 'none');

    var colorProgressBar = colorBar.cloneNode();
    var avgSpeedCount = document.createElement('div');

	canvas.setAttribute('id', 'SC-canvas');
	canvas.width = 740;
	canvas.height = 30;

    //inserting
    rtBarInjNode.insert(rtBar);
    rtBarInjNode.insert(colorBar);
    colorBar.insert(avgSpeedCount);
    colorBar.insert(colorProgressBar);
	colorBar.insert(canvas);
    rtBarInjPlace.insertBefore(rtBarInjNode, document.getElementById('main-block'));

    avgSpeedCount.setAttribute('id', 'SC-avgSpeedCount');
    rtBarInjNode.setAttribute('id', 'SC-rtBar');
    colorBar.setAttribute('id', 'SC-cb');
    colorBar.setAttribute('class', 'SC-bar');
    colorProgressBar.setAttribute('id', 'SC-cpb');
    colorProgressBar.setAttribute('class', 'SC-bar');

    //applying checkboxes
    if (barSwitchBtn.checked)
        document.getElementById('SC-rtBar').style.removeProperty('display');
    else
        document.getElementById('SC-rtBar').style.setProperty('display', 'none');

    if (avgSpeedBtn.checked)
        document.getElementById('SC-avgSpeedCount').style.removeProperty('display');
    else
        document.getElementById('SC-avgSpeedCount').style.setProperty('display', 'none');

	if (scaleBtn.checked) {
		let ctx = canvas.getContext('2d');
		if (scaleBtn.checked) {
			if (avgSpeedBtn.checked) {
				clearCanvas(ctx);
				drawWithoutCenter(ctx);
			} else {
				clearCanvas(ctx);
				drawWithCenter(ctx);
			}
		}
	} else {
		clearCanvas(canvas.getContext('2d'));
	}


    //var b = [];
    //
    var timer;
    var timeA = 0; //current time
    var timeB = 0; //source time
    var passedTime = 0; //passed time between chars
    var gmid = document.location.href.slice(-6).replace(/[^\d]/g, '');
	if (location.protocol === 'http:')
		var url = "http://klavogonki.ru/g/" + gmid + ".info";
	else
		var url = "https://klavogonki.ru/g/" + gmid + ".info";
    var gameInfo = JSON.parse(httpGet(url));
	unsafeWindow.gameInfo = gameInfo;
    var name = document.getElementsByClassName('name')[0].innerText.trim();
    var bestSpeed;

    for (let i = 0; i < gameInfo.players.length; i++) {
        if (gameInfo.players[i].name === name) {
            bestSpeed = gameInfo.players[i].user.best_speed;
        }
    }

    checkInputActivity();

    var css =
		' #SC-canvas { ' +
		' left: 0; ' +
		' position: absolute; } ' +

        ' #tfs { ' +
        ' display: inline; ' +
        ' padding: 0 5px; } ' +

        ' #SC-cb { ' +
        ' width: 740px; ' +
        ' background: ' +
            'linear-gradient(90deg, ' +
            barColorPickerColor[0].value + ' ' +
            barColorPickerPercent[0].value + '%, ' +
            barColorPickerColor[1].value + ' ' +
            barColorPickerPercent[1].value + '%, ' +
            barColorPickerColor[2].value + ' ' +
            barColorPickerPercent[2].value + '%); ' +
        ' box-shadow: 2px 2px 10px -8px; } ' +

        ' #SC-cpb { ' +
        ' background: #797979e0; ' +
        ' max-width: 740px; ' +
        ' width: 0px; ' +
        ' transition-property: width; ' +
        ' transition-timing-function: cubic-bezier(0,0,1,1); ' +
        ' z-index: 0; } ' +

        ' #SC-rtBar { ' +
        ' padding-bottom: 30px; } ' +

        ' #SC-avgSpeedCount { ' +
        ' position: absolute; ' +
        ' z-index: 1; ' +
        ' left: 50%; ' +
		' top: 50%; ' +
		' transform: translate(-50%, -50%); ' +
        ' color: #460000; ' +
        ' font: 26px consolas; } ' +

        ' .SC-checkbox { ' +
        ' outline: none !important; ' +
        ' margin-right: 5px; ' +
        ' display: inline; }' +

        ' .SC-label { ' +
		' margin: 0 5px 0 5px; ' +
        ' display: inline; } ' +

        ' .SC-colorPicker { ' +
        ' border: none; ' +
        ' width: 15px; ' +
        ' height: 15px; ' +
        ' padding: 0 0; ' +
        //' margin-left: 5px; ' +
        ' top: 3px !important; } ' +

        ' .SC-colorPercent { ' +
        ' border: 1px solid gray; ' +
        ' width: 24px; ' +
        ' height: 15px; ' +
        ' padding: 0 0; ' +
		' margin: 0 2px 0 -1px; ' +
        ' vertical-align: text-top; ' +
        ' text-align: center; } ' +

        ' .SC-input { ' +
        ' display: inline; ' +
        ' max-width: 40px; ' +
        ' border: solid 1px #d5d5d5; ' +
        ' text-align: center; } ' +

        ' .SC-avgSpeedLabel { ' +
        ' display: inline; } ' +

        ' .SC-bar { ' +
        ' position: absolute; ' +
        ' height: 30px; ' +
        ' border-radius: 10px; ' +
        ' z-index: 895; } ';

    var style = document.createElement('style');
    if (style.styleSheet)
        style.stylesheet.cssText = css;
    else
        style.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(style);


    // FUNCTIONS

    async function checkInputActivity() {
        if (document.getElementById('inputtext').className === 'normal') {
            //console.log((1000 * (60 / (inputSpeed.value / length))) + 'ms');
            colorProgressBar.style.setProperty('transition-duration', (1000 * (60 / (inputSpeed.value / length))) + 'ms');
            colorProgressBar.style.setProperty('width', '740px');
            timeA = Date.now();
            timer = setTimeout(startBar(), interval);
            timeB = Date.now();
            return checkInputDisability();
        } else {
            await sleep(10);
            return checkInputActivity();
        }
    }

    async function checkInputDisability() {
        let speed = document.getElementsByClassName('you')[0].getElementsByClassName('bitmore')[2];
        if (speed !== undefined) {
            bestSpeedLabel.innerText = 'Скорость: ' + ((speed.innerText * 100) / bestSpeed).toFixed(1) + '% от рекорда';
			writeSuccCoeff();
		} else {
            await sleep(100);
            avgSpeedCount.innerText = getSpeed(Date.now() - timeB);
            return checkInputDisability();
        }
		function writeSuccCoeff() {
			let complexity = document.getElementById('statistics').getElementsByTagName('span');
			complexity = complexity[0].innerText + complexity[1].innerText;
			let succCoeffValue = (speed.innerText * Math.log(10 + +complexity) / Math.log(10)).toFixed();

			if (succCoeffValue.slice(-1) == 1)
				succCoeff.innerText = 'Успешность: ' + succCoeffValue + ' балл';
			else if ([2, 3, 4].include(succCoeffValue.slice(-1)))
				succCoeff.innerText = 'Успешность: ' + succCoeffValue + ' балла';
			else
				succCoeff.innerText = 'Успешность: ' + succCoeffValue + ' баллов';
			return;
		}
    }

    function startBar() {
        if (rtBar.value !== rtBar.max) {
            rtBar.value++;
            passedTime += Date.now() - timeA;
            /*b.push(Date.now() - timeA);
            console.table('passed: ', Date.now() - timeA,
                        ' over: ', Date.now() - timeA - interval,
                        ' passedTime: ', passedTime,
                        ' next after: ', (interval - (passedTime - (rtBar.value * interval))),
                        ' rtBar: ', rtBar.value);*/
            timer = setTimeout(startBar, (interval - (passedTime - (rtBar.value * interval))));
            timeA = Date.now();
            return;
        }
        clearInterval(timer);
        //var o = 0; for (let i = 0; i < b.length; i++) { o += b[i]; } console.log(o); // <-- complete in time
    }

	function drawWithCenter(ctx) {
		ctx.beginPath();
		for (let i = 1; i < 10; i++) {
			ctx.moveTo(74*i, 30);
			ctx.lineTo(74*i, 25);
			if (i >= 9)
				break;
			ctx.moveTo(74*(i+1), 30);
			ctx.lineTo(74*(i+1), 15);
			i++;
		}
		ctx.stroke();
		ctx.stroke();
	}

	function drawWithoutCenter(ctx) {
		ctx.beginPath();
		for (let i = 1; i < 10; i++) {
			if (i === 5) {
				ctx.moveTo(74*(i+1), 30);
				ctx.lineTo(74*(i+1), 15);
				i++;
				continue;
			}
			ctx.moveTo(74*i, 30);
			ctx.lineTo(74*i, 25);
			if (i >= 9)
				break;
			ctx.moveTo(74*(i+1), 30);
			ctx.lineTo(74*(i+1), 15);
			i++;
		}
		ctx.stroke();
		ctx.stroke();
	}

	function drawDigits(ctx) {
		ctx.font = '14px consolas';
		ctx.fillText('1 0', 74, 25);
	}

	function clearCanvas(ctx) {
		ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
	}

    function getTime(speed) {
        var time = (60 / (speed / length)).toFixed(2);
        if (time > 60) {
            console.log(time);
            time = (Math.floor(time / 60) + ':' + (time % 60).toFixed(1));
        }
        document.getElementById('tfs').innerText = time;
        return time;
    }

    function getSpeed(time) {
        return (60 / time * length * 1000).toFixed();
    }

    function setInt(speed, length) {
        interval = (1000 / (length / (60 / (speed / length)))).toFixed();
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}());
