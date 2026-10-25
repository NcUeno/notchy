// A self-contained replica of the Notchy widget for the landing page.
// Markup, icons and behaviour follow the app's src/main.js; the data is sample data.

const line = (paths, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

export const ICON = {
  home: (s) => line('<path d="M3.5 10.2 12 3.5l8.5 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.8H9.2v5.8H5A1.5 1.5 0 0 1 3.5 19z"/>', s),
  calendar: (s) => line('<rect x="3.5" y="5" width="17" height="15.5" rx="3.2"/><path d="M3.5 10h17M8.5 3v4M15.5 3v4"/>', s),
  weather: (s) => line('<path d="M9 3.2v1.3M3.7 9H5M4.9 4.9l.9.9M13.1 4.9l-.9.9"/><path d="M6.3 11.3A3.3 3.3 0 0 1 12.4 8"/><path d="M8 20.5h9.5a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6.8A3.1 3.1 0 0 0 8 20.5z"/>', s),
  settings: (s) => line('<path d="M4 7h9M18 7h2M4 17h3M12 17h8"/><circle cx="15.5" cy="7" r="2.3"/><circle cx="9.5" cy="17" r="2.3"/>', s),
  pin: (s) => line('<path d="M12 21s-6.5-5.7-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.3"/>', s),
  left: (s) => line('<path d="M14.5 18 8.5 12l6-6"/>', s),
  right: (s) => line('<path d="m9.5 18 6-6-6-6"/>', s),
  refresh: (s) => line('<path d="M20 11a8 8 0 0 0-14.6-4.4L4 8.5"/><path d="M4 3.5v5h5"/><path d="M4 13a8 8 0 0 0 14.6 4.4l1.4-1.9"/><path d="M20 20.5v-5h-5"/>', s),
  monitor: (s) => line('<rect x="3" y="4" width="18" height="12.5" rx="2.2"/><path d="M9 20.5h6M12 16.5v4"/>', s),
  clock: (s) => line('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', s),
  drop: (s) => line('<path d="M12 3.5s6 6.4 6 10.7a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/>', s),
  wind: (s) => line('<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>', s),
  power: (s) => line('<path d="M12 3v8"/><path d="M7 6.3a7.5 7.5 0 1 0 10 0"/>', s),
  lock: (s) => line('<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>', s),
  cursor: (s) => line('<path d="M5 3.5 18.5 12l-6 1.4L9.6 19z"/>', s),
  bolt: (s) => line('<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>', s),
  layers: (s) => line('<path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z"/><path d="m3.5 12 8.5 4.5 8.5-4.5"/><path d="m3.5 16 8.5 4.5 8.5-4.5"/>', s),
};

const SUN = '<circle cx="16" cy="16" r="6.2" fill="#FFCC3D"/><g stroke="#FFCC3D" stroke-width="2.2" stroke-linecap="round"><path d="M16 3.5v2.6M16 25.9v2.6M3.5 16h2.6M25.9 16h2.6M7.2 7.2l1.8 1.8M23 23l1.8 1.8M7.2 24.8 9 23M23 9l1.8-1.8"/></g>';
const MOON = '<path d="M21.5 4.5a11 11 0 1 0 6 18.6A9.2 9.2 0 0 1 21.5 4.5z" fill="#D7DEFF"/>';
const SMALL_SUN = '<circle cx="11.5" cy="11" r="4.6" fill="#FFCC3D"/><g stroke="#FFCC3D" stroke-width="1.9" stroke-linecap="round"><path d="M11.5 2.6v1.8M3.1 11h1.8M5.5 5l1.3 1.3M17.5 5l-1.3 1.3"/></g>';
const SMALL_MOON = '<path d="M14 3.8a7.3 7.3 0 1 0 4 12.4A6.1 6.1 0 0 1 14 3.8z" fill="#D7DEFF"/>';
const CLOUD = (fill = '#EEF1F6') => `<path d="M9.4 26h13.8a6 6 0 0 0 .7-11.95 8 8 0 0 0-15.3 1.9A5.1 5.1 0 0 0 9.4 26z" fill="${fill}"/>`;
const CLOUD_HIGH = (fill = '#EEF1F6') => `<path d="M9.4 21.5h13.8a6 6 0 0 0 .7-11.95 8 8 0 0 0-15.3 1.9A5.1 5.1 0 0 0 9.4 21.5z" fill="${fill}"/>`;
const GLYPHS = {
  clear: (day) => (day ? SUN : MOON),
  partly: (day) => (day ? SMALL_SUN : SMALL_MOON) + CLOUD(),
  cloudy: () => CLOUD('#C9CED8'),
  rain: () => CLOUD_HIGH() + '<g stroke="#4AA3FF" stroke-width="2.2" stroke-linecap="round"><path d="m11.5 24.5-1.5 4M17 24.5l-1.5 4M22.5 24.5l-1.5 4"/></g>',
  drizzle: () => CLOUD_HIGH() + '<g stroke="#64B5FF" stroke-width="2" stroke-linecap="round"><path d="M11 25v1.5M16 26v1.5M21 25v1.5"/></g>',
  thunder: () => CLOUD_HIGH('#C9CED8') + '<path d="m17.5 21-4.5 6.2h3.6l-1.6 4.3 5.2-6.6h-3.7z" fill="#FFCC3D"/>',
};
export function weatherIcon(kind, isDay = true, size = 32) {
  return `<svg viewBox="0 0 32 32" width="${size}" height="${size}">${(GLYPHS[kind] || GLYPHS.cloudy)(isDay)}</svg>`;
}

// ---------- helpers ----------
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const pad = (n) => String(n).padStart(2, '0');
const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const dateJa = (d) => `${d.getMonth() + 1}月${d.getDate()}日（${WEEKDAYS[d.getDay()]}）`;
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
function duration(ms) {
  const mins = Math.max(1, Math.round(ms / 60000));
  if (mins < 60) return `${mins}分`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}時間${m}分` : `${h}時間`;
}

const C = { blue: '#0a84ff', green: '#30d158', orange: '#ff9f0a', pink: '#ff375f', purple: '#bf5af2', teal: '#64d2ff' };

// Sample events placed relative to `now` so the widget always looks plausible.
function sampleEvents(now) {
  const min = 60000;
  const at = (base, m) => new Date(base.getTime() + m * min);
  const slot = new Date(Math.floor(now.getTime() / (30 * min)) * 30 * min);
  const liveStart = new Date(Math.ceil((now.getTime() + 12 * min) / (5 * min)) * 5 * min);
  const today = startOfDay(now);
  const ev = (title, start, mins, color, location = '') => ({ title, start, end: at(start, mins), color, location });
  const list = [
    ev('デイリースタンドアップ', at(slot, -270), 30, C.blue, 'Teams'),
    ev('ランチ · 佐藤さん', at(slot, -120), 60, C.green, '丸の内'),
    ev('デザインレビュー', liveStart, 45, C.orange, '会議室 B'),
    ev('1on1', at(liveStart, 90), 30, C.pink),
    ev('ジム', at(liveStart, 240), 60, C.teal),
    ev('歯医者', at(addDays(today, 1), 9.5 * 60), 30, C.purple, '駅前クリニック'),
    ev('週次定例', at(addDays(today, 1), 13 * 60), 60, C.blue),
  ];
  const scattered = [[-6, C.blue], [-3, C.green], [-1, C.pink], [2, C.orange], [2, C.blue], [4, C.purple], [6, C.blue], [8, C.green], [9, C.orange], [12, C.pink], [15, C.blue], [16, C.teal], [19, C.green], [22, C.orange]];
  for (const [d, color] of scattered) list.push(ev('予定', at(addDays(today, d), 10 * 60), 60, color));
  return list.sort((a, b) => a.start - b.start);
}

function sampleWeather(now) {
  const h0 = now.getHours();
  const temps = [19, 19, 18, 17, 16, 15, 14, 14, 13, 13, 12, 12];
  const kinds = ['clear', 'clear', 'partly', 'partly', 'clear', 'clear', 'clear', 'partly', 'cloudy', 'cloudy', 'drizzle', 'rain'];
  const pops = [0, 0, 0, 10, 0, 0, 0, 10, 20, 30, 40, 60];
  const hourly = temps.map((t, i) => {
    const hour = (h0 + i) % 24;
    return { hour, temp: t + (hour < 15 && hour > 9 ? 2 : 0), kind: kinds[i], isDay: hour >= 6 && hour < 18, pop: pops[i] };
  });
  const daily = [[13, 22, 'clear'], [12, 19, 'rain'], [11, 17, 'cloudy'], [10, 18, 'partly'], [12, 21, 'clear'], [14, 23, 'clear'], [13, 20, 'partly']]
    .map(([min, max, kind], i) => ({ min, max, kind, date: addDays(now, i) }));
  const isDay = h0 >= 6 && h0 < 18;
  return { temp: 19, feels: 18, humidity: 52, wind: 2.8, kind: 'clear', label: '晴れ', isDay, hourly, daily, city: '東京', admin: '東京都' };
}

const TABS = [
  { id: 'home', icon: ICON.home, title: 'ホーム' },
  { id: 'calendar', icon: ICON.calendar, title: 'カレンダー' },
  { id: 'weather', icon: ICON.weather, title: '天気' },
  { id: 'settings', icon: ICON.settings, title: '設定' },
];

/**
 * Renders a Notchy widget into `host`.
 * opts.now: () => Date — the clock the widget runs on.
 * opts.hover: open on hover like the app (80 ms in, 380 ms out).
 */
export function createNotch(host, opts = {}) {
  const now = opts.now || (() => new Date());
  const el = document.createElement('div');
  el.className = 'nz collapsed';
  el.innerHTML = `
    <div class="compact"><span class="c-time num"></span><span class="c-live"></span><span class="c-weather"></span></div>
    <div class="panel">
      <header class="bar"><nav class="tabs"></nav><div class="bar-date"></div></header>
      <section class="view"></section>
    </div>`;
  host.appendChild(el);
  const $ = (s) => el.querySelector(s);

  const state = {
    expanded: false,
    live: false,
    allowLive: opts.allowLive !== false,
    tab: 'home',
    month: startOfMonth(now()),
    selected: startOfDay(now()),
    monitor: 0,
    gcal: { main: true, work: true, family: false, holiday: true },
  };
  let events = sampleEvents(now());
  const weather = sampleWeather(now());
  const listeners = new Set();

  const eventsOn = (day) => {
    const s = startOfDay(day);
    const e = addDays(s, 1);
    return events.filter((ev) => ev.start < e && ev.end > s);
  };
  const upcoming = (limit) => {
    const n = now();
    const end = addDays(startOfDay(n), 2);
    return events.filter((ev) => ev.title !== '予定' && ev.end > n && ev.start < end).slice(0, limit);
  };
  const liveEvent = () => {
    const n = now().getTime();
    return events.find((ev) => ev.end > n && ev.start - n < 30 * 60000 && ev.title !== '予定');
  };
  function relText(ev) {
    const n = now().getTime();
    if (ev.start <= n) return `<span class="now">進行中</span>`;
    const diff = ev.start - n;
    if (diff < 60 * 60000) return `<span class="soon">あと${duration(diff)}</span>`;
    if (sameDay(ev.start, now())) return `あと${duration(diff)}`;
    return '明日';
  }
  function eventRow(ev, day) {
    const past = ev.end <= now().getTime();
    const s = sameDay(ev.start, day) ? hm(ev.start) : `${ev.start.getMonth() + 1}/${ev.start.getDate()}`;
    const e = sameDay(ev.end, day) ? hm(ev.end) : `${ev.end.getMonth() + 1}/${ev.end.getDate()}`;
    const rel = relText(ev);
    return `<div class="event${past ? ' past' : ''}"><span class="stripe" style="background:${ev.color}"></span>
      <div class="body"><div class="title">${ev.title}</div>
      <div class="meta num">${s} – ${e}${!past ? ` · ${rel}` : ''}${ev.location ? ` · ${ev.location}` : ''}</div></div></div>`;
  }

  function renderCompact() {
    const n = now();
    $('.c-time').textContent = hm(n);
    $('.c-weather').innerHTML = `${weatherIcon(weather.kind, weather.isDay, 16)}<span class="num">${weather.temp}°</span>`;
    const ev = state.allowLive ? liveEvent() : null;
    state.live = !!ev;
    el.classList.toggle('live', !!ev);
    $('.c-live').innerHTML = ev
      ? `<span class="dot" style="background:${ev.color}"></span><span class="title">${ev.title}</span><span class="rel num">${
          ev.start <= n ? `残り${duration(ev.end - n)}` : `あと${duration(ev.start - n)}`}</span>`
      : '';
  }

  function renderPanel() {
    $('.tabs').innerHTML = TABS.map((t) =>
      `<button class="tab${state.tab === t.id ? ' active' : ''}" data-tab="${t.id}" aria-label="${t.title}" title="${t.title}">${t.icon(17)}</button>`).join('');
    const n = now();
    $('.bar-date').textContent = `${n.getFullYear()}年${dateJa(n)}`;
    const v = $('.view');
    // Re-trigger the view-in animation like switching sections in the app.
    v.className = 'view';
    void v.offsetWidth;
    ({ home: renderHome, calendar: renderCalendar, weather: renderWeather, settings: renderSettings })[state.tab](v);
  }

  function renderHome(v) {
    v.className = 'view home active';
    const n = now();
    const pct = ((n - startOfDay(n)) / 864000).toFixed(0);
    const w = weather;
    v.innerHTML = `
      <div class="card">
        <div class="label">${ICON.clock(12)} 時刻</div>
        <div class="clock-time num" data-clock>${hm(n)}<span class="sec">${pad(n.getSeconds())}</span></div>
        <div class="clock-date">${dateJa(n)}</div>
        <div class="progress-row"><span>今日の経過</span><b class="num" data-pct>${pct}%</b></div>
        <div class="bar-track"><div class="bar-fill" data-bar style="width:${pct}%"></div></div>
      </div>
      <div class="card">
        <div class="label">${ICON.pin(12)} ${w.city}</div>
        <div class="wx-now">${weatherIcon(w.kind, w.isDay, 44)}<div class="wx-temp num">${w.temp}°</div></div>
        <div class="wx-cond">${w.label}</div>
        <div class="wx-hl num">最高 ${w.daily[0].max}° · 最低 ${w.daily[0].min}°</div>
        <div class="wx-mini num">${w.hourly.slice(1, 5).map((h) => `
          <div><span>${h.hour}時</span>${weatherIcon(h.kind, h.isDay, 16)}<b>${h.temp}°</b></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="label">${ICON.calendar(12)} 次の予定<span class="grow"></span><button class="icon-btn" title="更新">${ICON.refresh(13)}</button></div>
        <div class="events scroll">${upcoming(4).map((ev) => eventRow(ev, ev.start < n ? n : ev.start)).join('')}</div>
      </div>`;
  }

  function renderCalendar(v) {
    v.className = 'view cal active';
    const today = startOfDay(now());
    const m = state.month;
    const first = addDays(m, -m.getDay());
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = addDays(first, i);
      const colors = [...new Set(eventsOn(d).map((e) => e.color))].slice(0, 3);
      const cls = ['day', d.getMonth() !== m.getMonth() && 'other', sameDay(d, today) && 'today', sameDay(d, state.selected) && 'selected']
        .filter(Boolean).join(' ');
      cells.push(`<button class="${cls}" data-day="${d.getTime()}"><span class="n num">${d.getDate()}</span>
        <span class="dots">${colors.map((c) => `<i style="background:${c}"></i>`).join('')}</span></button>`);
    }
    const dayEvents = eventsOn(state.selected).map((ev) => (ev.title === '予定' ? { ...ev, title: sampleTitle(ev) } : ev));
    v.innerHTML = `
      <div class="card">
        <div class="month-head">
          <div class="title">${m.getFullYear()}年 <span>${m.getMonth() + 1}月</span></div>
          <button class="icon-btn" data-month="-1">${ICON.left(14)}</button>
          <button class="icon-btn" data-month="0" title="今日">●</button>
          <button class="icon-btn" data-month="1">${ICON.right(14)}</button>
        </div>
        <div class="grid7">
          ${WEEKDAYS.map((w, i) => `<div class="wd${i === 0 ? ' sun' : i === 6 ? ' sat' : ''}">${w}</div>`).join('')}
          ${cells.join('')}
        </div>
      </div>
      <div class="card">
        <div class="agenda-head"><div class="title">${dateJa(state.selected)}</div>
          <span class="muted">${sameDay(state.selected, today) ? '今日' : ''}</span><span style="flex:1"></span>
          <button class="icon-btn" title="更新">${ICON.refresh(13)}</button></div>
        ${dayEvents.length ? `<div class="events scroll">${dayEvents.map((ev) => eventRow(ev, state.selected)).join('')}</div>` : '<div class="empty">予定はありません</div>'}
      </div>`;
  }
  const TITLES = ['打ち合わせ', 'ヨガ', '企画ミーティング', '美容院', '読書会', 'リリース作業', '夕食 · 家族', '映画'];
  const sampleTitle = (ev) => TITLES[(ev.start.getDate() + ev.color.charCodeAt(2)) % TITLES.length];

  function renderWeather(v) {
    v.className = 'view wx active';
    const w = weather;
    const lo = Math.min(...w.daily.map((x) => x.min));
    const hi = Math.max(...w.daily.map((x) => x.max));
    const span = Math.max(1, hi - lo);
    const n = now();
    v.innerHTML = `
      <div class="card">
        <div class="label">${ICON.pin(12)} ${w.city}<span class="grow"></span>
          <span class="num" style="text-transform:none;letter-spacing:0;font-weight:500">${pad(n.getHours())}:${pad(Math.floor(n.getMinutes() / 15) * 15)} 更新</span></div>
        <div class="wx-big">
          ${weatherIcon(w.kind, w.isDay, 52)}
          <div><div class="wx-temp num">${w.temp}°</div></div>
          <div>
            <div style="font-weight:600;font-size:15px">${w.label}</div>
            <div class="wx-hl num">最高 ${w.daily[0].max}° · 最低 ${w.daily[0].min}°</div>
            <div class="wx-hl num">体感 ${w.feels}°</div>
          </div>
          <div class="wx-stats num">
            <span>${ICON.drop(13)}<b>${w.humidity}%</b></span>
            <span>${ICON.wind(13)}<b>${w.wind.toFixed(1)}</b>m/s</span>
          </div>
        </div>
        <div class="hourly num">${w.hourly.map((h, i) => `<div>
          <span class="h">${i === 0 ? '今' : `${h.hour}時`}</span>${weatherIcon(h.kind, h.isDay, 20)}
          <span class="t">${h.temp}°</span><span class="p">${h.pop >= 20 ? `${h.pop}%` : ''}</span></div>`).join('')}</div>
      </div>
      <div class="card">
        <div class="label">7日間の予報</div>
        <div class="daily num">${w.daily.map((x, i) => `<div class="row">
          <span class="d">${i === 0 ? '今日' : WEEKDAYS[x.date.getDay()]}</span>${weatherIcon(x.kind, true, 18)}
          <span class="lo">${x.min}°</span>
          <span class="range"><i style="left:${((x.min - lo) / span) * 100}%;right:${100 - ((x.max - lo) / span) * 100}%"></i></span>
          <span class="hi">${x.max}°</span></div>`).join('')}</div>
      </div>`;
  }

  const GCALS = [
    { id: 'main', name: 'メイン', color: C.blue, primary: true },
    { id: 'work', name: '仕事', color: C.orange },
    { id: 'family', name: '家族', color: C.green },
    { id: 'holiday', name: '日本の祝日', color: C.pink },
  ];
  const MONITORS = [{ w: 2560, h: 1440, primary: true }, { w: 1920, h: 1080 }];
  function renderSettings(v) {
    v.className = 'view settings active';
    v.innerHTML = `
      <div class="card scroll">
        <div class="label">${ICON.pin(12)} 天気の地域</div>
        <div class="current-city">${weather.city}<small>${weather.admin}</small></div>
        <div class="field"><div class="input">都市名で検索（例: 大阪）</div><button class="btn">検索</button></div>
        <div class="label" style="margin-top:14px">${ICON.monitor(12)} 表示するモニター</div>
        <div class="chips">${MONITORS.map((m, i) => `
          <button class="chip${state.monitor === i ? ' on' : ''}" data-monitor="${i}">
            <b>ディスプレイ ${i + 1}${m.primary ? ' <span class="tag">メイン</span>' : ''}</b>
            <small class="num">${m.w}×${m.h}</small></button>`).join('')}</div>
        <div class="settings-foot"><span>Notchy 0.1.0</span><button class="btn danger">${ICON.power(12)} 終了</button></div>
      </div>
      <div class="card scroll">
        <div class="label">${ICON.calendar(12)} Googleアカウント</div>
        <div class="field" style="align-items:center;margin-bottom:6px">
          <span style="font-weight:600">ログイン済み</span><span style="flex:1"></span><button class="btn">ログアウト</button>
        </div>
        <div class="cal-list">${GCALS.map((c) => `
          <div class="cal-row" data-gcal="${c.id}">
            <span class="check${state.gcal[c.id] ? ' on' : ''}" style="${state.gcal[c.id] ? `background:${c.color}` : ''}"></span>
            <span class="swatch" style="background:${c.color}"></span>
            <span>${c.name}${c.primary ? ' <span class="muted">（メイン）</span>' : ''}</span>
          </div>`).join('')}</div>
        <div class="hint">権限は読み取りのみ（<b>calendar.readonly</b>）。ログイン情報は <b>Windows 資格情報マネージャー</b> に保存されます。</div>
      </div>`;
  }

  // ---------- interactions ----------
  el.addEventListener('click', (e) => {
    const t = e.target.closest('button, .cal-row');
    if (!t) {
      if (!state.expanded && opts.clickToOpen !== false) api.setExpanded(true);
      return;
    }
    const ds = t.dataset;
    if (ds.tab) api.setTab(ds.tab);
    else if (ds.day) {
      const d = new Date(Number(ds.day));
      state.selected = d;
      if (d.getMonth() !== state.month.getMonth()) state.month = startOfMonth(d);
      renderPanel();
    } else if (ds.month !== undefined) {
      const delta = Number(ds.month);
      if (delta === 0) {
        state.month = startOfMonth(now());
        state.selected = startOfDay(now());
      } else state.month = new Date(state.month.getFullYear(), state.month.getMonth() + delta, 1);
      renderPanel();
    } else if (ds.monitor) {
      state.monitor = Number(ds.monitor);
      renderPanel();
    } else if (ds.gcal) {
      state.gcal[ds.gcal] = !state.gcal[ds.gcal];
      renderPanel();
    }
  });

  let hoverTimer;
  if (opts.hover) {
    el.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => api.setExpanded(true), 80);
    });
    el.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => api.setExpanded(false), 380);
    });
  }

  function tick() {
    renderCompact();
    if (!state.expanded || state.tab !== 'home') return;
    const n = now();
    const clock = el.querySelector('[data-clock]');
    if (!clock) return;
    clock.innerHTML = `${hm(n)}<span class="sec">${pad(n.getSeconds())}</span>`;
    const pct = ((n - startOfDay(n)) / 864000).toFixed(0);
    el.querySelector('[data-pct]').textContent = `${pct}%`;
    el.querySelector('[data-bar]').style.width = `${pct}%`;
  }
  const timer = setInterval(tick, 1000);

  const api = {
    el,
    get state() { return state; },
    setExpanded(open) {
      if (state.expanded === open) return;
      state.expanded = open;
      el.classList.toggle('expanded', open);
      el.classList.toggle('collapsed', !open);
      if (open) renderPanel();
      listeners.forEach((fn) => fn(state));
    },
    setTab(tab) {
      state.tab = tab;
      if (state.expanded) renderPanel();
    },
    setLive(on) {
      state.allowLive = on;
      renderCompact();
    },
    reset() {
      state.month = startOfMonth(now());
      state.selected = startOfDay(now());
      state.monitor = 0;
      events = sampleEvents(now());
      renderCompact();
    },
    onChange(fn) { listeners.add(fn); },
    destroy() { clearInterval(timer); el.remove(); },
  };
  renderCompact();
  return api;
}
