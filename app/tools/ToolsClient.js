"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./tools.module.css";

/* ── Helpers ── */
function fmtNum(n, d = 4) {
  if (n == null || !isFinite(n) || isNaN(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e6 || abs < 1e-3) return n.toExponential(3);
  return parseFloat(n.toPrecision(d)).toString();
}
function fmtUnit(v, u) {
  if (v == null || !isFinite(v) || isNaN(v)) return "—";
  const a = Math.abs(v);
  if (u === "Ω") {
    if (a >= 1e6) return fmtNum(v / 1e6) + " MΩ";
    if (a >= 1e3) return fmtNum(v / 1e3) + " kΩ";
    return fmtNum(v) + " Ω";
  }
  if (u === "A") {
    if (a < 1e-3) return fmtNum(v * 1e6) + " µA";
    if (a < 1)    return fmtNum(v * 1e3) + " mA";
    return fmtNum(v) + " A";
  }
  if (u === "V") return fmtNum(v) + " V";
  if (u === "W") {
    if (a < 1e-3) return fmtNum(v * 1e6) + " µW";
    if (a < 1)    return fmtNum(v * 1e3) + " mW";
    return fmtNum(v) + " W";
  }
  return fmtNum(v) + " " + u;
}

/* ── Resistor color data ── */
const COLORS = [
  { name: "Black",  hex: "#111",    digit: 0,    mult: 1,     tol: null },
  { name: "Brown",  hex: "#7c3a18", digit: 1,    mult: 10,    tol: 1    },
  { name: "Red",    hex: "#c0392b", digit: 2,    mult: 100,   tol: 2    },
  { name: "Orange", hex: "#e67e22", digit: 3,    mult: 1e3,   tol: null },
  { name: "Yellow", hex: "#f1c40f", digit: 4,    mult: 1e4,   tol: null },
  { name: "Green",  hex: "#27ae60", digit: 5,    mult: 1e5,   tol: 0.5  },
  { name: "Blue",   hex: "#2980b9", digit: 6,    mult: 1e6,   tol: 0.25 },
  { name: "Violet", hex: "#8e44ad", digit: 7,    mult: 1e7,   tol: 0.1  },
  { name: "Gray",   hex: "#7f8c8d", digit: 8,    mult: 1e8,   tol: 0.05 },
  { name: "White",  hex: "#ddd",    digit: 9,    mult: 1e9,   tol: null },
  { name: "Gold",   hex: "#d4a017", digit: null, mult: 0.1,   tol: 5    },
  { name: "Silver", hex: "#aaa",    digit: null, mult: 0.01,  tol: 10   },
];

const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
function nearestE12(val) {
  if (val <= 0) return null;
  const exp = Math.floor(Math.log10(val));
  const base = val / Math.pow(10, exp);
  let best = E12[E12.length - 1];
  for (const v of E12) { if (v >= base) { best = v; break; } }
  return best * Math.pow(10, exp);
}

const TOL_MAP = {
  B: "±0.1 pF", C: "±0.25 pF", D: "±0.5 pF",
  F: "±1%", G: "±2%", J: "±5%", K: "±10%", M: "±20%", Z: "+80% / -20%",
};

const TABS = [
  { id: "ohm",       label: "Ohm's Law" },
  { id: "resistor",  label: "Resistor Color" },
  { id: "led",       label: "LED Resistor" },
  { id: "divider",   label: "Voltage Divider" },
  { id: "trace",     label: "PCB Trace Width" },
  { id: "impedance", label: "Trace Impedance" },
  { id: "capcode",   label: "Cap Code" },
];

/* ════════════════════════════════════════
   MAIN COMPONENT
═════════════════════════════════════════ */
export default function ToolsClient() {
  const [tab, setTab] = useState("ohm");

  return (
    <div className={s.page}>
      <div className={s.container}>

        <header className={s.header}>
          <div className={s.logoBlock}>
            <div>
              <div className={s.logoTitle}>TOOLS</div>
              <div className={s.logoSub}>Electronics &amp; PCB Calculator Suite</div>
            </div>
          </div>
          <div className={s.headerRight}>
            <div className={s.status}>
              <span className={s.statusDot} />
              <span>7 Modules</span>
            </div>
            <Link href="/" className={s.backLink}>← Home</Link>
          </div>
        </header>

        <nav className={s.tabs}>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              className={`${s.tab} ${tab === t.id ? s.tabActive : ""}`}
              onClick={() => setTab(t.id)}
            >
              <span className={s.tabNum}>0{i + 1}</span>{t.label}
            </button>
          ))}
        </nav>

        {tab === "ohm"       && <OhmCalc />}
        {tab === "resistor"  && <ResistorCalc />}
        {tab === "led"       && <LedCalc />}
        {tab === "divider"   && <DividerCalc />}
        {tab === "trace"     && <TraceCalc />}
        {tab === "impedance" && <ImpedanceCalc />}
        {tab === "capcode"   && <CapCodeCalc />}

        <footer className={s.footer}>
          <div>Noobsbot Tools · Electronics &amp; PCB Calculator Suite</div>
          <div className={s.tagRow}>
            <span className={s.tag}>IPC-2221</span>
            <span className={s.tag}>IEC 60062</span>
            <span className={s.tag}>SI Units</span>
            <span className={s.tag}>E12 Series</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   1. OHM'S LAW
═════════════════════════════════════════ */
function OhmCalc() {
  const [v, setV] = useState(""); const [iV, setIV] = useState(""); const [iU, setIU] = useState(1);
  const [r, setR] = useState(""); const [rU, setRU] = useState(1);
  const [p, setP] = useState(""); const [pU, setPU] = useState(1);

  const vN = parseFloat(v);
  const iN = parseFloat(iV) * iU;
  const rN = parseFloat(r) * rU;
  const pN = parseFloat(p) * pU;

  let rv = isNaN(vN) ? null : vN;
  let ri = isNaN(iN) ? null : iN;
  let rr = isNaN(rN) ? null : rN;
  let rp = isNaN(pN) ? null : pN;

  const filled = [rv, ri, rr, rp].filter(x => x !== null).length;
  let note = "Enter any two values to compute the others.";

  if (filled >= 2) {
    try {
      if (rv !== null && ri !== null) { rr = rv / ri; rp = rv * ri; }
      else if (rv !== null && rr !== null) { ri = rv / rr; rp = rv * rv / rr; }
      else if (rv !== null && rp !== null) { ri = rp / rv; rr = rv * rv / rp; }
      else if (ri !== null && rr !== null) { rv = ri * rr; rp = ri * ri * rr; }
      else if (ri !== null && rp !== null) { rv = rp / ri; rr = rp / (ri * ri); }
      else if (rr !== null && rp !== null) { rv = Math.sqrt(rp * rr); ri = Math.sqrt(rp / rr); }
      note = "Computed using V = IR and P = VI";
    } catch { note = "Invalid input combination."; }
  }

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>Ohm&apos;s Law Calculator</div>
        <div className={s.calcDesc}>Enter any two values. Voltage, current, resistance, and power are computed automatically using V = IR and P = VI.</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Inputs</div>
          <Field label="Voltage (V)">
            <input className={s.input} type="number" value={v} onChange={e => setV(e.target.value)} placeholder="e.g. 12" step="any" />
          </Field>
          <Field label="Current (I)">
            <div className={s.inputRow}>
              <input className={s.input} type="number" value={iV} onChange={e => setIV(e.target.value)} placeholder="e.g. 0.5" step="any" />
              <select className={s.unitSelect} value={iU} onChange={e => setIU(parseFloat(e.target.value))}>
                <option value={1}>A</option><option value={0.001}>mA</option><option value={0.000001}>µA</option>
              </select>
            </div>
          </Field>
          <Field label="Resistance (R)">
            <div className={s.inputRow}>
              <input className={s.input} type="number" value={r} onChange={e => setR(e.target.value)} placeholder="e.g. 220" step="any" />
              <select className={s.unitSelect} value={rU} onChange={e => setRU(parseFloat(e.target.value))}>
                <option value={1}>Ω</option><option value={1000}>kΩ</option><option value={1000000}>MΩ</option>
              </select>
            </div>
          </Field>
          <Field label="Power (P)">
            <div className={s.inputRow}>
              <input className={s.input} type="number" value={p} onChange={e => setP(e.target.value)} placeholder="e.g. 6" step="any" />
              <select className={s.unitSelect} value={pU} onChange={e => setPU(parseFloat(e.target.value))}>
                <option value={1}>W</option><option value={0.001}>mW</option><option value={1000}>kW</option>
              </select>
            </div>
          </Field>
          <button className={s.btn} onClick={() => { setV(""); setIV(""); setR(""); setP(""); }}>Clear All</button>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Results</div>
          <OutputRow k="Voltage"    v={fmtUnit(rv, "V")} />
          <OutputRow k="Current"    v={fmtUnit(ri, "A")} />
          <OutputRow k="Resistance" v={fmtUnit(rr, "Ω")} />
          <OutputRow k="Power"      v={fmtUnit(rp, "W")} />
          <div className={`${s.note} ${s.noteInfo}`}>{note}</div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   2. RESISTOR COLOR CODE
═════════════════════════════════════════ */
function ResistorCalc() {
  const [count, setCount] = useState(4);
  const [bands, setBands] = useState([2, 2, 1, 10]); // 220Ω ±5%

  const handleCountChange = (n) => {
    setCount(n);
    setBands(n === 4 ? [2, 2, 1, 10] : [1, 0, 0, 1, 1]);
  };
  const setBand = (i, val) => {
    const next = [...bands]; next[i] = parseInt(val); setBands(next);
  };

  const isDigit = (ci) => COLORS[ci]?.digit !== null;
  const hasTol  = (ci) => COLORS[ci]?.tol !== null;
  const hasMult = (ci) => ci < COLORS.length;

  let value = 0, tol = null;
  if (count === 4 && bands.length >= 4) {
    const [b0,b1,b2,b3] = bands;
    if (isDigit(b0) && isDigit(b1)) {
      value = (COLORS[b0].digit * 10 + COLORS[b1].digit) * COLORS[b2].mult;
      tol = COLORS[b3]?.tol;
    }
  } else if (count === 5 && bands.length >= 5) {
    const [b0,b1,b2,b3,b4] = bands;
    if (isDigit(b0) && isDigit(b1) && isDigit(b2)) {
      value = (COLORS[b0].digit * 100 + COLORS[b1].digit * 10 + COLORS[b2].digit) * COLORS[b3].mult;
      tol = COLORS[b4]?.tol;
    }
  }

  const bandPositions = count === 4 ? [70, 100, 130, 200] : [65, 90, 115, 140, 200];
  const bandColors = bands.map(b => COLORS[b]?.hex || "#555");

  const digitOpts = COLORS.map((c, i) => c.digit !== null && <option key={i} value={i}>{c.name}</option>);
  const multOpts  = COLORS.map((c, i) => <option key={i} value={i}>{c.name}</option>);
  const tolOpts   = COLORS.map((c, i) => c.tol !== null && <option key={i} value={i}>{c.name}</option>);

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>Resistor Color Code Decoder</div>
        <div className={s.calcDesc}>Select band colors to decode resistance and tolerance. Supports 4-band and 5-band resistors per IEC 60062.</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Configuration</div>
          <Field label="Band Count">
            <select className={s.input} value={count} onChange={e => handleCountChange(parseInt(e.target.value))}>
              <option value={4}>4 Bands</option>
              <option value={5}>5 Bands</option>
            </select>
          </Field>
          <div className={s.bandSelectors}>
            {count === 4 ? <>
              <Field label="Band 1 (digit)">
                <select className={s.input} value={bands[0]} onChange={e => setBand(0, e.target.value)}>{digitOpts}</select>
              </Field>
              <Field label="Band 2 (digit)">
                <select className={s.input} value={bands[1]} onChange={e => setBand(1, e.target.value)}>{digitOpts}</select>
              </Field>
              <Field label="Band 3 (multiplier)">
                <select className={s.input} value={bands[2]} onChange={e => setBand(2, e.target.value)}>{multOpts}</select>
              </Field>
              <Field label="Band 4 (tolerance)">
                <select className={s.input} value={bands[3]} onChange={e => setBand(3, e.target.value)}>{tolOpts}</select>
              </Field>
            </> : <>
              <Field label="Band 1 (digit)"><select className={s.input} value={bands[0]} onChange={e => setBand(0, e.target.value)}>{digitOpts}</select></Field>
              <Field label="Band 2 (digit)"><select className={s.input} value={bands[1]} onChange={e => setBand(1, e.target.value)}>{digitOpts}</select></Field>
              <Field label="Band 3 (digit)"><select className={s.input} value={bands[2]} onChange={e => setBand(2, e.target.value)}>{digitOpts}</select></Field>
              <Field label="Band 4 (multiplier)"><select className={s.input} value={bands[3]} onChange={e => setBand(3, e.target.value)}>{multOpts}</select></Field>
              <Field label="Band 5 (tolerance)"><select className={s.input} value={bands[4]} onChange={e => setBand(4, e.target.value)}>{tolOpts}</select></Field>
            </>}
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Visualization</div>
          <div className={s.resistorWrap}>
            <svg width="280" height="100" viewBox="0 0 280 100">
              <line x1="10" y1="50" x2="50" y2="50" stroke="#eab308" strokeWidth="2"/>
              <line x1="230" y1="50" x2="270" y2="50" stroke="#eab308" strokeWidth="2"/>
              <rect x="50" y="32" width="180" height="36" fill="#c8a96e" stroke="#9a7a4a" strokeWidth="1" rx="14"/>
              {bandPositions.map((x, i) => (
                <rect key={i} x={x} y="32" width="10" height="36" fill={bandColors[i] || "#555"} stroke="#000" strokeWidth="0.5"/>
              ))}
            </svg>
          </div>
          <div className={s.output}>
            <div className={s.outputLabel}>Resistance</div>
            <div className={s.outputValue}>{fmtUnit(value, "Ω")}</div>
          </div>
          <div className={s.output} style={{ marginTop: 8 }}>
            <div className={s.outputLabel}>Tolerance</div>
            <div className={s.outputValue}>{tol !== null ? `±${tol}%` : "—"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   3. LED RESISTOR
═════════════════════════════════════════ */
function LedCalc() {
  const [vs, setVs]     = useState("5");
  const [vf, setVf]     = useState("2.0");
  const [ifma, setIfma] = useState("20");
  const [n, setN]       = useState("1");

  const vsN = parseFloat(vs), vfN = parseFloat(vf), ifN = parseFloat(ifma) / 1000;
  const nN = parseInt(n) || 1;
  const drop = vsN - vfN * nN;
  const valid = isFinite(vsN) && isFinite(vfN) && isFinite(ifN) && ifN > 0 && drop > 0;
  const r     = valid ? drop / ifN : null;
  const stdR  = r ? nearestE12(r) : null;
  const power = valid ? drop * ifN : null;
  const rating = power != null ? (power < 0.125 ? "1/8 W" : power < 0.25 ? "1/4 W" : power < 0.5 ? "1/2 W" : power < 1 ? "1 W" : (Math.ceil(power * 2) / 2) + " W") : null;

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>LED Series Resistor</div>
        <div className={s.calcDesc}>Calculate the correct current-limiting resistor for an LED based on supply voltage, forward voltage, and desired forward current.</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// LED Parameters</div>
          <Field label="Supply Voltage (Vs)"><input className={s.input} type="number" value={vs} onChange={e => setVs(e.target.value)} step="any" /></Field>
          <Field label="LED Forward Voltage (Vf)"><input className={s.input} type="number" value={vf} onChange={e => setVf(e.target.value)} step="any" /></Field>
          <Field label="LED Forward Current (If) — mA"><input className={s.input} type="number" value={ifma} onChange={e => setIfma(e.target.value)} step="any" /></Field>
          <Field label="LEDs in Series"><input className={s.input} type="number" value={n} onChange={e => setN(e.target.value)} min="1" /></Field>
          <div className={s.note}>Typical Vf: Red 1.8–2.1V · Yellow/Green 2.0–2.4V · Blue/White 3.0–3.4V</div>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Output</div>
          <div className={s.diagram}>
            <svg width="260" height="120" viewBox="0 0 260 120">
              <line x1="10" y1="60" x2="60" y2="60" stroke="#eab308" strokeWidth="2"/>
              <text x="10" y="50" fill="#94a3b8" fontFamily="monospace" fontSize="11">Vs+</text>
              <rect x="60" y="50" width="50" height="20" fill="none" stroke="#eab308" strokeWidth="2"/>
              <text x="68" y="44" fill="#eab308" fontFamily="monospace" fontSize="10">R</text>
              <line x1="110" y1="60" x2="140" y2="60" stroke="#eab308" strokeWidth="2"/>
              <polygon points="140,50 140,70 160,60" fill="#eab308" stroke="#eab308" strokeWidth="2"/>
              <line x1="160" y1="48" x2="160" y2="72" stroke="#eab308" strokeWidth="2"/>
              <line x1="155" y1="42" x2="160" y2="48" stroke="#eab308" strokeWidth="1"/>
              <line x1="160" y1="42" x2="165" y2="48" stroke="#eab308" strokeWidth="1"/>
              <text x="138" y="92" fill="#94a3b8" fontFamily="monospace" fontSize="11">LED</text>
              <line x1="160" y1="60" x2="220" y2="60" stroke="#eab308" strokeWidth="2"/>
              <line x1="220" y1="55" x2="220" y2="65" stroke="#eab308" strokeWidth="2"/>
              <line x1="215" y1="68" x2="225" y2="68" stroke="#eab308" strokeWidth="2"/>
              <line x1="217" y1="71" x2="223" y2="71" stroke="#eab308" strokeWidth="2"/>
              <text x="210" y="50" fill="#94a3b8" fontFamily="monospace" fontSize="11">GND</text>
            </svg>
          </div>
          {drop <= 0 && isFinite(vsN) && <div className={s.note}>Supply voltage too low for {nN} LED(s) in series.</div>}
          <OutputRow k="Required R"        v={r ? fmtUnit(r, "Ω") : "—"} />
          <OutputRow k="Standard E12"      v={stdR ? fmtUnit(stdR, "Ω") : "—"} />
          <OutputRow k="Power Dissipated"  v={power ? fmtUnit(power, "W") : "—"} />
          <OutputRow k="Min Resistor Rating" v={rating || "—"} />
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   4. VOLTAGE DIVIDER
═════════════════════════════════════════ */
function DividerCalc() {
  const [vin, setVin]   = useState("12");
  const [r1, setR1]     = useState("10"); const [r1u, setR1u] = useState(1000);
  const [r2, setR2]     = useState("10"); const [r2u, setR2u] = useState(1000);

  const vinN = parseFloat(vin);
  const r1N  = parseFloat(r1) * r1u;
  const r2N  = parseFloat(r2) * r2u;
  const valid = isFinite(vinN) && isFinite(r1N) && isFinite(r2N) && (r1N + r2N) > 0;
  const vout  = valid ? vinN * r2N / (r1N + r2N) : null;
  const i     = valid ? vinN / (r1N + r2N) : null;
  const p1    = i && r1N ? i * i * r1N : null;
  const p2    = i && r2N ? i * i * r2N : null;

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>Voltage Divider</div>
        <div className={s.calcDesc}>Compute the output voltage of a two-resistor divider. Vout = Vin × R2 / (R1 + R2).</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Inputs</div>
          <Field label="Input Voltage (Vin)"><input className={s.input} type="number" value={vin} onChange={e => setVin(e.target.value)} step="any" /></Field>
          <Field label="R1">
            <div className={s.inputRow}>
              <input className={s.input} type="number" value={r1} onChange={e => setR1(e.target.value)} step="any" />
              <select className={s.unitSelect} value={r1u} onChange={e => setR1u(parseFloat(e.target.value))}>
                <option value={1}>Ω</option><option value={1000}>kΩ</option><option value={1000000}>MΩ</option>
              </select>
            </div>
          </Field>
          <Field label="R2">
            <div className={s.inputRow}>
              <input className={s.input} type="number" value={r2} onChange={e => setR2(e.target.value)} step="any" />
              <select className={s.unitSelect} value={r2u} onChange={e => setR2u(parseFloat(e.target.value))}>
                <option value={1}>Ω</option><option value={1000}>kΩ</option><option value={1000000}>MΩ</option>
              </select>
            </div>
          </Field>
          <div className={s.diagram}>
            <svg width="200" height="180" viewBox="0 0 200 180">
              <line x1="100" y1="10" x2="100" y2="40" stroke="#eab308" strokeWidth="2"/>
              <text x="110" y="25" fill="#94a3b8" fontFamily="monospace" fontSize="11">Vin</text>
              <rect x="85" y="40" width="30" height="40" fill="none" stroke="#eab308" strokeWidth="2"/>
              <text x="125" y="65" fill="#eab308" fontFamily="monospace" fontSize="11">R1</text>
              <line x1="100" y1="80" x2="100" y2="90" stroke="#eab308" strokeWidth="2"/>
              <line x1="100" y1="90" x2="160" y2="90" stroke="#eab308" strokeWidth="2"/>
              <text x="165" y="94" fill="#f59e0b" fontFamily="monospace" fontSize="11">Vout</text>
              <line x1="100" y1="90" x2="100" y2="100" stroke="#eab308" strokeWidth="2"/>
              <rect x="85" y="100" width="30" height="40" fill="none" stroke="#eab308" strokeWidth="2"/>
              <text x="125" y="125" fill="#eab308" fontFamily="monospace" fontSize="11">R2</text>
              <line x1="100" y1="140" x2="100" y2="155" stroke="#eab308" strokeWidth="2"/>
              <line x1="90" y1="155" x2="110" y2="155" stroke="#eab308" strokeWidth="2"/>
              <line x1="93" y1="160" x2="107" y2="160" stroke="#eab308" strokeWidth="2"/>
              <line x1="96" y1="165" x2="104" y2="165" stroke="#eab308" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Output</div>
          <OutputRow k="Vout"        v={fmtUnit(vout, "V")} />
          <OutputRow k="Current Draw" v={fmtUnit(i, "A")} />
          <OutputRow k="Power in R1" v={fmtUnit(p1, "W")} />
          <OutputRow k="Power in R2" v={fmtUnit(p2, "W")} />
          <OutputRow k="Total Power" v={fmtUnit(p1 != null && p2 != null ? p1 + p2 : null, "W")} />
          <div className={s.note}>Load resistance should be ≥ 10× R2 for accuracy; otherwise account for load in calculations.</div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   5. PCB TRACE WIDTH
═════════════════════════════════════════ */
function TraceCalc() {
  const [i, setI]         = useState("1");
  const [trise, setTrise] = useState("10");
  const [tamb, setTamb]   = useState("25");
  const [len, setLen]     = useState("100");
  const [cu, setCu]       = useState(1);
  const [layer, setLayer] = useState("external");

  const iN = parseFloat(i), trN = parseFloat(trise), taN = parseFloat(tamb);
  const lenN = parseFloat(len), cuN = parseFloat(cu);

  let widthMm = null, widthMils = null, areaMils2 = null, resistance = null, vdrop = null, ploss = null;

  if (isFinite(iN) && isFinite(trN) && trN > 0 && isFinite(cuN)) {
    const k = layer === "external" ? 0.048 : 0.024;
    areaMils2  = Math.pow(iN / (k * Math.pow(trN, 0.44)), 1 / 0.725);
    const thk  = cuN * 1.378;
    widthMils  = areaMils2 / thk;
    widthMm    = widthMils * 0.0254;
    if (isFinite(lenN) && lenN > 0) {
      const rho  = 1.68e-8 * (1 + 0.00393 * (taN + trN - 20));
      const aM2  = areaMils2 * 6.4516e-10;
      const lenM = lenN / 1000;
      resistance = rho * lenM / aM2;
      vdrop = iN * resistance;
      ploss = iN * vdrop;
    }
  }

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>PCB Trace Width Calculator</div>
        <div className={s.calcDesc}>Minimum trace width per IPC-2221 standard. Considers copper thickness, ambient temperature, and allowed temperature rise.</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Parameters</div>
          <Field label="Current (A)"><input className={s.input} type="number" value={i} onChange={e => setI(e.target.value)} step="any" /></Field>
          <Field label="Temperature Rise (°C)"><input className={s.input} type="number" value={trise} onChange={e => setTrise(e.target.value)} step="any" /></Field>
          <Field label="Ambient Temperature (°C)"><input className={s.input} type="number" value={tamb} onChange={e => setTamb(e.target.value)} step="any" /></Field>
          <Field label="Trace Length (mm)"><input className={s.input} type="number" value={len} onChange={e => setLen(e.target.value)} step="any" /></Field>
          <Field label="Copper Weight (oz/ft²)">
            <select className={s.input} value={cu} onChange={e => setCu(parseFloat(e.target.value))}>
              <option value={0.5}>0.5 oz</option><option value={1}>1 oz</option>
              <option value={2}>2 oz</option><option value={3}>3 oz</option>
            </select>
          </Field>
          <Field label="Layer">
            <select className={s.input} value={layer} onChange={e => setLayer(e.target.value)}>
              <option value="external">External (outer layer)</option>
              <option value="internal">Internal (inner layer)</option>
            </select>
          </Field>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Required Width &amp; Properties</div>
          <OutputRow k="Min Trace Width"       v={widthMm   ? fmtNum(widthMm) + " mm"    : "—"} />
          <OutputRow k="Width (mils)"          v={widthMils ? fmtNum(widthMils) + " mils" : "—"} />
          <OutputRow k="Cross-Sectional Area"  v={areaMils2 ? fmtNum(areaMils2) + " mils²" : "—"} />
          <OutputRow k="Resistance"            v={fmtUnit(resistance, "Ω")} />
          <OutputRow k="Voltage Drop"          v={fmtUnit(vdrop, "V")} />
          <OutputRow k="Power Loss"            v={fmtUnit(ploss, "W")} />
          <div className={s.note}>Per IPC-2221: A = (I / (k × ΔT^0.44))^(1/0.725). Add safety margin for high-power or high-reliability designs.</div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   6. MICROSTRIP IMPEDANCE
═════════════════════════════════════════ */
function ImpedanceCalc() {
  const [w, setW]   = useState("0.3");
  const [t, setT]   = useState("0.035");
  const [h, setH]   = useState("0.2");
  const [er, setEr] = useState("4.3");

  const wN = parseFloat(w), tN = parseFloat(t), hN = parseFloat(h), erN = parseFloat(er);
  let z0 = null, eeff = null, propDelay = null, wavelen = null;

  if (isFinite(wN) && wN > 0 && isFinite(hN) && hN > 0 && isFinite(erN) && erN > 0) {
    const u = wN / hN;
    const a = 1 + (1/49) * Math.log((Math.pow(u,4) + Math.pow(u/52,2)) / (Math.pow(u,4) + 0.432)) +
              (1/18.7) * Math.log(1 + Math.pow(u/18.1, 3));
    const b = 0.564 * Math.pow((erN - 0.9) / (erN + 3), 0.053);
    eeff = (erN+1)/2 + ((erN-1)/2) * Math.pow(1 + 10/u, -a*b);
    const f = 6 + (2*Math.PI - 6) * Math.exp(-Math.pow(30.666/u, 0.7528));
    z0 = (60 / Math.sqrt(eeff)) * Math.log(f/u + Math.sqrt(1 + Math.pow(2/u, 2)));
    propDelay = Math.sqrt(eeff) / 3e8 * 1e9;
    wavelen   = 3e8 / (1e9 * Math.sqrt(eeff)) * 1000;
  }

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>Microstrip Impedance Calculator</div>
        <div className={s.calcDesc}>Estimate characteristic impedance (Z₀) of a microstrip transmission line. Used for impedance-controlled routing on outer layers (USB, HDMI, RF).</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Geometry</div>
          <Field label="Trace Width W (mm)"><input className={s.input} type="number" value={w} onChange={e => setW(e.target.value)} step="any" /></Field>
          <Field label="Trace Thickness T (mm)"><input className={s.input} type="number" value={t} onChange={e => setT(e.target.value)} step="any" /></Field>
          <Field label="Substrate Height H (mm)"><input className={s.input} type="number" value={h} onChange={e => setH(e.target.value)} step="any" /></Field>
          <Field label="Dielectric Constant εr">
            <input className={s.input} type="number" value={er} onChange={e => setEr(e.target.value)} step="any" />
            <div className={`${s.note} ${s.noteSmall}`}>FR-4 ≈ 4.3 · Rogers RO4350 ≈ 3.66 · PTFE ≈ 2.1</div>
          </Field>
          <div className={s.diagram}>
            <svg width="240" height="120" viewBox="0 0 240 120">
              <rect x="20" y="60" width="200" height="40" fill="none" stroke="#475569" strokeWidth="1.5"/>
              <text x="22" y="116" fill="#475569" fontFamily="monospace" fontSize="10">Substrate (εr)</text>
              <rect x="20" y="100" width="200" height="6" fill="#eab308" opacity="0.6"/>
              <text x="170" y="116" fill="#eab308" fontFamily="monospace" fontSize="10">GND</text>
              <rect x="100" y="48" width="40" height="12" fill="#f59e0b" opacity="0.8"/>
              <text x="106" y="42" fill="#f59e0b" fontFamily="monospace" fontSize="10">W</text>
              <line x1="160" y1="48" x2="170" y2="48" stroke="#475569" strokeWidth="1"/>
              <line x1="160" y1="60" x2="170" y2="60" stroke="#475569" strokeWidth="1"/>
              <line x1="165" y1="48" x2="165" y2="60" stroke="#475569" strokeWidth="1"/>
              <text x="173" y="58" fill="#475569" fontFamily="monospace" fontSize="9">T</text>
              <line x1="180" y1="60" x2="195" y2="60" stroke="#475569" strokeWidth="1"/>
              <line x1="180" y1="100" x2="195" y2="100" stroke="#475569" strokeWidth="1"/>
              <line x1="187" y1="60" x2="187" y2="100" stroke="#475569" strokeWidth="1"/>
              <text x="198" y="84" fill="#475569" fontFamily="monospace" fontSize="9">H</text>
            </svg>
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Output</div>
          <div className={s.output}>
            <div className={s.outputLabel}>Characteristic Impedance Z₀</div>
            <div className={s.outputValue}>{z0 ? fmtNum(z0) + " Ω" : "—"}</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <OutputRow k="Effective εr"       v={eeff     ? fmtNum(eeff)     : "—"} />
            <OutputRow k="Propagation Delay"  v={propDelay ? fmtNum(propDelay) + " ns/m" : "—"} />
            <OutputRow k="Wavelength @ 1GHz"  v={wavelen   ? fmtNum(wavelen)  + " mm"  : "—"} />
          </div>
          <div className={s.note}>Common targets: 50Ω single-ended (RF), 90Ω differential (USB), 100Ω differential (Ethernet/HDMI). Verify with a field solver for production designs.</div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   7. CAPACITOR CODE DECODER
═════════════════════════════════════════ */
function CapCodeCalc() {
  const [code, setCode] = useState("104");
  const [tol, setTol]   = useState("K");

  let pf = NaN;
  const trimmed = code.trim();
  if (/^\d{3}$/.test(trimmed)) {
    pf = parseInt(trimmed.slice(0, 2)) * Math.pow(10, parseInt(trimmed.charAt(2)));
  } else if (/^\d{2}$/.test(trimmed)) {
    pf = parseInt(trimmed);
  }

  const nf  = isFinite(pf) ? pf / 1000   : null;
  const uf  = isFinite(pf) ? pf / 1e6    : null;
  const pretty = uf != null ? (uf >= 1 ? fmtNum(uf) + " µF" : nf >= 1 ? fmtNum(nf) + " nF" : fmtNum(pf) + " pF") : "—";

  return (
    <section>
      <div className={s.calcHeader}>
        <div className={s.calcTitle}>Capacitor Code Decoder</div>
        <div className={s.calcDesc}>Decode 3-digit ceramic capacitor codes (e.g. 104, 472, 222) to pF, nF, and µF.</div>
      </div>
      <div className={s.grid}>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Input</div>
          <Field label="3-Digit Code">
            <input className={s.input} type="text" value={code} onChange={e => setCode(e.target.value)} maxLength={4} placeholder="e.g. 104" />
          </Field>
          <Field label="Tolerance Letter (optional)">
            <select className={s.input} value={tol} onChange={e => setTol(e.target.value)}>
              <option value="">—</option>
              <option value="B">B (±0.1pF)</option><option value="C">C (±0.25pF)</option>
              <option value="D">D (±0.5pF)</option><option value="F">F (±1%)</option>
              <option value="G">G (±2%)</option><option value="J">J (±5%)</option>
              <option value="K">K (±10%)</option><option value="M">M (±20%)</option>
              <option value="Z">Z (+80%/-20%)</option>
            </select>
          </Field>
          <div className={`${s.note} ${s.noteInfo}`}>
            Format: First two digits = significant figures · Third digit = zeros multiplier · Result in pF.
            <br/><br/>
            Example: <span className={s.accentStrong}>104</span> = 10 × 10⁴ pF = 100 nF = 0.1 µF
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.panelLabel}>// Decoded Value</div>
          <div className={s.output}>
            <div className={s.outputLabel}>Capacitance</div>
            <div className={s.outputValue}>{pretty}</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <OutputRow k="Picofarads"  v={isFinite(pf) ? fmtNum(pf) + " pF"  : "—"} />
            <OutputRow k="Nanofarads" v={nf != null    ? fmtNum(nf) + " nF"  : "—"} />
            <OutputRow k="Microfarads" v={uf != null   ? fmtNum(uf) + " µF"  : "—"} />
            <OutputRow k="Tolerance"   v={TOL_MAP[tol] || "—"} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Shared sub-components ── */
function Field({ label, children }) {
  return (
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function OutputRow({ k, v }) {
  return (
    <div className={s.outputRow}>
      <span className={s.rowKey}>{k}</span>
      <span className={s.rowVal}>{v}</span>
    </div>
  );
}
