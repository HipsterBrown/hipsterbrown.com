/* globals document, window */
import "./random-word-element";
import "./fit-text-element";

interface Mods {
  ScrollMod: {
    aniScroll(): number;
    listen(): void;
  };
  MenuMod: {
    mq: MediaQueryList;
    listen(isMobile: boolean): void;
  };
  init(): void;
}

var HipWeb: Mods = {} as Mods;

HipWeb.ScrollMod = (function() {
  let lastScroll = 0;
  const navbar = document.getElementById("navbar");

  function scrollListener() {
    window.addEventListener("scroll", aniScroll);
  }

  function aniScroll() {
    const st = window.scrollY;

    if (st + lastScroll >= 100) {
      navbar?.classList.add("scrolled");

      if (st < lastScroll) {
        navbar?.classList.remove("scrolled");
      }
    } else if (st < lastScroll) {
      navbar?.classList.remove("scrolled");
    }

    lastScroll = st;

    return lastScroll;
  }

  return {
    aniScroll,
    listen: scrollListener
  };
})();

HipWeb.MenuMod = (function() {
  const mq = window.matchMedia("screen and (min-width: 710px)");
  const stache = document.getElementById("break");
  const nav = document.getElementById("navbar");

  function matchListener(isMobile: boolean) {
    nav?.classList.remove("open");

    if (isMobile) {
      window.removeEventListener("scroll", HipWeb.ScrollMod.aniScroll);
      stache?.addEventListener("click", stacheClick);
    } else {
      HipWeb.ScrollMod.listen();
      stache?.removeEventListener("click", stacheClick);
    }
  }

  mq.addListener(function(event: MediaQueryListEvent) {
    matchListener(!event.matches);
  });

  function stacheClick(e: MouseEvent) {
    e.preventDefault();
    nav?.classList.toggle("open");
  }

  return {
    listen: matchListener,
    mq
  };
})();

HipWeb.init = function() {
  HipWeb.ScrollMod.listen();

  HipWeb.MenuMod.listen(!HipWeb.MenuMod.mq.matches);
};

document.addEventListener("DOMContentLoaded", HipWeb.init);
