import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ua, useContext as ye, createContext as Ne, useState as p, useEffect as S, useCallback as te, useRef as _, useLayoutEffect as tt, useId as k, Fragment as ha, isValidElement as zr, Children as Wr } from "react";
import { createPortal as Kr, flushSync as ma } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const t = Math.floor(e / 6e4);
  if (t < 60) return `${t}m`;
  const a = Math.floor(e / 36e5);
  return a < 24 ? `${a}h ${t % 60}m` : `${Math.floor(a / 24)}d ${a % 24}h`;
}
const Rn = (e) => String(e).padStart(2, "0");
function cn(e) {
  const t = Math.floor(Math.max(0, e) / 1e3);
  if (t < 60) return `${t}s`;
  const a = Math.floor(t / 60);
  return a < 60 ? `${a}m ${Rn(t % 60)}s` : `${Math.floor(a / 60)}h ${Rn(a % 60)}m`;
}
const Gr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const t = Gr.formatToParts(new Date(e)), a = (r) => {
    var o;
    return ((o = t.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
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
function ae(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function wa(e, t) {
  return `${e} / ${t}`;
}
const Ur = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Vr(e) {
  return Ur.format(new Date(e));
}
const fa = Ne(/* @__PURE__ */ new Set());
function V2({ hidden: e, children: t }) {
  const a = ua(() => new Set(e), [e]);
  return /* @__PURE__ */ n(fa.Provider, { value: a, children: t });
}
function Yr(e) {
  return !ye(fa).has(e);
}
function Y2({ id: e, children: t, fallback: a = null }) {
  return /* @__PURE__ */ n(x, { children: Yr(e) ? t : a });
}
const Jr = "(prefers-color-scheme: dark)";
function Tn() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Jr) : null;
}
function Qr(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = Tn()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? Tn() : null;
    if (!r) return;
    const o = () => a(r.matches);
    return o(), r.addEventListener("change", o), () => r.removeEventListener("change", o);
  }, [e]), t;
}
function Wt(e, t) {
  S(() => {
    const a = document.documentElement;
    return a.setAttribute(e, t), () => a.removeAttribute(e);
  }, [e, t]);
}
function Xr(e, t) {
  return e !== "system" ? e : t ? "dark" : "light";
}
function J2({ theme: e, accent: t = "green", density: a = "comfortable", children: r }) {
  const o = Qr(e === "system");
  return Wt("data-theme", Xr(e, o)), Wt("data-accent", t), Wt("data-density", a), /* @__PURE__ */ n(x, { children: r });
}
const Zr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function eo(e, t) {
  return document.activeElement === t || document.activeElement === e;
}
function to(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function no(e, t, a, r) {
  return e.shiftKey ? eo(t, a) ? r : void 0 : document.activeElement === r || to(t) ? a : void 0;
}
function ao(e, t, a) {
  const r = a[0], o = a[a.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = no(e, t, r, o);
  i && (e.preventDefault(), i.focus());
}
function ro(e) {
  return { onKeyDown: te(
    (a) => {
      if (a.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Zr));
      ao(a, e.current, r);
    },
    [e]
  ) };
}
function Q2(e, t = !0) {
  S(() => {
    if (!t) return;
    const a = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? a) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [t, e]);
}
const xn = { ArrowUp: -1, ArrowDown: 1 }, Ln = { ArrowLeft: -1, ArrowRight: 1 }, oo = (e, t, a) => Math.min(a, Math.max(t, e));
function lo(e, t) {
  if (t !== "horizontal" && e in xn) return xn[e];
  if (t !== "vertical" && e in Ln) return Ln[e];
}
function Pt({ orientation: e = "both" } = {}) {
  const [t, a] = p(0), r = _(/* @__PURE__ */ new Map()), o = _(!1);
  tt(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(t)) return;
    const h = u[0], w = o.current;
    o.current = !1, a(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const i = te((u) => a(u), []), s = te((u) => {
    var h;
    a(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = te(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(t)), f = lo(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[oo(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [t, s, e]
  ), d = te(
    (u) => ({
      tabIndex: u === t ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === t && (o.current = !0));
      },
      onFocus: () => a(u),
      "data-ward-roving": !0
    }),
    [t]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const X2 = (e, t, a) => {
  const r = new EventSource(e), o = (i) => a.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => a.onOpen(), r.onerror = () => a.onError(), { close: () => r.close() };
}, Z2 = "0.2.0", eT = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], io = [1, 2, 3, 4, 5, 6], _a = [1, 2, 3], so = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], tT = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], nT = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], B = {
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
    measure: "var(--ward-width-measure)"
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
    codeText: "var(--ward-type-codeText)"
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
}, be = {
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
function dn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function jt(e) {
  return io.includes(e);
}
function ht(e) {
  return _a.includes(e);
}
function co(e) {
  if (!jt(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function aT(e) {
  if (!jt(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const uo = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function ho(e) {
  if (!jt(e)) throw new Error("unvalidated stream step");
  return uo[e];
}
function An(e) {
  return typeof e != "string" ? null : so.includes(e) ? e : null;
}
function mo(e) {
  try {
    const t = JSON.parse(e);
    return typeof t == "object" && t !== null ? t : null;
  } catch {
    return null;
  }
}
function wo(e, t) {
  return t !== "" ? t : typeof e.id == "string" ? e.id : "";
}
function fo(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function _o(e, t, a) {
  const r = mo(e);
  if (r === null) return null;
  const o = An(a) ?? An(r.type);
  return o === null ? null : { ...r, type: o, id: wo(r, t), at: fo(r) };
}
function vo(e, t) {
  return e >= be.staleAfter ? "stale" : e >= be.heartbeat && t === "live" ? "reconnecting" : null;
}
function bo(e, t, a) {
  return e >= be.heartbeat && !t && a !== null;
}
function rT(e, t) {
  const [a, r] = p("reconnecting"), [o, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), N = _("reconnecting"), A = te((T) => {
    N.current = T, r(T);
  }, []), O = te(() => {
    c.current = Date.now();
  }, []), me = te((T) => {
    for (const [J, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && J(T);
  }, []), re = te(() => {
    h.current = t(e, { lastEventId: d.current }, {
      onEvent: (T, J, ke) => {
        const ze = _o(T, J, ke);
        ze !== null && (ze.id && (d.current = ze.id), O(), y.current = !1, A("live"), i(ze.at), me(ze));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, O(), A("live");
      },
      onError: () => {
        var J;
        (J = h.current) == null || J.close(), h.current = null, y.current = !0, N.current !== "stale" && A("reconnecting");
        const T = Math.min(be.reconnectBase * 2 ** u.current, be.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, T);
      }
    });
  }, [me, A, O, t, e]), Ee = te((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(re, be.reconnectBase);
  }, [re]), Ye = te((T, J) => (s.current.set(J, T), () => {
    s.current.delete(J);
  }), []);
  return S(() => (re(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, J = vo(T, N.current);
    J && A(J);
    const ke = h.current;
    bo(T, y.current, ke) && Ee(ke);
  }, be.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [re, Ee, A]), { connection: a, lastEventAt: o, subscribe: Ye };
}
function un(e, t) {
  const a = new Date(e).getTime(), [r, o] = p(() => Date.now());
  return S(() => {
    if (!t) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const s = window.setInterval(i, be.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [t, a]), Math.max(0, r - a);
}
const po = { blue: "running", orange: "waiting", green: "done" };
function go() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function En(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function Nt(e, t) {
  const a = _(0), r = te((o) => {
    const i = o ?? t, s = e.current;
    s !== null && i !== void 0 && (go() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${po[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => En(s), { once: !0 }), window.clearTimeout(a.current), a.current = window.setTimeout(() => En(s), be.flash)));
  }, [t, e]);
  return S(() => () => window.clearTimeout(a.current), []), t === void 0 ? (o) => r(o) : () => r(t);
}
const yo = "_root_1otpc_2", No = {
  root: yo
};
function ko(e, t, a, r, o) {
  const i = [cn(t)];
  return e || i.push(`as of ${Vr(a)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function Le({ startedAt: e, lastEvent: t, connection: a, turn: r }) {
  const o = a !== "stale", i = un(e, o), s = (t == null ? void 0 : t.at) ?? e, c = ko(o, i, s, r, t);
  return /* @__PURE__ */ l("span", { className: `${No.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const $o = "_app_1bnco_1", Co = "_side_1bnco_35", So = "_sideTop_1bnco_46", Ro = "_sideBody_1bnco_60", To = "_iconRail_1bnco_99", xo = "_railItem_1bnco_108", Lo = "_railIcon_1bnco_129", Ao = "_railDot_1bnco_134", Eo = "_railLetter_1bnco_140", Io = "_main_1bnco_146", Mo = "_rail_1bnco_108", Bo = "_page_1bnco_168", Po = "_headerRow_1bnco_191", jo = "_sidebarToggle_1bnco_198", qo = "_headerSlot_1bnco_203", Oo = "_headerAction_1bnco_208", Ho = "_drawerSide_1bnco_213", Do = "_root_1bnco_260", Fo = "_topbar_1bnco_267", zo = "_mark_1bnco_278", Wo = "_brand_1bnco_285", Ko = "_tagline_1bnco_291", Go = "_identity_1bnco_297", Uo = "_tools_1bnco_298", Vo = "_nav_1bnco_308", Yo = "_metadata_1bnco_315", Jo = "_actor_1bnco_330", Qo = "_detail_1bnco_331", Xo = "_content_1bnco_376", Zo = "_toolsPanel_1bnco_392", el = "_skip_1bnco_418", C = {
  app: $o,
  side: Co,
  sideTop: So,
  sideBody: Ro,
  iconRail: To,
  railItem: xo,
  railIcon: Lo,
  railDot: Ao,
  railLetter: Eo,
  main: Io,
  rail: Mo,
  page: Bo,
  headerRow: Po,
  sidebarToggle: jo,
  headerSlot: qo,
  headerAction: Oo,
  drawerSide: Ho,
  root: Do,
  topbar: Fo,
  mark: zo,
  brand: Wo,
  tagline: Ko,
  identity: Go,
  tools: Uo,
  nav: Vo,
  metadata: Yo,
  actor: Jo,
  detail: Qo,
  content: Xo,
  toolsPanel: Zo,
  skip: el
};
function at(...e) {
  const t = e.filter((a) => a !== void 0 && a !== "");
  return t.length === 0 ? void 0 : t.join(" ");
}
const tl = "_scope_1an6i_2", nl = {
  scope: tl
}, va = Ne(null);
function oT({ reason: e, actions: t = "disable", children: a }) {
  const r = k();
  return /* @__PURE__ */ l("fieldset", { disabled: !0, className: `${nl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ n("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ n(va.Provider, { value: { reason: e, reasonId: r, actions: t }, children: a })
  ] });
}
function Ae() {
  return ye(va);
}
function qt(e, t) {
  return !t || (e ?? "").split(" ").includes(t.reasonId) ? e : at(e, t.reasonId);
}
const al = "_btn_hrmlj_2", rl = "_primary_hrmlj_14", ol = "_destructive_hrmlj_25", ll = "_secondary_hrmlj_35", il = "_ghost_hrmlj_40", sl = "_overflow_hrmlj_49", cl = "_sm_hrmlj_56", dl = "_disabled_hrmlj_60", ul = "_withReason_hrmlj_68", hl = "_reason_hrmlj_74", et = {
  btn: al,
  primary: rl,
  destructive: ol,
  secondary: ll,
  ghost: il,
  overflow: sl,
  sm: cl,
  disabled: dl,
  withReason: ul,
  reason: hl
};
function ml(e, t, a, r) {
  const o = t === "sm" ? [et.sm, "ward-btn--sm"] : [], i = a ? [et.disabled] : [];
  return [et.btn, et[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function wl(e, t) {
  return e !== "overflow" ? {} : t ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function fl(e, t) {
  if (e.disabled && !t && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function _l(e, t) {
  return t ? t.reason : e.disabled ? e.disabledReason : void 0;
}
function vl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function bl(e, t, a) {
  return vl(e.describedBy, t && a);
}
function pl({ id: e, reason: t, shown: a }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: a ? `${et.reason} ward-btn-reason` : "ward-visually-hidden", children: t }) : null;
}
function gl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var t;
  return ((t = Ae()) == null ? void 0 : t.actions) === "hide" ? null : /* @__PURE__ */ n(yl, { ...e });
}
function yl(e) {
  const t = Ae();
  fl(e, t);
  const a = e.variant ?? "secondary", r = e.size ?? "md", o = !!(e.disabled || t), i = _l(e, t), s = k(), c = Nl(i, t);
  return /* @__PURE__ */ l(c, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: ml(a, r, o, e.className),
        "data-ward-btn": a,
        "data-ward-size": r,
        disabled: o,
        title: i,
        "aria-describedby": bl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...wl(a, e.controls),
        children: gl(e)
      }
    ),
    /* @__PURE__ */ n(pl, { id: s, reason: i, shown: c === ba })
  ] });
}
function Nl(e, t) {
  return e && !t ? ba : ha;
}
function ba({ children: e }) {
  return /* @__PURE__ */ n("span", { className: `${et.withReason} ward-btn-withReason`, children: e });
}
let hn = "none";
function kl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (hn = "key");
}
typeof document < "u" && (document.addEventListener("keydown", kl, !0), document.addEventListener("pointerdown", () => {
  hn = "pointer";
}, !0));
function $l() {
  return hn === "key";
}
function dt(e) {
  const [t, a] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (s) => a(s.matches);
    return r.addEventListener("change", o), a(r.matches), () => r.removeEventListener("change", o);
  }, [e]), t;
}
const Cl = "_scrim_1cawq_2", Sl = "_drawer_1cawq_10", Rl = "_sheet_1cawq_14", Tl = "_modal_1cawq_18", xl = "_panel_1cawq_23", Ll = "_start_1cawq_44", Al = "_header_1cawq_67", El = "_title_1cawq_75", Il = "_body_1cawq_79", Ml = "_close_1cawq_106", Te = {
  scrim: Cl,
  drawer: Sl,
  sheet: Rl,
  modal: Tl,
  panel: xl,
  start: Ll,
  header: Al,
  title: El,
  body: Il,
  close: Ml
}, Bl = Ne(null), Rt = [], Tt = /* @__PURE__ */ new Map();
function Pl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function jl(e, t) {
  let a = Tt.get(t);
  a || (a = { owners: /* @__PURE__ */ new Set(), wasInert: t.hasAttribute("inert") }, Tt.set(t, a)), !a.owners.has(e) && (a.owners.add(e), e.claims.push(t), t.setAttribute("inert", ""));
}
function ql(e, t, a) {
  for (const r of Array.from(t.children))
    r !== a && !Pl(r) && jl(e, r);
}
function Ol(e, t) {
  let a = null, r = t;
  for (; r; ) {
    if (ql(e, r, a), r === document.body) return;
    a = r, r = r.parentElement;
  }
}
function Hl(e) {
  for (const t of e.claims) {
    const a = Tt.get(t);
    a && (a.owners.delete(e), !(a.owners.size > 0) && (a.wasInert || t.removeAttribute("inert"), Tt.delete(t)));
  }
}
function Dl(e, t) {
  const a = { root: e, claims: [] };
  return Rt.push(a), Ol(a, t), a;
}
function Fl(e) {
  const t = Rt.indexOf(e);
  t >= 0 && Rt.splice(t, 1), Hl(e);
}
function In(e) {
  return e !== null && Rt.at(-1) === e;
}
function zl(e, t, a) {
  const r = _(null), o = _(a);
  return o.current = a, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Dl(i, t);
    return r.current = c, () => {
      var u, h;
      const d = In(c);
      Fl(c), r.current = null, d && ((h = (u = o.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [t]), te(() => In(r.current), []);
}
function Wl(e, t) {
  return e === "modal" && !t ? "sheet" : e;
}
function Kl(e, t) {
  return e.title !== void 0 ? { labelledBy: t, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Gl({ props: e, titleId: t }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: t, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Ul(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Vl(e, t) {
  const a = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = t ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${a}${r}`;
}
function Yl(e) {
  const t = ye(Bl);
  return e ?? t ?? document.body;
}
function rt(e) {
  const t = _(null), a = _(null), r = k(), o = Yl(e.container), i = dt("(min-width: 768px)"), s = Wl(e.kind, i), c = Kl(e, r), d = ro(a), [u] = p($l), h = zl(t, o, e.returnFocusTo), w = te(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return S(() => {
    var f;
    h() && ((f = a.current) == null || f.focus());
  }, [h]), S(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Kr(
    /* @__PURE__ */ n(
      "div",
      {
        ref: t,
        className: Ul(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ l(
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
            className: Vl(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Gl, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Jl = /^([a-z][a-z0-9+.-]*):/i, Ql = /* @__PURE__ */ new Set(["http", "https"]), Xl = "#";
function Zl(e) {
  var r, o;
  const t = e.replace(/[\t\n\r]/g, "");
  let a = 0;
  for (; a < t.length && t.charCodeAt(a) <= 32; ) a += 1;
  return (o = (r = Jl.exec(t.slice(a))) == null ? void 0 : r[1]) == null ? void 0 : o.toLowerCase();
}
function q(e) {
  const t = Zl(e);
  return t === void 0 || Ql.has(t) ? e : Xl;
}
function ei(e) {
  const t = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: t > 1 };
}
function pa(e) {
  const t = ei(e);
  return e.toggleAttribute("data-fade-start", t.start), e.toggleAttribute("data-fade-end", t.end), t;
}
function ti(e, t) {
  S(() => {
    const a = e.current;
    if (!a) return;
    const r = () => pa(a);
    a.addEventListener("scroll", r, { passive: !0 });
    const o = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [a, ...a.children]) o == null || o.observe(i);
    return r(), () => {
      a.removeEventListener("scroll", r), o == null || o.disconnect();
    };
  }, [e, t]);
}
function ni(e, t) {
  const a = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = t.getBoundingClientRect().left - e.getBoundingClientRect().left, o = r + t.getBoundingClientRect().width;
  return r < a ? e.scrollLeft + r - a : o > e.clientWidth - a ? e.scrollLeft + o - e.clientWidth + a : null;
}
function ai(e, t, a) {
  tt(() => {
    const r = e.current, o = r == null ? void 0 : r.querySelectorAll(a)[t];
    if (!r || !o) return;
    const i = ni(r, o);
    i !== null && (r.scrollLeft = Math.max(0, i)), pa(r);
  }, [e, t, a]);
}
const ri = "_row_11g8i_2", oi = {
  row: ri
};
function li(e, t) {
  return e ? { role: t === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function mn({ label: e, children: t, count: a, as: r = "div", focusable: o = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return ti(u, a), /* @__PURE__ */ n(r, { ref: u, className: [oi.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...li(o, r), ...c, children: t });
}
const ii = "_icon_1ylqy_2", si = {
  icon: ii
};
function mt({ children: e }) {
  return /* @__PURE__ */ n("svg", { className: si.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function lT() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function iT() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ n("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function sT() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ n("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function cT() {
  return /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function ci() {
  return /* @__PURE__ */ l(mt, { children: [
    /* @__PURE__ */ n("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ n("path", { d: "M9 4v16" })
  ] });
}
const ga = "ward:sidebar-collapsed", di = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ui() {
  try {
    return window.localStorage.getItem(ga) === "true";
  } catch {
    return !1;
  }
}
function hi(e) {
  try {
    window.localStorage.setItem(ga, String(e));
  } catch {
  }
}
function mi(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function wi(e) {
  return e instanceof Element && e.closest(di) !== null;
}
function fi(e) {
  return e.key === "[" && !mi(e) && !wi(e.target);
}
function _i(e) {
  const [t, a] = p(ui), r = () => {
    hi(!t), a(!t);
  };
  return S(() => {
    if (!e) return;
    const o = (i) => {
      var c;
      if (!fi(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", o), () => document.removeEventListener("keydown", o);
  }, [e, t]), { collapsed: t, toggle: r };
}
function vi() {
  const e = dt("(max-width: 767.98px)"), t = dt("(max-width: 1023.98px)");
  return e ? "phone" : t ? "medium" : "wide";
}
function bi(e) {
  const t = e === "phone", a = k(), r = _(null), [o, i] = p(!1);
  return o && !t && i(!1), { narrow: t, open: o, drawerId: a, slotRef: r, toggle: () => i(!o), close: () => i(!1) };
}
function pi({ header: e, action: t, label: a, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ l("div", { className: C.headerRow, children: [
    /* @__PURE__ */ n("span", { ref: r.slotRef, className: C.sidebarToggle, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: a }) }),
    /* @__PURE__ */ n("div", { className: C.headerSlot, children: e }),
    $a(t) && /* @__PURE__ */ n("span", { className: C.headerAction, children: t })
  ] }) : e;
}
function gi(e, t) {
  S(() => {
    if (e)
      return window.addEventListener("hashchange", t), window.addEventListener("popstate", t), () => {
        window.removeEventListener("hashchange", t), window.removeEventListener("popstate", t);
      };
  }, [e, t]);
}
function yi({ sidebar: e, label: t, drawer: a }) {
  var o;
  if (gi(a.open, a.close), !a.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && a.close();
  };
  return /* @__PURE__ */ n(rt, { kind: "start", id: a.drawerId, title: t, flush: !0, onClose: a.close, returnFocusTo: (o = a.slotRef.current) == null ? void 0 : o.querySelector("button"), children: /* @__PURE__ */ n("div", { className: C.drawerSide, onClick: r, children: ya(e, !1) }) });
}
function Ni(e) {
  const [t, a] = p(!1);
  return t && e !== "medium" && a(!1), { open: t, toggle: () => a(!t) };
}
function ki(e, t) {
  const a = _i(e === "wide" && !t), r = Ni(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && a.collapsed, toggle: a.toggle };
}
function $i(e, t) {
  const a = ki(t, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return Si(e.collapsed, t);
  const r = a.collapsed, o = r && e.iconRail !== void 0;
  return { enabled: t !== "phone", collapsed: r, rail: o, drawsStrip: !o && typeof e.sidebar == "function", toggle: a.toggle };
}
const Ci = (e) => e.collapsed && e.drawsStrip;
function Si(e, t) {
  return { enabled: !1, collapsed: t === "medium" || e && t === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const Mn = (e) => e ? "" : void 0;
function ya(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Na({ fold: e }) {
  return /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ n(ci, {}),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function Ri({ fold: e, inSidebar: t }) {
  return !e.enabled || t ? null : /* @__PURE__ */ n("div", { className: C.sideTop, children: /* @__PURE__ */ n(Na, { fold: e }) });
}
const ka = Ne(null);
function dT() {
  const e = ye(ka);
  return e === null || !e.enabled ? null : /* @__PURE__ */ n(Na, { fold: e });
}
function Ti({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ n("span", { className: C.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ n("span", { className: C.railDot, "aria-hidden": "true", style: { "--dot": dn(e.streamStep).id } }) : /* @__PURE__ */ n("span", { className: C.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function xi({ items: e, label: t }) {
  return /* @__PURE__ */ n("nav", { className: C.iconRail, "aria-label": t, children: e.map((a) => /* @__PURE__ */ l("a", { className: C.railItem, href: q(a.href), title: a.label, "aria-current": a.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ n(Ti, { item: a }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a.label })
  ] }, a.id)) });
}
function Li({ sidebar: e, label: t, iconRail: a, fold: r, inSidebar: o }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ l("div", { className: C.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ n(Ri, { fold: r, inSidebar: o && !i }),
    /* @__PURE__ */ n("div", { className: C.sideBody, hidden: i, children: ya(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ n(xi, { items: a ?? [], label: t })
  ] });
}
const $a = (e) => e != null;
function Ai(e) {
  const { sidebar: t, header: a, action: r, children: o, rail: i, iconRail: s, pageFill: c } = e, d = $a(i), u = vi(), h = bi(u), w = $i(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ l("div", { className: C.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": Mn(Ci(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ n(ka.Provider, { value: w, children: /* @__PURE__ */ n(Li, { sidebar: t, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ l("main", { className: C.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ n(pi, { header: a, action: r, label: f, drawer: h }),
      /* @__PURE__ */ n("div", { className: C.page, "data-fill": Mn(c === !0), children: o })
    ] }),
    d && /* @__PURE__ */ n("div", { className: C.rail, children: i }),
    /* @__PURE__ */ n(yi, { sidebar: t, label: f, drawer: h })
  ] });
}
function Ei({ destinations: e, active: t }) {
  const a = _(null);
  return ai(a, e.findIndex((r) => r.id === t), "a"), /* @__PURE__ */ n(mn, { as: "nav", rowRef: a, className: C.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ n("a", { href: q(r.href), "aria-current": r.id === t ? "page" : void 0, children: r.label }, r.id)) });
}
function tn({ value: e, className: t }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: t, children: e });
}
function Ii({ actor: e, metadata: t }) {
  return e === void 0 && t === void 0 ? null : /* @__PURE__ */ l("span", { className: C.metadata, children: [
    /* @__PURE__ */ n(tn, { value: e, className: C.actor }),
    e !== void 0 && t !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(tn, { value: t, className: C.detail })
  ] });
}
function Mi() {
  const e = dt("(max-width: 767.98px)"), t = k(), a = _(null), [r, o] = p(!1);
  return { narrow: e, open: r, panelId: t, slotRef: a, toggle: () => o(!r), close: () => {
    var s, c;
    o(!1), (c = (s = a.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Bi({ tools: e, toolsLabel: t, menu: a }) {
  return e === void 0 ? null : a.narrow ? /* @__PURE__ */ n("span", { ref: a.slotRef, className: C.tools, children: /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a.toggle, expanded: a.open, controls: a.panelId, children: t ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: C.tools, children: e });
}
function Pi({ tools: e, menu: t }) {
  if (e === void 0 || !t.narrow) return null;
  const a = (r) => {
    r.key === "Escape" && t.close();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: C.toolsPanel, hidden: !t.open, onKeyDown: a, children: e });
}
function ji(e) {
  return /* @__PURE__ */ l("header", { className: C.topbar, children: [
    /* @__PURE__ */ n("span", { className: C.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: C.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(tn, { value: e.tagline, className: C.tagline }),
    /* @__PURE__ */ n(Ei, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: C.identity, children: /* @__PURE__ */ n(Ii, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Bi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function qi(e) {
  const t = k(), a = Mi();
  return /* @__PURE__ */ l("div", { className: `${C.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: C.skip, href: `#${t}`, children: "Skip to content" }),
    /* @__PURE__ */ n(ji, { ...e, menu: a }),
    /* @__PURE__ */ n(Pi, { tools: e.tools, menu: a }),
    /* @__PURE__ */ n("div", { id: t, className: C.content, children: e.children })
  ] });
}
function Oi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function uT(e) {
  return Oi(e) ? /* @__PURE__ */ n(Ai, { ...e }) : /* @__PURE__ */ n(qi, { ...e });
}
const Hi = "_root_itg9o_2", Di = "_row_itg9o_8", Fi = "_box_itg9o_14", zi = "_label_itg9o_21", Wi = "_labelHidden_itg9o_26", Ki = "_lockedNote_itg9o_36", Gi = "_consequence_itg9o_44", Ui = "_sample_itg9o_79", Be = {
  root: Hi,
  row: Di,
  box: Fi,
  label: zi,
  labelHidden: Wi,
  lockedNote: Ki,
  consequence: Gi,
  sample: Ui
};
function Vi(e, t) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || t) };
}
function Yi({ id: e, text: t }) {
  return t ? /* @__PURE__ */ n("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: t }) : null;
}
function Ji({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Qi(e, t, a) {
  return t && !a && e.disabledReason ? e.disabledReason : void 0;
}
function Xi(e, t, a, r) {
  const o = e.consequence ? `${t}-note` : void 0, i = Qi(e, a, r), s = i ? `${t}-reason` : void 0, c = qt(at(o, e.describedBy, s), r);
  return { noteId: o, reason: i, reasonId: `${t}-reason`, input: { "aria-describedby": c, title: (r == null ? void 0 : r.reason) ?? i } };
}
function Zi({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function es({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function Ca(e) {
  const t = k(), a = Ae(), r = Vi(e, a), o = Xi(e, t, r.disabled, a);
  return /* @__PURE__ */ l("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Be.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: t,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (i) => {
            var s;
            return !r.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          ...o.input
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: t, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ n(Ji, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(es, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(Zi, { id: o.reasonId, reason: o.reason }),
    /* @__PURE__ */ n(Yi, { id: o.noteId, text: e.consequence })
  ] });
}
const ts = "_chip_pq6tb_2", ns = {
  chip: ts
}, as = {
  gate: B.chip.gate,
  system: B.chip.system,
  write: B.chip.write,
  drift: B.chip.drift,
  done: B.chip.done,
  attention: B.chip.attention,
  failed: B.chip.failed,
  pending: B.chip.pending,
  running: B.chip.running,
  warn: B.chip.warn,
  meta: B.chip.meta,
  soft: B.chip.soft,
  quiet: B.chip.quiet,
  owed: B.chip.owed,
  neutral: B.chip.quiet,
  info: B.chip.running,
  success: B.chip.done,
  warning: B.chip.attention,
  danger: B.chip.failed
};
function rs(e, t) {
  if (e === "stream") return os(t);
  if (t) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const a = as[e];
  return { "--ward-chip-bg": a.bg, "--ward-chip-fg": a.fg, "--ward-chip-line": a.line };
}
function os(e) {
  if (!e || !ht(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const t = dn(e);
  return { "--ward-chip-bg": t.chip, "--ward-chip-fg": t.chipText, "--ward-chip-line": t.chip };
}
function m({ role: e, label: t, streamStep: a, size: r }) {
  if (!t) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ns.chip} ward-chip ward-chip--${e}`, style: rs(e, a), "data-ward-chip": e, "data-size": r, children: t });
}
const ls = "_clamp_zn74g_3", Bn = {
  clamp: ls
};
function nt({ text: e, as: t = "span", className: a }) {
  return /* @__PURE__ */ n(t, { className: a === void 0 ? Bn.clamp : `${Bn.clamp} ${a}`, "data-ward-clamp": "", title: e, children: e });
}
const is = "_root_1btz3_2", ss = "_body_1btz3_10", cs = "_toggle_1btz3_24", Kt = {
  root: is,
  body: ss,
  toggle: cs
};
function hT({ children: e, lines: t = 3, label: a }) {
  const [r, o] = p(!1), i = k();
  return /* @__PURE__ */ l("div", { className: Kt.root, children: [
    /* @__PURE__ */ n("div", { id: i, className: Kt.body, "data-lines": t, "data-open": r || void 0, "aria-label": a, children: e }),
    /* @__PURE__ */ n("button", { type: "button", className: Kt.toggle, "aria-expanded": r, "aria-controls": i, onClick: () => o(!r), children: r ? "Show less" : "Show more" })
  ] });
}
const ds = "_root_1a4s8_2", us = "_words_1a4s8_16", hs = "_title_1a4s8_23", ms = "_actions_1a4s8_27", ft = {
  root: ds,
  words: us,
  title: hs,
  actions: ms
};
function mT({ title: e, sentence: t, actions: a, label: r = "Needs you" }) {
  return /* @__PURE__ */ l("section", { className: ft.root, "aria-label": r, "data-ward-owed": "", children: [
    /* @__PURE__ */ l("div", { className: ft.words, children: [
      /* @__PURE__ */ n("strong", { className: ft.title, children: e }),
      /* @__PURE__ */ n("span", { children: t })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: ft.actions, children: a })
  ] });
}
const ws = "_root_8zmpu_2", fs = "_step_8zmpu_12", _s = "_dot_8zmpu_38", vs = "_label_8zmpu_51", lt = {
  root: ws,
  step: fs,
  dot: _s,
  label: vs
}, bs = { done: ", done", now: ", current", next: "" };
function ps({ step: e, running: t }) {
  const a = e.state === "now" && t;
  return /* @__PURE__ */ l("li", { className: lt.step, "data-state": e.state, "aria-current": e.state === "now" ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: a ? `${lt.dot} ward-running` : lt.dot, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: lt.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: bs[e.state] })
  ] });
}
function wT({ steps: e, running: t = !1, label: a = "Progress" }) {
  return /* @__PURE__ */ n("ol", { className: lt.root, "aria-label": a, "data-ward-steps": "", children: e.map((r) => /* @__PURE__ */ n(ps, { step: r, running: t }, r.label)) });
}
function wt(e) {
  return typeof e == "number" && ht(e) ? e : null;
}
function ge(e, t) {
  const a = wt(e);
  return a === null ? "var(--ward-color-line2)" : `var(--ward-stream-${a}-${t})`;
}
function Ot(e, t) {
  const a = wt(t);
  return a === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: a };
}
const gs = "_root_13eei_3", ys = "_nav_13eei_8", Ns = "_list_13eei_16", ks = "_item_13eei_24", $s = "_link_13eei_44", Cs = "_sep_13eei_54", Ss = "_current_13eei_58", Rs = "_chips_13eei_62", Me = {
  root: gs,
  nav: ys,
  list: Ns,
  item: ks,
  link: $s,
  sep: Cs,
  current: Ss,
  chips: Rs
};
function Ts({ step: e, isCurrent: t }) {
  return t ? /* @__PURE__ */ n("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ n("a", { className: `${Me.link} ward-target`, href: q(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ n("span", { title: e.label, children: e.label });
}
function xs({ path: e, chips: t, current: a = !0 }) {
  return /* @__PURE__ */ n("div", { className: Me.root, children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ n("ol", { className: Me.list, children: e.map((r, o) => /* @__PURE__ */ l("li", { className: Me.item, children: [
      o > 0 ? /* @__PURE__ */ n("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ n(Ts, { step: r, isCurrent: a && o === e.length - 1 })
    ] }, r.label)) }),
    t != null && t.length ? /* @__PURE__ */ n("span", { className: `${Me.chips} ward-chiprow`, children: t.map((r) => /* @__PURE__ */ n(m, { ...r }, r.label)) }) : null
  ] }) });
}
function Sa(e, t, a) {
  const r = _(a);
  r.current = a, S(() => {
    if (!e) return;
    const o = (i) => {
      var s;
      (s = t.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", o), () => document.removeEventListener("mousedown", o);
  }, [e, t]);
}
const Ls = 500;
function Ra(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function Ta() {
  const e = _(""), t = _(void 0);
  return S(() => () => clearTimeout(t.current), []), (a) => (clearTimeout(t.current), e.current += a.toLowerCase(), t.current = setTimeout(() => {
    e.current = "";
  }, Ls), e.current);
}
const _t = 4;
function As(e, t, a) {
  const r = Math.max(0, a - e.bottom - _t * 2), o = Math.max(0, e.top - _t * 2);
  return t <= r || r >= o ? { top: e.bottom + _t, maxHeight: r } : { top: e.top - _t - Math.min(t, o), maxHeight: o };
}
function Es(e, t, a, r) {
  const o = { start: e.left, end: e.right - t }, i = { start: o.start + t <= a, end: o.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(o[c], 0), Math.max(0, a - t));
}
function Is(e, t, a, r) {
  return { ...As(e, t.height, a.height), left: Es(e, t.width, a.width, r) };
}
function kt(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ms(e, t) {
  const a = e.getBoundingClientRect(), r = t ? t.getBoundingClientRect() : a;
  return { top: a.top, bottom: a.bottom, left: r.left, right: r.right, width: r.width, height: a.height };
}
function Bs(e, t, a) {
  const r = Ms(t, a);
  e.style.setProperty("--ward-anchor-width", kt(r.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const o = e.getBoundingClientRect(), i = document.documentElement;
  return { edges: r, box: o, view: { width: i.clientWidth, height: i.clientHeight } };
}
function Ps(e) {
  const t = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), a = t.map((r) => r.scrollTop);
  return () => t.forEach((r, o) => r.scrollTop = a[o]);
}
function Pn(e, t, a, r) {
  const o = Ps(e), i = Bs(e, t, r), s = Is(i.edges, i.box, i.view, a);
  Object.assign(e.style, { left: kt(s.left - i.box.left), top: kt(s.top - i.box.top), maxHeight: kt(s.maxHeight) }), o();
}
function js(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function xa(e, t, a = "start", r) {
  tt(() => {
    const o = t.current, i = e.current;
    if (!o || !i) return;
    const s = js(o), c = () => Pn(o, i, a, r == null ? void 0 : r.current), d = (u) => {
      o.contains(u.target) || c();
    };
    return window.addEventListener("scroll", d, !0), window.addEventListener("resize", c), () => {
      window.removeEventListener("scroll", d, !0), window.removeEventListener("resize", c), s();
    };
  }, [e, t, a, r]), tt(() => {
    t.current && e.current && Pn(t.current, e.current, a, r == null ? void 0 : r.current);
  });
}
const qs = "_root_1lgbn_2", Os = "_trigger_1lgbn_7", Hs = "_value_1lgbn_47", Ds = "_menu_1lgbn_65", Fs = "_find_1lgbn_87", zs = "_list_1lgbn_103", Ws = "_option_1lgbn_114", Ks = "_check_1lgbn_133", Gs = "_empty_1lgbn_144", pe = {
  root: qs,
  trigger: Os,
  value: Hs,
  menu: Ds,
  find: Fs,
  list: zs,
  option: Ws,
  check: Ks,
  empty: Gs
}, Us = 7;
function Vs(e, t) {
  const a = t.trim().toLowerCase();
  return e.map((r, o) => ({ option: r, index: o })).filter(({ option: r }) => r.label.toLowerCase().includes(a));
}
function jn(e, t) {
  return Math.max(0, e.findIndex((a) => a.value === t));
}
function Ys(e, t) {
  const [a, r] = p(e.defaultOpen === !0), [o, i] = p(""), [s, c] = p(() => jn(e.options, e.value)), d = (u) => {
    var h;
    ma(() => r(!1)), u && ((h = t.current) == null || h.focus());
  };
  return {
    open: a,
    query: o,
    active: s,
    entries: Vs(e.options, o),
    findable: e.options.length > Us,
    show: () => {
      e.disabled || (i(""), c(jn(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var h;
      u && u.option.value !== e.value && ((h = e.onChange) == null || h.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      i(u), c(0);
    }
  };
}
function Js(e, t) {
  const a = _(!1);
  return S(() => {
    var r;
    e && a.current && ((r = t.current) == null || r.focus()), a.current = !1;
  }), () => {
    a.current = !0;
  };
}
function Qs(e) {
  const t = Ta();
  return (a) => {
    const r = t(a), o = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    o >= 0 && e.to(o);
  };
}
function La(e) {
  const t = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, t)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Xs(e) {
  return { ...La(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function Aa(e, t, a) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const o = t[r.key];
    if (!o) return a(r);
    r.preventDefault(), r.stopPropagation(), o();
  };
}
const Zs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ec(e, t) {
  const a = () => {
    t(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : a(),
    onKeyDown: (r) => {
      Zs.has(r.key) && (r.preventDefault(), a());
    }
  };
}
function tc({ entry: e, at: t, menu: a, ids: r, value: o }) {
  return /* @__PURE__ */ l(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === o,
      "data-active": t === a.active || void 0,
      className: pe.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => a.to(t),
      onClick: () => a.pick(e),
      children: [
        /* @__PURE__ */ n("span", { className: pe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ n("span", { className: pe.label, children: e.option.label })
      ]
    }
  );
}
function wn(e, t) {
  const a = e.entries[e.active];
  return a ? t.option(a.index) : void 0;
}
function nc({ menu: e, ids: t, focusRef: a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      ref: a,
      className: pe.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": t.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": wn(e, t),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: Aa(e, La(e), () => {
      })
    }
  );
}
function ac({ props: e, menu: t, ids: a, focusRef: r, trigger: o }) {
  const i = Qs(t), s = _(null);
  xa(o, s);
  const c = (d) => {
    Ra(d) && i(d.key);
  };
  return /* @__PURE__ */ l("div", { ref: s, className: pe.menu, children: [
    t.findable && /* @__PURE__ */ n(nc, { menu: t, ids: a, focusRef: r }),
    /* @__PURE__ */ n(
      "ul",
      {
        ref: t.findable ? void 0 : r,
        id: a.list,
        role: "listbox",
        tabIndex: -1,
        className: pe.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": t.findable ? void 0 : wn(t, a),
        onKeyDown: Aa(t, Xs(t), c),
        children: t.entries.map((d, u) => /* @__PURE__ */ n(tc, { entry: d, at: u, menu: t, ids: a, value: e.value }, d.index))
      }
    ),
    t.entries.length === 0 && /* @__PURE__ */ n("p", { className: pe.empty, children: "No match" })
  ] });
}
function rc(e, t) {
  const a = e.open ? wn(e, t) : void 0;
  S(() => {
    var r, o;
    a && ((o = (r = document.getElementById(a)) == null ? void 0 : r.scrollIntoView) == null || o.call(r, { block: "nearest" }));
  }, [a]);
}
function Ea(...e) {
  return e.filter(Boolean).join(" ");
}
function oc(e) {
  var t;
  return ((t = e.options.find((a) => a.value === e.value)) == null ? void 0 : t.label) ?? e.placeholder;
}
function lc({ props: e, menu: t, ids: a, trigger: r, wantFocus: o }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ n(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: Ea(pe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": t.open,
      "aria-controls": t.open ? a.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": at(e["aria-describedby"], a.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...ec(t, o),
      children: /* @__PURE__ */ n("span", { id: a.value, className: pe.value, "data-placeholder": i || void 0, children: oc(e) })
    }
  );
}
function Ia(e) {
  const t = Ae(), a = t ? { ...e, disabled: !0, "aria-describedby": qt(e["aria-describedby"], t) } : e, r = k(), o = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = Ys(a, s), u = Js(d.open, c);
  return Sa(d.open, i, () => d.close(!1)), rc(d, o), /* @__PURE__ */ l("div", { ref: i, className: Ea(pe.root, a.className), "data-ward-select": "", children: [
    /* @__PURE__ */ n(lc, { props: a, menu: d, ids: o, trigger: s, wantFocus: u }),
    a.name && /* @__PURE__ */ n("input", { type: "hidden", name: a.name, value: a.value }),
    d.open && /* @__PURE__ */ n(ac, { props: a, menu: d, ids: o, focusRef: c, trigger: s })
  ] });
}
const ic = "_field_1ensj_2", sc = "_label_1ensj_8", cc = "_labelHidden_1ensj_15", dc = "_control_1ensj_25", uc = "_mono_1ensj_45", hc = "_area_1ensj_50", mc = "_invalid_1ensj_57", He = {
  field: ic,
  label: sc,
  labelHidden: cc,
  control: dc,
  mono: uc,
  area: hc,
  invalid: mc
}, wc = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Ma = (e) => `${e}-label`;
function fc({ props: e, controlProps: t, cls: a }) {
  const r = e.secret ? wc : {};
  return /* @__PURE__ */ n("input", { className: a, ...r, ...t });
}
function _c({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n(
    Ia,
    {
      id: t.id,
      triggerClassName: a,
      "aria-labelledby": Ma(t.id),
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
function vc({ props: e, controlProps: t, cls: a }) {
  return /* @__PURE__ */ n("textarea", { className: a, rows: e.rows ?? 3, ...t });
}
const bc = { input: fc, select: _c, textarea: vc };
function pc(e, t, a) {
  const r = bc[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: t, cls: a });
}
function gc(e, t, a, r) {
  const o = e.invalid ? "true" : void 0;
  return {
    id: t,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": o,
    "aria-describedby": qt(at(o ? a : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function yc(e) {
  const t = e.mono ? [He.mono, "ward-field-input--mono"] : [], a = e.kind === "textarea" ? [He.area] : [];
  return [He.control, "ward-field-input", ...t, ...a].filter(Boolean).join(" ");
}
function Nc(e) {
  return e ? `${He.label} ${He.labelHidden} ward-field-label` : `${He.label} ward-field-label`;
}
function j(e) {
  const t = k(), a = `${t}-msg`, r = gc(e, t, a, Ae()), o = yc(e);
  return /* @__PURE__ */ l("div", { className: `${He.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { id: Ma(t), className: Nc(e.labelHidden), htmlFor: t, children: e.label }),
    pc(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: a, className: `${He.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const kc = "_root_sjvm0_2", $c = "_trigger_sjvm0_9", Cc = "_ghost_sjvm0_27", Sc = "_panel_sjvm0_46", Rc = "_edged_sjvm0_67", Tc = "_menu_sjvm0_73", xc = "_group_sjvm0_78", Lc = "_heading_sjvm0_83", Ac = "_item_sjvm0_89", Ec = "_description_sjvm0_105", Ic = "_large_sjvm0_109", Mc = "_touch_sjvm0_113", Bc = "_icon_sjvm0_117", Pc = "_label_sjvm0_125", jc = "_text_sjvm0_130", qc = "_trailing_sjvm0_138", Oc = "_check_sjvm0_144", Hc = "_separator_sjvm0_183", Dc = "_footer_sjvm0_189", Fc = "_find_sjvm0_196", zc = "_findGlyph_sjvm0_208", Wc = "_findInput_sjvm0_214", Kc = "_empty_sjvm0_230", L = {
  root: kc,
  trigger: $c,
  ghost: Cc,
  panel: Sc,
  edged: Rc,
  menu: Tc,
  group: xc,
  heading: Lc,
  item: Ac,
  description: Ec,
  large: Ic,
  touch: Mc,
  icon: Bc,
  label: Pc,
  text: jc,
  trailing: qc,
  check: Oc,
  separator: Hc,
  footer: Dc,
  find: Fc,
  findGlyph: zc,
  findInput: Wc,
  empty: Kc
}, Ba = Ne(null);
function Gc(e, t) {
  const [a, r] = p({ open: e, start: null, request: 0 });
  return {
    ...a,
    show: (o) => r((i) => ({ open: !0, start: o, request: i.request + 1 })),
    close: (o) => {
      var i;
      ma(() => r((s) => ({ ...s, open: !1 }))), o && ((i = t.current) == null || i.focus());
    }
  };
}
const Uc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Vc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (t) => {
      const a = Uc.get(t.key);
      a && (t.preventDefault(), e.show(a));
    },
    onKeyUp: (t) => {
      t.key === " " && t.preventDefault();
    }
  };
}
function fn(...e) {
  return e.filter(Boolean).join(" ");
}
function Yc(e, t = {}, a = "field") {
  const { ref: r, className: o, ...i } = t;
  return { ...i, ref: (c) => {
    e.current = c, r == null || r(c);
  }, className: fn(L.trigger, a === "ghost" ? L.ghost : void 0, o) };
}
function Pa(e) {
  const t = k(), a = { menuId: `${t}-menu`, buttonId: `${t}-button` }, r = _(null), o = _(null), i = Gc(e.defaultOpen === !0, o);
  return Sa(i.open, r, () => i.close(!1)), /* @__PURE__ */ l("div", { ref: r, className: fn(L.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ n(
      "button",
      {
        ...Yc(o, e.trigger, e.variant),
        id: a.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? a.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Vc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ n(Ba.Provider, { value: { ...a, popup: i, button: o }, children: e.children })
  ] });
}
function Jc(e) {
  let t = 0;
  const a = (r) => ({ item: r, at: t++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(a) } : { kind: "item", row: a(r) });
}
function Qc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Xc = (e) => e.flatMap((t) => t === "separator" ? [] : "items" in t ? t.items : [t]).length;
function Zc(e, t) {
  const a = e.whileFinding ?? "filter";
  if (a === "keep") return e;
  const r = a === "hide" ? [] : e.items.filter(t);
  return r.length ? { ...e, items: r } : null;
}
function ed(e, t) {
  return e === "separator" ? e : "items" in e ? Zc(e, t) : t(e) ? e : null;
}
function td(e) {
  const t = e.filter((a, r) => a !== "separator" || e[r - 1] !== "separator");
  for (; t[0] === "separator"; ) t.shift();
  for (; t[t.length - 1] === "separator"; ) t.pop();
  return t;
}
function nd(e, t) {
  const a = t.trim().toLowerCase();
  if (!a) return e;
  const r = (o) => o.label.toLowerCase().includes(a);
  return td(e.map((o) => ed(o, r)).filter((o) => o !== null));
}
const ja = (e, t) => (e % t + t) % t;
function je(e, t, a) {
  for (let r = 1; r <= e.length; r++) {
    const o = ja(t + a * r, e.length);
    if (!e[o].disabled) return o;
  }
  return -1;
}
const ad = (e) => e.split("").every((t) => t === e[0]);
function rd(e, t, a) {
  const r = ad(a), o = r ? a[0] : a, i = r ? t : t - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(o);
  for (let c = 1; c <= e.length; c++) {
    const d = ja(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function od(e) {
  const t = _([]);
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
function ld(e, t) {
  const { items: a } = e, r = () => {
    var o;
    return (o = e.refs.current[e.current()]) == null ? void 0 : o.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(je(a, e.current(), 1))],
    ["ArrowUp", () => e.focus(je(a, e.current(), -1))],
    ["Home", () => e.focus(je(a, -1, 1))],
    ["End", () => e.focus(je(a, a.length, -1))],
    ["Escape", () => t.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function id(e, t, a) {
  const r = Ta(), o = ld(e, t), i = (s) => {
    if (Ra(s)) {
      if (!a) return e.focus(rd(e.items, e.current(), r(s.key)));
      s.preventDefault(), a(s.key);
    }
  };
  return {
    onKeyDown: (s) => {
      const c = o.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    }
  };
}
function sd(e) {
  const t = _(!1);
  return {
    onKeyDown: (a) => {
      a.key === "Tab" && (t.current = !0);
    },
    onBlur: () => {
      t.current && e.close(!1);
    }
  };
}
function cd(e) {
  const t = e.findIndex((a) => a.current && !a.disabled);
  return t === -1 ? je(e, -1, 1) : t;
}
function dd(e, t) {
  const { start: a, request: r } = t, o = _(e);
  o.current = e, S(() => {
    const { items: i, focus: s } = o.current;
    a && s(a === "first" ? cd(i) : je(i, i.length, -1));
  }, [a, r]);
}
function ud({ row: e, nav: t, popup: a }) {
  const { item: r, at: o } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && t.current() !== o && t.focus(o);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), a.close(!0);
    }
  };
}
const hd = (e) => [e.description, e.icon, e.trailing].some(Boolean);
function md(e, t) {
  return hd(e) ? { "aria-labelledby": t + "-label", "aria-describedby": e.description ? t + "-description" : void 0 } : {};
}
function wd(e, t) {
  const a = /* @__PURE__ */ n("span", { id: t + "-label", className: L.label, children: e.label });
  return e.description ? /* @__PURE__ */ l("span", { className: L.text, children: [
    a,
    /* @__PURE__ */ n("span", { id: t + "-description", className: L.description, children: e.description })
  ] }) : a;
}
function fd() {
  return /* @__PURE__ */ n("svg", { className: L.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function qn(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.icon ? /* @__PURE__ */ n("span", { className: L.icon, "aria-hidden": "true", children: e.icon }) : null,
    wd(e, t),
    e.trailing ? /* @__PURE__ */ n("span", { className: L.trailing, children: e.trailing }) : null,
    e.current ? /* @__PURE__ */ n(fd, {}) : null
  ] });
}
function qa(e) {
  const { item: t, at: a } = e.row, r = k(), o = {
    ref: (i) => {
      e.nav.refs.current[a] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: L.item,
    "aria-current": t.current ? "true" : void 0,
    "aria-disabled": t.disabled ? "true" : void 0,
    ...md(t, r),
    ...ud(e)
  };
  return t.href && !t.disabled ? /* @__PURE__ */ n("a", { href: q(t.href), ...o, children: qn(t, r) }) : /* @__PURE__ */ n("button", { type: "button", ...o, children: qn(t, r) });
}
function _d({ heading: e, rows: t, nav: a, popup: r }) {
  const o = k();
  return /* @__PURE__ */ l("div", { role: "group", "aria-labelledby": o, className: L.group, children: [
    /* @__PURE__ */ n("div", { id: o, className: L.heading, children: e }),
    t.map((i) => /* @__PURE__ */ n(qa, { row: i, nav: a, popup: r }, i.at))
  ] });
}
function vd({ block: e, nav: t, popup: a }) {
  return e.kind === "separator" ? /* @__PURE__ */ n("div", { role: "separator", className: L.separator }) : e.kind === "group" ? /* @__PURE__ */ n(_d, { heading: e.heading, rows: e.rows, nav: t, popup: a }) : /* @__PURE__ */ n(qa, { row: e.row, nav: t, popup: a });
}
function bd() {
  const e = ye(Ba);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function pd() {
  return /* @__PURE__ */ l("svg", { className: L.findGlyph, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ n("circle", { cx: "7", cy: "7", r: "4.5", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
    /* @__PURE__ */ n("path", { d: "M10.5 10.5l3 3", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
  ] });
}
function gd(e, t) {
  const a = () => je(e.items, -1, 1);
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(a())],
    ["ArrowUp", () => e.focus(je(e.items, e.items.length, -1))],
    ["Enter", () => {
      var r;
      return (r = e.refs.current[a()]) == null ? void 0 : r.click();
    }],
    ["Escape", () => t.close(!0)]
  ]);
}
function yd({ find: e, query: t, setQuery: a, input: r, nav: o, popup: i, menuId: s }) {
  const c = gd(o, i), d = (u) => {
    const h = c.get(u.key);
    h && (u.preventDefault(), u.stopPropagation(), h());
  };
  return /* @__PURE__ */ l("div", { className: L.find, children: [
    /* @__PURE__ */ n(pd, {}),
    /* @__PURE__ */ n("input", { ref: r, type: "search", className: L.findInput, placeholder: e.placeholder, "aria-label": e.placeholder, "aria-controls": s, autoComplete: "off", value: t, onChange: (u) => a(u.target.value), onKeyDown: d })
  ] });
}
function Nd(e, t) {
  const [a, r] = p(""), o = _(null), i = t !== void 0 && Xc(e) >= (t.from ?? 8), s = (c) => {
    var d;
    r((u) => u + c), (d = o.current) == null || d.focus();
  };
  return i ? { find: t, query: a, setQuery: r, input: o, toFind: s, entries: nd(e, a) } : { query: a, setQuery: r, input: o, entries: e };
}
const kd = { regular: void 0, large: L.large, touch: L.touch }, $d = (e, t) => fn(L.panel, e ? L.edged : void 0, kd[t]);
function Cd({ find: e, count: t }) {
  return !e || t > 0 ? null : /* @__PURE__ */ n("p", { className: L.empty, children: e.empty ?? "No matches" });
}
function Oa({ entries: e, footer: t, align: a = "start", find: r, edges: o, size: i = "regular" }) {
  const { popup: s, menuId: c, buttonId: d, button: u } = bd(), h = _(null);
  xa(u, h, a, o);
  const w = Nd(e, r), f = Jc(w.entries), y = od(f.flatMap(Qc).map((O) => O.item)), N = id(y, s, w.toFind), A = sd(s);
  return dd(y, s), /* @__PURE__ */ l("div", { ref: h, className: $d(o, i), ...A, children: [
    w.find && /* @__PURE__ */ n(yd, { find: w.find, query: w.query, setQuery: w.setQuery, input: w.input, nav: y, popup: s, menuId: c }),
    /* @__PURE__ */ n("div", { role: "menu", id: c, "aria-labelledby": d, className: L.menu, ...N, children: f.map((O, me) => /* @__PURE__ */ n(vd, { block: O, nav: y, popup: s }, me)) }),
    /* @__PURE__ */ n(Cd, { find: w.find, count: y.items.length }),
    t && /* @__PURE__ */ n("p", { className: L.footer, children: t })
  ] });
}
function Sd(e) {
  var a;
  return (((a = e.parentElement) == null ? void 0 : a.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Ha(e, t) {
  S(() => {
    const a = e.current;
    t === "page" && a && !Sd(a) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, t]);
}
const Rd = (e, t) => e.reduce((a, r) => a + r + t, -t);
function Td({ room: e, widths: t, more: a, gap: r }, o) {
  const i = t.map((d, u) => u);
  if (Rd(t, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([o]);
  let c = t[o] + r + a;
  for (const d of i)
    if (d !== o) {
      if (c += t[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Gt = (e) => Number.parseFloat(e) || 0, On = (e) => e.getBoundingClientRect().width;
function xd(e, t) {
  const a = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Gt(a.paddingInlineStart) - Gt(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(t), On),
    more: r ? On(r) : 0,
    gap: Gt(a.columnGap)
  };
}
function Ld(e, t) {
  if (typeof ResizeObserver > "u") return;
  const a = new ResizeObserver(t);
  return [e, ...e.children].forEach((r) => a.observe(r)), () => a.disconnect();
}
const Ad = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Da(e, t, a, r = ':scope > [role="tab"]') {
  const [o, i] = p(null);
  return tt(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = xd(s, r);
      i((u) => Ad(u, d) ? u : d);
    };
    return c(), Ld(s, c);
  }, [e, a, r]), o && Td(o, t);
}
const Ed = "_strip_1zvzj_2", Id = "_fits_1zvzj_19", Md = "_probe_1zvzj_27", Bd = "_moreRoot_1zvzj_36", Pd = "_more_1zvzj_36", jd = "_tab_1zvzj_55", qd = "_count_1zvzj_91", Od = "_badge_1zvzj_97", Y = {
  strip: Ed,
  fits: Id,
  probe: Md,
  moreRoot: Bd,
  more: Pd,
  tab: jd,
  count: qd,
  badge: Od
}, Fa = "More";
function Hd(e, t) {
  const a = e.findIndex((r) => r.id === t);
  return a < 0 ? 0 : a;
}
const Hn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, _n = (e) => e.badge === void 0 ? Hn(e) : `${Hn(e)}, ${e.badge}`;
function za(e) {
  return `${Y.strip} ward-tabs ward-tabs--${e}`;
}
const Dd = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Fd({ tab: e, active: t, place: a, onChange: r }) {
  return /* @__PURE__ */ l(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Y.tab} ward-tab`,
      "aria-selected": e.id === t,
      "aria-controls": `panel-${e.id}`,
      "aria-label": e.badge === void 0 ? void 0 : _n(e),
      onClick: () => r(e.id),
      ...a,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
          " ",
          /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
        ] }),
        e.badge === void 0 ? null : /* @__PURE__ */ n("span", { className: Y.badge, children: e.badge })
      ]
    }
  );
}
function zd(e, t) {
  return (a) => {
    t(a), requestAnimationFrame(() => {
      var o;
      const r = Array.from(((o = e.current) == null ? void 0 : o.children) ?? []).find((i) => i.id === `tab-${a}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Wd({ tabs: e, trigger: t, onPick: a }) {
  return /* @__PURE__ */ n(Pa, { label: Fa, className: Y.moreRoot, trigger: { ...t, role: "tab", "aria-selected": !1, className: Y.more }, children: /* @__PURE__ */ n(Oa, { align: "end", entries: e.map((r) => ({ label: _n(r), onSelect: () => a(r.id) })) }) });
}
function Kd(e, t, a) {
  return !t || t.includes(a) ? e.itemProps(a) : Dd;
}
function fT({ tabs: e, active: t, onChange: a, label: r = "Tabs", level: o }) {
  const i = Pt({ orientation: "horizontal" }), s = Hd(e, t);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Ha(c, o);
  const d = Da(c, s, e.map(_n).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ l("div", { ref: c, className: `${za(o)} ${Y.fits}`, role: "tablist", "aria-label": r, "data-level": o, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ n(Fd, { tab: h, active: t, place: Kd(i, d, w), onChange: a }, h.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Fa }),
    u.length > 0 && /* @__PURE__ */ n(Wd, { tabs: u, trigger: i.itemProps(e.length), onPick: zd(c, a) })
  ] });
}
const Dn = 7, Wa = "More", Gd = ":scope > a", Ka = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Ud = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Vd(e, t) {
  return !e || e.includes(t) ? {} : Ud;
}
function Yd({ link: e, current: t, place: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, className: `${Y.tab} ward-tab`, "aria-current": t ? "page" : void 0, ...a, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Y.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Jd({ links: e }) {
  return /* @__PURE__ */ n(Pa, { label: Wa, className: Y.moreRoot, trigger: { className: Y.more }, children: /* @__PURE__ */ n(Oa, { align: "end", entries: e.map((t) => ({ label: Ka(t), href: t.href })) }) });
}
function _T({ links: e, active: t, label: a, level: r }) {
  if (e.length > Dn) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Dn} — the set is fixed`);
  const o = _(null);
  Ha(o, r);
  const i = Math.max(0, e.findIndex((d) => d.id === t)), s = Da(o, i, e.map(Ka).join(`
`), Gd), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ l("nav", { ref: o, className: `${za(r)} ${Y.fits}`, "aria-label": a, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ n(Yd, { link: d, current: d.id === t, place: Vd(s, u) }, d.id)),
    /* @__PURE__ */ n("span", { "aria-hidden": "true", "data-more-probe": "", className: `${L.trigger} ${Y.more} ${Y.probe}`, children: Wa }),
    c.length > 0 && /* @__PURE__ */ n(Jd, { links: c })
  ] });
}
const Qd = "_root_v56ff_3", Xd = "_segment_v56ff_9", Fn = {
  root: Qd,
  segment: Xd
};
function Ga({ options: e, value: t, onChange: a, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Pt({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === t));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${Fn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Fn.segment,
      "aria-checked": d.value === t,
      disabled: o,
      "aria-describedby": i,
      onClick: () => a(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Zd = "_sidebar_s9o1j_3", eu = "_brand_s9o1j_9", tu = "_mark_s9o1j_17", nu = "_word_s9o1j_24", au = "_nav_s9o1j_30", ru = "_navItem_s9o1j_39", ou = "_footLink_s9o1j_49", lu = "_group_s9o1j_58", iu = "_groupName_s9o1j_65", su = "_agents_s9o1j_81", cu = "_agent_s9o1j_81", du = "_root_s9o1j_96", uu = "_agentTop_s9o1j_105", hu = "_dot_s9o1j_112", mu = "_agentName_s9o1j_124", wu = "_agentMeta_s9o1j_138", fu = "_foot_s9o1j_49", _u = "_footName_s9o1j_150", vu = "_footLinks_s9o1j_157", bu = "_linkBrand_s9o1j_184", pu = "_label_s9o1j_205", gu = "_note_s9o1j_210", yu = "_footer_s9o1j_226", E = {
  sidebar: Zd,
  brand: eu,
  mark: tu,
  word: nu,
  nav: au,
  navItem: ru,
  new: "_new_s9o1j_48",
  footLink: ou,
  group: lu,
  groupName: iu,
  agents: su,
  agent: cu,
  root: du,
  agentTop: uu,
  dot: hu,
  agentName: mu,
  agentMeta: wu,
  foot: fu,
  footName: _u,
  footLinks: vu,
  linkBrand: bu,
  label: pu,
  note: gu,
  footer: yu
};
function Nu({ agent: e }) {
  const t = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: E.agent,
      href: q(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": t ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: E.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: E.dot,
              "data-paused": t ? "true" : void 0,
              style: { "--dot": dn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: E.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: E.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function ku({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: E.foot, children: [
    /* @__PURE__ */ n("span", { className: E.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: E.footLinks, children: e.links.map((t) => /* @__PURE__ */ n("a", { className: `${E.footLink} ward-target`, href: q(t.href), children: t.label }, t.href)) })
  ] }) : null;
}
function $u({ brand: e, nav: t, agentsHeading: a, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: E.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: E.brand, children: [
      /* @__PURE__ */ n("span", { className: E.mark }),
      /* @__PURE__ */ n("span", { className: E.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: E.nav, children: t.map((s) => /* @__PURE__ */ n("a", { className: E.navItem, href: q(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ l("div", { className: E.group, children: [
      /* @__PURE__ */ l("span", { className: E.groupName, children: [
        a,
        " · ",
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: E.new, href: q(o.href), children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: E.agents, children: r.map((s) => /* @__PURE__ */ n(Nu, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(ku, { shared: i })
  ] });
}
function Cu(e) {
  return e.destinations ?? e.items ?? [];
}
function Su({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.linkBrand, children: e });
}
function Ru({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: E.footer, children: e });
}
function Tu({ link: e, active: t }) {
  return /* @__PURE__ */ l("a", { href: q(e.href), "aria-current": t ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: E.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: E.note, children: e.note })
  ] });
}
function xu(e) {
  return /* @__PURE__ */ l("aside", { className: `${E.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Su, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: Cu(e).map((t) => /* @__PURE__ */ n(Tu, { link: t, active: t.id === e.active }, t.id)) }),
    /* @__PURE__ */ n(Ru, { children: e.children })
  ] });
}
function Lu(e) {
  return "agents" in e;
}
function vT(e) {
  return Lu(e) ? /* @__PURE__ */ n($u, { ...e }) : /* @__PURE__ */ n(xu, { ...e });
}
const Au = "_mark_wlgi8_3", Eu = {
  mark: Au
}, Iu = { met: "✓", unmet: "", failed: "✕" };
function vn({ state: e, label: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Eu.mark,
      "data-state": e,
      "data-testid": "mark",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0,
      children: Iu[e]
    }
  );
}
const Mu = "_avatar_1t33a_3", Bu = {
  avatar: Mu
};
function xt(e) {
  const t = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (t.length > 1 ? (t[0] ?? "").charAt(0) + (t[1] ?? "").charAt(0) : (t[0] ?? "").slice(0, 2)).toUpperCase();
}
function Pu(e) {
  const t = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), a = t.charAt(0);
  return [xt(e), ...[...t.slice(1)].map((r) => a + r)];
}
function ju(e, t) {
  const a = Pu(e).find((o) => !t.has(o));
  if (a !== void 0) return a;
  let r = 2;
  for (; t.has(xt(e).charAt(0) + String(r)); ) r += 1;
  return xt(e).charAt(0) + String(r);
}
function bT(e) {
  const t = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (a.has(r)) continue;
    const o = ju(r, t);
    t.add(o), a.set(r, o);
  }
  return a;
}
function qu(e) {
  return e != null && ht(e) ? co(e) : void 0;
}
function pT({ name: e, step: t, size: a = "md", initials: r }) {
  return /* @__PURE__ */ n("span", { className: Bu.avatar, "data-size": a, "aria-hidden": "true", style: qu(t), children: r ?? xt(e) });
}
const Ou = "_marker_br9fi_2", Hu = {
  marker: Ou
}, Du = {
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
}, Fu = { running: " ward-running" };
function Fe({ size: e, kind: t, label: a }) {
  const r = { "--marker": Du[t], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Hu.marker} ward-marker ward-marker--${t}${Fu[t] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0
    }
  );
}
const zu = "_root_ti0pq_2", Wu = "_chip_ti0pq_11", Ku = "_noCase_ti0pq_23", vt = {
  root: zu,
  chip: Wu,
  noCase: Ku
};
function Gu(e, t) {
  return e ?? t ?? (/* @__PURE__ */ new Date()).toISOString();
}
function bn({ connection: e, since: t, lastEventAt: a }) {
  const r = Gu(t, a), o = un(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${vt.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Fe, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: vt.noCase, children: cn(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${vt.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Uu = "_root_yylks_2", Vu = "_context_yylks_13", Yu = "_row_yylks_1", Ju = "_heading_yylks_27", Qu = "_headingWrap_yylks_35", Xu = "_meta_yylks_41", Zu = "_chips_yylks_49", eh = "_title_yylks_56", th = "_consequence_yylks_66", nh = "_actionsWrap_yylks_73", ah = "_actions_yylks_73", rh = "_action_yylks_73", oh = "_overflowPanel_yylks_102", lh = "_measureClip_yylks_113", ih = "_measure_yylks_113", U = {
  root: Uu,
  context: Vu,
  row: Yu,
  heading: Ju,
  headingWrap: Qu,
  meta: Xu,
  chips: Zu,
  title: eh,
  consequence: th,
  actionsWrap: nh,
  actions: ah,
  action: rh,
  overflowPanel: oh,
  measureClip: lh,
  measure: ih
};
function sh({ title: e, density: t }) {
  return t === "record" ? /* @__PURE__ */ n(nt, { as: "h1", className: U.title, text: e }) : /* @__PURE__ */ n("h1", { className: U.title, children: e });
}
function ch({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ n("div", { className: U.chips, children: e.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null;
}
function dh({ consequence: e, consequenceHint: t }) {
  return e ? /* @__PURE__ */ n("p", { className: U.consequence, title: t, children: e }) : null;
}
function uh({ chips: e = [], consequence: t, consequenceHint: a }) {
  return e.length === 0 && !t ? null : /* @__PURE__ */ l("div", { className: U.meta, children: [
    /* @__PURE__ */ n(ch, { chips: e }),
    /* @__PURE__ */ n(dh, { consequence: t, consequenceHint: a })
  ] });
}
function hh({ title: e, chips: t, consequence: a, consequenceHint: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: U.heading, children: [
    /* @__PURE__ */ n(sh, { title: e, density: o }),
    /* @__PURE__ */ n(uh, { chips: t, consequence: a, consequenceHint: r })
  ] });
}
function nn({ actions: e }) {
  return e.map((t, a) => /* @__PURE__ */ n("span", { className: U.action, "data-action": "", children: t }, a));
}
function zn({ disclosure: e }) {
  return /* @__PURE__ */ n(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function mh({ actions: e, hasMore: t, collapsed: a, onOverflow: r, disclosure: o }) {
  return a ? r ? /* @__PURE__ */ n(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(zn, { disclosure: o }) : t ? [/* @__PURE__ */ n(zn, { disclosure: o }, "more"), /* @__PURE__ */ n(nn, { actions: e }, "actions")] : /* @__PURE__ */ n(nn, { actions: e });
}
function wh(e, t, a, r) {
  return a ? r ? null : [...e, ...t] : e.length > 0 ? e : null;
}
function fh({ actions: e, disclosure: t, onEscape: a }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && a();
  };
  return /* @__PURE__ */ n("div", { id: t.panelId, className: U.overflowPanel, "data-ward-overflow-panel": "", hidden: !t.open, onKeyDown: r, children: /* @__PURE__ */ n(nn, { actions: e }) });
}
function _h(e, t) {
  const a = k(), [r, o] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: a, toggle: () => o(!i) }, close: () => {
    var d, u;
    o(!1), (u = (d = t.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const vh = (e, t) => e.trim().toLowerCase() === t.trim().toLowerCase();
function bh(e = [], t, a) {
  const r = e.at(-1);
  return r !== void 0 && vh(r.label, t) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: a !== !1 };
}
function ph({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ n("div", { className: U.context, children: /* @__PURE__ */ n(xs, { path: e.path, current: e.current }) });
}
function gh(...e) {
  return e.some((t) => t === null);
}
function yh(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Nh(e, t) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : t.offsetWidth + yh(e);
}
function kh(e, t, a, r, o) {
  if (o === 0 || gh(t, a, r)) return !1;
  const [i, s, c] = [t, a, r], d = Math.max(0, e.clientWidth - Nh(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function $h(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ch(e) {
  return zr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Sh(e, t) {
  return t.length === 0 && e.length === 1 && Ch(e[0]);
}
function Rh(e, t) {
  const a = _(null), r = _(null), o = _(null), i = _(null), [s, c] = p(!1);
  return S(() => {
    const d = a.current;
    if (!$h(d)) return;
    const u = () => c(kh(d, r.current, o.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: a, headingRef: r, actionsRef: o, measureRef: i, collapsed: s && !t };
}
function Th({ actions: e, hasMore: t, measureRef: a }) {
  return /* @__PURE__ */ n("div", { className: U.measureClip, children: /* @__PURE__ */ l("div", { className: U.measure, ref: a, "aria-hidden": "true", "data-ward-measure": !0, children: [
    t ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] }) });
}
function xh({ connection: e }) {
  return e ? /* @__PURE__ */ n(bn, { connection: e.connection, since: e.since }) : null;
}
function gT({ crumb: e, crumbCurrent: t, chips: a, title: r, consequence: o, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: N, collapsed: A } = Rh(s, Sh(s, c)), O = c.length > 0, { disclosure: me, close: re } = _h(A || O, y), Ee = wh(c, s, A, u);
  return /* @__PURE__ */ l("header", { className: U.root, "data-density": h, children: [
    /* @__PURE__ */ n(ph, { crumb: bh(e, r, t) }),
    /* @__PURE__ */ l("div", { className: U.row, ref: w, children: [
      /* @__PURE__ */ n("div", { ref: f, className: U.headingWrap, children: /* @__PURE__ */ n(hh, { title: r, chips: a, consequence: o, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ l("div", { className: U.actionsWrap, children: [
        /* @__PURE__ */ n(xh, { connection: d }),
        /* @__PURE__ */ n("div", { className: U.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ n(mh, { actions: s, hasMore: O, collapsed: A, onOverflow: u, disclosure: me }) })
      ] })
    ] }),
    /* @__PURE__ */ n(fh, { actions: Ee, disclosure: me, onEscape: re }),
    /* @__PURE__ */ n(Th, { actions: s, hasMore: O, measureRef: N })
  ] });
}
const Lh = "_root_td96x_2", Ah = "_body_td96x_16", Wn = {
  root: Lh,
  body: Ah
};
function yT({ variant: e = "info", ticket: t, children: a }) {
  if (!t) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ n("aside", { className: `${Wn.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": t, children: /* @__PURE__ */ n("div", { className: Wn.body, children: a }) });
}
const Eh = "_root_bf1pc_2", Ih = "_table_bf1pc_9", Mh = "_caption_bf1pc_14", Bh = "_series_bf1pc_23", Ph = "_category_bf1pc_31", jh = "_cell_bf1pc_39", qh = "_track_bf1pc_45", Oh = "_lane_bf1pc_52", Hh = "_bar_bf1pc_56", Dh = "_value_bf1pc_63", Fh = "_swatch_bf1pc_70", zh = "_empty_bf1pc_78", Z = {
  root: Eh,
  table: Ih,
  caption: Mh,
  series: Bh,
  category: Ph,
  cell: jh,
  track: qh,
  lane: Oh,
  bar: Hh,
  value: Dh,
  swatch: Fh,
  empty: zh
}, Wh = "—", Kn = 6;
function Kh(e, t) {
  if (t.length < 1 || t.length > Kn)
    throw new Error(`BarChart: ${t.length} series; the chart takes one to ${Kn}`);
  const a = t.find((r) => r.values.length !== e.length);
  if (a) throw new Error(`BarChart: series "${a.name}" has ${a.values.length} values for ${e.length} categories`);
}
function Gh(e) {
  return Math.max(0, ...e.flatMap((t) => t.values.map((a) => a ?? 0)));
}
function Ua(e, t) {
  return t > 1 ? e + 1 : void 0;
}
function Uh(e, t) {
  return e !== null && t > 0 ? e / t * 100 : 0;
}
function Vh({ value: e, top: t, step: a, format: r, missing: o }) {
  const i = Uh(e, t), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: Z.cell, children: /* @__PURE__ */ l("span", { className: Z.track, children: [
    /* @__PURE__ */ n("span", { className: Z.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${Z.bar} ward-barchart-bar`, "data-step": a, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: Z.value, children: e === null ? o : r(e) })
  ] }) });
}
function Yh({ series: e }) {
  return /* @__PURE__ */ n(x, { children: e.map((t, a) => /* @__PURE__ */ l("th", { scope: "col", className: Z.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: Z.swatch, "data-step": Ua(a, e.length), "aria-hidden": "true" }) : null,
    t.name
  ] }, t.name)) });
}
function Jh({ title: e, empty: t = "Nothing to chart yet." }) {
  return /* @__PURE__ */ l("section", { className: `${Z.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("p", { className: Z.empty, children: t })
  ] });
}
function Qh({ title: e, categories: t, series: a, top: r, format: o = ae, categoryHead: i = "Category", missing: s = Wh }) {
  return /* @__PURE__ */ n("div", { className: `${Z.root} ward-barchart`, children: /* @__PURE__ */ l("table", { className: Z.table, children: [
    /* @__PURE__ */ n("caption", { className: Z.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: Z.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Yh, { series: a })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((c, d) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: Z.category, children: c }),
      a.map((u, h) => /* @__PURE__ */ n(Vh, { value: u.values[d], top: r, step: Ua(h, a.length), format: o, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function NT(e) {
  Kh(e.categories, e.series);
  const t = Gh(e.series);
  return t === 0 ? /* @__PURE__ */ n(Jh, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Qh, { ...e, top: t });
}
const Xh = "_root_1bfqw_2", Zh = "_figure_1bfqw_7", em = "_of_1bfqw_13", tm = "_bar_1bfqw_18", nm = "_rows_1bfqw_38", am = "_row_1bfqw_38", rm = "_label_1bfqw_49", om = "_amount_1bfqw_54", Ie = {
  root: Xh,
  figure: Zh,
  of: em,
  bar: tm,
  rows: nm,
  row: am,
  label: rm,
  amount: om
};
function lm({ spent: e, ceiling: t, breakdown: a }) {
  const r = t > 0 ? Math.min(e / t, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ie.of, children: [
        "of ",
        le(t)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: t,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(t)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    a && /* @__PURE__ */ n("ul", { className: Ie.rows, children: a.map((o) => /* @__PURE__ */ l("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ie.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ie.amount, children: le(o.amount) })
    ] }, o.label)) })
  ] });
}
const im = "_frame_f7bxz_2", sm = "_table_f7bxz_6", cm = "_th_f7bxz_12", dm = "_td_f7bxz_13", um = "_sort_f7bxz_53", hm = "_row_f7bxz_65", mm = "_empty_f7bxz_73", qe = {
  frame: im,
  table: sm,
  th: cm,
  td: dm,
  sort: um,
  row: hm,
  empty: mm
}, wm = { asc: "ascending", desc: "descending" };
function fm(e, t) {
  if (!(t === void 0 || t.key !== e.key))
    return wm[t.direction];
}
function _m(e, t) {
  return e.sortable && t ? /* @__PURE__ */ n("button", { type: "button", className: qe.sort, onClick: () => t(e.key), children: e.header }) : e.header;
}
function vm(e) {
  return e === void 0 ? void 0 : { width: e };
}
function bm({ column: e, sort: t, onSort: a }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: vm(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": fm(e, t),
      children: _m(e, a)
    }
  );
}
function pm({ row: e, props: t }) {
  const a = t.rowId(e), r = (t.lockedIds ?? []).includes(a);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: qe.row,
      "data-selected": a === t.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: t.columns.map((o) => /* @__PURE__ */ n(
        "td",
        {
          className: qe.td,
          "data-align": o.align,
          "data-mono": o.mono,
          "data-drop": o.dropPriority,
          "data-label": t.narrow ? o.header : void 0,
          children: t.renderCell(e, o.key)
        },
        o.key
      ))
    }
  );
}
function gm({
  label: e,
  columns: t,
  rows: a,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return a.length === 0 ? /* @__PURE__ */ n("div", { className: qe.empty, children: u }) : /* @__PURE__ */ n("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ l("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: qe.head, children: t.map((w) => /* @__PURE__ */ n(bm, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((w) => /* @__PURE__ */ n(pm, { row: w, props: { label: e, columns: t, rows: a, rowId: r, renderCell: o, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const ym = "_list_v0s52_2", Nm = {
  list: ym
};
function km({ children: e, label: t }) {
  return /* @__PURE__ */ n("ul", { className: Nm.list, role: "list", "aria-label": t, "data-ward-plain-list": "", children: e });
}
const $m = "_label_1u62a_2", Cm = {
  label: $m
};
function kT({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((t) => /* @__PURE__ */ n("th", { scope: "col", title: t.header, style: t.width === void 0 ? void 0 : { width: t.width }, children: /* @__PURE__ */ n("span", { className: Cm.label, children: t.header }) }, t.key)) }) });
}
const Sm = "_stack_bp6a0_2", Rm = {
  stack: Sm
};
function $T({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Rm.stack, "data-ward-action-stack": "", children: e });
}
const Tm = "_set_1z0sq_2", xm = "_legend_1z0sq_7", Lm = "_row_1z0sq_15", Am = "_control_1z0sq_20", Em = "_input_1z0sq_26", Im = "_label_1z0sq_31", Mm = "_consequence_1z0sq_36", We = {
  set: Tm,
  legend: xm,
  row: Lm,
  control: Am,
  input: Em,
  label: Im,
  consequence: Mm
};
function Va({ legend: e, options: t, value: a, onChange: r, disabled: o, name: i, describedBy: s, variant: c }) {
  const d = k(), u = i ?? d;
  return /* @__PURE__ */ l("fieldset", { className: We.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: We.legend, children: e }),
    t.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: We.row, children: [
        /* @__PURE__ */ l("span", { className: We.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: We.input,
              value: h.value,
              checked: a === h.value,
              disabled: o,
              "aria-describedby": at(f, s),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: w, className: We.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: f, className: `${We.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Bm = "_root_11gpw_2", Pm = "_head_11gpw_10", jm = "_note_11gpw_29", qm = "_index_11gpw_34", Om = "_dot_11gpw_38", Hm = "_counter_11gpw_49", Dm = "_trailing_11gpw_57", Ke = {
  root: Bm,
  head: Pm,
  note: jm,
  index: qm,
  dot: Om,
  counter: Hm,
  trailing: Dm
};
function Fm({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${Ke.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Ke.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function zm({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Ke.counter, "aria-hidden": "true", children: e }) : null;
}
function Gn({ title: e, index: t, note: a, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Ke.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Ke.head, children: [
      /* @__PURE__ */ n(Fm, { index: t }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    a && /* @__PURE__ */ n("span", { className: Ke.note, children: a }),
    /* @__PURE__ */ n(zm, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Ke.trailing, children: i })
  ] });
}
const Wm = "_strip_c3x3u_2", Km = "_cell_c3x3u_7", Gm = "_value_c3x3u_12", Um = "_link_c3x3u_29", Vm = "_label_c3x3u_49", Ym = "_tiles_c3x3u_101", De = {
  strip: Wm,
  cell: Km,
  value: Gm,
  link: Um,
  label: Vm,
  tiles: Ym
};
function Ya(e, t, [a, r]) {
  if (t.length < a || t.length > r)
    throw new Error(`${e}: ${t.length} cells — it takes ${a} to ${r}`);
  if (t.filter((o) => o.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Ja = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Jm({ cell: e }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Ja(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Qm({ cell: e, href: t }) {
  return /* @__PURE__ */ l("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Ja(e), title: e.hint, children: /* @__PURE__ */ l("a", { className: `${De.link} ward-stat-link`, href: q(t), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { children: e.value }),
      /* @__PURE__ */ n("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Qa = (e) => e.href === void 0 ? /* @__PURE__ */ n(Jm, { cell: e }, e.label) : /* @__PURE__ */ n(Qm, { cell: e, href: e.href }, e.label);
function Ht({ cells: e, divided: t = !1 }) {
  return Ya("StatStrip", e, [2, 4]), /* @__PURE__ */ n("dl", { className: `${De.strip} ward-statstrip`, "data-divided": t || void 0, children: e.map(Qa) });
}
const Un = 6;
function CT({ cells: e }) {
  Ya("StatTiles", e, [1, 2 * Un]);
  const t = { "--ward-stat-tiles-columns": Math.min(e.length, Un) };
  return /* @__PURE__ */ n("dl", { className: `${De.tiles} ward-stattiles`, style: t, children: e.map(Qa) });
}
const Xm = "_root_1eb1u_2", Zm = "_track_1eb1u_8", ew = "_thumb_1eb1u_46", tw = "_labelHidden_1eb1u_64", nw = "_label_1eb1u_64", aw = "_lockedNote_1eb1u_84", Ge = {
  root: Xm,
  track: Zm,
  thumb: ew,
  labelHidden: tw,
  label: nw,
  lockedNote: aw
};
function rw(e, t, a, r) {
  return { on: a ? !0 : e, off: !!(t || a || r) };
}
function ow(e) {
  return e ? `${Ge.label} ${Ge.labelHidden}` : Ge.label;
}
function lw(e, t, a) {
  return e && !t && a ? a : void 0;
}
function iw(e, t, a, r) {
  return { "aria-describedby": qt(at(t, r ? e : void 0), a), title: (a == null ? void 0 : a.reason) ?? r };
}
function sw({ id: e, reason: t }) {
  return t ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: t }) : null;
}
function Ve({ label: e, checked: t, onChange: a, disabled: r, locked: o, describedBy: i, labelHidden: s, disabledReason: c }) {
  const d = k(), u = `${d}switch`, h = `${d}reason`, w = Ae(), { on: f, off: y } = rw(t, r, o, w !== null), N = lw(y, w !== null, c);
  return /* @__PURE__ */ l("span", { className: `${Ge.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: u,
        role: "switch",
        "aria-checked": f,
        "aria-label": e,
        "aria-labelledby": d,
        ...iw(h, i, w, N),
        className: `${Ge.track} ward-switch`,
        "data-on": f,
        "data-locked": o ? !0 : void 0,
        disabled: y,
        onClick: () => !y && (a == null ? void 0 : a(!f)),
        children: /* @__PURE__ */ n("span", { className: Ge.thumb })
      }
    ),
    /* @__PURE__ */ l("label", { id: d, htmlFor: u, className: ow(s), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ge.lockedNote, children: "always on" })
    ] }),
    /* @__PURE__ */ n(sw, { id: h, reason: N })
  ] });
}
const cw = "_bar_1vp69_2", dw = "_skip_1vp69_11", uw = "_mark_1vp69_22", hw = "_nav_1vp69_30", mw = "_list_1vp69_34", ww = "_select_1vp69_41", fw = "_selectTrigger_1vp69_45", _w = "_dest_1vp69_52", vw = "_actor_1vp69_71", bw = "_actorMark_1vp69_84", pw = "_actorLabel_1vp69_89", gw = "_tagline_1vp69_108", se = {
  bar: cw,
  skip: dw,
  mark: uw,
  nav: hw,
  list: mw,
  select: ww,
  selectTrigger: fw,
  dest: _w,
  actor: vw,
  actorMark: bw,
  actorLabel: pw,
  tagline: gw
};
function yw(e) {
  return e.split(/\s+/).slice(0, 2).map((t) => t[0] ?? "").join("").toUpperCase();
}
function Nw(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function ST({ wordmark: e = "Trellis", destinations: t, active: a, actor: r, tagline: o, onNavigate: i, skipTo: s = "main" }) {
  const c = Nw(r);
  return /* @__PURE__ */ l("header", { className: se.bar, children: [
    /* @__PURE__ */ n("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: se.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: se.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: se.list, children: t.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: q(d.href),
          "aria-current": d.id === a ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        Ia,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: a,
          options: t.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ l("span", { className: se.actor, children: [
      /* @__PURE__ */ n("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: se.actorMark, "aria-hidden": "true", children: yw(c) })
    ] })
  ] });
}
const kw = "_tree_zzoob_2", $w = "_item_zzoob_6", Cw = "_row_zzoob_10", Sw = "_button_zzoob_22", Lt = {
  tree: kw,
  item: $w,
  row: Cw,
  button: Sw
}, Xa = Ne(null);
function Rw({ label: e, children: t }) {
  const { containerProps: a, itemProps: r } = Pt({ orientation: "vertical" });
  return /* @__PURE__ */ n(Xa.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: Lt.tree, role: "tree", "aria-label": e, ...a, children: t }) });
}
const Tw = { ArrowRight: !0, ArrowLeft: !1 };
function Vn(e) {
  return e ? !0 : void 0;
}
function xw(e, t) {
  const a = Tw[e.key];
  !t.leaf && t.onToggle && a !== void 0 && !!t.expanded !== a && t.onToggle();
}
function Lw(e) {
  var t, a;
  e.leaf || (t = e.onToggle) == null || t.call(e), (a = e.onSelect) == null || a.call(e);
}
function Aw(e) {
  const t = [Lt.row, "ward-treerow"];
  return e.unresolved && t.push("ward-treerow--unresolved"), e.inherited && t.push("ward-treerow--inherited"), t.join(" ");
}
function Ew(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Iw(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Mw(e) {
  return typeof e == "string" ? e : void 0;
}
function Bw({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Pw({ unresolved: e, inherited: t }) {
  const a = [e ? "unresolved" : "", t ? "inherited" : ""].filter(Boolean).join(", ");
  return a === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Za(e) {
  const t = ye(Xa);
  if (!t) throw new Error("TreeRow: must be rendered inside a Tree");
  const a = Ew(e);
  return /* @__PURE__ */ l("li", { className: Lt.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Aw(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": a,
        "data-depth": e.depth,
        "data-unresolved": Vn(e.unresolved),
        "data-inherited": Vn(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${Lt.button} ward-treeitem-btn`,
            onClick: () => Lw(e),
            onKeyDown: (r) => xw(r, e),
            ...t(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Iw(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Mw(e.label), children: e.label }),
              /* @__PURE__ */ n(Bw, { value: e.detail }),
              /* @__PURE__ */ n(Pw, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    a && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const jw = "_frame_gxspk_2", qw = "_subjectRail_gxspk_22", Ow = "_subject_gxspk_22", Hw = "_rail_gxspk_42", Dw = "_record_gxspk_57", Fw = "_recordBody_gxspk_102", zw = "_stageGrid_gxspk_157", Ww = "_band_gxspk_171", Kw = "_bandBody_gxspk_179", Gw = "_bandActions_gxspk_184", Uw = "_scroller_gxspk_192", Vw = "_board_gxspk_219", Yw = "_lanes_gxspk_228", Jw = "_cardGrid_gxspk_262", ee = {
  frame: jw,
  subjectRail: qw,
  subject: Ow,
  rail: Hw,
  record: Dw,
  recordBody: Fw,
  stageGrid: zw,
  band: Ww,
  bandBody: Kw,
  bandActions: Gw,
  scroller: Uw,
  board: Vw,
  lanes: Yw,
  cardGrid: Jw
};
function RT({ children: e, as: t = "main", inset: a = "page" }) {
  return /* @__PURE__ */ n(t, { className: ee.frame, "data-ward-page-frame": "", "data-inset": a, children: e });
}
function Yn(e) {
  return e ? "true" : void 0;
}
function TT({ children: e, rail: t, width: a = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: ee.subjectRail, "data-ward-subject-rail": a, "data-ruled": Yn(i), children: [
    /* @__PURE__ */ n("div", { className: ee.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: ee.rail, "data-sticky": Yn(o), "aria-label": r, children: t })
  ] });
}
function xT({ title: e, children: t, note: a, trailing: r, pad: o = "block", label: i, empty: s, measure: c, surface: d }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", "data-surface": d, children: /* @__PURE__ */ n(Gn, { kind: "key", title: e, note: t, trailing: r }) }) : /* @__PURE__ */ l("section", { className: ee.record, "aria-label": i, "data-ward-record-section": "", "data-surface": d, children: [
    /* @__PURE__ */ n(Gn, { kind: "key", title: e, note: a, trailing: r }),
    /* @__PURE__ */ n("div", { className: ee.recordBody, "data-pad": o, "data-measure": c, children: t })
  ] });
}
const Qw = "_form_1j8ub_2", Xw = "_fields_1j8ub_9", Zw = "_actions_1j8ub_19", Ut = {
  form: Qw,
  fields: Xw,
  actions: Zw
};
function LT({ label: e, children: t, actions: a, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: Ut.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ut.fields, children: t }),
    a == null ? null : /* @__PURE__ */ n("div", { className: Ut.actions, role: "group", "aria-label": `${e} actions`, children: a })
  ] });
}
function AT({ children: e, actions: t, label: a }) {
  return /* @__PURE__ */ l("section", { className: ee.band, "aria-label": a, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: ee.bandBody, children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: ee.bandActions, children: t })
  ] });
}
const ef = "(max-width: 767.98px)";
function pn({ label: e, children: t, laneCount: a }) {
  const r = a === void 0 ? void 0 : { "--ward-board-lanes": a };
  return /* @__PURE__ */ n(mn, { className: ee.scroller, label: e, count: a ?? Wr.count(t), "data-ward-board-scroller": "", style: r, children: t });
}
function tf({ lanes: e, label: t, laneLabel: a }) {
  const [r, o] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ l("div", { className: ee.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(j, { kind: "select", label: a, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: o }),
    /* @__PURE__ */ n(pn, { label: t, children: i == null ? void 0 : i.content })
  ] });
}
function nf({ lanes: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: ee.board, "data-ward-board": "", children: /* @__PURE__ */ n(pn, { label: t, laneCount: e.length, children: e.map((a) => /* @__PURE__ */ n(ha, { children: a.content }, a.id)) }) });
}
function ET({ children: e, label: t = "Workflow board", lanes: a, laneLabel: r = "Column" }) {
  const o = dt(ef);
  return a === void 0 ? /* @__PURE__ */ n(pn, { label: t, children: e }) : o ? /* @__PURE__ */ n(tf, { lanes: a, label: t, laneLabel: r }) : /* @__PURE__ */ n(nf, { lanes: a, label: t });
}
function IT({ columns: e, children: t, label: a = "Stages", floor: r = "stage" }) {
  const o = Math.max(e, 1), i = { "--ward-stage-grid-columns": o };
  return /* @__PURE__ */ n(mn, { className: ee.stageGrid, label: a, count: o, "data-ward-stage-grid": "", "data-floor": r, style: i, children: t });
}
function MT({ children: e, label: t }) {
  return /* @__PURE__ */ n("div", { className: `${ee.cardGrid} ward-cardgrid`, role: t === void 0 ? void 0 : "region", "aria-label": t, "data-ward-card-grid": "", children: e });
}
const af = "_block_6tv5x_3", rf = "_sentence_6tv5x_10", of = "_meta_6tv5x_19", lf = "_ways_6tv5x_24", sf = "_action_6tv5x_38", cf = "_strip_6tv5x_42", df = "_loading_6tv5x_61", uf = "_label_6tv5x_69", hf = "_counter_6tv5x_76", _e = {
  block: af,
  sentence: rf,
  meta: of,
  ways: lf,
  action: sf,
  strip: cf,
  loading: df,
  label: uf,
  counter: hf
};
function mf({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(b, { onClick: e.onClick, children: e.label }) });
}
function Dt({ sentence: e, action: t, children: a, role: r = "status", tone: o, kind: i, ask: s }) {
  return /* @__PURE__ */ l("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ l("p", { className: _e.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ l(x, { children: [
        " ",
        /* @__PURE__ */ n("strong", { children: s })
      ] })
    ] }),
    a,
    /* @__PURE__ */ n(mf, { action: t })
  ] });
}
function wf(e) {
  return /* @__PURE__ */ n(Dt, { ...e, kind: "ward-emptystate" });
}
function BT({ sentence: e, total: t, action: a }) {
  return /* @__PURE__ */ n(Dt, { sentence: e, action: a, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "0 of ",
    t,
    " match the filter"
  ] }) });
}
function ff({ ways: e }) {
  return /* @__PURE__ */ n("div", { className: `${_e.ways} ward-state-ways`, children: e.map((t) => /* @__PURE__ */ n(b, { variant: "secondary", onClick: t.onClick, children: t.label }, t.label)) });
}
function PT({ ways: e, ...t }) {
  return /* @__PURE__ */ n(Dt, { ...t, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(ff, { ways: e }) });
}
function jT({ sentence: e, at: t, onRetry: a }) {
  return /* @__PURE__ */ n(Dt, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: a }, children: /* @__PURE__ */ l("p", { className: _e.meta, children: [
    "failed at ",
    he(t)
  ] }) });
}
function qT({ lastReachableAt: e, snapshotAt: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(t)
  ] });
}
function OT({ queued: e, since: t }) {
  return /* @__PURE__ */ l("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(t)
  ] });
}
function HT({ label: e, startedAt: t }) {
  const a = _(t ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = p(!1);
  S(() => {
    const s = window.setTimeout(() => o(!0), be.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = un(a.current, r);
  return /* @__PURE__ */ l("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: cn(i) }) : null
  ] });
}
const _f = "_note_cigdt_2", vf = {
  note: _f
};
function bf({ label: e, count: t, cap: a }) {
  return /* @__PURE__ */ l("p", { className: vf.note, role: "status", children: [
    e,
    " is over cap now: ",
    t,
    " items against ",
    a
  ] });
}
const pf = "_card_k7btg_3", gf = "_hit_k7btg_31", yf = "_head_k7btg_44", Nf = "_title_k7btg_51", kf = "_meta_k7btg_57", $f = "_since_k7btg_66", Cf = "_sep_k7btg_76", Sf = "_fields_k7btg_80", Rf = "_field_k7btg_80", Tf = "_last_k7btg_98", xf = "_reason_k7btg_110", de = {
  card: pf,
  hit: gf,
  head: yf,
  title: Nf,
  meta: kf,
  since: $f,
  sep: Cf,
  fields: Sf,
  field: Rf,
  last: Tf,
  reason: xf
}, Lf = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Af(e, t, a) {
  const r = Nt(e, "blue"), o = Nt(e, "orange"), i = Nt(e, "green"), s = _(/* @__PURE__ */ new Set());
  S(() => {
    if (!a) return;
    const c = { blue: r, orange: o, green: i };
    return a.subscribe(t, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Lf[d.type];
      u && c[u]();
    });
  }, [r, a, i, t, o]);
}
const Ef = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function If(e, t) {
  return Ef[t](e);
}
function Mf({ item: e, connection: t }) {
  const a = /* @__PURE__ */ n("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    a,
    /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    a,
    /* @__PURE__ */ l("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Bf({ item: e }) {
  const t = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ l("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "Drift flag" }),
    t && /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function Pf({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function jf({ item: e, fields: t }) {
  return t.length === 0 ? null : /* @__PURE__ */ n("p", { className: de.fields, children: t.map((a) => /* @__PURE__ */ n("span", { className: de.field, children: If(e, a) }, a)) });
}
const an = (e) => e ? !0 : void 0;
function qf(e) {
  return { "--stream": ge(e.streamStep, "id") };
}
function Of(e, t, a) {
  e == null || e(t, a);
}
function Hf(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Df({ item: e, stale: t }) {
  var r, o;
  const a = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return a ? /* @__PURE__ */ n("p", { className: de.last, "data-stale": an(t), children: a }) : null;
}
function Ft(e) {
  const t = e.fields ?? [], a = e.item, r = _(null);
  Af(r, a.key, e.feed);
  const o = Hf(e.feed), i = qf(a);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": a.key,
      className: de.card,
      style: i,
      "data-selected": an(e.selected),
      "data-flagged": an(a.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: de.hit, onClick: (s) => Of(e.onOpen, a.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          a.key,
          " ",
          a.title
        ] }) }),
        /* @__PURE__ */ n(Bf, { item: a }),
        /* @__PURE__ */ n(nt, { as: "p", className: de.title, text: a.title }),
        /* @__PURE__ */ n(Mf, { item: a, connection: o }),
        /* @__PURE__ */ n(Pf, { reason: a.blockedReason }),
        /* @__PURE__ */ n(jf, { item: a, fields: t }),
        /* @__PURE__ */ n(Df, { item: a, stale: o === "stale" })
      ]
    }
  );
}
const Ff = "_column_1j8bi_3", zf = "_head_1j8bi_21", Wf = "_label_1j8bi_30", Kf = "_count_1j8bi_39", Gf = "_list_1j8bi_53", st = {
  column: Ff,
  head: zf,
  label: Wf,
  count: Kf,
  list: Gf
};
function er(e, t) {
  return [...e].sort((a, r) => t === "oldest" ? r.timeInStage - a.timeInStage : a.timeInStage - r.timeInStage);
}
function Uf({ column: e, count: t, id: a }) {
  return /* @__PURE__ */ l("div", { className: st.head, children: [
    /* @__PURE__ */ n("h2", { className: st.label, id: a, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ l("span", { className: st.count, children: [
      t,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Vf(e) {
  return /* @__PURE__ */ n("div", { className: st.list, role: "list", children: e.rows.map((t, a) => {
    var r;
    return /* @__PURE__ */ n(
      Ft,
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
function Yf({ column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = k(), h = e.cap !== void 0 && t.length > e.cap, w = er(t, r);
  return /* @__PURE__ */ l("section", { className: st.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Uf, { column: e, count: t.length, id: u }),
    /* @__PURE__ */ n(Vf, { column: e, items: t, fields: a, sort: r, onOpen: o, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ n(bf, { label: e.label, count: t.length, cap: e.cap })
  ] });
}
const Jf = "_foot_cs4jr_2", Qf = "_note_cs4jr_13", Xf = "_link_cs4jr_19", Vt = {
  foot: Jf,
  note: Qf,
  link: Xf
};
function DT({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: Vt.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Vt.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Vt.link} ward-target`, href: q(e), children: "Configure board" })
  ] });
}
const Zf = "_head_1tfi5_3", e_ = "_identity_1tfi5_12", t_ = "_titleRow_1tfi5_18", n_ = "_title_1tfi5_18", a_ = "_key_1tfi5_35", r_ = "_rollup_1tfi5_45", o_ = "_tools_1tfi5_53", l_ = "_swatch_1tfi5_101", i_ = "_mark_1tfi5_108", Se = {
  head: Zf,
  identity: e_,
  titleRow: t_,
  title: n_,
  key: a_,
  rollup: r_,
  tools: o_,
  swatch: l_,
  mark: i_
}, Jn = "initials:";
function s_(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function c_(e) {
  const t = [s_(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && t.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && t.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && t.push(`P90 ${ue(e.p90)}`), t.join(" · ");
}
function d_(e) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ l("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    c_(e)
  ] });
}
function u_(e) {
  return e.startsWith(Jn) ? e.slice(Jn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((a) => a[0].toUpperCase()).join("") : "";
}
function h_({ markRef: e, streamStep: t }) {
  const a = { "--stream": ge(t, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${Se.mark} ward-stream-mark`, style: a, "data-mark-ref": e, "aria-hidden": "true", children: u_(e) }) : /* @__PURE__ */ n("span", { className: Se.swatch, style: a, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function m_({ owners: e, owner: t, onOwnerChange: a }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: t ?? e[0].value, onChange: a, options: e });
}
function FT({
  stream: e,
  rollups: t,
  connection: a,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ l("div", { className: Se.head, children: [
    /* @__PURE__ */ l("div", { className: Se.identity, children: [
      /* @__PURE__ */ l("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ n(h_, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: Se.rollup, "aria-live": "polite", children: d_(t) })
    ] }),
    /* @__PURE__ */ l("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(m_, { owners: o, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(bn, { connection: a, since: r ?? void 0 })
    ] })
  ] });
}
const w_ = "_head_1sejb_14", f_ = "_line_1sejb_15", __ = "_cHandle_1sejb_36", v_ = "_cName_1sejb_41", b_ = "_nameLine_1sejb_49", p_ = "_cLabel_1sejb_56", g_ = "_cCap_1sejb_61", y_ = "_cShown_1sejb_66", N_ = "_name_1sejb_49", k_ = "_noCap_1sejb_88", $_ = "_state_1sejb_102", C_ = "_handle_1sejb_111", S_ = "_sub_1sejb_137", H = {
  head: w_,
  line: f_,
  cHandle: __,
  cName: v_,
  nameLine: b_,
  cLabel: p_,
  cCap: g_,
  cShown: y_,
  name: N_,
  noCap: k_,
  state: $_,
  handle: C_,
  sub: S_
}, R_ = "can't be hidden or collapsed", T_ = "terminal · counted, not a column", x_ = "A human gate is always shown, so people see what waits for them.", L_ = "A terminal stage is counted, not shown as a column.";
function zT() {
  return /* @__PURE__ */ l("div", { className: H.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.cHandle }),
    /* @__PURE__ */ n("span", { className: H.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: H.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: H.cShown, children: "Shown" })
  ] });
}
function A_(e, t) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: t, state: t ? "on" : "off" };
}
function E_(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Qn(e) {
  return e.gate ? R_ : e.terminal ? T_ : E_(e.agentsMounted);
}
function I_(e, t) {
  e.key === "ArrowUp" && (t == null || t(-1)), e.key === "ArrowDown" && (t == null || t(1));
}
function M_({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: H.cName, children: [
    /* @__PURE__ */ l("span", { className: H.nameLine, children: [
      /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Qn(e) && /* @__PURE__ */ n("span", { className: H.sub, children: Qn(e) })
  ] });
}
function B_(e) {
  return e === void 0 ? "" : String(e);
}
function P_(e) {
  return e === "" ? void 0 : Number(e);
}
function j_({ name: e, onReorder: t }) {
  const a = Ae();
  return (a == null ? void 0 : a.actions) === "hide" ? /* @__PURE__ */ n("span", { className: H.cHandle }) : /* @__PURE__ */ n("span", { className: H.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: H.handle,
      "aria-label": `Reorder ${e}`,
      disabled: a !== null,
      title: a == null ? void 0 : a.reason,
      "aria-describedby": a == null ? void 0 : a.reasonId,
      onKeyDown: (r) => !a && I_(r, t),
      children: "⠿"
    }
  ) });
}
function q_({ stage: e, config: t, onChange: a }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${H.cCap} ${H.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: H.cCap, children: /* @__PURE__ */ n(j, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: B_(t.cap), onChange: (r) => a({ ...t, cap: P_(r) }) }) });
}
function O_(e) {
  return e.gate ? x_ : e.terminal ? L_ : void 0;
}
function H_({ stage: e, config: t, onChange: a }) {
  const r = Ae() !== null, o = A_(e, t.shown), i = e.gate || e.terminal || r, s = (c) => a({ ...t, shown: c });
  return /* @__PURE__ */ l("span", { className: H.cShown, children: [
    /* @__PURE__ */ n(Ve, { label: "Shown as a column", labelHidden: !0, checked: o.shown, locked: e.gate, disabled: e.terminal, disabledReason: O_(e), onChange: s }),
    /* @__PURE__ */ n("span", { className: H.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!o.shown), children: o.state })
  ] });
}
function D_(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function WT({ stage: e, config: t, onChange: a, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: H.line, "data-kind": D_(e), children: [
    /* @__PURE__ */ n(j_, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(M_, { stage: e }),
    /* @__PURE__ */ n("span", { className: H.cLabel, children: /* @__PURE__ */ n(j, { kind: "input", label: "Column label", labelHidden: !0, value: t.label, onChange: (o) => a({ ...t, label: o }) }) }),
    /* @__PURE__ */ n(q_, { stage: e, config: t, onChange: a }),
    /* @__PURE__ */ n(H_, { stage: e, config: t, onChange: a })
  ] });
}
const F_ = "_body_8qsv9_2", z_ = "_head_8qsv9_9", W_ = "_summary_8qsv9_19", K_ = "_block_8qsv9_20", G_ = "_actionsBlock_8qsv9_21", U_ = "_title_8qsv9_41", V_ = "_note_8qsv9_46", Y_ = "_k_8qsv9_51", J_ = "_kv_8qsv9_58", Q_ = "_row_8qsv9_64", X_ = "_label_8qsv9_75", Z_ = "_value_8qsv9_84", ev = "_quote_8qsv9_90", tv = "_actions_8qsv9_21", nv = "_resolve_8qsv9_111", F = {
  body: F_,
  head: z_,
  summary: W_,
  block: K_,
  actionsBlock: G_,
  title: U_,
  note: V_,
  k: Y_,
  kv: J_,
  row: Q_,
  label: X_,
  value: Z_,
  quote: ev,
  actions: tv,
  resolve: nv
};
function av(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function rv(e, t) {
  if (!e.run) return [];
  const a = (t == null ? void 0 : t.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function ov(e) {
  const t = wt(e);
  return t === null ? "No colour" : `Step ${t}`;
}
function lv(e) {
  return (e ?? []).map((t, a) => [t.label, t.value, `fact-${a}`]);
}
function iv(e, t, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...Ot(ov(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...av(e),
    ...lv(a),
    ...rv(e, t)
  ];
}
function sv({ resolve: e, label: t }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: F.resolve, "aria-label": t, children: [
    /* @__PURE__ */ n("h3", { className: F.k, children: t }),
    e
  ] });
}
function cv(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function dv({ item: e, showKey: t }) {
  const a = cv(e);
  return !t && !a ? null : /* @__PURE__ */ l("div", { className: F.head, children: [
    t && /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function uv({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: F.block, children: [
    /* @__PURE__ */ n("p", { className: F.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: F.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: F.note, children: e.agentMeta })
  ] }) : null;
}
function KT({ item: e, actions: t, onClose: a, returnFocusTo: r, feed: o, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = k(), w = iv(e, o, d);
  return /* @__PURE__ */ n(rt, { kind: "drawer", labelledBy: h, onClose: a, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: F.body, children: [
    /* @__PURE__ */ n(dv, { item: e, showKey: u }),
    /* @__PURE__ */ l("div", { className: F.summary, children: [
      /* @__PURE__ */ n("h2", { className: F.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: F.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: F.kv, children: w.map(([f, y, N]) => /* @__PURE__ */ l("div", { className: F.row, children: [
      /* @__PURE__ */ n("dt", { className: F.label, children: f }),
      /* @__PURE__ */ n("dd", { className: F.value, children: y })
    ] }, N ?? f)) }),
    /* @__PURE__ */ n(uv, { item: e }),
    /* @__PURE__ */ l("div", { className: F.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: F.actions, children: t }),
      c && /* @__PURE__ */ n("p", { className: F.note, children: c })
    ] }),
    /* @__PURE__ */ n(sv, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const hv = "_root_3azmy_2", mv = "_list_3azmy_7", wv = "_item_3azmy_12", fv = "_box_3azmy_18", _v = "_text_3azmy_23", vv = "_note_3azmy_28", Je = {
  root: hv,
  list: mv,
  item: wv,
  box: fv,
  text: _v,
  note: vv
};
function zt({ items: e, note: t, density: a }) {
  return /* @__PURE__ */ l("div", { className: Je.root, "data-density": a, children: [
    /* @__PURE__ */ n("ul", { className: `${Je.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Je.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Je.box, children: /* @__PURE__ */ n(vn, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Je.text, children: r.text })
    ] }, r.text)) }),
    t !== void 0 && /* @__PURE__ */ n("p", { className: `${Je.note} ward-checklist-note`, children: t })
  ] });
}
const bv = "_rail_znbbp_2", pv = "_k_znbbp_11", gv = "_head_znbbp_19", yv = "_section_znbbp_25", Nv = "_card_znbbp_39", kv = "_strip_znbbp_46", $v = "_skeleton_znbbp_60", Cv = "_skeletonLabel_znbbp_74", Sv = "_bar_znbbp_80", Rv = "_note_znbbp_89", fe = {
  rail: bv,
  k: pv,
  head: gv,
  section: yv,
  card: Nv,
  strip: kv,
  skeleton: $v,
  skeletonLabel: Cv,
  bar: Sv,
  note: Rv
};
function Tv(e) {
  return (t) => e == null ? void 0 : e(t);
}
function Yt({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: fe.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: fe.k, children: e }),
    t
  ] });
}
function xv({ column: e, count: t }) {
  return /* @__PURE__ */ l("div", { className: fe.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: fe.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${t} ${t === 1 ? "item" : "items"}` }),
    Array.from({ length: t }, (a, r) => /* @__PURE__ */ n("span", { className: fe.bar, "aria-hidden": "true" }, r))
  ] });
}
function Lv({ draft: e, sample: t, open: a, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Yf, { column: o, items: t.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: a, feed: r }, o.id));
}
function Av(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Lv, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((t) => /* @__PURE__ */ n(xv, { column: t, count: e.sample.filter((a) => a.stage === t.id).length }, t.id));
}
function GT(e) {
  const t = Tv(e.onOpen), a = er(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: fe.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${fe.k} ${fe.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Yt, { title: "Card", children: /* @__PURE__ */ n("div", { className: fe.card, children: a && /* @__PURE__ */ n(Ft, { item: a, fields: e.draft.fields, onOpen: t, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Yt, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: fe.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Av, { ...e, open: t }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: fe.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Yt, { title: "Effect of this config", children: /* @__PURE__ */ n(zt, { items: e.effects, density: "compact" }) })
  ] });
}
function Ev(e, t) {
  return (a) => {
    e.current = a, t(a);
  };
}
function Iv(e) {
  return Math.ceil(e.length / 2);
}
function Mv(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function tr(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Bv(e, t, a, r) {
  if (t.current.has(e.id)) return;
  t.current.add(e.id);
  const o = tr(e);
  o !== void 0 && a(o), r(Mv(e.type));
}
function Pv(e, t, a, r, o) {
  S(() => {
    if (e !== null)
      return e.subscribe(t, (i) => Bv(i, a, r, o));
  }, [e, t, a, r, o]);
}
function jv(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function qv(e, t) {
  return t ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Ov(e, t) {
  return t !== void 0 ? ue(e.timeInStage) + " · waits on " + t.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Hv(e, t) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + B.height.card + " + " + B.height.cardRow + " * " + String(Iv(t ?? [])) + ")"
  };
}
function Dv(e, t) {
  return /* @__PURE__ */ n("span", { className: (t ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Fv(e, t) {
  return e.cost !== void 0 && (t ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: le(e.cost) }) : null;
}
function zv(e, t) {
  return e.jiraKey !== void 0 && (t ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Wv(e, t, a, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: r }, connection: a ?? "live", turn: e.turn });
}
function Kv(e, t, a) {
  return t === void 0 ? e.finding ?? "" : a ?? "";
}
function Gv(e, t) {
  return t === void 0 ? e : Ev(e, t.ref);
}
function Uv(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ut(e) {
  return e === !0 ? "true" : void 0;
}
function nr(e) {
  const t = e.item, a = t.run, r = a !== void 0, o = _(null), i = Nt(o), s = _(/* @__PURE__ */ new Set()), [c, d] = p(jv(t));
  Pv(e.feed, t.key, s, d, i);
  const u = qv(t, r), h = Ov(t, a), w = Hv(t, e.fields), f = Kv(t, a, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...Uv(e),
      className: "ward-workcard",
      "data-flagged": ut(t.flagged),
      "data-selected": ut(e.selected),
      style: w,
      ref: Gv(o, e.rovingItem),
      onClick: () => e.onOpen(t.key),
      children: [
        Dv(t, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: t.title, children: t.title }),
        t.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Fv(t, e.fields),
          zv(t, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          Wv(a, c, e.connection, t.changedAt),
          f !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function Vv({ count: e, cap: t }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(t) + ". Move " + String(e - t) + " out or raise the cap." });
}
function Yv(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Jv(e, t, a) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: a, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(t) })
    ] })
  ] });
}
function Qv(e, t) {
  return !t || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Vv, { count: e.items.length, cap: e.column.cap });
}
function Xv(e, t) {
  return e.roving ?? t;
}
function Zv(e, t) {
  return e.roving === void 0 ? t.containerProps : {};
}
function eb(e, t) {
  return e.items.map((a, r) => /* @__PURE__ */ n(
    nr,
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
function tb(e) {
  const t = k(), a = Pt({ orientation: "vertical" }), r = Xv(e, a), o = Yv(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": t, "data-overcap": ut(o), "data-gate": ut(e.column.gate), children: [
    Jv(e.column, e.items.length, t),
    Qv(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Zv(e, a), children: eb(e, r) })
  ] });
}
function nb(e) {
  let t = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (t += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (t += " · p90 " + ue(e.p90)), t;
}
function ab(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((t) => ({ value: t, label: t })), onChange: e.onOwnerChange });
}
function rb(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function UT(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: nb(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      ab(e),
      rb(e.onConfigure),
      /* @__PURE__ */ n(bn, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function ob(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function lb(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ve, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ve, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (t) => e.onChange({ ...e.config, shown: t }) });
}
function ib(e) {
  const t = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    t > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(t) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function VT(e) {
  const t = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": ut(ob(t)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: lb(e) }),
    /* @__PURE__ */ n(j, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: t.gate === !0, onChange: (a) => e.onChange({ ...e.config, cap: a }) }),
    /* @__PURE__ */ n(Ca, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    ib(t),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + t.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function YT(e) {
  const t = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    t !== void 0 ? /* @__PURE__ */ n(nr, { item: t, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null }) : null,
    /* @__PURE__ */ n(tb, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (a) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, a);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((a) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: a.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": a.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: a.text })
    ] }, a.text)) })
  ] });
}
function sb(e, t) {
  const a = tr(e);
  a !== void 0 && t(a);
}
function cb(e, t, a) {
  S(() => {
    if (e != null)
      return e.subscribe(t, (r) => sb(r, a));
  }, [e, t, a]);
}
function db(e) {
  const t = [["key", e.key]];
  return e.stream !== void 0 && t.push(["stream", e.stream.name]), e.workflow !== void 0 && t.push(["workflow", e.workflow]), e.state !== void 0 && t.push(["state", e.state.label]), t;
}
function ub(e) {
  const t = [];
  return e.timeInStage !== void 0 && t.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && t.push(["waits on", e.waitsOn]), e.cost !== void 0 && t.push(["cost", le(e.cost)]), t;
}
function hb(e, t) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(Le, { startedAt: e.startedAt, lastEvent: t === void 0 ? void 0 : { label: t, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function mb(e, t) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    t !== void 0 && t.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: t }) : null
  ] });
}
function JT(e) {
  var s;
  const t = e.item, a = t.run, [r, o] = p((s = t.run) == null ? void 0 : s.lastStep);
  cb(e.feed, t.key, o);
  const i = [...db(t), ...ub(t)];
  return /* @__PURE__ */ l(rt, { kind: "drawer", title: t.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      hb(a, r)
    ] }),
    mb(t, e.actions)
  ] });
}
const wb = "_card_1nkkx_3", fb = "_head_1nkkx_30", _b = "_mark_1nkkx_38", vb = "_name_1nkkx_50", bb = "_chips_1nkkx_71", pb = "_description_1nkkx_77", gb = "_run_1nkkx_82", yb = "_sep_1nkkx_91", Nb = "_facts_1nkkx_97", kb = "_fact_1nkkx_97", $b = "_factLabel_1nkkx_111", Cb = "_factValue_1nkkx_115", ie = {
  card: wb,
  head: fb,
  mark: _b,
  name: vb,
  chips: bb,
  description: pb,
  run: gb,
  sep: yb,
  facts: Nb,
  fact: kb,
  factLabel: $b,
  factValue: Cb
}, Sb = { live: "done", draft: "running", paused: "meta" };
function Rb(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function Tb({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ie.chips, children: e.map((t) => /* @__PURE__ */ n(m, { role: Sb[t.status], size: "tag", label: t.label ?? `${t.v} ${t.status}` }, t.v)) });
}
function xb({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ie.description, children: e });
}
function Lb({ run: e, connection: t, lastEvent: a }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: t ?? "live", lastEvent: a, turn: e.turn })
  ] });
}
function Ab({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ie.facts, children: e.map((t) => /* @__PURE__ */ l("div", { className: ie.fact, children: [
    /* @__PURE__ */ n("dt", { className: ie.factLabel, children: t.label }),
    /* @__PURE__ */ n("dd", { className: ie.factValue, children: t.value })
  ] }, t.label)) });
}
function Eb(e) {
  return e.length > 0 && e.every((t) => t.status === "paused") ? !0 : void 0;
}
function Ib({ agent: e, href: t, selected: a, connection: r = "live", lastEvent: o, facts: i, className: s }) {
  const c = { "--stream": ge(e.streamStep, "id") }, d = a ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": d,
      className: Rb(s),
      style: c,
      "data-selected": d,
      "data-paused": Eb(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ l("h3", { className: ie.head, children: [
          /* @__PURE__ */ n("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ie.name} ward-rowlink ward-target`, href: q(t), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(xb, { description: e.description }),
        /* @__PURE__ */ n(Lb, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Tb, { versions: e.versions }),
        /* @__PURE__ */ n(Ab, { facts: i })
      ]
    }
  );
}
const Mb = "_list_4dcyc_2", Bb = "_row_4dcyc_11", Pb = "_head_4dcyc_23", jb = "_id_4dcyc_30", qb = "_lock_4dcyc_35", Ob = "_reason_4dcyc_41", Hb = "_remove_4dcyc_46", Db = "_clauses_4dcyc_50", Fb = "_clause_4dcyc_50", zb = "_label_4dcyc_64", Wb = "_cell_4dcyc_71", Kb = "_value_4dcyc_76", ce = {
  list: Mb,
  row: Bb,
  head: Pb,
  id: jb,
  lock: qb,
  reason: Ob,
  remove: Hb,
  clauses: Db,
  clause: Fb,
  label: zb,
  cell: Wb,
  value: Kb
}, ar = Ne(!1);
function QT({ children: e, label: t = "Rules" }) {
  return /* @__PURE__ */ n(ar.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ce.list, "aria-label": t, children: e }) });
}
function Gb({ clause: e, ruleId: t, onChange: a }) {
  if (!a) return /* @__PURE__ */ n("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(j, { kind: r, labelHidden: !0, label: `${t} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => a(e.key, o) });
}
function Ub({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ce.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ce.reason, children: e })
  ] });
}
function Vb({ rule: e, onRemove: t }) {
  return /* @__PURE__ */ l("span", { className: ce.head, children: [
    /* @__PURE__ */ n("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Ub, { reason: e.lockedReason }),
    t && /* @__PURE__ */ n("span", { className: ce.remove, children: /* @__PURE__ */ l(b, { variant: "ghost", size: "sm", onClick: t, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Xn(e, t) {
  return e.locked ? void 0 : t;
}
function XT({ rule: e, onChange: t, onRemove: a }) {
  if (!ye(ar)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Xn(e, t);
  return /* @__PURE__ */ l("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Vb, { rule: e, onRemove: Xn(e, a) }),
    /* @__PURE__ */ n("dl", { className: ce.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ce.clause, children: [
      /* @__PURE__ */ n("dt", { className: ce.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ce.cell, children: /* @__PURE__ */ n(Gb, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const Yb = "_ladder_1xdeh_2", Jb = "_cell_1xdeh_7", Qb = "_empty_1xdeh_26", Xb = "_name_1xdeh_34", Zb = "_holder_1xdeh_40", ep = "_request_1xdeh_46", tp = "_swatches_1xdeh_51", np = "_swatch_1xdeh_51", ap = "_tilesFrame_1xdeh_78", rp = "_tiles_1xdeh_78", op = "_tile_1xdeh_78", lp = "_bar_1xdeh_117", ip = "_hex_1xdeh_128", sp = "_note_1xdeh_138", M = {
  ladder: Yb,
  cell: Jb,
  empty: Qb,
  name: Xb,
  holder: Zb,
  request: ep,
  swatches: tp,
  swatch: np,
  tilesFrame: ap,
  tiles: rp,
  tile: op,
  bar: lp,
  hex: ip,
  note: sp
}, ZT = "not validated yet, pending a CVD matrix and dark stepping";
function cp(e) {
  return e.reserved ? "reserved" : ht(e.step) ? "validated" : "partial";
}
function rr(e, t) {
  return t !== void 0 && e !== "reserved" ? `taken by ${t}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function dp(e, t) {
  return t === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function up({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Fe, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function hp(e, t) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), t());
}
function mp(e, t, a) {
  return {
    "aria-checked": t,
    "aria-disabled": a || void 0,
    tabIndex: a ? -1 : 0,
    "data-checked": t ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Zn = (e) => String(e).padStart(2, "0");
function wp(e, t, a) {
  return e === "reserved" ? "Reserved until revalidated" : a ? "yours" : t ?? rr(e, void 0);
}
function fp({ step: e, validation: t, note: a }) {
  const r = t === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: r ? `step ${Zn(e)}` : ho(e) }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: r ? a : `Step ${Zn(e)} · ${a}` })
  ] });
}
function _p({ step: e, value: t, taken: a, onChange: r, presentation: o, disabled: i }) {
  const s = cp(e), c = rr(s, a), d = c !== "free", u = d || i, h = t === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${o === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...mp(d, h, u), "data-validation": s, style: dp(e, s), onClick: f, onKeyDown: (A) => hp(A, f) }, label: y, name: w, holder: c, validation: s, note: wp(s, a, h), step: e.step };
}
const vp = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${M.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${M.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(fp, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${M.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(up, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function bp(e) {
  return vp[e.presentation](_p(e));
}
function pp(e) {
  for (const t of e)
    if (!t.reserved && !jt(t.step)) throw new Error("colour ladder renders token steps only");
}
function gp() {
  return /* @__PURE__ */ l("div", { className: `${M.cell} ward-ladder-cell ${M.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function yp(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Np = { list: M.ladder, swatches: M.swatches, tiles: M.tilesFrame };
function kp() {
  return /* @__PURE__ */ l("div", { className: `${M.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${M.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${M.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${M.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const $p = { list: gp, swatches: () => null, tiles: kp };
function Cp(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function or(e) {
  const t = e.takenBy ?? {}, a = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  pp(e.steps);
  const r = yp(e), o = $p[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(bp, { step: s, value: e.value, taken: t[s.step], onChange: a, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Cp(e.disabled === !0), className: `${Np[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: M.tiles, children: i }) : i });
}
const Sp = "_rail_s06lm_2", Rp = "_section_s06lm_12", Tp = "_sectionFlush_s06lm_22", xp = "_head_s06lm_26", Lp = "_headLabel_s06lm_34", Ap = "_sample_s06lm_42", Ep = "_sampleLabel_s06lm_47", Ip = "_sampleTitle_s06lm_54", Mp = "_sampleMeta_s06lm_59", Bp = "_trace_s06lm_65", Pp = "_traceHead_s06lm_70", jp = "_steps_s06lm_78", qp = "_step_s06lm_78", Op = "_stepTitle_s06lm_97", Hp = "_hollow_s06lm_107", Dp = "_stepBody_s06lm_115", Fp = "_stepDetail_s06lm_127", zp = "_publish_s06lm_132", Wp = "_reason_s06lm_138", Kp = "_note_s06lm_143", Gp = "_reveal_s06lm_148", $ = {
  rail: Sp,
  section: Rp,
  sectionFlush: Tp,
  head: xp,
  headLabel: Lp,
  sample: Ap,
  sampleLabel: Ep,
  sampleTitle: Ip,
  sampleMeta: Mp,
  trace: Bp,
  traceHead: Pp,
  steps: jp,
  step: qp,
  stepTitle: Op,
  hollow: Hp,
  stepBody: Dp,
  stepDetail: Fp,
  publish: zp,
  reason: Wp,
  note: Kp,
  reveal: Gp
}, ea = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Up = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Vp = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Yp = { notSimulated: "not simulated", running: "running" };
function Jp(e) {
  return e.presentation === "foundry";
}
function Qp(e, t) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const a = t.filter((r) => !r.met);
  return a.length > 0 ? `Publish is disabled: ${a.length} of ${t.length} gate conditions unmet: ${a[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Xp(e, t) {
  var r;
  const a = Up[e.status];
  return a !== void 0 ? a : ((r = t.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function Zp(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function eg(e, t) {
  if (t.length > 0 && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function tg(e) {
  if (Zp(e) && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ng(e) {
  const [t, a] = p(!1);
  S(() => a(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${$.step} ${$.reveal} ward-dryrun-step ward-reveal`, "data-in": t ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function ag(e) {
  const t = Yp[e.kind];
  return t !== void 0 ? /* @__PURE__ */ n("span", { className: $.hollow, "data-hollow": "true", role: "img", "aria-label": t }) : /* @__PURE__ */ n(Fe, { size: 6, kind: Vp[e.kind], label: e.kind });
}
function rg(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: $.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function og(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function lg(e) {
  const { step: t } = e;
  return /* @__PURE__ */ l(ng, { kind: t.kind, children: [
    /* @__PURE__ */ n(ag, { kind: t.kind }),
    /* @__PURE__ */ l("span", { className: $.stepBody, "data-current": t.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: $.stepTitle, children: t.title }),
      /* @__PURE__ */ n(rg, { detail: t.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(og, { run: e.run, kind: t.kind, connection: e.connection })
  ] });
}
function ig(e, t) {
  const a = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return t !== void 0 && a.push(ue(t)), a.join(" · ");
}
function lr(e) {
  const t = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${$.trace} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.traceHead, id: t, children: ig(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: $.steps, "aria-labelledby": t, children: e.steps.map((a, r) => /* @__PURE__ */ n(lg, { ...e, step: a }, a.title + String(r))) })
  ] });
}
function sg(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${$.sample} ${$.section}`, children: [
    /* @__PURE__ */ n("p", { className: $.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: $.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: $.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function cg(e) {
  if (e.sample === void 0) return null;
  const t = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${$.sampleMeta} ${$.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + t + " · no writes committed" });
}
function dg(e) {
  const t = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? wa(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Ht, { divided: !0, cells: t }) });
}
function ug(e) {
  const t = [];
  return e.cost !== void 0 && t.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && t.push({ value: wa(e.turns[0], e.turns[1]), label: "Turns used" }), t;
}
function hg(e) {
  const t = ug(e.run);
  return t.length === 0 ? null : t.length === 1 ? /* @__PURE__ */ l("p", { className: $.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: t[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: t[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: $.sectionFlush, children: /* @__PURE__ */ n(Ht, { divided: !0, cells: t }) });
}
function ir(e) {
  const t = k();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${$.reason} ward-checklist-note`, id: t, children: e.reason }),
    /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: t })
  ] }) : /* @__PURE__ */ n(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function mg(e) {
  return /* @__PURE__ */ l("div", { className: `${$.publish} ${$.section}`, children: [
    /* @__PURE__ */ n(ir, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: $.note, children: e.note })
  ] });
}
function wg(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${$.publish} ${$.section}`, children: /* @__PURE__ */ n(ir, { reason: e.reason, onPublish: e.onPublish }) });
}
function sr(e) {
  return /* @__PURE__ */ l("div", { className: `${$.head} ${$.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: $.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: ea[e.run.status].role, label: ea[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function fg(e, t) {
  const [a, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((t == null ? void 0 : t.subscribe) === void 0 || e.status !== "running"))
      return t.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((s = o.step) == null ? void 0 : s.label) ?? "step", detail: (c = o.step) == null ? void 0 : c.tool }];
        });
      });
  }, [t, e.status]), a;
}
function _g(e) {
  var a;
  eg(e.run, e.checklist);
  const t = ((a = e.feed) == null ? void 0 : a.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(sr, { run: e.run, foundry: !1, connection: t }),
    /* @__PURE__ */ n(sg, { sample: e.run.sample }),
    /* @__PURE__ */ n(lr, { run: e.run, steps: e.run.steps, connection: t, foundry: !1 }),
    /* @__PURE__ */ n(dg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(zt, { items: e.checklist }) }),
    /* @__PURE__ */ n(mg, { reason: Qp(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function vg(e) {
  var r;
  const t = fg(e.run, e.feed);
  tg(e.run);
  const a = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${$.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(sr, { run: e.run, foundry: !0, connection: a }),
    /* @__PURE__ */ n(cg, { sample: e.run.sample }),
    /* @__PURE__ */ n(lr, { run: e.run, steps: t, connection: a, foundry: !0 }),
    /* @__PURE__ */ n(hg, { run: e.run }),
    /* @__PURE__ */ n("div", { className: $.section, children: /* @__PURE__ */ n(zt, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(wg, { reason: Xp(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function ex(e) {
  return Jp(e) ? /* @__PURE__ */ n(vg, { ...e }) : /* @__PURE__ */ n(_g, { ...e });
}
const bg = "_list_142ip_3", pg = "_row_142ip_9", gg = "_condition_142ip_18", yg = "_action_142ip_24", $t = {
  list: bg,
  row: pg,
  condition: gg,
  action: yg
}, cr = Ne(!1);
function tx({ children: e, label: t = "Handoff rules" }) {
  return /* @__PURE__ */ n(cr.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: $t.list, "aria-label": t, children: e }) });
}
function nx({ rule: e }) {
  if (!ye(cr)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: $t.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: $t.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: $t.action, children: e.then })
  ] });
}
const Ng = "_move_tmppt_3", kg = {
  move: Ng
};
function rn(e, t, a) {
  if (a < 0 || a >= e.length) return e;
  const r = e.slice(), [o] = r.splice(t, 1);
  return r.splice(a, 0, o), r;
}
function dr(e, t) {
  return t === "up" ? e - 1 : e + 1;
}
function ur(e, t, a) {
  return `${e} moved to position ${t + 1} of ${a}.`;
}
function ta(e, t, a) {
  return e.querySelector(`[data-move="${t}-${a}"]`);
}
function $g(e) {
  return e === "up" ? "down" : "up";
}
function Cg(e, t) {
  const a = ta(e, t.id, t.direction) ?? ta(e, t.id, $g(t.direction));
  a == null || a.focus();
}
function hr() {
  const e = _(null), [t, a] = p(null), [r, o] = p("");
  return S(() => {
    e.current !== null && t !== null && Cg(e.current, t);
  }, [t]), { root: e, announcement: r, moved: (s, c) => {
    a(s), o(c);
  } };
}
function mr({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function At({ id: e, name: t, direction: a, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: `${kg.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${a}`, "aria-label": `Move ${t} ${a}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: a === "up" ? "↑" : "↓" }) });
}
const Sg = "_body_1jd1i_2", Rg = "_title_1jd1i_8", Tg = "_section_1jd1i_13", xg = "_legend_1jd1i_18", Lg = "_stages_1jd1i_26", Ag = "_stage_1jd1i_26", Eg = "_stageIndex_1jd1i_44", Ig = "_stageName_1jd1i_50", Mg = "_footer_1jd1i_59", Bg = "_note_1jd1i_66", Pg = "_reason_1jd1i_71", jg = "_actions_1jd1i_76", qg = "_webHead_1jd1i_83", Og = "_kicker_1jd1i_92", Hg = "_webTitle_1jd1i_99", Dg = "_webBody_1jd1i_105", Fg = "_webSection_1jd1i_109", zg = "_sectionHead_1jd1i_121", Wg = "_sectionNote_1jd1i_129", Kg = "_formLabel_1jd1i_134", Gg = "_identityRow_1jd1i_139", Ug = "_nameCell_1jd1i_145", Vg = "_keyCell_1jd1i_150", Yg = "_colourCell_1jd1i_154", Jg = "_colourStatus_1jd1i_161", Qg = "_webStages_1jd1i_166", Xg = "_webStageList_1jd1i_172", Zg = "_webStage_1jd1i_166", ey = "_webIndex_1jd1i_191", ty = "_webStageName_1jd1i_196", ny = "_webMoves_1jd1i_201", ay = "_addStage_1jd1i_215", ry = "_addStageButton_1jd1i_223", oy = "_addStageNote_1jd1i_231", ly = "_webFooter_1jd1i_236", iy = "_webFooterNotes_1jd1i_244", sy = "_webNote_1jd1i_251", v = {
  body: Sg,
  title: Rg,
  section: Tg,
  legend: xg,
  stages: Lg,
  stage: Ag,
  stageIndex: Eg,
  stageName: Ig,
  footer: Mg,
  note: Bg,
  reason: Pg,
  actions: jg,
  webHead: qg,
  kicker: Og,
  webTitle: Hg,
  webBody: Dg,
  webSection: Fg,
  sectionHead: zg,
  sectionNote: Wg,
  formLabel: Kg,
  identityRow: Gg,
  nameCell: Ug,
  keyCell: Vg,
  colourCell: Yg,
  colourStatus: Jg,
  webStages: Qg,
  webStageList: Xg,
  webStage: Zg,
  webIndex: ey,
  webStageName: ty,
  webMoves: ny,
  addStage: ay,
  addStageButton: ry,
  addStageNote: oy,
  webFooter: ly,
  webFooterNotes: iy,
  webNote: sy
}, cy = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], wr = "not in catalogue";
function dy(e, t) {
  const a = e.map((r) => ({ value: r, label: r }));
  return e.includes(t) ? a : [{ value: t, label: `${t || "(unnamed)"} · ${wr}` }, ...a];
}
function uy({ stage: e, index: t, catalogue: a, onName: r }) {
  const o = `Stage ${t + 1} name`;
  if (!a) return /* @__PURE__ */ n(j, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = a.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${wr}`;
  return /* @__PURE__ */ n(j, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: dy(a, e.name), invalid: i, onChange: r });
}
function fr(e, t) {
  return e.name || `stage ${t + 1}`;
}
function hy(e) {
  const t = _([]), a = _(0);
  for (; t.current.length < e; ) t.current.push(`stage-row-${a.current++}`);
  return t.current.length > e && (t.current = t.current.slice(0, e)), t;
}
function my({ id: e, stage: t, index: a, total: r, catalogue: o, onReplace: i, onMove: s }) {
  const c = fr(t, a), d = t.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: v.webIndex, "aria-hidden": "true", children: String(a + 1) }),
    /* @__PURE__ */ n("div", { className: v.webStageName, children: /* @__PURE__ */ n(uy, { stage: t, index: a, catalogue: o, onName: (u) => i({ ...t, name: u }) }) }),
    /* @__PURE__ */ n(j, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${a + 1} kind`, value: t.kind, options: cy, onChange: (u) => i({ ...t, kind: u }) }),
    /* @__PURE__ */ l("span", { className: v.webMoves, children: [
      a > 0 && /* @__PURE__ */ n(At, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      a < r - 1 && /* @__PURE__ */ n(At, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function wy({ stages: e, onChange: t, catalogue: a }) {
  const r = hy(e.length), o = hr(), i = (c, d) => {
    const u = dr(c, d);
    r.current = rn(r.current, c, u), o.moved({ id: r.current[u], direction: d }, ur(fr(e[c], c), u, e.length)), t(rn(e, c, u));
  }, s = (c, d) => t(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ l("div", { className: v.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(my, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: a, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(mr, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: v.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: v.addStageButton, onClick: () => t([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const fy = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], _y = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], vy = "A new stream starts as a draft. Nothing runs on it until you publish it.", by = "Create is disabled: name the stream and give it a key first.", py = "reorder with the ↑ ↓ buttons · min 2";
function gn(e, t) {
  return !e.reserved && ht(e.step) && t[e.step] === void 0;
}
function gy(e, t) {
  const a = e.find((r) => gn(r, t));
  return a ? a.step : 1;
}
function yy({ stages: e, onMove: t }) {
  const a = hr(), r = (o, i) => {
    const s = dr(o, i);
    a.moved({ id: e[o].id, direction: i }, ur(e[o].name, s, e.length)), t(o, s);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: a.root, className: v.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: v.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: v.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ n(At, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(At, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(mr, { text: a.announcement })
  ] });
}
function Ny({ reason: e, onCreate: t, onDraft: a }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: v.footer, children: [
    /* @__PURE__ */ n("p", { className: v.note, children: vy }),
    e && /* @__PURE__ */ n("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: v.actions, children: [
      /* @__PURE__ */ n(b, { variant: "secondary", onClick: a, children: "Save draft" }),
      e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", onClick: t, children: "Create stream" })
    ] })
  ] });
}
function ky(e, t) {
  return e !== "" && t !== "" ? null : by;
}
function $y(e) {
  const { owners: t, ladder: a, takenBy: r = {}, policies: o = _y, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = k(), [h, w] = p(""), [f, y] = p(""), [N, A] = p(t[0].value), [O, me] = p(() => gy(a, r)), [re, Ee] = p(e.stages ?? fy), [Ye, T] = p(o[0].value), J = { name: h, key: f, streamStep: O, owner: N, stages: re, policy: Ye }, ke = ky(h, f);
  return /* @__PURE__ */ n(rt, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ l("div", { className: v.body, children: [
    /* @__PURE__ */ n("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ n(j, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ n(j, { kind: "select", label: "Owner", value: N, onChange: A, options: t })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ n(or, { label: "Stream colour", steps: a, value: O, onChange: me, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: v.section, children: [
      /* @__PURE__ */ n("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ n(yy, { stages: re, onMove: (ze, Fr) => Ee(rn(re, ze, Fr)) })
    ] }),
    /* @__PURE__ */ n(Va, { legend: "Loop policy", options: o, value: Ye, onChange: T }),
    /* @__PURE__ */ n(Ny, { reason: ke, onCreate: () => i(J), onDraft: () => s(J) })
  ] }) });
}
const _r = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Cy = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Sy(e, t, a, r, o, i) {
  var c;
  const s = ((c = _r.find((d) => d.value === o)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: t, owner: a, colourStep: r, writePolicyMode: s, stages: i };
}
function Ry(e, t) {
  return Ty(e) && xy(e, t) && Ly(e);
}
function Ty(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function xy(e, t) {
  return e.colourStep === null || gn({ step: e.colourStep }, t);
}
function Ly(e) {
  return e.stages.length >= 2 && e.stages.every((t) => t.name.trim() !== "");
}
function Ay(e, t) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : gn({ step: e }, t) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ey({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Iy({ ready: e, draft: t, agentStage: a, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: v.webFooter, children: [
    /* @__PURE__ */ l("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ n(Ey, { stage: a }),
      !e && /* @__PURE__ */ n("p", { id: i, className: v.reason, children: Cy })
    ] }),
    o && /* @__PURE__ */ n(b, { variant: "secondary", onClick: () => o(t), children: "Save draft" }),
    e ? /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(t), children: "Create stream" }) : /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function My({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: v.webHead, children: [
    /* @__PURE__ */ n("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function By({ name: e, setName: t, streamKey: a, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: v.webSection, children: [
    /* @__PURE__ */ n("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: v.identityRow, children: [
      /* @__PURE__ */ n("div", { className: v.nameCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Name", value: e, onChange: t }) }),
      /* @__PURE__ */ n("div", { className: v.keyCell, children: /* @__PURE__ */ n(j, { variant: "form", label: "Key", value: a, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function Py(e) {
  const t = k(), a = k(), r = e.takenBy ?? {}, [o, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [N, A] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), O = Sy(o, s, d, h, f, N), me = Ry(O, r), re = N.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ l("div", { className: v.colourCell, children: [
    /* @__PURE__ */ n("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(or, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ye = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: v.colourStatus, "data-colour-status": "", children: Ay(h, r) }),
    /* @__PURE__ */ n(j, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ l(rt, { kind: "modal", wide: !0, flush: !0, labelledBy: a, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(My, { titleId: a }),
    /* @__PURE__ */ l("div", { className: v.webBody, children: [
      /* @__PURE__ */ n(By, { name: o, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ye }),
      e.fields && /* @__PURE__ */ n("section", { className: v.webSection, "data-stream-fields": "", children: e.fields }),
      /* @__PURE__ */ l("section", { className: v.webSection, children: [
        /* @__PURE__ */ l("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: v.sectionNote, children: py })
        ] }),
        /* @__PURE__ */ n(wy, { stages: N, onChange: A })
      ] }),
      /* @__PURE__ */ n("section", { className: v.webSection, children: /* @__PURE__ */ n(Va, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: _r, onChange: y }) }),
      /* @__PURE__ */ n(Iy, { ready: me, draft: O, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: t })
    ] })
  ] });
}
function ax(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Py, { ...e }) : /* @__PURE__ */ n($y, { ...e });
}
const jy = "_row_bs8hc_2", qy = "_cell_bs8hc_6", Oy = "_condition_bs8hc_11", Hy = "_action_bs8hc_18", Dy = "_contract_bs8hc_24", Fy = "_contractCondition_bs8hc_33", zy = "_contractAction_bs8hc_39", ne = {
  row: jy,
  cell: qy,
  condition: Oy,
  action: Hy,
  contract: Dy,
  contractCondition: Fy,
  contractAction: zy
}, vr = ["advance", "block", "escalate", "requestReview"], na = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Et(e, t) {
  return (t == null ? void 0 : t.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function yn(e, t, a, r) {
  return a || !t ? /* @__PURE__ */ n("span", { className: ne.action, children: na[e.then] }) : /* @__PURE__ */ n(
    j,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => t({ ...e, then: o }),
      options: vr.map((o) => ({ value: o, label: na[o] }))
    }
  );
}
function Wy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n("span", { className: ne.condition, title: Et(e, r), children: Et(e, r) }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: yn(e, t, a) })
  ] });
}
function Ky({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: ne.row, children: [
    /* @__PURE__ */ l("td", { className: ne.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "When" }),
      /* @__PURE__ */ n("span", { className: ne.condition, children: Et(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: ne.cell, children: yn(e, t, a) })
  ] });
}
function Gy({ rule: e, onChange: t, readOnly: a, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: ne.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "When" }),
    /* @__PURE__ */ n("span", { className: ne.contractCondition, children: Et(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ n("span", { className: ne.contractAction, children: yn(e, t, a, !0) })
  ] });
}
const Uy = { two: Ky, four: Wy, contract: Gy };
function rx(e) {
  var a;
  if (!vr.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const t = Uy[((a = e.presentation) == null ? void 0 : a.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(t, { ...e });
}
const Vy = "_column_g1uat_2", Yy = "_head_g1uat_17", Jy = "_index_g1uat_23", Qy = "_name_g1uat_29", Xy = "_meta_g1uat_38", Zy = "_mono_g1uat_43", eN = "_gate_g1uat_50", tN = "_reviewersLabel_g1uat_57", nN = "_reviewers_g1uat_57", aN = "_reviewer_g1uat_57", rN = "_agents_g1uat_74", oN = "_workflowColumn_g1uat_79", lN = "_workflowHead_g1uat_96", iN = "_stageRow_g1uat_102", sN = "_stageLabel_g1uat_109", cN = "_workflowTitle_g1uat_116", dN = "_workflowMeta_g1uat_122", uN = "_workflowGate_g1uat_127", hN = "_gateNote_g1uat_135", mN = "_cardNote_g1uat_140", wN = "_reviewerList_g1uat_145", fN = "_reviewerRow_g1uat_151", _N = "_reviewerMark_g1uat_157", vN = "_reviewerName_g1uat_167", bN = "_terminalCard_g1uat_173", pN = "_terminalCount_g1uat_182", gN = "_workflowAgents_g1uat_188", yN = "_mount_g1uat_194", R = {
  column: Vy,
  head: Yy,
  index: Jy,
  name: Qy,
  meta: Xy,
  mono: Zy,
  gate: eN,
  reviewersLabel: tN,
  reviewers: nN,
  reviewer: aN,
  agents: rN,
  workflowColumn: oN,
  workflowHead: lN,
  stageRow: iN,
  stageLabel: sN,
  workflowTitle: cN,
  workflowMeta: dN,
  workflowGate: uN,
  gateNote: hN,
  cardNote: mN,
  reviewerList: wN,
  reviewerRow: fN,
  reviewerMark: _N,
  reviewerName: vN,
  terminalCard: bN,
  terminalCount: pN,
  workflowAgents: gN,
  mount: yN
}, NN = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function Nn(e, t = String) {
  return e === void 0 ? "—" : t(e);
}
function br(e) {
  return `${Math.round(e * 100)}%`;
}
function kN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: R.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: R.reviewers, children: t.map((a) => /* @__PURE__ */ n("li", { className: R.reviewer, children: a }, a)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ht, { cells: [
      { value: br(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function $N({ stage: e }) {
  return /* @__PURE__ */ n(Ht, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Nn(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function CN({ stage: e, titleId: t }) {
  return /* @__PURE__ */ l("header", { className: R.head, children: [
    /* @__PURE__ */ n("span", { className: R.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: R.name, id: t, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: NN[e.kind] })
  ] });
}
function SN({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: R.meta, children: [
    /* @__PURE__ */ l("span", { className: R.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: R.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function RN({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(kN, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n($N, { stage: e }) : null;
}
function TN({ onMount: e }) {
  return e ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function xN({ stage: e, agents: t = [], onMount: a, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: R.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(CN, { stage: e, titleId: o }),
    /* @__PURE__ */ n(SN, { stage: e }),
    /* @__PURE__ */ n(RN, { stage: e }),
    /* @__PURE__ */ n("div", { className: R.agents, children: t.map((s) => /* @__PURE__ */ n(Ib, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(TN, { onMount: a })
  ] });
}
const LN = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function AN({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: R.reviewerList, children: e.map((t, a) => /* @__PURE__ */ l("li", { className: R.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: R.reviewerMark, "aria-hidden": "true", children: t.initials }),
    /* @__PURE__ */ n("span", { className: R.reviewerName, children: t.name })
  ] }, `${a}-${t.name}`)) });
}
function EN({ stage: e }) {
  const t = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: R.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: R.gateNote, children: [
      "No agent can advance an item out of this stage.",
      t.length === 0 ? null : " Reviewers:"
    ] }),
    t.length === 0 ? null : /* @__PURE__ */ n(AN, { reviewers: t }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: R.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: br(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function IN(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function MN({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: R.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: R.terminalCount, children: Nn(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: R.cardNote, children: IN(e.rolledBackThisWeek) })
  ] });
}
function BN(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function PN(e) {
  if (e.kind === "terminal") return `${Nn(e.closedThisWeek)} this week`;
  const t = BN(e.count);
  return e.medianWait === void 0 ? t : `${t} · median wait ${e.medianWait}`;
}
function jN({ stage: e, titleId: t }) {
  const a = LN[e.kind];
  return /* @__PURE__ */ l("header", { className: R.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: R.stageRow, children: [
      /* @__PURE__ */ l("span", { className: R.stageLabel, id: `${t}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      a === void 0 ? null : /* @__PURE__ */ n(m, { ...a, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: t, className: R.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: R.workflowMeta, children: PN(e) })
  ] });
}
function qN(e) {
  return e === "entry" || e === "agent";
}
function ON({ stage: e, onMount: t }) {
  return t === void 0 || !qN(e.kind) ? null : /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", className: R.mount, onClick: (a) => t(e.index, a.currentTarget), children: "+ Mount agent" });
}
function HN({ stage: e, agentCards: t, onMount: a }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: R.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(jN, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(EN, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(MN, { stage: e }) : null,
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: R.workflowAgents, children: t }),
    /* @__PURE__ */ n(ON, { stage: e, onMount: a })
  ] });
}
function DN(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function ox(e) {
  return DN(e) ? /* @__PURE__ */ n(HN, { ...e }) : /* @__PURE__ */ n(xN, { ...e });
}
const FN = "_row_1tdra_6", zN = "_name_1tdra_12", WN = "_compactRow_1tdra_13", KN = "_compactName_1tdra_13", GN = "_cell_1tdra_30", UN = "_chain_1tdra_45", VN = "_owner_1tdra_51", YN = "_mono_1tdra_57", JN = "_compactCell_1tdra_79", QN = "_stack_1tdra_96", XN = "_stat_1tdra_103", ZN = "_identityLine_1tdra_110", e1 = "_identity_1tdra_110", t1 = "_ownerLine_1tdra_140", n1 = "_link_1tdra_160", a1 = "_gateMark_1tdra_166", r1 = "_emptyChain_1tdra_171", o1 = "_arrow_1tdra_177", l1 = "_muted_1tdra_182", i1 = "_define_1tdra_187", s1 = "_statValue_1tdra_194", c1 = "_policyId_1tdra_200", d1 = "_sub_1tdra_205", g = {
  row: FN,
  name: zN,
  compactRow: WN,
  compactName: KN,
  cell: GN,
  chain: UN,
  owner: VN,
  mono: YN,
  compactCell: JN,
  stack: QN,
  stat: XN,
  identityLine: ZN,
  identity: e1,
  ownerLine: t1,
  link: n1,
  gateMark: a1,
  emptyChain: r1,
  arrow: o1,
  muted: l1,
  define: i1,
  statValue: s1,
  policyId: c1,
  sub: d1
};
function pr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: t, metaKey: a, shiftKey: r, altKey: o, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function u1(e) {
  const t = [`${e.live} live`];
  return e.draft > 0 && t.push(`${e.draft} draft`), e.paused > 0 && t.push(`${e.paused} paused`), t.join(" · ");
}
function h1(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function gr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function m1(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${gr(e.members)}`;
}
function w1(e, t) {
  const a = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: /* @__PURE__ */ l("span", { className: g.stack, children: [
    /* @__PURE__ */ l("span", { className: g.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${g.identity} ward-identity`, "data-draft": a, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${g.compactName} ward-rowlink ward-target`, href: q(t), "data-draft": a, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: a ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: g.ownerLine, children: m1(e) })
  ] }) });
}
function yr({ name: e, gate: t, look: a, size: r }) {
  return /* @__PURE__ */ l(x, { children: [
    t ? /* @__PURE__ */ n("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...a, size: r, label: e }),
    t ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function f1(e, t, a) {
  if (e !== t) return { role: "soft" };
  const r = wt(a);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function _1({ stages: e, streamStep: t }) {
  const a = e.findIndex((o) => o.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ n("span", { className: `${g.chain} ward-chiprow`, children: e.map((o, i) => /* @__PURE__ */ l("span", { className: g.link, children: [
    /* @__PURE__ */ n(yr, { name: o.name, gate: o.gate === !0, look: f1(i, a, t), size: "tag" }),
    i === r ? null : /* @__PURE__ */ n("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${o.name}${i}`)) });
}
function v1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ l("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: g.define, children: "Define workflow" })
  ] }) : _1(e) });
}
function Nr(e) {
  return e === void 0 ? void 0 : !0;
}
function aa(e, t, a, r) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: a }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Nr(r), children: e }),
    t === void 0 ? null : /* @__PURE__ */ n("span", { className: g.sub, children: t })
  ] }) });
}
function b1(e) {
  return /* @__PURE__ */ n("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: g.stat, children: [
    /* @__PURE__ */ n("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: g.sub, children: e.summary })
  ] }) });
}
function p1(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function g1({ stream: e, href: t, presentation: a }) {
  const r = h1(a.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, onClick: pr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": ge(e.streamStep, "chip") }, children: [
    w1(e, t),
    v1(e),
    aa(p1(e.agents), e.agents === void 0 ? void 0 : u1(e.agents), "—"),
    b1(e.policy),
    aa(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function y1(e) {
  var t;
  return ((t = e.presentation) == null ? void 0 : t.columns) === 5;
}
function lx(e) {
  if (y1(e)) return g1(e);
  const { stream: t, href: a } = e;
  return /* @__PURE__ */ l("tr", { className: g.row, onClick: pr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("a", { className: `${g.name} ward-target`, href: q(a), children: t.name }),
      /* @__PURE__ */ n(m, { ...Ot(t.key, t.streamStep) }),
      t.draft && /* @__PURE__ */ n(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ n("span", { className: g.chain, children: t.stages.map((r) => /* @__PURE__ */ n("span", { className: g.link, children: /* @__PURE__ */ n(yr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, children: /* @__PURE__ */ l("span", { className: g.mono, children: [
      t.agents.live,
      " live · ",
      t.agents.draft,
      " draft · ",
      t.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: g.cell, children: [
      /* @__PURE__ */ n("span", { className: g.owner, children: t.owner }),
      /* @__PURE__ */ n("span", { className: g.mono, children: gr(t.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, title: t.inFlightHint, "data-raised": Nr(t.inFlightHint), children: ae(t.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: g.mono, children: t.p50 === void 0 ? "" : ue(t.p50) }) })
  ] });
}
const N1 = "_row_2u4ll_2", k1 = "_name_2u4ll_16", $1 = "_scope_2u4ll_24", It = {
  row: N1,
  name: k1,
  scope: $1
};
function kn(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function C1(e) {
  return e === void 0 ? `${It.row} ward-toolrow` : `${It.row} ward-toolrow ${e}`;
}
function S1(e, t) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (t == null ? void 0 : t.lockedReasonFallback) ?? "locked by stream policy" };
}
function R1({ id: e, reasonId: t, tool: a, state: r, onChange: o }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: a.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? t : void 0,
      onChange: (i) => {
        r.locked || o(i.target.checked);
      }
    }
  );
}
function T1({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: kn(e) });
}
function x1({ tool: e, state: t, reasonId: a }) {
  const r = t.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: t.locked ? a : void 0, className: `${It.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function L1(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function ix({ tool: e, onChange: t, presentation: a }) {
  const r = k(), o = k(), i = S1(e, a), s = L1(a);
  return /* @__PURE__ */ l(s, { className: C1(a == null ? void 0 : a.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(R1, { id: r, reasonId: o, tool: e, state: i, onChange: t }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${It.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(x1, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(T1, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const A1 = "_strip_4ppv9_2", E1 = "_well_4ppv9_11", I1 = "_head_4ppv9_18", M1 = "_name_4ppv9_24", B1 = "_chart_4ppv9_32", P1 = "_segment_4ppv9_38", j1 = "_detailedChart_4ppv9_44", q1 = "_rail_4ppv9_57", O1 = "_section_4ppv9_63", H1 = "_label_4ppv9_74", D1 = "_note_4ppv9_91", V = {
  strip: A1,
  well: E1,
  head: I1,
  name: M1,
  chart: B1,
  segment: P1,
  detailedChart: j1,
  rail: q1,
  section: O1,
  label: H1,
  note: D1
}, F1 = "No item in flight to preview.", z1 = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", W1 = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", on = [1, 2, 3, 4, 5, 6], Mt = 100;
function K1(e, t) {
  return t.has(e) ? ge(e, "id") : "var(--ward-color-line)";
}
function G1({ draft: e, streams: t }) {
  const a = /* @__PURE__ */ new Set([e.streamStep, ...t.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: on.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * Mt,
      y: "0",
      width: Mt,
      height: "8",
      fill: K1(r, a),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function U1(e) {
  const t = e.slice(0, on.length);
  for (; t.length < on.length; ) t.push({ key: "—", name: "unclaimed", streamStep: null });
  return t;
}
function V1({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((t, a) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(a * Mt),
        y: "0",
        width: String(Mt),
        height: "40",
        style: { fill: ge(t.streamStep, "chip") }
      },
      t.key + String(a)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((t, a) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: t.name, children: t.key }, t.key + String(a))) })
  ] });
}
function kr(e) {
  return (t) => e == null ? void 0 : e(t);
}
function bt({ label: e, children: t }) {
  const a = k();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": a, children: [
    /* @__PURE__ */ n("h4", { id: a, className: V.label, children: e }),
    t
  ] });
}
function Y1({ sample: e, sampleEmpty: t, draft: a, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: t ?? F1 }) : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ft, { item: { ...e, streamStep: wt(a.streamStep) }, onOpen: kr(r), feed: null }) });
}
function J1({ draft: e }) {
  const t = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: t, children: [
    /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...Ot(e.key, e.streamStep) })
  ] });
}
function Q1(e) {
  const t = U1(e.identities ?? [e.draft, ...e.streams]), a = t[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(bt, { label: "Board card", children: /* @__PURE__ */ n(Y1, { ...e, draft: a }) }),
    /* @__PURE__ */ n(bt, { label: "Streams index row", children: /* @__PURE__ */ n(J1, { draft: a }) }),
    /* @__PURE__ */ l(bt, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(V1, { identities: t }),
      /* @__PURE__ */ n("p", { className: V.note, children: z1 })
    ] }),
    /* @__PURE__ */ n(bt, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: W1 }) })
  ] });
}
function X1({ draft: e, sample: t, streams: a, onOpen: r }) {
  const o = { "--stream": ge(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Fe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...Ot(e.key, e.streamStep) })
    ] }),
    t === void 0 ? null : /* @__PURE__ */ n("div", { className: V.well, children: /* @__PURE__ */ n(Ft, { item: { ...t, streamStep: e.streamStep }, onOpen: kr(r) }) }),
    /* @__PURE__ */ n(G1, { draft: e, streams: a })
  ] });
}
function sx(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Q1, { ...e }) : /* @__PURE__ */ n(X1, { ...e });
}
const Z1 = "_row_ixlg5_6", ek = "_headCell_ixlg5_10", tk = "_cell_ixlg5_11", nk = "_name_ixlg5_23", ak = "_consequence_ixlg5_29", rk = "_governed_ixlg5_36", ok = "_control_ixlg5_42", lk = "_byRole_ixlg5_48", ik = "_webControl_ixlg5_59", sk = "_webConsequence_ixlg5_65", ck = "_webGoverned_ixlg5_71", W = {
  row: Z1,
  headCell: ek,
  cell: tk,
  name: nk,
  consequence: ak,
  governed: rk,
  control: ok,
  byRole: lk,
  webControl: ik,
  webConsequence: sk,
  webGoverned: ck
};
function dk({
  capability: e,
  cell: t,
  onChange: a
}) {
  return t.value === "byRole" ? /* @__PURE__ */ n("span", { className: W.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: W.control, children: [
    /* @__PURE__ */ n(
      Ve,
      {
        label: `${e.name} · ${t.stream}`,
        checked: t.value !== "off",
        onChange: (r) => a(t.streamStep, r)
      }
    ),
    t.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "Pilot" })
  ] });
}
function uk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: W.headCell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: W.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: W.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(dk, { capability: e, cell: r, onChange: a }) }, r.streamStep))
  ] });
}
function hk(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function mk({ name: e, cell: t, onChange: a }) {
  if (t.value === "byRole") return /* @__PURE__ */ n("span", { className: `${W.webControl} ${W.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ve,
    {
      label: `${e} · step ${t.streamStep}`,
      checked: t.value === "on",
      disabled: a === void 0,
      onChange: (o) => a == null ? void 0 : a(t.streamStep, o ? "on" : "off")
    }
  );
  return t.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${W.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function wk({ capability: e, cells: t, onChange: a }) {
  return /* @__PURE__ */ l("tr", { className: W.row, children: [
    /* @__PURE__ */ l("td", { className: W.cell, children: [
      /* @__PURE__ */ n("span", { className: W.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${W.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    t.map((r) => /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n(mk, { name: e.name, cell: r, onChange: a }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: W.cell, children: /* @__PURE__ */ n("span", { className: `${W.webGoverned} ward-cellmeta`, children: hk(e) }) })
  ] });
}
function cx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wk, { ...e }) : /* @__PURE__ */ n(uk, { ...e });
}
const fk = "_row_vv64h_2", _k = "_cell_vv64h_6", vk = "_name_vv64h_25", bk = "_note_vv64h_30", pk = "_webName_vv64h_41", gk = "_webMeta_vv64h_47", X = {
  row: fk,
  cell: _k,
  name: vk,
  note: bk,
  webName: pk,
  webMeta: gk
}, $r = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function yk(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Nk({ component: e, onRestart: t }) {
  const a = k(), r = $r[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: X.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: X.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { id: a, className: X.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: X.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(b, { size: "sm", disabled: !0, describedBy: a, children: "Restart" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart" }) })
  ] });
}
function kk({ component: e, onRestart: t }) {
  return t === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: yk(e.state) });
}
function $k({ component: e, onRestart: t }) {
  return /* @__PURE__ */ l("tr", { className: X.row, children: [
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n("span", { className: `${X.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(m, { ...$r[e.state] }) }),
    /* @__PURE__ */ n("td", { className: X.cell, children: /* @__PURE__ */ n(kk, { component: e, onRestart: t }) })
  ] });
}
function dx(e) {
  return "presentation" in e ? /* @__PURE__ */ n($k, { ...e }) : /* @__PURE__ */ n(Nk, { ...e });
}
const Ck = "_row_jcm5k_7", Sk = "_cell_jcm5k_11", Rk = "_next_jcm5k_28", Tk = "_headCell_jcm5k_38", xk = "_webId_jcm5k_77", Lk = "_webPurpose_jcm5k_83", Ak = "_webMeta_jcm5k_91", Ek = "_webUrgent_jcm5k_97", K = {
  row: Ck,
  cell: Sk,
  next: Rk,
  headCell: Tk,
  webId: xk,
  webPurpose: Lk,
  webMeta: Ak,
  webUrgent: Ek
}, Ik = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, Mk = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Cr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Bk = Object.fromEntries(Cr.map((e) => [e.key, e]));
function Qe({ column: e, children: t }) {
  const a = Bk[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: K.cell,
      style: a.width ? { width: a.width } : void 0,
      "data-drop": a.dropPriority,
      "data-mono": a.mono,
      children: t
    }
  );
}
function ux() {
  return /* @__PURE__ */ n("tr", { children: Cr.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: K.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Pk({ cred: e }) {
  const t = Ik[e.state];
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n(Qe, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Qe, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Qe, { column: "state", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(Qe, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: kn(e.cls) }) }),
    /* @__PURE__ */ n(Qe, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Qe, { column: "next", children: /* @__PURE__ */ n("span", { className: K.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function jk({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${K.webMeta} ${K.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function qk({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(jk, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...Mk[e.state] }) })
  ] });
}
function hx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qk, { ...e }) : /* @__PURE__ */ n(Pk, { ...e });
}
const Ok = "_card_lpp45_2", Hk = "_head_lpp45_11", Dk = "_env_lpp45_18", Fk = "_version_lpp45_25", zk = "_meta_lpp45_32", Wk = "_webCard_lpp45_37", Kk = "_webRow_lpp45_47", Gk = "_webTitle_lpp45_55", Uk = "_webLine_lpp45_65", Vk = "_webVersion_lpp45_72", Yk = "_webMeta_lpp45_77", Q = {
  card: Ok,
  head: Hk,
  env: Dk,
  version: Fk,
  meta: zk,
  webCard: Wk,
  webRow: Kk,
  webTitle: Gk,
  webLine: Uk,
  webVersion: Vk,
  webMeta: Yk
}, ra = { dev: "Dev", uat: "UAT", prod: "Prod" }, Sr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function Jk({ env: e }) {
  const t = Sr[e.state], a = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: Q.card, "aria-label": ra[e.env], children: [
    /* @__PURE__ */ l("div", { className: Q.head, children: [
      /* @__PURE__ */ n("span", { className: Q.env, children: ra[e.env] }),
      /* @__PURE__ */ n(m, { role: t.role, label: t.label })
    ] }),
    /* @__PURE__ */ n("p", { className: Q.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: Q.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    a && /* @__PURE__ */ n("p", { className: Q.meta, children: a })
  ] });
}
function Qk(e) {
  const t = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), t, e.ticket].filter((a) => a !== null).join(" · ");
}
function Xk(e) {
  return /* @__PURE__ */ l("article", { className: `${Q.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${Q.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${Q.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Sr[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Q.version} ${Q.webVersion} ${Q.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${Q.meta} ${Q.webMeta} ${Q.webLine} ward-cellmeta`, children: Qk(e) })
  ] });
}
function mx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Xk, { ...e }) : /* @__PURE__ */ n(Jk, { ...e });
}
const Zk = "_panel_1hmja_2", e$ = "_line_1hmja_8", t$ = "_actions_1hmja_14", pt = {
  panel: Zk,
  line: e$,
  actions: t$
};
function wx(e) {
  return /* @__PURE__ */ l("div", { className: pt.panel, children: [
    /* @__PURE__ */ n("p", { className: pt.line, children: e.status }),
    /* @__PURE__ */ n(j, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: pt.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: pt.line, children: e.note ?? "" })
  ] });
}
const n$ = "_upload_13fcl_2", a$ = "_preview_13fcl_7", r$ = "_mark_13fcl_17", o$ = "_empty_13fcl_22", l$ = "_actions_13fcl_28", i$ = "_input_13fcl_33", s$ = "_reasons_13fcl_41", c$ = "_reason_13fcl_41", d$ = "_accepted_13fcl_57", oe = {
  upload: n$,
  preview: a$,
  mark: r$,
  empty: o$,
  actions: l$,
  input: i$,
  reasons: s$,
  reason: c$,
  accepted: d$
}, Rr = 1.5, Tr = 22, Bt = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Rr}px at ${Tr}px`], u$ = [xe[1], xe[2], Bt, Pe], h$ = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", Bt],
  ["foreignObject", Bt],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), m$ = "http://www.w3.org/2000/svg", w$ = "http://www.w3.org/2000/xmlns/", f$ = /* @__PURE__ */ new Set([
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
]), _$ = /* @__PURE__ */ new Set([
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
]), $n = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, v$ = /url\s*\(|['"\\]/i;
function b$() {
  return { ok: !1, reasons: [xe[1]] };
}
function xr(e) {
  return e.namespaceURI === m$;
}
function p$(e) {
  try {
    const t = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return t.localName === "svg" && xr(t) ? t : null;
  } catch {
    return null;
  }
}
function g$(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((a) => a.getAttribute("fill") ?? "").filter((a) => a !== "" && a !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function y$(e) {
  return h$.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function N$(e) {
  return v$.test(e.replace($n, ""));
}
function k$(e) {
  return /^on/i.test(e.localName) ? Bt : e.localName === "href" || N$(e.value) ? Pe : void 0;
}
function $$(e) {
  const t = /* @__PURE__ */ new Set();
  for (const a of [e, ...Array.from(e.querySelectorAll("*"))]) {
    t.add(y$(a));
    for (const r of Array.from(a.attributes)) t.add(k$(r));
  }
  return u$.filter((a) => t.has(a));
}
function C$(e) {
  const t = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), a = Math.max(...t.filter((o) => Number.isFinite(o) && o > 0), 0), r = a > 0 ? Tr / a : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Rr;
  }) ? [xe[3]] : [];
}
function S$(e) {
  if (e.namespaceURI === w$) return !0;
  const t = e.localName;
  return e.namespaceURI === null && (_$.has(t) || t.startsWith("stroke"));
}
function R$(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const t = e;
  return e.nodeType === Node.ELEMENT_NODE && xr(t) && f$.has(t.localName);
}
function T$(e, t) {
  R$(t) ? t.nodeType === Node.ELEMENT_NODE && Lr(t) : e.removeChild(t);
}
function Lr(e) {
  for (const t of Array.from(e.attributes)) S$(t) || e.removeAttributeNode(t);
  for (const t of Array.from(e.childNodes)) T$(e, t);
  return e;
}
function x$(e) {
  return Array.from(e.matchAll($n), (t) => t[2]).filter((t) => t !== "");
}
function L$(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a += 1) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return `ward-mark-${(t >>> 0).toString(36)}`;
}
function A$(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const o of Array.from(r.attributes))
      for (const i of x$(o.value)) a.has(i) || a.set(i, `${t}-${a.size}`);
  return a;
}
function E$(e, t) {
  for (const a of Array.from(e.attributes))
    a.value = a.value.replace($n, (r, o, i) => {
      const s = t.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function I$(e, t) {
  const a = [e, ...Array.from(e.querySelectorAll("*"))], r = A$(a, t);
  for (const o of a) {
    const i = r.get(o.getAttribute("id") ?? "");
    i === void 0 ? o.removeAttribute("id") : o.setAttribute("id", i), E$(o, r);
  }
  return e;
}
function fx(e) {
  const t = p$(e);
  if (t === null) return b$();
  const a = [...g$(t), ...$$(t), ...C$(t)];
  return a.length > 0 ? { ok: !1, reasons: a } : { ok: !0, svg: new XMLSerializer().serializeToString(I$(Lr(t), L$(e))) };
}
const M$ = "Mark accepted.", B$ = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, P$ = new Set(_a.flatMap((e) => [ge(e, "id"), ge(e, "chip")]));
function j$(e) {
  return e !== void 0 && (B$.test(e) || P$.has(e)) ? e : void 0;
}
function q$({ current: e }) {
  const t = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: oe.preview, style: { "--mark": j$(e == null ? void 0 : e.colour) }, children: t ? /* @__PURE__ */ n("img", { className: oe.mark, src: t, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: oe.empty }) });
}
function O$(e, t) {
  const a = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return t.classNames[a];
}
function H$(e, t) {
  return e === null ? t.idle : e.ok ? t.accepted : t.rejected(e.reasons);
}
function D$({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: oe.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("p", { className: oe.accepted, children: M$ }) }) : /* @__PURE__ */ n("div", { className: oe.result, role: "status", children: /* @__PURE__ */ n("ul", { className: oe.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((t) => /* @__PURE__ */ n("li", { className: oe.reason, children: t }, t)) }) });
}
function F$({ result: e, presentation: t }) {
  const a = t == null ? void 0 : t.status;
  return a === void 0 ? /* @__PURE__ */ n(D$, { result: e }) : /* @__PURE__ */ n("p", { className: `${oe.result} ${O$(e, a)}`, role: "status", children: H$(e, a) });
}
function oa(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function _x({ current: e, onUpload: t, onUseInitials: a, presentation: r, disabledReason: o }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = t(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ l("div", { className: oe.upload, children: [
    /* @__PURE__ */ n(q$, { current: e }),
    /* @__PURE__ */ l("div", { className: oe.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: i,
          className: oe.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: o !== void 0,
          onChange: (u) => {
            var h;
            return d((h = u.target.files) == null ? void 0 : h[0]);
          }
        }
      ),
      /* @__PURE__ */ n(b, { ...oa(o), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(b, { ...oa(o), variant: "ghost", onClick: a, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(F$, { result: s, presentation: r })
  ] });
}
const z$ = "_row_o3t6y_7", W$ = "_cell_o3t6y_11", K$ = "_head_o3t6y_28", G$ = "_name_o3t6y_34", U$ = "_pinned_o3t6y_42", V$ = "_headCell_o3t6y_49", Y$ = "_webName_o3t6y_88", J$ = "_webMeta_o3t6y_95", Q$ = "_webWarn_o3t6y_103", D = {
  row: z$,
  cell: W$,
  head: K$,
  name: G$,
  pinned: U$,
  headCell: V$,
  webName: Y$,
  webMeta: J$,
  webWarn: Q$
}, Cn = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, Ar = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], X$ = Object.fromEntries(Ar.map((e) => [e.key, e]));
function Z$(e, t) {
  return `mcp.${e}.${t}`;
}
function e0(e) {
  return Object.keys(Cn).includes(e);
}
function t0(e) {
  return Cn[e !== void 0 && e0(e) ? e : "unknown"];
}
function ot({ column: e, children: t }) {
  const a = X$[e];
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
function vx() {
  return /* @__PURE__ */ n("tr", { children: Ar.map((e) => /* @__PURE__ */ n(
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
function n0({ server: e }) {
  const t = Cn[e.connection];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l(ot, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: D.head, children: [
        /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: kn(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: D.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(ot, { column: "connection", children: /* @__PURE__ */ n(m, { role: t.role, label: t.label }) }),
    /* @__PURE__ */ n(ot, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(ot, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(ot, { column: "tools", children: e.tools.map((a) => Z$(e.name, a)).join(" · ") })
  ] });
}
function a0(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function r0(e) {
  var t;
  return (((t = e.write_tools) == null ? void 0 : t.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function o0({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${D.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: e });
}
function l0({ server: e, onRestart: t }) {
  var a;
  return t === void 0 ? null : ((a = e.restart) == null ? void 0 : a.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(b, { size: "sm", onClick: () => t(e.name), children: "Restart server" });
}
function i0({ name: e, pinned: t, onPin: a }) {
  return t !== null || a === void 0 ? null : /* @__PURE__ */ n(b, { size: "sm", onClick: () => a(e), children: "Pin version" });
}
function s0({ server: e, onRestart: t, onPin: a }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: D.row, children: [
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: `${D.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta`, children: a0(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...r0(e) }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(o0, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(m, { ...t0(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: D.cell, children: [
      /* @__PURE__ */ n(l0, { server: e, onRestart: t }),
      /* @__PURE__ */ n(i0, { name: e.name, pinned: r, onPin: a })
    ] })
  ] });
}
function bx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(s0, { ...e }) : /* @__PURE__ */ n(n0, { ...e });
}
const c0 = "_row_1ibo7_2", d0 = "_headCell_1ibo7_14", u0 = "_cell_1ibo7_15", h0 = "_name_1ibo7_26", m0 = "_consequence_1ibo7_32", w0 = "_reason_1ibo7_38", f0 = "_value_1ibo7_44", _0 = "_webRow_1ibo7_60", v0 = "_webSetting_1ibo7_73", b0 = "_webName_1ibo7_81", p0 = "_webConsequence_1ibo7_89", g0 = "_webControl_1ibo7_95", y0 = "_webState_1ibo7_109", N0 = "_webChip_1ibo7_114", P = {
  row: c0,
  headCell: d0,
  cell: u0,
  name: h0,
  consequence: m0,
  reason: w0,
  value: f0,
  webRow: _0,
  webSetting: v0,
  webName: b0,
  webConsequence: p0,
  webControl: g0,
  webState: y0,
  webChip: N0
}, Er = 104, Ir = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function k0({ control: e, name: t, locked: a, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ve, { label: t, checked: e.checked, locked: a || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Ga, { label: t, options: e.options, value: e.value, onChange: e.onChange, disabled: a, describedBy: r }) : /* @__PURE__ */ n("span", { className: P.value, "data-locked": a ? !0 : void 0, children: e.text });
}
function $0({ setting: e, control: t, inheritance: a, reason: r }) {
  if (a === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Ir[a], s = a === "locked";
  return /* @__PURE__ */ l("tr", { className: P.row, "data-inheritance": a, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: P.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(k0, { control: t, name: e.name, locked: s, describedBy: s ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: P.cell, style: { width: Er }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Mr(e, t) {
  return String(e ?? t);
}
function C0(e, t) {
  return e.kind === "segment" && !t ? e.options : void 0;
}
function S0(e) {
  var a;
  const t = e.kind === "segment" ? (a = e.options) == null ? void 0 : a.find((r) => r.value === e.value) : void 0;
  return (t == null ? void 0 : t.label) ?? Mr(e.value, "—");
}
function R0({ control: e, name: t, locked: a, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: P.webControl, children: [
    /* @__PURE__ */ n(Ve, { label: t, labelHidden: !0, checked: i, locked: a, describedBy: r, onChange: (s) => o == null ? void 0 : o(s) }),
    /* @__PURE__ */ n("span", { className: P.webState, "aria-hidden": "true", children: a || i ? "on" : "off" })
  ] });
}
function T0(e) {
  const { control: t, locked: a, onChange: r } = e;
  if (t.kind === "switch") return /* @__PURE__ */ n(R0, { ...e });
  const o = C0(t, a);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: P.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Ga, { options: o, value: Mr(t.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.value} ward-envmeta`, "data-locked": a ? !0 : void 0, children: S0(t) });
}
function x0({ setting: e, control: t, inheritance: a, reason: r, onChange: o, renderControl: i }) {
  const s = k(), c = a === "locked";
  return /* @__PURE__ */ l("div", { className: `${P.row} ${P.webRow} ward-policyrow`, "data-inheritance": a, children: [
    /* @__PURE__ */ l("span", { className: P.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${P.name} ${P.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: s, className: `${P.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: P.webControl, children: i(s) }) : /* @__PURE__ */ n(T0, { control: t, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${P.webChip} ward-policy-chip`, style: { width: Er }, children: /* @__PURE__ */ n(m, { ...Ir[a], size: "tag" }) })
  ] });
}
function px(e) {
  return "presentation" in e ? /* @__PURE__ */ n(x0, { ...e }) : /* @__PURE__ */ n($0, { ...e });
}
const L0 = "_label_h9m4w_7", A0 = "_name_h9m4w_15", E0 = "_column_h9m4w_24", I0 = "_webFrame_h9m4w_57", M0 = "_webHead_h9m4w_62", B0 = "_webHeadLabel_h9m4w_74", P0 = "_webLabel_h9m4w_117", j0 = "_webColumns_h9m4w_124", q0 = "_webGroup_h9m4w_130", O0 = "_webPeople_h9m4w_131", H0 = "_webVia_h9m4w_132", D0 = "_webMeta_h9m4w_161", G = {
  label: L0,
  name: A0,
  column: E0,
  webFrame: I0,
  webHead: M0,
  webHeadLabel: B0,
  webLabel: P0,
  webColumns: j0,
  webGroup: q0,
  webPeople: O0,
  webVia: H0,
  webMeta: D0
}, F0 = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Jt = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Qt({ column: e, children: t }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: G.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: t
    }
  );
}
function z0(e) {
  if (!e.matrixRole) return;
  const t = F0[e.matrixRole];
  if (!t) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return t;
}
function W0({ node: e }) {
  const t = z0(e);
  return /* @__PURE__ */ l("span", { className: G.label, children: [
    /* @__PURE__ */ n("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ n(K0, { role: t, node: e }),
    /* @__PURE__ */ n(Qt, { column: Jt[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Qt, { column: Jt[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Qt, { column: Jt[2], children: e.requestedVia ?? "" })
  ] });
}
function K0({ role: e, node: t }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    t.floor && /* @__PURE__ */ n(m, { role: "soft", label: "Floor" }),
    t.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "Unresolved" })
  ] });
}
function G0({ index: e, depth: t, node: a, expanded: r, leaf: o, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    Za,
    {
      index: e,
      depth: t,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: a.unresolved,
      inherited: a.inherited,
      label: /* @__PURE__ */ n(W0, { node: a }),
      children: s
    }
  );
}
function Xt({ className: e, text: t }) {
  return /* @__PURE__ */ n("span", { className: e, title: t, children: t });
}
function U0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Xt, { className: `${G.webMeta} ${G.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Xt, { className: `${G.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Xt, { className: `${G.webMeta} ${G.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function V0() {
  return /* @__PURE__ */ l("div", { className: G.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: G.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: G.webColumns, children: [
      /* @__PURE__ */ n("span", { className: G.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: G.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: G.webVia, children: "Requested via" })
    ] })
  ] });
}
function Y0({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${G.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function J0(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Q0({ rows: e, label: t }) {
  return /* @__PURE__ */ l("div", { className: G.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(V0, {}),
    /* @__PURE__ */ n(Rw, { label: t ?? "Role matrix", children: e.map((a, r) => /* @__PURE__ */ n(
      Za,
      {
        depth: a.depth,
        label: /* @__PURE__ */ n(Y0, { row: a }),
        detail: /* @__PURE__ */ n(U0, { row: a }),
        expanded: J0(a),
        leaf: a.leaf === !0,
        unresolved: a.state === "unresolved",
        inherited: a.state === "inherited",
        index: r
      },
      a.label + String(r)
    )) })
  ] });
}
function gx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Q0, { ...e }) : /* @__PURE__ */ n(G0, { ...e });
}
const X0 = "_runbook_b9agc_2", Z0 = "_list_b9agc_7", eC = "_step_b9agc_15", tC = "_numeral_b9agc_21", nC = "_body_b9agc_28", aC = "_head_b9agc_34", rC = "_title_b9agc_40", oC = "_detail_b9agc_45", lC = "_actions_b9agc_50", iC = "_webList_b9agc_56", sC = "_webStep_b9agc_60", cC = "_webBody_b9agc_66", dC = "_webTitle_b9agc_74", uC = "_webDetail_b9agc_78", I = {
  runbook: X0,
  list: Z0,
  step: eC,
  numeral: tC,
  body: nC,
  head: aC,
  title: rC,
  detail: oC,
  actions: lC,
  webList: iC,
  webStep: sC,
  webBody: cC,
  webTitle: dC,
  webDetail: uC
}, Br = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Pr(e) {
  return String(e + 1).padStart(2, "0");
}
function hC({ step: e, index: t, connection: a }) {
  const r = Br[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: I.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: I.numeral, children: Pr(t) }),
    /* @__PURE__ */ l("span", { className: I.body, children: [
      /* @__PURE__ */ l("span", { className: I.head, children: [
        /* @__PURE__ */ n("span", { className: I.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a })
      ] }),
      /* @__PURE__ */ n("span", { className: I.detail, children: e.detail })
    ] })
  ] });
}
function mC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: I.list, children: e.map((r, o) => /* @__PURE__ */ n(hC, { step: r, index: o, connection: a }, r.title)) }),
    t && /* @__PURE__ */ n("div", { className: I.actions, children: t })
  ] });
}
function wC({ step: e, index: t, connection: a }) {
  return /* @__PURE__ */ l("li", { className: `${I.step} ${I.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${I.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Pr(t) }),
    /* @__PURE__ */ l("span", { className: `${I.body} ${I.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${I.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${I.title} ${I.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Br[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(Le, { startedAt: e.startedAt, connection: a }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${I.detail} ${I.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function fC({ steps: e, actions: t, connection: a = "live" }) {
  return /* @__PURE__ */ l("div", { className: I.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${I.list} ${I.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(wC, { step: r, index: o, connection: a }, r.title)) }),
    t !== void 0 ? /* @__PURE__ */ n("span", { className: `${I.actions} ward-clarity-actions`, children: t }) : null
  ] });
}
function yx(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fC, { ...e }) : /* @__PURE__ */ n(mC, { ...e });
}
const _C = "_list_1gu6a_2", vC = "_check_1gu6a_10", bC = "_body_1gu6a_16", pC = "_text_1gu6a_23", gC = "_pending_1gu6a_32", yC = "_measured_1gu6a_37", Ze = {
  list: _C,
  check: vC,
  body: bC,
  text: pC,
  pending: gC,
  measured: yC
};
function NC(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function kC({ check: e }) {
  const t = NC(e.passed);
  return /* @__PURE__ */ l("li", { className: `${Ze.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(vn, { state: t.state, label: t.label }),
    /* @__PURE__ */ l("span", { className: Ze.body, children: [
      /* @__PURE__ */ n("span", { className: Ze.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: Ze.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ze.measured, children: e.measured })
  ] });
}
function Nx({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ze.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(kC, { check: t }, t.text)) });
}
const $C = "_root_y6bbq_2", CC = "_list_y6bbq_10", SC = "_line_y6bbq_32", RC = "_at_y6bbq_59", TC = "_text_y6bbq_63", xC = "_foot_y6bbq_67", LC = "_idle_y6bbq_79", AC = "_caret_y6bbq_87", EC = "_jump_y6bbq_94", ve = {
  root: $C,
  list: CC,
  line: SC,
  at: RC,
  text: TC,
  foot: xC,
  idle: LC,
  caret: AC,
  jump: EC
}, IC = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Sn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : IC.format(new Date(e));
}
const MC = { warn: "warning", ok: "ok" };
function BC({ kind: e }) {
  const t = MC[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function PC({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Sn(e)}` });
}
function jC({ connection: e, idleSince: t, last: a, children: r }) {
  const o = [t, a == null ? void 0 : a.at, ""].find(Boolean), i = {
    stale: `no new events as of ${Sn(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${ve.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${ve.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: ve.idle, children: i }),
    /* @__PURE__ */ n(PC, { at: a == null ? void 0 : a.at }),
    r
  ] });
}
const qC = 8;
function OC(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > qC;
}
function HC({ shown: e, onJump: t }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consjump`, onClick: t, children: "Jump to latest" }) : null;
}
const jr = Ne(null);
function kx({ announce: e, onAnnounceChange: t, children: a }) {
  const [r, o] = p(!1), i = ua(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      o(s), t == null || t(s);
    }
  }), [e, r, t]);
  return /* @__PURE__ */ n(jr.Provider, { value: i, children: a });
}
function DC() {
  const e = ye(jr), [t, a] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [t, a];
}
const FC = (e, t) => ({ "data-empty": e === 0 || void 0, "data-fixed": t || void 0 });
function $x({ lines: e, connection: t, idleSince: a, label: r = "Live activity", fixed: o }) {
  const i = _(null), [s, c] = p(0), [d, u] = DC(), [h, w] = p(!1), f = e.at(-1);
  S(() => {
    c(e.length);
  }, [e.length]), tt(() => {
    const N = i.current;
    N && !h && (N.scrollTop = N.scrollHeight);
  }, [e.length, h]);
  const y = () => {
    var O;
    const N = i.current;
    if (!N) return;
    const A = N.querySelectorAll("[data-consline-text]");
    (O = A.item(A.length - 1)) == null || O.focus(), w(!1);
  };
  return /* @__PURE__ */ l("div", { className: ve.root, children: [
    /* @__PURE__ */ n("ol", { className: ve.list, ref: i, "aria-live": d ? "polite" : "off", "aria-label": r, ...FC(e.length, o), onScroll: (N) => w(OC(N.currentTarget)), children: e.map((N, A) => /* @__PURE__ */ l("li", { className: `${ve.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": A < s, children: [
      /* @__PURE__ */ n("span", { className: ve.at, children: Sn(N.at) }),
      /* @__PURE__ */ n(BC, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: ve.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${A}`)) }),
    /* @__PURE__ */ l(jC, { connection: t, idleSince: a, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${ve.jump} ward-consannounce`, "aria-pressed": d, onClick: () => u(!d), children: "Read new events" }),
      /* @__PURE__ */ n(HC, { shown: h, onJump: y })
    ] })
  ] });
}
const zC = "_row_1k8wl_2", WC = "_head_1k8wl_14", KC = "_author_1k8wl_20", GC = "_eta_1k8wl_25", UC = "_edited_1k8wl_26", VC = "_body_1k8wl_32", YC = "_reason_1k8wl_37", JC = "_actions_1k8wl_42", Ce = {
  row: zC,
  head: WC,
  author: KC,
  eta: GC,
  edited: UC,
  body: VC,
  reason: YC,
  actions: JC
}, QC = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function XC(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function ZC({ comment: e, reasonId: t, onEdit: a, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: a, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "secondary", size: "sm", onClick: a, children: "Edit" }),
    /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function eS({ reason: e, reasonId: t }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(b, { variant: "primary", size: "sm", disabled: !0, describedBy: t, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: Ce.reason, id: t, children: e })
  ] });
}
function tS(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function nS(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(ZC, { ...e }) : /* @__PURE__ */ n(eS, { reason: e.unavailable, reasonId: e.unavailableId });
}
function Cx(e) {
  const { comment: t } = e;
  tS(e);
  const a = k(), r = `${a}-unavailable`, o = QC[t.delivery];
  return /* @__PURE__ */ l("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": t.delivery, "data-queued": t.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: Ce.head, children: [
      /* @__PURE__ */ n("span", { className: Ce.author, children: t.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: Ce.eta, children: t.etaOrAttempt }),
      t.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: Ce.edited, children: "edited " + t.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: Ce.body, children: t.body }),
    /* @__PURE__ */ n("p", { className: Ce.reason, id: a, children: XC(e.tracker ?? "Jira")[t.delivery] }),
    /* @__PURE__ */ n("div", { className: Ce.actions, children: /* @__PURE__ */ n(nS, { ...e, reasonId: a, unavailableId: r }) })
  ] });
}
const aS = "_root_rvhdw_2", rS = "_attach_rvhdw_11", oS = "_actions_rvhdw_17", lS = "_reply_rvhdw_23", iS = "_replyField_rvhdw_28", sS = "_send_rvhdw_54", cS = "_sendIcon_rvhdw_65", dS = "_sendsAs_rvhdw_75", Oe = {
  root: aS,
  attach: rS,
  actions: oS,
  reply: lS,
  replyField: iS,
  send: sS,
  sendIcon: cS,
  sendsAs: dS
};
function qr({ value: e, onChange: t }) {
  const [a, r] = p("");
  return e === void 0 ? [a, r] : [e, t ?? (() => {
  })];
}
function uS() {
  return /* @__PURE__ */ n("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ n("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function hS(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function mS(e) {
  const { placeholder: t, asUser: a, onPost: r } = e, [o, i] = qr(e), s = k(), c = () => {
    o.trim() !== "" && r(a, o);
  }, d = (u) => {
    hS(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ l("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ n(j, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: t, label: t, value: o, onChange: i, describedBy: s }),
      /* @__PURE__ */ l(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ n(uS, {}),
        /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ n("p", { id: s, className: Oe.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function Sx(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(mS, { ...e }) : /* @__PURE__ */ n(wS, { ...e });
}
function wS(e) {
  const { placeholder: t, asUser: a, attachTo: r, requeueAfter: o, onPost: i, onDraft: s } = e, [c, d] = qr(e);
  return /* @__PURE__ */ l("div", { className: Oe.root, children: [
    /* @__PURE__ */ n(j, { kind: "textarea", label: t, value: c, onChange: d }),
    r && /* @__PURE__ */ l("div", { className: Oe.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ n(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    o && /* @__PURE__ */ n(
      Ca,
      {
        label: `Requeue ${o.agent} after posting`,
        consequence: o.consequence,
        checked: o.checked,
        onChange: o.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: Oe.actions, children: [
      /* @__PURE__ */ n(b, { variant: "primary", onClick: () => i(a, c), children: `Post as ${a}` }),
      s && /* @__PURE__ */ n(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const fS = "_list_1yhks_2", _S = "_item_1yhks_6", vS = "_body_1yhks_22", bS = "_text_1yhks_28", pS = "_evidence_1yhks_37", gS = "_consequence_1yhks_49", yS = "_note_1yhks_54", Ue = {
  list: fS,
  item: _S,
  body: vS,
  text: bS,
  evidence: pS,
  consequence: gS,
  note: yS
};
function NS({ criterion: e }) {
  return /* @__PURE__ */ n(Fe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function la({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function kS(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function $S({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ue.body, children: [
    /* @__PURE__ */ n("span", { className: Ue.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(la, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Ue.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(la, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ue.consequence, children: kS(e.why) })
    ] })
  ] });
}
function CS({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ue.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(NS, { criterion: e }),
    /* @__PURE__ */ n($S, { criterion: e })
  ] });
}
function Rx({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(CS, { criterion: t }, t.text)) }),
    e.some((t) => !t.met) ? /* @__PURE__ */ n("p", { className: Ue.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const SS = "_list_dwhoz_2", RS = "_rung_dwhoz_6", TS = "_name_dwhoz_18", xS = "_actor_dwhoz_32", Ct = {
  list: SS,
  rung: RS,
  name: TS,
  actor: xS
}, LS = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function AS({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const t = LS[e.state];
  return /* @__PURE__ */ l("li", { className: Ct.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: Ct.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label }),
    /* @__PURE__ */ n("span", { className: `${Ct.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function Tx({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ct.list} ward-gateladder`, children: e.map((t) => /* @__PURE__ */ n(AS, { rung: t }, t.name)) });
}
const ES = "_sheet_pw37w_2", IS = "_title_pw37w_9", MS = "_stage_pw37w_15", BS = "_effects_pw37w_20", PS = "_effect_pw37w_20", jS = "_numeral_pw37w_31", qS = "_effectText_pw37w_38", OS = "_refusals_pw37w_43", HS = "_reasons_pw37w_52", DS = "_reason_pw37w_52", FS = "_actions_pw37w_62", we = {
  sheet: ES,
  title: IS,
  stage: MS,
  effects: BS,
  effect: PS,
  numeral: jS,
  effectText: qS,
  refusals: OS,
  reasons: HS,
  reason: DS,
  actions: FS
};
function zS({ refused: e, reasonId: t, note: a, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(b, { variant: "primary", disabled: !0, describedBy: t, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(b, { variant: "primary", onClick: () => r(a === "" ? void 0 : a), children: "Requeue" });
}
function xx({ run: e, effects: t, refusals: a, cost: r, onRequeue: o, onClose: i, returnFocusTo: s }) {
  const c = k(), d = `${c}-refusal`, [u, h] = p(""), w = a.length > 0;
  return /* @__PURE__ */ n(rt, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ l("div", { className: we.sheet, children: [
    /* @__PURE__ */ l("h2", { className: we.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: we.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: we.effects, children: t.map((f, y) => /* @__PURE__ */ l("li", { className: we.effect, children: [
      /* @__PURE__ */ n("span", { className: we.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: we.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ n(
      lm,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(j, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ l("div", { className: we.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ n("ul", { className: we.reasons, children: a.map((f, y) => /* @__PURE__ */ n("li", { className: we.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: we.actions, children: [
      /* @__PURE__ */ n(zS, { refused: w, reasonId: d, note: u, onRequeue: o }),
      /* @__PURE__ */ n(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const WS = "_list_1laeg_2", KS = "_path_1laeg_7", GS = "_head_1laeg_21", US = "_label_1laeg_28", VS = "_consequence_1laeg_35", it = {
  list: WS,
  path: KS,
  head: GS,
  label: US,
  consequence: VS
}, ln = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function ia(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function sa(e) {
  return e ? "primary" : "secondary";
}
function YS({ path: e, primary: t, onChoose: a }) {
  return e.allowed ? /* @__PURE__ */ n(b, { variant: sa(t), size: "sm", onClick: () => a(e.kind), children: ln[e.kind] }) : /* @__PURE__ */ n(b, { variant: sa(t), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: ln[e.kind] });
}
function JS({ path: e, primary: t, onChoose: a }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: it.path, "data-allowed": e.allowed, "data-role": ia(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: it.head, children: [
      /* @__PURE__ */ n("span", { className: it.label, children: e.title ?? ln[e.kind] }),
      /* @__PURE__ */ n(m, { role: ia(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: it.consequence, children: e.consequence }),
    /* @__PURE__ */ n(YS, { path: e, primary: t, onChoose: a })
  ] });
}
function Lx({ paths: e, onChoose: t }) {
  return /* @__PURE__ */ n("ul", { className: it.list, children: e.map((a, r) => /* @__PURE__ */ n(JS, { path: a, primary: r === 0, onChoose: t }, a.kind)) });
}
const QS = "_list_1m7i0_2", XS = "_item_1m7i0_6", ZS = "_node_1m7i0_18", eR = "_body_1m7i0_24", tR = "_head_1m7i0_30", nR = "_stage_1m7i0_36", aR = "_version_1m7i0_41", rR = "_sentence_1m7i0_49", oR = "_meta_1m7i0_54", Re = {
  list: QS,
  item: XS,
  node: ZS,
  body: eR,
  head: tR,
  stage: nR,
  version: aR,
  sentence: rR,
  meta: oR
}, lR = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function iR({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: Re.head, children: [
    /* @__PURE__ */ n("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function sR({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ n(Fe, { size: 9, kind: lR[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(iR, { entry: e }),
      /* @__PURE__ */ n("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function Ax({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Re.list} ward-history`, children: e.map((t, a) => /* @__PURE__ */ n(sR, { entry: t }, t.stage + String(a))) });
}
const cR = "_thread_1e70p_3", dR = "_turn_1e70p_8", uR = "_who_1e70p_27", hR = "_body_1e70p_32", St = {
  thread: cR,
  turn: dR,
  who: uR,
  body: hR
}, Or = Ne(!1);
function Ex({ children: e, density: t }) {
  return /* @__PURE__ */ n(Or.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${St.thread} ward-chat`, "aria-label": "Conversation", "data-density": t, children: e }) });
}
function Ix({ turn: e }) {
  if (!ye(Or)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${St.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${St.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${St.body} ward-chat-body`, children: e.body })
  ] });
}
const mR = "_list_yiolt_3", wR = "_row_yiolt_7", fR = "_label_yiolt_20", _R = "_n_yiolt_26", vR = "_cause_yiolt_33", ct = {
  list: mR,
  row: wR,
  label: fR,
  n: _R,
  cause: vR
};
function bR(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const pR = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function gR({ row: e, formatNumber: t }) {
  return bR(e), /* @__PURE__ */ l("li", { className: `${ct.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Fe, { size: 8, ...pR[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: ct.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${ct.n} ward-stat-value`, children: t(e.n) }),
    /* @__PURE__ */ n(yR, { cause: e.cause })
  ] });
}
function yR({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${ct.cause} ward-healthrow-cause`, children: e }) : null;
}
function Mx({ rows: e, formatNumber: t = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${ct.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(gR, { row: a, formatNumber: t }, a.label)) });
}
const NR = "_root_1jxwp_2", kR = {
  root: NR
};
function Bx({ items: e, note: t, actionLabel: a = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: kR.root, "data-density": o, children: [
    /* @__PURE__ */ n(zt, { items: e, note: t, density: o }),
    /* @__PURE__ */ n(b, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: a })
  ] });
}
const $R = "_row_dhbre_3", CR = "_key_dhbre_13", SR = "_stack_dhbre_24", RR = "_value_dhbre_32", TR = "_evidence_dhbre_39", xR = "_mark_dhbre_47", Xe = {
  row: $R,
  key: CR,
  stack: SR,
  value: RR,
  evidence: TR,
  mark: xR
};
function LR({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ n(vn, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function Px({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(LR, { state: e.state }) })
  ] });
}
const AR = "_cell_gh2sd_2", ER = {
  cell: AR
}, IR = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function MR(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function BR(e, t) {
  const a = e.find((r) => r.noRerun && !r.why);
  if (t && a) throw new Error(`RoutingTable: the "${a.rejectedBy}" row never reruns and says nothing about why`);
}
function PR(e, t) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: MR(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[t] ?? "—";
}
function jR(e) {
  return e.map((t, a) => ({ ...t, id: t.id ?? String(a) }));
}
function jx({ rows: e, empty: t, requireNoRerunReason: a = !0 }) {
  BR(e, a);
  const r = jR(e);
  return /* @__PURE__ */ n(
    gm,
    {
      label: "Rejection routing",
      columns: IR,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: ER.cell, "data-norerun": o.noRerun ? !0 : void 0, children: PR(o, i) }),
      empty: t ?? /* @__PURE__ */ n(wf, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const qR = "_row_1f2re_2", OR = "_title_1f2re_12", HR = "_turns_1f2re_18", DR = "_waiting_1f2re_19", FR = "_resolved_1f2re_20", zR = "_activity_1f2re_21", WR = "_cost_1f2re_28", KR = "_link_1f2re_29", GR = "_tableLink_1f2re_47", UR = "_tableRecord_1f2re_48", VR = "_tableRow_1f2re_59", YR = "_tableTitle_1f2re_71", JR = "_tableResolved_1f2re_76", QR = "_tableMeta_1f2re_87", XR = "_tableCost_1f2re_94", ZR = "_tableActivity_1f2re_95", e2 = "_tableState_1f2re_105", z = {
  row: qR,
  title: OR,
  turns: HR,
  waiting: DR,
  resolved: FR,
  activity: zR,
  cost: WR,
  link: KR,
  tableLink: GR,
  tableRecord: UR,
  tableRow: VR,
  tableTitle: YR,
  tableResolved: JR,
  tableMeta: QR,
  tableCost: XR,
  tableActivity: ZR,
  tableState: e2
}, Hr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function t2(e) {
  if (e === "") return "—";
  const t = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (t < 1) return "just now";
  if (t < 60) return `${t}m ago`;
  const a = Math.floor(t / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function n2(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function a2(e) {
  const t = e.join(", ");
  return t === "" ? "nothing resolved" : t;
}
const r2 = { duplicate: "Closed · duplicate" };
function o2({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n(nt, { className: z.tableMeta, text: `waiting on ${e}` });
}
function l2({ value: e }) {
  return /* @__PURE__ */ n("td", { className: z.tableCost, children: e === void 0 ? null : le(e) });
}
function i2({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${z.tableRecord} ward-target`, href: q(e.href), children: `→ ${e.key}` });
}
function s2({ session: e, href: t }) {
  const a = Hr[e.state];
  return /* @__PURE__ */ l("tr", { className: z.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: z.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${z.tableLink} ward-target`, href: q(t), children: /* @__PURE__ */ n(nt, { text: e.title }) }),
      /* @__PURE__ */ n("span", { className: z.tableMeta, children: n2(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: z.tableResolved, children: [
      a2(e.resolved),
      /* @__PURE__ */ n(o2, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(l2, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: z.tableActivity, children: t2(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: z.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: a.role, label: r2[e.state] ?? a.label }),
      /* @__PURE__ */ n(i2, { link: e.link })
    ] }) })
  ] });
}
function c2({ session: e }) {
  const t = Hr[e.state];
  return /* @__PURE__ */ l("div", { className: z.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n(nt, { className: z.title, text: e.title }),
    /* @__PURE__ */ n("span", { className: z.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n(nt, { className: z.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: z.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: z.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ n("span", { className: z.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: z.link, href: q(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: t.role, label: t.label })
  ] });
}
function qx(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(s2, { session: e.session, href: e.href }) : /* @__PURE__ */ n(c2, { session: e.session });
}
const d2 = "_block_1yy2v_3", u2 = "_list_1yy2v_9", h2 = "_line_1yy2v_14", sn = {
  block: d2,
  list: u2,
  line: h2
}, m2 = { warn: "warning", ok: "ok" };
function w2({ kind: e }) {
  const t = m2[e];
  return t === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function f2({ line: e }) {
  const t = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${sn.line} ward-typed-line ward-typed-line--${t}`, "data-kind": t, children: [
    /* @__PURE__ */ n(w2, { kind: t }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Ox({ lines: e, label: t = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${sn.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: sn.list, "aria-label": t, children: e.map((a, r) => /* @__PURE__ */ n(f2, { line: a }, `${r}-${a.text}`)) }) });
}
const _2 = "_band_tt7hp_1", v2 = "_head_tt7hp_8", b2 = "_cell_tt7hp_19", p2 = "_index_tt7hp_35", g2 = "_title_tt7hp_42", y2 = "_note_tt7hp_48", N2 = "_cellTitle_tt7hp_53", k2 = "_cellBody_tt7hp_58", $2 = "_tag_tt7hp_64", $e = {
  band: _2,
  head: v2,
  cell: b2,
  index: p2,
  title: g2,
  note: y2,
  cellTitle: N2,
  cellBody: k2,
  tag: $2
}, ca = 4;
function Hx({ index: e, title: t, note: a, cells: r }) {
  if (r.length !== ca)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${ca}-cell grid`);
  return /* @__PURE__ */ l("section", { className: $e.band, "aria-label": `${e} ${t}`, children: [
    /* @__PURE__ */ l("div", { className: $e.head, children: [
      /* @__PURE__ */ n("span", { className: $e.index, children: e }),
      /* @__PURE__ */ n("span", { className: $e.title, children: t }),
      /* @__PURE__ */ n("span", { className: $e.note, children: a })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: $e.cell, children: [
      /* @__PURE__ */ n("span", { className: $e.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: $e.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: $e.tag, children: o.tag })
    ] }, o.title))
  ] });
}
const C2 = "_tag_1yuvz_2", S2 = "_link_1yuvz_14", Zt = {
  tag: C2,
  link: S2
};
function Dx({ label: e, href: t }) {
  return t === void 0 ? /* @__PURE__ */ n("span", { className: Zt.tag, children: e }) : /* @__PURE__ */ n("a", { className: `${Zt.tag} ${Zt.link}`, href: q(t), children: e });
}
const R2 = "_eyebrow_m8swv_2", T2 = "_link_m8swv_10", da = {
  eyebrow: R2,
  link: T2
};
function Fx({ children: e, href: t }) {
  return /* @__PURE__ */ n("p", { className: da.eyebrow, children: t === void 0 ? e : /* @__PURE__ */ n("a", { className: `${da.link} ward-target`, href: q(t), children: e }) });
}
const x2 = "_figure_qz9i7_2", L2 = "_media_qz9i7_9", A2 = "_caption_qz9i7_35", en = {
  figure: x2,
  media: L2,
  caption: A2
};
function E2(e) {
  return e.src === void 0 ? /* @__PURE__ */ n(x, { children: e.children }) : /* @__PURE__ */ n("img", { src: e.src, alt: e.alt, width: e.width, height: e.height, loading: "lazy", decoding: "async" });
}
function zx(e) {
  return /* @__PURE__ */ l("figure", { className: en.figure, children: [
    /* @__PURE__ */ n("div", { className: en.media, "data-ratio": e.ratio, children: /* @__PURE__ */ n(E2, { ...e }) }),
    e.caption === void 0 ? null : /* @__PURE__ */ n("figcaption", { className: en.caption, children: e.caption })
  ] });
}
function I2(e) {
  return `h${e}`;
}
function M2(e) {
  return e.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const B2 = "_prose_1fxb9_2", P2 = "_anchor_1fxb9_79", Dr = {
  prose: B2,
  anchor: P2
};
function Wx({ children: e }) {
  return /* @__PURE__ */ n("div", { className: Dr.prose, children: e });
}
function Kx({ level: e, children: t, id: a }) {
  const r = I2(e), o = a ?? M2(t);
  return /* @__PURE__ */ l(r, { id: o, children: [
    t,
    " ",
    /* @__PURE__ */ n("a", { className: `${Dr.anchor} ward-target`, href: `#${o}`, "aria-label": `Link to section: ${t}`, children: "#" })
  ] });
}
const j2 = "_list_176jq_2", q2 = "_pair_176jq_8", O2 = "_term_176jq_14", H2 = "_value_176jq_19", gt = {
  list: j2,
  pair: q2,
  term: O2,
  value: H2
};
function Gx({ facts: e }) {
  return /* @__PURE__ */ n("dl", { className: gt.list, children: e.map((t) => /* @__PURE__ */ l("div", { className: gt.pair, children: [
    /* @__PURE__ */ n("dt", { className: gt.term, children: t.term }),
    /* @__PURE__ */ n("dd", { className: gt.value, children: t.value })
  ] }, t.term)) });
}
const D2 = "_nav_sgeyg_2", F2 = "_item_sgeyg_6", z2 = "_link_sgeyg_13", W2 = "_note_sgeyg_30", yt = {
  nav: D2,
  item: F2,
  link: z2,
  note: W2
};
function Ux({ label: e, links: t }) {
  return /* @__PURE__ */ n("nav", { "aria-label": e, className: yt.nav, children: /* @__PURE__ */ n(km, { children: t.map((a) => /* @__PURE__ */ l("li", { className: yt.item, children: [
    /* @__PURE__ */ n("a", { className: `${yt.link} ward-target`, href: q(a.href), children: a.label }),
    a.note === void 0 ? null : /* @__PURE__ */ n("span", { className: yt.note, children: a.note })
  ] }, a.href)) }) });
}
export {
  tT as ACCENT_PRESETS,
  $T as ActionStack,
  $x as ActivityConsole,
  cT as AdminIcon,
  Ib as AgentCard,
  uT as AppShell,
  sx as AppearanceStrip,
  Hx as Band,
  NT as BarChart,
  Yf as BoardColumn,
  DT as BoardFootnote,
  FT as BoardHeader,
  iT as BoardIcon,
  ET as BoardScroller,
  b as Btn,
  eT as CHIP_ROLES,
  Cr as CREDENTIAL_COLUMNS,
  yT as Callout,
  cx as CapabilityRow,
  MT as CardGrid,
  Ix as ChatMessage,
  Ca as Checkbox,
  m as Chip,
  nt as ClampText,
  Cx as ClarificationRow,
  XT as ClauseRuleRow,
  QT as ClauseRules,
  or as ColourLadder,
  dx as ComponentRow,
  Sx as Composer,
  WT as ConfigRow,
  zT as ConfigRowHead,
  bn as ConnectionMark,
  kx as ConsoleAnnounceProvider,
  Ex as Conversation,
  lm as CostMeter,
  hx as CredentialRow,
  ux as CredentialRowHead,
  Rx as CriteriaList,
  xs as Crumb,
  nT as DENSITIES,
  Mx as DeliveryHealth,
  PT as DeniedState,
  oT as DisabledScope,
  ex as DryRunRail,
  wf as EmptyState,
  mx as EnvCard,
  Fx as Eyebrow,
  Gx as FactList,
  j as Field,
  zx as Figure,
  BT as FilteredEmpty,
  hT as FoldText,
  LT as FormStack,
  zt as GateChecklist,
  Tx as GateLadder,
  gm as Grid,
  nx as HandoffRuleRow,
  tx as HandoffRules,
  lT as HomeIcon,
  KT as ItemDrawer,
  wx as KeyPanel,
  so as LIVE_EVENT_TYPES,
  tb as LegacyBoardColumn,
  UT as LegacyBoardHeader,
  VT as LegacyConfigRow,
  JT as LegacyItemDrawer,
  Vv as LegacyOverCapNote,
  YT as LegacyPreviewRail,
  nr as LegacyWorkCard,
  Ux as LinkList,
  Le as LiveIndicator,
  jT as LoadFailed,
  HT as Loading,
  Ar as MCP_SERVER_COLUMNS,
  vn as Mark,
  _x as MarkUpload,
  Fe as Marker,
  bx as McpServerRow,
  vx as McpServerRowHead,
  Oa as Menu,
  Pa as MenuButton,
  ax as NewStreamModal,
  bf as OverCapNote,
  mn as OverflowRow,
  rt as Overlay,
  mT as OwedCard,
  ZT as PARTIAL_STEP_REASON,
  Er as POLICY_CHIP_WIDTH,
  RT as PageFrame,
  gT as PageHeader,
  km as PlainList,
  px as PolicyRow,
  GT as PreviewRail,
  Wx as Prose,
  Kx as ProseHeading,
  Jt as ROLE_MATRIX_COLUMNS,
  vr as RULE_ACTIONS,
  Va as Radio,
  Bx as ReadyChecklist,
  xT as RecordSection,
  xx as RequeueSheet,
  Lx as ResolveBlock,
  Px as ResolvedFieldRow,
  gx as RoleMatrixRow,
  jx as RoutingTable,
  rx as RuleRow,
  yx as RunbookSteps,
  io as STREAM_STEPS,
  AT as SectionBand,
  Gn as SectionHeader,
  Ga as SegmentedControl,
  Ia as Select,
  qx as SessionRow,
  vT as Sidebar,
  dT as SidebarFoldButton,
  ox as StageColumn,
  IT as StageGrid,
  Ax as StageHistory,
  wy as StageListEditor,
  wT as StageSteps,
  qT as StaleStrip,
  Ht as StatStrip,
  CT as StatTiles,
  pT as StreamAvatar,
  lx as StreamRow,
  sT as StudioIcon,
  TT as SubjectRail,
  Ve as Switch,
  _T as TabLinks,
  kT as TableHead,
  fT as Tabs,
  Dx as Tag,
  J2 as ThemeProvider,
  ix as ToolRow,
  ST as TopBar,
  Rw as Tree,
  Za as TreeRow,
  Ox as TypedInputBlock,
  Xl as UNSAFE_HREF,
  Nx as ValidationList,
  V2 as VisibilityProvider,
  Y2 as Visible,
  Z2 as WARD_VERSION,
  Ft as WorkCard,
  OT as WriteUnavailableStrip,
  t2 as agoSince,
  Vr as clock,
  Ay as colourStatus,
  ae as count,
  ue as duration,
  cn as elapsed,
  X2 as eventSourceTransport,
  I2 as headingTag,
  jt as isStreamStep,
  ht as isValidatedStreamStep,
  cp as ladderValidation,
  t0 as mcpConnectionChip,
  Z$ as mcpToolName,
  le as money,
  be as ms,
  er as ordered,
  wa as ratio,
  yk as restartLabel,
  q as safeHref,
  M2 as slug,
  he as stamp,
  dn as stream,
  aT as streamChip,
  Ot as streamChipProps,
  ge as streamColour,
  ho as streamHex,
  xt as streamInitials,
  co as streamVars,
  bT as uniqueStreamInitials,
  xa as useAnchoredPanel,
  Nt as useBorderFlash,
  Ae as useDisabledScope,
  ro as useFocusTrap,
  rT as useLiveFeed,
  Q2 as useReturnFocus,
  Pt as useRovingTabindex,
  un as useTicker,
  Yr as useVisible,
  B as v,
  fx as validateMark,
  wt as validatedStep,
  _a as validatedStreamSteps
};
