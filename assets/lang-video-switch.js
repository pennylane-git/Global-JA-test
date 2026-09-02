(function () {
  // The compiled bundle renders one <video> in .hero-video regardless of
  // language (d===EN/JA only swaps the text). This watches the headline's
  // "is-ja" class — which React does toggle per language — and swaps the
  // video source to match, without touching the compiled bundle itself.
  var EN = { src: "assets/home_visual_us_250319.mp4", poster: "assets/home_visual_us_250319.png" };
  var JA = { src: "assets/home_visual_ja_pc.mp4", poster: "assets/home_visual_us_250319.png" };

  var current = null;

  function apply(lang) {
    if (lang === current) return;
    var video = document.querySelector(".hero-video video");
    var source = video && video.querySelector("source");
    if (!video || !source) return;
    var target = lang === "JA" ? JA : EN;
    source.setAttribute("src", target.src);
    video.setAttribute("poster", target.poster);
    video.load();
    video.play().catch(function () {});
    current = lang;
  }

  function detect() {
    var h1 = document.querySelector(".hero-copy h1");
    if (!h1) return;
    apply(h1.classList.contains("is-ja") ? "JA" : "EN");
  }

  function start() {
    var h1 = document.querySelector(".hero-copy h1");
    if (!h1) {
      // requestAnimationFrame can stall in some automated/backgrounded
      // browser contexts — setTimeout is more reliable here.
      setTimeout(start, 50);
      return;
    }
    new MutationObserver(detect).observe(h1, { attributes: true, attributeFilter: ["class"] });
    detect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
