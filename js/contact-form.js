document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var result = document.getElementById('form-result');
  var submitBtn = form.querySelector('button[type="submit"]');
  var lang = document.documentElement.lang === 'en' ? 'en' : 'ro';

  var messages = {
    ro: {
      sending: 'Se trimite...',
      ok: 'Mulțumesc! Mesajul a fost trimis — vă răspund în cel mai scurt timp.',
      err: 'A apărut o eroare. Încercați din nou sau scrieți direct pe email.'
    },
    en: {
      sending: 'Sending...',
      ok: 'Thank you! Your message has been sent — I will get back to you shortly.',
      err: 'Something went wrong. Please try again or email me directly.'
    }
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    result.textContent = messages[lang].sending;
    result.setAttribute('data-state', 'sending');
    if (submitBtn) submitBtn.disabled = true;

    var formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          result.textContent = messages[lang].ok;
          result.setAttribute('data-state', 'ok');
          form.reset();
        } else {
          result.textContent = messages[lang].err;
          result.setAttribute('data-state', 'err');
        }
      })
      .catch(function () {
        result.textContent = messages[lang].err;
        result.setAttribute('data-state', 'err');
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
});
