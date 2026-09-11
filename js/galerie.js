document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('gallery-container');
  if (!container) return;

  // Base path is set inline on the page (root: "photos/", en/: "../photos/")
  var base = window.GALERIE_BASE || 'photos/';
  var listUrl = base + 'galerie-lista.txt';

  // Cycle of shapes for visual variety, same look as before
  var ratios = ['ratio-square', 'ratio-tall', 'ratio-square', 'ratio-wide'];

  // Turns a YouTube or Vimeo page URL into an embeddable player URL.
  // Falls back to the URL as-is if it's already an embed link.
  function toEmbedUrl(url) {
    var yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    if (yt) return 'https://www.youtube.com/embed/' + yt[1];
    var vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return 'https://player.vimeo.com/video/' + vimeo[1];
    return url;
  }

  fetch(listUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('lista nu a putut fi încărcată');
      return res.text();
    })
    .then(function (text) {
      var lines = text
        .split('\n')
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0 && line.indexOf('#') !== 0; });

      if (lines.length === 0) return;

      container.innerHTML = '';
      var ratioIndex = 0;

      lines.forEach(function (line) {
        if (line.toLowerCase().indexOf('video:') === 0) {
          var url = line.slice(6).trim();
          var wrap = document.createElement('div');
          wrap.className = 'video-embed ratio-wide';
          var iframe = document.createElement('iframe');
          iframe.src = toEmbedUrl(url);
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');
          iframe.loading = 'lazy';
          wrap.appendChild(iframe);
          container.appendChild(wrap);
        } else {
          var div = document.createElement('div');
          div.className = 'photo ' + ratios[ratioIndex % ratios.length];
          ratioIndex++;
          div.setAttribute('data-slot', line);
          div.setAttribute('data-full', base + line);
          div.style.backgroundImage = "url('" + base + line + "'), var(--fallback-grad)";
          container.appendChild(div);
        }
      });
    })
    .catch(function () {
      // If the list can't be loaded (e.g. opening the file directly instead
      // of through a local server), leave whatever is already in the HTML.
    });
});
