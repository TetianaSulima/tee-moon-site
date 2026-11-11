(() => {
  const SB = window.TM_SB || {};
  const sess = () => { try { return JSON.parse(localStorage.getItem('tmSb')); } catch (e) { return null; } };
  async function sbAuth(grant, body) {
    const r = await fetch(SB.url + '/auth/v1/token?grant_type=' + grant, { method: 'POST', headers: { apikey: SB.key, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error_description || d.msg || 'auth');
    localStorage.setItem('tmSb', JSON.stringify({ access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Math.floor(Date.now() / 1000) + d.expires_in }));
    return d;
  }
  if (!sess()) {
    const ok = SB.url && !/YOUR/.test(SB.url);
    const inp = 'padding:12px;border:1px solid #000;font-size:15px';
    document.body.innerHTML = '<form id="lg" style="max-width:320px;margin:120px auto;font-family:Arial;display:flex;flex-direction:column;gap:10px"><h2 style="font-weight:400;text-align:center">ADMIN</h2>' +
      (ok ? '<input id="lgE" type="email" placeholder="Email" required style="' + inp + '"><input id="lgP" type="password" placeholder="Пароль" required style="' + inp + '"><button style="padding:12px;background:#000;color:#fff;border:0;cursor:pointer">ВОЙТИ</button>'
          : '<p style="color:#c00">Заполните supabase-config.js (Project URL и ключ).</p>') + '<div id="lgM" style="color:#c00;font-size:13px"></div></form>';
    const f = document.getElementById('lg');
    if (ok) f.onsubmit = e => {
      e.preventDefault();
      sbAuth('password', { email: document.getElementById('lgE').value.trim(), password: document.getElementById('lgP').value })
        .then(() => location.reload()).catch(() => { document.getElementById('lgM').textContent = 'Неверный email или пароль'; });
    };
    return;
  }

  const rep = (h, n) => h.repeat(n);
  const T = {
    home: `<main class="home-page">
      <section class="home-hero"><div class="home-hero-image"></div></section>
      <section class="home-bio"><h2>BIO</h2><div class="home-bio-layout"><div class="home-bio-image"></div>
        <div class="home-bio-text"><h3></h3>${rep('<p></p>', 5)}<a href="#" class="home-button">CONTACT</a></div></div></section>
      <section class="home-cv"><h2>CV</h2><div class="home-cv-layout">
        <div class="home-cv-text">${rep('<p></p>', 7)}<a href="#" class="home-button">CV</a></div><div class="home-cv-image"></div></div></section>
      <section class="home-portfolio"><h2>PORTFOLIO</h2><div class="home-portfolio-grid">${rep('<div class="home-portfolio-item"></div>', 6)}</div>
        <a href="#" class="home-button portfolio-button">VIEW ALL</a></section></main>`,
    bio: `<main class="bio-page"><h1>BIO</h1><section class="bio-layout"><div class="bio-photo-placeholder"></div>
      <div class="bio-copy-placeholder"><a href="#" class="home-button">CONTACT ME</a></div></section></main>`,
    cv: `<main class="cv-page"><h1>CV</h1><section class="cv-layout"><div class="cv-photo-placeholder"></div><div class="cv-text-placeholder"></div></section></main>`,
    prints: `<main class="prints"><h1>PRINTS</h1><div class="prints-gallery">${rep('<div class="print-item"></div>', 3)}</div>
      <div class="description">${rep('<p></p>', 5)}</div><a href="#" class="contact-button">CONTACT ME</a></main>`,
    art: `<main class="art-fashion-page"><section class="art-fashion-intro"><div class="art-fashion-intro-image"></div><div class="art-fashion-intro-copy"></div></section>
      <section class="art-fashion-gallery">${rep('<div class="art-fashion-item"></div>', 6)}</section>
      <section class="art-fashion-gallery art-fashion-gallery-secondary">${rep('<div class="art-fashion-item"></div>', 6)}</section>
      <section class="art-fashion-details"><div class="art-fashion-details-copy"></div><div class="art-fashion-details-thumbnails">${rep('<div></div>', 6)}</div></section></main>`,
    contact: `<main class="contact-page"><h1>CONTACT</h1><section class="contact-page-panel"><div class="contact-page-photo-placeholder"></div>
      <div class="contact-page-form-area"><form class="contact-page-form"><input type="text" placeholder="Name"><input type="email" placeholder="Email">
      <input type="tel" placeholder="Phone number"><textarea placeholder="Message"></textarea><button type="submit">SEND</button></form></div></section></main>`
  };
  const NAMES = { home: 'HOME', bio: 'BIO', cv: 'CV', prints: 'PRINTS', art: 'ART + FASHION', contact: 'CONTACT' };

  Object.assign(T, {"artist": "<main class=\"stmt-page\">\n  <h1>ARTIST STATEMENT</h1>\n  <section class=\"stmt-layout\">\n    <div class=\"stmt-photo\" aria-label=\"Photo placeholder\"></div>\n    <div class=\"stmt-copy\"></div>\n  </section>\n</main>", "portfolio": "<main class=\"pf-page\">\n  <h1>PORTFOLIO</h1>\n  <div class=\"pf-grid\">\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-1.html\" class=\"pf-more\" data-n=\"1\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-2.html\" class=\"pf-more\" data-n=\"2\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-3.html\" class=\"pf-more\" data-n=\"3\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-4.html\" class=\"pf-more\" data-n=\"4\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-5.html\" class=\"pf-more\" data-n=\"5\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-6.html\" class=\"pf-more\" data-n=\"6\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-7.html\" class=\"pf-more\" data-n=\"7\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-8.html\" class=\"pf-more\" data-n=\"8\">READ MORE »</a></div>\n  </div>\n</main>", "pub": "<main class=\"list-page pub-page\">\n  <h1>PUBLICATIONS</h1>\n  <div class=\"list-rows\">\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n  </div>\n</main>", "exh": "<main class=\"list-page exh-page\">\n  <h1>EXHIBITIONS</h1>\n  <div class=\"list-rows\">\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n  </div>\n</main>", "s1": "<main class=\"series-page\" data-series=\"1\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s2": "<main class=\"series-page\" data-series=\"2\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s3": "<main class=\"series-page\" data-series=\"3\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s4": "<main class=\"series-page\" data-series=\"4\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s5": "<main class=\"series-page\" data-series=\"5\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s6": "<main class=\"series-page\" data-series=\"6\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s7": "<main class=\"series-page\" data-series=\"7\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s8": "<main class=\"series-page\" data-series=\"8\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>"});
  T.inbox = '<main class="inbox-page"><h1>ЗАЯВКИ</h1><div id="inboxList"></div></main>';
  NAMES.inbox = 'ЗАЯВКИ';
  Object.assign(NAMES, {"artist": "ARTIST STATEMENT", "portfolio": "PORTFOLIO", "pub": "PUBLICATIONS", "exh": "EXHIBITIONS", "s1": "PORTFOLIO · SERIES 1", "s2": "PORTFOLIO · SERIES 2", "s3": "PORTFOLIO · SERIES 3", "s4": "PORTFOLIO · SERIES 4", "s5": "PORTFOLIO · SERIES 5", "s6": "PORTFOLIO · SERIES 6", "s7": "PORTFOLIO · SERIES 7", "s8": "PORTFOLIO · SERIES 8"});

  let page = 'home', lang = 'en', D = TM_load(), timer;
  const $ = s => document.querySelector(s);
  const status = $('#status'), imgInput = $('#imgInput');

  function save() {
    try { localStorage.setItem(TM_KEY, JSON.stringify(D)); status.textContent = 'Сохранено ✓'; status.classList.remove('err'); }
    catch (e) { status.textContent = 'Нет места в памяти браузера — уменьшите число/размер фото'; status.classList.add('err'); }
  }

  // ===== ЗАЯВКИ =====
  const logout = () => { localStorage.removeItem('tmSb'); location.reload(); };
  async function api(path, opt = {}) {
    let s = sess();
    if (!s) { logout(); throw new Error('auth'); }
    if (s.expires_at - 60 < Date.now() / 1000) {
      try { s = await sbAuth('refresh_token', { refresh_token: s.refresh_token }); } catch (e) { logout(); throw e; }
    }
    const r = await fetch(SB.url + '/rest/v1' + path, Object.assign({}, opt, { headers: Object.assign({ apikey: SB.key, Authorization: 'Bearer ' + s.access_token, 'Content-Type': 'application/json' }, opt.headers || {}) }));
    if (r.status === 401) { logout(); throw new Error('auth'); }
    if (!r.ok) throw new Error(r.status);
    return r.status === 204 ? null : r.json();
  }
  const LIST = '/messages?select=*&order=created_at.desc&limit=1000';
  const badge = list => { const n = list.filter(x => !x.read).length; $('#inboxCount').textContent = n ? n : ''; };
  const refreshBadge = () => api(LIST).then(badge).catch(() => {});
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
  function csv(list) {
    const q = v => { v = String(v == null ? '' : v); if (/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
    const rows = [['Дата', 'Тип', 'Имя', 'Email', 'Телефон', 'Сообщение']].concat(list.map(x =>
      [new Date(x.created_at).toLocaleString('ru-RU'), x.type === 'subscribe' ? 'Подписка' : 'Сообщение', x.name, x.email, x.phone, x.message]));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'tee-moon-zayavki.csv'; a.click();
  }
  async function loadInbox() {
    const box = $('#inboxList');
    if (!box) return;
    let list;
    try { list = await api(LIST); }
    catch (e) { box.textContent = 'Не удалось загрузить заявки. Проверьте supabase-config.js и что supabase.sql выполнен.'; return; }
    badge(list);
    box.textContent = '';
    const tools = el('div', 'inb-tools');
    tools.appendChild(el('span', '', 'Всего: ' + list.length + ' · новых: ' + list.filter(x => !x.read).length));
    const b = el('button', '', 'Скачать CSV'); b.type = 'button'; b.onclick = () => csv(list); tools.appendChild(b);
    box.appendChild(tools);
    if (!list.length) box.appendChild(el('p', 'inb-empty', 'Заявок пока нет.'));
    list.forEach(x => {
      const it = el('div', 'inb-item' + (x.read ? '' : ' unread'));
      const head = el('div', 'inb-head');
      head.appendChild(el('span', 'inb-tag', x.type === 'subscribe' ? 'ПОДПИСКА' : 'СООБЩЕНИЕ'));
      head.appendChild(el('span', '', new Date(x.created_at).toLocaleString('ru-RU')));
      it.appendChild(head);
      if (x.name) it.appendChild(el('div', '', 'Имя: ' + x.name));
      const mail = el('div', '', 'Email: '); const ma = el('a', '', x.email); ma.href = 'mailto:' + x.email; mail.appendChild(ma); it.appendChild(mail);
      if (x.phone) it.appendChild(el('div', '', 'Телефон: ' + x.phone));
      if (x.message) it.appendChild(el('div', 'inb-msg', x.message));
      const act = el('div', 'inb-actions');
      if (!x.read) { const r = el('button', '', 'Прочитано'); r.type = 'button'; r.onclick = () => api('/messages?id=eq.' + x.id, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ read: true }) }).then(loadInbox); act.appendChild(r); }
      const d = el('button', '', 'Удалить'); d.type = 'button';
      d.onclick = () => { if (confirm('Удалить эту заявку?')) api('/messages?id=eq.' + x.id, { method: 'DELETE', headers: { Prefer: 'return=minimal' } }).then(loadInbox); };
      act.appendChild(d); it.appendChild(act); box.appendChild(it);
    });
  }

  function fillNav() {
    document.querySelectorAll('.dd-menu a[data-n]').forEach(x => {
      const k = 'portfolio.title.' + x.dataset.n + '|';
      x.textContent = (D[k + lang] || D[k + (lang === 'en' ? 'uk' : 'en')] || 'SERIES ' + x.dataset.n).toUpperCase();
    });
  }
  function queue() {
    fillNav(); status.textContent = 'Сохранение…'; clearTimeout(timer); timer = setTimeout(save, 400); }

  function readImg(file, cb, max = 900) {
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, max / Math.max(im.width, im.height));
        const c = document.createElement('canvas');
        c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        cb(c.toDataURL('image/jpeg', 0.72));
      };
      im.src = r.result;
    };
    r.readAsDataURL(file);
  }
  function setImg(el, k) {
    const v = D[k];
    el.style.backgroundImage = v ? `url(${v})` : '';
    el.classList.toggle('has', !!v);
  }


  const banners = () => D['home.banners'] || (D['home.hero'] ? [D['home.hero']] : []);
  function bindBanner(el) {
    let i = 0;
    el.classList.add('slot-img', 'banner');
    el.innerHTML = '<button type="button" class="bn bn-prev">‹</button><button type="button" class="bn bn-next">›</button>' +
      '<div class="bn-dots"></div><div class="bn-tools"><button type="button" class="bn bn-add">+ ДОБАВИТЬ БАННЕР</button>' +
      '<button type="button" class="bn bn-del">✕ УДАЛИТЬ ЭТОТ</button></div>';
    const q = s => el.querySelector(s), dots = q('.bn-dots');
    const set = arr => { D['home.banners'] = arr; delete D['home.hero']; queue(); draw(); };
    function draw() {
      const a = banners();
      if (i >= a.length) i = Math.max(0, a.length - 1);
      el.style.backgroundImage = a.length ? `url(${a[i]})` : '';
      el.classList.toggle('has', a.length > 0);
      dots.innerHTML = a.map((_, n) => `<span class="${n === i ? 'on' : ''}" data-n="${n}"></span>`).join('');
      q('.bn-prev').style.display = q('.bn-next').style.display = a.length > 1 ? '' : 'none';
      q('.bn-del').style.display = a.length ? '' : 'none';
    }
    function add() {
      imgInput.multiple = true;
      imgInput.onchange = async () => {
        const files = [...imgInput.files]; imgInput.value = ''; imgInput.multiple = false;
        const arr = banners().slice();
        for (const f of files) await new Promise(r => readImg(f, u => { arr.push(u); r(); }, 1600));
        if (files.length) { i = arr.length - 1; set(arr); }
      };
      imgInput.click();
    }
    q('.bn-add').onclick = e => { e.stopPropagation(); add(); };
    q('.bn-del').onclick = e => { e.stopPropagation(); const a = banners().slice(); a.splice(i, 1); set(a); };
    q('.bn-prev').onclick = e => { e.stopPropagation(); const n = banners().length; i = (i - 1 + n) % n; draw(); };
    q('.bn-next').onclick = e => { e.stopPropagation(); const n = banners().length; i = (i + 1) % n; draw(); };
    dots.onclick = e => { if (e.target.dataset.n) { i = +e.target.dataset.n; draw(); } };
    el.onclick = e => { if (e.target === el && !banners().length) add(); };
    draw();
  }

  function bind(s) {
    const el = TM_el(s, document, true);
    if (!el) return;
    if (s.k === 'home.hero') { bindBanner(el); return; }
    if (s.t === 'img') {
      el.classList.add('slot-img');
      el.querySelectorAll('.slot-clear').forEach(x => x.remove());
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'slot-clear'; b.textContent = '✕'; b.title = 'Удалить фото';
      b.onclick = e => { e.stopPropagation(); delete D[s.k]; setImg(el, s.k); queue(); };
      el.appendChild(b);
      el.onclick = () => {
        imgInput.multiple = false;
        imgInput.onchange = () => {
          const f = imgInput.files[0]; imgInput.value = '';
          if (f) readImg(f, u => { D[s.k] = u; setImg(el, s.k); queue(); }, /^s\d\./.test(s.k) ? 1400 : 900);
        };
        imgInput.click();
      };
      setImg(el, s.k);
    } else {
      const key = s.k + '|' + lang;
      el.contentEditable = 'true';
      el.classList.add('slot-edit');
      el.textContent = D[key] || '';
      el.oninput = () => { const v = el.innerText.replace(/\n$/, ''); if (v.trim()) D[key] = v; else delete D[key]; queue(); };
      el.onpaste = e => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); };
    }
  }

  function render() {
    document.querySelector('main').outerHTML = T[page];
    $('#pageName').textContent = NAMES[page] + ' · язык текста: ' + lang.toUpperCase();
    document.querySelectorAll('.navigation a[data-page]').forEach(a => a.classList.toggle('active', a.dataset.page === page || (/^s\d$/.test(page) && a.dataset.page === 'portfolio')));
    document.querySelectorAll('.language-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.language === lang)));
    TM_SLOTS.filter(s => s.k.startsWith(page + '.') || s.k.startsWith('global.') || s.pg === page).forEach(bind);
    fillNav();
    if (page === 'inbox') loadInbox();
    scrollTo(0, 0);
  }

  document.querySelectorAll('.navigation a[data-page]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); page = a.dataset.page; render(); }));
  document.querySelectorAll('.language-switch button').forEach(b => b.addEventListener('click', () => { lang = b.dataset.language; render(); }));
  document.addEventListener('click', e => { const m = e.target.closest('.pf-more'); if (m) { e.preventDefault(); page = 's' + m.dataset.n; render(); return; } if (e.target.closest('a[href="#"], main a, footer a, .logo')) e.preventDefault(); });
  document.addEventListener('submit', e => e.preventDefault());

  $('#exportBtn').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(D)], { type: 'application/json' }));
    a.download = 'tee-moon-content.json'; a.click();
  };
  $('#importBtn').onclick = () => $('#importFile').click();
  $('#importFile').onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { try { D = JSON.parse(r.result); save(); render(); } catch (err) { alert('Неверный файл'); } };
    r.readAsText(f); e.target.value = '';
  };
  $('#resetBtn').onclick = () => { if (confirm('Удалить все фото и тексты?')) { D = {}; save(); render(); } };

  $('#logoutBtn').onclick = logout;
  $('#inboxBtn').onclick = () => { page = 'inbox'; render(); };
  refreshBadge(); setInterval(refreshBadge, 30000);
  render();
})();
