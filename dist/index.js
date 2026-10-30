import { jsx as n, Fragment as x, jsxs as i } from "react/jsx-runtime";
import { useMemo as Ha, useContext as pe, createContext as $e, useState as v, useEffect as S, useCallback as Z, useRef as f, useLayoutEffect as Qe, useId as y, Fragment as Fa, isValidElement as Tl, Children as za } from "react";
import { createPortal as Ll, flushSync as Wa } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Qn = (e) => String(e).padStart(2, "0");
function Tn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Qn(t % 60)}s` : `${Math.floor(a / 60)}h ${Qn(a % 60)}m`;
}
const Ml = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function me(e) {
  const t = Ml.formatToParts(new Date(e)), a = (r) => {
    var l;
    return ((l = t.find((o) => o.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${a("day")} ${a("month")} ${a("hour")}:${a("minute")}`;
}
function le(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function ne(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Ka(e, t) {
  return `${e} / ${t}`;
}
const Al = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Il(e) {
  return Al.format(new Date(e));
}
const Ga = $e(/* @__PURE__ */ new Set());
function NL({ hidden: e, children: t }) {
  const a = Ha(() => new Set(e), [e]);
  return /* @__PURE__ */ n(Ga.Provider, { value: a, children: t });
}
function El(e) {
  return !pe(Ga).has(e);
}
function kL({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: El(e) ? t : a });
}
const Bl = "(prefers-color-scheme: dark)", Pl = "(prefers-contrast: more)";
function Xn(e) {
  return typeof window.matchMedia == "function" ? window.matchMedia(e) : null;
}
function Zn(e, t) {
  const [a, r] = v(() => {
    var l;
    return ((l = Xn(e)) == null ? void 0 : l.matches) === !0;
  });
  return S(() => {
    const l = t ? Xn(e) : null;
    if (!l) return;
    const o = () => r(l.matches);
    return o(), l.addEventListener("change", o), () => l.removeEventListener("change", o);
  }, [e, t]), a;
}
function Ct(e, t) {
  S(() => {
    if (t === null) return;
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function jl(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function Ol(e, t) {
  return e === "system" ? t ? "more" : null : e === "more" ? "more" : null;
}
function $L({ theme: e, accent: t = "green", density: a = "comfortable", contrast: r = "standard", children: l }) {
  const o = Zn(Bl, e === "system"), s = Zn(Pl, r === "system");
  return Ct("data-theme", jl(e, o)), Ct("data-accent", t), Ct("data-density", a), Ct("data-contrast", Ol(r, s)), /* @__PURE__ */ n(x, { children: l });
}
const Dl = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function ql(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function Hl(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Fl(e, t, a, r) {
  return e.shiftKey ? ql(t, a) ? r : void 0 : document.activeElement === r || Hl(t) ? a : void 0;
}
function zl(e, t, a) {
  const r = a[0], l = a[a.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const o = Fl(e, t, r, l);
  o && (e.preventDefault(), o.focus());
}
function Wl(e) {
  return { onKeyDown: Z(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Dl));
      zl(a, e.current, r);
    },
    [e]
  ) };
}
function CL(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var l, o;
      (o = (l = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : l.focus) == null || o.call(l);
    };
  }, [t, e]);
}
const ea = { ArrowUp: -1, ArrowDown: 1 }, ta = { ArrowLeft: -1, ArrowRight: 1 }, Kl = (e, t, a) => Math.min(a, Math.max(t, e));
function Gl(e, t) {
  if (t !== "horizontal" && e in ea) return ea[e];
  if (t !== "vertical" && e in ta) return ta[e];
}
function Jt({ orientation: e = "both" } = {}) {
  const [t, a] = v(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  Qe(() => {
    var _;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = l.current;
    l.current = !1, a(h), w && ((_ = r.current.get(h)) == null || _.focus());
  });
  const o = Z((u) => a(u), []), s = Z((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Z(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), _ = Gl(u.key, e);
      _ !== void 0 ? (u.preventDefault(), s(h[Kl(w + _, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = Z(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (l.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: o };
}
const SL = (e, t, a) => {
  const r = new EventSource(e), l = (o) => a.onEvent(o.data, o.lastEventId, o.type);
  r.onmessage = l;
  for (const o of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(o, l);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, RL = "0.2.0", xL = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ul = [1, 2, 3, 4, 5, 6], Ua = [1, 2, 3], Vl = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], TL = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], LL = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], ML = [{ name: "standard", label: "Standard" }, { name: "more", label: "High" }], P = {
  color: {
    bg: "var(--ward-color-bg)",
    ground: "var(--ward-color-ground)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
    panelEdge: "var(--ward-color-panelEdge)",
    inset: "var(--ward-color-inset)",
    insetEdge: "var(--ward-color-insetEdge)",
    text: "var(--ward-color-text)",
    muted: "var(--ward-color-muted)",
    faint: "var(--ward-color-faint)",
    runningTint: "var(--ward-color-runningTint)",
    accentTint: "var(--ward-color-accentTint)",
    console: "var(--ward-color-console)",
    consoleInk: "var(--ward-color-consoleInk)",
    consoleWarn: "var(--ward-color-consoleWarn)",
    consoleOk: "var(--ward-color-consoleOk)",
    consoleFaint: "var(--ward-color-consoleFaint)",
    overcapTint: "var(--ward-color-overcapTint)",
    scrim: "var(--ward-color-scrim)",
    consoleInfo: "var(--ward-color-consoleInfo)",
    consoleDim: "var(--ward-color-consoleDim)",
    line3: "var(--ward-color-line3)",
    ink2: "var(--ward-color-ink2)",
    surface3: "var(--ward-color-surface3)",
    series1: "var(--ward-color-series1)",
    series2: "var(--ward-color-series2)",
    series3: "var(--ward-color-series3)",
    series4: "var(--ward-color-series4)",
    series5: "var(--ward-color-series5)",
    series6: "var(--ward-color-series6)",
    selected: "var(--ward-color-selected)",
    link: "var(--ward-color-link)",
    focus: "var(--ward-color-focus)",
    sage: "var(--ward-color-sage)",
    sageTint: "var(--ward-color-sageTint)",
    sageInk: "var(--ward-color-sageInk)",
    peach: "var(--ward-color-peach)",
    peachTint: "var(--ward-color-peachTint)",
    peachInk: "var(--ward-color-peachInk)",
    running: "var(--ward-color-running)",
    waiting: "var(--ward-color-waiting)",
    waitingTint: "var(--ward-color-waitingTint)",
    waitingLine: "var(--ward-color-waitingLine)",
    done: "var(--ward-color-done)",
    doneTint: "var(--ward-color-doneTint)",
    danger: "var(--ward-color-danger)",
    dangerTint: "var(--ward-color-dangerTint)",
    chartBar: "var(--ward-color-chartBar)",
    chartLine: "var(--ward-color-chartLine)",
    chartIdeal: "var(--ward-color-chartIdeal)",
    laneTint: "var(--ward-color-laneTint)",
    gateLaneTint: "var(--ward-color-gateLaneTint)",
    hover: "var(--ward-color-hover)",
    tableHead: "var(--ward-color-tableHead)",
    blue: "var(--ward-color-blue)",
    blueSoft: "var(--ward-color-blueSoft)",
    accentPill: "var(--ward-color-accentPill)",
    green: "var(--ward-color-green)",
    greenFill: "var(--ward-color-greenFill)",
    orange: "var(--ward-color-orange)",
    orangeFill: "var(--ward-color-orangeFill)",
    amber: "var(--ward-color-amber)",
    warning: "var(--ward-color-warning)",
    warnInk: "var(--ward-color-warnInk)",
    warnSurface: "var(--ward-color-warnSurface)",
    warnLine: "var(--ward-color-warnLine)",
    red: "var(--ward-color-red)",
    destructive: "var(--ward-color-destructive)",
    deep: "var(--ward-color-deep)"
  },
  chip: {
    gate: {
      bg: "var(--ward-chip-gate-bg)",
      fg: "var(--ward-chip-gate-fg)",
      line: "var(--ward-chip-gate-line)"
    },
    system: {
      bg: "var(--ward-chip-system-bg)",
      fg: "var(--ward-chip-system-fg)",
      line: "var(--ward-chip-system-line)"
    },
    write: {
      bg: "var(--ward-chip-write-bg)",
      fg: "var(--ward-chip-write-fg)",
      line: "var(--ward-chip-write-line)"
    },
    drift: {
      bg: "var(--ward-chip-drift-bg)",
      fg: "var(--ward-chip-drift-fg)",
      line: "var(--ward-chip-drift-line)"
    },
    done: {
      bg: "var(--ward-chip-done-bg)",
      fg: "var(--ward-chip-done-fg)",
      line: "var(--ward-chip-done-line)"
    },
    attention: {
      bg: "var(--ward-chip-attention-bg)",
      fg: "var(--ward-chip-attention-fg)",
      line: "var(--ward-chip-attention-line)"
    },
    failed: {
      bg: "var(--ward-chip-failed-bg)",
      fg: "var(--ward-chip-failed-fg)",
      line: "var(--ward-chip-failed-line)"
    },
    pending: {
      bg: "var(--ward-chip-pending-bg)",
      fg: "var(--ward-chip-pending-fg)",
      line: "var(--ward-chip-pending-line)"
    },
    running: {
      bg: "var(--ward-chip-running-bg)",
      fg: "var(--ward-chip-running-fg)",
      line: "var(--ward-chip-running-line)"
    },
    warn: {
      bg: "var(--ward-chip-warn-bg)",
      fg: "var(--ward-chip-warn-fg)",
      line: "var(--ward-chip-warn-line)"
    },
    meta: {
      bg: "var(--ward-chip-meta-bg)",
      fg: "var(--ward-chip-meta-fg)",
      line: "var(--ward-chip-meta-line)"
    },
    soft: {
      bg: "var(--ward-chip-soft-bg)",
      fg: "var(--ward-chip-soft-fg)",
      line: "var(--ward-chip-soft-line)"
    },
    quiet: {
      bg: "var(--ward-chip-quiet-bg)",
      fg: "var(--ward-chip-quiet-fg)",
      line: "var(--ward-chip-quiet-line)"
    },
    owed: {
      bg: "var(--ward-chip-owed-bg)",
      fg: "var(--ward-chip-owed-fg)",
      line: "var(--ward-chip-owed-line)"
    }
  },
  space: {
    s1: "var(--ward-space-1)",
    s2: "var(--ward-space-2)",
    s3: "var(--ward-space-3)",
    s4: "var(--ward-space-4)",
    s5: "var(--ward-space-5)",
    s6: "var(--ward-space-6)",
    s7: "var(--ward-space-7)",
    s8: "var(--ward-space-8)",
    s9: "var(--ward-space-9)",
    page: "var(--ward-space-page)"
  },
  pad: {
    row: "var(--ward-pad-row)",
    sessionCell: "var(--ward-pad-sessionCell)",
    sessionTitle: "var(--ward-pad-sessionTitle)",
    sessionHead: "var(--ward-pad-sessionHead)",
    scopeTabs: "var(--ward-pad-scopeTabs)",
    kv: "var(--ward-pad-kv)",
    field: "var(--ward-pad-field)",
    activity: "var(--ward-pad-activity)",
    timeline: "var(--ward-pad-timeline)",
    section: "var(--ward-pad-section)",
    bar: "var(--ward-pad-bar)",
    tabs: "var(--ward-pad-tabs)",
    console: "var(--ward-pad-console)",
    message: "var(--ward-pad-message)",
    chip: "var(--ward-pad-chip)",
    control: "var(--ward-pad-control)",
    bandHead: "var(--ward-pad-bandHead)",
    bandCell: "var(--ward-pad-bandCell)",
    configRow: "var(--ward-pad-configRow)",
    configHead: "var(--ward-pad-configHead)",
    input: "var(--ward-pad-input)",
    controlPrimary: "var(--ward-pad-controlPrimary)",
    ruleRow: "var(--ward-pad-ruleRow)",
    toolRow: "var(--ward-pad-toolRow)",
    sectionBlock: "var(--ward-pad-sectionBlock)",
    page: "var(--ward-pad-page)",
    pageHeader: "var(--ward-pad-pageHeader)",
    boardHead: "var(--ward-pad-boardHead)",
    boardColumn: "var(--ward-pad-boardColumn)",
    workCard: "var(--ward-pad-workCard)",
    card: "var(--ward-pad-card)",
    gridCell: "var(--ward-pad-gridCell)",
    ladderTile: "var(--ward-pad-ladderTile)",
    trace: "var(--ward-pad-trace)",
    metricCell: "var(--ward-pad-metricCell)",
    railSection: "var(--ward-pad-railSection)",
    sidebarBrand: "var(--ward-pad-sidebarBrand)",
    sidebarNav: "var(--ward-pad-sidebarNav)",
    sidebarGroup: "var(--ward-pad-sidebarGroup)",
    sidebarAgent: "var(--ward-pad-sidebarAgent)",
    sidebarFoot: "var(--ward-pad-sidebarFoot)",
    sidebarFootList: "var(--ward-pad-sidebarFootList)",
    drawerHead: "var(--ward-pad-drawerHead)",
    drawerSummary: "var(--ward-pad-drawerSummary)",
    drawerBlock: "var(--ward-pad-drawerBlock)",
    drawerKv: "var(--ward-pad-drawerKv)",
    caseHead: "var(--ward-pad-caseHead)",
    caseCriteria: "var(--ward-pad-caseCriteria)",
    caseHistory: "var(--ward-pad-caseHistory)",
    railBlock: "var(--ward-pad-railBlock)",
    railList: "var(--ward-pad-railList)",
    intakeTurn: "var(--ward-pad-intakeTurn)",
    placementList: "var(--ward-pad-placementList)",
    policyRow: "var(--ward-pad-policyRow)",
    policyCallout: "var(--ward-pad-policyCallout)",
    adminCard: "var(--ward-pad-adminCard)",
    runbookStep: "var(--ward-pad-runbookStep)",
    gateRung: "var(--ward-pad-gateRung)",
    criterion: "var(--ward-pad-criterion)",
    resolvePath: "var(--ward-pad-resolvePath)",
    stageColumn: "var(--ward-pad-stageColumn)",
    stageFoot: "var(--ward-pad-stageFoot)",
    streamCell: "var(--ward-pad-streamCell)",
    matrixRow: "var(--ward-pad-matrixRow)",
    streamHead: "var(--ward-pad-streamHead)",
    streamFoot: "var(--ward-pad-streamFoot)",
    modalHead: "var(--ward-pad-modalHead)",
    modalBody: "var(--ward-pad-modalBody)",
    modalSection: "var(--ward-pad-modalSection)",
    modalInput: "var(--ward-pad-modalInput)",
    stageRow: "var(--ward-pad-stageRow)",
    choiceCard: "var(--ward-pad-choiceCard)",
    swatchRow: "var(--ward-pad-swatchRow)",
    addStage: "var(--ward-pad-addStage)",
    fieldCell: "var(--ward-pad-fieldCell)",
    skeletonColumn: "var(--ward-pad-skeletonColumn)"
  },
  gap: {
    row: "var(--ward-gap-row)",
    section: "var(--ward-gap-section)",
    bar: "var(--ward-gap-bar)",
    tabs: "var(--ward-gap-tabs)",
    field: "var(--ward-gap-field)",
    activity: "var(--ward-gap-activity)",
    timeline: "var(--ward-gap-timeline)",
    console: "var(--ward-gap-console)",
    message: "var(--ward-gap-message)",
    intakeTurn: "var(--ward-gap-intakeTurn)",
    intakeThread: "var(--ward-gap-intakeThread)",
    readyList: "var(--ward-gap-readyList)",
    policyRow: "var(--ward-gap-policyRow)",
    policyState: "var(--ward-gap-policyState)",
    policyCallout: "var(--ward-gap-policyCallout)",
    policyGroup: "var(--ward-gap-policyGroup)",
    policyStack: "var(--ward-gap-policyStack)",
    adminCard: "var(--ward-gap-adminCard)",
    adminAside: "var(--ward-gap-adminAside)",
    adminGrid: "var(--ward-gap-adminGrid)",
    envGrid: "var(--ward-gap-envGrid)",
    deployStack: "var(--ward-gap-deployStack)",
    runbookStep: "var(--ward-gap-runbookStep)",
    band: "var(--ward-gap-band)",
    configRow: "var(--ward-gap-configRow)",
    configName: "var(--ward-gap-configName)",
    ruleRow: "var(--ward-gap-ruleRow)",
    toolRow: "var(--ward-gap-toolRow)",
    sectionBlock: "var(--ward-gap-sectionBlock)",
    sample: "var(--ward-gap-sample)",
    trace: "var(--ward-gap-trace)",
    traceHead: "var(--ward-gap-traceHead)",
    traceBody: "var(--ward-gap-traceBody)",
    traceDotTop: "var(--ward-gap-traceDotTop)",
    metricCell: "var(--ward-gap-metricCell)",
    sidebarBrand: "var(--ward-gap-sidebarBrand)",
    sidebarAgent: "var(--ward-gap-sidebarAgent)",
    sidebarDot: "var(--ward-gap-sidebarDot)",
    boardColumn: "var(--ward-gap-boardColumn)",
    lane: "var(--ward-gap-lane)",
    drawerBlock: "var(--ward-gap-drawerBlock)",
    resolveList: "var(--ward-gap-resolveList)",
    entryBody: "var(--ward-gap-entryBody)",
    criterionMark: "var(--ward-gap-criterionMark)",
    entryNode: "var(--ward-gap-entryNode)",
    stageColumn: "var(--ward-gap-stageColumn)",
    stageHead: "var(--ward-gap-stageHead)",
    stageTag: "var(--ward-gap-stageTag)",
    streamCell: "var(--ward-gap-streamCell)",
    streamChain: "var(--ward-gap-streamChain)",
    agentCard: "var(--ward-gap-agentCard)",
    agentTags: "var(--ward-gap-agentTags)",
    gatePanel: "var(--ward-gap-gatePanel)",
    reviewerList: "var(--ward-gap-reviewerList)",
    reviewer: "var(--ward-gap-reviewer)",
    terminalCard: "var(--ward-gap-terminalCard)",
    formLabel: "var(--ward-gap-formLabel)",
    formStack: "var(--ward-gap-formStack)",
    ladderGrid: "var(--ward-gap-ladderGrid)",
    ladderTile: "var(--ward-gap-ladderTile)",
    swatch: "var(--ward-gap-swatch)",
    stageList: "var(--ward-gap-stageList)",
    choiceBody: "var(--ward-gap-choiceBody)",
    modalFooter: "var(--ward-gap-modalFooter)",
    fieldCell: "var(--ward-gap-fieldCell)",
    fieldGridRow: "var(--ward-gap-fieldGridRow)",
    fieldGridCol: "var(--ward-gap-fieldGridCol)",
    grouping: "var(--ward-gap-grouping)",
    configSub: "var(--ward-gap-configSub)",
    skeleton: "var(--ward-gap-skeleton)",
    effects: "var(--ward-gap-effects)",
    sideInset: "var(--ward-gap-sideInset)"
  },
  width: {
    max: "var(--ward-width-max)",
    drawer: "var(--ward-width-drawer)",
    dryrun: "var(--ward-width-dryrun)",
    preview: "var(--ward-width-preview)",
    colFloor: "var(--ward-width-colFloor)",
    sessionResolved: "var(--ward-width-sessionResolved)",
    sessionCost: "var(--ward-width-sessionCost)",
    sessionActivity: "var(--ward-width-sessionActivity)",
    sessionState: "var(--ward-width-sessionState)",
    switchTrack: "var(--ward-width-switchTrack)",
    colCredId: "var(--ward-width-colCredId)",
    colClass: "var(--ward-width-colClass)",
    colTier: "var(--ward-width-colTier)",
    colNext: "var(--ward-width-colNext)",
    colState: "var(--ward-width-colState)",
    colServer: "var(--ward-width-colServer)",
    colTools: "var(--ward-width-colTools)",
    colPin: "var(--ward-width-colPin)",
    colConn: "var(--ward-width-colConn)",
    overlayWide: "var(--ward-width-overlayWide)",
    form: "var(--ward-width-form)",
    drawerKey: "var(--ward-width-drawerKey)",
    maxWide: "var(--ward-width-maxWide)",
    sidebar: "var(--ward-width-sidebar)",
    keyCol: "var(--ward-width-keyCol)",
    keyColWide: "var(--ward-width-keyColWide)",
    bandHead: "var(--ward-width-bandHead)",
    rail: "var(--ward-width-rail)",
    configHandle: "var(--ward-width-configHandle)",
    configLabel: "var(--ward-width-configLabel)",
    toolName: "var(--ward-width-toolName)",
    configCap: "var(--ward-width-configCap)",
    configShown: "var(--ward-width-configShown)",
    gateTag: "var(--ward-width-gateTag)",
    gateActor: "var(--ward-width-gateActor)",
    stageColumn: "var(--ward-width-stageColumn)",
    streamName: "var(--ward-width-streamName)",
    streamAgents: "var(--ward-width-streamAgents)",
    streamPolicy: "var(--ward-width-streamPolicy)",
    policyControl: "var(--ward-width-policyControl)",
    roleGroup: "var(--ward-width-roleGroup)",
    rolePeople: "var(--ward-width-rolePeople)",
    roleVia: "var(--ward-width-roleVia)",
    roleIndent: "var(--ward-width-roleIndent)",
    personIndent: "var(--ward-width-personIndent)",
    adminAside: "var(--ward-width-adminAside)",
    streamFlight: "var(--ward-width-streamFlight)",
    streamIndent: "var(--ward-width-streamIndent)",
    streamEdge: "var(--ward-width-streamEdge)",
    streamKey: "var(--ward-width-streamKey)",
    streamChainMin: "var(--ward-width-streamChainMin)",
    colourPick: "var(--ward-width-colourPick)",
    iconRail: "var(--ward-width-iconRail)",
    menuIcon: "var(--ward-width-menuIcon)",
    measure: "var(--ward-width-measure)",
    splitMain: "var(--ward-width-splitMain)"
  },
  height: {
    control: "var(--ward-height-control)",
    controlSm: "var(--ward-height-controlSm)",
    card: "var(--ward-height-card)",
    cardRow: "var(--ward-height-cardRow)",
    touch: "var(--ward-height-touch)",
    topbar: "var(--ward-height-topbar)",
    identityChip: "var(--ward-height-identityChip)",
    chart: "var(--ward-height-chart)",
    switchTrack: "var(--ward-height-switchTrack)",
    switchThumb: "var(--ward-height-switchThumb)",
    bar: "var(--ward-height-bar)",
    mark: "var(--ward-height-mark)",
    app: "var(--ward-height-app)",
    traceDot: "var(--ward-height-traceDot)",
    brandMark: "var(--ward-height-brandMark)",
    agentDot: "var(--ward-height-agentDot)",
    reviewerMark: "var(--ward-height-reviewerMark)",
    swatch: "var(--ward-height-swatch)",
    ladderBar: "var(--ward-height-ladderBar)",
    radio: "var(--ward-height-radio)",
    skeletonBar: "var(--ward-height-skeletonBar)",
    target: "var(--ward-height-target)",
    navIcon: "var(--ward-height-navIcon)",
    streamAvatar: "var(--ward-height-streamAvatar)",
    streamAvatarLg: "var(--ward-height-streamAvatarLg)"
  },
  size: {
    marker6: "var(--ward-size-marker6)",
    marker8: "var(--ward-size-marker8)",
    marker9: "var(--ward-size-marker9)",
    marker14: "var(--ward-size-marker14)"
  },
  radius: "var(--ward-radius)",
  radiusChip: "var(--ward-radius-chip)",
  radiusCard: "var(--ward-radius-card)",
  radiusPanel: "var(--ward-radius-panel)",
  border: "var(--ward-border)",
  underline: "var(--ward-underline)",
  focusOffset: "var(--ward-focus-offset)",
  focusRing: "var(--ward-focus-ring)",
  shadow: { overlay: "var(--ward-shadow-overlay)", card: "var(--ward-shadow-card)" },
  type: {
    h1: "var(--ward-type-h1)",
    h1Tracking: "var(--ward-type-h1-tracking)",
    title: "var(--ward-type-title)",
    stat: "var(--ward-type-stat)",
    statNumeric: "var(--ward-type-stat-numeric)",
    body: "var(--ward-type-body)",
    secondary: "var(--ward-type-secondary)",
    meta: "var(--ward-type-meta)",
    control: "var(--ward-type-control)",
    monoId: "var(--ward-type-monoId)",
    monoIdNumeric: "var(--ward-type-monoId-numeric)",
    chip: "var(--ward-type-chip)",
    chipTracking: "var(--ward-type-chip-tracking)",
    chipTransform: "var(--ward-type-chip-transform)",
    micro: "var(--ward-type-micro)",
    microTracking: "var(--ward-type-micro-tracking)",
    microTransform: "var(--ward-type-micro-transform)",
    colHead: "var(--ward-type-colHead)",
    colHeadTracking: "var(--ward-type-colHead-tracking)",
    colHeadTransform: "var(--ward-type-colHead-transform)",
    rowName: "var(--ward-type-rowName)",
    rowNote: "var(--ward-type-rowNote)",
    inputText: "var(--ward-type-inputText)",
    inputStrong: "var(--ward-type-inputStrong)",
    stateLabel: "var(--ward-type-stateLabel)",
    ruleCond: "var(--ward-type-ruleCond)",
    ruleAct: "var(--ward-type-ruleAct)",
    toolName: "var(--ward-type-toolName)",
    toolScope: "var(--ward-type-toolScope)",
    sampleTitle: "var(--ward-type-sampleTitle)",
    traceTitle: "var(--ward-type-traceTitle)",
    traceDetail: "var(--ward-type-traceDetail)",
    handleMark: "var(--ward-type-handleMark)",
    pageTitle: "var(--ward-type-pageTitle)",
    pageTitleTracking: "var(--ward-type-pageTitle-tracking)",
    bandTitle: "var(--ward-type-bandTitle)",
    bandTitleTracking: "var(--ward-type-bandTitle-tracking)",
    cellTitle: "var(--ward-type-cellTitle)",
    cardTitle: "var(--ward-type-cardTitle)",
    keyCol: "var(--ward-type-keyCol)",
    keyColTracking: "var(--ward-type-keyCol-tracking)",
    keyColTransform: "var(--ward-type-keyCol-transform)",
    kvValue: "var(--ward-type-kvValue)",
    consoleLine: "var(--ward-type-consoleLine)",
    monoText: "var(--ward-type-monoText)",
    useText: "var(--ward-type-useText)",
    tabLabel: "var(--ward-type-tabLabel)",
    bandNote: "var(--ward-type-bandNote)",
    modalTitle: "var(--ward-type-modalTitle)",
    modalTitleTracking: "var(--ward-type-modalTitle-tracking)",
    choiceNote: "var(--ward-type-choiceNote)",
    inputMono: "var(--ward-type-inputMono)",
    cellBody: "var(--ward-type-cellBody)",
    markGlyph: "var(--ward-type-markGlyph)",
    microHead: "var(--ward-type-microHead)",
    microHeadTracking: "var(--ward-type-microHead-tracking)",
    microHeadTransform: "var(--ward-type-microHead-transform)",
    brandMark: "var(--ward-type-brandMark)",
    brandMarkTracking: "var(--ward-type-brandMark-tracking)",
    navAction: "var(--ward-type-navAction)",
    swatchName: "var(--ward-type-swatchName)",
    agentActive: "var(--ward-type-agentActive)",
    boardTitle: "var(--ward-type-boardTitle)",
    boardTitleTracking: "var(--ward-type-boardTitle-tracking)",
    columnLabel: "var(--ward-type-columnLabel)",
    columnCount: "var(--ward-type-columnCount)",
    columnCountNumeric: "var(--ward-type-columnCount-numeric)",
    overCapCount: "var(--ward-type-overCapCount)",
    overCapCountNumeric: "var(--ward-type-overCapCount-numeric)",
    workTitle: "var(--ward-type-workTitle)",
    overCapNote: "var(--ward-type-overCapNote)",
    caseTitle: "var(--ward-type-caseTitle)",
    caseTitleTracking: "var(--ward-type-caseTitle-tracking)",
    costTotal: "var(--ward-type-costTotal)",
    costTotalNumeric: "var(--ward-type-costTotal-numeric)",
    entryStage: "var(--ward-type-entryStage)",
    sessionTitle: "var(--ward-type-sessionTitle)",
    ruleNote: "var(--ward-type-ruleNote)",
    costCeiling: "var(--ward-type-costCeiling)",
    drawerTitle: "var(--ward-type-drawerTitle)",
    stageName: "var(--ward-type-stageName)",
    agentName: "var(--ward-type-agentName)",
    cardNote: "var(--ward-type-cardNote)",
    ladderNote: "var(--ward-type-ladderNote)",
    gateNote: "var(--ward-type-gateNote)",
    reviewerName: "var(--ward-type-reviewerName)",
    reviewerMark: "var(--ward-type-reviewerMark)",
    terminalCount: "var(--ward-type-terminalCount)",
    terminalCountNumeric: "var(--ward-type-terminalCount-numeric)",
    tag: "var(--ward-type-tag)",
    tagTracking: "var(--ward-type-tag-tracking)",
    tagTransform: "var(--ward-type-tag-transform)",
    policyKey: "var(--ward-type-policyKey)",
    stageFoot: "var(--ward-type-stageFoot)",
    streamName: "var(--ward-type-streamName)",
    cellSub: "var(--ward-type-cellSub)",
    sampleValue: "var(--ward-type-sampleValue)",
    skeletonLabel: "var(--ward-type-skeletonLabel)",
    previewNote: "var(--ward-type-previewNote)",
    effectText: "var(--ward-type-effectText)",
    scopeName: "var(--ward-type-scopeName)",
    scopeNameTracking: "var(--ward-type-scopeName-tracking)",
    personName: "var(--ward-type-personName)",
    rowText: "var(--ward-type-rowText)",
    rowTextStrong: "var(--ward-type-rowTextStrong)",
    streamAvatar: "var(--ward-type-streamAvatar)",
    tagText: "var(--ward-type-tagText)",
    eyebrow: "var(--ward-type-eyebrow)",
    eyebrowTracking: "var(--ward-type-eyebrow-tracking)",
    eyebrowTransform: "var(--ward-type-eyebrow-transform)",
    caption: "var(--ward-type-caption)",
    proseH2: "var(--ward-type-proseH2)",
    proseH3: "var(--ward-type-proseH3)",
    proseH4: "var(--ward-type-proseH4)",
    codeText: "var(--ward-type-codeText)",
    lead: "var(--ward-type-lead)"
  },
  motion: {
    fast: "var(--ward-motion-fast)",
    flash: "var(--ward-motion-flash)",
    reveal: "var(--ward-motion-reveal)",
    tick: "var(--ward-motion-tick)",
    patience: "var(--ward-motion-patience)",
    running: "var(--ward-motion-running)"
  },
  live: {
    heartbeat: "var(--ward-live-heartbeat)",
    reconnectMax: "var(--ward-live-reconnectMax)",
    staleAfter: "var(--ward-live-staleAfter)",
    poll: "var(--ward-live-poll)"
  }
}, ye = {
  fast: 120,
  flash: 300,
  reveal: 320,
  tick: 1e3,
  patience: 800,
  running: 1600,
  heartbeat: 15e3,
  poll: 15e3,
  reconnectMax: 3e4,
  staleAfter: 45e3,
  reconnectBase: 1e3,
  load: 800
};
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Qt(e) {
  return Ul.includes(e);
}
function yt(e) {
  return Ua.includes(e);
}
function Yl(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function AL(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Jl = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ql(e) {
  if (!Qt(e)) throw new Error("unvalidated stream step");
  return Jl[e];
}
function na(e) {
  return typeof e != "string" ? null : Vl.includes(e) ? e : null;
}
function Xl(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function Zl(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function eo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function to(e, t, a) {
  const r = Xl(e);
  if (r === null) return null;
  const l = na(a) ?? na(r.type);
  return l === null ? null : { ...r, type: l, id: Zl(r, t), at: eo(r) };
}
function no(e, t) {
  return e >= ye.staleAfter ? "stale" : e >= ye.heartbeat && t === "live" ? "reconnecting" : null;
}
function ao(e, t, a) {
  return e >= ye.heartbeat && !t && a !== null;
}
function IL(e, t) {
  const [a, r] = v("reconnecting"), [l, o] = v(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), h = f(null), w = f(0), _ = f(0), N = f(!1), k = f("reconnecting"), M = Z((A) => {
    k.current = A, r(A);
  }, []), O = Z(() => {
    c.current = Date.now();
  }, []), we = Z((A) => {
    for (const [V, Se] of s.current)
      (Se === "*" || A.itemKey === Se) && V(A);
  }, []), ae = Z(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (A, V, Se) => {
        const Ge = to(A, V, Se);
        Ge !== null && (Ge.id && (d.current = Ge.id), O(), N.current = !1, M("live"), o(Ge.at), we(Ge));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, O(), M("live");
      },
      onError: () => {
        var V;
        (V = h.current) == null || V.close(), h.current = null, N.current = !0, k.current !== "stale" && M("reconnecting");
        const A = Math.min(ye.reconnectBase * 2 ** u.current, ye.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, A);
      }
    });
  }, [we, M, O, t, e]), Ce = Z((A) => {
    N.current = !0, A.close(), h.current = null, w.current = window.setTimeout(ae, ye.reconnectBase);
  }, [ae]), Ze = Z((A, V) => (s.current.set(V, A), () => {
    s.current.delete(V);
  }), []);
  return S(() => (ae(), _.current = window.setInterval(() => {
    const A = Date.now() - c.current, V = no(A, k.current);
    V && M(V);
    const Se = h.current;
    ao(A, N.current, Se) && Ce(Se);
  }, ye.tick), () => {
    var A;
    window.clearInterval(_.current), window.clearTimeout(w.current), N.current = !1, (A = h.current) == null || A.close(), h.current = null;
  }), [ae, Ce, M]), { connection: a, lastEventAt: l, subscribe: Ze };
}
function Mn(e, t) {
  const a = new Date(e).getTime(), [r, l] = v(() => Date.now());
  return S(() => {
    if (!t) return;
    const o = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    o();
    const s = window.setInterval(o, ye.tick);
    return document.addEventListener("visibilitychange", o), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", o);
    };
  }, [t, a]), Math.max(0, r - a);
}
const ro = { blue: "running", orange: "waiting", green: "done" };
function lo() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function aa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Bt(e, t) {
  const a = f(0), r = Z((l) => {
    const o = l ?? t, s = e.current;
    s !== null && o !== void 0 && (lo() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${ro[o]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => aa(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => aa(s), ye.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (l) => r(l) : () => r(t);
}
const oo = "_root_1otpc_2", io = {
  root: oo
};
function so(e, t, a, r, l) {
  const o = [Tn(t)];
  return e || o.push(`as of ${Il(a)}`), r && o.push(`turn ${r[0]}/${r[1]}`), l && o.push(l.label), o;
}
function Pe({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const l = a !== "stale", o = Mn(e, l), s = (t == null ? void 0 : t.at) ?? e, c = so(l, o, s, r, t);
  return /* @__PURE__ */ i("span", { className: `${io.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
      "started ",
      me(e)
    ] })
  ] });
}
const co = "_app_1cc1p_1", uo = "_side_1cc1p_35", ho = "_sideTop_1cc1p_46", mo = "_sideBody_1cc1p_60", wo = "_foldSlot_1cc1p_86", _o = "_iconRail_1cc1p_110", fo = "_railItem_1cc1p_119", vo = "_railIcon_1cc1p_140", bo = "_railDot_1cc1p_145", po = "_railLetter_1cc1p_151", go = "_main_1cc1p_157", yo = "_rail_1cc1p_119", No = "_page_1cc1p_179", ko = "_headerRow_1cc1p_202", $o = "_sidebarToggle_1cc1p_209", Co = "_headerSlot_1cc1p_214", So = "_headerAction_1cc1p_219", Ro = "_drawerSide_1cc1p_224", xo = "_root_1cc1p_271", To = "_topbar_1cc1p_278", Lo = "_mark_1cc1p_289", Mo = "_brand_1cc1p_296", Ao = "_tagline_1cc1p_302", Io = "_identity_1cc1p_308", Eo = "_tools_1cc1p_309", Bo = "_nav_1cc1p_319", Po = "_metadata_1cc1p_326", jo = "_actor_1cc1p_341", Oo = "_detail_1cc1p_342", Do = "_content_1cc1p_387", qo = "_toolsPanel_1cc1p_403", Ho = "_skip_1cc1p_429", $ = {
  app: co,
  side: uo,
  sideTop: ho,
  sideBody: mo,
  foldSlot: wo,
  iconRail: _o,
  railItem: fo,
  railIcon: vo,
  railDot: bo,
  railLetter: po,
  main: go,
  rail: yo,
  page: No,
  headerRow: ko,
  sidebarToggle: $o,
  headerSlot: Co,
  headerAction: So,
  drawerSide: Ro,
  root: xo,
  topbar: To,
  mark: Lo,
  brand: Mo,
  tagline: Ao,
  identity: Io,
  tools: Eo,
  nav: Bo,
  metadata: Po,
  actor: jo,
  detail: Oo,
  content: Do,
  toolsPanel: qo,
  skip: Ho
};
function dt(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const Fo = "_scope_1an6i_2", zo = {
  scope: Fo
}, Va = $e(null);
function EL({ reason: e, actions: t = "disable", children: a }) {
  const r = y();
  return /* @__PURE__ */ i("fieldset", { disabled: !0, className: `${zo.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(Va.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function je() {
  return pe(Va);
}
function Xt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : dt(e, t.reasonId);
}
const Wo = "_btn_hrmlj_2", Ko = "_primary_hrmlj_14", Go = "_destructive_hrmlj_25", Uo = "_secondary_hrmlj_35", Vo = "_ghost_hrmlj_40", Yo = "_overflow_hrmlj_49", Jo = "_sm_hrmlj_56", Qo = "_disabled_hrmlj_60", Xo = "_withReason_hrmlj_68", Zo = "_reason_hrmlj_74", lt = {
  btn: Wo,
  primary: Ko,
  destructive: Go,
  secondary: Uo,
  ghost: Vo,
  overflow: Yo,
  sm: Jo,
  disabled: Qo,
  withReason: Xo,
  reason: Zo
};
function ei(e, t, a, r) {
  const l = t === "sm" ? [lt.sm, "ward-btn--sm"] : [], o = a ? [lt.disabled] : [];
  return [lt.btn, lt[e], "ward-btn", `ward-btn--${e}`, ...l, ...o, r ?? ""].filter(Boolean).join(" ");
}
function ti(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ni(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ai(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function ri(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function li(e, t, a) {
  return ri(e.describedBy, t && a);
}
function oi({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${lt.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function ii(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = je()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(si, { ...e });
}
function si(e) {
  const t = je();
  ni(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || t), o = ai(e, t), s = y(), c = ci(o, t);
  return /* @__PURE__ */ i(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ei(a, r, l, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: l,
        title: o,
        "aria-describedby": li(e, o, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ti(a, e.controls),
        children: ii(e)
      }
    ),
    /* @__PURE__ */ n(oi, { id: s, reason: o, shown: c === Ya })
  ] });
}
function ci(e, t) {
  return e && !t ? Ya : Fa;
}
function Ya({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${lt.withReason} ward-btn-withReason`, children: e });
}
let An = "none";
function di(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (An = "key");
}
typeof document < "u" && (document.addEventListener("keydown", di, !0), document.addEventListener("pointerdown", () => {
  An = "pointer";
}, !0));
function ui() {
  return An === "key";
}
function pt(e) {
  const [t, a] = v(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var o;
    const r = (o = window.matchMedia) == null ? void 0 : o.call(window, e);
    if (!r) return;
    const l = (s) => a(s.matches);
    return r.addEventListener("change", l), a(r.matches), () => r.removeEventListener("change", l);
  }, [e]), t;
}
const hi = "_scrim_1cawq_2", mi = "_drawer_1cawq_10", wi = "_sheet_1cawq_14", _i = "_modal_1cawq_18", fi = "_panel_1cawq_23", vi = "_start_1cawq_44", bi = "_header_1cawq_67", pi = "_title_1cawq_75", gi = "_body_1cawq_79", yi = "_close_1cawq_106", Ae = {
  scrim: hi,
  drawer: mi,
  sheet: wi,
  modal: _i,
  panel: fi,
  start: vi,
  header: bi,
  title: pi,
  body: gi,
  close: yi
}, Ni = $e(null), Dt = [], qt = /* @__PURE__ */ new Map();
function ki(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function $i(e, t) {
  let a = qt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, qt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function Ci(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !ki(r) && $i(e, r);
}
function Si(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (Ci(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Ri(e) {
  for (const t of e.claims) {
    const a = qt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), qt.delete(t)));
  }
}
function xi(e, t) {
  const a = { root: e, claims: [] };
  return Dt.push(a), Si(a, t), a;
}
function Ti(e) {
  const t = Dt.indexOf(e);
  t >= 0 && Dt.splice(t, 1), Ri(e);
}
function ra(e) {
  return e !== null && Dt.at(-1) === e;
}
function Li(e, t, a) {
  const r = f(null), l = f(a);
  return l.current = a, S(() => {
    const o = e.current;
    if (!o) return;
    const s = document.activeElement, c = xi(o, t);
    return r.current = c, () => {
      var u, h;
      const d = ra(c);
      Ti(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), Z(() => ra(r.current), []);
}
function Mi(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Ai(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ii({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Ae.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ae.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ae.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Ei(e) {
  return `${Ae.scrim} ${Ae[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Bi(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Ae.panel} ${Ae[e]} ward-overlay-panel${a}${r}`;
}
function Pi(e) {
  const t = pe(Ni);
  return e ?? t ?? document.body;
}
function ut(e) {
  const t = f(null), a = f(null), r = y(), l = Pi(e.container), o = pt("(min-width: 768px)"), s = Mi(e.kind, o), c = Ai(e, r), d = Wl(a), [u] = v(ui), h = Li(t, l, e.returnFocusTo), w = Z(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var _;
    h() && ((_ = a.current) == null || _.focus());
  }, [h]), S(() => {
    const _ = (N) => {
      N.key === "Escape" && w();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [w]), Ll(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Ei(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ i(
          "div",
          {
            ref: a,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            tabIndex: -1,
            "data-focus-ring": u || void 0,
            className: Bi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => h() && d.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ae.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ii, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const ji = /^([a-z][a-z0-9+.-]*):/i, Oi = /* @__PURE__ */ new Set(["http", "https", "mailto"]), Di = "#";
function qi(e) {
  var r, l;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (l = (r = ji.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function T(e) {
  const t = qi(e);
  return t === void 0 || Oi.has(t) ? e : Di;
}
function Hi(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function Ja(e) {
  const t = Hi(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function Fi(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => Ja(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const o of [a, ...a.children]) l == null || l.observe(o);
    return r(), () => {
      a.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, t]);
}
function zi(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : l > e.clientWidth - a ? e.scrollLeft + l - e.clientWidth + a : null;
}
function Wi(e, t, a) {
  Qe(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !l) return;
    const o = zi(r, l);
    o !== null && (r.scrollLeft = Math.max(0, o)), Ja(r);
  }, [e, t, a]);
}
const Ki = "_row_11g8i_2", Gi = {
  row: Ki
};
function Ui(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function In({ label: e, children: t, count: a, as: r = "div", focusable: l = !0, rowRef: o, className: s, ...c }) {
  const d = f(null), u = o ?? d;
  return Fi(u, a), /* @__PURE__ */ n(r, { ref: u, className: [Gi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Ui(l, r), ...c, children: t });
}
const Vi = "_icon_1ylqy_2", Yi = {
  icon: Vi
};
function Nt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: Yi.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function BL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function PL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function jL() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function OL() {
  return /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ji() {
  return /* @__PURE__ */ i(Nt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const Qa = "ward:sidebar-collapsed", Qi = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Xi() {
  try {
    return window.localStorage.getItem(Qa) === "true";
  } catch {
    return !1;
  }
}
function Zi(e) {
  try {
    window.localStorage.setItem(Qa, String(e));
  } catch {
  }
}
function es(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ts(e) {
  return e instanceof Element && e.closest(Qi) !== null;
}
function ns(e) {
  return e.key === "[" && !es(e) && !ts(e.target);
}
function as(e) {
  const [t, a] = v(Xi), r = () => {
    Zi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const l = (o) => {
      var c;
      if (!ns(o)) return;
      const s = o.target instanceof Element ? o.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, t]), { collapsed: t, toggle: r };
}
function rs() {
  const e = pt("(max-width: 767.98px)"), t = pt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function ls(e) {
  const t = e === "phone", a = y(), r = f(null), [l, o] = v(!1);
  return l && !t && o(!1), { narrow: t, open: l, drawerId: a, slotRef: r, toggle: () => o(!l), close: () => o(!1) };
}
function os({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ i("div", { className: $.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: $.headerSlot, children: e }),
    tr(t) && /* @__PURE__ */ n("span", { className: $.headerAction, children: t })
  ] }) : e;
}
function is(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function ss({ sidebar: e, label: t, drawer: a }) {
  var l;
  if (is(a.open, a.close), !a.open) return null;
  const r = (o) => {
    o.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(ut, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (l = a.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ n("div", { className: $.drawerSide, onClick: r, children: Xa(e, !1) }) });
}
function cs(e) {
  const [t, a] = v(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ds(e, t) {
  const a = as(e === "wide" && !t), r = cs(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function us(e, t) {
  const a = ds(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ms(e.collapsed, t);
  const r = a.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: a.toggle };
}
const hs = (e) => e.collapsed && e.drawsStrip;
function ms(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const la = (e) => e ? "" : void 0;
function Xa(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Za({ fold: e }) {
  const t = e.collapsed ? "Expand sidebar" : "Collapse sidebar";
  return /* @__PURE__ */ n("span", { className: $.foldSlot, "data-ward-tip": t, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(Ji, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t })
  ] }) });
}
function ws({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: $.sideTop, children: /* @__PURE__ */ n(Za, { fold: e }) });
}
const er = $e(null);
function DL() {
  const e = pe(er);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Za, { fold: e });
}
function _s({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": Ln(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function fs({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: $.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ i("a", { className: $.railItem, href: T(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(_s, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function vs({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: l }) {
  const o = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ i("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(ws, { fold: r, inSidebar: l && !o }),
    /* @__PURE__ */ n("div", { className: $.sideBody, hidden: o, children: Xa(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(fs, { items: a ?? [], label: t })
  ] });
}
const tr = (e) => e != null;
function bs(e) {
  const { sidebar: t, header: a, action: r, children: l, rail: o, iconRail: s, pageFill: c } = e, d = tr(o), u = rs(), h = ls(u), w = us(e, u), _ = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ i("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": la(hs(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(er.Provider, { value: w, children: /* @__PURE__ */ n(vs, { sidebar: t, label: _, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ i("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(os, { header: a, action: r, label: _, drawer: h }),
      /* @__PURE__ */ n("div", { className: $.page, "data-fill": la(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ n("div", { className: $.rail, children: o }),
    /* @__PURE__ */ n(ss, { sidebar: t, label: _, drawer: h })
  ] });
}
function ps({ destinations: e, active: t }) {
  const a = f(null);
  return Wi(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(In, { as: "nav", rowRef: a, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: T(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function bn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function gs({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ i("span", { className: $.metadata, children: [
    /* @__PURE__ */ n(bn, { value: e, className: $.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(bn, { value: t, className: $.detail })
  ] });
}
function ys() {
  const e = pt("(max-width: 767.98px)"), t = y(), a = f(null), [r, l] = v(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ns({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: $.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: $.tools, children: e });
}
function ks({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: $.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function $s(e) {
  return /* @__PURE__ */ i("header", { className: $.topbar, children: [
    /* @__PURE__ */ n("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(bn, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ n(ps, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: $.identity, children: /* @__PURE__ */ n(gs, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ns, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Cs(e) {
  const t = y(), a = ys();
  return /* @__PURE__ */ i("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: $.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n($s, { ...e, menu: a }),
    /* @__PURE__ */ n(ks, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: $.content, children: e.children })
  ] });
}
function Ss(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function qL(e) {
  return Ss(e) ? /* @__PURE__ */ n(bs, { ...e }) : /* @__PURE__ */ n(Cs, { ...e });
}
const Rs = "_root_itg9o_2", xs = "_row_itg9o_8", Ts = "_box_itg9o_14", Ls = "_label_itg9o_21", Ms = "_labelHidden_itg9o_26", As = "_consequence_itg9o_44", Is = "_sample_itg9o_79", Ve = {
  root: Rs,
  row: xs,
  box: Ts,
  label: Ls,
  labelHidden: Ms,
  consequence: As,
  sample: Is
};
function Es(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Bs({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Ve.consequence} ward-check-consequence`, children: t }) : null;
}
function Ps(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function js(e, t, a, r) {
  const l = e.consequence ? `${t}-note` : void 0, o = Ps(e, a, r), s = o ? `${t}-reason` : void 0, c = Xt(dt(l, e.describedBy, s), r);
  return { noteId: l, reason: o, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? o } };
}
function Os({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ds({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ve.sample, "aria-hidden": "true", children: e }) : null;
}
function nr(e) {
  const t = y(), a = je(), r = Es(e, a), l = js(e, t, r.disabled, a);
  return /* @__PURE__ */ i("div", { className: `${Ve.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ i("span", { className: Ve.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Ve.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, o.target.checked));
          },
          ...l.input
        }
      ),
      /* @__PURE__ */ n("label", { htmlFor: t, className: e.labelHidden ? Ve.labelHidden : Ve.label, children: e.label }),
      /* @__PURE__ */ n(Ds, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Os, { id: l.reasonId, reason: l.reason }),
    /* @__PURE__ */ n(Bs, { id: l.noteId, text: e.consequence })
  ] });
}
const qs = "_chip_pq6tb_2", Hs = {
  chip: qs
}, Fs = {
  gate: P.chip.gate,
  system: P.chip.system,
  write: P.chip.write,
  drift: P.chip.drift,
  done: P.chip.done,
  attention: P.chip.attention,
  failed: P.chip.failed,
  pending: P.chip.pending,
  running: P.chip.running,
  warn: P.chip.warn,
  meta: P.chip.meta,
  soft: P.chip.soft,
  quiet: P.chip.quiet,
  owed: P.chip.owed,
  neutral: P.chip.quiet,
  info: P.chip.running,
  success: P.chip.done,
  warning: P.chip.attention,
  danger: P.chip.failed
};
function zs(e, t) {
  if (e === "stream") return Ws(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = Fs[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function Ws(e) {
  if (!e || !yt(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = Ln(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Hs.chip} ward-chip ward-chip--${e}`, style: zs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const Ks = "_clamp_zn74g_3", oa = {
  clamp: Ks
};
function st({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? oa.clamp : `${oa.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const Gs = "_root_1btz3_2", Us = "_body_1btz3_10", Vs = "_toggle_1btz3_24", ln = {
  root: Gs,
  body: Us,
  toggle: Vs
};
function HL({ children: e, lines: t = 3, label: a }) {
  const [r, l] = v(!1), o = y();
  return /* @__PURE__ */ i("div", { className: ln.root, children: [
    /* @__PURE__ */ n("div", { id: o, className: ln.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: ln.toggle, "aria-expanded": r, "aria-controls": o, onClick: () => l(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const Ys = "_root_1a4s8_2", Js = "_words_1a4s8_16", Qs = "_title_1a4s8_23", Xs = "_actions_1a4s8_27", St = {
  root: Ys,
  words: Js,
  title: Qs,
  actions: Xs
};
function FL({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ i("section", { className: St.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ i("div", { className: St.words, children: [
      /* @__PURE__ */ n("strong", { className: St.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: St.actions, children: a })
  ] });
}
const Zs = "_root_8zmpu_2", ec = "_step_8zmpu_12", tc = "_dot_8zmpu_38", nc = "_label_8zmpu_51", _t = {
  root: Zs,
  step: ec,
  dot: tc,
  label: nc
}, ac = { done: ", done", now: ", current", next: "" };
function rc({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ i("li", { className: _t.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${_t.dot} ward-running` : _t.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: _t.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: ac[e.state] })
  ] });
}
function zL({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: _t.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(rc, { step: r, running: t }, r.label)) });
}
function Zt(e) {
  return typeof e == "number" && yt(e) ? e : null;
}
function ke(e, t) {
  const a = Zt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function En(e, t) {
  const a = Zt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const lc = "_root_13eei_3", oc = "_nav_13eei_8", ic = "_list_13eei_16", sc = "_item_13eei_24", cc = "_link_13eei_44", dc = "_sep_13eei_54", uc = "_current_13eei_58", hc = "_chips_13eei_62", De = {
  root: lc,
  nav: oc,
  list: ic,
  item: sc,
  link: cc,
  sep: dc,
  current: uc,
  chips: hc
};
function mc({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: De.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${De.link} ward-target`, href: T(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function wc({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: De.root, children: /* @__PURE__ */ i("nav", { "aria-label": "Breadcrumb", className: De.nav, children: [
    /* @__PURE__ */ n("ol", { className: De.list, children: e.map((r, l) => /* @__PURE__ */ i("li", { className: De.item, children: [
      l > 0 ? /* @__PURE__ */ n("span", { className: De.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(mc, { step: r, isCurrent: a && l === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${De.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function ar(e, t, a) {
  const r = f(a);
  r.current = a, S(() => {
    if (!e) return;
    const l = (o) => {
      var s;
      (s = t.current) != null && s.contains(o.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, t]);
}
const _c = 500;
function rr(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function lr() {
  const e = f(""), t = f(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, _c), e.current);
}
const Rt = 4;
function fc(e, t, a) {
  const r = Math.max(0, a - e.bottom - Rt * 2), l = Math.max(0, e.top - Rt * 2);
  return t <= r || r >= l ? { top: e.bottom + Rt, maxHeight: r } : { top: e.top - Rt - Math.min(t, l), maxHeight: l };
}
function vc(e, t, a, r) {
  const l = { start: e.left, end: e.right - t }, o = { start: l.start + t <= a, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = o[r] || !o[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, a - t));
}
function bc(e, t, a, r) {
  return { ...fc(e, t.height, a.height), left: vc(e, t.width, a.width, r) };
}
function Pt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function pc(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function gc(e, t, a) {
  const r = pc(t, a);
  e.style.setProperty("--ward-anchor-width", Pt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const l = e.getBoundingClientRect(), o = document.documentElement;
  return { edges: r, box: l, view: { width: o.clientWidth, height: o.clientHeight } };
}
function yc(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, l) => r.scrollTop = a[l]);
}
function ia(e, t, a, r) {
  const l = yc(e), o = gc(e, t, r), s = bc(o.edges, o.box, o.view, a);
  Object.assign(e.style, { left: Pt(s.left - o.box.left), top: Pt(s.top - o.box.top), maxHeight: Pt(s.maxHeight) }), l();
}
function Nc(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function or(e, t, a = "start", r) {
  Qe(() => {
    const l = t.current, o = e.current;
    if (!l || !o) return;
    const s = Nc(l), c = () => ia(l, o, a, r == null ? void 0 : r.current), d = (u) => {
      l.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), Qe(() => {
    t.current && e.current && ia(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const kc = "_root_1lgbn_2", $c = "_trigger_1lgbn_7", Cc = "_value_1lgbn_47", Sc = "_menu_1lgbn_65", Rc = "_find_1lgbn_87", xc = "_list_1lgbn_103", Tc = "_option_1lgbn_114", Lc = "_check_1lgbn_133", Mc = "_empty_1lgbn_144", Ne = {
  root: kc,
  trigger: $c,
  value: Cc,
  menu: Sc,
  find: Rc,
  list: xc,
  option: Tc,
  check: Lc,
  empty: Mc
}, Ac = 7;
function Ic(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function sa(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ec(e, t) {
  const [a, r] = v(e.defaultOpen === !0), [l, o] = v(""), [s, c] = v(() => sa(e.options, e.value)), d = (u) => {
    var h;
    Wa(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: l,
    active: s,
    entries: Ic(e.options, l),
    findable: e.options.length > Ac,
    show: () => {
      e.disabled || (o(""), c(sa(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      o(u), c(0);
    }
  };
}
function Bc(e, t) {
  const a = f(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Pc(e) {
  const t = lr();
  return (a) => {
    const r = t(a), l = e.entries.findIndex((o) => o.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function ir(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function jc(e) {
  return { ...ir(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function sr(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = t[r.key];
    if (!l) return a(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Oc = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Dc(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Oc.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function qc({ entry: e, at: t, menu: a, ids: r, value: l }) {
  return /* @__PURE__ */ i(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": t === a.active || void 0,
      className: Ne.option,
      onMouseDown: (o) => o.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: Ne.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: Ne.label, children: e.option.label })
      ]
    }
  );
}
function Bn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function Hc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: Ne.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": Bn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: sr(e, ir(e), () => {
      })
    }
  );
}
function Fc({ props: e, menu: t, ids: a, focusRef: r, trigger: l }) {
  const o = Pc(t), s = f(null);
  or(l, s);
  const c = (d) => {
    rr(d) && o(d.key);
  };
  return /* @__PURE__ */ i("div", { ref: s, className: Ne.menu, children: [
    t.findable && /* @__PURE__ */ n(Hc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: Ne.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : Bn(t, a),
        onKeyDown: sr(t, jc(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(qc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: Ne.empty, children: "No match" })
  ] });
}
function zc(e, t) {
  const a = e.open ? Bn(e, t) : void 0;
  S(() => {
    var r, l;
    a && ((l = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [a]);
}
function cr(...e) {
  return e.filter(Boolean).join(" ");
}
function Wc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function Kc({ props: e, menu: t, ids: a, trigger: r, wantFocus: l }) {
  var c;
  const o = !e.options.some((d) => d.value === e.value), s = (c = je()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: cr(Ne.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": dt(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Dc(t, l),
      children: /* @__PURE__ */ n("span", { id: a.value, className: Ne.value, "data-placeholder": o || void 0, children: Wc(e) })
    }
  );
}
function dr(e) {
  const t = je(), a = t ? { ...e, disabled: !0, "aria-describedby": Xt(e["aria-describedby"], t) } : e, r = y(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, o = f(null), s = f(null), c = f(null), d = Ec(a, s), u = Bc(d.open, c);
  return ar(d.open, o, () => d.close(!1)), zc(d, l), /* @__PURE__ */ i("div", { ref: o, className: cr(Ne.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(Kc, { props: a, menu: d, ids: l, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(Fc, { props: a, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Gc = "_field_1ensj_2", Uc = "_label_1ensj_8", Vc = "_labelHidden_1ensj_15", Yc = "_control_1ensj_25", Jc = "_mono_1ensj_45", Qc = "_area_1ensj_50", Xc = "_invalid_1ensj_57", ze = {
  field: Gc,
  label: Uc,
  labelHidden: Vc,
  control: Yc,
  mono: Jc,
  area: Qc,
  invalid: Xc
}, Zc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, ur = (e) => `${e}-label`;
function ed({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? Zc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function td({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    dr,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": ur(t.id),
      "aria-invalid": t["aria-invalid"],
      "aria-describedby": t["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: t.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function nd({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
function ad({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, type: "date", min: e.min, max: e.max, ...t });
}
const rd = { input: ed, select: td, textarea: nd, date: ad };
function ld(e, t, a) {
  const r = rd[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function od(e, t, a, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Xt(dt(l ? a : void 0, e.describedBy), r),
    onChange: (o) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, o.target.value);
    }
  };
}
function id(e) {
  const t = e.mono ? [ze.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [ze.area] : [];
  return [ze.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function sd(e) {
  return e ? `${ze.label} ${ze.labelHidden} ward-field-label` : `${ze.label} ward-field-label`;
}
function E(e) {
  const t = y(), a = `${t}-msg`, r = od(e, t, a, je()), l = id(e);
  return /* @__PURE__ */ i("div", { className: `${ze.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: ur(t), className: sd(e.labelHidden), htmlFor: t, children: e.label }),
    ld(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${ze.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const cd = "_root_sjvm0_2", dd = "_trigger_sjvm0_9", ud = "_ghost_sjvm0_27", hd = "_panel_sjvm0_46", md = "_edged_sjvm0_67", wd = "_menu_sjvm0_73", _d = "_group_sjvm0_78", fd = "_heading_sjvm0_83", vd = "_item_sjvm0_89", bd = "_description_sjvm0_105", pd = "_large_sjvm0_109", gd = "_touch_sjvm0_113", yd = "_icon_sjvm0_117", Nd = "_label_sjvm0_125", kd = "_text_sjvm0_130", $d = "_trailing_sjvm0_138", Cd = "_check_sjvm0_144", Sd = "_separator_sjvm0_183", Rd = "_footer_sjvm0_189", xd = "_find_sjvm0_196", Td = "_findGlyph_sjvm0_208", Ld = "_findInput_sjvm0_214", Md = "_empty_sjvm0_230", L = {
  root: cd,
  trigger: dd,
  ghost: ud,
  panel: hd,
  edged: md,
  menu: wd,
  group: _d,
  heading: fd,
  item: vd,
  description: bd,
  large: pd,
  touch: gd,
  icon: yd,
  label: Nd,
  text: kd,
  trailing: $d,
  check: Cd,
  separator: Sd,
  footer: Rd,
  find: xd,
  findGlyph: Td,
  findInput: Ld,
  empty: Md
}, hr = $e(null);
function Ad(e, t) {
  const [a, r] = v({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (l) => r((o) => ({ open: !0, start: l, request: o.request + 1 })),
    close: (l) => {
      var o;
      Wa(() => r((s) => ({ ...s, open: !1 }))), l && ((o = t.current) == null || o.focus());
    }
  };
}
const Id = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ed(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Id.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function Pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Bd(e, t = {}, a = "field") {
  const { ref: r, className: l, ...o } = t;
  return { ...o, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: Pn(L.trigger, a === "ghost" ? L.ghost : void 0, l) };
}
function mr(e) {
  const t = y(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = f(null), l = f(null), o = Ad(e.defaultOpen === !0, l);
  return ar(o.open, r, () => o.close(!1)), /* @__PURE__ */ i("div", { ref: r, className: Pn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Bd(l, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ed(o),
        children: e.label
      }
    ),
    o.open && /* @__PURE__ */ n(hr.Provider, { value: { ...a, popup: o, button: l }, children: e.children })
  ] });
}
function Pd(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function jd(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Od = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Dd(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function qd(e, t) {
  return e === "separator" ? e : "items" in e ? Dd(e, t) : t(e) ? e : null;
}
function Hd(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function Fd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (l) => l.label.toLowerCase().includes(a);
  return Hd(e.map((l) => qd(l, r)).filter((l) => l !== null));
}
const wr = (e, t) => (e % t + t) % t;
function He(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const l = wr(t + a * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const zd = (e) => e.split("").every((t) => t === e[0]);
function Wd(e, t, a) {
  const r = zd(a), l = r ? a[0] : a, o = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = wr(o + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Kd(e) {
  const t = f([]);
  return t.current.length = e.length, {
    items: e,
    refs: t,
    current: () => t.current.indexOf(document.activeElement),
    focus: (a) => {
      var r;
      return (r = t.current[a]) == null ? void 0 : r.focus();
    }
  };
}
function Gd(e, t) {
  const { items: a } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(He(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(He(a, e.current(), -1))],
    ["Home", () => e.focus(He(a, -1, 1))],
    ["End", () => e.focus(He(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Ud(e, t, a) {
  const r = lr(), l = Gd(e, t), o = (s) => {
    if (rr(s)) {
      if (!a) return e.focus(Wd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = l.get(s.key);
      if (!c) return o(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function Vd(e) {
  const t = f(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function Yd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? He(e, -1, 1) : t;
}
function Jd(e, t) {
  const { start: a, request: r } = t, l = f(e);
  l.current = e, S(() => {
    const { items: o, focus: s } = l.current;
    a && s(a === "first" ? Yd(o) : He(o, o.length, -1));
  }, [a, r]);
}
function Qd({ row: e, nav: t, popup: a }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (o) => o.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== l && t.focus(l);
    },
    onClick: (o) => {
      var s;
      if (r.disabled) return o.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const Xd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function Zd(e, t) {
  return Xd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function eu(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ i("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function tu() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function ca(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    eu(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(tu, {}) : null
  ] });
}
function _r(e) {
  const { item: t, at: a } = e.row, r = y(), l = {
    ref: (o) => {
      e.nav.refs.current[a] = o;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...Zd(t, r),
    ...Qd(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: T(t.href), ...l, children: ca(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...l, children: ca(t, r) });
}
function nu({ heading: e, rows: t, nav: a, popup: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { role: "group", "aria-labelledby": l, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: l, className: L.heading, children: e }),
    t.map((o) => /* @__PURE__ */ n(_r, { row: o, nav: a, popup: r }, o.at))
  ] });
}
function au({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(nu, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(_r, { row: e.row, nav: t, popup: a });
}
function ru() {
  const e = pe(hr);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function lu() {
  return /* @__PURE__ */ i("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function ou(e, t) {
  const a = () => He(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(He(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function iu({ find: e, query: t, setQuery: a, input: r, nav: l, popup: o, menuId: s }) {
  const c = ou(l, o), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ i("div", { className: L.find, children: [
    /* @__PURE__ */ n(lu, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function su(e, t) {
  const [a, r] = v(""), l = f(null), o = t !== void 0 && Od(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = l.current) == null || d.focus();
  };
  return o ? { find: t, query: a, setQuery: r, input: l, toFind: s, entries: Fd(e, a) } : { query: a, setQuery: r, input: l, entries: e };
}
const cu = { regular: void 0, large: L.large, touch: L.touch }, du = (e, t) => Pn(L.panel, e ? L.edged : void 0, cu[t]);
function uu({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function fr({ entries: e, footer: t, align: a = "start", find: r, edges: l, size: o = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = ru(), h = f(null);
  or(u, h, a, l);
  const w = su(e, r), _ = Pd(w.entries), N = Kd(_.flatMap(jd).map((O) => O.item)), k = Ud(N, s, w.toFind), M = Vd(s);
  return Jd(N, s), /* @__PURE__ */ i("div", { ref: h, className: du(l, o), ...M, children: [
    w.find && /* @__PURE__ */ n(iu, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: N, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...k, children: _.map((O, we) => /* @__PURE__ */ n(au, { block: O, nav: N, popup: s }, we)) }),
    /* @__PURE__ */ n(uu, { find: w.find, count: N.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function hu(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function vr(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !hu(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const mu = (e, t) => e.reduce((a, r) => a + r + t, -t);
function wu({ room: e, widths: t, more: a, gap: r }, l) {
  const o = t.map((d, u) => u);
  if (mu(t, r) <= e) return o;
  const s = /* @__PURE__ */ new Set([l]);
  let c = t[l] + r + a;
  for (const d of o)
    if (d !== l) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return o.filter((d) => s.has(d));
}
const on = (e) => Number.parseFloat(e) || 0, da = (e) => e.getBoundingClientRect().width;
function _u(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - on(a.paddingInlineStart) - on(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), da),
    more: r ? da(r) : 0,
    gap: on(a.columnGap)
  };
}
function fu(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const vu = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function br(e, t, a, r = ':scope > [role="tab"]') {
  const [l, o] = v(null);
  return Qe(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = _u(s, r);
      o((u) => vu(u, d) ? u : d);
    };
    return c(), fu(s, c);
  }, [e, a, r]), l && wu(l, t);
}
const bu = "_strip_1eynz_2", pu = "_fits_1eynz_19", gu = "_probe_1eynz_27", yu = "_moreRoot_1eynz_36", Nu = "_more_1eynz_36", ku = "_tab_1eynz_55", $u = "_count_1eynz_91", Cu = "_badge_1eynz_97", U = {
  strip: bu,
  fits: pu,
  probe: gu,
  moreRoot: yu,
  more: Nu,
  tab: ku,
  count: $u,
  badge: Cu
}, pr = "More";
function Su(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const ua = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, jn = (e) => e.badge === void 0 ? ua(e) : `${ua(e)}, ${e.badge}`;
function gr(e) {
  return `${U.strip} ward-tabs ward-tabs--${e}`;
}
const Ru = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function xu({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${U.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : jn(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: U.badge, children: e.badge })
      ]
    }
  );
}
function Tu(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((o) => o.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Lu({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(mr, { label: pr, className: U.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((r) => ({ label: jn(r), onSelect: () => a(r.id) })) }) });
}
function Mu(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Ru;
}
function WL({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: l }) {
  const o = Jt({ orientation: "horizontal" }), s = Su(e, t);
  S(() => o.setActive(s), [o.setActive, s]);
  const c = f(null);
  vr(c, l);
  const d = br(c, s, e.map(jn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ i("div", { ref: c, className: `${gr(l)} ${U.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...o.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(xu, { tab: h, active: t, place: Mu(o, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: pr }),
    u.length > 0 && /* @__PURE__ */ n(Lu, { tabs: u, trigger: o.itemProps(e.length), onPick: Tu(c, a) })
  ] });
}
const ha = 7, yr = "More", Au = ":scope > a", Nr = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Iu = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Eu(e, t) {
  return !e || e.includes(t) ? {} : Iu;
}
function Bu({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ i("a", { href: e.href, className: `${U.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ i(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: U.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Pu({ links: e }) {
  return /* @__PURE__ */ n(mr, { label: yr, className: U.moreRoot, trigger: { className: U.more }, children: /* @__PURE__ */ n(fr, { align: "end", entries: e.map((t) => ({ label: Nr(t), href: t.href })) }) });
}
function KL({ links: e, active: t, label: a, level: r }) {
  if (e.length > ha) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ha} — the set is fixed`);
  const l = f(null);
  vr(l, r);
  const o = Math.max(0, e.findIndex((d) => d.id === t)), s = br(l, o, e.map(Nr).join(`
`), Au), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ i("nav", { ref: l, className: `${gr(r)} ${U.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Bu, { link: d, current: d.id === t, place: Eu(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${U.more} ${U.probe}`, children: yr }),
    c.length > 0 && /* @__PURE__ */ n(Pu, { links: c })
  ] });
}
const ju = "_root_jws4d_3", Ou = "_segment_jws4d_9", ma = {
  root: ju,
  segment: Ou
};
function kr({ options: e, value: t, onChange: a, label: r = "Options", disabled: l = !1, describedBy: o }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Jt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${ma.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: ma.segment,
      "aria-checked": d.value === t,
      disabled: l,
      "aria-describedby": o,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Du = "_sidebar_s9o1j_3", qu = "_brand_s9o1j_9", Hu = "_mark_s9o1j_17", Fu = "_word_s9o1j_24", zu = "_nav_s9o1j_30", Wu = "_navItem_s9o1j_39", Ku = "_footLink_s9o1j_49", Gu = "_group_s9o1j_58", Uu = "_groupName_s9o1j_65", Vu = "_agents_s9o1j_81", Yu = "_agent_s9o1j_81", Ju = "_root_s9o1j_96", Qu = "_agentTop_s9o1j_105", Xu = "_dot_s9o1j_112", Zu = "_agentName_s9o1j_124", eh = "_agentMeta_s9o1j_138", th = "_foot_s9o1j_49", nh = "_footName_s9o1j_150", ah = "_footLinks_s9o1j_157", rh = "_linkBrand_s9o1j_184", lh = "_label_s9o1j_205", oh = "_note_s9o1j_210", ih = "_footer_s9o1j_226", I = {
  sidebar: Du,
  brand: qu,
  mark: Hu,
  word: Fu,
  nav: zu,
  navItem: Wu,
  new: "_new_s9o1j_48",
  footLink: Ku,
  group: Gu,
  groupName: Uu,
  agents: Vu,
  agent: Yu,
  root: Ju,
  agentTop: Qu,
  dot: Xu,
  agentName: Zu,
  agentMeta: eh,
  foot: th,
  footName: nh,
  footLinks: ah,
  linkBrand: rh,
  label: lh,
  note: oh,
  footer: ih
};
function sh({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ i(
    "a",
    {
      className: I.agent,
      href: T(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ i("span", { className: I.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: I.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: I.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: I.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ch({ shared: e }) {
  return e ? /* @__PURE__ */ i("div", { className: I.foot, children: [
    /* @__PURE__ */ n("span", { className: I.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: I.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${I.footLink} ward-target`, href: T(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function dh({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: l, shared: o }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ i("nav", { className: I.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ i("div", { className: I.brand, children: [
      /* @__PURE__ */ n("span", { className: I.mark }),
      /* @__PURE__ */ n("span", { className: I.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: I.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: I.navItem, href: T(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ i("div", { className: I.group, children: [
      /* @__PURE__ */ i("span", { className: I.groupName, children: [
        a,
        " · ",
        ne(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: I.new, href: T(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: I.agents, children: r.map((s) => /* @__PURE__ */ n(sh, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ch, { shared: o })
  ] });
}
function uh(e) {
  return e.destinations ?? e.items ?? [];
}
function hh({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.linkBrand, children: e });
}
function mh({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: I.footer, children: e });
}
function wh({ link: e, active: t }) {
  return /* @__PURE__ */ i("a", { href: T(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: I.note, children: e.note })
  ] });
}
function _h(e) {
  return /* @__PURE__ */ i("aside", { className: `${I.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(hh, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: uh(e).map((t) => /* @__PURE__ */ n(wh, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(mh, { children: e.children })
  ] });
}
function fh(e) {
  return "agents" in e;
}
function GL(e) {
  return fh(e) ? /* @__PURE__ */ n(dh, { ...e }) : /* @__PURE__ */ n(_h, { ...e });
}
const vh = "_mark_wlgi8_3", bh = {
  mark: vh
}, ph = { met: "✓", unmet: "", failed: "✕" };
function On({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: bh.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: ph[e]
    }
  );
}
const gh = "_avatar_1t33a_3", yh = {
  avatar: gh
};
function Ht(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Nh(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [Ht(e), ...[...t.slice(1)].map((r) => a + r)];
}
function kh(e, t) {
  const a = Nh(e).find((l) => !t.has(l));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(Ht(e).charAt(0) + String(r)); ) r += 1;
  return Ht(e).charAt(0) + String(r);
}
function UL(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const l = kh(r, t);
    t.add(l), a.set(r, l);
  }
  return a;
}
function $h(e) {
  return e != null && yt(e) ? Yl(e) : void 0;
}
function VL({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: yh.avatar, "data-size": a, "aria-hidden": "true", style: $h(t), children: r ?? Ht(e) });
}
const Ch = "_marker_br9fi_2", Sh = {
  marker: Ch
}, Rh = {
  stream: "var(--stream)",
  green: "var(--ward-color-done)",
  blue: "var(--ward-color-running)",
  orange: "var(--ward-color-waiting)",
  red: "var(--ward-color-danger)",
  amber: "var(--ward-color-waiting)",
  neutral: "var(--ward-color-faint)",
  greenFill: "var(--ward-color-done)",
  orangeFill: "var(--ward-color-waiting)",
  owed: "var(--ward-color-peach)",
  running: "var(--ward-color-running)",
  ok: "var(--ward-color-done)",
  finding: "var(--ward-color-waiting)",
  action: "var(--ward-color-text)",
  hollow: "var(--ward-color-faint)",
  attention: "var(--ward-color-waiting)",
  tick: "var(--ward-color-done)",
  box: "var(--ward-color-line2)"
}, xh = { running: " ward-running" };
function Ke({ size: e, kind: t, label: a }) {
  const r = { "--marker": Rh[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Sh.marker} ward-marker ward-marker--${t}${xh[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const Th = "_root_ti0pq_2", Lh = "_chip_ti0pq_11", Mh = "_noCase_ti0pq_23", xt = {
  root: Th,
  chip: Lh,
  noCase: Mh
};
function Ah(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Dn({ connection: e, since: t, lastEventAt: a }) {
  const r = Ah(t, a), l = Mn(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ i("span", { className: `${xt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ke, { size: 6, kind: "green" }),
    "Live"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Reconnecting ·",
    " ",
    /* @__PURE__ */ n("span", { className: xt.noCase, children: Tn(l) })
  ] }) : /* @__PURE__ */ i("span", { className: `${xt.chip} ward-connection`, role: "status", children: [
    "Out of date · as of ",
    me(r)
  ] });
}
const Ih = "_root_yylks_2", Eh = "_context_yylks_13", Bh = "_row_yylks_1", Ph = "_heading_yylks_27", jh = "_headingWrap_yylks_35", Oh = "_meta_yylks_41", Dh = "_chips_yylks_49", qh = "_title_yylks_56", Hh = "_consequence_yylks_66", Fh = "_actionsWrap_yylks_73", zh = "_actions_yylks_73", Wh = "_action_yylks_73", Kh = "_overflowPanel_yylks_102", Gh = "_measureClip_yylks_113", Uh = "_measure_yylks_113", G = {
  root: Ih,
  context: Eh,
  row: Bh,
  heading: Ph,
  headingWrap: jh,
  meta: Oh,
  chips: Dh,
  title: qh,
  consequence: Hh,
  actionsWrap: Fh,
  actions: zh,
  action: Wh,
  overflowPanel: Kh,
  measureClip: Gh,
  measure: Uh
};
function Vh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(st, { as: "h1", className: G.title, text: e }) : /* @__PURE__ */ n("h1", { className: G.title, children: e });
}
function Yh({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: G.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function Jh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: G.consequence, title: t, children: e }) : null;
}
function Qh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ i("div", { className: G.meta, children: [
    /* @__PURE__ */ n(Yh, { chips: e }),
    /* @__PURE__ */ n(Jh, { consequence: t, consequenceHint: a })
  ] });
}
function Xh({ title: e, chips: t, consequence: a, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: G.heading, children: [
    /* @__PURE__ */ n(Vh, { title: e, density: l }),
    /* @__PURE__ */ n(Qh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function pn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: G.action, "data-action": "", children: t }, a));
}
function wa({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Zh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: l }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(wa, { disclosure: l }) : t ? [/* @__PURE__ */ n(wa, { disclosure: l }, "more"), /* @__PURE__ */ n(pn, { actions: e }, "actions")] : /* @__PURE__ */ n(pn, { actions: e });
}
function em(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function tm({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: G.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(pn, { actions: e }) });
}
function nm(e, t) {
  const a = y(), [r, l] = v(!1), o = r && e;
  return { disclosure: { open: o, panelId: a, toggle: () => l(!o) }, close: () => {
    var d, u;
    l(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const am = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function rm(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && am(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function lm({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: G.context, children: /* @__PURE__ */ n(wc, { path: e.path, current: e.current }) });
}
function om(...e) {
  return e.some((t) => t === null);
}
function im(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function sm(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + im(e);
}
function cm(e, t, a, r, l) {
  if (l === 0 || om(t, a, r)) return !1;
  const [o, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - sm(e, o));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function dm(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function um(e) {
  return Tl(e) && (e.type === "a" || typeof e.props.href == "string");
}
function hm(e, t) {
  return t.length === 0 && e.length === 1 && um(e[0]);
}
function mm(e, t) {
  const a = f(null), r = f(null), l = f(null), o = f(null), [s, c] = v(!1);
  return S(() => {
    const d = a.current;
    if (!dm(d)) return;
    const u = () => c(cm(d, r.current, l.current, o.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), o.current && h.observe(o.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: l, measureRef: o, collapsed: s && !t };
}
function wm({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: G.measureClip, children: /* @__PURE__ */ i("div", { className: G.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function _m({ connection: e }) {
  return e ? /* @__PURE__ */ n(Dn, { connection: e.connection, since: e.since }) : null;
}
function YL({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: l, consequenceHint: o, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: _, actionsRef: N, measureRef: k, collapsed: M } = mm(s, hm(s, c)), O = c.length > 0, { disclosure: we, close: ae } = nm(M || O, N), Ce = em(c, s, M, u);
  return /* @__PURE__ */ i("header", { className: G.root, "data-density": h, children: [
    /* @__PURE__ */ n(lm, { crumb: rm(e, r, t) }),
    /* @__PURE__ */ i("div", { className: G.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: _, className: G.headingWrap, children: /* @__PURE__ */ n(Xh, { title: r, chips: a, consequence: l, consequenceHint: o, density: h }) }),
      /* @__PURE__ */ i("div", { className: G.actionsWrap, children: [
        /* @__PURE__ */ n(_m, { connection: d }),
        /* @__PURE__ */ n("div", { className: G.actions, ref: N, "data-ward-actions": !0, children: /* @__PURE__ */ n(Zh, { actions: s, hasMore: O, collapsed: M, onOverflow: u, disclosure: we }) })
      ] })
    ] }),
    /* @__PURE__ */ n(tm, { actions: Ce, disclosure: we, onEscape: ae }),
    /* @__PURE__ */ n(wm, { actions: s, hasMore: O, measureRef: k })
  ] });
}
const fm = "_root_td96x_2", vm = "_body_td96x_16", _a = {
  root: fm,
  body: vm
};
function JL({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${_a.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: _a.body, children: a }) });
}
const bm = "_tip_1bmx3_2", pm = "_bubble_1bmx3_1", fa = {
  tip: bm,
  bubble: pm
}, ht = 16;
function gm(e, t, a) {
  return e < ht ? ht - e : t > a - ht ? Math.max(a - ht - t, ht - e) : 0;
}
function ym(e) {
  const t = f(null), [a, r] = v(0);
  return Qe(() => {
    const l = t.current;
    if (!e || l === null) {
      r(0);
      return;
    }
    const o = l.getBoundingClientRect();
    r((s) => s + gm(o.left, o.right, window.innerWidth));
  }, [e]), { bubble: t, style: { "--ward-tip-shift": `${a}px` } };
}
function QL({ label: e, text: t, align: a = "center" }) {
  const r = y(), [l, o] = v(!1), s = ym(l), c = (h) => {
    h.key !== "Escape" || !l || (h.stopPropagation(), o(!1));
  }, d = () => o(!0), u = () => o(!1);
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      className: `${fa.tip} ward-infotip`,
      "aria-label": `What ${e} counts`,
      "aria-describedby": r,
      "data-open": l ? "" : void 0,
      "data-align": a,
      onMouseEnter: d,
      onMouseLeave: u,
      onFocus: d,
      onBlur: u,
      onKeyDown: c,
      children: [
        /* @__PURE__ */ i("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "9" }),
          /* @__PURE__ */ n("path", { d: "M12 11v5M12 8h.01" })
        ] }),
        /* @__PURE__ */ n("span", { className: fa.bubble, role: "tooltip", id: r, ref: s.bubble, style: s.style, children: t })
      ]
    }
  );
}
const Nm = "_row_ht9sg_2", km = {
  row: Nm
}, qn = "custom", $m = [
  { value: "7d", label: "Last 7 days" },
  { value: "4w", label: "Last 4 weeks" },
  { value: "8w", label: "Last 8 weeks" },
  { value: "q", label: "This quarter" },
  { value: qn, label: "Custom range" }
], Cm = (e) => e.from !== "" && e.to !== "" && e.from <= e.to, Sm = (e) => e.from !== "" && e.to !== "" && e.from > e.to, va = { from: "", to: "" }, Rm = (e, t) => t === null && "preset" in e ? e.preset : qn;
function xm({ range: e, today: t, setEnd: a }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(E, { kind: "date", label: "From", value: e.from, max: e.to || t, onChange: a("from"), invalid: Sm(e) ? "The start is after the end." : void 0 }),
    /* @__PURE__ */ n(E, { kind: "date", label: "To", value: e.to, min: e.from || void 0, max: t, onChange: a("to") })
  ] });
}
function XL({ value: e, onChange: t, today: a }) {
  const [r, l] = v("from" in e ? e : null), o = (c) => {
    if (c === qn) return l(r ?? va);
    l(null), t({ preset: c });
  }, s = (c) => (d) => {
    const u = { ...r ?? va, [c]: d };
    l(u), Cm(u) && t(u);
  };
  return /* @__PURE__ */ i("div", { className: `${km.row} ward-period`, children: [
    /* @__PURE__ */ n(E, { kind: "select", label: "Period", value: Rm(e, r), options: $m, onChange: o }),
    r === null ? null : /* @__PURE__ */ n(xm, { range: r, today: a, setEnd: s })
  ] });
}
const Tm = "_root_bf1pc_2", Lm = "_table_bf1pc_9", Mm = "_caption_bf1pc_14", Am = "_series_bf1pc_23", Im = "_category_bf1pc_31", Em = "_cell_bf1pc_39", Bm = "_track_bf1pc_45", Pm = "_lane_bf1pc_52", jm = "_bar_bf1pc_56", Om = "_value_bf1pc_63", Dm = "_swatch_bf1pc_70", qm = "_empty_bf1pc_78", Q = {
  root: Tm,
  table: Lm,
  caption: Mm,
  series: Am,
  category: Im,
  cell: Em,
  track: Bm,
  lane: Pm,
  bar: jm,
  value: Om,
  swatch: Dm,
  empty: qm
}, Hm = "—", ba = 6;
function Fm(e, t) {
  if (t.length < 1 || t.length > ba)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${ba}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function zm(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function $r(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Wm(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Km({ value: e, top: t, step: a, format: r, missing: l }) {
  const o = Wm(e, t), s = { "--share": `${o}%` };
  return /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ i("span", { className: Q.track, children: [
    /* @__PURE__ */ n("span", { className: Q.lane, children: o > 0 ? /* @__PURE__ */ n("span", { className: `${Q.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Q.value, children: e === null ? l : r(e) })
  ] }) });
}
function Gm({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ i("th", { scope: "col", className: Q.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Q.swatch, "data-step": $r(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Um({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ i("section", { className: `${Q.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Q.empty, children: t })
  ] });
}
function Vm({ title: e, categories: t, series: a, top: r, format: l = ne, categoryHead: o = "Category", missing: s = Hm }) {
  return /* @__PURE__ */ n("div", { className: `${Q.root} ward-barchart`, children: /* @__PURE__ */ i("table", { className: Q.table, children: [
    /* @__PURE__ */ n("caption", { className: Q.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Q.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: o }) }),
      /* @__PURE__ */ n(Gm, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Q.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Km, { value: u.values[d], top: r, step: $r(h, a.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function ZL(e) {
  Fm(e.categories, e.series);
  const t = zm(e.series);
  return t === 0 ? /* @__PURE__ */ n(Um, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Vm, { ...e, top: t });
}
const Ym = "_root_1bfqw_2", Jm = "_figure_1bfqw_7", Qm = "_of_1bfqw_13", Xm = "_bar_1bfqw_18", Zm = "_rows_1bfqw_38", ew = "_row_1bfqw_38", tw = "_label_1bfqw_49", nw = "_amount_1bfqw_54", Oe = {
  root: Ym,
  figure: Jm,
  of: Qm,
  bar: Xm,
  rows: Zm,
  row: ew,
  label: tw,
  amount: nw
};
function aw({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ i("div", { className: `${Oe.root} ward-costmeter`, children: [
    /* @__PURE__ */ i("p", { className: `${Oe.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ i("span", { className: Oe.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Oe.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Oe.rows, children: a.map((l) => /* @__PURE__ */ i("li", { className: `${Oe.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Oe.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Oe.amount, children: le(l.amount) })
    ] }, l.label)) })
  ] });
}
const rw = "_frame_f7bxz_2", lw = "_table_f7bxz_6", ow = "_th_f7bxz_12", iw = "_td_f7bxz_13", sw = "_sort_f7bxz_53", cw = "_row_f7bxz_65", dw = "_empty_f7bxz_73", Fe = {
  frame: rw,
  table: lw,
  th: ow,
  td: iw,
  sort: sw,
  row: cw,
  empty: dw
}, uw = { asc: "ascending", desc: "descending" };
function hw(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return uw[t.direction];
}
function mw(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: Fe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function ww(e) {
  return e === void 0 ? void 0 : { width: e };
}
function _w({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Fe.th,
      style: ww(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": hw(e, t),
      children: mw(e, a)
    }
  );
}
function fw({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Fe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((l) => /* @__PURE__ */ n(
        "td",
        {
          className: Fe.td,
          "data-align": l.align,
          "data-mono": l.mono,
          "data-drop": l.dropPriority,
          "data-label": t.narrow ? l.header : void 0,
          children: t.renderCell(e, l.key)
        },
        l.key
      ))
    }
  );
}
function vw({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: l,
  selectedId: o,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: Fe.empty, children: u }) : /* @__PURE__ */ n("div", { className: Fe.frame, "data-narrow": h, children: /* @__PURE__ */ i("table", { className: Fe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Fe.head, children: t.map((w) => /* @__PURE__ */ n(_w, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(fw, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: l, selectedId: o, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const bw = "_list_v0s52_2", pw = {
  list: bw
};
function gw({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: pw.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const yw = "_label_1u62a_2", Nw = {
  label: yw
};
function e3({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Nw.label, children: t.header }) }, t.key)) }) });
}
const kw = "_stack_bp6a0_2", $w = {
  stack: kw
};
function t3({ children: e }) {
  return /* @__PURE__ */ n("span", { className: $w.stack, "data-ward-action-stack": "", children: e });
}
const Cw = "_set_1z0sq_2", Sw = "_legend_1z0sq_7", Rw = "_row_1z0sq_15", xw = "_control_1z0sq_20", Tw = "_input_1z0sq_26", Lw = "_label_1z0sq_31", Mw = "_consequence_1z0sq_36", Ue = {
  set: Cw,
  legend: Sw,
  row: Rw,
  control: xw,
  input: Tw,
  label: Lw,
  consequence: Mw
};
function Cr({ legend: e, options: t, value: a, onChange: r, disabled: l, name: o, describedBy: s, variant: c }) {
  const d = y(), u = o ?? d;
  return /* @__PURE__ */ i("fieldset", { className: Ue.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Ue.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, _ = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ i("div", { className: Ue.row, children: [
        /* @__PURE__ */ i("span", { className: Ue.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Ue.input,
              value: h.value,
              checked: a === h.value,
              disabled: l,
              "aria-describedby": dt(_, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: Ue.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: _, className: `${Ue.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Aw = "_root_11gpw_2", Iw = "_head_11gpw_10", Ew = "_note_11gpw_29", Bw = "_index_11gpw_34", Pw = "_dot_11gpw_38", jw = "_counter_11gpw_49", Ow = "_trailing_11gpw_57", Ye = {
  root: Aw,
  head: Iw,
  note: Ew,
  index: Bw,
  dot: Pw,
  counter: jw,
  trailing: Ow
};
function Dw({ index: e }) {
  return e ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ye.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ye.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function qw({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ye.counter, "aria-hidden": "true", children: e }) : null;
}
function pa({ title: e, index: t, note: a, counter: r, kind: l = "micro", trailing: o }) {
  return /* @__PURE__ */ i("div", { className: `${Ye.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ i("h2", { className: Ye.head, children: [
      /* @__PURE__ */ n(Dw, { index: t }),
      e,
      r && /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ye.note, children: a }),
    /* @__PURE__ */ n(qw, { counter: r }),
    o === void 0 ? null : /* @__PURE__ */ n("span", { className: Ye.trailing, children: o })
  ] });
}
const Hw = "_strip_c3x3u_2", Fw = "_cell_c3x3u_7", zw = "_value_c3x3u_12", Ww = "_link_c3x3u_29", Kw = "_label_c3x3u_49", Gw = "_tiles_c3x3u_101", We = {
  strip: Hw,
  cell: Fw,
  value: zw,
  link: Ww,
  label: Kw,
  tiles: Gw
};
function Sr(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Rr = (e) => `${We.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Uw({ cell: e }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Rr(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${We.label} ward-stat-label`, children: e.label })
  ] });
}
function Vw({ cell: e, href: t }) {
  return /* @__PURE__ */ i("div", { className: We.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Rr(e), title: e.hint, children: /* @__PURE__ */ i("a", { className: `${We.link} ward-stat-link`, href: T(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${We.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const xr = (e) => e.href === void 0 ? /* @__PURE__ */ n(Uw, { cell: e }, e.label) : /* @__PURE__ */ n(Vw, { cell: e, href: e.href }, e.label);
function en({ cells: e, divided: t = !1 }) {
  return Sr("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${We.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(xr) });
}
const ga = 6;
function n3({ cells: e }) {
  Sr("StatTiles", e, [1, 2 * ga]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, ga) };
  return /* @__PURE__ */ n("dl", { className: `${We.tiles} ward-stattiles`, style: t, children: e.map(xr) });
}
const Yw = "_root_1eb1u_2", Jw = "_track_1eb1u_8", Qw = "_thumb_1eb1u_46", Xw = "_labelHidden_1eb1u_64", Zw = "_label_1eb1u_64", it = {
  root: Yw,
  track: Jw,
  thumb: Qw,
  labelHidden: Xw,
  label: Zw
};
function e_(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function t_(e) {
  return e ? `${it.label} ${it.labelHidden}` : it.label;
}
function n_(e, t, a) {
  return e && !t && a ? a : void 0;
}
function a_(e, t, a, r) {
  return { "aria-describedby": Xt(dt(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function r_({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Xe({ label: e, checked: t, onChange: a, disabled: r, locked: l, describedBy: o, labelHidden: s, disabledReason: c }) {
  const d = y(), u = `${d}switch`, h = `${d}reason`, w = je(), { on: _, off: N } = e_(t, r, l, w !== null), k = n_(N, w !== null, c);
  return /* @__PURE__ */ i("span", { className: `${it.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": _,
        "aria-label": e,
        "aria-labelledby": d,
        ...a_(h, o, w, k),
        className: `${it.track} ward-switch`,
        "data-on": _,
        "data-locked": l ? !0 : void 0,
        disabled: N,
        onClick: () => !N && (a == null ? void 0 : a(!_)),
        children: /* @__PURE__ */ n("span", { className: it.thumb })
      }
    ),
    /* @__PURE__ */ n("label", { id: d, htmlFor: u, className: t_(s), children: e }),
    /* @__PURE__ */ n(r_, { id: h, reason: k })
  ] });
}
const l_ = "_bar_1vp69_2", o_ = "_skip_1vp69_11", i_ = "_mark_1vp69_22", s_ = "_nav_1vp69_30", c_ = "_list_1vp69_34", d_ = "_select_1vp69_41", u_ = "_selectTrigger_1vp69_45", h_ = "_dest_1vp69_52", m_ = "_actor_1vp69_71", w_ = "_actorMark_1vp69_84", __ = "_actorLabel_1vp69_89", f_ = "_tagline_1vp69_108", ce = {
  bar: l_,
  skip: o_,
  mark: i_,
  nav: s_,
  list: c_,
  select: d_,
  selectTrigger: u_,
  dest: h_,
  actor: m_,
  actorMark: w_,
  actorLabel: __,
  tagline: f_
};
function v_(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function b_(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function a3({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: l, onNavigate: o, skipTo: s = "main" }) {
  const c = b_(r);
  return /* @__PURE__ */ i("header", { className: ce.bar, children: [
    /* @__PURE__ */ n("a", { className: `${ce.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ce.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: ce.tagline, children: l }),
    /* @__PURE__ */ i("nav", { className: ce.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ce.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${ce.dest} ward-target`,
          href: T(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => o == null ? void 0 : o(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        dr,
        {
          className: ce.select,
          triggerClassName: ce.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => o == null ? void 0 : o(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ i("span", { className: ce.actor, children: [
      /* @__PURE__ */ n("span", { className: ce.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: ce.actorMark, "aria-hidden": "true", children: v_(c) })
    ] })
  ] });
}
const p_ = "_tree_zzoob_2", g_ = "_item_zzoob_6", y_ = "_row_zzoob_10", N_ = "_button_zzoob_22", Ft = {
  tree: p_,
  item: g_,
  row: y_,
  button: N_
}, Tr = $e(null);
function k_({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Jt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Tr.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Ft.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const $_ = { ArrowRight: !0, ArrowLeft: !1 };
function ya(e) {
  return e ? !0 : void 0;
}
function C_(e, t) {
  const a = $_[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function S_(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function R_(e) {
  const t = [Ft.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function x_(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function T_(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function L_(e) {
  return typeof e == "string" ? e : void 0;
}
function M_({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function A_({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Lr(e) {
  const t = pe(Tr);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = x_(e);
  return /* @__PURE__ */ i("li", { className: Ft.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: R_(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": ya(e.unresolved),
        "data-inherited": ya(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            className: `${Ft.button} ward-treeitem-btn`,
            onClick: () => S_(e),
            onKeyDown: (r) => C_(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: T_(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: L_(e.label), children: e.label }),
              /* @__PURE__ */ n(M_, { value: e.detail }),
              /* @__PURE__ */ n(A_, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const I_ = "_frame_gxspk_2", E_ = "_subjectRail_gxspk_22", B_ = "_subject_gxspk_22", P_ = "_rail_gxspk_42", j_ = "_record_gxspk_57", O_ = "_recordBody_gxspk_102", D_ = "_stageGrid_gxspk_157", q_ = "_band_gxspk_171", H_ = "_bandBody_gxspk_179", F_ = "_bandActions_gxspk_184", z_ = "_scroller_gxspk_192", W_ = "_board_gxspk_219", K_ = "_lanes_gxspk_228", G_ = "_cardGrid_gxspk_262", X = {
  frame: I_,
  subjectRail: E_,
  subject: B_,
  rail: P_,
  record: j_,
  recordBody: O_,
  stageGrid: D_,
  band: q_,
  bandBody: H_,
  bandActions: F_,
  scroller: z_,
  board: W_,
  lanes: K_,
  cardGrid: G_
};
function r3({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: X.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Na(e) {
  return e ? "true" : void 0;
}
function l3({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: l, ruled: o }) {
  return /* @__PURE__ */ i("div", { className: X.subjectRail, "data-ward-subject-rail": a, "data-ruled": Na(o), children: [
    /* @__PURE__ */ n("div", { className: X.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: X.rail, "data-sticky": Na(l), "aria-label": r, children: t })
  ] });
}
function o3({ title: e, children: t, note: a, trailing: r, pad: l = "block", label: o, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(pa, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ i("section", { className: X.record, "aria-label": o, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(pa, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: t })
  ] });
}
const U_ = "_form_1j8ub_2", V_ = "_fields_1j8ub_9", Y_ = "_actions_1j8ub_19", sn = {
  form: U_,
  fields: V_,
  actions: Y_
};
function i3({ label: e, children: t, actions: a, onSubmit: r }) {
  const l = (o) => {
    o.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ i("form", { className: sn.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: sn.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: sn.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function s3({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ i("section", { className: X.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: X.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: X.bandActions, children: t })
  ] });
}
const J_ = "(max-width: 767.98px)";
function Hn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(In, { className: X.scroller, label: e, count: a ?? za.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function Q_({ lanes: e, label: t, laneLabel: a }) {
  const [r, l] = v(null), o = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ i("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(E, { kind: "select", label: a, value: (o == null ? void 0 : o.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Hn, { label: t, children: o == null ? void 0 : o.content })
  ] });
}
function X_({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ n(Hn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(Fa, { children: a.content }, a.id)) }) });
}
function c3({ children: e, label: t = "Board", lanes: a, laneLabel: r = "Column" }) {
  const l = pt(J_);
  return a === void 0 ? /* @__PURE__ */ n(Hn, { label: t, children: e }) : l ? /* @__PURE__ */ n(Q_, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(X_, { lanes: a, label: t });
}
function d3({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), o = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ n(In, { className: X.stageGrid, label: a, count: l, "data-ward-stage-grid": "", "data-floor": r, style: o, children: t });
}
function u3({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${X.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const Z_ = "_block_6tv5x_3", ef = "_sentence_6tv5x_10", tf = "_meta_6tv5x_19", nf = "_ways_6tv5x_24", af = "_action_6tv5x_38", rf = "_strip_6tv5x_42", lf = "_loading_6tv5x_61", of = "_label_6tv5x_69", sf = "_counter_6tv5x_76", be = {
  block: Z_,
  sentence: ef,
  meta: tf,
  ways: nf,
  action: af,
  strip: rf,
  loading: lf,
  label: of,
  counter: sf
};
function cf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: be.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function tn({ sentence: e, action: t, children: a, role: r = "status", tone: l, kind: o, ask: s }) {
  return /* @__PURE__ */ i("div", { className: `${be.block} ward-state${o === void 0 ? "" : ` ${o}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ i("p", { className: be.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ i(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(cf, { action: t })
  ] });
}
function df(e) {
  return /* @__PURE__ */ n(tn, { ...e, kind: "ward-emptystate" });
}
function h3({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(tn, { sentence: e, action: a, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function uf({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${be.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function m3({ ways: e, ...t }) {
  return /* @__PURE__ */ n(tn, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(uf, { ways: e }) });
}
function w3({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(tn, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ i("p", { className: be.meta, children: [
    "failed at ",
    me(t)
  ] }) });
}
function _3({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    me(e),
    ". Showing snapshot from ",
    me(t)
  ] });
}
function f3({ queued: e, since: t }) {
  return /* @__PURE__ */ i("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    me(t)
  ] });
}
function v3({ label: e, startedAt: t }) {
  const a = f(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = v(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), ye.load);
    return () => window.clearTimeout(s);
  }, []);
  const o = Mn(a.current, r);
  return /* @__PURE__ */ i("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: be.counter, children: Tn(o) }) : null
  ] });
}
const hf = "_note_cigdt_2", mf = {
  note: hf
};
function wf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ i("p", { className: mf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const _f = "_card_k7btg_3", ff = "_hit_k7btg_31", vf = "_head_k7btg_44", bf = "_title_k7btg_51", pf = "_meta_k7btg_57", gf = "_since_k7btg_66", yf = "_sep_k7btg_76", Nf = "_fields_k7btg_80", kf = "_field_k7btg_80", $f = "_last_k7btg_98", Cf = "_reason_k7btg_110", he = {
  card: _f,
  hit: ff,
  head: vf,
  title: bf,
  meta: pf,
  since: gf,
  sep: yf,
  fields: Nf,
  field: kf,
  last: $f,
  reason: Cf
}, Sf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Rf(e, t, a) {
  const r = Bt(e, "blue"), l = Bt(e, "orange"), o = Bt(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: l, green: o };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Sf[d.type];
      u && c[u]();
    });
  }, [r, a, o, t, l]);
}
const xf = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Tf(e, t) {
  return xf[t](e);
}
function Lf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: he.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ i("p", { className: he.meta, "data-ward-card-meta": "", children: [
    e.waitsOn && /* @__PURE__ */ i(x, { children: [
      "waits on ",
      e.waitsOn,
      a
    ] }),
    /* @__PURE__ */ i("span", { className: he.since, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Mf({ item: e }) {
  const t = e.run ? { role: "running", label: "Running" } : e.state;
  return /* @__PURE__ */ i("div", { className: he.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Off plan" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Af({ reason: e }) {
  return e ? /* @__PURE__ */ i("p", { className: he.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function If({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: he.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: he.field, children: Tf(e, a) }, a)) });
}
const gn = (e) => e ? !0 : void 0;
function Ef(e) {
  return { "--stream": ke(e.streamStep, "id") };
}
function Bf(e, t, a) {
  e == null || e(t, a);
}
function Pf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function jf({ item: e, stale: t }) {
  var r, l;
  const a = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: he.last, "data-stale": gn(t), children: a }) : null;
}
function nn(e) {
  const t = e.fields ?? [], a = e.item, r = f(null);
  Rf(r, a.key, e.feed);
  const l = Pf(e.feed), o = Ef(a);
  return /* @__PURE__ */ i(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: he.card,
      style: o,
      "data-selected": gn(e.selected),
      "data-flagged": gn(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: he.hit, onClick: (s) => Bf(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ i("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Mf, { item: a }),
        /* @__PURE__ */ n(st, { as: "p", className: he.title, text: a.title }),
        /* @__PURE__ */ n(Lf, { item: a, connection: l }),
        /* @__PURE__ */ n(Af, { reason: a.blockedReason }),
        /* @__PURE__ */ n(If, { item: a, fields: t }),
        /* @__PURE__ */ n(jf, { item: a, stale: l === "stale" })
      ]
    }
  );
}
function kt(e, t) {
  return e.trim().toLowerCase() === t.toLowerCase();
}
const Of = "_column_1j8bi_3", Df = "_head_1j8bi_21", qf = "_label_1j8bi_30", Hf = "_count_1j8bi_39", Ff = "_list_1j8bi_53", vt = {
  column: Of,
  head: Df,
  label: qf,
  count: Hf,
  list: Ff
};
function Mr(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function zf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ i("div", { className: vt.head, children: [
    /* @__PURE__ */ n("h2", { className: vt.label, id: a, title: e.label, children: e.label }),
    e.gate && !kt(e.label, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review" }),
    /* @__PURE__ */ i("span", { className: vt.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Wf(e) {
  return /* @__PURE__ */ n("div", { className: vt.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      nn,
      {
        item: t,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: t.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + a),
        inList: !0
      },
      t.key
    );
  }) });
}
function Kf({ column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, onKeyDown: d }) {
  const u = y(), h = e.cap !== void 0 && t.length > e.cap, w = Mr(t, r);
  return /* @__PURE__ */ i("section", { className: vt.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(zf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Wf, { column: e, items: t, fields: a, sort: r, onOpen: l, selectedKey: o, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(wf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Gf = "_foot_cs4jr_2", Uf = "_note_cs4jr_13", Vf = "_link_cs4jr_19", cn = {
  foot: Gf,
  note: Uf,
  link: Vf
};
function b3({ configureHref: e }) {
  return /* @__PURE__ */ i("footer", { className: cn.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: cn.note, children: "Filters you set are not saved." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${cn.link} ward-target`, href: T(e), children: "Configure board" })
  ] });
}
const Yf = "_head_1tfi5_3", Jf = "_identity_1tfi5_12", Qf = "_titleRow_1tfi5_18", Xf = "_title_1tfi5_18", Zf = "_key_1tfi5_35", ev = "_rollup_1tfi5_45", tv = "_tools_1tfi5_53", nv = "_swatch_1tfi5_101", av = "_mark_1tfi5_108", Te = {
  head: Yf,
  identity: Jf,
  titleRow: Qf,
  title: Xf,
  key: Zf,
  rollup: ev,
  tools: tv,
  swatch: nv,
  mark: av
}, ka = "initials:";
function rv(e) {
  return e === void 0 ? "done this week unknown" : `${ne(e)} done this week`;
}
function lv(e) {
  const t = [rv(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ne(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${se(e.p90)}`), t.join(" · ");
}
function ov(e) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ i("span", { title: e.inFlightHint, children: [
      ne(e.inFlight),
      " open"
    ] }),
    " · ",
    lv(e)
  ] });
}
function iv(e) {
  return e.startsWith(ka) ? e.slice(ka.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function sv({ markRef: e, streamStep: t }) {
  const a = { "--stream": ke(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Te.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: iv(e) }) : /* @__PURE__ */ n("span", { className: Te.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function cv({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function p3({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: l,
  owner: o,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ i("div", { className: Te.head, children: [
    /* @__PURE__ */ i("div", { className: Te.identity, children: [
      /* @__PURE__ */ i("div", { className: Te.titleRow, children: [
        /* @__PURE__ */ n(sv, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Te.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Te.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Te.rollup, "aria-live": "polite", children: ov(t) })
    ] }),
    /* @__PURE__ */ i("div", { className: Te.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(cv, { owners: l, owner: o, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Dn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const dv = "_head_1sejb_14", uv = "_line_1sejb_15", hv = "_cHandle_1sejb_36", mv = "_cName_1sejb_41", wv = "_nameLine_1sejb_49", _v = "_cLabel_1sejb_56", fv = "_cCap_1sejb_61", vv = "_cShown_1sejb_66", bv = "_name_1sejb_49", pv = "_noCap_1sejb_88", gv = "_state_1sejb_102", yv = "_handle_1sejb_111", q = {
  head: dv,
  line: uv,
  cHandle: hv,
  cName: mv,
  nameLine: wv,
  cLabel: _v,
  cCap: fv,
  cShown: vv,
  name: bv,
  noCap: pv,
  state: gv,
  handle: yv
}, Nv = "Review stages always show.", kv = "Done stages are counted, not shown.";
function g3() {
  return /* @__PURE__ */ i("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: q.cHandle }),
    /* @__PURE__ */ n("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: q.cShown, children: "Shown" })
  ] });
}
function $v(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function Cv(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function Sv({ stage: e }) {
  return /* @__PURE__ */ n("span", { className: q.cName, children: /* @__PURE__ */ i("span", { className: q.nameLine, children: [
    /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
    e.gate && !kt(e.name, "Review") && /* @__PURE__ */ n(m, { role: "gate", label: "Review", size: "tag" })
  ] }) });
}
function Rv(e) {
  return e === void 0 ? "" : String(e);
}
function xv(e) {
  return e === "" ? void 0 : Number(e);
}
function Tv({ name: e, onReorder: t }) {
  const a = je();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: q.cHandle }) : /* @__PURE__ */ n("span", { className: q.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && Cv(r, t),
      children: "⠿"
    }
  ) });
}
function Lv({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: q.cCap, children: /* @__PURE__ */ n(E, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Rv(t.cap), onChange: (r) => a({ ...t, cap: xv(r) }) }) });
}
function Mv(e) {
  return e.gate ? Nv : e.terminal ? kv : void 0;
}
function Av({ stage: e, config: t, onChange: a }) {
  const r = je() !== null, l = $v(e, t.shown), o = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ i("span", { className: q.cShown, children: [
    /* @__PURE__ */ n(Xe, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, disabledReason: Mv(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: q.state, "data-fixed": o || void 0, "aria-hidden": "true", onClick: () => !o && s(!l.shown), children: l.state })
  ] });
}
function Iv(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function y3({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ i("div", { className: q.line, "data-kind": Iv(e), children: [
    /* @__PURE__ */ n(Tv, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Sv, { stage: e }),
    /* @__PURE__ */ n("span", { className: q.cLabel, children: /* @__PURE__ */ n(E, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (l) => a({ ...t, label: l }) }) }),
    /* @__PURE__ */ n(Lv, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(Av, { stage: e, config: t, onChange: a })
  ] });
}
const Ev = "_body_8qsv9_2", Bv = "_head_8qsv9_9", Pv = "_summary_8qsv9_19", jv = "_block_8qsv9_20", Ov = "_actionsBlock_8qsv9_21", Dv = "_title_8qsv9_41", qv = "_note_8qsv9_46", Hv = "_k_8qsv9_51", Fv = "_kv_8qsv9_58", zv = "_row_8qsv9_64", Wv = "_label_8qsv9_75", Kv = "_value_8qsv9_84", Gv = "_quote_8qsv9_90", Uv = "_actions_8qsv9_21", Vv = "_resolve_8qsv9_111", z = {
  body: Ev,
  head: Bv,
  summary: Pv,
  block: jv,
  actionsBlock: Ov,
  title: Dv,
  note: qv,
  k: Hv,
  kv: Fv,
  row: zv,
  label: Wv,
  value: Kv,
  quote: Gv,
  actions: Uv,
  resolve: Vv
};
function Yv(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Jv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Qv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function Xv(e, t, a) {
  return [
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Yv(e),
    ...Qv(a),
    ...Jv(e, t)
  ];
}
function Zv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ i("section", { className: z.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: z.k, children: t }),
    e
  ] });
}
function eb(e) {
  return e.run ? { role: "running", label: "Running" } : e.state;
}
function tb({ item: e, showKey: t }) {
  const a = eb(e);
  return !t && !a ? null : /* @__PURE__ */ i("div", { className: z.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function nb({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ i("div", { className: z.block, children: [
    /* @__PURE__ */ n("p", { className: z.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: z.note, children: e.agentMeta })
  ] }) : null;
}
function N3({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: l, resolve: o, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = y(), w = Xv(e, l, d);
  return /* @__PURE__ */ n(ut, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ i("div", { className: z.body, children: [
    /* @__PURE__ */ n(tb, { item: e, showKey: u }),
    /* @__PURE__ */ i("div", { className: z.summary, children: [
      /* @__PURE__ */ n("h2", { className: z.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: z.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: z.kv, children: w.map(([_, N, k]) => /* @__PURE__ */ i("div", { className: z.row, children: [
      /* @__PURE__ */ n("dt", { className: z.label, children: _ }),
      /* @__PURE__ */ n("dd", { className: z.value, children: N })
    ] }, k ?? _)) }),
    /* @__PURE__ */ n(nb, { item: e }),
    /* @__PURE__ */ i("div", { className: z.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: z.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: z.note, children: c })
    ] }),
    /* @__PURE__ */ n(Zv, { resolve: o, label: s ?? "Next steps" })
  ] }) });
}
const ab = "_root_3azmy_2", rb = "_list_3azmy_7", lb = "_item_3azmy_12", ob = "_box_3azmy_18", ib = "_text_3azmy_23", sb = "_note_3azmy_28", et = {
  root: ab,
  list: rb,
  item: lb,
  box: ob,
  text: ib,
  note: sb
};
function an({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ i("div", { className: et.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${et.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ i("li", { className: `${et.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: et.box, children: /* @__PURE__ */ n(On, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: et.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${et.note} ward-checklist-note`, children: t })
  ] });
}
const cb = "_rail_znbbp_2", db = "_k_znbbp_11", ub = "_head_znbbp_19", hb = "_section_znbbp_25", mb = "_card_znbbp_39", wb = "_strip_znbbp_46", _b = "_skeleton_znbbp_60", fb = "_skeletonLabel_znbbp_74", vb = "_bar_znbbp_80", bb = "_note_znbbp_89", de = {
  rail: cb,
  k: db,
  head: ub,
  section: hb,
  card: mb,
  strip: wb,
  skeleton: _b,
  skeletonLabel: fb,
  bar: vb,
  note: bb
};
function pb(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Ar({ title: e, children: t }) {
  return /* @__PURE__ */ i("section", { className: de.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: de.k, children: e }),
    t
  ] });
}
function gb({ effects: e }) {
  const t = e.filter((a) => !a.met);
  return t.length === 0 ? null : /* @__PURE__ */ n(Ar, { title: "Warnings", children: /* @__PURE__ */ n(an, { items: t, density: "compact" }) });
}
function yb({ column: e, count: t }) {
  return /* @__PURE__ */ i("div", { className: de.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: de.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: de.bar, "aria-hidden": "true" }, r))
  ] });
}
function Nb({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Kf, { column: l, items: t.filter((o) => o.stage === l.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, l.id));
}
function kb(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Nb, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(yb, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function k3(e) {
  const t = pb(e.onOpen), a = Mr(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ i("aside", { className: de.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${de.k} ${de.head}`, children: "Preview" }),
    /* @__PURE__ */ n("section", { className: de.section, "aria-label": "Card", children: /* @__PURE__ */ n("div", { className: de.card, children: a && /* @__PURE__ */ n(nn, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ i(Ar, { title: "Columns", children: [
      /* @__PURE__ */ n("div", { className: de.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(kb, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: de.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(gb, { effects: e.effects })
  ] });
}
function $b(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Cb(e) {
  return Math.ceil(e.length / 2);
}
function Sb(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ir(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Rb(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const l = Ir(e);
  l !== void 0 && a(l), r(Sb(e.type));
}
function xb(e, t, a, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (o) => Rb(o, a, r, l));
  }, [e, t, a, r, l]);
}
function Tb(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Lb(e, t) {
  return t ? { role: "running", label: "Running" } : e.state ?? { role: "pending", label: e.key };
}
function Mb(e, t) {
  return t !== void 0 ? se(e.timeInStage) + " · waits on " + t.agent : e.waitsOn ? se(e.timeInStage) + " · waits on " + e.waitsOn : se(e.timeInStage) + " in stage";
}
function Ab(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + P.height.card + " + " + P.height.cardRow + " * " + String(Cb(t ?? [])) + ")"
  };
}
function Ib(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Eb(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function Bb(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Pb(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function jb(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Ob(e, t) {
  return t === void 0 ? e : $b(e, t.ref);
}
function Db(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function gt(e) {
  return e === !0 ? "true" : void 0;
}
function Er(e) {
  const t = e.item, a = t.run, r = a !== void 0, l = f(null), o = Bt(l), s = f(/* @__PURE__ */ new Set()), [c, d] = v(Tb(t));
  xb(e.feed, t.key, s, d, o);
  const u = Lb(t, r), h = Mb(t, a), w = Ab(t, e.fields), _ = jb(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      ...Db(e),
      className: "ward-workcard",
      "data-flagged": gt(t.flagged),
      "data-selected": gt(e.selected),
      style: w,
      ref: Ob(l, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Ib(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Eb(t, e.fields),
          Bb(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ i("span", { className: "ward-workcard-lastrow", children: [
          Pb(a, c, e.connection, t.changedAt),
          _ !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: _, children: _ }) : null
        ] })
      ]
    }
  ) });
}
function qb({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Hb(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Fb(e, t, a) {
  return /* @__PURE__ */ i("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ i("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function zb(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(qb, { count: e.items.length, cap: e.column.cap });
}
function Wb(e, t) {
  return e.roving ?? t;
}
function Kb(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function Gb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    Er,
    {
      item: a,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: a.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: t.itemProps(r)
    },
    a.key
  ));
}
function Ub(e) {
  const t = y(), a = Jt({ orientation: "vertical" }), r = Wb(e, a), l = Hb(e);
  return /* @__PURE__ */ i("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": gt(l), "data-gate": gt(e.column.gate), children: [
    Fb(e.column, e.items.length, t),
    zb(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Kb(e, a), children: Gb(e, r) })
  ] });
}
function Vb(e) {
  let t = String(e.inFlight) + " open · " + String(e.loadedThisWeek) + " done this week · " + String(e.agentsWorking) + (e.agentsWorking === 1 ? " agent working" : " agents working");
  return e.p50 !== void 0 && (t += " · p50 " + se(e.p50)), e.p90 !== void 0 && (t += " · p90 " + se(e.p90)), t;
}
function Yb(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function Jb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function $3(e) {
  return /* @__PURE__ */ i("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Vb(e.rollups) })
    ] }),
    /* @__PURE__ */ i("div", { className: "ward-chiprow", children: [
      Yb(e),
      Jb(e.onConfigure),
      /* @__PURE__ */ n(Dn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Qb(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Xb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Xe, { label: e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function Zb(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ i(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + (t === 1 ? " agent" : " agents") }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Done" }) : null
  ] });
}
function C3(e) {
  const t = e.stage;
  return /* @__PURE__ */ i("div", { className: "ward-configrow", "data-mandatory": gt(Qb(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Xb(e) }),
    /* @__PURE__ */ n(E, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(nr, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Zb(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function S3(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ i("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(Er, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Ub, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ i("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function ep(e, t) {
  const a = Ir(e);
  a !== void 0 && t(a);
}
function tp(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => ep(r, a));
  }, [e, t, a]);
}
function np(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function ap(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function rp(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function lp(e, t) {
  return /* @__PURE__ */ i(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function R3(e) {
  var s;
  const t = e.item, a = t.run, [r, l] = v((s = t.run) == null ? void 0 : s.lastStep);
  tp(e.feed, t.key, l);
  const o = [...np(t), ...ap(t)];
  return /* @__PURE__ */ i(ut, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ i("dl", { className: "ward-kv", children: [
      o.map((c) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      rp(a, r)
    ] }),
    lp(t, e.actions)
  ] });
}
const op = "_card_1nkkx_3", ip = "_head_1nkkx_30", sp = "_mark_1nkkx_38", cp = "_name_1nkkx_50", dp = "_chips_1nkkx_71", up = "_description_1nkkx_77", hp = "_run_1nkkx_82", mp = "_sep_1nkkx_91", wp = "_facts_1nkkx_97", _p = "_fact_1nkkx_97", fp = "_factLabel_1nkkx_111", vp = "_factValue_1nkkx_115", ie = {
  card: op,
  head: ip,
  mark: sp,
  name: cp,
  chips: dp,
  description: up,
  run: hp,
  sep: mp,
  facts: wp,
  fact: _p,
  factLabel: fp,
  factValue: vp
}, bp = { live: "done", draft: "running", paused: "meta" };
function pp(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function gp({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: bp[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function yp({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Np({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ i("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function kp({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ i("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function $p(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Cp({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: l, facts: o, className: s }) {
  const c = { "--stream": ke(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ i(
    "article",
    {
      "aria-current": d,
      className: pp(s),
      style: c,
      "data-selected": d,
      "data-paused": $p(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ i("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: T(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(yp, { description: e.description }),
        /* @__PURE__ */ n(Np, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(gp, { versions: e.versions }),
        /* @__PURE__ */ n(kp, { facts: o })
      ]
    }
  );
}
const Sp = "_list_4dcyc_2", Rp = "_row_4dcyc_11", xp = "_head_4dcyc_23", Tp = "_id_4dcyc_30", Lp = "_lock_4dcyc_35", Mp = "_reason_4dcyc_41", Ap = "_remove_4dcyc_46", Ip = "_clauses_4dcyc_50", Ep = "_clause_4dcyc_50", Bp = "_label_4dcyc_64", Pp = "_cell_4dcyc_71", jp = "_value_4dcyc_76", ue = {
  list: Sp,
  row: Rp,
  head: xp,
  id: Tp,
  lock: Lp,
  reason: Mp,
  remove: Ap,
  clauses: Ip,
  clause: Ep,
  label: Bp,
  cell: Pp,
  value: jp
}, Br = $e(!1);
function x3({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(Br.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ue.list, "aria-label": t, children: e }) });
}
function Op({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ue.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(E, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => a(e.key, l) });
}
function Dp({ reason: e }) {
  return /* @__PURE__ */ i("span", { className: ue.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ue.reason, children: e })
  ] });
}
function qp({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ i("span", { className: ue.head, children: [
    /* @__PURE__ */ n("span", { className: ue.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Dp, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ue.remove, children: /* @__PURE__ */ i(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function $a(e, t) {
  return e.locked ? void 0 : t;
}
function T3({ rule: e, onChange: t, onRemove: a }) {
  if (!pe(Br)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = $a(e, t);
  return /* @__PURE__ */ i("li", { className: ue.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(qp, { rule: e, onRemove: $a(e, a) }),
    /* @__PURE__ */ n("dl", { className: ue.clauses, children: e.clauses.map((l) => /* @__PURE__ */ i("div", { className: ue.clause, children: [
      /* @__PURE__ */ n("dt", { className: ue.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ue.cell, children: /* @__PURE__ */ n(Op, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Hp = "_ladder_1xdeh_2", Fp = "_cell_1xdeh_7", zp = "_empty_1xdeh_26", Wp = "_name_1xdeh_34", Kp = "_holder_1xdeh_40", Gp = "_swatches_1xdeh_51", Up = "_swatch_1xdeh_51", Vp = "_tilesFrame_1xdeh_78", Yp = "_tiles_1xdeh_78", Jp = "_tile_1xdeh_78", Qp = "_bar_1xdeh_117", Xp = "_hex_1xdeh_128", Zp = "_note_1xdeh_138", oe = {
  ladder: Hp,
  cell: Fp,
  empty: zp,
  name: Wp,
  holder: Kp,
  swatches: Gp,
  swatch: Up,
  tilesFrame: Vp,
  tiles: Yp,
  tile: Jp,
  bar: Qp,
  hex: Xp,
  note: Zp
}, L3 = "Not available yet";
function eg(e) {
  return e.reserved ? "reserved" : yt(e.step) ? "validated" : "partial";
}
function Pr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not available" : "free";
}
function tg(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function ng({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ke, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${oe.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function ag(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function rg(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ca = (e) => String(e).padStart(2, "0");
function lg(e, t, a) {
  return e === "reserved" ? "Reserved" : a ? "yours" : t ?? Pr(e, void 0);
}
function og({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("span", { className: `${oe.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${oe.hex} ward-ladder-hex`, children: r ? `step ${Ca(e)}` : Ql(e) }),
    /* @__PURE__ */ n("span", { className: `${oe.note} ward-ladder-note`, children: r ? a : `Step ${Ca(e)} · ${a}` })
  ] });
}
function ig({ step: e, value: t, taken: a, onChange: r, presentation: l, disabled: o }) {
  const s = eg(e), c = Pr(s, a), d = c !== "free", u = d || o, h = t === e.step, w = e.name ?? `Step ${e.step}`, _ = () => {
    u || r(e.step);
  }, N = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": N, ...rg(d, h, u), "data-validation": s, style: tg(e, s), onClick: _, onKeyDown: (M) => ag(M, _) }, label: N, name: w, holder: c, validation: s, note: lg(s, a, h), step: e.step };
}
const sg = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${oe.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${oe.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(og, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ i("span", { ...e.shared, className: `${oe.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(ng, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${oe.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${oe.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function cg(e) {
  return sg[e.presentation](ig(e));
}
function dg(e) {
  for (const t of e)
    if (!t.reserved && !Qt(t.step)) throw new Error("colour ladder renders token steps only");
}
function ug(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const hg = { list: oe.ladder, swatches: oe.swatches, tiles: oe.tilesFrame };
function mg(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function jr(e) {
  const t = e.takenBy ?? {}, a = (o) => {
    var s;
    (s = e.onChange) == null || s.call(e, o);
  };
  dg(e.steps);
  const r = ug(e), l = e.steps.map((o) => /* @__PURE__ */ n(cg, { step: o, value: e.value, taken: t[o.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, o.step));
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour", ...mg(e.disabled === !0), className: `${hg[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: oe.tiles, children: l }) : l });
}
const wg = "_rail_s06lm_2", _g = "_section_s06lm_12", fg = "_sectionFlush_s06lm_22", vg = "_head_s06lm_26", bg = "_headLabel_s06lm_34", pg = "_sample_s06lm_42", gg = "_sampleLabel_s06lm_47", yg = "_sampleTitle_s06lm_54", Ng = "_sampleMeta_s06lm_59", kg = "_trace_s06lm_65", $g = "_traceHead_s06lm_70", Cg = "_steps_s06lm_78", Sg = "_step_s06lm_78", Rg = "_stepTitle_s06lm_97", xg = "_hollow_s06lm_107", Tg = "_stepBody_s06lm_115", Lg = "_stepDetail_s06lm_127", Mg = "_publish_s06lm_132", Ag = "_reason_s06lm_138", Ig = "_note_s06lm_143", Eg = "_reveal_s06lm_148", C = {
  rail: wg,
  section: _g,
  sectionFlush: fg,
  head: vg,
  headLabel: bg,
  sample: pg,
  sampleLabel: gg,
  sampleTitle: yg,
  sampleMeta: Ng,
  trace: kg,
  traceHead: $g,
  steps: Cg,
  step: Sg,
  stepTitle: Rg,
  hollow: xg,
  stepBody: Tg,
  stepDetail: Lg,
  publish: Mg,
  reason: Ag,
  note: Ig,
  reveal: Eg
}, Sa = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Bg = { running: "Dry run running.", notRun: "Run a dry run first.", failed: "Dry run failed." }, Pg = { ok: "greenFill", finding: "orangeFill", action: "blue" }, jg = { notSimulated: "not simulated", running: "running" };
function Og(e) {
  return e.presentation === "foundry";
}
function Dg(e, t) {
  if (e.status === "running") return "Wait for the dry run to finish.";
  const a = t.find((r) => !r.met);
  return a ? `Not ready: ${a.text}` : e.status === "passed" ? null : "Pass a dry run first.";
}
function qg(e, t) {
  var r;
  const a = Bg[e.status];
  return a !== void 0 ? a : ((r = t.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Hg(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Fg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function zg(e) {
  if (Hg(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Wg(e) {
  const [t, a] = v(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${C.step} ${C.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Kg(e) {
  const t = jg[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: C.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Ke, { size: 6, kind: Pg[e.kind], label: e.kind });
}
function Gg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ i("span", { className: C.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Ug(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Vg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ i(Wg, { kind: t.kind, children: [
    /* @__PURE__ */ n(Kg, { kind: t.kind }),
    /* @__PURE__ */ i("span", { className: C.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: C.stepTitle, children: t.title }),
      /* @__PURE__ */ n(Gg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Ug, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function Yg(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(se(t)), a.join(" · ");
}
function Or(e) {
  const t = y();
  return e.steps.length === 0 ? null : /* @__PURE__ */ i("section", { className: `${C.trace} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.traceHead, id: t, children: Yg(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: C.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(Vg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function Jg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ i("div", { className: `${C.sample} ${C.section}`, children: [
    /* @__PURE__ */ n("p", { className: C.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ i("p", { className: C.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ i("p", { className: C.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Qg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + me(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${C.sampleMeta} ${C.section} ward-dryrun-sample`, children: "Sample: " + e.sample.key + " · " + e.sample.title + t + ". Nothing saved." });
}
function Xg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ka(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function Zg(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: Ka(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function ey(e) {
  const t = Zg(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ i("p", { className: C.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: C.sectionFlush, children: /* @__PURE__ */ n(en, { divided: !0, cells: t }) });
}
function Dr(e) {
  const t = y();
  return e.reason !== null ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("p", { className: `${C.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function ty(e) {
  return /* @__PURE__ */ i("div", { className: `${C.publish} ${C.section}`, children: [
    /* @__PURE__ */ n(Dr, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: C.note, children: e.note })
  ] });
}
function ny(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${C.publish} ${C.section}`, children: /* @__PURE__ */ n(Dr, { reason: e.reason, onPublish: e.onPublish }) });
}
function qr(e) {
  return /* @__PURE__ */ i("div", { className: `${C.head} ${C.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: C.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: Sa[e.run.status].role, label: Sa[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Pe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function ay(e, t) {
  const [a, r] = v(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((o) => {
          var s, c;
          return [...o, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function ry(e) {
  var a;
  Fg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(Jg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Or, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(Xg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist }) }),
    /* @__PURE__ */ n(ty, { reason: Dg(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ly(e) {
  var r;
  const t = ay(e.run, e.feed);
  zg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("aside", { className: `${C.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(Qg, { sample: e.run.sample }),
    /* @__PURE__ */ n(Or, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(ey, { run: e.run }),
    /* @__PURE__ */ n("div", { className: C.section, children: /* @__PURE__ */ n(an, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(ny, { reason: qg(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function M3(e) {
  return Og(e) ? /* @__PURE__ */ n(ly, { ...e }) : /* @__PURE__ */ n(ry, { ...e });
}
const oy = "_list_142ip_3", iy = "_row_142ip_9", sy = "_condition_142ip_18", cy = "_action_142ip_24", jt = {
  list: oy,
  row: iy,
  condition: sy,
  action: cy
}, Hr = $e(!1);
function A3({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(Hr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: jt.list, "aria-label": t, children: e }) });
}
function I3({ rule: e }) {
  if (!pe(Hr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ i("li", { className: jt.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: jt.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: jt.action, children: e.then })
  ] });
}
const dy = "_move_tmppt_3", uy = {
  move: dy
};
function yn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [l] = r.splice(t, 1);
  return r.splice(a, 0, l), r;
}
function Fr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function zr(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function Ra(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function hy(e) {
  return e === "up" ? "down" : "up";
}
function my(e, t) {
  const a = Ra(e, t.id, t.direction) ?? Ra(e, t.id, hy(t.direction));
  a == null || a.focus();
}
function Wr() {
  const e = f(null), [t, a] = v(null), [r, l] = v("");
  return S(() => {
    e.current !== null && t !== null && my(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), l(c);
  } };
}
function Kr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function zt({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${uy.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const wy = "_body_1jd1i_2", _y = "_title_1jd1i_8", fy = "_section_1jd1i_13", vy = "_legend_1jd1i_18", by = "_stages_1jd1i_26", py = "_stage_1jd1i_26", gy = "_stageIndex_1jd1i_44", yy = "_stageName_1jd1i_50", Ny = "_footer_1jd1i_59", ky = "_note_1jd1i_66", $y = "_reason_1jd1i_71", Cy = "_actions_1jd1i_76", Sy = "_webHead_1jd1i_83", Ry = "_kicker_1jd1i_92", xy = "_webTitle_1jd1i_99", Ty = "_webBody_1jd1i_105", Ly = "_webSection_1jd1i_109", My = "_sectionHead_1jd1i_121", Ay = "_sectionNote_1jd1i_129", Iy = "_formLabel_1jd1i_134", Ey = "_identityRow_1jd1i_139", By = "_nameCell_1jd1i_145", Py = "_keyCell_1jd1i_150", jy = "_colourCell_1jd1i_154", Oy = "_colourStatus_1jd1i_161", Dy = "_webStages_1jd1i_166", qy = "_webStageList_1jd1i_172", Hy = "_webStage_1jd1i_166", Fy = "_webIndex_1jd1i_191", zy = "_webStageName_1jd1i_196", Wy = "_webMoves_1jd1i_201", Ky = "_addStage_1jd1i_215", Gy = "_addStageButton_1jd1i_223", Uy = "_webFooter_1jd1i_236", Vy = "_webFooterNotes_1jd1i_244", Yy = "_webNote_1jd1i_251", p = {
  body: wy,
  title: _y,
  section: fy,
  legend: vy,
  stages: by,
  stage: py,
  stageIndex: gy,
  stageName: yy,
  footer: Ny,
  note: ky,
  reason: $y,
  actions: Cy,
  webHead: Sy,
  kicker: Ry,
  webTitle: xy,
  webBody: Ty,
  webSection: Ly,
  sectionHead: My,
  sectionNote: Ay,
  formLabel: Iy,
  identityRow: Ey,
  nameCell: By,
  keyCell: Py,
  colourCell: jy,
  colourStatus: Oy,
  webStages: Dy,
  webStageList: qy,
  webStage: Hy,
  webIndex: Fy,
  webStageName: zy,
  webMoves: Wy,
  addStage: Ky,
  addStageButton: Gy,
  webFooter: Uy,
  webFooterNotes: Vy,
  webNote: Yy
}, Jy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent" },
  { value: "gate", label: "review" },
  { value: "terminal", label: "done" }
], Gr = "not a known stage";
function Qy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${Gr}` }, ...a];
}
function Xy({ stage: e, index: t, catalogue: a, onName: r }) {
  const l = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(E, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const o = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Gr}`;
  return /* @__PURE__ */ n(E, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Qy(a, e.name), invalid: o, onChange: r });
}
function Ur(e, t) {
  return e.name || `stage ${t + 1}`;
}
function Zy(e) {
  const t = f([]), a = f(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function e1({ id: e, stage: t, index: a, total: r, catalogue: l, onReplace: o, onMove: s }) {
  const c = Ur(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ i("li", { className: `${p.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: p.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: p.webStageName, children: /* @__PURE__ */ n(Xy, { stage: t, index: a, catalogue: l, onName: (u) => o({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(E, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: Jy, onChange: (u) => o({ ...t, kind: u }) }),
    /* @__PURE__ */ i("span", { className: p.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(zt, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(zt, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function t1({ stages: e, onChange: t, catalogue: a }) {
  const r = Zy(e.length), l = Wr(), o = (c, d) => {
    const u = Fr(c, d);
    r.current = yn(r.current, c, u), l.moved({ id: r.current[u], direction: d }, zr(Ur(e[c], c), u, e.length)), t(yn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ i("div", { className: p.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: p.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(e1, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => o(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Kr, { text: l.announcement }),
    /* @__PURE__ */ n("p", { className: p.addStage, children: /* @__PURE__ */ n("button", { type: "button", className: p.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }) })
  ] });
}
const n1 = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
];
function a1({ stage: e }) {
  return e.gate && !kt(e.name, "Review") ? /* @__PURE__ */ n(m, { role: "gate", label: "Review" }) : null;
}
const r1 = [
  { value: "advance", label: "Move on when all checks pass", consequence: "No one needs to approve." },
  { value: "review", label: "Hold every item for review", consequence: "Every item waits for a reviewer." },
  { value: "block", label: "Stop on any finding", consequence: "A finding holds the item until a person clears it." }
], Vr = "Nothing runs until you publish.", l1 = "Add a name and a key.", o1 = "At least 2 stages";
function Fn(e, t) {
  return !e.reserved && yt(e.step) && t[e.step] === void 0;
}
function i1(e, t) {
  const a = e.find((r) => Fn(r, t));
  return a ? a.step : 1;
}
function s1({ stages: e, onMove: t }) {
  const a = Wr(), r = (l, o) => {
    const s = Fr(l, o);
    a.moved({ id: e[l].id, direction: o }, zr(e[l].name, s, e.length)), t(l, s);
  };
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: p.stages, "aria-label": "Stages in order", children: e.map((l, o) => /* @__PURE__ */ i("li", { className: p.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stageIndex, children: String(o + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: p.stageName, children: l.name }),
      /* @__PURE__ */ n(a1, { stage: l }),
      o > 0 && /* @__PURE__ */ n(zt, { id: l.id, name: l.name, direction: "up", onMove: () => r(o, "up") }),
      o < e.length - 1 && /* @__PURE__ */ n(zt, { id: l.id, name: l.name, direction: "down", onMove: () => r(o, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Kr, { text: a.announcement })
  ] });
}
function c1({ reason: e, onCreate: t, onDraft: a }) {
  const r = y();
  return /* @__PURE__ */ i("div", { className: p.footer, children: [
    /* @__PURE__ */ n("p", { className: p.note, children: Vr }),
    e && /* @__PURE__ */ n("p", { className: p.reason, id: r, children: e }),
    /* @__PURE__ */ i("div", { className: p.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function d1(e, t) {
  return e !== "" && t !== "" ? null : l1;
}
function u1(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: l = r1, onCreate: o, onDraft: s, onClose: c, returnFocusTo: d } = e, u = y(), [h, w] = v(""), [_, N] = v(""), [k, M] = v(t[0].value), [O, we] = v(() => i1(a, r)), [ae, Ce] = v(e.stages ?? n1), [Ze, A] = v(l[0].value), V = { name: h, key: _, streamStep: O, owner: k, stages: ae, policy: Ze }, Se = d1(h, _);
  return /* @__PURE__ */ n(ut, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ i("div", { className: p.body, children: [
    /* @__PURE__ */ n("h2", { className: p.title, id: u, children: "New stream" }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Identity" }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Name", value: h, onChange: w }),
      /* @__PURE__ */ n(E, { kind: "input", label: "Key", value: _, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(E, { kind: "select", label: "Owner", value: k, onChange: M, options: t })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Colour" }),
      /* @__PURE__ */ n(jr, { label: "Colour", steps: a, value: O, onChange: we, takenBy: r })
    ] }),
    /* @__PURE__ */ i("fieldset", { className: p.section, children: [
      /* @__PURE__ */ n("legend", { className: p.legend, children: "Stages" }),
      /* @__PURE__ */ n(s1, { stages: ae, onMove: (Ge, xl) => Ce(yn(ae, Ge, xl)) })
    ] }),
    /* @__PURE__ */ n(Cr, { legend: "When items move on", options: l, value: Ze, onChange: A }),
    /* @__PURE__ */ n(c1, { reason: Se, onCreate: () => o(V), onDraft: () => s(V) })
  ] }) });
}
const Yr = [
  { value: "relay", label: "Through Trellis (safe default)", consequence: "Agents never write to Foundry or Jira directly." },
  { value: "direct", label: "Directly, each agent approved", consequence: "A second admin approves each agent." },
  { value: "readonly", label: "Read only", consequence: "Agents can read and report only." }
], h1 = "Add a name, key, owner and two stages.";
function m1(e, t, a, r, l, o) {
  var c;
  const s = ((c = Yr.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: o };
}
function w1(e, t) {
  return _1(e) && f1(e, t) && v1(e);
}
function _1(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function f1(e, t) {
  return e.colourStep === null || Fn({ step: e.colourStep }, t);
}
function v1(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function b1(e, t) {
  if (e === null || Fn({ step: e }, t)) return "";
  const a = t[e];
  return a === void 0 ? `Colour ${e} is not available yet.` : `Colour ${e} is taken by ${a}.`;
}
function p1({ ready: e, draft: t, onCreate: a, onDraft: r, reasonId: l }) {
  return /* @__PURE__ */ i("div", { className: p.webFooter, children: [
    /* @__PURE__ */ i("div", { className: p.webFooterNotes, children: [
      /* @__PURE__ */ n("p", { className: p.webNote, children: Vr }),
      !e && /* @__PURE__ */ n("p", { id: l, className: p.reason, children: h1 })
    ] }),
    r && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => r(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => a(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: l, children: "Create stream" })
  ] });
}
function g1({ titleId: e }) {
  return /* @__PURE__ */ n("header", { className: p.webHead, children: /* @__PURE__ */ n("h2", { id: e, className: p.webTitle, children: "New stream" }) });
}
function y1({ name: e, setName: t, streamKey: a, setKey: r, colour: l, owner: o }) {
  return /* @__PURE__ */ i("section", { className: p.webSection, children: [
    /* @__PURE__ */ n("h3", { className: p.kicker, children: "Identity" }),
    /* @__PURE__ */ i("div", { className: p.identityRow, children: [
      /* @__PURE__ */ n("div", { className: p.nameCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: p.keyCell, children: /* @__PURE__ */ n(E, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      l
    ] }),
    o
  ] });
}
function N1(e) {
  const t = y(), a = y(), r = e.takenBy ?? {}, [l, o] = v(""), [s, c] = v(""), [d, u] = v(e.owners[0] ?? ""), [h, w] = v(null), [_, N] = v("relay"), [k, M] = v([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), O = m1(l, s, d, h, _, k), we = w1(O, r), ae = /* @__PURE__ */ i("div", { className: p.colourCell, children: [
    /* @__PURE__ */ n("span", { className: p.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(jr, { presentation: "swatches", label: "Colour", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ce = b1(h, r), Ze = /* @__PURE__ */ i(x, { children: [
    Ce && /* @__PURE__ */ n("p", { className: p.colourStatus, "data-colour-status": "", children: Ce }),
    /* @__PURE__ */ n(E, { variant: "form", kind: "select", label: "Owner", value: d, options: e.owners.map((A) => ({ value: A, label: A })), onChange: u })
  ] });
  return /* @__PURE__ */ i(ut, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(g1, { titleId: a }),
    /* @__PURE__ */ i("div", { className: p.webBody, children: [
      /* @__PURE__ */ n(y1, { name: l, setName: o, streamKey: s, setKey: c, colour: ae, owner: Ze }),
      e.fields && /* @__PURE__ */ n("section", { className: p.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ i("section", { className: p.webSection, children: [
        /* @__PURE__ */ i("div", { className: p.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: p.kicker, children: "Stages" }),
          /* @__PURE__ */ n("span", { className: p.sectionNote, children: o1 })
        ] }),
        /* @__PURE__ */ n(t1, { stages: k, onChange: M })
      ] }),
      /* @__PURE__ */ n("section", { className: p.webSection, children: /* @__PURE__ */ n(Cr, { variant: "cards", legend: "How agents write", value: _, options: Yr, onChange: N }) }),
      /* @__PURE__ */ n(p1, { ready: we, draft: O, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function E3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(N1, { ...e }) : /* @__PURE__ */ n(u1, { ...e });
}
const k1 = "_row_bs8hc_2", $1 = "_cell_bs8hc_6", C1 = "_condition_bs8hc_11", S1 = "_action_bs8hc_18", R1 = "_contract_bs8hc_24", x1 = "_contractCondition_bs8hc_33", T1 = "_contractAction_bs8hc_39", ee = {
  row: k1,
  cell: $1,
  condition: C1,
  action: S1,
  contract: R1,
  contractCondition: x1,
  contractAction: T1
}, Jr = ["advance", "block", "escalate", "requestReview"], xa = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Wt(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function zn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ee.action, children: xa[e.then] }) : /* @__PURE__ */ n(
    E,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => t({ ...e, then: l }),
      options: Jr.map((l) => ({ value: l, label: xa[l] }))
    }
  );
}
function L1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n("span", { className: ee.condition, title: Wt(e, r), children: Wt(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: zn(e, t, a) })
  ] });
}
function M1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("tr", { className: ee.row, children: [
    /* @__PURE__ */ i("td", { className: ee.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ee.condition, children: Wt(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ee.cell, children: zn(e, t, a) })
  ] });
}
function A1({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ i("li", { className: ee.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ee.contractCondition, children: Wt(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ee.contractAction, children: zn(e, t, a, !0) })
  ] });
}
const I1 = { two: M1, four: L1, contract: A1 };
function B3(e) {
  var a;
  if (!Jr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = I1[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const E1 = "_column_g1uat_2", B1 = "_head_g1uat_17", P1 = "_index_g1uat_23", j1 = "_name_g1uat_29", O1 = "_meta_g1uat_38", D1 = "_mono_g1uat_43", q1 = "_gate_g1uat_50", H1 = "_reviewersLabel_g1uat_57", F1 = "_reviewers_g1uat_57", z1 = "_reviewer_g1uat_57", W1 = "_agents_g1uat_74", K1 = "_workflowColumn_g1uat_79", G1 = "_workflowHead_g1uat_96", U1 = "_stageRow_g1uat_102", V1 = "_stageLabel_g1uat_109", Y1 = "_workflowTitle_g1uat_116", J1 = "_workflowMeta_g1uat_122", Q1 = "_workflowGate_g1uat_127", X1 = "_gateNote_g1uat_135", Z1 = "_cardNote_g1uat_140", eN = "_reviewerList_g1uat_145", tN = "_reviewerRow_g1uat_151", nN = "_reviewerMark_g1uat_157", aN = "_reviewerName_g1uat_167", rN = "_terminalCard_g1uat_173", lN = "_terminalCount_g1uat_182", oN = "_workflowAgents_g1uat_188", iN = "_mount_g1uat_194", R = {
  column: E1,
  head: B1,
  index: P1,
  name: j1,
  meta: O1,
  mono: D1,
  gate: q1,
  reviewersLabel: H1,
  reviewers: F1,
  reviewer: z1,
  agents: W1,
  workflowColumn: K1,
  workflowHead: G1,
  stageRow: U1,
  stageLabel: V1,
  workflowTitle: Y1,
  workflowMeta: J1,
  workflowGate: Q1,
  gateNote: X1,
  cardNote: Z1,
  reviewerList: eN,
  reviewerRow: tN,
  reviewerMark: nN,
  reviewerName: aN,
  terminalCard: rN,
  terminalCount: lN,
  workflowAgents: oN,
  mount: iN
}, Ta = { entry: "Entry", agent: "Agent", gate: "Review", terminal: "Done" };
function Wn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function Qr(e) {
  return `${Math.round(e * 100)}%`;
}
function sN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(en, { cells: [
      { value: Qr(e.gateShare), label: "Held for review" },
      { value: ne(e.count), label: "In stage" }
    ] })
  ] });
}
function cN({ stage: e }) {
  return /* @__PURE__ */ n(en, { cells: [
    { value: ne(e.count), label: "In stage" },
    { value: Wn(e.closedThisWeek, ne), label: "Closed this week" }
  ] });
}
function dN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ i("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    kt(e.name, Ta[e.kind]) ? null : /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: Ta[e.kind] })
  ] });
}
function uN({ stage: e }) {
  return /* @__PURE__ */ i("p", { className: R.meta, children: [
    /* @__PURE__ */ i("span", { className: R.mono, children: [
      ne(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ i("span", { className: R.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function hN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(sN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(cN, { stage: e }) : null;
}
function mN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Add an agent" }) : null;
}
function wN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const l = y(), o = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ i("section", { className: R.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(dN, { stage: e, titleId: l }),
    /* @__PURE__ */ n(uN, { stage: e }),
    /* @__PURE__ */ n(hN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Cp, { ...s, connection: o }, s.agent.id)) }),
    /* @__PURE__ */ n(mN, { onMount: a })
  ] });
}
const _N = {
  gate: { role: "gate", label: "Review" },
  terminal: { role: "quiet", label: "Done" }
};
function fN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ i("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function vN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ i("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.gateNote, children: t.length === 0 ? "A person moves items on." : "Needs approval from:" }),
    t.length === 0 ? null : /* @__PURE__ */ n(fN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ i("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: Qr(e.gateShare) }),
      " of time here"
    ] })
  ] });
}
function bN(e) {
  return e === void 0 ? "closed this week" : `closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function pN({ stage: e }) {
  return /* @__PURE__ */ i("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Wn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: bN(e.rolledBackThisWeek) })
  ] });
}
function gN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function yN(e) {
  if (e.kind === "terminal") return `${Wn(e.closedThisWeek)} this week`;
  const t = gN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function NN({ stage: e, titleId: t }) {
  const a = _N[e.kind];
  return /* @__PURE__ */ i("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ i("span", { className: R.stageRow, children: [
      /* @__PURE__ */ i("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 || kt(e.name, a.label) ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: yN(e) })
  ] });
}
function kN(e) {
  return e === "entry" || e === "agent";
}
function $N({ stage: e, onMount: t }) {
  return t === void 0 || !kN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Add agent" });
}
function CN({ stage: e, agentCards: t, onMount: a }) {
  const r = y();
  return /* @__PURE__ */ i("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(NN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(vN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(pN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n($N, { stage: e, onMount: a })
  ] });
}
function SN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function P3(e) {
  return SN(e) ? /* @__PURE__ */ n(CN, { ...e }) : /* @__PURE__ */ n(wN, { ...e });
}
const RN = "_row_1tdra_6", xN = "_name_1tdra_12", TN = "_compactRow_1tdra_13", LN = "_compactName_1tdra_13", MN = "_cell_1tdra_30", AN = "_chain_1tdra_45", IN = "_owner_1tdra_51", EN = "_mono_1tdra_57", BN = "_compactCell_1tdra_79", PN = "_stack_1tdra_96", jN = "_stat_1tdra_103", ON = "_identityLine_1tdra_110", DN = "_identity_1tdra_110", qN = "_ownerLine_1tdra_140", HN = "_link_1tdra_160", FN = "_gateMark_1tdra_166", zN = "_emptyChain_1tdra_171", WN = "_arrow_1tdra_177", KN = "_muted_1tdra_182", GN = "_define_1tdra_187", UN = "_statValue_1tdra_194", VN = "_policyId_1tdra_200", YN = "_sub_1tdra_205", g = {
  row: RN,
  name: xN,
  compactRow: TN,
  compactName: LN,
  cell: MN,
  chain: AN,
  owner: IN,
  mono: EN,
  compactCell: BN,
  stack: PN,
  stat: jN,
  identityLine: ON,
  identity: DN,
  ownerLine: qN,
  link: HN,
  gateMark: FN,
  emptyChain: zN,
  arrow: WN,
  muted: KN,
  define: GN,
  statValue: UN,
  policyId: VN,
  sub: YN
};
function Xr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: l, button: o };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function JN(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function QN(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Zr(e) {
  return `${ne(e)} ${e === 1 ? "member" : "members"}`;
}
function XN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Zr(e.members)}`;
}
function ZN(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ i("span", { className: g.stack, children: [
    /* @__PURE__ */ i("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: T(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: XN(e) })
  ] }) });
}
function el({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ i(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (review)" }) : null
  ] });
}
function ek(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = Zt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function tk({ stages: e, streamStep: t }) {
  const a = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, o) => /* @__PURE__ */ i("span", { className: g.link, children: [
    /* @__PURE__ */ n(el, { name: l.name, gate: l.gate === !0, look: ek(o, a, t), size: "tag" }),
    o === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${o}`)) });
}
function nk(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ i("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : tk(e) });
}
function tl(e) {
  return e === void 0 ? void 0 : !0;
}
function La(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": tl(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function ak(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ i("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function rk(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function lk({ stream: e, href: t, presentation: a }) {
  const r = QN(a.className);
  return /* @__PURE__ */ i("tr", { className: `${r} ward-streamrow`, onClick: Xr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ke(e.streamStep, "chip") }, children: [
    ZN(e, t),
    nk(e),
    La(rk(e.agents), e.agents === void 0 ? void 0 : JN(e.agents), "—"),
    ak(e.policy),
    La(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ok(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function j3(e) {
  if (ok(e)) return lk(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ i("tr", { className: g.row, onClick: Xr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: T(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...En(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(el, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ i("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ i("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: Zr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": tl(t.inFlightHint), children: ne(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : se(t.p50) }) })
  ] });
}
const ik = "_row_2u4ll_2", sk = "_name_2u4ll_16", ck = "_scope_2u4ll_24", Kt = {
  row: ik,
  name: sk,
  scope: ck
};
function Kn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function dk(e) {
  return e === void 0 ? `${Kt.row} ward-toolrow` : `${Kt.row} ward-toolrow ${e}`;
}
function uk(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "Locked by stream policy" };
}
function hk({ id: e, reasonId: t, tool: a, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (o) => {
        r.locked || l(o.target.checked);
      }
    }
  );
}
function mk({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: Kn(e) });
}
function wk({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${Kt.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function _k(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function O3({ tool: e, onChange: t, presentation: a }) {
  const r = y(), l = y(), o = uk(e, a), s = _k(a);
  return /* @__PURE__ */ i(s, { className: dk(a == null ? void 0 : a.className), "data-locked": o.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(hk, { id: r, reasonId: l, tool: e, state: o, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${Kt.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(wk, { tool: e, state: o, reasonId: l }),
    /* @__PURE__ */ n(mk, { classification: e.classification }),
    o.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const fk = "_strip_4ppv9_2", vk = "_well_4ppv9_11", bk = "_head_4ppv9_18", pk = "_name_4ppv9_24", gk = "_chart_4ppv9_32", yk = "_segment_4ppv9_38", Nk = "_detailedChart_4ppv9_44", kk = "_rail_4ppv9_57", $k = "_section_4ppv9_63", Ck = "_label_4ppv9_74", Sk = "_note_4ppv9_91", te = {
  strip: fk,
  well: vk,
  head: bk,
  name: pk,
  chart: gk,
  segment: yk,
  detailedChart: Nk,
  rail: kk,
  section: $k,
  label: Ck,
  note: Sk
}, Rk = "Nothing to preview.", Nn = [1, 2, 3, 4, 5, 6], Gt = 100;
function xk(e, t) {
  return t.has(e) ? ke(e, "id") : "var(--ward-color-line)";
}
function Tk({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: te.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Nn.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: te.segment,
      x: l * Gt,
      y: "0",
      width: Gt,
      height: "8",
      fill: xk(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Lk(e) {
  const t = e.slice(0, Nn.length);
  for (; t.length < Nn.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function Mk({ identities: e }) {
  return /* @__PURE__ */ i("figure", { className: `${te.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Gt),
        y: "0",
        width: String(Gt),
        height: "40",
        style: { fill: ke(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function nl(e) {
  return (t) => e == null ? void 0 : e(t);
}
function dn({ label: e, children: t }) {
  const a = y();
  return /* @__PURE__ */ i("section", { className: te.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: te.label, children: e }),
    t
  ] });
}
function Ak({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: te.note, children: t ?? Rk }) : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...e, streamStep: Zt(a.streamStep) }, onOpen: nl(r), feed: null }) });
}
function Ik({ draft: e }) {
  const t = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("p", { className: te.head, style: t, children: [
    /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...En(e.key, e.streamStep) })
  ] });
}
function Ek(e) {
  const t = Lk(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ i("div", { className: te.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(dn, { label: "Board card", children: /* @__PURE__ */ n(Ak, { ...e, draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Streams index row", children: /* @__PURE__ */ n(Ik, { draft: a }) }),
    /* @__PURE__ */ n(dn, { label: "Overview chart segment", children: /* @__PURE__ */ n(Mk, { identities: t }) })
  ] });
}
function Bk({ draft: e, sample: t, streams: a, onOpen: r }) {
  const l = { "--stream": ke(e.streamStep, "id") };
  return /* @__PURE__ */ i("section", { className: te.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ i("div", { className: te.head, children: [
      /* @__PURE__ */ n(Ke, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: te.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...En(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: te.well, children: /* @__PURE__ */ n(nn, { item: { ...t, streamStep: e.streamStep }, onOpen: nl(r) }) }),
    /* @__PURE__ */ n(Tk, { draft: e, streams: a })
  ] });
}
function D3(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Ek, { ...e }) : /* @__PURE__ */ n(Bk, { ...e });
}
const Pk = "_row_ixlg5_6", jk = "_headCell_ixlg5_10", Ok = "_cell_ixlg5_11", Dk = "_name_ixlg5_23", qk = "_consequence_ixlg5_29", Hk = "_governed_ixlg5_36", Fk = "_control_ixlg5_42", zk = "_byRole_ixlg5_48", Wk = "_webControl_ixlg5_59", Kk = "_webConsequence_ixlg5_65", Gk = "_webGoverned_ixlg5_71", F = {
  row: Pk,
  headCell: jk,
  cell: Ok,
  name: Dk,
  consequence: qk,
  governed: Hk,
  control: Fk,
  byRole: zk,
  webControl: Wk,
  webConsequence: Kk,
  webGoverned: Gk
};
function Uk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ i("span", { className: F.control, children: [
    /* @__PURE__ */ n(
      Xe,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function Vk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ i("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Uk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function Yk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Jk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Xe,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (l) => a == null ? void 0 : a(t.streamStep, l ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ i("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Qk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ i("tr", { className: F.row, children: [
    /* @__PURE__ */ i("td", { className: F.cell, children: [
      /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Jk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webGoverned} ward-cellmeta`, children: Yk(e) }) })
  ] });
}
function q3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Qk, { ...e }) : /* @__PURE__ */ n(Vk, { ...e });
}
const Xk = "_row_vv64h_2", Zk = "_cell_vv64h_6", e$ = "_name_vv64h_25", t$ = "_note_vv64h_30", n$ = "_webName_vv64h_41", a$ = "_webMeta_vv64h_47", J = {
  row: Xk,
  cell: Zk,
  name: e$,
  note: t$,
  webName: n$,
  webMeta: a$
}, al = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function r$(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function l$({ component: e, onRestart: t }) {
  const a = y(), r = al[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: J.name, children: e.name }) }),
    /* @__PURE__ */ i("td", { className: J.cell, "data-mono": "true", children: [
      ne(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { id: a, className: J.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: J.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function o$({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: r$(e.state) });
}
function i$({ component: e, onRestart: t }) {
  return /* @__PURE__ */ i("tr", { className: J.row, children: [
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n("span", { className: `${J.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(m, { ...al[e.state] }) }),
    /* @__PURE__ */ n("td", { className: J.cell, children: /* @__PURE__ */ n(o$, { component: e, onRestart: t }) })
  ] });
}
function H3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(i$, { ...e }) : /* @__PURE__ */ n(l$, { ...e });
}
const s$ = "_row_jcm5k_7", c$ = "_cell_jcm5k_11", d$ = "_next_jcm5k_28", u$ = "_headCell_jcm5k_38", h$ = "_webId_jcm5k_77", m$ = "_webPurpose_jcm5k_83", w$ = "_webMeta_jcm5k_91", _$ = "_webUrgent_jcm5k_97", W = {
  row: s$,
  cell: c$,
  next: d$,
  headCell: u$,
  webId: h$,
  webPurpose: m$,
  webMeta: w$,
  webUrgent: _$
}, f$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "Managed by sign-in provider" }
}, v$ = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, rl = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], b$ = Object.fromEntries(rl.map((e) => [e.key, e]));
function tt({ column: e, children: t }) {
  const a = b$[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: W.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function F3() {
  return /* @__PURE__ */ n("tr", { children: rl.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: W.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function p$({ cred: e }) {
  const t = f$[e.state];
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n(tt, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(tt, { column: "id", children: e.id }),
    /* @__PURE__ */ n(tt, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(tt, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) }) }),
    /* @__PURE__ */ n(tt, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(tt, { column: "next", children: /* @__PURE__ */ n("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function g$({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function y$({ cred: e }) {
  return /* @__PURE__ */ i("tr", { className: W.row, children: [
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(g$, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(m, { ...v$[e.state] }) })
  ] });
}
function z3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(y$, { ...e }) : /* @__PURE__ */ n(p$, { ...e });
}
const N$ = "_card_lpp45_2", k$ = "_head_lpp45_11", $$ = "_env_lpp45_18", C$ = "_version_lpp45_25", S$ = "_meta_lpp45_32", R$ = "_webCard_lpp45_37", x$ = "_webRow_lpp45_47", T$ = "_webTitle_lpp45_55", L$ = "_webLine_lpp45_65", M$ = "_webVersion_lpp45_72", A$ = "_webMeta_lpp45_77", Y = {
  card: N$,
  head: k$,
  env: $$,
  version: C$,
  meta: S$,
  webCard: R$,
  webRow: x$,
  webTitle: T$,
  webLine: L$,
  webVersion: M$,
  webMeta: A$
}, Ma = { dev: "Dev", uat: "UAT", prod: "Prod" }, ll = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function I$({ env: e }) {
  const t = ll[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ i("section", { className: Y.card, "aria-label": Ma[e.env], children: [
    /* @__PURE__ */ i("div", { className: Y.head, children: [
      /* @__PURE__ */ n("span", { className: Y.env, children: Ma[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Y.version, children: e.version }),
    /* @__PURE__ */ i("p", { className: Y.meta, children: [
      "deployed ",
      me(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Y.meta, children: a })
  ] });
}
function E$(e) {
  const t = e.by !== void 0 ? `by ${e.by}` : null;
  return [me(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function B$(e) {
  return /* @__PURE__ */ i("article", { className: `${Y.webCard} ward-envcard`, children: [
    /* @__PURE__ */ i("span", { className: `${Y.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Y.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ll[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Y.version} ${Y.webVersion} ${Y.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Y.meta} ${Y.webMeta} ${Y.webLine} ward-cellmeta`, children: E$(e) })
  ] });
}
function W3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(B$, { ...e }) : /* @__PURE__ */ n(I$, { ...e });
}
const P$ = "_panel_1hmja_2", j$ = "_line_1hmja_8", O$ = "_actions_1hmja_14", Tt = {
  panel: P$,
  line: j$,
  actions: O$
};
function K3(e) {
  return /* @__PURE__ */ i("div", { className: Tt.panel, children: [
    /* @__PURE__ */ n("p", { className: Tt.line, children: e.status }),
    /* @__PURE__ */ n(E, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: Tt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: Tt.line, children: e.note ?? "" })
  ] });
}
const D$ = "_upload_13fcl_2", q$ = "_preview_13fcl_7", H$ = "_mark_13fcl_17", F$ = "_empty_13fcl_22", z$ = "_actions_13fcl_28", W$ = "_input_13fcl_33", K$ = "_reasons_13fcl_41", G$ = "_reason_13fcl_41", U$ = "_accepted_13fcl_57", re = {
  upload: D$,
  preview: q$,
  mark: H$,
  empty: F$,
  actions: z$,
  input: W$,
  reasons: K$,
  reason: G$,
  accepted: U$
}, ol = 1.5, il = 22, Ut = "script elements or event handlers", qe = "links or external references", Ie = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ol}px at ${il}px`], V$ = [Ie[1], Ie[2], Ut, qe], Y$ = /* @__PURE__ */ new Map([
  ["image", Ie[1]],
  ["text", Ie[2]],
  ["tspan", Ie[2]],
  ["textPath", Ie[2]],
  ["script", Ut],
  ["foreignObject", Ut],
  ["a", qe],
  ["use", qe],
  ["style", qe],
  ["feImage", qe],
  ["set", qe]
]), J$ = "http://www.w3.org/2000/svg", Q$ = "http://www.w3.org/2000/xmlns/", X$ = /* @__PURE__ */ new Set([
  "svg",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "g",
  "defs",
  "clipPath",
  "mask",
  "linearGradient",
  "radialGradient",
  "stop",
  "title",
  "desc"
]), Z$ = /* @__PURE__ */ new Set([
  "viewBox",
  "width",
  "height",
  "preserveAspectRatio",
  "version",
  "id",
  "transform",
  "d",
  "x",
  "y",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x1",
  "y1",
  "x2",
  "y2",
  "fx",
  "fy",
  "fr",
  "points",
  "pathLength",
  "fill",
  "fill-rule",
  "fill-opacity",
  "opacity",
  "clip-path",
  "clip-rule",
  "clipPathUnits",
  "mask",
  "maskUnits",
  "maskContentUnits",
  "gradientUnits",
  "gradientTransform",
  "spreadMethod",
  "offset",
  "stop-color",
  "stop-opacity"
]), Gn = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, e0 = /url\s*\(|['"\\]/i;
function t0() {
  return { ok: !1, reasons: [Ie[1]] };
}
function sl(e) {
  return e.namespaceURI === J$;
}
function n0(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && sl(t) ? t : null;
  } catch {
    return null;
  }
}
function a0(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [Ie[0]] : [];
}
function r0(e) {
  return Y$.get(e.localName) ?? (e.localName.startsWith("animate") ? qe : void 0);
}
function l0(e) {
  return e0.test(e.replace(Gn, ""));
}
function o0(e) {
  return /^on/i.test(e.localName) ? Ut : e.localName === "href" || l0(e.value) ? qe : void 0;
}
function i0(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(r0(a));
    for (const r of Array.from(a.attributes)) t.add(o0(r));
  }
  return V$.filter((a) => t.has(a));
}
function s0(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((l) => Number.isFinite(l) && l > 0), 0), r = a > 0 ? il / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const o = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(o) && o * r < ol;
  }) ? [Ie[3]] : [];
}
function c0(e) {
  if (e.namespaceURI === Q$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (Z$.has(t) || t.startsWith("stroke"));
}
function d0(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && sl(t) && X$.has(t.localName);
}
function u0(e, t) {
  d0(t) ? t.nodeType === Node.ELEMENT_NODE && cl(t) : e.removeChild(t);
}
function cl(e) {
  for (const t of Array.from(e.attributes)) c0(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) u0(e, t);
  return e;
}
function h0(e) {
  return Array.from(e.matchAll(Gn), (t) => t[2]).filter((t) => t !== "");
}
function m0(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function w0(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const o of h0(l.value)) a.has(o) || a.set(o, `${t}-${a.size}`);
  return a;
}
function _0(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace(Gn, (r, l, o) => {
      const s = t.get(o);
      return s === void 0 ? r : r.replace(`#${o}`, `#${s}`);
    });
}
function f0(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = w0(a, t);
  for (const l of a) {
    const o = r.get(l.getAttribute("id") ?? "");
    o === void 0 ? l.removeAttribute("id") : l.setAttribute("id", o), _0(l, r);
  }
  return e;
}
function G3(e) {
  const t = n0(e);
  if (t === null) return t0();
  const a = [...a0(t), ...i0(t), ...s0(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(f0(cl(t), m0(e))) };
}
const v0 = "Mark accepted.", b0 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, p0 = new Set(Ua.flatMap((e) => [ke(e, "id"), ke(e, "chip")]));
function g0(e) {
  return e !== void 0 && (b0.test(e) || p0.has(e)) ? e : void 0;
}
function y0({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: re.preview, style: { "--mark": g0(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: re.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: re.empty }) });
}
function N0(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function k0(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function $0({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("p", { className: re.accepted, children: v0 }) }) : /* @__PURE__ */ n("div", { className: re.result, role: "status", children: /* @__PURE__ */ n("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: re.reason, children: t }, t)) }) });
}
function C0({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n($0, { result: e }) : /* @__PURE__ */ n("p", { className: `${re.result} ${N0(e, a)}`, role: "status", children: k0(e, a) });
}
function Aa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function U3({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: l }) {
  const o = f(null), [s, c] = v(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ i("div", { className: re.upload, children: [
    /* @__PURE__ */ n(y0, { current: e }),
    /* @__PURE__ */ i("div", { className: re.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: re.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: l !== void 0,
          onChange: (u) => {
            var h;
            return d((h = u.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(b, { ...Aa(l), onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...Aa(l), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(C0, { result: s, presentation: r })
  ] });
}
const S0 = "_row_o3t6y_7", R0 = "_cell_o3t6y_11", x0 = "_head_o3t6y_28", T0 = "_name_o3t6y_34", L0 = "_pinned_o3t6y_42", M0 = "_headCell_o3t6y_49", A0 = "_webName_o3t6y_88", I0 = "_webMeta_o3t6y_95", E0 = "_webWarn_o3t6y_103", D = {
  row: S0,
  cell: R0,
  head: x0,
  name: T0,
  pinned: L0,
  headCell: M0,
  webName: A0,
  webMeta: I0,
  webWarn: E0
}, Un = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, dl = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], B0 = Object.fromEntries(dl.map((e) => [e.key, e]));
function P0(e, t) {
  return `mcp.${e}.${t}`;
}
function j0(e) {
  return Object.keys(Un).includes(e);
}
function O0(e) {
  return Un[e !== void 0 && j0(e) ? e : "unknown"];
}
function mt({ column: e, children: t }) {
  const a = B0[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: D.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function V3() {
  return /* @__PURE__ */ n("tr", { children: dl.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: D.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function D0({ server: e }) {
  const t = Un[e.connection];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i(mt, { column: "name", children: [
      /* @__PURE__ */ i("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: Kn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ i("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(mt, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(mt, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(mt, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(mt, { column: "tools", children: e.tools.map((a) => P0(e.name, a)).join(" · ") })
  ] });
}
function q0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function H0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Can write" } : { role: "meta", label: "Read only" };
}
function F0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function z0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart not set up" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function W0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function K0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ i("tr", { className: D.row, children: [
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: q0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: l.map((o) => o.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...H0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(F0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...O0(e.connection) }) }),
    /* @__PURE__ */ i("td", { className: D.cell, children: [
      /* @__PURE__ */ n(z0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(W0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function Y3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(K0, { ...e }) : /* @__PURE__ */ n(D0, { ...e });
}
const G0 = "_row_zgozg_2", U0 = "_headCell_zgozg_14", V0 = "_cell_zgozg_15", Y0 = "_name_zgozg_26", J0 = "_consequence_zgozg_32", Q0 = "_reason_zgozg_38", X0 = "_value_zgozg_44", Z0 = "_webRow_zgozg_69", eC = "_webSetting_zgozg_82", tC = "_webName_zgozg_90", nC = "_webConsequence_zgozg_98", aC = "_webControl_zgozg_104", rC = "_webState_zgozg_118", lC = "_webChip_zgozg_123", j = {
  row: G0,
  headCell: U0,
  cell: V0,
  name: Y0,
  consequence: J0,
  reason: Q0,
  value: X0,
  webRow: Z0,
  webSetting: eC,
  webName: tC,
  webConsequence: nC,
  webControl: aC,
  webState: rC,
  webChip: lC
}, ul = 104, hl = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function oC({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Xe, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(kr, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: j.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function iC({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = y(), o = hl[a], s = a === "locked";
  return /* @__PURE__ */ i("tr", { className: j.row, "data-inheritance": a, children: [
    /* @__PURE__ */ i("th", { scope: "row", className: j.headCell, children: [
      /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: j.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: j.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: j.cell, children: /* @__PURE__ */ n(oC, { control: t, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: j.cell, style: { width: ul }, children: /* @__PURE__ */ n(m, { role: o.role, label: o.label }) })
  ] });
}
function ml(e, t) {
  return String(e ?? t);
}
function sC(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function cC(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? ml(e.value, "—");
}
function dC({ control: e, name: t, locked: a, describedBy: r, onChange: l }) {
  const o = e.value === !0;
  return /* @__PURE__ */ i("span", { className: j.webControl, children: [
    /* @__PURE__ */ n(Xe, { label: t, labelHidden: !0, checked: o, locked: a, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: j.webState, "aria-hidden": "true", children: a || o ? "on" : "off" })
  ] });
}
function uC(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(dC, { ...e });
  const l = sC(t, a);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: j.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(kr, { options: l, value: ml(t.value, ""), onChange: (o) => r == null ? void 0 : r(o) }) }) : /* @__PURE__ */ n("span", { className: `${j.webControl} ${j.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: cC(t) });
}
function hC({ setting: e, control: t, inheritance: a, reason: r, onChange: l, renderControl: o }) {
  const s = y(), c = a === "locked";
  return /* @__PURE__ */ i("div", { className: `${j.row} ${j.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ i("span", { className: j.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${j.name} ${j.webName}`, children: e.name }),
      /* @__PURE__ */ i("p", { id: s, className: `${j.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    o ? /* @__PURE__ */ n("span", { className: j.webControl, children: o(s) }) : /* @__PURE__ */ n(uC, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${j.webChip} ward-policy-chip`, style: { width: ul }, children: /* @__PURE__ */ n(m, { ...hl[a], size: "tag" }) })
  ] });
}
function J3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hC, { ...e }) : /* @__PURE__ */ n(iC, { ...e });
}
const mC = "_label_1fzq1_7", wC = "_name_1fzq1_15", _C = "_column_1fzq1_24", fC = "_webFrame_1fzq1_57", vC = "_webHead_1fzq1_62", bC = "_webHeadLabel_1fzq1_74", pC = "_webLabel_1fzq1_118", gC = "_webColumns_1fzq1_125", yC = "_webGroup_1fzq1_131", NC = "_webPeople_1fzq1_132", kC = "_webVia_1fzq1_133", $C = "_webMeta_1fzq1_162", K = {
  label: mC,
  name: wC,
  column: _C,
  webFrame: fC,
  webHead: vC,
  webHeadLabel: bC,
  webLabel: pC,
  webColumns: gC,
  webGroup: yC,
  webPeople: NC,
  webVia: kC,
  webMeta: $C
}, CC = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, un = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function hn({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: K.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function SC(e) {
  if (!e.matrixRole) return;
  const t = CC[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function RC({ node: e }) {
  const t = SC(e);
  return /* @__PURE__ */ i("span", { className: K.label, children: [
    /* @__PURE__ */ n("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ n(xC, { role: t, node: e }),
    /* @__PURE__ */ n(hn, { column: un[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(hn, { column: un[1], children: e.people === void 0 ? "" : ne(e.people) }),
    /* @__PURE__ */ n(hn, { column: un[2], children: e.requestedVia ?? "" })
  ] });
}
function xC({ role: e, node: t }) {
  return /* @__PURE__ */ i(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function TC({ index: e, depth: t, node: a, expanded: r, leaf: l, onToggle: o, children: s }) {
  return /* @__PURE__ */ n(
    Lr,
    {
      index: e,
      depth: t,
      leaf: l,
      expanded: r,
      onToggle: o,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(RC, { node: a }),
      children: s
    }
  );
}
function mn({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function LC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(mn, { className: `${K.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(mn, { className: `${K.webMeta} ${K.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function MC() {
  return /* @__PURE__ */ i("div", { className: K.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: K.webHeadLabel, children: "Who has which role" }),
    /* @__PURE__ */ i("span", { className: K.webColumns, children: [
      /* @__PURE__ */ n("span", { className: K.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: K.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: K.webVia, children: "Requested via" })
    ] })
  ] });
}
function AC({ row: e }) {
  return /* @__PURE__ */ i("span", { className: `${K.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "default" }) : null
  ] });
}
function IC(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function EC({ rows: e, label: t }) {
  return /* @__PURE__ */ i("div", { className: K.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(MC, {}),
    /* @__PURE__ */ n(k_, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Lr,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(AC, { row: a }),
        detail: /* @__PURE__ */ n(LC, { row: a }),
        expanded: IC(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function Q3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(EC, { ...e }) : /* @__PURE__ */ n(TC, { ...e });
}
const BC = "_runbook_b9agc_2", PC = "_list_b9agc_7", jC = "_step_b9agc_15", OC = "_numeral_b9agc_21", DC = "_body_b9agc_28", qC = "_head_b9agc_34", HC = "_title_b9agc_40", FC = "_detail_b9agc_45", zC = "_actions_b9agc_50", WC = "_webList_b9agc_56", KC = "_webStep_b9agc_60", GC = "_webBody_b9agc_66", UC = "_webTitle_b9agc_74", VC = "_webDetail_b9agc_78", B = {
  runbook: BC,
  list: PC,
  step: jC,
  numeral: OC,
  body: DC,
  head: qC,
  title: HC,
  detail: FC,
  actions: zC,
  webList: WC,
  webStep: KC,
  webBody: GC,
  webTitle: UC,
  webDetail: VC
}, wl = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function _l(e) {
  return String(e + 1).padStart(2, "0");
}
function YC({ step: e, index: t, connection: a }) {
  const r = wl[e.state], l = e.state === "running";
  return /* @__PURE__ */ i("li", { className: B.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: B.numeral, children: _l(t) }),
    /* @__PURE__ */ i("span", { className: B.body, children: [
      /* @__PURE__ */ i("span", { className: B.head, children: [
        /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: B.detail, children: e.detail })
    ] })
  ] });
}
function JC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: B.list, children: e.map((r, l) => /* @__PURE__ */ n(YC, { step: r, index: l, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: B.actions, children: t })
  ] });
}
function QC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ i("li", { className: `${B.step} ${B.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${B.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: _l(t) }),
    /* @__PURE__ */ i("span", { className: `${B.body} ${B.webBody}`, children: [
      /* @__PURE__ */ i("span", { className: `${B.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${B.title} ${B.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...wl[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Pe, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${B.detail} ${B.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function XC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ i("div", { className: B.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${B.list} ${B.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(QC, { step: r, index: l, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${B.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function X3(e) {
  return "presentation" in e ? /* @__PURE__ */ n(XC, { ...e }) : /* @__PURE__ */ n(JC, { ...e });
}
const ZC = "_list_1gu6a_2", eS = "_check_1gu6a_10", tS = "_body_1gu6a_16", nS = "_text_1gu6a_23", aS = "_pending_1gu6a_32", rS = "_measured_1gu6a_37", rt = {
  list: ZC,
  check: eS,
  body: tS,
  text: nS,
  pending: aS,
  measured: rS
};
function lS(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function oS({ check: e }) {
  const t = lS(e.passed);
  return /* @__PURE__ */ i("li", { className: `${rt.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(On, { state: t.state, label: t.label }),
    /* @__PURE__ */ i("span", { className: rt.body, children: [
      /* @__PURE__ */ n("span", { className: rt.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ i("span", { className: rt.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: rt.measured, children: e.measured })
  ] });
}
function Z3({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${rt.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(oS, { check: t }, t.text)) });
}
const iS = "_root_y6bbq_2", sS = "_list_y6bbq_10", cS = "_line_y6bbq_32", dS = "_at_y6bbq_59", uS = "_text_y6bbq_63", hS = "_foot_y6bbq_67", mS = "_idle_y6bbq_79", wS = "_caret_y6bbq_87", _S = "_jump_y6bbq_94", ge = {
  root: iS,
  list: sS,
  line: cS,
  at: dS,
  text: uS,
  foot: hS,
  idle: mS,
  caret: wS,
  jump: _S
}, fS = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function kn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : fS.format(new Date(e));
}
const vS = { warn: "warning", ok: "ok" };
function bS({ kind: e }) {
  const t = vS[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function pS({ connection: e, idleSince: t, last: a }) {
  return e === "stale" ? /* @__PURE__ */ n("span", { className: ge.idle, children: `Quiet since ${kn([t, a == null ? void 0 : a.at, ""].find(Boolean))}` }) : (a == null ? void 0 : a.at) === void 0 ? null : /* @__PURE__ */ n("span", { children: `Last event ${kn(a.at)}` });
}
function gS({ connection: e, idleSince: t, last: a, children: r }) {
  return /* @__PURE__ */ i("p", { className: `${ge.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ge.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n(pS, { connection: e, idleSince: t, last: a }),
    r
  ] });
}
const yS = 8;
function NS(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > yS;
}
function kS({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ge.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const fl = $e(null);
function eM({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, l] = v(!1), o = Ha(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(fl.Provider, { value: o, children: a });
}
function $S() {
  const e = pe(fl), [t, a] = v(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const CS = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function tM({ lines: e, connection: t, idleSince: a, label: r = "Activity", fixed: l }) {
  const o = f(null), [s, c] = v(0), [d, u] = $S(), [h, w] = v(!1), _ = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), Qe(() => {
    const k = o.current;
    k && !h && (k.scrollTop = k.scrollHeight);
  }, [e.length, h]);
  const N = () => {
    var O;
    const k = o.current;
    if (!k) return;
    const M = k.querySelectorAll("[data-consline-text]");
    (O = M.item(M.length - 1)) == null || O.focus(), w(!1);
  };
  return /* @__PURE__ */ i("div", { className: ge.root, children: [
    /* @__PURE__ */ n("ol", { className: ge.list, ref: o, "aria-live": d ? "polite" : "off", "aria-label": r, ...CS(e.length, l), onScroll: (k) => w(NS(k.currentTarget)), children: e.map((k, M) => /* @__PURE__ */ i("li", { className: `${ge.line} ward-consline ward-reveal ward-consline--${k.kind}`, "data-kind": k.kind, "data-revealed": M < s, children: [
      /* @__PURE__ */ n("span", { className: ge.at, children: kn(k.at) }),
      /* @__PURE__ */ n(bS, { kind: k.kind }),
      /* @__PURE__ */ n("span", { className: ge.text, "data-consline-text": !0, tabIndex: -1, children: k.text })
    ] }, `${k.at}-${M}`)) }),
    /* @__PURE__ */ i(gS, { connection: t, idleSince: a, last: _, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ge.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(kS, { shown: h, onJump: N })
    ] })
  ] });
}
const SS = "_row_1k8wl_2", RS = "_head_1k8wl_14", xS = "_author_1k8wl_20", TS = "_eta_1k8wl_25", LS = "_edited_1k8wl_26", MS = "_body_1k8wl_32", AS = "_reason_1k8wl_37", IS = "_actions_1k8wl_42", xe = {
  row: SS,
  head: RS,
  author: xS,
  eta: TS,
  edited: LS,
  body: MS,
  reason: AS,
  actions: IS
}, ES = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function BS(e) {
  return {
    queued: "Not sent yet. Edits replace it.",
    delivered: `Sent. Edits show in ${e} as yours.`,
    retrying: "Sending. Cancel to edit.",
    failed: "Not sent. Resend or cancel."
  };
}
function PS({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: l, onViewOriginal: o }) {
  return e.delivery === "queued" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: o, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function jS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ i(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: xe.reason, id: t, children: e })
  ] });
}
function OS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function DS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(PS, { ...e }) : /* @__PURE__ */ n(jS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function nM(e) {
  const { comment: t } = e;
  OS(e);
  const a = y(), r = `${a}-unavailable`, l = ES[t.delivery];
  return /* @__PURE__ */ i("div", { className: `${xe.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ i("div", { className: xe.head, children: [
      /* @__PURE__ */ n("span", { className: xe.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: xe.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: xe.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: xe.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: xe.reason, id: a, children: BS(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: xe.actions, children: /* @__PURE__ */ n(DS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const qS = "_root_lxbd7_2", HS = "_attach_lxbd7_11", FS = "_actions_lxbd7_17", zS = "_reply_lxbd7_23", WS = "_replyField_lxbd7_28", KS = "_send_lxbd7_54", GS = "_sendIcon_lxbd7_65", Je = {
  root: qS,
  attach: HS,
  actions: FS,
  reply: zS,
  replyField: WS,
  send: KS,
  sendIcon: GS
};
function vl({ value: e, onChange: t }) {
  const [a, r] = v("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function US() {
  return /* @__PURE__ */ n("svg", { className: Je.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function VS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function YS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [l, o] = vl(e), s = () => {
    l.trim() !== "" && r(a, l);
  }, c = (d) => {
    VS(d) && (d.preventDefault(), s());
  };
  return /* @__PURE__ */ n("div", { className: Je.reply, "data-ward-composer": "reply", children: /* @__PURE__ */ i("div", { className: Je.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: c, children: [
    /* @__PURE__ */ n(E, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: l, onChange: o }),
    /* @__PURE__ */ i(b, { variant: "primary", className: Je.send, onClick: s, children: [
      /* @__PURE__ */ n(US, {}),
      /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
    ] })
  ] }) });
}
function aM(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(YS, { ...e }) : /* @__PURE__ */ n(JS, { ...e });
}
function JS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: l, onPost: o, onDraft: s } = e, [c, d] = vl(e);
  return /* @__PURE__ */ i("div", { className: Je.root, children: [
    /* @__PURE__ */ n(E, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ i("div", { className: Je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ n(
      nr,
      {
        label: `Run ${l.agent} again after you post`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ i("div", { className: Je.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const QS = "_list_1yhks_2", XS = "_item_1yhks_6", ZS = "_body_1yhks_22", e2 = "_text_1yhks_28", t2 = "_evidence_1yhks_37", n2 = "_consequence_1yhks_49", ot = {
  list: QS,
  item: XS,
  body: ZS,
  text: e2,
  evidence: t2,
  consequence: n2
};
function a2({ criterion: e }) {
  return /* @__PURE__ */ n(Ke, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Ia({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function r2({ criterion: e }) {
  return /* @__PURE__ */ i("span", { className: ot.body, children: [
    /* @__PURE__ */ n("span", { className: ot.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("code", { className: ot.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met || !e.why ? null : /* @__PURE__ */ i(x, { children: [
      /* @__PURE__ */ n(Ia, { text: " · " }),
      /* @__PURE__ */ n("span", { className: ot.consequence, children: e.why })
    ] })
  ] });
}
function l2({ criterion: e }) {
  return /* @__PURE__ */ i("li", { className: ot.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(a2, { criterion: e }),
    /* @__PURE__ */ n(r2, { criterion: e })
  ] });
}
function rM({ criteria: e }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n("ul", { className: `${ot.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(l2, { criterion: t }, t.text)) }) });
}
const o2 = "_list_dwhoz_2", i2 = "_rung_dwhoz_6", s2 = "_name_dwhoz_18", c2 = "_actor_dwhoz_32", Ot = {
  list: o2,
  rung: i2,
  name: s2,
  actor: c2
}, d2 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function u2({ rung: e }) {
  const t = d2[e.state];
  return /* @__PURE__ */ i("li", { className: Ot.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ot.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Ot.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function lM({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ot.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(u2, { rung: t }, t.name)) });
}
const h2 = "_sheet_pw37w_2", m2 = "_title_pw37w_9", w2 = "_stage_pw37w_15", _2 = "_effects_pw37w_20", f2 = "_effect_pw37w_20", v2 = "_numeral_pw37w_31", b2 = "_effectText_pw37w_38", p2 = "_refusals_pw37w_43", g2 = "_reasons_pw37w_52", y2 = "_reason_pw37w_52", N2 = "_actions_pw37w_62", _e = {
  sheet: h2,
  title: m2,
  stage: w2,
  effects: _2,
  effect: f2,
  numeral: v2,
  effectText: b2,
  refusals: p2,
  reasons: g2,
  reason: y2,
  actions: N2
};
function k2({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function oM({ run: e, effects: t, refusals: a, cost: r, onRequeue: l, onClose: o, returnFocusTo: s }) {
  const c = y(), d = `${c}-refusal`, [u, h] = v(""), w = a.length > 0;
  return /* @__PURE__ */ n(ut, { kind: "sheet", labelledBy: c, onClose: o, returnFocusTo: s, children: /* @__PURE__ */ i("div", { className: _e.sheet, children: [
    /* @__PURE__ */ i("h2", { className: _e.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: _e.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: _e.effects, children: t.map((_, N) => /* @__PURE__ */ i("li", { className: _e.effect, children: [
      /* @__PURE__ */ n("span", { className: _e.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: _e.effectText, children: _ })
    ] }, _)) }),
    /* @__PURE__ */ n(
      aw,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This run adds", amount: r.more },
          { label: "Total", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(E, { kind: "textarea", label: "Note", value: u, onChange: h }),
    w && /* @__PURE__ */ i("div", { className: _e.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: _e.reasons, children: a.map((_, N) => /* @__PURE__ */ n("li", { className: _e.reason, id: N === 0 ? d : void 0, children: _.reason }, _.reason)) })
    ] }),
    /* @__PURE__ */ i("div", { className: _e.actions, children: [
      /* @__PURE__ */ n(k2, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(b, { onClick: o, children: "Cancel" })
    ] })
  ] }) });
}
const $2 = "_list_1laeg_2", C2 = "_path_1laeg_7", S2 = "_consequence_1laeg_35", $n = {
  list: $2,
  path: C2,
  consequence: S2
}, Ea = {
  clarify: "Ask a question",
  requeue: "Run again",
  override: "Override and advance"
};
function R2(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ba(e) {
  return e ? "primary" : "secondary";
}
function x2({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", onClick: () => a(e.kind), children: Ea[e.kind] }) : /* @__PURE__ */ n(b, { variant: Ba(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Ea[e.kind] });
}
function T2({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ i("li", { className: $n.path, "data-allowed": e.allowed, "data-role": R2(e.requiredRole), children: [
    /* @__PURE__ */ n("span", { className: $n.consequence, children: e.consequence }),
    /* @__PURE__ */ n(x2, { path: e, primary: t, onChoose: a })
  ] });
}
function iM({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: $n.list, children: e.map((a, r) => /* @__PURE__ */ n(T2, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const L2 = "_list_1m7i0_2", M2 = "_item_1m7i0_6", A2 = "_node_1m7i0_18", I2 = "_body_1m7i0_24", E2 = "_head_1m7i0_30", B2 = "_stage_1m7i0_36", P2 = "_version_1m7i0_41", j2 = "_sentence_1m7i0_49", O2 = "_meta_1m7i0_54", Le = {
  list: L2,
  item: M2,
  node: A2,
  body: I2,
  head: E2,
  stage: B2,
  version: P2,
  sentence: j2,
  meta: O2
}, D2 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function q2({ entry: e }) {
  return /* @__PURE__ */ i("span", { className: Le.head, children: [
    /* @__PURE__ */ n("span", { className: Le.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Le.version, title: e.version, children: e.version }) : null
  ] });
}
function H2({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ i("li", { className: `${Le.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Le.node} ward-history-node`, children: /* @__PURE__ */ n(Ke, { size: 9, kind: D2[e.state], label: e.state }) }),
    /* @__PURE__ */ i("span", { className: `${Le.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(q2, { entry: e }),
      /* @__PURE__ */ n("span", { className: Le.sentence, children: e.sentence }),
      /* @__PURE__ */ i("span", { className: `${Le.meta} ward-history-meta`, children: [
        `${me(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function sM({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Le.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(H2, { entry: t }, t.stage + String(a))) });
}
const F2 = "_thread_1dsr3_3", z2 = "_turn_1dsr3_8", W2 = "_who_1dsr3_27", K2 = "_body_1dsr3_32", G2 = "_working_1dsr3_75", U2 = "_dots_1dsr3_84", V2 = "_step_1dsr3_84", Y2 = "_note_1dsr3_96", fe = {
  thread: F2,
  turn: z2,
  who: W2,
  body: K2,
  working: G2,
  dots: U2,
  step: V2,
  note: Y2
}, Vn = $e(!1);
function cM({ children: e, density: t }) {
  return /* @__PURE__ */ n(Vn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${fe.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function dM({ turn: e }) {
  if (!pe(Vn)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ i("span", { className: `${fe.who} ward-chat-who`, children: [
      e.author,
      " · ",
      me(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: e.body })
  ] });
}
function J2() {
  return /* @__PURE__ */ i("span", { className: fe.dots, "aria-hidden": "true", "data-dots": "true", children: [
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" }),
    /* @__PURE__ */ n("span", { className: "ward-running" })
  ] });
}
function Q2({ step: e, note: t }) {
  return /* @__PURE__ */ i("span", { role: "status", className: fe.step, children: [
    e === "" ? null : /* @__PURE__ */ n("span", { children: e }),
    t ? /* @__PURE__ */ n("span", { className: fe.note, children: t }) : null
  ] });
}
function uM({ author: e, step: t, body: a = "", note: r }) {
  if (!pe(Vn)) throw new Error("ChatWorking: must be rendered inside a Conversation");
  const l = a !== "";
  return /* @__PURE__ */ i("li", { className: `${fe.turn} ward-chatmsg`, "data-side": "agent", "data-turn": "agent", "data-working": "true", children: [
    /* @__PURE__ */ n("span", { className: `${fe.who} ward-chat-who`, children: e }),
    /* @__PURE__ */ i("p", { className: `${fe.working} ward-chat-working`, children: [
      l ? null : /* @__PURE__ */ n(J2, {}),
      /* @__PURE__ */ n(Q2, { step: t, note: r })
    ] }),
    l ? /* @__PURE__ */ n("p", { className: `${fe.body} ward-chat-body`, children: a }) : null
  ] });
}
const X2 = "_list_yiolt_3", Z2 = "_row_yiolt_7", eR = "_label_yiolt_20", tR = "_n_yiolt_26", nR = "_cause_yiolt_33", bt = {
  list: X2,
  row: Z2,
  label: eR,
  n: tR,
  cause: nR
};
function aR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const rR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function lR({ row: e, formatNumber: t }) {
  return aR(e), /* @__PURE__ */ i("li", { className: `${bt.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ke, { size: 8, ...rR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: bt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${bt.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(oR, { cause: e.cause })
  ] });
}
function oR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${bt.cause} ward-healthrow-cause`, children: e }) : null;
}
function hM({ rows: e, formatNumber: t = ne }) {
  return /* @__PURE__ */ n("ul", { className: `${bt.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(lR, { row: a, formatNumber: t }, a.label)) });
}
const iR = "_root_1jxwp_2", sR = {
  root: iR
};
function mM({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ i("div", { className: sR.root, "data-density": l, children: [
    /* @__PURE__ */ n(an, { items: e, note: t, density: l }),
    /* @__PURE__ */ n(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const cR = "_row_dhbre_3", dR = "_key_dhbre_13", uR = "_stack_dhbre_24", hR = "_value_dhbre_32", mR = "_evidence_dhbre_39", wR = "_mark_dhbre_47", nt = {
  row: cR,
  key: dR,
  stack: uR,
  value: hR,
  evidence: mR,
  mark: wR
};
function _R({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Check" }) : /* @__PURE__ */ n(On, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function wM({ field: e }) {
  return /* @__PURE__ */ i("li", { className: `${nt.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${nt.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ i("span", { className: `${nt.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${nt.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ i("span", { className: `${nt.evidence} ward-resfield-evidence`, title: e.evidence, children: [
        "Source: ",
        e.evidence
      ] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${nt.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(_R, { state: e.state }) })
  ] });
}
const fR = "_cell_gh2sd_2", vR = {
  cell: fR
}, bR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function pR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function gR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function yR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: pR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function NR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function _M({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  gR(e, a);
  const r = NR(e);
  return /* @__PURE__ */ n(
    vw,
    {
      label: "Rejection rules",
      columns: bR,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, o) => /* @__PURE__ */ n("span", { className: vR.cell, "data-norerun": l.noRerun ? !0 : void 0, children: yR(l, o) }),
      empty: t ?? /* @__PURE__ */ n(df, { sentence: "No rejection rules yet." })
    }
  );
}
const kR = "_row_1f2re_2", $R = "_title_1f2re_12", CR = "_turns_1f2re_18", SR = "_waiting_1f2re_19", RR = "_resolved_1f2re_20", xR = "_activity_1f2re_21", TR = "_cost_1f2re_28", LR = "_link_1f2re_29", MR = "_tableLink_1f2re_47", AR = "_tableRecord_1f2re_48", IR = "_tableRow_1f2re_59", ER = "_tableTitle_1f2re_71", BR = "_tableResolved_1f2re_76", PR = "_tableMeta_1f2re_87", jR = "_tableCost_1f2re_94", OR = "_tableActivity_1f2re_95", DR = "_tableState_1f2re_105", H = {
  row: kR,
  title: $R,
  turns: CR,
  waiting: SR,
  resolved: RR,
  activity: xR,
  cost: TR,
  link: LR,
  tableLink: MR,
  tableRecord: AR,
  tableRow: IR,
  tableTitle: ER,
  tableResolved: BR,
  tableMeta: PR,
  tableCost: jR,
  tableActivity: OR,
  tableState: DR
}, bl = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function qR(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function HR(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function FR(e) {
  const t = e.join(", ");
  return t === "" ? "—" : t;
}
const zR = { duplicate: "Closed · duplicate" };
function WR({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(st, { className: H.tableMeta, text: `waiting on ${e}` });
}
function KR({ value: e }) {
  return /* @__PURE__ */ n("td", { className: H.tableCost, children: e === void 0 ? null : le(e) });
}
function GR({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${H.tableRecord} ward-target`, href: T(e.href), children: `→ ${e.key}` });
}
function UR({ session: e, href: t }) {
  const a = bl[e.state];
  return /* @__PURE__ */ i("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ i("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${H.tableLink} ward-target`, href: T(t), children: /* @__PURE__ */ n(st, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: H.tableMeta, children: HR(e) })
    ] }),
    /* @__PURE__ */ i("td", { className: H.tableResolved, children: [
      FR(e.resolved),
      /* @__PURE__ */ n(WR, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(KR, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: H.tableActivity, children: qR(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: H.tableState, children: /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: zR[e.state] ?? a.label }),
      /* @__PURE__ */ n(GR, { link: e.link })
    ] }) })
  ] });
}
function VR({ session: e }) {
  const t = bl[e.state];
  return /* @__PURE__ */ i("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(st, { className: H.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(st, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: H.activity, children: me(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: H.link, href: T(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function fM(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(UR, { session: e.session, href: e.href }) : /* @__PURE__ */ n(VR, { session: e.session });
}
const YR = "_block_1yy2v_3", JR = "_list_1yy2v_9", QR = "_line_1yy2v_14", Cn = {
  block: YR,
  list: JR,
  line: QR
}, XR = { warn: "warning", ok: "ok" };
function ZR({ kind: e }) {
  const t = XR[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function ex({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ i("li", { className: `${Cn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(ZR, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function vM({ lines: e, label: t = "Agent input" }) {
  return /* @__PURE__ */ n("div", { className: `${Cn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Cn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(ex, { line: a }, `${r}-${a.text}`)) }) });
}
const tx = "_band_tt7hp_1", nx = "_head_tt7hp_8", ax = "_cell_tt7hp_19", rx = "_index_tt7hp_35", lx = "_title_tt7hp_42", ox = "_note_tt7hp_48", ix = "_cellTitle_tt7hp_53", sx = "_cellBody_tt7hp_58", cx = "_tag_tt7hp_64", Re = {
  band: tx,
  head: nx,
  cell: ax,
  index: rx,
  title: lx,
  note: ox,
  cellTitle: ix,
  cellBody: sx,
  tag: cx
}, Pa = 4;
function bM({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== Pa)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Pa}-cell grid`);
  return /* @__PURE__ */ i("section", { className: Re.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ i("div", { className: Re.head, children: [
      /* @__PURE__ */ n("span", { className: Re.index, children: e }),
      /* @__PURE__ */ n("span", { className: Re.title, children: t }),
      /* @__PURE__ */ n("span", { className: Re.note, children: a })
    ] }),
    r.map((l) => /* @__PURE__ */ i("div", { className: Re.cell, children: [
      /* @__PURE__ */ n("span", { className: Re.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: Re.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: Re.tag, children: l.tag })
    ] }, l.title))
  ] });
}
const dx = "_tag_1yuvz_2", ux = "_link_1yuvz_14", wn = {
  tag: dx,
  link: ux
};
function pl({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: wn.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${wn.tag} ${wn.link}`, href: T(t), children: e });
}
const hx = "_eyebrow_m8swv_2", mx = "_link_m8swv_10", ja = {
  eyebrow: hx,
  link: mx
};
function rn({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: ja.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${ja.link} ward-target`, href: T(t), children: e }) });
}
const wx = "_figure_qz9i7_2", _x = "_media_qz9i7_9", fx = "_caption_qz9i7_35", _n = {
  figure: wx,
  media: _x,
  caption: fx
};
function vx(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function Sn(e) {
  return /* @__PURE__ */ i("figure", { className: _n.figure, children: [
    /* @__PURE__ */ n("div", { className: _n.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(vx, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: _n.caption, children: e.caption })
  ] });
}
function $t(e) {
  return `h${e}`;
}
function bx(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const px = "_prose_1fxb9_2", gx = "_anchor_1fxb9_79", gl = {
  prose: px,
  anchor: gx
};
function Rn({ children: e }) {
  return /* @__PURE__ */ n("div", { className: gl.prose, children: e });
}
function pM({ level: e, children: t, id: a }) {
  const r = $t(e), l = a ?? bx(t);
  return /* @__PURE__ */ i(r, { id: l, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${gl.anchor} ward-target`, href: `#${l}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const yx = "_list_176jq_2", Nx = "_pair_176jq_8", kx = "_term_176jq_14", $x = "_value_176jq_19", Lt = {
  list: yx,
  pair: Nx,
  term: kx,
  value: $x
};
function Cx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: Lt.list, children: e.map((t) => /* @__PURE__ */ i("div", { className: Lt.pair, children: [
    /* @__PURE__ */ n("dt", { className: Lt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: Lt.value, children: t.value })
  ] }, t.term)) });
}
const Sx = "_nav_sgeyg_2", Rx = "_item_sgeyg_6", xx = "_link_sgeyg_13", Tx = "_note_sgeyg_30", Mt = {
  nav: Sx,
  item: Rx,
  link: xx,
  note: Tx
};
function Lx({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: Mt.nav, children: /* @__PURE__ */ n(gw, { children: t.map((a) => /* @__PURE__ */ i("li", { className: Mt.item, children: [
    /* @__PURE__ */ n("a", { className: `${Mt.link} ward-target`, href: T(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: Mt.note, children: a.note })
  ] }, a.href)) }) });
}
const Mx = "_header_kelio_2", Ax = "_skip_kelio_14", Ix = "_brand_kelio_39", Ex = "_list_kelio_46", Bx = "_link_kelio_56", at = {
  header: Mx,
  skip: Ax,
  brand: Ix,
  list: Ex,
  link: Bx
};
function gM({ brand: e, links: t, current: a, homeHref: r = "/", mainId: l = "main", skipLabel: o = "Skip to content" }) {
  return /* @__PURE__ */ i("header", { className: at.header, children: [
    /* @__PURE__ */ n("a", { className: at.skip, href: `#${l}`, children: o }),
    /* @__PURE__ */ n("a", { className: `${at.brand} ward-target`, href: T(r), children: e }),
    /* @__PURE__ */ n("nav", { "aria-label": "Main", className: at.nav, children: /* @__PURE__ */ n("ul", { className: at.list, role: "list", children: t.map((s) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${at.link} ward-target`, href: T(s.href), "aria-current": s.href === a ? "page" : void 0, children: s.label }) }, s.href)) }) })
  ] });
}
const Px = "_footer_1jb5e_2", jx = "_note_1jb5e_12", Ox = "_list_1jb5e_18", Dx = "_link_1jb5e_27", At = {
  footer: Px,
  note: jx,
  list: Ox,
  link: Dx
};
function yM({ note: e, links: t = [], label: a = "Footer" }) {
  return /* @__PURE__ */ i("footer", { className: At.footer, children: [
    /* @__PURE__ */ n("p", { className: At.note, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("nav", { "aria-label": a, children: /* @__PURE__ */ n("ul", { className: At.list, role: "list", children: t.map((r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n("a", { className: `${At.link} ward-target`, href: T(r.href), children: r.label }) }, r.href)) }) })
  ] });
}
const qx = "_intro_13128_2", Hx = "_title_13128_9", Fx = "_lead_13128_17", fn = {
  intro: qx,
  title: Hx,
  lead: Fx
};
function Yn({ title: e, eyebrow: t, eyebrowHref: a, lead: r, headingLevel: l = 1, children: o }) {
  const s = $t(l);
  return /* @__PURE__ */ i("header", { className: fn.intro, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { href: a, children: t }),
    /* @__PURE__ */ n(s, { className: fn.title, children: e }),
    r === void 0 ? null : /* @__PURE__ */ n("p", { className: fn.lead, children: r }),
    o
  ] });
}
const zx = "_section_u0k7p_2", Wx = "_head_u0k7p_13", Kx = "_titles_u0k7p_21", Gx = "_title_u0k7p_21", Ux = "_link_u0k7p_34", ft = {
  section: zx,
  head: Wx,
  titles: Kx,
  title: Gx,
  link: Ux
};
function Vx({ title: e, headingId: t, eyebrow: a, link: r, headingLevel: l }) {
  const o = $t(l);
  return /* @__PURE__ */ i("div", { className: ft.head, children: [
    /* @__PURE__ */ i("div", { className: ft.titles, children: [
      a === void 0 ? null : /* @__PURE__ */ n(rn, { children: a }),
      /* @__PURE__ */ n(o, { className: ft.title, id: t, children: e })
    ] }),
    r === void 0 ? null : /* @__PURE__ */ n("a", { className: `${ft.link} ward-target`, href: T(r.href), children: r.label })
  ] });
}
function NM({ title: e, children: t, id: a, eyebrow: r, link: l, headingLevel: o = 2, space: s = "8" }) {
  const c = y(), d = `${a ?? c}-title`;
  return /* @__PURE__ */ i("section", { className: ft.section, id: a, "aria-labelledby": d, "data-space": s, children: [
    /* @__PURE__ */ n(Vx, { title: e, headingId: d, eyebrow: r, link: l, headingLevel: o }),
    t
  ] });
}
const Yx = "_split_1ycaa_2", Jx = "_main_1ycaa_10", Qx = "_aside_1ycaa_15", vn = {
  split: Yx,
  main: Jx,
  aside: Qx
};
function Xx({ children: e, aside: t, asideLabel: a }) {
  return /* @__PURE__ */ i("div", { className: vn.split, children: [
    /* @__PURE__ */ n("div", { className: vn.main, children: e }),
    /* @__PURE__ */ n("aside", { className: vn.aside, "aria-label": a, children: t })
  ] });
}
const Zx = "_hero_ehbct_2", eT = "_text_ehbct_11", tT = "_visual_ehbct_23", nT = "_title_ehbct_28", aT = "_lead_ehbct_36", rT = "_actions_ehbct_42", lT = "_action_ehbct_42", oT = "_primary_ehbct_63", iT = "_secondary_ehbct_72", Ee = {
  hero: Zx,
  text: eT,
  visual: tT,
  title: nT,
  lead: aT,
  actions: rT,
  action: lT,
  primary: oT,
  secondary: iT
};
function sT({ actions: e }) {
  return e.length === 0 ? null : /* @__PURE__ */ n("div", { className: Ee.actions, children: e.map((t, a) => /* @__PURE__ */ n("a", { className: `${Ee.action} ${a === 0 ? Ee.primary : Ee.secondary}`, href: T(t.href), children: t.label }, `${t.href}-${t.label}`)) });
}
function cT({ title: e, eyebrow: t, lead: a, actions: r = [] }) {
  return /* @__PURE__ */ i("div", { className: Ee.text, children: [
    t === void 0 ? null : /* @__PURE__ */ n(rn, { children: t }),
    /* @__PURE__ */ n("h1", { className: Ee.title, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("p", { className: Ee.lead, children: a }),
    /* @__PURE__ */ n(sT, { actions: r })
  ] });
}
function kM({ visual: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: Ee.hero, "data-visual": e === void 0 ? "none" : "beside", children: [
    /* @__PURE__ */ n(cT, { ...t }),
    e === void 0 ? null : /* @__PURE__ */ n("div", { className: Ee.visual, children: e })
  ] });
}
const dT = "_chain_w2k2l_2", uT = "_step_w2k2l_12", hT = "_arrow_w2k2l_19", mT = "_box_w2k2l_24", It = {
  chain: dT,
  step: uT,
  arrow: hT,
  box: mT
};
function $M({ steps: e, label: t, animate: a }) {
  return /* @__PURE__ */ n("ol", { className: It.chain, "aria-label": t, "data-ward-animate": a ?? "", children: e.map((r, l) => /* @__PURE__ */ i("li", { className: It.step, style: { "--ward-step": l }, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: It.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n("span", { className: It.box, children: r })
  ] }, l)) });
}
const wT = "_card_1u2gr_2", _T = "_featured_1u2gr_20", fT = "_media_1u2gr_28", vT = "_body_1u2gr_32", bT = "_title_1u2gr_48", pT = "_link_1u2gr_60", gT = "_summary_1u2gr_78", yT = "_tags_1u2gr_84", NT = "_cta_1u2gr_90", ve = {
  card: wT,
  featured: _T,
  media: fT,
  body: vT,
  title: bT,
  link: pT,
  summary: gT,
  tags: yT,
  cta: NT
};
function yl({ media: e, ratio: t = "16/9" }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: ve.media, children: /* @__PURE__ */ n(Sn, { ratio: t, children: e }) });
}
function kT({ href: e, title: t, headingLevel: a = 3 }) {
  const r = $t(a);
  return /* @__PURE__ */ n(r, { className: ve.title, children: /* @__PURE__ */ n("a", { className: ve.link, href: T(e), children: t }) });
}
function Nl({ eyebrow: e, ...t }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n(rn, { children: e }),
    /* @__PURE__ */ n(kT, { ...t })
  ] });
}
function kl({ summary: e, tags: t = [] }) {
  return /* @__PURE__ */ i(x, { children: [
    e === void 0 ? null : /* @__PURE__ */ n("p", { className: ve.summary, children: e }),
    t.length === 0 ? null : /* @__PURE__ */ n("span", { className: ve.tags, children: t.map((a) => /* @__PURE__ */ n(pl, { label: a }, a)) })
  ] });
}
function CM({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, ...o }) {
  return /* @__PURE__ */ i("article", { className: ve.card, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(yl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(Nl, { eyebrow: a, ...o }),
      /* @__PURE__ */ n(kl, { summary: r, tags: l })
    ] })
  ] });
}
function SM({ media: e, ratio: t, eyebrow: a, summary: r, tags: l, cta: o, ...s }) {
  return /* @__PURE__ */ i("article", { className: `${ve.card} ${ve.featured}`, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(yl, { media: e, ratio: t }),
    /* @__PURE__ */ i("div", { className: ve.body, children: [
      /* @__PURE__ */ n(Nl, { eyebrow: a, ...s }),
      /* @__PURE__ */ n(kl, { summary: r, tags: l }),
      o === void 0 ? null : /* @__PURE__ */ i("span", { className: ve.cta, "aria-hidden": "true", children: [
        o,
        " →"
      ] })
    ] })
  ] });
}
const $T = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function $l(e) {
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : `${t.getUTCDate()} ${$T[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
}
const CT = "_row_1peme_2", ST = "_title_1peme_15", RT = "_link_1peme_23", xT = "_meta_1peme_40", TT = "_summary_1peme_46", wt = {
  row: CT,
  title: ST,
  link: RT,
  meta: xT,
  summary: TT
};
function RM({ href: e, title: t, date: a, meta: r, summary: l, headingLevel: o = 3 }) {
  const s = $t(o);
  return /* @__PURE__ */ i("article", { className: wt.row, "data-ward-rowlink": "", children: [
    /* @__PURE__ */ n(s, { className: wt.title, children: /* @__PURE__ */ n("a", { className: wt.link, href: T(e), children: t }) }),
    /* @__PURE__ */ i("p", { className: wt.meta, children: [
      /* @__PURE__ */ n("time", { dateTime: a, children: $l(a) }),
      r === void 0 ? null : ` · ${r}`
    ] }),
    l === void 0 ? null : /* @__PURE__ */ n("p", { className: wt.summary, children: l })
  ] });
}
const LT = "_list_dd8kj_2", MT = "_item_dd8kj_16", Oa = {
  list: LT,
  item: MT
};
function xM({ children: e, rules: t = !1, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Oa.list, role: "list", "aria-label": a, "data-rules": t, children: za.toArray(e).map((r, l) => /* @__PURE__ */ n("li", { className: Oa.item, children: r }, l)) });
}
const AT = "_page_i3r2z_2", IT = "_aside_i3r2z_8", ET = "_tags_i3r2z_13", Jn = {
  page: AT,
  aside: IT,
  tags: ET
};
function BT({ labels: e }) {
  return /* @__PURE__ */ n("span", { className: Jn.tags, children: e.map((t) => /* @__PURE__ */ n(pl, { label: t }, t)) });
}
function PT(e) {
  return e[1] !== void 0 && e[1].length > 0;
}
function jT(e) {
  return e.filter(PT).map(([t, a]) => ({
    term: t,
    value: typeof a == "string" ? a : /* @__PURE__ */ n(BT, { labels: a })
  }));
}
function OT({ facts: e, links: t, linksLabel: a }) {
  return /* @__PURE__ */ i("div", { className: Jn.aside, children: [
    e.length === 0 ? null : /* @__PURE__ */ n(Cx, { facts: e }),
    t === void 0 || t.length === 0 ? null : /* @__PURE__ */ n(Lx, { label: a, links: t })
  ] });
}
function Cl({ facts: e, links: t = [], linksLabel: a, asideLabel: r, children: l }) {
  return e.length === 0 && t.length === 0 ? /* @__PURE__ */ n(Rn, { children: l }) : /* @__PURE__ */ n(Xx, { asideLabel: r, aside: /* @__PURE__ */ n(OT, { facts: e, links: t, linksLabel: a }), children: /* @__PURE__ */ n(Rn, { children: l }) });
}
function TM({ title: e, summary: t, children: a, eyebrow: r, eyebrowHref: l, role: o, period: s, focus: c, stack: d, related: u }) {
  const h = jT([
    ["Role", o],
    ["Period", s],
    ["Focus", c],
    ["Stack", d]
  ]);
  return /* @__PURE__ */ i("article", { className: Jn.page, children: [
    /* @__PURE__ */ n(Yn, { title: e, lead: t, eyebrow: r, eyebrowHref: l }),
    /* @__PURE__ */ n(Cl, { facts: h, links: u, linksLabel: "Related", asideLabel: "Case study facts", children: a })
  ] });
}
const DT = "_page_1junb_2", qT = "_source_1junb_8", HT = "_shots_1junb_30", xn = {
  page: DT,
  source: qT,
  shots: HT
};
function FT({ shots: e, ratio: t }) {
  return e.length === 0 ? null : e.length === 1 ? /* @__PURE__ */ n(Sn, { ...e[0], ratio: t }) : /* @__PURE__ */ n("ul", { className: xn.shots, role: "list", "aria-label": "Screenshots", children: e.map((a, r) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(Sn, { ...a, ratio: t }) }, r)) });
}
function LM(e) {
  const { title: t, summary: a, children: r, source: l, facts: o = [], screenshots: s = [], ratio: c = "16/9" } = e;
  return /* @__PURE__ */ i("article", { className: xn.page, children: [
    /* @__PURE__ */ n(Yn, { title: t, lead: a, eyebrow: e.eyebrow, eyebrowHref: e.eyebrowHref, children: /* @__PURE__ */ n("a", { className: xn.source, href: T(l.href), children: l.label }) }),
    /* @__PURE__ */ n(FT, { shots: s, ratio: c }),
    /* @__PURE__ */ n(Cl, { facts: o, linksLabel: "Links", asideLabel: "Project facts", children: r })
  ] });
}
function zT(e) {
  const t = [], a = [];
  for (const r of e) {
    const l = { ...r, children: [] };
    for (; a.length > 0 && a[a.length - 1].level >= r.level; ) a.pop();
    const o = a[a.length - 1];
    (o === void 0 ? t : o.children).push(l), a.push(l);
  }
  return t;
}
const WT = "_article_drsu4_2", KT = "_meta_drsu4_8", GT = "_tldr_drsu4_14", UT = "_tldrLabel_drsu4_21", VT = "_tldrText_drsu4_27", YT = "_toc_drsu4_40", JT = "_tocTitle_drsu4_44", QT = "_tocList_drsu4_50", XT = "_tocLink_drsu4_65", Be = {
  article: WT,
  meta: KT,
  tldr: GT,
  tldrLabel: UT,
  tldrText: VT,
  toc: YT,
  tocTitle: JT,
  tocList: QT,
  tocLink: XT
};
function ZT({ date: e, minutes: t }) {
  return /* @__PURE__ */ i("p", { className: Be.meta, children: [
    /* @__PURE__ */ n("time", { dateTime: e, children: $l(e) }),
    t === void 0 ? null : ` · ${t} min read`
  ] });
}
function eL({ children: e }) {
  return /* @__PURE__ */ i("div", { className: Be.tldr, role: "note", "aria-label": "TL;DR", children: [
    /* @__PURE__ */ n("p", { className: Be.tldrLabel, children: "TL;DR" }),
    /* @__PURE__ */ n("div", { className: Be.tldrText, children: e })
  ] });
}
function Sl({ nodes: e }) {
  return /* @__PURE__ */ n("ol", { className: Be.tocList, role: "list", children: e.map((t) => /* @__PURE__ */ i("li", { children: [
    /* @__PURE__ */ n("a", { className: `${Be.tocLink} ward-target`, href: `#${t.id}`, children: t.text }),
    t.children.length === 0 ? null : /* @__PURE__ */ n(Sl, { nodes: t.children })
  ] }, t.id)) });
}
function tL({ headings: e }) {
  const t = y();
  return e.length === 0 ? null : /* @__PURE__ */ i("nav", { className: Be.toc, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h2", { className: Be.tocTitle, id: t, children: "On this page" }),
    /* @__PURE__ */ n(Sl, { nodes: zT(e) })
  ] });
}
function MM({ title: e, date: t, children: a, minutes: r, tldr: l, headings: o = [], eyebrow: s, eyebrowHref: c }) {
  return /* @__PURE__ */ i("article", { className: Be.article, children: [
    /* @__PURE__ */ n(Yn, { title: e, eyebrow: s, eyebrowHref: c, children: /* @__PURE__ */ n(ZT, { date: t, minutes: r }) }),
    l === void 0 ? null : /* @__PURE__ */ n(eL, { children: l }),
    /* @__PURE__ */ n(tL, { headings: o }),
    /* @__PURE__ */ n(Rn, { children: a })
  ] });
}
const nL = 220;
function aL(e) {
  return e.replace(/<[^>]*>/g, " ").split(/\s+/).filter((a) => /[\p{L}\p{N}]/u.test(a)).length;
}
function AM(e) {
  return Math.max(1, Math.ceil(aL(e) / nL));
}
const Vt = { w: 184, h: 96 }, ct = { w: 152, h: 48 }, Yt = 16, Et = (e) => Math.round(e * 10) / 10;
function Rl(e) {
  return { x: Yt + e.col * Vt.w, y: Yt + e.row * Vt.h, w: ct.w, h: ct.h };
}
function rL(e) {
  const t = Math.max(0, ...e.map((r) => r.col)), a = Math.max(0, ...e.map((r) => r.row));
  return { w: 2 * Yt + t * Vt.w + ct.w, h: 2 * Yt + a * Vt.h + ct.h };
}
function Da(e, t, a) {
  return Math.min(e.w / 2 / Math.abs(t), e.h / 2 / Math.abs(a));
}
function lL(e, t) {
  const a = e.x + e.w / 2, r = e.y + e.h / 2, l = t.x + t.w / 2 - a, o = t.y + t.h / 2 - r, s = Da(e, l, o), c = 1 - Da(t, l, o);
  return { x1: Et(a + l * s), y1: Et(r + o * s), x2: Et(a + l * c), y2: Et(r + o * c) };
}
function oL() {
  const [e, t] = v(!1);
  return S(() => {
    var l;
    const a = (l = window.matchMedia) == null ? void 0 : l.call(window, "(prefers-reduced-motion: no-preference)");
    if (!a) return;
    const r = (o) => t(o.matches);
    return t(a.matches), a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), e;
}
const iL = "_diagram_76e4t_2", sL = "_label_76e4t_9", cL = "_svg_76e4t_14", dL = "_node_76e4t_20", uL = "_edge_76e4t_33", hL = "_arrow_76e4t_38", mL = "_controls_76e4t_63", wL = "_live_76e4t_70", _L = "_steps_76e4t_77", Me = {
  diagram: iL,
  label: sL,
  svg: cL,
  node: dL,
  edge: uL,
  arrow: hL,
  controls: mL,
  live: wL,
  steps: _L
};
function fL({ nodes: e, edges: t, lit: a, marker: r }) {
  const l = new Map(e.map((o) => [o.id, Rl(o)]));
  return t.map((o) => {
    const s = l.get(o.from), c = l.get(o.to);
    if (s === void 0 || c === void 0) return null;
    const d = a(o.from) && a(o.to);
    return /* @__PURE__ */ n("line", { className: Me.edge, "data-active": d, ...lL(s, c), markerEnd: `url(#${r})` }, `${o.from}>${o.to}`);
  });
}
function vL({ nodes: e, lit: t }) {
  return e.map((a) => {
    const r = Rl(a);
    return /* @__PURE__ */ i("g", { className: Me.node, "data-active": t(a.id), "data-node": a.id, children: [
      /* @__PURE__ */ n("rect", { x: r.x, y: r.y, width: r.w, height: r.h, rx: "8" }),
      /* @__PURE__ */ n("text", { x: r.x + ct.w / 2, y: r.y + ct.h / 2, children: a.label })
    ] }, a.id);
  });
}
function qa({ label: e, to: t, count: a, go: r, status: l }) {
  return t < 0 || t >= a ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: l, children: e }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => r(t), children: e });
}
function bL({ at: e, count: t, text: a, go: r }) {
  const l = y();
  return /* @__PURE__ */ i("div", { className: Me.controls, children: [
    /* @__PURE__ */ n(qa, { label: "Back", to: e - 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n(qa, { label: "Next", to: e + 1, count: t, go: r, status: l }),
    /* @__PURE__ */ n("p", { className: Me.live, id: l, "aria-live": "polite", children: `Step ${e + 1} of ${t}: ${a}` })
  ] });
}
function IM({ label: e, nodes: t, edges: a, steps: r }) {
  const l = oL() && r.length > 0, [o, s] = v(0), c = y(), d = (h) => l && r[o].nodes.includes(h), u = rL(t);
  return /* @__PURE__ */ i("figure", { className: Me.diagram, "data-live": l, "aria-labelledby": c, children: [
    /* @__PURE__ */ n("figcaption", { className: Me.label, id: c, children: e }),
    /* @__PURE__ */ i("svg", { className: Me.svg, viewBox: `0 0 ${u.w} ${u.h}`, width: u.w, height: u.h, "aria-hidden": "true", children: [
      /* @__PURE__ */ n("defs", { children: /* @__PURE__ */ n("marker", { id: `${c}-arrow`, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "8", markerHeight: "8", markerUnits: "userSpaceOnUse", orient: "auto-start-reverse", children: /* @__PURE__ */ n("path", { className: Me.arrow, d: "M0 0 L8 4 L0 8 z" }) }) }),
      /* @__PURE__ */ n(fL, { nodes: t, edges: a, lit: d, marker: `${c}-arrow` }),
      /* @__PURE__ */ n(vL, { nodes: t, lit: d })
    ] }),
    l ? /* @__PURE__ */ n(bL, { at: o, count: r.length, text: r[o].text, go: s }) : null,
    /* @__PURE__ */ n("ol", { className: Me.steps, children: r.map((h, w) => /* @__PURE__ */ n("li", { "aria-current": l && w === o ? "step" : void 0, children: h.text }, w)) })
  ] });
}
export {
  TL as ACCENT_PRESETS,
  t3 as ActionStack,
  tM as ActivityConsole,
  OL as AdminIcon,
  Cp as AgentCard,
  IM as AnimatedDiagram,
  qL as AppShell,
  D3 as AppearanceStrip,
  MM as Article,
  bM as Band,
  ZL as BarChart,
  Kf as BoardColumn,
  b3 as BoardFootnote,
  p3 as BoardHeader,
  PL as BoardIcon,
  c3 as BoardScroller,
  b as Btn,
  xL as CHIP_ROLES,
  ML as CONTRASTS,
  rl as CREDENTIAL_COLUMNS,
  JL as Callout,
  q3 as CapabilityRow,
  u3 as CardGrid,
  TM as CaseStudy,
  dM as ChatMessage,
  uM as ChatWorking,
  nr as Checkbox,
  m as Chip,
  st as ClampText,
  nM as ClarificationRow,
  T3 as ClauseRuleRow,
  x3 as ClauseRules,
  jr as ColourLadder,
  H3 as ComponentRow,
  aM as Composer,
  y3 as ConfigRow,
  g3 as ConfigRowHead,
  Dn as ConnectionMark,
  eM as ConsoleAnnounceProvider,
  cM as Conversation,
  aw as CostMeter,
  z3 as CredentialRow,
  F3 as CredentialRowHead,
  rM as CriteriaList,
  wc as Crumb,
  LL as DENSITIES,
  hM as DeliveryHealth,
  m3 as DeniedState,
  EL as DisabledScope,
  M3 as DryRunRail,
  df as EmptyState,
  W3 as EnvCard,
  rn as Eyebrow,
  Cx as FactList,
  SM as FeaturedCard,
  E as Field,
  Sn as Figure,
  h3 as FilteredEmpty,
  $M as FlowChain,
  HL as FoldText,
  i3 as FormStack,
  an as GateChecklist,
  lM as GateLadder,
  vw as Grid,
  I3 as HandoffRuleRow,
  A3 as HandoffRules,
  kM as Hero,
  BL as HomeIcon,
  QL as InfoTip,
  N3 as ItemDrawer,
  K3 as KeyPanel,
  Vl as LIVE_EVENT_TYPES,
  Ub as LegacyBoardColumn,
  $3 as LegacyBoardHeader,
  C3 as LegacyConfigRow,
  R3 as LegacyItemDrawer,
  qb as LegacyOverCapNote,
  S3 as LegacyPreviewRail,
  Er as LegacyWorkCard,
  Lx as LinkList,
  Pe as LiveIndicator,
  w3 as LoadFailed,
  v3 as Loading,
  dl as MCP_SERVER_COLUMNS,
  On as Mark,
  U3 as MarkUpload,
  Ke as Marker,
  Y3 as McpServerRow,
  V3 as McpServerRowHead,
  fr as Menu,
  mr as MenuButton,
  E3 as NewStreamModal,
  wf as OverCapNote,
  In as OverflowRow,
  ut as Overlay,
  FL as OwedCard,
  L3 as PARTIAL_STEP_REASON,
  ul as POLICY_CHIP_WIDTH,
  r3 as PageFrame,
  YL as PageHeader,
  Yn as PageIntro,
  XL as PeriodPicker,
  gw as PlainList,
  J3 as PolicyRow,
  RM as PostRow,
  k3 as PreviewRail,
  CM as ProjectCard,
  LM as ProjectPage,
  Rn as Prose,
  pM as ProseHeading,
  un as ROLE_MATRIX_COLUMNS,
  Jr as RULE_ACTIONS,
  Cr as Radio,
  mM as ReadyChecklist,
  o3 as RecordSection,
  oM as RequeueSheet,
  iM as ResolveBlock,
  wM as ResolvedFieldRow,
  Q3 as RoleMatrixRow,
  _M as RoutingTable,
  B3 as RuleRow,
  X3 as RunbookSteps,
  Ul as STREAM_STEPS,
  NM as Section,
  s3 as SectionBand,
  pa as SectionHeader,
  kr as SegmentedControl,
  dr as Select,
  fM as SessionRow,
  GL as Sidebar,
  DL as SidebarFoldButton,
  yM as SiteFooter,
  gM as SiteHeader,
  Xx as SplitLayout,
  P3 as StageColumn,
  d3 as StageGrid,
  sM as StageHistory,
  t1 as StageListEditor,
  zL as StageSteps,
  _3 as StaleStrip,
  en as StatStrip,
  n3 as StatTiles,
  VL as StreamAvatar,
  j3 as StreamRow,
  jL as StudioIcon,
  l3 as SubjectRail,
  Xe as Switch,
  KL as TabLinks,
  e3 as TableHead,
  WL as Tabs,
  pl as Tag,
  xM as TextList,
  $L as ThemeProvider,
  O3 as ToolRow,
  a3 as TopBar,
  k_ as Tree,
  Lr as TreeRow,
  vM as TypedInputBlock,
  Di as UNSAFE_HREF,
  Z3 as ValidationList,
  NL as VisibilityProvider,
  kL as Visible,
  RL as WARD_VERSION,
  nn as WorkCard,
  f3 as WriteUnavailableStrip,
  qR as agoSince,
  Il as clock,
  b1 as colourStatus,
  ne as count,
  se as duration,
  Tn as elapsed,
  SL as eventSourceTransport,
  $l as formatDate,
  $t as headingTag,
  Qt as isStreamStep,
  yt as isValidatedStreamStep,
  eg as ladderValidation,
  O0 as mcpConnectionChip,
  P0 as mcpToolName,
  le as money,
  ye as ms,
  Mr as ordered,
  Ka as ratio,
  AM as readTime,
  r$ as restartLabel,
  T as safeHref,
  bx as slug,
  me as stamp,
  Ln as stream,
  AL as streamChip,
  En as streamChipProps,
  ke as streamColour,
  Ql as streamHex,
  Ht as streamInitials,
  Yl as streamVars,
  UL as uniqueStreamInitials,
  or as useAnchoredPanel,
  Bt as useBorderFlash,
  je as useDisabledScope,
  Wl as useFocusTrap,
  IL as useLiveFeed,
  CL as useReturnFocus,
  Jt as useRovingTabindex,
  Mn as useTicker,
  El as useVisible,
  P as v,
  G3 as validateMark,
  Zt as validatedStep,
  Ua as validatedStreamSteps,
  aL as wordCount
};
