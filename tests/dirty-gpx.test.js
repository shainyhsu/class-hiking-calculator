// Dirty-GPX regression tests for index.html (owner-only; not part of the page).
// Run: node tests/dirty-gpx.test.js   (Node 18+, no packages)
// All tracks are synthetic, so no real person's location is stored here.
'use strict';
const fs = require('fs'), path = require('path'), assert = require('assert');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// --- pull the code under test out of the page, by function markers rather than line numbers ---
function cut(from, to) { const a = html.indexOf(from), b = html.indexOf(to, a); if (a < 0 || b < 0) throw new Error('marker not found: ' + from); return html.slice(a, b); }
const C = new Function('module', 'window', 'document', cut("var _t = (typeof window", 'if (typeof module') + '\nreturn CORE;')({}, undefined, undefined);
const page = new Function('C', [
  cut('function vehicleInfo(parsed)', '// ---------- section boundaries'),
  cut('function rideGaps(parsed, G)', 'function actSelf('),
  cut('function actGrid(src)', 'function actWhen('),
  'return { vehicleInfo, rideGaps, actGrid, actParts, actOnRoute, actPick };'].join('\n'))(C);

// --- synthetic tracks: points every 5 s ---
const LAT0 = 24.4, LON0 = 121.3, M_LAT = 1 / 110574, M_LON = 1 / (Math.cos(LAT0 * Math.PI / 180) * 111320);
function Track(t0) { this.p = []; this.t = t0; this.x = 0; this.y = 0; this.z = 1500; }
Track.prototype.push = function () { this.p.push({ lat: LAT0 + this.y * M_LAT, lon: LON0 + this.x * M_LON, ele: this.z, t: this.t }); };
// move dist metres heading (deg, 0 = east) at kmh, climbing grade (rise/run)
Track.prototype.go = function (dist, kmh, heading, grade) {
  const step = kmh / 3.6 * 5, n = Math.max(1, Math.round(dist / step)), h = (heading || 0) * Math.PI / 180;
  if (!this.p.length) this.push();
  for (let i = 0; i < n; i++) { this.x += Math.cos(h) * step; this.y += Math.sin(h) * step; this.z += step * (grade || 0); this.t += 5000; this.push(); }
  return this;
};
// stand still for min minutes: GPS jitter jit metres, height wandering +-zAmp metres
Track.prototype.stay = function (min, jit, zAmp) {
  const n = Math.round(min * 12), x = this.x, y = this.y, z = this.z;
  for (let i = 0; i < n; i++) {
    this.t += 5000;
    this.p.push({ lat: LAT0 + (y + jit * Math.sin(i * 1.7)) * M_LAT, lon: LON0 + (x + jit * Math.cos(i * 2.3)) * M_LON, ele: z + zAmp * Math.sin(i / 9), t: this.t });
  }
  return this;
};
Track.prototype.skip = function (min) { this.t += min * 60000; return this; };   // no points: recording gap or night
const parsed = (tr, name) => ({ name: name || 'synthetic', pts: tr.p.map(q => Object.assign({}, q)), wpts: [] });
const T0 = Date.UTC(2026, 10, 16, 0, 0, 0);

let pass = 0, fail = 0;
function test(name, fn) { try { fn(); pass++; console.log('ok   ' + name); } catch (e) { fail++; console.log('FAIL ' + name + '\n     ' + e.message); } }

// 1. vehicle runs
test('a shuttle ride between two walks is found as a vehicle run and both walks are kept', () => {
  const tr = new Track(T0).go(2000, 4, 0).go(10000, 40, 0).go(2000, 4, 0);
  const vi = page.vehicleInfo(parsed(tr));
  assert(vi.fast > 9000 && vi.fast < 11000, 'fast metres ' + Math.round(vi.fast));
  assert.strictEqual(vi.walks.length, 2, 'walks ' + JSON.stringify(vi.walks));
  assert(vi.fastRuns.length >= 1 && vi.fastRuns[0][4] != null, 'fastRuns carry times');
});
test('trail running at 10 km/h is not a vehicle', () => {
  const tr = new Track(T0).go(1500, 4, 0).go(2000, 10, 0).go(1500, 4, 0);
  assert(page.vehicleInfo(parsed(tr)).fast < 100);
});
test('a ride becomes a gap in the time grid, not walking and not a stop', () => {
  const tr = new Track(T0).go(2000, 4, 0).go(10000, 40, 0).go(2000, 4, 0);
  const src = { parsed: parsed(tr) }, G = page.actGrid(src);
  assert(G && G.rides === 1, 'rides marked');
  const gapMin = G.gap.reduce((s, v) => s + v, 0) * G.step / 60;
  assert(gapMin > 12 && gapMin < 20, 'ride gap minutes ' + gapMin.toFixed(1));   // 10 km at 40 km/h = 15 min
});

// 2. camp drift
test('a 30-min camp stop with drifting GPS height stays a stop', () => {
  const tr = new Track(T0).go(1500, 3, 0, 0.15).stay(30, 6, 15).go(1500, 3, 0, 0.15);
  const G = C.timeGrid(parsed(tr).pts);
  let stopped = 0; for (let k = 0; k < G.n; k++) if (G.stop[k] && !G.gap[k]) stopped++;
  const min = stopped * G.step / 60;
  assert(min > 25 && min < 35, 'stopped minutes ' + min.toFixed(1));
});
test('a slow steep climb (height changes, little horizontal) still counts as walking', () => {
  const tr = new Track(T0).go(300, 3, 0).go(250, 0.5, 0, 0.6).go(300, 3, 0);   // 150 m up in 30 min
  const G = C.timeGrid(parsed(tr).pts);
  let stopped = 0; for (let k = 0; k < G.n; k++) if (G.stop[k] && !G.gap[k]) stopped++;
  assert(stopped * G.step / 60 < 10, 'stopped minutes ' + (stopped * G.step / 60).toFixed(1));
});

// 3. multi-day records
test('a record with a night gap is cut into parts', () => {
  const tr = new Track(T0).go(3000, 3, 0).stay(20, 3, 2).skip(10 * 60).go(3000, 3, 90);
  const parts = page.actParts({ parsed: parsed(tr) });
  assert(parts && parts.length === 2, 'parts ' + (parts && parts.length));
});
test('the part that walks the planned route is picked, not the whole record', () => {
  const day = new Track(T0).go(3000, 3, 0).stay(20, 3, 2).skip(10 * 60).go(3000, 3, 90);
  const plan = new Track(T0).go(3000, 3, 0).go(3000, 3, 90);   // only the second leg is today
  const route = C.buildTrack({ name: 'plan', pts: plan.p.slice(Math.floor(plan.p.length / 2)), wpts: [] }, { smooth: 3, cleanElevation: true });
  const src = { parsed: parsed(day) }, pick = page.actPick(src, route);
  assert(pick !== src && pick.part, 'whole record picked');
  assert.strictEqual(page.actParts(src).indexOf(pick), 1, 'picked part ' + page.actParts(src).indexOf(pick));
});
test('a single-day record is not cut', () => {
  const tr = new Track(T0).go(3000, 3, 0).stay(60, 3, 2).go(3000, 3, 0);
  assert.strictEqual(page.actParts({ parsed: parsed(tr) }), null);
});

// 4. GPS dropouts
test('an 8-min signal dropout while moving is a gap, over the 5-min long-gap line', () => {
  const tr = new Track(T0).go(1500, 3, 0); tr.x += 400; tr.skip(8); tr.go(1500, 3, 0);
  const G = C.timeGrid(parsed(tr).pts);
  assert(G.gapMin > 5, 'gapMin ' + G.gapMin);
});
test('a clean record has no gap', () => {
  const G = C.timeGrid(parsed(new Track(T0).go(3000, 3, 0, 0.1)).pts);
  assert(G.gapMin < 1, 'gapMin ' + G.gapMin);
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exitCode = fail ? 1 : 0;
