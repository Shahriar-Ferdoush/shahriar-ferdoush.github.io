// ===================================================================
// Theme toggle - the only JavaScript on this page.
// The stored preference is applied by an inline script in <head> so the
// page never paints the wrong theme first.
// ===================================================================

(function () {
  "use strict";

  var root = document.documentElement;
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemDark.matches ? "dark" : "light");
  }

  // The label names the theme the click will switch to.
  function syncLabel() {
    var next = currentTheme() === "dark" ? "Light" : "Dark";
    button.textContent = next;
    button.setAttribute("aria-label", "Switch to " + next.toLowerCase() + " theme");
  }

  button.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncLabel();
  });

  // Follow the system while the visitor has not made an explicit choice.
  systemDark.addEventListener("change", function () {
    if (!localStorage.getItem("theme")) syncLabel();
  });

  syncLabel();
})();
