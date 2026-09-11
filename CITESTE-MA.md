# Louise Events — site web (RO implicit + EN)

## Structură
- `index.html`, `despre.html`, `ceremonii.html`, `galerie.html`, `contact.html`, `multumesc.html` — cele 5 pagini + pagina de mulțumire, în română, la rădăcină (varianta implicită a site-ului)
- `en/` — aceleași pagini, în engleză (`en/index.html`, `en/about.html`, `en/ceremonies.html`, `en/gallery.html`, `en/contact.html`, `en/thank-you.html`)
- `css/style.css` — stilul comun (culori, fonturi, layout)
- `js/` — meniul mobil, galeria dinamică, formularul de contact, efectul de mărire poze
- `photos/` — aici pui fotografiile reale

Butonul **RO / EN** e în colțul din dreapta sus al meniului, pe toate paginile.

## Ce nume să pui fiecărei poze

De când am scos eticheta care apărea peste poze, referința e lista de
mai jos. Salvezi fotografia cu **exact numele din tabel**, în folderul
`photos/`, și apare automat pe site — fără nicio modificare de cod.

### Acasă (`index.html`)
| Unde apare | Nume fișier |
|---|---|
| Poza mare de sus (hero) | `hero-acasa.jpg` |
| Cele 3 poze mici, sub hero | `acasa-teaser-01.jpg`, `acasa-teaser-02.jpg`, `acasa-teaser-03.jpg` |
| Poza verticală, lângă „Despre mine" | `acasa-portret.jpg` |

### Despre mine (`despre.html`)
| Unde apare | Nume fișier |
|---|---|
| Portret mare, sus | `despre-portret.jpg` |
| 3 poze mici, sub biografie | `despre-detaliu-01.jpg`, `despre-detaliu-02.jpg`, `despre-detaliu-03.jpg` |

### Ceremonii (`ceremonii.html`)
| Unde apare | Nume fișier |
|---|---|
| Poza lată, lângă „Nu știți ce vi se potrivește?" | `pachet-detaliu.jpg` |
| Mașină disponibilă — Alfa Romeo | `masina-alfa-romeo-spider-1980.jpg` |
| Mașină disponibilă — Jeep | `masina-jeep-cj7-1986.jpg` |
| (poți adăuga alte mașini la fel — spune-mi și le pun eu) | — |

### Contact (`contact.html`)
| Unde apare | Nume fișier |
|---|---|
| Poza verticală, lângă formular | `contact-poza.jpg` |

### Sigla (peste tot, în meniu și subsol)
| Unde apare | Nume fișier |
|---|---|
| Logo Louise Events | `louise-events-logo.jpg` |

**Notă:** toate numele de mai sus sunt identice pe versiunea engleză
(`en/`) — aceleași fotografii apar automat și acolo, nu trebuie puse
de două ori.

Recomandat: fotografii de minim 1600px lățime, format `.jpg`. Până
pui poza reală, caseta arată un gradient discret — site-ul rămâne
funcțional și frumos și fără ea.

## Galeria — dinamică, oricâte poze/videouri vrei

Pagina Galerie nu are casete fixe. Citește lista din
`photos/galerie-lista.txt` — un nume de fișier (sau un video) pe linie.

**Poză nouă:**
1. Pune fotografia în `photos/` (orice nume, ex: `nunta-ana-mihai.jpg`)
2. Adaugă o linie nouă cu numele ei în `photos/galerie-lista.txt`
3. Salvează — apare automat, pe RO și EN deopotrivă

**Video nou:** adaugă o linie care începe cu `video:`, urmată de link
YouTube sau Vimeo:
```
video:https://www.youtube.com/watch?v=xxxxxxxxxxx
video:https://vimeo.com/123456789
```

Ca să scoți ceva din galerie, ștergi linia respectivă din listă.

**Notă tehnică:** lista se încarcă prin JavaScript, deci **nu
funcționează dacă deschizi fișierul direct, prin dublu-click**
(browserul blochează asta din motive de securitate). Funcționează
perfect odată ce site-ul e online, sau local cu extensia **Live
Server** din VS Code. Dacă deschizi direct și lista nu se încarcă,
rămân vizibile cele 12 poze implicite din HTML, ca variantă de rezervă.

**Bonus:** orice poză din Galerie sau de pe pagina Ceremonii (mașinile)
se mărește la click, pe tot ecranul — apeși oriunde în afara ei, sau
Esc, ca s-o închizi.

## Video pe Acasă / Despre mine / alte pagini fixe

Acolo pozele sunt fixe, nu dintr-o listă, deci înlocuirea cu un video
se face manual, o dată, în VS Code. Găsești caseta pe care vrei s-o
schimbi (arată cam așa, cu numele din tabelul de mai sus):
```html
<div class="photo ratio-hero" data-slot="hero-acasa.jpg" style="background-image:url('photos/hero-acasa.jpg'), var(--fallback-grad)"></div>
```
Și o înlocuiești cu (păstrezi clasa `ratio-...` originală — aici era
`ratio-hero` — ca dimensiunea să rămână la fel):
```html
<div class="video-embed ratio-hero">
  <iframe src="https://www.youtube.com/embed/xxxxxxxxxxx" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>
</div>
```
Ai nevoie de link-ul de tip **embed**: pe YouTube, apeși Share →
Embed, și de acolo iei codul din adresă (partea de după `/embed/`).

## Contact — Web3Forms, WhatsApp, Facebook

Formularul de contact trimite mesajele prin **Web3Forms** (cheia de
acces e deja pusă și funcțională). La succes, vizitatorul e dus
automat pe pagina de mulțumire (`multumesc.html` / `en/thank-you.html`).

Buton **WhatsApp** plutitor, jos-dreapta, pe toate paginile — deschide
direct o conversație cu numărul tău, cu un mesaj pre-completat.

Link de **Facebook** (@louiseevents) în subsol și pe pagina Contact.

Datele de contact curente pe site: `luizamartinescu@gmail.com`,
`0724 396 225`. Dacă se schimbă vreodată, caută-le în fișiere (Ctrl+Shift+F
în VS Code) și le înlocuiești peste tot dintr-o dată.

## Cum îl publici

Site-ul e pe GitHub, conectat la Netlify — orice modificare pe care o
încarci prin **GitHub Desktop** (Commit → Push) se publică automat pe
`louiseevents.ro` în câteva secunde, fără alt pas.
