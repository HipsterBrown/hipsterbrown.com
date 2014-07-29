$(function() {
  'use strict';
  
  var HipWeb = HipWeb || {};

  // Scroll to hide nav function
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

  HipWeb.ScrollMod.listen();

  //mobile navigation menu functionality
  HipWeb.MenuMod = (function(){
	var win = $(window),
		mq = window.matchMedia('(min-width: 710px)'),
		stache = $('a#break'),
		nav = $('div#navbar'),
		isSmall = false;

	function matchListener(check) {
		var check = check || !mq.matches;
		
		if ( check ) {
			removeListener();
			stacheClick();
		} else {
			HipWeb.ScrollMod.listen();
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

  HipWeb.MenuMod.listen();
  HipWeb.MenuMod.resizer();

  /***
    Switches header span on page load
  ***/

  HipWeb.SwitchMod = (function() {
	  var hipArray = ['ironic', 'authentic', 'vintage', 'classic', 'hip', 'confident'],
	  headSpan = $('span.hip-feel');
	  
	  function spanSwitch(el, arr) {
		  var span = el;
		  var newWord = arr[Math.floor(Math.random() * arr.length)];
		  span.text(newWord);
	  }

	  return {
		  switcher: spanSwitch(headSpan, hipArray)
	  };
  }());

  HipWeb.SwitchMod.switcher;

  // Text Fit functionality for article headings
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

  HipWeb.TextFitMod.sizer();

  // Archive Show List
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

  HipWeb.ArchiveShowMod.listen();

  /***
    Mandrill Email Contact Stuff
  ***/

  var mail = new mandrill.Mandrill('nhtBwMOLtPtaBV8fKHiuww'),
    submit = $('#submit');

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

  submit.on('click', function(e) {
    e.preventDefault();

    var name = $('#name'),
      email = $('#email'),
      topic = $('#topic'),
      message = $('#message'),
      me = 'headhipster@hipsterbrown.com';

    console.log(name.val(), email.val(), topic.val(), message.val(), me);

    var params = createParams(name.val(), email.val(), topic.val(), message.val(), me);

    mail.messages.send(params, function(res) {
      console.log(res);
      clearVals(name, email, topic, message);
      $('p.response').html('<strong>Message received, thanks for reaching out!</strong>');
    }, function(err) {
      console.log(err);
      $('p.response').html('<strong>Something went wrong. I\'ll look into it. \n' + err.message + '</strong>');
    });
  });



});
