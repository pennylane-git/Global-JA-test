(function () {
  // The compiled bundle only picks the mobile component (`te`) via a
  // one-time check of ?view=mobile / a specific hostname; it never reacts
  // to viewport width. This makes it actually responsive: tablet-and-below
  // gets the mobile layout automatically, matching the production site's
  // real breakpoint (max-width:900px / min-width:901px, confirmed against
  // the live us.business.kakao.com CSS).
  var BREAKPOINT = 900;
  var MOBILE_HOSTNAMES = ["global-business-page-m.devel.kakao.com"];

  function isMobileParam(params) {
    return params.get("view") === "mobile" || MOBILE_HOSTNAMES.indexOf(location.hostname) !== -1;
  }
  function wantsMobile() {
    return window.innerWidth <= BREAKPOINT;
  }

  // Rewrites the URL (no navigation) so the bundle's own
  // `new URLSearchParams(location.search)` check picks the right branch.
  function syncUrlOnly() {
    var params = new URLSearchParams(location.search);
    var want = wantsMobile();
    if (isMobileParam(params) === want) return false;
    if (want) params.set("view", "mobile");
    else params.delete("view");
    var qs = params.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
    return true;
  }

  // Runs synchronously, before the deferred module bundle evaluates
  // location.search, so the very first render already picks the right branch.
  syncUrlOnly();

  // React already rendered one tree by mount time, so crossing the
  // breakpoint later needs a fresh load to switch components.
  var loaded = false;
  window.addEventListener("load", function () {
    loaded = true;
  });
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (loaded && syncUrlOnly()) location.reload();
    }, 200);
  });
})();
