document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  var img = document.createElement('img');
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function openLightbox(src) {
    img.src = src;
    overlay.classList.add('open');
  }
  function closeLightbox() {
    overlay.classList.remove('open');
    img.src = '';
  }

  overlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Event delegation on the whole page: this catches clicks on
  // [data-full] elements even if they're added to the page later
  // (e.g. the Galerie photos, which load dynamically via JavaScript
  // after this script has already run).
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-full]');
    if (el) openLightbox(el.getAttribute('data-full'));
  });
});
