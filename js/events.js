// ── EVENTS PAGE ──

var currentChampId = null;
var evSortMode = 'date';
var evViewMode = 'list';
var appliedFilters = {};

// ── MY EVENTS ──
function renderMyList() {
  var sc = championships.filter(function(c){ return c.saved; });
  var sg = [];
  championships.forEach(function(c){ c.groups.forEach(function(g){ if(g.saved) sg.push({c:c,g:g}); }); });
  var el = document.getElementById('ev-my-list');
  if (!sc.length && !sg.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="ti ti-bookmark"></i></div><div class="empty-title">No saved events</div><div class="empty-body">Browse All events to save championships or age groups.</div><button class="empty-cta" onclick="evTab(\'all\')">Browse events</button></div>';
    return;
  }
  var html = '';
  if (sc.length) {
    html += '<div class="section-label">Saved championships</div>';
    sc.forEach(function(c) {
      html += '<div class="my-event-card champ-type" data-oc="' + c.id + '">'
        + '<div class="my-event-icon red-icon"><i class="ti ti-award"></i></div>'
        + '<div class="my-event-info"><div class="my-event-title">' + c.name + '</div><div class="my-event-sub">' + c.country + '</div></div>'
        + '<div class="my-event-right"><div class="my-event-date">' + c.start + '</div><div class="saved-pill"><div class="saved-dot"></div>Saved</div></div>'
        + '</div>';
    });
  }
  if (sg.length) {
    html += '<div class="section-label">Saved age groups</div>';
    sg.forEach(function(item) {
      html += '<div class="my-event-card age-type" data-oc="' + item.c.id + '">'
        + '<div class="my-event-icon blue-icon"><i class="ti ti-users"></i></div>'
        + '<div class="my-event-info"><div class="my-event-title">' + item.g.age + ' Division</div><div class="my-event-sub">' + item.c.name + '</div></div>'
        + '<div class="my-event-right"><div class="my-event-date">' + item.g.d.split('–')[0] + '</div>'
        + '<div class="age-pill"><i class="ti ti-map-pin" style="font-size:9px"></i>' + item.g.loc.split(',')[0] + '</div></div>'
        + '</div>';
    });
  }
  el.innerHTML = html;
  el.querySelectorAll('[data-oc]').forEach(function(el){ el.addEventListener('click', function(){ openChampDetail(this.dataset.oc); }); });
}

function renderMyCal() {
  var sc = championships.filter(function(c){ return c.saved; });
  var sg = [];
  championships.forEach(function(c){ c.groups.forEach(function(g){ if(g.saved) sg.push({c:c,g:g}); }); });
  var el = document.getElementById('ev-my-cal');
  if (!sc.length && !sg.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="ti ti-calendar"></i></div><div class="empty-title">No saved events</div><div class="empty-body">Save events to see them on the calendar.</div><button class="empty-cta" onclick="evTab(\'all\')">Browse</button></div>';
    return;
  }
  var entries = [];
  sc.forEach(function(c){
    var p = parseMonthDay(c.start);
    entries.push({type:'champ',key:p.mo*100+p.d,mo:p.mo,d:p.d,month:p.m,dl:getDayLabel(p.m,p.d),c:c,g:null});
  });
  sg.forEach(function(item){
    var p = parseMonthDay(item.g.s);
    entries.push({type:'age',key:p.mo*100+p.d,mo:p.mo,d:p.d,month:p.m,dl:getDayLabel(p.m,p.d),c:item.c,g:item.g});
  });
  entries.sort(function(a,b){ return a.key-b.key; });
  var grps={},keys=[],seen={};
  entries.forEach(function(e){
    var k=e.month+' '+e.d;
    if(!grps[k]){grps[k]={month:e.month,d:e.d,dl:e.dl,mo:e.mo,items:[]};if(!seen[k]){seen[k]=1;keys.push(k);}}
    grps[k].items.push(e);
  });
  var past   = keys.filter(function(k){ return grps[k].mo < 6; });
  var future = keys.filter(function(k){ return !past.includes(k); });
  var html = '';
  function rg(k, isPast) {
    var gr = grps[k];
    var h = '<div class="tl-row"><div class="tl-date"><div class="tl-day">'+gr.d+'</div><div class="tl-mon">'+gr.month+'</div><div class="tl-lbl">'+gr.dl+'</div></div><div class="tl-cards">';
    gr.items.forEach(function(e){
      h += '<div class="cal-card '+(e.type==='champ'?'champ-ev':'age-ev')+(isPast?' past-card':'')+'" data-oc="'+e.c.id+'">'
        + '<div class="cal-top"><div class="cal-icon '+(e.type==='champ'?'champ-ev':'age-ev')+'"><i class="ti ti-'+(e.type==='champ'?'award':'users')+'"></i></div>'
        + '<div class="cal-body"><div class="cal-title">'+(e.type==='champ'?e.c.name:e.g.age+' Division')+'</div><div class="cal-sub">'+(e.type==='champ'?e.c.dates:e.c.name)+'</div></div>'
        + '<div class="cal-type-badge'+(e.type==='age'?' age':'')+'">'+(e.type==='champ'?'Championship':'Age group')+'</div></div>'
        + '<div class="cal-location"><i class="ti ti-map-pin"></i><span>'+(e.type==='champ'?e.c.country:e.g.loc)+'</span></div>'
        + (e.g&&e.g.warn?'<div class="warn-row"><i class="ti ti-alert-triangle"></i><span class="warn-text">'+e.g.warn+'</span></div>':'')
        + '</div>';
    });
    h += '</div></div><div class="divider-s"></div>';
    return h;
  }
  past.forEach(function(k){ html += rg(k, true); });
  html += '<div class="tl-now"><div class="tl-now-dot"></div><div class="tl-now-label">Now · May 27</div><div class="tl-now-line"></div></div>';
  future.forEach(function(k){ html += rg(k, false); });
  el.innerHTML = html;
  el.querySelectorAll('[data-oc]').forEach(function(card){ card.addEventListener('click', function(){ openChampDetail(this.dataset.oc); }); });
}

// ── ALL EVENTS ──
function renderChamps() {
  var q = document.getElementById('ev-search-input').value.toLowerCase().trim();
  var list = championships.slice();
  if (q) list = list.filter(function(c){ return c.name.toLowerCase().includes(q)||c.country.toLowerCase().includes(q)||c.abbr.toLowerCase().includes(q); });
  if (appliedFilters.age) list = list.filter(function(c){ return c.groups.some(function(g){ return g.age===appliedFilters.age; }); });
  if (evSortMode==='name') list.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if (evSortMode==='country') list.sort(function(a,b){ return a.country.localeCompare(b.country); });
  else if (evSortMode==='saved') list.sort(function(a,b){ return (b.saved?1:0)-(a.saved?1:0); });
  var el = document.getElementById('ev-all-list');
  if (!list.length) { el.innerHTML = '<div class="no-results">No championships found</div>'; return; }
  var html = '<div class="section-label">Championships · ' + list.length + '</div>';
  list.forEach(function(c) {
    var anySaved = c.groups.some(function(g){ return g.saved; });
    html += '<div class="champ-card' + (c.saved?' saved':'') + '" data-oc="' + c.id + '">'
      + '<div class="champ-logo" style="background:' + c.bg + '">' + c.abbr + '</div>'
      + '<div class="champ-info"><div class="champ-name">' + c.name + '</div>'
      + '<div class="champ-meta"><span class="champ-meta-item"><i class="ti ti-map-pin"></i>' + c.country + '</span>'
      + '<span class="champ-sep">·</span><span class="champ-meta-item"><i class="ti ti-calendar"></i>' + c.dates + '</span>'
      + (anySaved?'<span class="champ-sep">·</span><span class="champ-meta-item" style="color:#2563eb;font-weight:600"><i class="ti ti-bookmark"></i>Groups saved</span>':'')
      + '</div></div>'
      + '<button class="bookmark-btn' + (c.saved?' saved':'') + '" data-bm="' + c.id + '"><i class="ti ti-bookmark"></i></button>'
      + '</div>';
  });
  el.innerHTML = html;
  el.querySelectorAll('[data-oc]').forEach(function(card){ card.addEventListener('click', function(){ openChampDetail(this.dataset.oc); }); });
  el.querySelectorAll('[data-bm]').forEach(function(btn){ btn.addEventListener('click', function(e){ e.stopPropagation(); toggleChampSave(this.dataset.bm); }); });
}

// ── SAVE LOGIC ──
function toggleChampSave(id) {
  var c = championships.find(function(x){ return x.id===id; });
  if (!c) return;
  c.saved = !c.saved;
  saveChampsState();
  renderChamps(); renderMyList();
  if (evViewMode==='cal') renderMyCal();
  if (currentChampId===id) updateDetailSaveBtn(c);
}

function toggleGroupSave(cid, gid) {
  var c = championships.find(function(x){ return x.id===cid; });
  if (!c) return;
  var g = c.groups.find(function(x){ return x.gid===gid; });
  if (!g) return;
  g.saved = !g.saved;
  saveChampsState();
  renderMyList();
  if (evViewMode==='cal') renderMyCal();
  if (currentChampId===cid) renderDetailGroups(c);
}

function updateDetailSaveBtn(c) {
  var btn = document.getElementById('ev-det-savbtn');
  btn.className = 'detail-save-btn ' + (c.saved ? 'saved' : 'unsaved');
  btn.textContent = c.saved ? 'Saved to My events' : 'Save championship';
}

function renderDetailGroups(c) {
  var html = '<div class="detail-section-label">Age groups</div>';
  c.groups.forEach(function(g) {
    html += '<div class="age-group-row" data-oag-c="' + c.id + '" data-oag-g="' + g.gid + '"><div class="age-group-top">'
      + '<div class="age-badge" style="background:' + c.bg + '">' + g.age + '</div>'
      + '<div class="age-info"><div class="age-name">' + g.age + ' Division</div><div class="age-dates"><i class="ti ti-calendar-event"></i>' + g.d + '</div></div>'
      + '<button class="age-save-btn' + (g.saved?' saved':'') + '" data-sc="' + c.id + '" data-sg="' + g.gid + '"><i class="ti ti-bookmark"></i>' + (g.saved?'Saved':'Save') + '</button>'
      + '</div>'
      + '<div class="age-location"><i class="ti ti-map-pin"></i><span>' + g.loc + '</span></div>'
      + (g.warn ? '<div class="warn-row"><i class="ti ti-alert-triangle"></i><span class="warn-text">' + g.warn + '</span></div>' : '')
      + '</div>';
  });
  var el = document.getElementById('ev-det-groups');
  el.innerHTML = html;
  el.querySelectorAll('[data-sg]').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); toggleGroupSave(this.dataset.sc, this.dataset.sg); }); });
  el.querySelectorAll('[data-oag-c]').forEach(function(card){
    card.addEventListener('click', function(e){
      if (e.target.closest('.age-save-btn')) return;
      openAgeDetail(this.dataset.oagC, this.dataset.oagG);
    });
  });
}

var currentAgeKey = null;

function openAgeDetail(cid, gid) {
  var c = championships.find(function(x){ return x.id===cid; });
  if (!c) return;
  var g = c.groups.find(function(x){ return x.gid===gid; });
  if (!g) return;
  currentAgeKey = { cid: cid, gid: gid };
  document.getElementById('ev-age-det-logo').style.background = c.bg;
  document.getElementById('ev-age-det-logo').textContent = c.abbr;
  document.getElementById('ev-age-det-eyebrow').textContent = c.name;
  document.getElementById('ev-age-det-name').textContent = g.age + ' Division';
  document.getElementById('ev-age-det-meta').innerHTML = '<span class="detail-meta-item"><i class="ti ti-calendar"></i>' + g.d + '</span><span style="font-size:10px;color:#ccc">·</span><span class="detail-meta-item"><i class="ti ti-map-pin"></i>' + g.loc.split(',')[0] + '</span>';
  document.getElementById('ev-age-det-back-label').textContent = c.name;
  updateAgeDetailSaveBtn(g);
  renderAgeDetailBody(c, g);
  document.getElementById('ev-age-det').classList.add('open');
}

function updateAgeDetailSaveBtn(g) {
  var btn = document.getElementById('ev-age-det-savbtn');
  btn.className = 'detail-save-btn ' + (g.saved ? 'saved' : 'unsaved');
  btn.textContent = g.saved ? 'Saved to My events' : 'Save age group';
}

function renderAgeDetailBody(c, g) {
  var html = '<div class="detail-section-label">Details</div>';
  html += '<div class="info-card"><i class="ti ti-calendar-event"></i><div><div class="info-label">Dates</div><div class="info-value">' + g.d + '</div></div></div>';
  html += '<div class="info-card"><i class="ti ti-map-pin"></i><div><div class="info-label">Location</div><div class="info-value">' + g.loc + '</div></div></div>';
  html += '<div class="info-card"><i class="ti ti-award"></i><div><div class="info-label">Championship</div><div class="info-value">' + c.name + '</div></div></div>';
  if (g.warn) {
    html += '<div class="detail-section-label">Important</div>';
    html += '<div class="warn-row"><i class="ti ti-alert-triangle"></i><span class="warn-text">' + g.warn + '</span></div>';
  }
  document.getElementById('ev-age-det-body').innerHTML = html;
}

function toggleAgeDetailSave() {
  if (!currentAgeKey) return;
  toggleGroupSave(currentAgeKey.cid, currentAgeKey.gid);
  var c = championships.find(function(x){ return x.id===currentAgeKey.cid; });
  var g = c && c.groups.find(function(x){ return x.gid===currentAgeKey.gid; });
  if (g) updateAgeDetailSaveBtn(g);
}

function openChampDetail(id) {
  var c = championships.find(function(x){ return x.id===id; });
  if (!c) return;
  currentChampId = id;
  document.getElementById('ev-det-logo').style.background = c.bg;
  document.getElementById('ev-det-logo').textContent = c.abbr;
  document.getElementById('ev-det-name').textContent = c.name;
  document.getElementById('ev-det-meta').innerHTML = '<span class="detail-meta-item"><i class="ti ti-map-pin"></i>' + c.country + '</span><span style="font-size:10px;color:#ccc">·</span><span class="detail-meta-item"><i class="ti ti-calendar"></i>' + c.dates + '</span>';
  updateDetailSaveBtn(c);
  renderDetailGroups(c);
  document.getElementById('ev-det').classList.add('open');
}

// ── TAB / VIEW SWITCHING ──
function evTab(t) {
  ['my','all'].forEach(function(x) {
    document.getElementById('et-' + x).classList.toggle('active', x===t);
    document.getElementById('ep-' + x).classList.toggle('hidden', x!==t);
  });
  if (t==='my') { renderMyList(); if (evViewMode==='cal') renderMyCal(); }
  if (t==='all') renderChamps();
}

function setEvView(v) {
  evViewMode = v;
  document.getElementById('vtl').classList.toggle('active', v==='list');
  document.getElementById('vtc').classList.toggle('active', v==='cal');
  document.getElementById('ev-list-pane').classList.toggle('hidden', v!=='list');
  document.getElementById('ev-cal-pane').classList.toggle('hidden', v!=='cal');
  document.getElementById('evvlbl').textContent = v==='list' ? 'List view' : 'Calendar view';
  if (v==='cal') renderMyCal(); else renderMyList();
}

// ── FILTER SHEET ──
function setRadiusChips(v) {
  document.querySelectorAll('.radius-chip').forEach(function(c){ c.classList.toggle('active', parseInt(c.dataset.v)===v); });
}

document.addEventListener('DOMContentLoaded', function() {
  // Tab buttons
  document.getElementById('et-my').addEventListener('click', function(){ evTab('my'); });
  document.getElementById('et-all').addEventListener('click', function(){ evTab('all'); });
  // View toggle
  document.getElementById('vtl').addEventListener('click', function(){ setEvView('list'); });
  document.getElementById('vtc').addEventListener('click', function(){ setEvView('cal'); });
  // Sort chips
  ['date','name','country','saved'].forEach(function(s) {
    document.getElementById('sc-' + s).addEventListener('click', function() {
      evSortMode = s;
      document.querySelectorAll('.sort-chip').forEach(function(c){ c.classList.remove('active'); });
      document.getElementById('sc-' + s).classList.add('active');
      renderChamps();
    });
  });
  // Search
  document.getElementById('ev-search-input').addEventListener('input', function(){ renderChamps(); });
  // Filter open/close
  document.getElementById('ev-filter-btn').addEventListener('click', function(){ document.getElementById('ev-fs').classList.add('open'); });
  document.getElementById('fs-close-btn').addEventListener('click', function(){ document.getElementById('ev-fs').classList.remove('open'); });
  document.getElementById('ev-fs').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
  // Radius slider
  document.getElementById('f-rad').addEventListener('input', function(){
    document.getElementById('f-rad-val').textContent = this.value + ' miles';
    setRadiusChips(parseInt(this.value));
  });
  // Radius chips
  document.querySelectorAll('.radius-chip').forEach(function(c) {
    c.addEventListener('click', function() {
      var v = parseInt(this.dataset.v);
      document.getElementById('f-rad').value = v;
      document.getElementById('f-rad-val').textContent = v===500 ? 'Any' : v + ' miles';
      setRadiusChips(v);
    });
  });
  // Team count slider
  document.getElementById('f-tc').addEventListener('input', function(){ document.getElementById('f-tc-val').textContent = '0 – ' + this.value; });
  // DK toggle
  document.getElementById('f-dk').addEventListener('click', function(){ this.classList.toggle('on'); this.classList.toggle('off'); });
  // Date presets
  document.querySelectorAll('.date-preset-chip').forEach(function(c) {
    c.addEventListener('click', function() {
      document.querySelectorAll('.date-preset-chip').forEach(function(x){ x.classList.remove('active'); });
      this.classList.add('active');
      var pre = {'This Week':['May 27','Jun 2'],'Next Week':['Jun 3','Jun 9'],'This Month':['May 1','May 31'],'Next Month':['Jun 1','Jun 30'],'Next 3 Months':['Jun 1','Aug 31'],'Next 6 Months':['Jun 1','Nov 30'],'Next 12 Months':['Jun 1','May 2026']};
      var p = pre[this.dataset.p] || ['',''];
      document.getElementById('f-start').textContent = p[0] || 'Select Date'; document.getElementById('f-start').style.color = p[0]?'#111':'#bbb';
      document.getElementById('f-end').textContent   = p[1] || 'Select Date'; document.getElementById('f-end').style.color   = p[1]?'#111':'#bbb';
    });
  });
  // Apply
  document.getElementById('fs-apply').addEventListener('click', function() {
    appliedFilters = { age: document.getElementById('f-age').value };
    var n = Object.values(appliedFilters).filter(Boolean).length;
    var bd = document.getElementById('ev-filter-badge'), fb = document.getElementById('ev-filter-btn');
    if (n > 0) { bd.textContent = n; bd.classList.remove('hidden'); fb.classList.add('active'); }
    else { bd.classList.add('hidden'); fb.classList.remove('active'); }
    document.getElementById('ev-fs').classList.remove('open');
    renderChamps();
  });
  // Reset
  document.getElementById('fs-reset').addEventListener('click', function() {
    ['f-city','f-state','f-age','f-cls','f-cir','f-ety','f-dir','f-spt'].forEach(function(id){ var el=document.getElementById(id); if(el) el.value=''; });
    document.getElementById('f-rad').value = 100; document.getElementById('f-rad-val').textContent = '100 miles';
    document.getElementById('f-tc').value = 1000; document.getElementById('f-tc-val').textContent = '0 – 1000';
    document.querySelectorAll('.date-preset-chip').forEach(function(c){ c.classList.remove('active'); });
    document.getElementById('f-start').textContent = 'Select Date'; document.getElementById('f-start').style.color = '#bbb';
    document.getElementById('f-end').textContent   = 'Select Date'; document.getElementById('f-end').style.color   = '#bbb';
    setRadiusChips(100); appliedFilters = {};
    document.getElementById('ev-filter-badge').classList.add('hidden');
    document.getElementById('ev-filter-btn').classList.remove('active');
    renderChamps();
  });
  // Detail back
  document.getElementById('ev-det-back').addEventListener('click', function() {
    document.getElementById('ev-det').classList.remove('open');
    currentChampId = null; renderChamps();
  });
  document.getElementById('ev-det-savbtn').addEventListener('click', function() {
    if (currentChampId) toggleChampSave(currentChampId);
  });
  // Age-group detail back + save
  document.getElementById('ev-age-det-back').addEventListener('click', function() {
    document.getElementById('ev-age-det').classList.remove('open');
    currentAgeKey = null;
  });
  document.getElementById('ev-age-det-savbtn').addEventListener('click', toggleAgeDetailSave);

  renderMyList();
  renderChamps();
});
