// ==UserScript==
// @name           vmeste.tv compact style
// @version        0.13
// @namespace      vmeste
// @author         http://klavogonki.ru/u/#/490344/
// @include        http://vmeste.tv/*
// @include        https://vmeste.tv/*
// @grant          none
// ==/UserScript==

(() => {

	function Sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function clearChatOnStart() {
		try {
			let i = document.getElementById('mCSB_1_container').childNodes.length;
			while(i--) {
				document.getElementById('mCSB_1_container').childNodes[i].remove();
			}
			return true;
		} catch(error) {
			return false;
		}
	}

	async function applyCSS() {
		var sound = new Audio('https://raw.githubusercontent.com/gaben-s-agent/klavogonki/master/vmeste.tv/file-sounds-913-served.mp3');
		if (document.getElementById('users').textContent != '') {
			var compact =
				' #chats { ' +
				' flex: auto; ' +
				//' width: 250px; ' +
				//' font-size: 14px; ' +
				' background-image: url() !important; ' +
				' background: 0;} ' +

				' .message { ' +
				' margin: 5px !important; ' +
				' min-width: 45px !important; ' +
				' background: #0D0D0DBA !important; ' +
				' font-size: 20px !important; ' +
				' color: #ffffff9e !important; } ' +

				' .timestamp { ' +
				' color: #ffffff36 !important; } ' +

				' .message::before { ' +
				' border-top: 0 !important; }' +

				' .message-personal { ' +
				' border-radius: 20px 20px 20px 0 !important; }' +

				' .message-my { ' +
				' border-radius: 20px 20px 0 20px !important; }' +

				' .sync-button { ' +
				' background: #0D0D0D !important; ' +
				' color: #9d9d9d !important; ' +
				' width: 30% !important; } ' +

				' .message-box { ' +
				' border-radius: 100px; ' +
				' background: rgba(0, 0, 0, 0.28); } ' +

				' .chat-title a { ' +
				' color: #7b7b7b !important; } ' +

				' .timestamp { ' +
				' color: #ffffff36 !important; ' +
				' display: none !important; ' +
				' bottom: -3px !important; }' +

				' .avatar { ' +
				' display: none !important; }' +

				' #footer { ' +
				' width: 90%; } '
				;
			var style = document.createElement('style');
			if (style.styleSheet) {
				style.styleSheet.cssText = compact;
			} else {
				style.appendChild(document.createTextNode(compact));
			}

			document.getElementsByTagName('head')[0].appendChild(style);

			document.getElementById('mCSB_1_scrollbar_vertical').remove();

			var sexyChat = document.getElementsByClassName('chat-title')[0].childNodes[3].childNodes[0].cloneNode(true);
			var clearChat = document.getElementsByClassName('chat-title')[0].childNodes[3].childNodes[0].cloneNode(true);
			var buttonPanel = document.getElementsByClassName('chat-title')[0].childNodes[3];
			var messageInput = document.getElementsByClassName('message-input')[1];
			var messageEditor = document.getElementsByClassName('emoji-wysiwyg-editor')[0];

			messageInput.style.setProperty('outline', 'none');
			messageInput.style.setProperty('text-align', 'right');
			messageInput.style.setProperty('padding-right', '10px');

			messageEditor.setAttribute('placeholder', '');
			messageEditor.style.setProperty('padding-right', '20px');
			messageEditor.style.setProperty('margin-left', '13px');
			messageEditor.style.setProperty('margin-top', '-3px');
			messageEditor.style.setProperty('border-top', '1px solid #00110f');

			buttonPanel.childNodes[0].textContent = 'sync';
			buttonPanel.appendChild(sexyChat);
			buttonPanel.appendChild(clearChat);

			clearChat.setAttribute('id', 'clear-chat');
			clearChat.style.setProperty('width', '100%', 'important');
			clearChat.textContent = 'clear chat';

			sexyChat.setAttribute('id', 'chat-mode');
			sexyChat.style.setProperty('width', '68%', 'important');
			sexyChat.style.setProperty('margin-left', '4px');
			sexyChat.textContent = 'sexyChat is OFF';

			document.getElementsByTagName('i')[0].style.setProperty('display', 'none');
			document.getElementsByTagName('i')[1].style.setProperty('display', 'none');

			sexyChat.onclick = function changeChat(state) {
				var chats = document.getElementById('chats');
				var iframe = document.getElementsByTagName('iframe')[0];
				if (sexyChat.textContent == 'sexyChat is OFF') {
					chats.style.setProperty('position', 'absolute');
					chats.style.setProperty('right', '0');
					chats.style.setProperty('box-shadow', 'none');
					chats.childNodes[1].style.setProperty('opacity', '.05');
					chats.childNodes[5].style.setProperty('opacity', '.05');
					chats.childNodes[1].style.setProperty('background', '0');
					chats.childNodes[1].childNodes[1].style.setProperty('text-align', 'right');
					chats.style.setProperty('height', '953px');
					chats.childNodes[3].style.setProperty('height', '852px');
					chats.style.setProperty('display', 'block');
					chats.appendChild(chats.childNodes[3]);
					chats.appendChild(chats.childNodes[3]);
					chats.childNodes[1].onmouseover = function() { chats.childNodes[1].style.setProperty('opacity', '1'); };
					chats.childNodes[3].onmouseover = function() { chats.childNodes[3].style.setProperty('opacity', '1'); };
					chats.childNodes[1].onmouseout = function() { chats.childNodes[1].style.setProperty('opacity', '.05'); };
					chats.childNodes[3].onmouseout = function() { chats.childNodes[3].style.setProperty('opacity', '.05'); };
					chats.childNodes[5].onmouseover = function() {
						let i = chats.childNodes[5].childNodes[1].childNodes[0].childNodes[0].childNodes.length;
						let msg = chats.childNodes[5].childNodes[1].childNodes[0].childNodes[0].childNodes;
						while(i--) {
							msg[i].style.setProperty('opacity', '1');
						}
					};
					chats.childNodes[5].onmouseout = function() {
						let i = chats.childNodes[5].childNodes[1].childNodes[0].childNodes[0].childNodes.length;
						let msg = chats.childNodes[5].childNodes[1].childNodes[0].childNodes[0].childNodes;
						while(i--) {
							msg[i].style.setProperty('opacity', '.05');
						}
					};
					iframe.style.setProperty('position', 'absolute');
					iframe.style.setProperty('height', '100%');
					document.getElementsByClassName('d-none')[0].style.setProperty('display', 'none', 'important');

					sexyChat.textContent = 'sexyChat is ON';
				} else {
					chats.style.removeProperty('position');
					chats.style.removeProperty('right');
					chats.style.setProperty('box-shadow', '0 5px 30px rgba(0, 0, 0, 0.2)');
					chats.style.setProperty('opacity', '1');
					chats.childNodes[1].style.setProperty('background', 'rgba(0, 0, 0, 0.9)');
					chats.childNodes[1].childNodes[1].style.setProperty('text-align', 'left');
					chats.style.removeProperty('height');
					chats.childNodes[3].style.removeProperty('height');
					chats.style.removeProperty('display');
					chats.appendChild(chats.childNodes[3]);
					chats.appendChild(chats.childNodes[3]);
					chats.childNodes[1].onmouseover = null;
					chats.childNodes[3].onmouseover = null;
					chats.childNodes[1].onmouseout = null;
					chats.childNodes[3].onmouseout = null;
					iframe.style.removeProperty('position');
					iframe.style.setProperty('height', '110%');
					document.getElementsByClassName('d-none')[0].style.setProperty('display', ' ');

					sexyChat.textContent = 'sexyChat is OFF';
				}
			}

			var mCSB = document.getElementById('mCSB_1_container');
			function ClearChat() {
				var i = mCSB.childNodes.length;
				while (i--) {
					mCSB.childNodes[i].remove();
				}
				console.log('chat cleared');
			}
			clearChat.onclick = ClearChat;

			async function newMsgHighlight(msg) {
				await Sleep(5001);
				for (let i = 99; i > 4; i--) {
					if(msg.style.getPropertyValue('opacity') == 1) {
						return;
					}
					if (i < 10) {
						msg.style.setProperty('opacity', ('.0' + i));
					} else {
						msg.style.setProperty('opacity', ('.' + i));
					}
					await Sleep(100);
				}
			}

			async function a() {
				try {
					var len = mCSB.childNodes.length;
					document.getElementById('chats').style.setProperty('height', (document.documentElement.clientHeight - 180 + 'px'));
					await Sleep(100);
					if (mCSB.childNodes.length != len) {
						let newMsg = mCSB.childNodes[mCSB.childNodes.length - 1];
						mCSB.insertBefore(newMsg, mCSB.childNodes[0]);
						newMsgHighlight(newMsg);
						sound.volume = 0.4;
						sound.play();
					}
					a();
				} catch (error) {
					a();
				}
			}
			a();
			return;
		} else {
			await Sleep(1000);
			clearChatOnStart();
			applyCSS();
		}
	}

	window.addEventListener('load', function() {
		applyCSS();
	})
})()
