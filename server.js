/* Сервер сайта + приём заявок. Запуск:  node server.js   (нужен Node.js 16+)
   Пароль админки: переменная ADMIN_PASSWORD или значение ниже. Заявки лежат в data/messages.json */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = +process.env.PORT || 3000;
const PASS = process.env.ADMIN_PASSWORD || 'admin123';   // ← СМЕНИТЕ (и в admin.js тоже)
const ROOT = __dirname, DATA = path.join(ROOT, 'data'), DB = path.join(DATA, 'messages.json');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2' };
fs.mkdirSync(DATA, { recursive: true });

const load = () => { try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch (e) { return []; } };
const save = l => { const t = DB + '.tmp'; fs.writeFileSync(t, JSON.stringify(l, null, 2)); fs.renameSync(t, DB); };
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };
const clip = (v, n) => String(v || '').trim().slice(0, n);
const buckets = {};
const limited = (name, ip, max) => {
  const now = Date.now(), m = buckets[name] || (buckets[name] = new Map());
  const arr = (m.get(ip) || []).filter(t => now - t < 60000); arr.push(now); m.set(ip, arr);
  return arr.length > max;
};
const authed = (req, ip) => {
  if (limited('auth', ip, 20)) return false;
  const a = Buffer.from(String(req.headers['x-admin-password'] || '')), b = Buffer.from(PASS);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};
const readBody = req => new Promise((ok, no) => {
  let s = '';
  req.on('data', c => { s += c; if (s.length > 20000) { no(new Error('big')); req.destroy(); } });
  req.on('end', () => { try { ok(JSON.parse(s || '{}')); } catch (e) { no(e); } });
  req.on('error', no);
});

async function api(req, res, url, ip) {
  if (req.method === 'POST' && url.pathname === '/api/submit') {
    if (limited('submit', ip, 8)) return send(res, 429, { ok: false, error: 'too many requests' });
    let b; try { b = await readBody(req); } catch (e) { return send(res, 400, { ok: false }); }
    const m = { type: b.type === 'subscribe' ? 'subscribe' : 'contact', name: clip(b.name, 100), email: clip(b.email, 200),
      phone: clip(b.phone, 50), message: clip(b.message, 5000) };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email)) return send(res, 400, { ok: false, error: 'email' });
    if (m.type === 'contact' && !m.message) return send(res, 400, { ok: false, error: 'message' });
    const list = load();
    list.unshift({ id: crypto.randomBytes(8).toString('hex'), ...m, date: new Date().toISOString(), read: false });
    save(list.slice(0, 5000));
    return send(res, 200, { ok: true });
  }
  if (!authed(req, ip)) return send(res, 401, { ok: false });
  if (req.method === 'GET' && url.pathname === '/api/messages') return send(res, 200, { ok: true, messages: load() });
  const m = url.pathname.match(/^\/api\/messages\/([a-f0-9]+)(\/read)?$/);
  if (m) {
    let list = load();
    if (req.method === 'DELETE' && !m[2]) { list = list.filter(x => x.id !== m[1]); save(list); return send(res, 200, { ok: true }); }
    if (req.method === 'POST' && m[2]) { list.forEach(x => { if (x.id === m[1]) x.read = true; }); save(list); return send(res, 200, { ok: true }); }
  }
  send(res, 404, { ok: false });
}

function serve(req, res, url) {
  let p; try { p = decodeURIComponent(url.pathname); } catch (e) { res.writeHead(400); return res.end(); }
  if (p === '/') p = '/home.html';
  const f = path.normalize(path.join(ROOT, p)), rel = path.relative(ROOT, f);
  if (rel.startsWith('..') || path.isAbsolute(rel) || rel.split(path.sep)[0] === 'data' || rel === 'server.js' || rel.startsWith('.')) { res.writeHead(404); return res.end('Not found'); }
  fs.stat(f, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(f).pipe(res);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost'), ip = req.socket.remoteAddress || '';
  if (url.pathname.startsWith('/api/')) return api(req, res, url, ip).catch(() => send(res, 500, { ok: false }));
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
  serve(req, res, url);
}).listen(PORT, () => console.log('Сайт: http://localhost:' + PORT + '   Админка: http://localhost:' + PORT + '/admin.html'));
