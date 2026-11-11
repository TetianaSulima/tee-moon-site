/* Подключается на страницах сайта: подставляет фото и текст из админки */
(() => {
  const D = TM_load();
  const st = document.createElement('style');
  st.textContent = '.slot-text{width:100%;white-space:pre-line;font-size:16px;line-height:1.6}' +
    '.tm-slider{position:relative}.tm-wrap{position:absolute;inset:0;overflow:hidden}' +
    '.tm-slide{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transition:opacity .8s}.tm-slide.on{opacity:1}' +
    '.tm-nav{position:absolute;top:50%;transform:translateY(-50%);width:36px;height:52px;border:0;background:rgba(0,0,0,.35);color:#fff;font-size:26px;cursor:pointer;opacity:0;transition:opacity .3s}' +
    '.tm-slider:hover .tm-nav{opacity:1}.tm-prev{left:0}.tm-next{right:0}' +
    '.tm-dots{position:absolute;left:0;right:0;bottom:-22px;display:flex;justify-content:center;gap:8px}' +
    '.tm-dots span{width:7px;height:7px;border-radius:50%;background:#ccc;cursor:pointer}.tm-dots span.on{background:#000}';
  document.head.appendChild(st);
  const curLang = () => { try { return localStorage.getItem('teeMoonLanguage') || 'en'; } catch (e) { return 'en'; } };

  function hero() {
    const a = D['home.banners'] || (D['home.hero'] ? [D['home.hero']] : []);
    const el = document.querySelector('.home-hero-image');
    if (!el || !a.length) return;
    if (a.length === 1) { el.style.background = `url(${a[0]}) center/cover no-repeat`; return; }
    el.classList.add('tm-slider');
    el.innerHTML = '<div class="tm-wrap">' + a.map((u, n) => `<div class="tm-slide${n ? '' : ' on'}" style="background-image:url(${u})"></div>`).join('') + '</div>' +
      '<button type="button" class="tm-nav tm-prev" aria-label="Previous">‹</button><button type="button" class="tm-nav tm-next" aria-label="Next">›</button>' +
      '<div class="tm-dots">' + a.map((_, n) => `<span data-n="${n}"${n ? '' : ' class="on"'}></span>`).join('') + '</div>';
    const S = el.querySelectorAll('.tm-slide'), P = el.querySelectorAll('.tm-dots span');
    let i = 0, t;
    const go = n => { i = (n + a.length) % a.length; S.forEach((s, k) => s.classList.toggle('on', k === i)); P.forEach((d, k) => d.classList.toggle('on', k === i)); };
    const auto = () => { clearInterval(t); t = setInterval(() => go(i + 1), 5000); };
    el.querySelector('.tm-prev').onclick = () => { go(i - 1); auto(); };
    el.querySelector('.tm-next').onclick = () => { go(i + 1); auto(); };
    el.querySelector('.tm-dots').onclick = e => { if (e.target.dataset.n) { go(+e.target.dataset.n); auto(); } };
    let x0 = null;
    el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) { go(i + (d < 0 ? 1 : -1)); auto(); } x0 = null; });
    auto();
  }

  function apply(l) {
    const other = l === 'en' ? 'uk' : 'en';
    TM_SLOTS.forEach(s => {
      if (s.t === 'img') {
        if (s.k === 'home.hero') return;
        const v = D[s.k]; if (!v) return;
        const el = TM_el(s); if (el) el.style.background = `url(${v}) center/cover no-repeat`;
      } else {
        const v = D[s.k + '|' + l] || D[s.k + '|' + other]; if (!v) return;
        const el = TM_el(s, document, true); if (el) { el.textContent = v; el.style.whiteSpace = 'pre-line'; }
      }
    });
    const sub = l === 'uk' ? 'СЕРІЯ ' : 'SERIES ';
    document.querySelectorAll('.dd-menu a[data-n]').forEach(a => {
      const k = 'portfolio.title.' + a.dataset.n + '|';
      a.textContent = (D[k + l] || D[k + other] || sub + a.dataset.n).toUpperCase();
    });
    document.querySelectorAll('.pf-more').forEach(a => { a.textContent = l === 'uk' ? 'ДІЗНАТИСЬ БІЛЬШЕ »' : 'READ MORE »'; });
  }
  function lightbox() {
    const main = document.querySelector('.series-page[data-series]');
    if (!main) return;
    const n = main.dataset.series, items = [];
    let cur = 0, box;
    const show = i => {
      cur = (i + items.length) % items.length;
      box.querySelector('img').src = items[cur];
      box.querySelector('.lb-count').textContent = (cur + 1) + ' / ' + items.length;
    };
    const close = () => { box.classList.remove('on'); document.body.style.overflow = ''; };
    const build = () => {
      const s = document.createElement('style');
      s.textContent = '.tm-lb{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center}' +
        '.tm-lb.on{display:flex;animation:tmFade .3s ease}.tm-lb.on img{animation:tmZoom .35s ease}.tm-lb img{max-width:90vw;max-height:88vh;object-fit:contain;display:block}' +
        '.tm-lb button{position:absolute;border:0;background:transparent;color:#fff;cursor:pointer;opacity:.8}.tm-lb button:hover{opacity:1}' +
        '.lb-x{top:14px;right:20px;font-size:30px}.lb-nav{top:50%;transform:translateY(-50%);font-size:54px;padding:10px 18px}' +
        '.lb-prev{left:6px}.lb-next{right:6px}.lb-count{position:absolute;bottom:14px;left:0;right:0;text-align:center;color:#fff;font-size:13px}';
      document.head.appendChild(s);
      box = document.createElement('div');
      box.className = 'tm-lb';
      box.innerHTML = '<button type="button" class="lb-x" aria-label="Close">✕</button><button type="button" class="lb-nav lb-prev" aria-label="Previous">‹</button><img alt=""><button type="button" class="lb-nav lb-next" aria-label="Next">›</button><div class="lb-count"></div>';
      document.body.appendChild(box);
      if (items.length < 2) box.querySelectorAll('.lb-nav,.lb-count').forEach(x => x.style.display = 'none');
      box.addEventListener('click', e => { if (e.target === box) close(); });
      box.querySelector('.lb-x').onclick = close;
      box.querySelector('.lb-prev').onclick = () => show(cur - 1);
      box.querySelector('.lb-next').onclick = () => show(cur + 1);
      document.addEventListener('keydown', e => {
        if (!box.classList.contains('on')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(cur - 1);
        if (e.key === 'ArrowRight') show(cur + 1);
      });
      let x0 = null;
      box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
      box.addEventListener('touchend', e => {
        if (x0 === null) return;
        const d = e.changedTouches[0].clientX - x0;
        if (Math.abs(d) > 40) show(cur + (d < 0 ? 1 : -1));
        x0 = null;
      });
    };
    main.querySelectorAll('.series-img').forEach((el, i) => {
      const u = D['s' + n + '.img.' + (i + 1)];
      if (!u) return;
      items.push(u);
      const idx = items.length - 1;
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => {
        if (!box) build();
        box.classList.add('on');
        document.body.style.overflow = 'hidden';
        show(idx);
      });
    });
  }
  function animate() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const sel = 'main h1, main h2, .home-hero, .home-bio-image, .home-bio-text, .home-cv-text, .home-cv-image, .home-portfolio-item, .portfolio-button, ' +
      '.print-item, .description, .contact-button, .bio-photo-placeholder, .bio-copy-placeholder, .cv-photo-placeholder, .cv-text-placeholder, ' +
      '.stmt-photo, .stmt-copy, .pf-item, .series-intro, .series-img, .list-item, .art-fashion-intro, .art-fashion-item, .art-fashion-details, ' +
      '.contact-page-panel, .footer .follow, .footer .footer-content';
    const count = new Map();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add('tm-in');
        setTimeout(() => { el.classList.remove('tm-reveal', 'tm-in'); el.style.transitionDelay = ''; }, 1500);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll(sel).forEach(el => {
      const n = count.get(el.parentNode) || 0;
      count.set(el.parentNode, n + 1);
      el.style.transitionDelay = Math.min(n, 6) * 70 + 'ms';
      el.classList.add('tm-reveal');
      io.observe(el);
    });
  }
  function forms() {
    const map = { subscribeForm: 'subscribe', contactForm: 'contact', contactPageForm: 'contact' };
    Object.keys(map).forEach(id => {
      const f = document.getElementById(id);
      if (!f) return;
      f.addEventListener('submit', () => {
        const btn = f.querySelector('button[type=submit]'), orig = btn.textContent, uk = curLang() === 'uk';
        const get = s => { const e = f.querySelector(s); return e ? e.value.trim() : ''; };
        const body = { type: map[id], name: get('input[type=text]'), email: get('input[type=email]'), phone: get('input[type=tel]'), message: get('textarea') };
        btn.disabled = true;
        const SB = window.TM_SB || {};
        (SB.url && !/YOUR/.test(SB.url)
          ? fetch(SB.url + '/rest/v1/messages', { method: 'POST', headers: { apikey: SB.key, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(body) })
          : Promise.reject(new Error('no config')))
          .then(r => { if (!r.ok) throw new Error('fail'); f.reset(); btn.textContent = uk ? 'НАДІСЛАНО ✓' : 'SENT ✓'; })
          .catch(() => { btn.textContent = uk ? 'ПОМИЛКА' : 'ERROR'; })
          .finally(() => setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2500));
      });
    });
  }
  hero();
  apply(curLang());
  forms();
  lightbox();
  animate();
  document.querySelectorAll('.language-switch button').forEach(b =>
    b.addEventListener('click', () => apply(b.dataset.language)));
})();
