(function () {
  // This deploy (Global-JA-test) exists specifically to review the JA copy,
  // so default to it on load instead of the compiled bundle's EN default.
  // There's no prop/URL hook into the component's language state, so this
  // replays the same hover-then-click a person would do on the language
  // switcher, once, right after it mounts.
  function findButton(text) {
    return Array.from(document.querySelectorAll("button")).find(function (b) {
      return b.textContent.replace(/\s+/g, "") === text;
    });
  }

  function trySwitch() {
    var enBtn = findButton("EN");
    if (!enBtn) {
      setTimeout(trySwitch, 50);
      return;
    }
    var wrapper = enBtn.parentElement;
    ["pointerover", "mouseover", "mouseenter"].forEach(function (type) {
      wrapper.dispatchEvent(new MouseEvent(type, { bubbles: true }));
      enBtn.dispatchEvent(new MouseEvent(type, { bubbles: true }));
    });
    setTimeout(function () {
      var jaBtn = findButton("JA日本語");
      if (jaBtn) jaBtn.click();
    }, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trySwitch);
  } else {
    trySwitch();
  }
})();
