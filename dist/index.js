import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Vt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as X, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as _r, Children as vr, Fragment as br } from "react";
import { createPortal as pr, flushSync as Yt } from "react-dom";
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
const gr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = gr.formatToParts(new Date(e)), n = (r) => {
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
const yr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Nr(e) {
  return yr.format(new Date(e));
}
const Xt = Te(/* @__PURE__ */ new Set());
function CS({ hidden: e, children: a }) {
  const n = Vt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Xt.Provider, { value: n, children: a });
}
function kr(e) {
  return !Re(Xt).has(e);
}
function SS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: kr(e) ? a : n });
}
const $r = "(prefers-color-scheme: dark)";
function _t() {
  return typeof window.matchMedia == "function" ? window.matchMedia($r) : null;
}
function Cr(e) {
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
function Sr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function RS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Cr(e === "system");
  return Oa("data-theme", Sr(e, l)), Oa("data-accent", a), Oa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Rr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Tr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function xr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Tr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Lr(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Rr));
      xr(n, e.current, r);
    },
    [e]
  ) };
}
function TS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const vt = { ArrowUp: -1, ArrowDown: 1 }, bt = { ArrowLeft: -1, ArrowRight: 1 }, Ar = (e, a, n) => Math.min(n, Math.max(a, e));
function Er(e, a) {
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
      const w = Math.max(0, m.indexOf(a)), v = Er(u.key, e);
      v !== void 0 ? (u.preventDefault(), s(m[Ar(w + v, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
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
const xS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, LS = "0.2.0", AS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ir = [1, 2, 3, 4, 5, 6], Qt = [1, 2, 3], Mr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], ES = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], IS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
  return Ir.includes(e);
}
function sa(e) {
  return Qt.includes(e);
}
function Br(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function MS(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Pr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function qr(e) {
  if (!Aa(e)) throw new Error("unvalidated stream step");
  return Pr[e];
}
function pt(e) {
  return typeof e != "string" ? null : Mr.includes(e) ? e : null;
}
function jr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Dr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Or(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Hr(e, a, n) {
  const r = jr(e);
  if (r === null) return null;
  const l = pt(n) ?? pt(r.type);
  return l === null ? null : { ...r, type: l, id: Dr(r, a), at: Or(r) };
}
function Fr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function zr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function BS(e, a) {
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
        const De = Hr(R, G, ge);
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
    const R = Date.now() - c.current, G = Fr(R, L.current);
    G && B(G);
    const ge = m.current;
    zr(R, y.current, ge) && Ue(ge);
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
const Wr = { blue: "running", orange: "waiting", green: "done" };
function Kr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function va(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Kr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Wr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => gt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Gr = "_root_1otpc_2", Ur = {
  root: Gr
};
function Vr(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${Nr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Vr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Ur.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Yr = "_app_yqy5k_1", Jr = "_side_yqy5k_30", Xr = "_sideTop_yqy5k_42", Qr = "_sideBody_yqy5k_56", Zr = "_iconRail_yqy5k_94", el = "_railItem_yqy5k_103", al = "_railIcon_yqy5k_124", tl = "_railDot_yqy5k_129", nl = "_railLetter_yqy5k_135", rl = "_main_yqy5k_140", ll = "_rail_yqy5k_103", ol = "_page_yqy5k_158", il = "_headerRow_yqy5k_167", sl = "_sidebarToggle_yqy5k_174", cl = "_headerSlot_yqy5k_179", dl = "_drawerSide_yqy5k_184", ul = "_root_yqy5k_220", ml = "_topbar_yqy5k_227", hl = "_mark_yqy5k_238", wl = "_brand_yqy5k_245", fl = "_tagline_yqy5k_251", _l = "_identity_yqy5k_257", vl = "_tools_yqy5k_258", bl = "_nav_yqy5k_268", pl = "_metadata_yqy5k_275", gl = "_actor_yqy5k_290", yl = "_detail_yqy5k_291", Nl = "_content_yqy5k_336", kl = "_toolsPanel_yqy5k_352", $l = "_skip_yqy5k_378", $ = {
  app: Yr,
  side: Jr,
  sideTop: Xr,
  sideBody: Qr,
  iconRail: Zr,
  railItem: el,
  railIcon: al,
  railDot: tl,
  railLetter: nl,
  main: rl,
  rail: ll,
  page: ol,
  headerRow: il,
  sidebarToggle: sl,
  headerSlot: cl,
  drawerSide: dl,
  root: ul,
  topbar: ml,
  mark: hl,
  brand: wl,
  tagline: fl,
  identity: _l,
  tools: vl,
  nav: bl,
  metadata: pl,
  actor: gl,
  detail: yl,
  content: Nl,
  toolsPanel: kl,
  skip: $l
};
function ca(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Cl = "_scope_1an6i_2", Sl = {
  scope: Cl
}, Zt = Te(null);
function PS({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Sl.scope} ward-disabled-scope`, children: [
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
const Rl = "_btn_tzr89_2", Tl = "_primary_tzr89_14", xl = "_destructive_tzr89_25", Ll = "_secondary_tzr89_35", Al = "_ghost_tzr89_40", El = "_overflow_tzr89_49", Il = "_sm_tzr89_56", Ml = "_disabled_tzr89_60", ma = {
  btn: Rl,
  primary: Tl,
  destructive: xl,
  secondary: Ll,
  ghost: Al,
  overflow: El,
  sm: Il,
  disabled: Ml
};
function Bl(e, a, n, r) {
  const l = a === "sm" ? [ma.sm, "ward-btn--sm"] : [], i = n ? [ma.disabled] : [];
  return [ma.btn, ma[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Pl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function ql(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function jl(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Dl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Ol(e, a, n) {
  return Dl(e.describedBy, a && n);
}
function Hl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Fl(e) {
  return e.children ?? e.label;
}
function b(e) {
  const a = qe();
  ql(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = jl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Bl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Ol(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Pl(n, e.controls),
        children: Fl(e)
      }
    ),
    /* @__PURE__ */ t(Hl, { id: s, reason: i })
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
const zl = "_scrim_18idy_2", Wl = "_drawer_18idy_10", Kl = "_sheet_18idy_14", Gl = "_modal_18idy_18", Ul = "_panel_18idy_23", Vl = "_start_18idy_39", Yl = "_header_18idy_62", Jl = "_title_18idy_70", Xl = "_body_18idy_74", Ql = "_close_18idy_101", Ce = {
  scrim: zl,
  drawer: Wl,
  sheet: Kl,
  modal: Gl,
  panel: Ul,
  start: Vl,
  header: Yl,
  title: Jl,
  body: Xl,
  close: Ql
}, Zl = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function eo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function ao(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function to(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !eo(r) && ao(e, r);
}
function no(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (to(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function ro(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function lo(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), no(n, a), n;
}
function oo(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), ro(e);
}
function yt(e) {
  return e !== null && Na.at(-1) === e;
}
function io(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = lo(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      oo(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => yt(r.current), []);
}
function so(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function co(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function uo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function mo(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function ho(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function wo(e) {
  const a = Re(Zl);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = wo(e.container), i = Ia("(min-width: 768px)"), s = so(e.kind, i), c = co(e, r), d = Lr(n), u = io(a, l, e.returnFocusTo), m = X(() => {
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
  }, [m]), pr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: mo(s),
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
            className: ho(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(uo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const fo = /^([a-z][a-z0-9+.-]*):/i, _o = /* @__PURE__ */ new Set(["http", "https"]), vo = "#";
function bo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = fo.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = bo(e);
  return a === void 0 || _o.has(a) ? e : vo;
}
function po(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function en(e) {
  const a = po(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function go(e, a) {
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
function yo(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function an(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = yo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), en(r);
  }, [e, a, n]);
}
const No = "_row_160e9_2", ko = {
  row: No
};
function $o(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return go(u, n), /* @__PURE__ */ t(r, { ref: u, className: [ko.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...$o(l, r), ...c, children: a });
}
const Co = "_icon_1ylqy_2", So = {
  icon: Co
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: So.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function qS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function jS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function DS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function OS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ro() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const tn = "ward:sidebar-collapsed", To = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function xo() {
  try {
    return window.localStorage.getItem(tn) === "true";
  } catch {
    return !1;
  }
}
function Lo(e) {
  try {
    window.localStorage.setItem(tn, String(e));
  } catch {
  }
}
function Ao(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Eo(e) {
  return e instanceof Element && e.closest(To) !== null;
}
function Io(e) {
  return e.key === "[" && !Ao(e) && !Eo(e.target);
}
function Mo(e) {
  const [a, n] = p(xo), r = () => {
    Lo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Io(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Bo() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Po({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function qo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: nn(e, !1) }) });
}
function jo(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: l, toggle: i } = Mo(r);
  return n === void 0 ? Do(r, l, i) : Oo(n, a, i);
}
function Do(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Oo(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const Ho = (e) => e ? "" : void 0;
function nn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function Fo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Ro, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function zo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Wo({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(zo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Ko({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Fo, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: nn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(Wo, { items: n ?? [], label: a })
  ] });
}
function Go({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i, collapsed: s }) {
  const c = r != null, d = Bo(), u = jo(i, d.narrow, s), m = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": Ho(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(Ko, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Po, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(qo, { sidebar: e, label: m, drawer: d })
  ] });
}
function Uo({ destinations: e, active: a }) {
  const n = f(null);
  return an(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Vo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function Yo() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Jo({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Xo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Qo(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Uo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Vo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Jo, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Zo(e) {
  const a = N(), n = Yo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Qo, { ...e, menu: n }),
    /* @__PURE__ */ t(Xo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function ei(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function HS(e) {
  return ei(e) ? /* @__PURE__ */ t(Go, { ...e }) : /* @__PURE__ */ t(Zo, { ...e });
}
const ai = "_root_197jc_2", ti = "_row_197jc_8", ni = "_box_197jc_14", ri = "_label_197jc_21", li = "_lockedNote_197jc_26", oi = "_consequence_197jc_34", ii = "_sample_197jc_69", He = {
  root: ai,
  row: ti,
  box: ni,
  label: ri,
  lockedNote: li,
  consequence: oi,
  sample: ii
};
function si(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function ci({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function di({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ui({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function rn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = qe(), l = si(e, r);
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
        /* @__PURE__ */ t(di, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(ui, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(ci, { id: n, text: e.consequence })
  ] });
}
const mi = "_chip_pq6tb_2", hi = {
  chip: mi
}, wi = {
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
function fi(e, a) {
  if (e === "stream") return _i(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = wi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function _i(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${hi.chip} ward-chip ward-chip--${e}`, style: fi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const vi = "_clamp_zn74g_3", Nt = {
  clamp: vi
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
const bi = "_root_13eei_3", pi = "_nav_13eei_8", gi = "_list_13eei_16", yi = "_item_13eei_24", Ni = "_link_13eei_44", ki = "_sep_13eei_54", $i = "_current_13eei_58", Ci = "_chips_13eei_62", Ae = {
  root: bi,
  nav: pi,
  list: gi,
  item: yi,
  link: Ni,
  sep: ki,
  current: $i,
  chips: Ci
};
function Si({ path: e, chips: a }) {
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
const Ri = 500;
function on(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function sn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Ri), e.current);
}
const ha = 4;
function Ti(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), l = Math.max(0, e.top - ha * 2);
  return a <= r || r >= l ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, l), maxHeight: l };
}
function xi(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Li(e, a, n, r) {
  return { ...Ti(e, a.height, n.height), left: xi(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ai(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ei(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = Ei(e), l = Ai(e, a), i = Li(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: ba(i.left - l.box.left), top: ba(i.top - l.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Ii(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function cn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Ii(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Mi = "_root_axvxm_2", Bi = "_trigger_axvxm_7", Pi = "_value_axvxm_32", qi = "_menu_axvxm_50", ji = "_find_axvxm_72", Di = "_list_axvxm_88", Oi = "_option_axvxm_99", Hi = "_check_axvxm_118", Fi = "_empty_axvxm_129", fe = {
  root: Mi,
  trigger: Bi,
  value: Pi,
  menu: qi,
  find: ji,
  list: Di,
  option: Oi,
  check: Hi,
  empty: Fi
}, zi = 7;
function Wi(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Ki(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Yt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Wi(e.options, l),
    findable: e.options.length > zi,
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
function Gi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Ui(e) {
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
function Vi(e) {
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
const Yi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Ji(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Yi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Xi({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function Qi({ menu: e, ids: a, focusRef: n }) {
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
function Zi({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Ui(a), s = f(null);
  cn(l, s);
  const c = (d) => {
    on(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Qi, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: un(a, Vi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Xi, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function es(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function mn(...e) {
  return e.filter(Boolean).join(" ");
}
function as(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ts({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
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
      disabled: e.disabled,
      title: s,
      ...Ji(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: as(e) })
    }
  );
}
function hn(e) {
  const a = qe(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Ki(n, s), u = Gi(d.open, c);
  return ln(d.open, i, () => d.close(!1)), es(d, l), /* @__PURE__ */ o("div", { ref: i, className: mn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ts, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(Zi, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const ns = "_field_13oav_2", rs = "_label_13oav_8", ls = "_labelHidden_13oav_15", os = "_control_13oav_25", is = "_mono_13oav_45", ss = "_area_13oav_50", cs = "_invalid_13oav_57", Pe = {
  field: ns,
  label: rs,
  labelHidden: ls,
  control: os,
  mono: is,
  area: ss,
  invalid: cs
}, ds = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, wn = (e) => `${e}-label`;
function us({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? ds : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ms({ props: e, controlProps: a, cls: n }) {
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
function hs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ws = { input: us, select: ms, textarea: hs };
function fs(e, a, n) {
  const r = ws[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function _s(e, a, n, r) {
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
function vs(e) {
  const a = e.mono ? [Pe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Pe.area] : [];
  return [Pe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function bs(e) {
  return e ? `${Pe.label} ${Pe.labelHidden} ward-field-label` : `${Pe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = _s(e, a, n, qe()), l = vs(e);
  return /* @__PURE__ */ o("div", { className: `${Pe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: wn(a), className: bs(e.labelHidden), htmlFor: a, children: e.label }),
    fs(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Pe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ps = "_root_1gft5_2", gs = "_trigger_1gft5_9", ys = "_panel_1gft5_33", Ns = "_menu_1gft5_52", ks = "_group_1gft5_57", $s = "_heading_1gft5_62", Cs = "_item_1gft5_68", Ss = "_separator_1gft5_94", Rs = "_footer_1gft5_100", _e = {
  root: ps,
  trigger: gs,
  panel: ys,
  menu: Ns,
  group: ks,
  heading: $s,
  item: Cs,
  separator: Ss,
  footer: Rs
}, fn = Te(null);
function Ts(e, a) {
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
const xs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ls(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = xs.get(a.key);
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
function As(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: _n(_e.trigger, r) };
}
function Es(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = Ts(e.defaultOpen === !0, l);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: _n(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...As(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ls(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(fn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Is(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Ms(e) {
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
const Bs = (e) => e.split("").every((a) => a === e[0]);
function Ps(e, a, n) {
  const r = Bs(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = vn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function qs(e) {
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
function js(e, a) {
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
function Ds(e, a) {
  const n = f(!1), r = sn(), l = js(e, a), i = (s) => {
    on(s) && e.focus(Ps(e.items, e.current(), r(s.key)));
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
function Os(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Hs({ row: e, nav: a, popup: n }) {
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
    ...Hs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Fs({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(bn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function zs({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Fs, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(bn, { row: e.row, nav: a, popup: n });
}
function Ws() {
  const e = Re(fn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Ks({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ws(), c = f(null);
  cn(s, c, n);
  const d = Is(e), u = qs(d.flatMap(Ms).map((w) => w.item)), m = Ds(u, r);
  return Os(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(zs, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
const Gs = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Us({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Gs(a, r) <= e) return i;
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
function Vs(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function Ys(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Js = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Xs(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Vs(i);
      l((d) => Js(d, c) ? d : c);
    };
    return s(), Ys(i, s);
  }, [e, n]), r && Us(r, a);
}
const Qs = "_strip_14kyj_2", Zs = "_fits_14kyj_19", ec = "_probe_14kyj_27", ac = "_moreRoot_14kyj_36", tc = "_more_14kyj_36", nc = "_tab_14kyj_55", rc = "_count_14kyj_91", ve = {
  strip: Qs,
  fits: Zs,
  probe: ec,
  moreRoot: ac,
  more: tc,
  tab: nc,
  count: rc
}, pn = "More";
function lc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const gn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function yn(e) {
  return `${ve.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
const oc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function ic({ tab: e, active: a, place: n, onChange: r }) {
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
function sc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function cc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Es, { label: pn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Ks, { align: "end", entries: e.map((r) => ({ label: gn(r), onSelect: () => n(r.id) })) }) });
}
function dc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : oc;
}
function FS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  const i = La({ orientation: "horizontal" }), s = lc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null), d = Xs(c, s, e.map(gn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${yn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(ic, { tab: m, active: a, place: dc(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: pn }),
    u.length > 0 && /* @__PURE__ */ t(cc, { tabs: u, trigger: i.itemProps(e.length), onPick: sc(c, n) })
  ] });
}
const St = 7;
function zS({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > St) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${St} — the set is fixed`);
  const l = f(null);
  return an(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: yn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const uc = "_root_v56ff_3", mc = "_segment_v56ff_9", Rt = {
  root: uc,
  segment: mc
};
function Nn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const hc = "_sidebar_s9o1j_3", wc = "_brand_s9o1j_9", fc = "_mark_s9o1j_17", _c = "_word_s9o1j_24", vc = "_nav_s9o1j_30", bc = "_navItem_s9o1j_39", pc = "_footLink_s9o1j_49", gc = "_group_s9o1j_58", yc = "_groupName_s9o1j_65", Nc = "_agents_s9o1j_81", kc = "_agent_s9o1j_81", $c = "_root_s9o1j_96", Cc = "_agentTop_s9o1j_105", Sc = "_dot_s9o1j_112", Rc = "_agentName_s9o1j_124", Tc = "_agentMeta_s9o1j_138", xc = "_foot_s9o1j_49", Lc = "_footName_s9o1j_150", Ac = "_footLinks_s9o1j_157", Ec = "_linkBrand_s9o1j_184", Ic = "_label_s9o1j_205", Mc = "_note_s9o1j_210", Bc = "_footer_s9o1j_226", x = {
  sidebar: hc,
  brand: wc,
  mark: fc,
  word: _c,
  nav: vc,
  navItem: bc,
  new: "_new_s9o1j_48",
  footLink: pc,
  group: gc,
  groupName: yc,
  agents: Nc,
  agent: kc,
  root: $c,
  agentTop: Cc,
  dot: Sc,
  agentName: Rc,
  agentMeta: Tc,
  foot: xc,
  footName: Lc,
  footLinks: Ac,
  linkBrand: Ec,
  label: Ic,
  note: Mc,
  footer: Bc
};
function Pc({ agent: e }) {
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
function qc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function jc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Pc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(qc, { shared: i })
  ] });
}
function Dc(e) {
  return e.destinations ?? e.items ?? [];
}
function Oc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Hc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Fc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function zc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Oc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Dc(e).map((a) => /* @__PURE__ */ t(Fc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Hc, { children: e.children })
  ] });
}
function Wc(e) {
  return "agents" in e;
}
function WS(e) {
  return Wc(e) ? /* @__PURE__ */ t(jc, { ...e }) : /* @__PURE__ */ t(zc, { ...e });
}
const Kc = "_mark_wlgi8_3", Gc = {
  mark: Kc
}, Uc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Gc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Uc[e]
    }
  );
}
const Vc = "_avatar_1t33a_3", Yc = {
  avatar: Vc
};
function Jc(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function Xc(e) {
  return e != null && sa(e) ? Br(e) : void 0;
}
function KS({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: Yc.avatar, "data-size": n, "aria-hidden": "true", style: Xc(a), children: Jc(e) });
}
const Qc = "_marker_br9fi_2", Zc = {
  marker: Qc
}, ed = {
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
}, ad = { running: " ward-running" };
function je({ size: e, kind: a, label: n }) {
  const r = { "--marker": ed[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Zc.marker} ward-marker ward-marker--${a}${ad[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const td = "_root_ti0pq_2", nd = "_chip_ti0pq_11", rd = "_noCase_ti0pq_23", wa = {
  root: td,
  chip: nd,
  noCase: rd
};
function ld(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = ld(a, n), l = nt(r, e === "reconnecting");
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
const od = "_root_u8ort_2", id = "_context_u8ort_13", sd = "_row_u8ort_1", cd = "_heading_u8ort_27", dd = "_headingWrap_u8ort_35", ud = "_chips_u8ort_40", md = "_title_u8ort_48", hd = "_consequence_u8ort_58", wd = "_actionsWrap_u8ort_65", fd = "_actions_u8ort_65", _d = "_action_u8ort_65", vd = "_overflowPanel_u8ort_94", bd = "_measureClip_u8ort_105", pd = "_measure_u8ort_105", Y = {
  root: od,
  context: id,
  row: sd,
  heading: cd,
  headingWrap: dd,
  chips: ud,
  title: md,
  consequence: hd,
  actionsWrap: wd,
  actions: fd,
  action: _d,
  overflowPanel: vd,
  measureClip: bd,
  measure: pd
};
function gd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function yd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(gd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Nd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function kd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function $d({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Cd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Sd({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Si, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function Rd(...e) {
  return e.some((a) => a === null);
}
function Td(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function xd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Td(e);
}
function Ld(e, a, n, r, l) {
  if (l === 0 || Rd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - xd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Ad(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ed(e) {
  return _r(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Id(e, a) {
  return a.length === 0 && e.length === 1 && Ed(e[0]);
}
function Md(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Ad(d)) return;
    const u = () => c(Ld(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Bd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Pd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function GS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = Md(i, Id(i, s)), B = s.length > 0, { disclosure: le, close: Le } = Cd(L || B, v), ae = kd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(Sd, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t(yd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Pd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(Nd, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t($d, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(Bd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const qd = "_root_td96x_2", jd = "_body_td96x_16", xt = {
  root: qd,
  body: jd
};
function US({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const Dd = "_root_bf1pc_2", Od = "_table_bf1pc_9", Hd = "_caption_bf1pc_14", Fd = "_series_bf1pc_23", zd = "_category_bf1pc_31", Wd = "_cell_bf1pc_39", Kd = "_track_bf1pc_45", Gd = "_lane_bf1pc_52", Ud = "_bar_bf1pc_56", Vd = "_value_bf1pc_63", Yd = "_swatch_bf1pc_70", Jd = "_empty_bf1pc_78", J = {
  root: Dd,
  table: Od,
  caption: Hd,
  series: Fd,
  category: zd,
  cell: Wd,
  track: Kd,
  lane: Gd,
  bar: Ud,
  value: Vd,
  swatch: Yd,
  empty: Jd
}, Xd = "—", Lt = 6;
function Qd(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Zd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function kn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function eu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function au({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = eu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function tu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": kn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function nu({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function ru({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Xd }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(tu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(au, { value: u.values[d], top: r, step: kn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function VS(e) {
  Qd(e.categories, e.series);
  const a = Zd(e.series);
  return a === 0 ? /* @__PURE__ */ t(nu, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(ru, { ...e, top: a });
}
const lu = "_root_1bfqw_2", ou = "_figure_1bfqw_7", iu = "_of_1bfqw_13", su = "_bar_1bfqw_18", cu = "_rows_1bfqw_38", du = "_row_1bfqw_38", uu = "_label_1bfqw_49", mu = "_amount_1bfqw_54", Ee = {
  root: lu,
  figure: ou,
  of: iu,
  bar: su,
  rows: cu,
  row: du,
  label: uu,
  amount: mu
};
function hu({ spent: e, ceiling: a, breakdown: n }) {
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
const wu = "_frame_9xel2_2", fu = "_table_9xel2_6", _u = "_th_9xel2_12", vu = "_td_9xel2_13", bu = "_sort_9xel2_48", pu = "_row_9xel2_60", gu = "_empty_9xel2_68", Me = {
  frame: wu,
  table: fu,
  th: _u,
  td: vu,
  sort: bu,
  row: pu,
  empty: gu
}, yu = { asc: "ascending", desc: "descending" };
function Nu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return yu[a.direction];
}
function ku(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function $u(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Cu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: $u(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Nu(e, a),
      children: ku(e, n)
    }
  );
}
function Su({ row: e, props: a }) {
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
function Ru({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(Cu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(Su, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Tu = "_list_v0s52_2", xu = {
  list: Tu
};
function YS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: xu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Lu = "_label_1u62a_2", Au = {
  label: Lu
};
function JS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Au.label, children: a.header }) }, a.key)) }) });
}
const Eu = "_stack_bp6a0_2", Iu = {
  stack: Eu
};
function XS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Iu.stack, "data-ward-action-stack": "", children: e });
}
const Mu = "_set_1z0sq_2", Bu = "_legend_1z0sq_7", Pu = "_row_1z0sq_15", qu = "_control_1z0sq_20", ju = "_input_1z0sq_26", Du = "_label_1z0sq_31", Ou = "_consequence_1z0sq_36", Oe = {
  set: Mu,
  legend: Bu,
  row: Pu,
  control: qu,
  input: ju,
  label: Du,
  consequence: Ou
};
function $n({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
const Hu = "_root_11gpw_2", Fu = "_head_11gpw_10", zu = "_note_11gpw_29", Wu = "_index_11gpw_34", Ku = "_dot_11gpw_38", Gu = "_counter_11gpw_49", Uu = "_trailing_11gpw_57", Fe = {
  root: Hu,
  head: Fu,
  note: zu,
  index: Wu,
  dot: Ku,
  counter: Gu,
  trailing: Uu
};
function Vu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Yu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Fe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(Vu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(Yu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const Ju = "_strip_ww53x_2", Xu = "_cell_ww53x_7", Qu = "_value_ww53x_12", Zu = "_link_ww53x_29", em = "_label_ww53x_49", Ke = {
  strip: Ju,
  cell: Xu,
  value: Qu,
  link: Zu,
  label: em
};
function am(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Cn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function tm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Cn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function nm({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Cn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return am(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(tm, { cell: n }, n.label) : /* @__PURE__ */ t(nm, { cell: n, href: n.href }, n.label)) });
}
const rm = "_root_1eb1u_2", lm = "_track_1eb1u_8", om = "_thumb_1eb1u_46", im = "_labelHidden_1eb1u_64", sm = "_label_1eb1u_64", cm = "_lockedNote_1eb1u_84", ze = {
  root: rm,
  track: lm,
  thumb: om,
  labelHidden: im,
  label: sm,
  lockedNote: cm
};
function dm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function um(e) {
  return e ? `${ze.label} ${ze.labelHidden}` : ze.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = qe(), { on: m, off: w } = dm(a, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: um(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: ze.lockedNote, children: "always on" })
    ] })
  ] });
}
const mm = "_bar_1vp69_2", hm = "_skip_1vp69_11", wm = "_mark_1vp69_22", fm = "_nav_1vp69_30", _m = "_list_1vp69_34", vm = "_select_1vp69_41", bm = "_selectTrigger_1vp69_45", pm = "_dest_1vp69_52", gm = "_actor_1vp69_71", ym = "_actorMark_1vp69_84", Nm = "_actorLabel_1vp69_89", km = "_tagline_1vp69_108", oe = {
  bar: mm,
  skip: hm,
  mark: wm,
  nav: fm,
  list: _m,
  select: vm,
  selectTrigger: bm,
  dest: pm,
  actor: gm,
  actorMark: ym,
  actorLabel: Nm,
  tagline: km
};
function $m(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Cm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function QS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Cm(r);
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: $m(c) })
    ] })
  ] });
}
const Sm = "_tree_zzoob_2", Rm = "_item_zzoob_6", Tm = "_row_zzoob_10", xm = "_button_zzoob_22", $a = {
  tree: Sm,
  item: Rm,
  row: Tm,
  button: xm
}, Sn = Te(null);
function Lm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = La({ orientation: "vertical" });
  return /* @__PURE__ */ t(Sn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Am = { ArrowRight: !0, ArrowLeft: !1 };
function Et(e) {
  return e ? !0 : void 0;
}
function Em(e, a) {
  const n = Am[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Im(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Mm(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Bm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Pm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function qm(e) {
  return typeof e == "string" ? e : void 0;
}
function jm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Dm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Rn(e) {
  const a = Re(Sn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Bm(e);
  return /* @__PURE__ */ o("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Mm(e),
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
            onClick: () => Im(e),
            onKeyDown: (r) => Em(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Pm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: qm(e.label), children: e.label }),
              /* @__PURE__ */ t(jm, { value: e.detail }),
              /* @__PURE__ */ t(Dm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Om = "_frame_gij4e_2", Hm = "_subjectRail_gij4e_22", Fm = "_subject_gij4e_22", zm = "_rail_gij4e_42", Wm = "_record_gij4e_66", Km = "_recordBody_gij4e_71", Gm = "_stageGrid_gij4e_120", Um = "_band_gij4e_134", Vm = "_bandBody_gij4e_142", Ym = "_bandActions_gij4e_147", Jm = "_scroller_gij4e_155", Xm = "_board_gij4e_182", Qm = "_lanes_gij4e_191", Z = {
  frame: Om,
  subjectRail: Hm,
  subject: Fm,
  rail: zm,
  record: Wm,
  recordBody: Km,
  stageGrid: Gm,
  band: Um,
  bandBody: Vm,
  bandActions: Ym,
  scroller: Jm,
  board: Xm,
  lanes: Qm
};
function ZS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function It(e) {
  return e ? "true" : void 0;
}
function eR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": It(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": It(l), "aria-label": r, children: a })
  ] });
}
function aR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Zm = "_form_1j8ub_2", eh = "_fields_1j8ub_9", ah = "_actions_1j8ub_19", Fa = {
  form: Zm,
  fields: eh,
  actions: ah
};
function tR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function nR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const th = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? vr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function nh({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function rh({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(br, { children: n.content }, n.id)) }) });
}
function rR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(th);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(nh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(rh, { lanes: n, label: a });
}
function lR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const lh = "_block_b38uc_3", oh = "_sentence_b38uc_10", ih = "_meta_b38uc_19", sh = "_action_b38uc_24", ch = "_strip_b38uc_28", dh = "_loading_b38uc_47", uh = "_label_b38uc_55", mh = "_counter_b38uc_62", be = {
  block: lh,
  sentence: oh,
  meta: ih,
  action: sh,
  strip: ch,
  loading: dh,
  label: uh,
  counter: mh
};
function hh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function qa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(hh, { action: a })
  ] });
}
function wh(e) {
  return /* @__PURE__ */ t(qa, { ...e, kind: "ward-emptystate" });
}
function oR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(qa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function iR(e) {
  return /* @__PURE__ */ t(qa, { ...e });
}
function sR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(qa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function cR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function dR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function uR({ label: e, startedAt: a }) {
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
const fh = "_note_cigdt_2", _h = {
  note: fh
};
function vh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: _h.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const bh = "_card_k7btg_3", ph = "_hit_k7btg_31", gh = "_head_k7btg_44", yh = "_title_k7btg_51", Nh = "_meta_k7btg_57", kh = "_since_k7btg_66", $h = "_sep_k7btg_76", Ch = "_fields_k7btg_80", Sh = "_field_k7btg_80", Rh = "_last_k7btg_98", Th = "_reason_k7btg_110", se = {
  card: bh,
  hit: ph,
  head: gh,
  title: yh,
  meta: Nh,
  since: kh,
  sep: $h,
  fields: Ch,
  field: Sh,
  last: Rh,
  reason: Th
}, xh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Lh(e, a, n) {
  const r = va(e, "blue"), l = va(e, "orange"), i = va(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = xh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Ah = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Eh(e, a) {
  return Ah[a](e);
}
function Ih({ item: e, connection: a }) {
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
function Mh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Bh({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ph({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Eh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function qh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function jh(e, a, n) {
  e == null || e(a, n);
}
function Dh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Oh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  Lh(r, n.key, e.feed);
  const l = Dh(e.feed), i = qh(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => jh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Mh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Ih, { item: n, connection: l }),
        /* @__PURE__ */ t(Bh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Ph, { item: n, fields: a }),
        /* @__PURE__ */ t(Oh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Hh = "_column_1j8bi_3", Fh = "_head_1j8bi_21", zh = "_label_1j8bi_30", Wh = "_count_1j8bi_39", Kh = "_list_1j8bi_53", la = {
  column: Hh,
  head: Fh,
  label: zh,
  count: Wh,
  list: Kh
};
function Tn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Gh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Uh(e) {
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
function Vh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Tn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Gh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Uh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(vh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Yh = "_foot_cs4jr_2", Jh = "_note_cs4jr_13", Xh = "_link_cs4jr_19", za = {
  foot: Yh,
  note: Jh,
  link: Xh
};
function mR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Qh = "_head_1tfi5_3", Zh = "_identity_1tfi5_12", ew = "_titleRow_1tfi5_18", aw = "_title_1tfi5_18", tw = "_key_1tfi5_35", nw = "_rollup_1tfi5_45", rw = "_tools_1tfi5_53", lw = "_swatch_1tfi5_101", ow = "_mark_1tfi5_108", ke = {
  head: Qh,
  identity: Zh,
  titleRow: ew,
  title: aw,
  key: tw,
  rollup: nw,
  tools: rw,
  swatch: lw,
  mark: ow
}, Mt = "initials:";
function iw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function sw(e) {
  const a = [iw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function cw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    sw(e)
  ] });
}
function dw(e) {
  return e.startsWith(Mt) ? e.slice(Mt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function uw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: dw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function mw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function hR({
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
        /* @__PURE__ */ t(uw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: cw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(mw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const hw = "_head_1sejb_14", ww = "_line_1sejb_15", fw = "_cHandle_1sejb_36", _w = "_cName_1sejb_41", vw = "_nameLine_1sejb_49", bw = "_cLabel_1sejb_56", pw = "_cCap_1sejb_61", gw = "_cShown_1sejb_66", yw = "_name_1sejb_49", Nw = "_noCap_1sejb_88", kw = "_state_1sejb_102", $w = "_handle_1sejb_111", Cw = "_sub_1sejb_137", q = {
  head: hw,
  line: ww,
  cHandle: fw,
  cName: _w,
  nameLine: vw,
  cLabel: bw,
  cCap: pw,
  cShown: gw,
  name: yw,
  noCap: Nw,
  state: kw,
  handle: $w,
  sub: Cw
}, Sw = "can't be hidden or collapsed", Rw = "terminal · counted, not a column";
function wR() {
  return /* @__PURE__ */ o("div", { className: q.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: q.cHandle }),
    /* @__PURE__ */ t("span", { className: q.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: q.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: q.cShown, children: "Shown" })
  ] });
}
function Tw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function xw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? Sw : e.terminal ? Rw : xw(e.agentsMounted);
}
function Lw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Aw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: q.cName, children: [
    /* @__PURE__ */ o("span", { className: q.nameLine, children: [
      /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: q.sub, children: Bt(e) })
  ] });
}
function Ew(e) {
  return e === void 0 ? "" : String(e);
}
function Iw(e) {
  return e === "" ? void 0 : Number(e);
}
function Mw({ name: e, onReorder: a }) {
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
      onKeyDown: (r) => !n && Lw(r, a),
      children: "⠿"
    }
  ) });
}
function Bw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${q.cCap} ${q.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: q.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ew(a.cap), onChange: (r) => n({ ...a, cap: Iw(r) }) }) });
}
function Pw({ stage: e, config: a, onChange: n }) {
  const r = qe() !== null, l = Tw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: q.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: q.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function qw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function fR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: q.line, "data-kind": qw(e), children: [
    /* @__PURE__ */ t(Mw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Aw, { stage: e }),
    /* @__PURE__ */ t("span", { className: q.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Bw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Pw, { stage: e, config: a, onChange: n })
  ] });
}
const jw = "_body_1a4f4_2", Dw = "_head_1a4f4_9", Ow = "_summary_1a4f4_19", Hw = "_block_1a4f4_20", Fw = "_actionsBlock_1a4f4_21", zw = "_title_1a4f4_41", Ww = "_note_1a4f4_46", Kw = "_k_1a4f4_51", Gw = "_kv_1a4f4_58", Uw = "_row_1a4f4_64", Vw = "_label_1a4f4_75", Yw = "_value_1a4f4_84", Jw = "_quote_1a4f4_90", Xw = "_actions_1a4f4_21", Qw = "_resolve_1a4f4_103", j = {
  body: jw,
  head: Dw,
  summary: Ow,
  block: Hw,
  actionsBlock: Fw,
  title: zw,
  note: Ww,
  k: Kw,
  kv: Gw,
  row: Uw,
  label: Vw,
  value: Yw,
  quote: Jw,
  actions: Xw,
  resolve: Qw
};
function Zw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function ef(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function af(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function tf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function nf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(af(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Zw(e),
    ...tf(n),
    ...ef(e, a)
  ];
}
function rf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function lf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function of({ item: e, showKey: a }) {
  const n = lf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function sf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function _R({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = nf(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: j.body, children: [
    /* @__PURE__ */ t(of, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: v }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(sf, { item: e }),
    /* @__PURE__ */ o("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(rf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const cf = "_root_3azmy_2", df = "_list_3azmy_7", uf = "_item_3azmy_12", mf = "_box_3azmy_18", hf = "_text_3azmy_23", wf = "_note_3azmy_28", Ye = {
  root: cf,
  list: df,
  item: uf,
  box: mf,
  text: hf,
  note: wf
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
const ff = "_rail_znbbp_2", _f = "_k_znbbp_11", vf = "_head_znbbp_19", bf = "_section_znbbp_25", pf = "_card_znbbp_39", gf = "_strip_znbbp_46", yf = "_skeleton_znbbp_60", Nf = "_skeletonLabel_znbbp_74", kf = "_bar_znbbp_80", $f = "_note_znbbp_89", me = {
  rail: ff,
  k: _f,
  head: vf,
  section: bf,
  card: pf,
  strip: gf,
  skeleton: yf,
  skeletonLabel: Nf,
  bar: kf,
  note: $f
};
function Cf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function Sf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Rf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Vh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Tf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Rf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(Sf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function vR(e) {
  const a = Cf(e.onOpen), n = Tn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Tf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function xf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Lf(e) {
  return Math.ceil(e.length / 2);
}
function Af(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function xn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Ef(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = xn(e);
  l !== void 0 && n(l), r(Af(e.type));
}
function If(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Ef(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Mf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Bf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Pf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function qf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(Lf(a ?? [])) + ")"
  };
}
function jf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Df(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Of(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Hf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Ff(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function zf(e, a) {
  return a === void 0 ? e : xf(e, a.ref);
}
function Wf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function Ln(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = va(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Mf(a));
  If(e.feed, a.key, s, d, i);
  const u = Bf(a, r), m = Pf(a, n), w = qf(a, e.fields), v = Ff(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Wf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: zf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        jf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Df(a, e.fields),
          Of(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Hf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Kf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Gf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Uf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Vf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Kf, { count: e.items.length, cap: e.column.cap });
}
function Yf(e, a) {
  return e.roving ?? a;
}
function Jf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Xf(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Ln,
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
function Qf(e) {
  const a = N(), n = La({ orientation: "vertical" }), r = Yf(e, n), l = Gf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Uf(e.column, e.items.length, a),
    Vf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Jf(e, n), children: Xf(e, r) })
  ] });
}
function Zf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function e_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function a_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function bR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Zf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      e_(e),
      a_(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function t_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function n_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function r_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function pR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(t_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: n_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    r_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function gR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Ln, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Qf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function l_(e, a) {
  const n = xn(e);
  n !== void 0 && a(n);
}
function o_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => l_(r, n));
  }, [e, a, n]);
}
function i_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function s_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function c_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function d_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function yR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  o_(e.feed, a.key, l);
  const i = [...i_(a), ...s_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      c_(n, r)
    ] }),
    d_(a, e.actions)
  ] });
}
const u_ = "_card_54446_3", m_ = "_head_54446_30", h_ = "_mark_54446_38", w_ = "_name_54446_50", f_ = "_chips_54446_71", __ = "_description_54446_77", v_ = "_run_54446_82", b_ = "_sep_54446_91", p_ = "_facts_54446_96", g_ = "_fact_54446_96", y_ = "_factLabel_54446_109", N_ = "_factValue_54446_113", re = {
  card: u_,
  head: m_,
  mark: h_,
  name: w_,
  chips: f_,
  description: __,
  run: v_,
  sep: b_,
  facts: p_,
  fact: g_,
  factLabel: y_,
  factValue: N_
}, k_ = { live: "done", draft: "running", paused: "meta" };
function $_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function C_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: k_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function S_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function R_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function T_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function x_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function L_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: $_(s),
      style: c,
      "data-selected": d,
      "data-paused": x_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(S_, { description: e.description }),
        /* @__PURE__ */ t(R_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(C_, { versions: e.versions }),
        /* @__PURE__ */ t(T_, { facts: i })
      ]
    }
  );
}
const A_ = "_list_4dcyc_2", E_ = "_row_4dcyc_11", I_ = "_head_4dcyc_23", M_ = "_id_4dcyc_30", B_ = "_lock_4dcyc_35", P_ = "_reason_4dcyc_41", q_ = "_remove_4dcyc_46", j_ = "_clauses_4dcyc_50", D_ = "_clause_4dcyc_50", O_ = "_label_4dcyc_64", H_ = "_cell_4dcyc_71", F_ = "_value_4dcyc_76", ie = {
  list: A_,
  row: E_,
  head: I_,
  id: M_,
  lock: B_,
  reason: P_,
  remove: q_,
  clauses: j_,
  clause: D_,
  label: O_,
  cell: H_,
  value: F_
}, An = Te(!1);
function NR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(An.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function z_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function W_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function K_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(W_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function kR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(An)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(K_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(z_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const G_ = "_ladder_n8eeo_2", U_ = "_cell_n8eeo_7", V_ = "_empty_n8eeo_26", Y_ = "_name_n8eeo_34", J_ = "_holder_n8eeo_40", X_ = "_request_n8eeo_46", Q_ = "_swatches_n8eeo_51", Z_ = "_swatch_n8eeo_51", ev = "_tilesFrame_n8eeo_78", av = "_tiles_n8eeo_78", tv = "_tile_n8eeo_78", nv = "_bar_n8eeo_117", rv = "_hex_n8eeo_128", lv = "_note_n8eeo_138", E = {
  ladder: G_,
  cell: U_,
  empty: V_,
  name: Y_,
  holder: J_,
  request: X_,
  swatches: Q_,
  swatch: Z_,
  tilesFrame: ev,
  tiles: av,
  tile: tv,
  bar: nv,
  hex: rv,
  note: lv
}, $R = "not validated yet, pending a CVD matrix and dark stepping";
function ov(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function En(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function iv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function sv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function cv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function dv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const qt = (e) => String(e).padStart(2, "0");
function uv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? En(e, void 0);
}
function mv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${qt(e)}` : qr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${qt(e)} · ${n}` })
  ] });
}
function hv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = ov(e), c = En(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...dv(d, m, u), "data-validation": s, style: iv(e, s), onClick: v, onKeyDown: (B) => cv(B, v) }, label: y, name: w, holder: c, validation: s, note: uv(s, n, m), step: e.step };
}
const wv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(mv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(sv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function fv(e) {
  return wv[e.presentation](hv(e));
}
function _v(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function vv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function bv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const pv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function gv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const yv = { list: vv, swatches: () => null, tiles: gv };
function Nv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function In(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  _v(e.steps);
  const r = bv(e), l = yv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(fv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Nv(e.disabled === !0), className: `${pv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const kv = "_rail_s06lm_2", $v = "_section_s06lm_12", Cv = "_sectionFlush_s06lm_22", Sv = "_head_s06lm_26", Rv = "_headLabel_s06lm_34", Tv = "_sample_s06lm_42", xv = "_sampleLabel_s06lm_47", Lv = "_sampleTitle_s06lm_54", Av = "_sampleMeta_s06lm_59", Ev = "_trace_s06lm_65", Iv = "_traceHead_s06lm_70", Mv = "_steps_s06lm_78", Bv = "_step_s06lm_78", Pv = "_stepTitle_s06lm_97", qv = "_hollow_s06lm_107", jv = "_stepBody_s06lm_115", Dv = "_stepDetail_s06lm_127", Ov = "_publish_s06lm_132", Hv = "_reason_s06lm_138", Fv = "_note_s06lm_143", zv = "_reveal_s06lm_148", k = {
  rail: kv,
  section: $v,
  sectionFlush: Cv,
  head: Sv,
  headLabel: Rv,
  sample: Tv,
  sampleLabel: xv,
  sampleTitle: Lv,
  sampleMeta: Av,
  trace: Ev,
  traceHead: Iv,
  steps: Mv,
  step: Bv,
  stepTitle: Pv,
  hollow: qv,
  stepBody: jv,
  stepDetail: Dv,
  publish: Ov,
  reason: Hv,
  note: Fv,
  reveal: zv
}, jt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Wv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Kv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Gv = { notSimulated: "not simulated", running: "running" };
function Uv(e) {
  return e.presentation === "foundry";
}
function Vv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Yv(e, a) {
  var r;
  const n = Wv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Jv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Xv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Qv(e) {
  if (Jv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Zv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function eb(e) {
  const a = Gv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(je, { size: 6, kind: Kv[e.kind], label: e.kind });
}
function ab(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function tb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function nb(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Zv, { kind: a.kind, children: [
    /* @__PURE__ */ t(eb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(ab, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(tb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function rb(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Mn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: rb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(nb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function lb(e) {
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
function ob(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function ib(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Jt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function sb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Jt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function cb(e) {
  const a = sb(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Bn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function db(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Bn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function ub(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Bn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Pn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: jt[e.run.status].role, label: jt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function mb(e, a) {
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
function hb(e) {
  var n;
  Xv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Pn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(lb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Mn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(ib, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(db, { reason: Vv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function wb(e) {
  var r;
  const a = mb(e.run, e.feed);
  Qv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Pn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(ob, { sample: e.run.sample }),
    /* @__PURE__ */ t(Mn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(cb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(ub, { reason: Yv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function CR(e) {
  return Uv(e) ? /* @__PURE__ */ t(wb, { ...e }) : /* @__PURE__ */ t(hb, { ...e });
}
const fb = "_list_142ip_3", _b = "_row_142ip_9", vb = "_condition_142ip_18", bb = "_action_142ip_24", pa = {
  list: fb,
  row: _b,
  condition: vb,
  action: bb
}, qn = Te(!1);
function SR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(qn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function RR({ rule: e }) {
  if (!Re(qn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const pb = "_move_tmppt_3", gb = {
  move: pb
};
function Xa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function jn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Dn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Dt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function yb(e) {
  return e === "up" ? "down" : "up";
}
function Nb(e, a) {
  const n = Dt(e, a.id, a.direction) ?? Dt(e, a.id, yb(a.direction));
  n == null || n.focus();
}
function On() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Nb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Hn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${gb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const kb = "_body_1jd1i_2", $b = "_title_1jd1i_8", Cb = "_section_1jd1i_13", Sb = "_legend_1jd1i_18", Rb = "_stages_1jd1i_26", Tb = "_stage_1jd1i_26", xb = "_stageIndex_1jd1i_44", Lb = "_stageName_1jd1i_50", Ab = "_footer_1jd1i_59", Eb = "_note_1jd1i_66", Ib = "_reason_1jd1i_71", Mb = "_actions_1jd1i_76", Bb = "_webHead_1jd1i_83", Pb = "_kicker_1jd1i_92", qb = "_webTitle_1jd1i_99", jb = "_webBody_1jd1i_105", Db = "_webSection_1jd1i_109", Ob = "_sectionHead_1jd1i_121", Hb = "_sectionNote_1jd1i_129", Fb = "_formLabel_1jd1i_134", zb = "_identityRow_1jd1i_139", Wb = "_nameCell_1jd1i_145", Kb = "_keyCell_1jd1i_150", Gb = "_colourCell_1jd1i_154", Ub = "_colourStatus_1jd1i_161", Vb = "_webStages_1jd1i_166", Yb = "_webStageList_1jd1i_172", Jb = "_webStage_1jd1i_166", Xb = "_webIndex_1jd1i_191", Qb = "_webStageName_1jd1i_196", Zb = "_webMoves_1jd1i_201", ep = "_addStage_1jd1i_215", ap = "_addStageButton_1jd1i_223", tp = "_addStageNote_1jd1i_231", np = "_webFooter_1jd1i_236", rp = "_webFooterNotes_1jd1i_244", lp = "_webNote_1jd1i_251", _ = {
  body: kb,
  title: $b,
  section: Cb,
  legend: Sb,
  stages: Rb,
  stage: Tb,
  stageIndex: xb,
  stageName: Lb,
  footer: Ab,
  note: Eb,
  reason: Ib,
  actions: Mb,
  webHead: Bb,
  kicker: Pb,
  webTitle: qb,
  webBody: jb,
  webSection: Db,
  sectionHead: Ob,
  sectionNote: Hb,
  formLabel: Fb,
  identityRow: zb,
  nameCell: Wb,
  keyCell: Kb,
  colourCell: Gb,
  colourStatus: Ub,
  webStages: Vb,
  webStageList: Yb,
  webStage: Jb,
  webIndex: Xb,
  webStageName: Qb,
  webMoves: Zb,
  addStage: ep,
  addStageButton: ap,
  addStageNote: tp,
  webFooter: np,
  webFooterNotes: rp,
  webNote: lp
}, op = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Fn = "not in catalogue";
function ip(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Fn}` }, ...n];
}
function sp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Fn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: ip(n, e.name), invalid: i, onChange: r });
}
function zn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function cp(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function dp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = zn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(sp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: op, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function up({ stages: e, onChange: a, catalogue: n }) {
  const r = cp(e.length), l = On(), i = (c, d) => {
    const u = jn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Dn(zn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(dp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Hn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const mp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], hp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], wp = "A new stream starts as a draft. Nothing runs on it until you publish it.", fp = "Create is disabled: name the stream and give it a key first.", _p = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function vp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function bp({ stages: e, onMove: a }) {
  const n = On(), r = (l, i) => {
    const s = jn(l, i);
    n.moved({ id: e[l].id, direction: i }, Dn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ca, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Hn, { text: n.announcement })
  ] });
}
function pp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: wp }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function gp(e, a) {
  return e !== "" && a !== "" ? null : fp;
}
function yp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = hp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => vp(n, r)), [ae, Ue] = p(e.stages ?? mp), [Ve, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = gp(m, v);
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
      /* @__PURE__ */ t(In, { label: "Stream colour", steps: n, value: le, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(bp, { stages: ae, onMove: (De, fr) => Ue(Xa(ae, De, fr)) })
    ] }),
    /* @__PURE__ */ t($n, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(pp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Wn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Np = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function kp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Wn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function $p(e, a) {
  return Cp(e) && Sp(e, a) && Rp(e);
}
function Cp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Sp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function Rp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Tp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function xp({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Lp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(xp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: Np })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Ap({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Ep({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function Ip(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = kp(l, s, d, m, v, L), Le = $p(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(In, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: Tp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Ap, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(Ep, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: _p })
        ] }),
        /* @__PURE__ */ t(up, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t($n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Wn, onChange: y }) }),
      /* @__PURE__ */ t(Lp, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function TR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ip, { ...e }) : /* @__PURE__ */ t(yp, { ...e });
}
const Mp = "_row_bs8hc_2", Bp = "_cell_bs8hc_6", Pp = "_condition_bs8hc_11", qp = "_action_bs8hc_18", jp = "_contract_bs8hc_24", Dp = "_contractCondition_bs8hc_33", Op = "_contractAction_bs8hc_39", Q = {
  row: Mp,
  cell: Bp,
  condition: Pp,
  action: qp,
  contract: jp,
  contractCondition: Dp,
  contractAction: Op
}, Kn = ["advance", "block", "escalate", "requestReview"], Ot = {
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
      options: Kn.map((l) => ({ value: l, label: Ot[l] }))
    }
  );
}
function Hp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Fp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function zp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const Wp = { two: Fp, four: Hp, contract: zp };
function xR(e) {
  var n;
  if (!Kn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Wp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Kp = "_column_11id3_2", Gp = "_head_11id3_17", Up = "_index_11id3_23", Vp = "_name_11id3_29", Yp = "_meta_11id3_38", Jp = "_mono_11id3_43", Xp = "_gate_11id3_50", Qp = "_reviewersLabel_11id3_57", Zp = "_reviewers_11id3_57", eg = "_reviewer_11id3_57", ag = "_agents_11id3_74", tg = "_workflowColumn_11id3_79", ng = "_workflowHead_11id3_96", rg = "_stageRow_11id3_102", lg = "_stageLabel_11id3_109", og = "_workflowTitle_11id3_116", ig = "_workflowMeta_11id3_122", sg = "_workflowGate_11id3_127", cg = "_gateNote_11id3_135", dg = "_cardNote_11id3_140", ug = "_reviewerList_11id3_145", mg = "_reviewerRow_11id3_151", hg = "_reviewerMark_11id3_157", wg = "_reviewerName_11id3_167", fg = "_terminalCard_11id3_173", _g = "_terminalCount_11id3_182", vg = "_workflowAgents_11id3_188", bg = "_mount_11id3_194", C = {
  column: Kp,
  head: Gp,
  index: Up,
  name: Vp,
  meta: Yp,
  mono: Jp,
  gate: Xp,
  reviewersLabel: Qp,
  reviewers: Zp,
  reviewer: eg,
  agents: ag,
  workflowColumn: tg,
  workflowHead: ng,
  stageRow: rg,
  stageLabel: lg,
  workflowTitle: og,
  workflowMeta: ig,
  workflowGate: sg,
  gateNote: cg,
  cardNote: dg,
  reviewerList: ug,
  reviewerRow: mg,
  reviewerMark: hg,
  reviewerName: wg,
  terminalCard: fg,
  terminalCount: _g,
  workflowAgents: vg,
  mount: bg
}, pg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Gn(e) {
  return `${Math.round(e * 100)}%`;
}
function gg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: Gn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function yg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Ng({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: pg[e.kind] })
  ] });
}
function kg({ stage: e }) {
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
function $g({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(gg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(yg, { stage: e }) : null;
}
function Cg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Sg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Ng, { stage: e, titleId: l }),
    /* @__PURE__ */ t(kg, { stage: e }),
    /* @__PURE__ */ t($g, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(L_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Cg, { onMount: n })
  ] });
}
const Rg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Tg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function xg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Tg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Gn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Lg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Ag({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Lg(e.rolledBackThisWeek) })
  ] });
}
function Eg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Ig(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = Eg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Mg({ stage: e, titleId: a }) {
  const n = Rg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Ig(e) })
  ] });
}
function Bg(e) {
  return e === "entry" || e === "agent";
}
function Pg({ stage: e, onMount: a }) {
  return a === void 0 || !Bg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function qg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Mg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(xg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Ag, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Pg, { stage: e, onMount: n })
  ] });
}
function jg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function LR(e) {
  return jg(e) ? /* @__PURE__ */ t(qg, { ...e }) : /* @__PURE__ */ t(Sg, { ...e });
}
const Dg = "_row_1tdra_6", Og = "_name_1tdra_12", Hg = "_compactRow_1tdra_13", Fg = "_compactName_1tdra_13", zg = "_cell_1tdra_30", Wg = "_chain_1tdra_45", Kg = "_owner_1tdra_51", Gg = "_mono_1tdra_57", Ug = "_compactCell_1tdra_79", Vg = "_stack_1tdra_96", Yg = "_stat_1tdra_103", Jg = "_identityLine_1tdra_110", Xg = "_identity_1tdra_110", Qg = "_ownerLine_1tdra_140", Zg = "_link_1tdra_160", ey = "_gateMark_1tdra_166", ay = "_emptyChain_1tdra_171", ty = "_arrow_1tdra_177", ny = "_muted_1tdra_182", ry = "_define_1tdra_187", ly = "_statValue_1tdra_194", oy = "_policyId_1tdra_200", iy = "_sub_1tdra_205", g = {
  row: Dg,
  name: Og,
  compactRow: Hg,
  compactName: Fg,
  cell: zg,
  chain: Wg,
  owner: Kg,
  mono: Gg,
  compactCell: Ug,
  stack: Vg,
  stat: Yg,
  identityLine: Jg,
  identity: Xg,
  ownerLine: Qg,
  link: Zg,
  gateMark: ey,
  emptyChain: ay,
  arrow: ty,
  muted: ny,
  define: ry,
  statValue: ly,
  policyId: oy,
  sub: iy
};
function Un(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function sy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function cy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Vn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function dy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Vn(e.members)}`;
}
function uy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: dy(e) })
  ] }) });
}
function Yn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function my(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function hy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Yn, { name: l.name, gate: l.gate === !0, look: my(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function wy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : hy(e) });
}
function Jn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ht(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Jn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function fy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function _y(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function vy({ stream: e, href: a, presentation: n }) {
  const r = cy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Un, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    uy(e, a),
    wy(e),
    Ht(_y(e.agents), e.agents === void 0 ? void 0 : sy(e.agents), "—"),
    fy(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function by(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function AR(e) {
  if (by(e)) return vy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Un, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Yn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Vn(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Jn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const py = "_row_2u4ll_2", gy = "_name_2u4ll_16", yy = "_scope_2u4ll_24", Ra = {
  row: py,
  name: gy,
  scope: yy
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ny(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function ky(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function $y({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Cy({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function Sy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ry(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function ER({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = ky(e, n), s = Ry(n);
  return /* @__PURE__ */ o(s, { className: Ny(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t($y, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(Sy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Cy, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Ty = "_strip_4ppv9_2", xy = "_well_4ppv9_11", Ly = "_head_4ppv9_18", Ay = "_name_4ppv9_24", Ey = "_chart_4ppv9_32", Iy = "_segment_4ppv9_38", My = "_detailedChart_4ppv9_44", By = "_rail_4ppv9_57", Py = "_section_4ppv9_63", qy = "_label_4ppv9_74", jy = "_note_4ppv9_91", K = {
  strip: Ty,
  well: xy,
  head: Ly,
  name: Ay,
  chart: Ey,
  segment: Iy,
  detailedChart: My,
  rail: By,
  section: Py,
  label: qy,
  note: jy
}, Dy = "No item in flight to preview.", Oy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Hy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function Fy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function zy({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: Fy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Wy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ky({ identities: e }) {
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
function Xn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function fa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function Gy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Dy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: Xn(r), feed: null }) });
}
function Uy({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Vy(e) {
  const a = Wy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(Gy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(Uy, { draft: n }) }),
    /* @__PURE__ */ o(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Ky, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Oy })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Hy }) })
  ] });
}
function Yy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: Xn(r) }) }),
    /* @__PURE__ */ t(zy, { draft: e, streams: n })
  ] });
}
function IR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Vy, { ...e }) : /* @__PURE__ */ t(Yy, { ...e });
}
const Jy = "_row_ixlg5_6", Xy = "_headCell_ixlg5_10", Qy = "_cell_ixlg5_11", Zy = "_name_ixlg5_23", eN = "_consequence_ixlg5_29", aN = "_governed_ixlg5_36", tN = "_control_ixlg5_42", nN = "_byRole_ixlg5_48", rN = "_webControl_ixlg5_59", lN = "_webConsequence_ixlg5_65", oN = "_webGoverned_ixlg5_71", O = {
  row: Jy,
  headCell: Xy,
  cell: Qy,
  name: Zy,
  consequence: eN,
  governed: aN,
  control: tN,
  byRole: nN,
  webControl: rN,
  webConsequence: lN,
  webGoverned: oN
};
function iN({
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
function sN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(iN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function cN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function dN({ name: e, cell: a, onChange: n }) {
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
function uN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(dN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: cN(e) }) })
  ] });
}
function MR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(uN, { ...e }) : /* @__PURE__ */ t(sN, { ...e });
}
const mN = "_row_vv64h_2", hN = "_cell_vv64h_6", wN = "_name_vv64h_25", fN = "_note_vv64h_30", _N = "_webName_vv64h_41", vN = "_webMeta_vv64h_47", V = {
  row: mN,
  cell: hN,
  name: wN,
  note: fN,
  webName: _N,
  webMeta: vN
}, Qn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function bN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function pN({ component: e, onRestart: a }) {
  const n = N(), r = Qn[e.state], l = e.state === "drainFirst";
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
function gN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: bN(e.state) });
}
function yN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Qn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(gN, { component: e, onRestart: a }) })
  ] });
}
function BR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(yN, { ...e }) : /* @__PURE__ */ t(pN, { ...e });
}
const NN = "_row_jcm5k_7", kN = "_cell_jcm5k_11", $N = "_next_jcm5k_28", CN = "_headCell_jcm5k_38", SN = "_webId_jcm5k_77", RN = "_webPurpose_jcm5k_83", TN = "_webMeta_jcm5k_91", xN = "_webUrgent_jcm5k_97", F = {
  row: NN,
  cell: kN,
  next: $N,
  headCell: CN,
  webId: SN,
  webPurpose: RN,
  webMeta: TN,
  webUrgent: xN
}, LN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, AN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Zn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], EN = Object.fromEntries(Zn.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = EN[e];
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
function PR() {
  return /* @__PURE__ */ t("tr", { children: Zn.map((e) => /* @__PURE__ */ t(
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
function IN({ cred: e }) {
  const a = LN[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function MN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function BN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(MN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...AN[e.state] }) })
  ] });
}
function qR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(BN, { ...e }) : /* @__PURE__ */ t(IN, { ...e });
}
const PN = "_card_17zba_2", qN = "_head_17zba_11", jN = "_env_17zba_18", DN = "_version_17zba_25", ON = "_meta_17zba_32", HN = "_webCard_17zba_37", FN = "_webRow_17zba_47", zN = "_webTitle_17zba_55", WN = "_webLine_17zba_65", KN = "_webVersion_17zba_72", GN = "_webMeta_17zba_77", U = {
  card: PN,
  head: qN,
  env: jN,
  version: DN,
  meta: ON,
  webCard: HN,
  webRow: FN,
  webTitle: zN,
  webLine: WN,
  webVersion: KN,
  webMeta: GN
}, Ft = { dev: "Dev", uat: "UAT", prod: "Prod" }, er = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function UN({ env: e }) {
  const a = er[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function VN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function YN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...er[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: VN(e) })
  ] });
}
function jR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(YN, { ...e }) : /* @__PURE__ */ t(UN, { ...e });
}
const JN = "_panel_1hmja_2", XN = "_line_1hmja_8", QN = "_actions_1hmja_14", _a = {
  panel: JN,
  line: XN,
  actions: QN
};
function DR(e) {
  return /* @__PURE__ */ o("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const ZN = "_upload_13fcl_2", e1 = "_preview_13fcl_7", a1 = "_mark_13fcl_17", t1 = "_empty_13fcl_22", n1 = "_actions_13fcl_28", r1 = "_input_13fcl_33", l1 = "_reasons_13fcl_41", o1 = "_reason_13fcl_41", i1 = "_accepted_13fcl_57", te = {
  upload: ZN,
  preview: e1,
  mark: a1,
  empty: t1,
  actions: n1,
  input: r1,
  reasons: l1,
  reason: o1,
  accepted: i1
}, ar = 1.5, tr = 22, xa = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ar}px at ${tr}px`], s1 = [Se[1], Se[2], xa, Ie], c1 = /* @__PURE__ */ new Map([
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
]), d1 = "http://www.w3.org/2000/svg", u1 = "http://www.w3.org/2000/xmlns/", m1 = /* @__PURE__ */ new Set([
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
]), h1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, w1 = /url\s*\(|['"\\]/i;
function f1() {
  return { ok: !1, reasons: [Se[1]] };
}
function nr(e) {
  return e.namespaceURI === d1;
}
function _1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && nr(a) ? a : null;
  } catch {
    return null;
  }
}
function v1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function b1(e) {
  return c1.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function p1(e) {
  return w1.test(e.replace(mt, ""));
}
function g1(e) {
  return /^on/i.test(e.localName) ? xa : e.localName === "href" || p1(e.value) ? Ie : void 0;
}
function y1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(b1(n));
    for (const r of Array.from(n.attributes)) a.add(g1(r));
  }
  return s1.filter((n) => a.has(n));
}
function N1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? tr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ar;
  }) ? [Se[3]] : [];
}
function k1(e) {
  if (e.namespaceURI === u1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (h1.has(a) || a.startsWith("stroke"));
}
function $1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && nr(a) && m1.has(a.localName);
}
function C1(e, a) {
  $1(a) ? a.nodeType === Node.ELEMENT_NODE && rr(a) : e.removeChild(a);
}
function rr(e) {
  for (const a of Array.from(e.attributes)) k1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) C1(e, a);
  return e;
}
function S1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function R1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function T1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of S1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function x1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function L1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = T1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), x1(l, r);
  }
  return e;
}
function OR(e) {
  const a = _1(e);
  if (a === null) return f1();
  const n = [...v1(a), ...y1(a), ...N1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(L1(rr(a), R1(e))) };
}
const A1 = "Mark accepted.", E1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, I1 = new Set(Qt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function M1(e) {
  return e !== void 0 && (E1.test(e) || I1.has(e)) ? e : void 0;
}
function B1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": M1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function P1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function q1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function j1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: A1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function D1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(j1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${P1(e, n)}`, role: "status", children: q1(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function HR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(B1, { current: e }),
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
    /* @__PURE__ */ t(D1, { result: s, presentation: r })
  ] });
}
const O1 = "_row_o3t6y_7", H1 = "_cell_o3t6y_11", F1 = "_head_o3t6y_28", z1 = "_name_o3t6y_34", W1 = "_pinned_o3t6y_42", K1 = "_headCell_o3t6y_49", G1 = "_webName_o3t6y_88", U1 = "_webMeta_o3t6y_95", V1 = "_webWarn_o3t6y_103", P = {
  row: O1,
  cell: H1,
  head: F1,
  name: z1,
  pinned: W1,
  headCell: K1,
  webName: G1,
  webMeta: U1,
  webWarn: V1
}, ht = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, lr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Y1 = Object.fromEntries(lr.map((e) => [e.key, e]));
function J1(e, a) {
  return `mcp.${e}.${a}`;
}
function X1(e) {
  return Object.keys(ht).includes(e);
}
function Q1(e) {
  return ht[e !== void 0 && X1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = Y1[e];
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
function FR() {
  return /* @__PURE__ */ t("tr", { children: lr.map((e) => /* @__PURE__ */ t(
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
function Z1({ server: e }) {
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
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => J1(e.name, n)).join(" · ") })
  ] });
}
function ek(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function ak(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function tk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function nk({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function rk({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function lk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: ek(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...ak(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(tk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...Q1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(nk, { server: e, onRestart: a }),
      /* @__PURE__ */ t(rk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function zR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(lk, { ...e }) : /* @__PURE__ */ t(Z1, { ...e });
}
const ok = "_row_1ibo7_2", ik = "_headCell_1ibo7_14", sk = "_cell_1ibo7_15", ck = "_name_1ibo7_26", dk = "_consequence_1ibo7_32", uk = "_reason_1ibo7_38", mk = "_value_1ibo7_44", hk = "_webRow_1ibo7_60", wk = "_webSetting_1ibo7_73", fk = "_webName_1ibo7_81", _k = "_webConsequence_1ibo7_89", vk = "_webControl_1ibo7_95", bk = "_webState_1ibo7_109", pk = "_webChip_1ibo7_114", I = {
  row: ok,
  headCell: ik,
  cell: sk,
  name: ck,
  consequence: dk,
  reason: uk,
  value: mk,
  webRow: hk,
  webSetting: wk,
  webName: fk,
  webConsequence: _k,
  webControl: vk,
  webState: bk,
  webChip: pk
}, or = 104, ir = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function gk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Nn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function yk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = ir[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(gk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: or }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function sr(e, a) {
  return String(e ?? a);
}
function Nk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function kk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? sr(e.value, "—");
}
function $k({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Ck(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t($k, { ...e });
  const l = Nk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Nn, { options: l, value: sr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: kk(a) });
}
function Sk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(Ck, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: or }, children: /* @__PURE__ */ t(h, { ...ir[n], size: "tag" }) })
  ] });
}
function WR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Sk, { ...e }) : /* @__PURE__ */ t(yk, { ...e });
}
const Rk = "_label_h9m4w_7", Tk = "_name_h9m4w_15", xk = "_column_h9m4w_24", Lk = "_webFrame_h9m4w_57", Ak = "_webHead_h9m4w_62", Ek = "_webHeadLabel_h9m4w_74", Ik = "_webLabel_h9m4w_117", Mk = "_webColumns_h9m4w_124", Bk = "_webGroup_h9m4w_130", Pk = "_webPeople_h9m4w_131", qk = "_webVia_h9m4w_132", jk = "_webMeta_h9m4w_161", z = {
  label: Rk,
  name: Tk,
  column: xk,
  webFrame: Lk,
  webHead: Ak,
  webHeadLabel: Ek,
  webLabel: Ik,
  webColumns: Mk,
  webGroup: Bk,
  webPeople: Pk,
  webVia: qk,
  webMeta: jk
}, Dk = {
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
function Ok(e) {
  if (!e.matrixRole) return;
  const a = Dk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Hk({ node: e }) {
  const a = Ok(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Fk, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Fk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function zk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Rn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Hk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Wk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Kk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Gk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Uk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Vk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Kk, {}),
    /* @__PURE__ */ t(Lm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Rn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Gk, { row: n }),
        detail: /* @__PURE__ */ t(Wk, { row: n }),
        expanded: Uk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function KR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Vk, { ...e }) : /* @__PURE__ */ t(zk, { ...e });
}
const Yk = "_runbook_b9agc_2", Jk = "_list_b9agc_7", Xk = "_step_b9agc_15", Qk = "_numeral_b9agc_21", Zk = "_body_b9agc_28", e$ = "_head_b9agc_34", a$ = "_title_b9agc_40", t$ = "_detail_b9agc_45", n$ = "_actions_b9agc_50", r$ = "_webList_b9agc_56", l$ = "_webStep_b9agc_60", o$ = "_webBody_b9agc_66", i$ = "_webTitle_b9agc_74", s$ = "_webDetail_b9agc_78", A = {
  runbook: Yk,
  list: Jk,
  step: Xk,
  numeral: Qk,
  body: Zk,
  head: e$,
  title: a$,
  detail: t$,
  actions: n$,
  webList: r$,
  webStep: l$,
  webBody: o$,
  webTitle: i$,
  webDetail: s$
}, cr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function dr(e) {
  return String(e + 1).padStart(2, "0");
}
function c$({ step: e, index: a, connection: n }) {
  const r = cr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: dr(a) }),
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
function d$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(c$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function u$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: dr(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...cr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function m$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(u$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function GR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(m$, { ...e }) : /* @__PURE__ */ t(d$, { ...e });
}
const h$ = "_list_1gu6a_2", w$ = "_check_1gu6a_10", f$ = "_body_1gu6a_16", _$ = "_text_1gu6a_23", v$ = "_pending_1gu6a_32", b$ = "_measured_1gu6a_37", Qe = {
  list: h$,
  check: w$,
  body: f$,
  text: _$,
  pending: v$,
  measured: b$
};
function p$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function g$({ check: e }) {
  const a = p$(e.passed);
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
function UR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(g$, { check: a }, a.text)) });
}
const y$ = "_root_a6xzy_2", N$ = "_list_a6xzy_10", k$ = "_line_a6xzy_21", $$ = "_at_a6xzy_48", C$ = "_text_a6xzy_52", S$ = "_foot_a6xzy_56", R$ = "_idle_a6xzy_68", T$ = "_caret_a6xzy_76", x$ = "_jump_a6xzy_83", he = {
  root: y$,
  list: N$,
  line: k$,
  at: $$,
  text: C$,
  foot: S$,
  idle: R$,
  caret: T$,
  jump: x$
}, L$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : L$.format(new Date(e));
}
const A$ = { warn: "warning", ok: "ok" };
function E$({ kind: e }) {
  const a = A$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function I$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function M$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(I$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const B$ = 8;
function P$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > B$;
}
function q$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const ur = Te(null);
function VR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Vt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(ur.Provider, { value: i, children: n });
}
function j$() {
  const e = Re(ur), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function YR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = j$(), [u, m] = p(!1), w = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(P$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(E$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(M$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(q$, { shown: u, onJump: v })
    ] })
  ] });
}
const D$ = "_row_1k8wl_2", O$ = "_head_1k8wl_14", H$ = "_author_1k8wl_20", F$ = "_eta_1k8wl_25", z$ = "_edited_1k8wl_26", W$ = "_body_1k8wl_32", K$ = "_reason_1k8wl_37", G$ = "_actions_1k8wl_42", Ne = {
  row: D$,
  head: O$,
  author: H$,
  eta: F$,
  edited: z$,
  body: W$,
  reason: K$,
  actions: G$
}, U$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function V$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Y$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function J$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function X$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Q$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(Y$, { ...e }) : /* @__PURE__ */ t(J$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function JR(e) {
  const { comment: a } = e;
  X$(e);
  const n = N(), r = `${n}-unavailable`, l = U$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: V$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(Q$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const Z$ = "_root_rvhdw_2", e0 = "_attach_rvhdw_11", a0 = "_actions_rvhdw_17", t0 = "_reply_rvhdw_23", n0 = "_replyField_rvhdw_28", r0 = "_send_rvhdw_54", l0 = "_sendIcon_rvhdw_65", o0 = "_sendsAs_rvhdw_75", Be = {
  root: Z$,
  attach: e0,
  actions: a0,
  reply: t0,
  replyField: n0,
  send: r0,
  sendIcon: l0,
  sendsAs: o0
};
function mr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function i0() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function s0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function c0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = mr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    s0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(i0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function XR(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(c0, { ...e }) : /* @__PURE__ */ t(d0, { ...e });
}
function d0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = mr(e);
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
const u0 = "_list_1yhks_2", m0 = "_item_1yhks_6", h0 = "_body_1yhks_22", w0 = "_text_1yhks_28", f0 = "_evidence_1yhks_37", _0 = "_consequence_1yhks_49", v0 = "_note_1yhks_54", We = {
  list: u0,
  item: m0,
  body: h0,
  text: w0,
  evidence: f0,
  consequence: _0,
  note: v0
};
function b0({ criterion: e }) {
  return /* @__PURE__ */ t(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Wt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function p0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function g0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: We.body, children: [
    /* @__PURE__ */ t("span", { className: We.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: We.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: We.consequence, children: p0(e.why) })
    ] })
  ] });
}
function y0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: We.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(b0, { criterion: e }),
    /* @__PURE__ */ t(g0, { criterion: e })
  ] });
}
function QR({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${We.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(y0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: We.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const N0 = "_list_dwhoz_2", k0 = "_rung_dwhoz_6", $0 = "_name_dwhoz_18", C0 = "_actor_dwhoz_32", ga = {
  list: N0,
  rung: k0,
  name: $0,
  actor: C0
}, S0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function R0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = S0[e.state];
  return /* @__PURE__ */ o("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function ZR({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(R0, { rung: a }, a.name)) });
}
const T0 = "_sheet_pw37w_2", x0 = "_title_pw37w_9", L0 = "_stage_pw37w_15", A0 = "_effects_pw37w_20", E0 = "_effect_pw37w_20", I0 = "_numeral_pw37w_31", M0 = "_effectText_pw37w_38", B0 = "_refusals_pw37w_43", P0 = "_reasons_pw37w_52", q0 = "_reason_pw37w_52", j0 = "_actions_pw37w_62", ue = {
  sheet: T0,
  title: x0,
  stage: L0,
  effects: A0,
  effect: E0,
  numeral: I0,
  effectText: M0,
  refusals: B0,
  reasons: P0,
  reason: q0,
  actions: j0
};
function D0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function e2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      hu,
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
      /* @__PURE__ */ t(D0, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const O0 = "_list_1rowi_2", H0 = "_path_1rowi_7", F0 = "_head_1rowi_21", z0 = "_label_1rowi_28", W0 = "_consequence_1rowi_35", K0 = "_ask_1rowi_36", ea = {
  list: O0,
  path: H0,
  head: F0,
  label: z0,
  consequence: W0,
  ask: K0
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
function G0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function U0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Kt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Kt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(G0, { path: e, primary: a, onChoose: n })
  ] });
}
function a2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(U0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const V0 = "_list_1m7i0_2", Y0 = "_item_1m7i0_6", J0 = "_node_1m7i0_18", X0 = "_body_1m7i0_24", Q0 = "_head_1m7i0_30", Z0 = "_stage_1m7i0_36", eC = "_version_1m7i0_41", aC = "_sentence_1m7i0_49", tC = "_meta_1m7i0_54", $e = {
  list: V0,
  item: Y0,
  node: J0,
  body: X0,
  head: Q0,
  stage: Z0,
  version: eC,
  sentence: aC,
  meta: tC
}, nC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function rC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function lC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(je, { size: 9, kind: nC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(rC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function t2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(lC, { entry: a }, a.stage + String(n))) });
}
const oC = "_thread_1e70p_3", iC = "_turn_1e70p_8", sC = "_who_1e70p_27", cC = "_body_1e70p_32", ya = {
  thread: oC,
  turn: iC,
  who: sC,
  body: cC
}, hr = Te(!1);
function n2({ children: e, density: a }) {
  return /* @__PURE__ */ t(hr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function r2({ turn: e }) {
  if (!Re(hr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ya.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ya.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ya.body} ward-chat-body`, children: e.body })
  ] });
}
const dC = "_list_yiolt_3", uC = "_row_yiolt_7", mC = "_label_yiolt_20", hC = "_n_yiolt_26", wC = "_cause_yiolt_33", oa = {
  list: dC,
  row: uC,
  label: mC,
  n: hC,
  cause: wC
};
function fC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const _C = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function vC({ row: e, formatNumber: a }) {
  return fC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(je, { size: 8, ..._C[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(bC, { cause: e.cause })
  ] });
}
function bC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function l2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(vC, { row: n, formatNumber: a }, n.label)) });
}
const pC = "_root_1jxwp_2", gC = {
  root: pC
};
function o2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: gC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const yC = "_row_dhbre_3", NC = "_key_dhbre_13", kC = "_stack_dhbre_24", $C = "_value_dhbre_32", CC = "_evidence_dhbre_39", SC = "_mark_dhbre_47", Xe = {
  row: yC,
  key: NC,
  stack: kC,
  value: $C,
  evidence: CC,
  mark: SC
};
function RC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function i2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(RC, { state: e.state }) })
  ] });
}
const TC = "_cell_gh2sd_2", xC = {
  cell: TC
}, LC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function AC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function EC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function IC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: AC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function MC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function s2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  EC(e, n);
  const r = MC(e);
  return /* @__PURE__ */ t(
    Ru,
    {
      label: "Rejection routing",
      columns: LC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: xC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: IC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(wh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const BC = "_row_1f2re_2", PC = "_title_1f2re_12", qC = "_turns_1f2re_18", jC = "_waiting_1f2re_19", DC = "_resolved_1f2re_20", OC = "_activity_1f2re_21", HC = "_cost_1f2re_28", FC = "_link_1f2re_29", zC = "_tableLink_1f2re_47", WC = "_tableRecord_1f2re_48", KC = "_tableRow_1f2re_59", GC = "_tableTitle_1f2re_71", UC = "_tableResolved_1f2re_76", VC = "_tableMeta_1f2re_87", YC = "_tableCost_1f2re_94", JC = "_tableActivity_1f2re_95", XC = "_tableState_1f2re_105", D = {
  row: BC,
  title: PC,
  turns: qC,
  waiting: jC,
  resolved: DC,
  activity: OC,
  cost: HC,
  link: FC,
  tableLink: zC,
  tableRecord: WC,
  tableRow: KC,
  tableTitle: GC,
  tableResolved: UC,
  tableMeta: VC,
  tableCost: YC,
  tableActivity: JC,
  tableState: XC
}, wr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function QC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function ZC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function eS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const aS = { duplicate: "Closed · duplicate" };
function tS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function nS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function rS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function lS({ session: e, href: a }) {
  const n = wr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: ZC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      eS(e.resolved),
      /* @__PURE__ */ t(tS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(nS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: QC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: aS[e.state] ?? n.label }),
      /* @__PURE__ */ t(rS, { link: e.link })
    ] }) })
  ] });
}
function oS({ session: e }) {
  const a = wr[e.state];
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
function c2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(lS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(oS, { session: e.session });
}
const iS = "_block_1yy2v_3", sS = "_list_1yy2v_9", cS = "_line_1yy2v_14", et = {
  block: iS,
  list: sS,
  line: cS
}, dS = { warn: "warning", ok: "ok" };
function uS({ kind: e }) {
  const a = dS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function mS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(uS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function d2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(mS, { line: n }, `${r}-${n.text}`)) }) });
}
const hS = "_band_tt7hp_1", wS = "_head_tt7hp_8", fS = "_cell_tt7hp_19", _S = "_index_tt7hp_35", vS = "_title_tt7hp_42", bS = "_note_tt7hp_48", pS = "_cellTitle_tt7hp_53", gS = "_cellBody_tt7hp_58", yS = "_tag_tt7hp_64", ye = {
  band: hS,
  head: wS,
  cell: fS,
  index: _S,
  title: vS,
  note: bS,
  cellTitle: pS,
  cellBody: gS,
  tag: yS
}, Ut = 4;
function u2({ index: e, title: a, note: n, cells: r }) {
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
  ES as ACCENT_PRESETS,
  XS as ActionStack,
  YR as ActivityConsole,
  OS as AdminIcon,
  L_ as AgentCard,
  HS as AppShell,
  IR as AppearanceStrip,
  u2 as Band,
  VS as BarChart,
  Vh as BoardColumn,
  mR as BoardFootnote,
  hR as BoardHeader,
  jS as BoardIcon,
  rR as BoardScroller,
  b as Btn,
  AS as CHIP_ROLES,
  Zn as CREDENTIAL_COLUMNS,
  US as Callout,
  MR as CapabilityRow,
  r2 as ChatMessage,
  rn as Checkbox,
  h as Chip,
  ta as ClampText,
  JR as ClarificationRow,
  kR as ClauseRuleRow,
  NR as ClauseRules,
  In as ColourLadder,
  BR as ComponentRow,
  XR as Composer,
  fR as ConfigRow,
  wR as ConfigRowHead,
  ot as ConnectionMark,
  VR as ConsoleAnnounceProvider,
  n2 as Conversation,
  hu as CostMeter,
  qR as CredentialRow,
  PR as CredentialRowHead,
  QR as CriteriaList,
  Si as Crumb,
  IS as DENSITIES,
  l2 as DeliveryHealth,
  iR as DeniedState,
  PS as DisabledScope,
  CR as DryRunRail,
  wh as EmptyState,
  jR as EnvCard,
  M as Field,
  oR as FilteredEmpty,
  tR as FormStack,
  Da as GateChecklist,
  ZR as GateLadder,
  Ru as Grid,
  RR as HandoffRuleRow,
  SR as HandoffRules,
  qS as HomeIcon,
  _R as ItemDrawer,
  DR as KeyPanel,
  Mr as LIVE_EVENT_TYPES,
  Qf as LegacyBoardColumn,
  bR as LegacyBoardHeader,
  pR as LegacyConfigRow,
  yR as LegacyItemDrawer,
  Kf as LegacyOverCapNote,
  gR as LegacyPreviewRail,
  Ln as LegacyWorkCard,
  xe as LiveIndicator,
  sR as LoadFailed,
  uR as Loading,
  lr as MCP_SERVER_COLUMNS,
  lt as Mark,
  HR as MarkUpload,
  je as Marker,
  zR as McpServerRow,
  FR as McpServerRowHead,
  Ks as Menu,
  Es as MenuButton,
  TR as NewStreamModal,
  vh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  $R as PARTIAL_STEP_REASON,
  or as POLICY_CHIP_WIDTH,
  ZS as PageFrame,
  GS as PageHeader,
  YS as PlainList,
  WR as PolicyRow,
  vR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Kn as RULE_ACTIONS,
  $n as Radio,
  o2 as ReadyChecklist,
  aR as RecordSection,
  e2 as RequeueSheet,
  a2 as ResolveBlock,
  i2 as ResolvedFieldRow,
  KR as RoleMatrixRow,
  s2 as RoutingTable,
  xR as RuleRow,
  GR as RunbookSteps,
  Ir as STREAM_STEPS,
  nR as SectionBand,
  At as SectionHeader,
  Nn as SegmentedControl,
  hn as Select,
  c2 as SessionRow,
  WS as Sidebar,
  LR as StageColumn,
  lR as StageGrid,
  t2 as StageHistory,
  up as StageListEditor,
  cR as StaleStrip,
  Pa as StatStrip,
  KS as StreamAvatar,
  AR as StreamRow,
  DS as StudioIcon,
  eR as SubjectRail,
  Ge as Switch,
  zS as TabLinks,
  JS as TableHead,
  FS as Tabs,
  RS as ThemeProvider,
  ER as ToolRow,
  QS as TopBar,
  Lm as Tree,
  Rn as TreeRow,
  d2 as TypedInputBlock,
  vo as UNSAFE_HREF,
  UR as ValidationList,
  CS as VisibilityProvider,
  SS as Visible,
  LS as WARD_VERSION,
  ja as WorkCard,
  dR as WriteUnavailableStrip,
  QC as agoSince,
  Nr as clock,
  Tp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  xS as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  ov as ladderValidation,
  Q1 as mcpConnectionChip,
  J1 as mcpToolName,
  ne as money,
  we as ms,
  Tn as ordered,
  Jt as ratio,
  bN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  MS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  qr as streamHex,
  Jc as streamInitials,
  Br as streamVars,
  va as useBorderFlash,
  qe as useDisabledScope,
  Lr as useFocusTrap,
  BS as useLiveFeed,
  TS as useReturnFocus,
  La as useRovingTabindex,
  nt as useTicker,
  kr as useVisible,
  W as v,
  OR as validateMark,
  ua as validatedStep,
  Qt as validatedStreamSteps
};
