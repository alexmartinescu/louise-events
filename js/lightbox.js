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

  document.querySelectorAll('[data-full]').forEach(function (el) {
    el.addEventListener('click', function () {
      var src = el.getAttribute('data-full');
      if (src) openLightbox(src);
    });
  });
});
