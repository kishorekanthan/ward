import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qt, useContext as ge, createContext as ye, useState as p, useEffect as C, useCallback as ee, useRef as _, useLayoutEffect as aa, useId as N, Fragment as Zt, isValidElement as Er, Children as Ir } from "react";
import { createPortal as Mr, flushSync as en } from "react-dom";
function ue(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const vt = (e) => String(e).padStart(2, "0");
function at(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${vt(a % 60)}s` : `${Math.floor(n / 60)}h ${vt(n % 60)}m`;
}
const Br = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function he(e) {
  const a = Br.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function oe(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function te(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function an(e, a) {
  return `${e} / ${a}`;
}
const Pr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function jr(e) {
  return Pr.format(new Date(e));
}
const tn = ye(/* @__PURE__ */ new Set());
function gR({ hidden: e, children: a }) {
  const n = Qt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(tn.Provider, { value: n, children: a });
}
function qr(e) {
  return !ge(tn).has(e);
}
function yR({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: qr(e) ? a : n });
}
const Or = "(prefers-color-scheme: dark)";
function bt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Or) : null;
}
function Dr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = bt()) == null ? void 0 : r.matches) === !0;
  });
  return C(() => {
    const r = e ? bt() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Da(e, a) {
  C(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Hr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function NR({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Dr(e === "system");
  return Da("data-theme", Hr(e, l)), Da("data-accent", a), Da("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Fr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Wr(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function zr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Kr(e, a, n, r) {
  return e.shiftKey ? Wr(a, n) ? r : void 0 : document.activeElement === r || zr(a) ? n : void 0;
}
function Gr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Kr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Ur(e) {
  return { onKeyDown: ee(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Fr));
      Gr(n, e.current, r);
    },
    [e]
  ) };
}
function kR(e, a = !0) {
  C(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const pt = { ArrowUp: -1, ArrowDown: 1 }, gt = { ArrowLeft: -1, ArrowRight: 1 }, Vr = (e, a, n) => Math.min(n, Math.max(a, e));
function Yr(e, a) {
  if (a !== "horizontal" && e in pt) return pt[e];
  if (a !== "vertical" && e in gt) return gt[e];
}
function Ea({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = _(/* @__PURE__ */ new Map()), l = _(!1);
  aa(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], w = l.current;
    l.current = !1, n(h), w && ((f = r.current.get(h)) == null || f.focus());
  });
  const i = ee((u) => n(u), []), s = ee((u) => {
    var h;
    n(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = ee(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(a)), f = Yr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Vr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), d = ee(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === a && (l.current = !0));
      },
      onFocus: () => n(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const $R = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, CR = "0.2.0", SR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Jr = [1, 2, 3, 4, 5, 6], nn = [1, 2, 3], Xr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], RR = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], TR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], I = {
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
    iconRail: "var(--ward-width-iconRail)"
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
    streamAvatar: "var(--ward-type-streamAvatar)"
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
}, ve = {
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
function tt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ia(e) {
  return Jr.includes(e);
}
function da(e) {
  return nn.includes(e);
}
function Qr(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function xR(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Zr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function el(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return Zr[e];
}
function yt(e) {
  return typeof e != "string" ? null : Xr.includes(e) ? e : null;
}
function al(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function tl(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function nl(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function rl(e, a, n) {
  const r = al(e);
  if (r === null) return null;
  const l = yt(n) ?? yt(r.type);
  return l === null ? null : { ...r, type: l, id: tl(r, a), at: nl(r) };
}
function ll(e, a) {
  return e >= ve.staleAfter ? "stale" : e >= ve.heartbeat && a === "live" ? "reconnecting" : null;
}
function ol(e, a, n) {
  return e >= ve.heartbeat && !a && n !== null;
}
function LR(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), j = ee((R) => {
    E.current = R, r(R);
  }, []), ne = ee(() => {
    c.current = Date.now();
  }, []), Ne = ee((R) => {
    for (const [U, ke] of s.current)
      (ke === "*" || R.itemKey === ke) && U(R);
  }, []), re = ee(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, U, ke) => {
        const Fe = rl(R, U, ke);
        Fe !== null && (Fe.id && (d.current = Fe.id), ne(), y.current = !1, j("live"), i(Fe.at), Ne(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, ne(), j("live");
      },
      onError: () => {
        var U;
        (U = h.current) == null || U.close(), h.current = null, y.current = !0, E.current !== "stale" && j("reconnecting");
        const R = Math.min(ve.reconnectBase * 2 ** u.current, ve.reconnectMax);
        u.current += 1, w.current = window.setTimeout(re, R);
      }
    });
  }, [Ne, j, ne, a, e]), Ee = ee((R) => {
    y.current = !0, R.close(), h.current = null, w.current = window.setTimeout(re, ve.reconnectBase);
  }, [re]), Ve = ee((R, U) => (s.current.set(U, R), () => {
    s.current.delete(U);
  }), []);
  return C(() => (re(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, U = ll(R, E.current);
    U && j(U);
    const ke = h.current;
    ol(R, y.current, ke) && Ee(ke);
  }, ve.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (R = h.current) == null || R.close(), h.current = null;
  }), [re, Ee, j]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function nt(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return C(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, ve.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const il = { blue: "running", orange: "waiting", green: "done" };
function sl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Nt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ba(e, a) {
  const n = _(0), r = ee((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (sl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${il[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Nt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Nt(s), ve.flash)));
  }, [a, e]);
  return C(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const cl = "_root_1otpc_2", dl = {
  root: cl
};
function ul(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${jr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = ul(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${dl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      he(e)
    ] })
  ] });
}
const hl = "_app_1bnco_1", ml = "_side_1bnco_35", wl = "_sideTop_1bnco_46", fl = "_sideBody_1bnco_60", _l = "_iconRail_1bnco_99", vl = "_railItem_1bnco_108", bl = "_railIcon_1bnco_129", pl = "_railDot_1bnco_134", gl = "_railLetter_1bnco_140", yl = "_main_1bnco_146", Nl = "_rail_1bnco_108", kl = "_page_1bnco_168", $l = "_headerRow_1bnco_191", Cl = "_sidebarToggle_1bnco_198", Sl = "_headerSlot_1bnco_203", Rl = "_headerAction_1bnco_208", Tl = "_drawerSide_1bnco_213", xl = "_root_1bnco_260", Ll = "_topbar_1bnco_267", Al = "_mark_1bnco_278", El = "_brand_1bnco_285", Il = "_tagline_1bnco_291", Ml = "_identity_1bnco_297", Bl = "_tools_1bnco_298", Pl = "_nav_1bnco_308", jl = "_metadata_1bnco_315", ql = "_actor_1bnco_330", Ol = "_detail_1bnco_331", Dl = "_content_1bnco_376", Hl = "_toolsPanel_1bnco_392", Fl = "_skip_1bnco_418", $ = {
  app: hl,
  side: ml,
  sideTop: wl,
  sideBody: fl,
  iconRail: _l,
  railItem: vl,
  railIcon: bl,
  railDot: pl,
  railLetter: gl,
  main: yl,
  rail: Nl,
  page: kl,
  headerRow: $l,
  sidebarToggle: Cl,
  headerSlot: Sl,
  headerAction: Rl,
  drawerSide: Tl,
  root: xl,
  topbar: Ll,
  mark: Al,
  brand: El,
  tagline: Il,
  identity: Ml,
  tools: Bl,
  nav: Pl,
  metadata: jl,
  actor: ql,
  detail: Ol,
  content: Dl,
  toolsPanel: Hl,
  skip: Fl
};
function ua(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Wl = "_scope_1an6i_2", zl = {
  scope: Wl
}, rn = ye(null);
function AR({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${zl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(rn.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Ae() {
  return ge(rn);
}
function Ma(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : ua(e, a.reasonId);
}
const Kl = "_btn_hrmlj_2", Gl = "_primary_hrmlj_14", Ul = "_destructive_hrmlj_25", Vl = "_secondary_hrmlj_35", Yl = "_ghost_hrmlj_40", Jl = "_overflow_hrmlj_49", Xl = "_sm_hrmlj_56", Ql = "_disabled_hrmlj_60", Zl = "_withReason_hrmlj_68", eo = "_reason_hrmlj_74", Ze = {
  btn: Kl,
  primary: Gl,
  destructive: Ul,
  secondary: Vl,
  ghost: Yl,
  overflow: Jl,
  sm: Xl,
  disabled: Ql,
  withReason: Zl,
  reason: eo
};
function ao(e, a, n, r) {
  const l = a === "sm" ? [Ze.sm, "ward-btn--sm"] : [], i = n ? [Ze.disabled] : [];
  return [Ze.btn, Ze[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function to(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function no(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function ro(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function lo(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function oo(e, a, n) {
  return lo(e.describedBy, a && n);
}
function io({ id: e, reason: a, shown: n }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: n ? `${Ze.reason} ward-btn-reason` : "ward-visually-hidden", children: a }) : null;
}
function so(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = Ae()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(co, { ...e });
}
function co(e) {
  const a = Ae();
  no(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = ro(e, a), s = N(), c = uo(i, a);
  return /* @__PURE__ */ o(c, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: ao(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": oo(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...to(n, e.controls),
        children: so(e)
      }
    ),
    /* @__PURE__ */ t(io, { id: s, reason: i, shown: c === ln })
  ] });
}
function uo(e, a) {
  return e && !a ? ln : Zt;
}
function ln({ children: e }) {
  return /* @__PURE__ */ t("span", { className: `${Ze.withReason} ward-btn-withReason`, children: e });
}
let rt = "none";
function ho(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", ho, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function mo() {
  return rt === "key";
}
function sa(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return C(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const wo = "_scrim_1cawq_2", fo = "_drawer_1cawq_10", _o = "_sheet_1cawq_14", vo = "_modal_1cawq_18", bo = "_panel_1cawq_23", po = "_start_1cawq_44", go = "_header_1cawq_67", yo = "_title_1cawq_75", No = "_body_1cawq_79", ko = "_close_1cawq_106", Te = {
  scrim: wo,
  drawer: fo,
  sheet: _o,
  modal: vo,
  panel: bo,
  start: po,
  header: go,
  title: yo,
  body: No,
  close: ko
}, $o = ye(null), ka = [], $a = /* @__PURE__ */ new Map();
function Co(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function So(e, a) {
  let n = $a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, $a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Ro(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Co(r) && So(e, r);
}
function To(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (Ro(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function xo(e) {
  for (const a of e.claims) {
    const n = $a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), $a.delete(a)));
  }
}
function Lo(e, a) {
  const n = { root: e, claims: [] };
  return ka.push(n), To(n, a), n;
}
function Ao(e) {
  const a = ka.indexOf(e);
  a >= 0 && ka.splice(a, 1), xo(e);
}
function kt(e) {
  return e !== null && ka.at(-1) === e;
}
function Eo(e, a, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Lo(i, a);
    return r.current = c, () => {
      var u, h;
      const d = kt(c);
      Ao(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), ee(() => kt(r.current), []);
}
function Io(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Mo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Bo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function Po(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function jo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${n}${r}`;
}
function qo(e) {
  const a = ge($o);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = _(null), n = _(null), r = N(), l = qo(e.container), i = sa("(min-width: 768px)"), s = Io(e.kind, i), c = Mo(e, r), d = Ur(n), [u] = p(mo), h = Eo(a, l, e.returnFocusTo), w = ee(() => {
    h() && e.onClose();
  }, [e.onClose, h]);
  return C(() => {
    var f;
    h() && ((f = n.current) == null || f.focus());
  }, [h]), C(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Mr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: Po(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: w,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            tabIndex: -1,
            "data-focus-ring": u || void 0,
            className: jo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Bo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Oo = /^([a-z][a-z0-9+.-]*):/i, Do = /* @__PURE__ */ new Set(["http", "https"]), Ho = "#";
function Fo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Oo.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = Fo(e);
  return a === void 0 || Do.has(a) ? e : Ho;
}
function Wo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function on(e) {
  const a = Wo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function zo(e, a) {
  C(() => {
    const n = e.current;
    if (!n) return;
    const r = () => on(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function Ko(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function Go(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Ko(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), on(r);
  }, [e, a, n]);
}
const Uo = "_row_11g8i_2", Vo = {
  row: Uo
};
function Yo(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function lt({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return zo(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Vo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Yo(l, r), ...c, children: a });
}
const Jo = "_icon_1ylqy_2", Xo = {
  icon: Jo
};
function ha({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Xo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function ER() {
  return /* @__PURE__ */ t(ha, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function IR() {
  return /* @__PURE__ */ o(ha, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function MR() {
  return /* @__PURE__ */ o(ha, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function BR() {
  return /* @__PURE__ */ t(ha, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Qo() {
  return /* @__PURE__ */ o(ha, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const sn = "ward:sidebar-collapsed", Zo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ei() {
  try {
    return window.localStorage.getItem(sn) === "true";
  } catch {
    return !1;
  }
}
function ai(e) {
  try {
    window.localStorage.setItem(sn, String(e));
  } catch {
  }
}
function ti(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function ni(e) {
  return e instanceof Element && e.closest(Zo) !== null;
}
function ri(e) {
  return e.key === "[" && !ti(e) && !ni(e.target);
}
function li(e) {
  const [a, n] = p(ei), r = () => {
    ai(!a), n(!a);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!ri(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function oi() {
  const e = sa("(max-width: 767.98px)"), a = sa("(max-width: 1023.98px)");
  return e ? "phone" : a ? "medium" : "wide";
}
function ii(e) {
  const a = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !a && i(!1), { narrow: a, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function si({ header: e, action: a, label: n, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: n }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e }),
    hn(a) && /* @__PURE__ */ t("span", { className: $.headerAction, children: a })
  ] }) : e;
}
function ci(e, a) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", a), window.addEventListener("popstate", a), () => {
        window.removeEventListener("hashchange", a), window.removeEventListener("popstate", a);
      };
  }, [e, a]);
}
function di({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (ci(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: cn(e, !1) }) });
}
function ui(e) {
  const [a, n] = p(!1);
  return a && e !== "medium" && n(!1), { open: a, toggle: () => n(!a) };
}
function hi(e, a) {
  const n = li(e === "wide" && !a), r = ui(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function mi(e, a) {
  const n = hi(a, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return fi(e.collapsed, a);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: a !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const wi = (e) => e.collapsed && e.drawsStrip;
function fi(e, a) {
  return { enabled: !1, collapsed: a === "medium" || e && a === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $t = (e) => e ? "" : void 0;
function cn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function dn({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Qo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function _i({ fold: e, inSidebar: a }) {
  return !e.enabled || a ? null : /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ t(dn, { fold: e }) });
}
const un = ye(null);
function PR() {
  const e = ge(un);
  return e === null || !e.enabled ? null : /* @__PURE__ */ t(dn, { fold: e });
}
function vi({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function bi({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: F(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(vi, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function pi({ sidebar: e, label: a, iconRail: n, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(_i, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: i, children: cn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(bi, { items: n ?? [], label: a })
  ] });
}
const hn = (e) => e != null;
function gi(e) {
  const { sidebar: a, header: n, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = hn(i), u = oi(), h = ii(u), w = mi(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": $t(wi(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ t(un.Provider, { value: w, children: /* @__PURE__ */ t(pi, { sidebar: a, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(si, { header: n, action: r, label: f, drawer: h }),
      /* @__PURE__ */ t("div", { className: $.page, "data-fill": $t(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ t("div", { className: $.rail, children: i }),
    /* @__PURE__ */ t(di, { sidebar: a, label: f, drawer: h })
  ] });
}
function yi({ destinations: e, active: a }) {
  const n = _(null);
  return Go(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(lt, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: F(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Ni({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function ki() {
  const e = sa("(max-width: 767.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function $i({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Ci({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Si(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(yi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Ni, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t($i, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ri(e) {
  const a = N(), n = ki();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Si, { ...e, menu: n }),
    /* @__PURE__ */ t(Ci, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Ti(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function jR(e) {
  return Ti(e) ? /* @__PURE__ */ t(gi, { ...e }) : /* @__PURE__ */ t(Ri, { ...e });
}
const xi = "_root_itg9o_2", Li = "_row_itg9o_8", Ai = "_box_itg9o_14", Ei = "_label_itg9o_21", Ii = "_labelHidden_itg9o_26", Mi = "_lockedNote_itg9o_36", Bi = "_consequence_itg9o_44", Pi = "_sample_itg9o_79", Be = {
  root: xi,
  row: Li,
  box: Ai,
  label: Ei,
  labelHidden: Ii,
  lockedNote: Mi,
  consequence: Bi,
  sample: Pi
};
function ji(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function qi({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function Oi({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Di({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function mn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Ae(), l = ji(e, r);
  return /* @__PURE__ */ o("div", { className: `${Be.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Be.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Be.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ma(ua(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ t(Oi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Di, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(qi, { id: n, text: e.consequence })
  ] });
}
const Hi = "_chip_pq6tb_2", Fi = {
  chip: Hi
}, Wi = {
  gate: I.chip.gate,
  system: I.chip.system,
  write: I.chip.write,
  drift: I.chip.drift,
  done: I.chip.done,
  attention: I.chip.attention,
  failed: I.chip.failed,
  pending: I.chip.pending,
  running: I.chip.running,
  warn: I.chip.warn,
  meta: I.chip.meta,
  soft: I.chip.soft,
  quiet: I.chip.quiet,
  owed: I.chip.owed,
  neutral: I.chip.quiet,
  info: I.chip.running,
  success: I.chip.done,
  warning: I.chip.attention,
  danger: I.chip.failed
};
function zi(e, a) {
  if (e === "stream") return Ki(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Wi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ki(e) {
  if (!e || !da(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Fi.chip} ward-chip ward-chip--${e}`, style: zi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Gi = "_clamp_zn74g_3", Ct = {
  clamp: Gi
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Ct.clamp : `${Ct.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ma(e) {
  return typeof e == "number" && da(e) ? e : null;
}
function pe(e, a) {
  const n = ma(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ba(e, a) {
  const n = ma(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Ui = "_root_13eei_3", Vi = "_nav_13eei_8", Yi = "_list_13eei_16", Ji = "_item_13eei_24", Xi = "_link_13eei_44", Qi = "_sep_13eei_54", Zi = "_current_13eei_58", es = "_chips_13eei_62", Me = {
  root: Ui,
  nav: Vi,
  list: Yi,
  item: Ji,
  link: Xi,
  sep: Qi,
  current: Zi,
  chips: es
};
function as({ step: e, isCurrent: a }) {
  return a ? /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: F(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function ts({ path: e, chips: a, current: n = !0 }) {
  return /* @__PURE__ */ t("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(as, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((r) => /* @__PURE__ */ t(m, { ...r }, r.label)) }) : null
  ] }) });
}
function wn(e, a, n) {
  const r = _(n);
  r.current = n, C(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const ns = 500;
function fn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function _n() {
  const e = _(""), a = _(void 0);
  return C(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, ns), e.current);
}
const wa = 4;
function rs(e, a, n) {
  const r = Math.max(0, n - e.bottom - wa * 2), l = Math.max(0, e.top - wa * 2);
  return a <= r || r >= l ? { top: e.bottom + wa, maxHeight: r } : { top: e.top - wa - Math.min(a, l), maxHeight: l };
}
function ls(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function os(e, a, n, r) {
  return { ...rs(e, a.height, n.height), left: ls(e, a.width, n.width, r) };
}
function pa(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function is(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pa(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function ss(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function St(e, a, n) {
  const r = ss(e), l = is(e, a), i = os(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pa(i.left - l.box.left), top: pa(i.top - l.box.top), maxHeight: pa(i.maxHeight) }), r();
}
function cs(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function vn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = cs(r), s = () => St(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && St(a.current, e.current, n);
  });
}
const ds = "_root_1lgbn_2", us = "_trigger_1lgbn_7", hs = "_value_1lgbn_47", ms = "_menu_1lgbn_65", ws = "_find_1lgbn_87", fs = "_list_1lgbn_103", _s = "_option_1lgbn_114", vs = "_check_1lgbn_133", bs = "_empty_1lgbn_144", be = {
  root: ds,
  trigger: us,
  value: hs,
  menu: ms,
  find: ws,
  list: fs,
  option: _s,
  check: vs,
  empty: bs
}, ps = 7;
function gs(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Rt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function ys(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Rt(e.options, e.value)), d = (u) => {
    var h;
    en(() => r(!1)), u && ((h = a.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: gs(e.options, l),
    findable: e.options.length > ps,
    show: () => {
      e.disabled || (i(""), c(Rt(e.options, e.value)), r(!0));
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
function Ns(e, a) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ks(e) {
  const a = _n();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function bn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function $s(e) {
  return { ...bn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function pn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Cs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ss(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Cs.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Rs({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === n.active || void 0,
      className: be.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: be.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: be.label, children: e.option.label })
      ]
    }
  );
}
function ot(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function Ts({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: be.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": ot(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: pn(e, bn(e), () => {
      })
    }
  );
}
function xs({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = ks(a), s = _(null);
  vn(l, s);
  const c = (d) => {
    fn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: be.menu, children: [
    a.findable && /* @__PURE__ */ t(Ts, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: be.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : ot(a, n),
        onKeyDown: pn(a, $s(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Rs, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: be.empty, children: "No match" })
  ] });
}
function Ls(e, a) {
  const n = e.open ? ot(e, a) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function gn(...e) {
  return e.filter(Boolean).join(" ");
}
function As(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Es({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: gn(be.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ua(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Ss(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: be.value, "data-placeholder": i || void 0, children: As(e) })
    }
  );
}
function yn(e) {
  const a = Ae(), n = a ? { ...e, disabled: !0, "aria-describedby": Ma(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = ys(n, s), u = Ns(d.open, c);
  return wn(d.open, i, () => d.close(!1)), Ls(d, l), /* @__PURE__ */ o("div", { ref: i, className: gn(be.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Es, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(xs, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Is = "_field_1ensj_2", Ms = "_label_1ensj_8", Bs = "_labelHidden_1ensj_15", Ps = "_control_1ensj_25", js = "_mono_1ensj_45", qs = "_area_1ensj_50", Os = "_invalid_1ensj_57", Oe = {
  field: Is,
  label: Ms,
  labelHidden: Bs,
  control: Ps,
  mono: js,
  area: qs,
  invalid: Os
}, Ds = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, Nn = (e) => `${e}-label`;
function Hs({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Ds : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Fs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    yn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": Nn(a.id),
      "aria-invalid": a["aria-invalid"],
      "aria-describedby": a["aria-describedby"],
      value: e.value,
      options: e.options ?? [],
      disabled: a.disabled,
      placeholder: e.placeholder,
      onChange: e.onChange,
      size: e.variant === "toolbar" ? "md" : void 0
    }
  );
}
function Ws({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const zs = { input: Hs, select: Fs, textarea: Ws };
function Ks(e, a, n) {
  const r = zs[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Gs(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ma(ua(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Us(e) {
  const a = e.mono ? [Oe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Oe.area] : [];
  return [Oe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Vs(e) {
  return e ? `${Oe.label} ${Oe.labelHidden} ward-field-label` : `${Oe.label} ward-field-label`;
}
function B(e) {
  const a = N(), n = `${a}-msg`, r = Gs(e, a, n, Ae()), l = Us(e);
  return /* @__PURE__ */ o("div", { className: `${Oe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: Nn(a), className: Vs(e.labelHidden), htmlFor: a, children: e.label }),
    Ks(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Oe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ys = "_root_1waw7_2", Js = "_trigger_1waw7_9", Xs = "_panel_1waw7_33", Qs = "_menu_1waw7_53", Zs = "_group_1waw7_58", ec = "_heading_1waw7_63", ac = "_item_1waw7_69", tc = "_description_1waw7_84", nc = "_marked_1waw7_93", rc = "_check_1waw7_98", lc = "_separator_1waw7_123", oc = "_footer_1waw7_129", X = {
  root: Ys,
  trigger: Js,
  panel: Xs,
  menu: Qs,
  group: Zs,
  heading: ec,
  item: ac,
  description: tc,
  marked: nc,
  check: rc,
  separator: lc,
  footer: oc
}, kn = ye(null);
function ic(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      en(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const sc = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function cc(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = sc.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function $n(...e) {
  return e.filter(Boolean).join(" ");
}
function dc(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: $n(X.trigger, r) };
}
function Cn(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = _(null), l = _(null), i = ic(e.defaultOpen === !0, l);
  return wn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: $n(X.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...dc(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...cc(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(kn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function uc(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function hc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const Sn = (e, a) => (e % a + a) % a;
function ea(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = Sn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const mc = (e) => e.split("").every((a) => a === e[0]);
function wc(e, a, n) {
  const r = mc(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = Sn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function fc(e) {
  const a = _([]);
  return {
    items: e,
    refs: a,
    current: () => a.current.indexOf(document.activeElement),
    focus: (n) => {
      var r;
      return (r = a.current[n]) == null ? void 0 : r.focus();
    }
  };
}
function _c(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(ea(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(ea(n, e.current(), -1))],
    ["Home", () => e.focus(ea(n, -1, 1))],
    ["End", () => e.focus(ea(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function vc(e, a) {
  const n = _(!1), r = _n(), l = _c(e, a), i = (s) => {
    fn(s) && e.focus(wc(e.items, e.current(), r(s.key)));
  };
  return {
    onKeyDown: (s) => {
      s.key === "Tab" && (n.current = !0);
      const c = l.get(s.key);
      if (!c) return i(s);
      s.preventDefault(), s.stopPropagation(), c();
    },
    onKeyUp: (s) => {
      s.key === " " && s.preventDefault();
    },
    onBlur: () => {
      n.current && a.close(!1);
    }
  };
}
function bc(e) {
  const a = e.findIndex((n) => n.current && !n.disabled);
  return a === -1 ? ea(e, -1, 1) : a;
}
function pc(e, a) {
  const { start: n, request: r } = a, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? bc(i) : ea(i, i.length, -1));
  }, [n, r]);
}
function gc({ row: e, nav: a, popup: n }) {
  const { item: r, at: l } = e;
  return {
    onMouseDown: (i) => i.preventDefault(),
    onMouseMove: () => {
      !r.disabled && a.current() !== l && a.focus(l);
    },
    onClick: (i) => {
      var s;
      if (r.disabled) return i.preventDefault();
      (s = r.onSelect) == null || s.call(r), n.close(!0);
    }
  };
}
function yc(e, a) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": a + "-label", "aria-describedby": a + "-description" }, r = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { id: a + "-label", children: e.label }),
    /* @__PURE__ */ t("span", { id: a + "-description", className: X.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function Nc() {
  return /* @__PURE__ */ t("svg", { className: X.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function kc(e, a, n) {
  return n ? { className: X.item + " " + X.marked, content: /* @__PURE__ */ o(T, { children: [
    e.current ? /* @__PURE__ */ t(Nc, {}) : null,
    a
  ] }) } : { className: X.item, content: a };
}
function Rn(e) {
  const { item: a, at: n } = e.row, r = yc(a, N()), l = kc(a, r.content, e.nav.items.some((s) => s.current)), i = {
    ref: (s) => {
      e.nav.refs.current[n] = s;
    },
    role: "menuitem",
    tabIndex: -1,
    className: l.className,
    "aria-current": a.current ? "true" : void 0,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...r.aria,
    ...gc(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: F(a.href), ...i, children: l.content }) : /* @__PURE__ */ t("button", { type: "button", ...i, children: l.content });
}
function $c({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: X.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: X.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(Rn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Cc({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: X.separator }) : e.kind === "group" ? /* @__PURE__ */ t($c, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(Rn, { row: e.row, nav: a, popup: n });
}
function Sc() {
  const e = ge(kn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Tn({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Sc(), c = _(null);
  vn(s, c, n);
  const d = uc(e), u = fc(d.flatMap(hc).map((w) => w.item)), h = vc(u, r);
  return pc(u, r), /* @__PURE__ */ o("div", { ref: c, className: X.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: X.menu, ...h, children: d.map((w, f) => /* @__PURE__ */ t(Cc, { block: w, nav: u, popup: r }, f)) }),
    a && /* @__PURE__ */ t("p", { className: X.footer, children: a })
  ] });
}
function Rc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function xn(e, a) {
  C(() => {
    const n = e.current;
    a === "page" && n && !Rc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const Tc = (e, a) => e.reduce((n, r) => n + r + a, -a);
function xc({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Tc(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ha = (e) => Number.parseFloat(e) || 0, Tt = (e) => e.getBoundingClientRect().width;
function Lc(e, a) {
  const n = getComputedStyle(e), r = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(n.paddingInlineStart) - Ha(n.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(a), Tt),
    more: r ? Tt(r) : 0,
    gap: Ha(n.columnGap)
  };
}
function Ac(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Ec = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Ln(e, a, n, r = ':scope > [role="tab"]') {
  const [l, i] = p(null);
  return aa(() => {
    const s = e.current;
    if (!s) return;
    const c = () => {
      const d = Lc(s, r);
      i((u) => Ec(u, d) ? u : d);
    };
    return c(), Ac(s, c);
  }, [e, n, r]), l && xc(l, a);
}
const Ic = "_strip_jqyo6_2", Mc = "_fits_jqyo6_19", Bc = "_probe_jqyo6_27", Pc = "_moreRoot_jqyo6_36", jc = "_more_jqyo6_36", qc = "_tab_jqyo6_55", Oc = "_count_jqyo6_91", Q = {
  strip: Ic,
  fits: Mc,
  probe: Bc,
  moreRoot: Pc,
  more: jc,
  tab: qc,
  count: Oc
}, An = "More";
function Dc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const En = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function In(e) {
  return `${Q.strip} ward-tabs ward-tabs--${e}`;
}
const Hc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Fc({ tab: e, active: a, place: n, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${Q.tab} ward-tab`,
      "aria-selected": e.id === a,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...n,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: Q.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function Wc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function zc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Cn, { label: An, className: Q.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: Q.more }, children: /* @__PURE__ */ t(Tn, { align: "end", entries: e.map((r) => ({ label: En(r), onSelect: () => n(r.id) })) }) });
}
function Kc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Hc;
}
function qR({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = Ea({ orientation: "horizontal" }), s = Dc(e, a);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  xn(c, l);
  const d = Ln(c, s, e.map(En).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${In(l)} ${Q.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ t(Fc, { tab: h, active: a, place: Kc(i, d, w), onChange: n }, h.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${X.trigger} ${Q.more} ${Q.probe}`, children: An }),
    u.length > 0 && /* @__PURE__ */ t(zc, { tabs: u, trigger: i.itemProps(e.length), onPick: Wc(c, n) })
  ] });
}
const xt = 7, Mn = "More", Gc = ":scope > a", Bn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`, Uc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Vc(e, a) {
  return !e || e.includes(a) ? {} : Uc;
}
function Yc({ link: e, current: a, place: n }) {
  return /* @__PURE__ */ o("a", { href: e.href, className: `${Q.tab} ward-tab`, "aria-current": a ? "page" : void 0, ...n, children: [
    e.label,
    e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: Q.count, children: `· ${e.count}` })
    ] })
  ] });
}
function Jc({ links: e }) {
  return /* @__PURE__ */ t(Cn, { label: Mn, className: Q.moreRoot, trigger: { className: Q.more }, children: /* @__PURE__ */ t(Tn, { align: "end", entries: e.map((a) => ({ label: Bn(a), href: a.href })) }) });
}
function OR({ links: e, active: a, label: n, level: r }) {
  if (e.length > xt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xt} — the set is fixed`);
  const l = _(null);
  xn(l, r);
  const i = Math.max(0, e.findIndex((d) => d.id === a)), s = Ln(l, i, e.map(Bn).join(`
`), Gc), c = s ? e.filter((d, u) => !s.includes(u)) : [];
  return /* @__PURE__ */ o("nav", { ref: l, className: `${In(r)} ${Q.fits}`, "aria-label": n, "data-level": r, children: [
    e.map((d, u) => /* @__PURE__ */ t(Yc, { link: d, current: d.id === a, place: Vc(s, u) }, d.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${X.trigger} ${Q.more} ${Q.probe}`, children: Mn }),
    c.length > 0 && /* @__PURE__ */ t(Jc, { links: c })
  ] });
}
const Xc = "_root_v56ff_3", Qc = "_segment_v56ff_9", Lt = {
  root: Xc,
  segment: Qc
};
function Pn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = Ea({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return C(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Lt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Lt.segment,
      "aria-checked": d.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => n(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Zc = "_sidebar_s9o1j_3", ed = "_brand_s9o1j_9", ad = "_mark_s9o1j_17", td = "_word_s9o1j_24", nd = "_nav_s9o1j_30", rd = "_navItem_s9o1j_39", ld = "_footLink_s9o1j_49", od = "_group_s9o1j_58", id = "_groupName_s9o1j_65", sd = "_agents_s9o1j_81", cd = "_agent_s9o1j_81", dd = "_root_s9o1j_96", ud = "_agentTop_s9o1j_105", hd = "_dot_s9o1j_112", md = "_agentName_s9o1j_124", wd = "_agentMeta_s9o1j_138", fd = "_foot_s9o1j_49", _d = "_footName_s9o1j_150", vd = "_footLinks_s9o1j_157", bd = "_linkBrand_s9o1j_184", pd = "_label_s9o1j_205", gd = "_note_s9o1j_210", yd = "_footer_s9o1j_226", x = {
  sidebar: Zc,
  brand: ed,
  mark: ad,
  word: td,
  nav: nd,
  navItem: rd,
  new: "_new_s9o1j_48",
  footLink: ld,
  group: od,
  groupName: id,
  agents: sd,
  agent: cd,
  root: dd,
  agentTop: ud,
  dot: hd,
  agentName: md,
  agentMeta: wd,
  foot: fd,
  footName: _d,
  footLinks: vd,
  linkBrand: bd,
  label: pd,
  note: gd,
  footer: yd
};
function Nd({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: F(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: x.agentTop, children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: x.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": tt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function kd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function $d({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: F(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        te(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: F(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Nd, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(kd, { shared: i })
  ] });
}
function Cd(e) {
  return e.destinations ?? e.items ?? [];
}
function Sd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Rd({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Td({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function xd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Sd, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Cd(e).map((a) => /* @__PURE__ */ t(Td, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Rd, { children: e.children })
  ] });
}
function Ld(e) {
  return "agents" in e;
}
function DR(e) {
  return Ld(e) ? /* @__PURE__ */ t($d, { ...e }) : /* @__PURE__ */ t(xd, { ...e });
}
const Ad = "_mark_wlgi8_3", Ed = {
  mark: Ad
}, Id = { met: "✓", unmet: "", failed: "✕" };
function it({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Ed.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Id[e]
    }
  );
}
const Md = "_avatar_1t33a_3", Bd = {
  avatar: Md
};
function Ca(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function Pd(e) {
  const a = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = a.charAt(0);
  return [Ca(e), ...[...a.slice(1)].map((r) => n + r)];
}
function jd(e, a) {
  const n = Pd(e).find((l) => !a.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; a.has(Ca(e).charAt(0) + String(r)); ) r += 1;
  return Ca(e).charAt(0) + String(r);
}
function HR(e) {
  const a = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = jd(r, a);
    a.add(l), n.set(r, l);
  }
  return n;
}
function qd(e) {
  return e != null && da(e) ? Qr(e) : void 0;
}
function FR({ name: e, step: a, size: n = "md", initials: r }) {
  return /* @__PURE__ */ t("span", { className: Bd.avatar, "data-size": n, "aria-hidden": "true", style: qd(a), children: r ?? Ca(e) });
}
const Od = "_marker_br9fi_2", Dd = {
  marker: Od
}, Hd = {
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
}, Fd = { running: " ward-running" };
function He({ size: e, kind: a, label: n }) {
  const r = { "--marker": Hd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Dd.marker} ward-marker ward-marker--${a}${Fd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Wd = "_root_ti0pq_2", zd = "_chip_ti0pq_11", Kd = "_noCase_ti0pq_23", fa = {
  root: Wd,
  chip: zd,
  noCase: Kd
};
function Gd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function st({ connection: e, since: a, lastEventAt: n }) {
  const r = Gd(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${fa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: fa.noCase, children: at(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    he(r)
  ] });
}
const Ud = "_root_yylks_2", Vd = "_context_yylks_13", Yd = "_row_yylks_1", Jd = "_heading_yylks_27", Xd = "_headingWrap_yylks_35", Qd = "_meta_yylks_41", Zd = "_chips_yylks_49", eu = "_title_yylks_56", au = "_consequence_yylks_66", tu = "_actionsWrap_yylks_73", nu = "_actions_yylks_73", ru = "_action_yylks_73", lu = "_overflowPanel_yylks_102", ou = "_measureClip_yylks_113", iu = "_measure_yylks_113", K = {
  root: Ud,
  context: Vd,
  row: Yd,
  heading: Jd,
  headingWrap: Xd,
  meta: Qd,
  chips: Zd,
  title: eu,
  consequence: au,
  actionsWrap: tu,
  actions: nu,
  action: ru,
  overflowPanel: lu,
  measureClip: ou,
  measure: iu
};
function su({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ t("h1", { className: K.title, children: e });
}
function cu({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: K.chips, children: e.map((a) => /* @__PURE__ */ t(m, { ...a }, a.label)) }) : null;
}
function du({ consequence: e, consequenceHint: a }) {
  return e ? /* @__PURE__ */ t("p", { className: K.consequence, title: a, children: e }) : null;
}
function uu({ chips: e = [], consequence: a, consequenceHint: n }) {
  return e.length === 0 && !a ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ t(cu, { chips: e }),
    /* @__PURE__ */ t(du, { consequence: a, consequenceHint: n })
  ] });
}
function hu({ title: e, chips: a, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ t(su, { title: e, density: l }),
    /* @__PURE__ */ t(uu, { chips: a, consequence: n, consequenceHint: r })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: K.action, "data-action": "", children: a }, n));
}
function At({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function mu({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(At, { disclosure: l }) : a ? [/* @__PURE__ */ t(At, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function wu(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function fu({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function _u(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const vu = (e, a) => e.trim().toLowerCase() === a.trim().toLowerCase();
function bu(e = [], a, n) {
  const r = e.at(-1);
  return r !== void 0 && vu(r.label, a) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function pu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: K.context, children: /* @__PURE__ */ t(ts, { path: e.path, current: e.current }) });
}
function gu(...e) {
  return e.some((a) => a === null);
}
function yu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Nu(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + yu(e);
}
function ku(e, a, n, r, l) {
  if (l === 0 || gu(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Nu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function $u(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Cu(e) {
  return Er(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Su(e, a) {
  return a.length === 0 && e.length === 1 && Cu(e[0]);
}
function Ru(e, a) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!$u(d)) return;
    const u = () => c(ku(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Tu({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function xu({ connection: e }) {
  return e ? /* @__PURE__ */ t(st, { connection: e.connection, since: e.since }) : null;
}
function WR({ crumb: e, crumbCurrent: a, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: j } = Ru(s, Su(s, c)), ne = c.length > 0, { disclosure: Ne, close: re } = _u(j || ne, y), Ee = wu(c, s, j, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": h, children: [
    /* @__PURE__ */ t(pu, { crumb: bu(e, r, a) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ t(hu, { title: r, chips: n, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ t(xu, { connection: d }),
        /* @__PURE__ */ t("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ t(mu, { actions: s, hasMore: ne, collapsed: j, onOverflow: u, disclosure: Ne }) })
      ] })
    ] }),
    /* @__PURE__ */ t(fu, { actions: Ee, disclosure: Ne, onEscape: re }),
    /* @__PURE__ */ t(Tu, { actions: s, hasMore: ne, measureRef: E })
  ] });
}
const Lu = "_root_td96x_2", Au = "_body_td96x_16", Et = {
  root: Lu,
  body: Au
};
function zR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Et.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Et.body, children: n }) });
}
const Eu = "_root_bf1pc_2", Iu = "_table_bf1pc_9", Mu = "_caption_bf1pc_14", Bu = "_series_bf1pc_23", Pu = "_category_bf1pc_31", ju = "_cell_bf1pc_39", qu = "_track_bf1pc_45", Ou = "_lane_bf1pc_52", Du = "_bar_bf1pc_56", Hu = "_value_bf1pc_63", Fu = "_swatch_bf1pc_70", Wu = "_empty_bf1pc_78", J = {
  root: Eu,
  table: Iu,
  caption: Mu,
  series: Bu,
  category: Pu,
  cell: ju,
  track: qu,
  lane: Ou,
  bar: Du,
  value: Hu,
  swatch: Fu,
  empty: Wu
}, zu = "—", It = 6;
function Ku(e, a) {
  if (a.length < 1 || a.length > It)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${It}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Gu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function jn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Uu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Vu({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Uu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Yu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": jn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ju({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Xu({ title: e, categories: a, series: n, top: r, format: l = te, categoryHead: i = "Category", missing: s = zu }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Yu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, h) => /* @__PURE__ */ t(Vu, { value: u.values[d], top: r, step: jn(h, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function KR(e) {
  Ku(e.categories, e.series);
  const a = Gu(e.series);
  return a === 0 ? /* @__PURE__ */ t(Ju, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Xu, { ...e, top: a });
}
const Qu = "_root_1bfqw_2", Zu = "_figure_1bfqw_7", eh = "_of_1bfqw_13", ah = "_bar_1bfqw_18", th = "_rows_1bfqw_38", nh = "_row_1bfqw_38", rh = "_label_1bfqw_49", lh = "_amount_1bfqw_54", Ie = {
  root: Qu,
  figure: Zu,
  of: eh,
  bar: ah,
  rows: th,
  row: nh,
  label: rh,
  amount: lh
};
function oh({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      oe(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        oe(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${oe(e)} of ${oe(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: oe(l.amount) })
    ] }, l.label)) })
  ] });
}
const ih = "_frame_lmfp9_2", sh = "_table_lmfp9_6", ch = "_th_lmfp9_12", dh = "_td_lmfp9_13", uh = "_sort_lmfp9_48", hh = "_row_lmfp9_60", mh = "_empty_lmfp9_68", je = {
  frame: ih,
  table: sh,
  th: ch,
  td: dh,
  sort: uh,
  row: hh,
  empty: mh
}, wh = { asc: "ascending", desc: "descending" };
function fh(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return wh[a.direction];
}
function _h(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: je.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function vh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function bh({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: je.th,
      style: vh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": fh(e, a),
      children: _h(e, n)
    }
  );
}
function ph({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: je.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t(
        "td",
        {
          className: je.td,
          "data-align": l.align,
          "data-mono": l.mono,
          "data-drop": l.dropPriority,
          "data-label": a.narrow ? l.header : void 0,
          children: a.renderCell(e, l.key)
        },
        l.key
      ))
    }
  );
}
function gh({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u,
  narrow: h
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: je.empty, children: u }) : /* @__PURE__ */ t("div", { className: je.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: je.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: je.head, children: a.map((w) => /* @__PURE__ */ t(bh, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w) => /* @__PURE__ */ t(ph, { row: w, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const yh = "_list_v0s52_2", Nh = {
  list: yh
};
function GR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Nh.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const kh = "_label_1u62a_2", $h = {
  label: kh
};
function UR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: $h.label, children: a.header }) }, a.key)) }) });
}
const Ch = "_stack_bp6a0_2", Sh = {
  stack: Ch
};
function VR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Sh.stack, "data-ward-action-stack": "", children: e });
}
const Rh = "_set_1z0sq_2", Th = "_legend_1z0sq_7", xh = "_row_1z0sq_15", Lh = "_control_1z0sq_20", Ah = "_input_1z0sq_26", Eh = "_label_1z0sq_31", Ih = "_consequence_1z0sq_36", We = {
  set: Rh,
  legend: Th,
  row: xh,
  control: Lh,
  input: Ah,
  label: Eh,
  consequence: Ih
};
function qn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: We.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: We.legend, children: e }),
    a.map((h) => {
      const w = `${u}-${h.value}`, f = h.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: We.row, children: [
        /* @__PURE__ */ o("span", { className: We.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: We.input,
              value: h.value,
              checked: n === h.value,
              disabled: l,
              "aria-describedby": ua(f, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: We.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ t("p", { id: f, className: `${We.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Mh = "_root_11gpw_2", Bh = "_head_11gpw_10", Ph = "_note_11gpw_29", jh = "_index_11gpw_34", qh = "_dot_11gpw_38", Oh = "_counter_11gpw_49", Dh = "_trailing_11gpw_57", ze = {
  root: Mh,
  head: Bh,
  note: Ph,
  index: jh,
  dot: qh,
  counter: Oh,
  trailing: Dh
};
function Hh({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${ze.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: ze.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Fh({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: ze.counter, "aria-hidden": "true", children: e }) : null;
}
function Mt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${ze.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: ze.head, children: [
      /* @__PURE__ */ t(Hh, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: ze.note, children: n }),
    /* @__PURE__ */ t(Fh, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: ze.trailing, children: i })
  ] });
}
const Wh = "_strip_c3x3u_2", zh = "_cell_c3x3u_7", Kh = "_value_c3x3u_12", Gh = "_link_c3x3u_29", Uh = "_label_c3x3u_49", Vh = "_tiles_c3x3u_101", De = {
  strip: Wh,
  cell: zh,
  value: Kh,
  link: Gh,
  label: Uh,
  tiles: Vh
};
function On(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Dn = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Yh({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Dn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Jh({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Dn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: F(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Hn = (e) => e.href === void 0 ? /* @__PURE__ */ t(Yh, { cell: e }, e.label) : /* @__PURE__ */ t(Jh, { cell: e, href: e.href }, e.label);
function Pa({ cells: e, divided: a = !1 }) {
  return On("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(Hn) });
}
const Bt = 6;
function YR({ cells: e }) {
  On("StatTiles", e, [1, 2 * Bt]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, Bt) };
  return /* @__PURE__ */ t("dl", { className: `${De.tiles} ward-stattiles`, style: a, children: e.map(Hn) });
}
const Xh = "_root_1eb1u_2", Qh = "_track_1eb1u_8", Zh = "_thumb_1eb1u_46", em = "_labelHidden_1eb1u_64", am = "_label_1eb1u_64", tm = "_lockedNote_1eb1u_84", Ke = {
  root: Xh,
  track: Qh,
  thumb: Zh,
  labelHidden: em,
  label: am,
  lockedNote: tm
};
function nm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function rm(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = nm(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${Ke.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": h,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Ma(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${Ke.track} ward-switch`,
        "data-on": h,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!h)),
        children: /* @__PURE__ */ t("span", { className: Ke.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: rm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const lm = "_bar_1vp69_2", om = "_skip_1vp69_11", im = "_mark_1vp69_22", sm = "_nav_1vp69_30", cm = "_list_1vp69_34", dm = "_select_1vp69_41", um = "_selectTrigger_1vp69_45", hm = "_dest_1vp69_52", mm = "_actor_1vp69_71", wm = "_actorMark_1vp69_84", fm = "_actorLabel_1vp69_89", _m = "_tagline_1vp69_108", se = {
  bar: lm,
  skip: om,
  mark: im,
  nav: sm,
  list: cm,
  select: dm,
  selectTrigger: um,
  dest: hm,
  actor: mm,
  actorMark: wm,
  actorLabel: fm,
  tagline: _m
};
function vm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function bm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function JR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = bm(r);
  return /* @__PURE__ */ o("header", { className: se.bar, children: [
    /* @__PURE__ */ t("a", { className: `${se.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: se.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: se.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: se.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: se.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${se.dest} ward-target`,
          href: F(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        yn,
        {
          className: se.select,
          triggerClassName: se.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: se.actor, children: [
      /* @__PURE__ */ t("span", { className: se.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: se.actorMark, "aria-hidden": "true", children: vm(c) })
    ] })
  ] });
}
const pm = "_tree_zzoob_2", gm = "_item_zzoob_6", ym = "_row_zzoob_10", Nm = "_button_zzoob_22", Sa = {
  tree: pm,
  item: gm,
  row: ym,
  button: Nm
}, Fn = ye(null);
function km({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Ea({ orientation: "vertical" });
  return /* @__PURE__ */ t(Fn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: Sa.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const $m = { ArrowRight: !0, ArrowLeft: !1 };
function Pt(e) {
  return e ? !0 : void 0;
}
function Cm(e, a) {
  const n = $m[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Sm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Rm(e) {
  const a = [Sa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Tm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function xm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Lm(e) {
  return typeof e == "string" ? e : void 0;
}
function Am({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Em({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Wn(e) {
  const a = ge(Fn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Tm(e);
  return /* @__PURE__ */ o("li", { className: Sa.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Rm(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Pt(e.unresolved),
        "data-inherited": Pt(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${Sa.button} ward-treeitem-btn`,
            onClick: () => Sm(e),
            onKeyDown: (r) => Cm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: xm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Lm(e.label), children: e.label }),
              /* @__PURE__ */ t(Am, { value: e.detail }),
              /* @__PURE__ */ t(Em, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Im = "_frame_10gwd_2", Mm = "_subjectRail_10gwd_22", Bm = "_subject_10gwd_22", Pm = "_rail_10gwd_42", jm = "_record_10gwd_66", qm = "_recordBody_10gwd_71", Om = "_stageGrid_10gwd_120", Dm = "_band_10gwd_134", Hm = "_bandBody_10gwd_142", Fm = "_bandActions_10gwd_147", Wm = "_scroller_10gwd_155", zm = "_board_10gwd_182", Km = "_lanes_10gwd_191", Gm = "_cardGrid_10gwd_225", Z = {
  frame: Im,
  subjectRail: Mm,
  subject: Bm,
  rail: Pm,
  record: jm,
  recordBody: qm,
  stageGrid: Om,
  band: Dm,
  bandBody: Hm,
  bandActions: Fm,
  scroller: Wm,
  board: zm,
  lanes: Km,
  cardGrid: Gm
};
function XR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function jt(e) {
  return e ? "true" : void 0;
}
function QR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": jt(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": jt(l), "aria-label": r, children: a })
  ] });
}
function ZR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Um = "_form_1j8ub_2", Vm = "_fields_1j8ub_9", Ym = "_actions_1j8ub_19", Fa = {
  form: Um,
  fields: Vm,
  actions: Ym
};
function eT({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function aT({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const Jm = "(max-width: 767.98px)";
function ct({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(lt, { className: Z.scroller, label: e, count: n ?? Ir.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function Xm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(B, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ct, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Qm({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(ct, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(Zt, { children: n.content }, n.id)) }) });
}
function tT({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = sa(Jm);
  return n === void 0 ? /* @__PURE__ */ t(ct, { label: a, children: e }) : l ? /* @__PURE__ */ t(Xm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Qm, { lanes: n, label: a });
}
function nT({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(lt, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
function rT({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${Z.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Zm = "_block_6tv5x_3", ew = "_sentence_6tv5x_10", aw = "_meta_6tv5x_19", tw = "_ways_6tv5x_24", nw = "_action_6tv5x_38", rw = "_strip_6tv5x_42", lw = "_loading_6tv5x_61", ow = "_label_6tv5x_69", iw = "_counter_6tv5x_76", fe = {
  block: Zm,
  sentence: ew,
  meta: aw,
  ways: tw,
  action: nw,
  strip: rw,
  loading: lw,
  label: ow,
  counter: iw
};
function sw({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: fe.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function ja({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i, ask: s }) {
  return /* @__PURE__ */ o("div", { className: `${fe.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ o("p", { className: fe.sentence, children: [
      e,
      s === void 0 || s === "" ? null : /* @__PURE__ */ o(T, { children: [
        " ",
        /* @__PURE__ */ t("strong", { children: s })
      ] })
    ] }),
    n,
    /* @__PURE__ */ t(sw, { action: a })
  ] });
}
function cw(e) {
  return /* @__PURE__ */ t(ja, { ...e, kind: "ward-emptystate" });
}
function lT({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(ja, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function dw({ ways: e }) {
  return /* @__PURE__ */ t("div", { className: `${fe.ways} ward-state-ways`, children: e.map((a) => /* @__PURE__ */ t(b, { variant: "secondary", onClick: a.onClick, children: a.label }, a.label)) });
}
function oT({ ways: e, ...a }) {
  return /* @__PURE__ */ t(ja, { ...a, children: e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(dw, { ways: e }) });
}
function iT({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(ja, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: fe.meta, children: [
    "failed at ",
    he(a)
  ] }) });
}
function sT({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    he(e),
    ". Showing snapshot from ",
    he(a)
  ] });
}
function cT({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: fe.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    he(a)
  ] });
}
function dT({ label: e, startedAt: a }) {
  const n = _(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  C(() => {
    const s = window.setTimeout(() => l(!0), ve.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = nt(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${fe.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: fe.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: fe.counter, children: at(i) }) : null
  ] });
}
const uw = "_note_cigdt_2", hw = {
  note: uw
};
function mw({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: hw.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const ww = "_card_k7btg_3", fw = "_hit_k7btg_31", _w = "_head_k7btg_44", vw = "_title_k7btg_51", bw = "_meta_k7btg_57", pw = "_since_k7btg_66", gw = "_sep_k7btg_76", yw = "_fields_k7btg_80", Nw = "_field_k7btg_80", kw = "_last_k7btg_98", $w = "_reason_k7btg_110", de = {
  card: ww,
  hit: fw,
  head: _w,
  title: vw,
  meta: bw,
  since: pw,
  sep: gw,
  fields: yw,
  field: Nw,
  last: kw,
  reason: $w
}, Cw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Sw(e, a, n) {
  const r = ba(e, "blue"), l = ba(e, "orange"), i = ba(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Cw[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Rw = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : oe(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Tw(e, a) {
  return Rw[a](e);
}
function xw({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: de.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: de.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: de.since, children: [
      ue(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Lw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: de.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function Aw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: de.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ew({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: de.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: de.field, children: Tw(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Iw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Mw(e, a, n) {
  e == null || e(a, n);
}
function Bw(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Pw({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: de.last, "data-stale": Ja(a), children: n }) : null;
}
function qa(e) {
  const a = e.fields ?? [], n = e.item, r = _(null);
  Sw(r, n.key, e.feed);
  const l = Bw(e.feed), i = Iw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: de.card,
      style: i,
      "data-selected": Ja(e.selected),
      "data-flagged": Ja(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: de.hit, onClick: (s) => Mw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Lw, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: de.title, text: n.title }),
        /* @__PURE__ */ t(xw, { item: n, connection: l }),
        /* @__PURE__ */ t(Aw, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Ew, { item: n, fields: a }),
        /* @__PURE__ */ t(Pw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const jw = "_column_1j8bi_3", qw = "_head_1j8bi_21", Ow = "_label_1j8bi_30", Dw = "_count_1j8bi_39", Hw = "_list_1j8bi_53", oa = {
  column: jw,
  head: qw,
  label: Ow,
  count: Dw,
  list: Hw
};
function zn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Fw({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: oa.head, children: [
    /* @__PURE__ */ t("h2", { className: oa.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: oa.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ww(e) {
  return /* @__PURE__ */ t("div", { className: oa.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      qa,
      {
        item: a,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: a.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + n),
        inList: !0
      },
      a.key
    );
  }) });
}
function zw({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && a.length > e.cap, w = zn(a, r);
  return /* @__PURE__ */ o("section", { className: oa.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Fw, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Ww, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ t(mw, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Kw = "_foot_cs4jr_2", Gw = "_note_cs4jr_13", Uw = "_link_cs4jr_19", Wa = {
  foot: Kw,
  note: Gw,
  link: Uw
};
function uT({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: F(e), children: "Configure board" })
  ] });
}
const Vw = "_head_1tfi5_3", Yw = "_identity_1tfi5_12", Jw = "_titleRow_1tfi5_18", Xw = "_title_1tfi5_18", Qw = "_key_1tfi5_35", Zw = "_rollup_1tfi5_45", ef = "_tools_1tfi5_53", af = "_swatch_1tfi5_101", tf = "_mark_1tfi5_108", Se = {
  head: Vw,
  identity: Yw,
  titleRow: Jw,
  title: Xw,
  key: Qw,
  rollup: Zw,
  tools: ef,
  swatch: af,
  mark: tf
}, qt = "initials:";
function nf(e) {
  return e === void 0 ? "loaded this week unavailable" : `${te(e)} loaded this week`;
}
function rf(e) {
  const a = [nf(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${te(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ue(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ue(e.p90)}`), a.join(" · ");
}
function lf(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      te(e.inFlight),
      " in flight"
    ] }),
    " · ",
    rf(e)
  ] });
}
function of(e) {
  return e.startsWith(qt) ? e.slice(qt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function sf({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${Se.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: of(e) }) : /* @__PURE__ */ t("span", { className: Se.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function cf({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(B, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function hT({
  stream: e,
  rollups: a,
  connection: n,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: Se.head, children: [
    /* @__PURE__ */ o("div", { className: Se.identity, children: [
      /* @__PURE__ */ o("div", { className: Se.titleRow, children: [
        /* @__PURE__ */ t(sf, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: Se.rollup, "aria-live": "polite", children: lf(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(cf, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(st, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const df = "_head_1sejb_14", uf = "_line_1sejb_15", hf = "_cHandle_1sejb_36", mf = "_cName_1sejb_41", wf = "_nameLine_1sejb_49", ff = "_cLabel_1sejb_56", _f = "_cCap_1sejb_61", vf = "_cShown_1sejb_66", bf = "_name_1sejb_49", pf = "_noCap_1sejb_88", gf = "_state_1sejb_102", yf = "_handle_1sejb_111", Nf = "_sub_1sejb_137", P = {
  head: df,
  line: uf,
  cHandle: hf,
  cName: mf,
  nameLine: wf,
  cLabel: ff,
  cCap: _f,
  cShown: vf,
  name: bf,
  noCap: pf,
  state: gf,
  handle: yf,
  sub: Nf
}, kf = "can't be hidden or collapsed", $f = "terminal · counted, not a column";
function mT() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: P.cHandle }),
    /* @__PURE__ */ t("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: P.cShown, children: "Shown" })
  ] });
}
function Cf(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Sf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Ot(e) {
  return e.gate ? kf : e.terminal ? $f : Sf(e.agentsMounted);
}
function Rf(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Tf({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Ot(e) && /* @__PURE__ */ t("span", { className: P.sub, children: Ot(e) })
  ] });
}
function xf(e) {
  return e === void 0 ? "" : String(e);
}
function Lf(e) {
  return e === "" ? void 0 : Number(e);
}
function Af({ name: e, onReorder: a }) {
  const n = Ae();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: P.cHandle }) : /* @__PURE__ */ t("span", { className: P.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && Rf(r, a),
      children: "⠿"
    }
  ) });
}
function Ef({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: P.cCap, children: /* @__PURE__ */ t(B, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: xf(a.cap), onChange: (r) => n({ ...a, cap: Lf(r) }) }) });
}
function If({ stage: e, config: a, onChange: n }) {
  const r = Ae() !== null, l = Cf(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ t(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: P.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Mf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function wT({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Mf(e), children: [
    /* @__PURE__ */ t(Af, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Tf, { stage: e }),
    /* @__PURE__ */ t("span", { className: P.cLabel, children: /* @__PURE__ */ t(B, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Ef, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(If, { stage: e, config: a, onChange: n })
  ] });
}
const Bf = "_body_8qsv9_2", Pf = "_head_8qsv9_9", jf = "_summary_8qsv9_19", qf = "_block_8qsv9_20", Of = "_actionsBlock_8qsv9_21", Df = "_title_8qsv9_41", Hf = "_note_8qsv9_46", Ff = "_k_8qsv9_51", Wf = "_kv_8qsv9_58", zf = "_row_8qsv9_64", Kf = "_label_8qsv9_75", Gf = "_value_8qsv9_84", Uf = "_quote_8qsv9_90", Vf = "_actions_8qsv9_21", Yf = "_resolve_8qsv9_111", O = {
  body: Bf,
  head: Pf,
  summary: jf,
  block: qf,
  actionsBlock: Of,
  title: Df,
  note: Hf,
  k: Ff,
  kv: Wf,
  row: zf,
  label: Kf,
  value: Gf,
  quote: Uf,
  actions: Vf,
  resolve: Yf
};
function Jf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Xf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Qf(e) {
  const a = ma(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Zf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function e_(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...Ba(Qf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ue(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Jf(e),
    ...Zf(n),
    ...Xf(e, a)
  ];
}
function a_({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function t_(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function n_({ item: e, showKey: a }) {
  const n = t_(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    a && /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function r_({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function fT({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = e_(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: h, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(n_, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: f }),
      /* @__PURE__ */ t("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ t(r_, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(a_, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const l_ = "_root_3azmy_2", o_ = "_list_3azmy_7", i_ = "_item_3azmy_12", s_ = "_box_3azmy_18", c_ = "_text_3azmy_23", d_ = "_note_3azmy_28", Ye = {
  root: l_,
  list: o_,
  item: i_,
  box: s_,
  text: c_,
  note: d_
};
function Oa({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(it, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const u_ = "_rail_znbbp_2", h_ = "_k_znbbp_11", m_ = "_head_znbbp_19", w_ = "_section_znbbp_25", f_ = "_card_znbbp_39", __ = "_strip_znbbp_46", v_ = "_skeleton_znbbp_60", b_ = "_skeletonLabel_znbbp_74", p_ = "_bar_znbbp_80", g_ = "_note_znbbp_89", we = {
  rail: u_,
  k: h_,
  head: m_,
  section: w_,
  card: f_,
  strip: __,
  skeleton: v_,
  skeletonLabel: b_,
  bar: p_,
  note: g_
};
function y_(e) {
  return (a) => e == null ? void 0 : e(a);
}
function za({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: we.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: we.k, children: e }),
    a
  ] });
}
function N_({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: we.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: we.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: we.bar, "aria-hidden": "true" }, r))
  ] });
}
function k_({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(zw, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function $_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(k_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(N_, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function _T(e) {
  const a = y_(e.onOpen), n = zn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: we.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${we.k} ${we.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(za, { title: "Card", children: /* @__PURE__ */ t("div", { className: we.card, children: n && /* @__PURE__ */ t(qa, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(za, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: we.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t($_, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: we.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(za, { title: "Effect of this config", children: /* @__PURE__ */ t(Oa, { items: e.effects, density: "compact" }) })
  ] });
}
function C_(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function S_(e) {
  return Math.ceil(e.length / 2);
}
function R_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Kn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function T_(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Kn(e);
  l !== void 0 && n(l), r(R_(e.type));
}
function x_(e, a, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(a, (i) => T_(i, n, r, l));
  }, [e, a, n, r, l]);
}
function L_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function A_(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function E_(e, a) {
  return a !== void 0 ? ue(e.timeInStage) + " · waits on " + a.agent : ue(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function I_(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + I.height.card + " + " + I.height.cardRow + " * " + String(S_(a ?? [])) + ")"
  };
}
function M_(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function B_(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: oe(e.cost) }) : null;
}
function P_(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function j_(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function q_(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function O_(e, a) {
  return a === void 0 ? e : C_(e, a.ref);
}
function D_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ca(e) {
  return e === !0 ? "true" : void 0;
}
function Gn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = _(null), i = ba(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(L_(a));
  x_(e.feed, a.key, s, d, i);
  const u = A_(a, r), h = E_(a, n), w = I_(a, e.fields), f = q_(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...D_(e),
      className: "ward-workcard",
      "data-flagged": ca(a.flagged),
      "data-selected": ca(e.selected),
      style: w,
      ref: O_(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        M_(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: u.role, label: u.label }),
          B_(a, e.fields),
          P_(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          j_(n, c, e.connection, a.changedAt),
          f !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function H_({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function F_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function W_(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function z_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(H_, { count: e.items.length, cap: e.column.cap });
}
function K_(e, a) {
  return e.roving ?? a;
}
function G_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function U_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Gn,
    {
      item: n,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: n.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: a.itemProps(r)
    },
    n.key
  ));
}
function V_(e) {
  const a = N(), n = Ea({ orientation: "vertical" }), r = K_(e, n), l = F_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ca(l), "data-gate": ca(e.column.gate), children: [
    W_(e.column, e.items.length, a),
    z_(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...G_(e, n), children: U_(e, r) })
  ] });
}
function Y_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ue(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ue(e.p90)), a;
}
function J_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(B, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function X_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function vT(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Y_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      J_(e),
      X_(e.onConfigure),
      /* @__PURE__ */ t(st, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Q_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Z_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function ev(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function bT(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ca(Q_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Z_(e) }),
    /* @__PURE__ */ t(B, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(mn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    ev(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function pT(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Gn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(V_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function av(e, a) {
  const n = Kn(e);
  n !== void 0 && a(n);
}
function tv(e, a, n) {
  C(() => {
    if (e != null)
      return e.subscribe(a, (r) => av(r, n));
  }, [e, a, n]);
}
function nv(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function rv(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ue(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", oe(e.cost)]), a;
}
function lv(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function ov(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function gT(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  tv(e.feed, a.key, l);
  const i = [...nv(a), ...rv(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      lv(n, r)
    ] }),
    ov(a, e.actions)
  ] });
}
const iv = "_card_1nkkx_3", sv = "_head_1nkkx_30", cv = "_mark_1nkkx_38", dv = "_name_1nkkx_50", uv = "_chips_1nkkx_71", hv = "_description_1nkkx_77", mv = "_run_1nkkx_82", wv = "_sep_1nkkx_91", fv = "_facts_1nkkx_97", _v = "_fact_1nkkx_97", vv = "_factLabel_1nkkx_111", bv = "_factValue_1nkkx_115", ie = {
  card: iv,
  head: sv,
  mark: cv,
  name: dv,
  chips: uv,
  description: hv,
  run: mv,
  sep: wv,
  facts: fv,
  fact: _v,
  factLabel: vv,
  factValue: bv
}, pv = { live: "done", draft: "running", paused: "meta" };
function gv(e) {
  return e === void 0 ? ie.card : `${ie.card} ${e}`;
}
function yv({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: ie.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: pv[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function Nv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: ie.description, children: e });
}
function kv({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: ie.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: ie.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function $v({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: ie.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: ie.fact, children: [
    /* @__PURE__ */ t("dt", { className: ie.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: ie.factValue, children: a.value })
  ] }, a.label)) });
}
function Cv(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Sv({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: gv(s),
      style: c,
      "data-selected": d,
      "data-paused": Cv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: ie.head, children: [
          /* @__PURE__ */ t("span", { className: ie.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${ie.name} ward-rowlink ward-target`, href: F(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(Nv, { description: e.description }),
        /* @__PURE__ */ t(kv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(yv, { versions: e.versions }),
        /* @__PURE__ */ t($v, { facts: i })
      ]
    }
  );
}
const Rv = "_list_4dcyc_2", Tv = "_row_4dcyc_11", xv = "_head_4dcyc_23", Lv = "_id_4dcyc_30", Av = "_lock_4dcyc_35", Ev = "_reason_4dcyc_41", Iv = "_remove_4dcyc_46", Mv = "_clauses_4dcyc_50", Bv = "_clause_4dcyc_50", Pv = "_label_4dcyc_64", jv = "_cell_4dcyc_71", qv = "_value_4dcyc_76", ce = {
  list: Rv,
  row: Tv,
  head: xv,
  id: Lv,
  lock: Av,
  reason: Ev,
  remove: Iv,
  clauses: Mv,
  clause: Bv,
  label: Pv,
  cell: jv,
  value: qv
}, Un = ye(!1);
function yT({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Un.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ce.list, "aria-label": a, children: e }) });
}
function Ov({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ce.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(B, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Dv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ce.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ce.reason, children: e })
  ] });
}
function Hv({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ce.head, children: [
    /* @__PURE__ */ t("span", { className: ce.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Dv, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ce.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Dt(e, a) {
  return e.locked ? void 0 : a;
}
function NT({ rule: e, onChange: a, onRemove: n }) {
  if (!ge(Un)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Dt(e, a);
  return /* @__PURE__ */ o("li", { className: ce.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Hv, { rule: e, onRemove: Dt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ce.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ce.clause, children: [
      /* @__PURE__ */ t("dt", { className: ce.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ce.cell, children: /* @__PURE__ */ t(Ov, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Fv = "_ladder_1xdeh_2", Wv = "_cell_1xdeh_7", zv = "_empty_1xdeh_26", Kv = "_name_1xdeh_34", Gv = "_holder_1xdeh_40", Uv = "_request_1xdeh_46", Vv = "_swatches_1xdeh_51", Yv = "_swatch_1xdeh_51", Jv = "_tilesFrame_1xdeh_78", Xv = "_tiles_1xdeh_78", Qv = "_tile_1xdeh_78", Zv = "_bar_1xdeh_117", eb = "_hex_1xdeh_128", ab = "_note_1xdeh_138", A = {
  ladder: Fv,
  cell: Wv,
  empty: zv,
  name: Kv,
  holder: Gv,
  request: Uv,
  swatches: Vv,
  swatch: Yv,
  tilesFrame: Jv,
  tiles: Xv,
  tile: Qv,
  bar: Zv,
  hex: eb,
  note: ab
}, kT = "not validated yet, pending a CVD matrix and dark stepping";
function tb(e) {
  return e.reserved ? "reserved" : da(e.step) ? "validated" : "partial";
}
function Vn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function nb(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function rb({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function lb(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function ob(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ht = (e) => String(e).padStart(2, "0");
function ib(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Vn(e, void 0);
}
function sb({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ht(e)}` : el(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ht(e)} · ${n}` })
  ] });
}
function cb({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = tb(e), c = Vn(s, n), d = c !== "free", u = d || i, h = a === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...ob(d, h, u), "data-validation": s, style: nb(e, s), onClick: f, onKeyDown: (j) => lb(j, f) }, label: y, name: w, holder: c, validation: s, note: ib(s, n, h), step: e.step };
}
const db = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(sb, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(rb, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ub(e) {
  return db[e.presentation](cb(e));
}
function hb(e) {
  for (const a of e)
    if (!a.reserved && !Ia(a.step)) throw new Error("colour ladder renders token steps only");
}
function mb() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function wb(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const fb = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function _b() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const vb = { list: mb, swatches: () => null, tiles: _b };
function bb(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Yn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  hb(e.steps);
  const r = wb(e), l = vb[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(ub, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...bb(e.disabled === !0), className: `${fb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const pb = "_rail_s06lm_2", gb = "_section_s06lm_12", yb = "_sectionFlush_s06lm_22", Nb = "_head_s06lm_26", kb = "_headLabel_s06lm_34", $b = "_sample_s06lm_42", Cb = "_sampleLabel_s06lm_47", Sb = "_sampleTitle_s06lm_54", Rb = "_sampleMeta_s06lm_59", Tb = "_trace_s06lm_65", xb = "_traceHead_s06lm_70", Lb = "_steps_s06lm_78", Ab = "_step_s06lm_78", Eb = "_stepTitle_s06lm_97", Ib = "_hollow_s06lm_107", Mb = "_stepBody_s06lm_115", Bb = "_stepDetail_s06lm_127", Pb = "_publish_s06lm_132", jb = "_reason_s06lm_138", qb = "_note_s06lm_143", Ob = "_reveal_s06lm_148", k = {
  rail: pb,
  section: gb,
  sectionFlush: yb,
  head: Nb,
  headLabel: kb,
  sample: $b,
  sampleLabel: Cb,
  sampleTitle: Sb,
  sampleMeta: Rb,
  trace: Tb,
  traceHead: xb,
  steps: Lb,
  step: Ab,
  stepTitle: Eb,
  hollow: Ib,
  stepBody: Mb,
  stepDetail: Bb,
  publish: Pb,
  reason: jb,
  note: qb,
  reveal: Ob
}, Ft = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Db = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Hb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Fb = { notSimulated: "not simulated", running: "running" };
function Wb(e) {
  return e.presentation === "foundry";
}
function zb(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Kb(e, a) {
  var r;
  const n = Db[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Gb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ub(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Vb(e) {
  if (Gb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Yb(e) {
  const [a, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Jb(e) {
  const a = Fb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(He, { size: 6, kind: Hb[e.kind], label: e.kind });
}
function Xb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Qb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Zb(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Yb, { kind: a.kind, children: [
    /* @__PURE__ */ t(Jb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Xb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Qb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function ep(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ue(a)), n.join(" · ");
}
function Jn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: ep(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Zb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function ap(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${k.sample} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: k.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: k.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function tp(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + he(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function np(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : oe(e.run.cost), label: "Cost" }, { value: e.run.turns ? an(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function rp(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: oe(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: an(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function lp(e) {
  const a = rp(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Xn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function op(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Xn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function ip(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Xn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Qn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: Ft[e.run.status].role, label: Ft[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function sp(e, a) {
  const [n, r] = p(e.steps);
  return C(() => r(e.steps), [e.steps]), C(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function cp(e) {
  var n;
  Ub(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(ap, { sample: e.run.sample }),
    /* @__PURE__ */ t(Jn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(np, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist }) }),
    /* @__PURE__ */ t(op, { reason: zb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function dp(e) {
  var r;
  const a = sp(e.run, e.feed);
  Vb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Qn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(tp, { sample: e.run.sample }),
    /* @__PURE__ */ t(Jn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(lp, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(ip, { reason: Kb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function $T(e) {
  return Wb(e) ? /* @__PURE__ */ t(dp, { ...e }) : /* @__PURE__ */ t(cp, { ...e });
}
const up = "_list_142ip_3", hp = "_row_142ip_9", mp = "_condition_142ip_18", wp = "_action_142ip_24", ga = {
  list: up,
  row: hp,
  condition: mp,
  action: wp
}, Zn = ye(!1);
function CT({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Zn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ga.list, "aria-label": a, children: e }) });
}
function ST({ rule: e }) {
  if (!ge(Zn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ga.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ga.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ga.action, children: e.then })
  ] });
}
const fp = "_move_tmppt_3", _p = {
  move: fp
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function er(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function ar(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Wt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function vp(e) {
  return e === "up" ? "down" : "up";
}
function bp(e, a) {
  const n = Wt(e, a.id, a.direction) ?? Wt(e, a.id, vp(a.direction));
  n == null || n.focus();
}
function tr() {
  const e = _(null), [a, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && a !== null && bp(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function nr({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ra({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${_p.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const pp = "_body_1jd1i_2", gp = "_title_1jd1i_8", yp = "_section_1jd1i_13", Np = "_legend_1jd1i_18", kp = "_stages_1jd1i_26", $p = "_stage_1jd1i_26", Cp = "_stageIndex_1jd1i_44", Sp = "_stageName_1jd1i_50", Rp = "_footer_1jd1i_59", Tp = "_note_1jd1i_66", xp = "_reason_1jd1i_71", Lp = "_actions_1jd1i_76", Ap = "_webHead_1jd1i_83", Ep = "_kicker_1jd1i_92", Ip = "_webTitle_1jd1i_99", Mp = "_webBody_1jd1i_105", Bp = "_webSection_1jd1i_109", Pp = "_sectionHead_1jd1i_121", jp = "_sectionNote_1jd1i_129", qp = "_formLabel_1jd1i_134", Op = "_identityRow_1jd1i_139", Dp = "_nameCell_1jd1i_145", Hp = "_keyCell_1jd1i_150", Fp = "_colourCell_1jd1i_154", Wp = "_colourStatus_1jd1i_161", zp = "_webStages_1jd1i_166", Kp = "_webStageList_1jd1i_172", Gp = "_webStage_1jd1i_166", Up = "_webIndex_1jd1i_191", Vp = "_webStageName_1jd1i_196", Yp = "_webMoves_1jd1i_201", Jp = "_addStage_1jd1i_215", Xp = "_addStageButton_1jd1i_223", Qp = "_addStageNote_1jd1i_231", Zp = "_webFooter_1jd1i_236", eg = "_webFooterNotes_1jd1i_244", ag = "_webNote_1jd1i_251", v = {
  body: pp,
  title: gp,
  section: yp,
  legend: Np,
  stages: kp,
  stage: $p,
  stageIndex: Cp,
  stageName: Sp,
  footer: Rp,
  note: Tp,
  reason: xp,
  actions: Lp,
  webHead: Ap,
  kicker: Ep,
  webTitle: Ip,
  webBody: Mp,
  webSection: Bp,
  sectionHead: Pp,
  sectionNote: jp,
  formLabel: qp,
  identityRow: Op,
  nameCell: Dp,
  keyCell: Hp,
  colourCell: Fp,
  colourStatus: Wp,
  webStages: zp,
  webStageList: Kp,
  webStage: Gp,
  webIndex: Up,
  webStageName: Vp,
  webMoves: Yp,
  addStage: Jp,
  addStageButton: Xp,
  addStageNote: Qp,
  webFooter: Zp,
  webFooterNotes: eg,
  webNote: ag
}, tg = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], rr = "not in catalogue";
function ng(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${rr}` }, ...n];
}
function rg({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(B, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${rr}`;
  return /* @__PURE__ */ t(B, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: ng(n, e.name), invalid: i, onChange: r });
}
function lr(e, a) {
  return e.name || `stage ${a + 1}`;
}
function lg(e) {
  const a = _([]), n = _(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function og({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = lr(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(rg, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(B, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: tg, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function ig({ stages: e, onChange: a, catalogue: n }) {
  const r = lg(e.length), l = tr(), i = (c, d) => {
    const u = er(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, ar(lr(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(og, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(nr, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const sg = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], cg = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], dg = "A new stream starts as a draft. Nothing runs on it until you publish it.", ug = "Create is disabled: name the stream and give it a key first.", hg = "reorder with the ↑ ↓ buttons · min 2";
function dt(e, a) {
  return !e.reserved && da(e.step) && a[e.step] === void 0;
}
function mg(e, a) {
  const n = e.find((r) => dt(r, a));
  return n ? n.step : 1;
}
function wg({ stages: e, onMove: a }) {
  const n = tr(), r = (l, i) => {
    const s = er(l, i);
    n.moved({ id: e[l].id, direction: i }, ar(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(nr, { text: n.announcement })
  ] });
}
function fg({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: dg }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function _g(e, a) {
  return e !== "" && a !== "" ? null : ug;
}
function vg(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = cg, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = p(""), [f, y] = p(""), [E, j] = p(a[0].value), [ne, Ne] = p(() => mg(n, r)), [re, Ee] = p(e.stages ?? sg), [Ve, R] = p(l[0].value), U = { name: h, key: f, streamStep: ne, owner: E, stages: re, policy: Ve }, ke = _g(h, f);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(B, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ t(B, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(B, { kind: "select", label: "Owner", value: E, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(Yn, { label: "Stream colour", steps: n, value: ne, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(wg, { stages: re, onMove: (Fe, Ar) => Ee(Xa(re, Fe, Ar)) })
    ] }),
    /* @__PURE__ */ t(qn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(fg, { reason: ke, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const or = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], bg = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function pg(e, a, n, r, l, i) {
  var c;
  const s = ((c = or.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function gg(e, a) {
  return yg(e) && Ng(e, a) && kg(e);
}
function yg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Ng(e, a) {
  return e.colourStep === null || dt({ step: e.colourStep }, a);
}
function kg(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function $g(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : dt({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Cg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Sg({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(Cg, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: bg })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Rg({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Tg({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ t("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ t("div", { className: v.nameCell, children: /* @__PURE__ */ t(B, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: v.keyCell, children: /* @__PURE__ */ t(B, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function xg(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [E, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ne = pg(l, s, d, h, f, E), Ne = gg(ne, r), re = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Yn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: $g(h, r) }),
    /* @__PURE__ */ t(B, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Rg, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(Tg, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: hg })
        ] }),
        /* @__PURE__ */ t(ig, { stages: E, onChange: j })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(qn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: or, onChange: y }) }),
      /* @__PURE__ */ t(Sg, { ready: Ne, draft: ne, agentStage: re, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function RT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xg, { ...e }) : /* @__PURE__ */ t(vg, { ...e });
}
const Lg = "_row_bs8hc_2", Ag = "_cell_bs8hc_6", Eg = "_condition_bs8hc_11", Ig = "_action_bs8hc_18", Mg = "_contract_bs8hc_24", Bg = "_contractCondition_bs8hc_33", Pg = "_contractAction_bs8hc_39", ae = {
  row: Lg,
  cell: Ag,
  condition: Eg,
  action: Ig,
  contract: Mg,
  contractCondition: Bg,
  contractAction: Pg
}, ir = ["advance", "block", "escalate", "requestReview"], zt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ta(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ut(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: ae.action, children: zt[e.then] }) : /* @__PURE__ */ t(
    B,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: ir.map((l) => ({ value: l, label: zt[l] }))
    }
  );
}
function jg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ae.row, children: [
    /* @__PURE__ */ t("td", { className: ae.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: ae.cell, children: /* @__PURE__ */ t("span", { className: ae.condition, title: Ta(e, r), children: Ta(e, r) }) }),
    /* @__PURE__ */ t("td", { className: ae.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: ae.cell, children: ut(e, a, n) })
  ] });
}
function qg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: ae.row, children: [
    /* @__PURE__ */ o("td", { className: ae.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: ae.condition, children: Ta(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: ae.cell, children: ut(e, a, n) })
  ] });
}
function Og({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: ae.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ae.contractCondition, children: Ta(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ae.contractAction, children: ut(e, a, n, !0) })
  ] });
}
const Dg = { two: qg, four: jg, contract: Og };
function TT(e) {
  var n;
  if (!ir.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Dg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Hg = "_column_g1uat_2", Fg = "_head_g1uat_17", Wg = "_index_g1uat_23", zg = "_name_g1uat_29", Kg = "_meta_g1uat_38", Gg = "_mono_g1uat_43", Ug = "_gate_g1uat_50", Vg = "_reviewersLabel_g1uat_57", Yg = "_reviewers_g1uat_57", Jg = "_reviewer_g1uat_57", Xg = "_agents_g1uat_74", Qg = "_workflowColumn_g1uat_79", Zg = "_workflowHead_g1uat_96", ey = "_stageRow_g1uat_102", ay = "_stageLabel_g1uat_109", ty = "_workflowTitle_g1uat_116", ny = "_workflowMeta_g1uat_122", ry = "_workflowGate_g1uat_127", ly = "_gateNote_g1uat_135", oy = "_cardNote_g1uat_140", iy = "_reviewerList_g1uat_145", sy = "_reviewerRow_g1uat_151", cy = "_reviewerMark_g1uat_157", dy = "_reviewerName_g1uat_167", uy = "_terminalCard_g1uat_173", hy = "_terminalCount_g1uat_182", my = "_workflowAgents_g1uat_188", wy = "_mount_g1uat_194", S = {
  column: Hg,
  head: Fg,
  index: Wg,
  name: zg,
  meta: Kg,
  mono: Gg,
  gate: Ug,
  reviewersLabel: Vg,
  reviewers: Yg,
  reviewer: Jg,
  agents: Xg,
  workflowColumn: Qg,
  workflowHead: Zg,
  stageRow: ey,
  stageLabel: ay,
  workflowTitle: ty,
  workflowMeta: ny,
  workflowGate: ry,
  gateNote: ly,
  cardNote: oy,
  reviewerList: iy,
  reviewerRow: sy,
  reviewerMark: cy,
  reviewerName: dy,
  terminalCard: uy,
  terminalCount: hy,
  workflowAgents: my,
  mount: wy
}, fy = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ht(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function sr(e) {
  return `${Math.round(e * 100)}%`;
}
function _y({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: S.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: sr(e.gateShare), label: "Gate share" },
      { value: te(e.count), label: "In stage" }
    ] })
  ] });
}
function vy({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: te(e.count), label: "In stage" },
    { value: ht(e.closedThisWeek, te), label: "Closed this week" }
  ] });
}
function by({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ t("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: S.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: fy[e.kind] })
  ] });
}
function py({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      te(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      ue(e.medianWait),
      " median wait"
    ] })
  ] });
}
function gy({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(_y, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(vy, { stage: e }) : null;
}
function yy({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Ny({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(by, { stage: e, titleId: l }),
    /* @__PURE__ */ t(py, { stage: e }),
    /* @__PURE__ */ t(gy, { stage: e }),
    /* @__PURE__ */ t("div", { className: S.agents, children: a.map((s) => /* @__PURE__ */ t(Sv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(yy, { onMount: n })
  ] });
}
const ky = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function $y({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: S.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: S.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: S.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Cy({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t($y, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: sr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Sy(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Ry({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: S.terminalCount, children: ht(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: S.cardNote, children: Sy(e.rolledBackThisWeek) })
  ] });
}
function Ty(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function xy(e) {
  if (e.kind === "terminal") return `${ht(e.closedThisWeek)} this week`;
  const a = Ty(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Ly({ stage: e, titleId: a }) {
  const n = ky[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: S.workflowMeta, children: xy(e) })
  ] });
}
function Ay(e) {
  return e === "entry" || e === "agent";
}
function Ey({ stage: e, onMount: a }) {
  return a === void 0 || !Ay(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Iy({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Ly, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Cy, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Ry, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: S.workflowAgents, children: a }),
    /* @__PURE__ */ t(Ey, { stage: e, onMount: n })
  ] });
}
function My(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function xT(e) {
  return My(e) ? /* @__PURE__ */ t(Iy, { ...e }) : /* @__PURE__ */ t(Ny, { ...e });
}
const By = "_row_1tdra_6", Py = "_name_1tdra_12", jy = "_compactRow_1tdra_13", qy = "_compactName_1tdra_13", Oy = "_cell_1tdra_30", Dy = "_chain_1tdra_45", Hy = "_owner_1tdra_51", Fy = "_mono_1tdra_57", Wy = "_compactCell_1tdra_79", zy = "_stack_1tdra_96", Ky = "_stat_1tdra_103", Gy = "_identityLine_1tdra_110", Uy = "_identity_1tdra_110", Vy = "_ownerLine_1tdra_140", Yy = "_link_1tdra_160", Jy = "_gateMark_1tdra_166", Xy = "_emptyChain_1tdra_171", Qy = "_arrow_1tdra_177", Zy = "_muted_1tdra_182", eN = "_define_1tdra_187", aN = "_statValue_1tdra_194", tN = "_policyId_1tdra_200", nN = "_sub_1tdra_205", g = {
  row: By,
  name: Py,
  compactRow: jy,
  compactName: qy,
  cell: Oy,
  chain: Dy,
  owner: Hy,
  mono: Fy,
  compactCell: Wy,
  stack: zy,
  stat: Ky,
  identityLine: Gy,
  identity: Uy,
  ownerLine: Vy,
  link: Yy,
  gateMark: Jy,
  emptyChain: Xy,
  arrow: Qy,
  muted: Zy,
  define: eN,
  statValue: aN,
  policyId: tN,
  sub: nN
};
function cr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function rN(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function lN(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function dr(e) {
  return `${te(e)} ${e === 1 ? "member" : "members"}`;
}
function oN(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${dr(e.members)}`;
}
function iN(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: F(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: oN(e) })
  ] }) });
}
function ur({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function sN(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ma(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function cN({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(ur, { name: l.name, gate: l.gate === !0, look: sN(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function dN(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : cN(e) });
}
function hr(e) {
  return e === void 0 ? void 0 : !0;
}
function Kt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": hr(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function uN(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function hN(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function mN({ stream: e, href: a, presentation: n }) {
  const r = lN(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: cr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    iN(e, a),
    dN(e),
    Kt(hN(e.agents), e.agents === void 0 ? void 0 : rN(e.agents), "—"),
    uN(e.policy),
    Kt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function wN(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function LT(e) {
  if (wN(e)) return mN(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: cr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: F(n), children: a.name }),
      /* @__PURE__ */ t(m, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(ur, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ o("span", { className: g.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("span", { className: g.owner, children: a.owner }),
      /* @__PURE__ */ t("span", { className: g.mono, children: dr(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": hr(a.inFlightHint), children: te(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ue(a.p50) }) })
  ] });
}
const fN = "_row_2u4ll_2", _N = "_name_2u4ll_16", vN = "_scope_2u4ll_24", xa = {
  row: fN,
  name: _N,
  scope: vN
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function bN(e) {
  return e === void 0 ? `${xa.row} ward-toolrow` : `${xa.row} ward-toolrow ${e}`;
}
function pN(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function gN({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
  return /* @__PURE__ */ t(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: n.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? a : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function yN({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function NN({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${xa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function kN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function AT({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = pN(e, n), s = kN(n);
  return /* @__PURE__ */ o(s, { className: bN(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(gN, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${xa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(NN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(yN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const $N = "_strip_4ppv9_2", CN = "_well_4ppv9_11", SN = "_head_4ppv9_18", RN = "_name_4ppv9_24", TN = "_chart_4ppv9_32", xN = "_segment_4ppv9_38", LN = "_detailedChart_4ppv9_44", AN = "_rail_4ppv9_57", EN = "_section_4ppv9_63", IN = "_label_4ppv9_74", MN = "_note_4ppv9_91", G = {
  strip: $N,
  well: CN,
  head: SN,
  name: RN,
  chart: TN,
  segment: xN,
  detailedChart: LN,
  rail: AN,
  section: EN,
  label: IN,
  note: MN
}, BN = "No item in flight to preview.", PN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", jN = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], La = 100;
function qN(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function ON({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: G.segment,
      x: l * La,
      y: "0",
      width: La,
      height: "8",
      fill: qN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function DN(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function HN({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${G.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * La),
        y: "0",
        width: String(La),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function mr(e) {
  return (a) => e == null ? void 0 : e(a);
}
function _a({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: G.label, children: e }),
    a
  ] });
}
function FN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: G.note, children: a ?? BN }) : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(qa, { item: { ...e, streamStep: ma(n.streamStep) }, onOpen: mr(r), feed: null }) });
}
function WN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: a, children: [
    /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...Ba(e.key, e.streamStep) })
  ] });
}
function zN(e) {
  const a = DN(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(_a, { label: "Board card", children: /* @__PURE__ */ t(FN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(_a, { label: "Streams index row", children: /* @__PURE__ */ t(WN, { draft: n }) }),
    /* @__PURE__ */ o(_a, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(HN, { identities: a }),
      /* @__PURE__ */ t("p", { className: G.note, children: PN })
    ] }),
    /* @__PURE__ */ t(_a, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: G.note, children: jN }) })
  ] });
}
function KN({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(qa, { item: { ...a, streamStep: e.streamStep }, onOpen: mr(r) }) }),
    /* @__PURE__ */ t(ON, { draft: e, streams: n })
  ] });
}
function ET(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(zN, { ...e }) : /* @__PURE__ */ t(KN, { ...e });
}
const GN = "_row_ixlg5_6", UN = "_headCell_ixlg5_10", VN = "_cell_ixlg5_11", YN = "_name_ixlg5_23", JN = "_consequence_ixlg5_29", XN = "_governed_ixlg5_36", QN = "_control_ixlg5_42", ZN = "_byRole_ixlg5_48", e1 = "_webControl_ixlg5_59", a1 = "_webConsequence_ixlg5_65", t1 = "_webGoverned_ixlg5_71", H = {
  row: GN,
  headCell: UN,
  cell: VN,
  name: YN,
  consequence: JN,
  governed: XN,
  control: QN,
  byRole: ZN,
  webControl: e1,
  webConsequence: a1,
  webGoverned: t1
};
function n1({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ t(
      Ue,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "Pilot" })
  ] });
}
function r1({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: H.headCell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: H.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: H.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(n1, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function l1(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function o1({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ue,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function i1({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(o1, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webGoverned} ward-cellmeta`, children: l1(e) }) })
  ] });
}
function IT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(i1, { ...e }) : /* @__PURE__ */ t(r1, { ...e });
}
const s1 = "_row_vv64h_2", c1 = "_cell_vv64h_6", d1 = "_name_vv64h_25", u1 = "_note_vv64h_30", h1 = "_webName_vv64h_41", m1 = "_webMeta_vv64h_47", Y = {
  row: s1,
  cell: c1,
  name: d1,
  note: u1,
  webName: h1,
  webMeta: m1
}, wr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function w1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function f1({ component: e, onRestart: a }) {
  const n = N(), r = wr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      te(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function _1({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: w1(e.state) });
}
function v1({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { ...wr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(_1, { component: e, onRestart: a }) })
  ] });
}
function MT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(v1, { ...e }) : /* @__PURE__ */ t(f1, { ...e });
}
const b1 = "_row_jcm5k_7", p1 = "_cell_jcm5k_11", g1 = "_next_jcm5k_28", y1 = "_headCell_jcm5k_38", N1 = "_webId_jcm5k_77", k1 = "_webPurpose_jcm5k_83", $1 = "_webMeta_jcm5k_91", C1 = "_webUrgent_jcm5k_97", W = {
  row: b1,
  cell: p1,
  next: g1,
  headCell: y1,
  webId: N1,
  webPurpose: k1,
  webMeta: $1,
  webUrgent: C1
}, S1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, R1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, fr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], T1 = Object.fromEntries(fr.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = T1[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: W.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function BT() {
  return /* @__PURE__ */ t("tr", { children: fr.map((e) => /* @__PURE__ */ t(
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
function x1({ cred: e }) {
  const a = S1[e.state];
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: W.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function L1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${W.webMeta} ${W.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function A1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: W.row, children: [
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t("span", { className: `${W.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(L1, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: W.cell, children: /* @__PURE__ */ t(m, { ...R1[e.state] }) })
  ] });
}
function PT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(A1, { ...e }) : /* @__PURE__ */ t(x1, { ...e });
}
const E1 = "_card_lpp45_2", I1 = "_head_lpp45_11", M1 = "_env_lpp45_18", B1 = "_version_lpp45_25", P1 = "_meta_lpp45_32", j1 = "_webCard_lpp45_37", q1 = "_webRow_lpp45_47", O1 = "_webTitle_lpp45_55", D1 = "_webLine_lpp45_65", H1 = "_webVersion_lpp45_72", F1 = "_webMeta_lpp45_77", V = {
  card: E1,
  head: I1,
  env: M1,
  version: B1,
  meta: P1,
  webCard: j1,
  webRow: q1,
  webTitle: O1,
  webLine: D1,
  webVersion: H1,
  webMeta: F1
}, Gt = { dev: "Dev", uat: "UAT", prod: "Prod" }, _r = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function W1({ env: e }) {
  const a = _r[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Gt[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ t("span", { className: V.env, children: Gt[e.env] }),
      /* @__PURE__ */ t(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      he(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: V.meta, children: n })
  ] });
}
function z1(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [he(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function K1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ..._r[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: z1(e) })
  ] });
}
function jT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(K1, { ...e }) : /* @__PURE__ */ t(W1, { ...e });
}
const G1 = "_panel_1hmja_2", U1 = "_line_1hmja_8", V1 = "_actions_1hmja_14", va = {
  panel: G1,
  line: U1,
  actions: V1
};
function qT(e) {
  return /* @__PURE__ */ o("div", { className: va.panel, children: [
    /* @__PURE__ */ t("p", { className: va.line, children: e.status }),
    /* @__PURE__ */ t(B, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: va.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: va.line, children: e.note ?? "" })
  ] });
}
const Y1 = "_upload_13fcl_2", J1 = "_preview_13fcl_7", X1 = "_mark_13fcl_17", Q1 = "_empty_13fcl_22", Z1 = "_actions_13fcl_28", ek = "_input_13fcl_33", ak = "_reasons_13fcl_41", tk = "_reason_13fcl_41", nk = "_accepted_13fcl_57", le = {
  upload: Y1,
  preview: J1,
  mark: X1,
  empty: Q1,
  actions: Z1,
  input: ek,
  reasons: ak,
  reason: tk,
  accepted: nk
}, vr = 1.5, br = 22, Aa = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${vr}px at ${br}px`], rk = [xe[1], xe[2], Aa, Pe], lk = /* @__PURE__ */ new Map([
  ["image", xe[1]],
  ["text", xe[2]],
  ["tspan", xe[2]],
  ["textPath", xe[2]],
  ["script", Aa],
  ["foreignObject", Aa],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), ok = "http://www.w3.org/2000/svg", ik = "http://www.w3.org/2000/xmlns/", sk = /* @__PURE__ */ new Set([
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
]), ck = /* @__PURE__ */ new Set([
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
]), wt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, dk = /url\s*\(|['"\\]/i;
function uk() {
  return { ok: !1, reasons: [xe[1]] };
}
function pr(e) {
  return e.namespaceURI === ok;
}
function hk(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && pr(a) ? a : null;
  } catch {
    return null;
  }
}
function mk(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function wk(e) {
  return lk.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function fk(e) {
  return dk.test(e.replace(wt, ""));
}
function _k(e) {
  return /^on/i.test(e.localName) ? Aa : e.localName === "href" || fk(e.value) ? Pe : void 0;
}
function vk(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(wk(n));
    for (const r of Array.from(n.attributes)) a.add(_k(r));
  }
  return rk.filter((n) => a.has(n));
}
function bk(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? br / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < vr;
  }) ? [xe[3]] : [];
}
function pk(e) {
  if (e.namespaceURI === ik) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (ck.has(a) || a.startsWith("stroke"));
}
function gk(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && pr(a) && sk.has(a.localName);
}
function yk(e, a) {
  gk(a) ? a.nodeType === Node.ELEMENT_NODE && gr(a) : e.removeChild(a);
}
function gr(e) {
  for (const a of Array.from(e.attributes)) pk(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) yk(e, a);
  return e;
}
function Nk(e) {
  return Array.from(e.matchAll(wt), (a) => a[2]).filter((a) => a !== "");
}
function kk(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function $k(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of Nk(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function Ck(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Sk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = $k(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), Ck(l, r);
  }
  return e;
}
function OT(e) {
  const a = hk(e);
  if (a === null) return uk();
  const n = [...mk(a), ...vk(a), ...bk(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(Sk(gr(a), kk(e))) };
}
const Rk = "Mark accepted.", Tk = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, xk = new Set(nn.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function Lk(e) {
  return e !== void 0 && (Tk.test(e) || xk.has(e)) ? e : void 0;
}
function Ak({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: le.preview, style: { "--mark": Lk(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: le.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: le.empty }) });
}
function Ek(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function Ik(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Mk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: le.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: le.result, role: "status", children: /* @__PURE__ */ t("p", { className: le.accepted, children: Rk }) }) : /* @__PURE__ */ t("div", { className: le.result, role: "status", children: /* @__PURE__ */ t("ul", { className: le.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: le.reason, children: a }, a)) }) });
}
function Bk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(Mk, { result: e }) : /* @__PURE__ */ t("p", { className: `${le.result} ${Ek(e, n)}`, role: "status", children: Ik(e, n) });
}
function Ut(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function DT({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = a(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: le.upload, children: [
    /* @__PURE__ */ t(Ak, { current: e }),
    /* @__PURE__ */ o("div", { className: le.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: le.input,
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
      /* @__PURE__ */ t(b, { ...Ut(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...Ut(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(Bk, { result: s, presentation: r })
  ] });
}
const Pk = "_row_o3t6y_7", jk = "_cell_o3t6y_11", qk = "_head_o3t6y_28", Ok = "_name_o3t6y_34", Dk = "_pinned_o3t6y_42", Hk = "_headCell_o3t6y_49", Fk = "_webName_o3t6y_88", Wk = "_webMeta_o3t6y_95", zk = "_webWarn_o3t6y_103", q = {
  row: Pk,
  cell: jk,
  head: qk,
  name: Ok,
  pinned: Dk,
  headCell: Hk,
  webName: Fk,
  webMeta: Wk,
  webWarn: zk
}, ft = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, yr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Kk = Object.fromEntries(yr.map((e) => [e.key, e]));
function Gk(e, a) {
  return `mcp.${e}.${a}`;
}
function Uk(e) {
  return Object.keys(ft).includes(e);
}
function Vk(e) {
  return ft[e !== void 0 && Uk(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = Kk[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: q.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function HT() {
  return /* @__PURE__ */ t("tr", { children: yr.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: q.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Yk({ server: e }) {
  const a = ft[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => Gk(e.name, n)).join(" · ") })
  ] });
}
function Jk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Xk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Qk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Zk({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function e$({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function a$({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: Jk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(m, { ...Xk(e) }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(Qk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(m, { ...Vk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t(Zk, { server: e, onRestart: a }),
      /* @__PURE__ */ t(e$, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function FT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(a$, { ...e }) : /* @__PURE__ */ t(Yk, { ...e });
}
const t$ = "_row_1ibo7_2", n$ = "_headCell_1ibo7_14", r$ = "_cell_1ibo7_15", l$ = "_name_1ibo7_26", o$ = "_consequence_1ibo7_32", i$ = "_reason_1ibo7_38", s$ = "_value_1ibo7_44", c$ = "_webRow_1ibo7_60", d$ = "_webSetting_1ibo7_73", u$ = "_webName_1ibo7_81", h$ = "_webConsequence_1ibo7_89", m$ = "_webControl_1ibo7_95", w$ = "_webState_1ibo7_109", f$ = "_webChip_1ibo7_114", M = {
  row: t$,
  headCell: n$,
  cell: r$,
  name: l$,
  consequence: o$,
  reason: i$,
  value: s$,
  webRow: c$,
  webSetting: d$,
  webName: u$,
  webConsequence: h$,
  webControl: m$,
  webState: w$,
  webChip: f$
}, Nr = 104, kr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function _$({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ue, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Pn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: M.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function v$({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = kr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: M.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: M.headCell, children: [
      /* @__PURE__ */ t("span", { className: M.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: M.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: M.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: M.cell, children: /* @__PURE__ */ t(_$, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: M.cell, style: { width: Nr }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function $r(e, a) {
  return String(e ?? a);
}
function b$(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function p$(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? $r(e.value, "—");
}
function g$({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: M.webControl, children: [
    /* @__PURE__ */ t(Ue, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: M.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function y$(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(g$, { ...e });
  const l = b$(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: M.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Pn, { options: l, value: $r(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${M.webControl} ${M.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: p$(a) });
}
function N$({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${M.row} ${M.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: M.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${M.name} ${M.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${M.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: M.webControl, children: i(s) }) : /* @__PURE__ */ t(y$, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${M.webChip} ward-policy-chip`, style: { width: Nr }, children: /* @__PURE__ */ t(m, { ...kr[n], size: "tag" }) })
  ] });
}
function WT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(N$, { ...e }) : /* @__PURE__ */ t(v$, { ...e });
}
const k$ = "_label_h9m4w_7", $$ = "_name_h9m4w_15", C$ = "_column_h9m4w_24", S$ = "_webFrame_h9m4w_57", R$ = "_webHead_h9m4w_62", T$ = "_webHeadLabel_h9m4w_74", x$ = "_webLabel_h9m4w_117", L$ = "_webColumns_h9m4w_124", A$ = "_webGroup_h9m4w_130", E$ = "_webPeople_h9m4w_131", I$ = "_webVia_h9m4w_132", M$ = "_webMeta_h9m4w_161", z = {
  label: k$,
  name: $$,
  column: C$,
  webFrame: S$,
  webHead: R$,
  webHeadLabel: T$,
  webLabel: x$,
  webColumns: L$,
  webGroup: A$,
  webPeople: E$,
  webVia: I$,
  webMeta: M$
}, B$ = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ka = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ga({ column: e, children: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: z.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function P$(e) {
  if (!e.matrixRole) return;
  const a = B$[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function j$({ node: e }) {
  const a = P$(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(q$, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : te(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function q$({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function O$({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Wn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(j$, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function D$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function H$() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function F$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function W$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function z$({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(H$, {}),
    /* @__PURE__ */ t(km, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Wn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(F$, { row: n }),
        detail: /* @__PURE__ */ t(D$, { row: n }),
        expanded: W$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function zT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(z$, { ...e }) : /* @__PURE__ */ t(O$, { ...e });
}
const K$ = "_runbook_b9agc_2", G$ = "_list_b9agc_7", U$ = "_step_b9agc_15", V$ = "_numeral_b9agc_21", Y$ = "_body_b9agc_28", J$ = "_head_b9agc_34", X$ = "_title_b9agc_40", Q$ = "_detail_b9agc_45", Z$ = "_actions_b9agc_50", e0 = "_webList_b9agc_56", a0 = "_webStep_b9agc_60", t0 = "_webBody_b9agc_66", n0 = "_webTitle_b9agc_74", r0 = "_webDetail_b9agc_78", L = {
  runbook: K$,
  list: G$,
  step: U$,
  numeral: V$,
  body: Y$,
  head: J$,
  title: X$,
  detail: Q$,
  actions: Z$,
  webList: e0,
  webStep: a0,
  webBody: t0,
  webTitle: n0,
  webDetail: r0
}, Cr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function Sr(e) {
  return String(e + 1).padStart(2, "0");
}
function l0({ step: e, index: a, connection: n }) {
  const r = Cr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.numeral, children: Sr(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ t("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ t(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function o0({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(l0, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function i0({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Sr(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...Cr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function s0({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(i0, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function KT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(s0, { ...e }) : /* @__PURE__ */ t(o0, { ...e });
}
const c0 = "_list_1gu6a_2", d0 = "_check_1gu6a_10", u0 = "_body_1gu6a_16", h0 = "_text_1gu6a_23", m0 = "_pending_1gu6a_32", w0 = "_measured_1gu6a_37", Qe = {
  list: c0,
  check: d0,
  body: u0,
  text: h0,
  pending: m0,
  measured: w0
};
function f0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function _0({ check: e }) {
  const a = f0(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(it, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Qe.body, children: [
      /* @__PURE__ */ t("span", { className: Qe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Qe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Qe.measured, children: e.measured })
  ] });
}
function GT({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(_0, { check: a }, a.text)) });
}
const v0 = "_root_4aacj_2", b0 = "_list_4aacj_10", p0 = "_line_4aacj_26", g0 = "_at_4aacj_53", y0 = "_text_4aacj_57", N0 = "_foot_4aacj_61", k0 = "_idle_4aacj_73", $0 = "_caret_4aacj_81", C0 = "_jump_4aacj_88", _e = {
  root: v0,
  list: b0,
  line: p0,
  at: g0,
  text: y0,
  foot: N0,
  idle: k0,
  caret: $0,
  jump: C0
}, S0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _t(e) {
  return Number.isNaN(Date.parse(e)) ? "" : S0.format(new Date(e));
}
const R0 = { warn: "warning", ok: "ok" };
function T0({ kind: e }) {
  const a = R0[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function x0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${_t(e)}` });
}
function L0({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_t(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${_e.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${_e.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: _e.idle, children: i }),
    /* @__PURE__ */ t(x0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const A0 = 8;
function E0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > A0;
}
function I0({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${_e.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Rr = ye(null);
function UT({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Qt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(Rr.Provider, { value: i, children: n });
}
function M0() {
  const e = ge(Rr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function VT({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = M0(), [u, h] = p(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var j;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (j = E.item(E.length - 1)) == null || j.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: _e.root, children: [
    /* @__PURE__ */ t("ol", { className: _e.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => h(E0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${_e.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: _e.at, children: _t(y.at) }),
      /* @__PURE__ */ t(T0, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: _e.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(L0, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${_e.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(I0, { shown: u, onJump: f })
    ] })
  ] });
}
const B0 = "_row_1k8wl_2", P0 = "_head_1k8wl_14", j0 = "_author_1k8wl_20", q0 = "_eta_1k8wl_25", O0 = "_edited_1k8wl_26", D0 = "_body_1k8wl_32", H0 = "_reason_1k8wl_37", F0 = "_actions_1k8wl_42", Ce = {
  row: B0,
  head: P0,
  author: j0,
  eta: q0,
  edited: O0,
  body: D0,
  reason: H0,
  actions: F0
}, W0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function z0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function K0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function G0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ce.reason, id: a, children: e })
  ] });
}
function U0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function V0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(K0, { ...e }) : /* @__PURE__ */ t(G0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function YT(e) {
  const { comment: a } = e;
  U0(e);
  const n = N(), r = `${n}-unavailable`, l = W0[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ t("span", { className: Ce.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ce.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ce.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ce.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ce.reason, id: n, children: z0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ce.actions, children: /* @__PURE__ */ t(V0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const Y0 = "_root_rvhdw_2", J0 = "_attach_rvhdw_11", X0 = "_actions_rvhdw_17", Q0 = "_reply_rvhdw_23", Z0 = "_replyField_rvhdw_28", eC = "_send_rvhdw_54", aC = "_sendIcon_rvhdw_65", tC = "_sendsAs_rvhdw_75", qe = {
  root: Y0,
  attach: J0,
  actions: X0,
  reply: Q0,
  replyField: Z0,
  send: eC,
  sendIcon: aC,
  sendsAs: tC
};
function Tr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function nC() {
  return /* @__PURE__ */ t("svg", { className: qe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function rC(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function lC(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = Tr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    rC(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: qe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: qe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(B, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: qe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(nC, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: qe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function JT(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(lC, { ...e }) : /* @__PURE__ */ t(oC, { ...e });
}
function oC(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = Tr(e);
  return /* @__PURE__ */ o("div", { className: qe.root, children: [
    /* @__PURE__ */ t(B, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: qe.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      mn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: qe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const iC = "_list_1yhks_2", sC = "_item_1yhks_6", cC = "_body_1yhks_22", dC = "_text_1yhks_28", uC = "_evidence_1yhks_37", hC = "_consequence_1yhks_49", mC = "_note_1yhks_54", Ge = {
  list: iC,
  item: sC,
  body: cC,
  text: dC,
  evidence: uC,
  consequence: hC,
  note: mC
};
function wC({ criterion: e }) {
  return /* @__PURE__ */ t(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Vt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function fC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function _C({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ t("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Ge.consequence, children: fC(e.why) })
    ] })
  ] });
}
function vC({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(wC, { criterion: e }),
    /* @__PURE__ */ t(_C, { criterion: e })
  ] });
}
function XT({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(vC, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const bC = "_list_dwhoz_2", pC = "_rung_dwhoz_6", gC = "_name_dwhoz_18", yC = "_actor_dwhoz_32", ya = {
  list: bC,
  rung: pC,
  name: gC,
  actor: yC
}, NC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function kC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = NC[e.state];
  return /* @__PURE__ */ o("li", { className: ya.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ya.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ya.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function QT({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ya.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(kC, { rung: a }, a.name)) });
}
const $C = "_sheet_pw37w_2", CC = "_title_pw37w_9", SC = "_stage_pw37w_15", RC = "_effects_pw37w_20", TC = "_effect_pw37w_20", xC = "_numeral_pw37w_31", LC = "_effectText_pw37w_38", AC = "_refusals_pw37w_43", EC = "_reasons_pw37w_52", IC = "_reason_pw37w_52", MC = "_actions_pw37w_62", me = {
  sheet: $C,
  title: CC,
  stage: SC,
  effects: RC,
  effect: TC,
  numeral: xC,
  effectText: LC,
  refusals: AC,
  reasons: EC,
  reason: IC,
  actions: MC
};
function BC({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function ZT({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = p(""), w = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: me.sheet, children: [
    /* @__PURE__ */ o("h2", { className: me.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: me.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: me.effects, children: a.map((f, y) => /* @__PURE__ */ o("li", { className: me.effect, children: [
      /* @__PURE__ */ t("span", { className: me.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: me.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ t(
      oh,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(B, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ o("div", { className: me.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: me.reasons, children: n.map((f, y) => /* @__PURE__ */ t("li", { className: me.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: me.actions, children: [
      /* @__PURE__ */ t(BC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const PC = "_list_1laeg_2", jC = "_path_1laeg_7", qC = "_head_1laeg_21", OC = "_label_1laeg_28", DC = "_consequence_1laeg_35", la = {
  list: PC,
  path: jC,
  head: qC,
  label: OC,
  consequence: DC
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Yt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Jt(e) {
  return e ? "primary" : "secondary";
}
function HC({ path: e, primary: a, onChoose: n }) {
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", disabled: !0, disabledReason: e.askInstead ?? "", children: Za[e.kind] });
}
function FC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: la.path, "data-allowed": e.allowed, "data-role": Yt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: la.head, children: [
      /* @__PURE__ */ t("span", { className: la.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(m, { role: Yt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: la.consequence, children: e.consequence }),
    /* @__PURE__ */ t(HC, { path: e, primary: a, onChoose: n })
  ] });
}
function e2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: la.list, children: e.map((n, r) => /* @__PURE__ */ t(FC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const WC = "_list_1m7i0_2", zC = "_item_1m7i0_6", KC = "_node_1m7i0_18", GC = "_body_1m7i0_24", UC = "_head_1m7i0_30", VC = "_stage_1m7i0_36", YC = "_version_1m7i0_41", JC = "_sentence_1m7i0_49", XC = "_meta_1m7i0_54", Re = {
  list: WC,
  item: zC,
  node: KC,
  body: GC,
  head: UC,
  stage: VC,
  version: YC,
  sentence: JC,
  meta: XC
}, QC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function ZC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Re.head, children: [
    /* @__PURE__ */ t("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function eS({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ t(He, { size: 9, kind: QC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(ZC, { entry: e }),
      /* @__PURE__ */ t("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${he(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${oe(e.cost)}`
      ] })
    ] })
  ] });
}
function a2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Re.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(eS, { entry: a }, a.stage + String(n))) });
}
const aS = "_thread_1e70p_3", tS = "_turn_1e70p_8", nS = "_who_1e70p_27", rS = "_body_1e70p_32", Na = {
  thread: aS,
  turn: tS,
  who: nS,
  body: rS
}, xr = ye(!1);
function t2({ children: e, density: a }) {
  return /* @__PURE__ */ t(xr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${Na.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function n2({ turn: e }) {
  if (!ge(xr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Na.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Na.who} ward-chat-who`, children: [
      e.author,
      " · ",
      he(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${Na.body} ward-chat-body`, children: e.body })
  ] });
}
const lS = "_list_yiolt_3", oS = "_row_yiolt_7", iS = "_label_yiolt_20", sS = "_n_yiolt_26", cS = "_cause_yiolt_33", ia = {
  list: lS,
  row: oS,
  label: iS,
  n: sS,
  cause: cS
};
function dS(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const uS = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function hS({ row: e, formatNumber: a }) {
  return dS(e), /* @__PURE__ */ o("li", { className: `${ia.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(He, { size: 8, ...uS[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: ia.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${ia.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(mS, { cause: e.cause })
  ] });
}
function mS({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${ia.cause} ward-healthrow-cause`, children: e }) : null;
}
function r2({ rows: e, formatNumber: a = te }) {
  return /* @__PURE__ */ t("ul", { className: `${ia.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(hS, { row: n, formatNumber: a }, n.label)) });
}
const wS = "_root_1jxwp_2", fS = {
  root: wS
};
function l2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: fS.root, "data-density": l, children: [
    /* @__PURE__ */ t(Oa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const _S = "_row_dhbre_3", vS = "_key_dhbre_13", bS = "_stack_dhbre_24", pS = "_value_dhbre_32", gS = "_evidence_dhbre_39", yS = "_mark_dhbre_47", Xe = {
  row: _S,
  key: vS,
  stack: bS,
  value: pS,
  evidence: gS,
  mark: yS
};
function NS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(it, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function o2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(NS, { state: e.state }) })
  ] });
}
const kS = "_cell_gh2sd_2", $S = {
  cell: kS
}, CS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function SS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function RS(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function TS(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: SS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function xS(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function i2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  RS(e, n);
  const r = xS(e);
  return /* @__PURE__ */ t(
    gh,
    {
      label: "Rejection routing",
      columns: CS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: $S.cell, "data-norerun": l.noRerun ? !0 : void 0, children: TS(l, i) }),
      empty: a ?? /* @__PURE__ */ t(cw, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const LS = "_row_1f2re_2", AS = "_title_1f2re_12", ES = "_turns_1f2re_18", IS = "_waiting_1f2re_19", MS = "_resolved_1f2re_20", BS = "_activity_1f2re_21", PS = "_cost_1f2re_28", jS = "_link_1f2re_29", qS = "_tableLink_1f2re_47", OS = "_tableRecord_1f2re_48", DS = "_tableRow_1f2re_59", HS = "_tableTitle_1f2re_71", FS = "_tableResolved_1f2re_76", WS = "_tableMeta_1f2re_87", zS = "_tableCost_1f2re_94", KS = "_tableActivity_1f2re_95", GS = "_tableState_1f2re_105", D = {
  row: LS,
  title: AS,
  turns: ES,
  waiting: IS,
  resolved: MS,
  activity: BS,
  cost: PS,
  link: jS,
  tableLink: qS,
  tableRecord: OS,
  tableRow: DS,
  tableTitle: HS,
  tableResolved: FS,
  tableMeta: WS,
  tableCost: zS,
  tableActivity: KS,
  tableState: GS
}, Lr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function US(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function VS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function YS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const JS = { duplicate: "Closed · duplicate" };
function XS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function QS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : oe(e) });
}
function ZS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: F(e.href), children: `→ ${e.key}` });
}
function eR({ session: e, href: a }) {
  const n = Lr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: F(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: VS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      YS(e.resolved),
      /* @__PURE__ */ t(XS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(QS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: US(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: JS[e.state] ?? n.label }),
      /* @__PURE__ */ t(ZS, { link: e.link })
    ] }) })
  ] });
}
function aR({ session: e }) {
  const a = Lr[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: D.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : oe(e.cost) }),
    /* @__PURE__ */ t("span", { className: D.activity, children: he(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: D.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function s2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(eR, { session: e.session, href: e.href }) : /* @__PURE__ */ t(aR, { session: e.session });
}
const tR = "_block_1yy2v_3", nR = "_list_1yy2v_9", rR = "_line_1yy2v_14", et = {
  block: tR,
  list: nR,
  line: rR
}, lR = { warn: "warning", ok: "ok" };
function oR({ kind: e }) {
  const a = lR[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function iR({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(oR, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function c2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(iR, { line: n }, `${r}-${n.text}`)) }) });
}
const sR = "_band_tt7hp_1", cR = "_head_tt7hp_8", dR = "_cell_tt7hp_19", uR = "_index_tt7hp_35", hR = "_title_tt7hp_42", mR = "_note_tt7hp_48", wR = "_cellTitle_tt7hp_53", fR = "_cellBody_tt7hp_58", _R = "_tag_tt7hp_64", $e = {
  band: sR,
  head: cR,
  cell: dR,
  index: uR,
  title: hR,
  note: mR,
  cellTitle: wR,
  cellBody: fR,
  tag: _R
}, Xt = 4;
function d2({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Xt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Xt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: $e.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: $e.head, children: [
      /* @__PURE__ */ t("span", { className: $e.index, children: e }),
      /* @__PURE__ */ t("span", { className: $e.title, children: a }),
      /* @__PURE__ */ t("span", { className: $e.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: $e.cell, children: [
      /* @__PURE__ */ t("span", { className: $e.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: $e.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: $e.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  RR as ACCENT_PRESETS,
  VR as ActionStack,
  VT as ActivityConsole,
  BR as AdminIcon,
  Sv as AgentCard,
  jR as AppShell,
  ET as AppearanceStrip,
  d2 as Band,
  KR as BarChart,
  zw as BoardColumn,
  uT as BoardFootnote,
  hT as BoardHeader,
  IR as BoardIcon,
  tT as BoardScroller,
  b as Btn,
  SR as CHIP_ROLES,
  fr as CREDENTIAL_COLUMNS,
  zR as Callout,
  IT as CapabilityRow,
  rT as CardGrid,
  n2 as ChatMessage,
  mn as Checkbox,
  m as Chip,
  ta as ClampText,
  YT as ClarificationRow,
  NT as ClauseRuleRow,
  yT as ClauseRules,
  Yn as ColourLadder,
  MT as ComponentRow,
  JT as Composer,
  wT as ConfigRow,
  mT as ConfigRowHead,
  st as ConnectionMark,
  UT as ConsoleAnnounceProvider,
  t2 as Conversation,
  oh as CostMeter,
  PT as CredentialRow,
  BT as CredentialRowHead,
  XT as CriteriaList,
  ts as Crumb,
  TR as DENSITIES,
  r2 as DeliveryHealth,
  oT as DeniedState,
  AR as DisabledScope,
  $T as DryRunRail,
  cw as EmptyState,
  jT as EnvCard,
  B as Field,
  lT as FilteredEmpty,
  eT as FormStack,
  Oa as GateChecklist,
  QT as GateLadder,
  gh as Grid,
  ST as HandoffRuleRow,
  CT as HandoffRules,
  ER as HomeIcon,
  fT as ItemDrawer,
  qT as KeyPanel,
  Xr as LIVE_EVENT_TYPES,
  V_ as LegacyBoardColumn,
  vT as LegacyBoardHeader,
  bT as LegacyConfigRow,
  gT as LegacyItemDrawer,
  H_ as LegacyOverCapNote,
  pT as LegacyPreviewRail,
  Gn as LegacyWorkCard,
  Le as LiveIndicator,
  iT as LoadFailed,
  dT as Loading,
  yr as MCP_SERVER_COLUMNS,
  it as Mark,
  DT as MarkUpload,
  He as Marker,
  FT as McpServerRow,
  HT as McpServerRowHead,
  Tn as Menu,
  Cn as MenuButton,
  RT as NewStreamModal,
  mw as OverCapNote,
  lt as OverflowRow,
  na as Overlay,
  kT as PARTIAL_STEP_REASON,
  Nr as POLICY_CHIP_WIDTH,
  XR as PageFrame,
  WR as PageHeader,
  GR as PlainList,
  WT as PolicyRow,
  _T as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  ir as RULE_ACTIONS,
  qn as Radio,
  l2 as ReadyChecklist,
  ZR as RecordSection,
  ZT as RequeueSheet,
  e2 as ResolveBlock,
  o2 as ResolvedFieldRow,
  zT as RoleMatrixRow,
  i2 as RoutingTable,
  TT as RuleRow,
  KT as RunbookSteps,
  Jr as STREAM_STEPS,
  aT as SectionBand,
  Mt as SectionHeader,
  Pn as SegmentedControl,
  yn as Select,
  s2 as SessionRow,
  DR as Sidebar,
  PR as SidebarFoldButton,
  xT as StageColumn,
  nT as StageGrid,
  a2 as StageHistory,
  ig as StageListEditor,
  sT as StaleStrip,
  Pa as StatStrip,
  YR as StatTiles,
  FR as StreamAvatar,
  LT as StreamRow,
  MR as StudioIcon,
  QR as SubjectRail,
  Ue as Switch,
  OR as TabLinks,
  UR as TableHead,
  qR as Tabs,
  NR as ThemeProvider,
  AT as ToolRow,
  JR as TopBar,
  km as Tree,
  Wn as TreeRow,
  c2 as TypedInputBlock,
  Ho as UNSAFE_HREF,
  GT as ValidationList,
  gR as VisibilityProvider,
  yR as Visible,
  CR as WARD_VERSION,
  qa as WorkCard,
  cT as WriteUnavailableStrip,
  US as agoSince,
  jr as clock,
  $g as colourStatus,
  te as count,
  ue as duration,
  at as elapsed,
  $R as eventSourceTransport,
  Ia as isStreamStep,
  da as isValidatedStreamStep,
  tb as ladderValidation,
  Vk as mcpConnectionChip,
  Gk as mcpToolName,
  oe as money,
  ve as ms,
  zn as ordered,
  an as ratio,
  w1 as restartLabel,
  F as safeHref,
  he as stamp,
  tt as stream,
  xR as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  el as streamHex,
  Ca as streamInitials,
  Qr as streamVars,
  HR as uniqueStreamInitials,
  vn as useAnchoredPanel,
  ba as useBorderFlash,
  Ae as useDisabledScope,
  Ur as useFocusTrap,
  LR as useLiveFeed,
  kR as useReturnFocus,
  Ea as useRovingTabindex,
  nt as useTicker,
  qr as useVisible,
  I as v,
  OT as validateMark,
  ma as validatedStep,
  nn as validatedStreamSteps
};
