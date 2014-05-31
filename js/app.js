var hipArray = ['ironic', 'authentic', 'vintage', 'classic', 'hip', 'confident'],
  headSpan = $('span.hip-feel');


$(function() {
  'use strict';

  // Scroll to hide nav function

  $(document).on('scroll', function(e) {
    console.log(e.target);
  });

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
