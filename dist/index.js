import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Vt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as X, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as vr, Children as br, Fragment as pr } from "react";
import { createPortal as gr, flushSync as Yt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const ft = (e) => String(e).padStart(2, "0");
function at(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${ft(a % 60)}s` : `${Math.floor(n / 60)}h ${ft(n % 60)}m`;
}
const yr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = yr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function ne(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function ee(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function Jt(e, a) {
  return `${e} / ${a}`;
}
const Nr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function kr(e) {
  return Nr.format(new Date(e));
}
const Xt = Te(/* @__PURE__ */ new Set());
function RS({ hidden: e, children: a }) {
  const n = Vt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Xt.Provider, { value: n, children: a });
}
function $r(e) {
  return !Re(Xt).has(e);
}
function TS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: $r(e) ? a : n });
}
const Cr = "(prefers-color-scheme: dark)";
function _t() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Cr) : null;
}
function Sr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = _t()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? _t() : null;
    if (!r) return;
    const l = () => n(r.matches);
    return l(), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Oa(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Rr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function xS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Sr(e === "system");
  return Oa("data-theme", Rr(e, l)), Oa("data-accent", a), Oa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Tr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function xr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Lr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = xr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Ar(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Tr));
      Lr(n, e.current, r);
    },
    [e]
  ) };
}
function LS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const vt = { ArrowUp: -1, ArrowDown: 1 }, bt = { ArrowLeft: -1, ArrowRight: 1 }, Er = (e, a, n) => Math.min(n, Math.max(a, e));
function Ir(e, a) {
  if (a !== "horizontal" && e in vt) return vt[e];
  if (a !== "vertical" && e in bt) return bt[e];
}
function La({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  aa(() => {
    var v;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], w = l.current;
    l.current = !1, n(m), w && ((v = r.current.get(m)) == null || v.focus());
  });
  const i = X((u) => n(u), []), s = X((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = X(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const w = Math.max(0, m.indexOf(a)), v = Ir(u.key, e);
      v !== void 0 ? (u.preventDefault(), s(m[Er(w + v, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = X(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (m) => {
        m ? r.current.set(u, m) : (r.current.delete(u), u === a && (l.current = !0));
      },
      onFocus: () => n(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const AS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, ES = "0.2.0", IS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Mr = [1, 2, 3, 4, 5, 6], Qt = [1, 2, 3], Br = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], MS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], BS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
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
}, we = {
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
function Aa(e) {
  return Mr.includes(e);
}
function sa(e) {
  return Qt.includes(e);
}
function Pr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function PS(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const qr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function jr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return qr[e];
}
function pt(e) {
  return typeof e != "string" ? null : Br.includes(e) ? e : null;
}
function Dr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Or(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Hr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Fr(e, a, n) {
  const r = Dr(e);
  if (r === null) return null;
  const l = pt(n) ?? pt(r.type);
  return l === null ? null : { ...r, type: l, id: Or(r, a), at: Hr(r) };
}
function zr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Wr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function qS(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), w = f(0), v = f(0), y = f(!1), L = f("reconnecting"), B = X((R) => {
    L.current = R, r(R);
  }, []), le = X(() => {
    c.current = Date.now();
  }, []), Le = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const De = Fr(R, G, ge);
        De !== null && (De.id && (d.current = De.id), le(), y.current = !1, B("live"), i(De.at), Le(De));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, R);
      }
    });
  }, [Le, B, le, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = zr(R, L.current);
    G && B(G);
    const ge = m.current;
    Wr(R, y.current, ge) && Ue(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(v.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ue, B]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function nt(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return S(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const Kr = { blue: "running", orange: "waiting", green: "done" };
function Gr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function va(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Gr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Kr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => gt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Ur = "_root_1otpc_2", Vr = {
  root: Ur
};
function Yr(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${kr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Yr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Vr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Jr = "_app_yqy5k_1", Xr = "_side_yqy5k_30", Qr = "_sideTop_yqy5k_42", Zr = "_sideBody_yqy5k_56", el = "_iconRail_yqy5k_94", al = "_railItem_yqy5k_103", tl = "_railIcon_yqy5k_124", nl = "_railDot_yqy5k_129", rl = "_railLetter_yqy5k_135", ll = "_main_yqy5k_140", ol = "_rail_yqy5k_103", il = "_page_yqy5k_158", sl = "_headerRow_yqy5k_167", cl = "_sidebarToggle_yqy5k_174", dl = "_headerSlot_yqy5k_179", ul = "_drawerSide_yqy5k_184", ml = "_root_yqy5k_220", hl = "_topbar_yqy5k_227", wl = "_mark_yqy5k_238", fl = "_brand_yqy5k_245", _l = "_tagline_yqy5k_251", vl = "_identity_yqy5k_257", bl = "_tools_yqy5k_258", pl = "_nav_yqy5k_268", gl = "_metadata_yqy5k_275", yl = "_actor_yqy5k_290", Nl = "_detail_yqy5k_291", kl = "_content_yqy5k_336", $l = "_toolsPanel_yqy5k_352", Cl = "_skip_yqy5k_378", $ = {
  app: Jr,
  side: Xr,
  sideTop: Qr,
  sideBody: Zr,
  iconRail: el,
  railItem: al,
  railIcon: tl,
  railDot: nl,
  railLetter: rl,
  main: ll,
  rail: ol,
  page: il,
  headerRow: sl,
  sidebarToggle: cl,
  headerSlot: dl,
  drawerSide: ul,
  root: ml,
  topbar: hl,
  mark: wl,
  brand: fl,
  tagline: _l,
  identity: vl,
  tools: bl,
  nav: pl,
  metadata: gl,
  actor: yl,
  detail: Nl,
  content: kl,
  toolsPanel: $l,
  skip: Cl
};
function ca(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Sl = "_scope_1an6i_2", Rl = {
  scope: Sl
}, Zt = Te(null);
function jS({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Rl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(Zt.Provider, { value: { reason: e, reasonId: n }, children: a })
  ] });
}
function qe() {
  return Re(Zt);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : ca(e, a.reasonId);
}
const Tl = "_btn_tzr89_2", xl = "_primary_tzr89_14", Ll = "_destructive_tzr89_25", Al = "_secondary_tzr89_35", El = "_ghost_tzr89_40", Il = "_overflow_tzr89_49", Ml = "_sm_tzr89_56", Bl = "_disabled_tzr89_60", ma = {
  btn: Tl,
  primary: xl,
  destructive: Ll,
  secondary: Al,
  ghost: El,
  overflow: Il,
  sm: Ml,
  disabled: Bl
};
function Pl(e, a, n, r) {
  const l = a === "sm" ? [ma.sm, "ward-btn--sm"] : [], i = n ? [ma.disabled] : [];
  return [ma.btn, ma[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ql(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function jl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Dl(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Ol(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Hl(e, a, n) {
  return Ol(e.describedBy, a && n);
}
function Fl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function zl(e) {
  return e.children ?? e.label;
}
function b(e) {
  const a = qe();
  jl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Dl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Pl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Hl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ql(n, e.controls),
        children: zl(e)
      }
    ),
    /* @__PURE__ */ t(Fl, { id: s, reason: i })
  ] });
}
function Ia(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return S(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => n(s.matches);
    return r.addEventListener("change", l), n(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
const Wl = "_scrim_18idy_2", Kl = "_drawer_18idy_10", Gl = "_sheet_18idy_14", Ul = "_modal_18idy_18", Vl = "_panel_18idy_23", Yl = "_start_18idy_39", Jl = "_header_18idy_62", Xl = "_title_18idy_70", Ql = "_body_18idy_74", Zl = "_close_18idy_101", Ce = {
  scrim: Wl,
  drawer: Kl,
  sheet: Gl,
  modal: Ul,
  panel: Vl,
  start: Yl,
  header: Jl,
  title: Xl,
  body: Ql,
  close: Zl
}, eo = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function ao(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function to(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function no(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !ao(r) && to(e, r);
}
function ro(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (no(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function lo(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function oo(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), ro(n, a), n;
}
function io(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), lo(e);
}
function yt(e) {
  return e !== null && Na.at(-1) === e;
}
function so(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = oo(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      io(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => yt(r.current), []);
}
function co(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function uo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function mo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function ho(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function wo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function fo(e) {
  const a = Re(eo);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = fo(e.container), i = Ia("(min-width: 768px)"), s = co(e.kind, i), c = uo(e, r), d = Ar(n), u = so(a, l, e.returnFocusTo), m = X(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return S(() => {
    var w, v;
    u() && ((v = (w = n.current) == null ? void 0 : w.querySelector("button")) == null || v.focus());
  }, [u]), S(() => {
    const w = (v) => {
      v.key === "Escape" && m();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [m]), gr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: ho(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: m,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: n,
            id: e.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: wo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(mo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const _o = /^([a-z][a-z0-9+.-]*):/i, vo = /* @__PURE__ */ new Set(["http", "https"]), bo = "#";
function po(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = _o.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = po(e);
  return a === void 0 || vo.has(a) ? e : bo;
}
function go(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function en(e) {
  const a = go(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function yo(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => en(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function No(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function an(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = No(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), en(r);
  }, [e, a, n]);
}
const ko = "_row_160e9_2", $o = {
  row: ko
};
function Co(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return yo(u, n), /* @__PURE__ */ t(r, { ref: u, className: [$o.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Co(l, r), ...c, children: a });
}
const So = "_icon_1ylqy_2", Ro = {
  icon: So
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Ro.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function DS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function OS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function HS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function FS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function To() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const tn = "ward:sidebar-collapsed", xo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Lo() {
  try {
    return window.localStorage.getItem(tn) === "true";
  } catch {
    return !1;
  }
}
function Ao(e) {
  try {
    window.localStorage.setItem(tn, String(e));
  } catch {
  }
}
function Eo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Io(e) {
  return e instanceof Element && e.closest(xo) !== null;
}
function Mo(e) {
  return e.key === "[" && !Eo(e) && !Io(e.target);
}
function Bo(e) {
  const [a, n] = p(Lo), r = () => {
    Ao(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Mo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Po() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function qo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function jo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: nn(e, !1) }) });
}
function Do(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: l, toggle: i } = Bo(r);
  return n === void 0 ? Oo(r, l, i) : Ho(n, a, i);
}
function Oo(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Ho(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const Fo = (e) => e ? "" : void 0;
function nn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function zo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(To, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Wo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ko({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Wo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Go({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(zo, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: nn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(Ko, { items: n ?? [], label: a })
  ] });
}
function Uo({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i, collapsed: s }) {
  const c = r != null, d = Po(), u = Do(i, d.narrow, s), m = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": Fo(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(Go, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(qo, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(jo, { sidebar: e, label: m, drawer: d })
  ] });
}
function Vo({ destinations: e, active: a }) {
  const n = f(null);
  return an(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Yo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function Jo() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Xo({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Qo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Zo(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Vo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Yo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Xo, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ei(e) {
  const a = N(), n = Jo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Zo, { ...e, menu: n }),
    /* @__PURE__ */ t(Qo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function ai(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function zS(e) {
  return ai(e) ? /* @__PURE__ */ t(Uo, { ...e }) : /* @__PURE__ */ t(ei, { ...e });
}
const ti = "_root_197jc_2", ni = "_row_197jc_8", ri = "_box_197jc_14", li = "_label_197jc_21", oi = "_lockedNote_197jc_26", ii = "_consequence_197jc_34", si = "_sample_197jc_69", He = {
  root: ti,
  row: ni,
  box: ri,
  label: li,
  lockedNote: oi,
  consequence: ii,
  sample: si
};
function ci(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function di({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function ui({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function mi({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function rn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = qe(), l = ci(e, r);
  return /* @__PURE__ */ o("div", { className: `${He.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: He.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${He.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ea(ca(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: He.label, children: [
        e.label,
        /* @__PURE__ */ t(ui, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(mi, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(di, { id: n, text: e.consequence })
  ] });
}
const hi = "_chip_pq6tb_2", wi = {
  chip: hi
}, fi = {
  gate: W.chip.gate,
  system: W.chip.system,
  write: W.chip.write,
  drift: W.chip.drift,
  done: W.chip.done,
  attention: W.chip.attention,
  failed: W.chip.failed,
  pending: W.chip.pending,
  running: W.chip.running,
  warn: W.chip.warn,
  meta: W.chip.meta,
  soft: W.chip.soft,
  quiet: W.chip.quiet,
  owed: W.chip.owed
};
function _i(e, a) {
  if (e === "stream") return vi(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = fi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function vi(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${wi.chip} ward-chip ward-chip--${e}`, style: _i(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const bi = "_clamp_zn74g_3", Nt = {
  clamp: bi
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Nt.clamp : `${Nt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ua(e) {
  return typeof e == "number" && sa(e) ? e : null;
}
function pe(e, a) {
  const n = ua(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ba(e, a) {
  const n = ua(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const pi = "_root_13eei_3", gi = "_nav_13eei_8", yi = "_list_13eei_16", Ni = "_item_13eei_24", ki = "_link_13eei_44", $i = "_sep_13eei_54", Ci = "_current_13eei_58", Si = "_chips_13eei_62", Ae = {
  root: pi,
  nav: gi,
  list: yi,
  item: Ni,
  link: ki,
  sep: $i,
  current: Ci,
  chips: Si
};
function Ri({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ae.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ae.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ae.link} ward-target`, href: H(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ae.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function ln(e, a, n) {
  const r = f(n);
  r.current = n, S(() => {
    if (!e) return;
    const l = (i) => {
      var s;
      (s = a.current) != null && s.contains(i.target) || r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, [e, a]);
}
const Ti = 500;
function on(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function sn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Ti), e.current);
}
const ha = 4;
function xi(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), l = Math.max(0, e.top - ha * 2);
  return a <= r || r >= l ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, l), maxHeight: l };
}
function Li(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Ai(e, a, n, r) {
  return { ...xi(e, a.height, n.height), left: Li(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ei(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ii(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = Ii(e), l = Ei(e, a), i = Ai(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: ba(i.left - l.box.left), top: ba(i.top - l.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Mi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function cn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Mi(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Bi = "_root_1lgbn_2", Pi = "_trigger_1lgbn_7", qi = "_value_1lgbn_47", ji = "_menu_1lgbn_65", Di = "_find_1lgbn_87", Oi = "_list_1lgbn_103", Hi = "_option_1lgbn_114", Fi = "_check_1lgbn_133", zi = "_empty_1lgbn_144", fe = {
  root: Bi,
  trigger: Pi,
  value: qi,
  menu: ji,
  find: Di,
  list: Oi,
  option: Hi,
  check: Fi,
  empty: zi
}, Wi = 7;
function Ki(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Gi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Yt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Ki(e.options, l),
    findable: e.options.length > Wi,
    show: () => {
      e.disabled || (i(""), c($t(e.options, e.value)), r(!0));
    },
    close: d,
    to: c,
    pick: (u) => {
      var m;
      u && u.option.value !== e.value && ((m = e.onChange) == null || m.call(e, u.option.value)), d(!0);
    },
    find: (u) => {
      i(u), c(0);
    }
  };
}
function Ui(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Vi(e) {
  const a = sn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function dn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Yi(e) {
  return { ...dn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function un(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Ji = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Xi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Ji.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Qi({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === n.active || void 0,
      className: fe.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: fe.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: fe.label, children: e.option.label })
      ]
    }
  );
}
function rt(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function Zi({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: fe.find,
      type: "text",
      placeholder: "Find",
      "aria-label": "Find",
      "aria-controls": a.list,
      "aria-autocomplete": "list",
      "aria-activedescendant": rt(e, a),
      autoComplete: "off",
      spellCheck: !1,
      value: e.query,
      onChange: (r) => e.find(r.target.value),
      onKeyDown: un(e, dn(e), () => {
      })
    }
  );
}
function es({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Vi(a), s = f(null);
  cn(l, s);
  const c = (d) => {
    on(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Zi, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: fe.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : rt(a, n),
        onKeyDown: un(a, Yi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Qi, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function as(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function mn(...e) {
  return e.filter(Boolean).join(" ");
}
function ts(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ns({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = qe()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: mn(fe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": ca(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...Xi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: ts(e) })
    }
  );
}
function hn(e) {
  const a = qe(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Gi(n, s), u = Ui(d.open, c);
  return ln(d.open, i, () => d.close(!1)), as(d, l), /* @__PURE__ */ o("div", { ref: i, className: mn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ns, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(es, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const rs = "_field_1ensj_2", ls = "_label_1ensj_8", os = "_labelHidden_1ensj_15", is = "_control_1ensj_25", ss = "_mono_1ensj_45", cs = "_area_1ensj_50", ds = "_invalid_1ensj_57", Pe = {
  field: rs,
  label: ls,
  labelHidden: os,
  control: is,
  mono: ss,
  area: cs,
  invalid: ds
}, us = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, wn = (e) => `${e}-label`;
function ms({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? us : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function hs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    hn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": wn(a.id),
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
function ws({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const fs = { input: ms, select: hs, textarea: ws };
function _s(e, a, n) {
  const r = fs[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function vs(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ea(ca(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function bs(e) {
  const a = e.mono ? [Pe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Pe.area] : [];
  return [Pe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function ps(e) {
  return e ? `${Pe.label} ${Pe.labelHidden} ward-field-label` : `${Pe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = vs(e, a, n, qe()), l = bs(e);
  return /* @__PURE__ */ o("div", { className: `${Pe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: wn(a), className: ps(e.labelHidden), htmlFor: a, children: e.label }),
    _s(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Pe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const gs = "_root_1gft5_2", ys = "_trigger_1gft5_9", Ns = "_panel_1gft5_33", ks = "_menu_1gft5_52", $s = "_group_1gft5_57", Cs = "_heading_1gft5_62", Ss = "_item_1gft5_68", Rs = "_separator_1gft5_94", Ts = "_footer_1gft5_100", _e = {
  root: gs,
  trigger: ys,
  panel: Ns,
  menu: ks,
  group: $s,
  heading: Cs,
  item: Ss,
  separator: Rs,
  footer: Ts
}, fn = Te(null);
function xs(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Yt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Ls = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function As(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Ls.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function _n(...e) {
  return e.filter(Boolean).join(" ");
}
function Es(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: _n(_e.trigger, r) };
}
function Is(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = xs(e.defaultOpen === !0, l);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: _n(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Es(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...As(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(fn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Ms(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Bs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const vn = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = vn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Ps = (e) => e.split("").every((a) => a === e[0]);
function qs(e, a, n) {
  const r = Ps(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = vn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function js(e) {
  const a = f([]);
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
function Ds(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Ze(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Ze(n, e.current(), -1))],
    ["Home", () => e.focus(Ze(n, -1, 1))],
    ["End", () => e.focus(Ze(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Os(e, a) {
  const n = f(!1), r = sn(), l = Ds(e, a), i = (s) => {
    on(s) && e.focus(qs(e.items, e.current(), r(s.key)));
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
function Hs(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Fs({ row: e, nav: a, popup: n }) {
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
function bn(e) {
  const { item: a, at: n } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[n] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: _e.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...Fs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function zs({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(bn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Ws({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(zs, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(bn, { row: e.row, nav: a, popup: n });
}
function Ks() {
  const e = Re(fn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Gs({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ks(), c = f(null);
  cn(s, c, n);
  const d = Ms(e), u = js(d.flatMap(Bs).map((w) => w.item)), m = Os(u, r);
  return Hs(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(Ws, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
function Us(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function pn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !Us(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const Vs = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Ys({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Vs(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Ha = (e) => Number.parseFloat(e) || 0, Ct = (e) => e.getBoundingClientRect().width;
function Js(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function Xs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Qs = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Zs(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Js(i);
      l((d) => Qs(d, c) ? d : c);
    };
    return s(), Xs(i, s);
  }, [e, n]), r && Ys(r, a);
}
const ec = "_strip_jqyo6_2", ac = "_fits_jqyo6_19", tc = "_probe_jqyo6_27", nc = "_moreRoot_jqyo6_36", rc = "_more_jqyo6_36", lc = "_tab_jqyo6_55", oc = "_count_jqyo6_91", ve = {
  strip: ec,
  fits: ac,
  probe: tc,
  moreRoot: nc,
  more: rc,
  tab: lc,
  count: oc
}, gn = "More";
function ic(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const yn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Nn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const sc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function cc({ tab: e, active: a, place: n, onChange: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      id: `tab-${e.id}`,
      type: "button",
      role: "tab",
      className: `${ve.tab} ward-tab`,
      "aria-selected": e.id === a,
      "aria-controls": `panel-${e.id}`,
      onClick: () => r(e.id),
      ...n,
      children: [
        e.label,
        e.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: ve.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function dc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function uc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Is, { label: gn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Gs, { align: "end", entries: e.map((r) => ({ label: yn(r), onSelect: () => n(r.id) })) }) });
}
function mc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : sc;
}
function WS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = La({ orientation: "horizontal" }), s = ic(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  pn(c, l);
  const d = Zs(c, s, e.map(yn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Nn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(cc, { tab: m, active: a, place: mc(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: gn }),
    u.length > 0 && /* @__PURE__ */ t(uc, { tabs: u, trigger: i.itemProps(e.length), onPick: dc(c, n) })
  ] });
}
const St = 7;
function KS({ links: e, active: a, label: n, level: r }) {
  if (e.length > St) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${St} — the set is fixed`);
  const l = f(null);
  return pn(l, r), an(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: Nn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const hc = "_root_v56ff_3", wc = "_segment_v56ff_9", Rt = {
  root: hc,
  segment: wc
};
function kn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = La({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Rt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Rt.segment,
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
const fc = "_sidebar_s9o1j_3", _c = "_brand_s9o1j_9", vc = "_mark_s9o1j_17", bc = "_word_s9o1j_24", pc = "_nav_s9o1j_30", gc = "_navItem_s9o1j_39", yc = "_footLink_s9o1j_49", Nc = "_group_s9o1j_58", kc = "_groupName_s9o1j_65", $c = "_agents_s9o1j_81", Cc = "_agent_s9o1j_81", Sc = "_root_s9o1j_96", Rc = "_agentTop_s9o1j_105", Tc = "_dot_s9o1j_112", xc = "_agentName_s9o1j_124", Lc = "_agentMeta_s9o1j_138", Ac = "_foot_s9o1j_49", Ec = "_footName_s9o1j_150", Ic = "_footLinks_s9o1j_157", Mc = "_linkBrand_s9o1j_184", Bc = "_label_s9o1j_205", Pc = "_note_s9o1j_210", qc = "_footer_s9o1j_226", x = {
  sidebar: fc,
  brand: _c,
  mark: vc,
  word: bc,
  nav: pc,
  navItem: gc,
  new: "_new_s9o1j_48",
  footLink: yc,
  group: Nc,
  groupName: kc,
  agents: $c,
  agent: Cc,
  root: Sc,
  agentTop: Rc,
  dot: Tc,
  agentName: xc,
  agentMeta: Lc,
  foot: Ac,
  footName: Ec,
  footLinks: Ic,
  linkBrand: Mc,
  label: Bc,
  note: Pc,
  footer: qc
};
function jc({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: H(e.href),
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
function Dc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Oc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: H(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(jc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Dc, { shared: i })
  ] });
}
function Hc(e) {
  return e.destinations ?? e.items ?? [];
}
function Fc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function zc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Wc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Kc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Fc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Hc(e).map((a) => /* @__PURE__ */ t(Wc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(zc, { children: e.children })
  ] });
}
function Gc(e) {
  return "agents" in e;
}
function GS(e) {
  return Gc(e) ? /* @__PURE__ */ t(Oc, { ...e }) : /* @__PURE__ */ t(Kc, { ...e });
}
const Uc = "_mark_wlgi8_3", Vc = {
  mark: Uc
}, Yc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Vc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Yc[e]
    }
  );
}
const Jc = "_avatar_1t33a_3", Xc = {
  avatar: Jc
};
function Qc(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function Zc(e) {
  return e != null && sa(e) ? Pr(e) : void 0;
}
function US({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: Xc.avatar, "data-size": n, "aria-hidden": "true", style: Zc(a), children: Qc(e) });
}
const ed = "_marker_br9fi_2", ad = {
  marker: ed
}, td = {
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
}, nd = { running: " ward-running" };
function je({ size: e, kind: a, label: n }) {
  const r = { "--marker": td[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${ad.marker} ward-marker ward-marker--${a}${nd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const rd = "_root_ti0pq_2", ld = "_chip_ti0pq_11", od = "_noCase_ti0pq_23", wa = {
  root: rd,
  chip: ld,
  noCase: od
};
function id(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = id(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${wa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(je, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: wa.noCase, children: at(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${wa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const sd = "_root_u8ort_2", cd = "_context_u8ort_13", dd = "_row_u8ort_1", ud = "_heading_u8ort_27", md = "_headingWrap_u8ort_35", hd = "_chips_u8ort_40", wd = "_title_u8ort_48", fd = "_consequence_u8ort_58", _d = "_actionsWrap_u8ort_65", vd = "_actions_u8ort_65", bd = "_action_u8ort_65", pd = "_overflowPanel_u8ort_94", gd = "_measureClip_u8ort_105", yd = "_measure_u8ort_105", Y = {
  root: sd,
  context: cd,
  row: dd,
  heading: ud,
  headingWrap: md,
  chips: hd,
  title: wd,
  consequence: fd,
  actionsWrap: _d,
  actions: vd,
  action: bd,
  overflowPanel: pd,
  measureClip: gd,
  measure: yd
};
function Nd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function kd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(Nd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function $d({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Cd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Sd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Rd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Td({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ri, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function xd(...e) {
  return e.some((a) => a === null);
}
function Ld(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ad(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Ld(e);
}
function Ed(e, a, n, r, l) {
  if (l === 0 || xd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Ad(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Id(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Md(e) {
  return vr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Bd(e, a) {
  return a.length === 0 && e.length === 1 && Md(e[0]);
}
function Pd(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Id(d)) return;
    const u = () => c(Ed(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function qd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function jd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function VS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = Pd(i, Bd(i, s)), B = s.length > 0, { disclosure: le, close: Le } = Rd(L || B, v), ae = Cd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Td, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t(kd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(jd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t($d, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Sd, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(qd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Dd = "_root_td96x_2", Od = "_body_td96x_16", xt = {
  root: Dd,
  body: Od
};
function YS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const Hd = "_root_bf1pc_2", Fd = "_table_bf1pc_9", zd = "_caption_bf1pc_14", Wd = "_series_bf1pc_23", Kd = "_category_bf1pc_31", Gd = "_cell_bf1pc_39", Ud = "_track_bf1pc_45", Vd = "_lane_bf1pc_52", Yd = "_bar_bf1pc_56", Jd = "_value_bf1pc_63", Xd = "_swatch_bf1pc_70", Qd = "_empty_bf1pc_78", J = {
  root: Hd,
  table: Fd,
  caption: zd,
  series: Wd,
  category: Kd,
  cell: Gd,
  track: Ud,
  lane: Vd,
  bar: Yd,
  value: Jd,
  swatch: Xd,
  empty: Qd
}, Zd = "—", Lt = 6;
function eu(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function au(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function $n(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function tu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function nu({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = tu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function ru({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": $n(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function lu({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function ou({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Zd }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(ru, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(nu, { value: u.values[d], top: r, step: $n(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function JS(e) {
  eu(e.categories, e.series);
  const a = au(e.series);
  return a === 0 ? /* @__PURE__ */ t(lu, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(ou, { ...e, top: a });
}
const iu = "_root_1bfqw_2", su = "_figure_1bfqw_7", cu = "_of_1bfqw_13", du = "_bar_1bfqw_18", uu = "_rows_1bfqw_38", mu = "_row_1bfqw_38", hu = "_label_1bfqw_49", wu = "_amount_1bfqw_54", Ee = {
  root: iu,
  figure: su,
  of: cu,
  bar: du,
  rows: uu,
  row: mu,
  label: hu,
  amount: wu
};
function fu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ee.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ee.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ee.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ee.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ee.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ee.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ee.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ee.amount, children: ne(l.amount) })
    ] }, l.label)) })
  ] });
}
const _u = "_frame_9xel2_2", vu = "_table_9xel2_6", bu = "_th_9xel2_12", pu = "_td_9xel2_13", gu = "_sort_9xel2_48", yu = "_row_9xel2_60", Nu = "_empty_9xel2_68", Me = {
  frame: _u,
  table: vu,
  th: bu,
  td: pu,
  sort: gu,
  row: yu,
  empty: Nu
}, ku = { asc: "ascending", desc: "descending" };
function $u(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return ku[a.direction];
}
function Cu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Su(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Ru({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: Su(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": $u(e, a),
      children: Cu(e, n)
    }
  );
}
function Tu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Me.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Me.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function xu({
  label: e,
  columns: a,
  rows: n,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Me.empty, children: u }) : /* @__PURE__ */ t("div", { className: Me.frame, children: /* @__PURE__ */ o("table", { className: Me.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(Ru, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Tu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Lu = "_list_v0s52_2", Au = {
  list: Lu
};
function XS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Au.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Eu = "_label_1u62a_2", Iu = {
  label: Eu
};
function QS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Iu.label, children: a.header }) }, a.key)) }) });
}
const Mu = "_stack_bp6a0_2", Bu = {
  stack: Mu
};
function ZS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Bu.stack, "data-ward-action-stack": "", children: e });
}
const Pu = "_set_1z0sq_2", qu = "_legend_1z0sq_7", ju = "_row_1z0sq_15", Du = "_control_1z0sq_20", Ou = "_input_1z0sq_26", Hu = "_label_1z0sq_31", Fu = "_consequence_1z0sq_36", Oe = {
  set: Pu,
  legend: qu,
  row: ju,
  control: Du,
  input: Ou,
  label: Hu,
  consequence: Fu
};
function Cn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Oe.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Oe.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, v = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Oe.row, children: [
        /* @__PURE__ */ o("span", { className: Oe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Oe.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": ca(v, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: Oe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: v, className: `${Oe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const zu = "_root_11gpw_2", Wu = "_head_11gpw_10", Ku = "_note_11gpw_29", Gu = "_index_11gpw_34", Uu = "_dot_11gpw_38", Vu = "_counter_11gpw_49", Yu = "_trailing_11gpw_57", Fe = {
  root: zu,
  head: Wu,
  note: Ku,
  index: Gu,
  dot: Uu,
  counter: Vu,
  trailing: Yu
};
function Ju({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Xu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Fe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(Ju, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(Xu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const Qu = "_strip_ww53x_2", Zu = "_cell_ww53x_7", em = "_value_ww53x_12", am = "_link_ww53x_29", tm = "_label_ww53x_49", Ke = {
  strip: Qu,
  cell: Zu,
  value: em,
  link: am,
  label: tm
};
function nm(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Sn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function rm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function lm({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return nm(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(rm, { cell: n }, n.label) : /* @__PURE__ */ t(lm, { cell: n, href: n.href }, n.label)) });
}
const om = "_root_1eb1u_2", im = "_track_1eb1u_8", sm = "_thumb_1eb1u_46", cm = "_labelHidden_1eb1u_64", dm = "_label_1eb1u_64", um = "_lockedNote_1eb1u_84", ze = {
  root: om,
  track: im,
  thumb: sm,
  labelHidden: cm,
  label: dm,
  lockedNote: um
};
function mm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function hm(e) {
  return e ? `${ze.label} ${ze.labelHidden}` : ze.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = qe(), { on: m, off: w } = mm(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${ze.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": m,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Ea(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${ze.track} ward-switch`,
        "data-on": m,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: ze.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: hm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: ze.lockedNote, children: "always on" })
    ] })
  ] });
}
const wm = "_bar_1vp69_2", fm = "_skip_1vp69_11", _m = "_mark_1vp69_22", vm = "_nav_1vp69_30", bm = "_list_1vp69_34", pm = "_select_1vp69_41", gm = "_selectTrigger_1vp69_45", ym = "_dest_1vp69_52", Nm = "_actor_1vp69_71", km = "_actorMark_1vp69_84", $m = "_actorLabel_1vp69_89", Cm = "_tagline_1vp69_108", oe = {
  bar: wm,
  skip: fm,
  mark: _m,
  nav: vm,
  list: bm,
  select: pm,
  selectTrigger: gm,
  dest: ym,
  actor: Nm,
  actorMark: km,
  actorLabel: $m,
  tagline: Cm
};
function Sm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Rm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function eR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Rm(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        hn,
        {
          className: oe.select,
          triggerClassName: oe.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: oe.actor, children: [
      /* @__PURE__ */ t("span", { className: oe.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Sm(c) })
    ] })
  ] });
}
const Tm = "_tree_zzoob_2", xm = "_item_zzoob_6", Lm = "_row_zzoob_10", Am = "_button_zzoob_22", $a = {
  tree: Tm,
  item: xm,
  row: Lm,
  button: Am
}, Rn = Te(null);
function Em({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = La({ orientation: "vertical" });
  return /* @__PURE__ */ t(Rn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Im = { ArrowRight: !0, ArrowLeft: !1 };
function Et(e) {
  return e ? !0 : void 0;
}
function Mm(e, a) {
  const n = Im[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Bm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Pm(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function qm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function jm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Dm(e) {
  return typeof e == "string" ? e : void 0;
}
function Om({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Hm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Tn(e) {
  const a = Re(Rn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = qm(e);
  return /* @__PURE__ */ o("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Pm(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": Et(e.unresolved),
        "data-inherited": Et(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${$a.button} ward-treeitem-btn`,
            onClick: () => Bm(e),
            onKeyDown: (r) => Mm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: jm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Dm(e.label), children: e.label }),
              /* @__PURE__ */ t(Om, { value: e.detail }),
              /* @__PURE__ */ t(Hm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Fm = "_frame_gij4e_2", zm = "_subjectRail_gij4e_22", Wm = "_subject_gij4e_22", Km = "_rail_gij4e_42", Gm = "_record_gij4e_66", Um = "_recordBody_gij4e_71", Vm = "_stageGrid_gij4e_120", Ym = "_band_gij4e_134", Jm = "_bandBody_gij4e_142", Xm = "_bandActions_gij4e_147", Qm = "_scroller_gij4e_155", Zm = "_board_gij4e_182", eh = "_lanes_gij4e_191", Z = {
  frame: Fm,
  subjectRail: zm,
  subject: Wm,
  rail: Km,
  record: Gm,
  recordBody: Um,
  stageGrid: Vm,
  band: Ym,
  bandBody: Jm,
  bandActions: Xm,
  scroller: Qm,
  board: Zm,
  lanes: eh
};
function aR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function It(e) {
  return e ? "true" : void 0;
}
function tR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": It(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": It(l), "aria-label": r, children: a })
  ] });
}
function nR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const ah = "_form_1j8ub_2", th = "_fields_1j8ub_9", nh = "_actions_1j8ub_19", Fa = {
  form: ah,
  fields: th,
  actions: nh
};
function rR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function lR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const rh = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? br.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function lh({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function oh({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(pr, { children: n.content }, n.id)) }) });
}
function oR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(rh);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(lh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(oh, { lanes: n, label: a });
}
function iR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const ih = "_block_b38uc_3", sh = "_sentence_b38uc_10", ch = "_meta_b38uc_19", dh = "_action_b38uc_24", uh = "_strip_b38uc_28", mh = "_loading_b38uc_47", hh = "_label_b38uc_55", wh = "_counter_b38uc_62", be = {
  block: ih,
  sentence: sh,
  meta: ch,
  action: dh,
  strip: uh,
  loading: mh,
  label: hh,
  counter: wh
};
function fh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function qa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(fh, { action: a })
  ] });
}
function _h(e) {
  return /* @__PURE__ */ t(qa, { ...e, kind: "ward-emptystate" });
}
function sR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(qa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function cR(e) {
  return /* @__PURE__ */ t(qa, { ...e });
}
function dR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(qa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function uR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function mR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function hR({ label: e, startedAt: a }) {
  const n = f(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  S(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = nt(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: at(i) }) : null
  ] });
}
const vh = "_note_cigdt_2", bh = {
  note: vh
};
function ph({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: bh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const gh = "_card_k7btg_3", yh = "_hit_k7btg_31", Nh = "_head_k7btg_44", kh = "_title_k7btg_51", $h = "_meta_k7btg_57", Ch = "_since_k7btg_66", Sh = "_sep_k7btg_76", Rh = "_fields_k7btg_80", Th = "_field_k7btg_80", xh = "_last_k7btg_98", Lh = "_reason_k7btg_110", se = {
  card: gh,
  hit: yh,
  head: Nh,
  title: kh,
  meta: $h,
  since: Ch,
  sep: Sh,
  fields: Rh,
  field: Th,
  last: xh,
  reason: Lh
}, Ah = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Eh(e, a, n) {
  const r = va(e, "blue"), l = va(e, "orange"), i = va(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Ah[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Ih = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Mh(e, a) {
  return Ih[a](e);
}
function Bh({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: se.since, children: [
      ce(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Ph({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function qh({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function jh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Mh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Dh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Oh(e, a, n) {
  e == null || e(a, n);
}
function Hh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Fh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  Eh(r, n.key, e.feed);
  const l = Hh(e.feed), i = Dh(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: se.card,
      style: i,
      "data-selected": Ja(e.selected),
      "data-flagged": Ja(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Oh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Ph, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Bh, { item: n, connection: l }),
        /* @__PURE__ */ t(qh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(jh, { item: n, fields: a }),
        /* @__PURE__ */ t(Fh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const zh = "_column_1j8bi_3", Wh = "_head_1j8bi_21", Kh = "_label_1j8bi_30", Gh = "_count_1j8bi_39", Uh = "_list_1j8bi_53", la = {
  column: zh,
  head: Wh,
  label: Kh,
  count: Gh,
  list: Uh
};
function xn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Vh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Yh(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      ja,
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
function Jh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = xn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Vh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Yh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(ph, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Xh = "_foot_cs4jr_2", Qh = "_note_cs4jr_13", Zh = "_link_cs4jr_19", za = {
  foot: Xh,
  note: Qh,
  link: Zh
};
function wR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const ew = "_head_1tfi5_3", aw = "_identity_1tfi5_12", tw = "_titleRow_1tfi5_18", nw = "_title_1tfi5_18", rw = "_key_1tfi5_35", lw = "_rollup_1tfi5_45", ow = "_tools_1tfi5_53", iw = "_swatch_1tfi5_101", sw = "_mark_1tfi5_108", ke = {
  head: ew,
  identity: aw,
  titleRow: tw,
  title: nw,
  key: rw,
  rollup: lw,
  tools: ow,
  swatch: iw,
  mark: sw
}, Mt = "initials:";
function cw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function dw(e) {
  const a = [cw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function uw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    dw(e)
  ] });
}
function mw(e) {
  return e.startsWith(Mt) ? e.slice(Mt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function hw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: mw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function ww({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function fR({
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
  return /* @__PURE__ */ o("div", { className: ke.head, children: [
    /* @__PURE__ */ o("div", { className: ke.identity, children: [
      /* @__PURE__ */ o("div", { className: ke.titleRow, children: [
        /* @__PURE__ */ t(hw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: uw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(ww, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const fw = "_head_1sejb_14", _w = "_line_1sejb_15", vw = "_cHandle_1sejb_36", bw = "_cName_1sejb_41", pw = "_nameLine_1sejb_49", gw = "_cLabel_1sejb_56", yw = "_cCap_1sejb_61", Nw = "_cShown_1sejb_66", kw = "_name_1sejb_49", $w = "_noCap_1sejb_88", Cw = "_state_1sejb_102", Sw = "_handle_1sejb_111", Rw = "_sub_1sejb_137", q = {
  head: fw,
  line: _w,
  cHandle: vw,
  cName: bw,
  nameLine: pw,
  cLabel: gw,
  cCap: yw,
  cShown: Nw,
  name: kw,
  noCap: $w,
  state: Cw,
  handle: Sw,
  sub: Rw
}, Tw = "can't be hidden or collapsed", xw = "terminal · counted, not a column";
function _R() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Lw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Aw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? Tw : e.terminal ? xw : Aw(e.agentsMounted);
}
function Ew(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Iw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: q.sub, children: Bt(e) })
  ] });
}
function Mw(e) {
  return e === void 0 ? "" : String(e);
}
function Bw(e) {
  return e === "" ? void 0 : Number(e);
}
function Pw({ name: e, onReorder: a }) {
  const n = qe();
  return /* @__PURE__ */ t("span", { className: q.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: q.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && Ew(r, a),
      children: "⠿"
    }
  ) });
}
function qw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Mw(a.cap), onChange: (r) => n({ ...a, cap: Bw(r) }) }) });
}
function jw({ stage: e, config: a, onChange: n }) {
  const r = qe() !== null, l = Lw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Dw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function vR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": Dw(e), children: [
    /* @__PURE__ */ t(Pw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Iw, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(qw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(jw, { stage: e, config: a, onChange: n })
  ] });
}
const Ow = "_body_1a4f4_2", Hw = "_head_1a4f4_9", Fw = "_summary_1a4f4_19", zw = "_block_1a4f4_20", Ww = "_actionsBlock_1a4f4_21", Kw = "_title_1a4f4_41", Gw = "_note_1a4f4_46", Uw = "_k_1a4f4_51", Vw = "_kv_1a4f4_58", Yw = "_row_1a4f4_64", Jw = "_label_1a4f4_75", Xw = "_value_1a4f4_84", Qw = "_quote_1a4f4_90", Zw = "_actions_1a4f4_21", ef = "_resolve_1a4f4_103", j = {
  body: Ow,
  head: Hw,
  summary: Fw,
  block: zw,
  actionsBlock: Ww,
  title: Kw,
  note: Gw,
  k: Uw,
  kv: Vw,
  row: Yw,
  label: Jw,
  value: Xw,
  quote: Qw,
  actions: Zw,
  resolve: ef
};
function af(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function tf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function nf(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function rf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function lf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(nf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...af(e),
    ...rf(n),
    ...tf(e, a)
  ];
}
function of({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function sf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function cf({ item: e, showKey: a }) {
  const n = sf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function df({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function bR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = lf(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: j.body, children: [
    /* @__PURE__ */ t(cf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: v }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(df, { item: e }),
    /* @__PURE__ */ o("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(of, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const uf = "_root_3azmy_2", mf = "_list_3azmy_7", hf = "_item_3azmy_12", wf = "_box_3azmy_18", ff = "_text_3azmy_23", _f = "_note_3azmy_28", Ye = {
  root: uf,
  list: mf,
  item: hf,
  box: wf,
  text: ff,
  note: _f
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(lt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const vf = "_rail_znbbp_2", bf = "_k_znbbp_11", pf = "_head_znbbp_19", gf = "_section_znbbp_25", yf = "_card_znbbp_39", Nf = "_strip_znbbp_46", kf = "_skeleton_znbbp_60", $f = "_skeletonLabel_znbbp_74", Cf = "_bar_znbbp_80", Sf = "_note_znbbp_89", me = {
  rail: vf,
  k: bf,
  head: pf,
  section: gf,
  card: yf,
  strip: Nf,
  skeleton: kf,
  skeletonLabel: $f,
  bar: Cf,
  note: Sf
};
function Rf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Tf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function xf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Jh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Lf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(xf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Tf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function pR(e) {
  const a = Rf(e.onOpen), n = xn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Lf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Af(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Ef(e) {
  return Math.ceil(e.length / 2);
}
function If(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ln(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Mf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Ln(e);
  l !== void 0 && n(l), r(If(e.type));
}
function Bf(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Mf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Pf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function qf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function jf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Df(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Ef(a ?? [])) + ")"
  };
}
function Of(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Hf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Ff(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function zf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Wf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Kf(e, a) {
  return a === void 0 ? e : Af(e, a.ref);
}
function Gf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function An(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = va(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Pf(a));
  Bf(e.feed, a.key, s, d, i);
  const u = qf(a, r), m = jf(a, n), w = Df(a, e.fields), v = Wf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Gf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: Kf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Of(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Hf(a, e.fields),
          Ff(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          zf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Uf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Vf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Yf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Jf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Uf, { count: e.items.length, cap: e.column.cap });
}
function Xf(e, a) {
  return e.roving ?? a;
}
function Qf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Zf(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    An,
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
function e_(e) {
  const a = N(), n = La({ orientation: "vertical" }), r = Xf(e, n), l = Vf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Yf(e.column, e.items.length, a),
    Jf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Qf(e, n), children: Zf(e, r) })
  ] });
}
function a_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function t_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function n_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function gR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: a_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      t_(e),
      n_(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function r_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function l_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function o_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function yR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(r_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: l_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    o_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function NR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(An, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(e_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function i_(e, a) {
  const n = Ln(e);
  n !== void 0 && a(n);
}
function s_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => i_(r, n));
  }, [e, a, n]);
}
function c_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function d_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function u_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function m_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function kR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  s_(e.feed, a.key, l);
  const i = [...c_(a), ...d_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      u_(n, r)
    ] }),
    m_(a, e.actions)
  ] });
}
const h_ = "_card_54446_3", w_ = "_head_54446_30", f_ = "_mark_54446_38", __ = "_name_54446_50", v_ = "_chips_54446_71", b_ = "_description_54446_77", p_ = "_run_54446_82", g_ = "_sep_54446_91", y_ = "_facts_54446_96", N_ = "_fact_54446_96", k_ = "_factLabel_54446_109", $_ = "_factValue_54446_113", re = {
  card: h_,
  head: w_,
  mark: f_,
  name: __,
  chips: v_,
  description: b_,
  run: p_,
  sep: g_,
  facts: y_,
  fact: N_,
  factLabel: k_,
  factValue: $_
}, C_ = { live: "done", draft: "running", paused: "meta" };
function S_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function R_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: C_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function T_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function x_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function L_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function A_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function E_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: S_(s),
      style: c,
      "data-selected": d,
      "data-paused": A_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(T_, { description: e.description }),
        /* @__PURE__ */ t(x_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(R_, { versions: e.versions }),
        /* @__PURE__ */ t(L_, { facts: i })
      ]
    }
  );
}
const I_ = "_list_4dcyc_2", M_ = "_row_4dcyc_11", B_ = "_head_4dcyc_23", P_ = "_id_4dcyc_30", q_ = "_lock_4dcyc_35", j_ = "_reason_4dcyc_41", D_ = "_remove_4dcyc_46", O_ = "_clauses_4dcyc_50", H_ = "_clause_4dcyc_50", F_ = "_label_4dcyc_64", z_ = "_cell_4dcyc_71", W_ = "_value_4dcyc_76", ie = {
  list: I_,
  row: M_,
  head: B_,
  id: P_,
  lock: q_,
  reason: j_,
  remove: D_,
  clauses: O_,
  clause: H_,
  label: F_,
  cell: z_,
  value: W_
}, En = Te(!1);
function $R({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(En.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function K_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function G_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function U_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(G_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function CR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(En)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(U_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(K_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const V_ = "_ladder_n8eeo_2", Y_ = "_cell_n8eeo_7", J_ = "_empty_n8eeo_26", X_ = "_name_n8eeo_34", Q_ = "_holder_n8eeo_40", Z_ = "_request_n8eeo_46", ev = "_swatches_n8eeo_51", av = "_swatch_n8eeo_51", tv = "_tilesFrame_n8eeo_78", nv = "_tiles_n8eeo_78", rv = "_tile_n8eeo_78", lv = "_bar_n8eeo_117", ov = "_hex_n8eeo_128", iv = "_note_n8eeo_138", E = {
  ladder: V_,
  cell: Y_,
  empty: J_,
  name: X_,
  holder: Q_,
  request: Z_,
  swatches: ev,
  swatch: av,
  tilesFrame: tv,
  tiles: nv,
  tile: rv,
  bar: lv,
  hex: ov,
  note: iv
}, SR = "not validated yet, pending a CVD matrix and dark stepping";
function sv(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function In(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function cv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function dv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function uv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function mv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const qt = (e) => String(e).padStart(2, "0");
function hv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? In(e, void 0);
}
function wv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${qt(e)}` : jr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${qt(e)} · ${n}` })
  ] });
}
function fv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = sv(e), c = In(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...mv(d, m, u), "data-validation": s, style: cv(e, s), onClick: v, onKeyDown: (B) => uv(B, v) }, label: y, name: w, holder: c, validation: s, note: hv(s, n, m), step: e.step };
}
const _v = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(wv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(dv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function vv(e) {
  return _v[e.presentation](fv(e));
}
function bv(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function pv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function gv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const yv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function Nv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const kv = { list: pv, swatches: () => null, tiles: Nv };
function $v(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Mn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  bv(e.steps);
  const r = gv(e), l = kv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(vv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...$v(e.disabled === !0), className: `${yv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const Cv = "_rail_s06lm_2", Sv = "_section_s06lm_12", Rv = "_sectionFlush_s06lm_22", Tv = "_head_s06lm_26", xv = "_headLabel_s06lm_34", Lv = "_sample_s06lm_42", Av = "_sampleLabel_s06lm_47", Ev = "_sampleTitle_s06lm_54", Iv = "_sampleMeta_s06lm_59", Mv = "_trace_s06lm_65", Bv = "_traceHead_s06lm_70", Pv = "_steps_s06lm_78", qv = "_step_s06lm_78", jv = "_stepTitle_s06lm_97", Dv = "_hollow_s06lm_107", Ov = "_stepBody_s06lm_115", Hv = "_stepDetail_s06lm_127", Fv = "_publish_s06lm_132", zv = "_reason_s06lm_138", Wv = "_note_s06lm_143", Kv = "_reveal_s06lm_148", k = {
  rail: Cv,
  section: Sv,
  sectionFlush: Rv,
  head: Tv,
  headLabel: xv,
  sample: Lv,
  sampleLabel: Av,
  sampleTitle: Ev,
  sampleMeta: Iv,
  trace: Mv,
  traceHead: Bv,
  steps: Pv,
  step: qv,
  stepTitle: jv,
  hollow: Dv,
  stepBody: Ov,
  stepDetail: Hv,
  publish: Fv,
  reason: zv,
  note: Wv,
  reveal: Kv
}, jt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Gv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Uv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Vv = { notSimulated: "not simulated", running: "running" };
function Yv(e) {
  return e.presentation === "foundry";
}
function Jv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Xv(e, a) {
  var r;
  const n = Gv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Qv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Zv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function eb(e) {
  if (Qv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ab(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function tb(e) {
  const a = Vv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(je, { size: 6, kind: Uv[e.kind], label: e.kind });
}
function nb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function rb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function lb(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(ab, { kind: a.kind, children: [
    /* @__PURE__ */ t(tb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(nb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(rb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function ob(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Bn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: ob(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(lb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function ib(e) {
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
function sb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function cb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Jt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function db(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Jt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function ub(e) {
  const a = db(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Pn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function mb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function hb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function qn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: jt[e.run.status].role, label: jt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function wb(e, a) {
  const [n, r] = p(e.steps);
  return S(() => r(e.steps), [e.steps]), S(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), n;
}
function fb(e) {
  var n;
  Zv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(ib, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(cb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(mb, { reason: Jv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function _b(e) {
  var r;
  const a = wb(e.run, e.feed);
  eb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(qn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(sb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(ub, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(hb, { reason: Xv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function RR(e) {
  return Yv(e) ? /* @__PURE__ */ t(_b, { ...e }) : /* @__PURE__ */ t(fb, { ...e });
}
const vb = "_list_142ip_3", bb = "_row_142ip_9", pb = "_condition_142ip_18", gb = "_action_142ip_24", pa = {
  list: vb,
  row: bb,
  condition: pb,
  action: gb
}, jn = Te(!1);
function TR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(jn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function xR({ rule: e }) {
  if (!Re(jn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const yb = "_move_tmppt_3", Nb = {
  move: yb
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Dn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function On(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Dt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function kb(e) {
  return e === "up" ? "down" : "up";
}
function $b(e, a) {
  const n = Dt(e, a.id, a.direction) ?? Dt(e, a.id, kb(a.direction));
  n == null || n.focus();
}
function Hn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && $b(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Fn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Nb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Cb = "_body_1jd1i_2", Sb = "_title_1jd1i_8", Rb = "_section_1jd1i_13", Tb = "_legend_1jd1i_18", xb = "_stages_1jd1i_26", Lb = "_stage_1jd1i_26", Ab = "_stageIndex_1jd1i_44", Eb = "_stageName_1jd1i_50", Ib = "_footer_1jd1i_59", Mb = "_note_1jd1i_66", Bb = "_reason_1jd1i_71", Pb = "_actions_1jd1i_76", qb = "_webHead_1jd1i_83", jb = "_kicker_1jd1i_92", Db = "_webTitle_1jd1i_99", Ob = "_webBody_1jd1i_105", Hb = "_webSection_1jd1i_109", Fb = "_sectionHead_1jd1i_121", zb = "_sectionNote_1jd1i_129", Wb = "_formLabel_1jd1i_134", Kb = "_identityRow_1jd1i_139", Gb = "_nameCell_1jd1i_145", Ub = "_keyCell_1jd1i_150", Vb = "_colourCell_1jd1i_154", Yb = "_colourStatus_1jd1i_161", Jb = "_webStages_1jd1i_166", Xb = "_webStageList_1jd1i_172", Qb = "_webStage_1jd1i_166", Zb = "_webIndex_1jd1i_191", ep = "_webStageName_1jd1i_196", ap = "_webMoves_1jd1i_201", tp = "_addStage_1jd1i_215", np = "_addStageButton_1jd1i_223", rp = "_addStageNote_1jd1i_231", lp = "_webFooter_1jd1i_236", op = "_webFooterNotes_1jd1i_244", ip = "_webNote_1jd1i_251", _ = {
  body: Cb,
  title: Sb,
  section: Rb,
  legend: Tb,
  stages: xb,
  stage: Lb,
  stageIndex: Ab,
  stageName: Eb,
  footer: Ib,
  note: Mb,
  reason: Bb,
  actions: Pb,
  webHead: qb,
  kicker: jb,
  webTitle: Db,
  webBody: Ob,
  webSection: Hb,
  sectionHead: Fb,
  sectionNote: zb,
  formLabel: Wb,
  identityRow: Kb,
  nameCell: Gb,
  keyCell: Ub,
  colourCell: Vb,
  colourStatus: Yb,
  webStages: Jb,
  webStageList: Xb,
  webStage: Qb,
  webIndex: Zb,
  webStageName: ep,
  webMoves: ap,
  addStage: tp,
  addStageButton: np,
  addStageNote: rp,
  webFooter: lp,
  webFooterNotes: op,
  webNote: ip
}, sp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], zn = "not in catalogue";
function cp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${zn}` }, ...n];
}
function dp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: cp(n, e.name), invalid: i, onChange: r });
}
function Wn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function up(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function mp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Wn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(dp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: sp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function hp({ stages: e, onChange: a, catalogue: n }) {
  const r = up(e.length), l = Hn(), i = (c, d) => {
    const u = Dn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, On(Wn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(mp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Fn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const wp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], fp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], _p = "A new stream starts as a draft. Nothing runs on it until you publish it.", vp = "Create is disabled: name the stream and give it a key first.", bp = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function pp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function gp({ stages: e, onMove: a }) {
  const n = Hn(), r = (l, i) => {
    const s = Dn(l, i);
    n.moved({ id: e[l].id, direction: i }, On(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Fn, { text: n.announcement })
  ] });
}
function yp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: _p }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Np(e, a) {
  return e !== "" && a !== "" ? null : vp;
}
function kp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = fp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => pp(n, r)), [ae, Ue] = p(e.stages ?? wp), [Ve, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = Np(m, v);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ t("h2", { className: _.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: v, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ t(Mn, { label: "Stream colour", steps: n, value: le, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(gp, { stages: ae, onMove: (De, _r) => Ue(Xa(ae, De, _r)) })
    ] }),
    /* @__PURE__ */ t(Cn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(yp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Kn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], $p = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Cp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Kn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Sp(e, a) {
  return Rp(e) && Tp(e, a) && xp(e);
}
function Rp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Tp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function xp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Lp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ap({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Ep({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(Ap, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: $p })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Ip({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Mp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: _.webSection, children: [
    /* @__PURE__ */ t("h3", { className: _.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: _.identityRow, children: [
      /* @__PURE__ */ t("div", { className: _.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: _.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Bp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Cp(l, s, d, m, v, L), Le = Sp(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Mn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: Lp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Ip, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(Mp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: bp })
        ] }),
        /* @__PURE__ */ t(hp, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t(Cn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Kn, onChange: y }) }),
      /* @__PURE__ */ t(Ep, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function LR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Bp, { ...e }) : /* @__PURE__ */ t(kp, { ...e });
}
const Pp = "_row_bs8hc_2", qp = "_cell_bs8hc_6", jp = "_condition_bs8hc_11", Dp = "_action_bs8hc_18", Op = "_contract_bs8hc_24", Hp = "_contractCondition_bs8hc_33", Fp = "_contractAction_bs8hc_39", Q = {
  row: Pp,
  cell: qp,
  condition: jp,
  action: Dp,
  contract: Op,
  contractCondition: Hp,
  contractAction: Fp
}, Gn = ["advance", "block", "escalate", "requestReview"], Ot = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Sa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ct(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ot[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Gn.map((l) => ({ value: l, label: Ot[l] }))
    }
  );
}
function zp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Wp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Kp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const Gp = { two: Wp, four: zp, contract: Kp };
function AR(e) {
  var n;
  if (!Gn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Gp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Up = "_column_11id3_2", Vp = "_head_11id3_17", Yp = "_index_11id3_23", Jp = "_name_11id3_29", Xp = "_meta_11id3_38", Qp = "_mono_11id3_43", Zp = "_gate_11id3_50", eg = "_reviewersLabel_11id3_57", ag = "_reviewers_11id3_57", tg = "_reviewer_11id3_57", ng = "_agents_11id3_74", rg = "_workflowColumn_11id3_79", lg = "_workflowHead_11id3_96", og = "_stageRow_11id3_102", ig = "_stageLabel_11id3_109", sg = "_workflowTitle_11id3_116", cg = "_workflowMeta_11id3_122", dg = "_workflowGate_11id3_127", ug = "_gateNote_11id3_135", mg = "_cardNote_11id3_140", hg = "_reviewerList_11id3_145", wg = "_reviewerRow_11id3_151", fg = "_reviewerMark_11id3_157", _g = "_reviewerName_11id3_167", vg = "_terminalCard_11id3_173", bg = "_terminalCount_11id3_182", pg = "_workflowAgents_11id3_188", gg = "_mount_11id3_194", C = {
  column: Up,
  head: Vp,
  index: Yp,
  name: Jp,
  meta: Xp,
  mono: Qp,
  gate: Zp,
  reviewersLabel: eg,
  reviewers: ag,
  reviewer: tg,
  agents: ng,
  workflowColumn: rg,
  workflowHead: lg,
  stageRow: og,
  stageLabel: ig,
  workflowTitle: sg,
  workflowMeta: cg,
  workflowGate: dg,
  gateNote: ug,
  cardNote: mg,
  reviewerList: hg,
  reviewerRow: wg,
  reviewerMark: fg,
  reviewerName: _g,
  terminalCard: vg,
  terminalCount: bg,
  workflowAgents: pg,
  mount: gg
}, yg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Un(e) {
  return `${Math.round(e * 100)}%`;
}
function Ng({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: Un(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function kg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function $g({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: yg[e.kind] })
  ] });
}
function Cg({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: C.meta, children: [
    /* @__PURE__ */ o("span", { className: C.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: C.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Sg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Ng, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(kg, { stage: e }) : null;
}
function Rg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Tg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t($g, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Cg, { stage: e }),
    /* @__PURE__ */ t(Sg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(E_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Rg, { onMount: n })
  ] });
}
const xg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Lg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Ag({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Lg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Un(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Eg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Ig({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Eg(e.rolledBackThisWeek) })
  ] });
}
function Mg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Bg(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = Mg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Pg({ stage: e, titleId: a }) {
  const n = xg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Bg(e) })
  ] });
}
function qg(e) {
  return e === "entry" || e === "agent";
}
function jg({ stage: e, onMount: a }) {
  return a === void 0 || !qg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Dg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Pg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Ag, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Ig, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(jg, { stage: e, onMount: n })
  ] });
}
function Og(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function ER(e) {
  return Og(e) ? /* @__PURE__ */ t(Dg, { ...e }) : /* @__PURE__ */ t(Tg, { ...e });
}
const Hg = "_row_1tdra_6", Fg = "_name_1tdra_12", zg = "_compactRow_1tdra_13", Wg = "_compactName_1tdra_13", Kg = "_cell_1tdra_30", Gg = "_chain_1tdra_45", Ug = "_owner_1tdra_51", Vg = "_mono_1tdra_57", Yg = "_compactCell_1tdra_79", Jg = "_stack_1tdra_96", Xg = "_stat_1tdra_103", Qg = "_identityLine_1tdra_110", Zg = "_identity_1tdra_110", ey = "_ownerLine_1tdra_140", ay = "_link_1tdra_160", ty = "_gateMark_1tdra_166", ny = "_emptyChain_1tdra_171", ry = "_arrow_1tdra_177", ly = "_muted_1tdra_182", oy = "_define_1tdra_187", iy = "_statValue_1tdra_194", sy = "_policyId_1tdra_200", cy = "_sub_1tdra_205", g = {
  row: Hg,
  name: Fg,
  compactRow: zg,
  compactName: Wg,
  cell: Kg,
  chain: Gg,
  owner: Ug,
  mono: Vg,
  compactCell: Yg,
  stack: Jg,
  stat: Xg,
  identityLine: Qg,
  identity: Zg,
  ownerLine: ey,
  link: ay,
  gateMark: ty,
  emptyChain: ny,
  arrow: ry,
  muted: ly,
  define: oy,
  statValue: iy,
  policyId: sy,
  sub: cy
};
function Vn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function dy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function uy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Yn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function my(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Yn(e.members)}`;
}
function hy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: my(e) })
  ] }) });
}
function Jn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function wy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function fy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Jn, { name: l.name, gate: l.gate === !0, look: wy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function _y(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : fy(e) });
}
function Xn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ht(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Xn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function vy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function by(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function py({ stream: e, href: a, presentation: n }) {
  const r = uy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Vn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    hy(e, a),
    _y(e),
    Ht(by(e.agents), e.agents === void 0 ? void 0 : dy(e.agents), "—"),
    vy(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function gy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function IR(e) {
  if (gy(e)) return py(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Vn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Jn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Yn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Xn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const yy = "_row_2u4ll_2", Ny = "_name_2u4ll_16", ky = "_scope_2u4ll_24", Ra = {
  row: yy,
  name: Ny,
  scope: ky
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function $y(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function Cy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Sy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Ry({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function Ty({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function xy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function MR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Cy(e, n), s = xy(n);
  return /* @__PURE__ */ o(s, { className: $y(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Sy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Ty, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Ry, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Ly = "_strip_4ppv9_2", Ay = "_well_4ppv9_11", Ey = "_head_4ppv9_18", Iy = "_name_4ppv9_24", My = "_chart_4ppv9_32", By = "_segment_4ppv9_38", Py = "_detailedChart_4ppv9_44", qy = "_rail_4ppv9_57", jy = "_section_4ppv9_63", Dy = "_label_4ppv9_74", Oy = "_note_4ppv9_91", K = {
  strip: Ly,
  well: Ay,
  head: Ey,
  name: Iy,
  chart: My,
  segment: By,
  detailedChart: Py,
  rail: qy,
  section: jy,
  label: Dy,
  note: Oy
}, Hy = "No item in flight to preview.", Fy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", zy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function Wy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Ky({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: Wy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Gy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Uy({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * Ta),
        y: "0",
        width: String(Ta),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function Qn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function fa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function Vy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Hy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: Qn(r), feed: null }) });
}
function Yy({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Jy(e) {
  const a = Gy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(Vy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(Yy, { draft: n }) }),
    /* @__PURE__ */ o(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Uy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Fy })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: zy }) })
  ] });
}
function Xy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: Qn(r) }) }),
    /* @__PURE__ */ t(Ky, { draft: e, streams: n })
  ] });
}
function BR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Jy, { ...e }) : /* @__PURE__ */ t(Xy, { ...e });
}
const Qy = "_row_ixlg5_6", Zy = "_headCell_ixlg5_10", eN = "_cell_ixlg5_11", aN = "_name_ixlg5_23", tN = "_consequence_ixlg5_29", nN = "_governed_ixlg5_36", rN = "_control_ixlg5_42", lN = "_byRole_ixlg5_48", oN = "_webControl_ixlg5_59", iN = "_webConsequence_ixlg5_65", sN = "_webGoverned_ixlg5_71", O = {
  row: Qy,
  headCell: Zy,
  cell: eN,
  name: aN,
  consequence: tN,
  governed: nN,
  control: rN,
  byRole: lN,
  webControl: oN,
  webConsequence: iN,
  webGoverned: sN
};
function cN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: O.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: O.control, children: [
    /* @__PURE__ */ t(
      Ge,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function dN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: O.headCell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: O.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: O.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(cN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function uN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function mN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${O.webControl} ${O.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ge,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${O.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function hN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(mN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: uN(e) }) })
  ] });
}
function PR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(hN, { ...e }) : /* @__PURE__ */ t(dN, { ...e });
}
const wN = "_row_vv64h_2", fN = "_cell_vv64h_6", _N = "_name_vv64h_25", vN = "_note_vv64h_30", bN = "_webName_vv64h_41", pN = "_webMeta_vv64h_47", V = {
  row: wN,
  cell: fN,
  name: _N,
  note: vN,
  webName: bN,
  webMeta: pN
}, Zn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function gN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function yN({ component: e, onRestart: a }) {
  const n = N(), r = Zn[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: V.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: V.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { id: n, className: V.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: V.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function NN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: gN(e.state) });
}
function kN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Zn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(NN, { component: e, onRestart: a }) })
  ] });
}
function qR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(kN, { ...e }) : /* @__PURE__ */ t(yN, { ...e });
}
const $N = "_row_jcm5k_7", CN = "_cell_jcm5k_11", SN = "_next_jcm5k_28", RN = "_headCell_jcm5k_38", TN = "_webId_jcm5k_77", xN = "_webPurpose_jcm5k_83", LN = "_webMeta_jcm5k_91", AN = "_webUrgent_jcm5k_97", F = {
  row: $N,
  cell: CN,
  next: SN,
  headCell: RN,
  webId: TN,
  webPurpose: xN,
  webMeta: LN,
  webUrgent: AN
}, EN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, IN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, er = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], MN = Object.fromEntries(er.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = MN[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: F.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function jR() {
  return /* @__PURE__ */ t("tr", { children: er.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: F.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function BN({ cred: e }) {
  const a = EN[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function PN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function qN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(PN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...IN[e.state] }) })
  ] });
}
function DR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(qN, { ...e }) : /* @__PURE__ */ t(BN, { ...e });
}
const jN = "_card_17zba_2", DN = "_head_17zba_11", ON = "_env_17zba_18", HN = "_version_17zba_25", FN = "_meta_17zba_32", zN = "_webCard_17zba_37", WN = "_webRow_17zba_47", KN = "_webTitle_17zba_55", GN = "_webLine_17zba_65", UN = "_webVersion_17zba_72", VN = "_webMeta_17zba_77", U = {
  card: jN,
  head: DN,
  env: ON,
  version: HN,
  meta: FN,
  webCard: zN,
  webRow: WN,
  webTitle: KN,
  webLine: GN,
  webVersion: UN,
  webMeta: VN
}, Ft = { dev: "Dev", uat: "UAT", prod: "Prod" }, ar = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function YN({ env: e }) {
  const a = ar[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": Ft[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: Ft[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: U.meta, children: n })
  ] });
}
function JN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function XN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...ar[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: JN(e) })
  ] });
}
function OR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(XN, { ...e }) : /* @__PURE__ */ t(YN, { ...e });
}
const QN = "_panel_1hmja_2", ZN = "_line_1hmja_8", e1 = "_actions_1hmja_14", _a = {
  panel: QN,
  line: ZN,
  actions: e1
};
function HR(e) {
  return /* @__PURE__ */ o("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const a1 = "_upload_13fcl_2", t1 = "_preview_13fcl_7", n1 = "_mark_13fcl_17", r1 = "_empty_13fcl_22", l1 = "_actions_13fcl_28", o1 = "_input_13fcl_33", i1 = "_reasons_13fcl_41", s1 = "_reason_13fcl_41", c1 = "_accepted_13fcl_57", te = {
  upload: a1,
  preview: t1,
  mark: n1,
  empty: r1,
  actions: l1,
  input: o1,
  reasons: i1,
  reason: s1,
  accepted: c1
}, tr = 1.5, nr = 22, xa = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${tr}px at ${nr}px`], d1 = [Se[1], Se[2], xa, Ie], u1 = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", xa],
  ["foreignObject", xa],
  ["a", Ie],
  ["use", Ie],
  ["style", Ie],
  ["feImage", Ie],
  ["set", Ie]
]), m1 = "http://www.w3.org/2000/svg", h1 = "http://www.w3.org/2000/xmlns/", w1 = /* @__PURE__ */ new Set([
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
]), f1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, _1 = /url\s*\(|['"\\]/i;
function v1() {
  return { ok: !1, reasons: [Se[1]] };
}
function rr(e) {
  return e.namespaceURI === m1;
}
function b1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && rr(a) ? a : null;
  } catch {
    return null;
  }
}
function p1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function g1(e) {
  return u1.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function y1(e) {
  return _1.test(e.replace(mt, ""));
}
function N1(e) {
  return /^on/i.test(e.localName) ? xa : e.localName === "href" || y1(e.value) ? Ie : void 0;
}
function k1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(g1(n));
    for (const r of Array.from(n.attributes)) a.add(N1(r));
  }
  return d1.filter((n) => a.has(n));
}
function $1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? nr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < tr;
  }) ? [Se[3]] : [];
}
function C1(e) {
  if (e.namespaceURI === h1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (f1.has(a) || a.startsWith("stroke"));
}
function S1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && rr(a) && w1.has(a.localName);
}
function R1(e, a) {
  S1(a) ? a.nodeType === Node.ELEMENT_NODE && lr(a) : e.removeChild(a);
}
function lr(e) {
  for (const a of Array.from(e.attributes)) C1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) R1(e, a);
  return e;
}
function T1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function x1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function L1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of T1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function A1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function E1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = L1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), A1(l, r);
  }
  return e;
}
function FR(e) {
  const a = b1(e);
  if (a === null) return v1();
  const n = [...p1(a), ...k1(a), ...$1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(E1(lr(a), x1(e))) };
}
const I1 = "Mark accepted.", M1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, B1 = new Set(Qt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function P1(e) {
  return e !== void 0 && (M1.test(e) || B1.has(e)) ? e : void 0;
}
function q1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": P1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function j1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function D1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function O1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: I1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function H1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(O1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${j1(e, n)}`, role: "status", children: D1(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function zR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(q1, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: te.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          disabled: l !== void 0,
          onChange: (u) => {
            var m;
            return d((m = u.target.files) == null ? void 0 : m[0]);
          }
        }
      ),
      /* @__PURE__ */ t(b, { ...zt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...zt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(H1, { result: s, presentation: r })
  ] });
}
const F1 = "_row_o3t6y_7", z1 = "_cell_o3t6y_11", W1 = "_head_o3t6y_28", K1 = "_name_o3t6y_34", G1 = "_pinned_o3t6y_42", U1 = "_headCell_o3t6y_49", V1 = "_webName_o3t6y_88", Y1 = "_webMeta_o3t6y_95", J1 = "_webWarn_o3t6y_103", P = {
  row: F1,
  cell: z1,
  head: W1,
  name: K1,
  pinned: G1,
  headCell: U1,
  webName: V1,
  webMeta: Y1,
  webWarn: J1
}, ht = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, or = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], X1 = Object.fromEntries(or.map((e) => [e.key, e]));
function Q1(e, a) {
  return `mcp.${e}.${a}`;
}
function Z1(e) {
  return Object.keys(ht).includes(e);
}
function ek(e) {
  return ht[e !== void 0 && Z1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = X1[e];
  return /* @__PURE__ */ t(
    "td",
    {
      className: P.cell,
      style: n.width ? { width: n.width } : void 0,
      "data-drop": n.dropPriority,
      "data-mono": n.mono,
      children: a
    }
  );
}
function WR() {
  return /* @__PURE__ */ t("tr", { children: or.map((e) => /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: P.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function ak({ server: e }) {
  const a = ht[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => Q1(e.name, n)).join(" · ") })
  ] });
}
function tk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function nk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function rk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function lk({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function ok({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function ik({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: tk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...nk(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(rk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...ek(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(lk, { server: e, onRestart: a }),
      /* @__PURE__ */ t(ok, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function KR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(ik, { ...e }) : /* @__PURE__ */ t(ak, { ...e });
}
const sk = "_row_1ibo7_2", ck = "_headCell_1ibo7_14", dk = "_cell_1ibo7_15", uk = "_name_1ibo7_26", mk = "_consequence_1ibo7_32", hk = "_reason_1ibo7_38", wk = "_value_1ibo7_44", fk = "_webRow_1ibo7_60", _k = "_webSetting_1ibo7_73", vk = "_webName_1ibo7_81", bk = "_webConsequence_1ibo7_89", pk = "_webControl_1ibo7_95", gk = "_webState_1ibo7_109", yk = "_webChip_1ibo7_114", I = {
  row: sk,
  headCell: ck,
  cell: dk,
  name: uk,
  consequence: mk,
  reason: hk,
  value: wk,
  webRow: fk,
  webSetting: _k,
  webName: vk,
  webConsequence: bk,
  webControl: pk,
  webState: gk,
  webChip: yk
}, ir = 104, sr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function Nk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(kn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function kk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = sr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(Nk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: ir }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function cr(e, a) {
  return String(e ?? a);
}
function $k(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Ck(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? cr(e.value, "—");
}
function Sk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Rk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Sk, { ...e });
  const l = $k(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(kn, { options: l, value: cr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Ck(a) });
}
function Tk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(Rk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: ir }, children: /* @__PURE__ */ t(h, { ...sr[n], size: "tag" }) })
  ] });
}
function GR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Tk, { ...e }) : /* @__PURE__ */ t(kk, { ...e });
}
const xk = "_label_h9m4w_7", Lk = "_name_h9m4w_15", Ak = "_column_h9m4w_24", Ek = "_webFrame_h9m4w_57", Ik = "_webHead_h9m4w_62", Mk = "_webHeadLabel_h9m4w_74", Bk = "_webLabel_h9m4w_117", Pk = "_webColumns_h9m4w_124", qk = "_webGroup_h9m4w_130", jk = "_webPeople_h9m4w_131", Dk = "_webVia_h9m4w_132", Ok = "_webMeta_h9m4w_161", z = {
  label: xk,
  name: Lk,
  column: Ak,
  webFrame: Ek,
  webHead: Ik,
  webHeadLabel: Mk,
  webLabel: Bk,
  webColumns: Pk,
  webGroup: qk,
  webPeople: jk,
  webVia: Dk,
  webMeta: Ok
}, Hk = {
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
function Fk(e) {
  if (!e.matrixRole) return;
  const a = Hk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function zk({ node: e }) {
  const a = Fk(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Wk, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Wk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Kk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Tn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(zk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Gk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Uk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Vk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Yk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Jk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Uk, {}),
    /* @__PURE__ */ t(Em, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Tn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Vk, { row: n }),
        detail: /* @__PURE__ */ t(Gk, { row: n }),
        expanded: Yk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function UR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Jk, { ...e }) : /* @__PURE__ */ t(Kk, { ...e });
}
const Xk = "_runbook_b9agc_2", Qk = "_list_b9agc_7", Zk = "_step_b9agc_15", e$ = "_numeral_b9agc_21", a$ = "_body_b9agc_28", t$ = "_head_b9agc_34", n$ = "_title_b9agc_40", r$ = "_detail_b9agc_45", l$ = "_actions_b9agc_50", o$ = "_webList_b9agc_56", i$ = "_webStep_b9agc_60", s$ = "_webBody_b9agc_66", c$ = "_webTitle_b9agc_74", d$ = "_webDetail_b9agc_78", A = {
  runbook: Xk,
  list: Qk,
  step: Zk,
  numeral: e$,
  body: a$,
  head: t$,
  title: n$,
  detail: r$,
  actions: l$,
  webList: o$,
  webStep: i$,
  webBody: s$,
  webTitle: c$,
  webDetail: d$
}, dr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function ur(e) {
  return String(e + 1).padStart(2, "0");
}
function u$({ step: e, index: a, connection: n }) {
  const r = dr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: ur(a) }),
    /* @__PURE__ */ o("span", { className: A.body, children: [
      /* @__PURE__ */ o("span", { className: A.head, children: [
        /* @__PURE__ */ t("span", { className: A.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: A.detail, children: e.detail })
    ] })
  ] });
}
function m$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(u$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function h$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: ur(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...dr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function w$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(h$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function VR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(w$, { ...e }) : /* @__PURE__ */ t(m$, { ...e });
}
const f$ = "_list_1gu6a_2", _$ = "_check_1gu6a_10", v$ = "_body_1gu6a_16", b$ = "_text_1gu6a_23", p$ = "_pending_1gu6a_32", g$ = "_measured_1gu6a_37", Qe = {
  list: f$,
  check: _$,
  body: v$,
  text: b$,
  pending: p$,
  measured: g$
};
function y$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function N$({ check: e }) {
  const a = y$(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(lt, { state: a.state, label: a.label }),
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
function YR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(N$, { check: a }, a.text)) });
}
const k$ = "_root_a6xzy_2", $$ = "_list_a6xzy_10", C$ = "_line_a6xzy_21", S$ = "_at_a6xzy_48", R$ = "_text_a6xzy_52", T$ = "_foot_a6xzy_56", x$ = "_idle_a6xzy_68", L$ = "_caret_a6xzy_76", A$ = "_jump_a6xzy_83", he = {
  root: k$,
  list: $$,
  line: C$,
  at: S$,
  text: R$,
  foot: T$,
  idle: x$,
  caret: L$,
  jump: A$
}, E$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : E$.format(new Date(e));
}
const I$ = { warn: "warning", ok: "ok" };
function M$({ kind: e }) {
  const a = I$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function B$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function P$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(B$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const q$ = 8;
function j$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > q$;
}
function D$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const mr = Te(null);
function JR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Vt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(mr.Provider, { value: i, children: n });
}
function O$() {
  const e = Re(mr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function XR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = O$(), [u, m] = p(!1), w = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const v = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (B = L.item(L.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(j$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(M$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(P$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(D$, { shown: u, onJump: v })
    ] })
  ] });
}
const H$ = "_row_1k8wl_2", F$ = "_head_1k8wl_14", z$ = "_author_1k8wl_20", W$ = "_eta_1k8wl_25", K$ = "_edited_1k8wl_26", G$ = "_body_1k8wl_32", U$ = "_reason_1k8wl_37", V$ = "_actions_1k8wl_42", Ne = {
  row: H$,
  head: F$,
  author: z$,
  eta: W$,
  edited: K$,
  body: G$,
  reason: U$,
  actions: V$
}, Y$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function J$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function X$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function Q$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function Z$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function e0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(X$, { ...e }) : /* @__PURE__ */ t(Q$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function QR(e) {
  const { comment: a } = e;
  Z$(e);
  const n = N(), r = `${n}-unavailable`, l = Y$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: J$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(e0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const a0 = "_root_rvhdw_2", t0 = "_attach_rvhdw_11", n0 = "_actions_rvhdw_17", r0 = "_reply_rvhdw_23", l0 = "_replyField_rvhdw_28", o0 = "_send_rvhdw_54", i0 = "_sendIcon_rvhdw_65", s0 = "_sendsAs_rvhdw_75", Be = {
  root: a0,
  attach: t0,
  actions: n0,
  reply: r0,
  replyField: l0,
  send: o0,
  sendIcon: i0,
  sendsAs: s0
};
function hr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function c0() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function d0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function u0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = hr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    d0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(c0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function ZR(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(u0, { ...e }) : /* @__PURE__ */ t(m0, { ...e });
}
function m0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = hr(e);
  return /* @__PURE__ */ o("div", { className: Be.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Be.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      rn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Be.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const h0 = "_list_1yhks_2", w0 = "_item_1yhks_6", f0 = "_body_1yhks_22", _0 = "_text_1yhks_28", v0 = "_evidence_1yhks_37", b0 = "_consequence_1yhks_49", p0 = "_note_1yhks_54", We = {
  list: h0,
  item: w0,
  body: f0,
  text: _0,
  evidence: v0,
  consequence: b0,
  note: p0
};
function g0({ criterion: e }) {
  return /* @__PURE__ */ t(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Wt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function y0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function N0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: We.body, children: [
    /* @__PURE__ */ t("span", { className: We.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: We.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: We.consequence, children: y0(e.why) })
    ] })
  ] });
}
function k0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: We.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(g0, { criterion: e }),
    /* @__PURE__ */ t(N0, { criterion: e })
  ] });
}
function e2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${We.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(k0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: We.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const $0 = "_list_dwhoz_2", C0 = "_rung_dwhoz_6", S0 = "_name_dwhoz_18", R0 = "_actor_dwhoz_32", ga = {
  list: $0,
  rung: C0,
  name: S0,
  actor: R0
}, T0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function x0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = T0[e.state];
  return /* @__PURE__ */ o("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function a2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(x0, { rung: a }, a.name)) });
}
const L0 = "_sheet_pw37w_2", A0 = "_title_pw37w_9", E0 = "_stage_pw37w_15", I0 = "_effects_pw37w_20", M0 = "_effect_pw37w_20", B0 = "_numeral_pw37w_31", P0 = "_effectText_pw37w_38", q0 = "_refusals_pw37w_43", j0 = "_reasons_pw37w_52", D0 = "_reason_pw37w_52", O0 = "_actions_pw37w_62", ue = {
  sheet: L0,
  title: A0,
  stage: E0,
  effects: I0,
  effect: M0,
  numeral: B0,
  effectText: P0,
  refusals: q0,
  reasons: j0,
  reason: D0,
  actions: O0
};
function H0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function t2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), w = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((v, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: v })
    ] }, v)) }),
    /* @__PURE__ */ t(
      fu,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(M, { kind: "textarea", label: "Note for the agent", value: u, onChange: m }),
    w && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((v, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: v.reason }, v.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(H0, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const F0 = "_list_1rowi_2", z0 = "_path_1rowi_7", W0 = "_head_1rowi_21", K0 = "_label_1rowi_28", G0 = "_consequence_1rowi_35", U0 = "_ask_1rowi_36", ea = {
  list: F0,
  path: z0,
  head: W0,
  label: K0,
  consequence: G0,
  ask: U0
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Kt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Gt(e) {
  return e ? "primary" : "secondary";
}
function V0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function Y0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Kt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Kt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(V0, { path: e, primary: a, onChoose: n })
  ] });
}
function n2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(Y0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const J0 = "_list_1m7i0_2", X0 = "_item_1m7i0_6", Q0 = "_node_1m7i0_18", Z0 = "_body_1m7i0_24", eC = "_head_1m7i0_30", aC = "_stage_1m7i0_36", tC = "_version_1m7i0_41", nC = "_sentence_1m7i0_49", rC = "_meta_1m7i0_54", $e = {
  list: J0,
  item: X0,
  node: Q0,
  body: Z0,
  head: eC,
  stage: aC,
  version: tC,
  sentence: nC,
  meta: rC
}, lC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function oC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function iC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(je, { size: 9, kind: lC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(oC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function r2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(iC, { entry: a }, a.stage + String(n))) });
}
const sC = "_thread_1e70p_3", cC = "_turn_1e70p_8", dC = "_who_1e70p_27", uC = "_body_1e70p_32", ya = {
  thread: sC,
  turn: cC,
  who: dC,
  body: uC
}, wr = Te(!1);
function l2({ children: e, density: a }) {
  return /* @__PURE__ */ t(wr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function o2({ turn: e }) {
  if (!Re(wr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ya.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ya.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ya.body} ward-chat-body`, children: e.body })
  ] });
}
const mC = "_list_yiolt_3", hC = "_row_yiolt_7", wC = "_label_yiolt_20", fC = "_n_yiolt_26", _C = "_cause_yiolt_33", oa = {
  list: mC,
  row: hC,
  label: wC,
  n: fC,
  cause: _C
};
function vC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const bC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function pC({ row: e, formatNumber: a }) {
  return vC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(je, { size: 8, ...bC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(gC, { cause: e.cause })
  ] });
}
function gC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function i2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(pC, { row: n, formatNumber: a }, n.label)) });
}
const yC = "_root_1jxwp_2", NC = {
  root: yC
};
function s2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: NC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const kC = "_row_dhbre_3", $C = "_key_dhbre_13", CC = "_stack_dhbre_24", SC = "_value_dhbre_32", RC = "_evidence_dhbre_39", TC = "_mark_dhbre_47", Xe = {
  row: kC,
  key: $C,
  stack: CC,
  value: SC,
  evidence: RC,
  mark: TC
};
function xC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function c2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(xC, { state: e.state }) })
  ] });
}
const LC = "_cell_gh2sd_2", AC = {
  cell: LC
}, EC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function IC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function MC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function BC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: IC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function PC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function d2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  MC(e, n);
  const r = PC(e);
  return /* @__PURE__ */ t(
    xu,
    {
      label: "Rejection routing",
      columns: EC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: AC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: BC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(_h, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const qC = "_row_1f2re_2", jC = "_title_1f2re_12", DC = "_turns_1f2re_18", OC = "_waiting_1f2re_19", HC = "_resolved_1f2re_20", FC = "_activity_1f2re_21", zC = "_cost_1f2re_28", WC = "_link_1f2re_29", KC = "_tableLink_1f2re_47", GC = "_tableRecord_1f2re_48", UC = "_tableRow_1f2re_59", VC = "_tableTitle_1f2re_71", YC = "_tableResolved_1f2re_76", JC = "_tableMeta_1f2re_87", XC = "_tableCost_1f2re_94", QC = "_tableActivity_1f2re_95", ZC = "_tableState_1f2re_105", D = {
  row: qC,
  title: jC,
  turns: DC,
  waiting: OC,
  resolved: HC,
  activity: FC,
  cost: zC,
  link: WC,
  tableLink: KC,
  tableRecord: GC,
  tableRow: UC,
  tableTitle: VC,
  tableResolved: YC,
  tableMeta: JC,
  tableCost: XC,
  tableActivity: QC,
  tableState: ZC
}, fr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function eS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function aS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function tS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const nS = { duplicate: "Closed · duplicate" };
function rS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function lS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function oS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function iS({ session: e, href: a }) {
  const n = fr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: aS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      tS(e.resolved),
      /* @__PURE__ */ t(rS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(lS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: eS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: nS[e.state] ?? n.label }),
      /* @__PURE__ */ t(oS, { link: e.link })
    ] }) })
  ] });
}
function sS({ session: e }) {
  const a = fr[e.state];
  return /* @__PURE__ */ o("div", { className: D.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: D.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: D.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: D.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: D.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: D.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: D.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: D.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function u2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(iS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(sS, { session: e.session });
}
const cS = "_block_1yy2v_3", dS = "_list_1yy2v_9", uS = "_line_1yy2v_14", et = {
  block: cS,
  list: dS,
  line: uS
}, mS = { warn: "warning", ok: "ok" };
function hS({ kind: e }) {
  const a = mS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function wS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(hS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function m2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(wS, { line: n }, `${r}-${n.text}`)) }) });
}
const fS = "_band_tt7hp_1", _S = "_head_tt7hp_8", vS = "_cell_tt7hp_19", bS = "_index_tt7hp_35", pS = "_title_tt7hp_42", gS = "_note_tt7hp_48", yS = "_cellTitle_tt7hp_53", NS = "_cellBody_tt7hp_58", kS = "_tag_tt7hp_64", ye = {
  band: fS,
  head: _S,
  cell: vS,
  index: bS,
  title: pS,
  note: gS,
  cellTitle: yS,
  cellBody: NS,
  tag: kS
}, Ut = 4;
function h2({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Ut)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Ut}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ye.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ye.head, children: [
      /* @__PURE__ */ t("span", { className: ye.index, children: e }),
      /* @__PURE__ */ t("span", { className: ye.title, children: a }),
      /* @__PURE__ */ t("span", { className: ye.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ye.cell, children: [
      /* @__PURE__ */ t("span", { className: ye.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: ye.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: ye.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  MS as ACCENT_PRESETS,
  ZS as ActionStack,
  XR as ActivityConsole,
  FS as AdminIcon,
  E_ as AgentCard,
  zS as AppShell,
  BR as AppearanceStrip,
  h2 as Band,
  JS as BarChart,
  Jh as BoardColumn,
  wR as BoardFootnote,
  fR as BoardHeader,
  OS as BoardIcon,
  oR as BoardScroller,
  b as Btn,
  IS as CHIP_ROLES,
  er as CREDENTIAL_COLUMNS,
  YS as Callout,
  PR as CapabilityRow,
  o2 as ChatMessage,
  rn as Checkbox,
  h as Chip,
  ta as ClampText,
  QR as ClarificationRow,
  CR as ClauseRuleRow,
  $R as ClauseRules,
  Mn as ColourLadder,
  qR as ComponentRow,
  ZR as Composer,
  vR as ConfigRow,
  _R as ConfigRowHead,
  ot as ConnectionMark,
  JR as ConsoleAnnounceProvider,
  l2 as Conversation,
  fu as CostMeter,
  DR as CredentialRow,
  jR as CredentialRowHead,
  e2 as CriteriaList,
  Ri as Crumb,
  BS as DENSITIES,
  i2 as DeliveryHealth,
  cR as DeniedState,
  jS as DisabledScope,
  RR as DryRunRail,
  _h as EmptyState,
  OR as EnvCard,
  M as Field,
  sR as FilteredEmpty,
  rR as FormStack,
  Da as GateChecklist,
  a2 as GateLadder,
  xu as Grid,
  xR as HandoffRuleRow,
  TR as HandoffRules,
  DS as HomeIcon,
  bR as ItemDrawer,
  HR as KeyPanel,
  Br as LIVE_EVENT_TYPES,
  e_ as LegacyBoardColumn,
  gR as LegacyBoardHeader,
  yR as LegacyConfigRow,
  kR as LegacyItemDrawer,
  Uf as LegacyOverCapNote,
  NR as LegacyPreviewRail,
  An as LegacyWorkCard,
  xe as LiveIndicator,
  dR as LoadFailed,
  hR as Loading,
  or as MCP_SERVER_COLUMNS,
  lt as Mark,
  zR as MarkUpload,
  je as Marker,
  KR as McpServerRow,
  WR as McpServerRowHead,
  Gs as Menu,
  Is as MenuButton,
  LR as NewStreamModal,
  ph as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  SR as PARTIAL_STEP_REASON,
  ir as POLICY_CHIP_WIDTH,
  aR as PageFrame,
  VS as PageHeader,
  XS as PlainList,
  GR as PolicyRow,
  pR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Gn as RULE_ACTIONS,
  Cn as Radio,
  s2 as ReadyChecklist,
  nR as RecordSection,
  t2 as RequeueSheet,
  n2 as ResolveBlock,
  c2 as ResolvedFieldRow,
  UR as RoleMatrixRow,
  d2 as RoutingTable,
  AR as RuleRow,
  VR as RunbookSteps,
  Mr as STREAM_STEPS,
  lR as SectionBand,
  At as SectionHeader,
  kn as SegmentedControl,
  hn as Select,
  u2 as SessionRow,
  GS as Sidebar,
  ER as StageColumn,
  iR as StageGrid,
  r2 as StageHistory,
  hp as StageListEditor,
  uR as StaleStrip,
  Pa as StatStrip,
  US as StreamAvatar,
  IR as StreamRow,
  HS as StudioIcon,
  tR as SubjectRail,
  Ge as Switch,
  KS as TabLinks,
  QS as TableHead,
  WS as Tabs,
  xS as ThemeProvider,
  MR as ToolRow,
  eR as TopBar,
  Em as Tree,
  Tn as TreeRow,
  m2 as TypedInputBlock,
  bo as UNSAFE_HREF,
  YR as ValidationList,
  RS as VisibilityProvider,
  TS as Visible,
  ES as WARD_VERSION,
  ja as WorkCard,
  mR as WriteUnavailableStrip,
  eS as agoSince,
  kr as clock,
  Lp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  AS as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  sv as ladderValidation,
  ek as mcpConnectionChip,
  Q1 as mcpToolName,
  ne as money,
  we as ms,
  xn as ordered,
  Jt as ratio,
  gN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  PS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  jr as streamHex,
  Qc as streamInitials,
  Pr as streamVars,
  va as useBorderFlash,
  qe as useDisabledScope,
  Ar as useFocusTrap,
  qS as useLiveFeed,
  LS as useReturnFocus,
  La as useRovingTabindex,
  nt as useTicker,
  $r as useVisible,
  W as v,
  FR as validateMark,
  ua as validatedStep,
  Qt as validatedStreamSteps
};
