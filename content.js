/* Подключается на страницах сайта: подставляет фото и текст из админки */
(() => {
  let D = {};  // Публичные данные загружаются из content.json
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
  const MAILERLITE_HTML = "<div class=\"ml-form-embedContainer ml-subscribe-form ml-subscribe-form-48877838\" id=\"mlb2-48877838\">\n<div class=\"ml-form-align-center\">\n<div class=\"ml-form-embedWrapper embedForm\">\n<div class=\"ml-form-embedBody ml-form-embedBodyDefault row-form\">\n<div class=\"ml-form-embedContent\" style=\" \">\n\n<p>Get occasional updates on new work, exhibitions, and available prints.</p>\n</div>\n<form action=\"https://assets.mailerlite.com/jsonp/2815266/forms/204797424757114397/subscribe\" class=\"ml-block-form\" data-code=\"\" method=\"post\" target=\"_blank\">\n<div class=\"ml-form-formContent\">\n<div class=\"ml-form-fieldRow ml-last-item\">\n<div class=\"ml-field-group ml-field-email ml-validate-email ml-validate-required\">\n<!-- input -->\n<input aria-label=\"email\" aria-required=\"true\" autocomplete=\"email\" class=\"form-control\" data-inputmask=\"\" name=\"fields[email]\" placeholder=\"Email\" type=\"email\"/>\n<!-- /input -->\n<!-- textarea -->\n<!-- /textarea -->\n<!-- select -->\n<!-- /select -->\n<!-- checkboxes -->\n<!-- /checkboxes -->\n<!-- radio -->\n<!-- /radio -->\n<!-- countries -->\n<!-- /countries -->\n</div>\n</div>\n</div>\n<!-- Privacy policy -->\n<!-- /Privacy policy -->\n<div class=\"ml-form-recaptcha ml-validate-required\" style=\"float: left;\">\n\n\n<div class=\"g-recaptcha\" data-sitekey=\"6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD\"></div>\n</div>\n<input name=\"ml-submit\" type=\"hidden\" value=\"1\"/>\n<div class=\"ml-form-embedSubmit\">\n<button class=\"primary\" type=\"submit\">Subscribe</button>\n<button class=\"loading\" disabled=\"disabled\" style=\"display: none;\" type=\"button\">\n<div class=\"ml-form-embedSubmitLoad\"></div>\n<span class=\"sr-only\">Loading...</span>\n</button>\n</div>\n<input name=\"anticsrf\" type=\"hidden\" value=\"true\"/>\n</form>\n</div>\n<div class=\"ml-form-successBody row-success\" style=\"display: none\">\n<div class=\"ml-form-successContent\">\n<h4>Thank you!</h4>\n<p>Thank you for subscribing! Please check your inbox to confirm your subscription.</p>\n</div>\n</div>\n</div>\n</div>\n</div>";
  function setupNewsletter() {
    const old = document.getElementById('subscribeForm');
    if (!old) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = MAILERLITE_HTML;
    old.replaceWith(wrap.firstElementChild);
    window.ml_webform_success_48877838 = function () {
      const area = document.getElementById('mlb2-48877838');
      if (!area) return;
      const oldContent = area.querySelector('.row-form');
      const success = area.querySelector('.row-success');
      if (oldContent) oldContent.style.display = 'none';
      if (success) success.style.display = 'block';
    };
    ['https://www.google.com/recaptcha/api.js',
     'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519']
      .forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
  }

  function forms() {
    // Public Formspree form ID is safe to include in browser code.
    // Site's subscription list will be connected to MailerLite separately.
    const CONTACT_ENDPOINT = 'https://formspree.io/f/xrpqybyk';
    const language = () => curLang() === 'uk';
    const getValue = (form, selector) => form.querySelector(selector)?.value.trim() || '';
    const showStatus = (form, message, error = false) => {
      let status = form.querySelector('.tm-form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'tm-form-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.style.cssText = 'margin:8px 0;font-size:14px;line-height:1.4;text-align:center;';
        form.appendChild(status);
      }
      status.style.color = error ? '#c94040' : 'inherit';
      status.textContent = message;
    };
    ['contactForm', 'contactPageForm'].forEach(id => {
      const form = document.getElementById(id);
      if (!form) return;
      form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const button = form.querySelector('button[type="submit"]');
        if (!button || button.disabled) return;
        const previousText = button.textContent;
        const data = new FormData();
        data.set('name', getValue(form, 'input[type="text"]'));
        data.set('email', getValue(form, 'input[type="email"]'));
        data.set('phone', getValue(form, 'input[type="tel"]'));
        data.set('message', getValue(form, 'textarea'));
        data.set('subject', 'Tee Moon website contact');
        button.disabled = true;
        button.textContent = language() ? 'НАДСИЛАННЯ…' : 'SENDING…';
        showStatus(form, '');
        try {
          const response = await fetch(CONTACT_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('Formspree status ' + response.status);
          form.reset();
          showStatus(form, language() ? 'Повідомлення надіслано. Дякую!' : 'Message sent. Thank you!');
        } catch (error) {
          console.error('Contact form submission failed:', error);
          showStatus(form, language() ? 'Не вдалося надіслати. Спробуйте ще раз пізніше.' : 'Could not send. Please try again later.', true);
        } finally {
          button.disabled = false;
          button.textContent = previousText;
        }
      });
    });
    setupNewsletter();
  }
  async function start() {
    try {
      const response = await fetch('./content.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('content.json: HTTP ' + response.status);
      const data = await response.json();
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('Неверный формат content.json');
      }
      D = data;
    } catch (error) {
      console.error('Не удалось загрузить опубликованный content.json:', error);
      // Никогда не подставляем черновик браузера в публичный сайт.
      D = {};
    }
    hero();
    apply(curLang());
    forms();
    lightbox();
    animate();
    document.querySelectorAll('.language-switch button').forEach(b =>
      b.addEventListener('click', () => apply(b.dataset.language)));
  }
  start();
})();
