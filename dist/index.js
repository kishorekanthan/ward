import { jsx as t, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Qt, useContext as ge, createContext as ye, useState as p, useEffect as C, useCallback as Q, useRef as _, useLayoutEffect as aa, useId as N, isValidElement as Sr, Children as Rr, Fragment as Tr } from "react";
import { createPortal as xr, flushSync as Zt } from "react-dom";
function de(e) {
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
const Lr = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ue(e) {
  const a = Lr.formatToParts(new Date(e)), n = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${n("day")} ${n("month")} ${n("hour")}:${n("minute")}`;
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
function en(e, a) {
  return `${e} / ${a}`;
}
const Ar = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Er(e) {
  return Ar.format(new Date(e));
}
const an = ye(/* @__PURE__ */ new Set());
function sR({ hidden: e, children: a }) {
  const n = Qt(() => new Set(e), [e]);
  return /* @__PURE__ */ t(an.Provider, { value: n, children: a });
}
function Ir(e) {
  return !ge(an).has(e);
}
function cR({ id: e, children: a, fallback: n = null }) {
  return /* @__PURE__ */ t(R, { children: Ir(e) ? a : n });
}
const Mr = "(prefers-color-scheme: dark)";
function bt() {
  return typeof window.matchMedia == "function" ? window.matchMedia(Mr) : null;
}
function Br(e) {
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
function Pr(e, a) {
  return e !== "system" ? e : a ? "dark" : "light";
}
function dR({ theme: e, accent: a = "green", density: n = "comfortable", children: r }) {
  const l = Br(e === "system");
  return Ha("data-theme", Pr(e, l)), Ha("data-accent", a), Ha("data-density", n), /* @__PURE__ */ t(R, { children: r });
}
const qr = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Or(e, a) {
  return document.activeElement === a || document.activeElement === e;
}
function jr(e) {
  return document.activeElement === e || !e.contains(document.activeElement);
}
function Dr(e, a, n, r) {
  return e.shiftKey ? Or(a, n) ? r : void 0 : document.activeElement === r || jr(a) ? n : void 0;
}
function Hr(e, a, n) {
  const r = n[0], l = n[n.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Dr(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Fr(e) {
  return { onKeyDown: Q(
    (n) => {
      if (n.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(qr));
      Hr(n, e.current, r);
    },
    [e]
  ) };
}
function uR(e, a = !0) {
  C(() => {
    if (!a) return;
    const n = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? n) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const pt = { ArrowUp: -1, ArrowDown: 1 }, gt = { ArrowLeft: -1, ArrowRight: 1 }, Wr = (e, a, n) => Math.min(n, Math.max(a, e));
function zr(e, a) {
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
  const i = Q((u) => n(u), []), s = Q((u) => {
    var h;
    n(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = Q(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const w = Math.max(0, h.indexOf(a)), f = zr(u.key, e);
      f !== void 0 ? (u.preventDefault(), s(h[Wr(w + f, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), d = Q(
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
const hR = (e, a, n) => {
  const r = new EventSource(e), l = (i) => n.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => n.onOpen(), r.onerror = () => n.onError(), { close: () => r.close() };
}, mR = "0.2.0", wR = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "owed", "stream"], Kr = [1, 2, 3, 4, 5, 6], tn = [1, 2, 3], Gr = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], fR = [{ name: "green", label: "Trellis green" }, { name: "blue", label: "Blue" }, { name: "violet", label: "Violet" }, { name: "orange", label: "Orange" }, { name: "rose", label: "Rose" }], _R = [{ name: "comfortable", label: "Comfortable" }, { name: "compact", label: "Compact" }], z = {
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
  return Kr.includes(e);
}
function ca(e) {
  return tn.includes(e);
}
function Ur(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function vR(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Vr = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Yr(e) {
  if (!Ia(e)) throw new Error("unvalidated stream step");
  return Vr[e];
}
function yt(e) {
  return typeof e != "string" ? null : Gr.includes(e) ? e : null;
}
function Jr(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Xr(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Qr(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Zr(e, a, n) {
  const r = Jr(e);
  if (r === null) return null;
  const l = yt(n) ?? yt(r.type);
  return l === null ? null : { ...r, type: l, id: Xr(r, a), at: Qr(r) };
}
function el(e, a) {
  return e >= fe.staleAfter ? "stale" : e >= fe.heartbeat && a === "live" ? "reconnecting" : null;
}
function al(e, a, n) {
  return e >= fe.heartbeat && !a && n !== null;
}
function bR(e, a) {
  const [n, r] = p("reconnecting"), [l, i] = p(null), s = _(/* @__PURE__ */ new Map()), c = _(0), d = _(""), u = _(0), h = _(null), w = _(0), f = _(0), y = _(!1), E = _("reconnecting"), P = Q((T) => {
    E.current = T, r(T);
  }, []), te = Q(() => {
    c.current = Date.now();
  }, []), Ne = Q((T) => {
    for (const [U, ke] of s.current)
      (ke === "*" || T.itemKey === ke) && U(T);
  }, []), ne = Q(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (T, U, ke) => {
        const Fe = Zr(T, U, ke);
        Fe !== null && (Fe.id && (d.current = Fe.id), te(), y.current = !1, P("live"), i(Fe.at), Ne(Fe));
      },
      onOpen: () => {
        u.current = 0, y.current = !1, te(), P("live");
      },
      onError: () => {
        var U;
        (U = h.current) == null || U.close(), h.current = null, y.current = !0, E.current !== "stale" && P("reconnecting");
        const T = Math.min(fe.reconnectBase * 2 ** u.current, fe.reconnectMax);
        u.current += 1, w.current = window.setTimeout(ne, T);
      }
    });
  }, [Ne, P, te, a, e]), Ee = Q((T) => {
    y.current = !0, T.close(), h.current = null, w.current = window.setTimeout(ne, fe.reconnectBase);
  }, [ne]), Ve = Q((T, U) => (s.current.set(U, T), () => {
    s.current.delete(U);
  }), []);
  return C(() => (ne(), f.current = window.setInterval(() => {
    const T = Date.now() - c.current, U = el(T, E.current);
    U && P(U);
    const ke = h.current;
    al(T, y.current, ke) && Ee(ke);
  }, fe.tick), () => {
    var T;
    window.clearInterval(f.current), window.clearTimeout(w.current), y.current = !1, (T = h.current) == null || T.close(), h.current = null;
  }), [ne, Ee, P]), { connection: n, lastEventAt: l, subscribe: Ve };
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
const tl = { blue: "running", orange: "waiting", green: "done" };
function nl() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Nt(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ba(e, a) {
  const n = _(0), r = Q((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (nl() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${tl[i]})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => Nt(s), { once: !0 }), window.clearTimeout(n.current), n.current = window.setTimeout(() => Nt(s), fe.flash)));
  }, [a, e]);
  return C(() => () => window.clearTimeout(n.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const rl = "_root_1otpc_2", ll = {
  root: rl
};
function ol(e, a, n, r, l) {
  const i = [tt(a)];
  return e || i.push(`as of ${Er(n)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function Le({ startedAt: e, lastEvent: a, connection: n, turn: r }) {
  const l = n !== "stale", i = rt(e, l), s = (a == null ? void 0 : a.at) ?? e, c = ol(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${ll.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ue(e)
    ] })
  ] });
}
const il = "_app_1bnco_1", sl = "_side_1bnco_35", cl = "_sideTop_1bnco_46", dl = "_sideBody_1bnco_60", ul = "_iconRail_1bnco_99", hl = "_railItem_1bnco_108", ml = "_railIcon_1bnco_129", wl = "_railDot_1bnco_134", fl = "_railLetter_1bnco_140", _l = "_main_1bnco_146", vl = "_rail_1bnco_108", bl = "_page_1bnco_168", pl = "_headerRow_1bnco_191", gl = "_sidebarToggle_1bnco_198", yl = "_headerSlot_1bnco_203", Nl = "_headerAction_1bnco_208", kl = "_drawerSide_1bnco_213", $l = "_root_1bnco_260", Cl = "_topbar_1bnco_267", Sl = "_mark_1bnco_278", Rl = "_brand_1bnco_285", Tl = "_tagline_1bnco_291", xl = "_identity_1bnco_297", Ll = "_tools_1bnco_298", Al = "_nav_1bnco_308", El = "_metadata_1bnco_315", Il = "_actor_1bnco_330", Ml = "_detail_1bnco_331", Bl = "_content_1bnco_376", Pl = "_toolsPanel_1bnco_392", ql = "_skip_1bnco_418", $ = {
  app: il,
  side: sl,
  sideTop: cl,
  sideBody: dl,
  iconRail: ul,
  railItem: hl,
  railIcon: ml,
  railDot: wl,
  railLetter: fl,
  main: _l,
  rail: vl,
  page: bl,
  headerRow: pl,
  sidebarToggle: gl,
  headerSlot: yl,
  headerAction: Nl,
  drawerSide: kl,
  root: $l,
  topbar: Cl,
  mark: Sl,
  brand: Rl,
  tagline: Tl,
  identity: xl,
  tools: Ll,
  nav: Al,
  metadata: El,
  actor: Il,
  detail: Ml,
  content: Bl,
  toolsPanel: Pl,
  skip: ql
};
function da(...e) {
  const a = e.filter((n) => n !== void 0 && n !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Ol = "_scope_1an6i_2", jl = {
  scope: Ol
}, nn = ye(null);
function pR({ reason: e, actions: a = "disable", children: n }) {
  const r = N();
  return /* @__PURE__ */ o("fieldset", { disabled: !0, className: `${jl.scope} ward-disabled-scope`, children: [
    /* @__PURE__ */ t("span", { id: r, className: "ward-visually-hidden", children: e }),
    /* @__PURE__ */ t(nn.Provider, { value: { reason: e, reasonId: r, actions: a }, children: n })
  ] });
}
function Ae() {
  return ge(nn);
}
function Ma(e, a) {
  return !a || (e ?? "").split(" ").includes(a.reasonId) ? e : da(e, a.reasonId);
}
const Dl = "_btn_tzr89_2", Hl = "_primary_tzr89_14", Fl = "_destructive_tzr89_25", Wl = "_secondary_tzr89_35", zl = "_ghost_tzr89_40", Kl = "_overflow_tzr89_49", Gl = "_sm_tzr89_56", Ul = "_disabled_tzr89_60", ma = {
  btn: Dl,
  primary: Hl,
  destructive: Fl,
  secondary: Wl,
  ghost: zl,
  overflow: Kl,
  sm: Gl,
  disabled: Ul
};
function Vl(e, a, n, r) {
  const l = a === "sm" ? [ma.sm, "ward-btn--sm"] : [], i = n ? [ma.disabled] : [];
  return [ma.btn, ma[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Yl(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Jl(e, a) {
  if (e.disabled && !a && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Xl(e, a) {
  return a ? a.reason : e.disabled ? e.disabledReason : void 0;
}
function Ql(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Zl(e, a, n) {
  return Ql(e.describedBy, a && n);
}
function eo({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ t("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function ao(e) {
  return e.children ?? e.label;
}
function b(e) {
  var a;
  return ((a = Ae()) == null ? void 0 : a.actions) === "hide" ? null : /* @__PURE__ */ t(to, { ...e });
}
function to(e) {
  const a = Ae();
  Jl(e, a);
  const n = e.variant ?? "secondary", r = e.size ?? "md", l = !!(e.disabled || a), i = Xl(e, a), s = N();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: e.type ?? "button",
        className: Vl(n, r, l, e.className),
        "data-ward-btn": n,
        "data-ward-size": r,
        disabled: l,
        title: i,
        "aria-describedby": Zl(e, i, s),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Yl(n, e.controls),
        children: ao(e)
      }
    ),
    /* @__PURE__ */ t(eo, { id: s, reason: i })
  ] });
}
let lt = "none";
function no(e) {
  !e.metaKey && !e.ctrlKey && !e.altKey && (lt = "key");
}
typeof document < "u" && (document.addEventListener("keydown", no, !0), document.addEventListener("pointerdown", () => {
  lt = "pointer";
}, !0));
function ro() {
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
const lo = "_scrim_1cawq_2", oo = "_drawer_1cawq_10", io = "_sheet_1cawq_14", so = "_modal_1cawq_18", co = "_panel_1cawq_23", uo = "_start_1cawq_44", ho = "_header_1cawq_67", mo = "_title_1cawq_75", wo = "_body_1cawq_79", fo = "_close_1cawq_106", Te = {
  scrim: lo,
  drawer: oo,
  sheet: io,
  modal: so,
  panel: co,
  start: uo,
  header: ho,
  title: mo,
  body: wo,
  close: fo
}, _o = ye(null), ka = [], $a = /* @__PURE__ */ new Map();
function vo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function bo(e, a) {
  let n = $a.get(a);
  n || (n = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, $a.set(a, n)), !n.owners.has(e) && (n.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function po(e, a, n) {
  for (const r of Array.from(a.children))
    r !== n && !vo(r) && bo(e, r);
}
function go(e, a) {
  let n = null, r = a;
  for (; r; ) {
    if (po(e, r, n), r === document.body) return;
    n = r, r = r.parentElement;
  }
}
function yo(e) {
  for (const a of e.claims) {
    const n = $a.get(a);
    n && (n.owners.delete(e), !(n.owners.size > 0) && (n.wasInert || a.removeAttribute("inert"), $a.delete(a)));
  }
}
function No(e, a) {
  const n = { root: e, claims: [] };
  return ka.push(n), go(n, a), n;
}
function ko(e) {
  const a = ka.indexOf(e);
  a >= 0 && ka.splice(a, 1), yo(e);
}
function kt(e) {
  return e !== null && ka.at(-1) === e;
}
function $o(e, a, n) {
  const r = _(null), l = _(n);
  return l.current = n, C(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = No(i, a);
    return r.current = c, () => {
      var u, h;
      const d = kt(c);
      ko(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), Q(() => kt(r.current), []);
}
function Co(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function So(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ro({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ t("div", { className: `${Te.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("header", { className: `${Te.header} ward-drawer-head`, children: /* @__PURE__ */ t("h2", { className: `${Te.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ t("div", { className: `${Te.body} ward-drawer-body`, "data-flush": e.flush || void 0, children: e.children })
  ] });
}
function To(e) {
  return `${Te.scrim} ${Te[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function xo(e, a) {
  const n = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Te.panel} ${Te[e]} ward-overlay-panel${n}${r}`;
}
function Lo(e) {
  const a = ge(_o);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = _(null), n = _(null), r = N(), l = Lo(e.container), i = ia("(min-width: 768px)"), s = Co(e.kind, i), c = So(e, r), d = Fr(n), [u] = p(ro), h = $o(a, l, e.returnFocusTo), w = Q(() => {
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
  }, [w]), xr(
    /* @__PURE__ */ t(
      "div",
      {
        ref: a,
        className: To(s),
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
            className: xo(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => h() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ t("button", { type: "button", className: `${Te.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: w, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ t(Ro, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ao = /^([a-z][a-z0-9+.-]*):/i, Eo = /* @__PURE__ */ new Set(["http", "https"]), Io = "#";
function Mo(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let n = 0;
  for (; n < a.length && a.charCodeAt(n) <= 32; ) n += 1;
  return (l = (r = Ao.exec(a.slice(n))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function H(e) {
  const a = Mo(e);
  return a === void 0 || Eo.has(a) ? e : Io;
}
function Bo(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function rn(e) {
  const a = Bo(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Po(e, a) {
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
function qo(e, a) {
  const n = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < n ? e.scrollLeft + r - n : l > e.clientWidth - n ? e.scrollLeft + l - e.clientWidth + n : null;
}
function ln(e, a, n) {
  aa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(n)[a];
    if (!r || !l) return;
    const i = qo(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), rn(r);
  }, [e, a, n]);
}
const Oo = "_row_160e9_2", jo = {
  row: Oo
};
function Do(e, a) {
  return e ? { role: a === "nav" ? void 0 : "region", tabIndex: 0 } : {};
}
function Ba({ label: e, children: a, count: n, as: r = "div", focusable: l = !0, rowRef: i, className: s, ...c }) {
  const d = _(null), u = i ?? d;
  return Po(u, n), /* @__PURE__ */ t(r, { ref: u, className: [jo.row, s].filter(Boolean).join(" "), "aria-label": e, "data-ward-overflow-row": "", ...Do(l, r), ...c, children: a });
}
const Ho = "_icon_1ylqy_2", Fo = {
  icon: Ho
};
function ua({ children: e }) {
  return /* @__PURE__ */ t("svg", { className: Fo.icon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: e });
}
function gR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" }) });
}
function yR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "5", height: "16", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "10", y: "4", width: "5", height: "11", rx: "1" }),
    /* @__PURE__ */ t("rect", { x: "17", y: "4", width: "4", height: "7", rx: "1" })
  ] });
}
function NR() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "3" }),
    /* @__PURE__ */ t("path", { d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" })
  ] });
}
function kR() {
  return /* @__PURE__ */ t(ua, { children: /* @__PURE__ */ t("path", { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" }) });
}
function Wo() {
  return /* @__PURE__ */ o(ua, { children: [
    /* @__PURE__ */ t("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ t("path", { d: "M9 4v16" })
  ] });
}
const on = "ward:sidebar-collapsed", zo = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
function Ko() {
  try {
    return window.localStorage.getItem(on) === "true";
  } catch {
    return !1;
  }
}
function Go(e) {
  try {
    window.localStorage.setItem(on, String(e));
  } catch {
  }
}
function Uo(e) {
  return e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function Vo(e) {
  return e instanceof Element && e.closest(zo) !== null;
}
function Yo(e) {
  return e.key === "[" && !Uo(e) && !Vo(e.target);
}
function Jo(e) {
  const [a, n] = p(Ko), r = () => {
    Go(!a), n(!a);
  };
  return C(() => {
    if (!e) return;
    const l = (i) => {
      var c;
      if (!Yo(i)) return;
      const s = i.target instanceof Element ? i.target.closest("[data-ward-shell-side]") : null;
      (c = s == null ? void 0 : s.querySelector("button")) == null || c.focus(), r();
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [e, a]), { collapsed: a, toggle: r };
}
function Xo() {
  const e = ia("(max-width: 767.98px)"), a = ia("(max-width: 1023.98px)");
  return e ? "phone" : a ? "medium" : "wide";
}
function Qo(e) {
  const a = e === "phone", n = N(), r = _(null), [l, i] = p(!1);
  return l && !a && i(!1), { narrow: a, open: l, drawerId: n, slotRef: r, toggle: () => i(!l), close: () => i(!1) };
}
function Zo({ header: e, action: a, label: n, drawer: r }) {
  return r.narrow ? /* @__PURE__ */ o("div", { className: $.headerRow, children: [
    /* @__PURE__ */ t("span", { ref: r.slotRef, className: $.sidebarToggle, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.toggle, expanded: r.open, controls: r.drawerId, children: n }) }),
    /* @__PURE__ */ t("div", { className: $.headerSlot, children: e }),
    un(a) && /* @__PURE__ */ t("span", { className: $.headerAction, children: a })
  ] }) : e;
}
function ei(e, a) {
  C(() => {
    if (e)
      return window.addEventListener("hashchange", a), window.addEventListener("popstate", a), () => {
        window.removeEventListener("hashchange", a), window.removeEventListener("popstate", a);
      };
  }, [e, a]);
}
function ai({ sidebar: e, label: a, drawer: n }) {
  var l;
  if (ei(n.open, n.close), !n.open) return null;
  const r = (i) => {
    i.target.closest("a[href]") && n.close();
  };
  return /* @__PURE__ */ t(na, { kind: "start", id: n.drawerId, title: a, flush: !0, onClose: n.close, returnFocusTo: (l = n.slotRef.current) == null ? void 0 : l.querySelector("button"), children: /* @__PURE__ */ t("div", { className: $.drawerSide, onClick: r, children: sn(e, !1) }) });
}
function ti(e) {
  const [a, n] = p(!1);
  return a && e !== "medium" && n(!1), { open: a, toggle: () => n(!a) };
}
function ni(e, a) {
  const n = Jo(e === "wide" && !a), r = ti(e);
  return e === "medium" ? { collapsed: !r.open, toggle: r.toggle } : { collapsed: e === "wide" && n.collapsed, toggle: n.toggle };
}
function ri(e, a) {
  const n = ni(a, e.collapsed !== void 0);
  if (e.collapsed !== void 0) return oi(e.collapsed, a);
  const r = n.collapsed, l = r && e.iconRail !== void 0;
  return { enabled: a !== "phone", collapsed: r, rail: l, drawsStrip: !l && typeof e.sidebar == "function", toggle: n.toggle };
}
const li = (e) => e.collapsed && e.drawsStrip;
function oi(e, a) {
  return { enabled: !1, collapsed: a === "medium" || e && a === "wide", rail: !1, drawsStrip: !0, toggle: () => {
  } };
}
const $t = (e) => e ? "" : void 0;
function sn(e, a) {
  return typeof e == "function" ? e(a) : e;
}
function cn({ fold: e }) {
  return /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: e.toggle, expanded: !e.collapsed, children: [
    /* @__PURE__ */ t(Wo, {}),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e.collapsed ? "Expand sidebar" : "Collapse sidebar" })
  ] });
}
function ii({ fold: e, inSidebar: a }) {
  return !e.enabled || a ? null : /* @__PURE__ */ t("div", { className: $.sideTop, children: /* @__PURE__ */ t(cn, { fold: e }) });
}
const dn = ye(null);
function $R() {
  const e = ge(dn);
  return e === null || !e.enabled ? null : /* @__PURE__ */ t(cn, { fold: e });
}
function si({ item: e }) {
  return e.icon !== void 0 ? /* @__PURE__ */ t("span", { className: $.railIcon, "aria-hidden": "true", children: e.icon }) : e.streamStep !== void 0 ? /* @__PURE__ */ t("span", { className: $.railDot, "aria-hidden": "true", style: { "--dot": nt(e.streamStep).id } }) : /* @__PURE__ */ t("span", { className: $.railLetter, "aria-hidden": "true", children: e.label.charAt(0) });
}
function ci({ items: e, label: a }) {
  return /* @__PURE__ */ t("nav", { className: $.iconRail, "aria-label": a, children: e.map((n) => /* @__PURE__ */ o("a", { className: $.railItem, href: H(n.href), title: n.label, "aria-current": n.current === !0 ? "page" : void 0, children: [
    /* @__PURE__ */ t(si, { item: n }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n.label })
  ] }, n.id)) });
}
function di({ sidebar: e, label: a, iconRail: n, fold: r, inSidebar: l }) {
  const i = r.collapsed && !r.drawsStrip;
  return /* @__PURE__ */ o("div", { className: $.side, "data-ward-shell-side": "", children: [
    /* @__PURE__ */ t(ii, { fold: r, inSidebar: l && !i }),
    /* @__PURE__ */ t("div", { className: $.sideBody, hidden: i, children: sn(e, r.collapsed) }),
    r.rail && /* @__PURE__ */ t(ci, { items: n ?? [], label: a })
  ] });
}
const un = (e) => e != null;
function ui(e) {
  const { sidebar: a, header: n, action: r, children: l, rail: i, iconRail: s, pageFill: c } = e, d = un(i), u = Xo(), h = Qo(u), w = ri(e, u), f = e.sidebarLabel ?? "Menu";
  return /* @__PURE__ */ o("div", { className: $.app, "data-rail": String(d), "data-collapsed": String(w.collapsed), "data-consumer-fold": $t(li(w)), "data-band": u, children: [
    !h.narrow && /* @__PURE__ */ t(dn.Provider, { value: w, children: /* @__PURE__ */ t(di, { sidebar: a, label: f, iconRail: s, fold: w, inSidebar: e.foldButtonInSidebar === !0 }) }),
    /* @__PURE__ */ o("main", { className: $.main, "data-ward-shell-content": "", children: [
      /* @__PURE__ */ t(Zo, { header: n, action: r, label: f, drawer: h }),
      /* @__PURE__ */ t("div", { className: $.page, "data-fill": $t(c === !0), children: l })
    ] }),
    d && /* @__PURE__ */ t("div", { className: $.rail, children: i }),
    /* @__PURE__ */ t(ai, { sidebar: a, label: f, drawer: h })
  ] });
}
function hi({ destinations: e, active: a }) {
  const n = _(null);
  return ln(n, e.findIndex((r) => r.id === a), "a"), /* @__PURE__ */ t(Ba, { as: "nav", rowRef: n, className: $.nav, label: "Primary", count: e.length, focusable: !1, children: e.map((r) => /* @__PURE__ */ t("a", { href: H(r.href), "aria-current": r.id === a ? "page" : void 0, children: r.label }, r.id)) });
}
function Ya({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: a, children: e });
}
function mi({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: $.metadata, children: [
    /* @__PURE__ */ t(Ya, { value: e, className: $.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ t("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ t(Ya, { value: a, className: $.detail })
  ] });
}
function wi() {
  const e = ia("(max-width: 767.98px)"), a = N(), n = _(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: n, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = n.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function fi({ tools: e, toolsLabel: a, menu: n }) {
  return e === void 0 ? null : n.narrow ? /* @__PURE__ */ t("span", { ref: n.slotRef, className: $.tools, children: /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n.toggle, expanded: n.open, controls: n.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ t("span", { className: $.tools, children: e });
}
function _i({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const n = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: $.toolsPanel, hidden: !a.open, onKeyDown: n, children: e });
}
function vi(e) {
  return /* @__PURE__ */ o("header", { className: $.topbar, children: [
    /* @__PURE__ */ t("span", { className: $.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: $.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ t(Ya, { value: e.tagline, className: $.tagline }),
    /* @__PURE__ */ t(hi, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ t("span", { className: $.identity, children: /* @__PURE__ */ t(mi, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ t(fi, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function bi(e) {
  const a = N(), n = wi();
  return /* @__PURE__ */ o("div", { className: `${$.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ t("a", { className: $.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ t(vi, { ...e, menu: n }),
    /* @__PURE__ */ t(_i, { tools: e.tools, menu: n }),
    /* @__PURE__ */ t("div", { id: a, className: $.content, children: e.children })
  ] });
}
function pi(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function CR(e) {
  return pi(e) ? /* @__PURE__ */ t(ui, { ...e }) : /* @__PURE__ */ t(bi, { ...e });
}
const gi = "_root_itg9o_2", yi = "_row_itg9o_8", Ni = "_box_itg9o_14", ki = "_label_itg9o_21", $i = "_labelHidden_itg9o_26", Ci = "_lockedNote_itg9o_36", Si = "_consequence_itg9o_44", Ri = "_sample_itg9o_79", Be = {
  root: gi,
  row: yi,
  box: Ni,
  label: ki,
  labelHidden: $i,
  lockedNote: Ci,
  consequence: Si,
  sample: Ri
};
function Ti(e, a) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: !!(e.disabled || a) };
}
function xi({ id: e, text: a }) {
  return a ? /* @__PURE__ */ t("p", { id: e, className: `${Be.consequence} ward-check-consequence`, children: a }) : null;
}
function Li({ locked: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${Be.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Ai({ text: e }) {
  return e ? /* @__PURE__ */ t("span", { className: Be.sample, "aria-hidden": "true", children: e }) : null;
}
function hn(e) {
  const a = N(), n = e.consequence ? `${a}-note` : void 0, r = Ae(), l = Ti(e, r);
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
        /* @__PURE__ */ t(Li, { locked: e.locked })
      ] }),
      /* @__PURE__ */ t(Ai, { text: e.sample })
    ] }),
    /* @__PURE__ */ t(xi, { id: n, text: e.consequence })
  ] });
}
const Ei = "_chip_pq6tb_2", Ii = {
  chip: Ei
}, Mi = {
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
function Bi(e, a) {
  if (e === "stream") return Pi(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const n = Mi[e];
  return { "--ward-chip-bg": n.bg, "--ward-chip-fg": n.fg, "--ward-chip-line": n.line };
}
function Pi(e) {
  if (!e || !ca(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = nt(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: n, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ t("span", { className: `${Ii.chip} ward-chip ward-chip--${e}`, style: Bi(e, n), "data-ward-chip": e, "data-size": r, children: a });
}
const qi = "_clamp_zn74g_3", Ct = {
  clamp: qi
};
function ta({ text: e, as: a = "span", className: n }) {
  return /* @__PURE__ */ t(a, { className: n === void 0 ? Ct.clamp : `${Ct.clamp} ${n}`, "data-ward-clamp": "", title: e, children: e });
}
function ha(e) {
  return typeof e == "number" && ca(e) ? e : null;
}
function pe(e, a) {
  const n = ha(e);
  return n === null ? "var(--ward-color-line2)" : `var(--ward-stream-${n}-${a})`;
}
function Pa(e, a) {
  const n = ha(a);
  return n === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: n };
}
const Oi = "_root_13eei_3", ji = "_nav_13eei_8", Di = "_list_13eei_16", Hi = "_item_13eei_24", Fi = "_link_13eei_44", Wi = "_sep_13eei_54", zi = "_current_13eei_58", Ki = "_chips_13eei_62", Me = {
  root: Oi,
  nav: ji,
  list: Di,
  item: Hi,
  link: Fi,
  sep: Wi,
  current: zi,
  chips: Ki
};
function Gi({ step: e, isCurrent: a }) {
  return a ? /* @__PURE__ */ t("span", { className: Me.current, "aria-current": "page", title: e.label, children: e.label }) : e.href ? /* @__PURE__ */ t("a", { className: `${Me.link} ward-target`, href: H(e.href), title: e.label, children: e.label }) : /* @__PURE__ */ t("span", { title: e.label, children: e.label });
}
function Ui({ path: e, chips: a, current: n = !0 }) {
  return /* @__PURE__ */ t("div", { className: Me.root, children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Me.nav, children: [
    /* @__PURE__ */ t("ol", { className: Me.list, children: e.map((r, l) => /* @__PURE__ */ o("li", { className: Me.item, children: [
      l > 0 ? /* @__PURE__ */ t("span", { className: Me.sep, "aria-hidden": "true", children: "›" }) : null,
      /* @__PURE__ */ t(Gi, { step: r, isCurrent: n && l === e.length - 1 })
    ] }, r.label)) }),
    a != null && a.length ? /* @__PURE__ */ t("span", { className: `${Me.chips} ward-chiprow`, children: a.map((r) => /* @__PURE__ */ t(m, { ...r }, r.label)) }) : null
  ] }) });
}
function mn(e, a, n) {
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
const Vi = 500;
function wn(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
}
function fn() {
  const e = _(""), a = _(void 0);
  return C(() => () => clearTimeout(a.current), []), (n) => (clearTimeout(a.current), e.current += n.toLowerCase(), a.current = setTimeout(() => {
    e.current = "";
  }, Vi), e.current);
}
const wa = 4;
function Yi(e, a, n) {
  const r = Math.max(0, n - e.bottom - wa * 2), l = Math.max(0, e.top - wa * 2);
  return a <= r || r >= l ? { top: e.bottom + wa, maxHeight: r } : { top: e.top - wa - Math.min(a, l), maxHeight: l };
}
function Ji(e, a, n, r) {
  const l = { start: e.left, end: e.right - a }, i = { start: l.start + a <= n, end: l.end >= 0 }, s = r === "end" ? "start" : "end", c = i[r] || !i[s] ? r : s;
  return Math.min(Math.max(l[c], 0), Math.max(0, n - a));
}
function Xi(e, a, n, r) {
  return { ...Yi(e, a.height, n.height), left: Ji(e, a.width, n.width, r) };
}
function pa(e) {
  return `${Math.round(e * 100) / 100}px`;
}
function Qi(e, a) {
  const n = a.getBoundingClientRect();
  e.style.setProperty("--ward-anchor-width", pa(n.width)), Object.assign(e.style, { left: "0px", top: "0px", maxHeight: "none" });
  const r = e.getBoundingClientRect(), l = document.documentElement;
  return { edges: n, box: r, view: { width: l.clientWidth, height: l.clientHeight } };
}
function Zi(e) {
  const a = [e, ...e.querySelectorAll("*")].filter((r) => r.scrollTop > 0), n = a.map((r) => r.scrollTop);
  return () => a.forEach((r, l) => r.scrollTop = n[l]);
}
function St(e, a, n) {
  const r = Zi(e), l = Qi(e, a), i = Xi(l.edges, l.box, l.view, n);
  Object.assign(e.style, { left: pa(i.left - l.box.left), top: pa(i.top - l.box.top), maxHeight: pa(i.maxHeight) }), r();
}
function es(e) {
  return typeof e.showPopover != "function" || e.matches(":popover-open") ? () => {
  } : (e.popover = "manual", e.showPopover(), () => {
    e.matches(":popover-open") && e.hidePopover();
  });
}
function _n(e, a, n = "start") {
  aa(() => {
    const r = a.current, l = e.current;
    if (!r || !l) return;
    const i = es(r), s = () => St(r, l, n), c = (d) => {
      r.contains(d.target) || s();
    };
    return window.addEventListener("scroll", c, !0), window.addEventListener("resize", s), () => {
      window.removeEventListener("scroll", c, !0), window.removeEventListener("resize", s), i();
    };
  }, [e, a, n]), aa(() => {
    a.current && e.current && St(a.current, e.current, n);
  });
}
const as = "_root_1lgbn_2", ts = "_trigger_1lgbn_7", ns = "_value_1lgbn_47", rs = "_menu_1lgbn_65", ls = "_find_1lgbn_87", os = "_list_1lgbn_103", is = "_option_1lgbn_114", ss = "_check_1lgbn_133", cs = "_empty_1lgbn_144", _e = {
  root: as,
  trigger: ts,
  value: ns,
  menu: rs,
  find: ls,
  list: os,
  option: is,
  check: ss,
  empty: cs
}, ds = 7;
function us(e, a) {
  const n = a.trim().toLowerCase();
  return e.map((r, l) => ({ option: r, index: l })).filter(({ option: r }) => r.label.toLowerCase().includes(n));
}
function Rt(e, a) {
  return Math.max(0, e.findIndex((n) => n.value === a));
}
function hs(e, a) {
  const [n, r] = p(e.defaultOpen === !0), [l, i] = p(""), [s, c] = p(() => Rt(e.options, e.value)), d = (u) => {
    var h;
    Zt(() => r(!1)), u && ((h = a.current) == null || h.focus());
  };
  return {
    open: n,
    query: l,
    active: s,
    entries: us(e.options, l),
    findable: e.options.length > ds,
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
function ms(e, a) {
  const n = _(!1);
  return C(() => {
    var r;
    e && n.current && ((r = a.current) == null || r.focus()), n.current = !1;
  }), () => {
    n.current = !0;
  };
}
function ws(e) {
  const a = fn();
  return (n) => {
    const r = a(n), l = e.entries.findIndex((i) => i.option.label.toLowerCase().startsWith(r));
    l >= 0 && e.to(l);
  };
}
function vn(e) {
  const a = Math.max(0, e.entries.length - 1);
  return {
    ArrowDown: () => e.to(Math.min(e.active + 1, a)),
    ArrowUp: () => e.to(Math.max(e.active - 1, 0)),
    Enter: () => e.pick(e.entries[e.active]),
    Escape: () => e.close(!0)
  };
}
function fs(e) {
  return { ...vn(e), Home: () => e.to(0), End: () => e.to(Math.max(0, e.entries.length - 1)) };
}
function bn(e, a, n) {
  return (r) => {
    if (r.key === "Tab") return e.close(!0);
    const l = a[r.key];
    if (!l) return n(r);
    r.preventDefault(), r.stopPropagation(), l();
  };
}
const _s = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "Enter", " "]);
function vs(e, a) {
  const n = () => {
    a(), e.show();
  };
  return {
    onClick: () => e.open ? e.close(!1) : n(),
    onKeyDown: (r) => {
      _s.has(r.key) && (r.preventDefault(), n());
    }
  };
}
function bs({ entry: e, at: a, menu: n, ids: r, value: l }) {
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
function ps({ menu: e, ids: a, focusRef: n }) {
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
      onKeyDown: bn(e, vn(e), () => {
      })
    }
  );
}
function gs({ props: e, menu: a, ids: n, focusRef: r, trigger: l }) {
  const i = ws(a), s = _(null);
  _n(l, s);
  const c = (d) => {
    wn(d) && i(d.key);
  };
  return /* @__PURE__ */ o("div", { ref: s, className: _e.menu, children: [
    a.findable && /* @__PURE__ */ t(ps, { menu: a, ids: n, focusRef: r }),
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
        onKeyDown: bn(a, fs(a), c),
        children: a.entries.map((d, u) => /* @__PURE__ */ t(bs, { entry: d, at: u, menu: a, ids: n, value: e.value }, d.index))
      }
    ),
    a.entries.length === 0 && /* @__PURE__ */ t("p", { className: _e.empty, children: "No match" })
  ] });
}
function ys(e, a) {
  const n = e.open ? ot(e, a) : void 0;
  C(() => {
    var r, l;
    n && ((l = (r = document.getElementById(n)) == null ? void 0 : r.scrollIntoView) == null || l.call(r, { block: "nearest" }));
  }, [n]);
}
function pn(...e) {
  return e.filter(Boolean).join(" ");
}
function Ns(e) {
  var a;
  return ((a = e.options.find((n) => n.value === e.value)) == null ? void 0 : a.label) ?? e.placeholder;
}
function ks({ props: e, menu: a, ids: n, trigger: r, wantFocus: l }) {
  var c;
  const i = !e.options.some((d) => d.value === e.value), s = (c = Ae()) == null ? void 0 : c.reason;
  return /* @__PURE__ */ t(
    "button",
    {
      ref: r,
      type: "button",
      id: e.id,
      className: pn(_e.trigger, e.triggerClassName),
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
      ...vs(a, l),
      children: /* @__PURE__ */ t("span", { id: n.value, className: _e.value, "data-placeholder": i || void 0, children: Ns(e) })
    }
  );
}
function gn(e) {
  const a = Ae(), n = a ? { ...e, disabled: !0, "aria-describedby": Ma(e["aria-describedby"], a) } : e, r = N(), l = { list: `${r}-list`, value: `${r}-value`, option: (h) => `${r}-option-${h}` }, i = _(null), s = _(null), c = _(null), d = hs(n, s), u = ms(d.open, c);
  return mn(d.open, i, () => d.close(!1)), ys(d, l), /* @__PURE__ */ o("div", { ref: i, className: pn(_e.root, n.className), "data-ward-select": "", children: [
    /* @__PURE__ */ t(ks, { props: n, menu: d, ids: l, trigger: s, wantFocus: u }),
    n.name && /* @__PURE__ */ t("input", { type: "hidden", name: n.name, value: n.value }),
    d.open && /* @__PURE__ */ t(gs, { props: n, menu: d, ids: l, focusRef: c, trigger: s })
  ] });
}
const $s = "_field_1ensj_2", Cs = "_label_1ensj_8", Ss = "_labelHidden_1ensj_15", Rs = "_control_1ensj_25", Ts = "_mono_1ensj_45", xs = "_area_1ensj_50", Ls = "_invalid_1ensj_57", je = {
  field: $s,
  label: Cs,
  labelHidden: Ss,
  control: Rs,
  mono: Ts,
  area: xs,
  invalid: Ls
}, As = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
}, yn = (e) => `${e}-label`;
function Es({ props: e, controlProps: a, cls: n }) {
  const r = e.secret ? As : {};
  return /* @__PURE__ */ t("input", { className: n, ...r, ...a });
}
function Is({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t(
    gn,
    {
      id: a.id,
      triggerClassName: n,
      "aria-labelledby": yn(a.id),
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
function Ms({ props: e, controlProps: a, cls: n }) {
  return /* @__PURE__ */ t("textarea", { className: n, rows: e.rows ?? 3, ...a });
}
const Bs = { input: Es, select: Is, textarea: Ms };
function Ps(e, a, n) {
  const r = Bs[e.kind ?? "input"];
  return /* @__PURE__ */ t(r, { props: e, controlProps: a, cls: n });
}
function qs(e, a, n, r) {
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
function Os(e) {
  const a = e.mono ? [je.mono, "ward-field-input--mono"] : [], n = e.kind === "textarea" ? [je.area] : [];
  return [je.control, "ward-field-input", ...a, ...n].filter(Boolean).join(" ");
}
function js(e) {
  return e ? `${je.label} ${je.labelHidden} ward-field-label` : `${je.label} ward-field-label`;
}
function M(e) {
  const a = N(), n = `${a}-msg`, r = qs(e, a, n, Ae()), l = Os(e);
  return /* @__PURE__ */ o("div", { className: `${je.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ t("label", { id: yn(a), className: js(e.labelHidden), htmlFor: a, children: e.label }),
    Ps(e, r, l),
    e.invalid && /* @__PURE__ */ t("p", { id: n, className: `${je.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Ds = "_root_1waw7_2", Hs = "_trigger_1waw7_9", Fs = "_panel_1waw7_33", Ws = "_menu_1waw7_53", zs = "_group_1waw7_58", Ks = "_heading_1waw7_63", Gs = "_item_1waw7_69", Us = "_description_1waw7_84", Vs = "_marked_1waw7_93", Ys = "_check_1waw7_98", Js = "_separator_1waw7_123", Xs = "_footer_1waw7_129", ee = {
  root: Ds,
  trigger: Hs,
  panel: Fs,
  menu: Ws,
  group: zs,
  heading: Ks,
  item: Gs,
  description: Us,
  marked: Vs,
  check: Ys,
  separator: Js,
  footer: Xs
}, Nn = ye(null);
function Qs(e, a) {
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
const Zs = /* @__PURE__ */ new Map([
  ["ArrowDown", "first"],
  ["Enter", "first"],
  [" ", "first"],
  ["ArrowUp", "last"]
]);
function ec(e) {
  return {
    onClick: () => e.open ? e.close(!1) : e.show("first"),
    onKeyDown: (a) => {
      const n = Zs.get(a.key);
      n && (a.preventDefault(), e.show(n));
    },
    onKeyUp: (a) => {
      a.key === " " && a.preventDefault();
    }
  };
}
function kn(...e) {
  return e.filter(Boolean).join(" ");
}
function ac(e, a = {}) {
  const { ref: n, className: r, ...l } = a;
  return { ...l, ref: (s) => {
    e.current = s, n == null || n(s);
  }, className: kn(ee.trigger, r) };
}
function tc(e) {
  const a = N(), n = { menuId: `${a}-menu`, buttonId: `${a}-button` }, r = _(null), l = _(null), i = Qs(e.defaultOpen === !0, l);
  return mn(i.open, r, () => i.close(!1)), /* @__PURE__ */ o("div", { ref: r, className: kn(ee.root, e.className), "data-ward-menu": "", children: [
    /* @__PURE__ */ t(
      "button",
      {
        ...ac(l, e.trigger),
        id: n.buttonId,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? n.menuId : void 0,
        "aria-label": e["aria-label"],
        disabled: e.disabled,
        ...ec(i),
        children: e.label
      }
    ),
    i.open && /* @__PURE__ */ t(Nn.Provider, { value: { ...n, popup: i, button: l }, children: e.children })
  ] });
}
function nc(e) {
  let a = 0;
  const n = (r) => ({ item: r, at: a++ });
  return e.map((r) => r === "separator" ? { kind: "separator" } : "items" in r ? { kind: "group", heading: r.heading, rows: r.items.map(n) } : { kind: "item", row: n(r) });
}
function rc(e) {
  return e.kind === "group" ? e.rows : e.kind === "item" ? [e.row] : [];
}
const $n = (e, a) => (e % a + a) % a;
function Ze(e, a, n) {
  for (let r = 1; r <= e.length; r++) {
    const l = $n(a + n * r, e.length);
    if (!e[l].disabled) return l;
  }
  return -1;
}
const lc = (e) => e.split("").every((a) => a === e[0]);
function oc(e, a, n) {
  const r = lc(n), l = r ? n[0] : n, i = r ? a : a - 1, s = (c) => !c.disabled && c.label.toLowerCase().startsWith(l);
  for (let c = 1; c <= e.length; c++) {
    const d = $n(i + c, e.length);
    if (s(e[d])) return d;
  }
  return -1;
}
function ic(e) {
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
function sc(e, a) {
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
function cc(e, a) {
  const n = _(!1), r = fn(), l = sc(e, a), i = (s) => {
    wn(s) && e.focus(oc(e.items, e.current(), r(s.key)));
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
function dc(e) {
  const a = e.findIndex((n) => n.current && !n.disabled);
  return a === -1 ? Ze(e, -1, 1) : a;
}
function uc(e, a) {
  const { start: n, request: r } = a, l = _(e);
  l.current = e, C(() => {
    const { items: i, focus: s } = l.current;
    n && s(n === "first" ? dc(i) : Ze(i, i.length, -1));
  }, [n, r]);
}
function hc({ row: e, nav: a, popup: n }) {
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
function mc(e, a) {
  if (!e.description) return { aria: {}, content: e.label };
  const n = { "aria-labelledby": a + "-label", "aria-describedby": a + "-description" }, r = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("span", { id: a + "-label", children: e.label }),
    /* @__PURE__ */ t("span", { id: a + "-description", className: ee.description, children: e.description })
  ] });
  return { aria: n, content: r };
}
function wc() {
  return /* @__PURE__ */ t("svg", { className: ee.check, viewBox: "0 0 16 16", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M3.5 8.5l3 3 6-7", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function fc(e, a, n) {
  return n ? { className: ee.item + " " + ee.marked, content: /* @__PURE__ */ o(R, { children: [
    e.current ? /* @__PURE__ */ t(wc, {}) : null,
    a
  ] }) } : { className: ee.item, content: a };
}
function Cn(e) {
  const { item: a, at: n } = e.row, r = mc(a, N()), l = fc(a, r.content, e.nav.items.some((s) => s.current)), i = {
    ref: (s) => {
      e.nav.refs.current[n] = s;
    },
    role: "menuitem",
    tabIndex: -1,
    className: l.className,
    "aria-current": a.current ? "true" : void 0,
    "aria-disabled": a.disabled ? "true" : void 0,
    ...r.aria,
    ...hc(e)
  };
  return a.href && !a.disabled ? /* @__PURE__ */ t("a", { href: H(a.href), ...i, children: l.content }) : /* @__PURE__ */ t("button", { type: "button", ...i, children: l.content });
}
function _c({ heading: e, rows: a, nav: n, popup: r }) {
  const l = N();
  return /* @__PURE__ */ o("div", { role: "group", "aria-labelledby": l, className: ee.group, children: [
    /* @__PURE__ */ t("div", { id: l, className: ee.heading, children: e }),
    a.map((i) => /* @__PURE__ */ t(Cn, { row: i, nav: n, popup: r }, i.at))
  ] });
}
function vc({ block: e, nav: a, popup: n }) {
  return e.kind === "separator" ? /* @__PURE__ */ t("div", { role: "separator", className: ee.separator }) : e.kind === "group" ? /* @__PURE__ */ t(_c, { heading: e.heading, rows: e.rows, nav: a, popup: n }) : /* @__PURE__ */ t(Cn, { row: e.row, nav: a, popup: n });
}
function bc() {
  const e = ge(Nn);
  if (!e) throw new Error("Menu: render it as the child of a MenuButton");
  return e;
}
function pc({ entries: e, footer: a, align: n = "start" }) {
  const { popup: r, menuId: l, buttonId: i, button: s } = bc(), c = _(null);
  _n(s, c, n);
  const d = nc(e), u = ic(d.flatMap(rc).map((w) => w.item)), h = cc(u, r);
  return uc(u, r), /* @__PURE__ */ o("div", { ref: c, className: ee.panel, children: [
    /* @__PURE__ */ t("div", { role: "menu", id: l, "aria-labelledby": i, className: ee.menu, ...h, children: d.map((w, f) => /* @__PURE__ */ t(vc, { block: w, nav: u, popup: r }, f)) }),
    a && /* @__PURE__ */ t("p", { className: ee.footer, children: a })
  ] });
}
function gc(e) {
  var n;
  return (((n = e.parentElement) == null ? void 0 : n.closest("[data-theme]")) ?? document).querySelector('[data-level="page"]') === e;
}
function Sn(e, a) {
  C(() => {
    const n = e.current;
    a === "page" && n && !gc(n) && console.error('Tabs: a page shows one page-level strip; give the other level="section".');
  }, [e, a]);
}
const yc = (e, a) => e.reduce((n, r) => n + r + a, -a);
function Nc({ room: e, widths: a, more: n, gap: r }, l) {
  const i = a.map((d, u) => u);
  if (yc(a, r) <= e) return i;
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
function kc(e) {
  const a = getComputedStyle(e), n = e.querySelector(":scope > [data-more-probe]");
  return {
    room: e.clientWidth - Fa(a.paddingInlineStart) - Fa(a.paddingInlineEnd),
    widths: Array.from(e.querySelectorAll(':scope > [role="tab"]'), Tt),
    more: n ? Tt(n) : 0,
    gap: Fa(a.columnGap)
  };
}
function $c(e, a) {
  if (typeof ResizeObserver > "u") return;
  const n = new ResizeObserver(a);
  return [e, ...e.children].forEach((r) => n.observe(r)), () => n.disconnect();
}
const Cc = (e, a) => JSON.stringify(e) === JSON.stringify(a);
function Sc(e, a, n) {
  const [r, l] = p(null);
  return aa(() => {
    const i = e.current;
    if (!i) return;
    const s = () => {
      const c = kc(i);
      l((d) => Cc(d, c) ? d : c);
    };
    return s(), $c(i, s);
  }, [e, n]), r && Nc(r, a);
}
const Rc = "_strip_jqyo6_2", Tc = "_fits_jqyo6_19", xc = "_probe_jqyo6_27", Lc = "_moreRoot_jqyo6_36", Ac = "_more_jqyo6_36", Ec = "_tab_jqyo6_55", Ic = "_count_jqyo6_91", ve = {
  strip: Rc,
  fits: Tc,
  probe: xc,
  moreRoot: Lc,
  more: Ac,
  tab: Ec,
  count: Ic
}, Rn = "More";
function Mc(e, a) {
  const n = e.findIndex((r) => r.id === a);
  return n < 0 ? 0 : n;
}
const Tn = (e) => e.count === void 0 ? e.label : `${e.label} · ${e.count}`;
function xn(e) {
  return `${ve.strip} ward-tabs ward-tabs--${e}`;
}
const Bc = { tabIndex: -1, "aria-hidden": !0, "data-overflow": "" };
function Pc({ tab: e, active: a, place: n, onChange: r }) {
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
        e.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
          " ",
          /* @__PURE__ */ t("span", { className: ve.count, children: `· ${e.count}` })
        ] })
      ]
    }
  );
}
function qc(e, a) {
  return (n) => {
    a(n), requestAnimationFrame(() => {
      var l;
      const r = Array.from(((l = e.current) == null ? void 0 : l.children) ?? []).find((i) => i.id === `tab-${n}`);
      r instanceof HTMLElement && r.focus();
    });
  };
}
function Oc({ tabs: e, trigger: a, onPick: n }) {
  return /* @__PURE__ */ t(tc, { label: Rn, className: ve.moreRoot, trigger: { ...a, role: "tab", "aria-selected": !1, className: ve.more }, children: /* @__PURE__ */ t(pc, { align: "end", entries: e.map((r) => ({ label: Tn(r), onSelect: () => n(r.id) })) }) });
}
function jc(e, a, n) {
  return !a || a.includes(n) ? e.itemProps(n) : Bc;
}
function SR({ tabs: e, active: a, onChange: n, label: r = "Tabs", level: l }) {
  const i = Ea({ orientation: "horizontal" }), s = Mc(e, a);
  C(() => i.setActive(s), [i.setActive, s]);
  const c = _(null);
  Sn(c, l);
  const d = Sc(c, s, e.map(Tn).join(`
`)), u = d ? e.filter((h, w) => !d.includes(w)) : [];
  return /* @__PURE__ */ o("div", { ref: c, className: `${xn(l)} ${ve.fits}`, role: "tablist", "aria-label": r, "data-level": l, ...i.containerProps, children: [
    e.map((h, w) => /* @__PURE__ */ t(Pc, { tab: h, active: a, place: jc(i, d, w), onChange: n }, h.id)),
    /* @__PURE__ */ t("span", { "aria-hidden": "true", "data-more-probe": "", className: `${ee.trigger} ${ve.more} ${ve.probe}`, children: Rn }),
    u.length > 0 && /* @__PURE__ */ t(Oc, { tabs: u, trigger: i.itemProps(e.length), onPick: qc(c, n) })
  ] });
}
const xt = 7;
function RR({ links: e, active: a, label: n, level: r }) {
  if (e.length > xt) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${xt} — the set is fixed`);
  const l = _(null);
  return Sn(l, r), ln(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ t(Ba, { as: "nav", rowRef: l, className: xn(r), label: n, count: e.length, focusable: !1, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${ve.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
      " ",
      /* @__PURE__ */ t("span", { className: ve.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Dc = "_root_v56ff_3", Hc = "_segment_v56ff_9", Lt = {
  root: Dc,
  segment: Hc
};
function Ln({ options: e, value: a, onChange: n, label: r = "Options", disabled: l = !1, describedBy: i }) {
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
const Fc = "_sidebar_s9o1j_3", Wc = "_brand_s9o1j_9", zc = "_mark_s9o1j_17", Kc = "_word_s9o1j_24", Gc = "_nav_s9o1j_30", Uc = "_navItem_s9o1j_39", Vc = "_footLink_s9o1j_49", Yc = "_group_s9o1j_58", Jc = "_groupName_s9o1j_65", Xc = "_agents_s9o1j_81", Qc = "_agent_s9o1j_81", Zc = "_root_s9o1j_96", ed = "_agentTop_s9o1j_105", ad = "_dot_s9o1j_112", td = "_agentName_s9o1j_124", nd = "_agentMeta_s9o1j_138", rd = "_foot_s9o1j_49", ld = "_footName_s9o1j_150", od = "_footLinks_s9o1j_157", id = "_linkBrand_s9o1j_184", sd = "_label_s9o1j_205", cd = "_note_s9o1j_210", dd = "_footer_s9o1j_226", x = {
  sidebar: Fc,
  brand: Wc,
  mark: zc,
  word: Kc,
  nav: Gc,
  navItem: Uc,
  new: "_new_s9o1j_48",
  footLink: Vc,
  group: Yc,
  groupName: Jc,
  agents: Xc,
  agent: Qc,
  root: Zc,
  agentTop: ed,
  dot: ad,
  agentName: td,
  agentMeta: nd,
  foot: rd,
  footName: ld,
  footLinks: od,
  linkBrand: id,
  label: sd,
  note: cd,
  footer: dd
};
function ud({ agent: e }) {
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
function hd({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: x.foot, children: [
    /* @__PURE__ */ t("span", { className: x.footName, children: e.heading }),
    /* @__PURE__ */ t("div", { className: x.footLinks, children: e.links.map((a) => /* @__PURE__ */ t("a", { className: `${x.footLink} ward-target`, href: H(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function md({ brand: e, nav: a, agentsHeading: n, agents: r, newAction: l, shared: i }) {
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
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ t("a", { className: x.new, href: H(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ t("ul", { className: x.agents, children: r.map((s) => /* @__PURE__ */ t(ud, { agent: s }, s.href)) }),
    /* @__PURE__ */ t(hd, { shared: i })
  ] });
}
function wd(e) {
  return e.destinations ?? e.items ?? [];
}
function fd({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.linkBrand, children: e });
}
function _d({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: x.footer, children: e });
}
function vd({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: H(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ t("span", { className: x.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ t("span", { className: x.note, children: e.note })
  ] });
}
function bd(e) {
  return /* @__PURE__ */ o("aside", { className: `${x.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ t(fd, { brand: e.brand }),
    /* @__PURE__ */ t("nav", { "aria-label": e.label ?? "Sidebar", children: wd(e).map((a) => /* @__PURE__ */ t(vd, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ t(_d, { children: e.children })
  ] });
}
function pd(e) {
  return "agents" in e;
}
function TR(e) {
  return pd(e) ? /* @__PURE__ */ t(md, { ...e }) : /* @__PURE__ */ t(bd, { ...e });
}
const gd = "_mark_wlgi8_3", yd = {
  mark: gd
}, Nd = { met: "✓", unmet: "", failed: "✕" };
function it({ state: e, label: a }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: yd.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Nd[e]
    }
  );
}
const kd = "_avatar_1t33a_3", $d = {
  avatar: kd
};
function Ca(e) {
  const a = e.trim().split(/[\s_-]+/).filter(Boolean);
  return (a.length > 1 ? (a[0] ?? "").charAt(0) + (a[1] ?? "").charAt(0) : (a[0] ?? "").slice(0, 2)).toUpperCase();
}
function Cd(e) {
  const a = e.replace(/[^\p{L}\p{N}]/gu, "").toUpperCase(), n = a.charAt(0);
  return [Ca(e), ...[...a.slice(1)].map((r) => n + r)];
}
function Sd(e, a) {
  const n = Cd(e).find((l) => !a.has(l));
  if (n !== void 0) return n;
  let r = 2;
  for (; a.has(Ca(e).charAt(0) + String(r)); ) r += 1;
  return Ca(e).charAt(0) + String(r);
}
function xR(e) {
  const a = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Map();
  for (const r of e) {
    if (n.has(r)) continue;
    const l = Sd(r, a);
    a.add(l), n.set(r, l);
  }
  return n;
}
function Rd(e) {
  return e != null && ca(e) ? Ur(e) : void 0;
}
function LR({ name: e, step: a, size: n = "md", initials: r }) {
  return /* @__PURE__ */ t("span", { className: $d.avatar, "data-size": n, "aria-hidden": "true", style: Rd(a), children: r ?? Ca(e) });
}
const Td = "_marker_br9fi_2", xd = {
  marker: Td
}, Ld = {
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
}, Ad = { running: " ward-running" };
function He({ size: e, kind: a, label: n }) {
  const r = { "--marker": Ld[a], width: e, height: e };
  return /* @__PURE__ */ t(
    "span",
    {
      className: `${xd.marker} ward-marker ward-marker--${a}${Ad[a] ?? ""}`,
      style: r,
      "data-testid": "marker",
      role: n ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": n ? void 0 : !0
    }
  );
}
const Ed = "_root_ti0pq_2", Id = "_chip_ti0pq_11", Md = "_noCase_ti0pq_23", fa = {
  root: Ed,
  chip: Id,
  noCase: Md
};
function Bd(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function st({ connection: e, since: a, lastEventAt: n }) {
  const r = Bd(a, n), l = rt(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${fa.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ t(He, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ t("span", { className: fa.noCase, children: tt(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${fa.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ue(r)
  ] });
}
const Pd = "_root_yylks_2", qd = "_context_yylks_13", Od = "_row_yylks_1", jd = "_heading_yylks_27", Dd = "_headingWrap_yylks_35", Hd = "_meta_yylks_41", Fd = "_chips_yylks_49", Wd = "_title_yylks_56", zd = "_consequence_yylks_66", Kd = "_actionsWrap_yylks_73", Gd = "_actions_yylks_73", Ud = "_action_yylks_73", Vd = "_overflowPanel_yylks_102", Yd = "_measureClip_yylks_113", Jd = "_measure_yylks_113", K = {
  root: Pd,
  context: qd,
  row: Od,
  heading: jd,
  headingWrap: Dd,
  meta: Hd,
  chips: Fd,
  title: Wd,
  consequence: zd,
  actionsWrap: Kd,
  actions: Gd,
  action: Ud,
  overflowPanel: Vd,
  measureClip: Yd,
  measure: Jd
};
function Xd({ title: e, density: a }) {
  return a === "record" ? /* @__PURE__ */ t(ta, { as: "h1", className: K.title, text: e }) : /* @__PURE__ */ t("h1", { className: K.title, children: e });
}
function Qd({ chips: e }) {
  return e.length > 0 ? /* @__PURE__ */ t("div", { className: K.chips, children: e.map((a) => /* @__PURE__ */ t(m, { ...a }, a.label)) }) : null;
}
function Zd({ consequence: e, consequenceHint: a }) {
  return e ? /* @__PURE__ */ t("p", { className: K.consequence, title: a, children: e }) : null;
}
function eu({ chips: e = [], consequence: a, consequenceHint: n }) {
  return e.length === 0 && !a ? null : /* @__PURE__ */ o("div", { className: K.meta, children: [
    /* @__PURE__ */ t(Qd, { chips: e }),
    /* @__PURE__ */ t(Zd, { consequence: a, consequenceHint: n })
  ] });
}
function au({ title: e, chips: a, consequence: n, consequenceHint: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: K.heading, children: [
    /* @__PURE__ */ t(Xd, { title: e, density: l }),
    /* @__PURE__ */ t(eu, { chips: a, consequence: n, consequenceHint: r })
  ] });
}
function Ja({ actions: e }) {
  return e.map((a, n) => /* @__PURE__ */ t("span", { className: K.action, "data-action": "", children: a }, n));
}
function At({ disclosure: e }) {
  return /* @__PURE__ */ t(b, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function tu({ actions: e, hasMore: a, collapsed: n, onOverflow: r, disclosure: l }) {
  return n ? r ? /* @__PURE__ */ t(b, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ t(At, { disclosure: l }) : a ? [/* @__PURE__ */ t(At, { disclosure: l }, "more"), /* @__PURE__ */ t(Ja, { actions: e }, "actions")] : /* @__PURE__ */ t(Ja, { actions: e });
}
function nu(e, a, n, r) {
  return n ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function ru({ actions: e, disclosure: a, onEscape: n }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && n();
  };
  return /* @__PURE__ */ t("div", { id: a.panelId, className: K.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ t(Ja, { actions: e }) });
}
function lu(e, a) {
  const n = N(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: n, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
const ou = (e, a) => e.trim().toLowerCase() === a.trim().toLowerCase();
function iu(e = [], a, n) {
  const r = e.at(-1);
  return r !== void 0 && ou(r.label, a) ? { path: e.slice(0, -1), current: !1 } : { path: e, current: n !== !1 };
}
function su({ crumb: e }) {
  return e.path.length === 0 ? null : /* @__PURE__ */ t("div", { className: K.context, children: /* @__PURE__ */ t(Ui, { path: e.path, current: e.current }) });
}
function cu(...e) {
  return e.some((a) => a === null);
}
function du(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function uu(e, a) {
  return getComputedStyle(e).flexDirection === "column" ? 0 : a.offsetWidth + du(e);
}
function hu(e, a, n, r, l) {
  if (l === 0 || cu(a, n, r)) return !1;
  const [i, s, c] = [a, n, r], d = Math.max(0, e.clientWidth - uu(e, i));
  return c.offsetWidth > d || s.scrollWidth > s.clientWidth + 1;
}
function mu(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function wu(e) {
  return Sr(e) && (e.type === "a" || typeof e.props.href == "string");
}
function fu(e, a) {
  return a.length === 0 && e.length === 1 && wu(e[0]);
}
function _u(e, a) {
  const n = _(null), r = _(null), l = _(null), i = _(null), [s, c] = p(!1);
  return C(() => {
    const d = n.current;
    if (!mu(d)) return;
    const u = () => c(hu(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), i.current && h.observe(i.current), u(), () => h.disconnect();
  }, [e]), { rowRef: n, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function vu({ actions: e, hasMore: a, measureRef: n }) {
  return /* @__PURE__ */ t("div", { className: K.measureClip, children: /* @__PURE__ */ o("div", { className: K.measure, ref: n, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ t("span", { children: /* @__PURE__ */ t(b, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ t("span", { children: r }, l))
  ] }) });
}
function bu({ connection: e }) {
  return e ? /* @__PURE__ */ t(st, { connection: e.connection, since: e.since }) : null;
}
function AR({ crumb: e, crumbCurrent: a, chips: n, title: r, consequence: l, consequenceHint: i, actions: s = [], more: c = [], connection: d, onOverflow: u, density: h = "page" }) {
  const { rowRef: w, headingRef: f, actionsRef: y, measureRef: E, collapsed: P } = _u(s, fu(s, c)), te = c.length > 0, { disclosure: Ne, close: ne } = lu(P || te, y), Ee = nu(c, s, P, u);
  return /* @__PURE__ */ o("header", { className: K.root, "data-density": h, children: [
    /* @__PURE__ */ t(su, { crumb: iu(e, r, a) }),
    /* @__PURE__ */ o("div", { className: K.row, ref: w, children: [
      /* @__PURE__ */ t("div", { ref: f, className: K.headingWrap, children: /* @__PURE__ */ t(au, { title: r, chips: n, consequence: l, consequenceHint: i, density: h }) }),
      /* @__PURE__ */ o("div", { className: K.actionsWrap, children: [
        /* @__PURE__ */ t(bu, { connection: d }),
        /* @__PURE__ */ t("div", { className: K.actions, ref: y, "data-ward-actions": !0, children: /* @__PURE__ */ t(tu, { actions: s, hasMore: te, collapsed: P, onOverflow: u, disclosure: Ne }) })
      ] })
    ] }),
    /* @__PURE__ */ t(ru, { actions: Ee, disclosure: Ne, onEscape: ne }),
    /* @__PURE__ */ t(vu, { actions: s, hasMore: te, measureRef: E })
  ] });
}
const pu = "_root_td96x_2", gu = "_body_td96x_16", Et = {
  root: pu,
  body: gu
};
function ER({ variant: e = "info", ticket: a, children: n }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ t("aside", { className: `${Et.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, "data-ticket": a, children: /* @__PURE__ */ t("div", { className: Et.body, children: n }) });
}
const yu = "_root_bf1pc_2", Nu = "_table_bf1pc_9", ku = "_caption_bf1pc_14", $u = "_series_bf1pc_23", Cu = "_category_bf1pc_31", Su = "_cell_bf1pc_39", Ru = "_track_bf1pc_45", Tu = "_lane_bf1pc_52", xu = "_bar_bf1pc_56", Lu = "_value_bf1pc_63", Au = "_swatch_bf1pc_70", Eu = "_empty_bf1pc_78", J = {
  root: yu,
  table: Nu,
  caption: ku,
  series: $u,
  category: Cu,
  cell: Su,
  track: Ru,
  lane: Tu,
  bar: xu,
  value: Lu,
  swatch: Au,
  empty: Eu
}, Iu = "—", It = 6;
function Mu(e, a) {
  if (a.length < 1 || a.length > It)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${It}`);
  const n = a.find((r) => r.values.length !== e.length);
  if (n) throw new Error(`BarChart: series "${n.name}" has ${n.values.length} values for ${e.length} categories`);
}
function Bu(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((n) => n ?? 0)));
}
function An(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Pu(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function qu({ value: e, top: a, step: n, format: r, missing: l }) {
  const i = Pu(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ t("td", { className: J.cell, children: /* @__PURE__ */ o("span", { className: J.track, children: [
    /* @__PURE__ */ t("span", { className: J.lane, children: i > 0 ? /* @__PURE__ */ t("span", { className: `${J.bar} ward-barchart-bar`, "data-step": n, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ t("span", { className: J.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ou({ series: e }) {
  return /* @__PURE__ */ t(R, { children: e.map((a, n) => /* @__PURE__ */ o("th", { scope: "col", className: J.series, children: [
    e.length > 1 ? /* @__PURE__ */ t("span", { className: J.swatch, "data-step": An(n, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function ju({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${J.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ t("p", { className: J.caption, children: e }),
    /* @__PURE__ */ t("p", { className: J.empty, children: a })
  ] });
}
function Du({ title: e, categories: a, series: n, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Iu }) {
  return /* @__PURE__ */ t("div", { className: `${J.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: J.table, children: [
    /* @__PURE__ */ t("caption", { className: J.caption, children: e }),
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "col", className: J.series, children: /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ t(Ou, { series: n })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { scope: "row", className: J.category, children: c }),
      n.map((u, h) => /* @__PURE__ */ t(qu, { value: u.values[d], top: r, step: An(h, n.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function IR(e) {
  Mu(e.categories, e.series);
  const a = Bu(e.series);
  return a === 0 ? /* @__PURE__ */ t(ju, { title: e.title, empty: e.empty }) : /* @__PURE__ */ t(Du, { ...e, top: a });
}
const Hu = "_root_1bfqw_2", Fu = "_figure_1bfqw_7", Wu = "_of_1bfqw_13", zu = "_bar_1bfqw_18", Ku = "_rows_1bfqw_38", Gu = "_row_1bfqw_38", Uu = "_label_1bfqw_49", Vu = "_amount_1bfqw_54", Ie = {
  root: Hu,
  figure: Fu,
  of: Wu,
  bar: zu,
  rows: Ku,
  row: Gu,
  label: Uu,
  amount: Vu
};
function Yu({ spent: e, ceiling: a, breakdown: n }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ie.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ie.figure} ward-stat-value`, children: [
      le(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ie.of, children: [
        "of ",
        le(a)
      ] })
    ] }),
    /* @__PURE__ */ t(
      "meter",
      {
        className: `${Ie.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${le(e)} of ${le(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    n && /* @__PURE__ */ t("ul", { className: Ie.rows, children: n.map((l) => /* @__PURE__ */ o("li", { className: `${Ie.row} ward-costrow`, children: [
      /* @__PURE__ */ t("span", { className: Ie.label, children: l.label }),
      /* @__PURE__ */ t("span", { className: Ie.amount, children: le(l.amount) })
    ] }, l.label)) })
  ] });
}
const Ju = "_frame_lmfp9_2", Xu = "_table_lmfp9_6", Qu = "_th_lmfp9_12", Zu = "_td_lmfp9_13", eh = "_sort_lmfp9_48", ah = "_row_lmfp9_60", th = "_empty_lmfp9_68", qe = {
  frame: Ju,
  table: Xu,
  th: Qu,
  td: Zu,
  sort: eh,
  row: ah,
  empty: th
}, nh = { asc: "ascending", desc: "descending" };
function rh(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return nh[a.direction];
}
function lh(e, a) {
  return e.sortable && a ? /* @__PURE__ */ t("button", { type: "button", className: qe.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function oh(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ih({ column: e, sort: a, onSort: n }) {
  return /* @__PURE__ */ t(
    "th",
    {
      scope: "col",
      className: qe.th,
      style: oh(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": rh(e, a),
      children: lh(e, n)
    }
  );
}
function sh({ row: e, props: a }) {
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
function ch({
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
  return n.length === 0 ? /* @__PURE__ */ t("div", { className: qe.empty, children: u }) : /* @__PURE__ */ t("div", { className: qe.frame, "data-narrow": h, children: /* @__PURE__ */ o("table", { className: qe.table, "aria-label": e, children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: qe.head, children: a.map((w) => /* @__PURE__ */ t(ih, { column: w, sort: c, onSort: d }, w.key)) }) }),
    /* @__PURE__ */ t("tbody", { children: n.map((w) => /* @__PURE__ */ t(sh, { row: w, props: { label: e, columns: a, rows: n, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u, narrow: h } }, r(w))) })
  ] }) });
}
const dh = "_list_v0s52_2", uh = {
  list: dh
};
function MR({ children: e, label: a }) {
  return /* @__PURE__ */ t("ul", { className: uh.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const hh = "_label_1u62a_2", mh = {
  label: hh
};
function BR({ columns: e }) {
  return /* @__PURE__ */ t("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ t("tr", { children: e.map((a) => /* @__PURE__ */ t("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ t("span", { className: mh.label, children: a.header }) }, a.key)) }) });
}
const wh = "_stack_bp6a0_2", fh = {
  stack: wh
};
function PR({ children: e }) {
  return /* @__PURE__ */ t("span", { className: fh.stack, "data-ward-action-stack": "", children: e });
}
const _h = "_set_1z0sq_2", vh = "_legend_1z0sq_7", bh = "_row_1z0sq_15", ph = "_control_1z0sq_20", gh = "_input_1z0sq_26", yh = "_label_1z0sq_31", Nh = "_consequence_1z0sq_36", We = {
  set: _h,
  legend: vh,
  row: bh,
  control: ph,
  input: gh,
  label: yh,
  consequence: Nh
};
function En({ legend: e, options: a, value: n, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
              "aria-describedby": da(f, s),
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
const kh = "_root_11gpw_2", $h = "_head_11gpw_10", Ch = "_note_11gpw_29", Sh = "_index_11gpw_34", Rh = "_dot_11gpw_38", Th = "_counter_11gpw_49", xh = "_trailing_11gpw_57", ze = {
  root: kh,
  head: $h,
  note: Ch,
  index: Sh,
  dot: Rh,
  counter: Th,
  trailing: xh
};
function Lh({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("span", { className: `${ze.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ t("span", { className: ze.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ah({ counter: e }) {
  return e ? /* @__PURE__ */ t("span", { className: ze.counter, "aria-hidden": "true", children: e }) : null;
}
function Mt({ title: e, index: a, note: n, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${ze.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: ze.head, children: [
      /* @__PURE__ */ t(Lh, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    n && /* @__PURE__ */ t("span", { className: ze.note, children: n }),
    /* @__PURE__ */ t(Ah, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ t("span", { className: ze.trailing, children: i })
  ] });
}
const Eh = "_strip_c3x3u_2", Ih = "_cell_c3x3u_7", Mh = "_value_c3x3u_12", Bh = "_link_c3x3u_29", Ph = "_label_c3x3u_49", qh = "_tiles_c3x3u_101", De = {
  strip: Eh,
  cell: Ih,
  value: Mh,
  link: Bh,
  label: Ph,
  tiles: qh
};
function In(e, a, [n, r]) {
  if (a.length < n || a.length > r)
    throw new Error(`${e}: ${a.length} cells — it takes ${n} to ${r}`);
  if (a.filter((l) => l.accent).length > 1) throw new Error(`${e}: only the cell carrying the argument may be accented`);
}
const Mn = (e) => `${De.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Oh({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ t("dd", { className: Mn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ t("dt", { className: `${De.label} ward-stat-label`, children: e.label })
  ] });
}
function jh({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: De.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ t("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ t("dd", { className: Mn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${De.link} ward-stat-link`, href: H(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ t("span", { children: e.value }),
      /* @__PURE__ */ t("span", { className: `${De.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
const Bn = (e) => e.href === void 0 ? /* @__PURE__ */ t(Oh, { cell: e }, e.label) : /* @__PURE__ */ t(jh, { cell: e, href: e.href }, e.label);
function qa({ cells: e, divided: a = !1 }) {
  return In("StatStrip", e, [2, 4]), /* @__PURE__ */ t("dl", { className: `${De.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map(Bn) });
}
const Bt = 6;
function qR({ cells: e }) {
  In("StatTiles", e, [1, 2 * Bt]);
  const a = { "--ward-stat-tiles-columns": Math.min(e.length, Bt) };
  return /* @__PURE__ */ t("dl", { className: `${De.tiles} ward-stattiles`, style: a, children: e.map(Bn) });
}
const Dh = "_root_1eb1u_2", Hh = "_track_1eb1u_8", Fh = "_thumb_1eb1u_46", Wh = "_labelHidden_1eb1u_64", zh = "_label_1eb1u_64", Kh = "_lockedNote_1eb1u_84", Ke = {
  root: Dh,
  track: Hh,
  thumb: Fh,
  labelHidden: Wh,
  label: zh,
  lockedNote: Kh
};
function Gh(e, a, n, r) {
  return { on: n ? !0 : e, off: !!(a || n || r) };
}
function Uh(e) {
  return e ? `${Ke.label} ${Ke.labelHidden}` : Ke.label;
}
function Ue({ label: e, checked: a, onChange: n, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = N(), d = `${c}switch`, u = Ae(), { on: h, off: w } = Gh(a, r, l, u !== null);
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
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: Uh(s), children: [
      e,
      l && /* @__PURE__ */ t("span", { className: Ke.lockedNote, children: "always on" })
    ] })
  ] });
}
const Vh = "_bar_1vp69_2", Yh = "_skip_1vp69_11", Jh = "_mark_1vp69_22", Xh = "_nav_1vp69_30", Qh = "_list_1vp69_34", Zh = "_select_1vp69_41", em = "_selectTrigger_1vp69_45", am = "_dest_1vp69_52", tm = "_actor_1vp69_71", nm = "_actorMark_1vp69_84", rm = "_actorLabel_1vp69_89", lm = "_tagline_1vp69_108", ie = {
  bar: Vh,
  skip: Yh,
  mark: Jh,
  nav: Xh,
  list: Qh,
  select: Zh,
  selectTrigger: em,
  dest: am,
  actor: tm,
  actorMark: nm,
  actorLabel: rm,
  tagline: lm
};
function om(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function im(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function OR({ wordmark: e = "Trellis", destinations: a, active: n, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = im(r);
  return /* @__PURE__ */ o("header", { className: ie.bar, children: [
    /* @__PURE__ */ t("a", { className: `${ie.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ t("span", { className: ie.mark, children: e }),
    l && /* @__PURE__ */ t("span", { className: ie.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ t("ul", { className: ie.list, children: a.map((d) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "a",
        {
          className: `${ie.dest} ward-target`,
          href: H(d.href),
          "aria-current": d.id === n ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ t(
        gn,
        {
          className: ie.select,
          triggerClassName: ie.selectTrigger,
          "aria-label": "Destination",
          value: n,
          options: a.map((d) => ({ value: d.id, label: d.label })),
          onChange: (d) => i == null ? void 0 : i(d)
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: ie.actor, children: [
      /* @__PURE__ */ t("span", { className: ie.actorLabel, children: c }),
      /* @__PURE__ */ t("span", { className: ie.actorMark, "aria-hidden": "true", children: om(c) })
    ] })
  ] });
}
const sm = "_tree_zzoob_2", cm = "_item_zzoob_6", dm = "_row_zzoob_10", um = "_button_zzoob_22", Sa = {
  tree: sm,
  item: cm,
  row: dm,
  button: um
}, Pn = ye(null);
function hm({ label: e, children: a }) {
  const { containerProps: n, itemProps: r } = Ea({ orientation: "vertical" });
  return /* @__PURE__ */ t(Pn.Provider, { value: r, children: /* @__PURE__ */ t("ul", { className: Sa.tree, role: "tree", "aria-label": e, ...n, children: a }) });
}
const mm = { ArrowRight: !0, ArrowLeft: !1 };
function Pt(e) {
  return e ? !0 : void 0;
}
function wm(e, a) {
  const n = mm[e.key];
  !a.leaf && a.onToggle && n !== void 0 && !!a.expanded !== n && a.onToggle();
}
function fm(e) {
  var a, n;
  e.leaf || (a = e.onToggle) == null || a.call(e), (n = e.onSelect) == null || n.call(e);
}
function _m(e) {
  const a = [Sa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function vm(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function bm(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function pm(e) {
  return typeof e == "string" ? e : void 0;
}
function gm({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function ym({ unresolved: e, inherited: a }) {
  const n = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return n === "" ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: n });
}
function qn(e) {
  const a = ge(Pn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const n = vm(e);
  return /* @__PURE__ */ o("li", { className: Sa.item, role: "none", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: _m(e),
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
            onClick: () => fm(e),
            onKeyDown: (r) => wm(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ t("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: bm(e) }),
              /* @__PURE__ */ t("span", { className: "ward-truncate", title: pm(e.label), children: e.label }),
              /* @__PURE__ */ t(gm, { value: e.detail }),
              /* @__PURE__ */ t(ym, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    n && e.children ? /* @__PURE__ */ t("ul", { role: "group", children: e.children }) : null
  ] });
}
const Nm = "_frame_10gwd_2", km = "_subjectRail_10gwd_22", $m = "_subject_10gwd_22", Cm = "_rail_10gwd_42", Sm = "_record_10gwd_66", Rm = "_recordBody_10gwd_71", Tm = "_stageGrid_10gwd_120", xm = "_band_10gwd_134", Lm = "_bandBody_10gwd_142", Am = "_bandActions_10gwd_147", Em = "_scroller_10gwd_155", Im = "_board_10gwd_182", Mm = "_lanes_10gwd_191", Bm = "_cardGrid_10gwd_225", X = {
  frame: Nm,
  subjectRail: km,
  subject: $m,
  rail: Cm,
  record: Sm,
  recordBody: Rm,
  stageGrid: Tm,
  band: xm,
  bandBody: Lm,
  bandActions: Am,
  scroller: Em,
  board: Im,
  lanes: Mm,
  cardGrid: Bm
};
function jR({ children: e, as: a = "main", inset: n = "page" }) {
  return /* @__PURE__ */ t(a, { className: X.frame, "data-ward-page-frame": "", "data-inset": n, children: e });
}
function qt(e) {
  return e ? "true" : void 0;
}
function DR({ children: e, rail: a, width: n = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: X.subjectRail, "data-ward-subject-rail": n, "data-ruled": qt(i), children: [
    /* @__PURE__ */ t("div", { className: X.subject, children: e }),
    /* @__PURE__ */ t("aside", { className: X.rail, "data-sticky": qt(l), "aria-label": r, children: a })
  ] });
}
function HR({ title: e, children: a, note: n, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ t("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: X.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ t(Mt, { kind: "key", title: e, note: n, trailing: r }),
    /* @__PURE__ */ t("div", { className: X.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Pm = "_form_1j8ub_2", qm = "_fields_1j8ub_9", Om = "_actions_1j8ub_19", Wa = {
  form: Pm,
  fields: qm,
  actions: Om
};
function FR({ label: e, children: a, actions: n, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Wa.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ t("div", { className: Wa.fields, children: a }),
    n == null ? null : /* @__PURE__ */ t("div", { className: Wa.actions, role: "group", "aria-label": `${e} actions`, children: n })
  ] });
}
function WR({ children: e, actions: a, label: n }) {
  return /* @__PURE__ */ o("section", { className: X.band, "aria-label": n, "data-ward-section-band": "", children: [
    /* @__PURE__ */ t("div", { className: X.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: X.bandActions, children: a })
  ] });
}
const jm = "(max-width: 767.98px)";
function ct({ label: e, children: a, laneCount: n }) {
  const r = n === void 0 ? void 0 : { "--ward-board-lanes": n };
  return /* @__PURE__ */ t(Ba, { className: X.scroller, label: e, count: n ?? Rr.count(a), "data-ward-board-scroller": "", style: r, children: a });
}
function Dm({ lanes: e, label: a, laneLabel: n }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: X.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ t(M, { kind: "select", label: n, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ t(ct, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Hm({ lanes: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: X.board, "data-ward-board": "", children: /* @__PURE__ */ t(ct, { label: a, laneCount: e.length, children: e.map((n) => /* @__PURE__ */ t(Tr, { children: n.content }, n.id)) }) });
}
function zR({ children: e, label: a = "Workflow board", lanes: n, laneLabel: r = "Column" }) {
  const l = ia(jm);
  return n === void 0 ? /* @__PURE__ */ t(ct, { label: a, children: e }) : l ? /* @__PURE__ */ t(Dm, { lanes: n, label: a, laneLabel: r }) : /* @__PURE__ */ t(Hm, { lanes: n, label: a });
}
function KR({ columns: e, children: a, label: n = "Stages", floor: r = "stage" }) {
  const l = Math.max(e, 1), i = { "--ward-stage-grid-columns": l };
  return /* @__PURE__ */ t(Ba, { className: X.stageGrid, label: n, count: l, "data-ward-stage-grid": "", "data-floor": r, style: i, children: a });
}
function GR({ children: e, label: a }) {
  return /* @__PURE__ */ t("div", { className: `${X.cardGrid} ward-cardgrid`, role: a === void 0 ? void 0 : "region", "aria-label": a, "data-ward-card-grid": "", children: e });
}
const Fm = "_block_b38uc_3", Wm = "_sentence_b38uc_10", zm = "_meta_b38uc_19", Km = "_action_b38uc_24", Gm = "_strip_b38uc_28", Um = "_loading_b38uc_47", Vm = "_label_b38uc_55", Ym = "_counter_b38uc_62", be = {
  block: Fm,
  sentence: Wm,
  meta: zm,
  action: Km,
  strip: Gm,
  loading: Um,
  label: Vm,
  counter: Ym
};
function Jm({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { className: be.action, children: /* @__PURE__ */ t(b, { onClick: e.onClick, children: e.label }) });
}
function Oa({ sentence: e, action: a, children: n, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${be.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ t("p", { className: be.sentence, children: e }),
    n,
    /* @__PURE__ */ t(Jm, { action: a })
  ] });
}
function Xm(e) {
  return /* @__PURE__ */ t(Oa, { ...e, kind: "ward-emptystate" });
}
function UR({ sentence: e, total: a, action: n }) {
  return /* @__PURE__ */ t(Oa, { sentence: e, action: n, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function VR(e) {
  return /* @__PURE__ */ t(Oa, { ...e });
}
function YR({ sentence: e, at: a, onRetry: n }) {
  return /* @__PURE__ */ t(Oa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: n }, children: /* @__PURE__ */ o("p", { className: be.meta, children: [
    "failed at ",
    ue(a)
  ] }) });
}
function JR({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ue(e),
    ". Showing snapshot from ",
    ue(a)
  ] });
}
function XR({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: be.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ue(a)
  ] });
}
function QR({ label: e, startedAt: a }) {
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
const Qm = "_note_cigdt_2", Zm = {
  note: Qm
};
function ew({ label: e, count: a, cap: n }) {
  return /* @__PURE__ */ o("p", { className: Zm.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    n
  ] });
}
const aw = "_card_k7btg_3", tw = "_hit_k7btg_31", nw = "_head_k7btg_44", rw = "_title_k7btg_51", lw = "_meta_k7btg_57", ow = "_since_k7btg_66", iw = "_sep_k7btg_76", sw = "_fields_k7btg_80", cw = "_field_k7btg_80", dw = "_last_k7btg_98", uw = "_reason_k7btg_110", ce = {
  card: aw,
  hit: tw,
  head: nw,
  title: rw,
  meta: lw,
  since: ow,
  sep: iw,
  fields: sw,
  field: cw,
  last: dw,
  reason: uw
}, hw = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function mw(e, a, n) {
  const r = ba(e, "blue"), l = ba(e, "orange"), i = ba(e, "green"), s = _(/* @__PURE__ */ new Set());
  C(() => {
    if (!n) return;
    const c = { blue: r, orange: l, green: i };
    return n.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = hw[d.type];
      u && c[u]();
    });
  }, [r, n, i, a, l]);
}
const ww = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : le(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function fw(e, a) {
  return ww[a](e);
}
function _w({ item: e, connection: a }) {
  const n = /* @__PURE__ */ t("span", { className: ce.sep, "aria-hidden": "true", children: " · " });
  return e.run ? /* @__PURE__ */ o("p", { className: ce.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.run.agent,
    n,
    /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: ce.meta, "data-ward-card-meta": "", children: [
    "waits on ",
    e.waitsOn,
    n,
    /* @__PURE__ */ o("span", { className: ce.since, children: [
      de(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function vw({ item: e }) {
  const a = e.run ? { role: "running", label: "Agent working" } : e.state;
  return /* @__PURE__ */ o("div", { className: ce.head, children: [
    e.flagged && /* @__PURE__ */ t(m, { role: "drift", label: "Drift flag" }),
    a && /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function bw({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: ce.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function pw({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ t("p", { className: ce.fields, children: a.map((n) => /* @__PURE__ */ t("span", { className: ce.field, children: fw(e, n) }, n)) });
}
const Xa = (e) => e ? !0 : void 0;
function gw(e) {
  return { "--stream": pe(e.streamStep, "id") };
}
function yw(e, a, n) {
  e == null || e(a, n);
}
function Nw(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function kw({ item: e, stale: a }) {
  var r, l;
  const n = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return n ? /* @__PURE__ */ t("p", { className: ce.last, "data-stale": Xa(a), children: n }) : null;
}
function ja(e) {
  const a = e.fields ?? [], n = e.item, r = _(null);
  mw(r, n.key, e.feed);
  const l = Nw(e.feed), i = gw(n);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": n.key,
      className: ce.card,
      style: i,
      "data-selected": Xa(e.selected),
      "data-flagged": Xa(n.flagged),
      children: [
        /* @__PURE__ */ t("button", { type: "button", className: ce.hit, onClick: (s) => yw(e.onOpen, n.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          n.key,
          " ",
          n.title
        ] }) }),
        /* @__PURE__ */ t(vw, { item: n }),
        /* @__PURE__ */ t(ta, { as: "p", className: ce.title, text: n.title }),
        /* @__PURE__ */ t(_w, { item: n, connection: l }),
        /* @__PURE__ */ t(bw, { reason: n.blockedReason }),
        /* @__PURE__ */ t(pw, { item: n, fields: a }),
        /* @__PURE__ */ t(kw, { item: n, stale: l === "stale" })
      ]
    }
  );
}
const $w = "_column_1j8bi_3", Cw = "_head_1j8bi_21", Sw = "_label_1j8bi_30", Rw = "_count_1j8bi_39", Tw = "_list_1j8bi_53", la = {
  column: $w,
  head: Cw,
  label: Sw,
  count: Rw,
  list: Tw
};
function On(e, a) {
  return [...e].sort((n, r) => a === "oldest" ? r.timeInStage - n.timeInStage : n.timeInStage - r.timeInStage);
}
function xw({ column: e, count: a, id: n }) {
  return /* @__PURE__ */ o("div", { className: la.head, children: [
    /* @__PURE__ */ t("h2", { className: la.label, id: n, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
    /* @__PURE__ */ o("span", { className: la.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Lw(e) {
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
function Aw({ column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = N(), h = e.cap !== void 0 && a.length > e.cap, w = On(a, r);
  return /* @__PURE__ */ o("section", { className: la.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ t(xw, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ t(Lw, { column: e, items: a, fields: n, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: w }),
    h && /* @__PURE__ */ t(ew, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ew = "_foot_cs4jr_2", Iw = "_note_cs4jr_13", Mw = "_link_cs4jr_19", za = {
  foot: Ew,
  note: Iw,
  link: Mw
};
function ZR({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: za.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ t("p", { className: za.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${za.link} ward-target`, href: H(e), children: "Configure board" })
  ] });
}
const Bw = "_head_1tfi5_3", Pw = "_identity_1tfi5_12", qw = "_titleRow_1tfi5_18", Ow = "_title_1tfi5_18", jw = "_key_1tfi5_35", Dw = "_rollup_1tfi5_45", Hw = "_tools_1tfi5_53", Fw = "_swatch_1tfi5_101", Ww = "_mark_1tfi5_108", Se = {
  head: Bw,
  identity: Pw,
  titleRow: qw,
  title: Ow,
  key: jw,
  rollup: Dw,
  tools: Hw,
  swatch: Fw,
  mark: Ww
}, Ot = "initials:";
function zw(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Kw(e) {
  const a = [zw(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${de(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${de(e.p90)}`), a.join(" · ");
}
function Gw(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    Kw(e)
  ] });
}
function Uw(e) {
  return e.startsWith(Ot) ? e.slice(Ot.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join("") : "";
}
function Vw({ markRef: e, streamStep: a }) {
  const n = { "--stream": pe(a, "id") };
  return e ? /* @__PURE__ */ t("span", { className: `${Se.mark} ward-stream-mark`, style: n, "data-mark-ref": e, "aria-hidden": "true", children: Uw(e) }) : /* @__PURE__ */ t("span", { className: Se.swatch, style: n, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Yw({ owners: e, owner: a, onOwnerChange: n }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: n, options: e });
}
function e2({
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
        /* @__PURE__ */ t(Vw, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ t("h1", { className: Se.title, children: e.name }),
        /* @__PURE__ */ t("span", { className: Se.key, children: e.key })
      ] }),
      /* @__PURE__ */ t("p", { className: Se.rollup, "aria-live": "polite", children: Gw(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: Se.tools, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ t(Yw, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ t(b, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ t(st, { connection: n, since: r ?? void 0 })
    ] })
  ] });
}
const Jw = "_head_1sejb_14", Xw = "_line_1sejb_15", Qw = "_cHandle_1sejb_36", Zw = "_cName_1sejb_41", ef = "_nameLine_1sejb_49", af = "_cLabel_1sejb_56", tf = "_cCap_1sejb_61", nf = "_cShown_1sejb_66", rf = "_name_1sejb_49", lf = "_noCap_1sejb_88", of = "_state_1sejb_102", sf = "_handle_1sejb_111", cf = "_sub_1sejb_137", B = {
  head: Jw,
  line: Xw,
  cHandle: Qw,
  cName: Zw,
  nameLine: ef,
  cLabel: af,
  cCap: tf,
  cShown: nf,
  name: rf,
  noCap: lf,
  state: of,
  handle: sf,
  sub: cf
}, df = "can't be hidden or collapsed", uf = "terminal · counted, not a column";
function a2() {
  return /* @__PURE__ */ o("div", { className: B.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: B.cHandle }),
    /* @__PURE__ */ t("span", { className: B.cName, children: "Stage" }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: "Column label" }),
    /* @__PURE__ */ t("span", { className: B.cCap, children: "WIP cap" }),
    /* @__PURE__ */ t("span", { className: B.cShown, children: "Shown" })
  ] });
}
function hf(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function mf(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function jt(e) {
  return e.gate ? df : e.terminal ? uf : mf(e.agentsMounted);
}
function wf(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function ff({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: B.cName, children: [
    /* @__PURE__ */ o("span", { className: B.nameLine, children: [
      /* @__PURE__ */ t("span", { className: B.name, children: e.name }),
      e.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Human gate", size: "tag" })
    ] }),
    jt(e) && /* @__PURE__ */ t("span", { className: B.sub, children: jt(e) })
  ] });
}
function _f(e) {
  return e === void 0 ? "" : String(e);
}
function vf(e) {
  return e === "" ? void 0 : Number(e);
}
function bf({ name: e, onReorder: a }) {
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
      onKeyDown: (r) => !n && wf(r, a),
      children: "⠿"
    }
  ) });
}
function pf({ stage: e, config: a, onChange: n }) {
  return e.terminal ? /* @__PURE__ */ t("span", { className: `${B.cCap} ${B.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ t("span", { className: B.cCap, children: /* @__PURE__ */ t(M, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: _f(a.cap), onChange: (r) => n({ ...a, cap: vf(r) }) }) });
}
function gf({ stage: e, config: a, onChange: n }) {
  const r = Ae() !== null, l = hf(e, a.shown), i = e.gate || e.terminal || r, s = (c) => n({ ...a, shown: c });
  return /* @__PURE__ */ o("span", { className: B.cShown, children: [
    /* @__PURE__ */ t(Ue, { label: "Shown as a column", labelHidden: !0, checked: l.shown, locked: e.gate, disabled: e.terminal, onChange: s }),
    /* @__PURE__ */ t("span", { className: B.state, "data-fixed": i || void 0, "aria-hidden": "true", onClick: () => !i && s(!l.shown), children: l.state })
  ] });
}
function yf(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function t2({ stage: e, config: a, onChange: n, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: B.line, "data-kind": yf(e), children: [
    /* @__PURE__ */ t(bf, { name: e.name, onReorder: r }),
    /* @__PURE__ */ t(ff, { stage: e }),
    /* @__PURE__ */ t("span", { className: B.cLabel, children: /* @__PURE__ */ t(M, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => n({ ...a, label: l }) }) }),
    /* @__PURE__ */ t(pf, { stage: e, config: a, onChange: n }),
    /* @__PURE__ */ t(gf, { stage: e, config: a, onChange: n })
  ] });
}
const Nf = "_body_8qsv9_2", kf = "_head_8qsv9_9", $f = "_summary_8qsv9_19", Cf = "_block_8qsv9_20", Sf = "_actionsBlock_8qsv9_21", Rf = "_title_8qsv9_41", Tf = "_note_8qsv9_46", xf = "_k_8qsv9_51", Lf = "_kv_8qsv9_58", Af = "_row_8qsv9_64", Ef = "_label_8qsv9_75", If = "_value_8qsv9_84", Mf = "_quote_8qsv9_90", Bf = "_actions_8qsv9_21", Pf = "_resolve_8qsv9_111", O = {
  body: Nf,
  head: kf,
  summary: $f,
  block: Cf,
  actionsBlock: Sf,
  title: Rf,
  note: Tf,
  k: xf,
  kv: Lf,
  row: Af,
  label: Ef,
  value: If,
  quote: Mf,
  actions: Bf,
  resolve: Pf
};
function qf(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Of(e, a) {
  if (!e.run) return [];
  const n = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: n, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function jf(e) {
  const a = ha(e);
  return a === null ? "No colour" : `Step ${a}`;
}
function Df(e) {
  return (e ?? []).map((a, n) => [a.label, a.value, `fact-${n}`]);
}
function Hf(e, a, n) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ t(m, { ...Pa(jf(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", de(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...qf(e),
    ...Df(n),
    ...Of(e, a)
  ];
}
function Ff({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: O.resolve, "aria-label": a, children: [
    /* @__PURE__ */ t("h3", { className: O.k, children: a }),
    e
  ] });
}
function Wf(e) {
  return e.run ? { role: "running", label: "Agent working" } : e.state;
}
function zf({ item: e, showKey: a }) {
  const n = Wf(e);
  return !a && !n ? null : /* @__PURE__ */ o("div", { className: O.head, children: [
    a && /* @__PURE__ */ t(m, { role: "meta", label: e.key }),
    n && /* @__PURE__ */ t(m, { role: n.role, label: n.label })
  ] });
}
function Kf({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: O.block, children: [
    /* @__PURE__ */ t("p", { className: O.k, children: "What the agent says" }),
    /* @__PURE__ */ t("p", { className: O.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ t("p", { className: O.note, children: e.agentMeta })
  ] }) : null;
}
function n2({ item: e, actions: a, onClose: n, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c, facts: d, showKey: u = !1 }) {
  const h = N(), w = Hf(e, l, d);
  return /* @__PURE__ */ t(na, { kind: "drawer", labelledBy: h, onClose: n, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: O.body, children: [
    /* @__PURE__ */ t(zf, { item: e, showKey: u }),
    /* @__PURE__ */ o("div", { className: O.summary, children: [
      /* @__PURE__ */ t("h2", { className: O.title, id: h, children: e.title }),
      e.summary && /* @__PURE__ */ t("p", { className: O.note, children: e.summary })
    ] }),
    /* @__PURE__ */ t("dl", { className: O.kv, children: w.map(([f, y, E]) => /* @__PURE__ */ o("div", { className: O.row, children: [
      /* @__PURE__ */ t("dt", { className: O.label, children: f }),
      /* @__PURE__ */ t("dd", { className: O.value, children: y })
    ] }, E ?? f)) }),
    /* @__PURE__ */ t(Kf, { item: e }),
    /* @__PURE__ */ o("div", { className: O.actionsBlock, children: [
      /* @__PURE__ */ t("div", { className: O.actions, children: a }),
      c && /* @__PURE__ */ t("p", { className: O.note, children: c })
    ] }),
    /* @__PURE__ */ t(Ff, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const Gf = "_root_3azmy_2", Uf = "_list_3azmy_7", Vf = "_item_3azmy_12", Yf = "_box_3azmy_18", Jf = "_text_3azmy_23", Xf = "_note_3azmy_28", Ye = {
  root: Gf,
  list: Uf,
  item: Vf,
  box: Yf,
  text: Jf,
  note: Xf
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
const Qf = "_rail_znbbp_2", Zf = "_k_znbbp_11", e_ = "_head_znbbp_19", a_ = "_section_znbbp_25", t_ = "_card_znbbp_39", n_ = "_strip_znbbp_46", r_ = "_skeleton_znbbp_60", l_ = "_skeletonLabel_znbbp_74", o_ = "_bar_znbbp_80", i_ = "_note_znbbp_89", me = {
  rail: Qf,
  k: Zf,
  head: e_,
  section: a_,
  card: t_,
  strip: n_,
  skeleton: r_,
  skeletonLabel: l_,
  bar: o_,
  note: i_
};
function s_(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ka({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: me.section, "aria-label": e, children: [
    /* @__PURE__ */ t("h3", { className: me.k, children: e }),
    a
  ] });
}
function c_({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: me.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ t("span", { className: me.skeletonLabel, children: e.label }),
    /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (n, r) => /* @__PURE__ */ t("span", { className: me.bar, "aria-hidden": "true" }, r))
  ] });
}
function d_({ draft: e, sample: a, open: n, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ t(Aw, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: n, feed: r }, l.id));
}
function u_(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ t(d_, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ t(c_, { column: a, count: e.sample.filter((n) => n.stage === a.id).length }, a.id));
}
function r2(e) {
  const a = s_(e.onOpen), n = On(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: me.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ t("h2", { className: `${me.k} ${me.head}`, children: "Live preview" }),
    /* @__PURE__ */ t(Ka, { title: "Card", children: /* @__PURE__ */ t("div", { className: me.card, children: n && /* @__PURE__ */ t(ja, { item: n, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ka, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ t("div", { className: me.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ t(u_, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ t("p", { className: me.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ t(Ka, { title: "Effect of this config", children: /* @__PURE__ */ t(Da, { items: e.effects, density: "compact" }) })
  ] });
}
function h_(e, a) {
  return (n) => {
    e.current = n, a(n);
  };
}
function m_(e) {
  return Math.ceil(e.length / 2);
}
function w_(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function jn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function f_(e, a, n, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = jn(e);
  l !== void 0 && n(l), r(w_(e.type));
}
function __(e, a, n, r, l) {
  C(() => {
    if (e !== null)
      return e.subscribe(a, (i) => f_(i, n, r, l));
  }, [e, a, n, r, l]);
}
function v_(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function b_(e, a) {
  return a ? { role: "running", label: "Agent working" } : e.state ?? { role: "pending", label: e.key };
}
function p_(e, a) {
  return a !== void 0 ? de(e.timeInStage) + " · waits on " + a.agent : de(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function g_(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + z.height.card + " + " + z.height.cardRow + " * " + String(m_(a ?? [])) + ")"
  };
}
function y_(e, a) {
  return /* @__PURE__ */ t("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function N_(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ t(m, { role: "meta", label: le(e.cost) }) : null;
}
function k_(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ t(m, { role: "meta", label: e.jiraKey }) : null;
}
function $_(e, a, n, r) {
  return e === void 0 ? null : /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: n ?? "live", turn: e.turn });
}
function C_(e, a, n) {
  return a === void 0 ? e.finding ?? "" : n ?? "";
}
function S_(e, a) {
  return a === void 0 ? e : h_(e, a.ref);
}
function R_(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function sa(e) {
  return e === !0 ? "true" : void 0;
}
function Dn(e) {
  const a = e.item, n = a.run, r = n !== void 0, l = _(null), i = ba(l), s = _(/* @__PURE__ */ new Set()), [c, d] = p(v_(a));
  __(e.feed, a.key, s, d, i);
  const u = b_(a, r), h = p_(a, n), w = g_(a, e.fields), f = C_(a, n, c);
  return /* @__PURE__ */ t("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...R_(e),
      className: "ward-workcard",
      "data-flagged": sa(a.flagged),
      "data-selected": sa(e.selected),
      style: w,
      ref: S_(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        y_(a, e.fields),
        /* @__PURE__ */ t("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ t(m, { role: u.role, label: u.label }),
          N_(a, e.fields),
          k_(a, e.fields)
        ] }),
        /* @__PURE__ */ t("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          $_(n, c, e.connection, a.changedAt),
          f !== "" ? /* @__PURE__ */ t("span", { className: "ward-truncate", title: f, children: f }) : null
        ] })
      ]
    }
  ) });
}
function T_({ count: e, cap: a }) {
  return /* @__PURE__ */ t("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function x_(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function L_(e, a, n) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ t("span", { id: n, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }) : null,
      /* @__PURE__ */ t(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function A_(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ t(T_, { count: e.items.length, cap: e.column.cap });
}
function E_(e, a) {
  return e.roving ?? a;
}
function I_(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function M_(e, a) {
  return e.items.map((n, r) => /* @__PURE__ */ t(
    Dn,
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
function B_(e) {
  const a = N(), n = Ea({ orientation: "vertical" }), r = E_(e, n), l = x_(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": sa(l), "data-gate": sa(e.column.gate), children: [
    L_(e.column, e.items.length, a),
    A_(e, l),
    /* @__PURE__ */ t("ul", { role: "list", className: "ward-boardcol-list", ...I_(e, n), children: M_(e, r) })
  ] });
}
function P_(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + de(e.p50)), e.p90 !== void 0 && (a += " · p90 " + de(e.p90)), a;
}
function q_(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function O_(e) {
  return e === void 0 ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function l2(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ t(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ t(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ t("div", { className: "ward-rollup", "aria-live": "polite", children: P_(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      q_(e),
      O_(e.onConfigure),
      /* @__PURE__ */ t(st, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function j_(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function D_(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ t(Ue, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ t(Ue, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function H_(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ t(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ t(m, { role: "soft", label: "Terminal" }) : null
  ] });
}
function o2(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": sa(j_(a)), children: [
    /* @__PURE__ */ t("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ t("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ t("span", { children: D_(e) }),
    /* @__PURE__ */ t(M, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (n) => e.onChange({ ...e.config, cap: n }) }),
    /* @__PURE__ */ t(hn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    H_(a),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ t("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function i2(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ t(Dn, { item: a, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null }) : null,
    /* @__PURE__ */ t(B_, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (n) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, n);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ t("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((n) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ t("span", { className: n.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": n.met ? "met" : "unmet" }),
      /* @__PURE__ */ t("span", { children: n.text })
    ] }, n.text)) })
  ] });
}
function F_(e, a) {
  const n = jn(e);
  n !== void 0 && a(n);
}
function W_(e, a, n) {
  C(() => {
    if (e != null)
      return e.subscribe(a, (r) => F_(r, n));
  }, [e, a, n]);
}
function z_(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function K_(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", de(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", le(e.cost)]), a;
}
function G_(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ t(Le, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function U_(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ t(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ t("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ t("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function s2(e) {
  var s;
  const a = e.item, n = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  W_(e.feed, a.key, l);
  const i = [...z_(a), ...K_(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("dt", { children: c[0] }),
        /* @__PURE__ */ t("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      G_(n, r)
    ] }),
    U_(a, e.actions)
  ] });
}
const V_ = "_card_1nkkx_3", Y_ = "_head_1nkkx_30", J_ = "_mark_1nkkx_38", X_ = "_name_1nkkx_50", Q_ = "_chips_1nkkx_71", Z_ = "_description_1nkkx_77", ev = "_run_1nkkx_82", av = "_sep_1nkkx_91", tv = "_facts_1nkkx_97", nv = "_fact_1nkkx_97", rv = "_factLabel_1nkkx_111", lv = "_factValue_1nkkx_115", oe = {
  card: V_,
  head: Y_,
  mark: J_,
  name: X_,
  chips: Q_,
  description: Z_,
  run: ev,
  sep: av,
  facts: tv,
  fact: nv,
  factLabel: rv,
  factValue: lv
}, ov = { live: "done", draft: "running", paused: "meta" };
function iv(e) {
  return e === void 0 ? oe.card : `${oe.card} ${e}`;
}
function sv({ versions: e }) {
  return /* @__PURE__ */ t("div", { className: oe.chips, children: e.map((a) => /* @__PURE__ */ t(m, { role: ov[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status}` }, a.v)) });
}
function cv({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("p", { className: oe.description, children: e });
}
function dv({ run: e, connection: a, lastEvent: n }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: oe.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ t("span", { className: oe.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: n, turn: e.turn })
  ] });
}
function uv({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ t("dl", { className: oe.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: oe.fact, children: [
    /* @__PURE__ */ t("dt", { className: oe.factLabel, children: a.label }),
    /* @__PURE__ */ t("dd", { className: oe.factValue, children: a.value })
  ] }, a.label)) });
}
function hv(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function mv({ agent: e, href: a, selected: n, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": pe(e.streamStep, "id") }, d = n ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: iv(s),
      style: c,
      "data-selected": d,
      "data-paused": hv(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: oe.head, children: [
          /* @__PURE__ */ t("span", { className: oe.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ t("a", { className: `${oe.name} ward-rowlink ward-target`, href: H(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ t(cv, { description: e.description }),
        /* @__PURE__ */ t(dv, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ t(sv, { versions: e.versions }),
        /* @__PURE__ */ t(uv, { facts: i })
      ]
    }
  );
}
const wv = "_list_4dcyc_2", fv = "_row_4dcyc_11", _v = "_head_4dcyc_23", vv = "_id_4dcyc_30", bv = "_lock_4dcyc_35", pv = "_reason_4dcyc_41", gv = "_remove_4dcyc_46", yv = "_clauses_4dcyc_50", Nv = "_clause_4dcyc_50", kv = "_label_4dcyc_64", $v = "_cell_4dcyc_71", Cv = "_value_4dcyc_76", se = {
  list: wv,
  row: fv,
  head: _v,
  id: vv,
  lock: bv,
  reason: pv,
  remove: gv,
  clauses: yv,
  clause: Nv,
  label: kv,
  cell: $v,
  value: Cv
}, Hn = ye(!1);
function c2({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ t(Hn.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: se.list, "aria-label": a, children: e }) });
}
function Sv({ clause: e, ruleId: a, onChange: n }) {
  if (!n) return /* @__PURE__ */ t("span", { className: se.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ t(M, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => n(e.key, l) });
}
function Rv({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: se.lock, children: [
    /* @__PURE__ */ t(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ t("span", { className: se.reason, children: e })
  ] });
}
function Tv({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: se.head, children: [
    /* @__PURE__ */ t("span", { className: se.id, children: e.id }),
    e.locked && /* @__PURE__ */ t(Rv, { reason: e.lockedReason }),
    a && /* @__PURE__ */ t("span", { className: se.remove, children: /* @__PURE__ */ o(b, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function Dt(e, a) {
  return e.locked ? void 0 : a;
}
function d2({ rule: e, onChange: a, onRemove: n }) {
  if (!ge(Hn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = Dt(e, a);
  return /* @__PURE__ */ o("li", { className: se.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(Tv, { rule: e, onRemove: Dt(e, n) }),
    /* @__PURE__ */ t("dl", { className: se.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: se.clause, children: [
      /* @__PURE__ */ t("dt", { className: se.label, children: l.label }),
      /* @__PURE__ */ t("dd", { className: se.cell, children: /* @__PURE__ */ t(Sv, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const xv = "_ladder_1xdeh_2", Lv = "_cell_1xdeh_7", Av = "_empty_1xdeh_26", Ev = "_name_1xdeh_34", Iv = "_holder_1xdeh_40", Mv = "_request_1xdeh_46", Bv = "_swatches_1xdeh_51", Pv = "_swatch_1xdeh_51", qv = "_tilesFrame_1xdeh_78", Ov = "_tiles_1xdeh_78", jv = "_tile_1xdeh_78", Dv = "_bar_1xdeh_117", Hv = "_hex_1xdeh_128", Fv = "_note_1xdeh_138", A = {
  ladder: xv,
  cell: Lv,
  empty: Av,
  name: Ev,
  holder: Iv,
  request: Mv,
  swatches: Bv,
  swatch: Pv,
  tilesFrame: qv,
  tiles: Ov,
  tile: jv,
  bar: Dv,
  hex: Hv,
  note: Fv
}, u2 = "not validated yet, pending a CVD matrix and dark stepping";
function Wv(e) {
  return e.reserved ? "reserved" : ca(e.step) ? "validated" : "partial";
}
function Fn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function zv(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Kv({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ t(He, { size: 14, kind: "stream" }) : /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Gv(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Uv(e, a, n) {
  return {
    "aria-checked": a,
    "aria-disabled": n || void 0,
    tabIndex: n ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const Ht = (e) => String(e).padStart(2, "0");
function Vv(e, a, n) {
  return e === "reserved" ? "Reserved until revalidated" : n ? "yours" : a ?? Fn(e, void 0);
}
function Yv({ step: e, validation: a, note: n }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: r ? `step ${Ht(e)}` : Yr(e) }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: r ? n : `Step ${Ht(e)} · ${n}` })
  ] });
}
function Jv({ step: e, value: a, taken: n, onChange: r, presentation: l, disabled: i }) {
  const s = Wv(e), c = Fn(s, n), d = c !== "free", u = d || i, h = a === e.step, w = e.name ?? `Step ${e.step}`, f = () => {
    u || r(e.step);
  }, y = `${w} · ${l === "tiles" && h ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": y, ...Uv(d, h, u), "data-validation": s, style: zv(e, s), onClick: f, onKeyDown: (P) => Gv(P, f) }, label: y, name: w, holder: c, validation: s, note: Vv(s, n, h), step: e.step };
}
const Xv = {
  swatches: (e) => /* @__PURE__ */ t("span", { ...e.shared, title: e.label, className: `${A.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ t("span", { ...e.shared, className: `${A.tile} ward-ladder-cell`, children: /* @__PURE__ */ t(Yv, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${A.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ t(Kv, { validation: e.validation }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Qv(e) {
  return Xv[e.presentation](Jv(e));
}
function Zv(e) {
  for (const a of e)
    if (!a.reserved && !Ia(a.step)) throw new Error("colour ladder renders token steps only");
}
function eb() {
  return /* @__PURE__ */ o("div", { className: `${A.cell} ward-ladder-cell ${A.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function ab(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const tb = { list: A.ladder, swatches: A.swatches, tiles: A.tilesFrame };
function nb() {
  return /* @__PURE__ */ o("div", { className: `${A.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ t("span", { className: `${A.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: `${A.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ t("span", { className: `${A.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const rb = { list: eb, swatches: () => null, tiles: nb };
function lb(e) {
  return e ? { "aria-disabled": !0, "data-disabled": !0 } : {};
}
function Wn(e) {
  const a = e.takenBy ?? {}, n = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  Zv(e.steps);
  const r = ab(e), l = rb[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ t(Qv, { step: s, value: e.value, taken: a[s.step], onChange: n, presentation: r, disabled: e.disabled === !0 }, s.step)),
    /* @__PURE__ */ t(l, {})
  ] });
  return /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", ...lb(e.disabled === !0), className: `${tb[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ t("div", { className: A.tiles, children: i }) : i });
}
const ob = "_rail_s06lm_2", ib = "_section_s06lm_12", sb = "_sectionFlush_s06lm_22", cb = "_head_s06lm_26", db = "_headLabel_s06lm_34", ub = "_sample_s06lm_42", hb = "_sampleLabel_s06lm_47", mb = "_sampleTitle_s06lm_54", wb = "_sampleMeta_s06lm_59", fb = "_trace_s06lm_65", _b = "_traceHead_s06lm_70", vb = "_steps_s06lm_78", bb = "_step_s06lm_78", pb = "_stepTitle_s06lm_97", gb = "_hollow_s06lm_107", yb = "_stepBody_s06lm_115", Nb = "_stepDetail_s06lm_127", kb = "_publish_s06lm_132", $b = "_reason_s06lm_138", Cb = "_note_s06lm_143", Sb = "_reveal_s06lm_148", k = {
  rail: ob,
  section: ib,
  sectionFlush: sb,
  head: cb,
  headLabel: db,
  sample: ub,
  sampleLabel: hb,
  sampleTitle: mb,
  sampleMeta: wb,
  trace: fb,
  traceHead: _b,
  steps: vb,
  step: bb,
  stepTitle: pb,
  hollow: gb,
  stepBody: yb,
  stepDetail: Nb,
  publish: kb,
  reason: $b,
  note: Cb,
  reveal: Sb
}, Ft = {
  passed: { role: "done", label: "Passed" },
  failed: { role: "failed", label: "Failed" },
  running: { role: "running", label: "Running" },
  notRun: { role: "pending", label: "Not run" }
}, Rb = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Tb = { ok: "greenFill", finding: "orangeFill", action: "blue" }, xb = { notSimulated: "not simulated", running: "running" };
function Lb(e) {
  return e.presentation === "foundry";
}
function Ab(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const n = a.filter((r) => !r.met);
  return n.length > 0 ? `Publish is disabled: ${n.length} of ${a.length} gate conditions unmet: ${n[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Eb(e, a) {
  var r;
  const n = Rb[e.status];
  return n !== void 0 ? n : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Ib(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Mb(e, a) {
  if (a.length > 0 && !e.steps.some((n) => n.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Bb(e) {
  if (Ib(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Pb(e) {
  const [a, n] = p(!1);
  C(() => n(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ t("li", { className: `${k.step} ${k.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function qb(e) {
  const a = xb[e.kind];
  return a !== void 0 ? /* @__PURE__ */ t("span", { className: k.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ t(He, { size: 6, kind: Tb[e.kind], label: e.kind });
}
function Ob(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: k.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function jb(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Db(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Pb, { kind: a.kind, children: [
    /* @__PURE__ */ t(qb, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: k.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ t("span", { className: k.stepTitle, children: a.title }),
      /* @__PURE__ */ t(Ob, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ t(jb, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Hb(e, a) {
  const n = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && n.push(de(a)), n.join(" · ");
}
function zn(e) {
  const a = N();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${k.trace} ${k.section}`, children: [
    /* @__PURE__ */ t("p", { className: k.traceHead, id: a, children: Hb(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ t("ol", { className: k.steps, "aria-labelledby": a, children: e.steps.map((n, r) => /* @__PURE__ */ t(Db, { ...e, step: n }, n.title + String(r))) })
  ] });
}
function Fb(e) {
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
function Wb(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ue(e.sample.replayedFrom);
  return /* @__PURE__ */ t("p", { className: `${k.sampleMeta} ${k.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function zb(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : le(e.run.cost), label: "Cost" }, { value: e.run.turns ? en(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(qa, { divided: !0, cells: a }) });
}
function Kb(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: le(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: en(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Gb(e) {
  const a = Kb(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: k.section, children: [
    /* @__PURE__ */ t("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ t("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ t("div", { className: k.sectionFlush, children: /* @__PURE__ */ t(qa, { divided: !0, cells: a }) });
}
function Kn(e) {
  const a = N();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("p", { className: `${k.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ t(b, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Ub(e) {
  return /* @__PURE__ */ o("div", { className: `${k.publish} ${k.section}`, children: [
    /* @__PURE__ */ t(Kn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ t("p", { className: k.note, children: e.note })
  ] });
}
function Vb(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ t("div", { className: `${k.publish} ${k.section}`, children: /* @__PURE__ */ t(Kn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Gn(e) {
  return /* @__PURE__ */ o("div", { className: `${k.head} ${k.section}`, children: [
    e.foundry && /* @__PURE__ */ t("span", { className: k.headLabel, children: "Dry run" }),
    /* @__PURE__ */ t(m, { role: Ft[e.run.status].role, label: Ft[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ t(Le, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Yb(e, a) {
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
function Jb(e) {
  var n;
  Mb(e.run, e.checklist);
  const a = ((n = e.feed) == null ? void 0 : n.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Gn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ t(Fb, { sample: e.run.sample }),
    /* @__PURE__ */ t(zn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ t(zb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist }) }),
    /* @__PURE__ */ t(Ub, { reason: Ab(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Xb(e) {
  var r;
  const a = Yb(e.run, e.feed);
  Bb(e.run);
  const n = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${k.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ t(Gn, { run: e.run, foundry: !0, connection: n }),
    /* @__PURE__ */ t(Wb, { sample: e.run.sample }),
    /* @__PURE__ */ t(zn, { run: e.run, steps: a, connection: n, foundry: !0 }),
    /* @__PURE__ */ t(Gb, { run: e.run }),
    /* @__PURE__ */ t("div", { className: k.section, children: /* @__PURE__ */ t(Da, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ t(Vb, { reason: Eb(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function h2(e) {
  return Lb(e) ? /* @__PURE__ */ t(Xb, { ...e }) : /* @__PURE__ */ t(Jb, { ...e });
}
const Qb = "_list_142ip_3", Zb = "_row_142ip_9", ep = "_condition_142ip_18", ap = "_action_142ip_24", ga = {
  list: Qb,
  row: Zb,
  condition: ep,
  action: ap
}, Un = ye(!1);
function m2({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ t(Un.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: ga.list, "aria-label": a, children: e }) });
}
function w2({ rule: e }) {
  if (!ge(Un)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: ga.row, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: ga.condition, children: e.when }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: ga.action, children: e.then })
  ] });
}
const tp = "_move_tmppt_3", np = {
  move: tp
};
function Qa(e, a, n) {
  if (n < 0 || n >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(n, 0, l), r;
}
function Vn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Yn(e, a, n) {
  return `${e} moved to position ${a + 1} of ${n}.`;
}
function Wt(e, a, n) {
  return e.querySelector(`[data-move="${a}-${n}"]`);
}
function rp(e) {
  return e === "up" ? "down" : "up";
}
function lp(e, a) {
  const n = Wt(e, a.id, a.direction) ?? Wt(e, a.id, rp(a.direction));
  n == null || n.focus();
}
function Jn() {
  const e = _(null), [a, n] = p(null), [r, l] = p("");
  return C(() => {
    e.current !== null && a !== null && lp(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    n(s), l(c);
  } };
}
function Xn({ text: e }) {
  return /* @__PURE__ */ t("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function Ra({ id: e, name: a, direction: n, onMove: r }) {
  return /* @__PURE__ */ t("button", { type: "button", className: `${np.move} ward-btn ward-btn--sm ward-btn--ghost`, "data-move": `${e}-${n}`, "aria-label": `Move ${a} ${n}`, onClick: r, children: /* @__PURE__ */ t("span", { "aria-hidden": "true", children: n === "up" ? "↑" : "↓" }) });
}
const op = "_body_1jd1i_2", ip = "_title_1jd1i_8", sp = "_section_1jd1i_13", cp = "_legend_1jd1i_18", dp = "_stages_1jd1i_26", up = "_stage_1jd1i_26", hp = "_stageIndex_1jd1i_44", mp = "_stageName_1jd1i_50", wp = "_footer_1jd1i_59", fp = "_note_1jd1i_66", _p = "_reason_1jd1i_71", vp = "_actions_1jd1i_76", bp = "_webHead_1jd1i_83", pp = "_kicker_1jd1i_92", gp = "_webTitle_1jd1i_99", yp = "_webBody_1jd1i_105", Np = "_webSection_1jd1i_109", kp = "_sectionHead_1jd1i_121", $p = "_sectionNote_1jd1i_129", Cp = "_formLabel_1jd1i_134", Sp = "_identityRow_1jd1i_139", Rp = "_nameCell_1jd1i_145", Tp = "_keyCell_1jd1i_150", xp = "_colourCell_1jd1i_154", Lp = "_colourStatus_1jd1i_161", Ap = "_webStages_1jd1i_166", Ep = "_webStageList_1jd1i_172", Ip = "_webStage_1jd1i_166", Mp = "_webIndex_1jd1i_191", Bp = "_webStageName_1jd1i_196", Pp = "_webMoves_1jd1i_201", qp = "_addStage_1jd1i_215", Op = "_addStageButton_1jd1i_223", jp = "_addStageNote_1jd1i_231", Dp = "_webFooter_1jd1i_236", Hp = "_webFooterNotes_1jd1i_244", Fp = "_webNote_1jd1i_251", v = {
  body: op,
  title: ip,
  section: sp,
  legend: cp,
  stages: dp,
  stage: up,
  stageIndex: hp,
  stageName: mp,
  footer: wp,
  note: fp,
  reason: _p,
  actions: vp,
  webHead: bp,
  kicker: pp,
  webTitle: gp,
  webBody: yp,
  webSection: Np,
  sectionHead: kp,
  sectionNote: $p,
  formLabel: Cp,
  identityRow: Sp,
  nameCell: Rp,
  keyCell: Tp,
  colourCell: xp,
  colourStatus: Lp,
  webStages: Ap,
  webStageList: Ep,
  webStage: Ip,
  webIndex: Mp,
  webStageName: Bp,
  webMoves: Pp,
  addStage: qp,
  addStageButton: Op,
  addStageNote: jp,
  webFooter: Dp,
  webFooterNotes: Hp,
  webNote: Fp
}, Wp = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Qn = "not in catalogue";
function zp(e, a) {
  const n = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? n : [{ value: a, label: `${a || "(unnamed)"} · ${Qn}` }, ...n];
}
function Kp({ stage: e, index: a, catalogue: n, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!n) return /* @__PURE__ */ t(M, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = n.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Qn}`;
  return /* @__PURE__ */ t(M, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: zp(n, e.name), invalid: i, onChange: r });
}
function Zn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Gp(e) {
  const a = _([]), n = _(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${n.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Up({ id: e, stage: a, index: n, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = Zn(a, n), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${v.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: v.webIndex, "aria-hidden": "true", children: String(n + 1) }),
    /* @__PURE__ */ t("div", { className: v.webStageName, children: /* @__PURE__ */ t(Kp, { stage: a, index: n, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ t(M, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${n + 1} kind`, value: a.kind, options: Wp, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: v.webMoves, children: [
      n > 0 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      n < r - 1 && /* @__PURE__ */ t(Ra, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function Vp({ stages: e, onChange: a, catalogue: n }) {
  const r = Gp(e.length), l = Jn(), i = (c, d) => {
    const u = Vn(c, d);
    r.current = Qa(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Yn(Zn(e[c], c), u, e.length)), a(Qa(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: v.webStages, children: [
    /* @__PURE__ */ t("ol", { ref: l.root, className: v.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ t(Up, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: n, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ t(Xn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: v.addStage, children: [
      /* @__PURE__ */ t("button", { type: "button", className: v.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ t("span", { className: v.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Yp = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Jp = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Xp = "A new stream starts as a draft. Nothing runs on it until you publish it.", Qp = "Create is disabled: name the stream and give it a key first.", Zp = "reorder with the ↑ ↓ buttons · min 2";
function dt(e, a) {
  return !e.reserved && ca(e.step) && a[e.step] === void 0;
}
function eg(e, a) {
  const n = e.find((r) => dt(r, a));
  return n ? n.step : 1;
}
function ag({ stages: e, onMove: a }) {
  const n = Jn(), r = (l, i) => {
    const s = Vn(l, i);
    n.moved({ id: e[l].id, direction: i }, Yn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("ol", { ref: n.root, className: v.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: v.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ t("span", { className: v.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: v.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ t(m, { role: "gate", label: "Gate" }),
      i > 0 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ t(Ra, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ t(Xn, { text: n.announcement })
  ] });
}
function tg({ reason: e, onCreate: a, onDraft: n }) {
  const r = N();
  return /* @__PURE__ */ o("div", { className: v.footer, children: [
    /* @__PURE__ */ t("p", { className: v.note, children: Xp }),
    e && /* @__PURE__ */ t("p", { className: v.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: v.actions, children: [
      /* @__PURE__ */ t(b, { variant: "secondary", onClick: n, children: "Save draft" }),
      e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function ng(e, a) {
  return e !== "" && a !== "" ? null : Qp;
}
function rg(e) {
  const { owners: a, ladder: n, takenBy: r = {}, policies: l = Jp, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = N(), [h, w] = p(""), [f, y] = p(""), [E, P] = p(a[0].value), [te, Ne] = p(() => eg(n, r)), [ne, Ee] = p(e.stages ?? Yp), [Ve, T] = p(l[0].value), U = { name: h, key: f, streamStep: te, owner: E, stages: ne, policy: Ve }, ke = ng(h, f);
  return /* @__PURE__ */ t(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: v.body, children: [
    /* @__PURE__ */ t("h2", { className: v.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Identity" }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Stream name", value: h, onChange: w }),
      /* @__PURE__ */ t(M, { kind: "input", label: "Key", value: f, onChange: y, mono: !0 }),
      /* @__PURE__ */ t(M, { kind: "select", label: "Owner", value: E, onChange: P, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Colour" }),
      /* @__PURE__ */ t(Wn, { label: "Stream colour", steps: n, value: te, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: v.section, children: [
      /* @__PURE__ */ t("legend", { className: v.legend, children: "Stages" }),
      /* @__PURE__ */ t(ag, { stages: ne, onMove: (Fe, Cr) => Ee(Qa(ne, Fe, Cr)) })
    ] }),
    /* @__PURE__ */ t(En, { legend: "Loop policy", options: l, value: Ve, onChange: T }),
    /* @__PURE__ */ t(tg, { reason: ke, onCreate: () => i(U), onDraft: () => s(U) })
  ] }) });
}
const er = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], lg = "A stream can't be created without a name, a key, one named owner and at least two named stages.";
function og(e, a, n, r, l, i) {
  var c;
  const s = ((c = er.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: n, colourStep: r, writePolicyMode: s, stages: i };
}
function ig(e, a) {
  return sg(e) && cg(e, a) && dg(e);
}
function sg(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function cg(e, a) {
  return e.colourStep === null || dt({ step: e.colourStep }, a);
}
function dg(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function ug(e, a) {
  return e === null ? "Colour: none picked. You can set one later on the stream's Identity tab." : dt({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function hg({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: v.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ t("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ t("p", { className: v.webNote, children: "Add a stage an agent can run on." });
}
function mg({ ready: e, draft: a, agentStage: n, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: v.webFooter, children: [
    /* @__PURE__ */ o("div", { className: v.webFooterNotes, children: [
      /* @__PURE__ */ t(hg, { stage: n }),
      !e && /* @__PURE__ */ t("p", { id: i, className: v.reason, children: lg })
    ] }),
    l && /* @__PURE__ */ t(b, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function wg({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: v.webHead, children: [
    /* @__PURE__ */ t("span", { className: v.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ t("h2", { id: e, className: v.webTitle, children: "New stream" })
  ] });
}
function fg({ name: e, setName: a, streamKey: n, setKey: r, colour: l, owner: i }) {
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
function _g(e) {
  const a = N(), n = N(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, w] = p(null), [f, y] = p("relay"), [E, P] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), te = og(l, s, d, h, f, E), Ne = ig(te, r), ne = E.find((T) => T.kind === "agent" && T.name.trim() !== ""), Ee = /* @__PURE__ */ o("div", { className: v.colourCell, children: [
    /* @__PURE__ */ t("span", { className: v.formLabel, children: "Colour" }),
    /* @__PURE__ */ t(Wn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: w, takenBy: r })
  ] }), Ve = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t("p", { className: v.colourStatus, "data-colour-status": "", children: ug(h, r) }),
    /* @__PURE__ */ t(M, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((T) => ({ value: T, label: T })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: n, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ t(wg, { titleId: n }),
    /* @__PURE__ */ o("div", { className: v.webBody, children: [
      /* @__PURE__ */ t(fg, { name: l, setName: i, streamKey: s, setKey: c, colour: Ee, owner: Ve }),
      /* @__PURE__ */ o("section", { className: v.webSection, children: [
        /* @__PURE__ */ o("div", { className: v.sectionHead, children: [
          /* @__PURE__ */ t("h3", { className: v.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ t("span", { className: v.sectionNote, children: Zp })
        ] }),
        /* @__PURE__ */ t(Vp, { stages: E, onChange: P })
      ] }),
      /* @__PURE__ */ t("section", { className: v.webSection, children: /* @__PURE__ */ t(En, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: f, options: er, onChange: y }) }),
      /* @__PURE__ */ t(mg, { ready: Ne, draft: te, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function f2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(_g, { ...e }) : /* @__PURE__ */ t(rg, { ...e });
}
const vg = "_row_bs8hc_2", bg = "_cell_bs8hc_6", pg = "_condition_bs8hc_11", gg = "_action_bs8hc_18", yg = "_contract_bs8hc_24", Ng = "_contractCondition_bs8hc_33", kg = "_contractAction_bs8hc_39", Z = {
  row: vg,
  cell: bg,
  condition: pg,
  action: gg,
  contract: yg,
  contractCondition: Ng,
  contractAction: kg
}, ar = ["advance", "block", "escalate", "requestReview"], zt = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function Ta(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ut(e, a, n, r) {
  return n || !a ? /* @__PURE__ */ t("span", { className: Z.action, children: zt[e.then] }) : /* @__PURE__ */ t(
    M,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: ar.map((l) => ({ value: l, label: zt[l] }))
    }
  );
}
function $g({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "When" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t("span", { className: Z.condition, title: Ta(e, r), children: Ta(e, r) }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: /* @__PURE__ */ t(m, { role: "system", label: "Then" }) }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ut(e, a, n) })
  ] });
}
function Cg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Z.row, children: [
    /* @__PURE__ */ o("td", { className: Z.cell, children: [
      /* @__PURE__ */ t(m, { role: "system", label: "When" }),
      /* @__PURE__ */ t("span", { className: Z.condition, children: Ta(e, r) })
    ] }),
    /* @__PURE__ */ t("td", { className: Z.cell, children: ut(e, a, n) })
  ] });
}
function Sg({ rule: e, onChange: a, readOnly: n, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Z.contract, children: [
    /* @__PURE__ */ t(m, { role: "system", label: "When" }),
    /* @__PURE__ */ t("span", { className: Z.contractCondition, children: Ta(e, r) }),
    /* @__PURE__ */ t(m, { role: "meta", label: "Then" }),
    /* @__PURE__ */ t("span", { className: Z.contractAction, children: ut(e, a, n, !0) })
  ] });
}
const Rg = { two: Cg, four: $g, contract: Sg };
function _2(e) {
  var n;
  if (!ar.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Rg[((n = e.presentation) == null ? void 0 : n.cellLayout) ?? "two"];
  return /* @__PURE__ */ t(a, { ...e });
}
const Tg = "_column_g1uat_2", xg = "_head_g1uat_17", Lg = "_index_g1uat_23", Ag = "_name_g1uat_29", Eg = "_meta_g1uat_38", Ig = "_mono_g1uat_43", Mg = "_gate_g1uat_50", Bg = "_reviewersLabel_g1uat_57", Pg = "_reviewers_g1uat_57", qg = "_reviewer_g1uat_57", Og = "_agents_g1uat_74", jg = "_workflowColumn_g1uat_79", Dg = "_workflowHead_g1uat_96", Hg = "_stageRow_g1uat_102", Fg = "_stageLabel_g1uat_109", Wg = "_workflowTitle_g1uat_116", zg = "_workflowMeta_g1uat_122", Kg = "_workflowGate_g1uat_127", Gg = "_gateNote_g1uat_135", Ug = "_cardNote_g1uat_140", Vg = "_reviewerList_g1uat_145", Yg = "_reviewerRow_g1uat_151", Jg = "_reviewerMark_g1uat_157", Xg = "_reviewerName_g1uat_167", Qg = "_terminalCard_g1uat_173", Zg = "_terminalCount_g1uat_182", ey = "_workflowAgents_g1uat_188", ay = "_mount_g1uat_194", S = {
  column: Tg,
  head: xg,
  index: Lg,
  name: Ag,
  meta: Eg,
  mono: Ig,
  gate: Mg,
  reviewersLabel: Bg,
  reviewers: Pg,
  reviewer: qg,
  agents: Og,
  workflowColumn: jg,
  workflowHead: Dg,
  stageRow: Hg,
  stageLabel: Fg,
  workflowTitle: Wg,
  workflowMeta: zg,
  workflowGate: Kg,
  gateNote: Gg,
  cardNote: Ug,
  reviewerList: Vg,
  reviewerRow: Yg,
  reviewerMark: Jg,
  reviewerName: Xg,
  terminalCard: Qg,
  terminalCount: Zg,
  workflowAgents: ey,
  mount: ay
}, ty = { entry: "Entry", agent: "Agent", gate: "Gate", terminal: "Terminal" };
function ht(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function tr(e) {
  return `${Math.round(e * 100)}%`;
}
function ny({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ t("p", { className: S.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ t("ul", { className: S.reviewers, children: a.map((n) => /* @__PURE__ */ t("li", { className: S.reviewer, children: n }, n)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ t(qa, { cells: [
      { value: tr(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function ry({ stage: e }) {
  return /* @__PURE__ */ t(qa, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: ht(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function ly({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: S.head, children: [
    /* @__PURE__ */ t("span", { className: S.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ t("h3", { className: S.name, id: a, children: e.name }),
    /* @__PURE__ */ t(m, { role: e.kind === "gate" ? "gate" : "soft", label: ty[e.kind] })
  ] });
}
function oy({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: S.meta, children: [
    /* @__PURE__ */ o("span", { className: S.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: S.mono, children: [
      de(e.medianWait),
      " median wait"
    ] })
  ] });
}
function iy({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ t(ny, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ t(ry, { stage: e }) : null;
}
function sy({ onMount: e }) {
  return e ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function cy({ stage: e, agents: a = [], onMount: n, feed: r }) {
  const l = N(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: S.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(ly, { stage: e, titleId: l }),
    /* @__PURE__ */ t(oy, { stage: e }),
    /* @__PURE__ */ t(iy, { stage: e }),
    /* @__PURE__ */ t("div", { className: S.agents, children: a.map((s) => /* @__PURE__ */ t(mv, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ t(sy, { onMount: n })
  ] });
}
const dy = {
  gate: { role: "gate", label: "Human gate" },
  terminal: { role: "quiet", label: "Terminal" }
};
function uy({ reviewers: e }) {
  return /* @__PURE__ */ t("ul", { className: S.reviewerList, children: e.map((a, n) => /* @__PURE__ */ o("li", { className: S.reviewerRow, children: [
    /* @__PURE__ */ t("span", { className: S.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ t("span", { className: S.reviewerName, children: a.name })
  ] }, `${n}-${a.name}`)) });
}
function hy({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: S.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: S.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ t(uy, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: S.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ t("span", { children: tr(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function my(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function wy({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: S.terminalCard, children: [
    /* @__PURE__ */ t("span", { className: S.terminalCount, children: ht(e.closedThisWeek) }),
    /* @__PURE__ */ t("span", { className: S.cardNote, children: my(e.rolledBackThisWeek) })
  ] });
}
function fy(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function _y(e) {
  if (e.kind === "terminal") return `${ht(e.closedThisWeek)} this week`;
  const a = fy(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function vy({ stage: e, titleId: a }) {
  const n = dy[e.kind];
  return /* @__PURE__ */ o("header", { className: S.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: S.stageRow, children: [
      /* @__PURE__ */ o("span", { className: S.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      n === void 0 ? null : /* @__PURE__ */ t(m, { ...n, size: "tag" })
    ] }),
    /* @__PURE__ */ t("h3", { id: a, className: S.workflowTitle, children: e.name }),
    /* @__PURE__ */ t("span", { className: S.workflowMeta, children: _y(e) })
  ] });
}
function by(e) {
  return e === "entry" || e === "agent";
}
function py({ stage: e, onMount: a }) {
  return a === void 0 || !by(e.kind) ? null : /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", className: S.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function gy({ stage: e, agentCards: a, onMount: n }) {
  const r = N();
  return /* @__PURE__ */ o("section", { className: S.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ t(vy, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ t(hy, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ t(wy, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: S.workflowAgents, children: a }),
    /* @__PURE__ */ t(py, { stage: e, onMount: n })
  ] });
}
function yy(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function v2(e) {
  return yy(e) ? /* @__PURE__ */ t(gy, { ...e }) : /* @__PURE__ */ t(cy, { ...e });
}
const Ny = "_row_1tdra_6", ky = "_name_1tdra_12", $y = "_compactRow_1tdra_13", Cy = "_compactName_1tdra_13", Sy = "_cell_1tdra_30", Ry = "_chain_1tdra_45", Ty = "_owner_1tdra_51", xy = "_mono_1tdra_57", Ly = "_compactCell_1tdra_79", Ay = "_stack_1tdra_96", Ey = "_stat_1tdra_103", Iy = "_identityLine_1tdra_110", My = "_identity_1tdra_110", By = "_ownerLine_1tdra_140", Py = "_link_1tdra_160", qy = "_gateMark_1tdra_166", Oy = "_emptyChain_1tdra_171", jy = "_arrow_1tdra_177", Dy = "_muted_1tdra_182", Hy = "_define_1tdra_187", Fy = "_statValue_1tdra_194", Wy = "_policyId_1tdra_200", zy = "_sub_1tdra_205", g = {
  row: Ny,
  name: ky,
  compactRow: $y,
  compactName: Cy,
  cell: Sy,
  chain: Ry,
  owner: Ty,
  mono: xy,
  compactCell: Ly,
  stack: Ay,
  stat: Ey,
  identityLine: Iy,
  identity: My,
  ownerLine: By,
  link: Py,
  gateMark: qy,
  emptyChain: Oy,
  arrow: jy,
  muted: Dy,
  define: Hy,
  statValue: Fy,
  policyId: Wy,
  sub: zy
};
function nr(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: n, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Ky(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Gy(e) {
  return e === void 0 ? g.compactRow : `${g.compactRow} ${e}`;
}
function rr(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function Uy(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${rr(e.members)}`;
}
function Vy(e, a) {
  const n = e.draft === !0;
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: /* @__PURE__ */ o("span", { className: g.stack, children: [
    /* @__PURE__ */ o("span", { className: g.identityLine, children: [
      /* @__PURE__ */ t("span", { className: `${g.identity} ward-identity`, "data-draft": n, "aria-hidden": "true" }),
      /* @__PURE__ */ t("a", { className: `${g.compactName} ward-rowlink ward-target`, href: H(a), "data-draft": n, children: e.name }),
      /* @__PURE__ */ t(m, { role: "meta", size: "tag", label: n ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ t("span", { className: g.ownerLine, children: Uy(e) })
  ] }) });
}
function lr({ name: e, gate: a, look: n, size: r }) {
  return /* @__PURE__ */ o(R, { children: [
    a ? /* @__PURE__ */ t("span", { className: g.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ t(m, { ...n, size: r, label: e }),
    a ? /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function Yy(e, a, n) {
  if (e !== a) return { role: "soft" };
  const r = ha(n);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function Jy({ stages: e, streamStep: a }) {
  const n = e.findIndex((l) => l.gate === !0), r = e.length - 1;
  return /* @__PURE__ */ t("span", { className: `${g.chain} ward-chiprow`, children: e.map((l, i) => /* @__PURE__ */ o("span", { className: g.link, children: [
    /* @__PURE__ */ t(lr, { name: l.name, gate: l.gate === !0, look: Yy(i, n, a), size: "tag" }),
    i === r ? null : /* @__PURE__ */ t("span", { className: g.arrow, "aria-hidden": "true", children: "→" })
  ] }, `${l.name}${i}`)) });
}
function Xy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: g.emptyChain, children: [
    /* @__PURE__ */ t("span", { className: g.muted, children: "No stages yet" }),
    /* @__PURE__ */ t("span", { className: g.define, children: "Define workflow" })
  ] }) : Jy(e) });
}
function or(e) {
  return e === void 0 ? void 0 : !0;
}
function Kt(e, a, n, r) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: n }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: `${g.statValue} ward-stat-value`, title: r, "data-raised": or(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ t("span", { className: g.sub, children: a })
  ] }) });
}
function Qy(e) {
  return /* @__PURE__ */ t("td", { className: g.compactCell, children: e === void 0 ? /* @__PURE__ */ t("span", { className: g.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: g.stat, children: [
    /* @__PURE__ */ t("span", { className: g.policyId, children: e.id }),
    /* @__PURE__ */ t("span", { className: g.sub, children: e.summary })
  ] }) });
}
function Zy(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function eN({ stream: e, href: a, presentation: n }) {
  const r = Gy(n.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: nr, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": pe(e.streamStep, "chip") }, children: [
    Vy(e, a),
    Xy(e),
    Kt(Zy(e.agents), e.agents === void 0 ? void 0 : Ky(e.agents), "—"),
    Qy(e.policy),
    Kt(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function aN(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function b2(e) {
  if (aN(e)) return eN(e);
  const { stream: a, href: n } = e;
  return /* @__PURE__ */ o("tr", { className: g.row, onClick: nr, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: g.cell, children: [
      /* @__PURE__ */ t("a", { className: `${g.name} ward-target`, href: H(n), children: a.name }),
      /* @__PURE__ */ t(m, { ...Pa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ t(m, { role: "running", label: "Draft" })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, children: /* @__PURE__ */ t("span", { className: g.chain, children: a.stages.map((r) => /* @__PURE__ */ t("span", { className: g.link, children: /* @__PURE__ */ t(lr, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ t("span", { className: g.mono, children: rr(a.members) })
    ] }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, title: a.inFlightHint, "data-raised": or(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ t("td", { className: g.cell, "data-align": "end", children: /* @__PURE__ */ t("span", { className: g.mono, children: a.p50 === void 0 ? "" : de(a.p50) }) })
  ] });
}
const tN = "_row_2u4ll_2", nN = "_name_2u4ll_16", rN = "_scope_2u4ll_24", xa = {
  row: tN,
  name: nN,
  scope: rN
};
function mt(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function lN(e) {
  return e === void 0 ? `${xa.row} ward-toolrow` : `${xa.row} ward-toolrow ${e}`;
}
function oN(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function iN({ id: e, reasonId: a, tool: n, state: r, onChange: l }) {
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
function sN({ classification: e }) {
  return /* @__PURE__ */ t(m, { role: e === "write" ? "write" : "meta", label: mt(e) });
}
function cN({ tool: e, state: a, reasonId: n }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ t("span", { id: a.locked ? n : void 0, className: `${xa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function dN(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function p2({ tool: e, onChange: a, presentation: n }) {
  const r = N(), l = N(), i = oN(e, n), s = dN(n);
  return /* @__PURE__ */ o(s, { className: lN(n == null ? void 0 : n.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ t(iN, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ t("label", { htmlFor: r, className: `${xa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ t(cN, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ t(sN, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ t(m, { role: "meta", label: "Locked" }) : null
  ] });
}
const uN = "_strip_4ppv9_2", hN = "_well_4ppv9_11", mN = "_head_4ppv9_18", wN = "_name_4ppv9_24", fN = "_chart_4ppv9_32", _N = "_segment_4ppv9_38", vN = "_detailedChart_4ppv9_44", bN = "_rail_4ppv9_57", pN = "_section_4ppv9_63", gN = "_label_4ppv9_74", yN = "_note_4ppv9_91", G = {
  strip: uN,
  well: hN,
  head: mN,
  name: wN,
  chart: fN,
  segment: _N,
  detailedChart: vN,
  rail: bN,
  section: pN,
  label: gN,
  note: yN
}, NN = "No item in flight to preview.", kN = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", $N = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Za = [1, 2, 3, 4, 5, 6], La = 100;
function CN(e, a) {
  return a.has(e) ? pe(e, "id") : "var(--ward-color-line)";
}
function SN({ draft: e, streams: a }) {
  const n = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ t("svg", { className: G.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Za.map((r, l) => /* @__PURE__ */ t(
    "rect",
    {
      className: G.segment,
      x: l * La,
      y: "0",
      width: La,
      height: "8",
      fill: CN(r, n),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function RN(e) {
  const a = e.slice(0, Za.length);
  for (; a.length < Za.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function TN({ identities: e }) {
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
function ir(e) {
  return (a) => e == null ? void 0 : e(a);
}
function _a({ label: e, children: a }) {
  const n = N();
  return /* @__PURE__ */ o("section", { className: G.section, "aria-labelledby": n, children: [
    /* @__PURE__ */ t("h4", { id: n, className: G.label, children: e }),
    a
  ] });
}
function xN({ sample: e, sampleEmpty: a, draft: n, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ t("p", { className: G.note, children: a ?? NN }) : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...e, streamStep: ha(n.streamStep) }, onOpen: ir(r), feed: null }) });
}
function LN({ draft: e }) {
  const a = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: G.head, style: a, children: [
    /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
    /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
    /* @__PURE__ */ t(m, { ...Pa(e.key, e.streamStep) })
  ] });
}
function AN(e) {
  const a = RN(e.identities ?? [e.draft, ...e.streams]), n = a[0];
  return /* @__PURE__ */ o("div", { className: G.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ t(_a, { label: "Board card", children: /* @__PURE__ */ t(xN, { ...e, draft: n }) }),
    /* @__PURE__ */ t(_a, { label: "Streams index row", children: /* @__PURE__ */ t(LN, { draft: n }) }),
    /* @__PURE__ */ o(_a, { label: "Overview chart segment", children: [
      /* @__PURE__ */ t(TN, { identities: a }),
      /* @__PURE__ */ t("p", { className: G.note, children: kN })
    ] }),
    /* @__PURE__ */ t(_a, { label: "Not themeable", children: /* @__PURE__ */ t("p", { className: G.note, children: $N }) })
  ] });
}
function EN({ draft: e, sample: a, streams: n, onOpen: r }) {
  const l = { "--stream": pe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: G.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: G.head, children: [
      /* @__PURE__ */ t(He, { size: 8, kind: "stream" }),
      /* @__PURE__ */ t("span", { className: G.name, children: e.name }),
      /* @__PURE__ */ t(m, { ...Pa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ t("div", { className: G.well, children: /* @__PURE__ */ t(ja, { item: { ...a, streamStep: e.streamStep }, onOpen: ir(r) }) }),
    /* @__PURE__ */ t(SN, { draft: e, streams: n })
  ] });
}
function g2(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ t(AN, { ...e }) : /* @__PURE__ */ t(EN, { ...e });
}
const IN = "_row_ixlg5_6", MN = "_headCell_ixlg5_10", BN = "_cell_ixlg5_11", PN = "_name_ixlg5_23", qN = "_consequence_ixlg5_29", ON = "_governed_ixlg5_36", jN = "_control_ixlg5_42", DN = "_byRole_ixlg5_48", HN = "_webControl_ixlg5_59", FN = "_webConsequence_ixlg5_65", WN = "_webGoverned_ixlg5_71", D = {
  row: IN,
  headCell: MN,
  cell: BN,
  name: PN,
  consequence: qN,
  governed: ON,
  control: jN,
  byRole: DN,
  webControl: HN,
  webConsequence: FN,
  webGoverned: WN
};
function zN({
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
    a.value === "pilot" && /* @__PURE__ */ t(m, { role: "running", label: "Pilot" })
  ] });
}
function KN({ capability: e, cells: a, onChange: n }) {
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
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(zN, { capability: e, cell: r, onChange: n }) }, r.streamStep))
  ] });
}
function GN(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function UN({ name: e, cell: a, onChange: n }) {
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
    /* @__PURE__ */ t(m, { role: "running", label: "Pilot" }),
    r
  ] });
}
function VN({ capability: e, cells: a, onChange: n }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ t("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ t("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t(UN, { name: e.name, cell: r, onChange: n }) }, String(r.streamStep))),
    /* @__PURE__ */ t("td", { className: D.cell, children: /* @__PURE__ */ t("span", { className: `${D.webGoverned} ward-cellmeta`, children: GN(e) }) })
  ] });
}
function y2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(VN, { ...e }) : /* @__PURE__ */ t(KN, { ...e });
}
const YN = "_row_vv64h_2", JN = "_cell_vv64h_6", XN = "_name_vv64h_25", QN = "_note_vv64h_30", ZN = "_webName_vv64h_41", e1 = "_webMeta_vv64h_47", Y = {
  row: YN,
  cell: JN,
  name: XN,
  note: QN,
  webName: ZN,
  webMeta: e1
}, sr = {
  ready: { role: "done", label: "Ready" },
  drainFirst: { role: "attention", label: "Drain first" },
  restartDue: { role: "failed", label: "Restart due" }
};
function a1(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function t1({ component: e, onRestart: a }) {
  const n = N(), r = sr[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: Y.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: Y.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { id: n, className: Y.note, children: e.note }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, "data-align": "end", children: l ? /* @__PURE__ */ t(b, { size: "sm", disabled: !0, describedBy: n, children: "Restart" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function n1({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: a1(e.state) });
}
function r1({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: Y.row, children: [
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t("span", { className: `${Y.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(m, { ...sr[e.state] }) }),
    /* @__PURE__ */ t("td", { className: Y.cell, children: /* @__PURE__ */ t(n1, { component: e, onRestart: a }) })
  ] });
}
function N2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(r1, { ...e }) : /* @__PURE__ */ t(t1, { ...e });
}
const l1 = "_row_jcm5k_7", o1 = "_cell_jcm5k_11", i1 = "_next_jcm5k_28", s1 = "_headCell_jcm5k_38", c1 = "_webId_jcm5k_77", d1 = "_webPurpose_jcm5k_83", u1 = "_webMeta_jcm5k_91", h1 = "_webUrgent_jcm5k_97", F = {
  row: l1,
  cell: o1,
  next: i1,
  headCell: s1,
  webId: c1,
  webPurpose: d1,
  webMeta: u1,
  webUrgent: h1
}, m1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP owned" }
}, w1 = {
  healthy: { role: "done", label: "Healthy" },
  rotateSoon: { role: "attention", label: "Rotate soon" },
  rotateNow: { role: "failed", label: "Rotate now" },
  idpOwned: { role: "meta", label: "IdP-owned" },
  configured: { role: "meta", label: "Configured" }
}, cr = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], f1 = Object.fromEntries(cr.map((e) => [e.key, e]));
function Je({ column: e, children: a }) {
  const n = f1[e];
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
function k2() {
  return /* @__PURE__ */ t("tr", { children: cr.map((e) => /* @__PURE__ */ t(
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
function _1({ cred: e }) {
  const a = m1[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t(Je, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ t(Je, { column: "id", children: e.id }),
    /* @__PURE__ */ t(Je, { column: "state", children: /* @__PURE__ */ t(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ t(Je, { column: "cls", children: /* @__PURE__ */ t(m, { role: e.cls === "write" ? "write" : "meta", label: mt(e.cls) }) }),
    /* @__PURE__ */ t(Je, { column: "tier", children: e.tier }),
    /* @__PURE__ */ t(Je, { column: "next", children: /* @__PURE__ */ t("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function v1({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ t("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-danger)" }, children: e.next });
}
function b1({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(v1, { cred: e }) }),
    /* @__PURE__ */ t("td", { className: F.cell, children: /* @__PURE__ */ t(m, { ...w1[e.state] }) })
  ] });
}
function $2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(b1, { ...e }) : /* @__PURE__ */ t(_1, { ...e });
}
const p1 = "_card_lpp45_2", g1 = "_head_lpp45_11", y1 = "_env_lpp45_18", N1 = "_version_lpp45_25", k1 = "_meta_lpp45_32", $1 = "_webCard_lpp45_37", C1 = "_webRow_lpp45_47", S1 = "_webTitle_lpp45_55", R1 = "_webLine_lpp45_65", T1 = "_webVersion_lpp45_72", x1 = "_webMeta_lpp45_77", V = {
  card: p1,
  head: g1,
  env: y1,
  version: N1,
  meta: k1,
  webCard: $1,
  webRow: C1,
  webTitle: S1,
  webLine: R1,
  webVersion: T1,
  webMeta: x1
}, Gt = { dev: "Dev", uat: "UAT", prod: "Prod" }, dr = {
  current: { role: "done", label: "Current" },
  soaking: { role: "running", label: "Soaking" },
  live: { role: "done", label: "Live" }
};
function L1({ env: e }) {
  const a = dr[e.state], n = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: V.card, "aria-label": Gt[e.env], children: [
    /* @__PURE__ */ o("div", { className: V.head, children: [
      /* @__PURE__ */ t("span", { className: V.env, children: Gt[e.env] }),
      /* @__PURE__ */ t(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ t("p", { className: V.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: V.meta, children: [
      "deployed ",
      ue(e.deployedAt)
    ] }),
    n && /* @__PURE__ */ t("p", { className: V.meta, children: n })
  ] });
}
function A1(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ue(e.deployedAt), a, e.ticket].filter((n) => n !== null).join(" · ");
}
function E1(e) {
  return /* @__PURE__ */ o("article", { className: `${V.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${V.webRow} ward-envrow`, children: [
      /* @__PURE__ */ t("span", { className: `${V.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ t(m, { ...dr[e.state] })
    ] }),
    /* @__PURE__ */ t("span", { className: `${V.version} ${V.webVersion} ${V.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ t("span", { className: `${V.meta} ${V.webMeta} ${V.webLine} ward-cellmeta`, children: A1(e) })
  ] });
}
function C2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(E1, { ...e }) : /* @__PURE__ */ t(L1, { ...e });
}
const I1 = "_panel_1hmja_2", M1 = "_line_1hmja_8", B1 = "_actions_1hmja_14", va = {
  panel: I1,
  line: M1,
  actions: B1
};
function S2(e) {
  return /* @__PURE__ */ o("div", { className: va.panel, children: [
    /* @__PURE__ */ t("p", { className: va.line, children: e.status }),
    /* @__PURE__ */ t(M, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ t("div", { className: va.actions, children: e.actions }),
    /* @__PURE__ */ t("p", { role: "status", className: va.line, children: e.note ?? "" })
  ] });
}
const P1 = "_upload_13fcl_2", q1 = "_preview_13fcl_7", O1 = "_mark_13fcl_17", j1 = "_empty_13fcl_22", D1 = "_actions_13fcl_28", H1 = "_input_13fcl_33", F1 = "_reasons_13fcl_41", W1 = "_reason_13fcl_41", z1 = "_accepted_13fcl_57", re = {
  upload: P1,
  preview: q1,
  mark: O1,
  empty: j1,
  actions: D1,
  input: H1,
  reasons: F1,
  reason: W1,
  accepted: z1
}, ur = 1.5, hr = 22, Aa = "script elements or event handlers", Pe = "links or external references", xe = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ur}px at ${hr}px`], K1 = [xe[1], xe[2], Aa, Pe], G1 = /* @__PURE__ */ new Map([
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
]), U1 = "http://www.w3.org/2000/svg", V1 = "http://www.w3.org/2000/xmlns/", Y1 = /* @__PURE__ */ new Set([
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
]), J1 = /* @__PURE__ */ new Set([
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
]), wt = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, X1 = /url\s*\(|['"\\]/i;
function Q1() {
  return { ok: !1, reasons: [xe[1]] };
}
function mr(e) {
  return e.namespaceURI === U1;
}
function Z1(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && mr(a) ? a : null;
  } catch {
    return null;
  }
}
function ek(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((n) => n.getAttribute("fill") ?? "").filter((n) => n !== "" && n !== "none")
  ).size > 1 ? [xe[0]] : [];
}
function ak(e) {
  return G1.get(e.localName) ?? (e.localName.startsWith("animate") ? Pe : void 0);
}
function tk(e) {
  return X1.test(e.replace(wt, ""));
}
function nk(e) {
  return /^on/i.test(e.localName) ? Aa : e.localName === "href" || tk(e.value) ? Pe : void 0;
}
function rk(e) {
  const a = /* @__PURE__ */ new Set();
  for (const n of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(ak(n));
    for (const r of Array.from(n.attributes)) a.add(nk(r));
  }
  return K1.filter((n) => a.has(n));
}
function lk(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), n = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = n > 0 ? hr / n : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ur;
  }) ? [xe[3]] : [];
}
function ok(e) {
  if (e.namespaceURI === V1) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (J1.has(a) || a.startsWith("stroke"));
}
function ik(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && mr(a) && Y1.has(a.localName);
}
function sk(e, a) {
  ik(a) ? a.nodeType === Node.ELEMENT_NODE && wr(a) : e.removeChild(a);
}
function wr(e) {
  for (const a of Array.from(e.attributes)) ok(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) sk(e, a);
  return e;
}
function ck(e) {
  return Array.from(e.matchAll(wt), (a) => a[2]).filter((a) => a !== "");
}
function dk(e) {
  let a = 2166136261;
  for (let n = 0; n < e.length; n += 1) a = Math.imul(a ^ e.charCodeAt(n), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function uk(e, a) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of ck(l.value)) n.has(i) || n.set(i, `${a}-${n.size}`);
  return n;
}
function hk(e, a) {
  for (const n of Array.from(e.attributes))
    n.value = n.value.replace(wt, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function mk(e, a) {
  const n = [e, ...Array.from(e.querySelectorAll("*"))], r = uk(n, a);
  for (const l of n) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), hk(l, r);
  }
  return e;
}
function R2(e) {
  const a = Z1(e);
  if (a === null) return Q1();
  const n = [...ek(a), ...rk(a), ...lk(a)];
  return n.length > 0 ? { ok: !1, reasons: n } : { ok: !0, svg: new XMLSerializer().serializeToString(mk(wr(a), dk(e))) };
}
const wk = "Mark accepted.", fk = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, _k = new Set(tn.flatMap((e) => [pe(e, "id"), pe(e, "chip")]));
function vk(e) {
  return e !== void 0 && (fk.test(e) || _k.has(e)) ? e : void 0;
}
function bk({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ t("div", { className: re.preview, style: { "--mark": vk(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ t("img", { className: re.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ t("span", { className: re.empty }) });
}
function pk(e, a) {
  const n = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[n];
}
function gk(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function yk({ result: e }) {
  return e === null ? /* @__PURE__ */ t("div", { className: re.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ t("div", { className: re.result, role: "status", children: /* @__PURE__ */ t("p", { className: re.accepted, children: wk }) }) : /* @__PURE__ */ t("div", { className: re.result, role: "status", children: /* @__PURE__ */ t("ul", { className: re.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ t("li", { className: re.reason, children: a }, a)) }) });
}
function Nk({ result: e, presentation: a }) {
  const n = a == null ? void 0 : a.status;
  return n === void 0 ? /* @__PURE__ */ t(yk, { result: e }) : /* @__PURE__ */ t("p", { className: `${re.result} ${pk(e, n)}`, role: "status", children: gk(e, n) });
}
function Ut(e) {
  return e === void 0 ? {} : { disabled: !0, disabledReason: e };
}
function T2({ current: e, onUpload: a, onUseInitials: n, presentation: r, disabledReason: l }) {
  const i = _(null), [s, c] = p(null), d = (u) => {
    if (u === void 0) return;
    const h = a(u);
    h instanceof Promise ? h.then(c) : c(h);
  };
  return /* @__PURE__ */ o("div", { className: re.upload, children: [
    /* @__PURE__ */ t(bk, { current: e }),
    /* @__PURE__ */ o("div", { className: re.actions, children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: i,
          className: re.input,
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
    /* @__PURE__ */ t(Nk, { result: s, presentation: r })
  ] });
}
const kk = "_row_o3t6y_7", $k = "_cell_o3t6y_11", Ck = "_head_o3t6y_28", Sk = "_name_o3t6y_34", Rk = "_pinned_o3t6y_42", Tk = "_headCell_o3t6y_49", xk = "_webName_o3t6y_88", Lk = "_webMeta_o3t6y_95", Ak = "_webWarn_o3t6y_103", q = {
  row: kk,
  cell: $k,
  head: Ck,
  name: Sk,
  pinned: Rk,
  headCell: Tk,
  webName: xk,
  webMeta: Lk,
  webWarn: Ak
}, ft = {
  healthy: { role: "done", label: "Healthy" },
  degraded: { role: "attention", label: "Degraded" },
  failed: { role: "failed", label: "Failed" },
  unknown: { role: "pending", label: "Unknown" }
}, fr = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ek = Object.fromEntries(fr.map((e) => [e.key, e]));
function Ik(e, a) {
  return `mcp.${e}.${a}`;
}
function Mk(e) {
  return Object.keys(ft).includes(e);
}
function Bk(e) {
  return ft[e !== void 0 && Mk(e) ? e : "unknown"];
}
function ra({ column: e, children: a }) {
  const n = Ek[e];
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
function x2() {
  return /* @__PURE__ */ t("tr", { children: fr.map((e) => /* @__PURE__ */ t(
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
function Pk({ server: e }) {
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
    /* @__PURE__ */ t(ra, { column: "tools", children: e.tools.map((n) => Ik(e.name, n)).join(" · ") })
  ] });
}
function qk(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Ok(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "Write class" } : { role: "meta", label: "Read only" };
}
function jk({ pinned: e }) {
  return e === null ? /* @__PURE__ */ t("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Dk({ server: e, onRestart: a }) {
  var n;
  return a === void 0 ? null : ((n = e.restart) == null ? void 0 : n.implemented) !== !0 ? /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ t(b, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Hk({ name: e, pinned: a, onPin: n }) {
  return a !== null || n === void 0 ? null : /* @__PURE__ */ t(b, { size: "sm", onClick: () => n(e), children: "Pin version" });
}
function Fk({ server: e, onRestart: a, onPin: n }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta`, children: qk(e) })
    ] }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(m, { ...Ok(e) }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(jk, { pinned: r }) }),
    /* @__PURE__ */ t("td", { className: q.cell, children: /* @__PURE__ */ t(m, { ...Bk(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ t(Dk, { server: e, onRestart: a }),
      /* @__PURE__ */ t(Hk, { name: e.name, pinned: r, onPin: n })
    ] })
  ] });
}
function L2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Fk, { ...e }) : /* @__PURE__ */ t(Pk, { ...e });
}
const Wk = "_row_1ibo7_2", zk = "_headCell_1ibo7_14", Kk = "_cell_1ibo7_15", Gk = "_name_1ibo7_26", Uk = "_consequence_1ibo7_32", Vk = "_reason_1ibo7_38", Yk = "_value_1ibo7_44", Jk = "_webRow_1ibo7_60", Xk = "_webSetting_1ibo7_73", Qk = "_webName_1ibo7_81", Zk = "_webConsequence_1ibo7_89", e$ = "_webControl_1ibo7_95", a$ = "_webState_1ibo7_109", t$ = "_webChip_1ibo7_114", I = {
  row: Wk,
  headCell: zk,
  cell: Kk,
  name: Gk,
  consequence: Uk,
  reason: Vk,
  value: Yk,
  webRow: Jk,
  webSetting: Xk,
  webName: Qk,
  webConsequence: Zk,
  webControl: e$,
  webState: a$,
  webChip: t$
}, _r = 104, vr = {
  inherited: { role: "meta", label: "Inherited" },
  overridden: { role: "running", label: "Overridden" },
  locked: { role: "meta", label: "Locked" },
  derived: { role: "soft", label: "Derived" }
};
function n$({ control: e, name: a, locked: n, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ t(Ue, { label: a, checked: e.checked, locked: n || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ t(Ln, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: n, describedBy: r }) : /* @__PURE__ */ t("span", { className: I.value, "data-locked": n ? !0 : void 0, children: e.text });
}
function r$({ setting: e, control: a, inheritance: n, reason: r }) {
  if (n === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = N(), i = vr[n], s = n === "locked";
  return /* @__PURE__ */ o("tr", { className: I.row, "data-inheritance": n, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: I.headCell, children: [
      /* @__PURE__ */ t("span", { className: I.name, children: e.name }),
      /* @__PURE__ */ t("span", { className: I.consequence, children: e.consequence }),
      r && /* @__PURE__ */ t("span", { id: l, className: I.reason, children: r })
    ] }),
    /* @__PURE__ */ t("td", { className: I.cell, children: /* @__PURE__ */ t(n$, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ t("td", { className: I.cell, style: { width: _r }, children: /* @__PURE__ */ t(m, { role: i.role, label: i.label }) })
  ] });
}
function br(e, a) {
  return String(e ?? a);
}
function l$(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function o$(e) {
  var n;
  const a = e.kind === "segment" ? (n = e.options) == null ? void 0 : n.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? br(e.value, "—");
}
function i$({ control: e, name: a, locked: n, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: I.webControl, children: [
    /* @__PURE__ */ t(Ue, { label: a, labelHidden: !0, checked: i, locked: n, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ t("span", { className: I.webState, "aria-hidden": "true", children: n || i ? "on" : "off" })
  ] });
}
function s$(e) {
  const { control: a, locked: n, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ t(i$, { ...e });
  const l = l$(a, n);
  return l !== void 0 ? /* @__PURE__ */ t("span", { className: I.webControl, "data-kind": "segment", children: /* @__PURE__ */ t(Ln, { options: l, value: br(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ t("span", { className: `${I.webControl} ${I.value} ward-envmeta`, "data-locked": n ? !0 : void 0, children: o$(a) });
}
function c$({ setting: e, control: a, inheritance: n, reason: r, onChange: l, renderControl: i }) {
  const s = N(), c = n === "locked";
  return /* @__PURE__ */ o("div", { className: `${I.row} ${I.webRow} ward-policyrow`, "data-inheritance": n, children: [
    /* @__PURE__ */ o("span", { className: I.webSetting, children: [
      /* @__PURE__ */ t("span", { className: `${I.name} ${I.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${I.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ t("span", { className: I.webControl, children: i(s) }) : /* @__PURE__ */ t(s$, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ t("span", { className: `${I.webChip} ward-policy-chip`, style: { width: _r }, children: /* @__PURE__ */ t(m, { ...vr[n], size: "tag" }) })
  ] });
}
function A2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(c$, { ...e }) : /* @__PURE__ */ t(r$, { ...e });
}
const d$ = "_label_h9m4w_7", u$ = "_name_h9m4w_15", h$ = "_column_h9m4w_24", m$ = "_webFrame_h9m4w_57", w$ = "_webHead_h9m4w_62", f$ = "_webHeadLabel_h9m4w_74", _$ = "_webLabel_h9m4w_117", v$ = "_webColumns_h9m4w_124", b$ = "_webGroup_h9m4w_130", p$ = "_webPeople_h9m4w_131", g$ = "_webVia_h9m4w_132", y$ = "_webMeta_h9m4w_161", W = {
  label: d$,
  name: u$,
  column: h$,
  webFrame: m$,
  webHead: w$,
  webHeadLabel: f$,
  webLabel: _$,
  webColumns: v$,
  webGroup: b$,
  webPeople: p$,
  webVia: g$,
  webMeta: y$
}, N$ = {
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
      className: W.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function k$(e) {
  if (!e.matrixRole) return;
  const a = N$[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function $$({ node: e }) {
  const a = k$(e);
  return /* @__PURE__ */ o("span", { className: W.label, children: [
    /* @__PURE__ */ t("span", { className: W.name, children: e.name }),
    /* @__PURE__ */ t(C$, { role: a, node: e }),
    /* @__PURE__ */ t(Ua, { column: Ga[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ t(Ua, { column: Ga[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ t(Ua, { column: Ga[2], children: e.requestedVia ?? "" })
  ] });
}
function C$({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ t(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ t(m, { role: "soft", label: "Floor" }),
    a.unresolved && /* @__PURE__ */ t(m, { role: "warn", label: "Unresolved" })
  ] });
}
function S$({ index: e, depth: a, node: n, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ t(
    qn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: n.unresolved,
      inherited: n.inherited,
      label: /* @__PURE__ */ t($$, { node: n }),
      children: s
    }
  );
}
function Va({ className: e, text: a }) {
  return /* @__PURE__ */ t("span", { className: e, title: a, children: a });
}
function R$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ t(Va, { className: `${W.webMeta} ${W.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ t(Va, { className: `${W.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ t(Va, { className: `${W.webMeta} ${W.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function T$() {
  return /* @__PURE__ */ o("div", { className: W.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ t("span", { className: W.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: W.webColumns, children: [
      /* @__PURE__ */ t("span", { className: W.webGroup, children: "AD group" }),
      /* @__PURE__ */ t("span", { className: W.webPeople, children: "People" }),
      /* @__PURE__ */ t("span", { className: W.webVia, children: "Requested via" })
    ] })
  ] });
}
function x$({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${W.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ t("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ t(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ t(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function L$(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function A$({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: W.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ t(T$, {}),
    /* @__PURE__ */ t(hm, { label: a ?? "Role matrix", children: e.map((n, r) => /* @__PURE__ */ t(
      qn,
      {
        depth: n.depth,
        label: /* @__PURE__ */ t(x$, { row: n }),
        detail: /* @__PURE__ */ t(R$, { row: n }),
        expanded: L$(n),
        leaf: n.leaf === !0,
        unresolved: n.state === "unresolved",
        inherited: n.state === "inherited",
        index: r
      },
      n.label + String(r)
    )) })
  ] });
}
function E2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(A$, { ...e }) : /* @__PURE__ */ t(S$, { ...e });
}
const E$ = "_runbook_b9agc_2", I$ = "_list_b9agc_7", M$ = "_step_b9agc_15", B$ = "_numeral_b9agc_21", P$ = "_body_b9agc_28", q$ = "_head_b9agc_34", O$ = "_title_b9agc_40", j$ = "_detail_b9agc_45", D$ = "_actions_b9agc_50", H$ = "_webList_b9agc_56", F$ = "_webStep_b9agc_60", W$ = "_webBody_b9agc_66", z$ = "_webTitle_b9agc_74", K$ = "_webDetail_b9agc_78", L = {
  runbook: E$,
  list: I$,
  step: M$,
  numeral: B$,
  body: P$,
  head: q$,
  title: O$,
  detail: j$,
  actions: D$,
  webList: H$,
  webStep: F$,
  webBody: W$,
  webTitle: z$,
  webDetail: K$
}, pr = {
  done: { role: "done", label: "Done" },
  running: { role: "running", label: "Running" },
  pending: { role: "pending", label: "Pending" }
};
function gr(e) {
  return String(e + 1).padStart(2, "0");
}
function G$({ step: e, index: a, connection: n }) {
  const r = pr[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: L.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ t("span", { className: L.numeral, children: gr(a) }),
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
function U$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: L.list, children: e.map((r, l) => /* @__PURE__ */ t(G$, { step: r, index: l, connection: n }, r.title)) }),
    a && /* @__PURE__ */ t("div", { className: L.actions, children: a })
  ] });
}
function V$({ step: e, index: a, connection: n }) {
  return /* @__PURE__ */ o("li", { className: `${L.step} ${L.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ t("span", { className: `${L.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: gr(a) }),
    /* @__PURE__ */ o("span", { className: `${L.body} ${L.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${L.head} ward-envrow`, children: [
        /* @__PURE__ */ t("span", { className: `${L.title} ${L.webTitle}`, children: e.title }),
        /* @__PURE__ */ t(m, { ...pr[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ t(Le, { startedAt: e.startedAt, connection: n }) : null
      ] }),
      /* @__PURE__ */ t("span", { className: `${L.detail} ${L.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Y$({ steps: e, actions: a, connection: n = "live" }) {
  return /* @__PURE__ */ o("div", { className: L.runbook, children: [
    /* @__PURE__ */ t("ol", { className: `${L.list} ${L.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ t(V$, { step: r, index: l, connection: n }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ t("span", { className: `${L.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function I2(e) {
  return "presentation" in e ? /* @__PURE__ */ t(Y$, { ...e }) : /* @__PURE__ */ t(U$, { ...e });
}
const J$ = "_list_1gu6a_2", X$ = "_check_1gu6a_10", Q$ = "_body_1gu6a_16", Z$ = "_text_1gu6a_23", e0 = "_pending_1gu6a_32", a0 = "_measured_1gu6a_37", Qe = {
  list: J$,
  check: X$,
  body: Q$,
  text: Z$,
  pending: e0,
  measured: a0
};
function t0(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function n0({ check: e }) {
  const a = t0(e.passed);
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
function M2({ checks: e }) {
  return /* @__PURE__ */ t("ul", { className: `${Qe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(n0, { check: a }, a.text)) });
}
const r0 = "_root_4aacj_2", l0 = "_list_4aacj_10", o0 = "_line_4aacj_26", i0 = "_at_4aacj_53", s0 = "_text_4aacj_57", c0 = "_foot_4aacj_61", d0 = "_idle_4aacj_73", u0 = "_caret_4aacj_81", h0 = "_jump_4aacj_88", we = {
  root: r0,
  list: l0,
  line: o0,
  at: i0,
  text: s0,
  foot: c0,
  idle: d0,
  caret: u0,
  jump: h0
}, m0 = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function _t(e) {
  return Number.isNaN(Date.parse(e)) ? "" : m0.format(new Date(e));
}
const w0 = { warn: "warning", ok: "ok" };
function f0({ kind: e }) {
  const a = w0[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function _0({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("span", { children: `last event ${_t(e)}` });
}
function v0({ connection: e, idleSince: a, last: n, children: r }) {
  const l = [a, n == null ? void 0 : n.at, ""].find(Boolean), i = {
    stale: `no new events as of ${_t(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${we.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ t("span", { className: `${we.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ t("span", { className: we.idle, children: i }),
    /* @__PURE__ */ t(_0, { at: n == null ? void 0 : n.at }),
    r
  ] });
}
const b0 = 8;
function p0(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > b0;
}
function g0({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const yr = ye(null);
function B2({ announce: e, onAnnounceChange: a, children: n }) {
  const [r, l] = p(!1), i = Qt(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ t(yr.Provider, { value: i, children: n });
}
function y0() {
  const e = ge(yr), [a, n] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, n];
}
function P2({ lines: e, connection: a, idleSince: n, label: r = "Live activity" }) {
  const l = _(null), [i, s] = p(0), [c, d] = y0(), [u, h] = p(!1), w = e.at(-1);
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
    (P = E.item(E.length - 1)) == null || P.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: we.root, children: [
    /* @__PURE__ */ t("ol", { className: we.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, "data-empty": e.length === 0 || void 0, onScroll: (y) => h(p0(y.currentTarget)), children: e.map((y, E) => /* @__PURE__ */ o("li", { className: `${we.line} ward-consline ward-reveal ward-consline--${y.kind}`, "data-kind": y.kind, "data-revealed": E < i, children: [
      /* @__PURE__ */ t("span", { className: we.at, children: _t(y.at) }),
      /* @__PURE__ */ t(f0, { kind: y.kind }),
      /* @__PURE__ */ t("span", { className: we.text, "data-consline-text": !0, tabIndex: -1, children: y.text })
    ] }, `${y.at}-${E}`)) }),
    /* @__PURE__ */ o(v0, { connection: a, idleSince: n, last: w, children: [
      /* @__PURE__ */ t("button", { type: "button", className: `${we.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ t(g0, { shown: u, onJump: f })
    ] })
  ] });
}
const N0 = "_row_1k8wl_2", k0 = "_head_1k8wl_14", $0 = "_author_1k8wl_20", C0 = "_eta_1k8wl_25", S0 = "_edited_1k8wl_26", R0 = "_body_1k8wl_32", T0 = "_reason_1k8wl_37", x0 = "_actions_1k8wl_42", Ce = {
  row: N0,
  head: k0,
  author: $0,
  eta: C0,
  edited: S0,
  body: R0,
  reason: T0,
  actions: x0
}, L0 = {
  queued: { role: "running", label: "Queued" },
  delivered: { role: "done", label: "Delivered" },
  retrying: { role: "attention", label: "Retrying" },
  failed: { role: "failed", label: "Failed" }
};
function A0(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function E0({ comment: e, reasonId: a, onEdit: n, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: n, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: "secondary", size: "sm", onClick: n, children: "Edit" }),
    /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function I0({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ t("span", { className: Ce.reason, id: a, children: e })
  ] });
}
function M0(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function B0(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ t(E0, { ...e }) : /* @__PURE__ */ t(I0, { reason: e.unavailable, reasonId: e.unavailableId });
}
function q2(e) {
  const { comment: a } = e;
  M0(e);
  const n = N(), r = `${n}-unavailable`, l = L0[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${Ce.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: Ce.head, children: [
      /* @__PURE__ */ t("span", { className: Ce.author, children: a.author }),
      /* @__PURE__ */ t(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ t("span", { className: Ce.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ t("span", { className: Ce.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ t("p", { className: Ce.body, children: a.body }),
    /* @__PURE__ */ t("p", { className: Ce.reason, id: n, children: A0(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ t("div", { className: Ce.actions, children: /* @__PURE__ */ t(B0, { ...e, reasonId: n, unavailableId: r }) })
  ] });
}
const P0 = "_root_rvhdw_2", q0 = "_attach_rvhdw_11", O0 = "_actions_rvhdw_17", j0 = "_reply_rvhdw_23", D0 = "_replyField_rvhdw_28", H0 = "_send_rvhdw_54", F0 = "_sendIcon_rvhdw_65", W0 = "_sendsAs_rvhdw_75", Oe = {
  root: P0,
  attach: q0,
  actions: O0,
  reply: j0,
  replyField: D0,
  send: H0,
  sendIcon: F0,
  sendsAs: W0
};
function Nr({ value: e, onChange: a }) {
  const [n, r] = p("");
  return e === void 0 ? [n, r] : [e, a ?? (() => {
  })];
}
function z0() {
  return /* @__PURE__ */ t("svg", { className: Oe.sendIcon, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ t("path", { d: "M12 19V5M5 12l7-7 7 7" }) });
}
function K0(e) {
  return e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing;
}
function G0(e) {
  const { placeholder: a, asUser: n, onPost: r } = e, [l, i] = Nr(e), s = N(), c = () => {
    l.trim() !== "" && r(n, l);
  }, d = (u) => {
    K0(u) && (u.preventDefault(), c());
  };
  return /* @__PURE__ */ o("div", { className: Oe.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Oe.replyField, "data-ward-composer-field": "", "data-ward-focus-host": "", onKeyDown: d, children: [
      /* @__PURE__ */ t(M, { variant: "reply", kind: "textarea", rows: 1, labelHidden: !0, placeholder: a, label: a, value: l, onChange: i, describedBy: s }),
      /* @__PURE__ */ o(b, { variant: "primary", className: Oe.send, describedBy: s, onClick: c, children: [
        /* @__PURE__ */ t(z0, {}),
        /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: "Send" })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { id: s, className: Oe.sendsAs, children: `Sends as ${n}.` })
  ] });
}
function O2(e) {
  return e.variant === "reply" ? /* @__PURE__ */ t(G0, { ...e }) : /* @__PURE__ */ t(U0, { ...e });
}
function U0(e) {
  const { placeholder: a, asUser: n, attachTo: r, requeueAfter: l, onPost: i, onDraft: s } = e, [c, d] = Nr(e);
  return /* @__PURE__ */ o("div", { className: Oe.root, children: [
    /* @__PURE__ */ t(M, { kind: "textarea", label: a, value: c, onChange: d }),
    r && /* @__PURE__ */ o("div", { className: Oe.attach, children: [
      /* @__PURE__ */ t(m, { role: "soft", label: r.label }),
      /* @__PURE__ */ t(b, { variant: "ghost", size: "sm", onClick: r.onChange, children: "Change" })
    ] }),
    l && /* @__PURE__ */ t(
      hn,
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
const V0 = "_list_1yhks_2", Y0 = "_item_1yhks_6", J0 = "_body_1yhks_22", X0 = "_text_1yhks_28", Q0 = "_evidence_1yhks_37", Z0 = "_consequence_1yhks_49", eC = "_note_1yhks_54", Ge = {
  list: V0,
  item: Y0,
  body: J0,
  text: X0,
  evidence: Q0,
  consequence: Z0,
  note: eC
};
function aC({ criterion: e }) {
  return /* @__PURE__ */ t(He, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function Vt({ text: e }) {
  return /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: e });
}
function tC(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function nC({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Ge.body, children: [
    /* @__PURE__ */ t("span", { className: Ge.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("code", { className: Ge.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ t(Vt, { text: " · " }),
      /* @__PURE__ */ t("span", { className: Ge.consequence, children: tC(e.why) })
    ] })
  ] });
}
function rC({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Ge.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ t(aC, { criterion: e }),
    /* @__PURE__ */ t(nC, { criterion: e })
  ] });
}
function j2({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("ul", { className: `${Ge.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ t(rC, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ t("p", { className: Ge.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const lC = "_list_dwhoz_2", oC = "_rung_dwhoz_6", iC = "_name_dwhoz_18", sC = "_actor_dwhoz_32", ya = {
  list: lC,
  rung: oC,
  name: iC,
  actor: sC
}, cC = {
  passed: { role: "done", label: "Passed" },
  waiting: { role: "attention", label: "Waiting" },
  pending: { role: "pending", label: "Pending" }
};
function dC({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = cC[e.state];
  return /* @__PURE__ */ o("li", { className: ya.rung, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: ya.name, children: e.name }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ t("span", { className: `${ya.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function D2({ rungs: e }) {
  return /* @__PURE__ */ t("ol", { className: `${ya.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ t(dC, { rung: a }, a.name)) });
}
const uC = "_sheet_pw37w_2", hC = "_title_pw37w_9", mC = "_stage_pw37w_15", wC = "_effects_pw37w_20", fC = "_effect_pw37w_20", _C = "_numeral_pw37w_31", vC = "_effectText_pw37w_38", bC = "_refusals_pw37w_43", pC = "_reasons_pw37w_52", gC = "_reason_pw37w_52", yC = "_actions_pw37w_62", he = {
  sheet: uC,
  title: hC,
  stage: mC,
  effects: wC,
  effect: fC,
  numeral: _C,
  effectText: vC,
  refusals: bC,
  reasons: pC,
  reason: gC,
  actions: yC
};
function NC({ refused: e, reasonId: a, note: n, onRequeue: r }) {
  return e ? /* @__PURE__ */ t(b, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ t(b, { variant: "primary", onClick: () => r(n === "" ? void 0 : n), children: "Requeue" });
}
function H2({ run: e, effects: a, refusals: n, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = N(), d = `${c}-refusal`, [u, h] = p(""), w = n.length > 0;
  return /* @__PURE__ */ t(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: he.sheet, children: [
    /* @__PURE__ */ o("h2", { className: he.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ t("p", { className: he.stage, children: e.stage }),
    /* @__PURE__ */ t("ol", { className: he.effects, children: a.map((f, y) => /* @__PURE__ */ o("li", { className: he.effect, children: [
      /* @__PURE__ */ t("span", { className: he.numeral, children: String(y + 1).padStart(2, "0") }),
      /* @__PURE__ */ t("span", { className: he.effectText, children: f })
    ] }, f)) }),
    /* @__PURE__ */ t(
      Yu,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ t(M, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    w && /* @__PURE__ */ o("div", { className: he.refusals, children: [
      /* @__PURE__ */ t(m, { role: "meta", label: "Refused" }),
      /* @__PURE__ */ t("ul", { className: he.reasons, children: n.map((f, y) => /* @__PURE__ */ t("li", { className: he.reason, id: y === 0 ? d : void 0, children: f.reason }, f.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: he.actions, children: [
      /* @__PURE__ */ t(NC, { refused: w, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ t(b, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const kC = "_list_ezew2_2", $C = "_path_ezew2_7", CC = "_head_ezew2_21", SC = "_label_ezew2_28", RC = "_consequence_ezew2_35", TC = "_ask_ezew2_36", ea = {
  list: kC,
  path: $C,
  head: CC,
  label: SC,
  consequence: RC,
  ask: TC
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
function xC({ path: e, primary: a, onChoose: n }) {
  const r = N();
  return e.allowed ? /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", onClick: () => n(e.kind), children: et[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ t(b, { variant: Jt(a), size: "sm", disabled: !0, describedBy: r, children: et[e.kind] }),
    /* @__PURE__ */ t("span", { className: ea.ask, id: r, children: e.askInstead })
  ] });
}
function LC({ path: e, primary: a, onChoose: n }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: ea.path, "data-allowed": e.allowed, "data-role": Yt(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: ea.head, children: [
      /* @__PURE__ */ t("span", { className: ea.label, children: e.title ?? et[e.kind] }),
      /* @__PURE__ */ t(m, { role: Yt(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ t("span", { className: ea.consequence, children: e.consequence }),
    /* @__PURE__ */ t(xC, { path: e, primary: a, onChoose: n })
  ] });
}
function F2({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ t("ul", { className: ea.list, children: e.map((n, r) => /* @__PURE__ */ t(LC, { path: n, primary: r === 0, onChoose: a }, n.kind)) });
}
const AC = "_list_1m7i0_2", EC = "_item_1m7i0_6", IC = "_node_1m7i0_18", MC = "_body_1m7i0_24", BC = "_head_1m7i0_30", PC = "_stage_1m7i0_36", qC = "_version_1m7i0_41", OC = "_sentence_1m7i0_49", jC = "_meta_1m7i0_54", Re = {
  list: AC,
  item: EC,
  node: IC,
  body: MC,
  head: BC,
  stage: PC,
  version: qC,
  sentence: OC,
  meta: jC
}, DC = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function HC({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Re.head, children: [
    /* @__PURE__ */ t("span", { className: Re.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ t("span", { className: Re.version, title: e.version, children: e.version }) : null
  ] });
}
function FC({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Re.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ t("span", { className: `${Re.node} ward-history-node`, children: /* @__PURE__ */ t(He, { size: 9, kind: DC[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Re.body} ward-history-stage`, children: [
      /* @__PURE__ */ t(HC, { entry: e }),
      /* @__PURE__ */ t("span", { className: Re.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Re.meta} ward-history-meta`, children: [
        `${ue(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${le(e.cost)}`
      ] })
    ] })
  ] });
}
function W2({ entries: e }) {
  return /* @__PURE__ */ t("ol", { className: `${Re.list} ward-history`, children: e.map((a, n) => /* @__PURE__ */ t(FC, { entry: a }, a.stage + String(n))) });
}
const WC = "_thread_1e70p_3", zC = "_turn_1e70p_8", KC = "_who_1e70p_27", GC = "_body_1e70p_32", Na = {
  thread: WC,
  turn: zC,
  who: KC,
  body: GC
}, kr = ye(!1);
function z2({ children: e, density: a }) {
  return /* @__PURE__ */ t(kr.Provider, { value: !0, children: /* @__PURE__ */ t("ol", { className: `${Na.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function K2({ turn: e }) {
  if (!ge(kr)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${Na.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${Na.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ue(e.at)
    ] }),
    /* @__PURE__ */ t("p", { className: `${Na.body} ward-chat-body`, children: e.body })
  ] });
}
const UC = "_list_yiolt_3", VC = "_row_yiolt_7", YC = "_label_yiolt_20", JC = "_n_yiolt_26", XC = "_cause_yiolt_33", oa = {
  list: UC,
  row: VC,
  label: YC,
  n: JC,
  cause: XC
};
function QC(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const ZC = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function eS({ row: e, formatNumber: a }) {
  return QC(e), /* @__PURE__ */ o("li", { className: `${oa.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ t(He, { size: 8, ...ZC[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ t("span", { className: oa.label, children: e.label }),
    /* @__PURE__ */ t("span", { className: `${oa.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ t(aS, { cause: e.cause })
  ] });
}
function aS({ cause: e }) {
  return e ? /* @__PURE__ */ t("span", { className: `${oa.cause} ward-healthrow-cause`, children: e }) : null;
}
function G2({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ t("ul", { className: `${oa.list} ward-checklist`, children: e.map((n) => /* @__PURE__ */ t(eS, { row: n, formatNumber: a }, n.label)) });
}
const tS = "_root_1jxwp_2", nS = {
  root: tS
};
function U2({ items: e, note: a, actionLabel: n = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: nS.root, "data-density": l, children: [
    /* @__PURE__ */ t(Da, { items: e, note: a, density: l }),
    /* @__PURE__ */ t(b, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: n })
  ] });
}
const rS = "_row_dhbre_3", lS = "_key_dhbre_13", oS = "_stack_dhbre_24", iS = "_value_dhbre_32", sS = "_evidence_dhbre_39", cS = "_mark_dhbre_47", Xe = {
  row: rS,
  key: lS,
  stack: oS,
  value: iS,
  evidence: sS,
  mark: cS
};
function dS({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ t(m, { role: "warn", label: "Confirm" }) : /* @__PURE__ */ t(it, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function V2({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Xe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ t("span", { className: `${Xe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Xe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ t("span", { className: `${Xe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ t("span", { className: `${Xe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ t("span", { className: `${Xe.mark} ward-resfield-mark`, children: /* @__PURE__ */ t(dS, { state: e.state }) })
  ] });
}
const uS = "_cell_gh2sd_2", hS = {
  cell: uS
}, mS = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function wS(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function fS(e, a) {
  const n = e.find((r) => r.noRerun && !r.why);
  if (a && n) throw new Error(`RoutingTable: the "${n.rejectedBy}" row never reruns and says nothing about why`);
}
function _S(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: wS(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function vS(e) {
  return e.map((a, n) => ({ ...a, id: a.id ?? String(n) }));
}
function Y2({ rows: e, empty: a, requireNoRerunReason: n = !0 }) {
  fS(e, n);
  const r = vS(e);
  return /* @__PURE__ */ t(
    ch,
    {
      label: "Rejection routing",
      columns: mS,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ t("span", { className: hS.cell, "data-norerun": l.noRerun ? !0 : void 0, children: _S(l, i) }),
      empty: a ?? /* @__PURE__ */ t(Xm, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const bS = "_row_1f2re_2", pS = "_title_1f2re_12", gS = "_turns_1f2re_18", yS = "_waiting_1f2re_19", NS = "_resolved_1f2re_20", kS = "_activity_1f2re_21", $S = "_cost_1f2re_28", CS = "_link_1f2re_29", SS = "_tableLink_1f2re_47", RS = "_tableRecord_1f2re_48", TS = "_tableRow_1f2re_59", xS = "_tableTitle_1f2re_71", LS = "_tableResolved_1f2re_76", AS = "_tableMeta_1f2re_87", ES = "_tableCost_1f2re_94", IS = "_tableActivity_1f2re_95", MS = "_tableState_1f2re_105", j = {
  row: bS,
  title: pS,
  turns: gS,
  waiting: yS,
  resolved: NS,
  activity: kS,
  cost: $S,
  link: CS,
  tableLink: SS,
  tableRecord: RS,
  tableRow: TS,
  tableTitle: xS,
  tableResolved: LS,
  tableMeta: AS,
  tableCost: ES,
  tableActivity: IS,
  tableState: MS
}, $r = {
  open: { role: "pending", label: "Open" },
  draft: { role: "running", label: "Draft" },
  created: { role: "done", label: "Created" },
  duplicate: { role: "meta", label: "Duplicate" },
  expired: { role: "meta", label: "Expired" }
};
function BS(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const n = Math.floor(a / 60);
  return n < 24 ? `${n}h ago` : `${Math.floor(n / 24)}d ago`;
}
function PS(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function qS(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const OS = { duplicate: "Closed · duplicate" };
function jS({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t(ta, { className: j.tableMeta, text: `waiting on ${e}` });
}
function DS({ value: e }) {
  return /* @__PURE__ */ t("td", { className: j.tableCost, children: e === void 0 ? null : le(e) });
}
function HS({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ t("a", { className: `${j.tableRecord} ward-target`, href: H(e.href), children: `→ ${e.key}` });
}
function FS({ session: e, href: a }) {
  const n = $r[e.state];
  return /* @__PURE__ */ o("tr", { className: j.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: j.tableTitle, children: [
      /* @__PURE__ */ t("a", { className: `${j.tableLink} ward-target`, href: H(a), children: /* @__PURE__ */ t(ta, { text: e.title }) }),
      /* @__PURE__ */ t("span", { className: j.tableMeta, children: PS(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: j.tableResolved, children: [
      qS(e.resolved),
      /* @__PURE__ */ t(jS, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ t(DS, { value: e.cost }),
    /* @__PURE__ */ t("td", { className: j.tableActivity, children: BS(e.lastActivity) }),
    /* @__PURE__ */ t("td", { className: j.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(m, { role: n.role, label: OS[e.state] ?? n.label }),
      /* @__PURE__ */ t(HS, { link: e.link })
    ] }) })
  ] });
}
function WS({ session: e }) {
  const a = $r[e.state];
  return /* @__PURE__ */ o("div", { className: j.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ t(ta, { className: j.title, text: e.title }),
    /* @__PURE__ */ t("span", { className: j.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ t(ta, { className: j.waiting, text: e.waitingOn ?? "" }),
    /* @__PURE__ */ t("span", { className: j.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ t("span", { className: j.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : le(e.cost) }),
    /* @__PURE__ */ t("span", { className: j.activity, children: ue(e.lastActivity) }),
    e.link && /* @__PURE__ */ t("a", { className: j.link, href: H(e.link.href), children: e.link.key }),
    /* @__PURE__ */ t(m, { role: a.role, label: a.label })
  ] });
}
function J2(e) {
  return e.presentation === "table" ? /* @__PURE__ */ t(FS, { session: e.session, href: e.href }) : /* @__PURE__ */ t(WS, { session: e.session });
}
const zS = "_block_1yy2v_3", KS = "_list_1yy2v_9", GS = "_line_1yy2v_14", at = {
  block: zS,
  list: KS,
  line: GS
}, US = { warn: "warning", ok: "ok" };
function VS({ kind: e }) {
  const a = US[e];
  return a === void 0 ? null : /* @__PURE__ */ t("span", { className: "ward-visually-hidden", children: a });
}
function YS({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${at.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ t(VS, { kind: a }),
    /* @__PURE__ */ t("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function X2({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ t("div", { className: `${at.block} ward-typed`, children: /* @__PURE__ */ t("ol", { className: at.list, "aria-label": a, children: e.map((n, r) => /* @__PURE__ */ t(YS, { line: n }, `${r}-${n.text}`)) }) });
}
const JS = "_band_tt7hp_1", XS = "_head_tt7hp_8", QS = "_cell_tt7hp_19", ZS = "_index_tt7hp_35", eR = "_title_tt7hp_42", aR = "_note_tt7hp_48", tR = "_cellTitle_tt7hp_53", nR = "_cellBody_tt7hp_58", rR = "_tag_tt7hp_64", $e = {
  band: JS,
  head: XS,
  cell: QS,
  index: ZS,
  title: eR,
  note: aR,
  cellTitle: tR,
  cellBody: nR,
  tag: rR
}, Xt = 4;
function Q2({ index: e, title: a, note: n, cells: r }) {
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
  fR as ACCENT_PRESETS,
  PR as ActionStack,
  P2 as ActivityConsole,
  kR as AdminIcon,
  mv as AgentCard,
  CR as AppShell,
  g2 as AppearanceStrip,
  Q2 as Band,
  IR as BarChart,
  Aw as BoardColumn,
  ZR as BoardFootnote,
  e2 as BoardHeader,
  yR as BoardIcon,
  zR as BoardScroller,
  b as Btn,
  wR as CHIP_ROLES,
  cr as CREDENTIAL_COLUMNS,
  ER as Callout,
  y2 as CapabilityRow,
  GR as CardGrid,
  K2 as ChatMessage,
  hn as Checkbox,
  m as Chip,
  ta as ClampText,
  q2 as ClarificationRow,
  d2 as ClauseRuleRow,
  c2 as ClauseRules,
  Wn as ColourLadder,
  N2 as ComponentRow,
  O2 as Composer,
  t2 as ConfigRow,
  a2 as ConfigRowHead,
  st as ConnectionMark,
  B2 as ConsoleAnnounceProvider,
  z2 as Conversation,
  Yu as CostMeter,
  $2 as CredentialRow,
  k2 as CredentialRowHead,
  j2 as CriteriaList,
  Ui as Crumb,
  _R as DENSITIES,
  G2 as DeliveryHealth,
  VR as DeniedState,
  pR as DisabledScope,
  h2 as DryRunRail,
  Xm as EmptyState,
  C2 as EnvCard,
  M as Field,
  UR as FilteredEmpty,
  FR as FormStack,
  Da as GateChecklist,
  D2 as GateLadder,
  ch as Grid,
  w2 as HandoffRuleRow,
  m2 as HandoffRules,
  gR as HomeIcon,
  n2 as ItemDrawer,
  S2 as KeyPanel,
  Gr as LIVE_EVENT_TYPES,
  B_ as LegacyBoardColumn,
  l2 as LegacyBoardHeader,
  o2 as LegacyConfigRow,
  s2 as LegacyItemDrawer,
  T_ as LegacyOverCapNote,
  i2 as LegacyPreviewRail,
  Dn as LegacyWorkCard,
  Le as LiveIndicator,
  YR as LoadFailed,
  QR as Loading,
  fr as MCP_SERVER_COLUMNS,
  it as Mark,
  T2 as MarkUpload,
  He as Marker,
  L2 as McpServerRow,
  x2 as McpServerRowHead,
  pc as Menu,
  tc as MenuButton,
  f2 as NewStreamModal,
  ew as OverCapNote,
  Ba as OverflowRow,
  na as Overlay,
  u2 as PARTIAL_STEP_REASON,
  _r as POLICY_CHIP_WIDTH,
  jR as PageFrame,
  AR as PageHeader,
  MR as PlainList,
  A2 as PolicyRow,
  r2 as PreviewRail,
  Ga as ROLE_MATRIX_COLUMNS,
  ar as RULE_ACTIONS,
  En as Radio,
  U2 as ReadyChecklist,
  HR as RecordSection,
  H2 as RequeueSheet,
  F2 as ResolveBlock,
  V2 as ResolvedFieldRow,
  E2 as RoleMatrixRow,
  Y2 as RoutingTable,
  _2 as RuleRow,
  I2 as RunbookSteps,
  Kr as STREAM_STEPS,
  WR as SectionBand,
  Mt as SectionHeader,
  Ln as SegmentedControl,
  gn as Select,
  J2 as SessionRow,
  TR as Sidebar,
  $R as SidebarFoldButton,
  v2 as StageColumn,
  KR as StageGrid,
  W2 as StageHistory,
  Vp as StageListEditor,
  JR as StaleStrip,
  qa as StatStrip,
  qR as StatTiles,
  LR as StreamAvatar,
  b2 as StreamRow,
  NR as StudioIcon,
  DR as SubjectRail,
  Ue as Switch,
  RR as TabLinks,
  BR as TableHead,
  SR as Tabs,
  dR as ThemeProvider,
  p2 as ToolRow,
  OR as TopBar,
  hm as Tree,
  qn as TreeRow,
  X2 as TypedInputBlock,
  Io as UNSAFE_HREF,
  M2 as ValidationList,
  sR as VisibilityProvider,
  cR as Visible,
  mR as WARD_VERSION,
  ja as WorkCard,
  XR as WriteUnavailableStrip,
  BS as agoSince,
  Er as clock,
  ug as colourStatus,
  ae as count,
  de as duration,
  tt as elapsed,
  hR as eventSourceTransport,
  Ia as isStreamStep,
  ca as isValidatedStreamStep,
  Wv as ladderValidation,
  Bk as mcpConnectionChip,
  Ik as mcpToolName,
  le as money,
  fe as ms,
  On as ordered,
  en as ratio,
  a1 as restartLabel,
  H as safeHref,
  ue as stamp,
  nt as stream,
  vR as streamChip,
  Pa as streamChipProps,
  pe as streamColour,
  Yr as streamHex,
  Ca as streamInitials,
  Ur as streamVars,
  xR as uniqueStreamInitials,
  _n as useAnchoredPanel,
  ba as useBorderFlash,
  Ae as useDisabledScope,
  Fr as useFocusTrap,
  bR as useLiveFeed,
  uR as useReturnFocus,
  Ea as useRovingTabindex,
  rt as useTicker,
  Ir as useVisible,
  z as v,
  R2 as validateMark,
  ha as validatedStep,
  tn as validatedStreamSteps
};
