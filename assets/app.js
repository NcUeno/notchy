import { createNotch, ICON, weatherIcon } from './notch.js';

const $ = (s, el = document) => el.querySelector(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---------- Static icons ----------
for (const el of document.querySelectorAll('[data-icon]')) {
  const big = el.classList.contains('big-ico');
  el.innerHTML = ICON[el.dataset.icon](big ? 34 : 19);
}
$('#wxRow').innerHTML = ['clear', 'partly', 'rain', 'thunder'].map((k) => weatherIcon(k, true, 52)).join('');

// ---------- Live notch hanging from the browser window ----------
const wide = () => innerWidth >= 860;
const top = createNotch($('#topNotch'), { hover: canHover, clickToOpen: false });
top.el.addEventListener('mouseenter', () => {
  if (!wide()) return;
  $('#hoverHint').classList.add('gone');
});
// The expanded panel is 720px wide; keep it closed on narrow screens.
top.onChange((s) => { if (s.expanded && !wide()) top.setExpanded(false); });

// ---------- Nav ----------
const nav = $('#nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', scrollY > 10);
  if (scrollY > 300) $('#hoverHint').classList.add('gone');
  tiltStage();
};
addEventListener('scroll', onScroll, { passive: true });

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Count-up numbers
const countIo = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    countIo.unobserve(e.target);
    const to = Number(e.target.dataset.count);
    const t0 = performance.now();
    const dur = reduced ? 1 : 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      e.target.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach((el) => countIo.observe(el));

// Spotlight on feature cards
for (const card of document.querySelectorAll('.f-card')) {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

// ---------- Demo stage ----------
const DESIGN_W = 1280;
const stage = $('#stage');
const screen = $('#screen');
const cursor = $('#cursor');
const demos = $('#demos');

new ResizeObserver(() => {
  stage.style.setProperty('--s', stage.clientWidth / DESIGN_W);
}).observe(stage);

// The stage starts tilted back and lies flat as it scrolls into view.
function tiltStage() {
  if (reduced) return;
  const r = stage.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight * 0.75)));
  const e = 1 - Math.pow(1 - p, 3);
  stage.style.setProperty('--tilt', `${(1 - e) * 18}deg`);
  stage.style.setProperty('--zoom', 0.92 + e * 0.08);
}
tiltStage();

// The demo runs on its own clock, starting at 14:48 today, so the sample
// schedule (a review "in 12 minutes") always reads the same.
const base = new Date();
base.setHours(14, 48, 0, 0);
const t0 = Date.now();
const demoNow = () => new Date(base.getTime() + (Date.now() - t0));
const notch = createNotch($('#demoNotch'), { now: demoNow, hover: false });

setInterval(() => {
  const n = demoNow();
  $('#tbTime').textContent = `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`;
  $('#tbDate').textContent = `${n.getFullYear()}/${String(n.getMonth() + 1).padStart(2, '0')}/${String(n.getDate()).padStart(2, '0')}`;
}, 1000);

// ---------- Fake cursor ----------
const REST = { x: 1010, y: 560 };
function pointOf(target) {
  if (!target.sel) return target;
  const el = screen.querySelector(target.sel);
  if (!el) return REST;
  const s = screen.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const k = stage.clientWidth / DESIGN_W;
  return {
    x: (r.left - s.left + r.width * (target.fx ?? 0.5)) / k,
    y: (r.top - s.top + r.height * (target.fy ?? 0.55)) / k,
  };
}
let cursorPos = { ...REST };
function placeCursor(p, ms) {
  cursorPos = p;
  cursor.style.setProperty('--cdur', `${ms}ms`);
  cursor.style.setProperty('--cx', `${p.x - 4}px`);
  cursor.style.setProperty('--cy', `${p.y - 2}px`);
}
async function press() {
  cursor.style.setProperty('--cdur', '120ms');
  cursor.style.setProperty('--press', 0.82);
  await sleep(130);
  cursor.style.setProperty('--press', 1);
  await sleep(120);
}

// ---------- Scenes ----------
// Each scene is a little script; `run` gets helpers bound to a cancel token.
const SCENES = [
  {
    id: 'compact', icon: 'clock', title: 'いつもは、小さく',
    desc: '閉じているときは時刻と気温だけ。画面の上端に溶け込む、幅200pxのノッチ。',
    caption: '画面上端の左右には逆向きの角丸。ウィンドウの縁と自然につながります。',
    dur: 5200,
    async run(h) {
      notch.setLive(false);
      notch.setExpanded(false);
      await h.move(REST, 700);
    },
  },
  {
    id: 'live', icon: 'bolt', title: '予定が近づくと、伸びる',
    desc: '30分以内に始まる予定があると、ノッチが横に伸びてタイトルと残り時間を表示。',
    caption: 'まもなくの予定はオレンジで。進行中になると「残り◯分」に変わります。',
    dur: 5600,
    async run(h) {
      notch.setExpanded(false);
      await h.wait(500);
      notch.setLive(true);
    },
  },
  {
    id: 'home', icon: 'home', title: 'ホバーで、開く',
    desc: 'カーソルを乗せて80msで展開。時計・天気・次の予定がひと目で。',
    caption: 'カーソルを乗せるだけ。離すと380ms後に、ばねのように閉じます。',
    dur: 7000,
    async run(h) {
      notch.setLive(true);
      notch.setTab('home');
      if (!notch.state.expanded) {
        await h.move({ x: 640, y: 18 }, 1000);
        await h.wait(80);
        notch.setExpanded(true);
        await h.wait(900);
      }
      notch.setTab('home');
      await h.move({ sel: '.home .card:nth-child(3) .event:nth-child(2)', fx: 0.6 }, 900);
      await h.wait(1400);
      await h.move({ sel: '.home .card:nth-child(1) .bar-track', fx: 0.7 }, 900);
    },
  },
  {
    id: 'calendar', icon: 'calendar', title: '月カレンダー',
    desc: '予定のある日にはカレンダー色のドット。日付を選ぶと、その日の予定が並びます。',
    caption: '今日はオレンジの丸、選んだ日は白いリング。前後の月への移動もワンクリック。',
    dur: 7400,
    async run(h) {
      await h.ensureOpen();
      await h.click({ sel: '.tab[data-tab="calendar"]' });
      notch.setTab('calendar');
      await h.wait(700);
      await h.click({ sel: '.day.today ~ .day:not(.other) ~ .day' });
      await h.wait(1500);
      await h.click({ sel: '.day.today' });
    },
  },
  {
    id: 'weather', icon: 'weather', title: '12時間と7日間の天気',
    desc: '現在の天気、体感・湿度・風速、12時間予報と7日間予報。APIキーは不要です。',
    caption: '降水確率が20%以上の時間は青で。7日間の気温の幅はグラデーションのバーで。',
    dur: 6400,
    async run(h) {
      await h.ensureOpen();
      await h.click({ sel: '.tab[data-tab="weather"]' });
      notch.setTab('weather');
      await h.wait(600);
      await h.move({ sel: '.hourly > div:nth-child(3)' }, 800);
      await h.move({ sel: '.hourly > div:nth-child(11)' }, 1600);
      await h.wait(400);
      await h.move({ sel: '.daily .row:nth-child(2) .range' }, 900);
    },
  },
  {
    id: 'settings', icon: 'settings', title: 'Googleでログイン',
    desc: '表示するカレンダーやモニター、天気の地域を設定。権限は読み取りのみです。',
    caption: 'Googleのカレンダー色をそのまま使用。ログアウトするとGoogle側の許可も取り消します。',
    dur: 7400,
    async run(h) {
      await h.ensureOpen();
      await h.click({ sel: '.tab[data-tab="settings"]' });
      notch.setTab('settings');
      await h.wait(700);
      await h.click({ sel: '.cal-row[data-gcal="family"]', fx: 0.25 });
      await h.wait(700);
      await h.click({ sel: '.chip[data-monitor="1"]' });
      await h.wait(900);
      await h.click({ sel: '.chip[data-monitor="0"]' });
    },
  },
  {
    id: 'through', icon: 'cursor', title: '邪魔をしない',
    desc: 'ノッチの外側は、クリックがそのまま下のウィンドウへ通ります。',
    caption: 'カーソルが離れると自動で閉じ、ノッチのすぐ下のタブもいつもどおり押せます。',
    dur: 6400,
    async run(h) {
      await h.move({ x: 860, y: 360 }, 900);
      notch.setExpanded(false);
      await h.wait(700);
      await h.click({ sel: '.win-tab[data-wtab="1"]' }, true);
      await h.wait(1300);
      await h.click({ sel: '.win-tab[data-wtab="2"]' }, true);
      await h.wait(1000);
      await h.click({ sel: '.win-tab[data-wtab="0"]' }, true);
    },
  },
];

const list = $('#sceneList');
list.innerHTML = SCENES.map((s, i) => `
  <li><button class="scene" role="tab" data-i="${i}" style="--dur:${s.dur}ms">
    <span class="scene-t">${ICON[s.icon](17)}${s.title}</span>
    <span class="scene-d"><span>${s.desc}</span></span>
    <span class="scene-bar"><i></i></span>
  </button></li>`).join('');
const buttons = [...list.querySelectorAll('.scene')];

let current = -1;
let token = { cancelled: true };
let advanceTimer;
let paused = false; // by the play button
let userHolding = false; // pointer is over the stage

function helpers(tk) {
  const guard = () => { if (tk.cancelled) throw new Error('cancelled'); };
  const h = {
    wait: async (ms) => { await sleep(ms); guard(); },
    move: async (target, ms = 900) => {
      guard();
      cursor.classList.remove('hide');
      placeCursor(pointOf(target), ms);
      await h.wait(ms);
    },
    click: async (target, through = false) => {
      await h.move(target, 800);
      await press();
      guard();
      const el = target.sel && screen.querySelector(target.sel);
      if (through) {
        const rip = $('#ripple');
        const win = $('#win');
        rip.style.left = `${cursorPos.x - win.offsetLeft}px`;
        rip.style.top = `${cursorPos.y - win.offsetTop}px`;
        rip.classList.remove('go');
        void rip.offsetWidth;
        rip.classList.add('go');
        screen.querySelectorAll('.win-tab').forEach((t) => t.classList.toggle('on', t === el));
      } else if (el) el.click();
    },
    ensureOpen: async () => {
      notch.setLive(true);
      if (notch.state.expanded) return;
      await h.move({ x: 640, y: 18 }, 900);
      await h.wait(80);
      notch.setExpanded(true);
      await h.wait(800);
    },
  };
  return h;
}

function play(i) {
  token.cancelled = true;
  clearTimeout(advanceTimer);
  current = i;
  buttons.forEach((b, j) => {
    b.classList.toggle('active', j === i);
    b.setAttribute('aria-selected', j === i);
    // Restart the progress bar animation.
    const bar = b.querySelector('.scene-bar i');
    bar.style.animation = 'none';
    void bar.offsetWidth;
    bar.style.animation = '';
  });
  const s = SCENES[i];
  const cap = $('#caption');
  cap.style.opacity = 0;
  setTimeout(() => { cap.textContent = s.caption; cap.style.opacity = 1; }, 200);

  const tk = { cancelled: false };
  token = tk;
  if (i === 0) {
    notch.reset();
    screen.querySelectorAll('.win-tab').forEach((t, j) => t.classList.toggle('on', j === 0));
  }
  s.run(helpers(tk)).catch(() => {});
  schedule(s.dur);
}

let remaining = 0;
let startedAt = 0;
function schedule(ms) {
  clearTimeout(advanceTimer);
  remaining = ms;
  startedAt = Date.now();
  if (paused || userHolding) return;
  held = false;
  demos.classList.remove('paused');
  advanceTimer = setTimeout(() => play((current + 1) % SCENES.length), ms);
}
let held = false;
function hold() {
  clearTimeout(advanceTimer);
  if (!held) remaining = Math.max(400, remaining - (Date.now() - startedAt));
  held = true;
  demos.classList.add('paused');
}
function release() {
  if (paused || userHolding) return;
  held = false;
  demos.classList.remove('paused');
  startedAt = Date.now();
  advanceTimer = setTimeout(() => play((current + 1) % SCENES.length), remaining);
}

list.addEventListener('click', (e) => {
  const b = e.target.closest('.scene');
  if (!b) return;
  play(Number(b.dataset.i));
  b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
});

$('#playBtn').addEventListener('click', () => {
  paused = !paused;
  $('#playBtn').setAttribute('aria-label', paused ? '再生' : '一時停止');
  if (paused) hold();
  else release();
});

// Let visitors take over: hovering the stage pauses the script and hands the
// notch to the real cursor, with the app's 80 ms / 380 ms hover timing.
let hoverT;
if (canHover) {
  stage.addEventListener('mouseenter', () => {
    userHolding = true;
    token.cancelled = true;
    cursor.classList.add('hide');
    hold();
  });
  stage.addEventListener('mouseleave', () => {
    userHolding = false;
    clearTimeout(hoverT);
    cursor.classList.remove('hide');
    placeCursor(REST, 600);
    release();
  });
  notch.el.addEventListener('mouseenter', () => {
    clearTimeout(hoverT);
    hoverT = setTimeout(() => notch.setExpanded(true), 80);
  });
  notch.el.addEventListener('mouseleave', () => {
    clearTimeout(hoverT);
    hoverT = setTimeout(() => notch.setExpanded(false), 380);
  });
} else {
  // Touch: tap the notch to open it, tap elsewhere on the stage to close.
  stage.addEventListener('click', (e) => {
    if (!notch.el.contains(e.target)) notch.setExpanded(false);
  });
}

// Only run the tour while it is on screen.
let started = false;
new IntersectionObserver(([e]) => {
  if (e.isIntersecting) {
    if (!started) { started = true; play(0); }
    else if (!userHolding) release();
  } else if (started) hold();
}, { threshold: 0.35 }).observe(stage);
