document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('gallery-container');
  if (!container) return;

  // Base path is set inline on the page (root: "photos/", en/: "../photos/")
  var base = window.GALERIE_BASE || 'photos/';
  var listUrl = base + 'galerie-lista.txt';

  // Cycle of shapes for visual variety, same look as before
  var ratios = ['ratio-square', 'ratio-tall', 'ratio-square', 'ratio-wide'];

  fetch(listUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('lista nu a putut fi încărcată');
      return res.text();
    })
    .then(function (text) {
      var files = text
        .split('\n')
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0 && line.indexOf('#') !== 0; });

      if (files.length === 0) return;

      container.innerHTML = '';
      files.forEach(function (filename, i) {
        var div = document.createElement('div');
        div.className = 'photo ' + ratios[i % ratios.length];
        div.setAttribute('data-slot', filename);
        div.style.backgroundImage = "url('" + base + filename + "'), var(--fallback-grad)";
        container.appendChild(div);
      });
    })
    .catch(function () {
      // If the list can't be loaded (e.g. opening the file directly instead
      // of through a local server), leave whatever is already in the HTML.
    });
});
