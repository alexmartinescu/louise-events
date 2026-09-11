document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('gallery-container');
  if (!container) return;

  // Base path is set inline on the page (root: "photos/", en/: "../photos/")
  var base = window.GALERIE_BASE || 'photos/';
  var listUrl = base + 'galerie-lista.txt';

  // All gallery photos use the same uniform shape, so the grid lines up evenly
  var ratios = ['ratio-square'];

  var LOCAL_VIDEO_EXT = /\.(mp4|webm|mov|ogg)$/i;

  // Turns a YouTube or Vimeo page URL into an embeddable player URL.
  function toEmbedUrl(url) {
    var yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    if (yt) return 'https://www.youtube.com/embed/' + yt[1];
    var vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return 'https://player.vimeo.com/video/' + vimeo[1];
    return url;
  }

  function buildEmbedVideo(url, ratioClass) {
    var wrap = document.createElement('div');
    wrap.className = 'video-embed ' + ratioClass;
    var iframe = document.createElement('iframe');
    iframe.src = toEmbedUrl(url);
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.loading = 'lazy';
    wrap.appendChild(iframe);
    return wrap;
  }

  function buildLocalVideo(filename, ratioClass) {
    var wrap = document.createElement('div');
    wrap.className = 'video-embed ' + ratioClass;
    var video = document.createElement('video');
    video.src = base + filename;
    video.controls = true;
    video.preload = 'metadata';
    video.playsInline = true;
    wrap.appendChild(video);
    return wrap;
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
        var lower = line.toLowerCase();
        var isVideo = false;
        var isVertical = false;
        var value = line;

        if (lower.indexOf('video-vertical:') === 0) {
          isVideo = true;
          isVertical = true;
          value = line.slice('video-vertical:'.length).trim();
        } else if (lower.indexOf('video:') === 0) {
          isVideo = true;
          value = line.slice('video:'.length).trim();
        }

        if (isVideo) {
          var ratioClass = isVertical ? 'ratio-vertical' : 'ratio-wide';
          var isLocalFile = /^https?:\/\//i.test(value) === false;
          var el = (isLocalFile && LOCAL_VIDEO_EXT.test(value))
            ? buildLocalVideo(value, ratioClass)
            : buildEmbedVideo(value, ratioClass);
          container.appendChild(el);
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
