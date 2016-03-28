/* globals document, window */

var HipWeb = HipWeb || {};

HipWeb.ScrollMod = (function(){
  var lastScroll = 0,
    navbar = document.getElementById('navbar');

  function scrollListener() {
    // $(window).on('scroll.hip', aniScroll);
    window.addEventListener('scroll', aniScroll);
  }

  function aniScroll() {
    var st = window.scrollY;

    if ( st + lastScroll >= 100 ) {
      navbar.classList.add('scrolled');

      if ( st < lastScroll ) {
        navbar.classList.remove('scrolled');
      }
    } else if ( st < lastScroll ) {
      navbar.classList.remove('scrolled');
    }

    lastScroll = st;

    return lastScroll;
  }

  return {
    listen: scrollListener
  };
}());

HipWeb.MenuMod = (function(){
  var mq = window.matchMedia('(min-width: 710px)'),
    stache = document.getElementById('break'),
    nav = document.getElementById('navbar'),
    isSmall = false;

  function matchListener(check) {
    var mobile  = check || !mq.matches;

    if ( mobile ) {
      removeListener();
      stacheClick();
    }
  }

  function resizeListener() {
    window.addEventListener('resize', function(e) {
      var sizeCheck = isSmall;

      if ( !mq.matches ) {
        isSmall = true;
      } else {
        isSmall = false;
      }

      if ( sizeCheck !== isSmall ) {
        matchListener(isSmall);
      }

      return isSmall;
    });
  }

  function removeListener() {
    window.removeEventListener('scroll', aniScroll);
  }

  function stacheClick() {
    stache.addEventListener('click', function(e) {
      e.preventDefault();
      nav.classList.toggle('open');
    });
  }

  return {
    listen: matchListener,
    resizer: resizeListener
  };
}());

HipWeb.SwitchMod = (function() {
  var hipArray = ['ironic', 'authentic', 'vintage', 'classic', 'hip', 'confident'],
    headSpan = document.querySelector('span.hip-feel');

  function spanSwitch(el, arr) {
    var span = el;
    var newWord = arr[Math.floor(Math.random() * arr.length)];
    span.textContent = newWord;
  }

  function loader() {
    spanSwitch(headSpan, hipArray);
  }

  return {
    switcher: loader
  };
}());

HipWeb.TextFitMod = (function() {
  var heading = document.querySelectorAll(' article h1 ');

  function sizingLoop() {
    for ( var i = 0; i < heading.length; i++ ) {
      var head = heading.item(i),
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
  var arrow = document.querySelector('span.arrow');

  function listControl() {
    if (arrow) {
      arrow.addEventListener('click', reveil);
    }
  }

  function reveil(e) {
    var that = e.target;

    that.classList.toggle('open');

    if ( that.classList.contains('open') ) {
      that.html('&#8744;');
    } else {
      that.html('&#8743;');
    }

    document.querySelector('article.archive').classList.toggle('hide');
  }

  return {
    listen: listControl
  };
}());

HipWeb.init = function(){
  HipWeb.ScrollMod.listen();

  HipWeb.MenuMod.listen();

  HipWeb.SwitchMod.switcher();

  HipWeb.TextFitMod.sizer();

  HipWeb.ArchiveShowMod.listen();
};

HipWeb.init();
