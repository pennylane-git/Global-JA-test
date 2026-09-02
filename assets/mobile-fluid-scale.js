(function () {
  // The compiled bundle's mobile component is a fixed 360px "device mockup"
  // canvas (halved from its original 2x 720px), unlike the real production
  // site (us.business.kakao.com), which is genuinely fluid via CSS media
  // queries. Rather than rewriting every absolutely-positioned pixel value
  // inside the canvas as a percentage, this scales the whole canvas as one
  // rigid unit — same technique as scaling a fixed-size device mockup up
  // or down — so it fills the real viewport width edge-to-edge between the
  // 360px floor and wherever the tablet/mobile breakpoint switch hands off
  // to the desktop component (900px).
  var NATIVE_WIDTH = 360;
  var canvas = null;
  var root = null;
  var nativeHeight = 0;

  function measureNativeHeight() {
    var prevTransform = canvas.style.transform;
    canvas.style.transform = "none";
    nativeHeight = canvas.offsetHeight;
    canvas.style.transform = prevTransform;
  }

  function apply() {
    if (!canvas) return;
    var scale = window.innerWidth / NATIVE_WIDTH;
    canvas.style.transformOrigin = "top left";
    canvas.style.transform = "scale(" + scale + ")";
    if (root) {
      root.style.width = window.innerWidth + "px";
      root.style.height = Math.round(nativeHeight * scale) + "px";
      root.style.overflow = "hidden";
    }
  }

  function start() {
    canvas = document.querySelector(".mobile-canvas");
    root = document.getElementById("root");
    if (!canvas || !root) {
      setTimeout(start, 50);
      return;
    }
    measureNativeHeight();
    apply();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        measureNativeHeight();
        apply();
      }, 100);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
