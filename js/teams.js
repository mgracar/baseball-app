// ── TEAMS PAGE ──

function gcCard(g) {
  return '<div class="game-card ' + g.s + '">'
    + '<div class="game-teams">'
    + '<div class="game-row' + (g.s==='past'?' dim':'') + '">'
    + '<div class="team-badge ' + g.hc + '">' + g.h + '</div>'
    + '<div class="team-name">' + g.h + '</div>'
    + (g.s!=='upcoming' ? '<div class="team-score">' + g.hs + '</div>' : '')
    + '</div>'
    + '<div class="game-row' + (g.s==='past'?' dim':'') + '">'
    + '<div class="team-badge ' + g.ac + '">' + g.a + '</div>'
    + '<div class="team-name">' + g.a + '</div>'
    + (g.s!=='upcoming' ? '<div class="team-score">' + g.as + '</div>' : '')
    + '</div>'
    + '</div>'
    + '<div class="game-right">'
    + (g.s==='live' ? '<div class="live-badge"><div class="live-dot"></div>Live</div><div class="inning-text">' + g.inn + '</div>' : '')
    + (g.s==='past' ? '<div class="final-text">Final</div>' : '')
    + (g.s==='upcoming' ? '<div class="game-time">' + g.t + '</div>' : '')
    + '</div></div>';
}

function renderTeamView() {
  var fol = teams.filter(function(t){ return t.fol; });
  var el = document.getElementById('tv-content');
  if (!fol.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="ti ti-shield"></i></div><div class="empty-title">No teams followed</div><div class="empty-body">Follow teams to see their games here.</div><button class="empty-cta" onclick="tTab(\'f\')">Browse teams</button></div>';
    return;
  }
  var items = [];
  fol.forEach(function(t) {
    (teamGames[t.id] || []).forEach(function(g) { items.push(g); });
  });
  var tl = buildTimeline(items);
  var html = '';
  function rg(k) {
    var gr = tl.grps[k];
    return '<div class="tl-row">'
      + '<div class="tl-date"><div class="tl-day">' + gr.d + '</div><div class="tl-mon">' + gr.m + '</div>'
      + '<div class="tl-lbl"' + (gr.l==='Today'?' style="color:#ef4444"':'') + '>' + gr.l + '</div></div>'
      + '<div class="tl-cards">' + gr.items.map(gcCard).join('') + '</div>'
      + '</div><div class="divider-s"></div>';
  }
  tl.past.forEach(function(k){ html += rg(k); });
  html += '<div class="tl-now"><div class="tl-now-dot"></div><div class="tl-now-label">9:41 AM</div><div class="tl-now-line"></div></div>';
  tl.today.concat(tl.future).forEach(function(k){ html += rg(k); });
  el.innerHTML = html;
}

function tFolRow(t) {
  return '<div class="follow-row">'
    + '<div class="follow-avatar ' + t.cls + '">' + t.abbr + '</div>'
    + '<div class="follow-info"><div class="follow-name">' + t.name + '</div><div class="follow-sub">' + t.city + '</div></div>'
    + '<button class="follow-btn ' + (t.fol?'following':'follow') + '" data-tt="' + t.id + '">' + (t.fol?'Following':'Follow') + '</button>'
    + '</div>';
}

function bindTeamBtns(el) {
  el.querySelectorAll('[data-tt]').forEach(function(b) {
    b.addEventListener('click', function() {
      var t = teams.find(function(x){ return x.id===b.dataset.tt; });
      if (t) t.fol = !t.fol;
      renderTeamFol();
      renderTeamView();
      var q = document.getElementById('t-ov-inp').value;
      if (q) doTeamSearch(q);
    });
  });
}

function renderTeamFol() {
  var f = teams.filter(function(t){ return t.fol; });
  var s = teams.filter(function(t){ return !t.fol; });
  var el = document.getElementById('t-fol-list');
  el.innerHTML = '<div class="section-label">Following</div>' + f.map(tFolRow).join('')
    + '<div class="section-label">Suggested to you</div>' + s.map(tFolRow).join('');
  bindTeamBtns(el);
}

function doTeamSearch(q) {
  q = (q || '').toLowerCase().trim();
  document.getElementById('t-ov-hero').style.display = q ? 'none' : 'flex';
  if (!q) { document.getElementById('t-ov-results').innerHTML = ''; return; }
  var found = teams.filter(function(t) {
    return t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.abbr.toLowerCase().includes(q);
  });
  var el = document.getElementById('t-ov-results');
  el.innerHTML = '<div class="section-label">Results</div>'
    + (found.length ? found.map(tFolRow).join('') : '<div class="no-results">No teams found</div>');
  bindTeamBtns(el);
}

function tTab(x) {
  ['s','f'].forEach(function(v) {
    document.getElementById('tt-' + v).classList.toggle('active', v===x);
    document.getElementById('tp-' + v).classList.toggle('hidden', v!==x);
  });
  if (x==='f') renderTeamFol();
}

function tView(v) {
  document.getElementById('tv-p').classList.toggle('active', v==='p');
  document.getElementById('tv-p').classList.toggle('inactive', v!=='p');
  document.getElementById('tv-t').classList.toggle('active', v==='t');
  document.getElementById('tv-t').classList.toggle('inactive', v!=='t');
  document.getElementById('tv-pp').classList.toggle('hidden', v!=='p');
  document.getElementById('tv-tp').classList.toggle('hidden', v!=='t');
  if (v==='t') renderTeamView();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('tt-s').addEventListener('click', function(){ tTab('s'); });
  document.getElementById('tt-f').addEventListener('click', function(){ tTab('f'); });
  document.getElementById('tv-p').addEventListener('click', function(){ tView('p'); });
  document.getElementById('tv-t').addEventListener('click', function(){ tView('t'); });

  // Search inline input
  document.getElementById('t-search-input').addEventListener('input', function() {
    var v = this.value.trim();
    if (v) {
      document.getElementById('t-ov').classList.add('open');
      document.getElementById('t-ov-inp').value = v;
      doTeamSearch(v);
    } else {
      renderTeamFol();
    }
  });
  // Search overlay input
  document.getElementById('t-ov-inp').addEventListener('input', function(){ doTeamSearch(this.value); });
  // Cancel
  document.getElementById('t-ov-cancel').addEventListener('click', function() {
    document.getElementById('t-ov').classList.remove('open');
    document.getElementById('t-search-input').value = '';
    document.getElementById('t-ov-inp').value = '';
  });

  renderTeamFol();
});
