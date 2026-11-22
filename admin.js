(() => {
  const rep = (h, n) => h.repeat(n);
  const T = {
    home: `<main class="home-page">
      <section class="home-hero"><div class="home-hero-image"></div></section>
      <section class="home-bio"><h2>ABOUT</h2><div class="home-bio-layout"><div class="home-bio-image"></div>
        <div class="home-bio-text"><h3></h3>${rep('<p></p>', 5)}<a href="about.html" class="home-button">MORE ABOUT</a></div></div></section>
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
  T.about = "<main class=\"about-page\">\n  <h1>ABOUT</h1>\n  <section class=\"about-bio\" aria-labelledby=\"about-bio-title\">\n    <div class=\"bio-photo-placeholder\" role=\"img\" aria-label=\"Tee Moon portrait\"></div>\n    <div class=\"about-bio-main\">\n      <h2 id=\"about-bio-title\">BIOGRAPHY</h2>\n      <div class=\"bio-copy-placeholder\"></div>\n    </div>\n  </section>\n  <section class=\"about-statement\" aria-labelledby=\"about-statement-title\">\n    <h2 id=\"about-statement-title\">ARTIST STATEMENT</h2>\n    <div class=\"about-statement-layout\">\n      <div class=\"stmt-copy\"></div>\n      <div class=\"stmt-photo\" role=\"img\" aria-label=\"Artist statement image\"></div>\n    </div>\n  </section>\n  <section class=\"about-exhibitions\" id=\"exhibitions\" aria-labelledby=\"about-exhibitions-title\">\n    <h2 id=\"about-exhibitions-title\">EXHIBITIONS</h2>\n    <div class=\"about-exhibitions-text\" aria-label=\"Selected exhibitions\"></div>\n  </section>\n  <section class=\"about-publications\" id=\"publications\" aria-labelledby=\"about-publications-title\">\n    <h2 id=\"about-publications-title\">PUBLICATIONS</h2>\n    <div class=\"about-publications-text\"></div>\n  </section>\n  <section class=\"about-cv\" aria-labelledby=\"about-cv-title\">\n    <h2 id=\"about-cv-title\">ARTIST CV</h2>\n    <a class=\"about-cv-download\" href=\"tee-moon-cv-en.pdf\" download=\"tee-moon-cv-en.pdf\">DOWNLOAD CV (PDF) <span aria-hidden=\"true\">↓</span></a>\n  </section>\n</main>";
  const NAMES = { home: 'HOME', about: 'ABOUT', bio: 'BIO', cv: 'CV', prints: 'PRINTS', art: 'ART + FASHION', contact: 'CONTACT' };

  Object.assign(T, {"artist": "<main class=\"stmt-page\">\n  <h1>ARTIST STATEMENT</h1>\n  <section class=\"stmt-layout\">\n    <div class=\"stmt-photo\" aria-label=\"Photo placeholder\"></div>\n    <div class=\"stmt-copy\"></div>\n  </section>\n</main>", "portfolio": "<main class=\"pf-page\">\n  <h1>PORTFOLIO</h1>\n  <div class=\"pf-grid\">\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-1.html\" class=\"pf-more\" data-n=\"1\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-2.html\" class=\"pf-more\" data-n=\"2\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-3.html\" class=\"pf-more\" data-n=\"3\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-4.html\" class=\"pf-more\" data-n=\"4\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-5.html\" class=\"pf-more\" data-n=\"5\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-6.html\" class=\"pf-more\" data-n=\"6\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-7.html\" class=\"pf-more\" data-n=\"7\">READ MORE »</a></div>\n    <div class=\"pf-item\"><div class=\"pf-img\"></div><h3 class=\"pf-title\"></h3><a href=\"series-8.html\" class=\"pf-more\" data-n=\"8\">READ MORE »</a></div>\n  </div>\n</main>", "pub": "<main class=\"list-page pub-page\">\n  <h1>PUBLICATIONS</h1>\n  <div class=\"list-rows\">\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n  </div>\n</main>", "exh": "<main class=\"list-page exh-page\">\n  <h1>EXHIBITIONS</h1>\n  <div class=\"list-rows\">\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n    <div class=\"list-item\"><div class=\"list-img\"></div><div class=\"list-text\"></div></div>\n  </div>\n</main>", "s1": "<main class=\"series-page\" data-series=\"1\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s2": "<main class=\"series-page\" data-series=\"2\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s3": "<main class=\"series-page\" data-series=\"3\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s4": "<main class=\"series-page\" data-series=\"4\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s5": "<main class=\"series-page\" data-series=\"5\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s6": "<main class=\"series-page\" data-series=\"6\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s7": "<main class=\"series-page\" data-series=\"7\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>", "s8": "<main class=\"series-page\" data-series=\"8\">\n  <h1></h1>\n  <div class=\"series-intro\"></div>\n  <div class=\"series-gallery\">\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n    <div class=\"series-img\"></div>\n  </div>\n</main>"});
  Object.assign(NAMES, {"artist": "ARTIST STATEMENT", "portfolio": "PORTFOLIO", "pub": "PUBLICATIONS", "exh": "EXHIBITIONS", "s1": "PORTFOLIO · SERIES 1", "s2": "PORTFOLIO · SERIES 2", "s3": "PORTFOLIO · SERIES 3", "s4": "PORTFOLIO · SERIES 4", "s5": "PORTFOLIO · SERIES 5", "s6": "PORTFOLIO · SERIES 6", "s7": "PORTFOLIO · SERIES 7", "s8": "PORTFOLIO · SERIES 8"});

  // Published data is loaded from content.json. Draft is separate and private to this browser.
  const GITHUB_OWNER = 'TetianaSulima', GITHUB_REPO = 'tee-moon-site', GITHUB_BRANCH = 'main';
  const GH_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;
  let page = 'home', lang = 'en', D = {}, PUBLISHED = {}, baselineSha = '', timer, publishing = false;
  const $ = s => document.querySelector(s);
  const status = $('#status'), imgInput = $('#imgInput');
  const publishBtn = $('#publishBtn'), dialog = $('#publishDialog'), progress = $('#publishProgress');
  const clone = value => JSON.parse(JSON.stringify(value));
  function setStatus(message, error = false) {
    status.textContent = message; status.classList.toggle('err', error);
  }
  function save() {
    try {
      localStorage.setItem(TM_KEY, JSON.stringify(D));
      setStatus('Черновик сохранён в браузере ✓ · НЕ опубликован');
    } catch (e) {
      setStatus('Мало места в браузере. Экспортируйте JSON и уменьшите фото.', true);
    }
  }
  // Exact Git blob checksum of public content.json; prevents overwriting someone else's commit.
  async function blobSHA(utf8Bytes) {
    const header = new TextEncoder().encode(`blob ${utf8Bytes.byteLength}\0`);
    const bytes = new Uint8Array(header.byteLength + utf8Bytes.byteLength);
    bytes.set(header); bytes.set(utf8Bytes, header.byteLength);
    const sum = await crypto.subtle.digest('SHA-1', bytes);
    return [...new Uint8Array(sum)].map(n => n.toString(16).padStart(2, '0')).join('');
  }
  async function loadPublished() {
    const r = await fetch('./content.json', { cache: 'no-store' });
    if (!r.ok) throw new Error('content.json: HTTP ' + r.status);
    const raw = await r.arrayBuffer();
    const obj = JSON.parse(new TextDecoder().decode(raw));
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) throw new Error('invalid content.json');
    baselineSha = await blobSHA(new Uint8Array(raw));
    PUBLISHED = obj;
  }
  async function boot() {
    try {
      await loadPublished();
      const draft = TM_load();
      // Old local edits may contain images not published yet; always offer to keep them.
      if (Object.keys(draft).length && JSON.stringify(draft) !== JSON.stringify(PUBLISHED)) {
        const useDraft = confirm('В этом браузере найден черновик.\n\nОК = продолжить черновик (не потерять изменения).\nОтмена = открыть опубликованную версию сайта.\n\nПеред отказом от черновика рекомендуем сделать Экспорт.');
        D = useDraft ? draft : clone(PUBLISHED);
        if (!useDraft) save();
      } else D = clone(PUBLISHED);
      setStatus('Загружено · изменения станут видны после публикации');
    } catch (e) {
      console.error(e);
      D = TM_load();
      baselineSha = '';
      setStatus('Не удалось загрузить опубликованную версию. Черновик доступен, публикация отключена.', true);
    }
    render();
  }
  // Strict GitHub API target and short-lived token, never stored in localStorage or source code.
  async function gh(path, token, init = {}) {
    const response = await fetch(GH_BASE + path, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init.headers || {})
      }
    });
    let data;
    try { data = await response.json(); } catch (_) { data = {}; }
    if (!response.ok) {
      const message = data.message || `HTTP ${response.status}`;
      throw new Error(`GitHub ${response.status}: ${message}`);
    }
    return data;
  }
  const bytesToHex = arr => Array.from(arr, b => b.toString(16).padStart(2,'0')).join('');
  async function sha256(binary) {
    return bytesToHex(new Uint8Array(await crypto.subtle.digest('SHA-256', binary)));
  }
  function allImageValues(data) {
    const v = [];
    const walk = x => { if (typeof x === 'string') v.push(x); else if (Array.isArray(x)) x.forEach(walk); };
    Object.values(data).forEach(walk);
    return v;
  }
  async function prepareContent() {
    const replacements = new Map();
    const uploads = new Map();
    const existingPaths = new Set(allImageValues(PUBLISHED).filter(x => /^images\/content\/[a-f0-9]{24}\.(jpg|png|webp)$/.test(x)));
    const unique = [...new Set(allImageValues(D).filter(v => v.startsWith('data:image/')))];
    for (const value of unique) {
      const m = value.match(/^data:image\/(jpeg|jpg|png|webp);base64,([a-zA-Z0-9+/=]+)$/);
      if (!m) throw new Error('Неподдерживаемый формат фотографии. Используйте JPEG, PNG или WEBP.');
      const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
      const decoded = atob(m[2]);
      const bytes = Uint8Array.from(decoded, c => c.charCodeAt(0));
      const name = (await sha256(bytes)).slice(0,24) + '.' + ext;
      const path = 'images/content/' + name;
      replacements.set(value, path);
      if (!existingPaths.has(path) && !uploads.has(path)) uploads.set(path, m[2]);
    }
    const convert = v => Array.isArray(v) ? v.map(convert) : (typeof v === 'string' ? replacements.get(v) || v : v);
    return { content: Object.fromEntries(Object.entries(D).map(([k,v]) => [k, convert(v)])), uploads };
  }
  async function publish(token) {
    if (!baselineSha) throw new Error('Не загружен актуальный content.json. Откройте админку через HTTPS.');
    if (!navigator.onLine) throw new Error('Нет соединения с интернетом.');
    progress.classList.remove('err');
    progress.textContent = 'Проверка актуальной версии…';
    const r = await gh(`/contents/content.json?ref=${GITHUB_BRANCH}`, token);
    if (r.sha !== baselineSha) throw new Error('Файл content.json изменился в GitHub после открытия админки. Черновик сохранён. Сделайте Экспорт, обновите страницу и перенесите свои изменения.');
    const branch = await gh(`/git/ref/heads/${GITHUB_BRANCH}`, token);
    const headSha = branch.object.sha;
    const head = await gh(`/git/commits/${headSha}`, token);
    const { content, uploads } = await prepareContent();
    const tree = [];
    let n = 0;
    for (const [path, bytes] of uploads) {
      progress.textContent = `Отправка новых фотографий: ${++n} из ${uploads.size}…`;
      const blob = await gh('/git/blobs', token, { method:'POST', body:JSON.stringify({content:bytes,encoding:'base64'}) });
      tree.push({path,mode:'100644',type:'blob',sha:blob.sha});
    }
    progress.textContent = 'Сохранение текстов и ссылок на фотографии…';
    const contentString = JSON.stringify(content, null, 2) + '\n';
    const contentBlob = await gh('/git/blobs', token, { method:'POST', body:JSON.stringify({content:contentString,encoding:'utf-8'}) });
    tree.push({path:'content.json',mode:'100644',type:'blob',sha:contentBlob.sha});
    const newTree = await gh('/git/trees', token, { method:'POST', body:JSON.stringify({base_tree:head.tree.sha,tree}) });
    const commit = await gh('/git/commits', token, { method:'POST', body:JSON.stringify({message:'Publish Tee Moon portfolio content',tree:newTree.sha,parents:[headSha]}) });
    progress.textContent = 'Активация новой версии GitHub Pages…';
    await gh(`/git/refs/heads/${GITHUB_BRANCH}`, token, {method:'PATCH',body:JSON.stringify({sha:commit.sha,force:false})});
    PUBLISHED = clone(content);
    D = clone(content);
    baselineSha = contentBlob.sha;
    try { localStorage.setItem(TM_KEY, JSON.stringify(D)); } catch (_) {}
    setStatus('Отправлено в GitHub ✓ · публикация Pages может занять несколько минут');
    return { images:uploads.size, commit:commit.sha };
  }
  function showPublishError(error) {
    progress.classList.add('err');
    progress.textContent = error.message || String(error);
    setStatus('Публикация не удалась · черновик сохранён', true);
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
    TM_SLOTS.filter(s => s.k.startsWith(page + '.') || s.k.startsWith('global.') || s.pg === page || (page === 'about' && (/^(bio|artist)\./.test(s.k) || s.k === 'exh.text.1'))).forEach(bind);
    fillNav();
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
  $('#resetBtn').onclick = () => { if (confirm('Заменить текущий черновик опубликованной версией? Несохранённые на сайте изменения исчезнут из браузера. Рекомендуем сначала сделать Экспорт.')) { D = clone(PUBLISHED); save(); render(); } };

  publishBtn.onclick = () => {
    if (publishing) return;
    progress.textContent = '';
    progress.classList.remove('err');
    $('#publishToken').value = '';
    dialog.showModal();
  };
  $('#publishCancel').onclick = () => { if (!publishing) dialog.close(); };
  $('#publishForm').onsubmit = async e => {
    e.preventDefault();
    if (publishing) return;
    // Only this JS call stack holds the token; never persist it.
    const token = $('#publishToken').value.trim();
    $('#publishToken').value = '';
    if (!token) return showPublishError(new Error('Введите GitHub token.'));
    clearTimeout(timer); // flush local changes before sending
    save();
    publishing = true;
    $('#publishConfirm').disabled = true;
    $('#publishCancel').disabled = true;
    publishBtn.disabled = true;
    try {
      const result = await publish(token);
      progress.textContent = 'Успешно отправлено в GitHub. Новая версия появится после сборки GitHub Pages.';
      render();
    } catch (err) {
      console.error('GitHub publication:', err.message);
      showPublishError(err);
    } finally {
      publishing = false;
      $('#publishConfirm').disabled = false;
      $('#publishCancel').disabled = false;
      publishBtn.disabled = false;
    }
  };
  boot();
})();
