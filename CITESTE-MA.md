# Luiza Mirabela — site web (RO implicit + EN)

## Structură
- `index.html`, `despre.html`, `ceremonii.html`, `pachete.html`, `galerie.html`, `contact.html` — cele 6 pagini în română, la rădăcină (varianta implicită a site-ului)
- `en/` — aceleași 6 pagini, în engleză (`en/index.html`, `en/about.html`, etc.)
- `css/style.css` — stilul comun (culori, fonturi, layout)
- `js/nav.js` — meniul mobil (hamburger)
- `photos/` — aici pui fotografiile reale

Butonul **RO / EN** e în colțul din dreapta sus al meniului, pe toate paginile — poziția standard pe majoritatea site-urilor.

## Cum adaugi fotografiile

### Galeria — acum e dinamică (oricâte poze vrei)
Pagina Galerie nu mai are casete fixe. În schimb, citește lista de poze
din fișierul `photos/galerie-lista.txt` — un nume de fișier pe linie.

Ca să adaugi o poză nouă:
1. Pune fotografia în `photos/` (ex: `nunta-ana-mihai.jpg`)
2. Deschide `photos/galerie-lista.txt` și adaugă o linie nouă cu numele ei
3. Salvează — gata, apare automat în galerie, atât pe pagina RO cât și EN

Ca să scoți o poză, șterge linia respectivă din listă (nu trebuie să
ștergi și fotografia din folder, dacă nu vrei).

**Notă tehnică:** lista se încarcă prin JavaScript (`fetch`), ceea ce
înseamnă că **nu funcționează dacă deschizi fișierul direct, prin
dublu-click** (browserul blochează citirea altor fișiere de pe disc
din motive de securitate). Funcționează perfect odată ce site-ul e
online (Netlify, GitHub Pages etc.), sau local dacă folosești
extensia **Live Server** din VS Code. Dacă deschizi pagina direct și
lista nu se încarcă, rămân vizibile cele 12 poze implicite din HTML,
ca variantă de rezervă.

### Restul paginilor (Acasă, Despre mine, Ceremonii, Pachete, Contact)
Fiecare casetă de imagine are deja un nume de fișier așteptat, vizibil
și ca etichetă mică peste imagine (ex: `hero-acasa.jpg`). Salvează
fotografia cu **exact acel nume** în folderul `photos/` — site-ul o va
afișa automat, fără nicio modificare de cod.

Exemple de nume așteptate: `hero-acasa.jpg`, `despre-portret.jpg`,
`ceremonie-simbolica.jpg`, `galerie-01.jpg` … `galerie-12.jpg`, etc.
Recomandat: fotografii de minim 1600px lățime, format `.jpg`.

Până pui pozele reale, fiecare casetă arată un gradient discret —
site-ul rămâne funcțional și frumos și fără ele.

## Ce mai trebuie completat
În `contact.html` (RO și `en/contact.html`): email, telefon și link
Instagram sunt momentan valori de test — înlocuiește-le cu cele reale
(caută `contact@luizamirabela.ro`, `+40 700 000 000`, `instagram.com`).

Formularul de contact folosește `mailto:` (deschide clientul de mail
al vizitatorului). Pentru trimitere directă, fără mailto, se poate
conecta gratuit un serviciu precum Formspree sau Web3Forms — e nevoie
doar de schimbat atributul `action` al formularului.

## Cum îl publici
Cel mai simplu: trage folderul întreg pe **app.netlify.com/drop**
(gratuit, fără cod) sau încarcă-l pe orice hosting obișnuit prin FTP.
Punctul de intrare este `index.html` la rădăcină — site-ul se deschide
direct în română, cu opțiunea de a comuta pe engleză din meniu.
