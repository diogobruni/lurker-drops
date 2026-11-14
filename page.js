// Lurker Drops page script: the theme button and the short loops inside the
// product's visuals. Nav, hovers, moments and the hero entrance belong to the kit (system.js, motion.js).
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const root = document.documentElement;

/* theme: the saved choice, else the system setting (set before paint in BaseLayout); the button flips it.
   transitions.dev icon swap: moon in light, sun in dark. */
for (const btn of document.querySelectorAll('[data-theme-toggle]')) {
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    btn.dataset.state = dark ? 'b' : 'a';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? btn.dataset.labelLight : btn.dataset.labelDark);
  };
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('ld-theme', root.dataset.theme); } catch {}
    sync();
  });
}

/* hero: the toolbar icon opens and closes the popup (transitions.dev: menu dropdown) */
for (const btn of document.querySelectorAll('[data-bw-toggle]')) {
  const popup = document.getElementById(btn.getAttribute('aria-controls'));
  let timer = 0;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    clearTimeout(timer);
    btn.setAttribute('aria-expanded', String(open));
    popup.classList.remove('is-closing');
    popup.classList.toggle('is-open', open);
    if (!open) {
      popup.classList.add('is-closing');
      timer = setTimeout(() => popup.classList.remove('is-closing'), 150);
    }
  });
}

/* replay a transitions.dev success check */
function check(el) {
  el.setAttribute('data-state', 'out');
  void el.offsetWidth;
  el.setAttribute('data-state', 'in');
}

/* one short round (under 5 s, no pause button needed): plays once after load, rests on its
   finished picture, and plays again when the pointer enters its host */
function loop(host, round) {
  if (!host || reduced) return;
  let running = false;
  const run = async () => {
    if (running) return;
    running = true;
    await round();
    running = false;
  };
  setTimeout(run, 1200);
  host.addEventListener('pointerenter', run);
}

/* app-frame: the Twitch bonus chest appears and the extension claims it */
const tw = document.querySelector('[data-tw-loop]');
if (tw) {
  const chest = tw.querySelector('[data-tw-chest]');
  const tick = tw.querySelector('[data-tw-check]');
  loop(tw.closest('.app'), async () => {
    tw.classList.remove('is-claimed');
    chest.classList.remove('is-gone');
    tick.setAttribute('data-state', 'out');
    await wait(1400);
    chest.classList.add('is-gone');
    tw.classList.add('is-claimed');
    check(tick);
  });
}

/* feature 3: Twitch chat drops, then comes back */
const chat = document.querySelector('[data-chat]');
loop(chat?.closest('.card'), async () => {
  chat.classList.remove('is-back');
  await wait(1600);
  chat.classList.add('is-back');
});

/* feature 4: the bonus chest is claimed */
const pts = document.querySelector('[data-chest]');
loop(pts?.closest('.card'), async () => {
  const btn = pts.querySelector('[data-chest-btn]');
  const tick = pts.querySelector('[data-chest-check]');
  pts.classList.remove('is-claimed');
  btn.classList.remove('is-gone');
  tick.setAttribute('data-state', 'out');
  await wait(1000);
  btn.classList.add('is-gone');
  pts.classList.add('is-claimed');
  check(tick);
});

/* step 1: the store button swaps to Added (transitions.dev text swap) */
const store = document.querySelector('.mini--store');
loop(store?.closest('.card'), async () => {
  store.classList.remove('is-added');
  await wait(1100);
  store.classList.add('is-added');
});

/* step 3: Turn on lurker is pressed */
const turnOn = document.querySelector('#how [data-turnon]');
loop(turnOn?.closest('.card'), async () => {
  await wait(900);
  turnOn.classList.add('is-pressed');
  await wait(220);
  turnOn.classList.remove('is-pressed');
});
