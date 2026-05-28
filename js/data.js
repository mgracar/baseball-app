// ── TEAMS ──
var teams = [
  {id:'nyy',abbr:'NYY',cls:'c-nyy',name:'New York Yankees',city:'New York, NY',fol:true,live:true},
  {id:'lad',abbr:'LAD',cls:'c-lad',name:'LA Dodgers',city:'Los Angeles, CA',fol:true,live:true},
  {id:'atl',abbr:'ATL',cls:'c-atl',name:'Atlanta Braves',city:'Atlanta, GA',fol:true,live:false},
  {id:'bos',abbr:'BOS',cls:'c-bos',name:'Boston Red Sox',city:'Boston, MA',fol:true,live:true},
  {id:'hou',abbr:'HOU',cls:'c-hou',name:'Houston Astros',city:'Houston, TX',fol:true,live:true},
  {id:'nym',abbr:'NYM',cls:'c-nym',name:'New York Mets',city:'New York, NY',fol:false,live:false},
  {id:'chc',abbr:'CHC',cls:'c-chc',name:'Chicago Cubs',city:'Chicago, IL',fol:false,live:false},
  {id:'sf',abbr:'SF',cls:'c-sf',name:'San Francisco Giants',city:'San Francisco, CA',fol:false,live:true},
  {id:'tex',abbr:'TEX',cls:'c-tex',name:'Texas Rangers',city:'Arlington, TX',fol:false,live:false},
  {id:'sea',abbr:'SEA',cls:'c-sea',name:'Seattle Mariners',city:'Seattle, WA',fol:false,live:false},
  {id:'phi',abbr:'PHI',cls:'c-phi',name:'Philadelphia Phillies',city:'Philadelphia, PA',fol:false,live:false},
  {id:'tor',abbr:'TOR',cls:'c-tor',name:'Toronto Blue Jays',city:'Toronto, ON',fol:false,live:false},
  {id:'min',abbr:'MIN',cls:'c-min',name:'Minnesota Twins',city:'Minneapolis, MN',fol:false,live:false},
  {id:'cle',abbr:'CLE',cls:'c-cle',name:'Cleveland Guardians',city:'Cleveland, OH',fol:false,live:false},
  {id:'stl',abbr:'STL',cls:'c-stl',name:'St. Louis Cardinals',city:'St. Louis, MO',fol:false,live:false},
  {id:'det',abbr:'DET',cls:'c-det',name:'Detroit Tigers',city:'Detroit, MI',fol:false,live:false},
  {id:'kc',abbr:'KC',cls:'c-kc',name:'Kansas City Royals',city:'Kansas City, MO',fol:false,live:false},
  {id:'mil',abbr:'MIL',cls:'c-mil',name:'Milwaukee Brewers',city:'Milwaukee, WI',fol:false,live:false},
  {id:'sd',abbr:'SD',cls:'c-sd',name:'San Diego Padres',city:'San Diego, CA',fol:false,live:false},
  {id:'oak',abbr:'OAK',cls:'c-oak',name:'Oakland Athletics',city:'Oakland, CA',fol:false,live:false}
];

var teamGames = {
  nyy:[
    {d:'25',m:'May',l:'Sun',s:'past',h:'NYY',hc:'c-nyy',a:'BOS',ac:'c-bos',hs:5,as:3},
    {d:'27',m:'May',l:'Today',s:'live',h:'NYY',hc:'c-nyy',a:'BOS',ac:'c-bos',hs:4,as:3,inn:'Bot 7th'},
    {d:'28',m:'May',l:'Tue',s:'upcoming',h:'NYY',hc:'c-nyy',a:'TOR',ac:'c-tor',t:'4:05 PM'}
  ],
  lad:[
    {d:'25',m:'May',l:'Sun',s:'past',h:'LAD',hc:'c-lad',a:'SF',ac:'c-sf',hs:7,as:5},
    {d:'27',m:'May',l:'Today',s:'live',h:'LAD',hc:'c-lad',a:'SF',ac:'c-sf',hs:7,as:5,inn:'Top 9th'},
    {d:'28',m:'May',l:'Tue',s:'upcoming',h:'LAD',hc:'c-lad',a:'SEA',ac:'c-sea',t:'7:10 PM'}
  ],
  atl:[
    {d:'25',m:'May',l:'Sun',s:'past',h:'ATL',hc:'c-atl',a:'PHI',ac:'c-phi',hs:7,as:4},
    {d:'27',m:'May',l:'Today',s:'upcoming',h:'ATL',hc:'c-atl',a:'PHI',ac:'c-phi',t:'1:20 PM'}
  ],
  bos:[
    {d:'26',m:'May',l:'Mon',s:'past',h:'BOS',hc:'c-bos',a:'TOR',ac:'c-tor',hs:8,as:5},
    {d:'27',m:'May',l:'Today',s:'live',h:'NYY',hc:'c-nyy',a:'BOS',ac:'c-bos',hs:4,as:3,inn:'Bot 7th'}
  ],
  hou:[
    {d:'26',m:'May',l:'Mon',s:'past',h:'HOU',hc:'c-hou',a:'TEX',ac:'c-tex',hs:5,as:3},
    {d:'27',m:'May',l:'Today',s:'live',h:'HOU',hc:'c-hou',a:'CWS',ac:'c-cws',hs:2,as:2,inn:'Mid 5th'}
  ]
};

// ── PLAYERS ──
var players = [
  {id:'aj',init:'AJ',num:'99',cls:'c-nyy',name:'Aaron Judge',pos:'RF',team:'NY Yankees',abbr:'NYY',fol:true,
    games:[
      {d:'25',m:'May',l:'Sun',s:'past',opp:'Boston',oc:'c-bos',oa:'BOS',stat:'2-for-4, HR'},
      {d:'27',m:'May',l:'Today',s:'live',opp:'Boston',oc:'c-bos',oa:'BOS',stat:'1-for-2'},
      {d:'28',m:'May',l:'Tue',s:'upcoming',opp:'Toronto',oc:'c-tor',oa:'TOR',t:'4:05 PM'}
    ]},
  {id:'ff',init:'FF',num:'10',cls:'c-lad',name:'Freddie Freeman',pos:'1B',team:'LA Dodgers',abbr:'LAD',fol:true,
    games:[
      {d:'25',m:'May',l:'Sun',s:'past',opp:'Giants',oc:'c-sf',oa:'SF',stat:'1-for-3, RBI'},
      {d:'27',m:'May',l:'Today',s:'live',opp:'Giants',oc:'c-sf',oa:'SF',stat:'2-for-3, HR'},
      {d:'28',m:'May',l:'Tue',s:'upcoming',opp:'Seattle',oc:'c-sea',oa:'SEA',t:'7:10 PM'}
    ]},
  {id:'ra',init:'RA',num:'44',cls:'c-atl',name:'Ronald Acuña Jr.',pos:'RF',team:'Atlanta Braves',abbr:'ATL',fol:true,
    games:[
      {d:'25',m:'May',l:'Sun',s:'past',opp:'Phillies',oc:'c-phi',oa:'PHI',stat:'3-for-4, 2B'},
      {d:'27',m:'May',l:'Today',s:'upcoming',opp:'Phillies',oc:'c-phi',oa:'PHI',t:'1:20 PM'}
    ]},
  {id:'ja',init:'JA',num:'27',cls:'c-hou',name:'José Altuve',pos:'2B',team:'Houston Astros',abbr:'HOU',fol:true,
    games:[
      {d:'26',m:'May',l:'Mon',s:'past',opp:'Rangers',oc:'c-tex',oa:'TEX',stat:'2-for-4, SB'},
      {d:'27',m:'May',l:'Today',s:'upcoming',opp:'White Sox',oc:'c-cws',oa:'CWS',t:'2:10 PM'}
    ]},
  {id:'jr',init:'JR',num:'11',cls:'c-sea',name:'Julio Rodríguez',pos:'CF',team:'Seattle Mariners',abbr:'SEA',fol:true,
    games:[
      {d:'26',m:'May',l:'Mon',s:'past',opp:'Toronto',oc:'c-tor',oa:'TOR',stat:'0-for-3'},
      {d:'27',m:'May',l:'Today',s:'upcoming',opp:'Dodgers',oc:'c-lad',oa:'LAD',t:'7:10 PM'}
    ]},
  {id:'rd',init:'RD',num:'2',cls:'c-bos',name:'Rafael Devers',pos:'3B',team:'Boston Red Sox',abbr:'BOS',fol:false,
    games:[{d:'27',m:'May',l:'Today',s:'live',opp:'NY Yankees',oc:'c-nyy',oa:'NYY',stat:'0-for-2'}]},
  {id:'ds',init:'DS',num:'7',cls:'c-chc',name:'Dansby Swanson',pos:'SS',team:'Chicago Cubs',abbr:'CHC',fol:false,
    games:[{d:'27',m:'May',l:'Today',s:'upcoming',opp:'Milwaukee',oc:'c-mil',oa:'MIL',t:'7:45 PM'}]},
  {id:'bh',init:'BH',num:'3',cls:'c-phi',name:'Bryce Harper',pos:'1B',team:'Phillies',abbr:'PHI',fol:false,
    games:[{d:'27',m:'May',l:'Today',s:'upcoming',opp:'Braves',oc:'c-atl',oa:'ATL',t:'1:20 PM'}]},
  {id:'cs',init:'CS',num:'5',cls:'c-tex',name:'Corey Seager',pos:'SS',team:'Texas Rangers',abbr:'TEX',fol:false,
    games:[{d:'28',m:'May',l:'Tue',s:'upcoming',opp:'Astros',oc:'c-hou',oa:'HOU',t:'1:05 PM'}]},
  {id:'na',init:'NA',num:'28',cls:'c-stl',name:'Nolan Arenado',pos:'3B',team:'St. Louis Cardinals',abbr:'STL',fol:false,
    games:[{d:'28',m:'May',l:'Tue',s:'upcoming',opp:'Cubs',oc:'c-chc',oa:'CHC',t:'7:45 PM'}]}
];

// ── CHAMPIONSHIPS ──
var championships = [
  {id:'rya',abbr:'RYA',bg:'#003087',name:'Regional Youth Baseball Championship',country:'United States',dates:'Jun 6–8, 2025',start:'Jun 6',saved:true,groups:[
    {gid:'rya-u10',age:'U10',d:'Jun 6–7',s:'Jun 6',loc:'Riverside Park, Chicago IL',warn:null,saved:false},
    {gid:'rya-u12',age:'U12',d:'Jun 6–8',s:'Jun 6',loc:'Northfield Diamond, Chicago IL',warn:'Game will be canceled if rainfall exceeds 0.5" on game day.',saved:true},
    {gid:'rya-u14',age:'U14',d:'Jun 7–8',s:'Jun 7',loc:'Millbrook Complex, Chicago IL',warn:null,saved:false},
    {gid:'rya-u16',age:'U16',d:'Jun 8',s:'Jun 8',loc:'Central Park Field 3, Chicago IL',warn:'Lightning protocol: 30-min delay for any lightning within 8 miles.',saved:false}
  ]},
  {id:'nbc',abbr:'NBC',bg:'#ce1141',name:'National Baseball Classic',country:'United States',dates:'Jul 12–20, 2025',start:'Jul 12',saved:false,groups:[
    {gid:'nbc-u12',age:'U12',d:'Jul 12–14',s:'Jul 12',loc:'Heritage Stadium, Dallas TX',warn:null,saved:false},
    {gid:'nbc-u14',age:'U14',d:'Jul 14–17',s:'Jul 14',loc:'Lakeside Field, Dallas TX',warn:'Schedule subject to change due to extreme heat advisory.',saved:false},
    {gid:'nbc-u16',age:'U16',d:'Jul 17–19',s:'Jul 17',loc:'Grand Slam Park, Dallas TX',warn:null,saved:false},
    {gid:'nbc-u18',age:'U18',d:'Jul 19–20',s:'Jul 19',loc:'Grand Slam Park, Dallas TX',warn:null,saved:false}
  ]},
  {id:'wbc',abbr:'WBC',bg:'#1d4ed8',name:'World Baseball Championship',country:'Japan',dates:'Aug 3–10, 2025',start:'Aug 3',saved:false,groups:[
    {gid:'wbc-u12',age:'U12',d:'Aug 3–5',s:'Aug 3',loc:'Osaka Dome, Osaka',warn:'Games may be rescheduled during typhoon season.',saved:false},
    {gid:'wbc-u14',age:'U14',d:'Aug 5–7',s:'Aug 5',loc:'Kobe Sports Park, Kobe',warn:null,saved:false},
    {gid:'wbc-u16',age:'U16',d:'Aug 7–9',s:'Aug 7',loc:'Tokyo Dome, Tokyo',warn:null,saved:false},
    {gid:'wbc-u18',age:'U18',d:'Aug 9–10',s:'Aug 9',loc:'Tokyo Dome, Tokyo',warn:'Rain delay: 1-hour maximum before cancellation.',saved:false}
  ]},
  {id:'eca',abbr:'ECA',bg:'#0f6e56',name:'European Championship of Amateur Baseball',country:'Germany',dates:'Sep 1–6, 2025',start:'Sep 1',saved:false,groups:[
    {gid:'eca-u14',age:'U14',d:'Sep 1–3',s:'Sep 1',loc:'Berliner Baseballpark, Berlin',warn:null,saved:false},
    {gid:'eca-u16',age:'U16',d:'Sep 3–5',s:'Sep 3',loc:'Hamburg Diamond, Hamburg',warn:'Cold weather protocol applies below 5°C.',saved:false},
    {gid:'eca-u18',age:'U18',d:'Sep 5–6',s:'Sep 5',loc:'Munich Sports Complex, Munich',warn:null,saved:false}
  ]},
  {id:'pbc',abbr:'PBC',bg:'#7c3aed',name:'Pan-American Baseball Cup',country:'Canada',dates:'Sep 20–28, 2025',start:'Sep 20',saved:false,groups:[
    {gid:'pbc-u12',age:'U12',d:'Sep 20–22',s:'Sep 20',loc:'Rogers Centre Field, Toronto',warn:null,saved:false},
    {gid:'pbc-u14',age:'U14',d:'Sep 22–25',s:'Sep 22',loc:'Pearson Park, Toronto',warn:'Games canceled if temperature drops below 2°C.',saved:false},
    {gid:'pbc-u16',age:'U16',d:'Sep 25–27',s:'Sep 25',loc:'BC Place Diamond, Vancouver',warn:null,saved:false},
    {gid:'pbc-u18',age:'U18',d:'Sep 27–28',s:'Sep 27',loc:'BC Place Diamond, Vancouver',warn:null,saved:false}
  ]},
  {id:'lca',abbr:'LCA',bg:'#d97706',name:'Latin American Championship',country:'Mexico',dates:'Oct 4–10, 2025',start:'Oct 4',saved:false,groups:[
    {gid:'lca-u12',age:'U12',d:'Oct 4–6',s:'Oct 4',loc:'Estadio Alfredo Harp, Mexico City',warn:null,saved:false},
    {gid:'lca-u14',age:'U14',d:'Oct 6–8',s:'Oct 6',loc:'Parque de Béisbol, Monterrey',warn:'Lightning delay: all players off field immediately.',saved:false},
    {gid:'lca-u16',age:'U16',d:'Oct 8–10',s:'Oct 8',loc:'Parque de Béisbol, Monterrey',warn:null,saved:false}
  ]}
];

// ── SAVED STATE PERSISTENCE ──
(function() {
  try {
    var raw = localStorage.getItem('baseball-saves');
    if (!raw) return;
    var state = JSON.parse(raw);
    var champSet = {}; (state.champs || []).forEach(function(id){ champSet[id] = 1; });
    var groupSet = {}; (state.groups || []).forEach(function(gid){ groupSet[gid] = 1; });
    championships.forEach(function(c) {
      c.saved = !!champSet[c.id];
      c.groups.forEach(function(g) { g.saved = !!groupSet[g.gid]; });
    });
  } catch (e) {}
})();

function saveChampsState() {
  try {
    var champs = [], groups = [];
    championships.forEach(function(c) {
      if (c.saved) champs.push(c.id);
      c.groups.forEach(function(g) { if (g.saved) groups.push(g.gid); });
    });
    localStorage.setItem('baseball-saves', JSON.stringify({champs: champs, groups: groups}));
  } catch (e) {}
}

// ── HELPERS ──
function parseTimeToMinutes(t) {
  if (!t) return null;
  var m = String(t).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!m) return null;
  var h = parseInt(m[1], 10), min = parseInt(m[2], 10);
  var suf = (m[3] || '').toUpperCase();
  if (suf === 'PM' && h !== 12) h += 12;
  if (suf === 'AM' && h === 12) h = 0;
  return h * 60 + min;
}

function timelineSortKey(g) {
  // past: -1 (top), live: now (9:41), upcoming: parse t
  if (g.s === 'past') return -1;
  if (g.s === 'live') return 9 * 60 + 41;
  var t = parseTimeToMinutes(g.t);
  return t === null ? 24 * 60 : t;
}

function buildTimeline(groups) {
  var grps = {}, keys = [], seen = {};
  groups.forEach(function(item) {
    var g = item.g || item;
    var k = g.d + g.m;
    if (!grps[k]) {
      grps[k] = { d: g.d, m: g.m, l: g.l, items: [] };
      if (!seen[k]) { seen[k] = 1; keys.push(k); }
    }
    grps[k].items.push(item);
  });
  // Sort items inside each day by hour-of-day
  keys.forEach(function(k){
    grps[k].items.sort(function(a, b){
      var ga = a.g || a, gb = b.g || b;
      return timelineSortKey(ga) - timelineSortKey(gb);
    });
  });
  var past   = keys.filter(function(k){ return grps[k].items.every(function(i){ var g=i.g||i; return g.s==='past'; }); });
  var today  = keys.filter(function(k){ return grps[k].l === 'Today'; });
  var future = keys.filter(function(k){ return !past.includes(k) && !today.includes(k); });
  return { grps: grps, past: past, today: today, future: future };
}

function getDayLabel(m, d) {
  var ms = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(2025, ms[m]||0, d).getDay()] || '';
}

function parseMonthDay(s) {
  var mo = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
  var p = s.split(' ');
  return { m: p[0], d: parseInt(p[1]), mo: mo[p[0]] || 0 };
}
