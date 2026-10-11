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
function TS({ hidden: e, children: a }) {
  const n = Vt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Xt.Provider, { value: n, children: a });
}
function $r(e) {
  return !Re(Xt).has(e);
}
function xS({ id: e, children: a, fallback: n = null }) {
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
function LS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
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
function AS(e, a = !0) {
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
const ES = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, IS = "0.2.0", MS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Mr = [1, 2, 3, 4, 5, 6], Qt = [1, 2, 3], Br = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], BS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], PS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
function qS(e) {
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
function jS(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), w = f(0), v = f(0), y = f(!1), L = f("reconnecting"), P = X((R) => {
    L.current = R, r(R);
  }, []), le = X(() => {
    c.current = Date.now();
  }, []), Ae = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const De = Fr(R, G, ge);
        De !== null && (De.id && (d.current = De.id), le(), y.current = !1, P("live"), i(De.at), Ae(De));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), P("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && P("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ae, R);
      }
    });
  }, [Ae, P, le, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = zr(R, L.current);
    G && P(G);
    const ge = m.current;
    Wr(R, y.current, ge) && Ue(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(v.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [ae, Ue, P]), { connection: n, lastEventAt: l, subscribe: Ve };
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
function DS({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Rl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(Zt.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Le() {
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
  var a;
  return ((a = Le()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(Wl, { ...e });
}
function Wl(e) {
  const a = Le();
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
const Kl = "_scrim_18idy_2", Gl = "_drawer_18idy_10", Ul = "_sheet_18idy_14", Vl = "_modal_18idy_18", Yl = "_panel_18idy_23", Jl = "_start_18idy_39", Xl = "_header_18idy_62", Ql = "_title_18idy_70", Zl = "_body_18idy_74", eo = "_close_18idy_101", Ce = {
  scrim: Kl,
  drawer: Gl,
  sheet: Ul,
  modal: Vl,
  panel: Yl,
  start: Jl,
  header: Xl,
  title: Ql,
  body: Zl,
  close: eo
}, ao = Te(null), Na = [], ka = /* @__PURE__ */ new Map();
function to(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function no(e, a) {
  let n = ka.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ka.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ro(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !to(r) && no(e, r);
}
function lo(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (ro(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function oo(e) {
  for (const a of e.claims) {
    const n = ka.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), ka.delete(a)));
  }
}
function io(e, a) {
  const n = { root: e, claims: [] };
  return Na.push(n), lo(n, a), n;
}
function so(e) {
  const a = Na.indexOf(e);
  a >= 0 && Na.splice(a, 1), oo(e);
}
function yt(e) {
  return e !== null && Na.at(-1) === e;
}
function co(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = io(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      so(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => yt(r.current), []);
}
function uo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function mo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ho({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function wo(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function fo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function _o(e) {
  const a = Re(ao);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = _o(e.container), i = Ia("(min-width: 768px)"), s = uo(e.kind, i), c = mo(e, r), d = Ar(n), u = co(a, l, e.returnFocusTo), m = X(() => {
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
        className: wo(s),
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
            className: fo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(ho, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const vo = /^([a-z][a-z0-9+.-]*):/i, bo = /* @__PURE__ */ new Set(["http", "https"]), po = "#";
function go(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = vo.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = go(e);
  return a === void 0 || bo.has(a) ? e : po;
}
function yo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function en(e) {
  const a = yo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function No(e, a) {
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
function ko(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function an(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = ko(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), en(r);
  }, [e, a, n]);
}
const $o = "_row_160e9_2", Co = {
  row: $o
};
function So(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return No(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Co.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...So(l, r), ...c, children: a });
}
const Ro = "_icon_1ylqy_2", To = {
  icon: Ro
};
function da({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: To.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function OS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function HS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function FS() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function zS() {
  return /* @__PURE__ */ t(da, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function xo() {
  return /* @__PURE__ */ o(da, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const tn = "ward:sidebar-collapsed", Lo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ao() {
  try {
    return window.localStorage.getItem(tn) === "true";
  } catch {
    return !1;
  }
}
function Eo(e) {
  try {
    window.localStorage.setItem(tn, String(e));
  } catch {
  }
}
function Io(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Mo(e) {
  return e instanceof Element && e.closest(Lo) !== null;
}
function Bo(e) {
  return e.key === "[" && !Io(e) && !Mo(e.target);
}
function Po(e) {
  const [a, n] = p(Ao), r = () => {
    Eo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Bo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function qo() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function jo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Do({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: nn(e, !1) }) });
}
function Oo(e, a, n) {
  const r = n === void 0 && e !== void 0 && !a, { collapsed: l, toggle: i } = Po(r);
  return n === void 0 ? Ho(r, l, i) : Fo(n, a, i);
}
function Ho(e, a, n) {
  return { enabled: e, collapsed: e && a, rail: e && a, owned: !1, toggle: n };
}
function Fo(e, a, n) {
  return { enabled: !1, collapsed: e && !a, rail: !1, owned: !0, toggle: n };
}
const zo = (e) => e ? "" : void 0;
function nn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function Wo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(xo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Ko({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Go({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Ko, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Uo({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Wo, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.rail, children: nn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(Go, { items: n ?? [], label: a })
  ] });
}
function Vo({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i, collapsed: s }) {
  const c = r != null, d = qo(), u = Oo(i, d.narrow, s), m = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(u.collapsed), "data-consumer-fold": zo(u.owned), children: [
    !d.narrow && /* @__PURE__ */ t(Uo, { sidebar: e, label: m, iconRail: i, fold: u }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(jo, { header: a, label: m, drawer: d }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Do, { sidebar: e, label: m, drawer: d })
  ] });
}
function Yo({ destinations: e, active: a }) {
  const n = f(null);
  return an(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Jo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function Xo() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Qo({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Zo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function ei(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Yo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Jo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Qo, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function ai(e) {
  const a = N(), n = Xo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(ei, { ...e, menu: n }),
    /* @__PURE__ */ t(Zo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function ti(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function WS(e) {
  return ti(e) ? /* @__PURE__ */ t(Vo, { ...e }) : /* @__PURE__ */ t(ai, { ...e });
}
const ni = "_root_197jc_2", ri = "_row_197jc_8", li = "_box_197jc_14", oi = "_label_197jc_21", ii = "_lockedNote_197jc_26", si = "_consequence_197jc_34", ci = "_sample_197jc_69", He = {
  root: ni,
  row: ri,
  box: li,
  label: oi,
  lockedNote: ii,
  consequence: si,
  sample: ci
};
function di(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function ui({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${He.consequence} ward-check-consequence`, children: a }) : null;
}
function mi({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${He.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function hi({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: He.sample, "aria-hidden": "true", children: e }) : null;
}
function rn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Le(), l = di(e, r);
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
        /* @__PURE__ */ t(mi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(hi, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(ui, { id: n, text: e.consequence })
  ] });
}
const wi = "_chip_pq6tb_2", fi = {
  chip: wi
}, _i = {
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
function vi(e, a) {
  if (e === "stream") return bi(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = _i[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function bi(e) {
  if (!e || !sa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${fi.chip} ward-chip ward-chip--${e}`, style: vi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const pi = "_clamp_zn74g_3", Nt = {
  clamp: pi
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
const gi = "_root_13eei_3", yi = "_nav_13eei_8", Ni = "_list_13eei_16", ki = "_item_13eei_24", $i = "_link_13eei_44", Ci = "_sep_13eei_54", Si = "_current_13eei_58", Ri = "_chips_13eei_62", Ee = {
  root: gi,
  nav: yi,
  list: Ni,
  item: ki,
  link: $i,
  sep: Ci,
  current: Si,
  chips: Ri
};
function Ti({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ee.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ee.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ee.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ee.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ee.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ee.link} ward-target`, href: H(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ee.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ee.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
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
const xi = 500;
function on(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function sn() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, xi), e.current);
}
const ha = 4;
function Li(e, a, n) {
  const r = Math.max(0, n - e.bottom - ha * 2), l = Math.max(0, e.top - ha * 2);
  return a <= r || r >= l ? { top: e.bottom + ha, maxHeight: r } : { top: e.top - ha - Math.min(a, l), maxHeight: l };
}
function Ai(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Ei(e, a, n, r) {
  return { ...Li(e, a.height, n.height), left: Ai(e, a.width, n.width, r) };
}
function ba(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ii(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", ba(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Mi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = Mi(e), l = Ii(e, a), i = Ei(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: ba(i.left - l.box.left), top: ba(i.top - l.box.top), maxHeight: ba(i.maxHeight) }), r();
}
function Bi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function cn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Bi(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Pi = "_root_axvxm_2", qi = "_trigger_axvxm_7", ji = "_value_axvxm_32", Di = "_menu_axvxm_50", Oi = "_find_axvxm_72", Hi = "_list_axvxm_88", Fi = "_option_axvxm_99", zi = "_check_axvxm_118", Wi = "_empty_axvxm_129", fe = {
  root: Pi,
  trigger: qi,
  value: ji,
  menu: Di,
  find: Oi,
  list: Hi,
  option: Fi,
  check: zi,
  empty: Wi
}, Ki = 7;
function Gi(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Ui(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Yt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Gi(e.options, l),
    findable: e.options.length > Ki,
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
function Vi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Yi(e) {
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
function Ji(e) {
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
const Xi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Qi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Xi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Zi({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function es({ menu: e, ids: a, focusRef: n }) {
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
function as({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Yi(a), s = f(null);
  cn(l, s);
  const c = (d) => {
    on(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(es, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: un(a, Ji(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Zi, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function ts(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function mn(...e) {
  return e.filter(Boolean).join(" ");
}
function ns(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function rs({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Le()) == null ? void 0 : c.reason;
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
      ...Qi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: ns(e) })
    }
  );
}
function hn(e) {
  const a = Le(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Ui(n, s), u = Vi(d.open, c);
  return ln(d.open, i, () => d.close(!1)), ts(d, l), /* @__PURE__ */ o("div", { ref: i, className: mn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(rs, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(as, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const ls = "_field_13oav_2", os = "_label_13oav_8", is = "_labelHidden_13oav_15", ss = "_control_13oav_25", cs = "_mono_13oav_45", ds = "_area_13oav_50", us = "_invalid_13oav_57", qe = {
  field: ls,
  label: os,
  labelHidden: is,
  control: ss,
  mono: cs,
  area: ds,
  invalid: us
}, ms = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, wn = (e) => `${e}-label`;
function hs({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? ms : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ws({ props: e, controlProps: a, cls: n }) {
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
function fs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const _s = { input: hs, select: ws, textarea: fs };
function vs(e, a, n) {
  const r = _s[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function bs(e, a, n, r) {
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
function ps(e) {
  const a = e.mono ? [qe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [qe.area] : [];
  return [qe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function gs(e) {
  return e ? `${qe.label} ${qe.labelHidden} ward-field-label` : `${qe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = bs(e, a, n, Le()), l = ps(e);
  return /* @__PURE__ */ o("div", { className: `${qe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: wn(a), className: gs(e.labelHidden), htmlFor: a, children: e.label }),
    vs(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${qe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ys = "_root_1gft5_2", Ns = "_trigger_1gft5_9", ks = "_panel_1gft5_33", $s = "_menu_1gft5_52", Cs = "_group_1gft5_57", Ss = "_heading_1gft5_62", Rs = "_item_1gft5_68", Ts = "_separator_1gft5_94", xs = "_footer_1gft5_100", _e = {
  root: ys,
  trigger: Ns,
  panel: ks,
  menu: $s,
  group: Cs,
  heading: Ss,
  item: Rs,
  separator: Ts,
  footer: xs
}, fn = Te(null);
function Ls(e, a) {
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
const As = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Es(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = As.get(a.key);
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
function Is(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: _n(_e.trigger, r) };
}
function Ms(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = Ls(e.defaultOpen === !0, l);
  return ln(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: _n(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Is(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Es(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(fn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Bs(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Ps(e) {
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
const qs = (e) => e.split("").every((a) => a === e[0]);
function js(e, a, n) {
  const r = qs(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = vn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ds(e) {
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
function Os(e, a) {
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
function Hs(e, a) {
  const n = f(!1), r = sn(), l = Os(e, a), i = (s) => {
    on(s) && e.focus(js(e.items, e.current(), r(s.key)));
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
function Fs(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function zs({ row: e, nav: a, popup: n }) {
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
    ...zs(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Ws({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(bn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Ks({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ws, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(bn, { row: e.row, nav: a, popup: n });
}
function Gs() {
  const e = Re(fn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Us({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Gs(), c = f(null);
  cn(s, c, n);
  const d = Bs(e), u = Ds(d.flatMap(Ps).map((w) => w.item)), m = Hs(u, r);
  return Fs(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(Ks, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
function Vs(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function pn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !Vs(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const Ys = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Js({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Ys(a, r) <= e) return i;
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
function Xs(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: Ha(a.columnGap)
  };
}
function Qs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Zs = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function ec(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Xs(i);
      l((d) => Zs(d, c) ? d : c);
    };
    return s(), Qs(i, s);
  }, [e, n]), r && Js(r, a);
}
const ac = "_strip_jqyo6_2", tc = "_fits_jqyo6_19", nc = "_probe_jqyo6_27", rc = "_moreRoot_jqyo6_36", lc = "_more_jqyo6_36", oc = "_tab_jqyo6_55", ic = "_count_jqyo6_91", ve = {
  strip: ac,
  fits: tc,
  probe: nc,
  moreRoot: rc,
  more: lc,
  tab: oc,
  count: ic
}, gn = "More";
function sc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const yn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Nn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const cc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function dc({ tab: e, active: a, place: n, onChange: r }) {
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
function uc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function mc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Ms, { label: gn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Us, { align: "end", entries: e.map((r) => ({ label: yn(r), onSelect: () => n(r.id) })) }) });
}
function hc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : cc;
}
function KS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = La({ orientation: "horizontal" }), s = sc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  pn(c, l);
  const d = ec(c, s, e.map(yn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Nn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(dc, { tab: m, active: a, place: hc(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: gn }),
    u.length > 0 && /* @__PURE__ */ t(mc, { tabs: u, trigger: i.itemProps(e.length), onPick: uc(c, n) })
  ] });
}
const St = 7;
function GS({ links: e, active: a, label: n, level: r }) {
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
const wc = "_root_v56ff_3", fc = "_segment_v56ff_9", Rt = {
  root: wc,
  segment: fc
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
const _c = "_sidebar_s9o1j_3", vc = "_brand_s9o1j_9", bc = "_mark_s9o1j_17", pc = "_word_s9o1j_24", gc = "_nav_s9o1j_30", yc = "_navItem_s9o1j_39", Nc = "_footLink_s9o1j_49", kc = "_group_s9o1j_58", $c = "_groupName_s9o1j_65", Cc = "_agents_s9o1j_81", Sc = "_agent_s9o1j_81", Rc = "_root_s9o1j_96", Tc = "_agentTop_s9o1j_105", xc = "_dot_s9o1j_112", Lc = "_agentName_s9o1j_124", Ac = "_agentMeta_s9o1j_138", Ec = "_foot_s9o1j_49", Ic = "_footName_s9o1j_150", Mc = "_footLinks_s9o1j_157", Bc = "_linkBrand_s9o1j_184", Pc = "_label_s9o1j_205", qc = "_note_s9o1j_210", jc = "_footer_s9o1j_226", x = {
  sidebar: _c,
  brand: vc,
  mark: bc,
  word: pc,
  nav: gc,
  navItem: yc,
  new: "_new_s9o1j_48",
  footLink: Nc,
  group: kc,
  groupName: $c,
  agents: Cc,
  agent: Sc,
  root: Rc,
  agentTop: Tc,
  dot: xc,
  agentName: Lc,
  agentMeta: Ac,
  foot: Ec,
  footName: Ic,
  footLinks: Mc,
  linkBrand: Bc,
  label: Pc,
  note: qc,
  footer: jc
};
function Dc({ agent: e }) {
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
function Oc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Hc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Dc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Oc, { shared: i })
  ] });
}
function Fc(e) {
  return e.destinations ?? e.items ?? [];
}
function zc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Wc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Kc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Gc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(zc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Fc(e).map((a) => /* @__PURE__ */ t(Kc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Wc, { children: e.children })
  ] });
}
function Uc(e) {
  return "agents" in e;
}
function US(e) {
  return Uc(e) ? /* @__PURE__ */ t(Hc, { ...e }) : /* @__PURE__ */ t(Gc, { ...e });
}
const Vc = "_mark_wlgi8_3", Yc = {
  mark: Vc
}, Jc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Yc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Jc[e]
    }
  );
}
const Xc = "_avatar_1t33a_3", Qc = {
  avatar: Xc
};
function Zc(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function ed(e) {
  return e != null && sa(e) ? Pr(e) : void 0;
}
function VS({ name: e, step: a, size: n = "md" }) {
  return /* @__PURE__ */ t("span", { className: Qc.avatar, "data-size": n, "aria-hidden": "true", style: ed(a), children: Zc(e) });
}
const ad = "_marker_br9fi_2", td = {
  marker: ad
}, nd = {
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
}, rd = { running: " ward-running" };
function je({ size: e, kind: a, label: n }) {
  const r = { "--marker": nd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${td.marker} ward-marker ward-marker--${a}${rd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const ld = "_root_ti0pq_2", od = "_chip_ti0pq_11", id = "_noCase_ti0pq_23", wa = {
  root: ld,
  chip: od,
  noCase: id
};
function sd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = sd(a, n), l = nt(r, e === "reconnecting");
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
const cd = "_root_u8ort_2", dd = "_context_u8ort_13", ud = "_row_u8ort_1", md = "_heading_u8ort_27", hd = "_headingWrap_u8ort_35", wd = "_chips_u8ort_40", fd = "_title_u8ort_48", _d = "_consequence_u8ort_58", vd = "_actionsWrap_u8ort_65", bd = "_actions_u8ort_65", pd = "_action_u8ort_65", gd = "_overflowPanel_u8ort_94", yd = "_measureClip_u8ort_105", Nd = "_measure_u8ort_105", Y = {
  root: cd,
  context: dd,
  row: ud,
  heading: md,
  headingWrap: hd,
  chips: wd,
  title: fd,
  consequence: _d,
  actionsWrap: vd,
  actions: bd,
  action: pd,
  overflowPanel: gd,
  measureClip: yd,
  measure: Nd
};
function kd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function $d({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(kd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Cd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function Sd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Rd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function Td(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function xd({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ti, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function Ld(...e) {
  return e.some((a) => a === null);
}
function Ad(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Ed(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Ad(e);
}
function Id(e, a, n, r, l) {
  if (l === 0 || Ld(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Ed(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function Md(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Bd(e) {
  return vr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Pd(e, a) {
  return a.length === 0 && e.length === 1 && Bd(e[0]);
}
function qd(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!Md(d)) return;
    const u = () => c(Id(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function jd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Dd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function YS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = qd(i, Pd(i, s)), P = s.length > 0, { disclosure: le, close: Ae } = Td(L || P, v), ae = Sd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(xd, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t($d, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Dd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(Cd, { actions: i, hasMore: P, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Rd, { actions: ae, disclosure: le, onEscape: Ae }),
    /* @__PURE__ */ t(jd, { actions: i, hasMore: P, measureRef: y })
  ] });
}
const Od = "_root_td96x_2", Hd = "_body_td96x_16", xt = {
  root: Od,
  body: Hd
};
function JS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const Fd = "_root_bf1pc_2", zd = "_table_bf1pc_9", Wd = "_caption_bf1pc_14", Kd = "_series_bf1pc_23", Gd = "_category_bf1pc_31", Ud = "_cell_bf1pc_39", Vd = "_track_bf1pc_45", Yd = "_lane_bf1pc_52", Jd = "_bar_bf1pc_56", Xd = "_value_bf1pc_63", Qd = "_swatch_bf1pc_70", Zd = "_empty_bf1pc_78", J = {
  root: Fd,
  table: zd,
  caption: Wd,
  series: Kd,
  category: Gd,
  cell: Ud,
  track: Vd,
  lane: Yd,
  bar: Jd,
  value: Xd,
  swatch: Qd,
  empty: Zd
}, eu = "—", Lt = 6;
function au(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function tu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function $n(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function nu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function ru({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = nu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function lu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": $n(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ou({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function iu({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = eu }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(lu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(ru, { value: u.values[d], top: r, step: $n(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function XS(e) {
  au(e.categories, e.series);
  const a = tu(e.series);
  return a === 0 ? /* @__PURE__ */ t(ou, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(iu, { ...e, top: a });
}
const su = "_root_1bfqw_2", cu = "_figure_1bfqw_7", du = "_of_1bfqw_13", uu = "_bar_1bfqw_18", mu = "_rows_1bfqw_38", hu = "_row_1bfqw_38", wu = "_label_1bfqw_49", fu = "_amount_1bfqw_54", Ie = {
  root: su,
  figure: cu,
  of: du,
  bar: uu,
  rows: mu,
  row: hu,
  label: wu,
  amount: fu
};
function _u({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      ne(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        ne(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${ne(e)} of ${ne(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: ne(l.amount) })
    ] }, l.label)) })
  ] });
}
const vu = "_frame_9xel2_2", bu = "_table_9xel2_6", pu = "_th_9xel2_12", gu = "_td_9xel2_13", yu = "_sort_9xel2_48", Nu = "_row_9xel2_60", ku = "_empty_9xel2_68", Be = {
  frame: vu,
  table: bu,
  th: pu,
  td: gu,
  sort: yu,
  row: Nu,
  empty: ku
}, $u = { asc: "ascending", desc: "descending" };
function Cu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return $u[a.direction];
}
function Su(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Be.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Ru(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Tu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Be.th,
      style: Ru(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Cu(e, a),
      children: Su(e, n)
    }
  );
}
function xu({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: Be.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t("td", { className: Be.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Lu({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: Be.empty, children: u }) : /* @__PURE__ */ t("div", { className: Be.frame, children: /* @__PURE__ */ o("table", { className: Be.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Be.head, children: a.map((m) => /* @__PURE__ */ t(Tu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(xu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Au = "_list_v0s52_2", Eu = {
  list: Au
};
function QS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Eu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Iu = "_label_1u62a_2", Mu = {
  label: Iu
};
function ZS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: Mu.label, children: a.header }) }, a.key)) }) });
}
const Bu = "_stack_bp6a0_2", Pu = {
  stack: Bu
};
function eR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Pu.stack, "data-ward-action-stack": "", children: e });
}
const qu = "_set_1z0sq_2", ju = "_legend_1z0sq_7", Du = "_row_1z0sq_15", Ou = "_control_1z0sq_20", Hu = "_input_1z0sq_26", Fu = "_label_1z0sq_31", zu = "_consequence_1z0sq_36", Oe = {
  set: qu,
  legend: ju,
  row: Du,
  control: Ou,
  input: Hu,
  label: Fu,
  consequence: zu
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
const Wu = "_root_11gpw_2", Ku = "_head_11gpw_10", Gu = "_note_11gpw_29", Uu = "_index_11gpw_34", Vu = "_dot_11gpw_38", Yu = "_counter_11gpw_49", Ju = "_trailing_11gpw_57", Fe = {
  root: Wu,
  head: Ku,
  note: Gu,
  index: Uu,
  dot: Vu,
  counter: Yu,
  trailing: Ju
};
function Xu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Qu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Fe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(Xu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(Qu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const Zu = "_strip_ww53x_2", em = "_cell_ww53x_7", am = "_value_ww53x_12", tm = "_link_ww53x_29", nm = "_label_ww53x_49", Ke = {
  strip: Zu,
  cell: em,
  value: am,
  link: tm,
  label: nm
};
function rm(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Sn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function lm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function om({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return rm(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(lm, { cell: n }, n.label) : /* @__PURE__ */ t(om, { cell: n, href: n.href }, n.label)) });
}
const im = "_root_1eb1u_2", sm = "_track_1eb1u_8", cm = "_thumb_1eb1u_46", dm = "_labelHidden_1eb1u_64", um = "_label_1eb1u_64", mm = "_lockedNote_1eb1u_84", ze = {
  root: im,
  track: sm,
  thumb: cm,
  labelHidden: dm,
  label: um,
  lockedNote: mm
};
function hm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function wm(e) {
  return e ? `${ze.label} ${ze.labelHidden}` : ze.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Le(), { on: m, off: w } = hm(a, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: wm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: ze.lockedNote, children: "always on" })
    ] })
  ] });
}
const fm = "_bar_1vp69_2", _m = "_skip_1vp69_11", vm = "_mark_1vp69_22", bm = "_nav_1vp69_30", pm = "_list_1vp69_34", gm = "_select_1vp69_41", ym = "_selectTrigger_1vp69_45", Nm = "_dest_1vp69_52", km = "_actor_1vp69_71", $m = "_actorMark_1vp69_84", Cm = "_actorLabel_1vp69_89", Sm = "_tagline_1vp69_108", oe = {
  bar: fm,
  skip: _m,
  mark: vm,
  nav: bm,
  list: pm,
  select: gm,
  selectTrigger: ym,
  dest: Nm,
  actor: km,
  actorMark: $m,
  actorLabel: Cm,
  tagline: Sm
};
function Rm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Tm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function aR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Tm(r);
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Rm(c) })
    ] })
  ] });
}
const xm = "_tree_zzoob_2", Lm = "_item_zzoob_6", Am = "_row_zzoob_10", Em = "_button_zzoob_22", $a = {
  tree: xm,
  item: Lm,
  row: Am,
  button: Em
}, Rn = Te(null);
function Im({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = La({ orientation: "vertical" });
  return /* @__PURE__ */ t(Rn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: $a.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const Mm = { ArrowRight: !0, ArrowLeft: !1 };
function Et(e) {
  return e ? !0 : void 0;
}
function Bm(e, a) {
  const n = Mm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Pm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function qm(e) {
  const a = [$a.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function jm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Dm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Om(e) {
  return typeof e == "string" ? e : void 0;
}
function Hm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Fm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Tn(e) {
  const a = Re(Rn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = jm(e);
  return /* @__PURE__ */ o("li", { className: $a.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: qm(e),
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
            onClick: () => Pm(e),
            onKeyDown: (r) => Bm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Dm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Om(e.label), children: e.label }),
              /* @__PURE__ */ t(Hm, { value: e.detail }),
              /* @__PURE__ */ t(Fm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const zm = "_frame_gij4e_2", Wm = "_subjectRail_gij4e_22", Km = "_subject_gij4e_22", Gm = "_rail_gij4e_42", Um = "_record_gij4e_66", Vm = "_recordBody_gij4e_71", Ym = "_stageGrid_gij4e_120", Jm = "_band_gij4e_134", Xm = "_bandBody_gij4e_142", Qm = "_bandActions_gij4e_147", Zm = "_scroller_gij4e_155", eh = "_board_gij4e_182", ah = "_lanes_gij4e_191", Z = {
  frame: zm,
  subjectRail: Wm,
  subject: Km,
  rail: Gm,
  record: Um,
  recordBody: Vm,
  stageGrid: Ym,
  band: Jm,
  bandBody: Xm,
  bandActions: Qm,
  scroller: Zm,
  board: eh,
  lanes: ah
};
function tR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function It(e) {
  return e ? "true" : void 0;
}
function nR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": It(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": It(l), "aria-label": r, children: a })
  ] });
}
function rR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const th = "_form_1j8ub_2", nh = "_fields_1j8ub_9", rh = "_actions_1j8ub_19", Fa = {
  form: th,
  fields: nh,
  actions: rh
};
function lR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function oR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const lh = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? br.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function oh({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function ih({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(pr, { children: n.content }, n.id)) }) });
}
function iR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(lh);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(oh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(ih, { lanes: n, label: a });
}
function sR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const sh = "_block_b38uc_3", ch = "_sentence_b38uc_10", dh = "_meta_b38uc_19", uh = "_action_b38uc_24", mh = "_strip_b38uc_28", hh = "_loading_b38uc_47", wh = "_label_b38uc_55", fh = "_counter_b38uc_62", be = {
  block: sh,
  sentence: ch,
  meta: dh,
  action: uh,
  strip: mh,
  loading: hh,
  label: wh,
  counter: fh
};
function _h({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function qa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(_h, { action: a })
  ] });
}
function vh(e) {
  return /* @__PURE__ */ t(qa, { ...e, kind: "ward-emptystate" });
}
function cR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(qa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function dR(e) {
  return /* @__PURE__ */ t(qa, { ...e });
}
function uR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(qa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function mR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function hR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function wR({ label: e, startedAt: a }) {
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
const bh = "_note_cigdt_2", ph = {
  note: bh
};
function gh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: ph.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const yh = "_card_k7btg_3", Nh = "_hit_k7btg_31", kh = "_head_k7btg_44", $h = "_title_k7btg_51", Ch = "_meta_k7btg_57", Sh = "_since_k7btg_66", Rh = "_sep_k7btg_76", Th = "_fields_k7btg_80", xh = "_field_k7btg_80", Lh = "_last_k7btg_98", Ah = "_reason_k7btg_110", se = {
  card: yh,
  hit: Nh,
  head: kh,
  title: $h,
  meta: Ch,
  since: Sh,
  sep: Rh,
  fields: Th,
  field: xh,
  last: Lh,
  reason: Ah
}, Eh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Ih(e, a, n) {
  const r = va(e, "blue"), l = va(e, "orange"), i = va(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Eh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const Mh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Bh(e, a) {
  return Mh[a](e);
}
function Ph({ item: e, connection: a }) {
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
function qh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function jh({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Dh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Bh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Oh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Hh(e, a, n) {
  e == null || e(a, n);
}
function Fh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function zh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  Ih(r, n.key, e.feed);
  const l = Fh(e.feed), i = Oh(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Hh(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(qh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Ph, { item: n, connection: l }),
        /* @__PURE__ */ t(jh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Dh, { item: n, fields: a }),
        /* @__PURE__ */ t(zh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Wh = "_column_1j8bi_3", Kh = "_head_1j8bi_21", Gh = "_label_1j8bi_30", Uh = "_count_1j8bi_39", Vh = "_list_1j8bi_53", la = {
  column: Wh,
  head: Kh,
  label: Gh,
  count: Uh,
  list: Vh
};
function xn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Yh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Jh(e) {
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
function Xh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = xn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Yh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Jh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(gh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Qh = "_foot_cs4jr_2", Zh = "_note_cs4jr_13", ew = "_link_cs4jr_19", za = {
  foot: Qh,
  note: Zh,
  link: ew
};
function fR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const aw = "_head_1tfi5_3", tw = "_identity_1tfi5_12", nw = "_titleRow_1tfi5_18", rw = "_title_1tfi5_18", lw = "_key_1tfi5_35", ow = "_rollup_1tfi5_45", iw = "_tools_1tfi5_53", sw = "_swatch_1tfi5_101", cw = "_mark_1tfi5_108", ke = {
  head: aw,
  identity: tw,
  titleRow: nw,
  title: rw,
  key: lw,
  rollup: ow,
  tools: iw,
  swatch: sw,
  mark: cw
}, Mt = "initials:";
function dw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function uw(e) {
  const a = [dw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function mw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    uw(e)
  ] });
}
function hw(e) {
  return e.startsWith(Mt) ? e.slice(Mt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function ww({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: hw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function fw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function _R({
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
        /* @__PURE__ */ t(ww, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: mw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(fw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const _w = "_head_1sejb_14", vw = "_line_1sejb_15", bw = "_cHandle_1sejb_36", pw = "_cName_1sejb_41", gw = "_nameLine_1sejb_49", yw = "_cLabel_1sejb_56", Nw = "_cCap_1sejb_61", kw = "_cShown_1sejb_66", $w = "_name_1sejb_49", Cw = "_noCap_1sejb_88", Sw = "_state_1sejb_102", Rw = "_handle_1sejb_111", Tw = "_sub_1sejb_137", B = {
  head: _w,
  line: vw,
  cHandle: bw,
  cName: pw,
  nameLine: gw,
  cLabel: yw,
  cCap: Nw,
  cShown: kw,
  name: $w,
  noCap: Cw,
  state: Sw,
  handle: Rw,
  sub: Tw
}, xw = "can't be hidden or collapsed", Lw = "terminal · counted, not a column";
function vR() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function Aw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Ew(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? xw : e.terminal ? Lw : Ew(e.agentsMounted);
}
function Iw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Mw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: B.sub, children: Bt(e) })
  ] });
}
function Bw(e) {
  return e === void 0 ? "" : String(e);
}
function Pw(e) {
  return e === "" ? void 0 : Number(e);
}
function qw({ name: e, onReorder: a }) {
  const n = Le();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: B.cHandle }) : /* @__PURE__ */ t("span", { className: B.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && Iw(r, a),
      children: "⠿"
    }
  ) });
}
function jw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Bw(a.cap), onChange: (r) => n({ ...a, cap: Pw(r) }) }) });
}
function Dw({ stage: e, config: a, onChange: n }) {
  const r = Le() !== null, l = Aw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Ow(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function bR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": Ow(e), children: [
    /* @__PURE__ */ t(qw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(Mw, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(jw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Dw, { stage: e, config: a, onChange: n })
  ] });
}
const Hw = "_body_1a4f4_2", Fw = "_head_1a4f4_9", zw = "_summary_1a4f4_19", Ww = "_block_1a4f4_20", Kw = "_actionsBlock_1a4f4_21", Gw = "_title_1a4f4_41", Uw = "_note_1a4f4_46", Vw = "_k_1a4f4_51", Yw = "_kv_1a4f4_58", Jw = "_row_1a4f4_64", Xw = "_label_1a4f4_75", Qw = "_value_1a4f4_84", Zw = "_quote_1a4f4_90", ef = "_actions_1a4f4_21", af = "_resolve_1a4f4_103", j = {
  body: Hw,
  head: Fw,
  summary: zw,
  block: Ww,
  actionsBlock: Kw,
  title: Gw,
  note: Uw,
  k: Vw,
  kv: Yw,
  row: Jw,
  label: Xw,
  value: Qw,
  quote: Zw,
  actions: ef,
  resolve: af
};
function tf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function nf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function rf(e) {
  const a = ua(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function lf(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function of(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(rf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...tf(e),
    ...lf(n),
    ...nf(e, a)
  ];
}
function sf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: j.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: j.k, children: a }),
    e
  ] });
}
function cf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function df({ item: e, showKey: a }) {
  const n = cf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: j.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function uf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: j.block, children: [
    /* @__PURE__ */ t("p", { className: j.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: j.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: j.note, children: e.agentMeta })
  ] }) : null;
}
function pR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = of(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: j.body, children: [
    /* @__PURE__ */ t(df, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: j.summary, children: [
      /* @__PURE__ */ t("h2", { className: j.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: j.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: j.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: j.row, children: [
      /* @__PURE__ */ t("dt", { className: j.label, children: v }),
      /* @__PURE__ */ t("dd", { className: j.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(uf, { item: e }),
    /* @__PURE__ */ o("div", { className: j.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: j.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: j.note, children: c })
    ] }),
    /* @__PURE__ */ t(sf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const mf = "_root_3azmy_2", hf = "_list_3azmy_7", wf = "_item_3azmy_12", ff = "_box_3azmy_18", _f = "_text_3azmy_23", vf = "_note_3azmy_28", Ye = {
  root: mf,
  list: hf,
  item: wf,
  box: ff,
  text: _f,
  note: vf
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
const bf = "_rail_znbbp_2", pf = "_k_znbbp_11", gf = "_head_znbbp_19", yf = "_section_znbbp_25", Nf = "_card_znbbp_39", kf = "_strip_znbbp_46", $f = "_skeleton_znbbp_60", Cf = "_skeletonLabel_znbbp_74", Sf = "_bar_znbbp_80", Rf = "_note_znbbp_89", me = {
  rail: bf,
  k: pf,
  head: gf,
  section: yf,
  card: Nf,
  strip: kf,
  skeleton: $f,
  skeletonLabel: Cf,
  bar: Sf,
  note: Rf
};
function Tf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function xf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Lf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Xh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Af(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Lf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(xf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function gR(e) {
  const a = Tf(e.onOpen), n = xn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Af, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Ef(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function If(e) {
  return Math.ceil(e.length / 2);
}
function Mf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ln(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Bf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Ln(e);
  l !== void 0 && n(l), r(Mf(e.type));
}
function Pf(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Bf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function qf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function jf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Df(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Of(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(If(a ?? [])) + ")"
  };
}
function Hf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ff(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function zf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Wf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Kf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Gf(e, a) {
  return a === void 0 ? e : Ef(e, a.ref);
}
function Uf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function An(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = va(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(qf(a));
  Pf(e.feed, a.key, s, d, i);
  const u = jf(a, r), m = Df(a, n), w = Of(a, e.fields), v = Kf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Uf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: Gf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Hf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Ff(a, e.fields),
          zf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Wf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Vf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Yf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Jf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Xf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Vf, { count: e.items.length, cap: e.column.cap });
}
function Qf(e, a) {
  return e.roving ?? a;
}
function Zf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function e_(e, a) {
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
function a_(e) {
  const a = N(), n = La({ orientation: "vertical" }), r = Qf(e, n), l = Yf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Jf(e.column, e.items.length, a),
    Xf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Zf(e, n), children: e_(e, r) })
  ] });
}
function t_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function n_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function r_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function yR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: t_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      n_(e),
      r_(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function l_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function o_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function i_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function NR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(l_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: o_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    i_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function kR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(An, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(a_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function s_(e, a) {
  const n = Ln(e);
  n !== void 0 && a(n);
}
function c_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => s_(r, n));
  }, [e, a, n]);
}
function d_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function u_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function m_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function h_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function $R(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  c_(e.feed, a.key, l);
  const i = [...d_(a), ...u_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      m_(n, r)
    ] }),
    h_(a, e.actions)
  ] });
}
const w_ = "_card_54446_3", f_ = "_head_54446_30", __ = "_mark_54446_38", v_ = "_name_54446_50", b_ = "_chips_54446_71", p_ = "_description_54446_77", g_ = "_run_54446_82", y_ = "_sep_54446_91", N_ = "_facts_54446_96", k_ = "_fact_54446_96", $_ = "_factLabel_54446_109", C_ = "_factValue_54446_113", re = {
  card: w_,
  head: f_,
  mark: __,
  name: v_,
  chips: b_,
  description: p_,
  run: g_,
  sep: y_,
  facts: N_,
  fact: k_,
  factLabel: $_,
  factValue: C_
}, S_ = { live: "done", draft: "running", paused: "meta" };
function R_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function T_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: S_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function x_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function L_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function A_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function E_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function I_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: R_(s),
      style: c,
      "data-selected": d,
      "data-paused": E_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(x_, { description: e.description }),
        /* @__PURE__ */ t(L_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(T_, { versions: e.versions }),
        /* @__PURE__ */ t(A_, { facts: i })
      ]
    }
  );
}
const M_ = "_list_4dcyc_2", B_ = "_row_4dcyc_11", P_ = "_head_4dcyc_23", q_ = "_id_4dcyc_30", j_ = "_lock_4dcyc_35", D_ = "_reason_4dcyc_41", O_ = "_remove_4dcyc_46", H_ = "_clauses_4dcyc_50", F_ = "_clause_4dcyc_50", z_ = "_label_4dcyc_64", W_ = "_cell_4dcyc_71", K_ = "_value_4dcyc_76", ie = {
  list: M_,
  row: B_,
  head: P_,
  id: q_,
  lock: j_,
  reason: D_,
  remove: O_,
  clauses: H_,
  clause: F_,
  label: z_,
  cell: W_,
  value: K_
}, En = Te(!1);
function CR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(En.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function G_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function U_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function V_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(U_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function SR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(En)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(V_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(G_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Y_ = "_ladder_n8eeo_2", J_ = "_cell_n8eeo_7", X_ = "_empty_n8eeo_26", Q_ = "_name_n8eeo_34", Z_ = "_holder_n8eeo_40", ev = "_request_n8eeo_46", av = "_swatches_n8eeo_51", tv = "_swatch_n8eeo_51", nv = "_tilesFrame_n8eeo_78", rv = "_tiles_n8eeo_78", lv = "_tile_n8eeo_78", ov = "_bar_n8eeo_117", iv = "_hex_n8eeo_128", sv = "_note_n8eeo_138", E = {
  ladder: Y_,
  cell: J_,
  empty: X_,
  name: Q_,
  holder: Z_,
  request: ev,
  swatches: av,
  swatch: tv,
  tilesFrame: nv,
  tiles: rv,
  tile: lv,
  bar: ov,
  hex: iv,
  note: sv
}, RR = "not validated yet, pending a CVD matrix and dark stepping";
function cv(e) {
  return e.reserved ? "reserved" : sa(e.step) ? "validated" : "partial";
}
function In(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function dv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function uv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(je, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function mv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function hv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const qt = (e) => String(e).padStart(2, "0");
function wv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? In(e, void 0);
}
function fv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${qt(e)}` : jr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${qt(e)} · ${n}` })
  ] });
}
function _v({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = cv(e), c = In(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...hv(d, m, u), "data-validation": s, style: dv(e, s), onClick: v, onKeyDown: (P) => mv(P, v) }, label: y, name: w, holder: c, validation: s, note: wv(s, n, m), step: e.step };
}
const vv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(fv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(uv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function bv(e) {
  return vv[e.presentation](_v(e));
}
function pv(e) {
  for (const a of e)
    if (!a.reserved && !Aa(a.step)) throw new Error("colour ladder renders token steps only");
}
function gv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function yv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Nv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function kv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const $v = { list: gv, swatches: () => null, tiles: kv };
function Cv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Mn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  pv(e.steps);
  const r = yv(e), l = $v[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(bv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Cv(e.disabled === !0), className: `${Nv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const Sv = "_rail_s06lm_2", Rv = "_section_s06lm_12", Tv = "_sectionFlush_s06lm_22", xv = "_head_s06lm_26", Lv = "_headLabel_s06lm_34", Av = "_sample_s06lm_42", Ev = "_sampleLabel_s06lm_47", Iv = "_sampleTitle_s06lm_54", Mv = "_sampleMeta_s06lm_59", Bv = "_trace_s06lm_65", Pv = "_traceHead_s06lm_70", qv = "_steps_s06lm_78", jv = "_step_s06lm_78", Dv = "_stepTitle_s06lm_97", Ov = "_hollow_s06lm_107", Hv = "_stepBody_s06lm_115", Fv = "_stepDetail_s06lm_127", zv = "_publish_s06lm_132", Wv = "_reason_s06lm_138", Kv = "_note_s06lm_143", Gv = "_reveal_s06lm_148", k = {
  rail: Sv,
  section: Rv,
  sectionFlush: Tv,
  head: xv,
  headLabel: Lv,
  sample: Av,
  sampleLabel: Ev,
  sampleTitle: Iv,
  sampleMeta: Mv,
  trace: Bv,
  traceHead: Pv,
  steps: qv,
  step: jv,
  stepTitle: Dv,
  hollow: Ov,
  stepBody: Hv,
  stepDetail: Fv,
  publish: zv,
  reason: Wv,
  note: Kv,
  reveal: Gv
}, jt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Uv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Vv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Yv = { notSimulated: "not simulated", running: "running" };
function Jv(e) {
  return e.presentation === "foundry";
}
function Xv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Qv(e, a) {
  var r;
  const n = Uv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Zv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function eb(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ab(e) {
  if (Zv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function tb(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function nb(e) {
  const a = Yv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(je, { size: 6, kind: Vv[e.kind], label: e.kind });
}
function rb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function lb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ob(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(tb, { kind: a.kind, children: [
    /* @__PURE__ */ t(nb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(rb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(lb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function ib(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Bn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: ib(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(ob, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function sb(e) {
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
function cb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function db(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Jt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function ub(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Jt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function mb(e) {
  const a = ub(e.run);
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
function hb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function wb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function qn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: jt[e.run.status].role, label: jt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function fb(e, a) {
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
function _b(e) {
  var n;
  eb(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(sb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(db, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(hb, { reason: Xv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function vb(e) {
  var r;
  const a = fb(e.run, e.feed);
  ab(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(qn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(cb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(mb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(wb, { reason: Qv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function TR(e) {
  return Jv(e) ? /* @__PURE__ */ t(vb, { ...e }) : /* @__PURE__ */ t(_b, { ...e });
}
const bb = "_list_142ip_3", pb = "_row_142ip_9", gb = "_condition_142ip_18", yb = "_action_142ip_24", pa = {
  list: bb,
  row: pb,
  condition: gb,
  action: yb
}, jn = Te(!1);
function xR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(jn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: pa.list, "aria-label": a, children: e }) });
}
function LR({ rule: e }) {
  if (!Re(jn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: pa.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: pa.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: pa.action, children: e.then })
  ] });
}
const Nb = "_move_tmppt_3", kb = {
  move: Nb
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
function $b(e) {
  return e === "up" ? "down" : "up";
}
function Cb(e, a) {
  const n = Dt(e, a.id, a.direction) ?? Dt(e, a.id, $b(a.direction));
  n == null || n.focus();
}
function Hn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && Cb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Fn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ca({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${kb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Sb = "_body_1jd1i_2", Rb = "_title_1jd1i_8", Tb = "_section_1jd1i_13", xb = "_legend_1jd1i_18", Lb = "_stages_1jd1i_26", Ab = "_stage_1jd1i_26", Eb = "_stageIndex_1jd1i_44", Ib = "_stageName_1jd1i_50", Mb = "_footer_1jd1i_59", Bb = "_note_1jd1i_66", Pb = "_reason_1jd1i_71", qb = "_actions_1jd1i_76", jb = "_webHead_1jd1i_83", Db = "_kicker_1jd1i_92", Ob = "_webTitle_1jd1i_99", Hb = "_webBody_1jd1i_105", Fb = "_webSection_1jd1i_109", zb = "_sectionHead_1jd1i_121", Wb = "_sectionNote_1jd1i_129", Kb = "_formLabel_1jd1i_134", Gb = "_identityRow_1jd1i_139", Ub = "_nameCell_1jd1i_145", Vb = "_keyCell_1jd1i_150", Yb = "_colourCell_1jd1i_154", Jb = "_colourStatus_1jd1i_161", Xb = "_webStages_1jd1i_166", Qb = "_webStageList_1jd1i_172", Zb = "_webStage_1jd1i_166", ep = "_webIndex_1jd1i_191", ap = "_webStageName_1jd1i_196", tp = "_webMoves_1jd1i_201", np = "_addStage_1jd1i_215", rp = "_addStageButton_1jd1i_223", lp = "_addStageNote_1jd1i_231", op = "_webFooter_1jd1i_236", ip = "_webFooterNotes_1jd1i_244", sp = "_webNote_1jd1i_251", _ = {
  body: Sb,
  title: Rb,
  section: Tb,
  legend: xb,
  stages: Lb,
  stage: Ab,
  stageIndex: Eb,
  stageName: Ib,
  footer: Mb,
  note: Bb,
  reason: Pb,
  actions: qb,
  webHead: jb,
  kicker: Db,
  webTitle: Ob,
  webBody: Hb,
  webSection: Fb,
  sectionHead: zb,
  sectionNote: Wb,
  formLabel: Kb,
  identityRow: Gb,
  nameCell: Ub,
  keyCell: Vb,
  colourCell: Yb,
  colourStatus: Jb,
  webStages: Xb,
  webStageList: Qb,
  webStage: Zb,
  webIndex: ep,
  webStageName: ap,
  webMoves: tp,
  addStage: np,
  addStageButton: rp,
  addStageNote: lp,
  webFooter: op,
  webFooterNotes: ip,
  webNote: sp
}, cp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], zn = "not in catalogue";
function dp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${zn}` }, ...n];
}
function up({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${zn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: dp(n, e.name), invalid: i, onChange: r });
}
function Wn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function mp(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function hp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Wn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(up, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: cp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ca, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function wp({ stages: e, onChange: a, catalogue: n }) {
  const r = mp(e.length), l = Hn(), i = (c, d) => {
    const u = Dn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, On(Wn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(hp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Fn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const fp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], _p = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], vp = "A new stream starts as a draft. Nothing runs on it until you publish it.", bp = "Create is disabled: name the stream and give it a key first.", pp = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && sa(e.step) && a[e.step] === void 0;
}
function gp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function yp({ stages: e, onMove: a }) {
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
function Np({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: vp }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function kp(e, a) {
  return e !== "" && a !== "" ? null : bp;
}
function $p(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = _p, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, P] = p(a[0].value), [le, Ae] = p(() => gp(n, r)), [ae, Ue] = p(e.stages ?? fp), [Ve, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = kp(m, v);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: _.body, children: [
    /* @__PURE__ */ t("h2", { className: _.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: v, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: P, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Colour" }),
      /* @__PURE__ */ t(Mn, { label: "Stream colour", steps: n, value: le, onChange: Ae, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(yp, { stages: ae, onMove: (De, _r) => Ue(Xa(ae, De, _r)) })
    ] }),
    /* @__PURE__ */ t(Cn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Np, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Kn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Cp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Sp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Kn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Rp(e, a) {
  return Tp(e) && xp(e, a) && Lp(e);
}
function Tp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function xp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function Lp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Ap(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Ep({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function Ip({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(Ep, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: Cp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Mp({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Bp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function Pp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Sp(l, s, d, m, v, L), Ae = Rp(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Mn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: Ap(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(Mp, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(Bp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: pp })
        ] }),
        /* @__PURE__ */ t(wp, { stages: L, onChange: P })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t(Cn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: Kn, onChange: y }) }),
      /* @__PURE__ */ t(Ip, { ready: Ae, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function AR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Pp, { ...e }) : /* @__PURE__ */ t($p, { ...e });
}
const qp = "_row_bs8hc_2", jp = "_cell_bs8hc_6", Dp = "_condition_bs8hc_11", Op = "_action_bs8hc_18", Hp = "_contract_bs8hc_24", Fp = "_contractCondition_bs8hc_33", zp = "_contractAction_bs8hc_39", Q = {
  row: qp,
  cell: jp,
  condition: Dp,
  action: Op,
  contract: Hp,
  contractCondition: Fp,
  contractAction: zp
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
function Wp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Sa(e, r), children: Sa(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Kp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Sa(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Gp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Sa(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const Up = { two: Kp, four: Wp, contract: Gp };
function ER(e) {
  var n;
  if (!Gn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Up[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Vp = "_column_11id3_2", Yp = "_head_11id3_17", Jp = "_index_11id3_23", Xp = "_name_11id3_29", Qp = "_meta_11id3_38", Zp = "_mono_11id3_43", eg = "_gate_11id3_50", ag = "_reviewersLabel_11id3_57", tg = "_reviewers_11id3_57", ng = "_reviewer_11id3_57", rg = "_agents_11id3_74", lg = "_workflowColumn_11id3_79", og = "_workflowHead_11id3_96", ig = "_stageRow_11id3_102", sg = "_stageLabel_11id3_109", cg = "_workflowTitle_11id3_116", dg = "_workflowMeta_11id3_122", ug = "_workflowGate_11id3_127", mg = "_gateNote_11id3_135", hg = "_cardNote_11id3_140", wg = "_reviewerList_11id3_145", fg = "_reviewerRow_11id3_151", _g = "_reviewerMark_11id3_157", vg = "_reviewerName_11id3_167", bg = "_terminalCard_11id3_173", pg = "_terminalCount_11id3_182", gg = "_workflowAgents_11id3_188", yg = "_mount_11id3_194", C = {
  column: Vp,
  head: Yp,
  index: Jp,
  name: Xp,
  meta: Qp,
  mono: Zp,
  gate: eg,
  reviewersLabel: ag,
  reviewers: tg,
  reviewer: ng,
  agents: rg,
  workflowColumn: lg,
  workflowHead: og,
  stageRow: ig,
  stageLabel: sg,
  workflowTitle: cg,
  workflowMeta: dg,
  workflowGate: ug,
  gateNote: mg,
  cardNote: hg,
  reviewerList: wg,
  reviewerRow: fg,
  reviewerMark: _g,
  reviewerName: vg,
  terminalCard: bg,
  terminalCount: pg,
  workflowAgents: gg,
  mount: yg
}, Ng = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Un(e) {
  return `${Math.round(e * 100)}%`;
}
function kg({ stage: e }) {
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
function $g({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Cg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Ng[e.kind] })
  ] });
}
function Sg({ stage: e }) {
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
function Rg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(kg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t($g, { stage: e }) : null;
}
function Tg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function xg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Cg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Sg, { stage: e }),
    /* @__PURE__ */ t(Rg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(I_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(Tg, { onMount: n })
  ] });
}
const Lg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Ag({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Eg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Ag, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Un(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Ig(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Mg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Ig(e.rolledBackThisWeek) })
  ] });
}
function Bg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Pg(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = Bg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function qg({ stage: e, titleId: a }) {
  const n = Lg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Pg(e) })
  ] });
}
function jg(e) {
  return e === "entry" || e === "agent";
}
function Dg({ stage: e, onMount: a }) {
  return a === void 0 || !jg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Og({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(qg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Eg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(Mg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Dg, { stage: e, onMount: n })
  ] });
}
function Hg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function IR(e) {
  return Hg(e) ? /* @__PURE__ */ t(Og, { ...e }) : /* @__PURE__ */ t(xg, { ...e });
}
const Fg = "_row_1tdra_6", zg = "_name_1tdra_12", Wg = "_compactRow_1tdra_13", Kg = "_compactName_1tdra_13", Gg = "_cell_1tdra_30", Ug = "_chain_1tdra_45", Vg = "_owner_1tdra_51", Yg = "_mono_1tdra_57", Jg = "_compactCell_1tdra_79", Xg = "_stack_1tdra_96", Qg = "_stat_1tdra_103", Zg = "_identityLine_1tdra_110", ey = "_identity_1tdra_110", ay = "_ownerLine_1tdra_140", ty = "_link_1tdra_160", ny = "_gateMark_1tdra_166", ry = "_emptyChain_1tdra_171", ly = "_arrow_1tdra_177", oy = "_muted_1tdra_182", iy = "_define_1tdra_187", sy = "_statValue_1tdra_194", cy = "_policyId_1tdra_200", dy = "_sub_1tdra_205", g = {
  row: Fg,
  name: zg,
  compactRow: Wg,
  compactName: Kg,
  cell: Gg,
  chain: Ug,
  owner: Vg,
  mono: Yg,
  compactCell: Jg,
  stack: Xg,
  stat: Qg,
  identityLine: Zg,
  identity: ey,
  ownerLine: ay,
  link: ty,
  gateMark: ny,
  emptyChain: ry,
  arrow: ly,
  muted: oy,
  define: iy,
  statValue: sy,
  policyId: cy,
  sub: dy
};
function Vn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function uy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function my(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Yn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function hy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Yn(e.members)}`;
}
function wy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: hy(e) })
  ] }) });
}
function Jn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function fy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ua(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function _y({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Jn, { name: l.name, gate: l.gate === !0, look: fy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function vy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : _y(e) });
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
function by(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function py(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function gy({ stream: e, href: a, presentation: n }) {
  const r = my(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Vn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    wy(e, a),
    vy(e),
    Ht(py(e.agents), e.agents === void 0 ? void 0 : uy(e.agents), "—"),
    by(e.policy),
    Ht(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function yy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function MR(e) {
  if (yy(e)) return gy(e);
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
const Ny = "_row_2u4ll_2", ky = "_name_2u4ll_16", $y = "_scope_2u4ll_24", Ra = {
  row: Ny,
  name: ky,
  scope: $y
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Cy(e) {
  return e === void 0 ? `${Ra.row} ward-toolrow` : `${Ra.row} ward-toolrow ${e}`;
}
function Sy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Ry({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function Ty({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function xy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Ra.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Ly(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function BR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Sy(e, n), s = Ly(n);
  return /* @__PURE__ */ o(s, { className: Cy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ry, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Ra.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(xy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(Ty, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Ay = "_strip_4ppv9_2", Ey = "_well_4ppv9_11", Iy = "_head_4ppv9_18", My = "_name_4ppv9_24", By = "_chart_4ppv9_32", Py = "_segment_4ppv9_38", qy = "_detailedChart_4ppv9_44", jy = "_rail_4ppv9_57", Dy = "_section_4ppv9_63", Oy = "_label_4ppv9_74", Hy = "_note_4ppv9_91", K = {
  strip: Ay,
  well: Ey,
  head: Iy,
  name: My,
  chart: By,
  segment: Py,
  detailedChart: qy,
  rail: jy,
  section: Dy,
  label: Oy,
  note: Hy
}, Fy = "No item in flight to preview.", zy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Wy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ta = 100;
function Ky(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Gy({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ta,
      y: "0",
      width: Ta,
      height: "8",
      fill: Ky(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Uy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Vy({ identities: e }) {
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
function Yy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Fy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ua(n.streamStep) }, onOpen: Qn(r), feed: null }) });
}
function Jy({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Xy(e) {
  const a = Uy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(fa, { label: "Board card", children: /* @__PURE__ */ t(Yy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(fa, { label: "Streams index row", children: /* @__PURE__ */ t(Jy, { draft: n }) }),
    /* @__PURE__ */ o(fa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Vy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: zy })
    ] }),
    /* @__PURE__ */ t(fa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Wy }) })
  ] });
}
function Qy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(je, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: Qn(r) }) }),
    /* @__PURE__ */ t(Gy, { draft: e, streams: n })
  ] });
}
function PR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Xy, { ...e }) : /* @__PURE__ */ t(Qy, { ...e });
}
const Zy = "_row_ixlg5_6", eN = "_headCell_ixlg5_10", aN = "_cell_ixlg5_11", tN = "_name_ixlg5_23", nN = "_consequence_ixlg5_29", rN = "_governed_ixlg5_36", lN = "_control_ixlg5_42", oN = "_byRole_ixlg5_48", iN = "_webControl_ixlg5_59", sN = "_webConsequence_ixlg5_65", cN = "_webGoverned_ixlg5_71", O = {
  row: Zy,
  headCell: eN,
  cell: aN,
  name: tN,
  consequence: nN,
  governed: rN,
  control: lN,
  byRole: oN,
  webControl: iN,
  webConsequence: sN,
  webGoverned: cN
};
function dN({
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
function uN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(dN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function mN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function hN({ name: e, cell: a, onChange: n }) {
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
function wN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(hN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: mN(e) }) })
  ] });
}
function qR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(wN, { ...e }) : /* @__PURE__ */ t(uN, { ...e });
}
const fN = "_row_vv64h_2", _N = "_cell_vv64h_6", vN = "_name_vv64h_25", bN = "_note_vv64h_30", pN = "_webName_vv64h_41", gN = "_webMeta_vv64h_47", V = {
  row: fN,
  cell: _N,
  name: vN,
  note: bN,
  webName: pN,
  webMeta: gN
}, Zn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function yN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function NN({ component: e, onRestart: a }) {
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
function kN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: yN(e.state) });
}
function $N({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Zn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(kN, { component: e, onRestart: a }) })
  ] });
}
function jR(e) {
  return "presentation" in e ? /* @__PURE__ */ t($N, { ...e }) : /* @__PURE__ */ t(NN, { ...e });
}
const CN = "_row_jcm5k_7", SN = "_cell_jcm5k_11", RN = "_next_jcm5k_28", TN = "_headCell_jcm5k_38", xN = "_webId_jcm5k_77", LN = "_webPurpose_jcm5k_83", AN = "_webMeta_jcm5k_91", EN = "_webUrgent_jcm5k_97", F = {
  row: CN,
  cell: SN,
  next: RN,
  headCell: TN,
  webId: xN,
  webPurpose: LN,
  webMeta: AN,
  webUrgent: EN
}, IN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, MN = {
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
], BN = Object.fromEntries(er.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = BN[e];
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
function DR() {
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
function PN({ cred: e }) {
  const a = IN[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function qN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function jN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(qN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...MN[e.state] }) })
  ] });
}
function OR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(jN, { ...e }) : /* @__PURE__ */ t(PN, { ...e });
}
const DN = "_card_17zba_2", ON = "_head_17zba_11", HN = "_env_17zba_18", FN = "_version_17zba_25", zN = "_meta_17zba_32", WN = "_webCard_17zba_37", KN = "_webRow_17zba_47", GN = "_webTitle_17zba_55", UN = "_webLine_17zba_65", VN = "_webVersion_17zba_72", YN = "_webMeta_17zba_77", U = {
  card: DN,
  head: ON,
  env: HN,
  version: FN,
  meta: zN,
  webCard: WN,
  webRow: KN,
  webTitle: GN,
  webLine: UN,
  webVersion: VN,
  webMeta: YN
}, Ft = { dev: "Dev", uat: "UAT", prod: "Prod" }, ar = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function JN({ env: e }) {
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
function XN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function QN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...ar[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: XN(e) })
  ] });
}
function HR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(QN, { ...e }) : /* @__PURE__ */ t(JN, { ...e });
}
const ZN = "_panel_1hmja_2", e1 = "_line_1hmja_8", a1 = "_actions_1hmja_14", _a = {
  panel: ZN,
  line: e1,
  actions: a1
};
function FR(e) {
  return /* @__PURE__ */ o("div", { className: _a.panel, children: [
    /* @__PURE__ */ t("p", { className: _a.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: _a.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: _a.line, children: e.note ?? "" })
  ] });
}
const t1 = "_upload_13fcl_2", n1 = "_preview_13fcl_7", r1 = "_mark_13fcl_17", l1 = "_empty_13fcl_22", o1 = "_actions_13fcl_28", i1 = "_input_13fcl_33", s1 = "_reasons_13fcl_41", c1 = "_reason_13fcl_41", d1 = "_accepted_13fcl_57", te = {
  upload: t1,
  preview: n1,
  mark: r1,
  empty: l1,
  actions: o1,
  input: i1,
  reasons: s1,
  reason: c1,
  accepted: d1
}, tr = 1.5, nr = 22, xa = "script elements or event handlers", Me = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${tr}px at ${nr}px`], u1 = [Se[1], Se[2], xa, Me], m1 = /* @__PURE__ */ new Map([
  ["image", Se[1]],
  ["text", Se[2]],
  ["tspan", Se[2]],
  ["textPath", Se[2]],
  ["script", xa],
  ["foreignObject", xa],
  ["a", Me],
  ["use", Me],
  ["style", Me],
  ["feImage", Me],
  ["set", Me]
]), h1 = "http://www.w3.org/2000/svg", w1 = "http://www.w3.org/2000/xmlns/", f1 = /* @__PURE__ */ new Set([
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
]), _1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, v1 = /url\s*\(|['"\\]/i;
function b1() {
  return { ok: !1, reasons: [Se[1]] };
}
function rr(e) {
  return e.namespaceURI === h1;
}
function p1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && rr(a) ? a : null;
  } catch {
    return null;
  }
}
function g1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function y1(e) {
  return m1.get(e.localName) ?? (e.localName.startsWith("animate") ? Me : void 0);
}
function N1(e) {
  return v1.test(e.replace(mt, ""));
}
function k1(e) {
  return /^on/i.test(e.localName) ? xa : e.localName === "href" || N1(e.value) ? Me : void 0;
}
function $1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(y1(n));
    for (const r of Array.from(n.attributes)) a.add(k1(r));
  }
  return u1.filter((n) => a.has(n));
}
function C1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? nr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < tr;
  }) ? [Se[3]] : [];
}
function S1(e) {
  if (e.namespaceURI === w1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (_1.has(a) || a.startsWith("stroke"));
}
function R1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && rr(a) && f1.has(a.localName);
}
function T1(e, a) {
  R1(a) ? a.nodeType === Node.ELEMENT_NODE && lr(a) : e.removeChild(a);
}
function lr(e) {
  for (const a of Array.from(e.attributes)) S1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) T1(e, a);
  return e;
}
function x1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function L1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function A1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of x1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function E1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function I1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = A1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), E1(l, r);
  }
  return e;
}
function zR(e) {
  const a = p1(e);
  if (a === null) return b1();
  const n = [...g1(a), ...$1(a), ...C1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(I1(lr(a), L1(e))) };
}
const M1 = "Mark accepted.", B1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, P1 = new Set(Qt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function q1(e) {
  return e !== void 0 && (B1.test(e) || P1.has(e)) ? e : void 0;
}
function j1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": q1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function D1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function O1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function H1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: M1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function F1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(H1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${D1(e, n)}`, role: "status", children: O1(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function WR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(j1, { current: e }),
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
    /* @__PURE__ */ t(F1, { result: s, presentation: r })
  ] });
}
const z1 = "_row_o3t6y_7", W1 = "_cell_o3t6y_11", K1 = "_head_o3t6y_28", G1 = "_name_o3t6y_34", U1 = "_pinned_o3t6y_42", V1 = "_headCell_o3t6y_49", Y1 = "_webName_o3t6y_88", J1 = "_webMeta_o3t6y_95", X1 = "_webWarn_o3t6y_103", q = {
  row: z1,
  cell: W1,
  head: K1,
  name: G1,
  pinned: U1,
  headCell: V1,
  webName: Y1,
  webMeta: J1,
  webWarn: X1
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
], Q1 = Object.fromEntries(or.map((e) => [e.key, e]));
function Z1(e, a) {
  return `mcp.${e}.${a}`;
}
function ek(e) {
  return Object.keys(ht).includes(e);
}
function ak(e) {
  return ht[e !== void 0 && ek(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = Q1[e];
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
function KR() {
  return /* @__PURE__ */ t("tr", { children: or.map((e) => /* @__PURE__ */ t(
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
function tk({ server: e }) {
  const a = ht[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => Z1(e.name, n)).join(" · ") })
  ] });
}
function nk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function rk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function lk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function ok({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function ik({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function sk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: nk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...rk(e) }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(lk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...ak(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t(ok, { server: e, onRestart: a }),
      /* @__PURE__ */ t(ik, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function GR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(sk, { ...e }) : /* @__PURE__ */ t(tk, { ...e });
}
const ck = "_row_1ibo7_2", dk = "_headCell_1ibo7_14", uk = "_cell_1ibo7_15", mk = "_name_1ibo7_26", hk = "_consequence_1ibo7_32", wk = "_reason_1ibo7_38", fk = "_value_1ibo7_44", _k = "_webRow_1ibo7_60", vk = "_webSetting_1ibo7_73", bk = "_webName_1ibo7_81", pk = "_webConsequence_1ibo7_89", gk = "_webControl_1ibo7_95", yk = "_webState_1ibo7_109", Nk = "_webChip_1ibo7_114", I = {
  row: ck,
  headCell: dk,
  cell: uk,
  name: mk,
  consequence: hk,
  reason: wk,
  value: fk,
  webRow: _k,
  webSetting: vk,
  webName: bk,
  webConsequence: pk,
  webControl: gk,
  webState: yk,
  webChip: Nk
}, ir = 104, sr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function kk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(kn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function $k({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = sr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(kk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: ir }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function cr(e, a) {
  return String(e ?? a);
}
function Ck(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Sk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? cr(e.value, "—");
}
function Rk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function Tk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Rk, { ...e });
  const l = Ck(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(kn, { options: l, value: cr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Sk(a) });
}
function xk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(Tk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: ir }, children: /* @__PURE__ */ t(h, { ...sr[n], size: "tag" }) })
  ] });
}
function UR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(xk, { ...e }) : /* @__PURE__ */ t($k, { ...e });
}
const Lk = "_label_h9m4w_7", Ak = "_name_h9m4w_15", Ek = "_column_h9m4w_24", Ik = "_webFrame_h9m4w_57", Mk = "_webHead_h9m4w_62", Bk = "_webHeadLabel_h9m4w_74", Pk = "_webLabel_h9m4w_117", qk = "_webColumns_h9m4w_124", jk = "_webGroup_h9m4w_130", Dk = "_webPeople_h9m4w_131", Ok = "_webVia_h9m4w_132", Hk = "_webMeta_h9m4w_161", z = {
  label: Lk,
  name: Ak,
  column: Ek,
  webFrame: Ik,
  webHead: Mk,
  webHeadLabel: Bk,
  webLabel: Pk,
  webColumns: qk,
  webGroup: jk,
  webPeople: Dk,
  webVia: Ok,
  webMeta: Hk
}, Fk = {
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
function zk(e) {
  if (!e.matrixRole) return;
  const a = Fk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Wk({ node: e }) {
  const a = zk(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(Kk, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Kk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Gk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(Wk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Uk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Vk() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Yk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Jk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Xk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Vk, {}),
    /* @__PURE__ */ t(Im, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Tn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Yk, { row: n }),
        detail: /* @__PURE__ */ t(Uk, { row: n }),
        expanded: Jk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function VR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Xk, { ...e }) : /* @__PURE__ */ t(Gk, { ...e });
}
const Qk = "_runbook_b9agc_2", Zk = "_list_b9agc_7", e$ = "_step_b9agc_15", a$ = "_numeral_b9agc_21", t$ = "_body_b9agc_28", n$ = "_head_b9agc_34", r$ = "_title_b9agc_40", l$ = "_detail_b9agc_45", o$ = "_actions_b9agc_50", i$ = "_webList_b9agc_56", s$ = "_webStep_b9agc_60", c$ = "_webBody_b9agc_66", d$ = "_webTitle_b9agc_74", u$ = "_webDetail_b9agc_78", A = {
  runbook: Qk,
  list: Zk,
  step: e$,
  numeral: a$,
  body: t$,
  head: n$,
  title: r$,
  detail: l$,
  actions: o$,
  webList: i$,
  webStep: s$,
  webBody: c$,
  webTitle: d$,
  webDetail: u$
}, dr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function ur(e) {
  return String(e + 1).padStart(2, "0");
}
function m$({ step: e, index: a, connection: n }) {
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
function h$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(m$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function w$({ step: e, index: a, connection: n }) {
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
function f$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(w$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function YR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(f$, { ...e }) : /* @__PURE__ */ t(h$, { ...e });
}
const _$ = "_list_1gu6a_2", v$ = "_check_1gu6a_10", b$ = "_body_1gu6a_16", p$ = "_text_1gu6a_23", g$ = "_pending_1gu6a_32", y$ = "_measured_1gu6a_37", Qe = {
  list: _$,
  check: v$,
  body: b$,
  text: p$,
  pending: g$,
  measured: y$
};
function N$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function k$({ check: e }) {
  const a = N$(e.passed);
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
function JR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(k$, { check: a }, a.text)) });
}
const $$ = "_root_a6xzy_2", C$ = "_list_a6xzy_10", S$ = "_line_a6xzy_21", R$ = "_at_a6xzy_48", T$ = "_text_a6xzy_52", x$ = "_foot_a6xzy_56", L$ = "_idle_a6xzy_68", A$ = "_caret_a6xzy_76", E$ = "_jump_a6xzy_83", he = {
  root: $$,
  list: C$,
  line: S$,
  at: R$,
  text: T$,
  foot: x$,
  idle: L$,
  caret: A$,
  jump: E$
}, I$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : I$.format(new Date(e));
}
const M$ = { warn: "warning", ok: "ok" };
function B$({ kind: e }) {
  const a = M$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function P$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function q$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(P$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const j$ = 8;
function D$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > j$;
}
function O$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const mr = Te(null);
function XR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Vt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(mr.Provider, { value: i, children: n });
}
function H$() {
  const e = Re(mr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function QR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = H$(), [u, m] = p(!1), w = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const v = () => {
    var P;
    const y = l.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (P = L.item(L.length - 1)) == null || P.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(D$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(B$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(q$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(O$, { shown: u, onJump: v })
    ] })
  ] });
}
const F$ = "_row_1k8wl_2", z$ = "_head_1k8wl_14", W$ = "_author_1k8wl_20", K$ = "_eta_1k8wl_25", G$ = "_edited_1k8wl_26", U$ = "_body_1k8wl_32", V$ = "_reason_1k8wl_37", Y$ = "_actions_1k8wl_42", Ne = {
  row: F$,
  head: z$,
  author: W$,
  eta: K$,
  edited: G$,
  body: U$,
  reason: V$,
  actions: Y$
}, J$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function X$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Q$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function Z$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function e0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function a0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(Q$, { ...e }) : /* @__PURE__ */ t(Z$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function ZR(e) {
  const { comment: a } = e;
  e0(e);
  const n = N(), r = `${n}-unavailable`, l = J$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: X$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(a0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const t0 = "_root_rvhdw_2", n0 = "_attach_rvhdw_11", r0 = "_actions_rvhdw_17", l0 = "_reply_rvhdw_23", o0 = "_replyField_rvhdw_28", i0 = "_send_rvhdw_54", s0 = "_sendIcon_rvhdw_65", c0 = "_sendsAs_rvhdw_75", Pe = {
  root: t0,
  attach: n0,
  actions: r0,
  reply: l0,
  replyField: o0,
  send: i0,
  sendIcon: s0,
  sendsAs: c0
};
function hr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function d0() {
  return /* @__PURE__ */ t("svg", { className: Pe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function u0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function m0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = hr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    u0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Pe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Pe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Pe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(d0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Pe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function e2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(m0, { ...e }) : /* @__PURE__ */ t(h0, { ...e });
}
function h0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = hr(e);
  return /* @__PURE__ */ o("div", { className: Pe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Pe.attach, children: [
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
    /* @__PURE__ */ o("div", { className: Pe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const w0 = "_list_1yhks_2", f0 = "_item_1yhks_6", _0 = "_body_1yhks_22", v0 = "_text_1yhks_28", b0 = "_evidence_1yhks_37", p0 = "_consequence_1yhks_49", g0 = "_note_1yhks_54", We = {
  list: w0,
  item: f0,
  body: _0,
  text: v0,
  evidence: b0,
  consequence: p0,
  note: g0
};
function y0({ criterion: e }) {
  return /* @__PURE__ */ t(je, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Wt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function N0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function k0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: We.body, children: [
    /* @__PURE__ */ t("span", { className: We.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: We.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: We.consequence, children: N0(e.why) })
    ] })
  ] });
}
function $0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: We.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(y0, { criterion: e }),
    /* @__PURE__ */ t(k0, { criterion: e })
  ] });
}
function a2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${We.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t($0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: We.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const C0 = "_list_dwhoz_2", S0 = "_rung_dwhoz_6", R0 = "_name_dwhoz_18", T0 = "_actor_dwhoz_32", ga = {
  list: C0,
  rung: S0,
  name: R0,
  actor: T0
}, x0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function L0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = x0[e.state];
  return /* @__PURE__ */ o("li", { className: ga.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ga.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ga.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function t2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ga.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(L0, { rung: a }, a.name)) });
}
const A0 = "_sheet_pw37w_2", E0 = "_title_pw37w_9", I0 = "_stage_pw37w_15", M0 = "_effects_pw37w_20", B0 = "_effect_pw37w_20", P0 = "_numeral_pw37w_31", q0 = "_effectText_pw37w_38", j0 = "_refusals_pw37w_43", D0 = "_reasons_pw37w_52", O0 = "_reason_pw37w_52", H0 = "_actions_pw37w_62", ue = {
  sheet: A0,
  title: E0,
  stage: I0,
  effects: M0,
  effect: B0,
  numeral: P0,
  effectText: q0,
  refusals: j0,
  reasons: D0,
  reason: O0,
  actions: H0
};
function F0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function n2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      _u,
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
      /* @__PURE__ */ t(F0, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const z0 = "_list_1rowi_2", W0 = "_path_1rowi_7", K0 = "_head_1rowi_21", G0 = "_label_1rowi_28", U0 = "_consequence_1rowi_35", V0 = "_ask_1rowi_36", ea = {
  list: z0,
  path: W0,
  head: K0,
  label: G0,
  consequence: U0,
  ask: V0
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
function Y0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function J0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Kt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Kt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(Y0, { path: e, primary: a, onChoose: n })
  ] });
}
function r2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(J0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const X0 = "_list_1m7i0_2", Q0 = "_item_1m7i0_6", Z0 = "_node_1m7i0_18", eC = "_body_1m7i0_24", aC = "_head_1m7i0_30", tC = "_stage_1m7i0_36", nC = "_version_1m7i0_41", rC = "_sentence_1m7i0_49", lC = "_meta_1m7i0_54", $e = {
  list: X0,
  item: Q0,
  node: Z0,
  body: eC,
  head: aC,
  stage: tC,
  version: nC,
  sentence: rC,
  meta: lC
}, oC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function iC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function sC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(je, { size: 9, kind: oC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(iC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function l2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(sC, { entry: a }, a.stage + String(n))) });
}
const cC = "_thread_1e70p_3", dC = "_turn_1e70p_8", uC = "_who_1e70p_27", mC = "_body_1e70p_32", ya = {
  thread: cC,
  turn: dC,
  who: uC,
  body: mC
}, wr = Te(!1);
function o2({ children: e, density: a }) {
  return /* @__PURE__ */ t(wr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ya.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function i2({ turn: e }) {
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
const hC = "_list_yiolt_3", wC = "_row_yiolt_7", fC = "_label_yiolt_20", _C = "_n_yiolt_26", vC = "_cause_yiolt_33", oa = {
  list: hC,
  row: wC,
  label: fC,
  n: _C,
  cause: vC
};
function bC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const pC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function gC({ row: e, formatNumber: a }) {
  return bC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(je, { size: 8, ...pC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(yC, { cause: e.cause })
  ] });
}
function yC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function s2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(gC, { row: n, formatNumber: a }, n.label)) });
}
const NC = "_root_1jxwp_2", kC = {
  root: NC
};
function c2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: kC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const $C = "_row_dhbre_3", CC = "_key_dhbre_13", SC = "_stack_dhbre_24", RC = "_value_dhbre_32", TC = "_evidence_dhbre_39", xC = "_mark_dhbre_47", Xe = {
  row: $C,
  key: CC,
  stack: SC,
  value: RC,
  evidence: TC,
  mark: xC
};
function LC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function d2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(LC, { state: e.state }) })
  ] });
}
const AC = "_cell_gh2sd_2", EC = {
  cell: AC
}, IC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function MC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function BC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function PC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: MC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function qC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function u2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  BC(e, n);
  const r = qC(e);
  return /* @__PURE__ */ t(
    Lu,
    {
      label: "Rejection routing",
      columns: IC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: EC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: PC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(vh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const jC = "_row_1f2re_2", DC = "_title_1f2re_12", OC = "_turns_1f2re_18", HC = "_waiting_1f2re_19", FC = "_resolved_1f2re_20", zC = "_activity_1f2re_21", WC = "_cost_1f2re_28", KC = "_link_1f2re_29", GC = "_tableLink_1f2re_47", UC = "_tableRecord_1f2re_48", VC = "_tableRow_1f2re_59", YC = "_tableTitle_1f2re_71", JC = "_tableResolved_1f2re_76", XC = "_tableMeta_1f2re_87", QC = "_tableCost_1f2re_94", ZC = "_tableActivity_1f2re_95", eS = "_tableState_1f2re_105", D = {
  row: jC,
  title: DC,
  turns: OC,
  waiting: HC,
  resolved: FC,
  activity: zC,
  cost: WC,
  link: KC,
  tableLink: GC,
  tableRecord: UC,
  tableRow: VC,
  tableTitle: YC,
  tableResolved: JC,
  tableMeta: XC,
  tableCost: QC,
  tableActivity: ZC,
  tableState: eS
}, fr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function aS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function tS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function nS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const rS = { duplicate: "Closed · duplicate" };
function lS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function oS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function iS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function sS({ session: e, href: a }) {
  const n = fr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: tS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      nS(e.resolved),
      /* @__PURE__ */ t(lS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(oS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: aS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: rS[e.state] ?? n.label }),
      /* @__PURE__ */ t(iS, { link: e.link })
    ] }) })
  ] });
}
function cS({ session: e }) {
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
function m2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(sS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(cS, { session: e.session });
}
const dS = "_block_1yy2v_3", uS = "_list_1yy2v_9", mS = "_line_1yy2v_14", et = {
  block: dS,
  list: uS,
  line: mS
}, hS = { warn: "warning", ok: "ok" };
function wS({ kind: e }) {
  const a = hS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function fS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(wS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function h2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(fS, { line: n }, `${r}-${n.text}`)) }) });
}
const _S = "_band_tt7hp_1", vS = "_head_tt7hp_8", bS = "_cell_tt7hp_19", pS = "_index_tt7hp_35", gS = "_title_tt7hp_42", yS = "_note_tt7hp_48", NS = "_cellTitle_tt7hp_53", kS = "_cellBody_tt7hp_58", $S = "_tag_tt7hp_64", ye = {
  band: _S,
  head: vS,
  cell: bS,
  index: pS,
  title: gS,
  note: yS,
  cellTitle: NS,
  cellBody: kS,
  tag: $S
}, Ut = 4;
function w2({ index: e, title: a, note: n, cells: r }) {
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
  BS as ACCENT_PRESETS,
  eR as ActionStack,
  QR as ActivityConsole,
  zS as AdminIcon,
  I_ as AgentCard,
  WS as AppShell,
  PR as AppearanceStrip,
  w2 as Band,
  XS as BarChart,
  Xh as BoardColumn,
  fR as BoardFootnote,
  _R as BoardHeader,
  HS as BoardIcon,
  iR as BoardScroller,
  b as Btn,
  MS as CHIP_ROLES,
  er as CREDENTIAL_COLUMNS,
  JS as Callout,
  qR as CapabilityRow,
  i2 as ChatMessage,
  rn as Checkbox,
  h as Chip,
  ta as ClampText,
  ZR as ClarificationRow,
  SR as ClauseRuleRow,
  CR as ClauseRules,
  Mn as ColourLadder,
  jR as ComponentRow,
  e2 as Composer,
  bR as ConfigRow,
  vR as ConfigRowHead,
  ot as ConnectionMark,
  XR as ConsoleAnnounceProvider,
  o2 as Conversation,
  _u as CostMeter,
  OR as CredentialRow,
  DR as CredentialRowHead,
  a2 as CriteriaList,
  Ti as Crumb,
  PS as DENSITIES,
  s2 as DeliveryHealth,
  dR as DeniedState,
  DS as DisabledScope,
  TR as DryRunRail,
  vh as EmptyState,
  HR as EnvCard,
  M as Field,
  cR as FilteredEmpty,
  lR as FormStack,
  Da as GateChecklist,
  t2 as GateLadder,
  Lu as Grid,
  LR as HandoffRuleRow,
  xR as HandoffRules,
  OS as HomeIcon,
  pR as ItemDrawer,
  FR as KeyPanel,
  Br as LIVE_EVENT_TYPES,
  a_ as LegacyBoardColumn,
  yR as LegacyBoardHeader,
  NR as LegacyConfigRow,
  $R as LegacyItemDrawer,
  Vf as LegacyOverCapNote,
  kR as LegacyPreviewRail,
  An as LegacyWorkCard,
  xe as LiveIndicator,
  uR as LoadFailed,
  wR as Loading,
  or as MCP_SERVER_COLUMNS,
  lt as Mark,
  WR as MarkUpload,
  je as Marker,
  GR as McpServerRow,
  KR as McpServerRowHead,
  Us as Menu,
  Ms as MenuButton,
  AR as NewStreamModal,
  gh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  RR as PARTIAL_STEP_REASON,
  ir as POLICY_CHIP_WIDTH,
  tR as PageFrame,
  YS as PageHeader,
  QS as PlainList,
  UR as PolicyRow,
  gR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Gn as RULE_ACTIONS,
  Cn as Radio,
  c2 as ReadyChecklist,
  rR as RecordSection,
  n2 as RequeueSheet,
  r2 as ResolveBlock,
  d2 as ResolvedFieldRow,
  VR as RoleMatrixRow,
  u2 as RoutingTable,
  ER as RuleRow,
  YR as RunbookSteps,
  Mr as STREAM_STEPS,
  oR as SectionBand,
  At as SectionHeader,
  kn as SegmentedControl,
  hn as Select,
  m2 as SessionRow,
  US as Sidebar,
  IR as StageColumn,
  sR as StageGrid,
  l2 as StageHistory,
  wp as StageListEditor,
  mR as StaleStrip,
  Pa as StatStrip,
  VS as StreamAvatar,
  MR as StreamRow,
  FS as StudioIcon,
  nR as SubjectRail,
  Ge as Switch,
  GS as TabLinks,
  ZS as TableHead,
  KS as Tabs,
  LS as ThemeProvider,
  BR as ToolRow,
  aR as TopBar,
  Im as Tree,
  Tn as TreeRow,
  h2 as TypedInputBlock,
  po as UNSAFE_HREF,
  JR as ValidationList,
  TS as VisibilityProvider,
  xS as Visible,
  IS as WARD_VERSION,
  ja as WorkCard,
  hR as WriteUnavailableStrip,
  aS as agoSince,
  kr as clock,
  Ap as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  ES as eventSourceTransport,
  Aa as isStreamStep,
  sa as isValidatedStreamStep,
  cv as ladderValidation,
  ak as mcpConnectionChip,
  Z1 as mcpToolName,
  ne as money,
  we as ms,
  xn as ordered,
  Jt as ratio,
  yN as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  qS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  jr as streamHex,
  Zc as streamInitials,
  Pr as streamVars,
  va as useBorderFlash,
  Le as useDisabledScope,
  Ar as useFocusTrap,
  jS as useLiveFeed,
  AS as useReturnFocus,
  La as useRovingTabindex,
  nt as useTicker,
  $r as useVisible,
  W as v,
  zR as validateMark,
  ua as validatedStep,
  Qt as validatedStreamSteps
};
