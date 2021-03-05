/* globals document, window */

var HipWeb = HipWeb || {};

HipWeb.ScrollMod = (function () {
  var lastScroll = 0,
    navbar = document.getElementById("navbar");

  function scrollListener() {
    window.addEventListener("scroll", aniScroll);
  }

  function aniScroll() {
    var st = window.scrollY;

    if (st + lastScroll >= 100) {
      navbar.classList.add("scrolled");

      if (st < lastScroll) {
        navbar.classList.remove("scrolled");
      }
    } else if (st < lastScroll) {
      navbar.classList.remove("scrolled");
    }

    lastScroll = st;

    return lastScroll;
  }

  return {
    aniScroll: aniScroll,
    listen: scrollListener
  };
})();

HipWeb.MenuMod = (function () {
  var mq = window.matchMedia("screen and (min-width: 710px)"),
    stache = document.getElementById("break"),
    nav = document.getElementById("navbar");

  function matchListener(isMobile) {
    nav.classList.remove("open");

    if (isMobile) {
      window.removeEventListener("scroll", HipWeb.ScrollMod.aniScroll);
      stache.addEventListener("click", stacheClick);
    } else {
      HipWeb.ScrollMod.listen();
      stache.removeEventListener("click", stacheClick);
    }
  }

  mq.addListener(function (event) {
    matchListener(!event.target.matches);
  });

  function stacheClick(e) {
    e.preventDefault();
    nav.classList.toggle("open");
  }

  return {
    listen: matchListener,
    mq: mq
  };
})();

HipWeb.SwitchMod = (function () {
  var hipArray = [
      "ironic",
      "authentic",
      "vintage",
      "classic",
      "hip",
      "confident"
    ],
    headSpan = document.querySelector("span.hip-feel");

  function spanSwitch(el, arr) {
    var span = el;
    var newWord = arr[Math.floor(Math.random() * arr.length)];

    if (span) {
      span.textContent = newWord;
    }
  }

  function loader() {
    spanSwitch(headSpan, hipArray);
  }

  return {
    switcher: loader
  };
})();

HipWeb.TextFitMod = (function () {
  var heading = document.querySelectorAll(" article h1 ");

  function sizingLoop() {
    for (var i = 0; i < heading.length; i++) {
      var head = heading.item(i),
        headText = head.textContent;

      if (headText.length > 36) {
        head.style.fontSize = "2em";
      } else if (headText.length > 48) {
        head.style.fontSize = "1.8em";
      }
    }
  }

  return {
    sizer: sizingLoop
  };
})();

HipWeb.ArchiveShowMod = (function () {
  var arrow = document.querySelector("span.arrow");

  function listControl() {
    if (arrow) {
      arrow.addEventListener("click", reveil);
      arrow.addEventListener("keydown", reveil);
    }
  }

  function reveil(e) {
    if (e.key && !["Enter", " "].includes(e.key)) {
      return;
    }
    e.preventDefault();
    var that = e.target;

    that.classList.toggle("open");

    if (that.classList.contains("open")) {
      that.innerHTML = "&#8744;";
      that.setAttribute("aria-expanded", "true");
    } else {
      that.innerHTML = "&#8743;";
      that.setAttribute("aria-expanded", "false");
    }

    [].forEach.call(
      document.querySelectorAll("article.archive"),
      function (article) {
        article.classList.toggle("hide");
      }
    );
  }

  return {
    listen: listControl
  };
})();

HipWeb.init = function () {
  HipWeb.ScrollMod.listen();

  HipWeb.MenuMod.listen(!HipWeb.MenuMod.mq.matches);

  HipWeb.SwitchMod.switcher();

  HipWeb.TextFitMod.sizer();

  HipWeb.ArchiveShowMod.listen();
};

document.addEventListener("DOMContentLoaded", HipWeb.init);
