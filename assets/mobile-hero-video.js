(function () {
  // The mobile ("te") component has no <video> at all — Ch/Ad/Tool and the
  // channel-card mockup are static PNGs. This inserts the object-motion
  // background video as a new first child of .mobile-hero (so later
  // siblings — the headline/description and the bridge graphic — paint
  // over it in normal DOM order, same as the desktop hero-video/hero-copy
  // relationship), without touching the compiled bundle.
  //
  // Source file is 720x350 (2x, per the redline convention this whole
  // mobile canvas uses) -> displayed at 360x175. .mobile-hero already
  // starts below the gnb, so within it the video sits at Y:0 (flush with
  // the section's own top), not offset further down.
  var SRC = "assets/home_visual_mo.mp4";

  function insert() {
    var hero = document.querySelector(".mobile-hero");
    if (!hero) {
      setTimeout(insert, 50);
      return;
    }
    if (hero.querySelector("video.mobile-hero__video")) return;

    var video = document.createElement("video");
    video.className = "mobile-hero__video";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.style.cssText =
      "position:absolute;top:0;left:50%;transform:translateX(-50%);" +
      "width:360px;height:175px;object-fit:contain;pointer-events:none;";

    var source = document.createElement("source");
    source.src = SRC;
    source.type = "video/mp4";
    video.appendChild(source);

    hero.insertBefore(video, hero.firstChild);
    video.play().catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", insert);
  } else {
    insert();
  }
})();
