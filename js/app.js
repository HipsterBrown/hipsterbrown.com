$(function() {
	'use strict';

	var HipWeb = HipWeb || {};

	HipWeb.ScrollMod = (function(){
		var lastScroll = 0,
		navbar = $('div#navbar');

		function scrollListener() {
			$(window).on('scroll.hip', aniScroll );
		}

		function aniScroll() {
			var st = $(this).scrollTop();

			if ( st + lastScroll >= 100 ) {
				navbar.addClass('scrolled');

				if ( st < lastScroll ) {
					navbar.removeClass('scrolled');
				}
			} else if ( st < lastScroll ) {
				navbar.removeClass('scrolled');
			}

			lastScroll = st;

			return lastScroll;
		}

		return {
			listen: scrollListener
		};
	}());



	HipWeb.MenuMod = (function(){
		var win = $(window),
		mq = window.matchMedia('(min-width: 710px)'),
		stache = $('a#break'),
		nav = $('div#navbar'),
		isSmall = false;

		function matchListener(check) {
			var mobile  = check || !mq.matches;

			if ( mobile ) {
				removeListener();
				stacheClick();
			}
		}

		function resizeListener() {
			win.on('resize', function(e) {
				console.log('resizing...');
				var sizeCheck = isSmall;

				if ( !mq.matches ) {
					isSmall = true;
				} else {
					console.log('still big enough');
					isSmall = false;
				}

				if ( sizeCheck !== isSmall ) {
					matchListener(isSmall);
				}

				return isSmall;
			});
		}

		function removeListener() {
			win.off('scroll');
		}

		function stacheClick() {
			stache.on('click', function(e) {
				e.preventDefault();
				nav.toggleClass('open');
			});
		}

		return {
			listen: matchListener,
			resizer: resizeListener
		};
	}());



	HipWeb.SwitchMod = (function() {
		var hipArray = ['ironic', 'authentic', 'vintage', 'classic', 'hip', 'confident'],
		headSpan = $('span.hip-feel');

		function spanSwitch(el, arr) {
			var span = el;
			var newWord = arr[Math.floor(Math.random() * arr.length)];
			span.text(newWord);
		}

		function loader() {
			spanSwitch(headSpan, hipArray);
		}

		return {
			switcher: loader
		};
	}());



	HipWeb.TextFitMod = (function() {
		var heading = $(' article h1 ');

		function sizingLoop() {
			for ( var i = 0; i < heading.length; i++ ) {
				var head = heading[i],
				headText = head.textContent;

				if ( headText.length > 36 ) {
					head.style.fontSize = '2em';
				} else if ( headText.length > 48 ) {
					head.style.fontSize = '1.8em';
				}
			}
		}

		return {
			sizer: sizingLoop
		};
	}());



	HipWeb.ArchiveShowMod = (function() {
		var arrow = $('span.arrow');

		function listControl() {
			arrow.on('click', reveil);
		}

		function reveil() {
			var that = $(this);

			that.toggleClass('open');

			if ( this.classList.contains('open') ) {
				that.html('&#8744;');
			} else {
				that.html('&#8743;');
			}

			$('article.archive').toggleClass('hide');
		}

		return {
			listen: listControl
		};
	}());



	HipWeb.EmailMod = (function() {
		var mail = new mandrill.Mandrill('nhtBwMOLtPtaBV8fKHiuww'),
		submit = $('#submit'),
		response = $('p.response');

		function createParams(name, email, topic, message, to) {
			var params = {
				'message': {
					'from_email': email,
					'to': [{'email': to}],
					'subject': topic,
					'text': name + ' has sent you a message from your site: \n' + message
				}
			};

			return params;
		}

		function clearVals() {
			var args = arguments;

			for (var i = 0; i < args.length; i++ ) {
				args[i].val('');
			}

		}

		function sendMail() {
			submit.on('click', function(event) {
				mailer(event);
			});
		}

		function mailer(event) {
			event.preventDefault();

			response.html('<strong>Sending...</strong>');

			var name = $('#name'),
			email = $('#email'),
			topic = $('#topic'),
			message = $('#message'),
			me = 'headhipster@hipsterbrown.com',
			params = createParams(name.val(), email.val(), topic.val(), message.val(), me);

			//console.log(name.val(), email.val(), topic.val(), message.val(), me);

			mail.messages.send(params, function(res) {
				//console.log(res);
				clearVals(name, email, topic, message);
				response.html('<strong>Message received, thanks for reaching out!</strong>');
			}, function(err) {
				//console.log(err);
				response.html('<strong>Something went wrong. I\'ll look into it. \n' + err.message + '</strong>');
			});
		}

		return {
			listen: sendMail
		};
	}());

	HipWeb.init = function(){
		console.log('initialize!');
		HipWeb.ScrollMod.listen();

		HipWeb.MenuMod.listen();
		//HipWeb.MenuMod.resizer();

		HipWeb.SwitchMod.switcher();

		HipWeb.TextFitMod.sizer();

		HipWeb.ArchiveShowMod.listen();

		HipWeb.EmailMod.listen();

	};

	HipWeb.init();
});