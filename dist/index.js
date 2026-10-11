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
function bS({ hidden: e, children: a }) {
  const n = Vt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Xt.Provider, { value: n, children: a });
}
function kr(e) {
  return !Re(Xt).has(e);
}
function pS({ id: e, children: a, fallback: n = null }) {
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
function Ha(e, a) {
  S(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Sr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function gS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Cr(e === "system");
  return Ha("data-theme", Sr(e, l)), Ha("data-accent", a), Ha("data-density", n), /* @__PURE__ */ t(T, { children: r });
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
function yS(e, a = !0) {
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
const NS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, kS = "0.2.0", $S = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Ir = [1, 2, 3, 4, 5, 6], Qt = [1, 2, 3], Mr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], CS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], SS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
  return Ir.includes(e);
}
function Aa(e) {
  return Qt.includes(e);
}
function RS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function TS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Br = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Pr(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return Br[e];
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
function qr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function xS(e, a) {
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
        const Oe = Hr(R, G, ge);
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
  }, [Le, B, le, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), v.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = Fr(R, L.current);
    G && B(G);
    const ge = m.current;
    qr(R, y.current, ge) && Ue(ge);
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
function zr() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function gt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function _a(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (zr() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Wr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => gt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => gt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Kr = "_root_1otpc_2", Gr = {
  root: Kr
};
function Ur(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${Nr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Ur(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Gr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Vr = "_app_mrptw_1", Yr = "_side_mrptw_30", Jr = "_sideTop_mrptw_42", Xr = "_sideBody_mrptw_56", Qr = "_iconRail_mrptw_67", Zr = "_railItem_mrptw_76", el = "_railIcon_mrptw_97", al = "_railDot_mrptw_102", tl = "_railLetter_mrptw_108", nl = "_main_mrptw_113", rl = "_rail_mrptw_76", ll = "_page_mrptw_131", ol = "_headerRow_mrptw_140", il = "_sidebarToggle_mrptw_147", sl = "_headerSlot_mrptw_152", cl = "_drawerSide_mrptw_157", dl = "_root_mrptw_193", ul = "_topbar_mrptw_200", ml = "_mark_mrptw_211", hl = "_brand_mrptw_218", wl = "_tagline_mrptw_224", fl = "_identity_mrptw_230", _l = "_tools_mrptw_231", vl = "_nav_mrptw_241", bl = "_metadata_mrptw_248", pl = "_actor_mrptw_263", gl = "_detail_mrptw_264", yl = "_content_mrptw_309", Nl = "_toolsPanel_mrptw_325", kl = "_skip_mrptw_351", $ = {
  app: Vr,
  side: Yr,
  sideTop: Jr,
  sideBody: Xr,
  iconRail: Qr,
  railItem: Zr,
  railIcon: el,
  railDot: al,
  railLetter: tl,
  main: nl,
  rail: rl,
  page: ll,
  headerRow: ol,
  sidebarToggle: il,
  headerSlot: sl,
  drawerSide: cl,
  root: dl,
  topbar: ul,
  mark: ml,
  brand: hl,
  tagline: wl,
  identity: fl,
  tools: _l,
  nav: vl,
  metadata: bl,
  actor: pl,
  detail: gl,
  content: yl,
  toolsPanel: Nl,
  skip: kl
};
function sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const $l = "_scope_1an6i_2", Cl = {
  scope: $l
}, Zt = Te(null);
function LS({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Cl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(Zt.Provider, { value: { reason: e, reasonId: n }, children: a })
  ] });
}
function je() {
  return Re(Zt);
}
function Ea(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : sa(e, a.reasonId);
}
const Sl = "_btn_tzr89_2", Rl = "_primary_tzr89_14", Tl = "_destructive_tzr89_25", xl = "_secondary_tzr89_35", Ll = "_ghost_tzr89_40", Al = "_overflow_tzr89_49", El = "_sm_tzr89_56", Il = "_disabled_tzr89_60", ua = {
  btn: Sl,
  primary: Rl,
  destructive: Tl,
  secondary: xl,
  ghost: Ll,
  overflow: Al,
  sm: El,
  disabled: Il
};
function Ml(e, a, n, r) {
  const l = a === "sm" ? [ua.sm, "ward-btn--sm"] : [], i = n ? [ua.disabled] : [];
  return [ua.btn, ua[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Bl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Pl(e, a) {
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
  const a = je();
  Pl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = jl(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Ml(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Ol(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Bl(n, e.controls),
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
const ql = "_scrim_18idy_2", Wl = "_drawer_18idy_10", zl = "_sheet_18idy_14", Kl = "_modal_18idy_18", Gl = "_panel_18idy_23", Ul = "_start_18idy_39", Vl = "_header_18idy_62", Yl = "_title_18idy_70", Jl = "_body_18idy_74", Xl = "_close_18idy_101", Ce = {
  scrim: ql,
  drawer: Wl,
  sheet: zl,
  modal: Kl,
  panel: Gl,
  start: Ul,
  header: Vl,
  title: Yl,
  body: Jl,
  close: Xl
}, Ql = Te(null), ya = [], Na = /* @__PURE__ */ new Map();
function Zl(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function eo(e, a) {
  let n = Na.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, Na.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function ao(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !Zl(r) && eo(e, r);
}
function to(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (ao(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function no(e) {
  for (const a of e.claims) {
    const n = Na.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), Na.delete(a)));
  }
}
function ro(e, a) {
  const n = { root: e, claims: [] };
  return ya.push(n), to(n, a), n;
}
function lo(e) {
  const a = ya.indexOf(e);
  a >= 0 && ya.splice(a, 1), no(e);
}
function yt(e) {
  return e !== null && ya.at(-1) === e;
}
function oo(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = ro(i, a);
    return r.current = c, () => {
      var u, m;
      const d = yt(c);
      lo(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => yt(r.current), []);
}
function io(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function so(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function co({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function uo(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function mo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function ho(e) {
  const a = Re(Ql);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = ho(e.container), i = Ia("(min-width: 768px)"), s = io(e.kind, i), c = so(e, r), d = Lr(n), u = oo(a, l, e.returnFocusTo), m = X(() => {
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
        className: uo(s),
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
            className: mo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => u() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: m, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(co, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const wo = /^([a-z][a-z0-9+.-]*):/i, fo = /* @__PURE__ */ new Set(["http", "https"]), _o = "#";
function vo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = wo.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function F(e) {
  const a = vo(e);
  return a === void 0 || fo.has(a) ? e : _o;
}
function bo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function en(e) {
  const a = bo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function po(e, a) {
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
function go(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function an(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = go(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), en(r);
  }, [e, a, n]);
}
const yo = "_row_160e9_2", No = {
  row: yo
};
function ko(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return po(u, n), /* @__PURE__ */ t(r, { ref: u, className: [No.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...ko(l, r), ...c, children: a });
}
const $o = "_icon_1ylqy_2", Co = {
  icon: $o
};
function ca({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Co.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function AS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function ES() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function IS() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function MS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function So() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const tn = "ward:sidebar-collapsed", Ro = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function To() {
  try {
    return window.localStorage.getItem(tn) === "true";
  } catch {
    return !1;
  }
}
function xo(e) {
  try {
    window.localStorage.setItem(tn, String(e));
  } catch {
  }
}
function Lo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Ao(e) {
  return e instanceof Element && e.closest(Ro) !== null;
}
function Eo(e) {
  return e.key === "[" && !Lo(e) && !Ao(e.target);
}
function Io(e) {
  const [a, n] = p(To), r = () => {
    xo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Eo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Mo() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Bo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Po({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function jo(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = Io(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function Do({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(So, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function Oo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ho({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: F(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(Oo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Fo({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Do, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Ho, { items: n ?? [], label: a })
  ] });
}
function qo({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = Mo(), d = jo(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(Fo, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Bo, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Po, { sidebar: e, label: u, drawer: c })
  ] });
}
function Wo({ destinations: e, active: a }) {
  const n = f(null);
  return an(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: F(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Va({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function zo({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Va, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Va, { value: a, className: $.detail })
  ] });
}
function Ko() {
  const e = Ia("(max-width: 767.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Go({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function Uo({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function Vo(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Va, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(Wo, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(zo, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(Go, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Yo(e) {
  const a = N(), n = Ko();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(Vo, { ...e, menu: n }),
    /* @__PURE__ */ t(Uo, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function Jo(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function BS(e) {
  return Jo(e) ? /* @__PURE__ */ t(qo, { ...e }) : /* @__PURE__ */ t(Yo, { ...e });
}
const Xo = "_root_197jc_2", Qo = "_row_197jc_8", Zo = "_box_197jc_14", ei = "_label_197jc_21", ai = "_lockedNote_197jc_26", ti = "_consequence_197jc_34", ni = "_sample_197jc_69", Fe = {
  root: Xo,
  row: Qo,
  box: Zo,
  label: ei,
  lockedNote: ai,
  consequence: ti,
  sample: ni
};
function ri(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function li({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Fe.consequence} ward-check-consequence`, children: a }) : null;
}
function oi({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Fe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function ii({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.sample, "aria-hidden": "true", children: e }) : null;
}
function nn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = je(), l = ri(e, r);
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
        /* @__PURE__ */ t(oi, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(ii, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(li, { id: n, text: e.consequence })
  ] });
}
const si = "_chip_pq6tb_2", ci = {
  chip: si
}, di = {
  gate: z.chip.gate,
  system: z.chip.system,
  write: z.chip.write,
  drift: z.chip.drift,
  done: z.chip.done,
  attention: z.chip.attention,
  failed: z.chip.failed,
  pending: z.chip.pending,
  running: z.chip.running,
  warn: z.chip.warn,
  meta: z.chip.meta,
  soft: z.chip.soft,
  quiet: z.chip.quiet,
  owed: z.chip.owed
};
function ui(e, a) {
  if (e === "stream") return mi(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = di[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function mi(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${ci.chip} ward-chip ward-chip--${e}`, style: ui(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const hi = "_clamp_zn74g_3", Nt = {
  clamp: hi
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
const wi = "_root_13eei_3", fi = "_nav_13eei_8", _i = "_list_13eei_16", vi = "_item_13eei_24", bi = "_link_13eei_44", pi = "_sep_13eei_54", gi = "_current_13eei_58", yi = "_chips_13eei_62", Ae = {
  root: wi,
  nav: fi,
  list: _i,
  item: vi,
  link: bi,
  sep: pi,
  current: gi,
  chips: yi
};
function Ni({ path: e, chips: a }) {
  return /* @__PURE__ */ t("div", { className: Ae.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ae.nav, children: [
    /* @__PURE__ */ t("ol", { className: Ae.list, children: e.map((n, r) => /* @__PURE__ */ o("li", { className: Ae.item, children: [
      r > 0 ? /* @__PURE__ */ t("span", { className: Ae.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? n.href ? /* @__PURE__ */ t("a", { className: `${Ae.link} ward-target`, href: F(n.href), title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { title: n.label, children: n.label }) : /* @__PURE__ */ t("span", { className: Ae.current, "aria-current": "page", title: n.label, children: n.label })
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
const ki = 500;
function ln(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function on() {
  const e = f(""), a = f(void 0);
  return S(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, ki), e.current);
}
const ma = 4;
function $i(e, a, n) {
  const r = Math.max(0, n - e.bottom - ma * 2), l = Math.max(0, e.top - ma * 2);
  return a <= r || r >= l ? { top: e.bottom + ma, maxHeight: r } : { top: e.top - ma - Math.min(a, l), maxHeight: l };
}
function Ci(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Si(e, a, n, r) {
  return { ...$i(e, a.height, n.height), left: Ci(e, a.width, n.width, r) };
}
function va(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ri(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", va(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ti(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function kt(e, a, n) {
  const r = Ti(e), l = Ri(e, a), i = Si(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: va(i.left - l.box.left), top: va(i.top - l.box.top), maxHeight: va(i.maxHeight) }), r();
}
function xi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function sn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = xi(r), s = () => kt(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && kt(a.current, e.current, n);
  });
}
const Li = "_root_axvxm_2", Ai = "_trigger_axvxm_7", Ei = "_value_axvxm_32", Ii = "_menu_axvxm_50", Mi = "_find_axvxm_72", Bi = "_list_axvxm_88", Pi = "_option_axvxm_99", ji = "_check_axvxm_118", Di = "_empty_axvxm_129", fe = {
  root: Li,
  trigger: Ai,
  value: Ei,
  menu: Ii,
  find: Mi,
  list: Bi,
  option: Pi,
  check: ji,
  empty: Di
}, Oi = 7;
function Hi(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function $t(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Fi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => $t(e.options, e.value)), d = (u) => {
    var m;
    Yt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Hi(e.options, l),
    findable: e.options.length > Oi,
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
function qi(e, a) {
  const n = f(!1);
  return S(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function Wi(e) {
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
function zi(e) {
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
const Ki = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function Gi(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      Ki.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function Ui({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function Vi({ menu: e, ids: a, focusRef: n }) {
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
function Yi({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = Wi(a), s = f(null);
  sn(l, s);
  const c = (d) => {
    ln(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: fe.menu, children: [
    a.findable && /* @__PURE__ */ t(Vi, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: dn(a, zi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Ui, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function Ji(e, a) {
  const n = e.open ? rt(e, a) : void 0;
  S(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function un(...e) {
  return e.filter(Boolean).join(" ");
}
function Xi(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function Qi({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = je()) == null ? void 0 : c.reason;
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
      ...Gi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: Xi(e) })
    }
  );
}
function mn(e) {
  const a = je(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Fi(n, s), u = qi(d.open, c);
  return rn(d.open, i, () => d.close(!1)), Ji(d, l), /* @__PURE__ */ o("div", { ref: i, className: un(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(Qi, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(Yi, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const Zi = "_field_13oav_2", es = "_label_13oav_8", as = "_labelHidden_13oav_15", ts = "_control_13oav_25", ns = "_mono_13oav_45", rs = "_area_13oav_50", ls = "_invalid_13oav_57", Pe = {
  field: Zi,
  label: es,
  labelHidden: as,
  control: ts,
  mono: ns,
  area: rs,
  invalid: ls
}, os = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, hn = (e) => `${e}-label`;
function is({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? os : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function ss({ props: e, controlProps: a, cls: n }) {
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
function cs({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const ds = { input: is, select: ss, textarea: cs };
function us(e, a, n) {
  const r = ds[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function ms(e, a, n, r) {
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
function hs(e) {
  const a = e.mono ? [Pe.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [Pe.area] : [];
  return [Pe.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function ws(e) {
  return e ? `${Pe.label} ${Pe.labelHidden} ward-field-label` : `${Pe.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = ms(e, a, n, je()), l = hs(e);
  return /* @__PURE__ */ o("div", { className: `${Pe.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: hn(a), className: ws(e.labelHidden), htmlFor: a, children: e.label }),
    us(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${Pe.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const fs = "_root_1gft5_2", _s = "_trigger_1gft5_9", vs = "_panel_1gft5_33", bs = "_menu_1gft5_52", ps = "_group_1gft5_57", gs = "_heading_1gft5_62", ys = "_item_1gft5_68", Ns = "_separator_1gft5_94", ks = "_footer_1gft5_100", _e = {
  root: fs,
  trigger: _s,
  panel: vs,
  menu: bs,
  group: ps,
  heading: gs,
  item: ys,
  separator: Ns,
  footer: ks
}, wn = Te(null);
function $s(e, a) {
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
const Cs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ss(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Cs.get(a.key);
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
function Rs(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: fn(_e.trigger, r) };
}
function Ts(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = f(null), l = f(null), i = $s(e.defaultOpen === !0, l);
  return rn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: fn(_e.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Rs(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ss(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(wn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function xs(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Ls(e) {
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
const As = (e) => e.split("").every((a) => a === e[0]);
function Es(e, a, n) {
  const r = As(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = _n(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function Is(e) {
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
function Ms(e, a) {
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
function Bs(e, a) {
  const n = f(!1), r = on(), l = Ms(e, a), i = (s) => {
    ln(s) && e.focus(Es(e.items, e.current(), r(s.key)));
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
function Ps(e, a) {
  const { start: n, request: r } = a, l = f(e);
  l.current = e, S(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function js({ row: e, nav: a, popup: n }) {
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
    ...js(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: F(a.href), ...r, children: a.label }) : /* @__PURE__ */ t("button", { type: "button", ...r, children: a.label });
}
function Ds({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(vn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function Os({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ds, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(vn, { row: e.row, nav: a, popup: n });
}
function Hs() {
  const e = Re(wn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Fs({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Hs(), c = f(null);
  sn(s, c, n);
  const d = xs(e), u = Is(d.flatMap(Ls).map((w) => w.item)), m = Bs(u, r);
  return Ps(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((w, v) => /* @__PURE__ */ t(Os, { block: w, nav: u, popup: r }, v)) }),
    a && /* @__PURE__ */ t("p", { className: _e.footer, children: a })
  ] });
}
function qs(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function bn(e, a) {
  S(() => {
    const n = e.current;
    a === "page" && n && !qs(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const Ws = (e, a) => e.reduce((n, r) => n + r + a, -a);
function zs({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (Ws(a, r) <= e) return i;
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
function Ks(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Fa(a.paddingInlineStart) - Fa(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Ct),
    more: n ? Ct(n) : 0,
    gap: Fa(a.columnGap)
  };
}
function Gs(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Us = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Vs(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = Ks(i);
      l((d) => Us(d, c) ? d : c);
    };
    return s(), Gs(i, s);
  }, [e, n]), r && zs(r, a);
}
const Ys = "_strip_jqyo6_2", Js = "_fits_jqyo6_19", Xs = "_probe_jqyo6_27", Qs = "_moreRoot_jqyo6_36", Zs = "_more_jqyo6_36", ec = "_tab_jqyo6_55", ac = "_count_jqyo6_91", ve = {
  strip: Ys,
  fits: Js,
  probe: Xs,
  moreRoot: Qs,
  more: Zs,
  tab: ec,
  count: ac
}, pn = "More";
function tc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const gn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function yn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const nc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function rc({ tab: e, active: a, place: n, onChange: r }) {
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
function lc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function oc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Ts, { label: pn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(Fs, { align: "end", entries: e.map((r) => ({ label: gn(r), onSelect: () => n(r.id) })) }) });
}
function ic(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : nc;
}
function PS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = xa({ orientation: "horizontal" }), s = tc(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  bn(c, l);
  const d = Vs(c, s, e.map(gn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${yn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(rc, { tab: m, active: a, place: ic(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: pn }),
    u.length > 0 && /* @__PURE__ */ t(oc, { tabs: u, trigger: i.itemProps(e.length), onPick: lc(c, n) })
  ] });
}
const St = 7;
function jS({ links: e, active: a, label: n, level: r }) {
  if (e.length > St) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${St} — the set is fixed`);
  const l = f(null);
  return bn(l, r), an(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: yn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const sc = "_root_v56ff_3", cc = "_segment_v56ff_9", Rt = {
  root: sc,
  segment: cc
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
const dc = "_sidebar_s9o1j_3", uc = "_brand_s9o1j_9", mc = "_mark_s9o1j_17", hc = "_word_s9o1j_24", wc = "_nav_s9o1j_30", fc = "_navItem_s9o1j_39", _c = "_footLink_s9o1j_49", vc = "_group_s9o1j_58", bc = "_groupName_s9o1j_65", pc = "_agents_s9o1j_81", gc = "_agent_s9o1j_81", yc = "_root_s9o1j_96", Nc = "_agentTop_s9o1j_105", kc = "_dot_s9o1j_112", $c = "_agentName_s9o1j_124", Cc = "_agentMeta_s9o1j_138", Sc = "_foot_s9o1j_49", Rc = "_footName_s9o1j_150", Tc = "_footLinks_s9o1j_157", xc = "_linkBrand_s9o1j_184", Lc = "_label_s9o1j_205", Ac = "_note_s9o1j_210", Ec = "_footer_s9o1j_226", x = {
  sidebar: dc,
  brand: uc,
  mark: mc,
  word: hc,
  nav: wc,
  navItem: fc,
  new: "_new_s9o1j_48",
  footLink: _c,
  group: vc,
  groupName: bc,
  agents: pc,
  agent: gc,
  root: yc,
  agentTop: Nc,
  dot: kc,
  agentName: $c,
  agentMeta: Cc,
  foot: Sc,
  footName: Rc,
  footLinks: Tc,
  linkBrand: xc,
  label: Lc,
  note: Ac,
  footer: Ec
};
function Ic({ agent: e }) {
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
function Mc({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: F(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function Bc({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(Ic, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Mc, { shared: i })
  ] });
}
function Pc(e) {
  return e.destinations ?? e.items ?? [];
}
function jc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Dc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function Oc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: F(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Hc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(jc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Pc(e).map((a) => /* @__PURE__ */ t(Oc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Dc, { children: e.children })
  ] });
}
function Fc(e) {
  return "agents" in e;
}
function DS(e) {
  return Fc(e) ? /* @__PURE__ */ t(Bc, { ...e }) : /* @__PURE__ */ t(Hc, { ...e });
}
const qc = "_mark_wlgi8_3", Wc = {
  mark: qc
}, zc = { met: "✓", unmet: "", failed: "✕" };
function lt({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: Wc.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: zc[e]
    }
  );
}
const Kc = "_marker_br9fi_2", Gc = {
  marker: Kc
}, Uc = {
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
}, Vc = { running: " ward-running" };
function De({ size: e, kind: a, label: n }) {
  const r = { "--marker": Uc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Gc.marker} ward-marker ward-marker--${a}${Vc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Yc = "_root_ti0pq_2", Jc = "_chip_ti0pq_11", Xc = "_noCase_ti0pq_23", ha = {
  root: Yc,
  chip: Jc,
  noCase: Xc
};
function Qc(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function ot({ connection: e, since: a, lastEventAt: n }) {
  const r = Qc(a, n), l = nt(r, e === "reconnecting");
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
const Zc = "_root_u8ort_2", ed = "_context_u8ort_13", ad = "_row_u8ort_1", td = "_heading_u8ort_27", nd = "_headingWrap_u8ort_35", rd = "_chips_u8ort_40", ld = "_title_u8ort_48", od = "_consequence_u8ort_58", id = "_actionsWrap_u8ort_65", sd = "_actions_u8ort_65", cd = "_action_u8ort_65", dd = "_overflowPanel_u8ort_94", ud = "_measureClip_u8ort_105", md = "_measure_u8ort_105", Y = {
  root: Zc,
  context: ed,
  row: ad,
  heading: td,
  headingWrap: nd,
  chips: rd,
  title: ld,
  consequence: od,
  actionsWrap: id,
  actions: sd,
  action: cd,
  overflowPanel: dd,
  measureClip: ud,
  measure: md
};
function hd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function wd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(hd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function Tt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function fd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(Tt, { disclosure: l }) : a ? [/* @__PURE__ */ t(Tt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function _d(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function vd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function bd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function pd({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ni, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function gd(...e) {
  return e.some((a) => a === null);
}
function yd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Nd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + yd(e);
}
function kd(e, a, n, r, l) {
  if (l === 0 || gd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Nd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function $d(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Cd(e) {
  return _r(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Sd(e, a) {
  return a.length === 0 && e.length === 1 && Cd(e[0]);
}
function Rd(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!$d(d)) return;
    const u = () => c(kd(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Td({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function xd({ connection: e }) {
  return e ? /* @__PURE__ */ t(ot, { connection: e.connection, since: e.since }) : null;
}
function OS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: w, actionsRef: v, measureRef: y, collapsed: L } = Rd(i, Sd(i, s)), B = s.length > 0, { disclosure: le, close: Le } = bd(L || B, v), ae = _d(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t(pd, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: w, className: Y.headingWrap, children: /* @__PURE__ */ t(wd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(xd, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: v, "data-ward-actions": !0, children: /* @__PURE__ */ t(fd, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(vd, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(Td, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Ld = "_root_td96x_2", Ad = "_body_td96x_16", xt = {
  root: Ld,
  body: Ad
};
function HS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${xt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: xt.body, children: n }) });
}
const Ed = "_root_bf1pc_2", Id = "_table_bf1pc_9", Md = "_caption_bf1pc_14", Bd = "_series_bf1pc_23", Pd = "_category_bf1pc_31", jd = "_cell_bf1pc_39", Dd = "_track_bf1pc_45", Od = "_lane_bf1pc_52", Hd = "_bar_bf1pc_56", Fd = "_value_bf1pc_63", qd = "_swatch_bf1pc_70", Wd = "_empty_bf1pc_78", J = {
  root: Ed,
  table: Id,
  caption: Md,
  series: Bd,
  category: Pd,
  cell: jd,
  track: Dd,
  lane: Od,
  bar: Hd,
  value: Fd,
  swatch: qd,
  empty: Wd
}, zd = "—", Lt = 6;
function Kd(e, a) {
  if (a.length < 1 || a.length > Lt)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${Lt}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Gd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function kn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Ud(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Vd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Ud(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Yd({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": kn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Jd({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Xd({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = zd }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Yd, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(Vd, { value: u.values[d], top: r, step: kn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function FS(e) {
  Kd(e.categories, e.series);
  const a = Gd(e.series);
  return a === 0 ? /* @__PURE__ */ t(Jd, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Xd, { ...e, top: a });
}
const Qd = "_root_1bfqw_2", Zd = "_figure_1bfqw_7", eu = "_of_1bfqw_13", au = "_bar_1bfqw_18", tu = "_rows_1bfqw_38", nu = "_row_1bfqw_38", ru = "_label_1bfqw_49", lu = "_amount_1bfqw_54", Ee = {
  root: Qd,
  figure: Zd,
  of: eu,
  bar: au,
  rows: tu,
  row: nu,
  label: ru,
  amount: lu
};
function ou({ spent: e, ceiling: a, breakdown: n }) {
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
const iu = "_frame_9xel2_2", su = "_table_9xel2_6", cu = "_th_9xel2_12", du = "_td_9xel2_13", uu = "_sort_9xel2_48", mu = "_row_9xel2_60", hu = "_empty_9xel2_68", Me = {
  frame: iu,
  table: su,
  th: cu,
  td: du,
  sort: uu,
  row: mu,
  empty: hu
}, wu = { asc: "ascending", desc: "descending" };
function fu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return wu[a.direction];
}
function _u(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function vu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function bu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: vu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": fu(e, a),
      children: _u(e, n)
    }
  );
}
function pu({ row: e, props: a }) {
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
function gu({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(bu, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t(pu, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const yu = "_list_v0s52_2", Nu = {
  list: yu
};
function qS({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Nu.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const ku = "_label_1u62a_2", $u = {
  label: ku
};
function WS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: $u.label, children: a.header }) }, a.key)) }) });
}
const Cu = "_stack_bp6a0_2", Su = {
  stack: Cu
};
function zS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Su.stack, "data-ward-action-stack": "", children: e });
}
const Ru = "_set_1z0sq_2", Tu = "_legend_1z0sq_7", xu = "_row_1z0sq_15", Lu = "_control_1z0sq_20", Au = "_input_1z0sq_26", Eu = "_label_1z0sq_31", Iu = "_consequence_1z0sq_36", He = {
  set: Ru,
  legend: Tu,
  row: xu,
  control: Lu,
  input: Au,
  label: Eu,
  consequence: Iu
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
const Mu = "_root_11gpw_2", Bu = "_head_11gpw_10", Pu = "_note_11gpw_29", ju = "_index_11gpw_34", Du = "_dot_11gpw_38", Ou = "_counter_11gpw_49", Hu = "_trailing_11gpw_57", qe = {
  root: Mu,
  head: Bu,
  note: Pu,
  index: ju,
  dot: Du,
  counter: Ou,
  trailing: Hu
};
function Fu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${qe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: qe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function qu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: qe.counter, "aria-hidden": "true", children: e }) : null;
}
function At({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: qe.head, children: [
      /* @__PURE__ */ t(Fu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: qe.note, children: n }),
    /* @__PURE__ */ t(qu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: qe.trailing, children: i })
  ] });
}
const Wu = "_strip_ww53x_2", zu = "_cell_ww53x_7", Ku = "_value_ww53x_12", Gu = "_link_ww53x_29", Uu = "_label_ww53x_49", Ke = {
  strip: Wu,
  cell: zu,
  value: Ku,
  link: Gu,
  label: Uu
};
function Vu(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Cn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Yu({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Cn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function Ju({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Cn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: F(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return Vu(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(Yu, { cell: n }, n.label) : /* @__PURE__ */ t(Ju, { cell: n, href: n.href }, n.label)) });
}
const Xu = "_root_1eb1u_2", Qu = "_track_1eb1u_8", Zu = "_thumb_1eb1u_46", em = "_labelHidden_1eb1u_64", am = "_label_1eb1u_64", tm = "_lockedNote_1eb1u_84", We = {
  root: Xu,
  track: Qu,
  thumb: Zu,
  labelHidden: em,
  label: am,
  lockedNote: tm
};
function nm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function rm(e) {
  return e ? `${We.label} ${We.labelHidden}` : We.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = je(), { on: m, off: w } = nm(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${We.root} ward-switchrow`, children: [
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
        className: `${We.track} ward-switch`,
        "data-on": m,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: We.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: rm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: We.lockedNote, children: "always on" })
    ] })
  ] });
}
const lm = "_bar_1vp69_2", om = "_skip_1vp69_11", im = "_mark_1vp69_22", sm = "_nav_1vp69_30", cm = "_list_1vp69_34", dm = "_select_1vp69_41", um = "_selectTrigger_1vp69_45", mm = "_dest_1vp69_52", hm = "_actor_1vp69_71", wm = "_actorMark_1vp69_84", fm = "_actorLabel_1vp69_89", _m = "_tagline_1vp69_108", oe = {
  bar: lm,
  skip: om,
  mark: im,
  nav: sm,
  list: cm,
  select: dm,
  selectTrigger: um,
  dest: mm,
  actor: hm,
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
function KS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = bm(r);
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: vm(c) })
    ] })
  ] });
}
const pm = "_tree_zzoob_2", gm = "_item_zzoob_6", ym = "_row_zzoob_10", Nm = "_button_zzoob_22", ka = {
  tree: pm,
  item: gm,
  row: ym,
  button: Nm
}, Sn = Te(null);
function km({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(Sn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const $m = { ArrowRight: !0, ArrowLeft: !1 };
function Et(e) {
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
  const a = [ka.row, "ward-treerow"];
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
function Rn(e) {
  const a = Re(Sn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Tm(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Rm(e),
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
const Im = "_frame_gij4e_2", Mm = "_subjectRail_gij4e_22", Bm = "_subject_gij4e_22", Pm = "_rail_gij4e_42", jm = "_record_gij4e_66", Dm = "_recordBody_gij4e_71", Om = "_stageGrid_gij4e_120", Hm = "_band_gij4e_134", Fm = "_bandBody_gij4e_142", qm = "_bandActions_gij4e_147", Wm = "_scroller_gij4e_155", zm = "_board_gij4e_182", Km = "_lanes_gij4e_191", Z = {
  frame: Im,
  subjectRail: Mm,
  subject: Bm,
  rail: Pm,
  record: jm,
  recordBody: Dm,
  stageGrid: Om,
  band: Hm,
  bandBody: Fm,
  bandActions: qm,
  scroller: Wm,
  board: zm,
  lanes: Km
};
function GS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function It(e) {
  return e ? "true" : void 0;
}
function US({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": It(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": It(l), "aria-label": r, children: a })
  ] });
}
function VS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(At, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(At, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Gm = "_form_1j8ub_2", Um = "_fields_1j8ub_9", Vm = "_actions_1j8ub_19", qa = {
  form: Gm,
  fields: Um,
  actions: Vm
};
function YS({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: qa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: qa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: qa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function JS({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const Ym = "(max-width: 767.98px)";
function it({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? vr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function Jm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(it, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Xm({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(it, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(br, { children: n.content }, n.id)) }) });
}
function XS({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(Ym);
  return n === void 0 ? /* @__PURE__ */ t(it, { label: a, children: e }) : l ? /* @__PURE__ */ t(Jm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Xm, { lanes: n, label: a });
}
function QS({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const Qm = "_block_b38uc_3", Zm = "_sentence_b38uc_10", eh = "_meta_b38uc_19", ah = "_action_b38uc_24", th = "_strip_b38uc_28", nh = "_loading_b38uc_47", rh = "_label_b38uc_55", lh = "_counter_b38uc_62", be = {
  block: Qm,
  sentence: Zm,
  meta: eh,
  action: ah,
  strip: th,
  loading: nh,
  label: rh,
  counter: lh
};
function oh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function ja({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(oh, { action: a })
  ] });
}
function ih(e) {
  return /* @__PURE__ */ t(ja, { ...e, kind: "ward-emptystate" });
}
function ZS({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(ja, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function eR(e) {
  return /* @__PURE__ */ t(ja, { ...e });
}
function aR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(ja, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function tR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function nR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function rR({ label: e, startedAt: a }) {
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
const sh = "_note_cigdt_2", ch = {
  note: sh
};
function dh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: ch.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const uh = "_card_k7btg_3", mh = "_hit_k7btg_31", hh = "_head_k7btg_44", wh = "_title_k7btg_51", fh = "_meta_k7btg_57", _h = "_since_k7btg_66", vh = "_sep_k7btg_76", bh = "_fields_k7btg_80", ph = "_field_k7btg_80", gh = "_last_k7btg_98", yh = "_reason_k7btg_110", se = {
  card: uh,
  hit: mh,
  head: hh,
  title: wh,
  meta: fh,
  since: _h,
  sep: vh,
  fields: bh,
  field: ph,
  last: gh,
  reason: yh
}, Nh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function kh(e, a, n) {
  const r = _a(e, "blue"), l = _a(e, "orange"), i = _a(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Nh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const $h = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Ch(e, a) {
  return $h[a](e);
}
function Sh({ item: e, connection: a }) {
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
function Rh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Th({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function xh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Ch(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Lh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Ah(e, a, n) {
  e == null || e(a, n);
}
function Eh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Ih({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function Da(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  kh(r, n.key, e.feed);
  const l = Eh(e.feed), i = Lh(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Ah(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Rh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Sh, { item: n, connection: l }),
        /* @__PURE__ */ t(Th, { reason: n.blockedReason }),
        /* @__PURE__ */ t(xh, { item: n, fields: a }),
        /* @__PURE__ */ t(Ih, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Mh = "_column_1j8bi_3", Bh = "_head_1j8bi_21", Ph = "_label_1j8bi_30", jh = "_count_1j8bi_39", Dh = "_list_1j8bi_53", la = {
  column: Mh,
  head: Bh,
  label: Ph,
  count: jh,
  list: Dh
};
function Tn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function Oh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Hh(e) {
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
function Fh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Tn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(Oh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Hh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(dh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const qh = "_foot_cs4jr_2", Wh = "_note_cs4jr_13", zh = "_link_cs4jr_19", Wa = {
  foot: qh,
  note: Wh,
  link: zh
};
function lR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: F(e), children: "Configure board" })
  ] });
}
const Kh = "_head_1tfi5_3", Gh = "_identity_1tfi5_12", Uh = "_titleRow_1tfi5_18", Vh = "_title_1tfi5_18", Yh = "_key_1tfi5_35", Jh = "_rollup_1tfi5_45", Xh = "_tools_1tfi5_53", Qh = "_swatch_1tfi5_101", Zh = "_mark_1tfi5_108", ke = {
  head: Kh,
  identity: Gh,
  titleRow: Uh,
  title: Vh,
  key: Yh,
  rollup: Jh,
  tools: Xh,
  swatch: Qh,
  mark: Zh
}, Mt = "initials:";
function ew(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function aw(e) {
  const a = [ew(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function tw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    aw(e)
  ] });
}
function nw(e) {
  return e.startsWith(Mt) ? e.slice(Mt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function rw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: nw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function lw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function oR({
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
        /* @__PURE__ */ t(rw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: tw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(lw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(ot, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const ow = "_head_1sejb_14", iw = "_line_1sejb_15", sw = "_cHandle_1sejb_36", cw = "_cName_1sejb_41", dw = "_nameLine_1sejb_49", uw = "_cLabel_1sejb_56", mw = "_cCap_1sejb_61", hw = "_cShown_1sejb_66", ww = "_name_1sejb_49", fw = "_noCap_1sejb_88", _w = "_state_1sejb_102", vw = "_handle_1sejb_111", bw = "_sub_1sejb_137", j = {
  head: ow,
  line: iw,
  cHandle: sw,
  cName: cw,
  nameLine: dw,
  cLabel: uw,
  cCap: mw,
  cShown: hw,
  name: ww,
  noCap: fw,
  state: _w,
  handle: vw,
  sub: bw
}, pw = "can't be hidden or collapsed", gw = "terminal · counted, not a column";
function iR() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function yw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Nw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Bt(e) {
  return e.gate ? pw : e.terminal ? gw : Nw(e.agentsMounted);
}
function kw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function $w({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Bt(e) && /* @__PURE__ */ t("span", { className: j.sub, children: Bt(e) })
  ] });
}
function Cw(e) {
  return e === void 0 ? "" : String(e);
}
function Sw(e) {
  return e === "" ? void 0 : Number(e);
}
function Rw({ name: e, onReorder: a }) {
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
      onKeyDown: (r) => !n && kw(r, a),
      children: "⠿"
    }
  ) });
}
function Tw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Cw(a.cap), onChange: (r) => n({ ...a, cap: Sw(r) }) }) });
}
function xw({ stage: e, config: a, onChange: n }) {
  const r = je() !== null, l = yw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Lw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function sR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Lw(e), children: [
    /* @__PURE__ */ t(Rw, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t($w, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Tw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(xw, { stage: e, config: a, onChange: n })
  ] });
}
const Aw = "_body_1a4f4_2", Ew = "_head_1a4f4_9", Iw = "_summary_1a4f4_19", Mw = "_block_1a4f4_20", Bw = "_actionsBlock_1a4f4_21", Pw = "_title_1a4f4_41", jw = "_note_1a4f4_46", Dw = "_k_1a4f4_51", Ow = "_kv_1a4f4_58", Hw = "_row_1a4f4_64", Fw = "_label_1a4f4_75", qw = "_value_1a4f4_84", Ww = "_quote_1a4f4_90", zw = "_actions_1a4f4_21", Kw = "_resolve_1a4f4_103", D = {
  body: Aw,
  head: Ew,
  summary: Iw,
  block: Mw,
  actionsBlock: Bw,
  title: Pw,
  note: jw,
  k: Dw,
  kv: Ow,
  row: Hw,
  label: Fw,
  value: qw,
  quote: Ww,
  actions: zw,
  resolve: Kw
};
function Gw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Uw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Vw(e) {
  const a = da(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Yw(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Jw(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(Vw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Gw(e),
    ...Yw(n),
    ...Uw(e, a)
  ];
}
function Xw({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: D.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: D.k, children: a }),
    e
  ] });
}
function Qw(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Zw({ item: e, showKey: a }) {
  const n = Qw(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: D.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function ef({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: D.block, children: [
    /* @__PURE__ */ t("p", { className: D.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: D.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: D.note, children: e.agentMeta })
  ] }) : null;
}
function cR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = Jw(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: D.body, children: [
    /* @__PURE__ */ t(Zw, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: D.summary, children: [
      /* @__PURE__ */ t("h2", { className: D.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: D.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: D.kv, children: w.map(([v, y, L]) => /* @__PURE__ */ o("div", { className: D.row, children: [
      /* @__PURE__ */ t("dt", { className: D.label, children: v }),
      /* @__PURE__ */ t("dd", { className: D.value, children: y })
    ] }, L ?? v)) }),
    /* @__PURE__ */ t(ef, { item: e }),
    /* @__PURE__ */ o("div", { className: D.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: D.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: D.note, children: c })
    ] }),
    /* @__PURE__ */ t(Xw, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const af = "_root_3azmy_2", tf = "_list_3azmy_7", nf = "_item_3azmy_12", rf = "_box_3azmy_18", lf = "_text_3azmy_23", of = "_note_3azmy_28", Ye = {
  root: af,
  list: tf,
  item: nf,
  box: rf,
  text: lf,
  note: of
};
function Oa({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(lt, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const sf = "_rail_znbbp_2", cf = "_k_znbbp_11", df = "_head_znbbp_19", uf = "_section_znbbp_25", mf = "_card_znbbp_39", hf = "_strip_znbbp_46", wf = "_skeleton_znbbp_60", ff = "_skeletonLabel_znbbp_74", _f = "_bar_znbbp_80", vf = "_note_znbbp_89", me = {
  rail: sf,
  k: cf,
  head: df,
  section: uf,
  card: mf,
  strip: hf,
  skeleton: wf,
  skeletonLabel: ff,
  bar: _f,
  note: vf
};
function bf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function za({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function pf({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function gf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Fh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function yf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(gf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(pf, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function dR(e) {
  const a = bf(e.onOpen), n = Tn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(za, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(Da, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(za, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(yf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(za, { title: "Effect of this config", children: /* @__PURE__ */ t(Oa, { items: e.effects, density: "compact" }) })
  ] });
}
function Nf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function kf(e) {
  return Math.ceil(e.length / 2);
}
function $f(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function xn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Cf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = xn(e);
  l !== void 0 && n(l), r($f(e.type));
}
function Sf(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Cf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Rf(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Tf(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function xf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Lf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(kf(a ?? [])) + ")"
  };
}
function Af(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ef(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function If(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Mf(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Bf(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Pf(e, a) {
  return a === void 0 ? e : Nf(e, a.ref);
}
function jf(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function Ln(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = _a(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Rf(a));
  Sf(e.feed, a.key, s, d, i);
  const u = Tf(a, r), m = xf(a, n), w = Lf(a, e.fields), v = Bf(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...jf(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: w,
      ref: Pf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Af(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          Ef(a, e.fields),
          If(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Mf(n, c, e.connection, a.changedAt),
          v !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: v, children: v }) : null
        ] })
      ]
    }
  ) });
}
function Df({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Of(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Hf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Ff(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Df, { count: e.items.length, cap: e.column.cap });
}
function qf(e, a) {
  return e.roving ?? a;
}
function Wf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function zf(e, a) {
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
function Kf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = qf(e, n), l = Of(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Hf(e.column, e.items.length, a),
    Ff(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Wf(e, n), children: zf(e, r) })
  ] });
}
function Gf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Uf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Vf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function uR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Gf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Uf(e),
      Vf(e.onConfigure),
      /* @__PURE__ */ t(ot, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Yf(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Jf(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Xf(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function mR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(Yf(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: Jf(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(nn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Xf(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function hR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Ln, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Kf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function Qf(e, a) {
  const n = xn(e);
  n !== void 0 && a(n);
}
function Zf(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => Qf(r, n));
  }, [e, a, n]);
}
function e_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function a_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function t_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function n_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function wR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Zf(e.feed, a.key, l);
  const i = [...e_(a), ...a_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      t_(n, r)
    ] }),
    n_(a, e.actions)
  ] });
}
const r_ = "_card_54446_3", l_ = "_head_54446_30", o_ = "_mark_54446_38", i_ = "_name_54446_50", s_ = "_chips_54446_71", c_ = "_description_54446_77", d_ = "_run_54446_82", u_ = "_sep_54446_91", m_ = "_facts_54446_96", h_ = "_fact_54446_96", w_ = "_factLabel_54446_109", f_ = "_factValue_54446_113", re = {
  card: r_,
  head: l_,
  mark: o_,
  name: i_,
  chips: s_,
  description: c_,
  run: d_,
  sep: u_,
  facts: m_,
  fact: h_,
  factLabel: w_,
  factValue: f_
}, __ = { live: "done", draft: "running", paused: "meta" };
function v_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function b_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: __[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function p_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function g_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function y_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function N_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function k_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: v_(s),
      style: c,
      "data-selected": d,
      "data-paused": N_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: F(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(p_, { description: e.description }),
        /* @__PURE__ */ t(g_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(b_, { versions: e.versions }),
        /* @__PURE__ */ t(y_, { facts: i })
      ]
    }
  );
}
const $_ = "_list_4dcyc_2", C_ = "_row_4dcyc_11", S_ = "_head_4dcyc_23", R_ = "_id_4dcyc_30", T_ = "_lock_4dcyc_35", x_ = "_reason_4dcyc_41", L_ = "_remove_4dcyc_46", A_ = "_clauses_4dcyc_50", E_ = "_clause_4dcyc_50", I_ = "_label_4dcyc_64", M_ = "_cell_4dcyc_71", B_ = "_value_4dcyc_76", ie = {
  list: $_,
  row: C_,
  head: S_,
  id: R_,
  lock: T_,
  reason: x_,
  remove: L_,
  clauses: A_,
  clause: E_,
  label: I_,
  cell: M_,
  value: B_
}, An = Te(!1);
function fR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(An.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function P_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function j_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function D_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(j_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Pt(e, a) {
  return e.locked ? void 0 : a;
}
function _R({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(An)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Pt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(D_, { rule: e, onRemove: Pt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(P_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const O_ = "_ladder_n8eeo_2", H_ = "_cell_n8eeo_7", F_ = "_empty_n8eeo_26", q_ = "_name_n8eeo_34", W_ = "_holder_n8eeo_40", z_ = "_request_n8eeo_46", K_ = "_swatches_n8eeo_51", G_ = "_swatch_n8eeo_51", U_ = "_tilesFrame_n8eeo_78", V_ = "_tiles_n8eeo_78", Y_ = "_tile_n8eeo_78", J_ = "_bar_n8eeo_117", X_ = "_hex_n8eeo_128", Q_ = "_note_n8eeo_138", E = {
  ladder: O_,
  cell: H_,
  empty: F_,
  name: q_,
  holder: W_,
  request: z_,
  swatches: K_,
  swatch: G_,
  tilesFrame: U_,
  tiles: V_,
  tile: Y_,
  bar: J_,
  hex: X_,
  note: Q_
}, vR = "not validated yet, pending a CVD matrix and dark stepping";
function Z_(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function En(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function ev(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function av({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(De, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function tv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function nv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const jt = (e) => String(e).padStart(2, "0");
function rv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? En(e, void 0);
}
function lv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${jt(e)}` : Pr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${jt(e)} · ${n}` })
  ] });
}
function ov({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Z_(e), c = En(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, v = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...nv(d, m, u), "data-validation": s, style: ev(e, s), onClick: v, onKeyDown: (B) => tv(B, v) }, label: y, name: w, holder: c, validation: s, note: rv(s, n, m), step: e.step };
}
const iv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(lv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(av, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function sv(e) {
  return iv[e.presentation](ov(e));
}
function cv(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function dv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function uv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const mv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function hv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const wv = { list: dv, swatches: () => null, tiles: hv };
function fv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function In(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  cv(e.steps);
  const r = uv(e), l = wv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(sv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...fv(e.disabled === !0), className: `${mv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const _v = "_rail_s06lm_2", vv = "_section_s06lm_12", bv = "_sectionFlush_s06lm_22", pv = "_head_s06lm_26", gv = "_headLabel_s06lm_34", yv = "_sample_s06lm_42", Nv = "_sampleLabel_s06lm_47", kv = "_sampleTitle_s06lm_54", $v = "_sampleMeta_s06lm_59", Cv = "_trace_s06lm_65", Sv = "_traceHead_s06lm_70", Rv = "_steps_s06lm_78", Tv = "_step_s06lm_78", xv = "_stepTitle_s06lm_97", Lv = "_hollow_s06lm_107", Av = "_stepBody_s06lm_115", Ev = "_stepDetail_s06lm_127", Iv = "_publish_s06lm_132", Mv = "_reason_s06lm_138", Bv = "_note_s06lm_143", Pv = "_reveal_s06lm_148", k = {
  rail: _v,
  section: vv,
  sectionFlush: bv,
  head: pv,
  headLabel: gv,
  sample: yv,
  sampleLabel: Nv,
  sampleTitle: kv,
  sampleMeta: $v,
  trace: Cv,
  traceHead: Sv,
  steps: Rv,
  step: Tv,
  stepTitle: xv,
  hollow: Lv,
  stepBody: Av,
  stepDetail: Ev,
  publish: Iv,
  reason: Mv,
  note: Bv,
  reveal: Pv
}, Dt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, jv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Dv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ov = { notSimulated: "not simulated", running: "running" };
function Hv(e) {
  return e.presentation === "foundry";
}
function Fv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function qv(e, a) {
  var r;
  const n = jv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Wv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function zv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Kv(e) {
  if (Wv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Gv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Uv(e) {
  const a = Ov[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(De, { size: 6, kind: Dv[e.kind], label: e.kind });
}
function Vv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Yv(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Jv(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Gv, { kind: a.kind, children: [
    /* @__PURE__ */ t(Uv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Vv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Yv, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Xv(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Mn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Xv(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Jv, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Qv(e) {
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
function Zv(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function eb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Jt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function ab(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Jt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function tb(e) {
  const a = ab(e.run);
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
function nb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Bn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function rb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Bn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Pn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Dt[e.run.status].role, label: Dt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function lb(e, a) {
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
function ob(e) {
  var n;
  zv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Pn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Qv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Mn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(eb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist }) }),
    /* @__PURE__ */ t(nb, { reason: Fv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function ib(e) {
  var r;
  const a = lb(e.run, e.feed);
  Kv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Pn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Zv, { sample: e.run.sample }),
    /* @__PURE__ */ t(Mn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(tb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Oa, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(rb, { reason: qv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function bR(e) {
  return Hv(e) ? /* @__PURE__ */ t(ib, { ...e }) : /* @__PURE__ */ t(ob, { ...e });
}
const sb = "_list_142ip_3", cb = "_row_142ip_9", db = "_condition_142ip_18", ub = "_action_142ip_24", ba = {
  list: sb,
  row: cb,
  condition: db,
  action: ub
}, jn = Te(!1);
function pR({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(jn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ba.list, "aria-label": a, children: e }) });
}
function gR({ rule: e }) {
  if (!Re(jn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ba.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ba.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ba.action, children: e.then })
  ] });
}
const mb = "_move_tmppt_3", hb = {
  move: mb
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
function Ot(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function wb(e) {
  return e === "up" ? "down" : "up";
}
function fb(e, a) {
  const n = Ot(e, a.id, a.direction) ?? Ot(e, a.id, wb(a.direction));
  n == null || n.focus();
}
function Hn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && fb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Fn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${hb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const _b = "_body_1jd1i_2", vb = "_title_1jd1i_8", bb = "_section_1jd1i_13", pb = "_legend_1jd1i_18", gb = "_stages_1jd1i_26", yb = "_stage_1jd1i_26", Nb = "_stageIndex_1jd1i_44", kb = "_stageName_1jd1i_50", $b = "_footer_1jd1i_59", Cb = "_note_1jd1i_66", Sb = "_reason_1jd1i_71", Rb = "_actions_1jd1i_76", Tb = "_webHead_1jd1i_83", xb = "_kicker_1jd1i_92", Lb = "_webTitle_1jd1i_99", Ab = "_webBody_1jd1i_105", Eb = "_webSection_1jd1i_109", Ib = "_sectionHead_1jd1i_121", Mb = "_sectionNote_1jd1i_129", Bb = "_formLabel_1jd1i_134", Pb = "_identityRow_1jd1i_139", jb = "_nameCell_1jd1i_145", Db = "_keyCell_1jd1i_150", Ob = "_colourCell_1jd1i_154", Hb = "_colourStatus_1jd1i_161", Fb = "_webStages_1jd1i_166", qb = "_webStageList_1jd1i_172", Wb = "_webStage_1jd1i_166", zb = "_webIndex_1jd1i_191", Kb = "_webStageName_1jd1i_196", Gb = "_webMoves_1jd1i_201", Ub = "_addStage_1jd1i_215", Vb = "_addStageButton_1jd1i_223", Yb = "_addStageNote_1jd1i_231", Jb = "_webFooter_1jd1i_236", Xb = "_webFooterNotes_1jd1i_244", Qb = "_webNote_1jd1i_251", _ = {
  body: _b,
  title: vb,
  section: bb,
  legend: pb,
  stages: gb,
  stage: yb,
  stageIndex: Nb,
  stageName: kb,
  footer: $b,
  note: Cb,
  reason: Sb,
  actions: Rb,
  webHead: Tb,
  kicker: xb,
  webTitle: Lb,
  webBody: Ab,
  webSection: Eb,
  sectionHead: Ib,
  sectionNote: Mb,
  formLabel: Bb,
  identityRow: Pb,
  nameCell: jb,
  keyCell: Db,
  colourCell: Ob,
  colourStatus: Hb,
  webStages: Fb,
  webStageList: qb,
  webStage: Wb,
  webIndex: zb,
  webStageName: Kb,
  webMoves: Gb,
  addStage: Ub,
  addStageButton: Vb,
  addStageNote: Yb,
  webFooter: Jb,
  webFooterNotes: Xb,
  webNote: Qb
}, Zb = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], qn = "not in catalogue";
function ep(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${qn}` }, ...n];
}
function ap({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${qn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: ep(n, e.name), invalid: i, onChange: r });
}
function Wn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function tp(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function np({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Wn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${_.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: _.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: _.webStageName, children: /* @__PURE__ */ t(ap, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Zb, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: _.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function rp({ stages: e, onChange: a, catalogue: n }) {
  const r = tp(e.length), l = Hn(), i = (c, d) => {
    const u = Dn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, On(Wn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: _.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: _.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(np, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Fn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: _.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: _.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: _.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const lp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], op = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], ip = "A new stream starts as a draft. Nothing runs on it until you publish it.", sp = "Create is disabled: name the stream and give it a key first.", cp = "reorder with the ↑ ↓ buttons · min 2";
function st(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function dp(e, a) {
  const n = e.find((r) => st(r, a));
  return n ? n.step : 1;
}
function up({ stages: e, onMove: a }) {
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
function mp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: _.footer, children: [
    /* @__PURE__ */ t("p", { className: _.note, children: ip }),
    e && /* @__PURE__ */ t("p", { className: _.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: _.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function hp(e, a) {
  return e !== "" && a !== "" ? null : sp;
}
function wp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = op, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [v, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => dp(n, r)), [ae, Ue] = p(e.stages ?? lp), [Ve, R] = p(l[0].value), G = { name: m, key: v, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = hp(m, v);
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
      /* @__PURE__ */ t(up, { stages: ae, onMove: (Oe, fr) => Ue(Xa(ae, Oe, fr)) })
    ] }),
    /* @__PURE__ */ t($n, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(mp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const zn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], fp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function _p(e, a, n, r, l, i) {
  var c;
  const s = ((c = zn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function vp(e, a) {
  return bp(e) && pp(e, a) && gp(e);
}
function bp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function pp(e, a) {
  return e.colourStep === null || st({ step: e.colourStep }, a);
}
function gp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function yp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : st({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Np({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: _.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: _.webNote, children: "Add a stage an agent can run on." });
}
function kp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: _.webFooter, children: [
    /* @__PURE__ */ o("div", { className: _.webFooterNotes, children: [
      /* @__PURE__ */ t(Np, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: _.reason, children: fp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function $p({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: _.webHead, children: [
    /* @__PURE__ */ t("span", { className: _.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: _.webTitle, children: "New stream" })
  ] });
}
function Cp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function Sp(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [v, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = _p(l, s, d, m, v, L), Le = vp(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: _.colourCell, children: [
    /* @__PURE__ */ t("span", { className: _.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(In, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: _.colourStatus, "data-colour-status": "", children: yp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t($p, { titleId: n }),
    /* @__PURE__ */ o("div", { className: _.webBody, children: [
      /* @__PURE__ */ t(Cp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: _.webSection, children: [
        /* @__PURE__ */ o("div", { className: _.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: _.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: _.sectionNote, children: cp })
        ] }),
        /* @__PURE__ */ t(rp, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: _.webSection, children: /* @__PURE__ */ t($n, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: v, options: zn, onChange: y }) }),
      /* @__PURE__ */ t(kp, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function yR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Sp, { ...e }) : /* @__PURE__ */ t(wp, { ...e });
}
const Rp = "_row_bs8hc_2", Tp = "_cell_bs8hc_6", xp = "_condition_bs8hc_11", Lp = "_action_bs8hc_18", Ap = "_contract_bs8hc_24", Ep = "_contractCondition_bs8hc_33", Ip = "_contractAction_bs8hc_39", Q = {
  row: Rp,
  cell: Tp,
  condition: xp,
  action: Lp,
  contract: Ap,
  contractCondition: Ep,
  contractAction: Ip
}, Kn = ["advance", "block", "escalate", "requestReview"], Ht = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ct(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ht[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Kn.map((l) => ({ value: l, label: Ht[l] }))
    }
  );
}
function Mp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Bp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: ct(e, a, n) })
  ] });
}
function Pp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: ct(e, a, n, !0) })
  ] });
}
const jp = { two: Bp, four: Mp, contract: Pp };
function NR(e) {
  var n;
  if (!Kn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = jp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Dp = "_column_11id3_2", Op = "_head_11id3_17", Hp = "_index_11id3_23", Fp = "_name_11id3_29", qp = "_meta_11id3_38", Wp = "_mono_11id3_43", zp = "_gate_11id3_50", Kp = "_reviewersLabel_11id3_57", Gp = "_reviewers_11id3_57", Up = "_reviewer_11id3_57", Vp = "_agents_11id3_74", Yp = "_workflowColumn_11id3_79", Jp = "_workflowHead_11id3_96", Xp = "_stageRow_11id3_102", Qp = "_stageLabel_11id3_109", Zp = "_workflowTitle_11id3_116", eg = "_workflowMeta_11id3_122", ag = "_workflowGate_11id3_127", tg = "_gateNote_11id3_135", ng = "_cardNote_11id3_140", rg = "_reviewerList_11id3_145", lg = "_reviewerRow_11id3_151", og = "_reviewerMark_11id3_157", ig = "_reviewerName_11id3_167", sg = "_terminalCard_11id3_173", cg = "_terminalCount_11id3_182", dg = "_workflowAgents_11id3_188", ug = "_mount_11id3_194", C = {
  column: Dp,
  head: Op,
  index: Hp,
  name: Fp,
  meta: qp,
  mono: Wp,
  gate: zp,
  reviewersLabel: Kp,
  reviewers: Gp,
  reviewer: Up,
  agents: Vp,
  workflowColumn: Yp,
  workflowHead: Jp,
  stageRow: Xp,
  stageLabel: Qp,
  workflowTitle: Zp,
  workflowMeta: eg,
  workflowGate: ag,
  gateNote: tg,
  cardNote: ng,
  reviewerList: rg,
  reviewerRow: lg,
  reviewerMark: og,
  reviewerName: ig,
  terminalCard: sg,
  terminalCount: cg,
  workflowAgents: dg,
  mount: ug
}, mg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function dt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Gn(e) {
  return `${Math.round(e * 100)}%`;
}
function hg({ stage: e }) {
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
function wg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: dt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function fg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: mg[e.kind] })
  ] });
}
function _g({ stage: e }) {
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
function vg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(hg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(wg, { stage: e }) : null;
}
function bg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function pg({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(fg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(_g, { stage: e }),
    /* @__PURE__ */ t(vg, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(k_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(bg, { onMount: n })
  ] });
}
const gg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function yg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Ng({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(yg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Gn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function kg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function $g({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: dt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: kg(e.rolledBackThisWeek) })
  ] });
}
function Cg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Sg(e) {
  if (e.kind === "terminal") return `${dt(e.closedThisWeek)} this week`;
  const a = Cg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Rg({ stage: e, titleId: a }) {
  const n = gg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Sg(e) })
  ] });
}
function Tg(e) {
  return e === "entry" || e === "agent";
}
function xg({ stage: e, onMount: a }) {
  return a === void 0 || !Tg(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Lg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Rg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Ng, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t($g, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(xg, { stage: e, onMount: n })
  ] });
}
function Ag(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function kR(e) {
  return Ag(e) ? /* @__PURE__ */ t(Lg, { ...e }) : /* @__PURE__ */ t(pg, { ...e });
}
const Eg = "_row_1tdra_6", Ig = "_name_1tdra_12", Mg = "_compactRow_1tdra_13", Bg = "_compactName_1tdra_13", Pg = "_cell_1tdra_30", jg = "_chain_1tdra_45", Dg = "_owner_1tdra_51", Og = "_mono_1tdra_57", Hg = "_compactCell_1tdra_79", Fg = "_stack_1tdra_96", qg = "_stat_1tdra_103", Wg = "_identityLine_1tdra_110", zg = "_identity_1tdra_110", Kg = "_ownerLine_1tdra_140", Gg = "_link_1tdra_160", Ug = "_gateMark_1tdra_166", Vg = "_emptyChain_1tdra_171", Yg = "_arrow_1tdra_177", Jg = "_muted_1tdra_182", Xg = "_define_1tdra_187", Qg = "_statValue_1tdra_194", Zg = "_policyId_1tdra_200", ey = "_sub_1tdra_205", g = {
  row: Eg,
  name: Ig,
  compactRow: Mg,
  compactName: Bg,
  cell: Pg,
  chain: jg,
  owner: Dg,
  mono: Og,
  compactCell: Hg,
  stack: Fg,
  stat: qg,
  identityLine: Wg,
  identity: zg,
  ownerLine: Kg,
  link: Gg,
  gateMark: Ug,
  emptyChain: Vg,
  arrow: Yg,
  muted: Jg,
  define: Xg,
  statValue: Qg,
  policyId: Zg,
  sub: ey
};
function Un(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function ay(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function ty(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Vn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function ny(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Vn(e.members)}`;
}
function ry(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: F(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: ny(e) })
  ] }) });
}
function Yn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function ly(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = da(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function oy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Yn, { name: l.name, gate: l.gate === !0, look: ly(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function iy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : oy(e) });
}
function Jn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ft(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Jn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function sy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function cy(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function dy({ stream: e, href: a, presentation: n }) {
  const r = ty(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Un, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    ry(e, a),
    iy(e),
    Ft(cy(e.agents), e.agents === void 0 ? void 0 : ay(e.agents), "—"),
    sy(e.policy),
    Ft(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function uy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function $R(e) {
  if (uy(e)) return dy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: Un, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: F(n), children: a.name }),
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
const my = "_row_2u4ll_2", hy = "_name_2u4ll_16", wy = "_scope_2u4ll_24", Sa = {
  row: my,
  name: hy,
  scope: wy
};
function ut(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function fy(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function _y(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function vy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function by({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ut(e) });
}
function py({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function gy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function CR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = _y(e, n), s = gy(n);
  return /* @__PURE__ */ o(s, { className: fy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(vy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(py, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(by, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const yy = "_strip_4ppv9_2", Ny = "_well_4ppv9_11", ky = "_head_4ppv9_18", $y = "_name_4ppv9_24", Cy = "_chart_4ppv9_32", Sy = "_segment_4ppv9_38", Ry = "_detailedChart_4ppv9_44", Ty = "_rail_4ppv9_57", xy = "_section_4ppv9_63", Ly = "_label_4ppv9_74", Ay = "_note_4ppv9_91", K = {
  strip: yy,
  well: Ny,
  head: ky,
  name: $y,
  chart: Cy,
  segment: Sy,
  detailedChart: Ry,
  rail: Ty,
  section: xy,
  label: Ly,
  note: Ay
}, Ey = "No item in flight to preview.", Iy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", My = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ra = 100;
function By(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Py({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: By(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function jy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Dy({ identities: e }) {
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
function Xn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function wa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function Oy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? Ey }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Da, { item: { ...e, streamStep: da(n.streamStep) }, onOpen: Xn(r), feed: null }) });
}
function Hy({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(De, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Fy(e) {
  const a = jy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(wa, { label: "Board card", children: /* @__PURE__ */ t(Oy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(wa, { label: "Streams index row", children: /* @__PURE__ */ t(Hy, { draft: n }) }),
    /* @__PURE__ */ o(wa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Dy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: Iy })
    ] }),
    /* @__PURE__ */ t(wa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: My }) })
  ] });
}
function qy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(De, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(Da, { item: { ...a, streamStep: e.streamStep }, onOpen: Xn(r) }) }),
    /* @__PURE__ */ t(Py, { draft: e, streams: n })
  ] });
}
function SR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Fy, { ...e }) : /* @__PURE__ */ t(qy, { ...e });
}
const Wy = "_row_ixlg5_6", zy = "_headCell_ixlg5_10", Ky = "_cell_ixlg5_11", Gy = "_name_ixlg5_23", Uy = "_consequence_ixlg5_29", Vy = "_governed_ixlg5_36", Yy = "_control_ixlg5_42", Jy = "_byRole_ixlg5_48", Xy = "_webControl_ixlg5_59", Qy = "_webConsequence_ixlg5_65", Zy = "_webGoverned_ixlg5_71", H = {
  row: Wy,
  headCell: zy,
  cell: Ky,
  name: Gy,
  consequence: Uy,
  governed: Vy,
  control: Yy,
  byRole: Jy,
  webControl: Xy,
  webConsequence: Qy,
  webGoverned: Zy
};
function eN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: H.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: H.control, children: [
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
function aN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(eN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function tN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function nN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${H.webControl} ${H.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ge,
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
function rN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ o("td", { className: H.cell, children: [
      /* @__PURE__ */ t("span", { className: H.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${H.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t(nN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: H.cell, children: /* @__PURE__ */ t("span", { className: `${H.webGoverned} ward-cellmeta`, children: tN(e) }) })
  ] });
}
function RR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(rN, { ...e }) : /* @__PURE__ */ t(aN, { ...e });
}
const lN = "_row_vv64h_2", oN = "_cell_vv64h_6", iN = "_name_vv64h_25", sN = "_note_vv64h_30", cN = "_webName_vv64h_41", dN = "_webMeta_vv64h_47", V = {
  row: lN,
  cell: oN,
  name: iN,
  note: sN,
  webName: cN,
  webMeta: dN
}, Qn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function uN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function mN({ component: e, onRestart: a }) {
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
function hN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: uN(e.state) });
}
function wN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Qn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(hN, { component: e, onRestart: a }) })
  ] });
}
function TR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(wN, { ...e }) : /* @__PURE__ */ t(mN, { ...e });
}
const fN = "_row_jcm5k_7", _N = "_cell_jcm5k_11", vN = "_next_jcm5k_28", bN = "_headCell_jcm5k_38", pN = "_webId_jcm5k_77", gN = "_webPurpose_jcm5k_83", yN = "_webMeta_jcm5k_91", NN = "_webUrgent_jcm5k_97", q = {
  row: fN,
  cell: _N,
  next: vN,
  headCell: bN,
  webId: pN,
  webPurpose: gN,
  webMeta: yN,
  webUrgent: NN
}, kN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, $N = {
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
], CN = Object.fromEntries(Zn.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = CN[e];
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
function xR() {
  return /* @__PURE__ */ t("tr", { children: Zn.map((e) => /* @__PURE__ */ t(
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
function SN({ cred: e }) {
  const a = kN[e.state];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ut(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: q.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function RN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ${q.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function TN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(RN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...$N[e.state] }) })
  ] });
}
function LR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(TN, { ...e }) : /* @__PURE__ */ t(SN, { ...e });
}
const xN = "_card_17zba_2", LN = "_head_17zba_11", AN = "_env_17zba_18", EN = "_version_17zba_25", IN = "_meta_17zba_32", MN = "_webCard_17zba_37", BN = "_webRow_17zba_47", PN = "_webTitle_17zba_55", jN = "_webLine_17zba_65", DN = "_webVersion_17zba_72", ON = "_webMeta_17zba_77", U = {
  card: xN,
  head: LN,
  env: AN,
  version: EN,
  meta: IN,
  webCard: MN,
  webRow: BN,
  webTitle: PN,
  webLine: jN,
  webVersion: DN,
  webMeta: ON
}, qt = { dev: "Dev", uat: "UAT", prod: "Prod" }, er = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function HN({ env: e }) {
  const a = er[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function FN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function qN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...er[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: FN(e) })
  ] });
}
function AR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(qN, { ...e }) : /* @__PURE__ */ t(HN, { ...e });
}
const WN = "_panel_1hmja_2", zN = "_line_1hmja_8", KN = "_actions_1hmja_14", fa = {
  panel: WN,
  line: zN,
  actions: KN
};
function ER(e) {
  return /* @__PURE__ */ o("div", { className: fa.panel, children: [
    /* @__PURE__ */ t("p", { className: fa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: fa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: fa.line, children: e.note ?? "" })
  ] });
}
const GN = "_upload_13fcl_2", UN = "_preview_13fcl_7", VN = "_mark_13fcl_17", YN = "_empty_13fcl_22", JN = "_actions_13fcl_28", XN = "_input_13fcl_33", QN = "_reasons_13fcl_41", ZN = "_reason_13fcl_41", e1 = "_accepted_13fcl_57", te = {
  upload: GN,
  preview: UN,
  mark: VN,
  empty: YN,
  actions: JN,
  input: XN,
  reasons: QN,
  reason: ZN,
  accepted: e1
}, ar = 1.5, tr = 22, Ta = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ar}px at ${tr}px`], a1 = [Se[1], Se[2], Ta, Ie], t1 = /* @__PURE__ */ new Map([
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
]), n1 = "http://www.w3.org/2000/svg", r1 = "http://www.w3.org/2000/xmlns/", l1 = /* @__PURE__ */ new Set([
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
]), o1 = /* @__PURE__ */ new Set([
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
]), mt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, i1 = /url\s*\(|['"\\]/i;
function s1() {
  return { ok: !1, reasons: [Se[1]] };
}
function nr(e) {
  return e.namespaceURI === n1;
}
function c1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && nr(a) ? a : null;
  } catch {
    return null;
  }
}
function d1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function u1(e) {
  return t1.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function m1(e) {
  return i1.test(e.replace(mt, ""));
}
function h1(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || m1(e.value) ? Ie : void 0;
}
function w1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(u1(n));
    for (const r of Array.from(n.attributes)) a.add(h1(r));
  }
  return a1.filter((n) => a.has(n));
}
function f1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? tr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ar;
  }) ? [Se[3]] : [];
}
function _1(e) {
  if (e.namespaceURI === r1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (o1.has(a) || a.startsWith("stroke"));
}
function v1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && nr(a) && l1.has(a.localName);
}
function b1(e, a) {
  v1(a) ? a.nodeType === Node.ELEMENT_NODE && rr(a) : e.removeChild(a);
}
function rr(e) {
  for (const a of Array.from(e.attributes)) _1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) b1(e, a);
  return e;
}
function p1(e) {
  return Array.from(e.matchAll(mt), (a) => a[2]).filter((a) => a !== "");
}
function g1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function y1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of p1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function N1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(mt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function k1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = y1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), N1(l, r);
  }
  return e;
}
function IR(e) {
  const a = c1(e);
  if (a === null) return s1();
  const n = [...d1(a), ...w1(a), ...f1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(k1(rr(a), g1(e))) };
}
const $1 = "Mark accepted.", C1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, S1 = new Set(Qt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function R1(e) {
  return e !== void 0 && (C1.test(e) || S1.has(e)) ? e : void 0;
}
function T1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": R1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function x1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function L1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function A1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: $1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function E1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(A1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${x1(e, n)}`, role: "status", children: L1(e, n) });
}
function Wt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function MR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(T1, { current: e }),
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
    /* @__PURE__ */ t(E1, { result: s, presentation: r })
  ] });
}
const I1 = "_row_o3t6y_7", M1 = "_cell_o3t6y_11", B1 = "_head_o3t6y_28", P1 = "_name_o3t6y_34", j1 = "_pinned_o3t6y_42", D1 = "_headCell_o3t6y_49", O1 = "_webName_o3t6y_88", H1 = "_webMeta_o3t6y_95", F1 = "_webWarn_o3t6y_103", P = {
  row: I1,
  cell: M1,
  head: B1,
  name: P1,
  pinned: j1,
  headCell: D1,
  webName: O1,
  webMeta: H1,
  webWarn: F1
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
], q1 = Object.fromEntries(lr.map((e) => [e.key, e]));
function W1(e, a) {
  return `mcp.${e}.${a}`;
}
function z1(e) {
  return Object.keys(ht).includes(e);
}
function K1(e) {
  return ht[e !== void 0 && z1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = q1[e];
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
function BR() {
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
function G1({ server: e }) {
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
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => W1(e.name, n)).join(" · ") })
  ] });
}
function U1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function V1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Y1({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function J1({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function X1({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Q1({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: U1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...V1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(Y1, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...K1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(J1, { server: e, onRestart: a }),
      /* @__PURE__ */ t(X1, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function PR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Q1, { ...e }) : /* @__PURE__ */ t(G1, { ...e });
}
const Z1 = "_row_1ibo7_2", ek = "_headCell_1ibo7_14", ak = "_cell_1ibo7_15", tk = "_name_1ibo7_26", nk = "_consequence_1ibo7_32", rk = "_reason_1ibo7_38", lk = "_value_1ibo7_44", ok = "_webRow_1ibo7_60", ik = "_webSetting_1ibo7_73", sk = "_webName_1ibo7_81", ck = "_webConsequence_1ibo7_89", dk = "_webControl_1ibo7_95", uk = "_webState_1ibo7_109", mk = "_webChip_1ibo7_114", I = {
  row: Z1,
  headCell: ek,
  cell: ak,
  name: tk,
  consequence: nk,
  reason: rk,
  value: lk,
  webRow: ok,
  webSetting: ik,
  webName: sk,
  webConsequence: ck,
  webControl: dk,
  webState: uk,
  webChip: mk
}, or = 104, ir = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function hk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Nn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function wk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = ir[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(hk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: or }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function sr(e, a) {
  return String(e ?? a);
}
function fk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function _k(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? sr(e.value, "—");
}
function vk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function bk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(vk, { ...e });
  const l = fk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Nn, { options: l, value: sr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: _k(a) });
}
function pk({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(bk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: or }, children: /* @__PURE__ */ t(h, { ...ir[n], size: "tag" }) })
  ] });
}
function jR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(pk, { ...e }) : /* @__PURE__ */ t(wk, { ...e });
}
const gk = "_label_h9m4w_7", yk = "_name_h9m4w_15", Nk = "_column_h9m4w_24", kk = "_webFrame_h9m4w_57", $k = "_webHead_h9m4w_62", Ck = "_webHeadLabel_h9m4w_74", Sk = "_webLabel_h9m4w_117", Rk = "_webColumns_h9m4w_124", Tk = "_webGroup_h9m4w_130", xk = "_webPeople_h9m4w_131", Lk = "_webVia_h9m4w_132", Ak = "_webMeta_h9m4w_161", W = {
  label: gk,
  name: yk,
  column: Nk,
  webFrame: kk,
  webHead: $k,
  webHeadLabel: Ck,
  webLabel: Sk,
  webColumns: Rk,
  webGroup: Tk,
  webPeople: xk,
  webVia: Lk,
  webMeta: Ak
}, Ek = {
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
      className: W.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Ik(e) {
  if (!e.matrixRole) return;
  const a = Ek[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Mk({ node: e }) {
  const a = Ik(e);
  return /* @__PURE__ */ o("span", { className: W.label, children: [
    /* @__PURE__ */ t("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ t(Bk, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Bk({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Pk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(Mk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function jk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Dk() {
  return /* @__PURE__ */ o("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: W.webColumns, children: [
      /* @__PURE__ */ t("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function Ok({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Hk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Fk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Dk, {}),
    /* @__PURE__ */ t(km, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Rn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(Ok, { row: n }),
        detail: /* @__PURE__ */ t(jk, { row: n }),
        expanded: Hk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function DR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Fk, { ...e }) : /* @__PURE__ */ t(Pk, { ...e });
}
const qk = "_runbook_b9agc_2", Wk = "_list_b9agc_7", zk = "_step_b9agc_15", Kk = "_numeral_b9agc_21", Gk = "_body_b9agc_28", Uk = "_head_b9agc_34", Vk = "_title_b9agc_40", Yk = "_detail_b9agc_45", Jk = "_actions_b9agc_50", Xk = "_webList_b9agc_56", Qk = "_webStep_b9agc_60", Zk = "_webBody_b9agc_66", e$ = "_webTitle_b9agc_74", a$ = "_webDetail_b9agc_78", A = {
  runbook: qk,
  list: Wk,
  step: zk,
  numeral: Kk,
  body: Gk,
  head: Uk,
  title: Vk,
  detail: Yk,
  actions: Jk,
  webList: Xk,
  webStep: Qk,
  webBody: Zk,
  webTitle: e$,
  webDetail: a$
}, cr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function dr(e) {
  return String(e + 1).padStart(2, "0");
}
function t$({ step: e, index: a, connection: n }) {
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
function n$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(t$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function r$({ step: e, index: a, connection: n }) {
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
function l$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(r$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function OR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(l$, { ...e }) : /* @__PURE__ */ t(n$, { ...e });
}
const o$ = "_list_1gu6a_2", i$ = "_check_1gu6a_10", s$ = "_body_1gu6a_16", c$ = "_text_1gu6a_23", d$ = "_pending_1gu6a_32", u$ = "_measured_1gu6a_37", Qe = {
  list: o$,
  check: i$,
  body: s$,
  text: c$,
  pending: d$,
  measured: u$
};
function m$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function h$({ check: e }) {
  const a = m$(e.passed);
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
function HR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(h$, { check: a }, a.text)) });
}
const w$ = "_root_a6xzy_2", f$ = "_list_a6xzy_10", _$ = "_line_a6xzy_21", v$ = "_at_a6xzy_48", b$ = "_text_a6xzy_52", p$ = "_foot_a6xzy_56", g$ = "_idle_a6xzy_68", y$ = "_caret_a6xzy_76", N$ = "_jump_a6xzy_83", he = {
  root: w$,
  list: f$,
  line: _$,
  at: v$,
  text: b$,
  foot: p$,
  idle: g$,
  caret: y$,
  jump: N$
}, k$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function wt(e) {
  return Number.isNaN(Date.parse(e)) ? "" : k$.format(new Date(e));
}
const $$ = { warn: "warning", ok: "ok" };
function C$({ kind: e }) {
  const a = $$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function S$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${wt(e)}` });
}
function R$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${wt(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(S$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const T$ = 8;
function x$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > T$;
}
function L$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const ur = Te(null);
function FR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Vt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(ur.Provider, { value: i, children: n });
}
function A$() {
  const e = Re(ur), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function qR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = A$(), [u, m] = p(!1), w = e.at(-1);
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
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (y) => m(x$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: wt(y.at) }),
      /* @__PURE__ */ t(C$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(R$, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(L$, { shown: u, onJump: v })
    ] })
  ] });
}
const E$ = "_row_1k8wl_2", I$ = "_head_1k8wl_14", M$ = "_author_1k8wl_20", B$ = "_eta_1k8wl_25", P$ = "_edited_1k8wl_26", j$ = "_body_1k8wl_32", D$ = "_reason_1k8wl_37", O$ = "_actions_1k8wl_42", Ne = {
  row: E$,
  head: I$,
  author: M$,
  eta: B$,
  edited: P$,
  body: j$,
  reason: D$,
  actions: O$
}, H$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function F$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function q$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function W$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function z$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function K$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(q$, { ...e }) : /* @__PURE__ */ t(W$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function WR(e) {
  const { comment: a } = e;
  z$(e);
  const n = N(), r = `${n}-unavailable`, l = H$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: F$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(K$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const G$ = "_root_rvhdw_2", U$ = "_attach_rvhdw_11", V$ = "_actions_rvhdw_17", Y$ = "_reply_rvhdw_23", J$ = "_replyField_rvhdw_28", X$ = "_send_rvhdw_54", Q$ = "_sendIcon_rvhdw_65", Z$ = "_sendsAs_rvhdw_75", Be = {
  root: G$,
  attach: U$,
  actions: V$,
  reply: Y$,
  replyField: J$,
  send: X$,
  sendIcon: Q$,
  sendsAs: Z$
};
function mr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function e0() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function a0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function t0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = mr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    a0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(e0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function zR(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(t0, { ...e }) : /* @__PURE__ */ t(n0, { ...e });
}
function n0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = mr(e);
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
const r0 = "_list_1yhks_2", l0 = "_item_1yhks_6", o0 = "_body_1yhks_22", i0 = "_text_1yhks_28", s0 = "_evidence_1yhks_37", c0 = "_consequence_1yhks_49", d0 = "_note_1yhks_54", ze = {
  list: r0,
  item: l0,
  body: o0,
  text: i0,
  evidence: s0,
  consequence: c0,
  note: d0
};
function u0({ criterion: e }) {
  return /* @__PURE__ */ t(De, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function zt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function m0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function h0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: ze.body, children: [
    /* @__PURE__ */ t("span", { className: ze.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(zt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: ze.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(zt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: ze.consequence, children: m0(e.why) })
    ] })
  ] });
}
function w0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: ze.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(u0, { criterion: e }),
    /* @__PURE__ */ t(h0, { criterion: e })
  ] });
}
function KR({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(w0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: ze.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const f0 = "_list_dwhoz_2", _0 = "_rung_dwhoz_6", v0 = "_name_dwhoz_18", b0 = "_actor_dwhoz_32", pa = {
  list: f0,
  rung: _0,
  name: v0,
  actor: b0
}, p0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function g0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = p0[e.state];
  return /* @__PURE__ */ o("li", { className: pa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: pa.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${pa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function GR({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${pa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(g0, { rung: a }, a.name)) });
}
const y0 = "_sheet_pw37w_2", N0 = "_title_pw37w_9", k0 = "_stage_pw37w_15", $0 = "_effects_pw37w_20", C0 = "_effect_pw37w_20", S0 = "_numeral_pw37w_31", R0 = "_effectText_pw37w_38", T0 = "_refusals_pw37w_43", x0 = "_reasons_pw37w_52", L0 = "_reason_pw37w_52", A0 = "_actions_pw37w_62", ue = {
  sheet: y0,
  title: N0,
  stage: k0,
  effects: $0,
  effect: C0,
  numeral: S0,
  effectText: R0,
  refusals: T0,
  reasons: x0,
  reason: L0,
  actions: A0
};
function E0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function UR({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
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
      ou,
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
      /* @__PURE__ */ t(E0, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const I0 = "_list_1rowi_2", M0 = "_path_1rowi_7", B0 = "_head_1rowi_21", P0 = "_label_1rowi_28", j0 = "_consequence_1rowi_35", D0 = "_ask_1rowi_36", ea = {
  list: I0,
  path: M0,
  head: B0,
  label: P0,
  consequence: j0,
  ask: D0
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
function O0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Gt(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function H0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Kt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Kt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(O0, { path: e, primary: a, onChoose: n })
  ] });
}
function VR({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(H0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const F0 = "_list_1m7i0_2", q0 = "_item_1m7i0_6", W0 = "_node_1m7i0_18", z0 = "_body_1m7i0_24", K0 = "_head_1m7i0_30", G0 = "_stage_1m7i0_36", U0 = "_version_1m7i0_41", V0 = "_sentence_1m7i0_49", Y0 = "_meta_1m7i0_54", $e = {
  list: F0,
  item: q0,
  node: W0,
  body: z0,
  head: K0,
  stage: G0,
  version: U0,
  sentence: V0,
  meta: Y0
}, J0 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function X0({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function Q0({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(De, { size: 9, kind: J0[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(X0, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function YR({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(Q0, { entry: a }, a.stage + String(n))) });
}
const Z0 = "_thread_1e70p_3", eC = "_turn_1e70p_8", aC = "_who_1e70p_27", tC = "_body_1e70p_32", ga = {
  thread: Z0,
  turn: eC,
  who: aC,
  body: tC
}, hr = Te(!1);
function JR({ children: e, density: a }) {
  return /* @__PURE__ */ t(hr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ga.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function XR({ turn: e }) {
  if (!Re(hr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ga.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ga.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ga.body} ward-chat-body`, children: e.body })
  ] });
}
const nC = "_list_yiolt_3", rC = "_row_yiolt_7", lC = "_label_yiolt_20", oC = "_n_yiolt_26", iC = "_cause_yiolt_33", oa = {
  list: nC,
  row: rC,
  label: lC,
  n: oC,
  cause: iC
};
function sC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const cC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function dC({ row: e, formatNumber: a }) {
  return sC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(De, { size: 8, ...cC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(uC, { cause: e.cause })
  ] });
}
function uC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function QR({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(dC, { row: n, formatNumber: a }, n.label)) });
}
const mC = "_root_1jxwp_2", hC = {
  root: mC
};
function ZR({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: hC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Oa, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const wC = "_row_dhbre_3", fC = "_key_dhbre_13", _C = "_stack_dhbre_24", vC = "_value_dhbre_32", bC = "_evidence_dhbre_39", pC = "_mark_dhbre_47", Xe = {
  row: wC,
  key: fC,
  stack: _C,
  value: vC,
  evidence: bC,
  mark: pC
};
function gC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(lt, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function e2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(gC, { state: e.state }) })
  ] });
}
const yC = "_cell_gh2sd_2", NC = {
  cell: yC
}, kC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function $C(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function CC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function SC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: $C(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function RC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function a2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  CC(e, n);
  const r = RC(e);
  return /* @__PURE__ */ t(
    gu,
    {
      label: "Rejection routing",
      columns: kC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: NC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: SC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(ih, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const TC = "_row_1f2re_2", xC = "_title_1f2re_12", LC = "_turns_1f2re_18", AC = "_waiting_1f2re_19", EC = "_resolved_1f2re_20", IC = "_activity_1f2re_21", MC = "_cost_1f2re_28", BC = "_link_1f2re_29", PC = "_tableLink_1f2re_47", jC = "_tableRecord_1f2re_48", DC = "_tableRow_1f2re_59", OC = "_tableTitle_1f2re_71", HC = "_tableResolved_1f2re_76", FC = "_tableMeta_1f2re_87", qC = "_tableCost_1f2re_94", WC = "_tableActivity_1f2re_95", zC = "_tableState_1f2re_105", O = {
  row: TC,
  title: xC,
  turns: LC,
  waiting: AC,
  resolved: EC,
  activity: IC,
  cost: MC,
  link: BC,
  tableLink: PC,
  tableRecord: jC,
  tableRow: DC,
  tableTitle: OC,
  tableResolved: HC,
  tableMeta: FC,
  tableCost: qC,
  tableActivity: WC,
  tableState: zC
}, wr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function KC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function GC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function UC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const VC = { duplicate: "Closed · duplicate" };
function YC({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: O.tableMeta, text: `waiting on ${e}` });
}
function JC({ value: e }) {
  return /* @__PURE__ */ t("td", { className: O.tableCost, children: e === void 0 ? null : ne(e) });
}
function XC({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${O.tableRecord} ward-target`, href: F(e.href), children: `→ ${e.key}` });
}
function QC({ session: e, href: a }) {
  const n = wr[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${O.tableLink} ward-target`, href: F(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: O.tableMeta, children: GC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      UC(e.resolved),
      /* @__PURE__ */ t(YC, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(JC, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: O.tableActivity, children: KC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: VC[e.state] ?? n.label }),
      /* @__PURE__ */ t(XC, { link: e.link })
    ] }) })
  ] });
}
function ZC({ session: e }) {
  const a = wr[e.state];
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
function t2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(QC, { session: e.session, href: e.href }) : /* @__PURE__ */ t(ZC, { session: e.session });
}
const eS = "_block_1yy2v_3", aS = "_list_1yy2v_9", tS = "_line_1yy2v_14", et = {
  block: eS,
  list: aS,
  line: tS
}, nS = { warn: "warning", ok: "ok" };
function rS({ kind: e }) {
  const a = nS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function lS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(rS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function n2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(lS, { line: n }, `${r}-${n.text}`)) }) });
}
const oS = "_band_tt7hp_1", iS = "_head_tt7hp_8", sS = "_cell_tt7hp_19", cS = "_index_tt7hp_35", dS = "_title_tt7hp_42", uS = "_note_tt7hp_48", mS = "_cellTitle_tt7hp_53", hS = "_cellBody_tt7hp_58", wS = "_tag_tt7hp_64", ye = {
  band: oS,
  head: iS,
  cell: sS,
  index: cS,
  title: dS,
  note: uS,
  cellTitle: mS,
  cellBody: hS,
  tag: wS
}, Ut = 4;
function r2({ index: e, title: a, note: n, cells: r }) {
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
  CS as ACCENT_PRESETS,
  zS as ActionStack,
  qR as ActivityConsole,
  MS as AdminIcon,
  k_ as AgentCard,
  BS as AppShell,
  SR as AppearanceStrip,
  r2 as Band,
  FS as BarChart,
  Fh as BoardColumn,
  lR as BoardFootnote,
  oR as BoardHeader,
  ES as BoardIcon,
  XS as BoardScroller,
  b as Btn,
  $S as CHIP_ROLES,
  Zn as CREDENTIAL_COLUMNS,
  HS as Callout,
  RR as CapabilityRow,
  XR as ChatMessage,
  nn as Checkbox,
  h as Chip,
  ta as ClampText,
  WR as ClarificationRow,
  _R as ClauseRuleRow,
  fR as ClauseRules,
  In as ColourLadder,
  TR as ComponentRow,
  zR as Composer,
  sR as ConfigRow,
  iR as ConfigRowHead,
  ot as ConnectionMark,
  FR as ConsoleAnnounceProvider,
  JR as Conversation,
  ou as CostMeter,
  LR as CredentialRow,
  xR as CredentialRowHead,
  KR as CriteriaList,
  Ni as Crumb,
  SS as DENSITIES,
  QR as DeliveryHealth,
  eR as DeniedState,
  LS as DisabledScope,
  bR as DryRunRail,
  ih as EmptyState,
  AR as EnvCard,
  M as Field,
  ZS as FilteredEmpty,
  YS as FormStack,
  Oa as GateChecklist,
  GR as GateLadder,
  gu as Grid,
  gR as HandoffRuleRow,
  pR as HandoffRules,
  AS as HomeIcon,
  cR as ItemDrawer,
  ER as KeyPanel,
  Mr as LIVE_EVENT_TYPES,
  Kf as LegacyBoardColumn,
  uR as LegacyBoardHeader,
  mR as LegacyConfigRow,
  wR as LegacyItemDrawer,
  Df as LegacyOverCapNote,
  hR as LegacyPreviewRail,
  Ln as LegacyWorkCard,
  xe as LiveIndicator,
  aR as LoadFailed,
  rR as Loading,
  lr as MCP_SERVER_COLUMNS,
  lt as Mark,
  MR as MarkUpload,
  De as Marker,
  PR as McpServerRow,
  BR as McpServerRowHead,
  Fs as Menu,
  Ts as MenuButton,
  yR as NewStreamModal,
  dh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  vR as PARTIAL_STEP_REASON,
  or as POLICY_CHIP_WIDTH,
  GS as PageFrame,
  OS as PageHeader,
  qS as PlainList,
  jR as PolicyRow,
  dR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Kn as RULE_ACTIONS,
  $n as Radio,
  ZR as ReadyChecklist,
  VS as RecordSection,
  UR as RequeueSheet,
  VR as ResolveBlock,
  e2 as ResolvedFieldRow,
  DR as RoleMatrixRow,
  a2 as RoutingTable,
  NR as RuleRow,
  OR as RunbookSteps,
  Ir as STREAM_STEPS,
  JS as SectionBand,
  At as SectionHeader,
  Nn as SegmentedControl,
  mn as Select,
  t2 as SessionRow,
  DS as Sidebar,
  kR as StageColumn,
  QS as StageGrid,
  YR as StageHistory,
  rp as StageListEditor,
  tR as StaleStrip,
  Pa as StatStrip,
  $R as StreamRow,
  IS as StudioIcon,
  US as SubjectRail,
  Ge as Switch,
  jS as TabLinks,
  WS as TableHead,
  PS as Tabs,
  gS as ThemeProvider,
  CR as ToolRow,
  KS as TopBar,
  km as Tree,
  Rn as TreeRow,
  n2 as TypedInputBlock,
  _o as UNSAFE_HREF,
  HR as ValidationList,
  bS as VisibilityProvider,
  pS as Visible,
  kS as WARD_VERSION,
  Da as WorkCard,
  nR as WriteUnavailableStrip,
  KC as agoSince,
  Nr as clock,
  yp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  NS as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  Z_ as ladderValidation,
  K1 as mcpConnectionChip,
  W1 as mcpToolName,
  ne as money,
  we as ms,
  Tn as ordered,
  Jt as ratio,
  uN as restartLabel,
  F as safeHref,
  de as stamp,
  tt as stream,
  TS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  Pr as streamHex,
  RS as streamVars,
  _a as useBorderFlash,
  je as useDisabledScope,
  Lr as useFocusTrap,
  xS as useLiveFeed,
  yS as useReturnFocus,
  xa as useRovingTabindex,
  nt as useTicker,
  kr as useVisible,
  z as v,
  IR as validateMark,
  da as validatedStep,
  Qt as validatedStreamSteps
};
