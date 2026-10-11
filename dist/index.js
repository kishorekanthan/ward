import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Vt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as X, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as fr, Children as _r, Fragment as vr } from "react";
import { createPortal as br, flushSync as Yt } from "react-dom";
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
const pr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = pr.formatToParts(new Date(e)), n = (r) => {
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
const gr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function yr(e) {
  return gr.format(new Date(e));
}
const Xt = Te(/* @__PURE__ */ new Set());
function mS({ hidden: e, children: a }) {
  const n = Vt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Xt.Provider, { value: n, children: a });
}
function Nr(e) {
  return !Re(Xt).has(e);
}
function hS({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: Nr(e) ? a : n });
}
const kr = "(prefers-color-scheme: dark)";
function _t() {
  return typeof window.matchMedia == "function" ? window.matchMedia(kr) : null;
}
function $r(e) {
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
function Fa(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Cr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function wS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = $r(e === "system");
  return Fa("data-theme", Cr(e, l)), Fa("data-accent", a), Fa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Sr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Rr(e, a, n, r) {
  return e.shiftKey ? document.activeElement === n ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? n : void 0;
}
function Tr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Rr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function xr(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Sr));
      Tr(n, e.current, r);
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
const vt = { ArrowUp: -1, ArrowDown: 1 }, bt = { ArrowLeft: -1, ArrowRight: 1 }, Lr = (e, a, n) => Math.min(n, Math.max(a, e));
function Ar(e, a) {
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
  const i = X((u) => n(u), []), s = X((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = X(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const w = Math.max(0, m.indexOf(a)), v = Ar(u.key, e);
      v !== void 0 ? (u.preventDefault(), s(m[Lr(w + v, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
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
const _S = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, vS = "0.2.0", bS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Er = [1, 2, 3, 4, 5, 6], Qt = [1, 2, 3], Ir = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], pS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], gS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
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
  return Er.includes(e);
}
function Aa(e) {
  return Qt.includes(e);
}
function yS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function NS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Mr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Br(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return Mr[e];
}
function pt(e) {
  return typeof e != "string" ? null : Ir.includes(e) ? e : null;
}
function Pr(e) {
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
  const r = Pr(e);
  if (r === null) return null;
  const l = pt(n) ?? pt(r.type);
  return l === null ? null : { ...r, type: l, id: Dr(r, a), at: Or(r) };
}
function Fr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function jr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function kS(e, a) {
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
        const He = Hr(R, G, ge);
        He !== null && (He.id && (d.current = He.id), le(), y.current = !1, B("live"), i(He.at), Le(He));
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
    jr(R, y.current, ge) && Ue(ge);
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
const qr = { blue: "running", orange: "waiting", green: "done" };
function zr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function _a(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (zr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${qr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => gt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Wr = "_root_1otpc_2", Kr = {
  root: Wr
};
function Gr(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${yr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Gr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Kr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Ur = "_app_1m4se_1", Vr = "_side_1m4se_30", Yr = "_sideTop_1m4se_42", Jr = "_sideBody_1m4se_56", Xr = "_iconRail_1m4se_67", Qr = "_railItem_1m4se_76", Zr = "_railIcon_1m4se_97", el = "_railDot_1m4se_102", al = "_railLetter_1m4se_108", tl = "_main_1m4se_113", nl = "_rail_1m4se_76", rl = "_page_1m4se_131", ll = "_headerRow_1m4se_140", ol = "_sidebarToggle_1m4se_147", il = "_headerSlot_1m4se_152", sl = "_drawerSide_1m4se_157", cl = "_root_1m4se_193", dl = "_topbar_1m4se_200", ul = "_mark_1m4se_211", ml = "_brand_1m4se_218", hl = "_tagline_1m4se_224", wl = "_identity_1m4se_230", fl = "_tools_1m4se_231", _l = "_nav_1m4se_241", vl = "_metadata_1m4se_248", bl = "_actor_1m4se_263", pl = "_detail_1m4se_264", gl = "_content_1m4se_324", yl = "_toolsPanel_1m4se_340", Nl = "_skip_1m4se_366", $ = {
  app: Ur,
  side: Vr,
  sideTop: Yr,
  sideBody: Jr,
  iconRail: Xr,
  railItem: Qr,
  railIcon: Zr,
  railDot: el,
  railLetter: al,
  main: tl,
  rail: nl,
  page: rl,
  headerRow: ll,
  sidebarToggle: ol,
  headerSlot: il,
  drawerSide: sl,
  root: cl,
  topbar: dl,
  mark: ul,
  brand: ml,
  tagline: hl,
  identity: wl,
  tools: fl,
  nav: _l,
  metadata: vl,
  actor: bl,
  detail: pl,
  content: gl,
  toolsPanel: yl,
  skip: Nl
};
function sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const kl = "_scope_1an6i_2", $l = {
  scope: kl
}, Zt = Te(null);
function $S({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${$l.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(Zt.Provider, { value: { reason: e, reasonId: n }, children: a })
  ] });
}
function De() {
  return Re(Zt);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : sa(e, a.reasonId);
}
const Cl = "_btn_tzr89_2", Sl = "_primary_tzr89_14", Rl = "_destructive_tzr89_25", Tl = "_secondary_tzr89_35", xl = "_ghost_tzr89_40", Ll = "_overflow_tzr89_49", Al = "_sm_tzr89_56", El = "_disabled_tzr89_60", ua = {
  btn: Cl,
  primary: Sl,
  destructive: Rl,
  secondary: Tl,
  ghost: xl,
  overflow: Ll,
  sm: Al,
  disabled: El
};
function Il(e, a, n, r) {
  const l = a === "sm" ? [ua.sm, "ward-btn--sm"] : [], i = n ? [ua.disabled] : [];
  return [ua.btn, ua[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ml(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Bl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Pl(e, a) {
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
  const a = De();
  Bl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Pl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Il(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Ol(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ml(n, e.controls),
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
const jl = "_scrim_18idy_2", ql = "_drawer_18idy_10", zl = "_sheet_18idy_14", Wl = "_modal_18idy_18", Kl = "_panel_18idy_23", Gl = "_start_18idy_39", Ul = "_header_18idy_62", Vl = "_title_18idy_70", Yl = "_body_18idy_74", Jl = "_close_18idy_101", Ce = {
  scrim: jl,
  drawer: ql,
  sheet: zl,
  modal: Wl,
  panel: Kl,
  start: Gl,
  header: Ul,
  title: Vl,
  body: Yl,
  close: Jl
}, Xl = Te(null), ya = [], Na = /* @__PURE__ */ new Map();
function Ql(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Zl(e, a) {
  let n = Na.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, Na.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function eo(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Ql(r) && Zl(e, r);
}
function ao(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (eo(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function to(e) {
  for (const a of e.claims) {
    const n = Na.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), Na.delete(a)));
  }
}
function no(e, a) {
  const n = { root: e, claims: [] };
  return ya.push(n), ao(n, a), n;
}
function ro(e) {
  const a = ya.indexOf(e);
  a >= 0 && ya.splice(a, 1), to(e);
}
function yt(e) {
  return e !== null && ya.at(-1) === e;
}
function lo(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = no(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      ro(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => yt(r.current), []);
}
function oo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function io(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function so({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function co(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function uo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function mo(e) {
  const a = Re(Xl);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = mo(e.container), i = Ia("(min-width: 768px)"), s = oo(e.kind, i), c = io(e, r), d = xr(n), u = lo(a, l, e.returnFocusTo), m = X(() => {
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
  }, [m]), br(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: co(s),
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
            className: uo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(so, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const ho = /^([a-z][a-z0-9+.-]*):/i, wo = /* @__PURE__ */ new Set(["http", "https"]), fo = "#";
function _o(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = ho.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function j(e) {
  const a = _o(e);
  return a === void 0 || wo.has(a) ? e : fo;
}
function vo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function en(e) {
  const a = vo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ma(e, a) {
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
function bo(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function an(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = bo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), en(r);
  }, [e, a, n]);
}
const po = "_icon_1ylqy_2", go = {
  icon: po
};
function ca({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: go.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
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
function yo() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const tn = "ward:sidebar-collapsed", No = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function ko() {
  try {
    return window.localStorage.getItem(tn) === "true";
  } catch {
    return !1;
  }
}
function $o(e) {
  try {
    window.localStorage.setItem(tn, String(e));
  } catch {
  }
}
function Co(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function So(e) {
  return e instanceof Element && e.closest(No) !== null;
}
function Ro(e) {
  return e.key === "[" && !Co(e) && !So(e.target);
}
function To(e) {
  const [a, n] = p(ko), r = () => {
    $o(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Ro(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function xo() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Lo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Ao({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function Eo(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = To(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function Io({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(yo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Mo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Bo({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: j(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Mo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Po({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Io, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Bo, { items: n ?? [], label: a })
  ] });
}
function Do({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = xo(), d = Eo(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(Po, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Lo, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Ao, { sidebar: e, label: u, drawer: c })
  ] });
}
function Oo({ destinations: e, active: a }) {
  const n = f(null);
  return Ma(n, e.length), an(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t("nav", { ref: n, className: $.nav, "aria-label": "Primary", children: e.map((r) => /* @__PURE__ */ t("a", { href: j(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function Ho({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function Fo() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function jo({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function qo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function zo(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Oo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(Ho, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(jo, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Wo(e) {
  const a = N(), n = Fo();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(zo, { ...e, menu: n }),
    /* @__PURE__ */ t(qo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Ko(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function xS(e) {
  return Ko(e) ? /* @__PURE__ */ t(Do, { ...e }) : /* @__PURE__ */ t(Wo, { ...e });
}
const Go = "_root_197jc_2", Uo = "_row_197jc_8", Vo = "_box_197jc_14", Yo = "_label_197jc_21", Jo = "_lockedNote_197jc_26", Xo = "_consequence_197jc_34", Qo = "_sample_197jc_69", je = {
  root: Go,
  row: Uo,
  box: Vo,
  label: Yo,
  lockedNote: Jo,
  consequence: Xo,
  sample: Qo
};
function Zo(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function ei({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${je.consequence} ward-check-consequence`, children: a }) : null;
}
function ai({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${je.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ti({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: je.sample, "aria-hidden": "true", children: e }) : null;
}
function nn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = De(), l = Zo(e, r);
  return /* @__PURE__ */ o("div", { className: `${je.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: je.row, children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${je.box} ward-field-option`,
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
      /* @__PURE__ */ o("label", { htmlFor: a, className: je.label, children: [
        e.label,
        /* @__PURE__ */ t(ai, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(ti, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(ei, { id: n, text: e.consequence })
  ] });
}
const ni = "_chip_pq6tb_2", ri = {
  chip: ni
}, li = {
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
function oi(e, a) {
  if (e === "stream") return ii(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = li[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function ii(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${ri.chip} ward-chip ward-chip--${e}`, style: oi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const si = "_clamp_zn74g_3", Nt = {
  clamp: si
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
const ci = "_root_zvypg_3", di = "_nav_zvypg_7", ui = "_list_zvypg_13", mi = "_item_zvypg_21", hi = "_link_zvypg_41", wi = "_sep_zvypg_51", fi = "_current_zvypg_55", _i = "_chips_zvypg_59", Ae = {
  root: ci,
  nav: di,
  list: ui,
  item: mi,
  link: hi,
  sep: wi,
  current: fi,
  chips: _i
};
function vi({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ae.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ae.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ae.link} ward-target`, href: j(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ae.current, "aria-current": "page", title: n.label, children: n.label })
    ] }, n.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Ae.chips} ward-chiprow`, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] }) });
}
function rn(e, a, n) {
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
const bi = 500;
function ln(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function on() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, bi), e.current);
}
const ma = 4;
function pi(e, a, n) {
  const r = Math.max(0, n - e.bottom - ma * 2), l = Math.max(0, e.top - ma * 2);
  return a <= r || r >= l ? { top: e.bottom + ma, maxHeight: r } : { top: e.top - ma - Math.min(a, l), maxHeight: l };
}
function gi(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function yi(e, a, n, r) {
  return { ...pi(e, a.height, n.height), left: gi(e, a.width, n.width, r) };
}
function va(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ni(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", va(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function ki(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = ki(e), l = Ni(e, a), i = yi(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: va(i.left - l.box.left), top: va(i.top - l.box.top), maxHeight: va(i.maxHeight) }), r();
}
function $i(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function sn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = $i(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Ci = "_root_axvxm_2", Si = "_trigger_axvxm_7", Ri = "_value_axvxm_32", Ti = "_menu_axvxm_50", xi = "_find_axvxm_72", Li = "_list_axvxm_88", Ai = "_option_axvxm_99", Ei = "_check_axvxm_118", Ii = "_empty_axvxm_129", fe = {
  root: Ci,
  trigger: Si,
  value: Ri,
  menu: Ti,
  find: xi,
  list: Li,
  option: Ai,
  check: Ei,
  empty: Ii
}, Mi = 7;
function Bi(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Pi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Yt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Bi(e.options, l),
    findable: e.options.length > Mi,
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
function Di(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Oi(e) {
  const a = on();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function cn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function Hi(e) {
  return { ...cn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function dn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const Fi = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ji(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Fi.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function qi({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function zi({ menu: e, ids: a, focusRef: n }) {
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
      onKeyDown: dn(e, cn(e), () => {
      })
    }
  );
}
function Wi({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Oi(a), s = f(null);
  sn(l, s);
  const c = (d) => {
    ln(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(zi, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: dn(a, Hi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(qi, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Ki(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function un(...e) {
  return e.filter(Boolean).join(" ");
}
function Gi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Ui({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = De()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: un(fe.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": sa(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      disabled: e.disabled,
      title: s,
      ...ji(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Gi(e) })
    }
  );
}
function mn(e) {
  const a = De(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Pi(n, s), u = Di(d.open, c);
  return rn(d.open, i, () => d.close(!1)), Ki(d, l), /* @__PURE__ */ o("div", { ref: i, className: un(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Ui, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(Wi, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Vi = "_field_13oav_2", Yi = "_label_13oav_8", Ji = "_labelHidden_13oav_15", Xi = "_control_13oav_25", Qi = "_mono_13oav_45", Zi = "_area_13oav_50", es = "_invalid_13oav_57", Pe = {
  field: Vi,
  label: Yi,
  labelHidden: Ji,
  control: Xi,
  mono: Qi,
  area: Zi,
  invalid: es
}, as = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, hn = (e) => `${e}-label`;
function ts({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? as : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ns({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    mn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": hn(a.id),
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
function rs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ls = { input: ts, select: ns, textarea: rs };
function os(e, a, n) {
  const r = ls[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function is(e, a, n, r) {
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
function ss(e) {
  const a = e.mono ? [Pe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Pe.area] : [];
  return [Pe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function cs(e) {
  return e ? `${Pe.label} ${Pe.labelHidden} ward-field-label` : `${Pe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = is(e, a, n, De()), l = ss(e);
  return /* @__PURE__ */ o("div", { className: `${Pe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: hn(a), className: cs(e.labelHidden), htmlFor: a, children: e.label }),
    os(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Pe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const ds = "_root_1gft5_2", us = "_trigger_1gft5_9", ms = "_panel_1gft5_33", hs = "_menu_1gft5_52", ws = "_group_1gft5_57", fs = "_heading_1gft5_62", _s = "_item_1gft5_68", vs = "_separator_1gft5_94", bs = "_footer_1gft5_100", _e = {
  root: ds,
  trigger: us,
  panel: ms,
  menu: hs,
  group: ws,
  heading: fs,
  item: _s,
  separator: vs,
  footer: bs
}, wn = Te(null);
function ps(e, a) {
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
const gs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ys(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = gs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function fn(...e) {
  return e.filter(Boolean).join(" ");
}
function Ns(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: fn(_e.trigger, r) };
}
function ks(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = ps(e.defaultOpen === !0, l);
  return rn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: fn(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Ns(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ys(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(wn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function $s(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Cs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const _n = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = _n(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const Ss = (e) => e.split("").every((a) => a === e[0]);
function Rs(e, a, n) {
  const r = Ss(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = _n(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Ts(e) {
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
function xs(e, a) {
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
function Ls(e, a) {
  const n = f(!1), r = on(), l = xs(e, a), i = (s) => {
    ln(s) && e.focus(Rs(e.items, e.current(), r(s.key)));
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
function As(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function Es({ row: e, nav: a, popup: n }) {
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
function vn(e) {
  const { item: a, at: n } = e.row, r = {
    ref: (l) => {
      e.nav.refs.current[n] = l;
    },
    role: "menuitem",
    tabIndex: -1,
    className: _e.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...Es(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: j(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Is({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(vn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Ms({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Is, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(vn, { row: e.row, nav: a, popup: n });
}
function Bs() {
  const e = Re(wn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Ps({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Bs(), c = f(null);
  sn(s, c, n);
  const d = $s(e), u = Ts(d.flatMap(Cs).map((w) => w.item)), m = Ls(u, r);
  return As(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(Ms, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
const Ds = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Os({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Ds(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const ja = (e) => Number.parseFloat(e) || 0, Ct = (e) => e.getBoundingClientRect().width;
function Hs(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - ja(a.paddingInlineStart) - ja(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: ja(a.columnGap)
  };
}
function Fs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const js = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function qs(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Hs(i);
      l((d) => js(d, c) ? d : c);
    };
    return s(), Fs(i, s);
  }, [e, n]), r && Os(r, a);
}
const zs = "_strip_1x6px_2", Ws = "_fits_1x6px_33", Ks = "_probe_1x6px_41", Gs = "_moreRoot_1x6px_50", Us = "_more_1x6px_50", Vs = "_tab_1x6px_69", Ys = "_count_1x6px_105", ve = {
  strip: zs,
  fits: Ws,
  probe: Ks,
  moreRoot: Gs,
  more: Us,
  tab: Vs,
  count: Ys
}, bn = "More";
function Js(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const pn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function gn(e) {
  return `${ve.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
const Xs = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Qs({ tab: e, active: a, place: n, onChange: r }) {
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
function Zs(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function ec({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(ks, { label: bn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Ps, { align: "end", entries: e.map((r) => ({ label: pn(r), onSelect: () => n(r.id) })) }) });
}
function ac(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Xs;
}
function LS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l = 1 }) {
  const i = xa({ orientation: "horizontal" }), s = Js(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null), d = qs(c, s, e.map(pn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${gn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(Qs, { tab: m, active: a, place: ac(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: bn }),
    u.length > 0 && /* @__PURE__ */ t(ec, { tabs: u, trigger: i.itemProps(e.length), onPick: Zs(c, n) })
  ] });
}
const St = 7;
function AS({ links: e, active: a, label: n, level: r = 1 }) {
  if (e.length > St) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${St} — the set is fixed`);
  const l = f(null);
  return Ma(l, e.length), an(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t("nav", { ref: l, className: gn(r), "aria-label": n, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const tc = "_root_v56ff_3", nc = "_segment_v56ff_9", Rt = {
  root: tc,
  segment: nc
};
function yn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const rc = "_sidebar_s9o1j_3", lc = "_brand_s9o1j_9", oc = "_mark_s9o1j_17", ic = "_word_s9o1j_24", sc = "_nav_s9o1j_30", cc = "_navItem_s9o1j_39", dc = "_footLink_s9o1j_49", uc = "_group_s9o1j_58", mc = "_groupName_s9o1j_65", hc = "_agents_s9o1j_81", wc = "_agent_s9o1j_81", fc = "_root_s9o1j_96", _c = "_agentTop_s9o1j_105", vc = "_dot_s9o1j_112", bc = "_agentName_s9o1j_124", pc = "_agentMeta_s9o1j_138", gc = "_foot_s9o1j_49", yc = "_footName_s9o1j_150", Nc = "_footLinks_s9o1j_157", kc = "_linkBrand_s9o1j_184", $c = "_label_s9o1j_205", Cc = "_note_s9o1j_210", Sc = "_footer_s9o1j_226", x = {
  sidebar: rc,
  brand: lc,
  mark: oc,
  word: ic,
  nav: sc,
  navItem: cc,
  new: "_new_s9o1j_48",
  footLink: dc,
  group: uc,
  groupName: mc,
  agents: hc,
  agent: wc,
  root: fc,
  agentTop: _c,
  dot: vc,
  agentName: bc,
  agentMeta: pc,
  foot: gc,
  footName: yc,
  footLinks: Nc,
  linkBrand: kc,
  label: $c,
  note: Cc,
  footer: Sc
};
function Rc({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: x.agent,
      href: j(e.href),
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
function Tc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: j(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function xc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: x.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: x.brand, children: [
      /* @__PURE__ */ t("span", { className: x.mark }),
      /* @__PURE__ */ t("span", { className: x.word, children: e })
    ] }),
    /* @__PURE__ */ t("div", { className: x.nav, children: a.map((s) => /* @__PURE__ */ t("a", { className: x.navItem, href: j(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: x.group, children: [
      /* @__PURE__ */ o("span", { className: x.groupName, children: [
        n,
        " · ",
        ee(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: j(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Rc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Tc, { shared: i })
  ] });
}
function Lc(e) {
  return e.destinations ?? e.items ?? [];
}
function Ac({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Ec({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Ic({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: j(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Mc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Ac, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Lc(e).map((a) => /* @__PURE__ */ t(Ic, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Ec, { children: e.children })
  ] });
}
function Bc(e) {
  return "agents" in e;
}
function ES(e) {
  return Bc(e) ? /* @__PURE__ */ t(xc, { ...e }) : /* @__PURE__ */ t(Mc, { ...e });
}
const Pc = "_mark_wlgi8_3", Dc = {
  mark: Pc
}, Oc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Dc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Oc[e]
    }
  );
}
const Hc = "_marker_br9fi_2", Fc = {
  marker: Hc
}, jc = {
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
}, qc = { running: " ward-running" };
function Oe({ size: e, kind: a, label: n }) {
  const r = { "--marker": jc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Fc.marker} ward-marker ward-marker--${a}${qc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const zc = "_root_ti0pq_2", Wc = "_chip_ti0pq_11", Kc = "_noCase_ti0pq_23", ha = {
  root: zc,
  chip: Wc,
  noCase: Kc
};
function Gc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = Gc(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ha.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(Oe, { size: 6, kind: "green" }),
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
const Uc = "_root_1cvxf_2", Vc = "_context_1cvxf_12", Yc = "_row_1cvxf_1", Jc = "_heading_1cvxf_25", Xc = "_headingWrap_1cvxf_33", Qc = "_chips_1cvxf_38", Zc = "_title_1cvxf_45", ed = "_consequence_1cvxf_55", ad = "_actionsWrap_1cvxf_62", td = "_actions_1cvxf_62", nd = "_action_1cvxf_62", rd = "_overflowPanel_1cvxf_91", ld = "_measureClip_1cvxf_102", od = "_measure_1cvxf_102", Y = {
  root: Uc,
  context: Vc,
  row: Yc,
  heading: Jc,
  headingWrap: Xc,
  chips: Qc,
  title: Zc,
  consequence: ed,
  actionsWrap: ad,
  actions: td,
  action: nd,
  overflowPanel: rd,
  measureClip: ld,
  measure: od
};
function id({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function sd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(id, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function cd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function dd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function ud({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function md(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function hd({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(vi, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function wd(...e) {
  return e.some((a) => a === null);
}
function fd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function _d(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + fd(e);
}
function vd(e, a, n, r, l) {
  if (l === 0 || wd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - _d(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function bd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function pd(e) {
  return fr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function gd(e, a) {
  return a.length === 0 && e.length === 1 && pd(e[0]);
}
function yd(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!bd(d)) return;
    const u = () => c(vd(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Nd({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function kd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function IS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = yd(i, gd(i, s)), B = s.length > 0, { disclosure: le, close: Le } = md(L || B, v), ae = dd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(hd, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t(sd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(kd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(cd, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(ud, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(Nd, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const $d = "_root_td96x_2", Cd = "_body_td96x_16", xt = {
  root: $d,
  body: Cd
};
function MS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const Sd = "_root_bf1pc_2", Rd = "_table_bf1pc_9", Td = "_caption_bf1pc_14", xd = "_series_bf1pc_23", Ld = "_category_bf1pc_31", Ad = "_cell_bf1pc_39", Ed = "_track_bf1pc_45", Id = "_lane_bf1pc_52", Md = "_bar_bf1pc_56", Bd = "_value_bf1pc_63", Pd = "_swatch_bf1pc_70", Dd = "_empty_bf1pc_78", J = {
  root: Sd,
  table: Rd,
  caption: Td,
  series: xd,
  category: Ld,
  cell: Ad,
  track: Ed,
  lane: Id,
  bar: Md,
  value: Bd,
  swatch: Pd,
  empty: Dd
}, Od = "—", Lt = 6;
function Hd(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Fd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Nn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function jd(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function qd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = jd(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function zd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Nn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Wd({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Kd({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Od }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(zd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(qd, { value: u.values[d], top: r, step: Nn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function BS(e) {
  Hd(e.categories, e.series);
  const a = Fd(e.series);
  return a === 0 ? /* @__PURE__ */ t(Wd, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Kd, { ...e, top: a });
}
const Gd = "_root_1bfqw_2", Ud = "_figure_1bfqw_7", Vd = "_of_1bfqw_13", Yd = "_bar_1bfqw_18", Jd = "_rows_1bfqw_38", Xd = "_row_1bfqw_38", Qd = "_label_1bfqw_49", Zd = "_amount_1bfqw_54", Ee = {
  root: Gd,
  figure: Ud,
  of: Vd,
  bar: Yd,
  rows: Jd,
  row: Xd,
  label: Qd,
  amount: Zd
};
function eu({ spent: e, ceiling: a, breakdown: n }) {
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
const au = "_frame_9xel2_2", tu = "_table_9xel2_6", nu = "_th_9xel2_12", ru = "_td_9xel2_13", lu = "_sort_9xel2_48", ou = "_row_9xel2_60", iu = "_empty_9xel2_68", Me = {
  frame: au,
  table: tu,
  th: nu,
  td: ru,
  sort: lu,
  row: ou,
  empty: iu
}, su = { asc: "ascending", desc: "descending" };
function cu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return su[a.direction];
}
function du(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function uu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function mu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: uu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": cu(e, a),
      children: du(e, n)
    }
  );
}
function hu({ row: e, props: a }) {
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
function wu({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(mu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(hu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const fu = "_list_v0s52_2", _u = {
  list: fu
};
function PS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: _u.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const vu = "_label_1u62a_2", bu = {
  label: vu
};
function DS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: bu.label, children: a.header }) }, a.key)) }) });
}
const pu = "_stack_bp6a0_2", gu = {
  stack: pu
};
function OS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: gu.stack, "data-ward-action-stack": "", children: e });
}
const yu = "_set_1z0sq_2", Nu = "_legend_1z0sq_7", ku = "_row_1z0sq_15", $u = "_control_1z0sq_20", Cu = "_input_1z0sq_26", Su = "_label_1z0sq_31", Ru = "_consequence_1z0sq_36", Fe = {
  set: yu,
  legend: Nu,
  row: ku,
  control: $u,
  input: Cu,
  label: Su,
  consequence: Ru
};
function kn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Fe.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Fe.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, v = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Fe.row, children: [
        /* @__PURE__ */ o("span", { className: Fe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: Fe.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": sa(v, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: Fe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: v, className: `${Fe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Tu = "_root_11gpw_2", xu = "_head_11gpw_10", Lu = "_note_11gpw_29", Au = "_index_11gpw_34", Eu = "_dot_11gpw_38", Iu = "_counter_11gpw_49", Mu = "_trailing_11gpw_57", qe = {
  root: Tu,
  head: xu,
  note: Lu,
  index: Au,
  dot: Eu,
  counter: Iu,
  trailing: Mu
};
function Bu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Pu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ t(Bu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: qe.note, children: n }),
    /* @__PURE__ */ t(Pu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: qe.trailing, children: i })
  ] });
}
const Du = "_strip_ww53x_2", Ou = "_cell_ww53x_7", Hu = "_value_ww53x_12", Fu = "_link_ww53x_29", ju = "_label_ww53x_49", Ke = {
  strip: Du,
  cell: Ou,
  value: Hu,
  link: Fu,
  label: ju
};
function qu(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const $n = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function zu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: $n(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function Wu({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: $n(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: j(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return qu(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(zu, { cell: n }, n.label) : /* @__PURE__ */ t(Wu, { cell: n, href: n.href }, n.label)) });
}
const Ku = "_root_1eb1u_2", Gu = "_track_1eb1u_8", Uu = "_thumb_1eb1u_46", Vu = "_labelHidden_1eb1u_64", Yu = "_label_1eb1u_64", Ju = "_lockedNote_1eb1u_84", ze = {
  root: Ku,
  track: Gu,
  thumb: Uu,
  labelHidden: Vu,
  label: Yu,
  lockedNote: Ju
};
function Xu(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function Qu(e) {
  return e ? `${ze.label} ${ze.labelHidden}` : ze.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = De(), { on: m, off: w } = Xu(a, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Qu(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: ze.lockedNote, children: "always on" })
    ] })
  ] });
}
const Zu = "_bar_1vp69_2", em = "_skip_1vp69_11", am = "_mark_1vp69_22", tm = "_nav_1vp69_30", nm = "_list_1vp69_34", rm = "_select_1vp69_41", lm = "_selectTrigger_1vp69_45", om = "_dest_1vp69_52", im = "_actor_1vp69_71", sm = "_actorMark_1vp69_84", cm = "_actorLabel_1vp69_89", dm = "_tagline_1vp69_108", oe = {
  bar: Zu,
  skip: em,
  mark: am,
  nav: tm,
  list: nm,
  select: rm,
  selectTrigger: lm,
  dest: om,
  actor: im,
  actorMark: sm,
  actorLabel: cm,
  tagline: dm
};
function um(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function mm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function HS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = mm(r);
  return /* @__PURE__ */ o("header", { className: oe.bar, children: [
    /* @__PURE__ */ t("a", { className: `${oe.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: oe.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: oe.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: oe.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: oe.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${oe.dest} ward-target`,
          href: j(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        mn,
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: um(c) })
    ] })
  ] });
}
const hm = "_tree_zzoob_2", wm = "_item_zzoob_6", fm = "_row_zzoob_10", _m = "_button_zzoob_22", ka = {
  tree: hm,
  item: wm,
  row: fm,
  button: _m
}, Cn = Te(null);
function vm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(Cn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const bm = { ArrowRight: !0, ArrowLeft: !1 };
function Et(e) {
  return e ? !0 : void 0;
}
function pm(e, a) {
  const n = bm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function gm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function ym(e) {
  const a = [ka.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Nm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function km(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function $m(e) {
  return typeof e == "string" ? e : void 0;
}
function Cm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Sm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Sn(e) {
  const a = Re(Cn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Nm(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: ym(e),
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
            className: `${ka.button} ward-treeitem-btn`,
            onClick: () => gm(e),
            onKeyDown: (r) => pm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: km(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: $m(e.label), children: e.label }),
              /* @__PURE__ */ t(Cm, { value: e.detail }),
              /* @__PURE__ */ t(Sm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Rm = "_frame_1nuth_2", Tm = "_subjectRail_1nuth_22", xm = "_subject_1nuth_22", Lm = "_rail_1nuth_42", Am = "_record_1nuth_66", Em = "_recordBody_1nuth_71", Im = "_stageGrid_1nuth_120", Mm = "_band_1nuth_146", Bm = "_bandBody_1nuth_154", Pm = "_bandActions_1nuth_159", Dm = "_scroller_1nuth_167", Om = "_board_1nuth_203", Hm = "_lanes_1nuth_212", Z = {
  frame: Rm,
  subjectRail: Tm,
  subject: xm,
  rail: Lm,
  record: Am,
  recordBody: Em,
  stageGrid: Im,
  band: Mm,
  bandBody: Bm,
  bandActions: Pm,
  scroller: Dm,
  board: Om,
  lanes: Hm
};
function FS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function It(e) {
  return e ? "true" : void 0;
}
function jS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": It(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": It(l), "aria-label": r, children: a })
  ] });
}
function qS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Fm = "_form_1j8ub_2", jm = "_fields_1j8ub_9", qm = "_actions_1j8ub_19", qa = {
  form: Fm,
  fields: jm,
  actions: qm
};
function zS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: qa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: qa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: qa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function WS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const zm = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = f(null);
  Ma(r, n ?? _r.count(a));
  const l = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t("div", { ref: r, className: Z.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: l, children: a });
}
function Wm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Km({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(vr, { children: n.content }, n.id)) }) });
}
function KS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(zm);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(Wm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Km, { lanes: n, label: a });
}
function GS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = f(null), i = Math.max(e, 1);
  Ma(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ t("div", { ref: l, className: Z.stageGrid, role: "region", "aria-label": n, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Gm = "_block_b38uc_3", Um = "_sentence_b38uc_10", Vm = "_meta_b38uc_19", Ym = "_action_b38uc_24", Jm = "_strip_b38uc_28", Xm = "_loading_b38uc_47", Qm = "_label_b38uc_55", Zm = "_counter_b38uc_62", be = {
  block: Gm,
  sentence: Um,
  meta: Vm,
  action: Ym,
  strip: Jm,
  loading: Xm,
  label: Qm,
  counter: Zm
};
function eh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Da({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(eh, { action: a })
  ] });
}
function ah(e) {
  return /* @__PURE__ */ t(Da, { ...e, kind: "ward-emptystate" });
}
function US({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Da, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function VS(e) {
  return /* @__PURE__ */ t(Da, { ...e });
}
function YS({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Da, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function JS({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function XS({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function QS({ label: e, startedAt: a }) {
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
const th = "_note_cigdt_2", nh = {
  note: th
};
function rh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: nh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const lh = "_card_k7btg_3", oh = "_hit_k7btg_31", ih = "_head_k7btg_44", sh = "_title_k7btg_51", ch = "_meta_k7btg_57", dh = "_since_k7btg_66", uh = "_sep_k7btg_76", mh = "_fields_k7btg_80", hh = "_field_k7btg_80", wh = "_last_k7btg_98", fh = "_reason_k7btg_110", se = {
  card: lh,
  hit: oh,
  head: ih,
  title: sh,
  meta: ch,
  since: dh,
  sep: uh,
  fields: mh,
  field: hh,
  last: wh,
  reason: fh
}, _h = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function vh(e, a, n) {
  const r = _a(e, "blue"), l = _a(e, "orange"), i = _a(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = _h[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const bh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ph(e, a) {
  return bh[a](e);
}
function gh({ item: e, connection: a }) {
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
function yh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Nh({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function kh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: ph(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function $h(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Ch(e, a, n) {
  e == null || e(a, n);
}
function Sh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Rh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function Oa(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  vh(r, n.key, e.feed);
  const l = Sh(e.feed), i = $h(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Ch(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(yh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(gh, { item: n, connection: l }),
        /* @__PURE__ */ t(Nh, { reason: n.blockedReason }),
        /* @__PURE__ */ t(kh, { item: n, fields: a }),
        /* @__PURE__ */ t(Rh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Th = "_column_1j8bi_3", xh = "_head_1j8bi_21", Lh = "_label_1j8bi_30", Ah = "_count_1j8bi_39", Eh = "_list_1j8bi_53", la = {
  column: Th,
  head: xh,
  label: Lh,
  count: Ah,
  list: Eh
};
function Rn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Ih({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Mh(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
    var r;
    return /* @__PURE__ */ t(
      Oa,
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
function Bh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Rn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Ih, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Mh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(rh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ph = "_foot_cs4jr_2", Dh = "_note_cs4jr_13", Oh = "_link_cs4jr_19", za = {
  foot: Ph,
  note: Dh,
  link: Oh
};
function ZS({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: j(e), children: "Configure board" })
  ] });
}
const Hh = "_head_1tfi5_3", Fh = "_identity_1tfi5_12", jh = "_titleRow_1tfi5_18", qh = "_title_1tfi5_18", zh = "_key_1tfi5_35", Wh = "_rollup_1tfi5_45", Kh = "_tools_1tfi5_53", Gh = "_swatch_1tfi5_101", Uh = "_mark_1tfi5_108", ke = {
  head: Hh,
  identity: Fh,
  titleRow: jh,
  title: qh,
  key: zh,
  rollup: Wh,
  tools: Kh,
  swatch: Gh,
  mark: Uh
}, Mt = "initials:";
function Vh(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function Yh(e) {
  const a = [Vh(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Jh(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Yh(e)
  ] });
}
function Xh(e) {
  return e.startsWith(Mt) ? e.slice(Mt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Qh({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Xh(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Zh({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function eR({
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
        /* @__PURE__ */ t(Qh, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: Jh(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Zh, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const ew = "_head_1sejb_14", aw = "_line_1sejb_15", tw = "_cHandle_1sejb_36", nw = "_cName_1sejb_41", rw = "_nameLine_1sejb_49", lw = "_cLabel_1sejb_56", ow = "_cCap_1sejb_61", iw = "_cShown_1sejb_66", sw = "_name_1sejb_49", cw = "_noCap_1sejb_88", dw = "_state_1sejb_102", uw = "_handle_1sejb_111", mw = "_sub_1sejb_137", D = {
  head: ew,
  line: aw,
  cHandle: tw,
  cName: nw,
  nameLine: rw,
  cLabel: lw,
  cCap: ow,
  cShown: iw,
  name: sw,
  noCap: cw,
  state: dw,
  handle: uw,
  sub: mw
}, hw = "can't be hidden or collapsed", ww = "terminal · counted, not a column";
function aR() {
  return /* @__PURE__ */ o("div", { className: D.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: D.cHandle }),
    /* @__PURE__ */ t("span", { className: D.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: D.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: D.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: D.cShown, children: "Shown" })
  ] });
}
function fw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function _w(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? hw : e.terminal ? ww : _w(e.agentsMounted);
}
function vw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function bw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: D.cName, children: [
    /* @__PURE__ */ o("span", { className: D.nameLine, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: D.sub, children: Bt(e) })
  ] });
}
function pw(e) {
  return e === void 0 ? "" : String(e);
}
function gw(e) {
  return e === "" ? void 0 : Number(e);
}
function yw({ name: e, onReorder: a }) {
  const n = De();
  return /* @__PURE__ */ t("span", { className: D.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: D.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && vw(r, a),
      children: "⠿"
    }
  ) });
}
function Nw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${D.cCap} ${D.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: D.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: pw(a.cap), onChange: (r) => n({ ...a, cap: gw(r) }) }) });
}
function kw({ stage: e, config: a, onChange: n }) {
  const r = De() !== null, l = fw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: D.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: D.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function $w(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function tR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: D.line, "data-kind": $w(e), children: [
    /* @__PURE__ */ t(yw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(bw, { stage: e }),
    /* @__PURE__ */ t("span", { className: D.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Nw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(kw, { stage: e, config: a, onChange: n })
  ] });
}
const Cw = "_body_1a4f4_2", Sw = "_head_1a4f4_9", Rw = "_summary_1a4f4_19", Tw = "_block_1a4f4_20", xw = "_actionsBlock_1a4f4_21", Lw = "_title_1a4f4_41", Aw = "_note_1a4f4_46", Ew = "_k_1a4f4_51", Iw = "_kv_1a4f4_58", Mw = "_row_1a4f4_64", Bw = "_label_1a4f4_75", Pw = "_value_1a4f4_84", Dw = "_quote_1a4f4_90", Ow = "_actions_1a4f4_21", Hw = "_resolve_1a4f4_103", O = {
  body: Cw,
  head: Sw,
  summary: Rw,
  block: Tw,
  actionsBlock: xw,
  title: Lw,
  note: Aw,
  k: Ew,
  kv: Iw,
  row: Mw,
  label: Bw,
  value: Pw,
  quote: Dw,
  actions: Ow,
  resolve: Hw
};
function Fw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function jw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function qw(e) {
  const a = da(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function zw(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Ww(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(qw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Fw(e),
    ...zw(n),
    ...jw(e, a)
  ];
}
function Kw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function Gw(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Uw({ item: e, showKey: a }) {
  const n = Gw(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function Vw({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function nR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = Ww(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(Uw, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: v }),
      /* @__PURE__ */ t("dd", { className: O.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(Vw, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(Kw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Yw = "_root_3azmy_2", Jw = "_list_3azmy_7", Xw = "_item_3azmy_12", Qw = "_box_3azmy_18", Zw = "_text_3azmy_23", ef = "_note_3azmy_28", Ye = {
  root: Yw,
  list: Jw,
  item: Xw,
  box: Qw,
  text: Zw,
  note: ef
};
function Ha({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(lt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const af = "_rail_znbbp_2", tf = "_k_znbbp_11", nf = "_head_znbbp_19", rf = "_section_znbbp_25", lf = "_card_znbbp_39", of = "_strip_znbbp_46", sf = "_skeleton_znbbp_60", cf = "_skeletonLabel_znbbp_74", df = "_bar_znbbp_80", uf = "_note_znbbp_89", me = {
  rail: af,
  k: tf,
  head: nf,
  section: rf,
  card: lf,
  strip: of,
  skeleton: sf,
  skeletonLabel: cf,
  bar: df,
  note: uf
};
function mf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Wa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function hf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function wf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Bh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function ff(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(wf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(hf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function rR(e) {
  const a = mf(e.onOpen), n = Rn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Wa, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Oa, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Wa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(ff, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Wa, { title: "Effect of this config", children: /* @__PURE__ */ t(Ha, { items: e.effects, density: "compact" }) })
  ] });
}
function _f(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function vf(e) {
  return Math.ceil(e.length / 2);
}
function bf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Tn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function pf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Tn(e);
  l !== void 0 && n(l), r(bf(e.type));
}
function gf(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => pf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function yf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Nf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function kf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function $f(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(vf(a ?? [])) + ")"
  };
}
function Cf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Sf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function Rf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Tf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function xf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Lf(e, a) {
  return a === void 0 ? e : _f(e, a.ref);
}
function Af(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function xn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = _a(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(yf(a));
  gf(e.feed, a.key, s, d, i);
  const u = Nf(a, r), m = kf(a, n), w = $f(a, e.fields), v = xf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Af(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: Lf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Cf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Sf(a, e.fields),
          Rf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Tf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Ef({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function If(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Mf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Bf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Ef, { count: e.items.length, cap: e.column.cap });
}
function Pf(e, a) {
  return e.roving ?? a;
}
function Df(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Of(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    xn,
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
function Hf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = Pf(e, n), l = If(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Mf(e.column, e.items.length, a),
    Bf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Df(e, n), children: Of(e, r) })
  ] });
}
function Ff(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function jf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function qf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function lR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Ff(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      jf(e),
      qf(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function zf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Wf(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Kf(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function oR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(zf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Wf(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(nn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Kf(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function iR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(xn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Hf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Gf(e, a) {
  const n = Tn(e);
  n !== void 0 && a(n);
}
function Uf(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => Gf(r, n));
  }, [e, a, n]);
}
function Vf(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Yf(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function Jf(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Xf(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function sR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Uf(e.feed, a.key, l);
  const i = [...Vf(a), ...Yf(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      Jf(n, r)
    ] }),
    Xf(a, e.actions)
  ] });
}
const Qf = "_card_54446_3", Zf = "_head_54446_30", e_ = "_mark_54446_38", a_ = "_name_54446_50", t_ = "_chips_54446_71", n_ = "_description_54446_77", r_ = "_run_54446_82", l_ = "_sep_54446_91", o_ = "_facts_54446_96", i_ = "_fact_54446_96", s_ = "_factLabel_54446_109", c_ = "_factValue_54446_113", re = {
  card: Qf,
  head: Zf,
  mark: e_,
  name: a_,
  chips: t_,
  description: n_,
  run: r_,
  sep: l_,
  facts: o_,
  fact: i_,
  factLabel: s_,
  factValue: c_
}, d_ = { live: "done", draft: "running", paused: "meta" };
function u_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function m_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: d_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function h_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function w_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function f_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function __(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function v_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: u_(s),
      style: c,
      "data-selected": d,
      "data-paused": __(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: j(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(h_, { description: e.description }),
        /* @__PURE__ */ t(w_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(m_, { versions: e.versions }),
        /* @__PURE__ */ t(f_, { facts: i })
      ]
    }
  );
}
const b_ = "_list_4dcyc_2", p_ = "_row_4dcyc_11", g_ = "_head_4dcyc_23", y_ = "_id_4dcyc_30", N_ = "_lock_4dcyc_35", k_ = "_reason_4dcyc_41", $_ = "_remove_4dcyc_46", C_ = "_clauses_4dcyc_50", S_ = "_clause_4dcyc_50", R_ = "_label_4dcyc_64", T_ = "_cell_4dcyc_71", x_ = "_value_4dcyc_76", ie = {
  list: b_,
  row: p_,
  head: g_,
  id: y_,
  lock: N_,
  reason: k_,
  remove: $_,
  clauses: C_,
  clause: S_,
  label: R_,
  cell: T_,
  value: x_
}, Ln = Te(!1);
function cR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Ln.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function L_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function A_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function E_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(A_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function dR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(Ln)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(E_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(L_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const I_ = "_ladder_n8eeo_2", M_ = "_cell_n8eeo_7", B_ = "_empty_n8eeo_26", P_ = "_name_n8eeo_34", D_ = "_holder_n8eeo_40", O_ = "_request_n8eeo_46", H_ = "_swatches_n8eeo_51", F_ = "_swatch_n8eeo_51", j_ = "_tilesFrame_n8eeo_78", q_ = "_tiles_n8eeo_78", z_ = "_tile_n8eeo_78", W_ = "_bar_n8eeo_117", K_ = "_hex_n8eeo_128", G_ = "_note_n8eeo_138", E = {
  ladder: I_,
  cell: M_,
  empty: B_,
  name: P_,
  holder: D_,
  request: O_,
  swatches: H_,
  swatch: F_,
  tilesFrame: j_,
  tiles: q_,
  tile: z_,
  bar: W_,
  hex: K_,
  note: G_
}, uR = "not validated yet, pending a CVD matrix and dark stepping";
function U_(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function An(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function V_(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Y_({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(Oe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function J_(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function X_(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Dt = (e) => String(e).padStart(2, "0");
function Q_(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? An(e, void 0);
}
function Z_({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${Dt(e)}` : Br(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${Dt(e)} · ${n}` })
  ] });
}
function ev({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = U_(e), c = An(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...X_(d, m, u), "data-validation": s, style: V_(e, s), onClick: v, onKeyDown: (B) => J_(B, v) }, label: y, name: w, holder: c, validation: s, note: Q_(s, n, m), step: e.step };
}
const av = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Z_, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Y_, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function tv(e) {
  return av[e.presentation](ev(e));
}
function nv(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function rv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function lv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const ov = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function iv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const sv = { list: rv, swatches: () => null, tiles: iv };
function cv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function En(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  nv(e.steps);
  const r = lv(e), l = sv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(tv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...cv(e.disabled === !0), className: `${ov[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const dv = "_rail_s06lm_2", uv = "_section_s06lm_12", mv = "_sectionFlush_s06lm_22", hv = "_head_s06lm_26", wv = "_headLabel_s06lm_34", fv = "_sample_s06lm_42", _v = "_sampleLabel_s06lm_47", vv = "_sampleTitle_s06lm_54", bv = "_sampleMeta_s06lm_59", pv = "_trace_s06lm_65", gv = "_traceHead_s06lm_70", yv = "_steps_s06lm_78", Nv = "_step_s06lm_78", kv = "_stepTitle_s06lm_97", $v = "_hollow_s06lm_107", Cv = "_stepBody_s06lm_115", Sv = "_stepDetail_s06lm_127", Rv = "_publish_s06lm_132", Tv = "_reason_s06lm_138", xv = "_note_s06lm_143", Lv = "_reveal_s06lm_148", k = {
  rail: dv,
  section: uv,
  sectionFlush: mv,
  head: hv,
  headLabel: wv,
  sample: fv,
  sampleLabel: _v,
  sampleTitle: vv,
  sampleMeta: bv,
  trace: pv,
  traceHead: gv,
  steps: yv,
  step: Nv,
  stepTitle: kv,
  hollow: $v,
  stepBody: Cv,
  stepDetail: Sv,
  publish: Rv,
  reason: Tv,
  note: xv,
  reveal: Lv
}, Ot = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Av = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Ev = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Iv = { notSimulated: "not simulated", running: "running" };
function Mv(e) {
  return e.presentation === "foundry";
}
function Bv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Pv(e, a) {
  var r;
  const n = Av[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Dv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ov(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Hv(e) {
  if (Dv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Fv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function jv(e) {
  const a = Iv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(Oe, { size: 6, kind: Ev[e.kind], label: e.kind });
}
function qv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function zv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Wv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Fv, { kind: a.kind, children: [
    /* @__PURE__ */ t(jv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(qv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(zv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Kv(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function In(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Kv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Wv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Gv(e) {
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
function Uv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Vv(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Jt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Yv(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Jt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Jv(e) {
  const a = Yv(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function Mn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Xv(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Mn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Qv(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Mn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Bn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Ot[e.run.status].role, label: Ot[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Zv(e, a) {
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
function eb(e) {
  var n;
  Ov(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Bn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Gv, { sample: e.run.sample }),
    /* @__PURE__ */ t(In, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(Vv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Ha, { items: e.checklist }) }),
    /* @__PURE__ */ t(Xv, { reason: Bv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ab(e) {
  var r;
  const a = Zv(e.run, e.feed);
  Hv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Bn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Uv, { sample: e.run.sample }),
    /* @__PURE__ */ t(In, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(Jv, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Ha, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Qv, { reason: Pv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function mR(e) {
  return Mv(e) ? /* @__PURE__ */ t(ab, { ...e }) : /* @__PURE__ */ t(eb, { ...e });
}
const tb = "_list_142ip_3", nb = "_row_142ip_9", rb = "_condition_142ip_18", lb = "_action_142ip_24", ba = {
  list: tb,
  row: nb,
  condition: rb,
  action: lb
}, Pn = Te(!1);
function hR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Pn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ba.list, "aria-label": a, children: e }) });
}
function wR({ rule: e }) {
  if (!Re(Pn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ba.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ba.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ba.action, children: e.then })
  ] });
}
const ob = "_move_tmppt_3", ib = {
  move: ob
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
function Ht(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function sb(e) {
  return e === "up" ? "down" : "up";
}
function cb(e, a) {
  const n = Ht(e, a.id, a.direction) ?? Ht(e, a.id, sb(a.direction));
  n == null || n.focus();
}
function Hn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && cb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Fn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${ib.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const db = "_body_1jd1i_2", ub = "_title_1jd1i_8", mb = "_section_1jd1i_13", hb = "_legend_1jd1i_18", wb = "_stages_1jd1i_26", fb = "_stage_1jd1i_26", _b = "_stageIndex_1jd1i_44", vb = "_stageName_1jd1i_50", bb = "_footer_1jd1i_59", pb = "_note_1jd1i_66", gb = "_reason_1jd1i_71", yb = "_actions_1jd1i_76", Nb = "_webHead_1jd1i_83", kb = "_kicker_1jd1i_92", $b = "_webTitle_1jd1i_99", Cb = "_webBody_1jd1i_105", Sb = "_webSection_1jd1i_109", Rb = "_sectionHead_1jd1i_121", Tb = "_sectionNote_1jd1i_129", xb = "_formLabel_1jd1i_134", Lb = "_identityRow_1jd1i_139", Ab = "_nameCell_1jd1i_145", Eb = "_keyCell_1jd1i_150", Ib = "_colourCell_1jd1i_154", Mb = "_colourStatus_1jd1i_161", Bb = "_webStages_1jd1i_166", Pb = "_webStageList_1jd1i_172", Db = "_webStage_1jd1i_166", Ob = "_webIndex_1jd1i_191", Hb = "_webStageName_1jd1i_196", Fb = "_webMoves_1jd1i_201", jb = "_addStage_1jd1i_215", qb = "_addStageButton_1jd1i_223", zb = "_addStageNote_1jd1i_231", Wb = "_webFooter_1jd1i_236", Kb = "_webFooterNotes_1jd1i_244", Gb = "_webNote_1jd1i_251", _ = {
  body: db,
  title: ub,
  section: mb,
  legend: hb,
  stages: wb,
  stage: fb,
  stageIndex: _b,
  stageName: vb,
  footer: bb,
  note: pb,
  reason: gb,
  actions: yb,
  webHead: Nb,
  kicker: kb,
  webTitle: $b,
  webBody: Cb,
  webSection: Sb,
  sectionHead: Rb,
  sectionNote: Tb,
  formLabel: xb,
  identityRow: Lb,
  nameCell: Ab,
  keyCell: Eb,
  colourCell: Ib,
  colourStatus: Mb,
  webStages: Bb,
  webStageList: Pb,
  webStage: Db,
  webIndex: Ob,
  webStageName: Hb,
  webMoves: Fb,
  addStage: jb,
  addStageButton: qb,
  addStageNote: zb,
  webFooter: Wb,
  webFooterNotes: Kb,
  webNote: Gb
}, Ub = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], jn = "not in catalogue";
function Vb(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${jn}` }, ...n];
}
function Yb({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${jn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Vb(n, e.name), invalid: i, onChange: r });
}
function qn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Jb(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Xb({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = qn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(Yb, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Ub, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Qb({ stages: e, onChange: a, catalogue: n }) {
  const r = Jb(e.length), l = Hn(), i = (c, d) => {
    const u = Dn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, On(qn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Xb, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Fn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Zb = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], ep = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ap = "A new stream starts as a draft. Nothing runs on it until you publish it.", tp = "Create is disabled: name the stream and give it a key first.", np = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function rp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function lp({ stages: e, onMove: a }) {
  const n = Hn(), r = (l, i) => {
    const s = Dn(l, i);
    n.moved({ id: e[l].id, direction: i }, On(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: _.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: _.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: _.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: _.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Fn, { text: n.announcement })
  ] });
}
function op({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: ap }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ip(e, a) {
  return e !== "" && a !== "" ? null : tp;
}
function sp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = ep, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => rp(n, r)), [ae, Ue] = p(e.stages ?? Zb), [Ve, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = ip(m, v);
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
      /* @__PURE__ */ t(En, { label: "Stream colour", steps: n, value: le, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: _.section, children: [
      /* @__PURE__ */ t("legend", { className: _.legend, children: "Stages" }),
      /* @__PURE__ */ t(lp, { stages: ae, onMove: (He, wr) => Ue(Xa(ae, He, wr)) })
    ] }),
    /* @__PURE__ */ t(kn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(op, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], cp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function dp(e, a, n, r, l, i) {
  var c;
  const s = ((c = zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function up(e, a) {
  return mp(e) && hp(e, a) && wp(e);
}
function mp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function hp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function wp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function fp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function _p({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function vp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(_p, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: cp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function bp({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function pp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function gp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = dp(l, s, d, m, v, L), Le = up(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(En, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: fp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(bp, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(pp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: np })
        ] }),
        /* @__PURE__ */ t(Qb, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t(kn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: zn, onChange: y }) }),
      /* @__PURE__ */ t(vp, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function fR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(gp, { ...e }) : /* @__PURE__ */ t(sp, { ...e });
}
const yp = "_row_bs8hc_2", Np = "_cell_bs8hc_6", kp = "_condition_bs8hc_11", $p = "_action_bs8hc_18", Cp = "_contract_bs8hc_24", Sp = "_contractCondition_bs8hc_33", Rp = "_contractAction_bs8hc_39", Q = {
  row: yp,
  cell: Np,
  condition: kp,
  action: $p,
  contract: Cp,
  contractCondition: Sp,
  contractAction: Rp
}, Wn = ["advance", "block", "escalate", "requestReview"], Ft = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ct(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ft[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Wn.map((l) => ({ value: l, label: Ft[l] }))
    }
  );
}
function Tp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function xp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Lp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const Ap = { two: xp, four: Tp, contract: Lp };
function _R(e) {
  var n;
  if (!Wn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Ap[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Ep = "_column_11id3_2", Ip = "_head_11id3_17", Mp = "_index_11id3_23", Bp = "_name_11id3_29", Pp = "_meta_11id3_38", Dp = "_mono_11id3_43", Op = "_gate_11id3_50", Hp = "_reviewersLabel_11id3_57", Fp = "_reviewers_11id3_57", jp = "_reviewer_11id3_57", qp = "_agents_11id3_74", zp = "_workflowColumn_11id3_79", Wp = "_workflowHead_11id3_96", Kp = "_stageRow_11id3_102", Gp = "_stageLabel_11id3_109", Up = "_workflowTitle_11id3_116", Vp = "_workflowMeta_11id3_122", Yp = "_workflowGate_11id3_127", Jp = "_gateNote_11id3_135", Xp = "_cardNote_11id3_140", Qp = "_reviewerList_11id3_145", Zp = "_reviewerRow_11id3_151", eg = "_reviewerMark_11id3_157", ag = "_reviewerName_11id3_167", tg = "_terminalCard_11id3_173", ng = "_terminalCount_11id3_182", rg = "_workflowAgents_11id3_188", lg = "_mount_11id3_194", C = {
  column: Ep,
  head: Ip,
  index: Mp,
  name: Bp,
  meta: Pp,
  mono: Dp,
  gate: Op,
  reviewersLabel: Hp,
  reviewers: Fp,
  reviewer: jp,
  agents: qp,
  workflowColumn: zp,
  workflowHead: Wp,
  stageRow: Kp,
  stageLabel: Gp,
  workflowTitle: Up,
  workflowMeta: Vp,
  workflowGate: Yp,
  gateNote: Jp,
  cardNote: Xp,
  reviewerList: Qp,
  reviewerRow: Zp,
  reviewerMark: eg,
  reviewerName: ag,
  terminalCard: tg,
  terminalCount: ng,
  workflowAgents: rg,
  mount: lg
}, og = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Kn(e) {
  return `${Math.round(e * 100)}%`;
}
function ig({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: C.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: C.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: C.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(Pa, { cells: [
      { value: Kn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function sg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function cg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: og[e.kind] })
  ] });
}
function dg({ stage: e }) {
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
function ug({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ig, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(sg, { stage: e }) : null;
}
function mg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function hg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(cg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(dg, { stage: e }),
    /* @__PURE__ */ t(ug, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(v_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(mg, { onMount: n })
  ] });
}
const wg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function fg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function _g({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(fg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Kn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function vg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function bg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: vg(e.rolledBackThisWeek) })
  ] });
}
function pg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function gg(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = pg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function yg({ stage: e, titleId: a }) {
  const n = wg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: gg(e) })
  ] });
}
function Ng(e) {
  return e === "entry" || e === "agent";
}
function kg({ stage: e, onMount: a }) {
  return a === void 0 || !Ng(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function $g({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(yg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(_g, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(bg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(kg, { stage: e, onMount: n })
  ] });
}
function Cg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function vR(e) {
  return Cg(e) ? /* @__PURE__ */ t($g, { ...e }) : /* @__PURE__ */ t(hg, { ...e });
}
const Sg = "_row_1tdra_6", Rg = "_name_1tdra_12", Tg = "_compactRow_1tdra_13", xg = "_compactName_1tdra_13", Lg = "_cell_1tdra_30", Ag = "_chain_1tdra_45", Eg = "_owner_1tdra_51", Ig = "_mono_1tdra_57", Mg = "_compactCell_1tdra_79", Bg = "_stack_1tdra_96", Pg = "_stat_1tdra_103", Dg = "_identityLine_1tdra_110", Og = "_identity_1tdra_110", Hg = "_ownerLine_1tdra_140", Fg = "_link_1tdra_160", jg = "_gateMark_1tdra_166", qg = "_emptyChain_1tdra_171", zg = "_arrow_1tdra_177", Wg = "_muted_1tdra_182", Kg = "_define_1tdra_187", Gg = "_statValue_1tdra_194", Ug = "_policyId_1tdra_200", Vg = "_sub_1tdra_205", g = {
  row: Sg,
  name: Rg,
  compactRow: Tg,
  compactName: xg,
  cell: Lg,
  chain: Ag,
  owner: Eg,
  mono: Ig,
  compactCell: Mg,
  stack: Bg,
  stat: Pg,
  identityLine: Dg,
  identity: Og,
  ownerLine: Hg,
  link: Fg,
  gateMark: jg,
  emptyChain: qg,
  arrow: zg,
  muted: Wg,
  define: Kg,
  statValue: Gg,
  policyId: Ug,
  sub: Vg
};
function Gn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Yg(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Jg(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Un(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function Xg(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Un(e.members)}`;
}
function Qg(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: j(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Xg(e) })
  ] }) });
}
function Vn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Zg(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = da(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function ey({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Vn, { name: l.name, gate: l.gate === !0, look: Zg(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function ay(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : ey(e) });
}
function Yn(e) {
  return e === void 0 ? void 0 : !0;
}
function jt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Yn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function ty(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function ny(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ry({ stream: e, href: a, presentation: n }) {
  const r = Jg(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Gn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Qg(e, a),
    ay(e),
    jt(ny(e.agents), e.agents === void 0 ? void 0 : Yg(e.agents), "—"),
    ty(e.policy),
    jt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function ly(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function bR(e) {
  if (ly(e)) return ry(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Gn, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: j(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Ba(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(Vn, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: Un(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": Yn(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const oy = "_row_2u4ll_2", iy = "_name_2u4ll_16", sy = "_scope_2u4ll_24", Sa = {
  row: oy,
  name: iy,
  scope: sy
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function cy(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function dy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function uy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function my({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function hy({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function wy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function pR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = dy(e, n), s = wy(n);
  return /* @__PURE__ */ o(s, { className: cy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(uy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(hy, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(my, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const fy = "_strip_4ppv9_2", _y = "_well_4ppv9_11", vy = "_head_4ppv9_18", by = "_name_4ppv9_24", py = "_chart_4ppv9_32", gy = "_segment_4ppv9_38", yy = "_detailedChart_4ppv9_44", Ny = "_rail_4ppv9_57", ky = "_section_4ppv9_63", $y = "_label_4ppv9_74", Cy = "_note_4ppv9_91", K = {
  strip: fy,
  well: _y,
  head: vy,
  name: by,
  chart: py,
  segment: gy,
  detailedChart: yy,
  rail: Ny,
  section: ky,
  label: $y,
  note: Cy
}, Sy = "No item in flight to preview.", Ry = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Ty = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ra = 100;
function xy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Ly({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: xy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ay(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Ey({ identities: e }) {
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
function Jn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function wa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function Iy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Sy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Oa, { item: { ...e, streamStep: da(n.streamStep) }, onOpen: Jn(r), feed: null }) });
}
function My({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(Oe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function By(e) {
  const a = Ay(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(wa, { label: "Board card", children: /* @__PURE__ */ t(Iy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(wa, { label: "Streams index row", children: /* @__PURE__ */ t(My, { draft: n }) }),
    /* @__PURE__ */ o(wa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Ey, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Ry })
    ] }),
    /* @__PURE__ */ t(wa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Ty }) })
  ] });
}
function Py({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(Oe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Oa, { item: { ...a, streamStep: e.streamStep }, onOpen: Jn(r) }) }),
    /* @__PURE__ */ t(Ly, { draft: e, streams: n })
  ] });
}
function gR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(By, { ...e }) : /* @__PURE__ */ t(Py, { ...e });
}
const Dy = "_row_ixlg5_6", Oy = "_headCell_ixlg5_10", Hy = "_cell_ixlg5_11", Fy = "_name_ixlg5_23", jy = "_consequence_ixlg5_29", qy = "_governed_ixlg5_36", zy = "_control_ixlg5_42", Wy = "_byRole_ixlg5_48", Ky = "_webControl_ixlg5_59", Gy = "_webConsequence_ixlg5_65", Uy = "_webGoverned_ixlg5_71", F = {
  row: Dy,
  headCell: Oy,
  cell: Hy,
  name: Fy,
  consequence: jy,
  governed: qy,
  control: zy,
  byRole: Wy,
  webControl: Ky,
  webConsequence: Gy,
  webGoverned: Uy
};
function Vy({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: F.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: F.control, children: [
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
function Yy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: F.headCell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: F.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: F.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Vy, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function Jy(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Xy({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${F.webControl} ${F.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ge,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${F.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function Qy({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ o("td", { className: F.cell, children: [
      /* @__PURE__ */ t("span", { className: F.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${F.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(Xy, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webGoverned} ward-cellmeta`, children: Jy(e) }) })
  ] });
}
function yR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Qy, { ...e }) : /* @__PURE__ */ t(Yy, { ...e });
}
const Zy = "_row_vv64h_2", eN = "_cell_vv64h_6", aN = "_name_vv64h_25", tN = "_note_vv64h_30", nN = "_webName_vv64h_41", rN = "_webMeta_vv64h_47", V = {
  row: Zy,
  cell: eN,
  name: aN,
  note: tN,
  webName: nN,
  webMeta: rN
}, Xn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function lN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function oN({ component: e, onRestart: a }) {
  const n = N(), r = Xn[e.state], l = e.state === "drainFirst";
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
function iN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: lN(e.state) });
}
function sN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Xn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(iN, { component: e, onRestart: a }) })
  ] });
}
function NR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(sN, { ...e }) : /* @__PURE__ */ t(oN, { ...e });
}
const cN = "_row_jcm5k_7", dN = "_cell_jcm5k_11", uN = "_next_jcm5k_28", mN = "_headCell_jcm5k_38", hN = "_webId_jcm5k_77", wN = "_webPurpose_jcm5k_83", fN = "_webMeta_jcm5k_91", _N = "_webUrgent_jcm5k_97", q = {
  row: cN,
  cell: dN,
  next: uN,
  headCell: mN,
  webId: hN,
  webPurpose: wN,
  webMeta: fN,
  webUrgent: _N
}, vN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, bN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, Qn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], pN = Object.fromEntries(Qn.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = pN[e];
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
function kR() {
  return /* @__PURE__ */ t("tr", { children: Qn.map((e) => /* @__PURE__ */ t(
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
function gN({ cred: e }) {
  const a = vN[e.state];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: q.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function yN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ${q.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function NN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(yN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...bN[e.state] }) })
  ] });
}
function $R(e) {
  return "presentation" in e ? /* @__PURE__ */ t(NN, { ...e }) : /* @__PURE__ */ t(gN, { ...e });
}
const kN = "_card_17zba_2", $N = "_head_17zba_11", CN = "_env_17zba_18", SN = "_version_17zba_25", RN = "_meta_17zba_32", TN = "_webCard_17zba_37", xN = "_webRow_17zba_47", LN = "_webTitle_17zba_55", AN = "_webLine_17zba_65", EN = "_webVersion_17zba_72", IN = "_webMeta_17zba_77", U = {
  card: kN,
  head: $N,
  env: CN,
  version: SN,
  meta: RN,
  webCard: TN,
  webRow: xN,
  webTitle: LN,
  webLine: AN,
  webVersion: EN,
  webMeta: IN
}, qt = { dev: "Dev", uat: "UAT", prod: "Prod" }, Zn = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function MN({ env: e }) {
  const a = Zn[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": qt[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: qt[e.env] }),
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
function BN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function PN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...Zn[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: BN(e) })
  ] });
}
function CR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(PN, { ...e }) : /* @__PURE__ */ t(MN, { ...e });
}
const DN = "_panel_1hmja_2", ON = "_line_1hmja_8", HN = "_actions_1hmja_14", fa = {
  panel: DN,
  line: ON,
  actions: HN
};
function SR(e) {
  return /* @__PURE__ */ o("div", { className: fa.panel, children: [
    /* @__PURE__ */ t("p", { className: fa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: fa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: fa.line, children: e.note ?? "" })
  ] });
}
const FN = "_upload_13fcl_2", jN = "_preview_13fcl_7", qN = "_mark_13fcl_17", zN = "_empty_13fcl_22", WN = "_actions_13fcl_28", KN = "_input_13fcl_33", GN = "_reasons_13fcl_41", UN = "_reason_13fcl_41", VN = "_accepted_13fcl_57", te = {
  upload: FN,
  preview: jN,
  mark: qN,
  empty: zN,
  actions: WN,
  input: KN,
  reasons: GN,
  reason: UN,
  accepted: VN
}, er = 1.5, ar = 22, Ta = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${er}px at ${ar}px`], YN = [Se[1], Se[2], Ta, Ie], JN = /* @__PURE__ */ new Map([
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
]), XN = "http://www.w3.org/2000/svg", QN = "http://www.w3.org/2000/xmlns/", ZN = /* @__PURE__ */ new Set([
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
]), e1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, a1 = /url\s*\(|['"\\]/i;
function t1() {
  return { ok: !1, reasons: [Se[1]] };
}
function tr(e) {
  return e.namespaceURI === XN;
}
function n1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && tr(a) ? a : null;
  } catch {
    return null;
  }
}
function r1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function l1(e) {
  return JN.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function o1(e) {
  return a1.test(e.replace(mt, ""));
}
function i1(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || o1(e.value) ? Ie : void 0;
}
function s1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(l1(n));
    for (const r of Array.from(n.attributes)) a.add(i1(r));
  }
  return YN.filter((n) => a.has(n));
}
function c1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? ar / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < er;
  }) ? [Se[3]] : [];
}
function d1(e) {
  if (e.namespaceURI === QN) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (e1.has(a) || a.startsWith("stroke"));
}
function u1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && tr(a) && ZN.has(a.localName);
}
function m1(e, a) {
  u1(a) ? a.nodeType === Node.ELEMENT_NODE && nr(a) : e.removeChild(a);
}
function nr(e) {
  for (const a of Array.from(e.attributes)) d1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) m1(e, a);
  return e;
}
function h1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function w1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function f1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of h1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function _1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function v1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = f1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), _1(l, r);
  }
  return e;
}
function RR(e) {
  const a = n1(e);
  if (a === null) return t1();
  const n = [...r1(a), ...s1(a), ...c1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(v1(nr(a), w1(e))) };
}
const b1 = "Mark accepted.", p1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, g1 = new Set(Qt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function y1(e) {
  return e !== void 0 && (p1.test(e) || g1.has(e)) ? e : void 0;
}
function N1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": y1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function k1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function $1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function C1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: b1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function S1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(C1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${k1(e, n)}`, role: "status", children: $1(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function TR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(N1, { current: e }),
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
    /* @__PURE__ */ t(S1, { result: s, presentation: r })
  ] });
}
const R1 = "_row_o3t6y_7", T1 = "_cell_o3t6y_11", x1 = "_head_o3t6y_28", L1 = "_name_o3t6y_34", A1 = "_pinned_o3t6y_42", E1 = "_headCell_o3t6y_49", I1 = "_webName_o3t6y_88", M1 = "_webMeta_o3t6y_95", B1 = "_webWarn_o3t6y_103", P = {
  row: R1,
  cell: T1,
  head: x1,
  name: L1,
  pinned: A1,
  headCell: E1,
  webName: I1,
  webMeta: M1,
  webWarn: B1
}, ht = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, rr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], P1 = Object.fromEntries(rr.map((e) => [e.key, e]));
function D1(e, a) {
  return `mcp.${e}.${a}`;
}
function O1(e) {
  return Object.keys(ht).includes(e);
}
function H1(e) {
  return ht[e !== void 0 && O1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = P1[e];
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
function xR() {
  return /* @__PURE__ */ t("tr", { children: rr.map((e) => /* @__PURE__ */ t(
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
function F1({ server: e }) {
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
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => D1(e.name, n)).join(" · ") })
  ] });
}
function j1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function q1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function z1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function W1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function K1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function G1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: j1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...q1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(z1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...H1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(W1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(K1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function LR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(G1, { ...e }) : /* @__PURE__ */ t(F1, { ...e });
}
const U1 = "_row_1ibo7_2", V1 = "_headCell_1ibo7_14", Y1 = "_cell_1ibo7_15", J1 = "_name_1ibo7_26", X1 = "_consequence_1ibo7_32", Q1 = "_reason_1ibo7_38", Z1 = "_value_1ibo7_44", ek = "_webRow_1ibo7_60", ak = "_webSetting_1ibo7_73", tk = "_webName_1ibo7_81", nk = "_webConsequence_1ibo7_89", rk = "_webControl_1ibo7_95", lk = "_webState_1ibo7_109", ok = "_webChip_1ibo7_114", I = {
  row: U1,
  headCell: V1,
  cell: Y1,
  name: J1,
  consequence: X1,
  reason: Q1,
  value: Z1,
  webRow: ek,
  webSetting: ak,
  webName: tk,
  webConsequence: nk,
  webControl: rk,
  webState: lk,
  webChip: ok
}, lr = 104, or = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function ik({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(yn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function sk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = or[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(ik, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: lr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function ir(e, a) {
  return String(e ?? a);
}
function ck(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function dk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? ir(e.value, "—");
}
function uk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function mk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(uk, { ...e });
  const l = ck(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(yn, { options: l, value: ir(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: dk(a) });
}
function hk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(mk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: lr }, children: /* @__PURE__ */ t(h, { ...or[n], size: "tag" }) })
  ] });
}
function AR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(hk, { ...e }) : /* @__PURE__ */ t(sk, { ...e });
}
const wk = "_label_h9m4w_7", fk = "_name_h9m4w_15", _k = "_column_h9m4w_24", vk = "_webFrame_h9m4w_57", bk = "_webHead_h9m4w_62", pk = "_webHeadLabel_h9m4w_74", gk = "_webLabel_h9m4w_117", yk = "_webColumns_h9m4w_124", Nk = "_webGroup_h9m4w_130", kk = "_webPeople_h9m4w_131", $k = "_webVia_h9m4w_132", Ck = "_webMeta_h9m4w_161", z = {
  label: wk,
  name: fk,
  column: _k,
  webFrame: vk,
  webHead: bk,
  webHeadLabel: pk,
  webLabel: gk,
  webColumns: yk,
  webGroup: Nk,
  webPeople: kk,
  webVia: $k,
  webMeta: Ck
}, Sk = {
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
function Rk(e) {
  if (!e.matrixRole) return;
  const a = Sk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Tk({ node: e }) {
  const a = Rk(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(xk, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function xk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Lk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Sn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(Tk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Ak({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Ek() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function Ik({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Mk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Bk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Ek, {}),
    /* @__PURE__ */ t(vm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Sn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Ik, { row: n }),
        detail: /* @__PURE__ */ t(Ak, { row: n }),
        expanded: Mk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function ER(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Bk, { ...e }) : /* @__PURE__ */ t(Lk, { ...e });
}
const Pk = "_runbook_b9agc_2", Dk = "_list_b9agc_7", Ok = "_step_b9agc_15", Hk = "_numeral_b9agc_21", Fk = "_body_b9agc_28", jk = "_head_b9agc_34", qk = "_title_b9agc_40", zk = "_detail_b9agc_45", Wk = "_actions_b9agc_50", Kk = "_webList_b9agc_56", Gk = "_webStep_b9agc_60", Uk = "_webBody_b9agc_66", Vk = "_webTitle_b9agc_74", Yk = "_webDetail_b9agc_78", A = {
  runbook: Pk,
  list: Dk,
  step: Ok,
  numeral: Hk,
  body: Fk,
  head: jk,
  title: qk,
  detail: zk,
  actions: Wk,
  webList: Kk,
  webStep: Gk,
  webBody: Uk,
  webTitle: Vk,
  webDetail: Yk
}, sr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function cr(e) {
  return String(e + 1).padStart(2, "0");
}
function Jk({ step: e, index: a, connection: n }) {
  const r = sr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: A.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: A.numeral, children: cr(a) }),
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
function Xk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(Jk, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function Qk({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${A.step} ${A.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${A.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: cr(a) }),
    /* @__PURE__ */ o("span", { className: `${A.body} ${A.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${A.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${A.title} ${A.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ...sr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${A.detail} ${A.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Zk({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(Qk, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function IR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Zk, { ...e }) : /* @__PURE__ */ t(Xk, { ...e });
}
const e$ = "_list_1gu6a_2", a$ = "_check_1gu6a_10", t$ = "_body_1gu6a_16", n$ = "_text_1gu6a_23", r$ = "_pending_1gu6a_32", l$ = "_measured_1gu6a_37", Qe = {
  list: e$,
  check: a$,
  body: t$,
  text: n$,
  pending: r$,
  measured: l$
};
function o$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function i$({ check: e }) {
  const a = o$(e.passed);
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
function MR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(i$, { check: a }, a.text)) });
}
const s$ = "_root_a6xzy_2", c$ = "_list_a6xzy_10", d$ = "_line_a6xzy_21", u$ = "_at_a6xzy_48", m$ = "_text_a6xzy_52", h$ = "_foot_a6xzy_56", w$ = "_idle_a6xzy_68", f$ = "_caret_a6xzy_76", _$ = "_jump_a6xzy_83", he = {
  root: s$,
  list: c$,
  line: d$,
  at: u$,
  text: m$,
  foot: h$,
  idle: w$,
  caret: f$,
  jump: _$
}, v$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : v$.format(new Date(e));
}
const b$ = { warn: "warning", ok: "ok" };
function p$({ kind: e }) {
  const a = b$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function g$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function y$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(g$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const N$ = 8;
function k$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > N$;
}
function $$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const dr = Te(null);
function BR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Vt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(dr.Provider, { value: i, children: n });
}
function C$() {
  const e = Re(dr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function PR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = C$(), [u, m] = p(!1), w = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(k$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(p$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(y$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t($$, { shown: u, onJump: v })
    ] })
  ] });
}
const S$ = "_row_1k8wl_2", R$ = "_head_1k8wl_14", T$ = "_author_1k8wl_20", x$ = "_eta_1k8wl_25", L$ = "_edited_1k8wl_26", A$ = "_body_1k8wl_32", E$ = "_reason_1k8wl_37", I$ = "_actions_1k8wl_42", Ne = {
  row: S$,
  head: R$,
  author: T$,
  eta: x$,
  edited: L$,
  body: A$,
  reason: E$,
  actions: I$
}, M$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function B$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function P$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function D$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function O$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function H$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(P$, { ...e }) : /* @__PURE__ */ t(D$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function DR(e) {
  const { comment: a } = e;
  O$(e);
  const n = N(), r = `${n}-unavailable`, l = M$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: B$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(H$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const F$ = "_root_rvhdw_2", j$ = "_attach_rvhdw_11", q$ = "_actions_rvhdw_17", z$ = "_reply_rvhdw_23", W$ = "_replyField_rvhdw_28", K$ = "_send_rvhdw_54", G$ = "_sendIcon_rvhdw_65", U$ = "_sendsAs_rvhdw_75", Be = {
  root: F$,
  attach: j$,
  actions: q$,
  reply: z$,
  replyField: W$,
  send: K$,
  sendIcon: G$,
  sendsAs: U$
};
function ur({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function V$() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function Y$(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function J$(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = ur(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    Y$(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(V$, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function OR(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(J$, { ...e }) : /* @__PURE__ */ t(X$, { ...e });
}
function X$(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = ur(e);
  return /* @__PURE__ */ o("div", { className: Be.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Be.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      nn,
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
  return /* @__PURE__ */ t(Oe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Wt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function o0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function i0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: We.body, children: [
    /* @__PURE__ */ t("span", { className: We.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: We.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Wt, { text: " · " }),
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
function HR({ criteria: e }) {
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
function FR({ rungs: e }) {
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
function jR({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      eu,
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
const R0 = "_list_1rowi_2", T0 = "_path_1rowi_7", x0 = "_head_1rowi_21", L0 = "_label_1rowi_28", A0 = "_consequence_1rowi_35", E0 = "_ask_1rowi_36", ea = {
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
function Kt(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Gt(e) {
  return e ? "primary" : "secondary";
}
function I0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function M0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Kt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Kt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(I0, { path: e, primary: a, onChoose: n })
  ] });
}
function qR({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(M0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const B0 = "_list_1m7i0_2", P0 = "_item_1m7i0_6", D0 = "_node_1m7i0_18", O0 = "_body_1m7i0_24", H0 = "_head_1m7i0_30", F0 = "_stage_1m7i0_36", j0 = "_version_1m7i0_41", q0 = "_sentence_1m7i0_49", z0 = "_meta_1m7i0_54", $e = {
  list: B0,
  item: P0,
  node: D0,
  body: O0,
  head: H0,
  stage: F0,
  version: j0,
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
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(Oe, { size: 9, kind: W0[e.state], label: e.state }) }),
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
function zR({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(G0, { entry: a }, a.stage + String(n))) });
}
const U0 = "_thread_1e70p_3", V0 = "_turn_1e70p_8", Y0 = "_who_1e70p_27", J0 = "_body_1e70p_32", ga = {
  thread: U0,
  turn: V0,
  who: Y0,
  body: J0
}, mr = Te(!1);
function WR({ children: e, density: a }) {
  return /* @__PURE__ */ t(mr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ga.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function KR({ turn: e }) {
  if (!Re(mr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
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
    /* @__PURE__ */ t(Oe, { size: 8, ...nC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(lC, { cause: e.cause })
  ] });
}
function lC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function GR({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(rC, { row: n, formatNumber: a }, n.label)) });
}
const oC = "_root_1jxwp_2", iC = {
  root: oC
};
function UR({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: iC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Ha, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const sC = "_row_dhbre_3", cC = "_key_dhbre_13", dC = "_stack_dhbre_24", uC = "_value_dhbre_32", mC = "_evidence_dhbre_39", hC = "_mark_dhbre_47", Xe = {
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
function VR({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(wC, { state: e.state }) })
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
function YR({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  pC(e, n);
  const r = yC(e);
  return /* @__PURE__ */ t(
    wu,
    {
      label: "Rejection routing",
      columns: vC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: _C.cell, "data-norerun": l.noRerun ? !0 : void 0, children: gC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(ah, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const NC = "_row_1f2re_2", kC = "_title_1f2re_12", $C = "_turns_1f2re_18", CC = "_waiting_1f2re_19", SC = "_resolved_1f2re_20", RC = "_activity_1f2re_21", TC = "_cost_1f2re_28", xC = "_link_1f2re_29", LC = "_tableLink_1f2re_47", AC = "_tableRecord_1f2re_48", EC = "_tableRow_1f2re_59", IC = "_tableTitle_1f2re_71", MC = "_tableResolved_1f2re_76", BC = "_tableMeta_1f2re_87", PC = "_tableCost_1f2re_94", DC = "_tableActivity_1f2re_95", OC = "_tableState_1f2re_105", H = {
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
  tableActivity: DC,
  tableState: OC
}, hr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function HC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function FC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function jC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const qC = { duplicate: "Closed · duplicate" };
function zC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: H.tableMeta, text: `waiting on ${e}` });
}
function WC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: H.tableCost, children: e === void 0 ? null : ne(e) });
}
function KC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${H.tableRecord} ward-target`, href: j(e.href), children: `→ ${e.key}` });
}
function GC({ session: e, href: a }) {
  const n = hr[e.state];
  return /* @__PURE__ */ o("tr", { className: H.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: H.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${H.tableLink} ward-target`, href: j(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: H.tableMeta, children: FC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: H.tableResolved, children: [
      jC(e.resolved),
      /* @__PURE__ */ t(zC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(WC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: H.tableActivity, children: HC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: H.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: qC[e.state] ?? n.label }),
      /* @__PURE__ */ t(KC, { link: e.link })
    ] }) })
  ] });
}
function UC({ session: e }) {
  const a = hr[e.state];
  return /* @__PURE__ */ o("div", { className: H.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: H.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: H.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: H.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: H.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: H.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : ne(e.cost) }),
    /* @__PURE__ */ t("span", { className: H.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: H.link, href: j(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function JR(e) {
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
function XR({ lines: e, label: a = "Typed input the agent receives" }) {
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
}, Ut = 4;
function QR({ index: e, title: a, note: n, cells: r }) {
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
  pS as ACCENT_PRESETS,
  OS as ActionStack,
  PR as ActivityConsole,
  TS as AdminIcon,
  v_ as AgentCard,
  xS as AppShell,
  gR as AppearanceStrip,
  QR as Band,
  BS as BarChart,
  Bh as BoardColumn,
  ZS as BoardFootnote,
  eR as BoardHeader,
  SS as BoardIcon,
  KS as BoardScroller,
  b as Btn,
  bS as CHIP_ROLES,
  Qn as CREDENTIAL_COLUMNS,
  MS as Callout,
  yR as CapabilityRow,
  KR as ChatMessage,
  nn as Checkbox,
  h as Chip,
  ta as ClampText,
  DR as ClarificationRow,
  dR as ClauseRuleRow,
  cR as ClauseRules,
  En as ColourLadder,
  NR as ComponentRow,
  OR as Composer,
  tR as ConfigRow,
  aR as ConfigRowHead,
  ot as ConnectionMark,
  BR as ConsoleAnnounceProvider,
  WR as Conversation,
  eu as CostMeter,
  $R as CredentialRow,
  kR as CredentialRowHead,
  HR as CriteriaList,
  vi as Crumb,
  gS as DENSITIES,
  GR as DeliveryHealth,
  VS as DeniedState,
  $S as DisabledScope,
  mR as DryRunRail,
  ah as EmptyState,
  CR as EnvCard,
  M as Field,
  US as FilteredEmpty,
  zS as FormStack,
  Ha as GateChecklist,
  FR as GateLadder,
  wu as Grid,
  wR as HandoffRuleRow,
  hR as HandoffRules,
  CS as HomeIcon,
  nR as ItemDrawer,
  SR as KeyPanel,
  Ir as LIVE_EVENT_TYPES,
  Hf as LegacyBoardColumn,
  lR as LegacyBoardHeader,
  oR as LegacyConfigRow,
  sR as LegacyItemDrawer,
  Ef as LegacyOverCapNote,
  iR as LegacyPreviewRail,
  xn as LegacyWorkCard,
  xe as LiveIndicator,
  YS as LoadFailed,
  QS as Loading,
  rr as MCP_SERVER_COLUMNS,
  lt as Mark,
  TR as MarkUpload,
  Oe as Marker,
  LR as McpServerRow,
  xR as McpServerRowHead,
  Ps as Menu,
  ks as MenuButton,
  fR as NewStreamModal,
  rh as OverCapNote,
  na as Overlay,
  uR as PARTIAL_STEP_REASON,
  lr as POLICY_CHIP_WIDTH,
  FS as PageFrame,
  IS as PageHeader,
  PS as PlainList,
  AR as PolicyRow,
  rR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Wn as RULE_ACTIONS,
  kn as Radio,
  UR as ReadyChecklist,
  qS as RecordSection,
  jR as RequeueSheet,
  qR as ResolveBlock,
  VR as ResolvedFieldRow,
  ER as RoleMatrixRow,
  YR as RoutingTable,
  _R as RuleRow,
  IR as RunbookSteps,
  Er as STREAM_STEPS,
  WS as SectionBand,
  At as SectionHeader,
  yn as SegmentedControl,
  mn as Select,
  JR as SessionRow,
  ES as Sidebar,
  vR as StageColumn,
  GS as StageGrid,
  zR as StageHistory,
  Qb as StageListEditor,
  JS as StaleStrip,
  Pa as StatStrip,
  bR as StreamRow,
  RS as StudioIcon,
  jS as SubjectRail,
  Ge as Switch,
  AS as TabLinks,
  DS as TableHead,
  LS as Tabs,
  wS as ThemeProvider,
  pR as ToolRow,
  HS as TopBar,
  vm as Tree,
  Sn as TreeRow,
  XR as TypedInputBlock,
  fo as UNSAFE_HREF,
  MR as ValidationList,
  mS as VisibilityProvider,
  hS as Visible,
  vS as WARD_VERSION,
  Oa as WorkCard,
  XS as WriteUnavailableStrip,
  HC as agoSince,
  yr as clock,
  fp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  _S as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  U_ as ladderValidation,
  H1 as mcpConnectionChip,
  D1 as mcpToolName,
  ne as money,
  we as ms,
  Rn as ordered,
  Jt as ratio,
  lN as restartLabel,
  j as safeHref,
  de as stamp,
  tt as stream,
  NS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  Br as streamHex,
  yS as streamVars,
  _a as useBorderFlash,
  De as useDisabledScope,
  xr as useFocusTrap,
  kS as useLiveFeed,
  fS as useReturnFocus,
  xa as useRovingTabindex,
  nt as useTicker,
  Nr as useVisible,
  W as v,
  RR as validateMark,
  da as validatedStep,
  Qt as validatedStreamSteps
};
