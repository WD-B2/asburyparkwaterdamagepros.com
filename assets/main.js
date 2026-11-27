(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("mob-close");
  function openMenu() {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    root.style.overflow = "hidden";
  }
  function closeMenu() {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    root.style.overflow = "";
  }
  if (toggle && drawer && overlay) {
    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) { closeMenu(); } else { openMenu(); }
    });
    overlay.addEventListener("click", closeMenu);
    if (closeBtn) { closeBtn.addEventListener("click", closeMenu); }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) { closeMenu(); }
    });
  }
  var drops = document.querySelectorAll(".has-drop");
  Array.prototype.forEach.call(drops, function (li) {
    var b = li.querySelector(".drop-btn");
    if (!b) { return; }
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = li.classList.contains("is-open");
      Array.prototype.forEach.call(drops, function (x) {
        x.classList.remove("is-open");
        var xb = x.querySelector(".drop-btn");
        if (xb) { xb.setAttribute("aria-expanded", "false"); }
      });
      if (!open) { li.classList.add("is-open"); b.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("click", function () {
    Array.prototype.forEach.call(drops, function (x) {
      x.classList.remove("is-open");
      var xb = x.querySelector(".drop-btn");
      if (xb) { xb.setAttribute("aria-expanded", "false"); }
    });
  });
  var fc = document.querySelector(".float-call");
  var stop = document.querySelector(".mapbox") || document.querySelector(".site-footer");
  if (fc && stop && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { fc.classList.add("is-hidden"); } else { fc.classList.remove("is-hidden"); }
      });
    }, { threshold: 0.05 }).observe(stop);
  }
})();
