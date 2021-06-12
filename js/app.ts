import "./random-word-element";
/* globals document, window */

interface Mods {
  ScrollMod: {
    aniScroll(): number;
    listen(): void;
  };
  MenuMod: {
    mq: MediaQueryList;
    listen(isMobile: boolean): void;
  };
  TextFitMod: {
    sizer(): void;
  };
  ArchiveShowMod: {
    listen(): void;
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

HipWeb.TextFitMod = (function() {
  const heading = document.querySelectorAll(
    "article h1"
  ) as NodeListOf<HTMLHeadingElement>;

  function sizingLoop() {
    heading.forEach(head => {
      const textLength = head.textContent?.length || 0;
      if (textLength > 36) {
        head.style.fontSize = "2em";
      } else if (textLength > 48) {
        head.style.fontSize = "1.8em";
      }
    });
  }

  return {
    sizer: sizingLoop
  };
})();

HipWeb.ArchiveShowMod = (function() {
  const arrow = document.querySelector("span.arrow") as HTMLSpanElement;

  function listControl() {
    if (arrow) {
      arrow.addEventListener("click", reveal);
      arrow.addEventListener("keydown", reveal);
    }
  }

  function reveal(e: MouseEvent | KeyboardEvent) {
    if ("key" in e && !["Enter", " "].includes(e.key)) {
      return;
    }
    e.preventDefault();
    const target = e.target as HTMLSpanElement;

    if (!target) return;

    target.classList.toggle("open");

    if (target.classList.contains("open")) {
      target.innerHTML = "&#8744;";
      target.setAttribute("aria-expanded", "true");
    } else {
      target.innerHTML = "&#8743;";
      target.setAttribute("aria-expanded", "false");
    }

    document.querySelectorAll("article.archive").forEach(article => {
      article.classList.toggle("hide");
    });
  }

  return {
    listen: listControl
  };
})();

HipWeb.init = function() {
  HipWeb.ScrollMod.listen();

  HipWeb.MenuMod.listen(!HipWeb.MenuMod.mq.matches);

  HipWeb.TextFitMod.sizer();

  HipWeb.ArchiveShowMod.listen();

};

document.addEventListener("DOMContentLoaded", HipWeb.init);
