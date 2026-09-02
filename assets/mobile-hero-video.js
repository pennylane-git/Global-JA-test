(function () {
  // The mobile ("te") component has no <video> at all — Ch/Ad/Tool and the
  // channel-card mockup are static PNGs. This inserts a background video as
  // a new first child of .mobile-hero (so later siblings — the headline/
  // description and the bridge graphic — paint over it in normal DOM
  // order, same as the desktop hero-video/hero-copy relationship), and
  // swaps it per language the same way lang-video-switch.js does for the
  // desktop hero: watch the headline's "is-ja" class (which React does
  // toggle per language) and pick the matching source.
  //
  // EN source is 1440x700 (4x) -> displayed at 360x175.
  // JA source is 720x350 (2x) -> displayed at the same 360x175.
  // Both target the same box; only the export multiple differs.
  var EN_SRC = "assets/home_visual_us_mo.mp4";
  var JA_SRC = "assets/home_visual_ja_mo.mp4";

  var video = null;
  var source = null;
  var current = null;

  function apply(lang) {
    if (!video || lang === current) return;
    source.setAttribute("src", lang === "JA" ? JA_SRC : EN_SRC);
    video.load();
    video.play().catch(function () {});
    current = lang;
  }

  function detect() {
    var h1 = document.querySelector(".mobile-hero h1");
    if (!h1) return;
    apply(h1.classList.contains("is-ja") ? "JA" : "EN");
  }

  function insert() {
    var hero = document.querySelector(".mobile-hero");
    if (!hero) {
      setTimeout(insert, 50);
      return;
    }
    if (hero.querySelector("video.mobile-hero__video")) return;

    video = document.createElement("video");
    video.className = "mobile-hero__video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.cssText =
      "position:absolute;top:0;left:50%;transform:translateX(-50%);" +
      "width:360px;height:175px;object-fit:contain;pointer-events:none;";

    source = document.createElement("source");
    source.type = "video/mp4";
    video.appendChild(source);

    hero.insertBefore(video, hero.firstChild);

    new MutationObserver(detect).observe(document.querySelector(".mobile-hero h1") || hero, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });
    detect();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insert);
  } else {
    insert();
  }
})();
