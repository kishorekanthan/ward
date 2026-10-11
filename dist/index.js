import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Yt, useContext as Re, createContext as Te, useState as p, useEffect as S, useCallback as X, useRef as f, useLayoutEffect as aa, useId as N, isValidElement as vr, Children as br, Fragment as pr } from "react";
import { createPortal as gr, flushSync as Jt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const _t = (e) => String(e).padStart(2, "0");
function at(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${_t(a % 60)}s` : `${Math.floor(n / 60)}h ${_t(n % 60)}m`;
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
function Xt(e, a) {
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
const Qt = Te(/* @__PURE__ */ new Set());
function kS({ hidden: e, children: a }) {
  const n = Yt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(Qt.Provider, { value: n, children: a });
}
function $r(e) {
  return !Re(Qt).has(e);
}
function $S({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: $r(e) ? a : n });
}
const Cr = "(prefers-color-scheme: dark)";
function vt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Cr) : null;
}
function Sr(e) {
  const [a, n] = p(() => {
    var r;
    return ((r = vt()) == null ? void 0 : r.matches) === !0;
  });
  return S(() => {
    const r = e ? vt() : null;
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
function CS({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Sr(e === "system");
  return Oa("data-theme", Rr(e, l)), Oa("data-accent", a), Oa("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Tr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function xr(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function Lr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Ar(e, a, n, r) {
  return e.shiftKey ? xr(a, n) ? r : void 0 : document.activeElement === r || Lr(a) ? n : void 0;
}
function Er(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Ar(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Ir(e) {
  return { onKeyDown: X(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Tr));
      Er(n, e.current, r);
    },
    [e]
  ) };
}
function SS(e, a = !0) {
  S(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const bt = { ArrowUp: -1, ArrowDown: 1 }, pt = { ArrowLeft: -1, ArrowRight: 1 }, Mr = (e, a, n) => Math.min(n, Math.max(a, e));
function Br(e, a) {
  if (a !== "horizontal" && e in bt) return bt[e];
  if (a !== "vertical" && e in pt) return pt[e];
}
function xa({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = f(/* @__PURE__ */ new Map()), l = f(!1);
  aa(() => {
    var w;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], _ = l.current;
    l.current = !1, n(m), _ && ((w = r.current.get(m)) == null || w.focus());
  });
  const i = X((u) => n(u), []), s = X((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = X(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const _ = Math.max(0, m.indexOf(a)), w = Br(u.key, e);
      w !== void 0 ? (u.preventDefault(), s(m[Mr(_ + w, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
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
const RS = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, TS = "0.2.0", xS = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Pr = [1, 2, 3, 4, 5, 6], Zt = [1, 2, 3], jr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], LS = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], AS = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
  return Pr.includes(e);
}
function Aa(e) {
  return Zt.includes(e);
}
function ES(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function IS(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const qr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Dr(e) {
  if (!La(e)) throw new Error("unvalidated stream step");
  return qr[e];
}
function gt(e) {
  return typeof e != "string" ? null : jr.includes(e) ? e : null;
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
function Wr(e, a, n) {
  const r = Or(e);
  if (r === null) return null;
  const l = gt(n) ?? gt(r.type);
  return l === null ? null : { ...r, type: l, id: Hr(r, a), at: Fr(r) };
}
function zr(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Kr(e, a, n) {
  return e >= we.heartbeat && !a && n !== null;
}
function MS(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = f(/* @__PURE__ */ new Map()), c = f(0), d = f(""), u = f(0), m = f(null), _ = f(0), w = f(0), y = f(!1), L = f("reconnecting"), B = X((R) => {
    L.current = R, r(R);
  }, []), le = X(() => {
    c.current = Date.now();
  }, []), Le = X((R) => {
    for (const [G, ge] of s.current)
      (ge === "*" || R.itemKey === ge) && G(R);
  }, []), ae = X(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, G, ge) => {
        const De = Wr(R, G, ge);
        De !== null && (De.id && (d.current = De.id), le(), y.current = !1, B("live"), i(De.at), Le(De));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, le(), B("live");
      },
      onError: () => {
        var G;
        (G = m.current) == null || G.close(), m.current = null, y.current = !0, L.current !== "stale" && B("reconnecting");
        const R = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, _.current = window.setTimeout(ae, R);
      }
    });
  }, [Le, B, le, a, e]), Ue = X((R) => {
    y.current = !0, R.close(), m.current = null, _.current = window.setTimeout(ae, we.reconnectBase);
  }, [ae]), Ve = X((R, G) => (s.current.set(G, R), () => {
    s.current.delete(G);
  }), []);
  return S(() => (ae(), w.current = window.setInterval(() => {
    const R = Date.now() - c.current, G = zr(R, L.current);
    G && B(G);
    const ge = m.current;
    Kr(R, y.current, ge) && Ue(ge);
  }, we.tick), () => {
    var R;
    window.clearInterval(w.current), window.clearTimeout(_.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
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
const Gr = { blue: "running", orange: "waiting", green: "done" };
function Ur() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function yt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function _a(e, a) {
  const n = f(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Ur() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Gr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => yt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => yt(s), we.flash)));
  }, [a, e]);
  return S(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Vr = "_root_1otpc_2", Yr = {
  root: Vr
};
function Jr(e, a, n, r, l) {
  const i = [at(a)];
  return e || i.push(`as of ${kr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function xe({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = nt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Jr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Yr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const Xr = "_app_mrptw_1", Qr = "_side_mrptw_30", Zr = "_sideTop_mrptw_42", el = "_sideBody_mrptw_56", al = "_iconRail_mrptw_67", tl = "_railItem_mrptw_76", nl = "_railIcon_mrptw_97", rl = "_railDot_mrptw_102", ll = "_railLetter_mrptw_108", ol = "_main_mrptw_113", il = "_rail_mrptw_76", sl = "_page_mrptw_131", cl = "_headerRow_mrptw_140", dl = "_sidebarToggle_mrptw_147", ul = "_headerSlot_mrptw_152", ml = "_drawerSide_mrptw_157", hl = "_root_mrptw_193", wl = "_topbar_mrptw_200", fl = "_mark_mrptw_211", _l = "_brand_mrptw_218", vl = "_tagline_mrptw_224", bl = "_identity_mrptw_230", pl = "_tools_mrptw_231", gl = "_nav_mrptw_241", yl = "_metadata_mrptw_248", Nl = "_actor_mrptw_263", kl = "_detail_mrptw_264", $l = "_content_mrptw_309", Cl = "_toolsPanel_mrptw_325", Sl = "_skip_mrptw_351", $ = {
  app: Xr,
  side: Qr,
  sideTop: Zr,
  sideBody: el,
  iconRail: al,
  railItem: tl,
  railIcon: nl,
  railDot: rl,
  railLetter: ll,
  main: ol,
  rail: il,
  page: sl,
  headerRow: cl,
  sidebarToggle: dl,
  headerSlot: ul,
  drawerSide: ml,
  root: hl,
  topbar: wl,
  mark: fl,
  brand: _l,
  tagline: vl,
  identity: bl,
  tools: pl,
  nav: gl,
  metadata: yl,
  actor: Nl,
  detail: kl,
  content: $l,
  toolsPanel: Cl,
  skip: Sl
};
function sa(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Rl = "_scope_1an6i_2", Tl = {
  scope: Rl
}, en = Te(null);
function BS({ reason: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Tl.scope} ward-disabled-scope`, children: [
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
const xl = "_btn_tzr89_2", Ll = "_primary_tzr89_14", Al = "_destructive_tzr89_25", El = "_secondary_tzr89_35", Il = "_ghost_tzr89_40", Ml = "_overflow_tzr89_49", Bl = "_sm_tzr89_56", Pl = "_disabled_tzr89_60", ua = {
  btn: xl,
  primary: Ll,
  destructive: Al,
  secondary: El,
  ghost: Il,
  overflow: Ml,
  sm: Bl,
  disabled: Pl
};
function jl(e, a, n, r) {
  const l = a === "sm" ? [ua.sm, "ward-btn--sm"] : [], i = n ? [ua.disabled] : [];
  return [ua.btn, ua[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ql(e, a) {
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
function Wl({ id: e, reason: a }) {
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
        className: jl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Fl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...ql(n, e.controls),
        children: zl(e)
      }
    ),
    /* @__PURE__ */ t(Wl, { id: s, reason: i })
  ] });
}
let rt = "none";
function Kl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (rt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Kl, !0), document.addEventListener("pointerdown", () => {
  rt = "pointer";
}, !0));
function Gl() {
  return rt === "key";
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
const Ul = "_scrim_1cawq_2", Vl = "_drawer_1cawq_10", Yl = "_sheet_1cawq_14", Jl = "_modal_1cawq_18", Xl = "_panel_1cawq_23", Ql = "_start_1cawq_44", Zl = "_header_1cawq_67", eo = "_title_1cawq_75", ao = "_body_1cawq_79", to = "_close_1cawq_106", Ce = {
  scrim: Ul,
  drawer: Vl,
  sheet: Yl,
  modal: Jl,
  panel: Xl,
  start: Ql,
  header: Zl,
  title: eo,
  body: ao,
  close: to
}, no = Te(null), ya = [], Na = /* @__PURE__ */ new Map();
function ro(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function lo(e, a) {
  let n = Na.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, Na.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function oo(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !ro(r) && lo(e, r);
}
function io(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (oo(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function so(e) {
  for (const a of e.claims) {
    const n = Na.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), Na.delete(a)));
  }
}
function co(e, a) {
  const n = { root: e, claims: [] };
  return ya.push(n), io(n, a), n;
}
function uo(e) {
  const a = ya.indexOf(e);
  a >= 0 && ya.splice(a, 1), so(e);
}
function Nt(e) {
  return e !== null && ya.at(-1) === e;
}
function mo(e, a, n) {
  const r = f(null), l = f(n);
  return l.current = n, S(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = co(i, a);
    return r.current = c, () => {
      var u, m;
      const d = Nt(c);
      uo(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), X(() => Nt(r.current), []);
}
function ho(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function wo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function fo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Ce.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Ce.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Ce.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function _o(e) {
  return `${Ce.scrim} ${Ce[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function vo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ce.panel} ${Ce[e]} ward-overlay-panel${n}${r}`;
}
function bo(e) {
  const a = Re(no);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = f(null), n = f(null), r = N(), l = bo(e.container), i = Ia("(min-width: 768px)"), s = ho(e.kind, i), c = wo(e, r), d = Ir(n), [u] = p(Gl), m = mo(a, l, e.returnFocusTo), _ = X(() => {
    m() && e.onClose();
  }, [e.onClose, m]);
  return S(() => {
    var w;
    m() && ((w = n.current) == null || w.focus());
  }, [m]), S(() => {
    const w = (y) => {
      y.key === "Escape" && _();
    };
    return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w);
  }, [_]), gr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: _o(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: _,
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
            className: vo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (w) => w.stopPropagation(),
            onKeyDown: (w) => m() && d.onKeyDown(w),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Ce.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: _, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(fo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const po = /^([a-z][a-z0-9+.-]*):/i, go = /* @__PURE__ */ new Set(["http", "https"]), yo = "#";
function No(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = po.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = No(e);
  return a === void 0 || go.has(a) ? e : yo;
}
function ko(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function an(e) {
  const a = ko(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function $o(e, a) {
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
function Co(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function tn(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Co(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), an(r);
  }, [e, a, n]);
}
const So = "_row_160e9_2", Ro = {
  row: So
};
function To(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ma({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = f(null), u = i ?? d;
  return $o(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Ro.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...To(l, r), ...c, children: a });
}
const xo = "_icon_1ylqy_2", Lo = {
  icon: xo
};
function ca({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Lo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function PS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function jS() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function qS() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function DS() {
  return /* @__PURE__ */ t(ca, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Ao() {
  return /* @__PURE__ */ o(ca, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const nn = "ward:sidebar-collapsed", Eo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Io() {
  try {
    return window.localStorage.getItem(nn) === "true";
  } catch {
    return !1;
  }
}
function Mo(e) {
  try {
    window.localStorage.setItem(nn, String(e));
  } catch {
  }
}
function Bo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Po(e) {
  return e instanceof Element && e.closest(Eo) !== null;
}
function jo(e) {
  return e.key === "[" && !Bo(e) && !Po(e.target);
}
function qo(e) {
  const [a, n] = p(Io), r = () => {
    Mo(!a), n(!a);
  };
  return S(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!jo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Do() {
  const e = Ia("(max-width: 791.98px)"), a = N(), n = f(null), [r, l] = p(!1);
  return r && !e && l(!1), { narrow: e, open: r, drawerId: a, slotRef: n, toggle: () => l(!r), close: () => l(!1) };
}
function Oo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Ho({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (!n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: e }) });
}
function Fo(e, a) {
  const n = e !== void 0 && !a, { collapsed: r, toggle: l } = qo(n);
  return { enabled: n, collapsed: n && r, toggle: l };
}
function Wo({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Ao, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function zo({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": tt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function Ko({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(zo, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function Go({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(Wo, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed, children: e }),
    r.collapsed && /* @__PURE__ */ t(Ko, { items: n ?? [], label: a })
  ] });
}
function Uo({ sidebar: e, header: a, children: n, rail: r, sidebarLabel: l, iconRail: i }) {
  const s = r != null, c = Do(), d = Fo(i, c.narrow), u = l ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(s), "data-collapsed": String(d.collapsed), children: [
    !c.narrow && /* @__PURE__ */ t(Go, { sidebar: e, label: u, iconRail: i, fold: d }),
    /* @__PURE__ */ o("main", { className: $.main, children: [
      /* @__PURE__ */ t(Oo, { header: a, label: u, drawer: c }),
      /* @__PURE__ */ t("div", { className: $.page, children: n })
    ] }),
    s && /* @__PURE__ */ t("div", { className: $.rail, children: r }),
    /* @__PURE__ */ t(Ho, { sidebar: e, label: u, drawer: c })
  ] });
}
function Vo({ destinations: e, active: a }) {
  const n = f(null);
  return tn(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
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
function OS(e) {
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
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = je(), l = ci(e, r);
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
          "aria-describedby": Ea(sa(n, e.describedBy), r),
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
function _i(e, a) {
  if (e === "stream") return vi(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = fi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function vi(e) {
  if (!e || !Aa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = tt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${wi.chip} ward-chip ward-chip--${e}`, style: _i(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const bi = "_clamp_zn74g_3", kt = {
  clamp: bi
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? kt.clamp : `${kt.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
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
const ma = 4;
function xi(e, a, n) {
  const r = Math.max(0, n - e.bottom - ma * 2), l = Math.max(0, e.top - ma * 2);
  return a <= r || r >= l ? { top: e.bottom + ma, maxHeight: r } : { top: e.top - ma - Math.min(a, l), maxHeight: l };
}
function Li(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Ai(e, a, n, r) {
  return { ...xi(e, a.height, n.height), left: Li(e, a.width, n.width, r) };
}
function va(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Ei(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", va(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ii(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function $t(e, a, n) {
  const r = Ii(e), l = Ei(e, a), i = Ai(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: va(i.left - l.box.left), top: va(i.top - l.box.top), maxHeight: va(i.maxHeight) }), r();
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
    const i = Mi(r), s = () => $t(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && $t(a.current, e.current, n);
  });
}
const Bi = "_root_axvxm_2", Pi = "_trigger_axvxm_7", ji = "_value_axvxm_32", qi = "_menu_axvxm_50", Di = "_find_axvxm_72", Oi = "_list_axvxm_88", Hi = "_option_axvxm_99", Fi = "_check_axvxm_118", Wi = "_empty_axvxm_129", fe = {
  root: Bi,
  trigger: Pi,
  value: ji,
  menu: qi,
  find: Di,
  list: Oi,
  option: Hi,
  check: Fi,
  empty: Wi
}, zi = 7;
function Ki(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Ct(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function Gi(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Ct(e.options, e.value)), d = (u) => {
    var m;
    Jt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: Ki(e.options, l),
    findable: e.options.length > zi,
    show: () => {
      e.disabled || (i(""), c(Ct(e.options, e.value)), r(!0));
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
function lt(e, a) {
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
      "aria-activedescendant": lt(e, a),
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
        "aria-activedescendant": a.findable ? void 0 : lt(a, n),
        onKeyDown: un(a, Yi(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(Qi, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: fe.empty, children: "No match" })
  ] });
}
function as(e, a) {
  const n = e.open ? lt(e, a) : void 0;
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
      ...Xi(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: fe.value, "data-placeholder": i || void 0, children: ts(e) })
    }
  );
}
function hn(e) {
  const a = je(), n = a ? { ...e, disabled: !0, "aria-describedby": Ea(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = f(null), s = f(null), c = f(null), d = Gi(n, s), u = Ui(d.open, c);
  return ln(d.open, i, () => d.close(!1)), as(d, l), /* @__PURE__ */ o("div", { ref: i, className: mn(fe.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ns, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(es, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const rs = "_field_13oav_2", ls = "_label_13oav_8", os = "_labelHidden_13oav_15", is = "_control_13oav_25", ss = "_mono_13oav_45", cs = "_area_13oav_50", ds = "_invalid_13oav_57", Pe = {
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
      onChange: e.onChange
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
    "aria-describedby": Ea(sa(l ? n : void 0, e.describedBy), r),
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
  const a = N(), n = `${a}-msg`, r = vs(e, a, n, je()), l = bs(e);
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
      Jt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
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
function js(e, a, n) {
  const r = Ps(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
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
function Ws({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: _e.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: _e.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(bn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function zs({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: _e.separator }) : e.kind === "group" ? /* @__PURE__ */ t(Ws, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(bn, { row: e.row, nav: a, popup: n });
}
function Ks() {
  const e = Re(fn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function Gs({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = Ks(), c = f(null);
  cn(s, c, n);
  const d = Ms(e), u = qs(d.flatMap(Bs).map((_) => _.item)), m = Os(u, r);
  return Hs(u, r), /* @__PURE__ */ o("div", { ref: c, className: _e.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: _e.menu, ...m, children: d.map((_, w) => /* @__PURE__ */ t(zs, { block: _, nav: u, popup: r }, w)) }),
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
const Ha = (e) => Number.parseFloat(e) || 0, St = (e) => e.getBoundingClientRect().width;
function Js(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Ha(a.paddingInlineStart) - Ha(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), St),
    more: n ? St(n) : 0,
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
function HS({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = xa({ orientation: "horizontal" }), s = ic(e, a);
  S(() => i.setActive(s), [i.setActive, s]);
  const c = f(null);
  pn(c, l);
  const d = Zs(c, s, e.map(yn).join(`
`)), u = d ? e.filter((m, _) => !d.includes(_)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Nn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, _) => /* @__PURE__ */ t(cc, { tab: m, active: a, place: mc(i, d, _), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${_e.trigger} ${ve.more} ${ve.probe}`, children: gn }),
    u.length > 0 && /* @__PURE__ */ t(uc, { tabs: u, trigger: i.itemProps(e.length), onPick: dc(c, n) })
  ] });
}
const Rt = 7;
function FS({ links: e, active: a, label: n, level: r }) {
  if (e.length > Rt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${Rt} — the set is fixed`);
  const l = f(null);
  return pn(l, r), tn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ma, { as: "nav", rowRef: l, className: Nn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const hc = "_root_v56ff_3", wc = "_segment_v56ff_9", Tt = {
  root: hc,
  segment: wc
};
function kn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = xa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return S(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ t("div", { className: `${Tt.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "radio",
      className: Tt.segment,
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
const fc = "_sidebar_s9o1j_3", _c = "_brand_s9o1j_9", vc = "_mark_s9o1j_17", bc = "_word_s9o1j_24", pc = "_nav_s9o1j_30", gc = "_navItem_s9o1j_39", yc = "_footLink_s9o1j_49", Nc = "_group_s9o1j_58", kc = "_groupName_s9o1j_65", $c = "_agents_s9o1j_81", Cc = "_agent_s9o1j_81", Sc = "_root_s9o1j_96", Rc = "_agentTop_s9o1j_105", Tc = "_dot_s9o1j_112", xc = "_agentName_s9o1j_124", Lc = "_agentMeta_s9o1j_138", Ac = "_foot_s9o1j_49", Ec = "_footName_s9o1j_150", Ic = "_footLinks_s9o1j_157", Mc = "_linkBrand_s9o1j_184", Bc = "_label_s9o1j_205", Pc = "_note_s9o1j_210", jc = "_footer_s9o1j_226", x = {
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
  footer: jc
};
function qc({ agent: e }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(qc, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(Dc, { shared: i })
  ] });
}
function Hc(e) {
  return e.destinations ?? e.items ?? [];
}
function Fc({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function Wc({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function zc({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function Kc(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(Fc, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: Hc(e).map((a) => /* @__PURE__ */ t(zc, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(Wc, { children: e.children })
  ] });
}
function Gc(e) {
  return "agents" in e;
}
function WS(e) {
  return Gc(e) ? /* @__PURE__ */ t(Oc, { ...e }) : /* @__PURE__ */ t(Kc, { ...e });
}
const Uc = "_mark_wlgi8_3", Vc = {
  mark: Uc
}, Yc = { met: "✓", unmet: "", failed: "✕" };
function ot({ state: e, label: a }) {
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
const Jc = "_marker_br9fi_2", Xc = {
  marker: Jc
}, Qc = {
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
}, Zc = { running: " ward-running" };
function qe({ size: e, kind: a, label: n }) {
  const r = { "--marker": Qc[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${Xc.marker} ward-marker ward-marker--${a}${Zc[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const ed = "_root_ti0pq_2", ad = "_chip_ti0pq_11", td = "_noCase_ti0pq_23", ha = {
  root: ed,
  chip: ad,
  noCase: td
};
function nd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function it({ connection: e, since: a, lastEventAt: n }) {
  const r = nd(a, n), l = nt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ha.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(qe, { size: 6, kind: "green" }),
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
const rd = "_root_u8ort_2", ld = "_context_u8ort_13", od = "_row_u8ort_1", id = "_heading_u8ort_27", sd = "_headingWrap_u8ort_35", cd = "_chips_u8ort_40", dd = "_title_u8ort_48", ud = "_consequence_u8ort_58", md = "_actionsWrap_u8ort_65", hd = "_actions_u8ort_65", wd = "_action_u8ort_65", fd = "_overflowPanel_u8ort_94", _d = "_measureClip_u8ort_105", vd = "_measure_u8ort_105", Y = {
  root: rd,
  context: ld,
  row: od,
  heading: id,
  headingWrap: sd,
  chips: cd,
  title: dd,
  consequence: ud,
  actionsWrap: md,
  actions: hd,
  action: wd,
  overflowPanel: fd,
  measureClip: _d,
  measure: vd
};
function bd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: Y.title, text: e }) : /* @__PURE__ */ t("h1", { className: Y.title, children: e });
}
function pd({ title: e, consequence: a, consequenceHint: n, density: r }) {
  return /* @__PURE__ */ o("div", { className: Y.heading, children: [
    /* @__PURE__ */ t(bd, { title: e, density: r }),
    a && /* @__PURE__ */ t("p", { className: Y.consequence, title: n, children: a })
  ] });
}
function Ya({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: Y.action, "data-action": "", children: a }, n));
}
function xt({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function gd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(xt, { disclosure: l }) : a ? [/* @__PURE__ */ t(xt, { disclosure: l }, "more"), /* @__PURE__ */ t(Ya, { actions: e }, "actions")] : /* @__PURE__ */ t(Ya, { actions: e });
}
function yd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Nd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ya, { actions: e }) });
}
function kd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function $d({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Y.context, children: [
    /* @__PURE__ */ t(Ri, { path: e }),
    a != null && a.length ? /* @__PURE__ */ t("div", { className: Y.chips, children: a.map((n) => /* @__PURE__ */ t(h, { ...n }, n.label)) }) : null
  ] });
}
function Cd(...e) {
  return e.some((a) => a === null);
}
function Sd(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function Rd(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + Sd(e);
}
function Td(e, a, n, r, l) {
  if (l === 0 || Cd(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - Rd(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function xd(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function Ld(e) {
  return vr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function Ad(e, a) {
  return a.length === 0 && e.length === 1 && Ld(e[0]);
}
function Ed(e, a) {
  const n = f(null), r = f(null), l = f(null), i = f(null), [s, c] = p(!1);
  return S(() => {
    const d = n.current;
    if (!xd(d)) return;
    const u = () => c(Td(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function Id({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: Y.measureClip, children: /* @__PURE__ */ o("div", { className: Y.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function Md({ connection: e }) {
  return e ? /* @__PURE__ */ t(it, { connection: e.connection, since: e.since }) : null;
}
function zS({ crumb: e, chips: a, title: n, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: m, headingRef: _, actionsRef: w, measureRef: y, collapsed: L } = Ed(i, Ad(i, s)), B = s.length > 0, { disclosure: le, close: Le } = kd(L || B, w), ae = yd(s, i, L, d);
  return /* @__PURE__ */ o("header", { className: Y.root, "data-density": u, children: [
    /* @__PURE__ */ t($d, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Y.row, ref: m, children: [
      /* @__PURE__ */ t("div", { ref: _, className: Y.headingWrap, children: /* @__PURE__ */ t(pd, { title: n, consequence: r, consequenceHint: l, density: u }) }),
      /* @__PURE__ */ o("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ t(Md, { connection: c }),
        /* @__PURE__ */ t("div", { className: Y.actions, ref: w, "data-ward-actions": !0, children: /* @__PURE__ */ t(gd, { actions: i, hasMore: B, collapsed: L, onOverflow: d, disclosure: le }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Nd, { actions: ae, disclosure: le, onEscape: Le }),
    /* @__PURE__ */ t(Id, { actions: i, hasMore: B, measureRef: y })
  ] });
}
const Bd = "_root_td96x_2", Pd = "_body_td96x_16", Lt = {
  root: Bd,
  body: Pd
};
function KS({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Lt.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Lt.body, children: n }) });
}
const jd = "_root_bf1pc_2", qd = "_table_bf1pc_9", Dd = "_caption_bf1pc_14", Od = "_series_bf1pc_23", Hd = "_category_bf1pc_31", Fd = "_cell_bf1pc_39", Wd = "_track_bf1pc_45", zd = "_lane_bf1pc_52", Kd = "_bar_bf1pc_56", Gd = "_value_bf1pc_63", Ud = "_swatch_bf1pc_70", Vd = "_empty_bf1pc_78", J = {
  root: jd,
  table: qd,
  caption: Dd,
  series: Od,
  category: Hd,
  cell: Fd,
  track: Wd,
  lane: zd,
  bar: Kd,
  value: Gd,
  swatch: Ud,
  empty: Vd
}, Yd = "—", At = 6;
function Jd(e, a) {
  if (a.length < 1 || a.length > At)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${At}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Xd(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function $n(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Qd(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Zd({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Qd(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function eu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": $n(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function au({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function tu({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Yd }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(eu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(Zd, { value: u.values[d], top: r, step: $n(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function GS(e) {
  Jd(e.categories, e.series);
  const a = Xd(e.series);
  return a === 0 ? /* @__PURE__ */ t(au, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(tu, { ...e, top: a });
}
const nu = "_root_1bfqw_2", ru = "_figure_1bfqw_7", lu = "_of_1bfqw_13", ou = "_bar_1bfqw_18", iu = "_rows_1bfqw_38", su = "_row_1bfqw_38", cu = "_label_1bfqw_49", du = "_amount_1bfqw_54", Ee = {
  root: nu,
  figure: ru,
  of: lu,
  bar: ou,
  rows: iu,
  row: su,
  label: cu,
  amount: du
};
function uu({ spent: e, ceiling: a, breakdown: n }) {
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
const mu = "_frame_9xel2_2", hu = "_table_9xel2_6", wu = "_th_9xel2_12", fu = "_td_9xel2_13", _u = "_sort_9xel2_48", vu = "_row_9xel2_60", bu = "_empty_9xel2_68", Me = {
  frame: mu,
  table: hu,
  th: wu,
  td: fu,
  sort: _u,
  row: vu,
  empty: bu
}, pu = { asc: "ascending", desc: "descending" };
function gu(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return pu[a.direction];
}
function yu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: Me.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Nu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ku({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: Me.th,
      style: Nu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": gu(e, a),
      children: yu(e, n)
    }
  );
}
function $u({ row: e, props: a }) {
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
function Cu({
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
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: Me.head, children: a.map((m) => /* @__PURE__ */ t(ku, { column: m, sort: c, onSort: d }, m.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((m) => /* @__PURE__ */ t($u, { row: m, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(m))) })
  ] }) });
}
const Su = "_list_v0s52_2", Ru = {
  list: Su
};
function US({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: Ru.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Tu = "_label_1u62a_2", xu = {
  label: Tu
};
function VS({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: xu.label, children: a.header }) }, a.key)) }) });
}
const Lu = "_stack_bp6a0_2", Au = {
  stack: Lu
};
function YS({ children: e }) {
  return /* @__PURE__ */ t("span", { className: Au.stack, "data-ward-action-stack": "", children: e });
}
const Eu = "_set_1z0sq_2", Iu = "_legend_1z0sq_7", Mu = "_row_1z0sq_15", Bu = "_control_1z0sq_20", Pu = "_input_1z0sq_26", ju = "_label_1z0sq_31", qu = "_consequence_1z0sq_36", Oe = {
  set: Eu,
  legend: Iu,
  row: Mu,
  control: Bu,
  input: Pu,
  label: ju,
  consequence: qu
};
function Cn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Oe.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: Oe.legend, children: e }),
    a.map((m) => {
      const _ = `${u}-${m.value}`, w = m.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Oe.row, children: [
        /* @__PURE__ */ o("span", { className: Oe.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: _,
              type: "radio",
              name: u,
              className: Oe.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": sa(w, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: _, className: Oe.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: w, className: `${Oe.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const Du = "_root_11gpw_2", Ou = "_head_11gpw_10", Hu = "_note_11gpw_29", Fu = "_index_11gpw_34", Wu = "_dot_11gpw_38", zu = "_counter_11gpw_49", Ku = "_trailing_11gpw_57", Fe = {
  root: Du,
  head: Ou,
  note: Hu,
  index: Fu,
  dot: Wu,
  counter: zu,
  trailing: Ku
};
function Gu({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${Fe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: Fe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Uu({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Fe.counter, "aria-hidden": "true", children: e }) : null;
}
function Et({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Fe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Fe.head, children: [
      /* @__PURE__ */ t(Gu, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: Fe.note, children: n }),
    /* @__PURE__ */ t(Uu, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: Fe.trailing, children: i })
  ] });
}
const Vu = "_strip_ww53x_2", Yu = "_cell_ww53x_7", Ju = "_value_ww53x_12", Xu = "_link_ww53x_29", Qu = "_label_ww53x_49", Ke = {
  strip: Vu,
  cell: Yu,
  value: Ju,
  link: Xu,
  label: Qu
};
function Zu(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Sn = (e) => `${Ke.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function em({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${Ke.label} ward-stat-label`, children: e.label })
  ] });
}
function am({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Ke.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Sn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Ke.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${Ke.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Pa({ cells: e, divided: a = !1 }) {
  return Zu(e), /* @__PURE__ */ t("dl", { className: `${Ke.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((n) => n.href === void 0 ? /* @__PURE__ */ t(em, { cell: n }, n.label) : /* @__PURE__ */ t(am, { cell: n, href: n.href }, n.label)) });
}
const tm = "_root_1eb1u_2", nm = "_track_1eb1u_8", rm = "_thumb_1eb1u_46", lm = "_labelHidden_1eb1u_64", om = "_label_1eb1u_64", im = "_lockedNote_1eb1u_84", We = {
  root: tm,
  track: nm,
  thumb: rm,
  labelHidden: lm,
  label: om,
  lockedNote: im
};
function sm(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function cm(e) {
  return e ? `${We.label} ${We.labelHidden}` : We.label;
}
function Ge({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = je(), { on: m, off: _ } = sm(a, r, l, u !== null);
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
        disabled: _,
        onClick: () => !_ && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: We.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: cm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: We.lockedNote, children: "always on" })
    ] })
  ] });
}
const dm = "_bar_1vp69_2", um = "_skip_1vp69_11", mm = "_mark_1vp69_22", hm = "_nav_1vp69_30", wm = "_list_1vp69_34", fm = "_select_1vp69_41", _m = "_selectTrigger_1vp69_45", vm = "_dest_1vp69_52", bm = "_actor_1vp69_71", pm = "_actorMark_1vp69_84", gm = "_actorLabel_1vp69_89", ym = "_tagline_1vp69_108", oe = {
  bar: dm,
  skip: um,
  mark: mm,
  nav: hm,
  list: wm,
  select: fm,
  selectTrigger: _m,
  dest: vm,
  actor: bm,
  actorMark: pm,
  actorLabel: gm,
  tagline: ym
};
function Nm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function km(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function JS({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = km(r);
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Nm(c) })
    ] })
  ] });
}
const $m = "_tree_zzoob_2", Cm = "_item_zzoob_6", Sm = "_row_zzoob_10", Rm = "_button_zzoob_22", ka = {
  tree: $m,
  item: Cm,
  row: Sm,
  button: Rm
}, Rn = Te(null);
function Tm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = xa({ orientation: "vertical" });
  return /* @__PURE__ */ t(Rn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: ka.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const xm = { ArrowRight: !0, ArrowLeft: !1 };
function It(e) {
  return e ? !0 : void 0;
}
function Lm(e, a) {
  const n = xm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function Am(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function Em(e) {
  const a = [ka.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Im(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Mm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Bm(e) {
  return typeof e == "string" ? e : void 0;
}
function Pm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function jm({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Tn(e) {
  const a = Re(Rn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = Im(e);
  return /* @__PURE__ */ o("li", { className: ka.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: Em(e),
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
            onClick: () => Am(e),
            onKeyDown: (r) => Lm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Mm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: Bm(e.label), children: e.label }),
              /* @__PURE__ */ t(Pm, { value: e.detail }),
              /* @__PURE__ */ t(jm, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const qm = "_frame_gij4e_2", Dm = "_subjectRail_gij4e_22", Om = "_subject_gij4e_22", Hm = "_rail_gij4e_42", Fm = "_record_gij4e_66", Wm = "_recordBody_gij4e_71", zm = "_stageGrid_gij4e_120", Km = "_band_gij4e_134", Gm = "_bandBody_gij4e_142", Um = "_bandActions_gij4e_147", Vm = "_scroller_gij4e_155", Ym = "_board_gij4e_182", Jm = "_lanes_gij4e_191", Z = {
  frame: qm,
  subjectRail: Dm,
  subject: Om,
  rail: Hm,
  record: Fm,
  recordBody: Wm,
  stageGrid: zm,
  band: Km,
  bandBody: Gm,
  bandActions: Um,
  scroller: Vm,
  board: Ym,
  lanes: Jm
};
function XS({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: Z.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function Mt(e) {
  return e ? "true" : void 0;
}
function QS({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Z.subjectRail, "data-ward-subject-rail": n, "data-ruled": Mt(i), children: [
    /* @__PURE__ */ t("div", { className: Z.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: Z.rail, "data-sticky": Mt(l), "aria-label": r, children: a })
  ] });
}
function ZS({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Et, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Z.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Et, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: Z.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Xm = "_form_1j8ub_2", Qm = "_fields_1j8ub_9", Zm = "_actions_1j8ub_19", Fa = {
  form: Xm,
  fields: Qm,
  actions: Zm
};
function eR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Fa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Fa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Fa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function aR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: Z.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: Z.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: Z.bandActions, children: a })
  ] });
}
const eh = "(max-width: 767.98px)";
function st({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ma, { className: Z.scroller, label: e, count: n ?? br.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function ah({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Z.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(st, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function th({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: Z.board, "data-ward-board": "", children: /* @__PURE__ */ t(st, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(pr, { children: n.content }, n.id)) }) });
}
function tR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = Ia(eh);
  return n === void 0 ? /* @__PURE__ */ t(st, { label: a, children: e }) : l ? /* @__PURE__ */ t(ah, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(th, { lanes: n, label: a });
}
function nR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ma, { className: Z.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
const nh = "_block_b38uc_3", rh = "_sentence_b38uc_10", lh = "_meta_b38uc_19", oh = "_action_b38uc_24", ih = "_strip_b38uc_28", sh = "_loading_b38uc_47", ch = "_label_b38uc_55", dh = "_counter_b38uc_62", be = {
  block: nh,
  sentence: rh,
  meta: lh,
  action: oh,
  strip: ih,
  loading: sh,
  label: ch,
  counter: dh
};
function uh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function ja({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(uh, { action: a })
  ] });
}
function mh(e) {
  return /* @__PURE__ */ t(ja, { ...e, kind: "ward-emptystate" });
}
function rR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(ja, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function lR(e) {
  return /* @__PURE__ */ t(ja, { ...e });
}
function oR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(ja, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function iR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function sR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function cR({ label: e, startedAt: a }) {
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
const hh = "_note_cigdt_2", wh = {
  note: hh
};
function fh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: wh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const _h = "_card_k7btg_3", vh = "_hit_k7btg_31", bh = "_head_k7btg_44", ph = "_title_k7btg_51", gh = "_meta_k7btg_57", yh = "_since_k7btg_66", Nh = "_sep_k7btg_76", kh = "_fields_k7btg_80", $h = "_field_k7btg_80", Ch = "_last_k7btg_98", Sh = "_reason_k7btg_110", se = {
  card: _h,
  hit: vh,
  head: bh,
  title: ph,
  meta: gh,
  since: yh,
  sep: Nh,
  fields: kh,
  field: $h,
  last: Ch,
  reason: Sh
}, Rh = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Th(e, a, n) {
  const r = _a(e, "blue"), l = _a(e, "orange"), i = _a(e, "green"), s = f(/* @__PURE__ */ new Set());
  S(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Rh[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const xh = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : ne(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Lh(e, a) {
  return xh[a](e);
}
function Ah({ item: e, connection: a }) {
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
function Eh({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function Ih({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Mh({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: Lh(e, n) }, n)) });
}
const Ja = (e) => e ? !0 : void 0;
function Bh(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function Ph(e, a, n) {
  e == null || e(a, n);
}
function jh(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function qh({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Ja(a), children: n }) : null;
}
function qa(e) {
  const a = e.fields ?? [], n = e.item, r = f(null);
  Th(r, n.key, e.feed);
  const l = jh(e.feed), i = Bh(n);
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
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => Ph(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(Eh, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(Ah, { item: n, connection: l }),
        /* @__PURE__ */ t(Ih, { reason: n.blockedReason }),
        /* @__PURE__ */ t(Mh, { item: n, fields: a }),
        /* @__PURE__ */ t(qh, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const Dh = "_column_1j8bi_3", Oh = "_head_1j8bi_21", Hh = "_label_1j8bi_30", Fh = "_count_1j8bi_39", Wh = "_list_1j8bi_53", la = {
  column: Dh,
  head: Oh,
  label: Hh,
  count: Fh,
  list: Wh
};
function xn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function zh({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Kh(e) {
  return /* @__PURE__ */ t("div", { className: la.list, role: "list", children: e.rows.map((a, n) => {
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
function Gh({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, _ = xn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(zh, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Kh, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: _ }),
    m && /* @__PURE__ */ t(fh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Uh = "_foot_cs4jr_2", Vh = "_note_cs4jr_13", Yh = "_link_cs4jr_19", Wa = {
  foot: Uh,
  note: Vh,
  link: Yh
};
function dR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Jh = "_head_1tfi5_3", Xh = "_identity_1tfi5_12", Qh = "_titleRow_1tfi5_18", Zh = "_title_1tfi5_18", ew = "_key_1tfi5_35", aw = "_rollup_1tfi5_45", tw = "_tools_1tfi5_53", nw = "_swatch_1tfi5_101", rw = "_mark_1tfi5_108", ke = {
  head: Jh,
  identity: Xh,
  titleRow: Qh,
  title: Zh,
  key: ew,
  rollup: aw,
  tools: tw,
  swatch: nw,
  mark: rw
}, Bt = "initials:";
function lw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function ow(e) {
  const a = [lw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function iw(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    ow(e)
  ] });
}
function sw(e) {
  return e.startsWith(Bt) ? e.slice(Bt.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function cw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${ke.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: sw(e) }) : /* @__PURE__ */ t("span", { className: ke.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function dw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function uR({
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
        /* @__PURE__ */ t(cw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: ke.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: ke.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: ke.rollup, "aria-live": "polite", children: iw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: ke.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(dw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(it, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const uw = "_head_1sejb_14", mw = "_line_1sejb_15", hw = "_cHandle_1sejb_36", ww = "_cName_1sejb_41", fw = "_nameLine_1sejb_49", _w = "_cLabel_1sejb_56", vw = "_cCap_1sejb_61", bw = "_cShown_1sejb_66", pw = "_name_1sejb_49", gw = "_noCap_1sejb_88", yw = "_state_1sejb_102", Nw = "_handle_1sejb_111", kw = "_sub_1sejb_137", j = {
  head: uw,
  line: mw,
  cHandle: hw,
  cName: ww,
  nameLine: fw,
  cLabel: _w,
  cCap: vw,
  cShown: bw,
  name: pw,
  noCap: gw,
  state: yw,
  handle: Nw,
  sub: kw
}, $w = "can't be hidden or collapsed", Cw = "terminal · counted, not a column";
function mR() {
  return /* @__PURE__ */ o("div", { className: j.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: j.cHandle }),
    /* @__PURE__ */ t("span", { className: j.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: j.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: j.cShown, children: "Shown" })
  ] });
}
function Sw(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Rw(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function Pt(e) {
  return e.gate ? $w : e.terminal ? Cw : Rw(e.agentsMounted);
}
function Tw(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function xw({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: j.cName, children: [
    /* @__PURE__ */ o("span", { className: j.nameLine, children: [
      /* @__PURE__ */ t("span", { className: j.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    Pt(e) && /* @__PURE__ */ t("span", { className: j.sub, children: Pt(e) })
  ] });
}
function Lw(e) {
  return e === void 0 ? "" : String(e);
}
function Aw(e) {
  return e === "" ? void 0 : Number(e);
}
function Ew({ name: e, onReorder: a }) {
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
      onKeyDown: (r) => !n && Tw(r, a),
      children: "⠿"
    }
  ) });
}
function Iw({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${j.cCap} ${j.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: j.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Lw(a.cap), onChange: (r) => n({ ...a, cap: Aw(r) }) }) });
}
function Mw({ stage: e, config: a, onChange: n }) {
  const r = je() !== null, l = Sw(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: j.cShown, children: [
    /* @__PURE__ */ t(Ge, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: j.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function Bw(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function hR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: j.line, "data-kind": Bw(e), children: [
    /* @__PURE__ */ t(Ew, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(xw, { stage: e }),
    /* @__PURE__ */ t("span", { className: j.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(Iw, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(Mw, { stage: e, config: a, onChange: n })
  ] });
}
const Pw = "_body_8qsv9_2", jw = "_head_8qsv9_9", qw = "_summary_8qsv9_19", Dw = "_block_8qsv9_20", Ow = "_actionsBlock_8qsv9_21", Hw = "_title_8qsv9_41", Fw = "_note_8qsv9_46", Ww = "_k_8qsv9_51", zw = "_kv_8qsv9_58", Kw = "_row_8qsv9_64", Gw = "_label_8qsv9_75", Uw = "_value_8qsv9_84", Vw = "_quote_8qsv9_90", Yw = "_actions_8qsv9_21", Jw = "_resolve_8qsv9_111", q = {
  body: Pw,
  head: jw,
  summary: qw,
  block: Dw,
  actionsBlock: Ow,
  title: Hw,
  note: Fw,
  k: Ww,
  kv: zw,
  row: Kw,
  label: Gw,
  value: Uw,
  quote: Vw,
  actions: Yw,
  resolve: Jw
};
function Xw(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Qw(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Zw(e) {
  const a = da(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function ef(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function af(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Ba(Zw(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Xw(e),
    ...ef(n),
    ...Qw(e, a)
  ];
}
function tf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: q.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: q.k, children: a }),
    e
  ] });
}
function nf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function rf({ item: e, showKey: a }) {
  const n = nf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: q.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function lf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: q.block, children: [
    /* @__PURE__ */ t("p", { className: q.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: q.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: q.note, children: e.agentMeta })
  ] }) : null;
}
function wR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), _ = af(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: q.body, children: [
    /* @__PURE__ */ t(rf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: q.summary, children: [
      /* @__PURE__ */ t("h2", { className: q.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: q.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: q.kv, children: _.map(([w, y, L]) => /* @__PURE__ */ o("div", { className: q.row, children: [
      /* @__PURE__ */ t("dt", { className: q.label, children: w }),
      /* @__PURE__ */ t("dd", { className: q.value, children: y })
    ] }, L ?? w)) }),
    /* @__PURE__ */ t(lf, { item: e }),
    /* @__PURE__ */ o("div", { className: q.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: q.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: q.note, children: c })
    ] }),
    /* @__PURE__ */ t(tf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const of = "_root_3azmy_2", sf = "_list_3azmy_7", cf = "_item_3azmy_12", df = "_box_3azmy_18", uf = "_text_3azmy_23", mf = "_note_3azmy_28", Ye = {
  root: of,
  list: sf,
  item: cf,
  box: df,
  text: uf,
  note: mf
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(ot, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const hf = "_rail_znbbp_2", wf = "_k_znbbp_11", ff = "_head_znbbp_19", _f = "_section_znbbp_25", vf = "_card_znbbp_39", bf = "_strip_znbbp_46", pf = "_skeleton_znbbp_60", gf = "_skeletonLabel_znbbp_74", yf = "_bar_znbbp_80", Nf = "_note_znbbp_89", me = {
  rail: hf,
  k: wf,
  head: ff,
  section: _f,
  card: vf,
  strip: bf,
  skeleton: pf,
  skeletonLabel: gf,
  bar: yf,
  note: Nf
};
function kf(e) {
  return (a) => e == null ? void 0 : e(a);
}
function za({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function $f({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function Cf({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Gh, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function Sf(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(Cf, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t($f, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function fR(e) {
  const a = kf(e.onOpen), n = xn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(za, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(qa, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(za, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(Sf, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(za, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function Rf(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function Tf(e) {
  return Math.ceil(e.length / 2);
}
function xf(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Ln(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Lf(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Ln(e);
  l !== void 0 && n(l), r(xf(e.type));
}
function Af(e, a, n, r, l) {
  S(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Lf(i, n, r, l));
  }, [e, a, n, r, l]);
}
function Ef(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function If(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function Mf(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Bf(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(Tf(a ?? [])) + ")"
  };
}
function Pf(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function jf(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: ne(e.cost) }) : null;
}
function qf(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function Df(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function Of(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function Hf(e, a) {
  return a === void 0 ? e : Rf(e, a.ref);
}
function Ff(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ia(e) {
  return e === !0 ? "true" : void 0;
}
function An(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = f(null), i = _a(l), s = f(/* @__PURE__ */ new Set()), [c, d] = p(Ef(a));
  Af(e.feed, a.key, s, d, i);
  const u = If(a, r), m = Mf(a, n), _ = Bf(a, e.fields), w = Of(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Ff(e),
      className: "ward-workcard",
      "data-flagged": ia(a.flagged),
      "data-selected": ia(e.selected),
      style: _,
      ref: Hf(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Pf(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          jf(a, e.fields),
          qf(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Df(n, c, e.connection, a.changedAt),
          w !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: w, children: w }) : null
        ] })
      ]
    }
  ) });
}
function Wf({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function zf(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Kf(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Gf(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(Wf, { count: e.items.length, cap: e.column.cap });
}
function Uf(e, a) {
  return e.roving ?? a;
}
function Vf(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Yf(e, a) {
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
function Jf(e) {
  const a = N(), n = xa({ orientation: "vertical" }), r = Uf(e, n), l = zf(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ia(l), "data-gate": ia(e.column.gate), children: [
    Kf(e.column, e.items.length, a),
    Gf(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...Vf(e, n), children: Yf(e, r) })
  ] });
}
function Xf(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function Qf(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Zf(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function _R(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: Xf(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Qf(e),
      Zf(e.onConfigure),
      /* @__PURE__ */ t(it, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function e_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function a_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ge, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ge, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function t_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function vR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ia(e_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: a_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(rn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    t_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function bR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(An, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(Jf, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function n_(e, a) {
  const n = Ln(e);
  n !== void 0 && a(n);
}
function r_(e, a, n) {
  S(() => {
    if (e != null)
      return e.subscribe(a, (r) => n_(r, n));
  }, [e, a, n]);
}
function l_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function o_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", ne(e.cost)]), a;
}
function i_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(xe, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function s_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function pR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  r_(e.feed, a.key, l);
  const i = [...l_(a), ...o_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      i_(n, r)
    ] }),
    s_(a, e.actions)
  ] });
}
const c_ = "_card_54446_3", d_ = "_head_54446_30", u_ = "_mark_54446_38", m_ = "_name_54446_50", h_ = "_chips_54446_71", w_ = "_description_54446_77", f_ = "_run_54446_82", __ = "_sep_54446_91", v_ = "_facts_54446_96", b_ = "_fact_54446_96", p_ = "_factLabel_54446_109", g_ = "_factValue_54446_113", re = {
  card: c_,
  head: d_,
  mark: u_,
  name: m_,
  chips: h_,
  description: w_,
  run: f_,
  sep: __,
  facts: v_,
  fact: b_,
  factLabel: p_,
  factValue: g_
}, y_ = { live: "done", draft: "running", paused: "meta" };
function N_(e) {
  return e === void 0 ? re.card : `${re.card} ${e}`;
}
function k_({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: re.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: y_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function $_({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: re.description, children: e });
}
function C_({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: re.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: re.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(xe, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function S_({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: re.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: re.fact, children: [
    /* @__PURE__ */ t("dt", { className: re.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: re.factValue, children: a.value })
  ] }, a.label)) });
}
function R_(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function T_({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: N_(s),
      style: c,
      "data-selected": d,
      "data-paused": R_(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: re.head, children: [
          /* @__PURE__ */ t("span", { className: re.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${re.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t($_, { description: e.description }),
        /* @__PURE__ */ t(C_, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(k_, { versions: e.versions }),
        /* @__PURE__ */ t(S_, { facts: i })
      ]
    }
  );
}
const x_ = "_list_4dcyc_2", L_ = "_row_4dcyc_11", A_ = "_head_4dcyc_23", E_ = "_id_4dcyc_30", I_ = "_lock_4dcyc_35", M_ = "_reason_4dcyc_41", B_ = "_remove_4dcyc_46", P_ = "_clauses_4dcyc_50", j_ = "_clause_4dcyc_50", q_ = "_label_4dcyc_64", D_ = "_cell_4dcyc_71", O_ = "_value_4dcyc_76", ie = {
  list: x_,
  row: L_,
  head: A_,
  id: E_,
  lock: I_,
  reason: M_,
  remove: B_,
  clauses: P_,
  clause: j_,
  label: q_,
  cell: D_,
  value: O_
}, En = Te(!1);
function gR({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(En.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function H_({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function F_({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function W_({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(F_, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function jt(e, a) {
  return e.locked ? void 0 : a;
}
function yR({ rule: e, onChange: a, onRemove: n }) {
  if (!Re(En)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = jt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(W_, { rule: e, onRemove: jt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(H_, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const z_ = "_ladder_n8eeo_2", K_ = "_cell_n8eeo_7", G_ = "_empty_n8eeo_26", U_ = "_name_n8eeo_34", V_ = "_holder_n8eeo_40", Y_ = "_request_n8eeo_46", J_ = "_swatches_n8eeo_51", X_ = "_swatch_n8eeo_51", Q_ = "_tilesFrame_n8eeo_78", Z_ = "_tiles_n8eeo_78", ev = "_tile_n8eeo_78", av = "_bar_n8eeo_117", tv = "_hex_n8eeo_128", nv = "_note_n8eeo_138", E = {
  ladder: z_,
  cell: K_,
  empty: G_,
  name: U_,
  holder: V_,
  request: Y_,
  swatches: J_,
  swatch: X_,
  tilesFrame: Q_,
  tiles: Z_,
  tile: ev,
  bar: av,
  hex: tv,
  note: nv
}, NR = "not validated yet, pending a CVD matrix and dark stepping";
function rv(e) {
  return e.reserved ? "reserved" : Aa(e.step) ? "validated" : "partial";
}
function In(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function lv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function ov({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(qe, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function iv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function sv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const qt = (e) => String(e).padStart(2, "0");
function cv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? In(e, void 0);
}
function dv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${qt(e)}` : Dr(e) }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: r ? n : `Step ${qt(e)} · ${n}` })
  ] });
}
function uv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = rv(e), c = In(s, n), d = c !== "free", u = d || i, m = a === e.step, _ = e.name ?? `Step ${e.step}`, w = () => {
    u || r(e.step);
  }, y = `${_} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...sv(d, m, u), "data-validation": s, style: lv(e, s), onClick: w, onKeyDown: (B) => iv(B, w) }, label: y, name: _, holder: c, validation: s, note: cv(s, n, m), step: e.step };
}
const mv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(dv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(ov, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function hv(e) {
  return mv[e.presentation](uv(e));
}
function wv(e) {
  for (const a of e)
    if (!a.reserved && !La(a.step)) throw new Error("colour ladder renders token steps only");
}
function fv() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _v(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const vv = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function bv() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const pv = { list: fv, swatches: () => null, tiles: bv };
function gv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Mn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  wv(e.steps);
  const r = _v(e), l = pv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(hv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...gv(e.disabled === !0), className: `${vv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: E.tiles, children: i }) : i });
}
const yv = "_rail_s06lm_2", Nv = "_section_s06lm_12", kv = "_sectionFlush_s06lm_22", $v = "_head_s06lm_26", Cv = "_headLabel_s06lm_34", Sv = "_sample_s06lm_42", Rv = "_sampleLabel_s06lm_47", Tv = "_sampleTitle_s06lm_54", xv = "_sampleMeta_s06lm_59", Lv = "_trace_s06lm_65", Av = "_traceHead_s06lm_70", Ev = "_steps_s06lm_78", Iv = "_step_s06lm_78", Mv = "_stepTitle_s06lm_97", Bv = "_hollow_s06lm_107", Pv = "_stepBody_s06lm_115", jv = "_stepDetail_s06lm_127", qv = "_publish_s06lm_132", Dv = "_reason_s06lm_138", Ov = "_note_s06lm_143", Hv = "_reveal_s06lm_148", k = {
  rail: yv,
  section: Nv,
  sectionFlush: kv,
  head: $v,
  headLabel: Cv,
  sample: Sv,
  sampleLabel: Rv,
  sampleTitle: Tv,
  sampleMeta: xv,
  trace: Lv,
  traceHead: Av,
  steps: Ev,
  step: Iv,
  stepTitle: Mv,
  hollow: Bv,
  stepBody: Pv,
  stepDetail: jv,
  publish: qv,
  reason: Dv,
  note: Ov,
  reveal: Hv
}, Dt = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Fv = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Wv = { ok: "greenFill", finding: "orangeFill", action: "blue" }, zv = { notSimulated: "not simulated", running: "running" };
function Kv(e) {
  return e.presentation === "foundry";
}
function Gv(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Uv(e, a) {
  var r;
  const n = Fv[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Vv(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Yv(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Jv(e) {
  if (Vv(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Xv(e) {
  const [a, n] = p(!1);
  S(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Qv(e) {
  const a = zv[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(qe, { size: 6, kind: Wv[e.kind], label: e.kind });
}
function Zv(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function eb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function ab(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Xv, { kind: a.kind, children: [
    /* @__PURE__ */ t(Qv, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Zv, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(eb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function tb(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Bn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: tb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(ab, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function nb(e) {
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
function rb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function lb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : ne(e.run.cost), label: "Cost" }, { value: e.run.turns ? Xt(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(Pa, { divided: !0, cells: a }) });
}
function ob(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: ne(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Xt(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function ib(e) {
  const a = ob(e.run);
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
function sb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function cb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Pn, { reason: e.reason, onPublish: e.onPublish }) });
}
function jn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Dt[e.run.status].role, label: Dt[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(xe, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function db(e, a) {
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
function ub(e) {
  var n;
  Yv(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(nb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(lb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(sb, { reason: Gv(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function mb(e) {
  var r;
  const a = db(e.run, e.feed);
  Jv(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(jn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(rb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Bn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(ib, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(cb, { reason: Uv(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function kR(e) {
  return Kv(e) ? /* @__PURE__ */ t(mb, { ...e }) : /* @__PURE__ */ t(ub, { ...e });
}
const hb = "_list_142ip_3", wb = "_row_142ip_9", fb = "_condition_142ip_18", _b = "_action_142ip_24", ba = {
  list: hb,
  row: wb,
  condition: fb,
  action: _b
}, qn = Te(!1);
function $R({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(qn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ba.list, "aria-label": a, children: e }) });
}
function CR({ rule: e }) {
  if (!Re(qn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ba.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ba.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ba.action, children: e.then })
  ] });
}
const vb = "_move_tmppt_3", bb = {
  move: vb
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
function pb(e) {
  return e === "up" ? "down" : "up";
}
function gb(e, a) {
  const n = Ot(e, a.id, a.direction) ?? Ot(e, a.id, pb(a.direction));
  n == null || n.focus();
}
function Hn() {
  const e = f(null), [a, n] = p(null), [r, l] = p("");
  return S(() => {
    e.current !== null && a !== null && gb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Fn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function $a({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${bb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const yb = "_body_1jd1i_2", Nb = "_title_1jd1i_8", kb = "_section_1jd1i_13", $b = "_legend_1jd1i_18", Cb = "_stages_1jd1i_26", Sb = "_stage_1jd1i_26", Rb = "_stageIndex_1jd1i_44", Tb = "_stageName_1jd1i_50", xb = "_footer_1jd1i_59", Lb = "_note_1jd1i_66", Ab = "_reason_1jd1i_71", Eb = "_actions_1jd1i_76", Ib = "_webHead_1jd1i_83", Mb = "_kicker_1jd1i_92", Bb = "_webTitle_1jd1i_99", Pb = "_webBody_1jd1i_105", jb = "_webSection_1jd1i_109", qb = "_sectionHead_1jd1i_121", Db = "_sectionNote_1jd1i_129", Ob = "_formLabel_1jd1i_134", Hb = "_identityRow_1jd1i_139", Fb = "_nameCell_1jd1i_145", Wb = "_keyCell_1jd1i_150", zb = "_colourCell_1jd1i_154", Kb = "_colourStatus_1jd1i_161", Gb = "_webStages_1jd1i_166", Ub = "_webStageList_1jd1i_172", Vb = "_webStage_1jd1i_166", Yb = "_webIndex_1jd1i_191", Jb = "_webStageName_1jd1i_196", Xb = "_webMoves_1jd1i_201", Qb = "_addStage_1jd1i_215", Zb = "_addStageButton_1jd1i_223", ep = "_addStageNote_1jd1i_231", ap = "_webFooter_1jd1i_236", tp = "_webFooterNotes_1jd1i_244", np = "_webNote_1jd1i_251", v = {
  body: yb,
  title: Nb,
  section: kb,
  legend: $b,
  stages: Cb,
  stage: Sb,
  stageIndex: Rb,
  stageName: Tb,
  footer: xb,
  note: Lb,
  reason: Ab,
  actions: Eb,
  webHead: Ib,
  kicker: Mb,
  webTitle: Bb,
  webBody: Pb,
  webSection: jb,
  sectionHead: qb,
  sectionNote: Db,
  formLabel: Ob,
  identityRow: Hb,
  nameCell: Fb,
  keyCell: Wb,
  colourCell: zb,
  colourStatus: Kb,
  webStages: Gb,
  webStageList: Ub,
  webStage: Vb,
  webIndex: Yb,
  webStageName: Jb,
  webMoves: Xb,
  addStage: Qb,
  addStageButton: Zb,
  addStageNote: ep,
  webFooter: ap,
  webFooterNotes: tp,
  webNote: np
}, rp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Wn = "not in catalogue";
function lp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Wn}` }, ...n];
}
function op({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Wn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: lp(n, e.name), invalid: i, onChange: r });
}
function zn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function ip(e) {
  const a = f([]), n = f(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function sp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = zn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(op, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: rp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t($a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function cp({ stages: e, onChange: a, catalogue: n }) {
  const r = ip(e.length), l = Hn(), i = (c, d) => {
    const u = Dn(c, d);
    r.current = Xa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, On(zn(e[c], c), u, e.length)), a(Xa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(sp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Fn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const dp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], up = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], mp = "A new stream starts as a draft. Nothing runs on it until you publish it.", hp = "Create is disabled: name the stream and give it a key first.", wp = "reorder with the ↑ ↓ buttons · min 2";
function ct(e, a) {
  return !e.reserved && Aa(e.step) && a[e.step] === void 0;
}
function fp(e, a) {
  const n = e.find((r) => ct(r, a));
  return n ? n.step : 1;
}
function _p({ stages: e, onMove: a }) {
  const n = Hn(), r = (l, i) => {
    const s = Dn(l, i);
    n.moved({ id: e[l].id, direction: i }, On(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t($a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Fn, { text: n.announcement })
  ] });
}
function vp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: mp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function bp(e, a) {
  return e !== "" && a !== "" ? null : hp;
}
function pp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = up, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, _] = p(""), [w, y] = p(""), [L, B] = p(a[0].value), [le, Le] = p(() => fp(n, r)), [ae, Ue] = p(e.stages ?? dp), [Ve, R] = p(l[0].value), G = { name: m, key: w, streamStep: le, owner: L, stages: ae, policy: Ve }, ge = bp(m, w);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: _ }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: w, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: L, onChange: B, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(Mn, { label: "Stream colour", steps: n, value: le, onChange: Le, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(_p, { stages: ae, onMove: (De, _r) => Ue(Xa(ae, De, _r)) })
    ] }),
    /* @__PURE__ */ t(Cn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(vp, { reason: ge, onCreate: () => i(G), onDraft: () => s(G) })
  ] }) });
}
const Kn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], gp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function yp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Kn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Np(e, a) {
  return kp(e) && $p(e, a) && Cp(e);
}
function kp(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function $p(e, a) {
  return e.colourStep === null || ct({ step: e.colourStep }, a);
}
function Cp(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Sp(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : ct({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Rp({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function Tp({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(Rp, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: gp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function xp({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function Lp({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: v.webSection, children: [
    /* @__PURE__ */ t("h3", { className: v.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: v.identityRow, children: [
      /* @__PURE__ */ t("div", { className: v.nameCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ t("div", { className: v.keyCell, children: /* @__PURE__ */ t(M, { variant: "form", label: "Key", value: n, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Ap(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, _] = p(null), [w, y] = p("relay"), [L, B] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = yp(l, s, d, m, w, L), Le = Np(le, r), ae = L.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ue = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Mn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: _, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: Sp(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(xp, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(Lp, { name: l, setName: i, streamKey: s, setKey: c, colour: Ue, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: wp })
        ] }),
        /* @__PURE__ */ t(cp, { stages: L, onChange: B })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(Cn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: w, options: Kn, onChange: y }) }),
      /* @__PURE__ */ t(Tp, { ready: Le, draft: le, agentStage: ae, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function SR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Ap, { ...e }) : /* @__PURE__ */ t(pp, { ...e });
}
const Ep = "_row_bs8hc_2", Ip = "_cell_bs8hc_6", Mp = "_condition_bs8hc_11", Bp = "_action_bs8hc_18", Pp = "_contract_bs8hc_24", jp = "_contractCondition_bs8hc_33", qp = "_contractAction_bs8hc_39", Q = {
  row: Ep,
  cell: Ip,
  condition: Mp,
  action: Bp,
  contract: Pp,
  contractCondition: jp,
  contractAction: qp
}, Gn = ["advance", "block", "escalate", "requestReview"], Ht = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ca(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function dt(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Q.action, children: Ht[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Gn.map((l) => ({ value: l, label: Ht[l] }))
    }
  );
}
function Dp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t("span", { className: Q.condition, title: Ca(e, r), children: Ca(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Op({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Q.condition, children: Ca(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Q.cell, children: dt(e, a, n) })
  ] });
}
function Hp({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Q.contractCondition, children: Ca(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Q.contractAction, children: dt(e, a, n, !0) })
  ] });
}
const Fp = { two: Op, four: Dp, contract: Hp };
function RR(e) {
  var n;
  if (!Gn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Fp[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Wp = "_column_11id3_2", zp = "_head_11id3_17", Kp = "_index_11id3_23", Gp = "_name_11id3_29", Up = "_meta_11id3_38", Vp = "_mono_11id3_43", Yp = "_gate_11id3_50", Jp = "_reviewersLabel_11id3_57", Xp = "_reviewers_11id3_57", Qp = "_reviewer_11id3_57", Zp = "_agents_11id3_74", eg = "_workflowColumn_11id3_79", ag = "_workflowHead_11id3_96", tg = "_stageRow_11id3_102", ng = "_stageLabel_11id3_109", rg = "_workflowTitle_11id3_116", lg = "_workflowMeta_11id3_122", og = "_workflowGate_11id3_127", ig = "_gateNote_11id3_135", sg = "_cardNote_11id3_140", cg = "_reviewerList_11id3_145", dg = "_reviewerRow_11id3_151", ug = "_reviewerMark_11id3_157", mg = "_reviewerName_11id3_167", hg = "_terminalCard_11id3_173", wg = "_terminalCount_11id3_182", fg = "_workflowAgents_11id3_188", _g = "_mount_11id3_194", C = {
  column: Wp,
  head: zp,
  index: Kp,
  name: Gp,
  meta: Up,
  mono: Vp,
  gate: Yp,
  reviewersLabel: Jp,
  reviewers: Xp,
  reviewer: Qp,
  agents: Zp,
  workflowColumn: eg,
  workflowHead: ag,
  stageRow: tg,
  stageLabel: ng,
  workflowTitle: rg,
  workflowMeta: lg,
  workflowGate: og,
  gateNote: ig,
  cardNote: sg,
  reviewerList: cg,
  reviewerRow: dg,
  reviewerMark: ug,
  reviewerName: mg,
  terminalCard: hg,
  terminalCount: wg,
  workflowAgents: fg,
  mount: _g
}, vg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ut(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Un(e) {
  return `${Math.round(e * 100)}%`;
}
function bg({ stage: e }) {
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
function pg({ stage: e }) {
  return /* @__PURE__ */ t(Pa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: ut(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function gg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: C.head, children: [
    /* @__PURE__ */ t("span", { className: C.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: C.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: vg[e.kind] })
  ] });
}
function yg({ stage: e }) {
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
function Ng({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(bg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(pg, { stage: e }) : null;
}
function kg({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function $g({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: C.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(gg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(yg, { stage: e }),
    /* @__PURE__ */ t(Ng, { stage: e }),
    /* @__PURE__ */ t("div", { className: C.agents, children: a.map((s) => /* @__PURE__ */ t(T_, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(kg, { onMount: n })
  ] });
}
const Cg = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function Sg({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: C.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: C.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: C.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: C.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function Rg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: C.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: C.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(Sg, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: C.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Un(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Tg(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function xg({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: C.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: C.terminalCount, children: ut(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: C.cardNote, children: Tg(e.rolledBackThisWeek) })
  ] });
}
function Lg(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Ag(e) {
  if (e.kind === "terminal") return `${ut(e.closedThisWeek)} this week`;
  const a = Lg(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Eg({ stage: e, titleId: a }) {
  const n = Cg[e.kind];
  return /* @__PURE__ */ o("header", { className: C.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: C.stageRow, children: [
      /* @__PURE__ */ o("span", { className: C.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: C.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: C.workflowMeta, children: Ag(e) })
  ] });
}
function Ig(e) {
  return e === "entry" || e === "agent";
}
function Mg({ stage: e, onMount: a }) {
  return a === void 0 || !Ig(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: C.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Bg({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: C.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Eg, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(Rg, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(xg, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: C.workflowAgents, children: a }),
    /* @__PURE__ */ t(Mg, { stage: e, onMount: n })
  ] });
}
function Pg(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function TR(e) {
  return Pg(e) ? /* @__PURE__ */ t(Bg, { ...e }) : /* @__PURE__ */ t($g, { ...e });
}
const jg = "_row_1tdra_6", qg = "_name_1tdra_12", Dg = "_compactRow_1tdra_13", Og = "_compactName_1tdra_13", Hg = "_cell_1tdra_30", Fg = "_chain_1tdra_45", Wg = "_owner_1tdra_51", zg = "_mono_1tdra_57", Kg = "_compactCell_1tdra_79", Gg = "_stack_1tdra_96", Ug = "_stat_1tdra_103", Vg = "_identityLine_1tdra_110", Yg = "_identity_1tdra_110", Jg = "_ownerLine_1tdra_140", Xg = "_link_1tdra_160", Qg = "_gateMark_1tdra_166", Zg = "_emptyChain_1tdra_171", ey = "_arrow_1tdra_177", ay = "_muted_1tdra_182", ty = "_define_1tdra_187", ny = "_statValue_1tdra_194", ry = "_policyId_1tdra_200", ly = "_sub_1tdra_205", g = {
  row: jg,
  name: qg,
  compactRow: Dg,
  compactName: Og,
  cell: Hg,
  chain: Fg,
  owner: Wg,
  mono: zg,
  compactCell: Kg,
  stack: Gg,
  stat: Ug,
  identityLine: Vg,
  identity: Yg,
  ownerLine: Jg,
  link: Xg,
  gateMark: Qg,
  emptyChain: Zg,
  arrow: ey,
  muted: ay,
  define: ty,
  statValue: ny,
  policyId: ry,
  sub: ly
};
function Vn(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function oy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function iy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function Yn(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function sy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${Yn(e.members)}`;
}
function cy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: sy(e) })
  ] }) });
}
function Jn({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function dy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = da(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function uy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(Jn, { name: l.name, gate: l.gate === !0, look: dy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function my(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : uy(e) });
}
function Xn(e) {
  return e === void 0 ? void 0 : !0;
}
function Ft(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": Xn(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function hy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function wy(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function fy({ stream: e, href: a, presentation: n }) {
  const r = iy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: Vn, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    cy(e, a),
    my(e),
    Ft(wy(e.agents), e.agents === void 0 ? void 0 : oy(e.agents), "—"),
    hy(e.policy),
    Ft(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function _y(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function xR(e) {
  if (_y(e)) return fy(e);
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
const vy = "_row_2u4ll_2", by = "_name_2u4ll_16", py = "_scope_2u4ll_24", Sa = {
  row: vy,
  name: by,
  scope: py
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function gy(e) {
  return e === void 0 ? `${Sa.row} ward-toolrow` : `${Sa.row} ward-toolrow ${e}`;
}
function yy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Ny({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function ky({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function $y({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${Sa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Cy(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function LR({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = yy(e, n), s = Cy(n);
  return /* @__PURE__ */ o(s, { className: gy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Ny, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${Sa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t($y, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(ky, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const Sy = "_strip_4ppv9_2", Ry = "_well_4ppv9_11", Ty = "_head_4ppv9_18", xy = "_name_4ppv9_24", Ly = "_chart_4ppv9_32", Ay = "_segment_4ppv9_38", Ey = "_detailedChart_4ppv9_44", Iy = "_rail_4ppv9_57", My = "_section_4ppv9_63", By = "_label_4ppv9_74", Py = "_note_4ppv9_91", K = {
  strip: Sy,
  well: Ry,
  head: Ty,
  name: xy,
  chart: Ly,
  segment: Ay,
  detailedChart: Ey,
  rail: Iy,
  section: My,
  label: By,
  note: Py
}, jy = "No item in flight to preview.", qy = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Dy = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Qa = [1, 2, 3, 4, 5, 6], Ra = 100;
function Oy(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function Hy({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: K.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Qa.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: K.segment,
      x: l * Ra,
      y: "0",
      width: Ra,
      height: "8",
      fill: Oy(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Fy(e) {
  const a = e.slice(0, Qa.length);
  for (; a.length < Qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Wy({ identities: e }) {
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
function Qn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function wa({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: K.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: K.label, children: e }),
    a
  ] });
}
function zy({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: K.note, children: a ?? jy }) : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(qa, { item: { ...e, streamStep: da(n.streamStep) }, onOpen: Qn(r), feed: null }) });
}
function Ky({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: K.head, style: a, children: [
    /* @__PURE__ */ t(qe, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
  ] });
}
function Gy(e) {
  const a = Fy(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: K.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(wa, { label: "Board card", children: /* @__PURE__ */ t(zy, { ...e, draft: n }) }),
    /* @__PURE__ */ t(wa, { label: "Streams index row", children: /* @__PURE__ */ t(Ky, { draft: n }) }),
    /* @__PURE__ */ o(wa, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(Wy, { identities: a }),
      /* @__PURE__ */ t("p", { className: K.note, children: qy })
    ] }),
    /* @__PURE__ */ t(wa, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: K.note, children: Dy }) })
  ] });
}
function Uy({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: K.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: K.head, children: [
      /* @__PURE__ */ t(qe, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: K.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Ba(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: K.well, children: /* @__PURE__ */ t(qa, { item: { ...a, streamStep: e.streamStep }, onOpen: Qn(r) }) }),
    /* @__PURE__ */ t(Hy, { draft: e, streams: n })
  ] });
}
function AR(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(Gy, { ...e }) : /* @__PURE__ */ t(Uy, { ...e });
}
const Vy = "_row_ixlg5_6", Yy = "_headCell_ixlg5_10", Jy = "_cell_ixlg5_11", Xy = "_name_ixlg5_23", Qy = "_consequence_ixlg5_29", Zy = "_governed_ixlg5_36", eN = "_control_ixlg5_42", aN = "_byRole_ixlg5_48", tN = "_webControl_ixlg5_59", nN = "_webConsequence_ixlg5_65", rN = "_webGoverned_ixlg5_71", O = {
  row: Vy,
  headCell: Yy,
  cell: Jy,
  name: Xy,
  consequence: Qy,
  governed: Zy,
  control: eN,
  byRole: aN,
  webControl: tN,
  webConsequence: nN,
  webGoverned: rN
};
function lN({
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
function oN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(lN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function iN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function sN({ name: e, cell: a, onChange: n }) {
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
function cN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: O.row, children: [
    /* @__PURE__ */ o("td", { className: O.cell, children: [
      /* @__PURE__ */ t("span", { className: O.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${O.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t(sN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: O.cell, children: /* @__PURE__ */ t("span", { className: `${O.webGoverned} ward-cellmeta`, children: iN(e) }) })
  ] });
}
function ER(e) {
  return "presentation" in e ? /* @__PURE__ */ t(cN, { ...e }) : /* @__PURE__ */ t(oN, { ...e });
}
const dN = "_row_vv64h_2", uN = "_cell_vv64h_6", mN = "_name_vv64h_25", hN = "_note_vv64h_30", wN = "_webName_vv64h_41", fN = "_webMeta_vv64h_47", V = {
  row: dN,
  cell: uN,
  name: mN,
  note: hN,
  webName: wN,
  webMeta: fN
}, Zn = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function _N(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function vN({ component: e, onRestart: a }) {
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
function bN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: _N(e.state) });
}
function pN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: V.row, children: [
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t("span", { className: `${V.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(h, { ...Zn[e.state] }) }),
    /* @__PURE__ */ t("td", { className: V.cell, children: /* @__PURE__ */ t(bN, { component: e, onRestart: a }) })
  ] });
}
function IR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(pN, { ...e }) : /* @__PURE__ */ t(vN, { ...e });
}
const gN = "_row_jcm5k_7", yN = "_cell_jcm5k_11", NN = "_next_jcm5k_28", kN = "_headCell_jcm5k_38", $N = "_webId_jcm5k_77", CN = "_webPurpose_jcm5k_83", SN = "_webMeta_jcm5k_91", RN = "_webUrgent_jcm5k_97", F = {
  row: gN,
  cell: yN,
  next: NN,
  headCell: kN,
  webId: $N,
  webPurpose: CN,
  webMeta: SN,
  webUrgent: RN
}, TN = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, xN = {
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
], LN = Object.fromEntries(er.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = LN[e];
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
function MR() {
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
function AN({ cred: e }) {
  const a = TN[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function EN({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function IN({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(EN, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...xN[e.state] }) })
  ] });
}
function BR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(IN, { ...e }) : /* @__PURE__ */ t(AN, { ...e });
}
const MN = "_card_17zba_2", BN = "_head_17zba_11", PN = "_env_17zba_18", jN = "_version_17zba_25", qN = "_meta_17zba_32", DN = "_webCard_17zba_37", ON = "_webRow_17zba_47", HN = "_webTitle_17zba_55", FN = "_webLine_17zba_65", WN = "_webVersion_17zba_72", zN = "_webMeta_17zba_77", U = {
  card: MN,
  head: BN,
  env: PN,
  version: jN,
  meta: qN,
  webCard: DN,
  webRow: ON,
  webTitle: HN,
  webLine: FN,
  webVersion: WN,
  webMeta: zN
}, Wt = { dev: "Dev", uat: "UAT", prod: "Prod" }, ar = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function KN({ env: e }) {
  const a = ar[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": Wt[e.env], children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ t("span", { className: U.env, children: Wt[e.env] }),
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
function GN(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function UN(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...ar[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: GN(e) })
  ] });
}
function PR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(UN, { ...e }) : /* @__PURE__ */ t(KN, { ...e });
}
const VN = "_panel_1hmja_2", YN = "_line_1hmja_8", JN = "_actions_1hmja_14", fa = {
  panel: VN,
  line: YN,
  actions: JN
};
function jR(e) {
  return /* @__PURE__ */ o("div", { className: fa.panel, children: [
    /* @__PURE__ */ t("p", { className: fa.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: fa.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: fa.line, children: e.note ?? "" })
  ] });
}
const XN = "_upload_13fcl_2", QN = "_preview_13fcl_7", ZN = "_mark_13fcl_17", e1 = "_empty_13fcl_22", a1 = "_actions_13fcl_28", t1 = "_input_13fcl_33", n1 = "_reasons_13fcl_41", r1 = "_reason_13fcl_41", l1 = "_accepted_13fcl_57", te = {
  upload: XN,
  preview: QN,
  mark: ZN,
  empty: e1,
  actions: a1,
  input: t1,
  reasons: n1,
  reason: r1,
  accepted: l1
}, tr = 1.5, nr = 22, Ta = "script elements or event handlers", Ie = "links or external references", Se = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${tr}px at ${nr}px`], o1 = [Se[1], Se[2], Ta, Ie], i1 = /* @__PURE__ */ new Map([
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
]), s1 = "http://www.w3.org/2000/svg", c1 = "http://www.w3.org/2000/xmlns/", d1 = /* @__PURE__ */ new Set([
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
]), u1 = /* @__PURE__ */ new Set([
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
]), ht = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, m1 = /url\s*\(|['"\\]/i;
function h1() {
  return { ok: !1, reasons: [Se[1]] };
}
function rr(e) {
  return e.namespaceURI === s1;
}
function w1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && rr(a) ? a : null;
  } catch {
    return null;
  }
}
function f1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Se[0]] : [];
}
function _1(e) {
  return i1.get(e.localName) ?? (e.localName.startsWith("animate") ? Ie : void 0);
}
function v1(e) {
  return m1.test(e.replace(ht, ""));
}
function b1(e) {
  return /^on/i.test(e.localName) ? Ta : e.localName === "href" || v1(e.value) ? Ie : void 0;
}
function p1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(_1(n));
    for (const r of Array.from(n.attributes)) a.add(b1(r));
  }
  return o1.filter((n) => a.has(n));
}
function g1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? nr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < tr;
  }) ? [Se[3]] : [];
}
function y1(e) {
  if (e.namespaceURI === c1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (u1.has(a) || a.startsWith("stroke"));
}
function N1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && rr(a) && d1.has(a.localName);
}
function k1(e, a) {
  N1(a) ? a.nodeType === Node.ELEMENT_NODE && lr(a) : e.removeChild(a);
}
function lr(e) {
  for (const a of Array.from(e.attributes)) y1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) k1(e, a);
  return e;
}
function $1(e) {
  return Array.from(e.matchAll(ht), (a) => a[2]).filter((a) => a !== "");
}
function C1(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function S1(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of $1(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function R1(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(ht, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function T1(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = S1(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), R1(l, r);
  }
  return e;
}
function qR(e) {
  const a = w1(e);
  if (a === null) return h1();
  const n = [...f1(a), ...p1(a), ...g1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(T1(lr(a), C1(e))) };
}
const x1 = "Mark accepted.", L1 = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, A1 = new Set(Zt.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function E1(e) {
  return e !== void 0 && (L1.test(e) || A1.has(e)) ? e : void 0;
}
function I1({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: te.preview, style: { "--mark": E1(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: te.empty }) });
}
function M1(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function B1(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function P1({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("p", { className: te.accepted, children: x1 }) }) : /* @__PURE__ */ t("div", { className: te.result, role: "status", children: /* @__PURE__ */ t("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: te.reason, children: a }, a)) }) });
}
function j1({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(P1, { result: e }) : /* @__PURE__ */ t("p", { className: `${te.result} ${M1(e, n)}`, role: "status", children: B1(e, n) });
}
function zt(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function DR({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = f(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ t(I1, { current: e }),
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
    /* @__PURE__ */ t(j1, { result: s, presentation: r })
  ] });
}
const q1 = "_row_o3t6y_7", D1 = "_cell_o3t6y_11", O1 = "_head_o3t6y_28", H1 = "_name_o3t6y_34", F1 = "_pinned_o3t6y_42", W1 = "_headCell_o3t6y_49", z1 = "_webName_o3t6y_88", K1 = "_webMeta_o3t6y_95", G1 = "_webWarn_o3t6y_103", P = {
  row: q1,
  cell: D1,
  head: O1,
  name: H1,
  pinned: F1,
  headCell: W1,
  webName: z1,
  webMeta: K1,
  webWarn: G1
}, wt = {
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
], U1 = Object.fromEntries(or.map((e) => [e.key, e]));
function V1(e, a) {
  return `mcp.${e}.${a}`;
}
function Y1(e) {
  return Object.keys(wt).includes(e);
}
function J1(e) {
  return wt[e !== void 0 && Y1(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = U1[e];
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
function OR() {
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
function X1({ server: e }) {
  const a = wt[e.connection];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: P.head, children: [
        /* @__PURE__ */ t("span", { className: P.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: P.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => V1(e.name, n)).join(" · ") })
  ] });
}
function Q1(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Z1(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function ek({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${P.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: e });
}
function ak({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function tk({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function nk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: P.row, children: [
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t("span", { className: `${P.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta`, children: Q1(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t("span", { className: `${P.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...Z1(e) }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(ek, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: P.cell, children: /* @__PURE__ */ t(h, { ...J1(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: P.cell, children: [
      /* @__PURE__ */ t(ak, { server: e, onRestart: a }),
      /* @__PURE__ */ t(tk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function HR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(nk, { ...e }) : /* @__PURE__ */ t(X1, { ...e });
}
const rk = "_row_1ibo7_2", lk = "_headCell_1ibo7_14", ok = "_cell_1ibo7_15", ik = "_name_1ibo7_26", sk = "_consequence_1ibo7_32", ck = "_reason_1ibo7_38", dk = "_value_1ibo7_44", uk = "_webRow_1ibo7_60", mk = "_webSetting_1ibo7_73", hk = "_webName_1ibo7_81", wk = "_webConsequence_1ibo7_89", fk = "_webControl_1ibo7_95", _k = "_webState_1ibo7_109", vk = "_webChip_1ibo7_114", I = {
  row: rk,
  headCell: lk,
  cell: ok,
  name: ik,
  consequence: sk,
  reason: ck,
  value: dk,
  webRow: uk,
  webSetting: mk,
  webName: hk,
  webConsequence: wk,
  webControl: fk,
  webState: _k,
  webChip: vk
}, ir = 104, sr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function bk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ge, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(kn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function pk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = sr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(bk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: ir }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function cr(e, a) {
  return String(e ?? a);
}
function gk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function yk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? cr(e.value, "—");
}
function Nk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ge, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function kk(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Nk, { ...e });
  const l = gk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(kn, { options: l, value: cr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: yk(a) });
}
function $k({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(kk, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: ir }, children: /* @__PURE__ */ t(h, { ...sr[n], size: "tag" }) })
  ] });
}
function FR(e) {
  return "presentation" in e ? /* @__PURE__ */ t($k, { ...e }) : /* @__PURE__ */ t(pk, { ...e });
}
const Ck = "_label_h9m4w_7", Sk = "_name_h9m4w_15", Rk = "_column_h9m4w_24", Tk = "_webFrame_h9m4w_57", xk = "_webHead_h9m4w_62", Lk = "_webHeadLabel_h9m4w_74", Ak = "_webLabel_h9m4w_117", Ek = "_webColumns_h9m4w_124", Ik = "_webGroup_h9m4w_130", Mk = "_webPeople_h9m4w_131", Bk = "_webVia_h9m4w_132", Pk = "_webMeta_h9m4w_161", W = {
  label: Ck,
  name: Sk,
  column: Rk,
  webFrame: Tk,
  webHead: xk,
  webHeadLabel: Lk,
  webLabel: Ak,
  webColumns: Ek,
  webGroup: Ik,
  webPeople: Mk,
  webVia: Bk,
  webMeta: Pk
}, jk = {
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
function qk(e) {
  if (!e.matrixRole) return;
  const a = jk[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Dk({ node: e }) {
  const a = qk(e);
  return /* @__PURE__ */ o("span", { className: W.label, children: [
    /* @__PURE__ */ t("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ t(Ok, { role: a, node: e }),
    /* @__PURE__ */ t(Ga, { column: Ka[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ga, { column: Ka[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ga, { column: Ka[2], children: e.requestedVia ?? "" })
  ] });
}
function Ok({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function Hk({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
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
      label: /* @__PURE__ */ t(Dk, { node: n }),
      children: s
    }
  );
}
function Ua({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function Fk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Ua, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Wk() {
  return /* @__PURE__ */ o("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: W.webColumns, children: [
      /* @__PURE__ */ t("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function zk({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Kk(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Gk({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(Wk, {}),
    /* @__PURE__ */ t(Tm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Tn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(zk, { row: n }),
        detail: /* @__PURE__ */ t(Fk, { row: n }),
        expanded: Kk(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function WR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Gk, { ...e }) : /* @__PURE__ */ t(Hk, { ...e });
}
const Uk = "_runbook_b9agc_2", Vk = "_list_b9agc_7", Yk = "_step_b9agc_15", Jk = "_numeral_b9agc_21", Xk = "_body_b9agc_28", Qk = "_head_b9agc_34", Zk = "_title_b9agc_40", e$ = "_detail_b9agc_45", a$ = "_actions_b9agc_50", t$ = "_webList_b9agc_56", n$ = "_webStep_b9agc_60", r$ = "_webBody_b9agc_66", l$ = "_webTitle_b9agc_74", o$ = "_webDetail_b9agc_78", A = {
  runbook: Uk,
  list: Vk,
  step: Yk,
  numeral: Jk,
  body: Xk,
  head: Qk,
  title: Zk,
  detail: e$,
  actions: a$,
  webList: t$,
  webStep: n$,
  webBody: r$,
  webTitle: l$,
  webDetail: o$
}, dr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function ur(e) {
  return String(e + 1).padStart(2, "0");
}
function i$({ step: e, index: a, connection: n }) {
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
function s$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: A.list, children: e.map((r, l) => /* @__PURE__ */ t(i$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: A.actions, children: a })
  ] });
}
function c$({ step: e, index: a, connection: n }) {
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
function d$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: A.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${A.list} ${A.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(c$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${A.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function zR(e) {
  return "presentation" in e ? /* @__PURE__ */ t(d$, { ...e }) : /* @__PURE__ */ t(s$, { ...e });
}
const u$ = "_list_1gu6a_2", m$ = "_check_1gu6a_10", h$ = "_body_1gu6a_16", w$ = "_text_1gu6a_23", f$ = "_pending_1gu6a_32", _$ = "_measured_1gu6a_37", Qe = {
  list: u$,
  check: m$,
  body: h$,
  text: w$,
  pending: f$,
  measured: _$
};
function v$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function b$({ check: e }) {
  const a = v$(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Qe.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ t(ot, { state: a.state, label: a.label }),
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
function KR({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(b$, { check: a }, a.text)) });
}
const p$ = "_root_4aacj_2", g$ = "_list_4aacj_10", y$ = "_line_4aacj_26", N$ = "_at_4aacj_53", k$ = "_text_4aacj_57", $$ = "_foot_4aacj_61", C$ = "_idle_4aacj_73", S$ = "_caret_4aacj_81", R$ = "_jump_4aacj_88", he = {
  root: p$,
  list: g$,
  line: y$,
  at: N$,
  text: k$,
  foot: $$,
  idle: C$,
  caret: S$,
  jump: R$
}, T$ = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function ft(e) {
  return Number.isNaN(Date.parse(e)) ? "" : T$.format(new Date(e));
}
const x$ = { warn: "warning", ok: "ok" };
function L$({ kind: e }) {
  const a = x$[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function A$({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${ft(e)}` });
}
function E$({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${ft(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${he.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${he.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: he.idle, children: i }),
    /* @__PURE__ */ t(A$, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const I$ = 8;
function M$(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > I$;
}
function B$({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const mr = Te(null);
function GR({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Yt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(mr.Provider, { value: i, children: n });
}
function P$() {
  const e = Re(mr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function UR({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = f(null), [i, s] = p(0), [c, d] = P$(), [u, m] = p(!1), _ = e.at(-1);
  S(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const w = () => {
    var B;
    const y = l.current;
    if (!y) return;
    const L = y.querySelectorAll("[data-consline-text]");
    (B = L.item(L.length - 1)) == null || B.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: he.root, children: [
    /* @__PURE__ */ t("ol", { className: he.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(M$(y.currentTarget)), children: e.map((y, L) => /* @__PURE__ */ o("li", { className: `${he.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": L < i, children: [
      /* @__PURE__ */ t("span", { className: he.at, children: ft(y.at) }),
      /* @__PURE__ */ t(L$, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: he.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${L}`)) }),
    /* @__PURE__ */ o(E$, { connection: a, idleSince: n, last: _, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${he.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(B$, { shown: u, onJump: w })
    ] })
  ] });
}
const j$ = "_row_1k8wl_2", q$ = "_head_1k8wl_14", D$ = "_author_1k8wl_20", O$ = "_eta_1k8wl_25", H$ = "_edited_1k8wl_26", F$ = "_body_1k8wl_32", W$ = "_reason_1k8wl_37", z$ = "_actions_1k8wl_42", Ne = {
  row: j$,
  head: q$,
  author: D$,
  eta: O$,
  edited: H$,
  body: F$,
  reason: W$,
  actions: z$
}, K$ = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function G$(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function U$({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function V$({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ne.reason, id: a, children: e })
  ] });
}
function Y$(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function J$(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(U$, { ...e }) : /* @__PURE__ */ t(V$, { reason: e.unavailable, reasonId: e.unavailableId });
}
function VR(e) {
  const { comment: a } = e;
  Y$(e);
  const n = N(), r = `${n}-unavailable`, l = K$[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ne.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ne.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ne.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ne.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ne.reason, id: n, children: G$(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ne.actions, children: /* @__PURE__ */ t(J$, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const X$ = "_root_rvhdw_2", Q$ = "_attach_rvhdw_11", Z$ = "_actions_rvhdw_17", e0 = "_reply_rvhdw_23", a0 = "_replyField_rvhdw_28", t0 = "_send_rvhdw_54", n0 = "_sendIcon_rvhdw_65", r0 = "_sendsAs_rvhdw_75", Be = {
  root: X$,
  attach: Q$,
  actions: Z$,
  reply: e0,
  replyField: a0,
  send: t0,
  sendIcon: n0,
  sendsAs: r0
};
function hr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function l0() {
  return /* @__PURE__ */ t("svg", { className: Be.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function o0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function i0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = hr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    o0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Be.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Be.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Be.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(l0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Be.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function YR(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(i0, { ...e }) : /* @__PURE__ */ t(s0, { ...e });
}
function s0(e) {
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
const c0 = "_list_1yhks_2", d0 = "_item_1yhks_6", u0 = "_body_1yhks_22", m0 = "_text_1yhks_28", h0 = "_evidence_1yhks_37", w0 = "_consequence_1yhks_49", f0 = "_note_1yhks_54", ze = {
  list: c0,
  item: d0,
  body: u0,
  text: m0,
  evidence: h0,
  consequence: w0,
  note: f0
};
function _0({ criterion: e }) {
  return /* @__PURE__ */ t(qe, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Kt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function v0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function b0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: ze.body, children: [
    /* @__PURE__ */ t("span", { className: ze.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: ze.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Kt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: ze.consequence, children: v0(e.why) })
    ] })
  ] });
}
function p0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: ze.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(_0, { criterion: e }),
    /* @__PURE__ */ t(b0, { criterion: e })
  ] });
}
function JR({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${ze.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(p0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: ze.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const g0 = "_list_dwhoz_2", y0 = "_rung_dwhoz_6", N0 = "_name_dwhoz_18", k0 = "_actor_dwhoz_32", pa = {
  list: g0,
  rung: y0,
  name: N0,
  actor: k0
}, $0 = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function C0({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = $0[e.state];
  return /* @__PURE__ */ o("li", { className: pa.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: pa.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${pa.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function XR({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${pa.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(C0, { rung: a }, a.name)) });
}
const S0 = "_sheet_pw37w_2", R0 = "_title_pw37w_9", T0 = "_stage_pw37w_15", x0 = "_effects_pw37w_20", L0 = "_effect_pw37w_20", A0 = "_numeral_pw37w_31", E0 = "_effectText_pw37w_38", I0 = "_refusals_pw37w_43", M0 = "_reasons_pw37w_52", B0 = "_reason_pw37w_52", P0 = "_actions_pw37w_62", ue = {
  sheet: S0,
  title: R0,
  stage: T0,
  effects: x0,
  effect: L0,
  numeral: A0,
  effectText: E0,
  refusals: I0,
  reasons: M0,
  reason: B0,
  actions: P0
};
function j0({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function QR({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), _ = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((w, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: w })
    ] }, w)) }),
    /* @__PURE__ */ t(
      uu,
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
    _ && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ t(h, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((w, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: w.reason }, w.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(j0, { refused: _, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const q0 = "_list_1rowi_2", D0 = "_path_1rowi_7", O0 = "_head_1rowi_21", H0 = "_label_1rowi_28", F0 = "_consequence_1rowi_35", W0 = "_ask_1rowi_36", ea = {
  list: q0,
  path: D0,
  head: O0,
  label: H0,
  consequence: F0,
  ask: W0
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
function z0({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", onClick: () => n(e.kind), children: Za[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Ut(a), size: "sm", disabled: !0, describedBy: r, children: Za[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function K0({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Gt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? Za[e.kind] }),
      /* @__PURE__ */ t(h, { role: Gt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(z0, { path: e, primary: a, onChoose: n })
  ] });
}
function ZR({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(K0, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const G0 = "_list_1m7i0_2", U0 = "_item_1m7i0_6", V0 = "_node_1m7i0_18", Y0 = "_body_1m7i0_24", J0 = "_head_1m7i0_30", X0 = "_stage_1m7i0_36", Q0 = "_version_1m7i0_41", Z0 = "_sentence_1m7i0_49", eC = "_meta_1m7i0_54", $e = {
  list: G0,
  item: U0,
  node: V0,
  body: Y0,
  head: J0,
  stage: X0,
  version: Q0,
  sentence: Z0,
  meta: eC
}, aC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function tC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: $e.head, children: [
    /* @__PURE__ */ t("span", { className: $e.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: $e.version, title: e.version, children: e.version }) : null
  ] });
}
function nC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${$e.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${$e.node} ward-history-node`, children: /* @__PURE__ */ t(qe, { size: 9, kind: aC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${$e.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(tC, { entry: e }),
      /* @__PURE__ */ t("span", { className: $e.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${$e.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${ne(e.cost)}`
      ] })
    ] })
  ] });
}
function e2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${$e.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(nC, { entry: a }, a.stage + String(n))) });
}
const rC = "_thread_1e70p_3", lC = "_turn_1e70p_8", oC = "_who_1e70p_27", iC = "_body_1e70p_32", ga = {
  thread: rC,
  turn: lC,
  who: oC,
  body: iC
}, wr = Te(!1);
function a2({ children: e, density: a }) {
  return /* @__PURE__ */ t(wr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${ga.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function t2({ turn: e }) {
  if (!Re(wr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${ga.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${ga.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${ga.body} ward-chat-body`, children: e.body })
  ] });
}
const sC = "_list_yiolt_3", cC = "_row_yiolt_7", dC = "_label_yiolt_20", uC = "_n_yiolt_26", mC = "_cause_yiolt_33", oa = {
  list: sC,
  row: cC,
  label: dC,
  n: uC,
  cause: mC
};
function hC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const wC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function fC({ row: e, formatNumber: a }) {
  return hC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(qe, { size: 8, ...wC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(_C, { cause: e.cause })
  ] });
}
function _C({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function n2({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(fC, { row: n, formatNumber: a }, n.label)) });
}
const vC = "_root_1jxwp_2", bC = {
  root: vC
};
function r2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: bC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const pC = "_row_dhbre_3", gC = "_key_dhbre_13", yC = "_stack_dhbre_24", NC = "_value_dhbre_32", kC = "_evidence_dhbre_39", $C = "_mark_dhbre_47", Xe = {
  row: pC,
  key: gC,
  stack: yC,
  value: NC,
  evidence: kC,
  mark: $C
};
function CC({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(ot, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function l2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(CC, { state: e.state }) })
  ] });
}
const SC = "_cell_gh2sd_2", RC = {
  cell: SC
}, TC = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function xC(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function LC(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function AC(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: xC(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function EC(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function o2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  LC(e, n);
  const r = EC(e);
  return /* @__PURE__ */ t(
    Cu,
    {
      label: "Rejection routing",
      columns: TC,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: RC.cell, "data-norerun": l.noRerun ? !0 : void 0, children: AC(l, i) }),
      empty: a ?? /* @__PURE__ */ t(mh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const IC = "_row_1f2re_2", MC = "_title_1f2re_12", BC = "_turns_1f2re_18", PC = "_waiting_1f2re_19", jC = "_resolved_1f2re_20", qC = "_activity_1f2re_21", DC = "_cost_1f2re_28", OC = "_link_1f2re_29", HC = "_tableLink_1f2re_47", FC = "_tableRecord_1f2re_48", WC = "_tableRow_1f2re_59", zC = "_tableTitle_1f2re_71", KC = "_tableResolved_1f2re_76", GC = "_tableMeta_1f2re_87", UC = "_tableCost_1f2re_94", VC = "_tableActivity_1f2re_95", YC = "_tableState_1f2re_105", D = {
  row: IC,
  title: MC,
  turns: BC,
  waiting: PC,
  resolved: jC,
  activity: qC,
  cost: DC,
  link: OC,
  tableLink: HC,
  tableRecord: FC,
  tableRow: WC,
  tableTitle: zC,
  tableResolved: KC,
  tableMeta: GC,
  tableCost: UC,
  tableActivity: VC,
  tableState: YC
}, fr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function JC(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function XC(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function QC(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const ZC = { duplicate: "Closed · duplicate" };
function eS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: D.tableMeta, text: `waiting on ${e}` });
}
function aS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: D.tableCost, children: e === void 0 ? null : ne(e) });
}
function tS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${D.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function nS({ session: e, href: a }) {
  const n = fr[e.state];
  return /* @__PURE__ */ o("tr", { className: D.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: D.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${D.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: D.tableMeta, children: XC(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: D.tableResolved, children: [
      QC(e.resolved),
      /* @__PURE__ */ t(eS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(aS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: D.tableActivity, children: JC(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: D.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: ZC[e.state] ?? n.label }),
      /* @__PURE__ */ t(tS, { link: e.link })
    ] }) })
  ] });
}
function rS({ session: e }) {
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
function i2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(nS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(rS, { session: e.session });
}
const lS = "_block_1yy2v_3", oS = "_list_1yy2v_9", iS = "_line_1yy2v_14", et = {
  block: lS,
  list: oS,
  line: iS
}, sS = { warn: "warning", ok: "ok" };
function cS({ kind: e }) {
  const a = sS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function dS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${et.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(cS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function s2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${et.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: et.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(dS, { line: n }, `${r}-${n.text}`)) }) });
}
const uS = "_band_tt7hp_1", mS = "_head_tt7hp_8", hS = "_cell_tt7hp_19", wS = "_index_tt7hp_35", fS = "_title_tt7hp_42", _S = "_note_tt7hp_48", vS = "_cellTitle_tt7hp_53", bS = "_cellBody_tt7hp_58", pS = "_tag_tt7hp_64", ye = {
  band: uS,
  head: mS,
  cell: hS,
  index: wS,
  title: fS,
  note: _S,
  cellTitle: vS,
  cellBody: bS,
  tag: pS
}, Vt = 4;
function c2({ index: e, title: a, note: n, cells: r }) {
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
  LS as ACCENT_PRESETS,
  YS as ActionStack,
  UR as ActivityConsole,
  DS as AdminIcon,
  T_ as AgentCard,
  OS as AppShell,
  AR as AppearanceStrip,
  c2 as Band,
  GS as BarChart,
  Gh as BoardColumn,
  dR as BoardFootnote,
  uR as BoardHeader,
  jS as BoardIcon,
  tR as BoardScroller,
  b as Btn,
  xS as CHIP_ROLES,
  er as CREDENTIAL_COLUMNS,
  KS as Callout,
  ER as CapabilityRow,
  t2 as ChatMessage,
  rn as Checkbox,
  h as Chip,
  ta as ClampText,
  VR as ClarificationRow,
  yR as ClauseRuleRow,
  gR as ClauseRules,
  Mn as ColourLadder,
  IR as ComponentRow,
  YR as Composer,
  hR as ConfigRow,
  mR as ConfigRowHead,
  it as ConnectionMark,
  GR as ConsoleAnnounceProvider,
  a2 as Conversation,
  uu as CostMeter,
  BR as CredentialRow,
  MR as CredentialRowHead,
  JR as CriteriaList,
  Ri as Crumb,
  AS as DENSITIES,
  n2 as DeliveryHealth,
  lR as DeniedState,
  BS as DisabledScope,
  kR as DryRunRail,
  mh as EmptyState,
  PR as EnvCard,
  M as Field,
  rR as FilteredEmpty,
  eR as FormStack,
  Da as GateChecklist,
  XR as GateLadder,
  Cu as Grid,
  CR as HandoffRuleRow,
  $R as HandoffRules,
  PS as HomeIcon,
  wR as ItemDrawer,
  jR as KeyPanel,
  jr as LIVE_EVENT_TYPES,
  Jf as LegacyBoardColumn,
  _R as LegacyBoardHeader,
  vR as LegacyConfigRow,
  pR as LegacyItemDrawer,
  Wf as LegacyOverCapNote,
  bR as LegacyPreviewRail,
  An as LegacyWorkCard,
  xe as LiveIndicator,
  oR as LoadFailed,
  cR as Loading,
  or as MCP_SERVER_COLUMNS,
  ot as Mark,
  DR as MarkUpload,
  qe as Marker,
  HR as McpServerRow,
  OR as McpServerRowHead,
  Gs as Menu,
  Is as MenuButton,
  SR as NewStreamModal,
  fh as OverCapNote,
  Ma as OverflowRow,
  na as Overlay,
  NR as PARTIAL_STEP_REASON,
  ir as POLICY_CHIP_WIDTH,
  XS as PageFrame,
  zS as PageHeader,
  US as PlainList,
  FR as PolicyRow,
  fR as PreviewRail,
  Ka as ROLE_MATRIX_COLUMNS,
  Gn as RULE_ACTIONS,
  Cn as Radio,
  r2 as ReadyChecklist,
  ZS as RecordSection,
  QR as RequeueSheet,
  ZR as ResolveBlock,
  l2 as ResolvedFieldRow,
  WR as RoleMatrixRow,
  o2 as RoutingTable,
  RR as RuleRow,
  zR as RunbookSteps,
  Pr as STREAM_STEPS,
  aR as SectionBand,
  Et as SectionHeader,
  kn as SegmentedControl,
  hn as Select,
  i2 as SessionRow,
  WS as Sidebar,
  TR as StageColumn,
  nR as StageGrid,
  e2 as StageHistory,
  cp as StageListEditor,
  iR as StaleStrip,
  Pa as StatStrip,
  xR as StreamRow,
  qS as StudioIcon,
  QS as SubjectRail,
  Ge as Switch,
  FS as TabLinks,
  VS as TableHead,
  HS as Tabs,
  CS as ThemeProvider,
  LR as ToolRow,
  JS as TopBar,
  Tm as Tree,
  Tn as TreeRow,
  s2 as TypedInputBlock,
  yo as UNSAFE_HREF,
  KR as ValidationList,
  kS as VisibilityProvider,
  $S as Visible,
  TS as WARD_VERSION,
  qa as WorkCard,
  sR as WriteUnavailableStrip,
  JC as agoSince,
  kr as clock,
  Sp as colourStatus,
  ee as count,
  ce as duration,
  at as elapsed,
  RS as eventSourceTransport,
  La as isStreamStep,
  Aa as isValidatedStreamStep,
  rv as ladderValidation,
  J1 as mcpConnectionChip,
  V1 as mcpToolName,
  ne as money,
  we as ms,
  xn as ordered,
  Xt as ratio,
  _N as restartLabel,
  H as safeHref,
  de as stamp,
  tt as stream,
  IS as streamChip,
  Ba as streamChipProps,
  pe as streamColour,
  Dr as streamHex,
  ES as streamVars,
  _a as useBorderFlash,
  je as useDisabledScope,
  Ir as useFocusTrap,
  MS as useLiveFeed,
  SS as useReturnFocus,
  xa as useRovingTabindex,
  nt as useTicker,
  $r as useVisible,
  z as v,
  qR as validateMark,
  da as validatedStep,
  Zt as validatedStreamSteps
};
