import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Tn, useContext as je, createContext as He, useCallback as X, useEffect as x, useState as p, useRef as g, useLayoutEffect as Wa, useId as $, Children as Lt, Fragment as Et } from "react";
import { createPortal as At } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const tn = (e) => String(e).padStart(2, "0");
function za(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${tn(a % 60)}s` : `${Math.floor(t / 60)}h ${tn(t % 60)}m`;
}
const xt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = xt.formatToParts(new Date(e)), t = (r) => {
    var l;
    return ((l = a.find((i) => i.type === r)) == null ? void 0 : l.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function re(e) {
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
function Ln(e, a) {
  return `${e} / ${a}`;
}
const It = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Mt(e) {
  return It.format(new Date(e));
}
const En = He(/* @__PURE__ */ new Set());
function c$({ hidden: e, children: a }) {
  const t = Tn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(En.Provider, { value: t, children: a });
}
function qt(e) {
  return !je(En).has(e);
}
function d$({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: qt(e) ? a : t });
}
const Pt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Bt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Ot(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Bt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Dt(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Pt));
      Ot(t, e.current, r);
    },
    [e]
  ) };
}
function u$(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const rn = { ArrowUp: -1, ArrowDown: 1 }, ln = { ArrowLeft: -1, ArrowRight: 1 }, jt = (e, a, t) => Math.min(t, Math.max(a, e));
function Ht(e, a) {
  if (a !== "horizontal" && e in rn) return rn[e];
  if (a !== "vertical" && e in ln) return ln[e];
}
function ga({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = g(/* @__PURE__ */ new Map()), l = g(!1);
  Wa(() => {
    var b;
    const u = Array.from(r.current.keys());
    if (u.length === 0 || u.includes(a)) return;
    const h = u[0], f = l.current;
    l.current = !1, t(h), f && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = X((u) => t(u), []), s = X((u) => {
    var h;
    t(u), (h = r.current.get(u)) == null || h.focus();
  }, []), c = X(
    (u) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const f = Math.max(0, h.indexOf(a)), b = Ht(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[jt(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
    },
    [a, s, e]
  ), d = X(
    (u) => ({
      tabIndex: u === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(u, h) : (r.current.delete(u), u === a && (l.current = !0));
      },
      onFocus: () => t(u),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: c }, itemProps: d, setActive: i };
}
const h$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, m$ = "0.2.0", w$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Ft = [1, 2, 3, 4, 5, 6], Wt = [1, 2, 3], zt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
  color: {
    bg: "var(--ward-color-bg)",
    surface: "var(--ward-color-surface)",
    surface2: "var(--ward-color-surface2)",
    line: "var(--ward-color-line)",
    line2: "var(--ward-color-line2)",
    text: "var(--ward-color-text)",
    muted: "var(--ward-color-muted)",
    faint: "var(--ward-color-faint)",
    blue: "var(--ward-color-blue)",
    blueSoft: "var(--ward-color-blueSoft)",
    runningTint: "var(--ward-color-runningTint)",
    green: "var(--ward-color-green)",
    orange: "var(--ward-color-orange)",
    amber: "var(--ward-color-amber)",
    red: "var(--ward-color-red)",
    warning: "var(--ward-color-warning)",
    destructive: "var(--ward-color-destructive)",
    warnInk: "var(--ward-color-warnInk)",
    warnSurface: "var(--ward-color-warnSurface)",
    warnLine: "var(--ward-color-warnLine)",
    console: "var(--ward-color-console)",
    consoleInk: "var(--ward-color-consoleInk)",
    consoleWarn: "var(--ward-color-consoleWarn)",
    consoleOk: "var(--ward-color-consoleOk)",
    consoleFaint: "var(--ward-color-consoleFaint)",
    deep: "var(--ward-color-deep)",
    overcapTint: "var(--ward-color-overcapTint)",
    scrim: "var(--ward-color-scrim)",
    greenFill: "var(--ward-color-greenFill)",
    orangeFill: "var(--ward-color-orangeFill)",
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
    series6: "var(--ward-color-series6)"
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
    effects: "var(--ward-gap-effects)"
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
    colourPick: "var(--ward-width-colourPick)"
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
    target: "var(--ward-height-target)"
  },
  size: {
    marker6: "var(--ward-size-marker6)",
    marker8: "var(--ward-size-marker8)",
    marker9: "var(--ward-size-marker9)",
    marker14: "var(--ward-size-marker14)"
  },
  radius: "var(--ward-radius)",
  border: "var(--ward-border)",
  underline: "var(--ward-underline)",
  focusOffset: "var(--ward-focus-offset)",
  shadow: { overlay: "var(--ward-shadow-overlay)" },
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
    personName: "var(--ward-type-personName)"
  },
  motion: {
    fast: "var(--ward-motion-fast)",
    flash: "var(--ward-motion-flash)",
    reveal: "var(--ward-motion-reveal)",
    tick: "var(--ward-motion-tick)",
    patience: "var(--ward-motion-patience)"
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
  heartbeat: 15e3,
  poll: 15e3,
  reconnectMax: 3e4,
  staleAfter: 45e3,
  reconnectBase: 1e3,
  load: 800
};
function An(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Na(e) {
  return Ft.includes(e);
}
function ya(e) {
  return Wt.includes(e);
}
function _$(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function f$(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Gt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Ut(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return Gt[e];
}
function on(e) {
  return typeof e != "string" ? null : zt.includes(e) ? e : null;
}
function Kt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Vt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Yt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Xt(e, a, t) {
  const r = Kt(e);
  if (r === null) return null;
  const l = on(t) ?? on(r.type);
  return l === null ? null : { ...r, type: l, id: Vt(r, a), at: Yt(r) };
}
function Jt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Qt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function v$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = g(/* @__PURE__ */ new Map()), c = g(0), d = g(""), u = g(0), h = g(null), f = g(0), b = g(0), N = g(!1), I = g("reconnecting"), j = X((C) => {
    I.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), $e = X((C) => {
    for (const [z, fe] of s.current)
      (fe === "*" || C.itemKey === fe) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, fe) => {
        const xe = Xt(C, z, fe);
        xe !== null && (xe.id && (d.current = xe.id), oe(), N.current = !1, j("live"), i(xe.at), $e(xe));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, oe(), j("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, N.current = !0, I.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [$e, j, oe, a, e]), Fe = X((C) => {
    N.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), We = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Jt(C, I.current);
    z && j(z);
    const fe = h.current;
    Qt(C, N.current, fe) && Fe(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), N.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, Fe, j]), { connection: t, lastEventAt: l, subscribe: We };
}
function Ga(e, a) {
  const t = new Date(e).getTime(), [r, l] = p(() => Date.now());
  return x(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && l(Date.now());
    };
    i();
    const s = window.setInterval(i, we.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(s), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Zt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function sn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ia(e, a) {
  const t = g(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Zt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => sn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => sn(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const er = "_root_1otpc_2", ar = {
  root: er
};
function nr(e, a, t, r, l) {
  const i = [za(a)];
  return e || i.push(`as of ${Mt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Ga(e, l), s = (a == null ? void 0 : a.at) ?? e, c = nr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${ar.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const tr = "_app_1g5ye_1", rr = "_side_1g5ye_18", lr = "_main_1g5ye_26", or = "_rail_1g5ye_33", ir = "_page_1g5ye_40", sr = "_root_1g5ye_91", cr = "_topbar_1g5ye_98", dr = "_mark_1g5ye_109", ur = "_brand_1g5ye_116", hr = "_tagline_1g5ye_122", mr = "_identity_1g5ye_128", wr = "_tools_1g5ye_129", _r = "_metadata_1g5ye_138", fr = "_actor_1g5ye_153", vr = "_detail_1g5ye_154", br = "_nav_1g5ye_159", pr = "_content_1g5ye_194", gr = "_toolsPanel_1g5ye_210", Nr = "_skip_1g5ye_236", M = {
  app: tr,
  side: rr,
  main: lr,
  rail: or,
  page: ir,
  root: sr,
  topbar: cr,
  mark: dr,
  brand: ur,
  tagline: hr,
  identity: mr,
  tools: wr,
  metadata: _r,
  actor: fr,
  detail: vr,
  nav: br,
  content: pr,
  toolsPanel: gr,
  skip: Nr
}, yr = "_btn_j72f1_2", kr = "_primary_j72f1_13", $r = "_destructive_j72f1_24", Cr = "_secondary_j72f1_34", Sr = "_ghost_j72f1_39", Rr = "_overflow_j72f1_48", Tr = "_sm_j72f1_55", Lr = "_disabled_j72f1_59", ta = {
  btn: yr,
  primary: kr,
  destructive: $r,
  secondary: Cr,
  ghost: Sr,
  overflow: Rr,
  sm: Tr,
  disabled: Lr
};
function Er(e, a, t, r) {
  const l = a === "sm" ? [ta.sm, "ward-btn--sm"] : [], i = t ? [ta.disabled] : [];
  return [ta.btn, ta[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Ar(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function xr(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Ir(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Mr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function qr(e, a, t) {
  return Mr(e.describedBy, a && t);
}
function Pr({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Br(e) {
  return e.children ?? e.label;
}
function _(e) {
  xr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Ir(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Er(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": qr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Ar(a, e.controls),
        children: Br(e)
      }
    ),
    /* @__PURE__ */ n(Pr, { id: i, reason: l })
  ] });
}
const Or = /^([a-z][a-z0-9+.-]*):/i, Dr = /* @__PURE__ */ new Set(["http", "https"]), jr = "#";
function Hr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Or.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Hr(e);
  return a === void 0 || Dr.has(a) ? e : jr;
}
function Ua(e) {
  const [a, t] = p(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return x(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const l = (s) => t(s.matches);
    return r.addEventListener("change", l), t(r.matches), () => r.removeEventListener("change", l);
  }, [e]), a;
}
function Fr({ sidebar: e, header: a, children: t, rail: r }) {
  const l = r != null;
  return /* @__PURE__ */ o("div", { className: M.app, "data-rail": l ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: M.side, children: e }),
    /* @__PURE__ */ o("main", { className: M.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: M.page, children: t })
    ] }),
    l && /* @__PURE__ */ n("div", { className: M.rail, children: r })
  ] });
}
function Wr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Pa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function zr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Pa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Pa, { value: a, className: M.detail })
  ] });
}
function Gr() {
  const e = Ua("(max-width: 767.98px)"), a = $(), t = g(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Ur({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Kr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Vr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Pa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(Wr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(zr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Ur, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Yr(e) {
  const a = $(), t = Gr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Vr, { ...e, menu: t }),
    /* @__PURE__ */ n(Kr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Xr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function b$(e) {
  return Xr(e) ? /* @__PURE__ */ n(Fr, { ...e }) : /* @__PURE__ */ n(Yr, { ...e });
}
function Ka(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Jr = "_root_o4yib_2", Qr = "_row_o4yib_8", Zr = "_box_o4yib_14", el = "_label_o4yib_21", al = "_lockedNote_o4yib_26", nl = "_consequence_o4yib_34", tl = "_sample_o4yib_69", qe = {
  root: Jr,
  row: Qr,
  box: Zr,
  label: el,
  lockedNote: al,
  consequence: nl,
  sample: tl
};
function rl(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function ll({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function ol({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function il({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function xn(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = rl(e);
  return /* @__PURE__ */ o("div", { className: `${qe.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ o("span", { className: qe.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${qe.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (l) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, l.target.checked));
          },
          "aria-describedby": Ka(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(ol, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(il, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ll, { id: t, text: e.consequence })
  ] });
}
const sl = "_chip_1073r_2", cl = {
  chip: sl
}, dl = {
  gate: G.chip.gate,
  system: G.chip.system,
  write: G.chip.write,
  drift: G.chip.drift,
  done: G.chip.done,
  attention: G.chip.attention,
  failed: G.chip.failed,
  pending: G.chip.pending,
  running: G.chip.running,
  warn: G.chip.warn,
  meta: G.chip.meta,
  soft: G.chip.soft,
  quiet: G.chip.quiet
};
function ul(e, a) {
  if (e === "stream") return hl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = dl[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function hl(e) {
  if (!e || !ya(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = An(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${cl.chip} ward-chip ward-chip--${e}`, style: ul(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function aa(e) {
  return typeof e == "number" && ya(e) ? e : null;
}
function Ee(e, a) {
  const t = aa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ka(e, a) {
  const t = aa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const ml = "_nav_j90m2_2", wl = "_list_j90m2_8", _l = "_item_j90m2_15", fl = "_link_j90m2_30", vl = "_sep_j90m2_40", bl = "_current_j90m2_44", pl = "_chips_j90m2_48", Ie = {
  nav: ml,
  list: wl,
  item: _l,
  link: fl,
  sep: vl,
  current: bl,
  chips: pl
};
function gl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ie.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ie.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ie.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Nl = "_field_fy549_2", yl = "_label_fy549_8", kl = "_labelHidden_fy549_15", $l = "_control_fy549_25", Cl = "_mono_fy549_44", Sl = "_area_fy549_49", Rl = "_invalid_fy549_56", Le = {
  field: Nl,
  label: yl,
  labelHidden: kl,
  control: $l,
  mono: Cl,
  area: Sl,
  invalid: Rl
}, Tl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function Ll({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Tl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function El({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Al({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const xl = { input: Ll, select: El, textarea: Al };
function Il(e, a, t) {
  const r = xl[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Ml(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ka(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function ql(e) {
  const a = e.mono ? [Le.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Le.area] : [];
  return [Le.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Pl(e) {
  return e ? `${Le.label} ${Le.labelHidden} ward-field-label` : `${Le.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Ml(e, a, t), l = ql(e);
  return /* @__PURE__ */ o("div", { className: `${Le.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Pl(e.labelHidden), htmlFor: a, children: e.label }),
    Il(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Le.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Bl(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function In(e) {
  const a = Bl(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function $a(e, a, t) {
  x(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = In(r);
      t == null || t(s.start || s.end);
    };
    r.addEventListener("scroll", l, { passive: !0 });
    const i = typeof ResizeObserver > "u" ? null : new ResizeObserver(l);
    for (const s of [r, ...r.children]) i == null || i.observe(s);
    return l(), () => {
      r.removeEventListener("scroll", l), i == null || i.disconnect();
    };
  }, [e, a, t]);
}
function Ol(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Mn(e, a, t) {
  Wa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = Ol(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), In(r);
  }, [e, a, t]);
}
const Dl = "_strip_kancu_2", jl = "_tab_kancu_32", Hl = "_count_kancu_75", Ze = {
  strip: Dl,
  tab: jl,
  count: Hl
}, ua = 7;
function Fl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function qn(e) {
  return `${Ze.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function p$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ua) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ua} — the set is fixed`);
  const i = ga({ orientation: "horizontal" }), s = Fl(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = g(null);
  return $a(c, e.length), Mn(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: qn(l),
      role: "tablist",
      "aria-label": r,
      "data-level": l,
      ...i.containerProps,
      children: e.map((d, u) => /* @__PURE__ */ o(
        "button",
        {
          id: `tab-${d.id}`,
          type: "button",
          role: "tab",
          className: `${Ze.tab} ward-tab`,
          "aria-selected": d.id === a,
          "aria-controls": `panel-${d.id}`,
          onClick: () => t(d.id),
          ...i.itemProps(u),
          children: [
            d.label,
            d.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ze.count, children: `· ${d.count}` })
            ] })
          ]
        },
        d.id
      ))
    }
  );
}
function g$({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ua) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ua} — the set is fixed`);
  const l = g(null);
  return $a(l, e.length), Mn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: qn(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${Ze.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Ze.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const Wl = "_root_jem6y_2", zl = "_segment_jem6y_7", cn = {
  root: Wl,
  segment: zl
};
function Pn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = ga({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return x(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${cn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: cn.segment,
      "aria-checked": d.value === a,
      disabled: l,
      "aria-describedby": i,
      onClick: () => t(d.value),
      ...s.itemProps(u),
      children: d.label
    },
    d.value
  )) });
}
const Gl = "_sidebar_1g24y_3", Ul = "_brand_1g24y_9", Kl = "_mark_1g24y_17", Vl = "_word_1g24y_24", Yl = "_nav_1g24y_30", Xl = "_navItem_1g24y_38", Jl = "_group_1g24y_50", Ql = "_groupName_1g24y_57", Zl = "_agents_1g24y_70", eo = "_agent_1g24y_70", ao = "_agentTop_1g24y_88", no = "_dot_1g24y_95", to = "_agentName_1g24y_107", ro = "_agentMeta_1g24y_120", lo = "_foot_1g24y_126", oo = "_footName_1g24y_132", io = "_footLinks_1g24y_139", so = "_footLink_1g24y_139", co = "_root_1g24y_153", uo = "_linkBrand_1g24y_162", ho = "_label_1g24y_183", mo = "_note_1g24y_188", wo = "_footer_1g24y_202", R = {
  sidebar: Gl,
  brand: Ul,
  mark: Kl,
  word: Vl,
  nav: Yl,
  navItem: Xl,
  group: Jl,
  groupName: Ql,
  new: "_new_1g24y_64",
  agents: Zl,
  agent: eo,
  agentTop: ao,
  dot: no,
  agentName: to,
  agentMeta: ro,
  foot: lo,
  footName: oo,
  footLinks: io,
  footLink: so,
  root: co,
  linkBrand: uo,
  label: ho,
  note: mo,
  footer: wo
};
function _o({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: R.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: R.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: R.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": An(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function fo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function vo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: R.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: R.brand, children: [
      /* @__PURE__ */ n("span", { className: R.mark }),
      /* @__PURE__ */ n("span", { className: R.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: R.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: R.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: R.group, children: [
      /* @__PURE__ */ o("span", { className: R.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: R.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(_o, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(fo, { shared: i })
  ] });
}
function bo(e) {
  return e.destinations ?? e.items ?? [];
}
function po({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function go({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function No({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function yo(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(po, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: bo(e).map((a) => /* @__PURE__ */ n(No, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(go, { children: e.children })
  ] });
}
function ko(e) {
  return "agents" in e;
}
function N$(e) {
  return ko(e) ? /* @__PURE__ */ n(vo, { ...e }) : /* @__PURE__ */ n(yo, { ...e });
}
const $o = "_mark_wlgi8_3", Co = {
  mark: $o
}, So = { met: "✓", unmet: "", failed: "✕" };
function Va({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Co.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: So[e]
    }
  );
}
const Ro = "_marker_br9fi_2", To = {
  marker: Ro
}, Lo = {
  stream: "var(--stream)",
  green: "var(--ward-color-green)",
  blue: "var(--ward-color-blue)",
  orange: "var(--ward-color-orange)",
  red: "var(--ward-color-red)",
  amber: "var(--ward-color-amber)",
  neutral: "var(--ward-color-faint)",
  // Fill hues, not ink hues: greenFill is 4.32:1 on white, so a Marker using it stays decorative.
  greenFill: "var(--ward-color-greenFill)",
  orangeFill: "var(--ward-color-orangeFill)",
  ok: "var(--ward-color-green)",
  finding: "var(--ward-color-orange)",
  action: "var(--ward-color-text)",
  hollow: "var(--ward-color-faint)",
  attention: "var(--ward-color-warning)",
  tick: "var(--ward-color-green)",
  box: "var(--ward-color-line2)"
};
function Ae({ size: e, kind: a, label: t }) {
  const r = { "--marker": Lo[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${To.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Eo = "_root_ti0pq_2", Ao = "_chip_ti0pq_11", xo = "_noCase_ti0pq_23", ra = {
  root: Eo,
  chip: Ao,
  noCase: xo
};
function Io(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ya({ connection: e, since: a, lastEventAt: t }) {
  const r = Io(a, t), l = Ga(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${ra.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${ra.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: ra.noCase, children: za(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${ra.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const Mo = "_root_k8vuh_2", qo = "_context_k8vuh_12", Po = "_row_k8vuh_1", Bo = "_heading_k8vuh_25", Oo = "_headingWrap_k8vuh_33", Do = "_chips_k8vuh_38", jo = "_title_k8vuh_45", Ho = "_consequence_k8vuh_54", Fo = "_actionsWrap_k8vuh_59", Wo = "_actions_k8vuh_59", zo = "_action_k8vuh_59", Go = "_overflowPanel_k8vuh_78", Uo = "_measureClip_k8vuh_89", Ko = "_measure_k8vuh_89", Z = {
  root: Mo,
  context: qo,
  row: Po,
  heading: Bo,
  headingWrap: Oo,
  chips: Do,
  title: jo,
  consequence: Ho,
  actionsWrap: Fo,
  actions: Wo,
  action: zo,
  overflowPanel: Go,
  measureClip: Uo,
  measure: Ko
};
function Vo({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, title: t, children: a })
  ] });
}
function Ba({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function dn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Yo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(dn, { disclosure: l }) : a ? [/* @__PURE__ */ n(dn, { disclosure: l }, "more"), /* @__PURE__ */ n(Ba, { actions: e }, "actions")] : /* @__PURE__ */ n(Ba, { actions: e });
}
function Xo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Jo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ba, { actions: e }) });
}
function Qo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Zo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(gl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function ei(...e) {
  return e.some((a) => a === null);
}
function ai(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ni(e, a, t, r, l) {
  if (l === 0 || ei(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = ai(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function ti(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ri(e) {
  const a = g(null), t = g(null), r = g(null), l = g(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!ti(c)) return;
    const d = () => s(ni(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function li({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function oi({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ya, { connection: e.connection, since: e.since }) : null;
}
function y$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: N, collapsed: I } = ri(i), j = s.length > 0, { disclosure: oe, close: $e } = Qo(I || j, b), ne = Xo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(Zo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Vo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(oi, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Yo, { actions: i, hasMore: j, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Jo, { actions: ne, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(li, { actions: i, hasMore: j, measureRef: N })
  ] });
}
const ii = "_scrim_c7sqj_2", si = "_drawer_c7sqj_10", ci = "_sheet_c7sqj_14", di = "_modal_c7sqj_18", ui = "_panel_c7sqj_23", hi = "_header_c7sqj_51", mi = "_title_c7sqj_59", wi = "_body_c7sqj_63", _i = "_close_c7sqj_90", Ne = {
  scrim: ii,
  drawer: si,
  sheet: ci,
  modal: di,
  panel: ui,
  header: hi,
  title: mi,
  body: wi,
  close: _i
}, fi = He(null), ha = [], ma = /* @__PURE__ */ new Map();
function vi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function bi(e, a) {
  let t = ma.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ma.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function pi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !vi(r) && bi(e, r);
}
function gi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (pi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function Ni(e) {
  for (const a of e.claims) {
    const t = ma.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ma.delete(a)));
  }
}
function yi(e, a) {
  const t = { root: e, claims: [] };
  return ha.push(t), gi(t, a), t;
}
function ki(e) {
  const a = ha.indexOf(e);
  a >= 0 && ha.splice(a, 1), Ni(e);
}
function un(e) {
  return e !== null && ha.at(-1) === e;
}
function $i(e, a, t) {
  const r = g(null), l = g(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = yi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = un(c);
      ki(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => un(r.current), []);
}
function Ci(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Si(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ri({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${Ne.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${Ne.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${Ne.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ti(e) {
  return `${Ne.scrim} ${Ne[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Li(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${Ne.panel} ${Ne[e]} ward-overlay-panel${t}${r}`;
}
function Ei(e) {
  const a = je(fi);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = g(null), t = g(null), r = $(), l = Ei(e.container), i = Ua("(min-width: 768px)"), s = Ci(e.kind, i), c = Si(e, r), d = Dt(t), u = $i(a, l, e.returnFocusTo), h = X(() => {
    u() && e.onClose();
  }, [e.onClose, u]);
  return x(() => {
    var f, b;
    u() && ((b = (f = t.current) == null ? void 0 : f.querySelector("button")) == null || b.focus());
  }, [u]), x(() => {
    const f = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", f), () => document.removeEventListener("keydown", f);
  }, [h]), At(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ti(s),
        "data-ward-overlay-kind": s,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ o(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": c.labelledBy,
            "aria-label": c.label,
            className: Li(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${Ne.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ri, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Ai = "_root_drrhx_2", xi = "_ticket_drrhx_15", Ii = "_body_drrhx_24", La = {
  root: Ai,
  ticket: xi,
  body: Ii
};
function k$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${La.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${La.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: La.body, children: t })
  ] });
}
const Mi = "_root_bf1pc_2", qi = "_table_bf1pc_9", Pi = "_caption_bf1pc_14", Bi = "_series_bf1pc_23", Oi = "_category_bf1pc_31", Di = "_cell_bf1pc_39", ji = "_track_bf1pc_45", Hi = "_lane_bf1pc_52", Fi = "_bar_bf1pc_56", Wi = "_value_bf1pc_63", zi = "_swatch_bf1pc_70", Gi = "_empty_bf1pc_78", V = {
  root: Mi,
  table: qi,
  caption: Pi,
  series: Bi,
  category: Oi,
  cell: Di,
  track: ji,
  lane: Hi,
  bar: Fi,
  value: Wi,
  swatch: zi,
  empty: Gi
}, Ui = "—", hn = 6;
function Ki(e, a) {
  if (a.length < 1 || a.length > hn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${hn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Vi(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Bn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Yi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Xi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Yi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Ji({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": Bn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Qi({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Zi({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Ui }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Ji, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Xi, { value: u.values[d], top: r, step: Bn(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function $$(e) {
  Ki(e.categories, e.series);
  const a = Vi(e.series);
  return a === 0 ? /* @__PURE__ */ n(Qi, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Zi, { ...e, top: a });
}
const es = "_root_1bfqw_2", as = "_figure_1bfqw_7", ns = "_of_1bfqw_13", ts = "_bar_1bfqw_18", rs = "_rows_1bfqw_38", ls = "_row_1bfqw_38", os = "_label_1bfqw_49", is = "_amount_1bfqw_54", Ce = {
  root: es,
  figure: as,
  of: ns,
  bar: ts,
  rows: rs,
  row: ls,
  label: os,
  amount: is
};
function ss({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Ce.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Ce.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Ce.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ce.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ce.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Ce.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ce.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Ce.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const cs = "_frame_mg2jl_2", ds = "_table_mg2jl_6", us = "_th_mg2jl_12", hs = "_td_mg2jl_13", ms = "_sort_mg2jl_47", ws = "_row_mg2jl_53", _s = "_empty_mg2jl_61", Re = {
  frame: cs,
  table: ds,
  th: us,
  td: hs,
  sort: ms,
  row: ws,
  empty: _s
}, fs = { asc: "ascending", desc: "descending" };
function vs(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return fs[a.direction];
}
function bs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ps(e) {
  return e === void 0 ? void 0 : { width: e };
}
function gs({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: ps(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": vs(e, a),
      children: bs(e, t)
    }
  );
}
function Ns({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Re.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: Re.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function ys({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: l,
  selectedId: i,
  lockedIds: s = [],
  sort: c,
  onSort: d,
  empty: u
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Re.empty, children: u }) : /* @__PURE__ */ n("div", { className: Re.frame, children: /* @__PURE__ */ o("table", { className: Re.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(gs, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(Ns, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const ks = "_list_v0s52_2", $s = {
  list: ks
};
function C$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: $s.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Cs = "_label_1u62a_2", Ss = {
  label: Cs
};
function S$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Ss.label, children: a.header }) }, a.key)) }) });
}
const Rs = "_stack_bp6a0_2", Ts = {
  stack: Rs
};
function R$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Ts.stack, "data-ward-action-stack": "", children: e });
}
const Ls = "_set_y5zy3_2", Es = "_legend_y5zy3_7", As = "_row_y5zy3_15", xs = "_control_y5zy3_20", Is = "_input_y5zy3_26", Ms = "_label_y5zy3_31", qs = "_consequence_y5zy3_36", Me = {
  set: Ls,
  legend: Es,
  row: As,
  control: xs,
  input: Is,
  label: Ms,
  consequence: qs
};
function On({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
  const d = $(), u = i ?? d;
  return /* @__PURE__ */ o("fieldset", { className: Me.set, "data-variant": c, children: [
    /* @__PURE__ */ n("legend", { className: Me.legend, children: e }),
    a.map((h) => {
      const f = `${u}-${h.value}`, b = h.consequence ? `${f}-note` : void 0;
      return /* @__PURE__ */ o("div", { className: Me.row, children: [
        /* @__PURE__ */ o("span", { className: Me.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: f,
              type: "radio",
              name: u,
              className: Me.input,
              value: h.value,
              checked: t === h.value,
              disabled: l,
              "aria-describedby": Ka(b, s),
              onChange: () => !l && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: f, className: Me.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Me.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const Ps = "_root_cetd4_2", Bs = "_head_cetd4_11", Os = "_note_cetd4_31", Ds = "_index_cetd4_36", js = "_dot_cetd4_40", Hs = "_counter_cetd4_51", Fs = "_trailing_cetd4_59", Pe = {
  root: Ps,
  head: Bs,
  note: Os,
  index: Ds,
  dot: js,
  counter: Hs,
  trailing: Fs
};
function Ws({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function zs({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function mn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ n(Ws, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Pe.note, children: t }),
    /* @__PURE__ */ n(zs, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Pe.trailing, children: i })
  ] });
}
const Gs = "_strip_1cw2w_2", Us = "_cell_1cw2w_7", Ks = "_value_1cw2w_12", Vs = "_link_1cw2w_28", Ys = "_linkValue_1cw2w_37", Xs = "_label_1cw2w_48", Te = {
  strip: Gs,
  cell: Us,
  value: Ks,
  link: Vs,
  linkValue: Ys,
  label: Xs
};
function Js(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Dn = (e) => `${Te.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Qs({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Te.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Dn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Te.label} ward-stat-label`, children: e.label })
  ] });
}
function Zs({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Te.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Dn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Te.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { className: Te.linkValue, children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Te.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ca({ cells: e, divided: a = !1 }) {
  return Js(e), /* @__PURE__ */ n("dl", { className: `${Te.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(Qs, { cell: t }, t.label) : /* @__PURE__ */ n(Zs, { cell: t, href: t.href }, t.label)) });
}
const ec = "_root_xk7sv_2", ac = "_track_xk7sv_8", nc = "_thumb_xk7sv_35", tc = "_labelHidden_xk7sv_53", rc = "_label_xk7sv_53", lc = "_lockedNote_xk7sv_68", Be = {
  root: ec,
  track: ac,
  thumb: nc,
  labelHidden: tc,
  label: rc,
  lockedNote: lc
};
function oc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), d = l ? !0 : a, u = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": d,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": d,
        "data-locked": l ? !0 : void 0,
        disabled: u,
        onClick: () => !u && (t == null ? void 0 : t(!d)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("span", { id: c, className: oc(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const ic = "_bar_1o04s_2", sc = "_skip_1o04s_11", cc = "_mark_1o04s_22", dc = "_nav_1o04s_30", uc = "_list_1o04s_34", hc = "_select_1o04s_40", mc = "_dest_1o04s_47", wc = "_actor_1o04s_75", _c = "_actorMark_1o04s_88", fc = "_actorLabel_1o04s_93", vc = "_tagline_1o04s_112", de = {
  bar: ic,
  skip: sc,
  mark: cc,
  nav: dc,
  list: uc,
  select: hc,
  dest: mc,
  actor: wc,
  actorMark: _c,
  actorLabel: fc,
  tagline: vc
};
function bc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function pc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function T$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = pc(r);
  return /* @__PURE__ */ o("header", { className: de.bar, children: [
    /* @__PURE__ */ n("a", { className: `${de.skip} ward-target`, href: `#${s}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: de.mark, children: e }),
    l && /* @__PURE__ */ n("span", { className: de.tagline, children: l }),
    /* @__PURE__ */ o("nav", { className: de.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: de.list, children: a.map((d) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: `${de.dest} ward-target`,
          href: W(d.href),
          "aria-current": d.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(d.id),
          children: d.label
        }
      ) }, d.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: de.select,
          "aria-label": "Destination",
          value: t,
          onChange: (d) => i == null ? void 0 : i(d.target.value),
          children: a.map((d) => /* @__PURE__ */ n("option", { value: d.id, children: d.label }, d.id))
        }
      )
    ] }),
    c && /* @__PURE__ */ o("span", { className: de.actor, children: [
      /* @__PURE__ */ n("span", { className: de.actorLabel, children: c }),
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: bc(c) })
    ] })
  ] });
}
const gc = "_tree_1lyby_2", Nc = "_item_1lyby_6", yc = "_row_1lyby_10", kc = "_button_1lyby_22", wa = {
  tree: gc,
  item: Nc,
  row: yc,
  button: kc
}, jn = He(null);
function $c({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ga({ orientation: "vertical" });
  return /* @__PURE__ */ n(jn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: wa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Cc = { ArrowRight: !0, ArrowLeft: !1 };
function wn(e) {
  return e ? !0 : void 0;
}
function Sc(e, a) {
  const t = Cc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Rc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Tc(e) {
  const a = [wa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Lc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Ec(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Ac(e) {
  return typeof e == "string" ? e : void 0;
}
function xc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Ic({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function Hn(e) {
  const a = je(jn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Lc(e);
  return /* @__PURE__ */ o("li", { className: wa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Tc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": wn(e.unresolved),
        "data-inherited": wn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${wa.button} ward-treeitem-btn`,
            onClick: () => Rc(e),
            onKeyDown: (r) => Sc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Ec(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Ac(e.label), children: e.label }),
              /* @__PURE__ */ n(xc, { value: e.detail }),
              /* @__PURE__ */ n(Ic, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Mc = "_frame_1fj9j_2", qc = "_subjectRail_1fj9j_22", Pc = "_subject_1fj9j_22", Bc = "_rail_1fj9j_42", Oc = "_record_1fj9j_64", Dc = "_recordBody_1fj9j_69", jc = "_stageGrid_1fj9j_118", Hc = "_band_1fj9j_144", Fc = "_bandBody_1fj9j_153", Wc = "_bandActions_1fj9j_158", zc = "_scroller_1fj9j_166", Gc = "_board_1fj9j_192", Uc = "_laneCount_1fj9j_200", Kc = "_lanes_1fj9j_210", Y = {
  frame: Mc,
  subjectRail: qc,
  subject: Pc,
  rail: Bc,
  record: Oc,
  recordBody: Dc,
  stageGrid: jc,
  band: Hc,
  bandBody: Fc,
  bandActions: Wc,
  scroller: zc,
  board: Gc,
  laneCount: Uc,
  lanes: Kc
};
function L$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function _n(e) {
  return e ? "true" : void 0;
}
function E$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": _n(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": _n(l), "aria-label": r, children: a })
  ] });
}
function A$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(mn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(mn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Vc = "_form_1j8ub_2", Yc = "_fields_1j8ub_9", Xc = "_actions_1j8ub_19", Ea = {
  form: Vc,
  fields: Yc,
  actions: Xc
};
function x$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ea.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ea.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ea.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function I$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Jc = "(max-width: 767.98px)";
function Xa({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = g(null);
  $a(l, t ?? Lt.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Qc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Xa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Zc({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Xa, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(Et, { children: l.content }, l.id)) })
  ] });
}
function M$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ua(Jc);
  return t === void 0 ? /* @__PURE__ */ n(Xa, { label: a, children: e }) : l ? /* @__PURE__ */ n(Qc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Zc, { lanes: t, label: a });
}
function q$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = g(null), i = Math.max(e, 1);
  $a(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const ed = "_block_1o5o7_2", ad = "_sentence_1o5o7_15", nd = "_meta_1o5o7_20", td = "_action_1o5o7_25", rd = "_strip_1o5o7_29", ld = "_loading_1o5o7_48", od = "_label_1o5o7_56", id = "_counter_1o5o7_63", _e = {
  block: ed,
  sentence: ad,
  meta: nd,
  action: td,
  strip: rd,
  loading: ld,
  label: od,
  counter: id
};
function sd({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function Sa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(sd, { action: a })
  ] });
}
function cd(e) {
  return /* @__PURE__ */ n(Sa, { ...e, kind: "ward-emptystate" });
}
function P$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Sa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function B$(e) {
  return /* @__PURE__ */ n(Sa, { ...e });
}
function O$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Sa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function D$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function j$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function H$({ label: e, startedAt: a }) {
  const t = g(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  x(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Ga(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: za(i) }) : null
  ] });
}
const dd = "_note_tlubt_2", ud = {
  note: dd
};
function hd({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: ud.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const md = "_card_12in3_2", wd = "_hit_12in3_23", _d = "_head_12in3_30", fd = "_title_12in3_36", vd = "_meta_12in3_44", bd = "_fields_12in3_45", pd = "_who_12in3_58", gd = "_sep_12in3_65", Nd = "_mono_12in3_69", yd = "_field_12in3_45", kd = "_last_12in3_84", $d = "_reason_12in3_96", J = {
  card: md,
  hit: wd,
  head: _d,
  title: fd,
  meta: vd,
  fields: bd,
  who: pd,
  sep: gd,
  mono: Nd,
  field: yd,
  last: kd,
  reason: $d
}, Cd = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Sd(e, a, t) {
  const r = ia(e, "blue"), l = ia(e, "orange"), i = ia(e, "green"), s = g(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Cd[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const Rd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Td(e, a) {
  return Rd[a](e);
}
function Ld({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ o("span", { className: J.mono, children: [
      se(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function Ed({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Ad({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function xd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: Td(e, t) }, t)) });
}
const Oa = (e) => e ? !0 : void 0;
function Id(e) {
  return { "--stream": Ee(e.streamStep, "id") };
}
function Md(e, a, t) {
  e == null || e(a, t);
}
function qd(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Pd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": Oa(a), children: t }) : null;
}
function Ra(e) {
  const a = e.fields ?? [], t = e.item, r = g(null);
  Sd(r, t.key, e.feed);
  const l = qd(e.feed), i = Id(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: J.card,
      style: i,
      "data-selected": Oa(e.selected),
      "data-flagged": Oa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Md(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Ed, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(Ld, { item: t, connection: l }),
        /* @__PURE__ */ n(Ad, { reason: t.blockedReason }),
        /* @__PURE__ */ n(xd, { item: t, fields: a }),
        /* @__PURE__ */ n(Pd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Bd = "_column_10sxg_3", Od = "_head_10sxg_24", Dd = "_label_10sxg_33", jd = "_count_10sxg_42", Hd = "_list_10sxg_56", Je = {
  column: Bd,
  head: Od,
  label: Dd,
  count: jd,
  list: Hd
};
function Fn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Fd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Wd(e) {
  return /* @__PURE__ */ n("div", { className: Je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      Ra,
      {
        item: a,
        fields: e.fields,
        onOpen: e.onOpen,
        selected: a.key === e.selectedKey,
        feed: e.feed,
        rovingProps: (r = e.roving) == null ? void 0 : r.itemProps(e.roving.base + t),
        inList: !0
      },
      a.key
    );
  }) });
}
function zd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Fn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Fd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Wd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(hd, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Gd = "_foot_8qg4p_2", Ud = "_note_8qg4p_13", Kd = "_link_8qg4p_19", Aa = {
  foot: Gd,
  note: Ud,
  link: Kd
};
function F$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Aa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Aa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Aa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Vd = "_head_1la6p_3", Yd = "_identity_1la6p_12", Xd = "_titleRow_1la6p_18", Jd = "_title_1la6p_18", Qd = "_key_1la6p_35", Zd = "_rollup_1la6p_45", eu = "_tools_1la6p_53", au = "_swatch_1la6p_62", nu = "_mark_1la6p_69", pe = {
  head: Vd,
  identity: Yd,
  titleRow: Xd,
  title: Jd,
  key: Qd,
  rollup: Zd,
  tools: eu,
  swatch: au,
  mark: nu
}, fn = "initials:";
function tu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function ru(e) {
  const a = [tu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function lu(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    ru(e)
  ] });
}
function ou(e) {
  return e.startsWith(fn) ? e.slice(fn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function iu({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ee(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: ou(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function su({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function W$({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: l,
  owner: i,
  onOwnerChange: s,
  onConfigure: c,
  actions: d
}) {
  return /* @__PURE__ */ o("div", { className: pe.head, children: [
    /* @__PURE__ */ o("div", { className: pe.identity, children: [
      /* @__PURE__ */ o("div", { className: pe.titleRow, children: [
        /* @__PURE__ */ n(iu, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: lu(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(su, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Ya, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const cu = "_head_kabyh_11", du = "_line_kabyh_12", uu = "_cHandle_kabyh_33", hu = "_cName_kabyh_38", mu = "_nameLine_kabyh_46", wu = "_cLabel_kabyh_53", _u = "_cCap_kabyh_58", fu = "_cShown_kabyh_63", vu = "_name_kabyh_46", bu = "_noCap_kabyh_85", pu = "_state_kabyh_99", gu = "_handle_kabyh_104", Nu = "_sub_kabyh_118", P = {
  head: cu,
  line: du,
  cHandle: uu,
  cName: hu,
  nameLine: mu,
  cLabel: wu,
  cCap: _u,
  cShown: fu,
  name: vu,
  noCap: bu,
  state: pu,
  handle: gu,
  sub: Nu
}, yu = "can't be hidden or collapsed", ku = "terminal · counted, not a column";
function z$() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.cHandle }),
    /* @__PURE__ */ n("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: P.cShown, children: "Shown" })
  ] });
}
function $u(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Cu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function vn(e) {
  return e.gate ? yu : e.terminal ? ku : Cu(e.agentsMounted);
}
function Su(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Ru({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    vn(e) && /* @__PURE__ */ n("span", { className: P.sub, children: vn(e) })
  ] });
}
function Tu(e) {
  return e === void 0 ? "" : String(e);
}
function Lu(e) {
  return e === "" ? void 0 : Number(e);
}
function Eu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: P.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Su(t, a),
      children: "⠿"
    }
  ) });
}
function Au({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: P.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Tu(a.cap), onChange: (r) => t({ ...a, cap: Lu(r) }) }) });
}
function xu({ stage: e, config: a, onChange: t }) {
  const r = $u(e, a.shown);
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: P.state, "aria-hidden": "true", children: r.state })
  ] });
}
function Iu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function G$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Iu(e), children: [
    /* @__PURE__ */ n(Eu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Ru, { stage: e }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Au, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(xu, { stage: e, config: a, onChange: t })
  ] });
}
const Mu = "_body_hn6d6_2", qu = "_head_hn6d6_9", Pu = "_summary_hn6d6_19", Bu = "_block_hn6d6_20", Ou = "_actionsBlock_hn6d6_21", Du = "_title_hn6d6_41", ju = "_note_hn6d6_46", Hu = "_k_hn6d6_51", Fu = "_kv_hn6d6_58", Wu = "_row_hn6d6_64", zu = "_label_hn6d6_75", Gu = "_value_hn6d6_84", Uu = "_quote_hn6d6_90", Ku = "_actions_hn6d6_21", Vu = "_resolve_hn6d6_103", B = {
  body: Mu,
  head: qu,
  summary: Pu,
  block: Bu,
  actionsBlock: Ou,
  title: Du,
  note: ju,
  k: Hu,
  kv: Fu,
  row: Wu,
  label: zu,
  value: Gu,
  quote: Uu,
  actions: Ku,
  resolve: Vu
};
function Yu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Xu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ju(e) {
  const a = aa(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Qu(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ka(Ju(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Yu(e),
    ...Xu(e, a)
  ];
}
function Zu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function eh({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function ah({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function U$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Qu(e, l);
  return /* @__PURE__ */ n(na, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(eh, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(ah, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: B.note, children: c })
    ] }),
    /* @__PURE__ */ n(Zu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const nh = "_root_3azmy_2", th = "_list_3azmy_7", rh = "_item_3azmy_12", lh = "_box_3azmy_18", oh = "_text_3azmy_23", ih = "_note_3azmy_28", ze = {
  root: nh,
  list: th,
  item: rh,
  box: lh,
  text: oh,
  note: ih
};
function Ta({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: ze.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: ze.box, children: /* @__PURE__ */ n(Va, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: ze.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${ze.note} ward-checklist-note`, children: a })
  ] });
}
const sh = "_rail_ke7ch_2", ch = "_k_ke7ch_11", dh = "_head_ke7ch_19", uh = "_section_ke7ch_25", hh = "_card_ke7ch_38", mh = "_strip_ke7ch_42", wh = "_skeleton_ke7ch_56", _h = "_skeletonLabel_ke7ch_70", fh = "_bar_ke7ch_76", vh = "_note_ke7ch_85", he = {
  rail: sh,
  k: ch,
  head: dh,
  section: uh,
  card: hh,
  strip: mh,
  skeleton: wh,
  skeletonLabel: _h,
  bar: fh,
  note: vh
};
function bh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function xa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function ph({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function gh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(zd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function Nh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(gh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(ph, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function K$(e) {
  const a = bh(e.onOpen), t = Fn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(xa, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n(Ra, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(xa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Nh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(xa, { title: "Effect of this config", children: /* @__PURE__ */ n(Ta, { items: e.effects, density: "compact" }) })
  ] });
}
function yh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function kh(e) {
  return Math.ceil(e.length / 2);
}
function $h(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Wn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Ch(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = Wn(e);
  l !== void 0 && t(l), r($h(e.type));
}
function Sh(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Ch(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Rh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Th(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Lh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Eh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(kh(a ?? [])) + ")"
  };
}
function Ah(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function xh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Ih(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Mh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function qh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Ph(e, a) {
  return a === void 0 ? e : yh(e, a.ref);
}
function Bh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ea(e) {
  return e === !0 ? "true" : void 0;
}
function zn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = g(null), i = ia(l), s = g(/* @__PURE__ */ new Set()), [c, d] = p(Rh(a));
  Sh(e.feed, a.key, s, d, i);
  const u = Th(a, r), h = Lh(a, t), f = Eh(a, e.fields), b = qh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Bh(e),
      className: "ward-workcard",
      "data-flagged": ea(a.flagged),
      "data-selected": ea(e.selected),
      style: f,
      ref: Ph(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Ah(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          xh(a, e.fields),
          Ih(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Mh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Oh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Dh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function jh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Hh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Oh, { count: e.items.length, cap: e.column.cap });
}
function Fh(e, a) {
  return e.roving ?? a;
}
function Wh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function zh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    zn,
    {
      item: t,
      fields: e.fields,
      onOpen: e.onOpen,
      selected: t.key === e.selectedKey,
      feed: e.feed,
      connection: e.connection,
      rovingItem: a.itemProps(r)
    },
    t.key
  ));
}
function Gh(e) {
  const a = $(), t = ga({ orientation: "vertical" }), r = Fh(e, t), l = Dh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ea(l), "data-gate": ea(e.column.gate), children: [
    jh(e.column, e.items.length, a),
    Hh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Wh(e, t), children: zh(e, r) })
  ] });
}
function Uh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Kh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Vh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function V$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Uh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Kh(e),
      Vh(e.onConfigure),
      /* @__PURE__ */ n(Ya, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Yh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Xh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Jh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Y$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ea(Yh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Xh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(xn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Jh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function X$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(zn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Gh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Qh(e, a) {
  const t = Wn(e);
  t !== void 0 && a(t);
}
function Zh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Qh(r, t));
  }, [e, a, t]);
}
function em(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function am(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function nm(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function tm(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function J$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Zh(e.feed, a.key, l);
  const i = [...em(a), ...am(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      nm(t, r)
    ] }),
    tm(a, e.actions)
  ] });
}
const rm = "_card_d2vbe_2", lm = "_head_d2vbe_22", om = "_mark_d2vbe_30", im = "_name_d2vbe_42", sm = "_chips_d2vbe_63", cm = "_description_d2vbe_69", dm = "_run_d2vbe_74", um = "_sep_d2vbe_83", hm = "_facts_d2vbe_88", mm = "_fact_d2vbe_88", wm = "_factLabel_d2vbe_101", _m = "_factValue_d2vbe_105", le = {
  card: rm,
  head: lm,
  mark: om,
  name: im,
  chips: sm,
  description: cm,
  run: dm,
  sep: um,
  facts: hm,
  fact: mm,
  factLabel: wm,
  factValue: _m
}, fm = { live: "done", draft: "running", paused: "meta" };
function vm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function bm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: fm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function pm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function gm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Nm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function ym(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function km({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Ee(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: vm(s),
      style: c,
      "data-selected": d,
      "data-paused": ym(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(pm, { description: e.description }),
        /* @__PURE__ */ n(gm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(bm, { versions: e.versions }),
        /* @__PURE__ */ n(Nm, { facts: i })
      ]
    }
  );
}
const $m = "_list_4dcyc_2", Cm = "_row_4dcyc_11", Sm = "_head_4dcyc_23", Rm = "_id_4dcyc_30", Tm = "_lock_4dcyc_35", Lm = "_reason_4dcyc_41", Em = "_remove_4dcyc_46", Am = "_clauses_4dcyc_50", xm = "_clause_4dcyc_50", Im = "_label_4dcyc_64", Mm = "_cell_4dcyc_71", qm = "_value_4dcyc_76", ie = {
  list: $m,
  row: Cm,
  head: Sm,
  id: Rm,
  lock: Tm,
  reason: Lm,
  remove: Em,
  clauses: Am,
  clause: xm,
  label: Im,
  cell: Mm,
  value: qm
}, Gn = He(!1);
function Q$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Gn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Pm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Bm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Om({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Bm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function bn(e, a) {
  return e.locked ? void 0 : a;
}
function Z$({ rule: e, onChange: a, onRemove: t }) {
  if (!je(Gn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = bn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Om, { rule: e, onRemove: bn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Pm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Dm = "_ladder_wwnch_2", jm = "_cell_wwnch_7", Hm = "_empty_wwnch_26", Fm = "_name_wwnch_34", Wm = "_holder_wwnch_40", zm = "_request_wwnch_46", Gm = "_swatches_wwnch_51", Um = "_swatch_wwnch_51", Km = "_tilesFrame_wwnch_78", Vm = "_tiles_wwnch_78", Ym = "_tile_wwnch_78", Xm = "_bar_wwnch_117", Jm = "_hex_wwnch_128", Qm = "_note_wwnch_138", L = {
  ladder: Dm,
  cell: jm,
  empty: Hm,
  name: Fm,
  holder: Wm,
  request: zm,
  swatches: Gm,
  swatch: Um,
  tilesFrame: Km,
  tiles: Vm,
  tile: Ym,
  bar: Xm,
  hex: Jm,
  note: Qm
}, Zm = "not validated yet, pending a CVD matrix and dark stepping";
function ew(e) {
  return e.reserved ? "reserved" : ya(e.step) ? "validated" : "partial";
}
function Un(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function aw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function nw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function tw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function rw(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const pn = (e) => String(e).padStart(2, "0");
function lw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Un(e, void 0);
}
function ow({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${pn(e)}` : Ut(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${pn(e)} · ${t}` })
  ] });
}
function iw({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = ew(e), s = Un(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...rw(c, d), "data-validation": i, style: aw(e, i), onClick: h, onKeyDown: (N) => tw(N, h) }, label: f, name: u, holder: s, validation: i, note: lw(i, t, d), step: e.step };
}
const sw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(ow, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(nw, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function cw(e) {
  return sw[e.presentation](iw(e));
}
function dw(e) {
  for (const a of e)
    if (!a.reserved && !Na(a.step)) throw new Error("colour ladder renders token steps only");
}
function uw() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function hw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const mw = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function ww() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const _w = { list: uw, swatches: () => null, tiles: ww };
function Kn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  dw(e.steps);
  const r = hw(e), l = _w[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(cw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${mw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const fw = "_rail_1el2t_2", vw = "_section_1el2t_12", bw = "_sectionFlush_1el2t_22", pw = "_head_1el2t_26", gw = "_headLabel_1el2t_34", Nw = "_sample_1el2t_42", yw = "_sampleLabel_1el2t_47", kw = "_sampleTitle_1el2t_54", $w = "_sampleMeta_1el2t_59", Cw = "_trace_1el2t_65", Sw = "_traceHead_1el2t_70", Rw = "_steps_1el2t_78", Tw = "_step_1el2t_78", Lw = "_stepTitle_1el2t_97", Ew = "_hollow_1el2t_107", Aw = "_stepBody_1el2t_115", xw = "_stepDetail_1el2t_127", Iw = "_publish_1el2t_132", Mw = "_reason_1el2t_138", qw = "_note_1el2t_143", Pw = "_reveal_1el2t_148", y = {
  rail: fw,
  section: vw,
  sectionFlush: bw,
  head: pw,
  headLabel: gw,
  sample: Nw,
  sampleLabel: yw,
  sampleTitle: kw,
  sampleMeta: $w,
  trace: Cw,
  traceHead: Sw,
  steps: Rw,
  step: Tw,
  stepTitle: Lw,
  hollow: Ew,
  stepBody: Aw,
  stepDetail: xw,
  publish: Iw,
  reason: Mw,
  note: qw,
  reveal: Pw
}, gn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Bw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Ow = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Dw = { notSimulated: "not simulated", running: "running" };
function jw(e) {
  return e.presentation === "foundry";
}
function Hw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Fw(e, a) {
  var r;
  const t = Bw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Ww(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function zw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Gw(e) {
  if (Ww(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Uw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Kw(e) {
  const a = Dw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: Ow[e.kind], label: e.kind });
}
function Vw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Yw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Xw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Uw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Kw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Vw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Yw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Jw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Vn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: Jw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Xw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Qw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${y.sample} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: y.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: y.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Zw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function e_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ln(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function a_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Ln(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function n_(e) {
  const a = a_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: y.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function Yn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${y.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function t_(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(Yn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function r_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(Yn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Xn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: gn[e.run.status].role, label: gn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function l_(e, a) {
  const [t, r] = p(e.steps);
  return x(() => r(e.steps), [e.steps]), x(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (l) => {
        (l.type === "run.step" || l.type === "run.finding") && r((i) => {
          var s, c;
          return [...i, { kind: l.type === "run.finding" ? "finding" : "action", title: ((s = l.step) == null ? void 0 : s.label) ?? "step", detail: (c = l.step) == null ? void 0 : c.tool }];
        });
      });
  }, [a, e.status]), t;
}
function o_(e) {
  var t;
  zw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Xn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Qw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Vn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(e_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist }) }),
    /* @__PURE__ */ n(t_, { reason: Hw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function i_(e) {
  var r;
  const a = l_(e.run, e.feed);
  Gw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Xn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Zw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Vn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(n_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(r_, { reason: Fw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function eC(e) {
  return jw(e) ? /* @__PURE__ */ n(i_, { ...e }) : /* @__PURE__ */ n(o_, { ...e });
}
const s_ = "_list_142ip_3", c_ = "_row_142ip_9", d_ = "_condition_142ip_18", u_ = "_action_142ip_24", sa = {
  list: s_,
  row: c_,
  condition: d_,
  action: u_
}, Jn = He(!1);
function aC({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Jn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: sa.list, "aria-label": a, children: e }) });
}
function nC({ rule: e }) {
  if (!je(Jn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: sa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: sa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: sa.action, children: e.then })
  ] });
}
function Da(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Qn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Zn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function Nn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function h_(e) {
  return e === "up" ? "down" : "up";
}
function m_(e, a) {
  const t = Nn(e, a.id, a.direction) ?? Nn(e, a.id, h_(a.direction));
  t == null || t.focus();
}
function et() {
  const e = g(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && m_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function at({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function _a({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const w_ = "_body_1h15q_2", __ = "_title_1h15q_8", f_ = "_section_1h15q_13", v_ = "_legend_1h15q_18", b_ = "_stages_1h15q_26", p_ = "_stage_1h15q_26", g_ = "_stageIndex_1h15q_44", N_ = "_stageName_1h15q_50", y_ = "_footer_1h15q_59", k_ = "_note_1h15q_66", $_ = "_reason_1h15q_71", C_ = "_actions_1h15q_76", S_ = "_webHead_1h15q_83", R_ = "_kicker_1h15q_92", T_ = "_webTitle_1h15q_99", L_ = "_webBody_1h15q_105", E_ = "_webSection_1h15q_109", A_ = "_sectionHead_1h15q_121", x_ = "_sectionNote_1h15q_129", I_ = "_formLabel_1h15q_134", M_ = "_identityRow_1h15q_139", q_ = "_nameCell_1h15q_145", P_ = "_keyCell_1h15q_150", B_ = "_colourCell_1h15q_154", O_ = "_colourStatus_1h15q_161", D_ = "_webStages_1h15q_166", j_ = "_webStageList_1h15q_172", H_ = "_webStage_1h15q_166", F_ = "_webIndex_1h15q_191", W_ = "_webStageName_1h15q_196", z_ = "_webMoves_1h15q_201", G_ = "_addStage_1h15q_215", U_ = "_addStageButton_1h15q_223", K_ = "_addStageNote_1h15q_231", V_ = "_webFooter_1h15q_236", Y_ = "_webFooterNotes_1h15q_244", X_ = "_webNote_1h15q_251", w = {
  body: w_,
  title: __,
  section: f_,
  legend: v_,
  stages: b_,
  stage: p_,
  stageIndex: g_,
  stageName: N_,
  footer: y_,
  note: k_,
  reason: $_,
  actions: C_,
  webHead: S_,
  kicker: R_,
  webTitle: T_,
  webBody: L_,
  webSection: E_,
  sectionHead: A_,
  sectionNote: x_,
  formLabel: I_,
  identityRow: M_,
  nameCell: q_,
  keyCell: P_,
  colourCell: B_,
  colourStatus: O_,
  webStages: D_,
  webStageList: j_,
  webStage: H_,
  webIndex: F_,
  webStageName: W_,
  webMoves: z_,
  addStage: G_,
  addStageButton: U_,
  addStageNote: K_,
  webFooter: V_,
  webFooterNotes: Y_,
  webNote: X_
}, J_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], nt = "not in catalogue";
function Q_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${nt}` }, ...t];
}
function Z_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${nt}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: Q_(t, e.name), invalid: i, onChange: r });
}
function tt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function ef(e) {
  const a = g([]), t = g(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function af({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = tt(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Z_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: J_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(_a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(_a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function nf({ stages: e, onChange: a, catalogue: t }) {
  const r = ef(e.length), l = et(), i = (c, d) => {
    const u = Qn(c, d);
    r.current = Da(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Zn(tt(e[c], c), u, e.length)), a(Da(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(af, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(at, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const tf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], rf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], lf = "A new stream starts as a draft. Nothing runs on it until you publish it.", of = "Create is disabled: name the stream and give it a key first.", sf = "reorder with the ↑ ↓ buttons · min 2";
function Ja(e, a) {
  return !e.reserved && ya(e.step) && a[e.step] === void 0;
}
function cf(e, a) {
  const t = e.find((r) => Ja(r, a));
  return t ? t.step : 1;
}
function df({ stages: e, onMove: a }) {
  const t = et(), r = (l, i) => {
    const s = Qn(l, i);
    t.moved({ id: e[l].id, direction: i }, Zn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(_a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(_a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(at, { text: t.announcement })
  ] });
}
function uf({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: lf }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function hf(e, a) {
  return e !== "" && a !== "" ? null : of;
}
function mf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = rf, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, N] = p(""), [I, j] = p(a[0].value), [oe, $e] = p(() => cf(t, r)), [ne, Fe] = p(e.stages ?? tf), [We, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: We }, fe = hf(h, b);
  return /* @__PURE__ */ n(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Kn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(df, { stages: ne, onMove: (xe, Tt) => Fe(Da(ne, xe, Tt)) })
    ] }),
    /* @__PURE__ */ n(On, { legend: "Loop policy", options: l, value: We, onChange: C }),
    /* @__PURE__ */ n(uf, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const rt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], wf = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function _f(e, a, t, r, l, i) {
  var c;
  const s = ((c = rt.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function ff(e, a) {
  return vf(e) && bf(e, a) && pf(e);
}
function vf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function bf(e, a) {
  return e.colourStep !== null && Ja({ step: e.colourStep }, a);
}
function pf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function gf(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Zm}.` : Ja({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Nf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function yf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Nf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: wf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function kf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function $f({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
  return /* @__PURE__ */ o("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ o("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      l
    ] }),
    i
  ] });
}
function Cf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, N] = p("relay"), [I, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = _f(l, s, d, h, b, I), $e = ff(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), Fe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Kn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), We = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: gf(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(kf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n($f, { name: l, setName: i, streamKey: s, setKey: c, colour: Fe, owner: We }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: sf })
        ] }),
        /* @__PURE__ */ n(nf, { stages: I, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(On, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: rt, onChange: N }) }),
      /* @__PURE__ */ n(yf, { ready: $e, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Cf, { ...e }) : /* @__PURE__ */ n(mf, { ...e });
}
const Sf = "_row_bs8hc_2", Rf = "_cell_bs8hc_6", Tf = "_condition_bs8hc_11", Lf = "_action_bs8hc_18", Ef = "_contract_bs8hc_24", Af = "_contractCondition_bs8hc_33", xf = "_contractAction_bs8hc_39", Q = {
  row: Sf,
  cell: Rf,
  condition: Tf,
  action: Lf,
  contract: Ef,
  contractCondition: Af,
  contractAction: xf
}, lt = ["advance", "block", "escalate", "requestReview"], yn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function fa(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Qa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Q.action, children: yn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: lt.map((l) => ({ value: l, label: yn[l] }))
    }
  );
}
function If({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: fa(e, r), children: fa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Qa(e, a, t) })
  ] });
}
function Mf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: fa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Qa(e, a, t) })
  ] });
}
function qf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: fa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Qa(e, a, t, !0) })
  ] });
}
const Pf = { two: Mf, four: If, contract: qf };
function rC(e) {
  var t;
  if (!lt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Pf[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Bf = "_column_k4nls_2", Of = "_head_k4nls_17", Df = "_index_k4nls_23", jf = "_name_k4nls_29", Hf = "_meta_k4nls_38", Ff = "_mono_k4nls_43", Wf = "_gate_k4nls_50", zf = "_reviewersLabel_k4nls_57", Gf = "_reviewers_k4nls_57", Uf = "_reviewer_k4nls_57", Kf = "_agents_k4nls_74", Vf = "_workflowColumn_k4nls_79", Yf = "_workflowHead_k4nls_96", Xf = "_stageRow_k4nls_102", Jf = "_stageLabel_k4nls_109", Qf = "_workflowTitle_k4nls_116", Zf = "_workflowMeta_k4nls_122", ev = "_workflowGate_k4nls_127", av = "_gateNote_k4nls_135", nv = "_cardNote_k4nls_140", tv = "_reviewerList_k4nls_145", rv = "_reviewerRow_k4nls_151", lv = "_reviewerMark_k4nls_157", ov = "_reviewerName_k4nls_167", iv = "_terminalCard_k4nls_173", sv = "_terminalCount_k4nls_182", cv = "_workflowAgents_k4nls_188", dv = "_mount_k4nls_194", k = {
  column: Bf,
  head: Of,
  index: Df,
  name: jf,
  meta: Hf,
  mono: Ff,
  gate: Wf,
  reviewersLabel: zf,
  reviewers: Gf,
  reviewer: Uf,
  agents: Kf,
  workflowColumn: Vf,
  workflowHead: Yf,
  stageRow: Xf,
  stageLabel: Jf,
  workflowTitle: Qf,
  workflowMeta: Zf,
  workflowGate: ev,
  gateNote: av,
  cardNote: nv,
  reviewerList: tv,
  reviewerRow: rv,
  reviewerMark: lv,
  reviewerName: ov,
  terminalCard: iv,
  terminalCount: sv,
  workflowAgents: cv,
  mount: dv
}, uv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Za(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function ot(e) {
  return `${Math.round(e * 100)}%`;
}
function hv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ca, { cells: [
      { value: ot(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function mv({ stage: e }) {
  return /* @__PURE__ */ n(Ca, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Za(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function wv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: uv[e.kind] })
  ] });
}
function _v({ stage: e }) {
  return /* @__PURE__ */ o("p", { className: k.meta, children: [
    /* @__PURE__ */ o("span", { className: k.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ o("span", { className: k.mono, children: [
      se(e.medianWait),
      " median wait"
    ] })
  ] });
}
function fv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(hv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(mv, { stage: e }) : null;
}
function vv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function bv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(wv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(_v, { stage: e }),
    /* @__PURE__ */ n(fv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(km, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(vv, { onMount: t })
  ] });
}
const pv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function gv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function Nv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(gv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: ot(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function yv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function kv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Za(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: yv(e.rolledBackThisWeek) })
  ] });
}
function $v(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Cv(e) {
  if (e.kind === "terminal") return `${Za(e.closedThisWeek)} this week`;
  const a = $v(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Sv({ stage: e, titleId: a }) {
  const t = pv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: Cv(e) })
  ] });
}
function Rv(e) {
  return e === "entry" || e === "agent";
}
function Tv({ stage: e, onMount: a }) {
  return a === void 0 || !Rv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Lv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Sv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(Nv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(kv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(Tv, { stage: e, onMount: t })
  ] });
}
function Ev(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function lC(e) {
  return Ev(e) ? /* @__PURE__ */ n(Lv, { ...e }) : /* @__PURE__ */ n(bv, { ...e });
}
const Av = "_row_1jw40_6", xv = "_name_1jw40_12", Iv = "_compactRow_1jw40_13", Mv = "_compactName_1jw40_13", qv = "_cell_1jw40_30", Pv = "_chain_1jw40_45", Bv = "_owner_1jw40_51", Ov = "_mono_1jw40_57", Dv = "_compactCell_1jw40_79", jv = "_stack_1jw40_96", Hv = "_stat_1jw40_103", Fv = "_identityLine_1jw40_110", Wv = "_identity_1jw40_110", zv = "_ownerLine_1jw40_137", Gv = "_link_1jw40_150", Uv = "_gateMark_1jw40_156", Kv = "_emptyChain_1jw40_161", Vv = "_arrow_1jw40_167", Yv = "_muted_1jw40_168", Xv = "_define_1jw40_173", Jv = "_statValue_1jw40_180", Qv = "_policyId_1jw40_186", Zv = "_sub_1jw40_191", v = {
  row: Av,
  name: xv,
  compactRow: Iv,
  compactName: Mv,
  cell: qv,
  chain: Pv,
  owner: Bv,
  mono: Ov,
  compactCell: Dv,
  stack: jv,
  stat: Hv,
  identityLine: Fv,
  identity: Wv,
  ownerLine: zv,
  link: Gv,
  gateMark: Uv,
  emptyChain: Kv,
  arrow: Vv,
  muted: Yv,
  define: Xv,
  statValue: Jv,
  policyId: Qv,
  sub: Zv
};
function it(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function eb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function ab(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function st(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function nb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${st(e.members)}`;
}
function tb(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: nb(e) })
  ] }) });
}
function ct({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function rb(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = aa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function lb({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: v.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(ct, { name: r.name, gate: r.gate === !0, look: rb(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function ob(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : lb(e) });
}
function dt(e) {
  return e === void 0 ? void 0 : !0;
}
function kn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, "data-raised": dt(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function ib(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function sb(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function cb({ stream: e, href: a, presentation: t }) {
  const r = ab(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: it, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": Ee(e.streamStep, "chip") }, children: [
    tb(e, a),
    ob(e),
    kn(sb(e.agents), e.agents === void 0 ? void 0 : eb(e.agents), "—"),
    ib(e.policy),
    kn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function db(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function oC(e) {
  if (db(e)) return cb(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: it, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ka(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(ct, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ o("span", { className: v.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("span", { className: v.owner, children: a.owner }),
      /* @__PURE__ */ n("span", { className: v.mono, children: st(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": dt(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const ub = "_row_mdce7_2", hb = "_name_mdce7_16", mb = "_scope_mdce7_24", va = {
  row: ub,
  name: hb,
  scope: mb
};
function wb(e) {
  return e === void 0 ? `${va.row} ward-toolrow` : `${va.row} ward-toolrow ${e}`;
}
function _b(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function fb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
  return /* @__PURE__ */ n(
    "input",
    {
      id: e,
      type: "checkbox",
      className: "ward-field-option",
      checked: t.grant === "granted",
      disabled: r.locked,
      "aria-describedby": r.locked ? a : void 0,
      onChange: (i) => {
        r.locked || l(i.target.checked);
      }
    }
  );
}
function vb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function bb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${va.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function pb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function iC({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = _b(e, t), s = pb(t);
  return /* @__PURE__ */ o(s, { className: wb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(fb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${va.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(bb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(vb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const gb = "_strip_1qtlf_2", Nb = "_head_1qtlf_10", yb = "_name_1qtlf_16", kb = "_chart_1qtlf_24", $b = "_segment_1qtlf_30", Cb = "_detailedChart_1qtlf_36", Sb = "_rail_1qtlf_49", Rb = "_section_1qtlf_55", Tb = "_label_1qtlf_66", Lb = "_note_1qtlf_83", ee = {
  strip: gb,
  head: Nb,
  name: yb,
  chart: kb,
  segment: $b,
  detailedChart: Cb,
  rail: Sb,
  section: Rb,
  label: Tb,
  note: Lb
}, Eb = "No item in flight to preview.", Ab = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", xb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", ja = [1, 2, 3, 4, 5, 6], ba = 100;
function Ib(e, a) {
  return a.has(e) ? Ee(e, "id") : "var(--ward-color-line)";
}
function Mb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: ja.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ba,
      y: "0",
      width: ba,
      height: "8",
      fill: Ib(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function qb(e) {
  const a = e.slice(0, ja.length);
  for (; a.length < ja.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Pb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ba),
        y: "0",
        width: String(ba),
        height: "40",
        style: { fill: Ee(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function ut(e) {
  return (a) => e == null ? void 0 : e(a);
}
function la({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Bb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Eb }) : /* @__PURE__ */ n(Ra, { item: { ...e, streamStep: aa(t.streamStep) }, onOpen: ut(r), feed: null });
}
function Ob({ draft: e }) {
  const a = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ka(e.key, e.streamStep) })
  ] });
}
function Db(e) {
  const a = qb(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(la, { label: "Board card", children: /* @__PURE__ */ n(Bb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(la, { label: "Streams index row", children: /* @__PURE__ */ n(Ob, { draft: t }) }),
    /* @__PURE__ */ o(la, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Pb, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Ab })
    ] }),
    /* @__PURE__ */ n(la, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: xb }) })
  ] });
}
function jb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Ee(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ka(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ra, { item: { ...a, streamStep: e.streamStep }, onOpen: ut(r) }),
    /* @__PURE__ */ n(Mb, { draft: e, streams: t })
  ] });
}
function sC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Db, { ...e }) : /* @__PURE__ */ n(jb, { ...e });
}
const Hb = "_row_ixlg5_6", Fb = "_headCell_ixlg5_10", Wb = "_cell_ixlg5_11", zb = "_name_ixlg5_23", Gb = "_consequence_ixlg5_29", Ub = "_governed_ixlg5_36", Kb = "_control_ixlg5_42", Vb = "_byRole_ixlg5_48", Yb = "_webControl_ixlg5_59", Xb = "_webConsequence_ixlg5_65", Jb = "_webGoverned_ixlg5_71", D = {
  row: Hb,
  headCell: Fb,
  cell: Wb,
  name: zb,
  consequence: Gb,
  governed: Ub,
  control: Kb,
  byRole: Vb,
  webControl: Yb,
  webConsequence: Xb,
  webGoverned: Jb
};
function Qb({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: D.byRole, children: "by role" }) : /* @__PURE__ */ o("span", { className: D.control, children: [
    /* @__PURE__ */ n(
      De,
      {
        label: `${e.name} · ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Zb({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: D.headCell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: D.consequence, children: e.consequence }),
      /* @__PURE__ */ o("span", { className: D.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Qb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function ep(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function ap({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${D.webControl} ${D.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    De,
    {
      label: `${e} · step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (l) => t == null ? void 0 : t(a.streamStep, l ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ o("span", { className: `${D.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function np({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(ap, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: ep(e) }) })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(np, { ...e }) : /* @__PURE__ */ n(Zb, { ...e });
}
const tp = "_row_vv64h_2", rp = "_cell_vv64h_6", lp = "_name_vv64h_25", op = "_note_vv64h_30", ip = "_webName_vv64h_41", sp = "_webMeta_vv64h_47", K = {
  row: tp,
  cell: rp,
  name: lp,
  note: op,
  webName: ip,
  webMeta: sp
}, ht = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function cp(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function dp({ component: e, onRestart: a }) {
  const t = $(), r = ht[e.state], l = e.state === "drainFirst";
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: K.name, children: e.name }) }),
    /* @__PURE__ */ o("td", { className: K.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { id: t, className: K.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: K.cell, "data-align": "end", children: l ? /* @__PURE__ */ n(_, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function up({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: cp(e.state) });
}
function hp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...ht[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(up, { component: e, onRestart: a }) })
  ] });
}
function dC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(hp, { ...e }) : /* @__PURE__ */ n(dp, { ...e });
}
const mp = "_row_1f1gp_7", wp = "_cell_1f1gp_11", _p = "_next_1f1gp_28", fp = "_headCell_1f1gp_38", vp = "_webId_1f1gp_77", bp = "_webPurpose_1f1gp_83", pp = "_webMeta_1f1gp_91", gp = "_webUrgent_1f1gp_97", H = {
  row: mp,
  cell: wp,
  next: _p,
  headCell: fp,
  webId: vp,
  webPurpose: bp,
  webMeta: pp,
  webUrgent: gp
}, Np = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, yp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, mt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], kp = Object.fromEntries(mt.map((e) => [e.key, e]));
function Ge({ column: e, children: a }) {
  const t = kp[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: H.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function uC() {
  return /* @__PURE__ */ n("tr", { children: mt.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: H.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function $p({ cred: e }) {
  const a = Np[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Ge, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ge, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ge, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ge, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Ge, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ge, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Cp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Sp({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(Cp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...yp[e.state] }) })
  ] });
}
function hC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Sp, { ...e }) : /* @__PURE__ */ n($p, { ...e });
}
const Rp = "_card_17zba_2", Tp = "_head_17zba_11", Lp = "_env_17zba_18", Ep = "_version_17zba_25", Ap = "_meta_17zba_32", xp = "_webCard_17zba_37", Ip = "_webRow_17zba_47", Mp = "_webTitle_17zba_55", qp = "_webLine_17zba_65", Pp = "_webVersion_17zba_72", Bp = "_webMeta_17zba_77", U = {
  card: Rp,
  head: Tp,
  env: Lp,
  version: Ep,
  meta: Ap,
  webCard: xp,
  webRow: Ip,
  webTitle: Mp,
  webLine: qp,
  webVersion: Pp,
  webMeta: Bp
}, wt = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Op({ env: e }) {
  const a = wt[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ o("section", { className: U.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ o("div", { className: U.head, children: [
      /* @__PURE__ */ n("span", { className: U.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: U.version, children: e.version }),
    /* @__PURE__ */ o("p", { className: U.meta, children: [
      "deployed ",
      ce(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: U.meta, children: t })
  ] });
}
function Dp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function jp(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...wt[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Dp(e) })
  ] });
}
function mC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jp, { ...e }) : /* @__PURE__ */ n(Op, { ...e });
}
const Hp = "_panel_1hmja_2", Fp = "_line_1hmja_8", Wp = "_actions_1hmja_14", oa = {
  panel: Hp,
  line: Fp,
  actions: Wp
};
function wC(e) {
  return /* @__PURE__ */ o("div", { className: oa.panel, children: [
    /* @__PURE__ */ n("p", { className: oa.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: oa.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: oa.line, children: e.note ?? "" })
  ] });
}
const zp = "_upload_erepj_2", Gp = "_preview_erepj_7", Up = "_mark_erepj_17", Kp = "_empty_erepj_22", Vp = "_actions_erepj_28", Yp = "_input_erepj_33", Xp = "_reasons_erepj_41", Jp = "_reason_erepj_41", Qp = "_accepted_erepj_57", te = {
  upload: zp,
  preview: Gp,
  mark: Up,
  empty: Kp,
  actions: Vp,
  input: Yp,
  reasons: Xp,
  reason: Jp,
  accepted: Qp
}, _t = 1.5, ft = 22, pa = "script elements or event handlers", Se = "links or external references", ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${_t}px at ${ft}px`], Zp = [ye[1], ye[2], pa, Se], eg = /* @__PURE__ */ new Map([
  ["image", ye[1]],
  ["text", ye[2]],
  ["tspan", ye[2]],
  ["textPath", ye[2]],
  ["script", pa],
  ["foreignObject", pa],
  ["a", Se],
  ["use", Se],
  ["style", Se],
  ["feImage", Se],
  ["set", Se]
]), ag = "http://www.w3.org/2000/svg", ng = "http://www.w3.org/2000/xmlns/", tg = /* @__PURE__ */ new Set([
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
]), rg = /* @__PURE__ */ new Set([
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
]), en = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, lg = /url\s*\(|['"\\]/i;
function og() {
  return { ok: !1, reasons: [ye[1]] };
}
function vt(e) {
  return e.namespaceURI === ag;
}
function ig(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && vt(a) ? a : null;
  } catch {
    return null;
  }
}
function sg(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ye[0]] : [];
}
function cg(e) {
  return eg.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function dg(e) {
  return lg.test(e.replace(en, ""));
}
function ug(e) {
  return /^on/i.test(e.localName) ? pa : e.localName === "href" || dg(e.value) ? Se : void 0;
}
function hg(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(cg(t));
    for (const r of Array.from(t.attributes)) a.add(ug(r));
  }
  return Zp.filter((t) => a.has(t));
}
function mg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? ft / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < _t;
  }) ? [ye[3]] : [];
}
function wg(e) {
  if (e.namespaceURI === ng) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (rg.has(a) || a.startsWith("stroke"));
}
function _g(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && vt(a) && tg.has(a.localName);
}
function fg(e, a) {
  _g(a) ? a.nodeType === Node.ELEMENT_NODE && bt(a) : e.removeChild(a);
}
function bt(e) {
  for (const a of Array.from(e.attributes)) wg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) fg(e, a);
  return e;
}
function vg(e) {
  return Array.from(e.matchAll(en), (a) => a[2]).filter((a) => a !== "");
}
function bg(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function pg(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of vg(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function gg(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(en, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function Ng(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = pg(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), gg(l, r);
  }
  return e;
}
function _C(e) {
  const a = ig(e);
  if (a === null) return og();
  const t = [...sg(a), ...hg(a), ...mg(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(Ng(bt(a), bg(e))) };
}
const yg = "Mark accepted.";
function kg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function $g(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Cg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Sg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: yg }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function Rg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Sg, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${$g(e, t)}`, role: "status", children: Cg(e, t) });
}
function fC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = g(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(kg, { current: e }),
    /* @__PURE__ */ o("div", { className: te.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: l,
          className: te.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (d) => {
            var u;
            return c((u = d.target.files) == null ? void 0 : u[0]);
          }
        }
      ),
      /* @__PURE__ */ n(_, { onClick: () => {
        var d;
        return (d = l.current) == null ? void 0 : d.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(_, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(Rg, { result: i, presentation: r })
  ] });
}
const Tg = "_row_1wp9s_7", Lg = "_cell_1wp9s_11", Eg = "_head_1wp9s_28", Ag = "_name_1wp9s_34", xg = "_pinned_1wp9s_42", Ig = "_headCell_1wp9s_49", Mg = "_webName_1wp9s_88", qg = "_webMeta_1wp9s_95", Pg = "_webWarn_1wp9s_103", q = {
  row: Tg,
  cell: Lg,
  head: Eg,
  name: Ag,
  pinned: xg,
  headCell: Ig,
  webName: Mg,
  webMeta: qg,
  webWarn: Pg
}, an = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, pt = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Bg = Object.fromEntries(pt.map((e) => [e.key, e]));
function Og(e, a) {
  return `mcp.${e}.${a}`;
}
function Dg(e) {
  return Object.keys(an).includes(e);
}
function jg(e) {
  return an[e !== void 0 && Dg(e) ? e : "unknown"];
}
function Xe({ column: e, children: a }) {
  const t = Bg[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: q.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function vC() {
  return /* @__PURE__ */ n("tr", { children: pt.map((e) => /* @__PURE__ */ n(
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
function Hg({ server: e }) {
  const a = an[e.connection];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o(Xe, { column: "name", children: [
      /* @__PURE__ */ o("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ o("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Xe, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Xe, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Xe, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Xe, { column: "tools", children: e.tools.map((t) => Og(e.name, t)).join(" · ") })
  ] });
}
function Fg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Wg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function zg({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Gg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Ug({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Kg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Fg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Wg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(zg, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...jg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Gg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Ug, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function bC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kg, { ...e }) : /* @__PURE__ */ n(Hg, { ...e });
}
const Vg = "_row_1h9nq_2", Yg = "_headCell_1h9nq_14", Xg = "_cell_1h9nq_15", Jg = "_name_1h9nq_26", Qg = "_consequence_1h9nq_32", Zg = "_reason_1h9nq_38", eN = "_value_1h9nq_44", aN = "_webRow_1h9nq_60", nN = "_webSetting_1h9nq_71", tN = "_webName_1h9nq_79", rN = "_webConsequence_1h9nq_87", lN = "_webControl_1h9nq_93", oN = "_webState_1h9nq_106", iN = "_webChip_1h9nq_111", E = {
  row: Vg,
  headCell: Yg,
  cell: Xg,
  name: Jg,
  consequence: Qg,
  reason: Zg,
  value: eN,
  webRow: aN,
  webSetting: nN,
  webName: tN,
  webConsequence: rN,
  webControl: lN,
  webState: oN,
  webChip: iN
}, gt = 104, Nt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function sN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Pn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function cN({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = Nt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(sN, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: gt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function yt(e, a) {
  return String(e ?? a);
}
function dN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function uN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? yt(e.value, "—");
}
function hN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function mN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(hN, { ...e });
  const l = dN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Pn, { options: l, value: yt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: uN(a) });
}
function wN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(s) }) : /* @__PURE__ */ n(mN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: gt }, children: /* @__PURE__ */ n(m, { ...Nt[t], size: "tag" }) })
  ] });
}
function pC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(wN, { ...e }) : /* @__PURE__ */ n(cN, { ...e });
}
const _N = "_label_1o9za_7", fN = "_name_1o9za_15", vN = "_column_1o9za_24", bN = "_webFrame_1o9za_57", pN = "_webHead_1o9za_62", gN = "_webHeadLabel_1o9za_74", NN = "_webLabel_1o9za_112", yN = "_webColumns_1o9za_119", kN = "_webGroup_1o9za_125", $N = "_webPeople_1o9za_126", CN = "_webVia_1o9za_127", SN = "_webMeta_1o9za_156", F = {
  label: _N,
  name: fN,
  column: vN,
  webFrame: bN,
  webHead: pN,
  webHeadLabel: gN,
  webLabel: NN,
  webColumns: yN,
  webGroup: kN,
  webPeople: $N,
  webVia: CN,
  webMeta: SN
}, RN = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Ia = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ma({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: F.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function TN(e) {
  if (!e.matrixRole) return;
  const a = RN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function LN({ node: e }) {
  const a = TN(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n(EN, { role: a, node: e }),
    /* @__PURE__ */ n(Ma, { column: Ia[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ma, { column: Ia[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ma, { column: Ia[2], children: e.requestedVia ?? "" })
  ] });
}
function EN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function AN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    Hn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(LN, { node: t }),
      children: s
    }
  );
}
function qa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function xN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(qa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(qa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(qa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function IN() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function MN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function qN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function PN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(IN, {}),
    /* @__PURE__ */ n($c, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      Hn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(MN, { row: t }),
        detail: /* @__PURE__ */ n(xN, { row: t }),
        expanded: qN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function gC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(PN, { ...e }) : /* @__PURE__ */ n(AN, { ...e });
}
const BN = "_runbook_b9agc_2", ON = "_list_b9agc_7", DN = "_step_b9agc_15", jN = "_numeral_b9agc_21", HN = "_body_b9agc_28", FN = "_head_b9agc_34", WN = "_title_b9agc_40", zN = "_detail_b9agc_45", GN = "_actions_b9agc_50", UN = "_webList_b9agc_56", KN = "_webStep_b9agc_60", VN = "_webBody_b9agc_66", YN = "_webTitle_b9agc_74", XN = "_webDetail_b9agc_78", T = {
  runbook: BN,
  list: ON,
  step: DN,
  numeral: jN,
  body: HN,
  head: FN,
  title: WN,
  detail: zN,
  actions: GN,
  webList: UN,
  webStep: KN,
  webBody: VN,
  webTitle: YN,
  webDetail: XN
}, kt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function $t(e) {
  return String(e + 1).padStart(2, "0");
}
function JN({ step: e, index: a, connection: t }) {
  const r = kt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: $t(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ n("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function QN({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(JN, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function ZN({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: $t(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...kt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function ey({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(ZN, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function NC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ey, { ...e }) : /* @__PURE__ */ n(QN, { ...e });
}
const ay = "_list_1gu6a_2", ny = "_check_1gu6a_10", ty = "_body_1gu6a_16", ry = "_text_1gu6a_23", ly = "_pending_1gu6a_32", oy = "_measured_1gu6a_37", Ke = {
  list: ay,
  check: ny,
  body: ty,
  text: ry,
  pending: ly,
  measured: oy
};
function iy(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function sy({ check: e }) {
  const a = iy(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ke.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Va, { state: a.state, label: a.label }),
    /* @__PURE__ */ o("span", { className: Ke.body, children: [
      /* @__PURE__ */ n("span", { className: Ke.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ o("span", { className: Ke.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: Ke.measured, children: e.measured })
  ] });
}
function yC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(sy, { check: a }, a.text)) });
}
const cy = "_root_khinh_2", dy = "_list_khinh_10", uy = "_line_khinh_21", hy = "_at_khinh_48", my = "_text_khinh_52", wy = "_foot_khinh_56", _y = "_idle_khinh_68", fy = "_caret_khinh_76", vy = "_jump_khinh_83", me = {
  root: cy,
  list: dy,
  line: uy,
  at: hy,
  text: my,
  foot: wy,
  idle: _y,
  caret: fy,
  jump: vy
}, by = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function nn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : by.format(new Date(e));
}
const py = { warn: "warning", ok: "ok" };
function gy({ kind: e }) {
  const a = py[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ny({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${nn(e)}` });
}
function yy({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${nn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(Ny, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const ky = 8;
function $y(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > ky;
}
function Cy({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Ct = He(null);
function kC({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Tn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Ct.Provider, { value: i, children: t });
}
function Sy() {
  const e = je(Ct), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function $C({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = g(null), [i, s] = p(0), [c, d] = Sy(), [u, h] = p(!1), f = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), Wa(() => {
    const N = l.current;
    N && !u && (N.scrollTop = N.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var j;
    const N = l.current;
    if (!N) return;
    const I = N.querySelectorAll("[data-consline-text]");
    (j = I.item(I.length - 1)) == null || j.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (N) => h($y(N.currentTarget)), children: e.map((N, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: nn(N.at) }),
      /* @__PURE__ */ n(gy, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${I}`)) }),
    /* @__PURE__ */ o(yy, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(Cy, { shown: u, onJump: b })
    ] })
  ] });
}
const Ry = "_row_11jhe_2", Ty = "_head_11jhe_14", Ly = "_author_11jhe_20", Ey = "_eta_11jhe_25", Ay = "_edited_11jhe_26", xy = "_body_11jhe_32", Iy = "_reason_11jhe_37", My = "_actions_11jhe_42", be = {
  row: Ry,
  head: Ty,
  author: Ly,
  eta: Ey,
  edited: Ay,
  body: xy,
  reason: Iy,
  actions: My
}, qy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Py(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function By({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Oy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function Dy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function jy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(By, { ...e }) : /* @__PURE__ */ n(Oy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function CC(e) {
  const { comment: a } = e;
  Dy(e);
  const t = $(), r = `${t}-unavailable`, l = qy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: Py(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(jy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Hy = "_root_c46wj_2", Fy = "_attach_c46wj_11", Wy = "_actions_c46wj_17", zy = "_reply_c46wj_23", Gy = "_replyRow_c46wj_28", Uy = "_sendsAs_c46wj_42", Ye = {
  root: Hy,
  attach: Fy,
  actions: Wy,
  reply: zy,
  replyRow: Gy,
  sendsAs: Uy
};
function Ky({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function SC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Ky, { ...e }) : /* @__PURE__ */ n(Vy, { ...e });
}
function Vy({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      xn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ o("div", { className: Ye.actions, children: [
      /* @__PURE__ */ n(_, { variant: "primary", onClick: () => l(a, s), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(_, { variant: "ghost", onClick: () => i(s), children: "Save draft" })
    ] })
  ] });
}
const Yy = "_list_1ih9e_2", Xy = "_item_1ih9e_6", Jy = "_body_1ih9e_22", Qy = "_text_1ih9e_28", Zy = "_evidence_1ih9e_37", ek = "_consequence_1ih9e_49", ak = "_note_1ih9e_54", Oe = {
  list: Yy,
  item: Xy,
  body: Jy,
  text: Qy,
  evidence: Zy,
  consequence: ek,
  note: ak
};
function nk({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function $n({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function tk(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function rk({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ n("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n($n, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n($n, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Oe.consequence, children: tk(e.why) })
    ] })
  ] });
}
function lk({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(nk, { criterion: e }),
    /* @__PURE__ */ n(rk, { criterion: e })
  ] });
}
function RC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(lk, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const ok = "_list_dwhoz_2", ik = "_rung_dwhoz_6", sk = "_name_dwhoz_18", ck = "_actor_dwhoz_32", ca = {
  list: ok,
  rung: ik,
  name: sk,
  actor: ck
}, dk = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function uk({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = dk[e.state];
  return /* @__PURE__ */ o("li", { className: ca.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ca.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ca.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function TC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ca.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(uk, { rung: a }, a.name)) });
}
const hk = "_sheet_1fqco_2", mk = "_title_1fqco_9", wk = "_stage_1fqco_15", _k = "_effects_1fqco_20", fk = "_effect_1fqco_20", vk = "_numeral_1fqco_31", bk = "_effectText_1fqco_38", pk = "_refusals_1fqco_43", gk = "_reasons_1fqco_52", Nk = "_reason_1fqco_52", yk = "_actions_1fqco_62", ue = {
  sheet: hk,
  title: mk,
  stage: wk,
  effects: _k,
  effect: fk,
  numeral: vk,
  effectText: bk,
  refusals: pk,
  reasons: gk,
  reason: Nk,
  actions: yk
};
function kk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function LC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), d = `${c}-refusal`, [u, h] = p(""), f = t.length > 0;
  return /* @__PURE__ */ n(na, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, N) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(N + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      ss,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(A, { kind: "textarea", label: "Note for the agent", value: u, onChange: h }),
    f && /* @__PURE__ */ o("div", { className: ue.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, N) => /* @__PURE__ */ n("li", { className: ue.reason, id: N === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(kk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const $k = "_list_1hvqu_2", Ck = "_path_1hvqu_7", Sk = "_head_1hvqu_21", Rk = "_label_1hvqu_28", Tk = "_consequence_1hvqu_35", Lk = "_ask_1hvqu_36", Ve = {
  list: $k,
  path: Ck,
  head: Sk,
  label: Rk,
  consequence: Tk,
  ask: Lk
}, Ha = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function Cn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Sn(e) {
  return e ? "primary" : "secondary";
}
function Ek({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Sn(a), size: "sm", onClick: () => t(e.kind), children: Ha[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Sn(a), size: "sm", disabled: !0, describedBy: r, children: Ha[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ve.ask, id: r, children: e.askInstead })
  ] });
}
function Ak({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ve.path, "data-allowed": e.allowed, "data-role": Cn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ve.head, children: [
      /* @__PURE__ */ n("span", { className: Ve.label, children: e.title ?? Ha[e.kind] }),
      /* @__PURE__ */ n(m, { role: Cn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ve.consequence, children: e.consequence }),
    /* @__PURE__ */ n(Ek, { path: e, primary: a, onChoose: t })
  ] });
}
function EC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ve.list, children: e.map((t, r) => /* @__PURE__ */ n(Ak, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const xk = "_list_1nyt1_2", Ik = "_item_1nyt1_6", Mk = "_node_1nyt1_18", qk = "_body_1nyt1_24", Pk = "_head_1nyt1_30", Bk = "_stage_1nyt1_36", Ok = "_version_1nyt1_41", Dk = "_sentence_1nyt1_49", jk = "_meta_1nyt1_54", ge = {
  list: xk,
  item: Ik,
  node: Mk,
  body: qk,
  head: Pk,
  stage: Bk,
  version: Ok,
  sentence: Dk,
  meta: jk
}, Hk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Fk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Wk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: Hk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Fk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function AC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Wk, { entry: a }, a.stage + String(t))) });
}
const zk = "_thread_1kn6s_3", Gk = "_turn_1kn6s_8", Uk = "_who_1kn6s_27", Kk = "_body_1kn6s_32", da = {
  thread: zk,
  turn: Gk,
  who: Uk,
  body: Kk
}, St = He(!1);
function xC({ children: e, density: a }) {
  return /* @__PURE__ */ n(St.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${da.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function IC({ turn: e }) {
  if (!je(St)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${da.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${da.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${da.body} ward-chat-body`, children: e.body })
  ] });
}
const Vk = "_list_1rt9c_3", Yk = "_row_1rt9c_7", Xk = "_label_1rt9c_20", Jk = "_n_1rt9c_26", Qk = "_cause_1rt9c_33", Qe = {
  list: Vk,
  row: Yk,
  label: Xk,
  n: Jk,
  cause: Qk
};
function Zk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const e1 = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function a1({ row: e, formatNumber: a }) {
  return Zk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...e1[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(n1, { cause: e.cause })
  ] });
}
function n1({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function MC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(a1, { row: t, formatNumber: a }, t.label)) });
}
const t1 = "_root_1jxwp_2", r1 = {
  root: t1
};
function qC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: r1.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ta, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const l1 = "_row_dhbre_3", o1 = "_key_dhbre_13", i1 = "_stack_dhbre_24", s1 = "_value_dhbre_32", c1 = "_evidence_dhbre_39", d1 = "_mark_dhbre_47", Ue = {
  row: l1,
  key: o1,
  stack: i1,
  value: s1,
  evidence: c1,
  mark: d1
};
function u1({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Va, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function PC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(u1, { state: e.state }) })
  ] });
}
const h1 = "_cell_1monp_2", m1 = {
  cell: h1
}, w1 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function _1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function f1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function v1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: _1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function b1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function BC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  f1(e, t);
  const r = b1(e);
  return /* @__PURE__ */ n(
    ys,
    {
      label: "Rejection routing",
      columns: w1,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: m1.cell, "data-norerun": l.noRerun ? !0 : void 0, children: v1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(cd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const p1 = "_row_ute8v_2", g1 = "_title_ute8v_11", N1 = "_turns_ute8v_20", y1 = "_waiting_ute8v_21", k1 = "_resolved_ute8v_22", $1 = "_activity_ute8v_23", C1 = "_cost_ute8v_29", S1 = "_link_ute8v_30", R1 = "_tableRow_ute8v_47", T1 = "_tableTitle_ute8v_59", L1 = "_tableResolved_ute8v_64", E1 = "_tableLink_ute8v_68", A1 = "_tableMeta_ute8v_83", x1 = "_tableCost_ute8v_90", I1 = "_tableActivity_ute8v_91", M1 = "_tableState_ute8v_101", q1 = "_tableRecord_ute8v_112", O = {
  row: p1,
  title: g1,
  turns: N1,
  waiting: y1,
  resolved: k1,
  activity: $1,
  cost: C1,
  link: S1,
  tableRow: R1,
  tableTitle: T1,
  tableResolved: L1,
  tableLink: E1,
  tableMeta: A1,
  tableCost: x1,
  tableActivity: I1,
  tableState: M1,
  tableRecord: q1
}, Rt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function P1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function B1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function O1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const D1 = { duplicate: "CLOSED · DUPLICATE" };
function j1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function H1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : re(e) });
}
function F1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function W1({ session: e, href: a }) {
  const t = Rt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: B1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      O1(e.resolved),
      /* @__PURE__ */ n(j1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(H1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: P1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: D1[e.state] ?? t.label }),
      /* @__PURE__ */ n(F1, { link: e.link })
    ] }) })
  ] });
}
function z1({ session: e }) {
  const a = Rt[e.state];
  return /* @__PURE__ */ o("div", { className: O.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: O.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: O.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: O.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: O.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: O.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : re(e.cost) }),
    /* @__PURE__ */ n("span", { className: O.activity, children: ce(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: O.link, href: W(e.link.href), children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function OC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(W1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(z1, { session: e.session });
}
const G1 = "_block_1yy2v_3", U1 = "_list_1yy2v_9", K1 = "_line_1yy2v_14", Fa = {
  block: G1,
  list: U1,
  line: K1
}, V1 = { warn: "warning", ok: "ok" };
function Y1({ kind: e }) {
  const a = V1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function X1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${Fa.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Y1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function DC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Fa.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Fa.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(X1, { line: t }, `${r}-${t.text}`)) }) });
}
const J1 = "_band_tt7hp_1", Q1 = "_head_tt7hp_8", Z1 = "_cell_tt7hp_19", e$ = "_index_tt7hp_35", a$ = "_title_tt7hp_42", n$ = "_note_tt7hp_48", t$ = "_cellTitle_tt7hp_53", r$ = "_cellBody_tt7hp_58", l$ = "_tag_tt7hp_64", ve = {
  band: J1,
  head: Q1,
  cell: Z1,
  index: e$,
  title: a$,
  note: n$,
  cellTitle: t$,
  cellBody: r$,
  tag: l$
}, Rn = 4;
function jC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Rn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Rn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: ve.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: ve.head, children: [
      /* @__PURE__ */ n("span", { className: ve.index, children: e }),
      /* @__PURE__ */ n("span", { className: ve.title, children: a }),
      /* @__PURE__ */ n("span", { className: ve.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: ve.cell, children: [
      /* @__PURE__ */ n("span", { className: ve.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: ve.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: ve.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  R$ as ActionStack,
  $C as ActivityConsole,
  km as AgentCard,
  b$ as AppShell,
  sC as AppearanceStrip,
  jC as Band,
  $$ as BarChart,
  zd as BoardColumn,
  F$ as BoardFootnote,
  W$ as BoardHeader,
  M$ as BoardScroller,
  _ as Btn,
  w$ as CHIP_ROLES,
  mt as CREDENTIAL_COLUMNS,
  k$ as Callout,
  cC as CapabilityRow,
  IC as ChatMessage,
  xn as Checkbox,
  m as Chip,
  CC as ClarificationRow,
  Z$ as ClauseRuleRow,
  Q$ as ClauseRules,
  Kn as ColourLadder,
  dC as ComponentRow,
  SC as Composer,
  G$ as ConfigRow,
  z$ as ConfigRowHead,
  Ya as ConnectionMark,
  kC as ConsoleAnnounceProvider,
  xC as Conversation,
  ss as CostMeter,
  hC as CredentialRow,
  uC as CredentialRowHead,
  RC as CriteriaList,
  gl as Crumb,
  MC as DeliveryHealth,
  B$ as DeniedState,
  eC as DryRunRail,
  cd as EmptyState,
  mC as EnvCard,
  A as Field,
  P$ as FilteredEmpty,
  x$ as FormStack,
  Ta as GateChecklist,
  TC as GateLadder,
  ys as Grid,
  nC as HandoffRuleRow,
  aC as HandoffRules,
  U$ as ItemDrawer,
  wC as KeyPanel,
  zt as LIVE_EVENT_TYPES,
  Gh as LegacyBoardColumn,
  V$ as LegacyBoardHeader,
  Y$ as LegacyConfigRow,
  J$ as LegacyItemDrawer,
  Oh as LegacyOverCapNote,
  X$ as LegacyPreviewRail,
  zn as LegacyWorkCard,
  ke as LiveIndicator,
  O$ as LoadFailed,
  H$ as Loading,
  pt as MCP_SERVER_COLUMNS,
  Va as Mark,
  fC as MarkUpload,
  Ae as Marker,
  bC as McpServerRow,
  vC as McpServerRowHead,
  tC as NewStreamModal,
  hd as OverCapNote,
  na as Overlay,
  Zm as PARTIAL_STEP_REASON,
  gt as POLICY_CHIP_WIDTH,
  L$ as PageFrame,
  y$ as PageHeader,
  C$ as PlainList,
  pC as PolicyRow,
  K$ as PreviewRail,
  Ia as ROLE_MATRIX_COLUMNS,
  lt as RULE_ACTIONS,
  On as Radio,
  qC as ReadyChecklist,
  A$ as RecordSection,
  LC as RequeueSheet,
  EC as ResolveBlock,
  PC as ResolvedFieldRow,
  gC as RoleMatrixRow,
  BC as RoutingTable,
  rC as RuleRow,
  NC as RunbookSteps,
  Ft as STREAM_STEPS,
  I$ as SectionBand,
  mn as SectionHeader,
  Pn as SegmentedControl,
  OC as SessionRow,
  N$ as Sidebar,
  lC as StageColumn,
  q$ as StageGrid,
  AC as StageHistory,
  nf as StageListEditor,
  D$ as StaleStrip,
  Ca as StatStrip,
  oC as StreamRow,
  E$ as SubjectRail,
  De as Switch,
  g$ as TabLinks,
  S$ as TableHead,
  p$ as Tabs,
  iC as ToolRow,
  T$ as TopBar,
  $c as Tree,
  Hn as TreeRow,
  DC as TypedInputBlock,
  jr as UNSAFE_HREF,
  yC as ValidationList,
  c$ as VisibilityProvider,
  d$ as Visible,
  m$ as WARD_VERSION,
  Ra as WorkCard,
  j$ as WriteUnavailableStrip,
  P1 as agoSince,
  Mt as clock,
  gf as colourStatus,
  ae as count,
  se as duration,
  za as elapsed,
  h$ as eventSourceTransport,
  Na as isStreamStep,
  ya as isValidatedStreamStep,
  ew as ladderValidation,
  jg as mcpConnectionChip,
  Og as mcpToolName,
  re as money,
  we as ms,
  Fn as ordered,
  Ln as ratio,
  cp as restartLabel,
  W as safeHref,
  ce as stamp,
  An as stream,
  f$ as streamChip,
  ka as streamChipProps,
  Ee as streamColour,
  Ut as streamHex,
  _$ as streamVars,
  ia as useBorderFlash,
  Dt as useFocusTrap,
  v$ as useLiveFeed,
  u$ as useReturnFocus,
  ga as useRovingTabindex,
  Ga as useTicker,
  qt as useVisible,
  G as v,
  _C as validateMark,
  aa as validatedStep,
  Wt as validatedStreamSteps
};
