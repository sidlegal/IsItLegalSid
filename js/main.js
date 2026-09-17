// Shared site behaviour: active nav link, mobile menu toggle,
// footer year. Included on every page.
(function () {
  function setActiveNavLink() {
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
  }

  function initMobileMenu() {
    var mobileNav = document.querySelector(".mobile-nav");
    var toggle = document.querySelector(".mobile-nav-toggle");
    if (!mobileNav || !toggle) return;

    function closeMenu() {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      var isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    }

    toggle.addEventListener("click", toggleMenu);

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!mobileNav.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  function setFooterYear() {
    var yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  setActiveNavLink();
  initMobileMenu();
  setFooterYear();
})();
