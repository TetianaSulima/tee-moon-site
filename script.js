const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
on("contactForm", "submit", e => e.preventDefault());
on("subscribeForm", "submit", e => e.preventDefault());
