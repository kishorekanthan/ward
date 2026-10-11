import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Yt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as Q, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as br, Children as pr, Fragment as gr } from "react";
import { createPortal as yr, flushSync as Jt } from "react-dom";
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
const Nr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Nr.formatToParts(new Date(e)), n = (r) => {
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
function Xt(e, a) {
  return `${e} / ${a}`;
}
const kr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function $r(e) {
  return kr.format(new Date(e));
}
const Qt = Te(/* @__PURE__ */ new Set());
function mS({ hidden: e, children: a }) {
  const n = Yt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Qt.Provider, { value: n, children: a });
}
function Cr(e) {
  return !Re(Qt).has(e);
}
function hS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: Cr(e) ? a : n });
}
const Sr = "(prefers-color-scheme: dark)";
function _t() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Sr) : null;
}
function Rr(e) {
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
function Ha(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Tr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function wS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Rr(e === "system");
  return Ha("data-theme", Tr(e, l)), Ha("data-accent", a), Ha("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const xr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Lr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Ar(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Lr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Er(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(xr));
      Ar(n, e.current, r);
    },
    [e]
  ) };
}
function fS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const vt = { ArrowUp: -1, ArrowDown: 1 }, bt = { ArrowLeft: -1, ArrowRight: 1 }, Ir = (e, a, n) => Math.min(n, Math.max(a, e));
function Mr(e, a) {
  if (a !== "horizontal" && e in vt) return vt[e];
  if (a !== "vertical" && e in bt) return bt[e];
}
function xa({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  aa(() => {
    var v;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], w = l.current;
    l.current = !1, n(m), w && ((v = r.current.get(m)) == null || v.focus());
  });
  const i = Q((u) => n(u), []), s = Q((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = Q(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const w = Math.max(0, m.indexOf(a)), v = Mr(u.key, e);
      v !== void 0 ? (u.preventDefault(), s(m[Ir(w + v, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
    },
    [a, s, e]
  ), d = Q(
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
const _S = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, vS = "0.2.0", bS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Br = [1, 2, 3, 4, 5, 6], Zt = [1, 2, 3], Pr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], pS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], gS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
    navIcon: "var(--ward-height-navIcon)"
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
    rowTextStrong: "var(--ward-type-rowTextStrong)"
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
function La(e) {
  return Br.includes(e);
}
function Aa(e) {
  return Zt.includes(e);
}
function yS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function NS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const jr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Dr(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return jr[e];
}
function pt(e) {
  return typeof e != "string" ? null : Pr.includes(e) ? e : null;
}
function Or(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Hr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Fr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function qr(e, a, n) {
  const r = Or(e);
  if (r === null) return null;
  const l = pt(n) ?? pt(r.type);
  return l === null ? null : { ...r, type: l, id: Hr(r, a), at: Fr(r) };
}
function zr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Wr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function kS(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), w = f(0), v = f(0), y = f(!1), L = f("reconnecting"), B = Q((R) => {
    L.current = R, r(R);
  }, []), le = Q(() => {
    c.current = Date.now();
  }, []), Le = Q((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = Q(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const Oe = qr(R, G, ge);
        Oe !== null && (Oe.id && (d.current = Oe.id), le(), y.current = !1, B("live"), i(Oe.at), Le(Oe));
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
  }, [Le, B, le, a, e]), Ge = Q((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ue = Q((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = zr(R, L.current);
    G && B(G);
    const ge = m.current;
    Wr(R, y.current, ge) && Ge(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(v.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ge, B]), { connection: n, lastEventAt: l, subscribe: Ue };
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
function _a(e, a) {
  const n = f(0), r = Q((l) => {
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
  return e || i.push(`as of ${$r(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
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
const Jr = "_app_1m4se_1", Xr = "_side_1m4se_30", Qr = "_sideTop_1m4se_42", Zr = "_sideBody_1m4se_56", el = "_iconRail_1m4se_67", al = "_railItem_1m4se_76", tl = "_railIcon_1m4se_97", nl = "_railDot_1m4se_102", rl = "_railLetter_1m4se_108", ll = "_main_1m4se_113", ol = "_rail_1m4se_76", il = "_page_1m4se_131", sl = "_headerRow_1m4se_140", cl = "_sidebarToggle_1m4se_147", dl = "_headerSlot_1m4se_152", ul = "_drawerSide_1m4se_157", ml = "_root_1m4se_193", hl = "_topbar_1m4se_200", wl = "_mark_1m4se_211", fl = "_brand_1m4se_218", _l = "_tagline_1m4se_224", vl = "_identity_1m4se_230", bl = "_tools_1m4se_231", pl = "_nav_1m4se_241", gl = "_metadata_1m4se_248", yl = "_actor_1m4se_263", Nl = "_detail_1m4se_264", kl = "_content_1m4se_324", $l = "_toolsPanel_1m4se_340", Cl = "_skip_1m4se_366", $ = {
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
function sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Sl = "_scope_1an6i_2", Rl = {
  scope: Sl
}, en = Te(null);
function $S({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Rl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(en.Provider, { value: { reason: e, reasonId: n }, children: a })
  ] });
}
function je() {
  return Re(en);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : sa(e, a.reasonId);
}
const Tl = "_btn_tzr89_2", xl = "_primary_tzr89_14", Ll = "_destructive_tzr89_25", Al = "_secondary_tzr89_35", El = "_ghost_tzr89_40", Il = "_overflow_tzr89_49", Ml = "_sm_tzr89_56", Bl = "_disabled_tzr89_60", ua = {
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
  const l = a === "sm" ? [ua.sm, "ward-btn--sm"] : [], i = n ? [ua.disabled] : [];
  return [ua.btn, ua[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function jl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Dl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Ol(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Hl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Fl(e, a, n) {
  return Hl(e.describedBy, a && n);
}
function ql({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function zl(e) {
  return e.children ?? e.label;
}
function b(e) {
  const a = je();
  Dl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Ol(e, a), s = N();
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
        "aria-describedby": Fl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...jl(n, e.controls),
        children: zl(e)
      }
    ),
    /* @__PURE__ */ t(ql, { id: s, reason: i })
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
}, eo = Te(null), ya = [], Na = /* @__PURE__ */ new Map();
function ao(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function to(e, a) {
  let n = Na.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, Na.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
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
    const n = Na.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), Na.delete(a)));
  }
}
function oo(e, a) {
  const n = { root: e, claims: [] };
  return ya.push(n), ro(n, a), n;
}
function io(e) {
  const a = ya.indexOf(e);
  a >= 0 && ya.splice(a, 1), lo(e);
}
function yt(e) {
  return e !== null && ya.at(-1) === e;
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
  }, [a]), Q(() => yt(r.current), []);
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
  const a = f(null), n = f(null), r = N(), l = fo(e.container), i = Ia("(min-width: 768px)"), s = co(e.kind, i), c = uo(e, r), d = Er(n), u = so(a, l, e.returnFocusTo), m = Q(() => {
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
  }, [m]), yr(
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
function F(e) {
  const a = po(e);
  return a === void 0 || vo.has(a) ? e : bo;
}
function go(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function an(e) {
  const a = go(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ma(e, a) {
  S(() => {
    const n = e.current;
    if (!n) return;
    const r = () => an(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function yo(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function tn(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = yo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), an(r);
  }, [e, a, n]);
}
const No = "_icon_1ylqy_2", ko = {
  icon: No
};
function ca({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: ko.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function CS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function SS() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function RS() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function TS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function $o() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const nn = "ward:sidebar-collapsed", Co = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function So() {
  try {
    return window.localStorage.getItem(nn) === "true";
  } catch {
    return !1;
  }
}
function Ro(e) {
  try {
    window.localStorage.setItem(nn, String(e));
  } catch {
  }
}
function To(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function xo(e) {
  return e instanceof Element && e.closest(Co) !== null;
}
function Lo(e) {
  return e.key === "[" && !To(e) && !xo(e.target);
}
function Ao(e) {
  const [a, n] = p(So), r = () => {
    Ro(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Lo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Eo() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Io({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Mo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function Bo(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = Ao(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function Po({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t($o, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function jo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Do({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: F(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(jo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Oo({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Po, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Do, { items: n ?? [], label: a })
  ] });
}
function Ho({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = Eo(), d = Bo(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(Oo, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Io, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Mo, { sidebar: e, label: u, drawer: c })
  ] });
}
function Fo({ destinations: e, active: a }) {
  const n = f(null);
  return Ma(n, e.length), tn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: F(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function qo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function zo() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Wo({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Ko({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Go(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Fo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(qo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Wo, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Uo(e) {
  const a = N(), n = zo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Go, { ...e, menu: n }),
    /* @__PURE__ */ t(Ko, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Vo(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function xS(e) {
  return Vo(e) ? /* @__PURE__ */ t(Ho, { ...e }) : /* @__PURE__ */ t(Uo, { ...e });
}
const Yo = "_root_197jc_2", Jo = "_row_197jc_8", Xo = "_box_197jc_14", Qo = "_label_197jc_21", Zo = "_lockedNote_197jc_26", ei = "_consequence_197jc_34", ai = "_sample_197jc_69", Fe = {
  root: Yo,
  row: Jo,
  box: Xo,
  label: Qo,
  lockedNote: Zo,
  consequence: ei,
  sample: ai
};
function ti(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function ni({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Fe.consequence} ward-check-consequence`, children: a }) : null;
}
function ri({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Fe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function li({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.sample, "aria-hidden": "true", children: e }) : null;
}
function rn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = je(), l = ti(e, r);
  return /* @__PURE__ */ o("div", { className: `${Fe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: Fe.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Fe.box} ward-field-option`,
          checked: l.checked,
          disabled: l.disabled,
          onChange: (i) => {
            var s;
            return !l.disabled && ((s = e.onChange) == null ? void 0 : s.call(e, i.target.checked));
          },
          "aria-describedby": Ea(sa(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: Fe.label, children: [
        e.label,
        /* @__PURE__ */ t(ri, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(li, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(ni, { id: n, text: e.consequence })
  ] });
}
const oi = "_chip_pq6tb_2", ii = {
  chip: oi
}, si = {
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
function ci(e, a) {
  if (e === "stream") return di(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = si[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function di(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${ii.chip} ward-chip ward-chip--${e}`, style: ci(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const ui = "_clamp_zn74g_3", Nt = {
  clamp: ui
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Nt.clamp : `${Nt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function da(e) {
  return typeof e == "number" && Aa(e) ? e : null;
}
function pe(e, a) {
  const n = da(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Ba(e, a) {
  const n = da(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const mi = "_root_zvypg_3", hi = "_nav_zvypg_7", wi = "_list_zvypg_13", fi = "_item_zvypg_21", _i = "_link_zvypg_41", vi = "_sep_zvypg_51", bi = "_current_zvypg_55", pi = "_chips_zvypg_59", Ae = {
  root: mi,
  nav: hi,
  list: wi,
  item: fi,
  link: _i,
  sep: vi,
  current: bi,
  chips: pi
};
function gi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ae.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ae.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ae.link} ward-target`, href: F(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ae.current, "aria-current": "page", title: n.label, children: n.label })
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
const yi = 500;
function on(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function sn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, yi), e.current);
}
const ma = 4;
function Ni(e, a, n) {
  const r = Math.max(0, n - e.bottom - ma * 2), l = Math.max(0, e.top - ma * 2);
  return a <= r || r >= l ? { top: e.bottom + ma, maxHeight: r } : { top: e.top - ma - Math.min(a, l), maxHeight: l };
}
function ki(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function $i(e, a, n, r) {
  return { ...Ni(e, a.height, n.height), left: ki(e, a.width, n.width, r) };
}
function va(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ci(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", va(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Si(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = Si(e), l = Ci(e, a), i = $i(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: va(i.left - l.box.left), top: va(i.top - l.box.top), maxHeight: va(i.maxHeight) }), r();
}
function Ri(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function cn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Ri(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Ti = "_root_axvxm_2", xi = "_trigger_axvxm_7", Li = "_value_axvxm_32", Ai = "_menu_axvxm_50", Ei = "_find_axvxm_72", Ii = "_list_axvxm_88", Mi = "_option_axvxm_99", Bi = "_check_axvxm_118", Pi = "_empty_axvxm_129", fe = {
  root: Ti,
  trigger: xi,
  value: Li,
  menu: Ai,
  find: Ei,
  list: Ii,
  option: Mi,
  check: Bi,
  empty: Pi
}, ji = 7;
function Di(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Oi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Jt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Di(e.options, l),
    findable: e.options.length > ji,
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
function Hi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Fi(e) {
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
function qi(e) {
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
const zi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Wi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      zi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Ki({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function Gi({ menu: e, ids: a, focusRef: n }) {
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
function Ui({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Fi(a), s = f(null);
  cn(l, s);
  const c = (d) => {
    on(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Gi, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: un(a, qi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Ki, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Vi(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function mn(...e) {
  return e.filter(Boolean).join(" ");
}
function Yi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Ji({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = je()) == null ? void 0 : c.reason;
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
      "aria-describedby": sa(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      title: s,
      ...Wi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Yi(e) })
    }
  );
}
function hn(e) {
  const a = je(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Oi(n, s), u = Hi(d.open, c);
  return ln(d.open, i, () => d.close(!1)), Vi(d, l), /* @__PURE__ */ o("div", { ref: i, className: mn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Ji, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(Ui, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Xi = "_field_djnju_2", Qi = "_label_djnju_8", Zi = "_labelHidden_djnju_15", es = "_control_djnju_25", as = "_mono_djnju_45", ts = "_area_djnju_50", ns = "_invalid_djnju_57", Be = {
  field: Xi,
  label: Qi,
  labelHidden: Zi,
  control: es,
  mono: as,
  area: ts,
  invalid: ns
}, rs = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, wn = (e) => `${e}-label`;
function ls({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? rs : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function os({ props: e, controlProps: a, cls: n }) {
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
      onChange: e.onChange
    }
  );
}
function is({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ss = { input: ls, select: os, textarea: is };
function cs(e, a, n) {
  const r = ss[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function ds(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ea(sa(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function us(e) {
  const a = e.mono ? [Be.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Be.area] : [];
  return [Be.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function ms(e) {
  return e ? `${Be.label} ${Be.labelHidden} ward-field-label` : `${Be.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = ds(e, a, n, je()), l = us(e);
  return /* @__PURE__ */ o("div", { className: `${Be.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: wn(a), className: ms(e.labelHidden), htmlFor: a, children: e.label }),
    cs(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Be.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const hs = "_root_1gft5_2", ws = "_trigger_1gft5_9", fs = "_panel_1gft5_33", _s = "_menu_1gft5_52", vs = "_group_1gft5_57", bs = "_heading_1gft5_62", ps = "_item_1gft5_68", gs = "_separator_1gft5_94", ys = "_footer_1gft5_100", _e = {
  root: hs,
  trigger: ws,
  panel: fs,
  menu: _s,
  group: vs,
  heading: bs,
  item: ps,
  separator: gs,
  footer: ys
}, fn = Te(null);
function Ns(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Jt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const ks = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function $s(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = ks.get(a.key);
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
function Cs(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: _n(_e.trigger, r) };
}
function Ss(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = Ns(e.defaultOpen === !0, l);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: _n(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Cs(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...$s(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(fn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Rs(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Ts(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const vn = (e, a) => (e % a + a) % a;
function Qe(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = vn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const xs = (e) => e.split("").every((a) => a === e[0]);
function Ls(e, a, n) {
  const r = xs(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = vn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function As(e) {
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
function Es(e, a) {
  const { items: n } = e, r = () => {
    var l;
    return (l = e.refs.current[e.current()]) == null ? void 0 : l.click();
  };
  return /* @__PURE__ */ new Map([
    ["ArrowDown", () => e.focus(Qe(n, e.current(), 1))],
    ["ArrowUp", () => e.focus(Qe(n, e.current(), -1))],
    ["Home", () => e.focus(Qe(n, -1, 1))],
    ["End", () => e.focus(Qe(n, n.length, -1))],
    ["Escape", () => a.close(!0)],
    ["Enter", r],
    [" ", r]
  ]);
}
function Is(e, a) {
  const n = f(!1), r = sn(), l = Es(e, a), i = (s) => {
    on(s) && e.focus(Ls(e.items, e.current(), r(s.key)));
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
function Ms(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Qe(i, -1, 1) : Qe(i, i.length, -1));
  }, [n, r]);
}
function Bs({ row: e, nav: a, popup: n }) {
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
    ...Bs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: F(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Ps({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(bn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function js({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ps, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(bn, { row: e.row, nav: a, popup: n });
}
function Ds() {
  const e = Re(fn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Os({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ds(), c = f(null);
  cn(s, c, n);
  const d = Rs(e), u = As(d.flatMap(Ts).map((w) => w.item)), m = Is(u, r);
  return Ms(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(js, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
const Hs = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Fs({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Hs(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Fa = (e) => Number.parseFloat(e) || 0, Ct = (e) => e.getBoundingClientRect().width;
function qs(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Fa(a.paddingInlineStart) - Fa(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: Fa(a.columnGap)
  };
}
function zs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Ws = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Ks(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = qs(i);
      l((d) => Ws(d, c) ? d : c);
    };
    return s(), zs(i, s);
  }, [e, n]), r && Fs(r, a);
}
const Gs = "_strip_1x6px_2", Us = "_fits_1x6px_33", Vs = "_probe_1x6px_41", Ys = "_moreRoot_1x6px_50", Js = "_more_1x6px_50", Xs = "_tab_1x6px_69", Qs = "_count_1x6px_105", ve = {
  strip: Gs,
  fits: Us,
  probe: Vs,
  moreRoot: Ys,
  more: Js,
  tab: Xs,
  count: Qs
}, pn = "More";
function Zs(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const gn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function yn(e) {
  return `${ve.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
const ec = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function ac({ tab: e, active: a, place: n, onChange: r }) {
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
function tc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function nc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Ss, { label: pn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Os, { align: "end", entries: e.map((r) => ({ label: gn(r), onSelect: () => n(r.id) })) }) });
}
function rc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : ec;
}
function LS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  const i = xa({ orientation: "horizontal" }), s = Zs(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null), d = Ks(c, s, e.map(gn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${yn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(ac, { tab: m, active: a, place: rc(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: pn }),
    u.length > 0 && /* @__PURE__ */ t(nc, { tabs: u, trigger: i.itemProps(e.length), onPick: tc(c, n) })
  ] });
}
const St = 7;
function AS({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > St) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${St} — the set is fixed`);
  const l = f(null);
  return Ma(l, e.length), tn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: yn(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const lc = "_root_v56ff_3", oc = "_segment_v56ff_9", Rt = {
  root: lc,
  segment: oc
};
function Nn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = xa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
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
const ic = "_sidebar_s9o1j_3", sc = "_brand_s9o1j_9", cc = "_mark_s9o1j_17", dc = "_word_s9o1j_24", uc = "_nav_s9o1j_30", mc = "_navItem_s9o1j_39", hc = "_footLink_s9o1j_49", wc = "_group_s9o1j_58", fc = "_groupName_s9o1j_65", _c = "_agents_s9o1j_81", vc = "_agent_s9o1j_81", bc = "_root_s9o1j_96", pc = "_agentTop_s9o1j_105", gc = "_dot_s9o1j_112", yc = "_agentName_s9o1j_124", Nc = "_agentMeta_s9o1j_138", kc = "_foot_s9o1j_49", $c = "_footName_s9o1j_150", Cc = "_footLinks_s9o1j_157", Sc = "_linkBrand_s9o1j_184", Rc = "_label_s9o1j_205", Tc = "_note_s9o1j_210", xc = "_footer_s9o1j_226", x = {
  sidebar: ic,
  brand: sc,
  mark: cc,
  word: dc,
  nav: uc,
  navItem: mc,
  new: "_new_s9o1j_48",
  footLink: hc,
  group: wc,
  groupName: fc,
  agents: _c,
  agent: vc,
  root: bc,
  agentTop: pc,
  dot: gc,
  agentName: yc,
  agentMeta: Nc,
  foot: kc,
  footName: $c,
  footLinks: Cc,
  linkBrand: Sc,
  label: Rc,
  note: Tc,
  footer: xc
};
function Lc({ agent: e }) {
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
function Ac({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Ec({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: F(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Lc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Ac, { shared: i })
  ] });
}
function Ic(e) {
  return e.destinations ?? e.items ?? [];
}
function Mc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Bc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Pc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function jc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Mc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Ic(e).map((a) => /* @__PURE__ */ t(Pc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Bc, { children: e.children })
  ] });
}
function Dc(e) {
  return "agents" in e;
}
function ES(e) {
  return Dc(e) ? /* @__PURE__ */ t(Ec, { ...e }) : /* @__PURE__ */ t(jc, { ...e });
}
const Oc = "_mark_wlgi8_3", Hc = {
  mark: Oc
}, Fc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Hc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Fc[e]
    }
  );
}
const qc = "_marker_br9fi_2", zc = {
  marker: qc
}, Wc = {
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
}, Kc = { running: " ward-running" };
function De({ size: e, kind: a, label: n }) {
  const r = { "--marker": Wc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${zc.marker} ward-marker ward-marker--${a}${Kc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Gc = "_root_ti0pq_2", Uc = "_chip_ti0pq_11", Vc = "_noCase_ti0pq_23", ha = {
  root: Gc,
  chip: Uc,
  noCase: Vc
};
function Yc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = Yc(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ha.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(De, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ha.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: ha.noCase, children: at(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ha.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const Jc = "_root_1cvxf_2", Xc = "_context_1cvxf_12", Qc = "_row_1cvxf_1", Zc = "_heading_1cvxf_25", ed = "_headingWrap_1cvxf_33", ad = "_chips_1cvxf_38", td = "_title_1cvxf_45", nd = "_consequence_1cvxf_55", rd = "_actionsWrap_1cvxf_62", ld = "_actions_1cvxf_62", od = "_action_1cvxf_62", id = "_overflowPanel_1cvxf_91", sd = "_measureClip_1cvxf_102", cd = "_measure_1cvxf_102", Y = {
  root: Jc,
  context: Xc,
  row: Qc,
  heading: Zc,
  headingWrap: ed,
  chips: ad,
  title: td,
  consequence: nd,
  actionsWrap: rd,
  actions: ld,
  action: od,
  overflowPanel: id,
  measureClip: sd,
  measure: cd
};
function dd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function ud({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(dd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function md({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function hd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function wd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function fd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function _d({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(gi, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function vd(...e) {
  return e.some((a) => a === null);
}
function bd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function pd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + bd(e);
}
function gd(e, a, n, r, l) {
  if (l === 0 || vd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - pd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function yd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Nd(e) {
  return br(e) && (e.type === "a" || typeof e.props.href == "string");
}
function kd(e, a) {
  return a.length === 0 && e.length === 1 && Nd(e[0]);
}
function $d(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!yd(d)) return;
    const u = () => c(gd(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Cd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Sd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function IS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = $d(i, kd(i, s)), B = s.length > 0, { disclosure: le, close: Le } = fd(L || B, v), ae = hd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(_d, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t(ud, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Sd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(md, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(wd, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(Cd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Rd = "_root_td96x_2", Td = "_body_td96x_16", xt = {
  root: Rd,
  body: Td
};
function MS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const xd = "_root_bf1pc_2", Ld = "_table_bf1pc_9", Ad = "_caption_bf1pc_14", Ed = "_series_bf1pc_23", Id = "_category_bf1pc_31", Md = "_cell_bf1pc_39", Bd = "_track_bf1pc_45", Pd = "_lane_bf1pc_52", jd = "_bar_bf1pc_56", Dd = "_value_bf1pc_63", Od = "_swatch_bf1pc_70", Hd = "_empty_bf1pc_78", J = {
  root: xd,
  table: Ld,
  caption: Ad,
  series: Ed,
  category: Id,
  cell: Md,
  track: Bd,
  lane: Pd,
  bar: jd,
  value: Dd,
  swatch: Od,
  empty: Hd
}, Fd = "—", Lt = 6;
function qd(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function zd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function kn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Wd(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Kd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Wd(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Gd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": kn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ud({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Vd({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Fd }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Gd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(Kd, { value: u.values[d], top: r, step: kn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function BS(e) {
  qd(e.categories, e.series);
  const a = zd(e.series);
  return a === 0 ? /* @__PURE__ */ t(Ud, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Vd, { ...e, top: a });
}
const Yd = "_root_1bfqw_2", Jd = "_figure_1bfqw_7", Xd = "_of_1bfqw_13", Qd = "_bar_1bfqw_18", Zd = "_rows_1bfqw_38", eu = "_row_1bfqw_38", au = "_label_1bfqw_49", tu = "_amount_1bfqw_54", Ee = {
  root: Yd,
  figure: Jd,
  of: Xd,
  bar: Qd,
  rows: Zd,
  row: eu,
  label: au,
  amount: tu
};
function nu({ spent: e, ceiling: a, breakdown: n }) {
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
const ru = "_frame_9xel2_2", lu = "_table_9xel2_6", ou = "_th_9xel2_12", iu = "_td_9xel2_13", su = "_sort_9xel2_48", cu = "_row_9xel2_60", du = "_empty_9xel2_68", Me = {
  frame: ru,
  table: lu,
  th: ou,
  td: iu,
  sort: su,
  row: cu,
  empty: du
}, uu = { asc: "ascending", desc: "descending" };
function mu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return uu[a.direction];
}
function hu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function wu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function fu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: wu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": mu(e, a),
      children: hu(e, n)
    }
  );
}
function _u({ row: e, props: a }) {
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
function vu({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(fu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(_u, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const bu = "_list_v0s52_2", pu = {
  list: bu
};
function PS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: pu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const gu = "_label_1u62a_2", yu = {
  label: gu
};
function jS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: yu.label, children: a.header }) }, a.key)) }) });
}
const Nu = "_stack_bp6a0_2", ku = {
  stack: Nu
};
function DS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: ku.stack, "data-ward-action-stack": "", children: e });
}
const $u = "_set_1z0sq_2", Cu = "_legend_1z0sq_7", Su = "_row_1z0sq_15", Ru = "_control_1z0sq_20", Tu = "_input_1z0sq_26", xu = "_label_1z0sq_31", Lu = "_consequence_1z0sq_36", He = {
  set: $u,
  legend: Cu,
  row: Su,
  control: Ru,
  input: Tu,
  label: xu,
  consequence: Lu
};
function $n({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: He.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: He.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, v = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: He.row, children: [
        /* @__PURE__ */ o("span", { className: He.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: He.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": sa(v, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: He.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: v, className: `${He.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Au = "_root_11gpw_2", Eu = "_head_11gpw_10", Iu = "_note_11gpw_29", Mu = "_index_11gpw_34", Bu = "_dot_11gpw_38", Pu = "_counter_11gpw_49", ju = "_trailing_11gpw_57", qe = {
  root: Au,
  head: Eu,
  note: Iu,
  index: Mu,
  dot: Bu,
  counter: Pu,
  trailing: ju
};
function Du({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ou({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ t(Du, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: qe.note, children: n }),
    /* @__PURE__ */ t(Ou, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: qe.trailing, children: i })
  ] });
}
const Hu = "_strip_4ygbn_2", Fu = "_cell_4ygbn_7", qu = "_value_4ygbn_12", zu = "_link_4ygbn_29", Wu = "_label_4ygbn_49", Ku = "_tiles_4ygbn_101", Pe = {
  strip: Hu,
  cell: Fu,
  value: qu,
  link: zu,
  label: Wu,
  tiles: Ku
};
function Cn(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Sn = (e) => `${Pe.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Gu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Pe.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Pe.label} ward-stat-label`, children: e.label })
  ] });
}
function Uu({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Pe.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Pe.link} ward-stat-link`, href: F(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Pe.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Rn = (e) => e.href === void 0 ? /* @__PURE__ */ t(Gu, { cell: e }, e.label) : /* @__PURE__ */ t(Uu, { cell: e, href: e.href }, e.label);
function Pa({ cells: e, divided: a = !1 }) {
  return Cn("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${Pe.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(Rn) });
}
const Et = 6;
function OS({ cells: e }) {
  Cn("StatTiles", e, [1, 2 * Et]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, Et) };
  return /* @__PURE__ */ t("dl", { className: `${Pe.tiles} ward-stattiles`, style: a, children: e.map(Rn) });
}
const Vu = "_root_1eb1u_2", Yu = "_track_1eb1u_8", Ju = "_thumb_1eb1u_46", Xu = "_labelHidden_1eb1u_64", Qu = "_label_1eb1u_64", Zu = "_lockedNote_1eb1u_84", ze = {
  root: Vu,
  track: Yu,
  thumb: Ju,
  labelHidden: Xu,
  label: Qu,
  lockedNote: Zu
};
function em(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function am(e) {
  return e ? `${ze.label} ${ze.labelHidden}` : ze.label;
}
function Ke({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = je(), { on: m, off: w } = em(a, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: am(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: ze.lockedNote, children: "always on" })
    ] })
  ] });
}
const tm = "_bar_1vp69_2", nm = "_skip_1vp69_11", rm = "_mark_1vp69_22", lm = "_nav_1vp69_30", om = "_list_1vp69_34", im = "_select_1vp69_41", sm = "_selectTrigger_1vp69_45", cm = "_dest_1vp69_52", dm = "_actor_1vp69_71", um = "_actorMark_1vp69_84", mm = "_actorLabel_1vp69_89", hm = "_tagline_1vp69_108", oe = {
  bar: tm,
  skip: nm,
  mark: rm,
  nav: lm,
  list: om,
  select: im,
  selectTrigger: sm,
  dest: cm,
  actor: dm,
  actorMark: um,
  actorLabel: mm,
  tagline: hm
};
function wm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function fm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function HS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = fm(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: F(d.href),
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: wm(c) })
    ] })
  ] });
}
const _m = "_tree_zzoob_2", vm = "_item_zzoob_6", bm = "_row_zzoob_10", pm = "_button_zzoob_22", ka = {
  tree: _m,
  item: vm,
  row: bm,
  button: pm
}, Tn = Te(null);
function gm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(Tn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const ym = { ArrowRight: !0, ArrowLeft: !1 };
function It(e) {
  return e ? !0 : void 0;
}
function Nm(e, a) {
  const n = ym[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function km(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function $m(e) {
  const a = [ka.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Cm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Sm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Rm(e) {
  return typeof e == "string" ? e : void 0;
}
function Tm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function xm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function xn(e) {
  const a = Re(Tn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Cm(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: $m(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": n,
        "data-depth": e.depth,
        "data-unresolved": It(e.unresolved),
        "data-inherited": It(e.inherited),
        "data-ward-rowlink": !0,
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ka.button} ward-treeitem-btn`,
            onClick: () => km(e),
            onKeyDown: (r) => Nm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Sm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Rm(e.label), children: e.label }),
              /* @__PURE__ */ t(Tm, { value: e.detail }),
              /* @__PURE__ */ t(xm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Lm = "_frame_e2x64_2", Am = "_subjectRail_e2x64_22", Em = "_subject_e2x64_22", Im = "_rail_e2x64_42", Mm = "_record_e2x64_66", Bm = "_recordBody_e2x64_71", Pm = "_stageGrid_e2x64_120", jm = "_band_e2x64_146", Dm = "_bandBody_e2x64_154", Om = "_bandActions_e2x64_159", Hm = "_scroller_e2x64_167", Fm = "_board_e2x64_203", qm = "_lanes_e2x64_212", zm = "_cardGrid_e2x64_246", X = {
  frame: Lm,
  subjectRail: Am,
  subject: Em,
  rail: Im,
  record: Mm,
  recordBody: Bm,
  stageGrid: Pm,
  band: jm,
  bandBody: Dm,
  bandActions: Om,
  scroller: Hm,
  board: Fm,
  lanes: qm,
  cardGrid: zm
};
function FS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Mt(e) {
  return e ? "true" : void 0;
}
function qS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": Mt(i), children: [
    /* @__PURE__ */ t("div", { className: X.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: X.rail, "data-sticky": Mt(l), "aria-label": r, children: a })
  ] });
}
function zS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Wm = "_form_1j8ub_2", Km = "_fields_1j8ub_9", Gm = "_actions_1j8ub_19", qa = {
  form: Wm,
  fields: Km,
  actions: Gm
};
function WS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: qa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: qa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: qa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function KS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: X.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: X.bandActions, children: a })
  ] });
}
const Um = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = f(null);
  Ma(r, n ?? pr.count(a));
  const l = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: r, className: X.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: l, children: a });
}
function Vm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Ym({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(gr, { children: n.content }, n.id)) }) });
}
function GS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(Um);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(Vm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Ym, { lanes: n, label: a });
}
function US({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  Ma(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: X.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
function VS({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${X.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Jm = "_block_b38uc_3", Xm = "_sentence_b38uc_10", Qm = "_meta_b38uc_19", Zm = "_action_b38uc_24", eh = "_strip_b38uc_28", ah = "_loading_b38uc_47", th = "_label_b38uc_55", nh = "_counter_b38uc_62", be = {
  block: Jm,
  sentence: Xm,
  meta: Qm,
  action: Zm,
  strip: eh,
  loading: ah,
  label: th,
  counter: nh
};
function rh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function ja({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(rh, { action: a })
  ] });
}
function lh(e) {
  return /* @__PURE__ */ t(ja, { ...e, kind: "ward-emptystate" });
}
function YS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(ja, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function JS(e) {
  return /* @__PURE__ */ t(ja, { ...e });
}
function XS({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(ja, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function QS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function ZS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function e2({ label: e, startedAt: a }) {
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
const oh = "_note_cigdt_2", ih = {
  note: oh
};
function sh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: ih.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const ch = "_card_k7btg_3", dh = "_hit_k7btg_31", uh = "_head_k7btg_44", mh = "_title_k7btg_51", hh = "_meta_k7btg_57", wh = "_since_k7btg_66", fh = "_sep_k7btg_76", _h = "_fields_k7btg_80", vh = "_field_k7btg_80", bh = "_last_k7btg_98", ph = "_reason_k7btg_110", se = {
  card: ch,
  hit: dh,
  head: uh,
  title: mh,
  meta: hh,
  since: wh,
  sep: fh,
  fields: _h,
  field: vh,
  last: bh,
  reason: ph
}, gh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function yh(e, a, n) {
  const r = _a(e, "blue"), l = _a(e, "orange"), i = _a(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = gh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Nh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function kh(e, a) {
  return Nh[a](e);
}
function $h({ item: e, connection: a }) {
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
function Ch({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Sh({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Rh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: kh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Th(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function xh(e, a, n) {
  e == null || e(a, n);
}
function Lh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ah({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function Da(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  yh(r, n.key, e.feed);
  const l = Lh(e.feed), i = Th(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => xh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Ch, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t($h, { item: n, connection: l }),
        /* @__PURE__ */ t(Sh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Rh, { item: n, fields: a }),
        /* @__PURE__ */ t(Ah, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Eh = "_column_1j8bi_3", Ih = "_head_1j8bi_21", Mh = "_label_1j8bi_30", Bh = "_count_1j8bi_39", Ph = "_list_1j8bi_53", la = {
  column: Eh,
  head: Ih,
  label: Mh,
  count: Bh,
  list: Ph
};
function Ln(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function jh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Dh(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Da,
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
function Oh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Ln(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(jh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Dh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(sh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Hh = "_foot_cs4jr_2", Fh = "_note_cs4jr_13", qh = "_link_cs4jr_19", za = {
  foot: Hh,
  note: Fh,
  link: qh
};
function a2({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: F(e), children: "Configure board" })
  ] });
}
const zh = "_head_1tfi5_3", Wh = "_identity_1tfi5_12", Kh = "_titleRow_1tfi5_18", Gh = "_title_1tfi5_18", Uh = "_key_1tfi5_35", Vh = "_rollup_1tfi5_45", Yh = "_tools_1tfi5_53", Jh = "_swatch_1tfi5_101", Xh = "_mark_1tfi5_108", ke = {
  head: zh,
  identity: Wh,
  titleRow: Kh,
  title: Gh,
  key: Uh,
  rollup: Vh,
  tools: Yh,
  swatch: Jh,
  mark: Xh
}, Bt = "initials:";
function Qh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Zh(e) {
  const a = [Qh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function ew(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Zh(e)
  ] });
}
function aw(e) {
  return e.startsWith(Bt) ? e.slice(Bt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function tw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: aw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function nw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function t2({
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
        /* @__PURE__ */ t(tw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: ew(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(nw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const rw = "_head_1sejb_14", lw = "_line_1sejb_15", ow = "_cHandle_1sejb_36", iw = "_cName_1sejb_41", sw = "_nameLine_1sejb_49", cw = "_cLabel_1sejb_56", dw = "_cCap_1sejb_61", uw = "_cShown_1sejb_66", mw = "_name_1sejb_49", hw = "_noCap_1sejb_88", ww = "_state_1sejb_102", fw = "_handle_1sejb_111", _w = "_sub_1sejb_137", j = {
  head: rw,
  line: lw,
  cHandle: ow,
  cName: iw,
  nameLine: sw,
  cLabel: cw,
  cCap: dw,
  cShown: uw,
  name: mw,
  noCap: hw,
  state: ww,
  handle: fw,
  sub: _w
}, vw = "can't be hidden or collapsed", bw = "terminal · counted, not a column";
function n2() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function pw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function gw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Pt(e) {
  return e.gate ? vw : e.terminal ? bw : gw(e.agentsMounted);
}
function yw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Nw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Pt(e) && /* @__PURE__ */ t("span", { className: j.sub, children: Pt(e) })
  ] });
}
function kw(e) {
  return e === void 0 ? "" : String(e);
}
function $w(e) {
  return e === "" ? void 0 : Number(e);
}
function Cw({ name: e, onReorder: a }) {
  const n = je();
  return /* @__PURE__ */ t("span", { className: j.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: j.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && yw(r, a),
      children: "⠿"
    }
  ) });
}
function Sw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: kw(a.cap), onChange: (r) => n({ ...a, cap: $w(r) }) }) });
}
function Rw({ stage: e, config: a, onChange: n }) {
  const r = je() !== null, l = pw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(Ke, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Tw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function r2({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Tw(e), children: [
    /* @__PURE__ */ t(Cw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Nw, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Sw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Rw, { stage: e, config: a, onChange: n })
  ] });
}
const xw = "_body_1a4f4_2", Lw = "_head_1a4f4_9", Aw = "_summary_1a4f4_19", Ew = "_block_1a4f4_20", Iw = "_actionsBlock_1a4f4_21", Mw = "_title_1a4f4_41", Bw = "_note_1a4f4_46", Pw = "_k_1a4f4_51", jw = "_kv_1a4f4_58", Dw = "_row_1a4f4_64", Ow = "_label_1a4f4_75", Hw = "_value_1a4f4_84", Fw = "_quote_1a4f4_90", qw = "_actions_1a4f4_21", zw = "_resolve_1a4f4_103", D = {
  body: xw,
  head: Lw,
  summary: Aw,
  block: Ew,
  actionsBlock: Iw,
  title: Mw,
  note: Bw,
  k: Pw,
  kv: jw,
  row: Dw,
  label: Ow,
  value: Hw,
  quote: Fw,
  actions: qw,
  resolve: zw
};
function Ww(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Kw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Gw(e) {
  const a = da(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Uw(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Vw(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(Gw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Ww(e),
    ...Uw(n),
    ...Kw(e, a)
  ];
}
function Yw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function Jw(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Xw({ item: e, showKey: a }) {
  const n = Jw(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: D.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function Qw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function l2({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = Vw(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(Xw, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: v }),
      /* @__PURE__ */ t("dd", { className: D.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(Qw, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(Yw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Zw = "_root_3azmy_2", ef = "_list_3azmy_7", af = "_item_3azmy_12", tf = "_box_3azmy_18", nf = "_text_3azmy_23", rf = "_note_3azmy_28", Ve = {
  root: Zw,
  list: ef,
  item: af,
  box: tf,
  text: nf,
  note: rf
};
function Oa({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ve.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ve.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ve.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ve.box, children: /* @__PURE__ */ t(lt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ve.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ve.note} ward-checklist-note`, children: a })
  ] });
}
const lf = "_rail_znbbp_2", of = "_k_znbbp_11", sf = "_head_znbbp_19", cf = "_section_znbbp_25", df = "_card_znbbp_39", uf = "_strip_znbbp_46", mf = "_skeleton_znbbp_60", hf = "_skeletonLabel_znbbp_74", wf = "_bar_znbbp_80", ff = "_note_znbbp_89", me = {
  rail: lf,
  k: of,
  head: sf,
  section: cf,
  card: df,
  strip: uf,
  skeleton: mf,
  skeletonLabel: hf,
  bar: wf,
  note: ff
};
function _f(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function vf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function bf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Oh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function pf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(bf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(vf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function o2(e) {
  const a = _f(e.onOpen), n = Ln(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Da, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(pf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Oa, { items: e.effects, density: "compact" }) })
  ] });
}
function gf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function yf(e) {
  return Math.ceil(e.length / 2);
}
function Nf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function An(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function kf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = An(e);
  l !== void 0 && n(l), r(Nf(e.type));
}
function $f(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => kf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Cf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Sf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Rf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Tf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(yf(a ?? [])) + ")"
  };
}
function xf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Lf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Af(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Ef(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function If(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Mf(e, a) {
  return a === void 0 ? e : gf(e, a.ref);
}
function Bf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function En(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = _a(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Cf(a));
  $f(e.feed, a.key, s, d, i);
  const u = Sf(a, r), m = Rf(a, n), w = Tf(a, e.fields), v = If(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Bf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: Mf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        xf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Lf(a, e.fields),
          Af(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Ef(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Pf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function jf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Df(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Of(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Pf, { count: e.items.length, cap: e.column.cap });
}
function Hf(e, a) {
  return e.roving ?? a;
}
function Ff(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function qf(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    En,
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
function zf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = Hf(e, n), l = jf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Df(e.column, e.items.length, a),
    Of(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Ff(e, n), children: qf(e, r) })
  ] });
}
function Wf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Kf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Gf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function i2(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Wf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Kf(e),
      Gf(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Uf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Vf(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ke, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ke, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Yf(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function s2(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(Uf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Vf(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Yf(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function c2(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(En, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(zf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Jf(e, a) {
  const n = An(e);
  n !== void 0 && a(n);
}
function Xf(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => Jf(r, n));
  }, [e, a, n]);
}
function Qf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Zf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function e_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function a_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function d2(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Xf(e.feed, a.key, l);
  const i = [...Qf(a), ...Zf(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      e_(n, r)
    ] }),
    a_(a, e.actions)
  ] });
}
const t_ = "_card_uzp8w_3", n_ = "_head_uzp8w_30", r_ = "_mark_uzp8w_38", l_ = "_name_uzp8w_50", o_ = "_chips_uzp8w_71", i_ = "_description_uzp8w_77", s_ = "_run_uzp8w_82", c_ = "_sep_uzp8w_91", d_ = "_facts_uzp8w_97", u_ = "_fact_uzp8w_97", m_ = "_factLabel_uzp8w_111", h_ = "_factValue_uzp8w_115", re = {
  card: t_,
  head: n_,
  mark: r_,
  name: l_,
  chips: o_,
  description: i_,
  run: s_,
  sep: c_,
  facts: d_,
  fact: u_,
  factLabel: m_,
  factValue: h_
}, w_ = { live: "done", draft: "running", paused: "meta" };
function f_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function __({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: w_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function v_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function b_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function p_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function g_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function y_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: f_(s),
      style: c,
      "data-selected": d,
      "data-paused": g_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: F(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(v_, { description: e.description }),
        /* @__PURE__ */ t(b_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(__, { versions: e.versions }),
        /* @__PURE__ */ t(p_, { facts: i })
      ]
    }
  );
}
const N_ = "_list_4dcyc_2", k_ = "_row_4dcyc_11", $_ = "_head_4dcyc_23", C_ = "_id_4dcyc_30", S_ = "_lock_4dcyc_35", R_ = "_reason_4dcyc_41", T_ = "_remove_4dcyc_46", x_ = "_clauses_4dcyc_50", L_ = "_clause_4dcyc_50", A_ = "_label_4dcyc_64", E_ = "_cell_4dcyc_71", I_ = "_value_4dcyc_76", ie = {
  list: N_,
  row: k_,
  head: $_,
  id: C_,
  lock: S_,
  reason: R_,
  remove: T_,
  clauses: x_,
  clause: L_,
  label: A_,
  cell: E_,
  value: I_
}, In = Te(!1);
function u2({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(In.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function M_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function B_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function P_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(B_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function jt(e, a) {
  return e.locked ? void 0 : a;
}
function m2({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(In)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = jt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(P_, { rule: e, onRemove: jt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(M_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const j_ = "_ladder_n8eeo_2", D_ = "_cell_n8eeo_7", O_ = "_empty_n8eeo_26", H_ = "_name_n8eeo_34", F_ = "_holder_n8eeo_40", q_ = "_request_n8eeo_46", z_ = "_swatches_n8eeo_51", W_ = "_swatch_n8eeo_51", K_ = "_tilesFrame_n8eeo_78", G_ = "_tiles_n8eeo_78", U_ = "_tile_n8eeo_78", V_ = "_bar_n8eeo_117", Y_ = "_hex_n8eeo_128", J_ = "_note_n8eeo_138", E = {
  ladder: j_,
  cell: D_,
  empty: O_,
  name: H_,
  holder: F_,
  request: q_,
  swatches: z_,
  swatch: W_,
  tilesFrame: K_,
  tiles: G_,
  tile: U_,
  bar: V_,
  hex: Y_,
  note: J_
}, h2 = "not validated yet, pending a CVD matrix and dark stepping";
function X_(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function Mn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Q_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Z_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(De, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function ev(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function av(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Dt = (e) => String(e).padStart(2, "0");
function tv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Mn(e, void 0);
}
function nv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${Dt(e)}` : Dr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${Dt(e)} · ${n}` })
  ] });
}
function rv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = X_(e), c = Mn(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...av(d, m, u), "data-validation": s, style: Q_(e, s), onClick: v, onKeyDown: (B) => ev(B, v) }, label: y, name: w, holder: c, validation: s, note: tv(s, n, m), step: e.step };
}
const lv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(nv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Z_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function ov(e) {
  return lv[e.presentation](rv(e));
}
function iv(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function sv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function cv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const dv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function uv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const mv = { list: sv, swatches: () => null, tiles: uv };
function hv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Bn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  iv(e.steps);
  const r = cv(e), l = mv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(ov, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...hv(e.disabled === !0), className: `${dv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const wv = "_rail_s06lm_2", fv = "_section_s06lm_12", _v = "_sectionFlush_s06lm_22", vv = "_head_s06lm_26", bv = "_headLabel_s06lm_34", pv = "_sample_s06lm_42", gv = "_sampleLabel_s06lm_47", yv = "_sampleTitle_s06lm_54", Nv = "_sampleMeta_s06lm_59", kv = "_trace_s06lm_65", $v = "_traceHead_s06lm_70", Cv = "_steps_s06lm_78", Sv = "_step_s06lm_78", Rv = "_stepTitle_s06lm_97", Tv = "_hollow_s06lm_107", xv = "_stepBody_s06lm_115", Lv = "_stepDetail_s06lm_127", Av = "_publish_s06lm_132", Ev = "_reason_s06lm_138", Iv = "_note_s06lm_143", Mv = "_reveal_s06lm_148", k = {
  rail: wv,
  section: fv,
  sectionFlush: _v,
  head: vv,
  headLabel: bv,
  sample: pv,
  sampleLabel: gv,
  sampleTitle: yv,
  sampleMeta: Nv,
  trace: kv,
  traceHead: $v,
  steps: Cv,
  step: Sv,
  stepTitle: Rv,
  hollow: Tv,
  stepBody: xv,
  stepDetail: Lv,
  publish: Av,
  reason: Ev,
  note: Iv,
  reveal: Mv
}, Ot = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Bv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Pv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, jv = { notSimulated: "not simulated", running: "running" };
function Dv(e) {
  return e.presentation === "foundry";
}
function Ov(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Hv(e, a) {
  var r;
  const n = Bv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Fv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function qv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function zv(e) {
  if (Fv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Wv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Kv(e) {
  const a = jv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(De, { size: 6, kind: Pv[e.kind], label: e.kind });
}
function Gv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Uv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Vv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Wv, { kind: a.kind, children: [
    /* @__PURE__ */ t(Kv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Gv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Uv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Yv(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Pn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Yv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Vv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Jv(e) {
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
function Xv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Qv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Xt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Zv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Xt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function eb(e) {
  const a = Zv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function jn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function ab(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(jn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function tb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(jn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Dn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Ot[e.run.status].role, label: Ot[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function nb(e, a) {
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
function rb(e) {
  var n;
  qv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Dn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Jv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Pn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(Qv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist }) }),
    /* @__PURE__ */ t(ab, { reason: Ov(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function lb(e) {
  var r;
  const a = nb(e.run, e.feed);
  zv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Dn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Xv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Pn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(eb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(tb, { reason: Hv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function w2(e) {
  return Dv(e) ? /* @__PURE__ */ t(lb, { ...e }) : /* @__PURE__ */ t(rb, { ...e });
}
const ob = "_list_142ip_3", ib = "_row_142ip_9", sb = "_condition_142ip_18", cb = "_action_142ip_24", ba = {
  list: ob,
  row: ib,
  condition: sb,
  action: cb
}, On = Te(!1);
function f2({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(On.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ba.list, "aria-label": a, children: e }) });
}
function _2({ rule: e }) {
  if (!Re(On)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ba.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ba.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ba.action, children: e.then })
  ] });
}
const db = "_move_tmppt_3", ub = {
  move: db
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Hn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Fn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Ht(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function mb(e) {
  return e === "up" ? "down" : "up";
}
function hb(e, a) {
  const n = Ht(e, a.id, a.direction) ?? Ht(e, a.id, mb(a.direction));
  n == null || n.focus();
}
function qn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && hb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function zn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${ub.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const wb = "_body_1jd1i_2", fb = "_title_1jd1i_8", _b = "_section_1jd1i_13", vb = "_legend_1jd1i_18", bb = "_stages_1jd1i_26", pb = "_stage_1jd1i_26", gb = "_stageIndex_1jd1i_44", yb = "_stageName_1jd1i_50", Nb = "_footer_1jd1i_59", kb = "_note_1jd1i_66", $b = "_reason_1jd1i_71", Cb = "_actions_1jd1i_76", Sb = "_webHead_1jd1i_83", Rb = "_kicker_1jd1i_92", Tb = "_webTitle_1jd1i_99", xb = "_webBody_1jd1i_105", Lb = "_webSection_1jd1i_109", Ab = "_sectionHead_1jd1i_121", Eb = "_sectionNote_1jd1i_129", Ib = "_formLabel_1jd1i_134", Mb = "_identityRow_1jd1i_139", Bb = "_nameCell_1jd1i_145", Pb = "_keyCell_1jd1i_150", jb = "_colourCell_1jd1i_154", Db = "_colourStatus_1jd1i_161", Ob = "_webStages_1jd1i_166", Hb = "_webStageList_1jd1i_172", Fb = "_webStage_1jd1i_166", qb = "_webIndex_1jd1i_191", zb = "_webStageName_1jd1i_196", Wb = "_webMoves_1jd1i_201", Kb = "_addStage_1jd1i_215", Gb = "_addStageButton_1jd1i_223", Ub = "_addStageNote_1jd1i_231", Vb = "_webFooter_1jd1i_236", Yb = "_webFooterNotes_1jd1i_244", Jb = "_webNote_1jd1i_251", _ = {
  body: wb,
  title: fb,
  section: _b,
  legend: vb,
  stages: bb,
  stage: pb,
  stageIndex: gb,
  stageName: yb,
  footer: Nb,
  note: kb,
  reason: $b,
  actions: Cb,
  webHead: Sb,
  kicker: Rb,
  webTitle: Tb,
  webBody: xb,
  webSection: Lb,
  sectionHead: Ab,
  sectionNote: Eb,
  formLabel: Ib,
  identityRow: Mb,
  nameCell: Bb,
  keyCell: Pb,
  colourCell: jb,
  colourStatus: Db,
  webStages: Ob,
  webStageList: Hb,
  webStage: Fb,
  webIndex: qb,
  webStageName: zb,
  webMoves: Wb,
  addStage: Kb,
  addStageButton: Gb,
  addStageNote: Ub,
  webFooter: Vb,
  webFooterNotes: Yb,
  webNote: Jb
}, Xb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Wn = "not in catalogue";
function Qb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Wn}` }, ...n];
}
function Zb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Wn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Qb(n, e.name), invalid: i, onChange: r });
}
function Kn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function ep(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function ap({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Kn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(Zb, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Xb, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function tp({ stages: e, onChange: a, catalogue: n }) {
  const r = ep(e.length), l = qn(), i = (c, d) => {
    const u = Hn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Fn(Kn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(ap, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(zn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const np = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], rp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], lp = "A new stream starts as a draft. Nothing runs on it until you publish it.", op = "Create is disabled: name the stream and give it a key first.", ip = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function sp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function cp({ stages: e, onMove: a }) {
  const n = qn(), r = (l, i) => {
    const s = Hn(l, i);
    n.moved({ id: e[l].id, direction: i }, Fn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(zn, { text: n.announcement })
  ] });
}
function dp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: lp }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function up(e, a) {
  return e !== "" && a !== "" ? null : op;
}
function mp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = rp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => sp(n, r)), [ae, Ge] = p(e.stages ?? np), [Ue, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ue }, ge = up(m, v);
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
      /* @__PURE__ */ t(Bn, { label: "Stream colour", steps: n, value: le, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(cp, { stages: ae, onMove: (Oe, vr) => Ge(Xa(ae, Oe, vr)) })
    ] }),
    /* @__PURE__ */ t($n, { legend: "Loop policy", options: l, value: Ue, onChange: R }),
    /* @__PURE__ */ t(dp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Gn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], hp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function wp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Gn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function fp(e, a) {
  return _p(e) && vp(e, a) && bp(e);
}
function _p(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function vp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function bp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function pp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function gp({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function yp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(gp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: hp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Np({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function kp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function $p(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = wp(l, s, d, m, v, L), Le = fp(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ge = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Bn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ue = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: pp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Np, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(kp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ge, owner: Ue }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: ip })
        ] }),
        /* @__PURE__ */ t(tp, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t($n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Gn, onChange: y }) }),
      /* @__PURE__ */ t(yp, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function v2(e) {
  return "presentation" in e ? /* @__PURE__ */ t($p, { ...e }) : /* @__PURE__ */ t(mp, { ...e });
}
const Cp = "_row_bs8hc_2", Sp = "_cell_bs8hc_6", Rp = "_condition_bs8hc_11", Tp = "_action_bs8hc_18", xp = "_contract_bs8hc_24", Lp = "_contractCondition_bs8hc_33", Ap = "_contractAction_bs8hc_39", Z = {
  row: Cp,
  cell: Sp,
  condition: Rp,
  action: Tp,
  contract: xp,
  contractCondition: Lp,
  contractAction: Ap
}, Un = ["advance", "block", "escalate", "requestReview"], Ft = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ct(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: Ft[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Un.map((l) => ({ value: l, label: Ft[l] }))
    }
  );
}
function Ep({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ct(e, a, n) })
  ] });
}
function Ip({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ct(e, a, n) })
  ] });
}
function Mp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const Bp = { two: Ip, four: Ep, contract: Mp };
function b2(e) {
  var n;
  if (!Un.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Bp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Pp = "_column_11id3_2", jp = "_head_11id3_17", Dp = "_index_11id3_23", Op = "_name_11id3_29", Hp = "_meta_11id3_38", Fp = "_mono_11id3_43", qp = "_gate_11id3_50", zp = "_reviewersLabel_11id3_57", Wp = "_reviewers_11id3_57", Kp = "_reviewer_11id3_57", Gp = "_agents_11id3_74", Up = "_workflowColumn_11id3_79", Vp = "_workflowHead_11id3_96", Yp = "_stageRow_11id3_102", Jp = "_stageLabel_11id3_109", Xp = "_workflowTitle_11id3_116", Qp = "_workflowMeta_11id3_122", Zp = "_workflowGate_11id3_127", eg = "_gateNote_11id3_135", ag = "_cardNote_11id3_140", tg = "_reviewerList_11id3_145", ng = "_reviewerRow_11id3_151", rg = "_reviewerMark_11id3_157", lg = "_reviewerName_11id3_167", og = "_terminalCard_11id3_173", ig = "_terminalCount_11id3_182", sg = "_workflowAgents_11id3_188", cg = "_mount_11id3_194", C = {
  column: Pp,
  head: jp,
  index: Dp,
  name: Op,
  meta: Hp,
  mono: Fp,
  gate: qp,
  reviewersLabel: zp,
  reviewers: Wp,
  reviewer: Kp,
  agents: Gp,
  workflowColumn: Up,
  workflowHead: Vp,
  stageRow: Yp,
  stageLabel: Jp,
  workflowTitle: Xp,
  workflowMeta: Qp,
  workflowGate: Zp,
  gateNote: eg,
  cardNote: ag,
  reviewerList: tg,
  reviewerRow: ng,
  reviewerMark: rg,
  reviewerName: lg,
  terminalCard: og,
  terminalCount: ig,
  workflowAgents: sg,
  mount: cg
}, dg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Vn(e) {
  return `${Math.round(e * 100)}%`;
}
function ug({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: Vn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function mg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function hg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: dg[e.kind] })
  ] });
}
function wg({ stage: e }) {
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
function fg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ug, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(mg, { stage: e }) : null;
}
function _g({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function vg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(hg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(wg, { stage: e }),
    /* @__PURE__ */ t(fg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(y_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(_g, { onMount: n })
  ] });
}
const bg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function pg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function gg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(pg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Vn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function yg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Ng({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: yg(e.rolledBackThisWeek) })
  ] });
}
function kg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function $g(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = kg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Cg({ stage: e, titleId: a }) {
  const n = bg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: $g(e) })
  ] });
}
function Sg(e) {
  return e === "entry" || e === "agent";
}
function Rg({ stage: e, onMount: a }) {
  return a === void 0 || !Sg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Tg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Cg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(gg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Ng, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Rg, { stage: e, onMount: n })
  ] });
}
function xg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function p2(e) {
  return xg(e) ? /* @__PURE__ */ t(Tg, { ...e }) : /* @__PURE__ */ t(vg, { ...e });
}
const Lg = "_row_1tdra_6", Ag = "_name_1tdra_12", Eg = "_compactRow_1tdra_13", Ig = "_compactName_1tdra_13", Mg = "_cell_1tdra_30", Bg = "_chain_1tdra_45", Pg = "_owner_1tdra_51", jg = "_mono_1tdra_57", Dg = "_compactCell_1tdra_79", Og = "_stack_1tdra_96", Hg = "_stat_1tdra_103", Fg = "_identityLine_1tdra_110", qg = "_identity_1tdra_110", zg = "_ownerLine_1tdra_140", Wg = "_link_1tdra_160", Kg = "_gateMark_1tdra_166", Gg = "_emptyChain_1tdra_171", Ug = "_arrow_1tdra_177", Vg = "_muted_1tdra_182", Yg = "_define_1tdra_187", Jg = "_statValue_1tdra_194", Xg = "_policyId_1tdra_200", Qg = "_sub_1tdra_205", g = {
  row: Lg,
  name: Ag,
  compactRow: Eg,
  compactName: Ig,
  cell: Mg,
  chain: Bg,
  owner: Pg,
  mono: jg,
  compactCell: Dg,
  stack: Og,
  stat: Hg,
  identityLine: Fg,
  identity: qg,
  ownerLine: zg,
  link: Wg,
  gateMark: Kg,
  emptyChain: Gg,
  arrow: Ug,
  muted: Vg,
  define: Yg,
  statValue: Jg,
  policyId: Xg,
  sub: Qg
};
function Yn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Zg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function ey(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Jn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function ay(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Jn(e.members)}`;
}
function ty(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: F(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: ay(e) })
  ] }) });
}
function Xn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function ny(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = da(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ry({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Xn, { name: l.name, gate: l.gate === !0, look: ny(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function ly(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : ry(e) });
}
function Qn(e) {
  return e === void 0 ? void 0 : !0;
}
function qt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Qn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function oy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function iy(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function sy({ stream: e, href: a, presentation: n }) {
  const r = ey(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Yn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    ty(e, a),
    ly(e),
    qt(iy(e.agents), e.agents === void 0 ? void 0 : Zg(e.agents), "—"),
    oy(e.policy),
    qt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function cy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function g2(e) {
  if (cy(e)) return sy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Yn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: F(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Xn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Jn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Qn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const dy = "_row_2u4ll_2", uy = "_name_2u4ll_16", my = "_scope_2u4ll_24", Sa = {
  row: dy,
  name: uy,
  scope: my
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function hy(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function wy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function fy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function _y({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function vy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function by(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function y2({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = wy(e, n), s = by(n);
  return /* @__PURE__ */ o(s, { className: hy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(fy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(vy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(_y, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const py = "_strip_4ppv9_2", gy = "_well_4ppv9_11", yy = "_head_4ppv9_18", Ny = "_name_4ppv9_24", ky = "_chart_4ppv9_32", $y = "_segment_4ppv9_38", Cy = "_detailedChart_4ppv9_44", Sy = "_rail_4ppv9_57", Ry = "_section_4ppv9_63", Ty = "_label_4ppv9_74", xy = "_note_4ppv9_91", K = {
  strip: py,
  well: gy,
  head: yy,
  name: Ny,
  chart: ky,
  segment: $y,
  detailedChart: Cy,
  rail: Sy,
  section: Ry,
  label: Ty,
  note: xy
}, Ly = "No item in flight to preview.", Ay = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Ey = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ra = 100;
function Iy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function My({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: Iy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function By(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Py({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${K.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, n) => /* @__PURE__ */ t(
      "rect",
      {
        x: String(n * Ra),
        y: "0",
        width: String(Ra),
        height: "40",
        style: { fill: pe(a.streamStep, "chip") }
      },
      a.key + String(n)
    )) }),
    /* @__PURE__ */ t("figcaption", { className: "ward-seglabels", children: e.map((a, n) => /* @__PURE__ */ t("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(n))) })
  ] });
}
function Zn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function wa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function jy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Ly }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Da, { item: { ...e, streamStep: da(n.streamStep) }, onOpen: Zn(r), feed: null }) });
}
function Dy({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(De, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Oy(e) {
  const a = By(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(wa, { label: "Board card", children: /* @__PURE__ */ t(jy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(wa, { label: "Streams index row", children: /* @__PURE__ */ t(Dy, { draft: n }) }),
    /* @__PURE__ */ o(wa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Py, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Ay })
    ] }),
    /* @__PURE__ */ t(wa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Ey }) })
  ] });
}
function Hy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(De, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Da, { item: { ...a, streamStep: e.streamStep }, onOpen: Zn(r) }) }),
    /* @__PURE__ */ t(My, { draft: e, streams: n })
  ] });
}
function N2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Oy, { ...e }) : /* @__PURE__ */ t(Hy, { ...e });
}
const Fy = "_row_ixlg5_6", qy = "_headCell_ixlg5_10", zy = "_cell_ixlg5_11", Wy = "_name_ixlg5_23", Ky = "_consequence_ixlg5_29", Gy = "_governed_ixlg5_36", Uy = "_control_ixlg5_42", Vy = "_byRole_ixlg5_48", Yy = "_webControl_ixlg5_59", Jy = "_webConsequence_ixlg5_65", Xy = "_webGoverned_ixlg5_71", H = {
  row: Fy,
  headCell: qy,
  cell: zy,
  name: Wy,
  consequence: Ky,
  governed: Gy,
  control: Uy,
  byRole: Vy,
  webControl: Yy,
  webConsequence: Jy,
  webGoverned: Xy
};
function Qy({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
    /* @__PURE__ */ t(
      Ke,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function Zy({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(Qy, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function eN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function aN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ke,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${H.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function tN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(aN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webGoverned} ward-cellmeta`, children: eN(e) }) })
  ] });
}
function k2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(tN, { ...e }) : /* @__PURE__ */ t(Zy, { ...e });
}
const nN = "_row_vv64h_2", rN = "_cell_vv64h_6", lN = "_name_vv64h_25", oN = "_note_vv64h_30", iN = "_webName_vv64h_41", sN = "_webMeta_vv64h_47", V = {
  row: nN,
  cell: rN,
  name: lN,
  note: oN,
  webName: iN,
  webMeta: sN
}, er = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function cN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function dN({ component: e, onRestart: a }) {
  const n = N(), r = er[e.state], l = e.state === "drainFirst";
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
function uN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: cN(e.state) });
}
function mN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...er[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(uN, { component: e, onRestart: a }) })
  ] });
}
function $2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(mN, { ...e }) : /* @__PURE__ */ t(dN, { ...e });
}
const hN = "_row_jcm5k_7", wN = "_cell_jcm5k_11", fN = "_next_jcm5k_28", _N = "_headCell_jcm5k_38", vN = "_webId_jcm5k_77", bN = "_webPurpose_jcm5k_83", pN = "_webMeta_jcm5k_91", gN = "_webUrgent_jcm5k_97", q = {
  row: hN,
  cell: wN,
  next: fN,
  headCell: _N,
  webId: vN,
  webPurpose: bN,
  webMeta: pN,
  webUrgent: gN
}, yN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, NN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, ar = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], kN = Object.fromEntries(ar.map((e) => [e.key, e]));
function Ye({ column: e, children: a }) {
  const n = kN[e];
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
function C2() {
  return /* @__PURE__ */ t("tr", { children: ar.map((e) => /* @__PURE__ */ t(
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
function $N({ cred: e }) {
  const a = yN[e.state];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t(Ye, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Ye, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Ye, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Ye, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Ye, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Ye, { column: "next", children: /* @__PURE__ */ t("span", { className: q.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function CN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ${q.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function SN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(CN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...NN[e.state] }) })
  ] });
}
function S2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(SN, { ...e }) : /* @__PURE__ */ t($N, { ...e });
}
const RN = "_card_17zba_2", TN = "_head_17zba_11", xN = "_env_17zba_18", LN = "_version_17zba_25", AN = "_meta_17zba_32", EN = "_webCard_17zba_37", IN = "_webRow_17zba_47", MN = "_webTitle_17zba_55", BN = "_webLine_17zba_65", PN = "_webVersion_17zba_72", jN = "_webMeta_17zba_77", U = {
  card: RN,
  head: TN,
  env: xN,
  version: LN,
  meta: AN,
  webCard: EN,
  webRow: IN,
  webTitle: MN,
  webLine: BN,
  webVersion: PN,
  webMeta: jN
}, zt = { dev: "Dev", uat: "UAT", prod: "Prod" }, tr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function DN({ env: e }) {
  const a = tr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": zt[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: zt[e.env] }),
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
function ON(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function HN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...tr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: ON(e) })
  ] });
}
function R2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(HN, { ...e }) : /* @__PURE__ */ t(DN, { ...e });
}
const FN = "_panel_1hmja_2", qN = "_line_1hmja_8", zN = "_actions_1hmja_14", fa = {
  panel: FN,
  line: qN,
  actions: zN
};
function T2(e) {
  return /* @__PURE__ */ o("div", { className: fa.panel, children: [
    /* @__PURE__ */ t("p", { className: fa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: fa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: fa.line, children: e.note ?? "" })
  ] });
}
const WN = "_upload_13fcl_2", KN = "_preview_13fcl_7", GN = "_mark_13fcl_17", UN = "_empty_13fcl_22", VN = "_actions_13fcl_28", YN = "_input_13fcl_33", JN = "_reasons_13fcl_41", XN = "_reason_13fcl_41", QN = "_accepted_13fcl_57", te = {
  upload: WN,
  preview: KN,
  mark: GN,
  empty: UN,
  actions: VN,
  input: YN,
  reasons: JN,
  reason: XN,
  accepted: QN
}, nr = 1.5, rr = 22, Ta = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${nr}px at ${rr}px`], ZN = [Se[1], Se[2], Ta, Ie], e1 = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", Ta],
  ["foreignObject", Ta],
  ["a", Ie],
  ["use", Ie],
  ["style", Ie],
  ["feImage", Ie],
  ["set", Ie]
]), a1 = "http://www.w3.org/2000/svg", t1 = "http://www.w3.org/2000/xmlns/", n1 = /* @__PURE__ */ new Set([
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
]), r1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, l1 = /url\s*\(|['"\\]/i;
function o1() {
  return { ok: !1, reasons: [Se[1]] };
}
function lr(e) {
  return e.namespaceURI === a1;
}
function i1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && lr(a) ? a : null;
  } catch {
    return null;
  }
}
function s1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function c1(e) {
  return e1.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function d1(e) {
  return l1.test(e.replace(mt, ""));
}
function u1(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || d1(e.value) ? Ie : void 0;
}
function m1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(c1(n));
    for (const r of Array.from(n.attributes)) a.add(u1(r));
  }
  return ZN.filter((n) => a.has(n));
}
function h1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? rr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < nr;
  }) ? [Se[3]] : [];
}
function w1(e) {
  if (e.namespaceURI === t1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (r1.has(a) || a.startsWith("stroke"));
}
function f1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && lr(a) && n1.has(a.localName);
}
function _1(e, a) {
  f1(a) ? a.nodeType === Node.ELEMENT_NODE && or(a) : e.removeChild(a);
}
function or(e) {
  for (const a of Array.from(e.attributes)) w1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) _1(e, a);
  return e;
}
function v1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function b1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function p1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of v1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function g1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function y1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = p1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), g1(l, r);
  }
  return e;
}
function x2(e) {
  const a = i1(e);
  if (a === null) return o1();
  const n = [...s1(a), ...m1(a), ...h1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(y1(or(a), b1(e))) };
}
const N1 = "Mark accepted.", k1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, $1 = new Set(Zt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function C1(e) {
  return e !== void 0 && (k1.test(e) || $1.has(e)) ? e : void 0;
}
function S1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": C1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function R1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function T1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function x1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: N1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function L1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(x1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${R1(e, n)}`, role: "status", children: T1(e, n) });
}
function Wt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function L2({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(S1, { current: e }),
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
      /* @__PURE__ */ t(b, { ...Wt(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...Wt(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(L1, { result: s, presentation: r })
  ] });
}
const A1 = "_row_o3t6y_7", E1 = "_cell_o3t6y_11", I1 = "_head_o3t6y_28", M1 = "_name_o3t6y_34", B1 = "_pinned_o3t6y_42", P1 = "_headCell_o3t6y_49", j1 = "_webName_o3t6y_88", D1 = "_webMeta_o3t6y_95", O1 = "_webWarn_o3t6y_103", P = {
  row: A1,
  cell: E1,
  head: I1,
  name: M1,
  pinned: B1,
  headCell: P1,
  webName: j1,
  webMeta: D1,
  webWarn: O1
}, ht = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, ir = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], H1 = Object.fromEntries(ir.map((e) => [e.key, e]));
function F1(e, a) {
  return `mcp.${e}.${a}`;
}
function q1(e) {
  return Object.keys(ht).includes(e);
}
function z1(e) {
  return ht[e !== void 0 && q1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = H1[e];
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
function A2() {
  return /* @__PURE__ */ t("tr", { children: ir.map((e) => /* @__PURE__ */ t(
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
function W1({ server: e }) {
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
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => F1(e.name, n)).join(" · ") })
  ] });
}
function K1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function G1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function U1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function V1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Y1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function J1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: K1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...G1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(U1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...z1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(V1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Y1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function E2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(J1, { ...e }) : /* @__PURE__ */ t(W1, { ...e });
}
const X1 = "_row_1ibo7_2", Q1 = "_headCell_1ibo7_14", Z1 = "_cell_1ibo7_15", ek = "_name_1ibo7_26", ak = "_consequence_1ibo7_32", tk = "_reason_1ibo7_38", nk = "_value_1ibo7_44", rk = "_webRow_1ibo7_60", lk = "_webSetting_1ibo7_73", ok = "_webName_1ibo7_81", ik = "_webConsequence_1ibo7_89", sk = "_webControl_1ibo7_95", ck = "_webState_1ibo7_109", dk = "_webChip_1ibo7_114", I = {
  row: X1,
  headCell: Q1,
  cell: Z1,
  name: ek,
  consequence: ak,
  reason: tk,
  value: nk,
  webRow: rk,
  webSetting: lk,
  webName: ok,
  webConsequence: ik,
  webControl: sk,
  webState: ck,
  webChip: dk
}, sr = 104, cr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function uk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ke, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Nn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function mk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = cr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(uk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: sr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function dr(e, a) {
  return String(e ?? a);
}
function hk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function wk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? dr(e.value, "—");
}
function fk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ke, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function _k(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(fk, { ...e });
  const l = hk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Nn, { options: l, value: dr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: wk(a) });
}
function vk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(_k, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: sr }, children: /* @__PURE__ */ t(h, { ...cr[n], size: "tag" }) })
  ] });
}
function I2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(vk, { ...e }) : /* @__PURE__ */ t(mk, { ...e });
}
const bk = "_label_h9m4w_7", pk = "_name_h9m4w_15", gk = "_column_h9m4w_24", yk = "_webFrame_h9m4w_57", Nk = "_webHead_h9m4w_62", kk = "_webHeadLabel_h9m4w_74", $k = "_webLabel_h9m4w_117", Ck = "_webColumns_h9m4w_124", Sk = "_webGroup_h9m4w_130", Rk = "_webPeople_h9m4w_131", Tk = "_webVia_h9m4w_132", xk = "_webMeta_h9m4w_161", z = {
  label: bk,
  name: pk,
  column: gk,
  webFrame: yk,
  webHead: Nk,
  webHeadLabel: kk,
  webLabel: $k,
  webColumns: Ck,
  webGroup: Sk,
  webPeople: Rk,
  webVia: Tk,
  webMeta: xk
}, Lk = {
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
function Ak(e) {
  if (!e.matrixRole) return;
  const a = Lk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Ek({ node: e }) {
  const a = Ak(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Ik, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Ik({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Mk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    xn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Ek, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Bk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Pk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function jk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Dk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Ok({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Pk, {}),
    /* @__PURE__ */ t(gm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      xn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(jk, { row: n }),
        detail: /* @__PURE__ */ t(Bk, { row: n }),
        expanded: Dk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function M2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ok, { ...e }) : /* @__PURE__ */ t(Mk, { ...e });
}
const Hk = "_runbook_b9agc_2", Fk = "_list_b9agc_7", qk = "_step_b9agc_15", zk = "_numeral_b9agc_21", Wk = "_body_b9agc_28", Kk = "_head_b9agc_34", Gk = "_title_b9agc_40", Uk = "_detail_b9agc_45", Vk = "_actions_b9agc_50", Yk = "_webList_b9agc_56", Jk = "_webStep_b9agc_60", Xk = "_webBody_b9agc_66", Qk = "_webTitle_b9agc_74", Zk = "_webDetail_b9agc_78", A = {
  runbook: Hk,
  list: Fk,
  step: qk,
  numeral: zk,
  body: Wk,
  head: Kk,
  title: Gk,
  detail: Uk,
  actions: Vk,
  webList: Yk,
  webStep: Jk,
  webBody: Xk,
  webTitle: Qk,
  webDetail: Zk
}, ur = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function mr(e) {
  return String(e + 1).padStart(2, "0");
}
function e$({ step: e, index: a, connection: n }) {
  const r = ur[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: mr(a) }),
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
function a$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(e$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function t$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: mr(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...ur[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function n$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(t$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function B2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(n$, { ...e }) : /* @__PURE__ */ t(a$, { ...e });
}
const r$ = "_list_1gu6a_2", l$ = "_check_1gu6a_10", o$ = "_body_1gu6a_16", i$ = "_text_1gu6a_23", s$ = "_pending_1gu6a_32", c$ = "_measured_1gu6a_37", Xe = {
  list: r$,
  check: l$,
  body: o$,
  text: i$,
  pending: s$,
  measured: c$
};
function d$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function u$({ check: e }) {
  const a = d$(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Xe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(lt, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Xe.body, children: [
      /* @__PURE__ */ t("span", { className: Xe.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Xe.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ t("span", { className: Xe.measured, children: e.measured })
  ] });
}
function P2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(u$, { check: a }, a.text)) });
}
const m$ = "_root_a6xzy_2", h$ = "_list_a6xzy_10", w$ = "_line_a6xzy_21", f$ = "_at_a6xzy_48", _$ = "_text_a6xzy_52", v$ = "_foot_a6xzy_56", b$ = "_idle_a6xzy_68", p$ = "_caret_a6xzy_76", g$ = "_jump_a6xzy_83", he = {
  root: m$,
  list: h$,
  line: w$,
  at: f$,
  text: _$,
  foot: v$,
  idle: b$,
  caret: p$,
  jump: g$
}, y$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : y$.format(new Date(e));
}
const N$ = { warn: "warning", ok: "ok" };
function k$({ kind: e }) {
  const a = N$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function $$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function C$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t($$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const S$ = 8;
function R$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > S$;
}
function T$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const hr = Te(null);
function j2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Yt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(hr.Provider, { value: i, children: n });
}
function x$() {
  const e = Re(hr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function D2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = x$(), [u, m] = p(!1), w = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(R$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(k$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(C$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(T$, { shown: u, onJump: v })
    ] })
  ] });
}
const L$ = "_row_1k8wl_2", A$ = "_head_1k8wl_14", E$ = "_author_1k8wl_20", I$ = "_eta_1k8wl_25", M$ = "_edited_1k8wl_26", B$ = "_body_1k8wl_32", P$ = "_reason_1k8wl_37", j$ = "_actions_1k8wl_42", Ne = {
  row: L$,
  head: A$,
  author: E$,
  eta: I$,
  edited: M$,
  body: B$,
  reason: P$,
  actions: j$
}, D$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function O$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function H$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function F$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function q$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function z$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(H$, { ...e }) : /* @__PURE__ */ t(F$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function O2(e) {
  const { comment: a } = e;
  q$(e);
  const n = N(), r = `${n}-unavailable`, l = D$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: O$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(z$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const W$ = "_root_c46wj_2", K$ = "_attach_c46wj_11", G$ = "_actions_c46wj_17", U$ = "_reply_c46wj_23", V$ = "_replyRow_c46wj_28", Y$ = "_sendsAs_c46wj_42", ea = {
  root: W$,
  attach: K$,
  actions: G$,
  reply: U$,
  replyRow: V$,
  sendsAs: Y$
};
function wr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function J$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = wr(e), s = N();
  return /* @__PURE__ */ o("div", { className: ea.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: ea.replyRow, children: [
      /* @__PURE__ */ t(M, { variant: "reply", labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ t(b, { variant: "ghost", describedBy: s, onClick: () => r(n, l), children: "Send" })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: ea.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function H2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(J$, { ...e }) : /* @__PURE__ */ t(X$, { ...e });
}
function X$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = wr(e);
  return /* @__PURE__ */ o("div", { className: ea.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: ea.attach, children: [
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
    /* @__PURE__ */ o("div", { className: ea.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const Q$ = "_list_1yhks_2", Z$ = "_item_1yhks_6", e0 = "_body_1yhks_22", a0 = "_text_1yhks_28", t0 = "_evidence_1yhks_37", n0 = "_consequence_1yhks_49", r0 = "_note_1yhks_54", We = {
  list: Q$,
  item: Z$,
  body: e0,
  text: a0,
  evidence: t0,
  consequence: n0,
  note: r0
};
function l0({ criterion: e }) {
  return /* @__PURE__ */ t(De, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Kt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function o0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function i0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: We.body, children: [
    /* @__PURE__ */ t("span", { className: We.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: We.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: We.consequence, children: o0(e.why) })
    ] })
  ] });
}
function s0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: We.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(l0, { criterion: e }),
    /* @__PURE__ */ t(i0, { criterion: e })
  ] });
}
function F2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${We.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(s0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: We.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const c0 = "_list_dwhoz_2", d0 = "_rung_dwhoz_6", u0 = "_name_dwhoz_18", m0 = "_actor_dwhoz_32", pa = {
  list: c0,
  rung: d0,
  name: u0,
  actor: m0
}, h0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function w0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = h0[e.state];
  return /* @__PURE__ */ o("li", { className: pa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: pa.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${pa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function q2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${pa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(w0, { rung: a }, a.name)) });
}
const f0 = "_sheet_pw37w_2", _0 = "_title_pw37w_9", v0 = "_stage_pw37w_15", b0 = "_effects_pw37w_20", p0 = "_effect_pw37w_20", g0 = "_numeral_pw37w_31", y0 = "_effectText_pw37w_38", N0 = "_refusals_pw37w_43", k0 = "_reasons_pw37w_52", $0 = "_reason_pw37w_52", C0 = "_actions_pw37w_62", ue = {
  sheet: f0,
  title: _0,
  stage: v0,
  effects: b0,
  effect: p0,
  numeral: g0,
  effectText: y0,
  refusals: N0,
  reasons: k0,
  reason: $0,
  actions: C0
};
function S0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function z2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      nu,
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
      /* @__PURE__ */ t(S0, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const R0 = "_list_1rowi_2", T0 = "_path_1rowi_7", x0 = "_head_1rowi_21", L0 = "_label_1rowi_28", A0 = "_consequence_1rowi_35", E0 = "_ask_1rowi_36", Ze = {
  list: R0,
  path: T0,
  head: x0,
  label: L0,
  consequence: A0,
  ask: E0
}, Za = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Gt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Ut(e) {
  return e ? "primary" : "secondary";
}
function I0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: Ze.ask, id: r, children: e.askInstead })
  ] });
}
function M0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ze.path, "data-allowed": e.allowed, "data-role": Gt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ze.head, children: [
      /* @__PURE__ */ t("span", { className: Ze.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Gt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: Ze.consequence, children: e.consequence }),
    /* @__PURE__ */ t(I0, { path: e, primary: a, onChoose: n })
  ] });
}
function W2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: Ze.list, children: e.map((n, r) => /* @__PURE__ */ t(M0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const B0 = "_list_1m7i0_2", P0 = "_item_1m7i0_6", j0 = "_node_1m7i0_18", D0 = "_body_1m7i0_24", O0 = "_head_1m7i0_30", H0 = "_stage_1m7i0_36", F0 = "_version_1m7i0_41", q0 = "_sentence_1m7i0_49", z0 = "_meta_1m7i0_54", $e = {
  list: B0,
  item: P0,
  node: j0,
  body: D0,
  head: O0,
  stage: H0,
  version: F0,
  sentence: q0,
  meta: z0
}, W0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function K0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function G0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(De, { size: 9, kind: W0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(K0, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function K2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(G0, { entry: a }, a.stage + String(n))) });
}
const U0 = "_thread_1e70p_3", V0 = "_turn_1e70p_8", Y0 = "_who_1e70p_27", J0 = "_body_1e70p_32", ga = {
  thread: U0,
  turn: V0,
  who: Y0,
  body: J0
}, fr = Te(!1);
function G2({ children: e, density: a }) {
  return /* @__PURE__ */ t(fr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ga.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function U2({ turn: e }) {
  if (!Re(fr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ga.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ga.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ga.body} ward-chat-body`, children: e.body })
  ] });
}
const X0 = "_list_yiolt_3", Q0 = "_row_yiolt_7", Z0 = "_label_yiolt_20", eC = "_n_yiolt_26", aC = "_cause_yiolt_33", oa = {
  list: X0,
  row: Q0,
  label: Z0,
  n: eC,
  cause: aC
};
function tC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const nC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function rC({ row: e, formatNumber: a }) {
  return tC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(De, { size: 8, ...nC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(lC, { cause: e.cause })
  ] });
}
function lC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function V2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(rC, { row: n, formatNumber: a }, n.label)) });
}
const oC = "_root_1jxwp_2", iC = {
  root: oC
};
function Y2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: iC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Oa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const sC = "_row_dhbre_3", cC = "_key_dhbre_13", dC = "_stack_dhbre_24", uC = "_value_dhbre_32", mC = "_evidence_dhbre_39", hC = "_mark_dhbre_47", Je = {
  row: sC,
  key: cC,
  stack: dC,
  value: uC,
  evidence: mC,
  mark: hC
};
function wC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function J2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Je.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Je.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Je.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Je.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Je.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Je.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(wC, { state: e.state }) })
  ] });
}
const fC = "_cell_gh2sd_2", _C = {
  cell: fC
}, vC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function bC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function pC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function gC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: bC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function yC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function X2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  pC(e, n);
  const r = yC(e);
  return /* @__PURE__ */ t(
    vu,
    {
      label: "Rejection routing",
      columns: vC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: _C.cell, "data-norerun": l.noRerun ? !0 : void 0, children: gC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(lh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const NC = "_row_1f2re_2", kC = "_title_1f2re_12", $C = "_turns_1f2re_18", CC = "_waiting_1f2re_19", SC = "_resolved_1f2re_20", RC = "_activity_1f2re_21", TC = "_cost_1f2re_28", xC = "_link_1f2re_29", LC = "_tableLink_1f2re_47", AC = "_tableRecord_1f2re_48", EC = "_tableRow_1f2re_59", IC = "_tableTitle_1f2re_71", MC = "_tableResolved_1f2re_76", BC = "_tableMeta_1f2re_87", PC = "_tableCost_1f2re_94", jC = "_tableActivity_1f2re_95", DC = "_tableState_1f2re_105", O = {
  row: NC,
  title: kC,
  turns: $C,
  waiting: CC,
  resolved: SC,
  activity: RC,
  cost: TC,
  link: xC,
  tableLink: LC,
  tableRecord: AC,
  tableRow: EC,
  tableTitle: IC,
  tableResolved: MC,
  tableMeta: BC,
  tableCost: PC,
  tableActivity: jC,
  tableState: DC
}, _r = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function OC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function HC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function FC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const qC = { duplicate: "Closed · duplicate" };
function zC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: O.tableMeta, text: `waiting on ${e}` });
}
function WC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: O.tableCost, children: e === void 0 ? null : ne(e) });
}
function KC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${O.tableRecord} ward-target`, href: F(e.href), children: `→ ${e.key}` });
}
function GC({ session: e, href: a }) {
  const n = _r[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${O.tableLink} ward-target`, href: F(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: O.tableMeta, children: HC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      FC(e.resolved),
      /* @__PURE__ */ t(zC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(WC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: O.tableActivity, children: OC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: qC[e.state] ?? n.label }),
      /* @__PURE__ */ t(KC, { link: e.link })
    ] }) })
  ] });
}
function UC({ session: e }) {
  const a = _r[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: O.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: O.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: O.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: O.link, href: F(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Q2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(GC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(UC, { session: e.session });
}
const VC = "_block_1yy2v_3", YC = "_list_1yy2v_9", JC = "_line_1yy2v_14", et = {
  block: VC,
  list: YC,
  line: JC
}, XC = { warn: "warning", ok: "ok" };
function QC({ kind: e }) {
  const a = XC[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function ZC({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(QC, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function Z2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(ZC, { line: n }, `${r}-${n.text}`)) }) });
}
const eS = "_band_tt7hp_1", aS = "_head_tt7hp_8", tS = "_cell_tt7hp_19", nS = "_index_tt7hp_35", rS = "_title_tt7hp_42", lS = "_note_tt7hp_48", oS = "_cellTitle_tt7hp_53", iS = "_cellBody_tt7hp_58", sS = "_tag_tt7hp_64", ye = {
  band: eS,
  head: aS,
  cell: tS,
  index: nS,
  title: rS,
  note: lS,
  cellTitle: oS,
  cellBody: iS,
  tag: sS
}, Vt = 4;
function eR({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Vt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Vt}-cell grid`);
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
  pS as ACCENT_PRESETS,
  DS as ActionStack,
  D2 as ActivityConsole,
  TS as AdminIcon,
  y_ as AgentCard,
  xS as AppShell,
  N2 as AppearanceStrip,
  eR as Band,
  BS as BarChart,
  Oh as BoardColumn,
  a2 as BoardFootnote,
  t2 as BoardHeader,
  SS as BoardIcon,
  GS as BoardScroller,
  b as Btn,
  bS as CHIP_ROLES,
  ar as CREDENTIAL_COLUMNS,
  MS as Callout,
  k2 as CapabilityRow,
  VS as CardGrid,
  U2 as ChatMessage,
  rn as Checkbox,
  h as Chip,
  ta as ClampText,
  O2 as ClarificationRow,
  m2 as ClauseRuleRow,
  u2 as ClauseRules,
  Bn as ColourLadder,
  $2 as ComponentRow,
  H2 as Composer,
  r2 as ConfigRow,
  n2 as ConfigRowHead,
  ot as ConnectionMark,
  j2 as ConsoleAnnounceProvider,
  G2 as Conversation,
  nu as CostMeter,
  S2 as CredentialRow,
  C2 as CredentialRowHead,
  F2 as CriteriaList,
  gi as Crumb,
  gS as DENSITIES,
  V2 as DeliveryHealth,
  JS as DeniedState,
  $S as DisabledScope,
  w2 as DryRunRail,
  lh as EmptyState,
  R2 as EnvCard,
  M as Field,
  YS as FilteredEmpty,
  WS as FormStack,
  Oa as GateChecklist,
  q2 as GateLadder,
  vu as Grid,
  _2 as HandoffRuleRow,
  f2 as HandoffRules,
  CS as HomeIcon,
  l2 as ItemDrawer,
  T2 as KeyPanel,
  Pr as LIVE_EVENT_TYPES,
  zf as LegacyBoardColumn,
  i2 as LegacyBoardHeader,
  s2 as LegacyConfigRow,
  d2 as LegacyItemDrawer,
  Pf as LegacyOverCapNote,
  c2 as LegacyPreviewRail,
  En as LegacyWorkCard,
  xe as LiveIndicator,
  XS as LoadFailed,
  e2 as Loading,
  ir as MCP_SERVER_COLUMNS,
  lt as Mark,
  L2 as MarkUpload,
  De as Marker,
  E2 as McpServerRow,
  A2 as McpServerRowHead,
  Os as Menu,
  Ss as MenuButton,
  v2 as NewStreamModal,
  sh as OverCapNote,
  na as Overlay,
  h2 as PARTIAL_STEP_REASON,
  sr as POLICY_CHIP_WIDTH,
  FS as PageFrame,
  IS as PageHeader,
  PS as PlainList,
  I2 as PolicyRow,
  o2 as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Un as RULE_ACTIONS,
  $n as Radio,
  Y2 as ReadyChecklist,
  zS as RecordSection,
  z2 as RequeueSheet,
  W2 as ResolveBlock,
  J2 as ResolvedFieldRow,
  M2 as RoleMatrixRow,
  X2 as RoutingTable,
  b2 as RuleRow,
  B2 as RunbookSteps,
  Br as STREAM_STEPS,
  KS as SectionBand,
  At as SectionHeader,
  Nn as SegmentedControl,
  hn as Select,
  Q2 as SessionRow,
  ES as Sidebar,
  p2 as StageColumn,
  US as StageGrid,
  K2 as StageHistory,
  tp as StageListEditor,
  QS as StaleStrip,
  Pa as StatStrip,
  OS as StatTiles,
  g2 as StreamRow,
  RS as StudioIcon,
  qS as SubjectRail,
  Ke as Switch,
  AS as TabLinks,
  jS as TableHead,
  LS as Tabs,
  wS as ThemeProvider,
  y2 as ToolRow,
  HS as TopBar,
  gm as Tree,
  xn as TreeRow,
  Z2 as TypedInputBlock,
  bo as UNSAFE_HREF,
  P2 as ValidationList,
  mS as VisibilityProvider,
  hS as Visible,
  vS as WARD_VERSION,
  Da as WorkCard,
  ZS as WriteUnavailableStrip,
  OC as agoSince,
  $r as clock,
  pp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  _S as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  X_ as ladderValidation,
  z1 as mcpConnectionChip,
  F1 as mcpToolName,
  ne as money,
  we as ms,
  Ln as ordered,
  Xt as ratio,
  cN as restartLabel,
  F as safeHref,
  de as stamp,
  tt as stream,
  NS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  Dr as streamHex,
  yS as streamVars,
  _a as useBorderFlash,
  je as useDisabledScope,
  Er as useFocusTrap,
  kS as useLiveFeed,
  fS as useReturnFocus,
  xa as useRovingTabindex,
  nt as useTicker,
  Cr as useVisible,
  W as v,
  x2 as validateMark,
  da as validatedStep,
  Zt as validatedStreamSteps
};
