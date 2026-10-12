import { jsx as t, Fragment as T, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qt, useContext as Te, createContext as xe, useState as p, useEffect as C, useCallback as Q, useRef as _, useLayoutEffect as aa, useId as N, isValidElement as kr, Children as $r, Fragment as Cr } from "react";
import { createPortal as Sr, flushSync as Zt } from "react-dom";
function ce(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const n = Math.floor(e / 36e5);
  return n < 24 ? `${n}h ${a % 60}m` : `${Math.floor(n / 24)}d ${n % 24}h`;
}
const vt = (e) => String(e).padStart(2, "0");
function tt(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const n = Math.floor(a / 60);
  return n < 60 ? `${n}m ${vt(a % 60)}s` : `${Math.floor(n / 60)}h ${vt(n % 60)}m`;
}
const Rr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function de(e) {
  const a = Rr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
}
function re(e) {
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
function en(e, a) {
  return `${e} / ${a}`;
}
const Tr = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function xr(e) {
  return Tr.format(new Date(e));
}
const an = xe(/* @__PURE__ */ new Set());
function eR({ hidden: e, children: a }) {
  const n = Qt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(an.Provider, { value: n, children: a });
}
function Lr(e) {
  return !Te(an).has(e);
}
function aR({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(T, { children: Lr(e) ? a : n });
}
const Ar = "(prefers-color-scheme: dark)";
function bt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Ar) : null;
}
function Er(e) {
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
function Ha(e, a) {
  C(() => {
    const n = document.documentElement;
    return n.setAttribute(e, a), () => n.removeAttribute(e);
  }, [e, a]);
}
function Ir(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function tR({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Er(e === "system");
  return Ha("data-theme", Ir(e, l)), Ha("data-accent", a), Ha("data-density", n), /* @__PURE__ */ t(T, { children: r });
}
const Mr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Br(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function Pr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function qr(e, a, n, r) {
  return e.shiftKey ? Br(a, n) ? r : void 0 : document.activeElement === r || Pr(a) ? n : void 0;
}
function Or(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = qr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function jr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Mr));
      Or(n, e.current, r);
    },
    [e]
  ) };
}
function nR(e, a = !0) {
  C(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const pt = { ArrowUp: -1, ArrowDown: 1 }, gt = { ArrowLeft: -1, ArrowRight: 1 }, Dr = (e, a, n) => Math.min(n, Math.max(a, e));
function Hr(e, a) {
  if (a !== "horizontal" && e in pt) return pt[e];
  if (a !== "vertical" && e in gt) return gt[e];
}
function Ea({ orientation: e = "both" } = {}) {
  const [a, n] = p(0), r = _(/* @__PURE__ */ new Map()), l = _(!1);
  aa(() => {
    var f;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const m = u[0], w = l.current;
    l.current = !1, n(m), w && ((f = r.current.get(m)) == null || f.focus());
  });
  const i = Q((u) => n(u), []), s = Q((u) => {
    var m;
    n(u), (m = r.current.get(u)) == null || m.focus();
  }, []), c = Q(
    (u) => {
      const m = Array.from(r.current.keys());
      if (m.length === 0) return;
      const w = Math.max(0, m.indexOf(a)), f = Hr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(m[Dr(w + f, 0, m.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(m[0])) : u.key === "End" && (u.preventDefault(), s(m[m.length - 1]));
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
const rR = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, lR = "0.2.0", oR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Fr = [1, 2, 3, 4, 5, 6], tn = [1, 2, 3], zr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], iR = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], sR = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], W = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    edge: "var(--ward-color-edge)",
    panelEdge: "var(--ward-color-panelEdge)",
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
}, fe = {
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
function nt(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Ia(e) {
  return Fr.includes(e);
}
function ca(e) {
  return tn.includes(e);
}
function Wr(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function cR(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Kr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Gr(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return Kr[e];
}
function yt(e) {
  return typeof e != "string" ? null : zr.includes(e) ? e : null;
}
function Ur(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Vr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Yr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Jr(e, a, n) {
  const r = Ur(e);
  if (r === null) return null;
  const l = yt(n) ?? yt(r.type);
  return l === null ? null : { ...r, type: l, id: Vr(r, a), at: Yr(r) };
}
function Xr(e, a) {
  return e >= fe.staleAfter ? "stale" : e >= fe.heartbeat && a === "live" ? "reconnecting" : null;
}
function Qr(e, a, n) {
  return e >= fe.heartbeat && !a && n !== null;
}
function dR(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), m = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), P = Q((R) => {
    E.current = R, r(R);
  }, []), ae = Q(() => {
    c.current = Date.now();
  }, []), ge = Q((R) => {
    for (const [U, ye] of s.current)
      (ye === "*" || R.itemKey === ye) && U(R);
  }, []), te = Q(() => {
    m.current = a(e, { lastEventId: d.current }, {
      onEvent: (R, U, ye) => {
        const Fe = Jr(R, U, ye);
        Fe !== null && (Fe.id && (d.current = Fe.id), ae(), y.current = !1, P("live"), i(Fe.at), ge(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, ae(), P("live");
      },
      onError: () => {
        var U;
        (U = m.current) == null || U.close(), m.current = null, y.current = !0, E.current !== "stale" && P("reconnecting");
        const R = Math.min(fe.reconnectBase * 2 ** u.current, fe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(te, R);
      }
    });
  }, [ge, P, ae, a, e]), Ee = Q((R) => {
    y.current = !0, R.close(), m.current = null, w.current = window.setTimeout(te, fe.reconnectBase);
  }, [te]), Ve = Q((R, U) => (s.current.set(U, R), () => {
    s.current.delete(U);
  }), []);
  return C(() => (te(), f.current = window.setInterval(() => {
    const R = Date.now() - c.current, U = Xr(R, E.current);
    U && P(U);
    const ye = m.current;
    Qr(R, y.current, ye) && Ee(ye);
  }, fe.tick), () => {
    var R;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (R = m.current) == null || R.close(), m.current = null;
  }), [te, Ee, P]), { connection: n, lastEventAt: l, subscribe: Ve };
}
function rt(e, a) {
  const n = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return C(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, fe.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, n]), Math.max(0, r - n);
}
const Zr = { blue: "running", orange: "waiting", green: "done" };
function el() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Nt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ba(e, a) {
  const n = _(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (el() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${Zr[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Nt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Nt(s), fe.flash)));
  }, [a, e]);
  return C(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const al = "_root_1otpc_2", tl = {
  root: al
};
function nl(e, a, n, r, l) {
  const i = [tt(a)];
  return e || i.push(`as of ${xr(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = rt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = nl(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${tl.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      de(e)
    ] })
  ] });
}
const rl = "_app_xefdm_1", ll = "_side_xefdm_34", ol = "_sideTop_xefdm_45", il = "_sideBody_xefdm_59", sl = "_iconRail_xefdm_97", cl = "_railItem_xefdm_106", dl = "_railIcon_xefdm_127", ul = "_railDot_xefdm_132", ml = "_railLetter_xefdm_138", hl = "_main_xefdm_144", wl = "_rail_xefdm_106", fl = "_page_xefdm_166", _l = "_headerRow_xefdm_189", vl = "_sidebarToggle_xefdm_196", bl = "_headerSlot_xefdm_201", pl = "_drawerSide_xefdm_206", gl = "_root_xefdm_253", yl = "_topbar_xefdm_260", Nl = "_mark_xefdm_271", kl = "_brand_xefdm_278", $l = "_tagline_xefdm_284", Cl = "_identity_xefdm_290", Sl = "_tools_xefdm_291", Rl = "_nav_xefdm_301", Tl = "_metadata_xefdm_308", xl = "_actor_xefdm_323", Ll = "_detail_xefdm_324", Al = "_content_xefdm_369", El = "_toolsPanel_xefdm_385", Il = "_skip_xefdm_411", $ = {
  app: rl,
  side: ll,
  sideTop: ol,
  sideBody: il,
  iconRail: sl,
  railItem: cl,
  railIcon: dl,
  railDot: ul,
  railLetter: ml,
  main: hl,
  rail: wl,
  page: fl,
  headerRow: _l,
  sidebarToggle: vl,
  headerSlot: bl,
  drawerSide: pl,
  root: gl,
  topbar: yl,
  mark: Nl,
  brand: kl,
  tagline: $l,
  identity: Cl,
  tools: Sl,
  nav: Rl,
  metadata: Tl,
  actor: xl,
  detail: Ll,
  content: Al,
  toolsPanel: El,
  skip: Il
};
function da(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Ml = "_scope_1an6i_2", Bl = {
  scope: Ml
}, nn = xe(null);
function uR({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${Bl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(nn.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Ae() {
  return Te(nn);
}
function Ma(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : da(e, a.reasonId);
}
const Pl = "_btn_tzr89_2", ql = "_primary_tzr89_14", Ol = "_destructive_tzr89_25", jl = "_secondary_tzr89_35", Dl = "_ghost_tzr89_40", Hl = "_overflow_tzr89_49", Fl = "_sm_tzr89_56", zl = "_disabled_tzr89_60", ha = {
  btn: Pl,
  primary: ql,
  destructive: Ol,
  secondary: jl,
  ghost: Dl,
  overflow: Hl,
  sm: Fl,
  disabled: zl
};
function Wl(e, a, n, r) {
  const l = a === "sm" ? [ha.sm, "ward-btn--sm"] : [], i = n ? [ha.disabled] : [];
  return [ha.btn, ha[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Kl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Gl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Ul(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Vl(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Yl(e, a, n) {
  return Vl(e.describedBy, a && n);
}
function Jl({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Xl(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = Ae()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(Ql, { ...e });
}
function Ql(e) {
  const a = Ae();
  Gl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Ul(e, a), s = N();
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Wl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Yl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Kl(n, e.controls),
        children: Xl(e)
      }
    ),
    /* @__PURE__ */ t(Jl, { id: s, reason: i })
  ] });
}
let lt = "none";
function Zl(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (lt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", Zl, !0), document.addEventListener("pointerdown", () => {
  lt = "pointer";
}, !0));
function eo() {
  return lt === "key";
}
function ia(e) {
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
const ao = "_scrim_1cawq_2", to = "_drawer_1cawq_10", no = "_sheet_1cawq_14", ro = "_modal_1cawq_18", lo = "_panel_1cawq_23", oo = "_start_1cawq_44", io = "_header_1cawq_67", so = "_title_1cawq_75", co = "_body_1cawq_79", uo = "_close_1cawq_106", Se = {
  scrim: ao,
  drawer: to,
  sheet: no,
  modal: ro,
  panel: lo,
  start: oo,
  header: io,
  title: so,
  body: co,
  close: uo
}, mo = xe(null), ka = [], $a = /* @__PURE__ */ new Map();
function ho(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function wo(e, a) {
  let n = $a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, $a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function fo(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !ho(r) && wo(e, r);
}
function _o(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (fo(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function vo(e) {
  for (const a of e.claims) {
    const n = $a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), $a.delete(a)));
  }
}
function bo(e, a) {
  const n = { root: e, claims: [] };
  return ka.push(n), _o(n, a), n;
}
function po(e) {
  const a = ka.indexOf(e);
  a >= 0 && ka.splice(a, 1), vo(e);
}
function kt(e) {
  return e !== null && ka.at(-1) === e;
}
function go(e, a, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = bo(i, a);
    return r.current = c, () => {
      var u, m;
      const d = kt(c);
      po(c), r.current = null, d && ((m = (u = l.current ?? s) == null ? void 0 : u.focus) == null || m.call(u));
    };
  }, [a]), Q(() => kt(r.current), []);
}
function yo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function No(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function ko({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Se.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("header", { className: `${Se.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Se.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Se.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function $o(e) {
  return `${Se.scrim} ${Se[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Co(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Se.panel} ${Se[e]} ward-overlay-panel${n}${r}`;
}
function So(e) {
  const a = Te(mo);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = _(null), n = _(null), r = N(), l = So(e.container), i = ia("(min-width: 768px)"), s = yo(e.kind, i), c = No(e, r), d = jr(n), [u] = p(eo), m = go(a, l, e.returnFocusTo), w = Q(() => {
    m() && e.onClose();
  }, [e.onClose, m]);
  return C(() => {
    var f;
    m() && ((f = n.current) == null || f.focus());
  }, [m]), C(() => {
    const f = (y) => {
      y.key === "Escape" && w();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [w]), Sr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: $o(s),
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
            className: Co(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => m() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Se.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(ko, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ro = /^([a-z][a-z0-9+.-]*):/i, To = /* @__PURE__ */ new Set(["http", "https"]), xo = "#";
function Lo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Ro.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = Lo(e);
  return a === void 0 || To.has(a) ? e : xo;
}
function Ao(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function rn(e) {
  const a = Ao(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Eo(e, a) {
  C(() => {
    const n = e.current;
    if (!n) return;
    const r = () => rn(n);
    n.addEventListener("scroll", r, { passive: !0 });
    const l = typeof ResizeObserver > "u" ? null : new ResizeObserver(r);
    for (const i of [n, ...n.children]) l == null || l.observe(i);
    return r(), () => {
      n.removeEventListener("scroll", r), l == null || l.disconnect();
    };
  }, [e, a]);
}
function Io(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function ln(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = Io(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), rn(r);
  }, [e, a, n]);
}
const Mo = "_row_160e9_2", Bo = {
  row: Mo
};
function Po(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ba({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Eo(u, n), /* @__PURE__ */ t(r, { ref: u, className: [Bo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Po(l, r), ...c, children: a });
}
const qo = "_icon_1ylqy_2", Oo = {
  icon: qo
};
function ua({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Oo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function mR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function hR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function wR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function fR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function jo() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const on = "ward:sidebar-collapsed", Do = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ho() {
  try {
    return window.localStorage.getItem(on) === "true";
  } catch {
    return !1;
  }
}
function Fo(e) {
  try {
    window.localStorage.setItem(on, String(e));
  } catch {
  }
}
function zo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Wo(e) {
  return e instanceof Element && e.closest(Do) !== null;
}
function Ko(e) {
  return e.key === "[" && !zo(e) && !Wo(e.target);
}
function Go(e) {
  const [a, n] = p(Ho), r = () => {
    Fo(!a), n(!a);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Ko(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Uo() {
  const e = ia("(max-width: 767.98px)"), a = ia("(max-width: 1023.98px)");
  return e ? "phone" : a ? "medium" : "wide";
}
function Vo(e) {
  const a = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !a && i(!1), { narrow: a, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Yo({ header: e, label: a, drawer: n }) {
  return n.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.drawerId, children: a }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e })
  ] }) : e;
}
function Jo(e, a) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", a), window.addEventListener("popstate", a), () => {
        window.removeEventListener("hashchange", a), window.removeEventListener("popstate", a);
      };
  }, [e, a]);
}
function Xo({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (Jo(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: sn(e, !1) }) });
}
function Qo(e) {
  const [a, n] = p(!1);
  return a && e !== "medium" && n(!1), { open: a, toggle: () => n(!a) };
}
function Zo(e, a) {
  const n = Go(e === "wide" && !a), r = Qo(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function ei(e, a) {
  const n = Zo(a, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return ti(e.collapsed, a);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: a !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const ai = (e) => e.collapsed && e.drawsStrip;
function ti(e, a) {
  return { enabled: !1, collapsed: a === "medium" || e && a === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $t = (e) => e ? "" : void 0;
function sn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function ni({ fold: e }) {
  return e.enabled ? /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(jo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] }) }) : null;
}
function ri({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": nt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function li({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(ri, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function oi({ sidebar: e, label: a, iconRail: n, fold: r }) {
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(ni, { fold: r }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: r.collapsed && !r.drawsStrip, children: sn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(li, { items: n ?? [], label: a })
  ] });
}
const ii = (e) => e != null;
function si(e) {
  const { sidebar: a, header: n, children: r, rail: l, iconRail: i, pageFill: s } = e, c = ii(l), d = Uo(), u = Vo(d), m = ei(e, d), w = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(c), "data-collapsed": String(m.collapsed), "data-consumer-fold": $t(ai(m)), "data-band": d, children: [
    !u.narrow && /* @__PURE__ */ t(oi, { sidebar: a, label: w, iconRail: i, fold: m }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(Yo, { header: n, label: w, drawer: u }),
      /* @__PURE__ */ t("div", { className: $.page, "data-fill": $t(s === !0), children: r })
    ] }),
    c && /* @__PURE__ */ t("div", { className: $.rail, children: l }),
    /* @__PURE__ */ t(Xo, { sidebar: a, label: w, drawer: u })
  ] });
}
function ci({ destinations: e, active: a }) {
  const n = _(null);
  return ln(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ba, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ya({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function di({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Ya, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Ya, { value: a, className: $.detail })
  ] });
}
function ui() {
  const e = ia("(max-width: 767.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function mi({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function hi({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function wi(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Ya, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(ci, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(di, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(mi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function fi(e) {
  const a = N(), n = ui();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(wi, { ...e, menu: n }),
    /* @__PURE__ */ t(hi, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function _i(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function _R(e) {
  return _i(e) ? /* @__PURE__ */ t(si, { ...e }) : /* @__PURE__ */ t(fi, { ...e });
}
const vi = "_root_itg9o_2", bi = "_row_itg9o_8", pi = "_box_itg9o_14", gi = "_label_itg9o_21", yi = "_labelHidden_itg9o_26", Ni = "_lockedNote_itg9o_36", ki = "_consequence_itg9o_44", $i = "_sample_itg9o_79", Be = {
  root: vi,
  row: bi,
  box: pi,
  label: gi,
  labelHidden: yi,
  lockedNote: Ni,
  consequence: ki,
  sample: $i
};
function Ci(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function Si({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function Ri({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ti({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function cn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Ae(), l = Ci(e, r);
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
          "aria-describedby": Ma(da(n, e.describedBy), r),
          title: r == null ? void 0 : r.reason
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: e.labelHidden ? Be.labelHidden : Be.label, children: [
        e.label,
        /* @__PURE__ */ t(Ri, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Ti, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(Si, { id: n, text: e.consequence })
  ] });
}
const xi = "_chip_pq6tb_2", Li = {
  chip: xi
}, Ai = {
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
function Ei(e, a) {
  if (e === "stream") return Ii(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Ai[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Ii(e) {
  if (!e || !ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = nt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function h({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Li.chip} ward-chip ward-chip--${e}`, style: Ei(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const Mi = "_clamp_zn74g_3", Ct = {
  clamp: Mi
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Ct.clamp : `${Ct.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ma(e) {
  return typeof e == "number" && ca(e) ? e : null;
}
function pe(e, a) {
  const n = ma(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Pa(e, a) {
  const n = ma(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Bi = "_root_13eei_3", Pi = "_nav_13eei_8", qi = "_list_13eei_16", Oi = "_item_13eei_24", ji = "_link_13eei_44", Di = "_sep_13eei_54", Hi = "_current_13eei_58", Fi = "_chips_13eei_62", Me = {
  root: Bi,
  nav: Pi,
  list: qi,
  item: Oi,
  link: ji,
  sep: Di,
  current: Hi,
  chips: Fi
};
function zi({ step: e, isCurrent: a }) {
  return a ? /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function Wi({ path: e, chips: a, current: n = !0 }) {
  return /* @__PURE__ */ t("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(zi, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((r) => /* @__PURE__ */ t(h, { ...r }, r.label)) }) : null
  ] }) });
}
function dn(e, a, n) {
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
const Ki = 500;
function un(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function mn() {
  const e = _(""), a = _(void 0);
  return C(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Ki), e.current);
}
const wa = 4;
function Gi(e, a, n) {
  const r = Math.max(0, n - e.bottom - wa * 2), l = Math.max(0, e.top - wa * 2);
  return a <= r || r >= l ? { top: e.bottom + wa, maxHeight: r } : { top: e.top - wa - Math.min(a, l), maxHeight: l };
}
function Ui(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Vi(e, a, n, r) {
  return { ...Gi(e, a.height, n.height), left: Ui(e, a.width, n.width, r) };
}
function pa(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Yi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pa(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Ji(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function St(e, a, n) {
  const r = Ji(e), l = Yi(e, a), i = Vi(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pa(i.left - l.box.left), top: pa(i.top - l.box.top), maxHeight: pa(i.maxHeight) }), r();
}
function Xi(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function hn(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = Xi(r), s = () => St(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && St(a.current, e.current, n);
  });
}
const Qi = "_root_1lgbn_2", Zi = "_trigger_1lgbn_7", es = "_value_1lgbn_47", as = "_menu_1lgbn_65", ts = "_find_1lgbn_87", ns = "_list_1lgbn_103", rs = "_option_1lgbn_114", ls = "_check_1lgbn_133", os = "_empty_1lgbn_144", _e = {
  root: Qi,
  trigger: Zi,
  value: es,
  menu: as,
  find: ts,
  list: ns,
  option: rs,
  check: ls,
  empty: os
}, is = 7;
function ss(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Rt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function cs(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Rt(e.options, e.value)), d = (u) => {
    var m;
    Zt(() => r(!1)), u && ((m = a.current) == null || m.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: ss(e.options, l),
    findable: e.options.length > is,
    show: () => {
      e.disabled || (i(""), c(Rt(e.options, e.value)), r(!0));
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
function ds(e, a) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function us(e) {
  const a = mn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function wn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function ms(e) {
  return { ...wn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function fn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const hs = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function ws(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      hs.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function fs({ entry: e, at: a, menu: n, ids: r, value: l }) {
  return /* @__PURE__ */ o(
    "li",
    {
      id: r.option(e.index),
      role: "option",
      "aria-selected": e.option.value === l,
      "data-active": a === n.active || void 0,
      className: _e.option,
      onMouseDown: (i) => i.preventDefault(),
      onMouseMove: () => n.to(a),
      onClick: () => n.pick(e),
      children: [
        /* @__PURE__ */ t("span", { className: _e.check, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { className: _e.label, children: e.option.label })
      ]
    }
  );
}
function ot(e, a) {
  const n = e.entries[e.active];
  return n ? a.option(n.index) : void 0;
}
function _s({ menu: e, ids: a, focusRef: n }) {
  return /* @__PURE__ */ t(
    "input",
    {
      ref: n,
      className: _e.find,
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
      onKeyDown: fn(e, wn(e), () => {
      })
    }
  );
}
function vs({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = us(a), s = _(null);
  hn(l, s);
  const c = (d) => {
    un(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(_s, { menu: a, ids: n, focusRef: r }),
    /* @__PURE__ */ t(
      "ul",
      {
        ref: a.findable ? void 0 : r,
        id: n.list,
        role: "listbox",
        tabIndex: -1,
        className: _e.list,
        "aria-label": e["aria-label"],
        "aria-labelledby": e["aria-labelledby"],
        "aria-activedescendant": a.findable ? void 0 : ot(a, n),
        onKeyDown: fn(a, ms(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(fs, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function bs(e, a) {
  const n = e.open ? ot(e, a) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function _n(...e) {
  return e.filter(Boolean).join(" ");
}
function ps(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function gs({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: _n(_e.trigger, e.triggerClassName),
      "aria-haspopup": "listbox",
      "aria-expanded": a.open,
      "aria-controls": a.open ? n.list : void 0,
      "aria-label": e["aria-label"],
      "aria-labelledby": e["aria-labelledby"],
      "aria-describedby": da(e["aria-describedby"], n.value),
      "aria-invalid": e["aria-invalid"],
      "data-ward-size": e.size,
      disabled: e.disabled,
      title: s,
      ...ws(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: ps(e) })
    }
  );
}
function vn(e) {
  const a = Ae(), n = a ? { ...e, disabled: !0, "aria-describedby": Ma(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (m) => `${r}-option-${m}` }, i = _(null), s = _(null), c = _(null), d = cs(n, s), u = ds(d.open, c);
  return dn(d.open, i, () => d.close(!1)), bs(d, l), /* @__PURE__ */ o("div", { ref: i, className: _n(_e.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(gs, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(vs, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const ys = "_field_1ensj_2", Ns = "_label_1ensj_8", ks = "_labelHidden_1ensj_15", $s = "_control_1ensj_25", Cs = "_mono_1ensj_45", Ss = "_area_1ensj_50", Rs = "_invalid_1ensj_57", je = {
  field: ys,
  label: Ns,
  labelHidden: ks,
  control: $s,
  mono: Cs,
  area: Ss,
  invalid: Rs
}, Ts = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, bn = (e) => `${e}-label`;
function xs({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? Ts : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Ls({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    vn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": bn(a.id),
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
function As({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Es = { input: xs, select: Ls, textarea: As };
function Is(e, a, n) {
  const r = Es[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function Ms(e, a, n, r) {
  const l = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: !!(e.disabled || r),
    placeholder: e.placeholder,
    title: r == null ? void 0 : r.reason,
    "aria-invalid": l,
    "aria-describedby": Ma(da(l ? n : void 0, e.describedBy), r),
    onChange: (i) => {
      var s;
      return (s = e.onChange) == null ? void 0 : s.call(e, i.target.value);
    }
  };
}
function Bs(e) {
  const a = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function Ps(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = Ms(e, a, n, Ae()), l = Bs(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: bn(a), className: Ps(e.labelHidden), htmlFor: a, children: e.label }),
    Is(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const qs = "_root_16bw8_2", Os = "_trigger_16bw8_9", js = "_panel_16bw8_33", Ds = "_menu_16bw8_53", Hs = "_group_16bw8_58", Fs = "_heading_16bw8_63", zs = "_item_16bw8_69", Ws = "_description_16bw8_84", Ks = "_separator_16bw8_108", Gs = "_footer_16bw8_114", he = {
  root: qs,
  trigger: Os,
  panel: js,
  menu: Ds,
  group: Hs,
  heading: Fs,
  item: zs,
  description: Ws,
  separator: Ks,
  footer: Gs
}, pn = xe(null);
function Us(e, a) {
  const [n, r] = p({ open: e, start: null, request: 0 });
  return {
    ...n,
    show: (l) => r((i) => ({ open: !0, start: l, request: i.request + 1 })),
    close: (l) => {
      var i;
      Zt(() => r((s) => ({ ...s, open: !1 }))), l && ((i = a.current) == null || i.focus());
    }
  };
}
const Vs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function Ys(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Vs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function gn(...e) {
  return e.filter(Boolean).join(" ");
}
function Js(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: gn(he.trigger, r) };
}
function Xs(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = _(null), l = _(null), i = Us(e.defaultOpen === !0, l);
  return dn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: gn(he.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...Js(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...Ys(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(pn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function Qs(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function Zs(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const yn = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = yn(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const ec = (e) => e.split("").every((a) => a === e[0]);
function ac(e, a, n) {
  const r = ec(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = yn(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function tc(e) {
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
function nc(e, a) {
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
function rc(e, a) {
  const n = _(!1), r = mn(), l = nc(e, a), i = (s) => {
    un(s) && e.focus(ac(e.items, e.current(), r(s.key)));
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
function lc(e, a) {
  const { start: n, request: r } = a, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? Ze(i, -1, 1) : Ze(i, i.length, -1));
  }, [n, r]);
}
function oc({ row: e, nav: a, popup: n }) {
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
function ic(e, a) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": a + "-label", "aria-describedby": a + "-description" }, r = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { id: a + "-label", children: e.label }),
    /* @__PURE__ */ t("span", { id: a + "-description", className: he.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function Nn(e) {
  const { item: a, at: n } = e.row, r = ic(a, N()), l = {
    ref: (i) => {
      e.nav.refs.current[n] = i;
    },
    role: "menuitem",
    tabIndex: -1,
    className: he.item,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...r.aria,
    ...oc(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...l, children: r.content }) : /* @__PURE__ */ t("button", { type: "button", ...l, children: r.content });
}
function sc({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: he.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: he.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(Nn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function cc({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: he.separator }) : e.kind === "group" ? /* @__PURE__ */ t(sc, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(Nn, { row: e.row, nav: a, popup: n });
}
function dc() {
  const e = Te(pn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function uc({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = dc(), c = _(null);
  hn(s, c, n);
  const d = Qs(e), u = tc(d.flatMap(Zs).map((w) => w.item)), m = rc(u, r);
  return lc(u, r), /* @__PURE__ */ o("div", { ref: c, className: he.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: he.menu, ...m, children: d.map((w, f) => /* @__PURE__ */ t(cc, { block: w, nav: u, popup: r }, f)) }),
    a && /* @__PURE__ */ t("p", { className: he.footer, children: a })
  ] });
}
function mc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function kn(e, a) {
  C(() => {
    const n = e.current;
    a === "page" && n && !mc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const hc = (e, a) => e.reduce((n, r) => n + r + a, -a);
function wc({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (hc(a, r) <= e) return i;
  const s = /* @__PURE__ */ new Set([l]);
  let c = a[l] + r + n;
  for (const d of i)
    if (d !== l) {
      if (c += a[d] + r, c > e) break;
      s.add(d);
    }
  return i.filter((d) => s.has(d));
}
const Fa = (e) => Number.parseFloat(e) || 0, Tt = (e) => e.getBoundingClientRect().width;
function fc(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Fa(a.paddingInlineStart) - Fa(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Tt),
    more: n ? Tt(n) : 0,
    gap: Fa(a.columnGap)
  };
}
function _c(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const vc = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function bc(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = fc(i);
      l((d) => vc(d, c) ? d : c);
    };
    return s(), _c(i, s);
  }, [e, n]), r && wc(r, a);
}
const pc = "_strip_jqyo6_2", gc = "_fits_jqyo6_19", yc = "_probe_jqyo6_27", Nc = "_moreRoot_jqyo6_36", kc = "_more_jqyo6_36", $c = "_tab_jqyo6_55", Cc = "_count_jqyo6_91", ve = {
  strip: pc,
  fits: gc,
  probe: yc,
  moreRoot: Nc,
  more: kc,
  tab: $c,
  count: Cc
}, $n = "More";
function Sc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const Cn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function Sn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const Rc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Tc({ tab: e, active: a, place: n, onChange: r }) {
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
function xc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Lc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(Xs, { label: $n, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(uc, { align: "end", entries: e.map((r) => ({ label: Cn(r), onSelect: () => n(r.id) })) }) });
}
function Ac(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Rc;
}
function vR({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = Ea({ orientation: "horizontal" }), s = Sc(e, a);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  kn(c, l);
  const d = bc(c, s, e.map(Cn).join(`
`)), u = d ? e.filter((m, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${Sn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((m, w) => /* @__PURE__ */ t(Tc, { tab: m, active: a, place: Ac(i, d, w), onChange: n }, m.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${he.trigger} ${ve.more} ${ve.probe}`, children: $n }),
    u.length > 0 && /* @__PURE__ */ t(Lc, { tabs: u, trigger: i.itemProps(e.length), onPick: xc(c, n) })
  ] });
}
const xt = 7;
function bR({ links: e, active: a, label: n, level: r }) {
  if (e.length > xt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xt} — the set is fixed`);
  const l = _(null);
  return kn(l, r), ln(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ba, { as: "nav", rowRef: l, className: Sn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Ec = "_root_v56ff_3", Ic = "_segment_v56ff_9", Lt = {
  root: Ec,
  segment: Ic
};
function Rn({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Mc = "_sidebar_s9o1j_3", Bc = "_brand_s9o1j_9", Pc = "_mark_s9o1j_17", qc = "_word_s9o1j_24", Oc = "_nav_s9o1j_30", jc = "_navItem_s9o1j_39", Dc = "_footLink_s9o1j_49", Hc = "_group_s9o1j_58", Fc = "_groupName_s9o1j_65", zc = "_agents_s9o1j_81", Wc = "_agent_s9o1j_81", Kc = "_root_s9o1j_96", Gc = "_agentTop_s9o1j_105", Uc = "_dot_s9o1j_112", Vc = "_agentName_s9o1j_124", Yc = "_agentMeta_s9o1j_138", Jc = "_foot_s9o1j_49", Xc = "_footName_s9o1j_150", Qc = "_footLinks_s9o1j_157", Zc = "_linkBrand_s9o1j_184", ed = "_label_s9o1j_205", ad = "_note_s9o1j_210", td = "_footer_s9o1j_226", x = {
  sidebar: Mc,
  brand: Bc,
  mark: Pc,
  word: qc,
  nav: Oc,
  navItem: jc,
  new: "_new_s9o1j_48",
  footLink: Dc,
  group: Hc,
  groupName: Fc,
  agents: zc,
  agent: Wc,
  root: Kc,
  agentTop: Gc,
  dot: Uc,
  agentName: Vc,
  agentMeta: Yc,
  foot: Jc,
  footName: Xc,
  footLinks: Qc,
  linkBrand: Zc,
  label: ed,
  note: ad,
  footer: td
};
function nd({ agent: e }) {
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
              style: { "--dot": nt(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ t("span", { className: x.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ t("span", { className: x.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function rd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function ld({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(nd, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(rd, { shared: i })
  ] });
}
function od(e) {
  return e.destinations ?? e.items ?? [];
}
function id({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function sd({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function cd({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function dd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(id, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: od(e).map((a) => /* @__PURE__ */ t(cd, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(sd, { children: e.children })
  ] });
}
function ud(e) {
  return "agents" in e;
}
function pR(e) {
  return ud(e) ? /* @__PURE__ */ t(ld, { ...e }) : /* @__PURE__ */ t(dd, { ...e });
}
const md = "_mark_wlgi8_3", hd = {
  mark: md
}, wd = { met: "✓", unmet: "", failed: "✕" };
function it({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: hd.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: wd[e]
    }
  );
}
const fd = "_avatar_1t33a_3", _d = {
  avatar: fd
};
function Ca(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function vd(e) {
  const a = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = a.charAt(0);
  return [Ca(e), ...[...a.slice(1)].map((r) => n + r)];
}
function bd(e, a) {
  const n = vd(e).find((l) => !a.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; a.has(Ca(e).charAt(0) + String(r)); ) r += 1;
  return Ca(e).charAt(0) + String(r);
}
function gR(e) {
  const a = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = bd(r, a);
    a.add(l), n.set(r, l);
  }
  return n;
}
function pd(e) {
  return e != null && ca(e) ? Wr(e) : void 0;
}
function yR({ name: e, step: a, size: n = "md", initials: r }) {
  return /* @__PURE__ */ t("span", { className: _d.avatar, "data-size": n, "aria-hidden": "true", style: pd(a), children: r ?? Ca(e) });
}
const gd = "_marker_br9fi_2", yd = {
  marker: gd
}, Nd = {
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
}, kd = { running: " ward-running" };
function He({ size: e, kind: a, label: n }) {
  const r = { "--marker": Nd[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${yd.marker} ward-marker ward-marker--${a}${kd[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const $d = "_root_ti0pq_2", Cd = "_chip_ti0pq_11", Sd = "_noCase_ti0pq_23", fa = {
  root: $d,
  chip: Cd,
  noCase: Sd
};
function Rd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function st({ connection: e, since: a, lastEventAt: n }) {
  const r = Rd(a, n), l = rt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${fa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: fa.noCase, children: tt(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    de(r)
  ] });
}
const Td = "_root_yylks_2", xd = "_context_yylks_13", Ld = "_row_yylks_1", Ad = "_heading_yylks_27", Ed = "_headingWrap_yylks_35", Id = "_meta_yylks_41", Md = "_chips_yylks_49", Bd = "_title_yylks_56", Pd = "_consequence_yylks_66", qd = "_actionsWrap_yylks_73", Od = "_actions_yylks_73", jd = "_action_yylks_73", Dd = "_overflowPanel_yylks_102", Hd = "_measureClip_yylks_113", Fd = "_measure_yylks_113", K = {
  root: Td,
  context: xd,
  row: Ld,
  heading: Ad,
  headingWrap: Ed,
  meta: Id,
  chips: Md,
  title: Bd,
  consequence: Pd,
  actionsWrap: qd,
  actions: Od,
  action: jd,
  overflowPanel: Dd,
  measureClip: Hd,
  measure: Fd
};
function zd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ t("h1", { className: K.title, children: e });
}
function Wd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: K.chips, children: e.map((a) => /* @__PURE__ */ t(h, { ...a }, a.label)) }) : null;
}
function Kd({ consequence: e, consequenceHint: a }) {
  return e ? /* @__PURE__ */ t("p", { className: K.consequence, title: a, children: e }) : null;
}
function Gd({ chips: e = [], consequence: a, consequenceHint: n }) {
  return e.length === 0 && !a ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ t(Wd, { chips: e }),
    /* @__PURE__ */ t(Kd, { consequence: a, consequenceHint: n })
  ] });
}
function Ud({ title: e, chips: a, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ t(zd, { title: e, density: l }),
    /* @__PURE__ */ t(Gd, { chips: a, consequence: n, consequenceHint: r })
  ] });
}
function Ja({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: K.action, "data-action": "", children: a }, n));
}
function At({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Vd({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(At, { disclosure: l }) : a ? [/* @__PURE__ */ t(At, { disclosure: l }, "more"), /* @__PURE__ */ t(Ja, { actions: e }, "actions")] : /* @__PURE__ */ t(Ja, { actions: e });
}
function Yd(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Jd({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ja, { actions: e }) });
}
function Xd(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const Qd = (e, a) => e.trim().toLowerCase() === a.trim().toLowerCase();
function Zd(e = [], a, n) {
  const r = e.at(-1);
  return r !== void 0 && Qd(r.label, a) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function eu({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: K.context, children: /* @__PURE__ */ t(Wi, { path: e.path, current: e.current }) });
}
function au(...e) {
  return e.some((a) => a === null);
}
function tu(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function nu(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + tu(e);
}
function ru(e, a, n, r, l) {
  if (l === 0 || au(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - nu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function lu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ou(e) {
  return kr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function iu(e, a) {
  return a.length === 0 && e.length === 1 && ou(e[0]);
}
function su(e, a) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!lu(d)) return;
    const u = () => c(ru(d, r.current, l.current, i.current, e.length)), m = new ResizeObserver(u);
    return m.observe(d), i.current && m.observe(i.current), u(), () => m.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function cu({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function du({ connection: e }) {
  return e ? /* @__PURE__ */ t(st, { connection: e.connection, since: e.since }) : null;
}
function NR({ crumb: e, crumbCurrent: a, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: m = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = su(s, iu(s, c)), ae = c.length > 0, { disclosure: ge, close: te } = Xd(P || ae, y), Ee = Yd(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": m, children: [
    /* @__PURE__ */ t(eu, { crumb: Zd(e, r, a) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ t(Ud, { title: r, chips: n, consequence: l, consequenceHint: i, density: m }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ t(du, { connection: d }),
        /* @__PURE__ */ t("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ t(Vd, { actions: s, hasMore: ae, collapsed: P, onOverflow: u, disclosure: ge }) })
      ] })
    ] }),
    /* @__PURE__ */ t(Jd, { actions: Ee, disclosure: ge, onEscape: te }),
    /* @__PURE__ */ t(cu, { actions: s, hasMore: ae, measureRef: E })
  ] });
}
const uu = "_root_td96x_2", mu = "_body_td96x_16", Et = {
  root: uu,
  body: mu
};
function kR({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Et.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Et.body, children: n }) });
}
const hu = "_root_bf1pc_2", wu = "_table_bf1pc_9", fu = "_caption_bf1pc_14", _u = "_series_bf1pc_23", vu = "_category_bf1pc_31", bu = "_cell_bf1pc_39", pu = "_track_bf1pc_45", gu = "_lane_bf1pc_52", yu = "_bar_bf1pc_56", Nu = "_value_bf1pc_63", ku = "_swatch_bf1pc_70", $u = "_empty_bf1pc_78", J = {
  root: hu,
  table: wu,
  caption: fu,
  series: _u,
  category: vu,
  cell: bu,
  track: pu,
  lane: gu,
  bar: yu,
  value: Nu,
  swatch: ku,
  empty: $u
}, Cu = "—", It = 6;
function Su(e, a) {
  if (a.length < 1 || a.length > It)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${It}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Ru(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function Tn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Tu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function xu({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Tu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Lu({ series: e }) {
  return /* @__PURE__ */ t(T, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": Tn(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Au({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Eu({ title: e, categories: a, series: n, top: r, format: l = ee, categoryHead: i = "Category", missing: s = Cu }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Lu, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, m) => /* @__PURE__ */ t(xu, { value: u.values[d], top: r, step: Tn(m, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function $R(e) {
  Su(e.categories, e.series);
  const a = Ru(e.series);
  return a === 0 ? /* @__PURE__ */ t(Au, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Eu, { ...e, top: a });
}
const Iu = "_root_1bfqw_2", Mu = "_figure_1bfqw_7", Bu = "_of_1bfqw_13", Pu = "_bar_1bfqw_18", qu = "_rows_1bfqw_38", Ou = "_row_1bfqw_38", ju = "_label_1bfqw_49", Du = "_amount_1bfqw_54", Ie = {
  root: Iu,
  figure: Mu,
  of: Bu,
  bar: Pu,
  rows: qu,
  row: Ou,
  label: ju,
  amount: Du
};
function Hu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const Fu = "_frame_lmfp9_2", zu = "_table_lmfp9_6", Wu = "_th_lmfp9_12", Ku = "_td_lmfp9_13", Gu = "_sort_lmfp9_48", Uu = "_row_lmfp9_60", Vu = "_empty_lmfp9_68", qe = {
  frame: Fu,
  table: zu,
  th: Wu,
  td: Ku,
  sort: Gu,
  row: Uu,
  empty: Vu
}, Yu = { asc: "ascending", desc: "descending" };
function Ju(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return Yu[a.direction];
}
function Xu(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: qe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function Qu(e) {
  return e === void 0 ? void 0 : { width: e };
}
function Zu({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: Qu(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": Ju(e, a),
      children: Xu(e, n)
    }
  );
}
function em({ row: e, props: a }) {
  const n = a.rowId(e), r = (a.lockedIds ?? []).includes(n);
  return /* @__PURE__ */ t(
    "tr",
    {
      className: qe.row,
      "data-selected": n === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ t(
        "td",
        {
          className: qe.td,
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
function am({
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
  narrow: m
}) {
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: qe.empty, children: u }) : /* @__PURE__ */ t("div", { className: qe.frame, "data-narrow": m, children: /* @__PURE__ */ o("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: qe.head, children: a.map((w) => /* @__PURE__ */ t(Zu, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w) => /* @__PURE__ */ t(em, { row: w, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: m } }, r(w))) })
  ] }) });
}
const tm = "_list_v0s52_2", nm = {
  list: tm
};
function CR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: nm.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const rm = "_label_1u62a_2", lm = {
  label: rm
};
function SR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: lm.label, children: a.header }) }, a.key)) }) });
}
const om = "_stack_bp6a0_2", im = {
  stack: om
};
function RR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: im.stack, "data-ward-action-stack": "", children: e });
}
const sm = "_set_1z0sq_2", cm = "_legend_1z0sq_7", dm = "_row_1z0sq_15", um = "_control_1z0sq_20", mm = "_input_1z0sq_26", hm = "_label_1z0sq_31", wm = "_consequence_1z0sq_36", ze = {
  set: sm,
  legend: cm,
  row: dm,
  control: um,
  input: mm,
  label: hm,
  consequence: wm
};
function xn({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = N(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: ze.set, "data-variant": c, children: [
    /* @__PURE__ */ t("legend", { className: ze.legend, children: e }),
    a.map((m) => {
      const w = `${u}-${m.value}`, f = m.consequence ? `${w}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: ze.row, children: [
        /* @__PURE__ */ o("span", { className: ze.control, children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: w,
              type: "radio",
              name: u,
              className: ze.input,
              value: m.value,
              checked: n === m.value,
              disabled: l,
              "aria-describedby": da(f, s),
              onChange: () => !l && (r == null ? void 0 : r(m.value))
            }
          ),
          /* @__PURE__ */ t("label", { htmlFor: w, className: ze.label, children: m.label })
        ] }),
        m.consequence && /* @__PURE__ */ t("p", { id: f, className: `${ze.consequence} ward-check-consequence`, children: m.consequence })
      ] }, m.value);
    })
  ] });
}
const fm = "_root_11gpw_2", _m = "_head_11gpw_10", vm = "_note_11gpw_29", bm = "_index_11gpw_34", pm = "_dot_11gpw_38", gm = "_counter_11gpw_49", ym = "_trailing_11gpw_57", We = {
  root: fm,
  head: _m,
  note: vm,
  index: bm,
  dot: pm,
  counter: gm,
  trailing: ym
};
function Nm({ index: e }) {
  return e ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${We.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: We.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function km({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: We.counter, "aria-hidden": "true", children: e }) : null;
}
function Mt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${We.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: We.head, children: [
      /* @__PURE__ */ t(Nm, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: We.note, children: n }),
    /* @__PURE__ */ t(km, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: We.trailing, children: i })
  ] });
}
const $m = "_strip_4ygbn_2", Cm = "_cell_4ygbn_7", Sm = "_value_4ygbn_12", Rm = "_link_4ygbn_29", Tm = "_label_4ygbn_49", xm = "_tiles_4ygbn_101", De = {
  strip: $m,
  cell: Cm,
  value: Sm,
  link: Rm,
  label: Tm,
  tiles: xm
};
function Ln(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const An = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Lm({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: An(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function Am({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: An(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const En = (e) => e.href === void 0 ? /* @__PURE__ */ t(Lm, { cell: e }, e.label) : /* @__PURE__ */ t(Am, { cell: e, href: e.href }, e.label);
function qa({ cells: e, divided: a = !1 }) {
  return Ln("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(En) });
}
const Bt = 6;
function TR({ cells: e }) {
  Ln("StatTiles", e, [1, 2 * Bt]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, Bt) };
  return /* @__PURE__ */ t("dl", { className: `${De.tiles} ward-stattiles`, style: a, children: e.map(En) });
}
const Em = "_root_1eb1u_2", Im = "_track_1eb1u_8", Mm = "_thumb_1eb1u_46", Bm = "_labelHidden_1eb1u_64", Pm = "_label_1eb1u_64", qm = "_lockedNote_1eb1u_84", Ke = {
  root: Em,
  track: Im,
  thumb: Mm,
  labelHidden: Bm,
  label: Pm,
  lockedNote: qm
};
function Om(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function jm(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: m, off: w } = Om(a, r, l, u !== null);
  return /* @__PURE__ */ o("span", { className: `${Ke.root} ward-switchrow`, children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": m,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": Ma(i, u),
        title: u == null ? void 0 : u.reason,
        className: `${Ke.track} ward-switch`,
        "data-on": m,
        "data-locked": l ? !0 : void 0,
        disabled: w,
        onClick: () => !w && (n == null ? void 0 : n(!m)),
        children: /* @__PURE__ */ t("span", { className: Ke.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: jm(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const Dm = "_bar_1vp69_2", Hm = "_skip_1vp69_11", Fm = "_mark_1vp69_22", zm = "_nav_1vp69_30", Wm = "_list_1vp69_34", Km = "_select_1vp69_41", Gm = "_selectTrigger_1vp69_45", Um = "_dest_1vp69_52", Vm = "_actor_1vp69_71", Ym = "_actorMark_1vp69_84", Jm = "_actorLabel_1vp69_89", Xm = "_tagline_1vp69_108", oe = {
  bar: Dm,
  skip: Hm,
  mark: Fm,
  nav: zm,
  list: Wm,
  select: Km,
  selectTrigger: Gm,
  dest: Um,
  actor: Vm,
  actorMark: Ym,
  actorLabel: Jm,
  tagline: Xm
};
function Qm(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function Zm(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function xR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = Zm(r);
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
        vn,
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
      /* @__PURE__ */ t("span", { className: oe.actorMark, "aria-hidden": "true", children: Qm(c) })
    ] })
  ] });
}
const eh = "_tree_zzoob_2", ah = "_item_zzoob_6", th = "_row_zzoob_10", nh = "_button_zzoob_22", Sa = {
  tree: eh,
  item: ah,
  row: th,
  button: nh
}, In = xe(null);
function rh({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Ea({ orientation: "vertical" });
  return /* @__PURE__ */ t(In.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: Sa.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const lh = { ArrowRight: !0, ArrowLeft: !1 };
function Pt(e) {
  return e ? !0 : void 0;
}
function oh(e, a) {
  const n = lh[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function ih(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function sh(e) {
  const a = [Sa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function ch(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function dh(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function uh(e) {
  return typeof e == "string" ? e : void 0;
}
function mh({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function hh({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function Mn(e) {
  const a = Te(In);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = ch(e);
  return /* @__PURE__ */ o("li", { className: Sa.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: sh(e),
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
            onClick: () => ih(e),
            onKeyDown: (r) => oh(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: dh(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: uh(e.label), children: e.label }),
              /* @__PURE__ */ t(mh, { value: e.detail }),
              /* @__PURE__ */ t(hh, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const wh = "_frame_10gwd_2", fh = "_subjectRail_10gwd_22", _h = "_subject_10gwd_22", vh = "_rail_10gwd_42", bh = "_record_10gwd_66", ph = "_recordBody_10gwd_71", gh = "_stageGrid_10gwd_120", yh = "_band_10gwd_134", Nh = "_bandBody_10gwd_142", kh = "_bandActions_10gwd_147", $h = "_scroller_10gwd_155", Ch = "_board_10gwd_182", Sh = "_lanes_10gwd_191", Rh = "_cardGrid_10gwd_225", X = {
  frame: wh,
  subjectRail: fh,
  subject: _h,
  rail: vh,
  record: bh,
  recordBody: ph,
  stageGrid: gh,
  band: yh,
  bandBody: Nh,
  bandActions: kh,
  scroller: $h,
  board: Ch,
  lanes: Sh,
  cardGrid: Rh
};
function LR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qt(e) {
  return e ? "true" : void 0;
}
function AR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": qt(i), children: [
    /* @__PURE__ */ t("div", { className: X.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: X.rail, "data-sticky": qt(l), "aria-label": r, children: a })
  ] });
}
function ER({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Th = "_form_1j8ub_2", xh = "_fields_1j8ub_9", Lh = "_actions_1j8ub_19", za = {
  form: Th,
  fields: xh,
  actions: Lh
};
function IR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: za.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: za.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: za.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function MR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: X.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: X.bandActions, children: a })
  ] });
}
const Ah = "(max-width: 767.98px)";
function ct({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ba, { className: X.scroller, label: e, count: n ?? $r.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function Eh({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ct, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Ih({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ t(ct, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(Cr, { children: n.content }, n.id)) }) });
}
function BR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = ia(Ah);
  return n === void 0 ? /* @__PURE__ */ t(ct, { label: a, children: e }) : l ? /* @__PURE__ */ t(Eh, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Ih, { lanes: n, label: a });
}
function PR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ba, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
function qR({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${X.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Mh = "_block_b38uc_3", Bh = "_sentence_b38uc_10", Ph = "_meta_b38uc_19", qh = "_action_b38uc_24", Oh = "_strip_b38uc_28", jh = "_loading_b38uc_47", Dh = "_label_b38uc_55", Hh = "_counter_b38uc_62", be = {
  block: Mh,
  sentence: Bh,
  meta: Ph,
  action: qh,
  strip: Oh,
  loading: jh,
  label: Dh,
  counter: Hh
};
function Fh({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Oa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Fh, { action: a })
  ] });
}
function zh(e) {
  return /* @__PURE__ */ t(Oa, { ...e, kind: "ward-emptystate" });
}
function OR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Oa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function jR(e) {
  return /* @__PURE__ */ t(Oa, { ...e });
}
function DR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Oa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    de(a)
  ] }) });
}
function HR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    de(e),
    ". Showing snapshot from ",
    de(a)
  ] });
}
function FR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    de(a)
  ] });
}
function zR({ label: e, startedAt: a }) {
  const n = _(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  C(() => {
    const s = window.setTimeout(() => l(!0), fe.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = rt(n.current, r);
  return /* @__PURE__ */ o("div", { className: `${be.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ t("span", { className: be.label, children: e }),
    r ? /* @__PURE__ */ t("span", { className: be.counter, children: tt(i) }) : null
  ] });
}
const Wh = "_note_cigdt_2", Kh = {
  note: Wh
};
function Gh({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Kh.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const Uh = "_card_k7btg_3", Vh = "_hit_k7btg_31", Yh = "_head_k7btg_44", Jh = "_title_k7btg_51", Xh = "_meta_k7btg_57", Qh = "_since_k7btg_66", Zh = "_sep_k7btg_76", ew = "_fields_k7btg_80", aw = "_field_k7btg_80", tw = "_last_k7btg_98", nw = "_reason_k7btg_110", se = {
  card: Uh,
  hit: Vh,
  head: Yh,
  title: Jh,
  meta: Xh,
  since: Qh,
  sep: Zh,
  fields: ew,
  field: aw,
  last: tw,
  reason: nw
}, rw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function lw(e, a, n) {
  const r = ba(e, "blue"), l = ba(e, "orange"), i = ba(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = rw[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const ow = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function iw(e, a) {
  return ow[a](e);
}
function sw({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: se.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: se.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function cw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: se.head, children: [
    e.flagged && /* @__PURE__ */ t(h, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function dw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: se.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function uw({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: se.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: se.field, children: iw(e, n) }, n)) });
}
const Xa = (e) => e ? !0 : void 0;
function mw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function hw(e, a, n) {
  e == null || e(a, n);
}
function ww(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function fw({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: se.last, "data-stale": Xa(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = _(null);
  lw(r, n.key, e.feed);
  const l = ww(e.feed), i = mw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: se.card,
      style: i,
      "data-selected": Xa(e.selected),
      "data-flagged": Xa(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: se.hit, onClick: (s) => hw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(cw, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: se.title, text: n.title }),
        /* @__PURE__ */ t(sw, { item: n, connection: l }),
        /* @__PURE__ */ t(dw, { reason: n.blockedReason }),
        /* @__PURE__ */ t(uw, { item: n, fields: a }),
        /* @__PURE__ */ t(fw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const _w = "_column_1j8bi_3", vw = "_head_1j8bi_21", bw = "_label_1j8bi_30", pw = "_count_1j8bi_39", gw = "_list_1j8bi_53", la = {
  column: _w,
  head: vw,
  label: bw,
  count: pw,
  list: gw
};
function Bn(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function yw({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Nw(e) {
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
function kw({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), m = e.cap !== void 0 && a.length > e.cap, w = Bn(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": m ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(yw, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Nw, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    m && /* @__PURE__ */ t(Gh, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const $w = "_foot_cs4jr_2", Cw = "_note_cs4jr_13", Sw = "_link_cs4jr_19", Wa = {
  foot: $w,
  note: Cw,
  link: Sw
};
function WR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Wa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: Wa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${Wa.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Rw = "_head_1tfi5_3", Tw = "_identity_1tfi5_12", xw = "_titleRow_1tfi5_18", Lw = "_title_1tfi5_18", Aw = "_key_1tfi5_35", Ew = "_rollup_1tfi5_45", Iw = "_tools_1tfi5_53", Mw = "_swatch_1tfi5_101", Bw = "_mark_1tfi5_108", $e = {
  head: Rw,
  identity: Tw,
  titleRow: xw,
  title: Lw,
  key: Aw,
  rollup: Ew,
  tools: Iw,
  swatch: Mw,
  mark: Bw
}, Ot = "initials:";
function Pw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ee(e)} loaded this week`;
}
function qw(e) {
  const a = [Pw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ee(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${ce(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${ce(e.p90)}`), a.join(" · ");
}
function Ow(e) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ee(e.inFlight),
      " in flight"
    ] }),
    " · ",
    qw(e)
  ] });
}
function jw(e) {
  return e.startsWith(Ot) ? e.slice(Ot.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Dw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${$e.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: jw(e) }) : /* @__PURE__ */ t("span", { className: $e.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Hw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function KR({
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
  return /* @__PURE__ */ o("div", { className: $e.head, children: [
    /* @__PURE__ */ o("div", { className: $e.identity, children: [
      /* @__PURE__ */ o("div", { className: $e.titleRow, children: [
        /* @__PURE__ */ t(Dw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: $e.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: $e.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: $e.rollup, "aria-live": "polite", children: Ow(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: $e.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Hw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(st, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Fw = "_head_1sejb_14", zw = "_line_1sejb_15", Ww = "_cHandle_1sejb_36", Kw = "_cName_1sejb_41", Gw = "_nameLine_1sejb_49", Uw = "_cLabel_1sejb_56", Vw = "_cCap_1sejb_61", Yw = "_cShown_1sejb_66", Jw = "_name_1sejb_49", Xw = "_noCap_1sejb_88", Qw = "_state_1sejb_102", Zw = "_handle_1sejb_111", ef = "_sub_1sejb_137", B = {
  head: Fw,
  line: zw,
  cHandle: Ww,
  cName: Kw,
  nameLine: Gw,
  cLabel: Uw,
  cCap: Vw,
  cShown: Yw,
  name: Jw,
  noCap: Xw,
  state: Qw,
  handle: Zw,
  sub: ef
}, af = "can't be hidden or collapsed", tf = "terminal · counted, not a column";
function GR() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function nf(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function rf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function jt(e) {
  return e.gate ? af : e.terminal ? tf : rf(e.agentsMounted);
}
function lf(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function of({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    jt(e) && /* @__PURE__ */ t("span", { className: B.sub, children: jt(e) })
  ] });
}
function sf(e) {
  return e === void 0 ? "" : String(e);
}
function cf(e) {
  return e === "" ? void 0 : Number(e);
}
function df({ name: e, onReorder: a }) {
  const n = Ae();
  return (n == null ? void 0 : n.actions) === "hide" ? /* @__PURE__ */ t("span", { className: B.cHandle }) : /* @__PURE__ */ t("span", { className: B.cHandle, children: /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: B.handle,
      "aria-label": `Reorder ${e}`,
      disabled: n !== null,
      title: n == null ? void 0 : n.reason,
      "aria-describedby": n == null ? void 0 : n.reasonId,
      onKeyDown: (r) => !n && lf(r, a),
      children: "⠿"
    }
  ) });
}
function uf({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: sf(a.cap), onChange: (r) => n({ ...a, cap: cf(r) }) }) });
}
function mf({ stage: e, config: a, onChange: n }) {
  const r = Ae() !== null, l = nf(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function hf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function UR({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": hf(e), children: [
    /* @__PURE__ */ t(df, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(of, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(uf, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(mf, { stage: e, config: a, onChange: n })
  ] });
}
const wf = "_body_8qsv9_2", ff = "_head_8qsv9_9", _f = "_summary_8qsv9_19", vf = "_block_8qsv9_20", bf = "_actionsBlock_8qsv9_21", pf = "_title_8qsv9_41", gf = "_note_8qsv9_46", yf = "_k_8qsv9_51", Nf = "_kv_8qsv9_58", kf = "_row_8qsv9_64", $f = "_label_8qsv9_75", Cf = "_value_8qsv9_84", Sf = "_quote_8qsv9_90", Rf = "_actions_8qsv9_21", Tf = "_resolve_8qsv9_111", O = {
  body: wf,
  head: ff,
  summary: _f,
  block: vf,
  actionsBlock: bf,
  title: pf,
  note: gf,
  k: yf,
  kv: Nf,
  row: kf,
  label: $f,
  value: Cf,
  quote: Sf,
  actions: Rf,
  resolve: Tf
};
function xf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Lf(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Af(e) {
  const a = ma(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Ef(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function If(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(h, { ...Pa(Af(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", ce(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...xf(e),
    ...Ef(n),
    ...Lf(e, a)
  ];
}
function Mf({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function Bf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function Pf({ item: e, showKey: a }) {
  const n = Bf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    a && /* @__PURE__ */ t(h, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(h, { role: n.role, label: n.label })
  ] });
}
function qf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function VR({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const m = N(), w = If(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: m, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(Pf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: m, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: f }),
      /* @__PURE__ */ t("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ t(qf, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(Mf, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Of = "_root_3azmy_2", jf = "_list_3azmy_7", Df = "_item_3azmy_12", Hf = "_box_3azmy_18", Ff = "_text_3azmy_23", zf = "_note_3azmy_28", Ye = {
  root: Of,
  list: jf,
  item: Df,
  box: Hf,
  text: Ff,
  note: zf
};
function Da({ items: e, note: a, density: n }) {
  return /* @__PURE__ */ o("div", { className: Ye.root, "data-density": n, children: [
    /* @__PURE__ */ t("ul", { className: `${Ye.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${Ye.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ t("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Ye.box, children: /* @__PURE__ */ t(it, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ t("span", { className: Ye.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ t("p", { className: `${Ye.note} ward-checklist-note`, children: a })
  ] });
}
const Wf = "_rail_znbbp_2", Kf = "_k_znbbp_11", Gf = "_head_znbbp_19", Uf = "_section_znbbp_25", Vf = "_card_znbbp_39", Yf = "_strip_znbbp_46", Jf = "_skeleton_znbbp_60", Xf = "_skeletonLabel_znbbp_74", Qf = "_bar_znbbp_80", Zf = "_note_znbbp_89", me = {
  rail: Wf,
  k: Kf,
  head: Gf,
  section: Uf,
  card: Vf,
  strip: Yf,
  skeleton: Jf,
  skeletonLabel: Xf,
  bar: Qf,
  note: Zf
};
function e_(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ka({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function a_({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function t_({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(kw, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function n_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(t_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(a_, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function YR(e) {
  const a = e_(e.onOpen), n = Bn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Ka, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ka, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(n_, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Ka, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function r_(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function l_(e) {
  return Math.ceil(e.length / 2);
}
function o_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Pn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function i_(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Pn(e);
  l !== void 0 && n(l), r(o_(e.type));
}
function s_(e, a, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(a, (i) => i_(i, n, r, l));
  }, [e, a, n, r, l]);
}
function c_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function d_(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function u_(e, a) {
  return a !== void 0 ? ce(e.timeInStage) + " · waits on " + a.agent : ce(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function m_(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + W.height.card + " + " + W.height.cardRow + " * " + String(l_(a ?? [])) + ")"
  };
}
function h_(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function w_(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(h, { role: "meta", label: re(e.cost) }) : null;
}
function f_(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(h, { role: "meta", label: e.jiraKey }) : null;
}
function __(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function v_(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function b_(e, a) {
  return a === void 0 ? e : r_(e, a.ref);
}
function p_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function sa(e) {
  return e === !0 ? "true" : void 0;
}
function qn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = _(null), i = ba(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(c_(a));
  s_(e.feed, a.key, s, d, i);
  const u = d_(a, r), m = u_(a, n), w = m_(a, e.fields), f = v_(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...p_(e),
      className: "ward-workcard",
      "data-flagged": sa(a.flagged),
      "data-selected": sa(e.selected),
      style: w,
      ref: b_(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        h_(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(h, { role: u.role, label: u.label }),
          w_(a, e.fields),
          f_(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: m, children: m }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          __(n, c, e.connection, a.changedAt),
          f !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function g_({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function y_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function N_(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(h, { role: "meta", label: String(a) })
    ] })
  ] });
}
function k_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(g_, { count: e.items.length, cap: e.column.cap });
}
function $_(e, a) {
  return e.roving ?? a;
}
function C_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function S_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    qn,
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
function R_(e) {
  const a = N(), n = Ea({ orientation: "vertical" }), r = $_(e, n), l = y_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": sa(l), "data-gate": sa(e.column.gate), children: [
    N_(e.column, e.items.length, a),
    k_(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...C_(e, n), children: S_(e, r) })
  ] });
}
function T_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + ce(e.p50)), e.p90 !== void 0 && (a += " · p90 " + ce(e.p90)), a;
}
function x_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function L_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function JR(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(h, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(h, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: T_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      x_(e),
      L_(e.onConfigure),
      /* @__PURE__ */ t(st, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function A_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function E_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function I_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(T, { children: [
    a > 0 ? /* @__PURE__ */ t(h, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(h, { role: "soft", label: "Terminal" }) : null
  ] });
}
function XR(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": sa(A_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: E_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(cn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    I_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function QR(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(qn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(R_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function M_(e, a) {
  const n = Pn(e);
  n !== void 0 && a(n);
}
function B_(e, a, n) {
  C(() => {
    if (e != null)
      return e.subscribe(a, (r) => M_(r, n));
  }, [e, a, n]);
}
function P_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function q_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", ce(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function O_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function j_(e, a) {
  return /* @__PURE__ */ o(T, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(h, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function ZR(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  B_(e.feed, a.key, l);
  const i = [...P_(a), ...q_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      O_(n, r)
    ] }),
    j_(a, e.actions)
  ] });
}
const D_ = "_card_uzp8w_3", H_ = "_head_uzp8w_30", F_ = "_mark_uzp8w_38", z_ = "_name_uzp8w_50", W_ = "_chips_uzp8w_71", K_ = "_description_uzp8w_77", G_ = "_run_uzp8w_82", U_ = "_sep_uzp8w_91", V_ = "_facts_uzp8w_97", Y_ = "_fact_uzp8w_97", J_ = "_factLabel_uzp8w_111", X_ = "_factValue_uzp8w_115", le = {
  card: D_,
  head: H_,
  mark: F_,
  name: z_,
  chips: W_,
  description: K_,
  run: G_,
  sep: U_,
  facts: V_,
  fact: Y_,
  factLabel: J_,
  factValue: X_
}, Q_ = { live: "done", draft: "running", paused: "meta" };
function Z_(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function ev({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ t(h, { role: Q_[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function av({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: le.description, children: e });
}
function tv({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function nv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ t("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function rv(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function lv({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: Z_(s),
      style: c,
      "data-selected": d,
      "data-paused": rv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ t("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${le.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(av, { description: e.description }),
        /* @__PURE__ */ t(tv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(ev, { versions: e.versions }),
        /* @__PURE__ */ t(nv, { facts: i })
      ]
    }
  );
}
const ov = "_list_4dcyc_2", iv = "_row_4dcyc_11", sv = "_head_4dcyc_23", cv = "_id_4dcyc_30", dv = "_lock_4dcyc_35", uv = "_reason_4dcyc_41", mv = "_remove_4dcyc_46", hv = "_clauses_4dcyc_50", wv = "_clause_4dcyc_50", fv = "_label_4dcyc_64", _v = "_cell_4dcyc_71", vv = "_value_4dcyc_76", ie = {
  list: ov,
  row: iv,
  head: sv,
  id: cv,
  lock: dv,
  reason: uv,
  remove: mv,
  clauses: hv,
  clause: wv,
  label: fv,
  cell: _v,
  value: vv
}, On = xe(!1);
function eT({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(On.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function bv({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function pv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ t(h, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: ie.reason, children: e })
  ] });
}
function gv({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ t("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(pv, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: ie.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Dt(e, a) {
  return e.locked ? void 0 : a;
}
function aT({ rule: e, onChange: a, onRemove: n }) {
  if (!Te(On)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Dt(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(gv, { rule: e, onRemove: Dt(e, n) }),
    /* @__PURE__ */ t("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ t("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: ie.cell, children: /* @__PURE__ */ t(bv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const yv = "_ladder_n8eeo_2", Nv = "_cell_n8eeo_7", kv = "_empty_n8eeo_26", $v = "_name_n8eeo_34", Cv = "_holder_n8eeo_40", Sv = "_request_n8eeo_46", Rv = "_swatches_n8eeo_51", Tv = "_swatch_n8eeo_51", xv = "_tilesFrame_n8eeo_78", Lv = "_tiles_n8eeo_78", Av = "_tile_n8eeo_78", Ev = "_bar_n8eeo_117", Iv = "_hex_n8eeo_128", Mv = "_note_n8eeo_138", A = {
  ladder: yv,
  cell: Nv,
  empty: kv,
  name: $v,
  holder: Cv,
  request: Sv,
  swatches: Rv,
  swatch: Tv,
  tilesFrame: xv,
  tiles: Lv,
  tile: Av,
  bar: Ev,
  hex: Iv,
  note: Mv
}, tT = "not validated yet, pending a CVD matrix and dark stepping";
function Bv(e) {
  return e.reserved ? "reserved" : ca(e.step) ? "validated" : "partial";
}
function jn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Pv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function qv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Ov(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function jv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ht = (e) => String(e).padStart(2, "0");
function Dv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? jn(e, void 0);
}
function Hv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ht(e)}` : Gr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ht(e)} · ${n}` })
  ] });
}
function Fv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Bv(e), c = jn(s, n), d = c !== "free", u = d || i, m = a === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && m ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...jv(d, m, u), "data-validation": s, style: Pv(e, s), onClick: f, onKeyDown: (P) => Ov(P, f) }, label: y, name: w, holder: c, validation: s, note: Dv(s, n, m), step: e.step };
}
const zv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Hv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(qv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Wv(e) {
  return zv[e.presentation](Fv(e));
}
function Kv(e) {
  for (const a of e)
    if (!a.reserved && !Ia(a.step)) throw new Error("colour ladder renders token steps only");
}
function Gv() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Uv(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Vv = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function Yv() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Jv = { list: Gv, swatches: () => null, tiles: Yv };
function Xv(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Dn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Kv(e.steps);
  const r = Uv(e), l = Jv[r], i = /* @__PURE__ */ o(T, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Wv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...Xv(e.disabled === !0), className: `${Vv[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const Qv = "_rail_s06lm_2", Zv = "_section_s06lm_12", eb = "_sectionFlush_s06lm_22", ab = "_head_s06lm_26", tb = "_headLabel_s06lm_34", nb = "_sample_s06lm_42", rb = "_sampleLabel_s06lm_47", lb = "_sampleTitle_s06lm_54", ob = "_sampleMeta_s06lm_59", ib = "_trace_s06lm_65", sb = "_traceHead_s06lm_70", cb = "_steps_s06lm_78", db = "_step_s06lm_78", ub = "_stepTitle_s06lm_97", mb = "_hollow_s06lm_107", hb = "_stepBody_s06lm_115", wb = "_stepDetail_s06lm_127", fb = "_publish_s06lm_132", _b = "_reason_s06lm_138", vb = "_note_s06lm_143", bb = "_reveal_s06lm_148", k = {
  rail: Qv,
  section: Zv,
  sectionFlush: eb,
  head: ab,
  headLabel: tb,
  sample: nb,
  sampleLabel: rb,
  sampleTitle: lb,
  sampleMeta: ob,
  trace: ib,
  traceHead: sb,
  steps: cb,
  step: db,
  stepTitle: ub,
  hollow: mb,
  stepBody: hb,
  stepDetail: wb,
  publish: fb,
  reason: _b,
  note: vb,
  reveal: bb
}, Ft = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, pb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, gb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, yb = { notSimulated: "not simulated", running: "running" };
function Nb(e) {
  return e.presentation === "foundry";
}
function kb(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function $b(e, a) {
  var r;
  const n = pb[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Cb(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Sb(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Rb(e) {
  if (Cb(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Tb(e) {
  const [a, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function xb(e) {
  const a = yb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(He, { size: 6, kind: gb[e.kind], label: e.kind });
}
function Lb(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Ab(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Eb(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Tb, { kind: a.kind, children: [
    /* @__PURE__ */ t(xb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Lb, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(Ab, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Ib(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(ce(a)), n.join(" · ");
}
function Hn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Ib(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Eb, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Mb(e) {
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
function Bb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + de(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Pb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? en(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(qa, { divided: !0, cells: a }) });
}
function qb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: en(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Ob(e) {
  const a = qb(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(qa, { divided: !0, cells: a }) });
}
function Fn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function jb(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Fn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Db(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Fn, { reason: e.reason, onPublish: e.onPublish }) });
}
function zn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(h, { role: Ft[e.run.status].role, label: Ft[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Hb(e, a) {
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
function Fb(e) {
  var n;
  Sb(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(zn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Mb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Hn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(Pb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(jb, { reason: kb(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function zb(e) {
  var r;
  const a = Hb(e.run, e.feed);
  Rb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(zn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Bb, { sample: e.run.sample }),
    /* @__PURE__ */ t(Hn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(Ob, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Db, { reason: $b(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function nT(e) {
  return Nb(e) ? /* @__PURE__ */ t(zb, { ...e }) : /* @__PURE__ */ t(Fb, { ...e });
}
const Wb = "_list_142ip_3", Kb = "_row_142ip_9", Gb = "_condition_142ip_18", Ub = "_action_142ip_24", ga = {
  list: Wb,
  row: Kb,
  condition: Gb,
  action: Ub
}, Wn = xe(!1);
function rT({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Wn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ga.list, "aria-label": a, children: e }) });
}
function lT({ rule: e }) {
  if (!Te(Wn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ga.row, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ga.condition, children: e.when }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ga.action, children: e.then })
  ] });
}
const Vb = "_move_tmppt_3", Yb = {
  move: Vb
};
function Qa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Kn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Gn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function zt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function Jb(e) {
  return e === "up" ? "down" : "up";
}
function Xb(e, a) {
  const n = zt(e, a.id, a.direction) ?? zt(e, a.id, Jb(a.direction));
  n == null || n.focus();
}
function Un() {
  const e = _(null), [a, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && a !== null && Xb(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Vn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ra({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${Yb.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const Qb = "_body_1jd1i_2", Zb = "_title_1jd1i_8", ep = "_section_1jd1i_13", ap = "_legend_1jd1i_18", tp = "_stages_1jd1i_26", np = "_stage_1jd1i_26", rp = "_stageIndex_1jd1i_44", lp = "_stageName_1jd1i_50", op = "_footer_1jd1i_59", ip = "_note_1jd1i_66", sp = "_reason_1jd1i_71", cp = "_actions_1jd1i_76", dp = "_webHead_1jd1i_83", up = "_kicker_1jd1i_92", mp = "_webTitle_1jd1i_99", hp = "_webBody_1jd1i_105", wp = "_webSection_1jd1i_109", fp = "_sectionHead_1jd1i_121", _p = "_sectionNote_1jd1i_129", vp = "_formLabel_1jd1i_134", bp = "_identityRow_1jd1i_139", pp = "_nameCell_1jd1i_145", gp = "_keyCell_1jd1i_150", yp = "_colourCell_1jd1i_154", Np = "_colourStatus_1jd1i_161", kp = "_webStages_1jd1i_166", $p = "_webStageList_1jd1i_172", Cp = "_webStage_1jd1i_166", Sp = "_webIndex_1jd1i_191", Rp = "_webStageName_1jd1i_196", Tp = "_webMoves_1jd1i_201", xp = "_addStage_1jd1i_215", Lp = "_addStageButton_1jd1i_223", Ap = "_addStageNote_1jd1i_231", Ep = "_webFooter_1jd1i_236", Ip = "_webFooterNotes_1jd1i_244", Mp = "_webNote_1jd1i_251", v = {
  body: Qb,
  title: Zb,
  section: ep,
  legend: ap,
  stages: tp,
  stage: np,
  stageIndex: rp,
  stageName: lp,
  footer: op,
  note: ip,
  reason: sp,
  actions: cp,
  webHead: dp,
  kicker: up,
  webTitle: mp,
  webBody: hp,
  webSection: wp,
  sectionHead: fp,
  sectionNote: _p,
  formLabel: vp,
  identityRow: bp,
  nameCell: pp,
  keyCell: gp,
  colourCell: yp,
  colourStatus: Np,
  webStages: kp,
  webStageList: $p,
  webStage: Cp,
  webIndex: Sp,
  webStageName: Rp,
  webMoves: Tp,
  addStage: xp,
  addStageButton: Lp,
  addStageNote: Ap,
  webFooter: Ep,
  webFooterNotes: Ip,
  webNote: Mp
}, Bp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Yn = "not in catalogue";
function Pp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Yn}` }, ...n];
}
function qp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Yn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Pp(n, e.name), invalid: i, onChange: r });
}
function Jn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Op(e) {
  const a = _([]), n = _(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function jp({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Jn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(qp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Bp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Dp({ stages: e, onChange: a, catalogue: n }) {
  const r = Op(e.length), l = Un(), i = (c, d) => {
    const u = Kn(c, d);
    r.current = Qa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Gn(Jn(e[c], c), u, e.length)), a(Qa(e, c, u));
  }, s = (c, d) => a(e.map((u, m) => m === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(jp, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Vn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Hp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Fp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], zp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Wp = "Create is disabled: name the stream and give it a key first.", Kp = "reorder with the ↑ ↓ buttons · min 2";
function dt(e, a) {
  return !e.reserved && ca(e.step) && a[e.step] === void 0;
}
function Gp(e, a) {
  const n = e.find((r) => dt(r, a));
  return n ? n.step : 1;
}
function Up({ stages: e, onMove: a }) {
  const n = Un(), r = (l, i) => {
    const s = Kn(l, i);
    n.moved({ id: e[l].id, direction: i }, Gn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(h, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Vn, { text: n.announcement })
  ] });
}
function Vp({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: zp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Yp(e, a) {
  return e !== "" && a !== "" ? null : Wp;
}
function Jp(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Fp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [m, w] = p(""), [f, y] = p(""), [E, P] = p(a[0].value), [ae, ge] = p(() => Gp(n, r)), [te, Ee] = p(e.stages ?? Hp), [Ve, R] = p(l[0].value), U = { name: m, key: f, streamStep: ae, owner: E, stages: te, policy: Ve }, ye = Yp(m, f);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: m, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: E, onChange: P, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(Dn, { label: "Stream colour", steps: n, value: ae, onChange: ge, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(Up, { stages: te, onMove: (Fe, Nr) => Ee(Qa(te, Fe, Nr)) })
    ] }),
    /* @__PURE__ */ t(xn, { legend: "Loop policy", options: l, value: Ve, onChange: R }),
    /* @__PURE__ */ t(Vp, { reason: ye, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const Xn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Xp = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function Qp(e, a, n, r, l, i) {
  var c;
  const s = ((c = Xn.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function Zp(e, a) {
  return eg(e) && ag(e, a) && tg(e);
}
function eg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function ag(e, a) {
  return e.colourStep === null || dt({ step: e.colourStep }, a);
}
function tg(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function ng(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : dt({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function rg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function lg({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(rg, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: Xp })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function og({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function ig({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function sg(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [m, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), ae = Qp(l, s, d, m, f, E), ge = Zp(ae, r), te = E.find((R) => R.kind === "agent" && R.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Dn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: m, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: ng(m, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((R) => ({ value: R, label: R })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(og, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(ig, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: Kp })
        ] }),
        /* @__PURE__ */ t(Dp, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(xn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: Xn, onChange: y }) }),
      /* @__PURE__ */ t(lg, { ready: ge, draft: ae, agentStage: te, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function oT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(sg, { ...e }) : /* @__PURE__ */ t(Jp, { ...e });
}
const cg = "_row_bs8hc_2", dg = "_cell_bs8hc_6", ug = "_condition_bs8hc_11", mg = "_action_bs8hc_18", hg = "_contract_bs8hc_24", wg = "_contractCondition_bs8hc_33", fg = "_contractAction_bs8hc_39", Z = {
  row: cg,
  cell: dg,
  condition: ug,
  action: mg,
  contract: hg,
  contractCondition: wg,
  contractAction: fg
}, Qn = ["advance", "block", "escalate", "requestReview"], Wt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ta(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ut(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: Wt[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: Qn.map((l) => ({ value: l, label: Wt[l] }))
    }
  );
}
function _g({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: Ta(e, r), children: Ta(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(h, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ut(e, a, n) })
  ] });
}
function vg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(h, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: Ta(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ut(e, a, n) })
  ] });
}
function bg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(h, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: Ta(e, r) }),
    /* @__PURE__ */ t(h, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: ut(e, a, n, !0) })
  ] });
}
const pg = { two: vg, four: _g, contract: bg };
function iT(e) {
  var n;
  if (!Qn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = pg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const gg = "_column_11id3_2", yg = "_head_11id3_17", Ng = "_index_11id3_23", kg = "_name_11id3_29", $g = "_meta_11id3_38", Cg = "_mono_11id3_43", Sg = "_gate_11id3_50", Rg = "_reviewersLabel_11id3_57", Tg = "_reviewers_11id3_57", xg = "_reviewer_11id3_57", Lg = "_agents_11id3_74", Ag = "_workflowColumn_11id3_79", Eg = "_workflowHead_11id3_96", Ig = "_stageRow_11id3_102", Mg = "_stageLabel_11id3_109", Bg = "_workflowTitle_11id3_116", Pg = "_workflowMeta_11id3_122", qg = "_workflowGate_11id3_127", Og = "_gateNote_11id3_135", jg = "_cardNote_11id3_140", Dg = "_reviewerList_11id3_145", Hg = "_reviewerRow_11id3_151", Fg = "_reviewerMark_11id3_157", zg = "_reviewerName_11id3_167", Wg = "_terminalCard_11id3_173", Kg = "_terminalCount_11id3_182", Gg = "_workflowAgents_11id3_188", Ug = "_mount_11id3_194", S = {
  column: gg,
  head: yg,
  index: Ng,
  name: kg,
  meta: $g,
  mono: Cg,
  gate: Sg,
  reviewersLabel: Rg,
  reviewers: Tg,
  reviewer: xg,
  agents: Lg,
  workflowColumn: Ag,
  workflowHead: Eg,
  stageRow: Ig,
  stageLabel: Mg,
  workflowTitle: Bg,
  workflowMeta: Pg,
  workflowGate: qg,
  gateNote: Og,
  cardNote: jg,
  reviewerList: Dg,
  reviewerRow: Hg,
  reviewerMark: Fg,
  reviewerName: zg,
  terminalCard: Wg,
  terminalCount: Kg,
  workflowAgents: Gg,
  mount: Ug
}, Vg = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function mt(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Zn(e) {
  return `${Math.round(e * 100)}%`;
}
function Yg({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: S.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(qa, { cells: [
      { value: Zn(e.gateShare), label: "Gate share" },
      { value: ee(e.count), label: "In stage" }
    ] })
  ] });
}
function Jg({ stage: e }) {
  return /* @__PURE__ */ t(qa, { cells: [
    { value: ee(e.count), label: "In stage" },
    { value: mt(e.closedThisWeek, ee), label: "Closed this week" }
  ] });
}
function Xg({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ t("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: S.name, id: a, children: e.name }),
    /* @__PURE__ */ t(h, { role: e.kind === "gate" ? "gate" : "soft", label: Vg[e.kind] })
  ] });
}
function Qg({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      ee(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      ce(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Zg({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(Yg, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(Jg, { stage: e }) : null;
}
function ey({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function ay({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(Xg, { stage: e, titleId: l }),
    /* @__PURE__ */ t(Qg, { stage: e }),
    /* @__PURE__ */ t(Zg, { stage: e }),
    /* @__PURE__ */ t("div", { className: S.agents, children: a.map((s) => /* @__PURE__ */ t(lv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(ey, { onMount: n })
  ] });
}
const ty = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function ny({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: S.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: S.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: S.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function ry({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(ny, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: Zn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function ly(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function oy({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: S.terminalCount, children: mt(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: S.cardNote, children: ly(e.rolledBackThisWeek) })
  ] });
}
function iy(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function sy(e) {
  if (e.kind === "terminal") return `${mt(e.closedThisWeek)} this week`;
  const a = iy(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function cy({ stage: e, titleId: a }) {
  const n = ty[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(h, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: S.workflowMeta, children: sy(e) })
  ] });
}
function dy(e) {
  return e === "entry" || e === "agent";
}
function uy({ stage: e, onMount: a }) {
  return a === void 0 || !dy(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function my({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(cy, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(ry, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(oy, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: S.workflowAgents, children: a }),
    /* @__PURE__ */ t(uy, { stage: e, onMount: n })
  ] });
}
function hy(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function sT(e) {
  return hy(e) ? /* @__PURE__ */ t(my, { ...e }) : /* @__PURE__ */ t(ay, { ...e });
}
const wy = "_row_1tdra_6", fy = "_name_1tdra_12", _y = "_compactRow_1tdra_13", vy = "_compactName_1tdra_13", by = "_cell_1tdra_30", py = "_chain_1tdra_45", gy = "_owner_1tdra_51", yy = "_mono_1tdra_57", Ny = "_compactCell_1tdra_79", ky = "_stack_1tdra_96", $y = "_stat_1tdra_103", Cy = "_identityLine_1tdra_110", Sy = "_identity_1tdra_110", Ry = "_ownerLine_1tdra_140", Ty = "_link_1tdra_160", xy = "_gateMark_1tdra_166", Ly = "_emptyChain_1tdra_171", Ay = "_arrow_1tdra_177", Ey = "_muted_1tdra_182", Iy = "_define_1tdra_187", My = "_statValue_1tdra_194", By = "_policyId_1tdra_200", Py = "_sub_1tdra_205", g = {
  row: wy,
  name: fy,
  compactRow: _y,
  compactName: vy,
  cell: by,
  chain: py,
  owner: gy,
  mono: yy,
  compactCell: Ny,
  stack: ky,
  stat: $y,
  identityLine: Cy,
  identity: Sy,
  ownerLine: Ry,
  link: Ty,
  gateMark: xy,
  emptyChain: Ly,
  arrow: Ay,
  muted: Ey,
  define: Iy,
  statValue: My,
  policyId: By,
  sub: Py
};
function er(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function qy(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Oy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function ar(e) {
  return `${ee(e)} ${e === 1 ? "member" : "members"}`;
}
function jy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${ar(e.members)}`;
}
function Dy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(h, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: jy(e) })
  ] }) });
}
function tr({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(T, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(h, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Hy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ma(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Fy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(tr, { name: l.name, gate: l.gate === !0, look: Hy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function zy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Fy(e) });
}
function nr(e) {
  return e === void 0 ? void 0 : !0;
}
function Kt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": nr(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Wy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Ky(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Gy({ stream: e, href: a, presentation: n }) {
  const r = Oy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: er, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Dy(e, a),
    zy(e),
    Kt(Ky(e.agents), e.agents === void 0 ? void 0 : qy(e.agents), "—"),
    Wy(e.policy),
    Kt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function Uy(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function cT(e) {
  if (Uy(e)) return Gy(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: er, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(h, { ...Pa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(h, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(tr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: ar(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": nr(a.inFlightHint), children: ee(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : ce(a.p50) }) })
  ] });
}
const Vy = "_row_2u4ll_2", Yy = "_name_2u4ll_16", Jy = "_scope_2u4ll_24", xa = {
  row: Vy,
  name: Yy,
  scope: Jy
};
function ht(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Xy(e) {
  return e === void 0 ? `${xa.row} ward-toolrow` : `${xa.row} ward-toolrow ${e}`;
}
function Qy(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Zy({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function eN({ classification: e }) {
  return /* @__PURE__ */ t(h, { role: e === "write" ? "write" : "meta", label: ht(e) });
}
function aN({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${xa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function tN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function dT({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = Qy(e, n), s = tN(n);
  return /* @__PURE__ */ o(s, { className: Xy(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Zy, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${xa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(aN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(eN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(h, { role: "meta", label: "Locked" }) : null
  ] });
}
const nN = "_strip_4ppv9_2", rN = "_well_4ppv9_11", lN = "_head_4ppv9_18", oN = "_name_4ppv9_24", iN = "_chart_4ppv9_32", sN = "_segment_4ppv9_38", cN = "_detailedChart_4ppv9_44", dN = "_rail_4ppv9_57", uN = "_section_4ppv9_63", mN = "_label_4ppv9_74", hN = "_note_4ppv9_91", G = {
  strip: nN,
  well: rN,
  head: lN,
  name: oN,
  chart: iN,
  segment: sN,
  detailedChart: cN,
  rail: dN,
  section: uN,
  label: mN,
  note: hN
}, wN = "No item in flight to preview.", fN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", _N = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Za = [1, 2, 3, 4, 5, 6], La = 100;
function vN(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function bN({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Za.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: G.segment,
      x: l * La,
      y: "0",
      width: La,
      height: "8",
      fill: vN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function pN(e) {
  const a = e.slice(0, Za.length);
  for (; a.length < Za.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function gN({ identities: e }) {
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
function rr(e) {
  return (a) => e == null ? void 0 : e(a);
}
function _a({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: G.label, children: e }),
    a
  ] });
}
function yN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: G.note, children: a ?? wN }) : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ma(n.streamStep) }, onOpen: rr(r), feed: null }) });
}
function NN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: a, children: [
    /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ t(h, { ...Pa(e.key, e.streamStep) })
  ] });
}
function kN(e) {
  const a = pN(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(_a, { label: "Board card", children: /* @__PURE__ */ t(yN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(_a, { label: "Streams index row", children: /* @__PURE__ */ t(NN, { draft: n }) }),
    /* @__PURE__ */ o(_a, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(gN, { identities: a }),
      /* @__PURE__ */ t("p", { className: G.note, children: fN })
    ] }),
    /* @__PURE__ */ t(_a, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: G.note, children: _N }) })
  ] });
}
function $N({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ t(h, { ...Pa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: rr(r) }) }),
    /* @__PURE__ */ t(bN, { draft: e, streams: n })
  ] });
}
function uT(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(kN, { ...e }) : /* @__PURE__ */ t($N, { ...e });
}
const CN = "_row_ixlg5_6", SN = "_headCell_ixlg5_10", RN = "_cell_ixlg5_11", TN = "_name_ixlg5_23", xN = "_consequence_ixlg5_29", LN = "_governed_ixlg5_36", AN = "_control_ixlg5_42", EN = "_byRole_ixlg5_48", IN = "_webControl_ixlg5_59", MN = "_webConsequence_ixlg5_65", BN = "_webGoverned_ixlg5_71", D = {
  row: CN,
  headCell: SN,
  cell: RN,
  name: TN,
  consequence: xN,
  governed: LN,
  control: AN,
  byRole: EN,
  webControl: IN,
  webConsequence: MN,
  webGoverned: BN
};
function PN({
  capability: e,
  cell: a,
  onChange: n
}) {
  return a.value === "byRole" ? /* @__PURE__ */ t("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ t(
      Ue,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => n(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ t(h, { role: "running", label: "Pilot" })
  ] });
}
function qN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(PN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function ON(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function jN({ name: e, cell: a, onChange: n }) {
  if (a.value === "byRole") return /* @__PURE__ */ t("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ t(
    Ue,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: n === void 0,
      onChange: (l) => n == null ? void 0 : n(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ t(h, { role: "running", label: "Pilot" }),
    r
  ] });
}
function DN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(jN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t("span", { className: `${D.webGoverned} ward-cellmeta`, children: ON(e) }) })
  ] });
}
function mT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(DN, { ...e }) : /* @__PURE__ */ t(qN, { ...e });
}
const HN = "_row_vv64h_2", FN = "_cell_vv64h_6", zN = "_name_vv64h_25", WN = "_note_vv64h_30", KN = "_webName_vv64h_41", GN = "_webMeta_vv64h_47", Y = {
  row: HN,
  cell: FN,
  name: zN,
  note: WN,
  webName: KN,
  webMeta: GN
}, lr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function UN(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function VN({ component: e, onRestart: a }) {
  const n = N(), r = lr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      ee(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(h, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function YN({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: UN(e.state) });
}
function JN({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(h, { ...lr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(YN, { component: e, onRestart: a }) })
  ] });
}
function hT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(JN, { ...e }) : /* @__PURE__ */ t(VN, { ...e });
}
const XN = "_row_jcm5k_7", QN = "_cell_jcm5k_11", ZN = "_next_jcm5k_28", e1 = "_headCell_jcm5k_38", a1 = "_webId_jcm5k_77", t1 = "_webPurpose_jcm5k_83", n1 = "_webMeta_jcm5k_91", r1 = "_webUrgent_jcm5k_97", F = {
  row: XN,
  cell: QN,
  next: ZN,
  headCell: e1,
  webId: a1,
  webPurpose: t1,
  webMeta: n1,
  webUrgent: r1
}, l1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, o1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, or = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], i1 = Object.fromEntries(or.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = i1[e];
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
function wT() {
  return /* @__PURE__ */ t("tr", { children: or.map((e) => /* @__PURE__ */ t(
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
function s1({ cred: e }) {
  const a = l1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ht(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function c1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function d1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(c1, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(h, { ...o1[e.state] }) })
  ] });
}
function fT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(d1, { ...e }) : /* @__PURE__ */ t(s1, { ...e });
}
const u1 = "_card_17zba_2", m1 = "_head_17zba_11", h1 = "_env_17zba_18", w1 = "_version_17zba_25", f1 = "_meta_17zba_32", _1 = "_webCard_17zba_37", v1 = "_webRow_17zba_47", b1 = "_webTitle_17zba_55", p1 = "_webLine_17zba_65", g1 = "_webVersion_17zba_72", y1 = "_webMeta_17zba_77", V = {
  card: u1,
  head: m1,
  env: h1,
  version: w1,
  meta: f1,
  webCard: _1,
  webRow: v1,
  webTitle: b1,
  webLine: p1,
  webVersion: g1,
  webMeta: y1
}, Gt = { dev: "Dev", uat: "UAT", prod: "Prod" }, ir = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function N1({ env: e }) {
  const a = ir[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Gt[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ t("span", { className: V.env, children: Gt[e.env] }),
      /* @__PURE__ */ t(h, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      de(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: V.meta, children: n })
  ] });
}
function k1(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [de(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function $1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(h, { ...ir[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: k1(e) })
  ] });
}
function _T(e) {
  return "presentation" in e ? /* @__PURE__ */ t($1, { ...e }) : /* @__PURE__ */ t(N1, { ...e });
}
const C1 = "_panel_1hmja_2", S1 = "_line_1hmja_8", R1 = "_actions_1hmja_14", va = {
  panel: C1,
  line: S1,
  actions: R1
};
function vT(e) {
  return /* @__PURE__ */ o("div", { className: va.panel, children: [
    /* @__PURE__ */ t("p", { className: va.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: va.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: va.line, children: e.note ?? "" })
  ] });
}
const T1 = "_upload_13fcl_2", x1 = "_preview_13fcl_7", L1 = "_mark_13fcl_17", A1 = "_empty_13fcl_22", E1 = "_actions_13fcl_28", I1 = "_input_13fcl_33", M1 = "_reasons_13fcl_41", B1 = "_reason_13fcl_41", P1 = "_accepted_13fcl_57", ne = {
  upload: T1,
  preview: x1,
  mark: L1,
  empty: A1,
  actions: E1,
  input: I1,
  reasons: M1,
  reason: B1,
  accepted: P1
}, sr = 1.5, cr = 22, Aa = "script elements or event handlers", Pe = "links or external references", Re = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${sr}px at ${cr}px`], q1 = [Re[1], Re[2], Aa, Pe], O1 = /* @__PURE__ */ new Map([
  ["image", Re[1]],
  ["text", Re[2]],
  ["tspan", Re[2]],
  ["textPath", Re[2]],
  ["script", Aa],
  ["foreignObject", Aa],
  ["a", Pe],
  ["use", Pe],
  ["style", Pe],
  ["feImage", Pe],
  ["set", Pe]
]), j1 = "http://www.w3.org/2000/svg", D1 = "http://www.w3.org/2000/xmlns/", H1 = /* @__PURE__ */ new Set([
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
]), F1 = /* @__PURE__ */ new Set([
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
]), wt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, z1 = /url\s*\(|['"\\]/i;
function W1() {
  return { ok: !1, reasons: [Re[1]] };
}
function dr(e) {
  return e.namespaceURI === j1;
}
function K1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && dr(a) ? a : null;
  } catch {
    return null;
  }
}
function G1(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [Re[0]] : [];
}
function U1(e) {
  return O1.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function V1(e) {
  return z1.test(e.replace(wt, ""));
}
function Y1(e) {
  return /^on/i.test(e.localName) ? Aa : e.localName === "href" || V1(e.value) ? Pe : void 0;
}
function J1(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(U1(n));
    for (const r of Array.from(n.attributes)) a.add(Y1(r));
  }
  return q1.filter((n) => a.has(n));
}
function X1(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? cr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < sr;
  }) ? [Re[3]] : [];
}
function Q1(e) {
  if (e.namespaceURI === D1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (F1.has(a) || a.startsWith("stroke"));
}
function Z1(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && dr(a) && H1.has(a.localName);
}
function ek(e, a) {
  Z1(a) ? a.nodeType === Node.ELEMENT_NODE && ur(a) : e.removeChild(a);
}
function ur(e) {
  for (const a of Array.from(e.attributes)) Q1(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) ek(e, a);
  return e;
}
function ak(e) {
  return Array.from(e.matchAll(wt), (a) => a[2]).filter((a) => a !== "");
}
function tk(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function nk(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of ak(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function rk(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function lk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = nk(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), rk(l, r);
  }
  return e;
}
function bT(e) {
  const a = K1(e);
  if (a === null) return W1();
  const n = [...G1(a), ...J1(a), ...X1(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(lk(ur(a), tk(e))) };
}
const ok = "Mark accepted.", ik = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, sk = new Set(tn.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function ck(e) {
  return e !== void 0 && (ik.test(e) || sk.has(e)) ? e : void 0;
}
function dk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: ne.preview, style: { "--mark": ck(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: ne.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: ne.empty }) });
}
function uk(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function mk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function hk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: ne.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("p", { className: ne.accepted, children: ok }) }) : /* @__PURE__ */ t("div", { className: ne.result, role: "status", children: /* @__PURE__ */ t("ul", { className: ne.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: ne.reason, children: a }, a)) }) });
}
function wk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(hk, { result: e }) : /* @__PURE__ */ t("p", { className: `${ne.result} ${uk(e, n)}`, role: "status", children: mk(e, n) });
}
function Ut(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function pT({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const m = a(u);
    m instanceof Promise ? m.then(c) : c(m);
  };
  return /* @__PURE__ */ o("div", { className: ne.upload, children: [
    /* @__PURE__ */ t(dk, { current: e }),
    /* @__PURE__ */ o("div", { className: ne.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: ne.input,
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
      /* @__PURE__ */ t(b, { ...Ut(l), onClick: () => {
        var u;
        return (u = i.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ t(b, { ...Ut(l), variant: "ghost", onClick: n, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ t(wk, { result: s, presentation: r })
  ] });
}
const fk = "_row_o3t6y_7", _k = "_cell_o3t6y_11", vk = "_head_o3t6y_28", bk = "_name_o3t6y_34", pk = "_pinned_o3t6y_42", gk = "_headCell_o3t6y_49", yk = "_webName_o3t6y_88", Nk = "_webMeta_o3t6y_95", kk = "_webWarn_o3t6y_103", q = {
  row: fk,
  cell: _k,
  head: vk,
  name: bk,
  pinned: pk,
  headCell: gk,
  webName: yk,
  webMeta: Nk,
  webWarn: kk
}, ft = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, mr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], $k = Object.fromEntries(mr.map((e) => [e.key, e]));
function Ck(e, a) {
  return `mcp.${e}.${a}`;
}
function Sk(e) {
  return Object.keys(ft).includes(e);
}
function Rk(e) {
  return ft[e !== void 0 && Sk(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = $k[e];
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
function gT() {
  return /* @__PURE__ */ t("tr", { children: mr.map((e) => /* @__PURE__ */ t(
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
function Tk({ server: e }) {
  const a = ft[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(ra, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ t("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ t(h, { role: e.cls === "write" ? "write" : "meta", label: ht(e.cls) })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ t(ra, { column: "connection", children: /* @__PURE__ */ t(h, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(ra, { column: "transport", children: e.transport }),
    /* @__PURE__ */ t(ra, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => Ck(e.name, n)).join(" · ") })
  ] });
}
function xk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Lk(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function Ak({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Ek({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Ik({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Mk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: xk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...Lk(e) }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(Ak, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(h, { ...Rk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t(Ek, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Ik, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function yT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Mk, { ...e }) : /* @__PURE__ */ t(Tk, { ...e });
}
const Bk = "_row_1ibo7_2", Pk = "_headCell_1ibo7_14", qk = "_cell_1ibo7_15", Ok = "_name_1ibo7_26", jk = "_consequence_1ibo7_32", Dk = "_reason_1ibo7_38", Hk = "_value_1ibo7_44", Fk = "_webRow_1ibo7_60", zk = "_webSetting_1ibo7_73", Wk = "_webName_1ibo7_81", Kk = "_webConsequence_1ibo7_89", Gk = "_webControl_1ibo7_95", Uk = "_webState_1ibo7_109", Vk = "_webChip_1ibo7_114", I = {
  row: Bk,
  headCell: Pk,
  cell: qk,
  name: Ok,
  consequence: jk,
  reason: Dk,
  value: Hk,
  webRow: Fk,
  webSetting: zk,
  webName: Wk,
  webConsequence: Kk,
  webControl: Gk,
  webState: Uk,
  webChip: Vk
}, hr = 104, wr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function Yk({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ue, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Rn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function Jk({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = wr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(Yk, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: hr }, children: /* @__PURE__ */ t(h, { role: i.role, label: i.label }) })
  ] });
}
function fr(e, a) {
  return String(e ?? a);
}
function Xk(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Qk(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? fr(e.value, "—");
}
function Zk({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ue, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function e$(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(Zk, { ...e });
  const l = Xk(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Rn, { options: l, value: fr(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: Qk(a) });
}
function a$({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(e$, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: hr }, children: /* @__PURE__ */ t(h, { ...wr[n], size: "tag" }) })
  ] });
}
function NT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(a$, { ...e }) : /* @__PURE__ */ t(Jk, { ...e });
}
const t$ = "_label_h9m4w_7", n$ = "_name_h9m4w_15", r$ = "_column_h9m4w_24", l$ = "_webFrame_h9m4w_57", o$ = "_webHead_h9m4w_62", i$ = "_webHeadLabel_h9m4w_74", s$ = "_webLabel_h9m4w_117", c$ = "_webColumns_h9m4w_124", d$ = "_webGroup_h9m4w_130", u$ = "_webPeople_h9m4w_131", m$ = "_webVia_h9m4w_132", h$ = "_webMeta_h9m4w_161", z = {
  label: t$,
  name: n$,
  column: r$,
  webFrame: l$,
  webHead: o$,
  webHeadLabel: i$,
  webLabel: s$,
  webColumns: c$,
  webGroup: d$,
  webPeople: u$,
  webVia: m$,
  webMeta: h$
}, w$ = {
  platformAdmin: { role: "gate", label: "Platform admin" },
  approver: { role: "running", label: "Approver" },
  streamAdmin: { role: "meta", label: "Stream admin" },
  member: { role: "meta", label: "Member" },
  viewer: { role: "meta", label: "Viewer" }
}, Ga = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ua({ column: e, children: a }) {
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
function f$(e) {
  if (!e.matrixRole) return;
  const a = w$[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function _$({ node: e }) {
  const a = f$(e);
  return /* @__PURE__ */ o("span", { className: z.label, children: [
    /* @__PURE__ */ t("span", { className: z.name, children: e.name }),
    /* @__PURE__ */ t(v$, { role: a, node: e }),
    /* @__PURE__ */ t(Ua, { column: Ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ua, { column: Ga[1], children: e.people === void 0 ? "" : ee(e.people) }),
    /* @__PURE__ */ t(Ua, { column: Ga[2], children: e.requestedVia ?? "" })
  ] });
}
function v$({ role: e, node: a }) {
  return /* @__PURE__ */ o(T, { children: [
    e && /* @__PURE__ */ t(h, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(h, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(h, { role: "warn", label: "Unresolved" })
  ] });
}
function b$({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    Mn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t(_$, { node: n }),
      children: s
    }
  );
}
function Va({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function p$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Va, { className: `${z.webMeta} ${z.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Va, { className: `${z.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Va, { className: `${z.webMeta} ${z.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function g$() {
  return /* @__PURE__ */ o("div", { className: z.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: z.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: z.webColumns, children: [
      /* @__PURE__ */ t("span", { className: z.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: z.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: z.webVia, children: "Requested via" })
    ] })
  ] });
}
function y$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${z.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(h, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(h, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function N$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function k$({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: z.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(g$, {}),
    /* @__PURE__ */ t(rh, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      Mn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(y$, { row: n }),
        detail: /* @__PURE__ */ t(p$, { row: n }),
        expanded: N$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function kT(e) {
  return "presentation" in e ? /* @__PURE__ */ t(k$, { ...e }) : /* @__PURE__ */ t(b$, { ...e });
}
const $$ = "_runbook_b9agc_2", C$ = "_list_b9agc_7", S$ = "_step_b9agc_15", R$ = "_numeral_b9agc_21", T$ = "_body_b9agc_28", x$ = "_head_b9agc_34", L$ = "_title_b9agc_40", A$ = "_detail_b9agc_45", E$ = "_actions_b9agc_50", I$ = "_webList_b9agc_56", M$ = "_webStep_b9agc_60", B$ = "_webBody_b9agc_66", P$ = "_webTitle_b9agc_74", q$ = "_webDetail_b9agc_78", L = {
  runbook: $$,
  list: C$,
  step: S$,
  numeral: R$,
  body: T$,
  head: x$,
  title: L$,
  detail: A$,
  actions: E$,
  webList: I$,
  webStep: M$,
  webBody: B$,
  webTitle: P$,
  webDetail: q$
}, _r = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function vr(e) {
  return String(e + 1).padStart(2, "0");
}
function O$({ step: e, index: a, connection: n }) {
  const r = _r[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.numeral, children: vr(a) }),
    /* @__PURE__ */ o("span", { className: L.body, children: [
      /* @__PURE__ */ o("span", { className: L.head, children: [
        /* @__PURE__ */ t("span", { className: L.title, children: e.title }),
        /* @__PURE__ */ t(h, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n })
      ] }),
      /* @__PURE__ */ t("span", { className: L.detail, children: e.detail })
    ] })
  ] });
}
function j$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(O$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function D$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: vr(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(h, { ..._r[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function H$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(D$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function $T(e) {
  return "presentation" in e ? /* @__PURE__ */ t(H$, { ...e }) : /* @__PURE__ */ t(j$, { ...e });
}
const F$ = "_list_1gu6a_2", z$ = "_check_1gu6a_10", W$ = "_body_1gu6a_16", K$ = "_text_1gu6a_23", G$ = "_pending_1gu6a_32", U$ = "_measured_1gu6a_37", Qe = {
  list: F$,
  check: z$,
  body: W$,
  text: K$,
  pending: G$,
  measured: U$
};
function V$(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function Y$({ check: e }) {
  const a = V$(e.passed);
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
function CT({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(Y$, { check: a }, a.text)) });
}
const J$ = "_root_4aacj_2", X$ = "_list_4aacj_10", Q$ = "_line_4aacj_26", Z$ = "_at_4aacj_53", e0 = "_text_4aacj_57", a0 = "_foot_4aacj_61", t0 = "_idle_4aacj_73", n0 = "_caret_4aacj_81", r0 = "_jump_4aacj_88", we = {
  root: J$,
  list: X$,
  line: Q$,
  at: Z$,
  text: e0,
  foot: a0,
  idle: t0,
  caret: n0,
  jump: r0
}, l0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _t(e) {
  return Number.isNaN(Date.parse(e)) ? "" : l0.format(new Date(e));
}
const o0 = { warn: "warning", ok: "ok" };
function i0({ kind: e }) {
  const a = o0[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function s0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${_t(e)}` });
}
function c0({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_t(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: we.idle, children: i }),
    /* @__PURE__ */ t(s0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const d0 = 8;
function u0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > d0;
}
function m0({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const br = xe(null);
function ST({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Qt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(br.Provider, { value: i, children: n });
}
function h0() {
  const e = Te(br), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function RT({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = h0(), [u, m] = p(!1), w = e.at(-1);
  C(() => {
    s(e.length);
  }, [e.length]), aa(() => {
    const y = l.current;
    y && !u && (y.scrollTop = y.scrollHeight);
  }, [e.length, u]);
  const f = () => {
    var P;
    const y = l.current;
    if (!y) return;
    const E = y.querySelectorAll("[data-consline-text]");
    (P = E.item(E.length - 1)) == null || P.focus(), m(!1);
  };
  return /* @__PURE__ */ o("div", { className: we.root, children: [
    /* @__PURE__ */ t("ol", { className: we.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => m(u0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${we.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: we.at, children: _t(y.at) }),
      /* @__PURE__ */ t(i0, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(c0, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(m0, { shown: u, onJump: f })
    ] })
  ] });
}
const w0 = "_row_1k8wl_2", f0 = "_head_1k8wl_14", _0 = "_author_1k8wl_20", v0 = "_eta_1k8wl_25", b0 = "_edited_1k8wl_26", p0 = "_body_1k8wl_32", g0 = "_reason_1k8wl_37", y0 = "_actions_1k8wl_42", ke = {
  row: w0,
  head: f0,
  author: _0,
  eta: v0,
  edited: b0,
  body: p0,
  reason: g0,
  actions: y0
}, N0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function k0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function $0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function C0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: ke.reason, id: a, children: e })
  ] });
}
function S0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function R0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t($0, { ...e }) : /* @__PURE__ */ t(C0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function TT(e) {
  const { comment: a } = e;
  S0(e);
  const n = N(), r = `${n}-unavailable`, l = N0[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ke.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ke.head, children: [
      /* @__PURE__ */ t("span", { className: ke.author, children: a.author }),
      /* @__PURE__ */ t(h, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: ke.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: ke.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: ke.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: ke.reason, id: n, children: k0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: ke.actions, children: /* @__PURE__ */ t(R0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const T0 = "_root_rvhdw_2", x0 = "_attach_rvhdw_11", L0 = "_actions_rvhdw_17", A0 = "_reply_rvhdw_23", E0 = "_replyField_rvhdw_28", I0 = "_send_rvhdw_54", M0 = "_sendIcon_rvhdw_65", B0 = "_sendsAs_rvhdw_75", Oe = {
  root: T0,
  attach: x0,
  actions: L0,
  reply: A0,
  replyField: E0,
  send: I0,
  sendIcon: M0,
  sendsAs: B0
};
function pr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function P0() {
  return /* @__PURE__ */ t("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function q0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function O0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = pr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    q0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(P0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function xT(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(O0, { ...e }) : /* @__PURE__ */ t(j0, { ...e });
}
function j0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = pr(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ t(h, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      cn,
      {
        label: `Requeue ${l.agent} after posting`,
        consequence: l.consequence,
        checked: l.checked,
        onChange: l.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Oe.actions, children: [
      /* @__PURE__ */ t(b, { variant: "primary", onClick: () => i(n, c), children: `Post as ${n}` }),
      s && /* @__PURE__ */ t(b, { variant: "ghost", onClick: () => s(c), children: "Save draft" })
    ] })
  ] });
}
const D0 = "_list_1yhks_2", H0 = "_item_1yhks_6", F0 = "_body_1yhks_22", z0 = "_text_1yhks_28", W0 = "_evidence_1yhks_37", K0 = "_consequence_1yhks_49", G0 = "_note_1yhks_54", Ge = {
  list: D0,
  item: H0,
  body: F0,
  text: z0,
  evidence: W0,
  consequence: K0,
  note: G0
};
function U0({ criterion: e }) {
  return /* @__PURE__ */ t(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Vt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function V0(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function Y0({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ t("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(T, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Ge.consequence, children: V0(e.why) })
    ] })
  ] });
}
function J0({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(U0, { criterion: e }),
    /* @__PURE__ */ t(Y0, { criterion: e })
  ] });
}
function LT({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(J0, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const X0 = "_list_dwhoz_2", Q0 = "_rung_dwhoz_6", Z0 = "_name_dwhoz_18", eC = "_actor_dwhoz_32", ya = {
  list: X0,
  rung: Q0,
  name: Z0,
  actor: eC
}, aC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function tC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = aC[e.state];
  return /* @__PURE__ */ o("li", { className: ya.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ya.name, children: e.name }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ya.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function AT({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ya.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(tC, { rung: a }, a.name)) });
}
const nC = "_sheet_pw37w_2", rC = "_title_pw37w_9", lC = "_stage_pw37w_15", oC = "_effects_pw37w_20", iC = "_effect_pw37w_20", sC = "_numeral_pw37w_31", cC = "_effectText_pw37w_38", dC = "_refusals_pw37w_43", uC = "_reasons_pw37w_52", mC = "_reason_pw37w_52", hC = "_actions_pw37w_62", ue = {
  sheet: nC,
  title: rC,
  stage: lC,
  effects: oC,
  effect: iC,
  numeral: sC,
  effectText: cC,
  refusals: dC,
  reasons: uC,
  reason: mC,
  actions: hC
};
function wC({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function ET({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, m] = p(""), w = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: ue.effects, children: a.map((f, y) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ t("span", { className: ue.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: ue.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ t(
      Hu,
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
      /* @__PURE__ */ t("ul", { className: ue.reasons, children: n.map((f, y) => /* @__PURE__ */ t("li", { className: ue.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ t(wC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const fC = "_list_1rowi_2", _C = "_path_1rowi_7", vC = "_head_1rowi_21", bC = "_label_1rowi_28", pC = "_consequence_1rowi_35", gC = "_ask_1rowi_36", ea = {
  list: fC,
  path: _C,
  head: vC,
  label: bC,
  consequence: pC,
  ask: gC
}, et = {
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
function yC({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", onClick: () => n(e.kind), children: et[e.kind] }) : /* @__PURE__ */ o(T, { children: [
    /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", disabled: !0, describedBy: r, children: et[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function NC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Yt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? et[e.kind] }),
      /* @__PURE__ */ t(h, { role: Yt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(yC, { path: e, primary: a, onChoose: n })
  ] });
}
function IT({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(NC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const kC = "_list_1m7i0_2", $C = "_item_1m7i0_6", CC = "_node_1m7i0_18", SC = "_body_1m7i0_24", RC = "_head_1m7i0_30", TC = "_stage_1m7i0_36", xC = "_version_1m7i0_41", LC = "_sentence_1m7i0_49", AC = "_meta_1m7i0_54", Ce = {
  list: kC,
  item: $C,
  node: CC,
  body: SC,
  head: RC,
  stage: TC,
  version: xC,
  sentence: LC,
  meta: AC
}, EC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function IC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ce.head, children: [
    /* @__PURE__ */ t("span", { className: Ce.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Ce.version, title: e.version, children: e.version }) : null
  ] });
}
function MC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ce.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Ce.node} ward-history-node`, children: /* @__PURE__ */ t(He, { size: 9, kind: EC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ce.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(IC, { entry: e }),
      /* @__PURE__ */ t("span", { className: Ce.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ce.meta} ward-history-meta`, children: [
        `${de(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function MT({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Ce.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(MC, { entry: a }, a.stage + String(n))) });
}
const BC = "_thread_1e70p_3", PC = "_turn_1e70p_8", qC = "_who_1e70p_27", OC = "_body_1e70p_32", Na = {
  thread: BC,
  turn: PC,
  who: qC,
  body: OC
}, gr = xe(!1);
function BT({ children: e, density: a }) {
  return /* @__PURE__ */ t(gr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${Na.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function PT({ turn: e }) {
  if (!Te(gr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Na.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Na.who} ward-chat-who`, children: [
      e.author,
      " · ",
      de(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${Na.body} ward-chat-body`, children: e.body })
  ] });
}
const jC = "_list_yiolt_3", DC = "_row_yiolt_7", HC = "_label_yiolt_20", FC = "_n_yiolt_26", zC = "_cause_yiolt_33", oa = {
  list: jC,
  row: DC,
  label: HC,
  n: FC,
  cause: zC
};
function WC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const KC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function GC({ row: e, formatNumber: a }) {
  return WC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(He, { size: 8, ...KC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(UC, { cause: e.cause })
  ] });
}
function UC({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function qT({ rows: e, formatNumber: a = ee }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(GC, { row: n, formatNumber: a }, n.label)) });
}
const VC = "_root_1jxwp_2", YC = {
  root: VC
};
function OT({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: YC.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const JC = "_row_dhbre_3", XC = "_key_dhbre_13", QC = "_stack_dhbre_24", ZC = "_value_dhbre_32", eS = "_evidence_dhbre_39", aS = "_mark_dhbre_47", Xe = {
  row: JC,
  key: XC,
  stack: QC,
  value: ZC,
  evidence: eS,
  mark: aS
};
function tS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(h, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(it, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function jT({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(tS, { state: e.state }) })
  ] });
}
const nS = "_cell_gh2sd_2", rS = {
  cell: nS
}, lS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function oS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function iS(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function sS(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: oS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function cS(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function DT({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  iS(e, n);
  const r = cS(e);
  return /* @__PURE__ */ t(
    am,
    {
      label: "Rejection routing",
      columns: lS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: rS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: sS(l, i) }),
      empty: a ?? /* @__PURE__ */ t(zh, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const dS = "_row_1f2re_2", uS = "_title_1f2re_12", mS = "_turns_1f2re_18", hS = "_waiting_1f2re_19", wS = "_resolved_1f2re_20", fS = "_activity_1f2re_21", _S = "_cost_1f2re_28", vS = "_link_1f2re_29", bS = "_tableLink_1f2re_47", pS = "_tableRecord_1f2re_48", gS = "_tableRow_1f2re_59", yS = "_tableTitle_1f2re_71", NS = "_tableResolved_1f2re_76", kS = "_tableMeta_1f2re_87", $S = "_tableCost_1f2re_94", CS = "_tableActivity_1f2re_95", SS = "_tableState_1f2re_105", j = {
  row: dS,
  title: uS,
  turns: mS,
  waiting: hS,
  resolved: wS,
  activity: fS,
  cost: _S,
  link: vS,
  tableLink: bS,
  tableRecord: pS,
  tableRow: gS,
  tableTitle: yS,
  tableResolved: NS,
  tableMeta: kS,
  tableCost: $S,
  tableActivity: CS,
  tableState: SS
}, yr = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function RS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function TS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function xS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const LS = { duplicate: "Closed · duplicate" };
function AS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: j.tableMeta, text: `waiting on ${e}` });
}
function ES({ value: e }) {
  return /* @__PURE__ */ t("td", { className: j.tableCost, children: e === void 0 ? null : re(e) });
}
function IS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function MS({ session: e, href: a }) {
  const n = yr[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${j.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: j.tableMeta, children: TS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      xS(e.resolved),
      /* @__PURE__ */ t(AS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(ES, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: j.tableActivity, children: RS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(h, { role: n.role, label: LS[e.state] ?? n.label }),
      /* @__PURE__ */ t(IS, { link: e.link })
    ] }) })
  ] });
}
function BS({ session: e }) {
  const a = yr[e.state];
  return /* @__PURE__ */ o("div", { className: j.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: j.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: j.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: j.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: j.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: j.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ t("span", { className: j.activity, children: de(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: j.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(h, { role: a.role, label: a.label })
  ] });
}
function HT(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(MS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(BS, { session: e.session });
}
const PS = "_block_1yy2v_3", qS = "_list_1yy2v_9", OS = "_line_1yy2v_14", at = {
  block: PS,
  list: qS,
  line: OS
}, jS = { warn: "warning", ok: "ok" };
function DS({ kind: e }) {
  const a = jS[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function HS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${at.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(DS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function FT({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${at.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: at.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(HS, { line: n }, `${r}-${n.text}`)) }) });
}
const FS = "_band_tt7hp_1", zS = "_head_tt7hp_8", WS = "_cell_tt7hp_19", KS = "_index_tt7hp_35", GS = "_title_tt7hp_42", US = "_note_tt7hp_48", VS = "_cellTitle_tt7hp_53", YS = "_cellBody_tt7hp_58", JS = "_tag_tt7hp_64", Ne = {
  band: FS,
  head: zS,
  cell: WS,
  index: KS,
  title: GS,
  note: US,
  cellTitle: VS,
  cellBody: YS,
  tag: JS
}, Xt = 4;
function zT({ index: e, title: a, note: n, cells: r }) {
  if (r.length !== Xt)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Xt}-cell grid`);
  return /* @__PURE__ */ o("section", { className: Ne.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: Ne.head, children: [
      /* @__PURE__ */ t("span", { className: Ne.index, children: e }),
      /* @__PURE__ */ t("span", { className: Ne.title, children: a }),
      /* @__PURE__ */ t("span", { className: Ne.note, children: n })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: Ne.cell, children: [
      /* @__PURE__ */ t("span", { className: Ne.cellTitle, children: l.title }),
      /* @__PURE__ */ t("span", { className: Ne.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ t("span", { className: Ne.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  iR as ACCENT_PRESETS,
  RR as ActionStack,
  RT as ActivityConsole,
  fR as AdminIcon,
  lv as AgentCard,
  _R as AppShell,
  uT as AppearanceStrip,
  zT as Band,
  $R as BarChart,
  kw as BoardColumn,
  WR as BoardFootnote,
  KR as BoardHeader,
  hR as BoardIcon,
  BR as BoardScroller,
  b as Btn,
  oR as CHIP_ROLES,
  or as CREDENTIAL_COLUMNS,
  kR as Callout,
  mT as CapabilityRow,
  qR as CardGrid,
  PT as ChatMessage,
  cn as Checkbox,
  h as Chip,
  ta as ClampText,
  TT as ClarificationRow,
  aT as ClauseRuleRow,
  eT as ClauseRules,
  Dn as ColourLadder,
  hT as ComponentRow,
  xT as Composer,
  UR as ConfigRow,
  GR as ConfigRowHead,
  st as ConnectionMark,
  ST as ConsoleAnnounceProvider,
  BT as Conversation,
  Hu as CostMeter,
  fT as CredentialRow,
  wT as CredentialRowHead,
  LT as CriteriaList,
  Wi as Crumb,
  sR as DENSITIES,
  qT as DeliveryHealth,
  jR as DeniedState,
  uR as DisabledScope,
  nT as DryRunRail,
  zh as EmptyState,
  _T as EnvCard,
  M as Field,
  OR as FilteredEmpty,
  IR as FormStack,
  Da as GateChecklist,
  AT as GateLadder,
  am as Grid,
  lT as HandoffRuleRow,
  rT as HandoffRules,
  mR as HomeIcon,
  VR as ItemDrawer,
  vT as KeyPanel,
  zr as LIVE_EVENT_TYPES,
  R_ as LegacyBoardColumn,
  JR as LegacyBoardHeader,
  XR as LegacyConfigRow,
  ZR as LegacyItemDrawer,
  g_ as LegacyOverCapNote,
  QR as LegacyPreviewRail,
  qn as LegacyWorkCard,
  Le as LiveIndicator,
  DR as LoadFailed,
  zR as Loading,
  mr as MCP_SERVER_COLUMNS,
  it as Mark,
  pT as MarkUpload,
  He as Marker,
  yT as McpServerRow,
  gT as McpServerRowHead,
  uc as Menu,
  Xs as MenuButton,
  oT as NewStreamModal,
  Gh as OverCapNote,
  Ba as OverflowRow,
  na as Overlay,
  tT as PARTIAL_STEP_REASON,
  hr as POLICY_CHIP_WIDTH,
  LR as PageFrame,
  NR as PageHeader,
  CR as PlainList,
  NT as PolicyRow,
  YR as PreviewRail,
  Ga as ROLE_MATRIX_COLUMNS,
  Qn as RULE_ACTIONS,
  xn as Radio,
  OT as ReadyChecklist,
  ER as RecordSection,
  ET as RequeueSheet,
  IT as ResolveBlock,
  jT as ResolvedFieldRow,
  kT as RoleMatrixRow,
  DT as RoutingTable,
  iT as RuleRow,
  $T as RunbookSteps,
  Fr as STREAM_STEPS,
  MR as SectionBand,
  Mt as SectionHeader,
  Rn as SegmentedControl,
  vn as Select,
  HT as SessionRow,
  pR as Sidebar,
  sT as StageColumn,
  PR as StageGrid,
  MT as StageHistory,
  Dp as StageListEditor,
  HR as StaleStrip,
  qa as StatStrip,
  TR as StatTiles,
  yR as StreamAvatar,
  cT as StreamRow,
  wR as StudioIcon,
  AR as SubjectRail,
  Ue as Switch,
  bR as TabLinks,
  SR as TableHead,
  vR as Tabs,
  tR as ThemeProvider,
  dT as ToolRow,
  xR as TopBar,
  rh as Tree,
  Mn as TreeRow,
  FT as TypedInputBlock,
  xo as UNSAFE_HREF,
  CT as ValidationList,
  eR as VisibilityProvider,
  aR as Visible,
  lR as WARD_VERSION,
  ja as WorkCard,
  FR as WriteUnavailableStrip,
  RS as agoSince,
  xr as clock,
  ng as colourStatus,
  ee as count,
  ce as duration,
  tt as elapsed,
  rR as eventSourceTransport,
  Ia as isStreamStep,
  ca as isValidatedStreamStep,
  Bv as ladderValidation,
  Rk as mcpConnectionChip,
  Ck as mcpToolName,
  re as money,
  fe as ms,
  Bn as ordered,
  en as ratio,
  UN as restartLabel,
  H as safeHref,
  de as stamp,
  nt as stream,
  cR as streamChip,
  Pa as streamChipProps,
  pe as streamColour,
  Gr as streamHex,
  Ca as streamInitials,
  Wr as streamVars,
  gR as uniqueStreamInitials,
  hn as useAnchoredPanel,
  ba as useBorderFlash,
  Ae as useDisabledScope,
  jr as useFocusTrap,
  dR as useLiveFeed,
  nR as useReturnFocus,
  Ea as useRovingTabindex,
  rt as useTicker,
  Lr as useVisible,
  W as v,
  bT as validateMark,
  ma as validatedStep,
  tn as validatedStreamSteps
};
