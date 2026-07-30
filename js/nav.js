document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-toggle');
  var list = document.querySelector('nav ul');
  if (!btn || !list) return;
  btn.addEventListener('click', function () {
    list.classList.toggle('open');
    btn.setAttribute('aria-expanded', list.classList.contains('open'));
  });
});
