/* Общая схема мест под фото и текст — используется и админкой, и сайтом */
window.TM_KEY = 'teeMoonContent';
window.TM_load = () => { try { return JSON.parse(localStorage.getItem(TM_KEY)) || {}; } catch (e) { return {}; } };
window.TM_SLOTS = (() => {
  const a = [];
  const add = (k, s, t, i = 0, pg) => a.push({ k, s, t, i, pg });
  const list = (k, s, t, n) => { for (let i = 0; i < n; i++) add(k + '.' + (i + 1), s, t, i); };
  // t: img = фото, txt = текст в самом элементе, box = текстовый блок внутри контейнера
  add('home.hero', '.home-hero-image', 'img');
  add('home.bio.img', '.home-bio-image', 'img');
  add('home.bio.title', '.home-bio-text h3', 'txt');
  list('home.bio.p', '.home-bio-text p', 'txt', 5);
  list('home.cv.p', '.home-cv-text p', 'txt', 7);
  add('home.cv.img', '.home-cv-image', 'img');
  list('home.portfolio', '.home-portfolio-item', 'img', 6);
  add('bio.photo', '.bio-photo-placeholder', 'img');
  add('bio.text', '.bio-copy-placeholder', 'box');
  add('cv.photo', '.cv-photo-placeholder', 'img');
  add('cv.text', '.cv-text-placeholder', 'box');
  list('prints.img', '.print-item', 'img', 3);
  list('prints.p', '.description p', 'txt', 5);
  add('art.intro.img', '.art-fashion-intro-image', 'img');
  add('art.intro.text', '.art-fashion-intro-copy', 'box');
  list('art.g1', '.art-fashion-gallery:not(.art-fashion-gallery-secondary) .art-fashion-item', 'img', 6);
  list('art.g2', '.art-fashion-gallery-secondary .art-fashion-item', 'img', 6);
  add('art.details.text', '.art-fashion-details-copy', 'box');
  list('art.thumb', '.art-fashion-details-thumbnails div', 'img', 6);
  add('contact.photo', '.contact-page-photo-placeholder', 'img');
  add('artist.photo', '.stmt-photo', 'img');
  add('artist.text', '.stmt-copy', 'box');
  list('portfolio.img', '.pf-img', 'img', 8);
  list('portfolio.title', '.pf-title', 'txt', 8);
  for (let n = 1; n <= 8; n++) {
    const p = '.series-page[data-series="' + n + '"]';
    add('portfolio.title.' + n, p + ' h1', 'txt', 0, 's' + n);
    add('s' + n + '.intro', p + ' .series-intro', 'box');
    list('s' + n + '.img', p + ' .series-img', 'img', 12);
  }
  list('pub.img', '.pub-page .list-img', 'img', 6);
  list('pub.text', '.pub-page .list-text', 'txt', 6);
  list('exh.img', '.exh-page .list-img', 'img', 6);
  list('exh.text', '.exh-page .list-text', 'txt', 6);
  add('global.contactText', '.contact-form .contact-description', 'txt');
  return a;
})();
window.TM_el = (s, root = document, create = false) => {
  const el = root.querySelectorAll(s.s)[s.i];
  if (!el || s.t !== 'box') return el || null;
  let b = el.querySelector(':scope > .slot-text');
  if (!b && create) { b = document.createElement('div'); b.className = 'slot-text'; el.prepend(b); }
  return b;
};
