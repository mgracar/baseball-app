// ── PLAYERS PAGE ──

var pFilters = { status: [], players: [] };

function plCard(p, g) {
  return '<div class="player-card ' + g.s + '">'
    + '<div class="player-avatar ' + p.cls + (g.s==='past'?' dim':'') + '">' + p.init
    + '<div class="player-number ' + p.cls + '">' + p.num + '</div></div>'
    + '<div class="player-info">'
    + '<div class="player-name">' + p.name + '</div>'
    + '<div class="player-pos">' + p.pos + ' · ' + p.team + '</div>'
    + '<div class="vs-row">'
    + '<div class="vs-team"><div class="vs-badge ' + p.cls + '">' + p.abbr + '</div><div class="vs-name">' + p.team.split(' ').pop() + '</div></div>'
    + '<div class="vs-sep">vs</div>'
    + '<div class="vs-team"><div class="vs-badge ' + g.oc + '">' + g.oa + '</div><div class="vs-name">' + g.opp + '</div></div>'
    + '</div></div>'
    + '<div class="player-right">'
    + (g.s==='live' ? '<div class="live-badge"><div class="live-dot"></div>Live</div><div class="player-stat">' + g.stat + '</div>' : '')
    + (g.s==='past' ? '<div class="final-text">Final</div><div style="font-size:10px;color:#bbb">' + g.stat + '</div>' : '')
    + (g.s==='upcoming' ? '<div class="game-time">' + g.t + '</div>' : '')
    + '</div></div>';
}

function renderPlayerSched() {
  var fol = players.filter(function(p){ return p.fol; });
  var el = document.getElementById('p-sched');
  if (!fol.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="ti ti-user-plus"></i></div><div class="empty-title">No players followed</div><div class="empty-body">Follow players to see their schedule here.</div><button class="empty-cta" onclick="pTab(\'f\')">Browse players</button></div>';
    document.getElementById('p-sched-count').textContent = 'Schedule';
    return;
  }
  var items = [];
  fol.forEach(function(p) {
    if (pFilters.players.length && !pFilters.players.includes(p.id)) return;
    p.games.forEach(function(g) {
      if (pFilters.status.length && !pFilters.status.includes(g.s)) return;
      items.push({ p: p, g: g });
    });
  });
  document.getElementById('p-sched-count').textContent = items.length + ' game' + (items.length===1?'':'s');
  if (!items.length) {
    el.innerHTML = '<div class="no-results">No games match your filters</div>';
    return;
  }
  var tl = buildTimeline(items);
  var html = '';
  function rg(k) {
    var gr = tl.grps[k];
    return '<div class="tl-row">'
      + '<div class="tl-date"><div class="tl-day">' + gr.d + '</div><div class="tl-mon">' + gr.m + '</div>'
      + '<div class="tl-lbl"' + (gr.l==='Today'?' style="color:#ef4444"':'') + '>' + gr.l + '</div></div>'
      + '<div class="tl-cards">' + gr.items.map(function(i){ return plCard(i.p, i.g); }).join('') + '</div>'
      + '</div><div class="divider-s"></div>';
  }
  tl.past.forEach(function(k){ html += rg(k); });
  html += '<div class="tl-now"><div class="tl-now-dot"></div><div class="tl-now-label">9:41 AM</div><div class="tl-now-line"></div></div>';
  tl.today.concat(tl.future).forEach(function(k){ html += rg(k); });
  el.innerHTML = html;
}

function pFolRow(p) {
  return '<div class="follow-row">'
    + '<div class="follow-avatar ' + p.cls + '">' + p.init
    + '<div class="follow-num ' + p.cls + '">' + p.num + '</div></div>'
    + '<div class="follow-info"><div class="follow-name">' + p.name + '</div><div class="follow-sub">' + p.pos + ' · ' + p.team + '</div></div>'
    + '<button class="follow-btn ' + (p.fol?'following':'follow') + '" data-tp="' + p.id + '">' + (p.fol?'Following':'Follow') + '</button>'
    + '</div>';
}

function bindPlayerBtns(el) {
  el.querySelectorAll('[data-tp]').forEach(function(b) {
    b.addEventListener('click', function() {
      var p = players.find(function(x){ return x.id===b.dataset.tp; });
      if (p) p.fol = !p.fol;
      renderPlayerFol();
      renderPlayerSched();
      var q = document.getElementById('p-ov-inp').value;
      if (q) doPlayerSearch(q);
    });
  });
}

function renderPlayerFol() {
  var f = players.filter(function(p){ return p.fol; });
  var s = players.filter(function(p){ return !p.fol; });
  var el = document.getElementById('p-fol-list');
  el.innerHTML = (f.length ? '<div class="section-label">Following</div>' + f.map(pFolRow).join('') : '')
    + '<div class="section-label">Suggested to you</div>' + s.map(pFolRow).join('');
  bindPlayerBtns(el);
}

function doPlayerSearch(q) {
  q = (q || '').toLowerCase().trim();
  document.getElementById('p-ov-hero').style.display = q ? 'none' : 'flex';
  if (!q) { document.getElementById('p-ov-results').innerHTML = ''; return; }
  var found = players.filter(function(p) {
    return p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q) || p.abbr.toLowerCase().includes(q);
  });
  var el = document.getElementById('p-ov-results');
  el.innerHTML = '<div class="section-label">Results</div>'
    + (found.length ? found.map(pFolRow).join('') : '<div class="no-results">No players found</div>');
  bindPlayerBtns(el);
}

function pTab(x) {
  ['s','f'].forEach(function(v) {
    document.getElementById('pt-' + v).classList.toggle('active', v===x);
    document.getElementById('pp-' + v).classList.toggle('hidden', v!==x);
  });
  if (x==='f') renderPlayerFol();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('pt-s').addEventListener('click', function(){ pTab('s'); });
  document.getElementById('pt-f').addEventListener('click', function(){ pTab('f'); });

  document.getElementById('p-search-input').addEventListener('input', function() {
    var v = this.value.trim();
    if (v) {
      document.getElementById('p-ov').classList.add('open');
      document.getElementById('p-ov-inp').value = v;
      doPlayerSearch(v);
    } else {
      renderPlayerFol();
    }
  });
  document.getElementById('p-ov-inp').addEventListener('input', function(){ doPlayerSearch(this.value); });
  document.getElementById('p-ov-cancel').addEventListener('click', function() {
    document.getElementById('p-ov').classList.remove('open');
    document.getElementById('p-search-input').value = '';
    document.getElementById('p-ov-inp').value = '';
  });

  // Filter sheet
  document.getElementById('p-filter-btn').addEventListener('click', openPlayerFilter);
  document.getElementById('p-fs-close').addEventListener('click', function(){ document.getElementById('p-fs').classList.remove('open'); });
  document.getElementById('p-fs').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  document.getElementById('p-fs-apply').addEventListener('click', applyPlayerFilter);
  document.getElementById('p-fs-reset').addEventListener('click', resetPlayerFilter);

  renderPlayerSched();
  renderPlayerFol();
});

function openPlayerFilter() {
  var statusEl = document.getElementById('p-fs-status');
  statusEl.innerHTML = [['live','Live'],['upcoming','Upcoming'],['past','Past']].map(function(s){
    var active = pFilters.status.indexOf(s[0]) !== -1;
    return '<button class="radius-chip' + (active?' active':'') + '" data-fst="' + s[0] + '">' + s[1] + '</button>';
  }).join('');
  statusEl.querySelectorAll('[data-fst]').forEach(function(b){
    b.addEventListener('click', function(){ this.classList.toggle('active'); });
  });

  var playersEl = document.getElementById('p-fs-players');
  var fol = players.filter(function(p){ return p.fol; });
  playersEl.innerHTML = fol.map(function(p){
    var active = pFilters.players.indexOf(p.id) !== -1;
    return '<button class="radius-chip' + (active?' active':'') + '" data-fpl="' + p.id + '">' + p.name + '</button>';
  }).join('') || '<div class="no-results" style="padding:8px 0">No followed players</div>';
  playersEl.querySelectorAll('[data-fpl]').forEach(function(b){
    b.addEventListener('click', function(){ this.classList.toggle('active'); });
  });

  document.getElementById('p-fs').classList.add('open');
}

function applyPlayerFilter() {
  pFilters.status = Array.from(document.querySelectorAll('#p-fs-status .radius-chip.active')).map(function(b){ return b.dataset.fst; });
  pFilters.players = Array.from(document.querySelectorAll('#p-fs-players .radius-chip.active')).map(function(b){ return b.dataset.fpl; });
  var n = pFilters.status.length + pFilters.players.length;
  var badge = document.getElementById('p-filter-badge'), btn = document.getElementById('p-filter-btn');
  if (n) { badge.textContent = n; badge.classList.remove('hidden'); btn.classList.add('active'); }
  else   { badge.classList.add('hidden'); btn.classList.remove('active'); }
  document.getElementById('p-fs').classList.remove('open');
  renderPlayerSched();
}

function resetPlayerFilter() {
  pFilters = { status: [], players: [] };
  document.querySelectorAll('#p-fs .radius-chip.active').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('p-filter-badge').classList.add('hidden');
  document.getElementById('p-filter-btn').classList.remove('active');
  renderPlayerSched();
}
