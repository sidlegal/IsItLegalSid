// Shared site behaviour: active nav link, mobile menu close-on-navigate,
// footer year. Included on every page.
(function () {
  // Highlight the current page in the primary nav.
  var path = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll("[data-nav-link]").forEach(function (link) {
    var linkPath = link.getAttribute("href");
    if (!linkPath) return;
    var normalized = linkPath.replace(/index\.html$/, "");
    if (
      normalized === path ||
      (normalized !== "/" && path.indexOf(normalized) === 0)
    ) {
      link.setAttribute("aria-current", "page");
    }
  });

  // Close the mobile <details> menu after a link is tapped.
  var mobileNav = document.querySelector(".mobile-nav");
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.removeAttribute("open");
      });
    });
  }

  // Footer year.
  var yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
