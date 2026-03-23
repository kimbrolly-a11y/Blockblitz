const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DIR = __dirname;
const SCORES_FILE = path.join(DIR, 'scores.json');

// Get local IP
const nets = os.networkInterfaces();
let localIP = 'localhost';
Object.keys(nets).forEach(n => {
  nets[n].forEach(a => {
    if (a.family === 'IPv4' && !a.internal) localIP = a.address;
  });
});

/* ── scores.json helpers ── */
function readScores() {
  try { return JSON.parse(fs.readFileSync(SCORES_FILE, 'utf8')); }
  catch(e) { return []; }
}
function writeScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

/* ── CORS headers ── */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const server = http.createServer((req, res) => {

  /* Preflight */
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  /* GET /api/leaderboard — top 50, best score per player */
  if (req.method === 'GET' && req.url === '/api/leaderboard') {
    const scores = readScores();
    const best = {};
    scores.forEach(s => {
      if (!best[s.id] || s.score > best[s.id].score) best[s.id] = s;
    });
    const top = Object.values(best)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
    res.writeHead(200, { 'Content-Type': 'application/json', ...CORS });
    res.end(JSON.stringify(top));
    return;
  }

  /* POST /api/score — submit a score */
  if (req.method === 'POST' && req.url === '/api/score') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 4096) { res.writeHead(413); res.end(); } });
    req.on('end', () => {
      try {
        const entry = JSON.parse(body);
        if (!entry.id || typeof entry.id !== 'string' || entry.id.length > 32) throw new Error('bad id');
        if (!entry.name || typeof entry.name !== 'string' || entry.name.length > 24) throw new Error('bad name');
        if (typeof entry.score !== 'number' || entry.score < 0 || entry.score > 9999999) throw new Error('bad score');
        const safe = {
          id:     entry.id.replace(/[^a-z0-9]/gi,'').slice(0,32),
          name:   entry.name.replace(/[<>"']/g,'').trim().slice(0,24),
          avatar: (typeof entry.avatar === 'string' ? entry.avatar : '🎮').slice(0,8),
          color:  (/^#[0-9a-f]{6}$/i.test(entry.color) ? entry.color : '#90caf9'),
          score:  Math.floor(entry.score),
          level:  Math.max(1, Math.floor(entry.level || 1)),
          mode:   ['classic','adventure','daily'].includes(entry.mode) ? entry.mode : 'classic',
          date:   new Date().toISOString().slice(0,10)
        };
        const scores = readScores();
        scores.push(safe);
        // Keep max 50 000 entries
        if (scores.length > 50000) scores.splice(0, scores.length - 50000);
        writeScores(scores);
        res.writeHead(200, { 'Content-Type': 'application/json', ...CORS });
        res.end(JSON.stringify({ ok: true }));
      } catch(e) {
        res.writeHead(400, CORS);
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  /* Static file serving */
  let filePath = path.join(DIR, req.url === '/' ? 'BlockBlitz.html' : req.url);
  // Basic path traversal guard
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const types = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.json':'application/json' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  fs.writeFileSync(path.join(DIR, 'server-url.txt'),
    'Local:   http://localhost:' + PORT + '\n' +
    'Mobile:  http://' + localIP + ':' + PORT + '\n'
  );
  console.log('BlockBlitz server running!');
  console.log('Local:  http://localhost:' + PORT);
  console.log('Mobile: http://' + localIP + ':' + PORT);
});
