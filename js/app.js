var hipArray = ['ironic', 'authentic', 'vintage', 'classic', 'hip', 'confident'],
  headSpan = $('span.hip-feel');


$(function() {
  'use strict';

  // Scroll to hide nav function
  var lastScroll = 0;

  $(window).on('scroll.hip', function(e) {
    var navbar = $('div#navbar'),
      st = $(this).scrollTop();

    if (st + lastScroll >= 100 ) {
      navbar.addClass('scrolled');
      if ( st < lastScroll ) {
        navbar.removeClass('scrolled');
      }
    } else if ( st < lastScroll ) {
      navbar.removeClass('scrolled');
      console.log(st + ' ' + lastScroll);
    }

    lastScroll = st;

    return lastScroll;

  });

  //mobile navigation menu functionality
  var mq = window.matchMedia('(min-width: 710px)'),
    stache = $('a#break'),
    nav = $('div#navbar');

  if (mq.matches) {
    console.log("this is not the size you're looking for.");
  } else {
    console.log("this is a match!");
    $(window).off('scroll.hip');
    stache.on('click.hip', function(e) {
      e.preventDefault();
      nav.toggleClass('open');
    });
  }

  /***
    Switches header span on page load
  ***/

  function spanSwitch(el, arr) {
		var span = el;
		var newWord = arr[Math.floor(Math.random() * arr.length)];
		span.text(newWord);
	}

  spanSwitch(headSpan, hipArray);

  // Text Fit functionality for article headings

  var heading = $(' article h1 ');

  for ( var i = 0; i < heading.length; i++ ) {

    var head = heading[i],
      headText = head.textContent;

    if ( headText.length > 36 ) {
      head.style.fontSize = '2em';
    } else if ( headText.length > 48 ) {
      head.style.fontSize = '1.8em';
    }

  }

  // Archive Show List

  var arrow = $('span.arrow');

  arrow.on('click', function(e) {
    $(this).toggleClass('open');
    if ( this.classList.contains('open') ) {
      $(this).html('&#8744;');
    } else {
      $(this).html('&#8743;');
    }
    $('article.archive').toggleClass('hide');
  });


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
