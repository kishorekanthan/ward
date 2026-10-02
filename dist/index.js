import { jsx as n, Fragment as S, jsxs as o } from "react/jsx-runtime";
import { useMemo as Tn, useContext as He, createContext as Fe, useCallback as X, useEffect as x, useState as g, useRef as p, useLayoutEffect as Wa, useId as $, isValidElement as Et, Children as At, Fragment as xt } from "react";
import { createPortal as It } from "react-dom";
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
const Mt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Mt.formatToParts(new Date(e)), t = (r) => {
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
const qt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function Pt(e) {
  return qt.format(new Date(e));
}
const En = Fe(/* @__PURE__ */ new Set());
function _$({ hidden: e, children: a }) {
  const t = Tn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(En.Provider, { value: t, children: a });
}
function Bt(e) {
  return !He(En).has(e);
}
function f$({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(S, { children: Bt(e) ? a : t });
}
const Ot = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Dt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function Ht(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Dt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Ft(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(Ot));
      Ht(t, e.current, r);
    },
    [e]
  ) };
}
function v$(e, a = !0) {
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
function Wt(e, a) {
  if (a !== "horizontal" && e in rn) return rn[e];
  if (a !== "vertical" && e in ln) return ln[e];
}
function pa({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = p(/* @__PURE__ */ new Map()), l = p(!1);
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
      const f = Math.max(0, h.indexOf(a)), b = Wt(u.key, e);
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
const b$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, g$ = "0.2.0", p$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], zt = [1, 2, 3, 4, 5, 6], An = [1, 2, 3], Gt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function xn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function Na(e) {
  return zt.includes(e);
}
function ya(e) {
  return An.includes(e);
}
function N$(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function y$(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ut = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Kt(e) {
  if (!Na(e)) throw new Error("unvalidated stream step");
  return Ut[e];
}
function on(e) {
  return typeof e != "string" ? null : Gt.includes(e) ? e : null;
}
function Vt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Yt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Xt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Jt(e, a, t) {
  const r = Vt(e);
  if (r === null) return null;
  const l = on(t) ?? on(r.type);
  return l === null ? null : { ...r, type: l, id: Yt(r, a), at: Xt(r) };
}
function Qt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Zt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function k$(e, a) {
  const [t, r] = g("reconnecting"), [l, i] = g(null), s = p(/* @__PURE__ */ new Map()), c = p(0), d = p(""), u = p(0), h = p(null), f = p(0), b = p(0), N = p(!1), I = p("reconnecting"), H = X((C) => {
    I.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), Ce = X((C) => {
    for (const [z, ve] of s.current)
      (ve === "*" || C.itemKey === ve) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, ve) => {
        const xe = Jt(C, z, ve);
        xe !== null && (xe.id && (d.current = xe.id), oe(), N.current = !1, H("live"), i(xe.at), Ce(xe));
      },
      onOpen: () => {
        u.current = 0, N.current = !1, oe(), H("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, N.current = !0, I.current !== "stale" && H("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [Ce, H, oe, a, e]), je = X((C) => {
    N.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), We = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Qt(C, I.current);
    z && H(z);
    const ve = h.current;
    Zt(C, N.current, ve) && je(ve);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), N.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, je, H]), { connection: t, lastEventAt: l, subscribe: We };
}
function Ga(e, a) {
  const t = new Date(e).getTime(), [r, l] = g(() => Date.now());
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
function er() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function sn(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function ia(e, a) {
  const t = p(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (er() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => sn(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => sn(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const ar = "_root_1otpc_2", nr = {
  root: ar
};
function tr(e, a, t, r, l) {
  const i = [za(a)];
  return e || i.push(`as of ${Pt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function $e({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Ga(e, l), s = (a == null ? void 0 : a.at) ?? e, c = tr(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${nr.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const rr = "_app_1g5ye_1", lr = "_side_1g5ye_18", or = "_main_1g5ye_26", ir = "_rail_1g5ye_33", sr = "_page_1g5ye_40", cr = "_root_1g5ye_91", dr = "_topbar_1g5ye_98", ur = "_mark_1g5ye_109", hr = "_brand_1g5ye_116", mr = "_tagline_1g5ye_122", wr = "_identity_1g5ye_128", _r = "_tools_1g5ye_129", fr = "_metadata_1g5ye_138", vr = "_actor_1g5ye_153", br = "_detail_1g5ye_154", gr = "_nav_1g5ye_159", pr = "_content_1g5ye_194", Nr = "_toolsPanel_1g5ye_210", yr = "_skip_1g5ye_236", M = {
  app: rr,
  side: lr,
  main: or,
  rail: ir,
  page: sr,
  root: cr,
  topbar: dr,
  mark: ur,
  brand: hr,
  tagline: mr,
  identity: wr,
  tools: _r,
  metadata: fr,
  actor: vr,
  detail: br,
  nav: gr,
  content: pr,
  toolsPanel: Nr,
  skip: yr
}, kr = "_btn_10gi7_2", $r = "_primary_10gi7_13", Cr = "_destructive_10gi7_24", Sr = "_secondary_10gi7_34", Rr = "_ghost_10gi7_39", Tr = "_overflow_10gi7_48", Lr = "_sm_10gi7_55", Er = "_disabled_10gi7_59", ta = {
  btn: kr,
  primary: $r,
  destructive: Cr,
  secondary: Sr,
  ghost: Rr,
  overflow: Tr,
  sm: Lr,
  disabled: Er
};
function Ar(e, a, t, r) {
  const l = a === "sm" ? [ta.sm, "ward-btn--sm"] : [], i = t ? [ta.disabled] : [];
  return [ta.btn, ta[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function xr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Ir(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Mr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function qr(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function Pr(e, a, t) {
  return qr(e.describedBy, a && t);
}
function Br({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Or(e) {
  return e.children ?? e.label;
}
function _(e) {
  Ir(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Mr(e), i = $();
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Ar(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": Pr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...xr(a, e.controls),
        children: Or(e)
      }
    ),
    /* @__PURE__ */ n(Br, { id: i, reason: l })
  ] });
}
const Dr = /^([a-z][a-z0-9+.-]*):/i, Hr = /* @__PURE__ */ new Set(["http", "https"]), Fr = "#";
function jr(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = Dr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = jr(e);
  return a === void 0 || Hr.has(a) ? e : Fr;
}
function Ua(e) {
  const [a, t] = g(() => {
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
function Wr({ sidebar: e, header: a, children: t, rail: r }) {
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
function zr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Pa({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Gr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Pa, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Pa, { value: a, className: M.detail })
  ] });
}
function Ur() {
  const e = Ua("(max-width: 767.98px)"), a = $(), t = p(null), [r, l] = g(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Kr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function Vr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Yr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Pa, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(zr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Gr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Kr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Xr(e) {
  const a = $(), t = Ur();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Yr, { ...e, menu: t }),
    /* @__PURE__ */ n(Vr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Jr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function $$(e) {
  return Jr(e) ? /* @__PURE__ */ n(Wr, { ...e }) : /* @__PURE__ */ n(Xr, { ...e });
}
function Ka(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Qr = "_root_o4yib_2", Zr = "_row_o4yib_8", el = "_box_o4yib_14", al = "_label_o4yib_21", nl = "_lockedNote_o4yib_26", tl = "_consequence_o4yib_34", rl = "_sample_o4yib_69", qe = {
  root: Qr,
  row: Zr,
  box: el,
  label: al,
  lockedNote: nl,
  consequence: tl,
  sample: rl
};
function ll(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function ol({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function il({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function sl({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function In(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = ll(e);
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
        /* @__PURE__ */ n(il, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(sl, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(ol, { id: t, text: e.consequence })
  ] });
}
const cl = "_chip_1073r_2", dl = {
  chip: cl
}, ul = {
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
function hl(e, a) {
  if (e === "stream") return ml(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = ul[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function ml(e) {
  if (!e || !ya(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = xn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${dl.chip} ward-chip ward-chip--${e}`, style: hl(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function aa(e) {
  return typeof e == "number" && ya(e) ? e : null;
}
function fe(e, a) {
  const t = aa(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ka(e, a) {
  const t = aa(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const wl = "_nav_j90m2_2", _l = "_list_j90m2_8", fl = "_item_j90m2_15", vl = "_link_j90m2_30", bl = "_sep_j90m2_40", gl = "_current_j90m2_44", pl = "_chips_j90m2_48", Ie = {
  nav: wl,
  list: _l,
  item: fl,
  link: vl,
  sep: bl,
  current: gl,
  chips: pl
};
function Nl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ie.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ie.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ie.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const yl = "_field_fy549_2", kl = "_label_fy549_8", $l = "_labelHidden_fy549_15", Cl = "_control_fy549_25", Sl = "_mono_fy549_44", Rl = "_area_fy549_49", Tl = "_invalid_fy549_56", Ee = {
  field: yl,
  label: kl,
  labelHidden: $l,
  control: Cl,
  mono: Sl,
  area: Rl,
  invalid: Tl
}, Ll = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function El({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Ll : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Al({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function xl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Il = { input: El, select: Al, textarea: xl };
function Ml(e, a, t) {
  const r = Il[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function ql(e, a, t) {
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
function Pl(e) {
  const a = e.mono ? [Ee.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ee.area] : [];
  return [Ee.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Bl(e) {
  return e ? `${Ee.label} ${Ee.labelHidden} ward-field-label` : `${Ee.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = ql(e, a, t), l = Pl(e);
  return /* @__PURE__ */ o("div", { className: `${Ee.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Bl(e.labelHidden), htmlFor: a, children: e.label }),
    Ml(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ee.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Ol(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function Mn(e) {
  const a = Ol(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function $a(e, a, t) {
  x(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = Mn(r);
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
function Dl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function qn(e, a, t) {
  Wa(() => {
    const r = e.current, l = r == null ? void 0 : r.querySelectorAll(t)[a];
    if (!r || !l) return;
    const i = Dl(r, l);
    i !== null && (r.scrollLeft = Math.max(0, i)), Mn(r);
  }, [e, a, t]);
}
const Hl = "_strip_kancu_2", Fl = "_tab_kancu_32", jl = "_count_kancu_75", Ze = {
  strip: Hl,
  tab: Fl,
  count: jl
}, ua = 7;
function Wl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Pn(e) {
  return `${Ze.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function C$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > ua) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${ua} — the set is fixed`);
  const i = pa({ orientation: "horizontal" }), s = Wl(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = p(null);
  return $a(c, e.length), qn(c, s, '[role="tab"]'), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Pn(l),
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
function S$({ links: e, active: a, label: t, level: r = 1 }) {
  if (e.length > ua) throw new Error(`TabLinks: ${e.length} links exceeds the cap of ${ua} — the set is fixed`);
  const l = p(null);
  return $a(l, e.length), qn(l, e.findIndex((i) => i.id === a), "a"), /* @__PURE__ */ n("nav", { ref: l, className: Pn(r), "aria-label": t, "data-level": r, children: e.map((i) => /* @__PURE__ */ o("a", { href: i.href, className: `${Ze.tab} ward-tab`, "aria-current": i.id === a ? "page" : void 0, children: [
    i.label,
    i.count === void 0 ? null : /* @__PURE__ */ o(S, { children: [
      " ",
      /* @__PURE__ */ n("span", { className: Ze.count, children: `· ${i.count}` })
    ] })
  ] }, i.id)) });
}
const zl = "_root_jem6y_2", Gl = "_segment_jem6y_7", cn = {
  root: zl,
  segment: Gl
};
function Bn({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = pa({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
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
const Ul = "_sidebar_1g24y_3", Kl = "_brand_1g24y_9", Vl = "_mark_1g24y_17", Yl = "_word_1g24y_24", Xl = "_nav_1g24y_30", Jl = "_navItem_1g24y_38", Ql = "_group_1g24y_50", Zl = "_groupName_1g24y_57", eo = "_agents_1g24y_70", ao = "_agent_1g24y_70", no = "_agentTop_1g24y_88", to = "_dot_1g24y_95", ro = "_agentName_1g24y_107", lo = "_agentMeta_1g24y_120", oo = "_foot_1g24y_126", io = "_footName_1g24y_132", so = "_footLinks_1g24y_139", co = "_footLink_1g24y_139", uo = "_root_1g24y_153", ho = "_linkBrand_1g24y_162", mo = "_label_1g24y_183", wo = "_note_1g24y_188", _o = "_footer_1g24y_202", R = {
  sidebar: Ul,
  brand: Kl,
  mark: Vl,
  word: Yl,
  nav: Xl,
  navItem: Jl,
  group: Ql,
  groupName: Zl,
  new: "_new_1g24y_64",
  agents: eo,
  agent: ao,
  agentTop: no,
  dot: to,
  agentName: ro,
  agentMeta: lo,
  foot: oo,
  footName: io,
  footLinks: so,
  footLink: co,
  root: uo,
  linkBrand: ho,
  label: mo,
  note: wo,
  footer: _o
};
function fo({ agent: e }) {
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
              style: { "--dot": xn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: R.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: R.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function vo({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: R.foot, children: [
    /* @__PURE__ */ n("span", { className: R.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: R.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${R.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function bo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
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
    /* @__PURE__ */ n("ul", { className: R.agents, children: r.map((s) => /* @__PURE__ */ n(fo, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(vo, { shared: i })
  ] });
}
function go(e) {
  return e.destinations ?? e.items ?? [];
}
function po({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.linkBrand, children: e });
}
function No({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: R.footer, children: e });
}
function yo({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: R.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: R.note, children: e.note })
  ] });
}
function ko(e) {
  return /* @__PURE__ */ o("aside", { className: `${R.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(po, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: go(e).map((a) => /* @__PURE__ */ n(yo, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(No, { children: e.children })
  ] });
}
function $o(e) {
  return "agents" in e;
}
function R$(e) {
  return $o(e) ? /* @__PURE__ */ n(bo, { ...e }) : /* @__PURE__ */ n(ko, { ...e });
}
const Co = "_mark_wlgi8_3", So = {
  mark: Co
}, Ro = { met: "✓", unmet: "", failed: "✕" };
function Va({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: So.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ro[e]
    }
  );
}
const To = "_marker_br9fi_2", Lo = {
  marker: To
}, Eo = {
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
  const r = { "--marker": Eo[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Lo.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Ao = "_root_ti0pq_2", xo = "_chip_ti0pq_11", Io = "_noCase_ti0pq_23", ra = {
  root: Ao,
  chip: xo,
  noCase: Io
};
function Mo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ya({ connection: e, since: a, lastEventAt: t }) {
  const r = Mo(a, t), l = Ga(r, e === "reconnecting");
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
const qo = "_root_16ud8_2", Po = "_context_16ud8_12", Bo = "_row_16ud8_1", Oo = "_heading_16ud8_25", Do = "_headingWrap_16ud8_33", Ho = "_chips_16ud8_38", Fo = "_title_16ud8_45", jo = "_consequence_16ud8_54", Wo = "_actionsWrap_16ud8_59", zo = "_actions_16ud8_59", Go = "_action_16ud8_59", Uo = "_overflowPanel_16ud8_85", Ko = "_measureClip_16ud8_96", Vo = "_measure_16ud8_96", Z = {
  root: qo,
  context: Po,
  row: Bo,
  heading: Oo,
  headingWrap: Do,
  chips: Ho,
  title: Fo,
  consequence: jo,
  actionsWrap: Wo,
  actions: zo,
  action: Go,
  overflowPanel: Uo,
  measureClip: Ko,
  measure: Vo
};
function Yo({ title: e, consequence: a, consequenceHint: t }) {
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
function Xo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(dn, { disclosure: l }) : a ? [/* @__PURE__ */ n(dn, { disclosure: l }, "more"), /* @__PURE__ */ n(Ba, { actions: e }, "actions")] : /* @__PURE__ */ n(Ba, { actions: e });
}
function Jo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Qo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(Ba, { actions: e }) });
}
function Zo(e, a) {
  const t = $(), [r, l] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function ei({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Nl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function ai(...e) {
  return e.some((a) => a === null);
}
function ni(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ti(e, a, t, r, l) {
  if (l === 0 || ai(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = ni(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function ri(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function li(e) {
  return Et(e) && (e.type === "a" || typeof e.props.href == "string");
}
function oi(e, a) {
  return a.length === 0 && e.length === 1 && li(e[0]);
}
function ii(e, a) {
  const t = p(null), r = p(null), l = p(null), i = p(null), [s, c] = g(!1);
  return x(() => {
    const d = t.current;
    if (!ri(d)) return;
    const u = () => c(ti(d, r.current, l.current, i.current, e.length)), h = new ResizeObserver(u);
    return h.observe(d), u(), () => h.disconnect();
  }, [e]), { rowRef: t, headingRef: r, actionsRef: l, measureRef: i, collapsed: s && !a };
}
function si({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function ci({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ya, { connection: e.connection, since: e.since }) : null;
}
function T$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: N, collapsed: I } = ii(i, oi(i, s)), H = s.length > 0, { disclosure: oe, close: Ce } = Zo(I || H, b), ne = Jo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(ei, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Yo, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(ci, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Xo, { actions: i, hasMore: H, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Qo, { actions: ne, disclosure: oe, onEscape: Ce }),
    /* @__PURE__ */ n(si, { actions: i, hasMore: H, measureRef: N })
  ] });
}
const di = "_scrim_c7sqj_2", ui = "_drawer_c7sqj_10", hi = "_sheet_c7sqj_14", mi = "_modal_c7sqj_18", wi = "_panel_c7sqj_23", _i = "_header_c7sqj_51", fi = "_title_c7sqj_59", vi = "_body_c7sqj_63", bi = "_close_c7sqj_90", ye = {
  scrim: di,
  drawer: ui,
  sheet: hi,
  modal: mi,
  panel: wi,
  header: _i,
  title: fi,
  body: vi,
  close: bi
}, gi = Fe(null), ha = [], ma = /* @__PURE__ */ new Map();
function pi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Ni(e, a) {
  let t = ma.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ma.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function yi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !pi(r) && Ni(e, r);
}
function ki(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (yi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function $i(e) {
  for (const a of e.claims) {
    const t = ma.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ma.delete(a)));
  }
}
function Ci(e, a) {
  const t = { root: e, claims: [] };
  return ha.push(t), ki(t, a), t;
}
function Si(e) {
  const a = ha.indexOf(e);
  a >= 0 && ha.splice(a, 1), $i(e);
}
function un(e) {
  return e !== null && ha.at(-1) === e;
}
function Ri(e, a, t) {
  const r = p(null), l = p(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = Ci(i, a);
    return r.current = c, () => {
      var u, h;
      const d = un(c);
      Si(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => un(r.current), []);
}
function Ti(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Li(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Ei({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ai(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function xi(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${t}${r}`;
}
function Ii(e) {
  const a = He(gi);
  return e ?? a ?? document.body;
}
function na(e) {
  const a = p(null), t = p(null), r = $(), l = Ii(e.container), i = Ua("(min-width: 768px)"), s = Ti(e.kind, i), c = Li(e, r), d = Ft(t), u = Ri(a, l, e.returnFocusTo), h = X(() => {
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
  }, [h]), It(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ai(s),
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
            className: xi(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Ei, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Mi = "_root_drrhx_2", qi = "_ticket_drrhx_15", Pi = "_body_drrhx_24", La = {
  root: Mi,
  ticket: qi,
  body: Pi
};
function L$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${La.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${La.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: La.body, children: t })
  ] });
}
const Bi = "_root_bf1pc_2", Oi = "_table_bf1pc_9", Di = "_caption_bf1pc_14", Hi = "_series_bf1pc_23", Fi = "_category_bf1pc_31", ji = "_cell_bf1pc_39", Wi = "_track_bf1pc_45", zi = "_lane_bf1pc_52", Gi = "_bar_bf1pc_56", Ui = "_value_bf1pc_63", Ki = "_swatch_bf1pc_70", Vi = "_empty_bf1pc_78", V = {
  root: Bi,
  table: Oi,
  caption: Di,
  series: Hi,
  category: Fi,
  cell: ji,
  track: Wi,
  lane: zi,
  bar: Gi,
  value: Ui,
  swatch: Ki,
  empty: Vi
}, Yi = "—", hn = 6;
function Xi(e, a) {
  if (a.length < 1 || a.length > hn)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${hn}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Ji(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function On(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Qi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Zi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Qi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function es({ series: e }) {
  return /* @__PURE__ */ n(S, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": On(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function as({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function ns({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Yi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(es, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Zi, { value: u.values[d], top: r, step: On(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function E$(e) {
  Xi(e.categories, e.series);
  const a = Ji(e.series);
  return a === 0 ? /* @__PURE__ */ n(as, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(ns, { ...e, top: a });
}
const ts = "_root_1bfqw_2", rs = "_figure_1bfqw_7", ls = "_of_1bfqw_13", os = "_bar_1bfqw_18", is = "_rows_1bfqw_38", ss = "_row_1bfqw_38", cs = "_label_1bfqw_49", ds = "_amount_1bfqw_54", Se = {
  root: ts,
  figure: rs,
  of: ls,
  bar: os,
  rows: is,
  row: ss,
  label: cs,
  amount: ds
};
function us({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ o("div", { className: `${Se.root} ward-costmeter`, children: [
    /* @__PURE__ */ o("p", { className: `${Se.figure} ward-stat-value`, children: [
      re(e),
      " ",
      /* @__PURE__ */ o("span", { className: Se.of, children: [
        "of ",
        re(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Se.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${re(e)} of ${re(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Se.rows, children: t.map((l) => /* @__PURE__ */ o("li", { className: `${Se.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Se.label, children: l.label }),
      /* @__PURE__ */ n("span", { className: Se.amount, children: re(l.amount) })
    ] }, l.label)) })
  ] });
}
const hs = "_frame_mg2jl_2", ms = "_table_mg2jl_6", ws = "_th_mg2jl_12", _s = "_td_mg2jl_13", fs = "_sort_mg2jl_47", vs = "_row_mg2jl_53", bs = "_empty_mg2jl_61", Te = {
  frame: hs,
  table: ms,
  th: ws,
  td: _s,
  sort: fs,
  row: vs,
  empty: bs
}, gs = { asc: "ascending", desc: "descending" };
function ps(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return gs[a.direction];
}
function Ns(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Te.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function ys(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ks({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Te.th,
      style: ys(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ps(e, a),
      children: Ns(e, t)
    }
  );
}
function $s({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: Te.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((l) => /* @__PURE__ */ n("td", { className: Te.td, "data-align": l.align, "data-mono": l.mono, "data-drop": l.dropPriority, children: a.renderCell(e, l.key) }, l.key))
    }
  );
}
function Cs({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: Te.empty, children: u }) : /* @__PURE__ */ n("div", { className: Te.frame, children: /* @__PURE__ */ o("table", { className: Te.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Te.head, children: a.map((h) => /* @__PURE__ */ n(ks, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n($s, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const Ss = "_list_v0s52_2", Rs = {
  list: Ss
};
function A$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: Rs.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const Ts = "_label_1u62a_2", Ls = {
  label: Ts
};
function x$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Ls.label, children: a.header }) }, a.key)) }) });
}
const Es = "_stack_bp6a0_2", As = {
  stack: Es
};
function I$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: As.stack, "data-ward-action-stack": "", children: e });
}
const xs = "_set_y5zy3_2", Is = "_legend_y5zy3_7", Ms = "_row_y5zy3_15", qs = "_control_y5zy3_20", Ps = "_input_y5zy3_26", Bs = "_label_y5zy3_31", Os = "_consequence_y5zy3_36", Me = {
  set: xs,
  legend: Is,
  row: Ms,
  control: qs,
  input: Ps,
  label: Bs,
  consequence: Os
};
function Dn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
const Ds = "_root_1lu1e_2", Hs = "_head_1lu1e_11", Fs = "_note_1lu1e_30", js = "_index_1lu1e_35", Ws = "_dot_1lu1e_39", zs = "_counter_1lu1e_50", Gs = "_trailing_1lu1e_58", Pe = {
  root: Ds,
  head: Hs,
  note: Fs,
  index: js,
  dot: Ws,
  counter: zs,
  trailing: Gs
};
function Us({ index: e }) {
  return e ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ks({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function mn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ n(Us, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Pe.note, children: t }),
    /* @__PURE__ */ n(Ks, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Pe.trailing, children: i })
  ] });
}
const Vs = "_strip_1cw2w_2", Ys = "_cell_1cw2w_7", Xs = "_value_1cw2w_12", Js = "_link_1cw2w_28", Qs = "_linkValue_1cw2w_37", Zs = "_label_1cw2w_48", Le = {
  strip: Vs,
  cell: Ys,
  value: Xs,
  link: Js,
  linkValue: Qs,
  label: Zs
};
function ec(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Hn = (e) => `${Le.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function ac({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Hn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Le.label} ward-stat-label`, children: e.label })
  ] });
}
function nc({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Le.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Hn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Le.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { className: Le.linkValue, children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Le.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Ca({ cells: e, divided: a = !1 }) {
  return ec(e), /* @__PURE__ */ n("dl", { className: `${Le.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(ac, { cell: t }, t.label) : /* @__PURE__ */ n(nc, { cell: t, href: t.href }, t.label)) });
}
const tc = "_root_34y38_2", rc = "_track_34y38_8", lc = "_thumb_34y38_46", oc = "_labelHidden_34y38_64", ic = "_label_34y38_64", sc = "_lockedNote_34y38_84", Be = {
  root: tc,
  track: rc,
  thumb: lc,
  labelHidden: oc,
  label: ic,
  lockedNote: sc
};
function cc(e) {
  return e ? `${Be.label} ${Be.labelHidden}` : Be.label;
}
function De({ label: e, checked: a, onChange: t, disabled: r, locked: l, describedBy: i, labelHidden: s }) {
  const c = $(), d = `${c}switch`, u = l ? !0 : a, h = r || l;
  return /* @__PURE__ */ o("span", { className: `${Be.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        id: d,
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": c,
        "aria-describedby": i,
        className: `${Be.track} ward-switch`,
        "data-on": u,
        "data-locked": l ? !0 : void 0,
        disabled: h,
        onClick: () => !h && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Be.thumb })
      }
    ),
    /* @__PURE__ */ o("label", { id: c, htmlFor: d, className: cc(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const dc = "_bar_1o04s_2", uc = "_skip_1o04s_11", hc = "_mark_1o04s_22", mc = "_nav_1o04s_30", wc = "_list_1o04s_34", _c = "_select_1o04s_40", fc = "_dest_1o04s_47", vc = "_actor_1o04s_75", bc = "_actorMark_1o04s_88", gc = "_actorLabel_1o04s_93", pc = "_tagline_1o04s_112", de = {
  bar: dc,
  skip: uc,
  mark: hc,
  nav: mc,
  list: wc,
  select: _c,
  dest: fc,
  actor: vc,
  actorMark: bc,
  actorLabel: gc,
  tagline: pc
};
function Nc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function yc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function M$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = yc(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: Nc(c) })
    ] })
  ] });
}
const kc = "_tree_1lyby_2", $c = "_item_1lyby_6", Cc = "_row_1lyby_10", Sc = "_button_1lyby_22", wa = {
  tree: kc,
  item: $c,
  row: Cc,
  button: Sc
}, Fn = Fe(null);
function Rc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = pa({ orientation: "vertical" });
  return /* @__PURE__ */ n(Fn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: wa.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const Tc = { ArrowRight: !0, ArrowLeft: !1 };
function wn(e) {
  return e ? !0 : void 0;
}
function Lc(e, a) {
  const t = Tc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Ec(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Ac(e) {
  const a = [wa.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function xc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Ic(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Mc(e) {
  return typeof e == "string" ? e : void 0;
}
function qc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function Pc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function jn(e) {
  const a = He(Fn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = xc(e);
  return /* @__PURE__ */ o("li", { className: wa.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Ac(e),
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
            onClick: () => Ec(e),
            onKeyDown: (r) => Lc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Ic(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Mc(e.label), children: e.label }),
              /* @__PURE__ */ n(qc, { value: e.detail }),
              /* @__PURE__ */ n(Pc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Bc = "_frame_1fj9j_2", Oc = "_subjectRail_1fj9j_22", Dc = "_subject_1fj9j_22", Hc = "_rail_1fj9j_42", Fc = "_record_1fj9j_64", jc = "_recordBody_1fj9j_69", Wc = "_stageGrid_1fj9j_118", zc = "_band_1fj9j_144", Gc = "_bandBody_1fj9j_153", Uc = "_bandActions_1fj9j_158", Kc = "_scroller_1fj9j_166", Vc = "_board_1fj9j_192", Yc = "_laneCount_1fj9j_200", Xc = "_lanes_1fj9j_210", Y = {
  frame: Bc,
  subjectRail: Oc,
  subject: Dc,
  rail: Hc,
  record: Fc,
  recordBody: jc,
  stageGrid: Wc,
  band: zc,
  bandBody: Gc,
  bandActions: Uc,
  scroller: Kc,
  board: Vc,
  laneCount: Yc,
  lanes: Xc
};
function q$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function _n(e) {
  return e ? "true" : void 0;
}
function P$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": _n(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": _n(l), "aria-label": r, children: a })
  ] });
}
function B$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(mn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(mn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Jc = "_form_1j8ub_2", Qc = "_fields_1j8ub_9", Zc = "_actions_1j8ub_19", Ea = {
  form: Jc,
  fields: Qc,
  actions: Zc
};
function O$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ea.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ea.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ea.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function D$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const ed = "(max-width: 767.98px)";
function Xa({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = p(null);
  $a(l, t ?? At.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function ad({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = g(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Xa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function nd({ lanes: e, label: a }) {
  const [t, r] = g(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Xa, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(xt, { children: l.content }, l.id)) })
  ] });
}
function H$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = Ua(ed);
  return t === void 0 ? /* @__PURE__ */ n(Xa, { label: a, children: e }) : l ? /* @__PURE__ */ n(ad, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(nd, { lanes: t, label: a });
}
function F$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = p(null), i = Math.max(e, 1);
  $a(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const td = "_block_1o5o7_2", rd = "_sentence_1o5o7_15", ld = "_meta_1o5o7_20", od = "_action_1o5o7_25", id = "_strip_1o5o7_29", sd = "_loading_1o5o7_48", cd = "_label_1o5o7_56", dd = "_counter_1o5o7_63", _e = {
  block: td,
  sentence: rd,
  meta: ld,
  action: od,
  strip: id,
  loading: sd,
  label: cd,
  counter: dd
};
function ud({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function Sa({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(ud, { action: a })
  ] });
}
function hd(e) {
  return /* @__PURE__ */ n(Sa, { ...e, kind: "ward-emptystate" });
}
function j$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(Sa, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function W$(e) {
  return /* @__PURE__ */ n(Sa, { ...e });
}
function z$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(Sa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function G$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function U$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function K$({ label: e, startedAt: a }) {
  const t = p(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = g(!1);
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
const md = "_note_tlubt_2", wd = {
  note: md
};
function _d({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: wd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const fd = "_card_12in3_2", vd = "_hit_12in3_23", bd = "_head_12in3_30", gd = "_title_12in3_36", pd = "_meta_12in3_44", Nd = "_fields_12in3_45", yd = "_who_12in3_58", kd = "_sep_12in3_65", $d = "_mono_12in3_69", Cd = "_field_12in3_45", Sd = "_last_12in3_84", Rd = "_reason_12in3_96", J = {
  card: fd,
  hit: vd,
  head: bd,
  title: gd,
  meta: pd,
  fields: Nd,
  who: yd,
  sep: kd,
  mono: $d,
  field: Cd,
  last: Sd,
  reason: Rd
}, Td = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Ld(e, a, t) {
  const r = ia(e, "blue"), l = ia(e, "orange"), i = ia(e, "green"), s = p(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = Td[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const Ed = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Ad(e, a) {
  return Ed[a](e);
}
function xd({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: J.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ o("p", { className: J.meta, children: [
    /* @__PURE__ */ o("span", { className: J.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
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
function Id({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: J.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Md({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function qd({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: Ad(e, t) }, t)) });
}
const Oa = (e) => e ? !0 : void 0;
function Pd(e) {
  return { "--stream": fe(e.streamStep, "id") };
}
function Bd(e, a, t) {
  e == null || e(a, t);
}
function Od(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function Dd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": Oa(a), children: t }) : null;
}
function Ra(e) {
  const a = e.fields ?? [], t = e.item, r = p(null);
  Ld(r, t.key, e.feed);
  const l = Od(e.feed), i = Pd(t);
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
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Bd(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Id, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(xd, { item: t, connection: l }),
        /* @__PURE__ */ n(Md, { reason: t.blockedReason }),
        /* @__PURE__ */ n(qd, { item: t, fields: a }),
        /* @__PURE__ */ n(Dd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Hd = "_column_10sxg_3", Fd = "_head_10sxg_24", jd = "_label_10sxg_33", Wd = "_count_10sxg_42", zd = "_list_10sxg_56", Je = {
  column: Hd,
  head: Fd,
  label: jd,
  count: Wd,
  list: zd
};
function Wn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Gd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Ud(e) {
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
function Kd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Wn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Gd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Ud, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(_d, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Vd = "_foot_8qg4p_2", Yd = "_note_8qg4p_13", Xd = "_link_8qg4p_19", Aa = {
  foot: Vd,
  note: Yd,
  link: Xd
};
function V$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Aa.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Aa.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Aa.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Jd = "_head_1la6p_3", Qd = "_identity_1la6p_12", Zd = "_titleRow_1la6p_18", eu = "_title_1la6p_18", au = "_key_1la6p_35", nu = "_rollup_1la6p_45", tu = "_tools_1la6p_53", ru = "_swatch_1la6p_62", lu = "_mark_1la6p_69", pe = {
  head: Jd,
  identity: Qd,
  titleRow: Zd,
  title: eu,
  key: au,
  rollup: nu,
  tools: tu,
  swatch: ru,
  mark: lu
}, fn = "initials:";
function ou(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function iu(e) {
  const a = [ou(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function su(e) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    iu(e)
  ] });
}
function cu(e) {
  return e.startsWith(fn) ? e.slice(fn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function du({ markRef: e, streamStep: a }) {
  const t = { "--stream": fe(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: cu(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function uu({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Y$({
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
        /* @__PURE__ */ n(du, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: su(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(uu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Ya, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const hu = "_head_589hw_11", mu = "_line_589hw_12", wu = "_cHandle_589hw_33", _u = "_cName_589hw_38", fu = "_nameLine_589hw_46", vu = "_cLabel_589hw_53", bu = "_cCap_589hw_58", gu = "_cShown_589hw_63", pu = "_name_589hw_46", Nu = "_noCap_589hw_85", yu = "_state_589hw_99", ku = "_handle_589hw_108", $u = "_sub_589hw_134", P = {
  head: hu,
  line: mu,
  cHandle: wu,
  cName: _u,
  nameLine: fu,
  cLabel: vu,
  cCap: bu,
  cShown: gu,
  name: pu,
  noCap: Nu,
  state: yu,
  handle: ku,
  sub: $u
}, Cu = "can't be hidden or collapsed", Su = "terminal · counted, not a column";
function X$() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.cHandle }),
    /* @__PURE__ */ n("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: P.cShown, children: "Shown" })
  ] });
}
function Ru(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function Tu(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function vn(e) {
  return e.gate ? Cu : e.terminal ? Su : Tu(e.agentsMounted);
}
function Lu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Eu({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    vn(e) && /* @__PURE__ */ n("span", { className: P.sub, children: vn(e) })
  ] });
}
function Au(e) {
  return e === void 0 ? "" : String(e);
}
function xu(e) {
  return e === "" ? void 0 : Number(e);
}
function Iu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: P.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Lu(t, a),
      children: "⠿"
    }
  ) });
}
function Mu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: P.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Au(a.cap), onChange: (r) => t({ ...a, cap: xu(r) }) }) });
}
function qu({ stage: e, config: a, onChange: t }) {
  const r = Ru(e, a.shown), l = e.gate || e.terminal, i = (s) => t({ ...a, shown: s });
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: i }),
    /* @__PURE__ */ n("span", { className: P.state, "data-fixed": l || void 0, "aria-hidden": "true", onClick: () => !l && i(!r.shown), children: r.state })
  ] });
}
function Pu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function J$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": Pu(e), children: [
    /* @__PURE__ */ n(Iu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Eu, { stage: e }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Mu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(qu, { stage: e, config: a, onChange: t })
  ] });
}
const Bu = "_body_hn6d6_2", Ou = "_head_hn6d6_9", Du = "_summary_hn6d6_19", Hu = "_block_hn6d6_20", Fu = "_actionsBlock_hn6d6_21", ju = "_title_hn6d6_41", Wu = "_note_hn6d6_46", zu = "_k_hn6d6_51", Gu = "_kv_hn6d6_58", Uu = "_row_hn6d6_64", Ku = "_label_hn6d6_75", Vu = "_value_hn6d6_84", Yu = "_quote_hn6d6_90", Xu = "_actions_hn6d6_21", Ju = "_resolve_hn6d6_103", B = {
  body: Bu,
  head: Ou,
  summary: Du,
  block: Hu,
  actionsBlock: Fu,
  title: ju,
  note: Wu,
  k: zu,
  kv: Gu,
  row: Uu,
  label: Ku,
  value: Vu,
  quote: Yu,
  actions: Xu,
  resolve: Ju
};
function Qu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Zu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function eh(e) {
  const a = aa(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function ah(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ka(eh(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Qu(e),
    ...Zu(e, a)
  ];
}
function nh({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function th({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function rh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function Q$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = ah(e, l);
  return /* @__PURE__ */ n(na, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(th, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(rh, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: B.note, children: c })
    ] }),
    /* @__PURE__ */ n(nh, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const lh = "_root_3azmy_2", oh = "_list_3azmy_7", ih = "_item_3azmy_12", sh = "_box_3azmy_18", ch = "_text_3azmy_23", dh = "_note_3azmy_28", ze = {
  root: lh,
  list: oh,
  item: ih,
  box: sh,
  text: ch,
  note: dh
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
const uh = "_rail_ke7ch_2", hh = "_k_ke7ch_11", mh = "_head_ke7ch_19", wh = "_section_ke7ch_25", _h = "_card_ke7ch_38", fh = "_strip_ke7ch_42", vh = "_skeleton_ke7ch_56", bh = "_skeletonLabel_ke7ch_70", gh = "_bar_ke7ch_76", ph = "_note_ke7ch_85", he = {
  rail: uh,
  k: hh,
  head: mh,
  section: wh,
  card: _h,
  strip: fh,
  skeleton: vh,
  skeletonLabel: bh,
  bar: gh,
  note: ph
};
function Nh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function xa({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function yh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function kh({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Kd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function $h(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(kh, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(yh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Z$(e) {
  const a = Nh(e.onOpen), t = Wn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(xa, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n(Ra, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(xa, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n($h, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(xa, { title: "Effect of this config", children: /* @__PURE__ */ n(Ta, { items: e.effects, density: "compact" }) })
  ] });
}
function Ch(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Sh(e) {
  return Math.ceil(e.length / 2);
}
function Rh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function zn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function Th(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = zn(e);
  l !== void 0 && t(l), r(Rh(e.type));
}
function Lh(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => Th(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Eh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Ah(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function xh(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Ih(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(Sh(a ?? [])) + ")"
  };
}
function Mh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function qh(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function Ph(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Bh(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Oh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function Dh(e, a) {
  return a === void 0 ? e : Ch(e, a.ref);
}
function Hh(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function ea(e) {
  return e === !0 ? "true" : void 0;
}
function Gn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = p(null), i = ia(l), s = p(/* @__PURE__ */ new Set()), [c, d] = g(Eh(a));
  Lh(e.feed, a.key, s, d, i);
  const u = Ah(a, r), h = xh(a, t), f = Ih(a, e.fields), b = Oh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Hh(e),
      className: "ward-workcard",
      "data-flagged": ea(a.flagged),
      "data-selected": ea(e.selected),
      style: f,
      ref: Dh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Mh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          qh(a, e.fields),
          Ph(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Bh(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Fh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function jh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Wh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function zh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Fh, { count: e.items.length, cap: e.column.cap });
}
function Gh(e, a) {
  return e.roving ?? a;
}
function Uh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Kh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Gn,
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
function Vh(e) {
  const a = $(), t = pa({ orientation: "vertical" }), r = Gh(e, t), l = jh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": ea(l), "data-gate": ea(e.column.gate), children: [
    Wh(e.column, e.items.length, a),
    zh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Uh(e, t), children: Kh(e, r) })
  ] });
}
function Yh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Xh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Jh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function eC(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Yh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Xh(e),
      Jh(e.onConfigure),
      /* @__PURE__ */ n(Ya, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Qh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Zh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function em(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(S, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function aC(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": ea(Qh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Zh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(In, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    em(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function nC(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Gn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Vh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function am(e, a) {
  const t = zn(e);
  t !== void 0 && a(t);
}
function nm(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => am(r, t));
  }, [e, a, t]);
}
function tm(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function rm(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function lm(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n($e, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function om(e, a) {
  return /* @__PURE__ */ o(S, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function tC(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = g((s = a.run) == null ? void 0 : s.lastStep);
  nm(e.feed, a.key, l);
  const i = [...tm(a), ...rm(a)];
  return /* @__PURE__ */ o(na, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      lm(t, r)
    ] }),
    om(a, e.actions)
  ] });
}
const im = "_card_d2vbe_2", sm = "_head_d2vbe_22", cm = "_mark_d2vbe_30", dm = "_name_d2vbe_42", um = "_chips_d2vbe_63", hm = "_description_d2vbe_69", mm = "_run_d2vbe_74", wm = "_sep_d2vbe_83", _m = "_facts_d2vbe_88", fm = "_fact_d2vbe_88", vm = "_factLabel_d2vbe_101", bm = "_factValue_d2vbe_105", le = {
  card: im,
  head: sm,
  mark: cm,
  name: dm,
  chips: um,
  description: hm,
  run: mm,
  sep: wm,
  facts: _m,
  fact: fm,
  factLabel: vm,
  factValue: bm
}, gm = { live: "done", draft: "running", paused: "meta" };
function pm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function Nm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: gm[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function ym({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function km({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function $m({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function Cm(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Sm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": fe(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: pm(s),
      style: c,
      "data-selected": d,
      "data-paused": Cm(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(ym, { description: e.description }),
        /* @__PURE__ */ n(km, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(Nm, { versions: e.versions }),
        /* @__PURE__ */ n($m, { facts: i })
      ]
    }
  );
}
const Rm = "_list_4dcyc_2", Tm = "_row_4dcyc_11", Lm = "_head_4dcyc_23", Em = "_id_4dcyc_30", Am = "_lock_4dcyc_35", xm = "_reason_4dcyc_41", Im = "_remove_4dcyc_46", Mm = "_clauses_4dcyc_50", qm = "_clause_4dcyc_50", Pm = "_label_4dcyc_64", Bm = "_cell_4dcyc_71", Om = "_value_4dcyc_76", ie = {
  list: Rm,
  row: Tm,
  head: Lm,
  id: Em,
  lock: Am,
  reason: xm,
  remove: Im,
  clauses: Mm,
  clause: qm,
  label: Pm,
  cell: Bm,
  value: Om
}, Un = Fe(!1);
function rC({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Un.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function Dm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Hm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Fm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Hm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function bn(e, a) {
  return e.locked ? void 0 : a;
}
function lC({ rule: e, onChange: a, onRemove: t }) {
  if (!He(Un)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = bn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Fm, { rule: e, onRemove: bn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(Dm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const jm = "_ladder_wwnch_2", Wm = "_cell_wwnch_7", zm = "_empty_wwnch_26", Gm = "_name_wwnch_34", Um = "_holder_wwnch_40", Km = "_request_wwnch_46", Vm = "_swatches_wwnch_51", Ym = "_swatch_wwnch_51", Xm = "_tilesFrame_wwnch_78", Jm = "_tiles_wwnch_78", Qm = "_tile_wwnch_78", Zm = "_bar_wwnch_117", ew = "_hex_wwnch_128", aw = "_note_wwnch_138", L = {
  ladder: jm,
  cell: Wm,
  empty: zm,
  name: Gm,
  holder: Um,
  request: Km,
  swatches: Vm,
  swatch: Ym,
  tilesFrame: Xm,
  tiles: Jm,
  tile: Qm,
  bar: Zm,
  hex: ew,
  note: aw
}, nw = "not validated yet, pending a CVD matrix and dark stepping";
function tw(e) {
  return e.reserved ? "reserved" : ya(e.step) ? "validated" : "partial";
}
function Kn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function rw(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function lw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function ow(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function iw(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const gn = (e) => String(e).padStart(2, "0");
function sw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Kn(e, void 0);
}
function cw({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: r ? `step ${gn(e)}` : Kt(e) }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: r ? t : `Step ${gn(e)} · ${t}` })
  ] });
}
function dw({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = tw(e), s = Kn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...iw(c, d), "data-validation": i, style: rw(e, i), onClick: h, onKeyDown: (N) => ow(N, h) }, label: f, name: u, holder: s, validation: i, note: sw(i, t, d), step: e.step };
}
const uw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${L.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${L.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(cw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${L.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(lw, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function hw(e) {
  return uw[e.presentation](dw(e));
}
function mw(e) {
  for (const a of e)
    if (!a.reserved && !Na(a.step)) throw new Error("colour ladder renders token steps only");
}
function ww() {
  return /* @__PURE__ */ o("div", { className: `${L.cell} ward-ladder-cell ${L.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function _w(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const fw = { list: L.ladder, swatches: L.swatches, tiles: L.tilesFrame };
function vw() {
  return /* @__PURE__ */ o("div", { className: `${L.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${L.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${L.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${L.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const bw = { list: ww, swatches: () => null, tiles: vw };
function Vn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  mw(e.steps);
  const r = _w(e), l = bw[r], i = /* @__PURE__ */ o(S, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(hw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${fw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: L.tiles, children: i }) : i });
}
const gw = "_rail_1el2t_2", pw = "_section_1el2t_12", Nw = "_sectionFlush_1el2t_22", yw = "_head_1el2t_26", kw = "_headLabel_1el2t_34", $w = "_sample_1el2t_42", Cw = "_sampleLabel_1el2t_47", Sw = "_sampleTitle_1el2t_54", Rw = "_sampleMeta_1el2t_59", Tw = "_trace_1el2t_65", Lw = "_traceHead_1el2t_70", Ew = "_steps_1el2t_78", Aw = "_step_1el2t_78", xw = "_stepTitle_1el2t_97", Iw = "_hollow_1el2t_107", Mw = "_stepBody_1el2t_115", qw = "_stepDetail_1el2t_127", Pw = "_publish_1el2t_132", Bw = "_reason_1el2t_138", Ow = "_note_1el2t_143", Dw = "_reveal_1el2t_148", y = {
  rail: gw,
  section: pw,
  sectionFlush: Nw,
  head: yw,
  headLabel: kw,
  sample: $w,
  sampleLabel: Cw,
  sampleTitle: Sw,
  sampleMeta: Rw,
  trace: Tw,
  traceHead: Lw,
  steps: Ew,
  step: Aw,
  stepTitle: xw,
  hollow: Iw,
  stepBody: Mw,
  stepDetail: qw,
  publish: Pw,
  reason: Bw,
  note: Ow,
  reveal: Dw
}, pn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Hw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Fw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, jw = { notSimulated: "not simulated", running: "running" };
function Ww(e) {
  return e.presentation === "foundry";
}
function zw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Gw(e, a) {
  var r;
  const t = Hw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Uw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Kw(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Vw(e) {
  if (Uw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Yw(e) {
  const [a, t] = g(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${y.step} ${y.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Xw(e) {
  const a = jw[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: y.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: Fw[e.kind], label: e.kind });
}
function Jw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: y.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Qw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Zw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Yw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Xw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: y.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: y.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Jw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Qw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function e_(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Yn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${y.trace} ${y.section}`, children: [
    /* @__PURE__ */ n("p", { className: y.traceHead, id: a, children: e_(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: y.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Zw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function a_(e) {
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
function n_(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${y.sampleMeta} ${y.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function t_(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Ln(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function r_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Ln(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function l_(e) {
  const a = r_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: y.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: y.sectionFlush, children: /* @__PURE__ */ n(Ca, { divided: !0, cells: a }) });
}
function Xn(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: `${y.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function o_(e) {
  return /* @__PURE__ */ o("div", { className: `${y.publish} ${y.section}`, children: [
    /* @__PURE__ */ n(Xn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: y.note, children: e.note })
  ] });
}
function i_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${y.publish} ${y.section}`, children: /* @__PURE__ */ n(Xn, { reason: e.reason, onPublish: e.onPublish }) });
}
function Jn(e) {
  return /* @__PURE__ */ o("div", { className: `${y.head} ${y.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: y.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: pn[e.run.status].role, label: pn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n($e, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function s_(e, a) {
  const [t, r] = g(e.steps);
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
function c_(e) {
  var t;
  Kw(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Jn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(a_, { sample: e.run.sample }),
    /* @__PURE__ */ n(Yn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(t_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist }) }),
    /* @__PURE__ */ n(o_, { reason: zw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function d_(e) {
  var r;
  const a = s_(e.run, e.feed);
  Vw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${y.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Jn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(n_, { sample: e.run.sample }),
    /* @__PURE__ */ n(Yn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(l_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: y.section, children: /* @__PURE__ */ n(Ta, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(i_, { reason: Gw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function oC(e) {
  return Ww(e) ? /* @__PURE__ */ n(d_, { ...e }) : /* @__PURE__ */ n(c_, { ...e });
}
const u_ = "_list_142ip_3", h_ = "_row_142ip_9", m_ = "_condition_142ip_18", w_ = "_action_142ip_24", sa = {
  list: u_,
  row: h_,
  condition: m_,
  action: w_
}, Qn = Fe(!1);
function iC({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Qn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: sa.list, "aria-label": a, children: e }) });
}
function sC({ rule: e }) {
  if (!He(Qn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
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
function Zn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function et(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function Nn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function __(e) {
  return e === "up" ? "down" : "up";
}
function f_(e, a) {
  const t = Nn(e, a.id, a.direction) ?? Nn(e, a.id, __(a.direction));
  t == null || t.focus();
}
function at() {
  const e = p(null), [a, t] = g(null), [r, l] = g("");
  return x(() => {
    e.current !== null && a !== null && f_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function nt({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function _a({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const v_ = "_body_1h15q_2", b_ = "_title_1h15q_8", g_ = "_section_1h15q_13", p_ = "_legend_1h15q_18", N_ = "_stages_1h15q_26", y_ = "_stage_1h15q_26", k_ = "_stageIndex_1h15q_44", $_ = "_stageName_1h15q_50", C_ = "_footer_1h15q_59", S_ = "_note_1h15q_66", R_ = "_reason_1h15q_71", T_ = "_actions_1h15q_76", L_ = "_webHead_1h15q_83", E_ = "_kicker_1h15q_92", A_ = "_webTitle_1h15q_99", x_ = "_webBody_1h15q_105", I_ = "_webSection_1h15q_109", M_ = "_sectionHead_1h15q_121", q_ = "_sectionNote_1h15q_129", P_ = "_formLabel_1h15q_134", B_ = "_identityRow_1h15q_139", O_ = "_nameCell_1h15q_145", D_ = "_keyCell_1h15q_150", H_ = "_colourCell_1h15q_154", F_ = "_colourStatus_1h15q_161", j_ = "_webStages_1h15q_166", W_ = "_webStageList_1h15q_172", z_ = "_webStage_1h15q_166", G_ = "_webIndex_1h15q_191", U_ = "_webStageName_1h15q_196", K_ = "_webMoves_1h15q_201", V_ = "_addStage_1h15q_215", Y_ = "_addStageButton_1h15q_223", X_ = "_addStageNote_1h15q_231", J_ = "_webFooter_1h15q_236", Q_ = "_webFooterNotes_1h15q_244", Z_ = "_webNote_1h15q_251", w = {
  body: v_,
  title: b_,
  section: g_,
  legend: p_,
  stages: N_,
  stage: y_,
  stageIndex: k_,
  stageName: $_,
  footer: C_,
  note: S_,
  reason: R_,
  actions: T_,
  webHead: L_,
  kicker: E_,
  webTitle: A_,
  webBody: x_,
  webSection: I_,
  sectionHead: M_,
  sectionNote: q_,
  formLabel: P_,
  identityRow: B_,
  nameCell: O_,
  keyCell: D_,
  colourCell: H_,
  colourStatus: F_,
  webStages: j_,
  webStageList: W_,
  webStage: z_,
  webIndex: G_,
  webStageName: U_,
  webMoves: K_,
  addStage: V_,
  addStageButton: Y_,
  addStageNote: X_,
  webFooter: J_,
  webFooterNotes: Q_,
  webNote: Z_
}, ef = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], tt = "not in catalogue";
function af(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${tt}` }, ...t];
}
function nf({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${tt}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: af(t, e.name), invalid: i, onChange: r });
}
function rt(e, a) {
  return e.name || `stage ${a + 1}`;
}
function tf(e) {
  const a = p([]), t = p(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function rf({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = rt(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(nf, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: ef, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(_a, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(_a, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function lf({ stages: e, onChange: a, catalogue: t }) {
  const r = tf(e.length), l = at(), i = (c, d) => {
    const u = Zn(c, d);
    r.current = Da(r.current, c, u), l.moved({ id: r.current[u], direction: d }, et(rt(e[c], c), u, e.length)), a(Da(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(rf, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(nt, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const of = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], sf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], cf = "A new stream starts as a draft. Nothing runs on it until you publish it.", df = "Create is disabled: name the stream and give it a key first.", uf = "reorder with the ↑ ↓ buttons · min 2";
function Ja(e, a) {
  return !e.reserved && ya(e.step) && a[e.step] === void 0;
}
function hf(e, a) {
  const t = e.find((r) => Ja(r, a));
  return t ? t.step : 1;
}
function mf({ stages: e, onMove: a }) {
  const t = at(), r = (l, i) => {
    const s = Zn(l, i);
    t.moved({ id: e[l].id, direction: i }, et(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(_a, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(_a, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(nt, { text: t.announcement })
  ] });
}
function wf({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: cf }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function _f(e, a) {
  return e !== "" && a !== "" ? null : df;
}
function ff(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = sf, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = g(""), [b, N] = g(""), [I, H] = g(a[0].value), [oe, Ce] = g(() => hf(t, r)), [ne, je] = g(e.stages ?? of), [We, C] = g(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: We }, ve = _f(h, b);
  return /* @__PURE__ */ n(na, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: N, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: H, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Vn, { label: "Stream colour", steps: t, value: oe, onChange: Ce, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(mf, { stages: ne, onMove: (xe, Lt) => je(Da(ne, xe, Lt)) })
    ] }),
    /* @__PURE__ */ n(Dn, { legend: "Loop policy", options: l, value: We, onChange: C }),
    /* @__PURE__ */ n(wf, { reason: ve, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const lt = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], vf = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function bf(e, a, t, r, l, i) {
  var c;
  const s = ((c = lt.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function gf(e, a) {
  return pf(e) && Nf(e, a) && yf(e);
}
function pf(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Nf(e, a) {
  return e.colourStep !== null && Ja({ step: e.colourStep }, a);
}
function yf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function kf(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${nw}.` : Ja({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function $f({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Cf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n($f, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: vf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Sf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Rf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function Tf(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = g(""), [s, c] = g(""), [d, u] = g(e.owners[0] ?? ""), [h, f] = g(null), [b, N] = g("relay"), [I, H] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = bf(l, s, d, h, b, I), Ce = gf(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), je = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Vn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), We = /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: kf(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(na, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Sf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Rf, { name: l, setName: i, streamKey: s, setKey: c, colour: je, owner: We }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: uf })
        ] }),
        /* @__PURE__ */ n(lf, { stages: I, onChange: H })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Dn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: lt, onChange: N }) }),
      /* @__PURE__ */ n(Cf, { ready: Ce, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function cC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Tf, { ...e }) : /* @__PURE__ */ n(ff, { ...e });
}
const Lf = "_row_bs8hc_2", Ef = "_cell_bs8hc_6", Af = "_condition_bs8hc_11", xf = "_action_bs8hc_18", If = "_contract_bs8hc_24", Mf = "_contractCondition_bs8hc_33", qf = "_contractAction_bs8hc_39", Q = {
  row: Lf,
  cell: Ef,
  condition: Af,
  action: xf,
  contract: If,
  contractCondition: Mf,
  contractAction: qf
}, ot = ["advance", "block", "escalate", "requestReview"], yn = {
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
      options: ot.map((l) => ({ value: l, label: yn[l] }))
    }
  );
}
function Pf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: fa(e, r), children: fa(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Qa(e, a, t) })
  ] });
}
function Bf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: fa(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Qa(e, a, t) })
  ] });
}
function Of({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: fa(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Qa(e, a, t, !0) })
  ] });
}
const Df = { two: Bf, four: Pf, contract: Of };
function dC(e) {
  var t;
  if (!ot.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = Df[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Hf = "_column_1tf9e_2", Ff = "_head_1tf9e_17", jf = "_index_1tf9e_23", Wf = "_name_1tf9e_29", zf = "_meta_1tf9e_38", Gf = "_mono_1tf9e_43", Uf = "_gate_1tf9e_50", Kf = "_reviewersLabel_1tf9e_57", Vf = "_reviewers_1tf9e_57", Yf = "_reviewer_1tf9e_57", Xf = "_agents_1tf9e_74", Jf = "_workflowColumn_1tf9e_79", Qf = "_workflowHead_1tf9e_96", Zf = "_stageRow_1tf9e_102", ev = "_stageLabel_1tf9e_109", av = "_workflowTitle_1tf9e_116", nv = "_workflowMeta_1tf9e_122", tv = "_workflowGate_1tf9e_127", rv = "_gateNote_1tf9e_135", lv = "_cardNote_1tf9e_140", ov = "_reviewerList_1tf9e_145", iv = "_reviewerRow_1tf9e_151", sv = "_reviewerMark_1tf9e_157", cv = "_reviewerName_1tf9e_167", dv = "_terminalCard_1tf9e_173", uv = "_terminalCount_1tf9e_182", hv = "_workflowAgents_1tf9e_188", mv = "_mount_1tf9e_194", k = {
  column: Hf,
  head: Ff,
  index: jf,
  name: Wf,
  meta: zf,
  mono: Gf,
  gate: Uf,
  reviewersLabel: Kf,
  reviewers: Vf,
  reviewer: Yf,
  agents: Xf,
  workflowColumn: Jf,
  workflowHead: Qf,
  stageRow: Zf,
  stageLabel: ev,
  workflowTitle: av,
  workflowMeta: nv,
  workflowGate: tv,
  gateNote: rv,
  cardNote: lv,
  reviewerList: ov,
  reviewerRow: iv,
  reviewerMark: sv,
  reviewerName: cv,
  terminalCard: dv,
  terminalCount: uv,
  workflowAgents: hv,
  mount: mv
}, wv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Za(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function it(e) {
  return `${Math.round(e * 100)}%`;
}
function _v({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Ca, { cells: [
      { value: it(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function fv({ stage: e }) {
  return /* @__PURE__ */ n(Ca, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Za(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function vv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: wv[e.kind] })
  ] });
}
function bv({ stage: e }) {
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
function gv({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(_v, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(fv, { stage: e }) : null;
}
function pv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function Nv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(vv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(bv, { stage: e }),
    /* @__PURE__ */ n(gv, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(Sm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(pv, { onMount: t })
  ] });
}
const yv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function kv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function $v({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(kv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: it(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function Cv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Sv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Za(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: Cv(e.rolledBackThisWeek) })
  ] });
}
function Rv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Tv(e) {
  if (e.kind === "terminal") return `${Za(e.closedThisWeek)} this week`;
  const a = Rv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Lv({ stage: e, titleId: a }) {
  const t = yv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: Tv(e) })
  ] });
}
function Ev(e) {
  return e === "entry" || e === "agent";
}
function Av({ stage: e, onMount: a }) {
  return a === void 0 || !Ev(e.kind) ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", className: k.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function xv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Lv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n($v, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Sv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(Av, { stage: e, onMount: t })
  ] });
}
function Iv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function uC(e) {
  return Iv(e) ? /* @__PURE__ */ n(xv, { ...e }) : /* @__PURE__ */ n(Nv, { ...e });
}
const Mv = "_row_1jw40_6", qv = "_name_1jw40_12", Pv = "_compactRow_1jw40_13", Bv = "_compactName_1jw40_13", Ov = "_cell_1jw40_30", Dv = "_chain_1jw40_45", Hv = "_owner_1jw40_51", Fv = "_mono_1jw40_57", jv = "_compactCell_1jw40_79", Wv = "_stack_1jw40_96", zv = "_stat_1jw40_103", Gv = "_identityLine_1jw40_110", Uv = "_identity_1jw40_110", Kv = "_ownerLine_1jw40_137", Vv = "_link_1jw40_150", Yv = "_gateMark_1jw40_156", Xv = "_emptyChain_1jw40_161", Jv = "_arrow_1jw40_167", Qv = "_muted_1jw40_168", Zv = "_define_1jw40_173", eb = "_statValue_1jw40_180", ab = "_policyId_1jw40_186", nb = "_sub_1jw40_191", v = {
  row: Mv,
  name: qv,
  compactRow: Pv,
  compactName: Bv,
  cell: Ov,
  chain: Dv,
  owner: Hv,
  mono: Fv,
  compactCell: jv,
  stack: Wv,
  stat: zv,
  identityLine: Gv,
  identity: Uv,
  ownerLine: Kv,
  link: Vv,
  gateMark: Yv,
  emptyChain: Xv,
  arrow: Jv,
  muted: Qv,
  define: Zv,
  statValue: eb,
  policyId: ab,
  sub: nb
};
function st(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function tb(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function rb(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function ct(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function lb(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${ct(e.members)}`;
}
function ob(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: lb(e) })
  ] }) });
}
function dt({ name: e, gate: a, look: t, size: r }) {
  return /* @__PURE__ */ o(S, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { ...t, size: r, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function ib(e, a, t) {
  if (e !== a) return { role: "soft" };
  const r = aa(t);
  return r === null ? { role: "gate" } : { role: "stream", streamStep: r };
}
function sb({ stages: e, streamStep: a }) {
  const t = e.findIndex((r) => r.gate === !0);
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((r, l) => /* @__PURE__ */ o("span", { className: v.link, children: [
    l === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(dt, { name: r.name, gate: r.gate === !0, look: ib(l, t, a), size: "tag" })
  ] }, `${r.name}${l}`)) });
}
function cb(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.stages.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : sb(e) });
}
function ut(e) {
  return e === void 0 ? void 0 : !0;
}
function kn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, "data-raised": ut(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function db(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function ub(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function hb({ stream: e, href: a, presentation: t }) {
  const r = rb(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: st, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": fe(e.streamStep, "chip") }, children: [
    ob(e, a),
    cb(e),
    kn(ub(e.agents), e.agents === void 0 ? void 0 : tb(e.agents), "—"),
    db(e.policy),
    kn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function mb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function hC(e) {
  if (mb(e)) return hb(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: st, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ka(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(dt, { name: r.name, gate: r.gate, look: { role: r.gate ? "gate" : "soft" } }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: v.mono, children: ct(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": ut(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const wb = "_row_mdce7_2", _b = "_name_mdce7_16", fb = "_scope_mdce7_24", va = {
  row: wb,
  name: _b,
  scope: fb
};
function vb(e) {
  return e === void 0 ? `${va.row} ward-toolrow` : `${va.row} ward-toolrow ${e}`;
}
function bb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function gb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function pb({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Nb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${va.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function yb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function mC({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = bb(e, t), s = yb(t);
  return /* @__PURE__ */ o(s, { className: vb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(gb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${va.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Nb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(pb, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const kb = "_strip_1qtlf_2", $b = "_head_1qtlf_10", Cb = "_name_1qtlf_16", Sb = "_chart_1qtlf_24", Rb = "_segment_1qtlf_30", Tb = "_detailedChart_1qtlf_36", Lb = "_rail_1qtlf_49", Eb = "_section_1qtlf_55", Ab = "_label_1qtlf_66", xb = "_note_1qtlf_83", ee = {
  strip: kb,
  head: $b,
  name: Cb,
  chart: Sb,
  segment: Rb,
  detailedChart: Tb,
  rail: Lb,
  section: Eb,
  label: Ab,
  note: xb
}, Ib = "No item in flight to preview.", Mb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", qb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Ha = [1, 2, 3, 4, 5, 6], ba = 100;
function Pb(e, a) {
  return a.has(e) ? fe(e, "id") : "var(--ward-color-line)";
}
function Bb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ha.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * ba,
      y: "0",
      width: ba,
      height: "8",
      fill: Pb(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ob(e) {
  const a = e.slice(0, Ha.length);
  for (; a.length < Ha.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Db({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ba),
        y: "0",
        width: String(ba),
        height: "40",
        style: { fill: fe(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function ht(e) {
  return (a) => e == null ? void 0 : e(a);
}
function la({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function Hb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Ib }) : /* @__PURE__ */ n(Ra, { item: { ...e, streamStep: aa(t.streamStep) }, onOpen: ht(r), feed: null });
}
function Fb({ draft: e }) {
  const a = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ka(e.key, e.streamStep) })
  ] });
}
function jb(e) {
  const a = Ob(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(la, { label: "Board card", children: /* @__PURE__ */ n(Hb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(la, { label: "Streams index row", children: /* @__PURE__ */ n(Fb, { draft: t }) }),
    /* @__PURE__ */ o(la, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Db, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Mb })
    ] }),
    /* @__PURE__ */ n(la, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: qb }) })
  ] });
}
function Wb({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": fe(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ka(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(Ra, { item: { ...a, streamStep: e.streamStep }, onOpen: ht(r) }),
    /* @__PURE__ */ n(Bb, { draft: e, streams: t })
  ] });
}
function wC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(jb, { ...e }) : /* @__PURE__ */ n(Wb, { ...e });
}
const zb = "_row_ixlg5_6", Gb = "_headCell_ixlg5_10", Ub = "_cell_ixlg5_11", Kb = "_name_ixlg5_23", Vb = "_consequence_ixlg5_29", Yb = "_governed_ixlg5_36", Xb = "_control_ixlg5_42", Jb = "_byRole_ixlg5_48", Qb = "_webControl_ixlg5_59", Zb = "_webConsequence_ixlg5_65", eg = "_webGoverned_ixlg5_71", D = {
  row: zb,
  headCell: Gb,
  cell: Ub,
  name: Kb,
  consequence: Vb,
  governed: Yb,
  control: Xb,
  byRole: Jb,
  webControl: Qb,
  webConsequence: Zb,
  webGoverned: eg
};
function ag({
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
function ng({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(ag, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function tg(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function rg({ name: e, cell: a, onChange: t }) {
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
function lg({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(rg, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: tg(e) }) })
  ] });
}
function _C(e) {
  return "presentation" in e ? /* @__PURE__ */ n(lg, { ...e }) : /* @__PURE__ */ n(ng, { ...e });
}
const og = "_row_vv64h_2", ig = "_cell_vv64h_6", sg = "_name_vv64h_25", cg = "_note_vv64h_30", dg = "_webName_vv64h_41", ug = "_webMeta_vv64h_47", K = {
  row: og,
  cell: ig,
  name: sg,
  note: cg,
  webName: dg,
  webMeta: ug
}, mt = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function hg(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function mg({ component: e, onRestart: a }) {
  const t = $(), r = mt[e.state], l = e.state === "drainFirst";
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
function wg({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: hg(e.state) });
}
function _g({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...mt[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(wg, { component: e, onRestart: a }) })
  ] });
}
function fC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(_g, { ...e }) : /* @__PURE__ */ n(mg, { ...e });
}
const fg = "_row_1f1gp_7", vg = "_cell_1f1gp_11", bg = "_next_1f1gp_28", gg = "_headCell_1f1gp_38", pg = "_webId_1f1gp_77", Ng = "_webPurpose_1f1gp_83", yg = "_webMeta_1f1gp_91", kg = "_webUrgent_1f1gp_97", F = {
  row: fg,
  cell: vg,
  next: bg,
  headCell: gg,
  webId: pg,
  webPurpose: Ng,
  webMeta: yg,
  webUrgent: kg
}, $g = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Cg = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, wt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Sg = Object.fromEntries(wt.map((e) => [e.key, e]));
function Ge({ column: e, children: a }) {
  const t = Sg[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: F.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function vC() {
  return /* @__PURE__ */ n("tr", { children: wt.map((e) => /* @__PURE__ */ n(
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
function Rg({ cred: e }) {
  const a = $g[e.state];
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n(Ge, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ge, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ge, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ge, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Ge, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ge, { column: "next", children: /* @__PURE__ */ n("span", { className: F.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Tg({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${F.webMeta} ${F.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Lg({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: F.row, children: [
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n("span", { className: `${F.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(Tg, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: F.cell, children: /* @__PURE__ */ n(m, { ...Cg[e.state] }) })
  ] });
}
function bC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lg, { ...e }) : /* @__PURE__ */ n(Rg, { ...e });
}
const Eg = "_card_17zba_2", Ag = "_head_17zba_11", xg = "_env_17zba_18", Ig = "_version_17zba_25", Mg = "_meta_17zba_32", qg = "_webCard_17zba_37", Pg = "_webRow_17zba_47", Bg = "_webTitle_17zba_55", Og = "_webLine_17zba_65", Dg = "_webVersion_17zba_72", Hg = "_webMeta_17zba_77", U = {
  card: Eg,
  head: Ag,
  env: xg,
  version: Ig,
  meta: Mg,
  webCard: qg,
  webRow: Pg,
  webTitle: Bg,
  webLine: Og,
  webVersion: Dg,
  webMeta: Hg
}, _t = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Fg({ env: e }) {
  const a = _t[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function jg(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Wg(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ..._t[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: jg(e) })
  ] });
}
function gC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wg, { ...e }) : /* @__PURE__ */ n(Fg, { ...e });
}
const zg = "_panel_1hmja_2", Gg = "_line_1hmja_8", Ug = "_actions_1hmja_14", oa = {
  panel: zg,
  line: Gg,
  actions: Ug
};
function pC(e) {
  return /* @__PURE__ */ o("div", { className: oa.panel, children: [
    /* @__PURE__ */ n("p", { className: oa.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: oa.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: oa.line, children: e.note ?? "" })
  ] });
}
const Kg = "_upload_1vgt7_2", Vg = "_preview_1vgt7_7", Yg = "_mark_1vgt7_17", Xg = "_empty_1vgt7_22", Jg = "_actions_1vgt7_28", Qg = "_input_1vgt7_33", Zg = "_reasons_1vgt7_41", ep = "_reason_1vgt7_41", ap = "_accepted_1vgt7_57", te = {
  upload: Kg,
  preview: Vg,
  mark: Yg,
  empty: Xg,
  actions: Jg,
  input: Qg,
  reasons: Zg,
  reason: ep,
  accepted: ap
}, ft = 1.5, vt = 22, ga = "script elements or event handlers", Re = "links or external references", ke = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ft}px at ${vt}px`], np = [ke[1], ke[2], ga, Re], tp = /* @__PURE__ */ new Map([
  ["image", ke[1]],
  ["text", ke[2]],
  ["tspan", ke[2]],
  ["textPath", ke[2]],
  ["script", ga],
  ["foreignObject", ga],
  ["a", Re],
  ["use", Re],
  ["style", Re],
  ["feImage", Re],
  ["set", Re]
]), rp = "http://www.w3.org/2000/svg", lp = "http://www.w3.org/2000/xmlns/", op = /* @__PURE__ */ new Set([
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
]), ip = /* @__PURE__ */ new Set([
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
]), en = /url\(\s*(['"]?)#([^'"()\\\s]*)\1\s*\)/gi, sp = /url\s*\(|['"\\]/i;
function cp() {
  return { ok: !1, reasons: [ke[1]] };
}
function bt(e) {
  return e.namespaceURI === rp;
}
function dp(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && bt(a) ? a : null;
  } catch {
    return null;
  }
}
function up(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [ke[0]] : [];
}
function hp(e) {
  return tp.get(e.localName) ?? (e.localName.startsWith("animate") ? Re : void 0);
}
function mp(e) {
  return sp.test(e.replace(en, ""));
}
function wp(e) {
  return /^on/i.test(e.localName) ? ga : e.localName === "href" || mp(e.value) ? Re : void 0;
}
function _p(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(hp(t));
    for (const r of Array.from(t.attributes)) a.add(wp(r));
  }
  return np.filter((t) => a.has(t));
}
function fp(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? vt / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ft;
  }) ? [ke[3]] : [];
}
function vp(e) {
  if (e.namespaceURI === lp) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (ip.has(a) || a.startsWith("stroke"));
}
function bp(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && bt(a) && op.has(a.localName);
}
function gp(e, a) {
  bp(a) ? a.nodeType === Node.ELEMENT_NODE && gt(a) : e.removeChild(a);
}
function gt(e) {
  for (const a of Array.from(e.attributes)) vp(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) gp(e, a);
  return e;
}
function pp(e) {
  return Array.from(e.matchAll(en), (a) => a[2]).filter((a) => a !== "");
}
function Np(e) {
  let a = 2166136261;
  for (let t = 0; t < e.length; t += 1) a = Math.imul(a ^ e.charCodeAt(t), 16777619);
  return `ward-mark-${(a >>> 0).toString(36)}`;
}
function yp(e, a) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    for (const l of Array.from(r.attributes))
      for (const i of pp(l.value)) t.has(i) || t.set(i, `${a}-${t.size}`);
  return t;
}
function kp(e, a) {
  for (const t of Array.from(e.attributes))
    t.value = t.value.replace(en, (r, l, i) => {
      const s = a.get(i);
      return s === void 0 ? r : r.replace(`#${i}`, `#${s}`);
    });
}
function $p(e, a) {
  const t = [e, ...Array.from(e.querySelectorAll("*"))], r = yp(t, a);
  for (const l of t) {
    const i = r.get(l.getAttribute("id") ?? "");
    i === void 0 ? l.removeAttribute("id") : l.setAttribute("id", i), kp(l, r);
  }
  return e;
}
function NC(e) {
  const a = dp(e);
  if (a === null) return cp();
  const t = [...up(a), ..._p(a), ...fp(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString($p(gt(a), Np(e))) };
}
const Cp = "Mark accepted.", Sp = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, Rp = new Set(An.flatMap((e) => [fe(e, "id"), fe(e, "chip")]));
function Tp(e) {
  return e !== void 0 && (Sp.test(e) || Rp.has(e)) ? e : void 0;
}
function Lp({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": Tp(e == null ? void 0 : e.colour) }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function Ep(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Ap(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function xp({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: Cp }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function Ip({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(xp, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${Ep(e, t)}`, role: "status", children: Ap(e, t) });
}
function yC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = p(null), [i, s] = g(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(Lp, { current: e }),
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
    /* @__PURE__ */ n(Ip, { result: i, presentation: r })
  ] });
}
const Mp = "_row_1wp9s_7", qp = "_cell_1wp9s_11", Pp = "_head_1wp9s_28", Bp = "_name_1wp9s_34", Op = "_pinned_1wp9s_42", Dp = "_headCell_1wp9s_49", Hp = "_webName_1wp9s_88", Fp = "_webMeta_1wp9s_95", jp = "_webWarn_1wp9s_103", q = {
  row: Mp,
  cell: qp,
  head: Pp,
  name: Bp,
  pinned: Op,
  headCell: Dp,
  webName: Hp,
  webMeta: Fp,
  webWarn: jp
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
], Wp = Object.fromEntries(pt.map((e) => [e.key, e]));
function zp(e, a) {
  return `mcp.${e}.${a}`;
}
function Gp(e) {
  return Object.keys(an).includes(e);
}
function Up(e) {
  return an[e !== void 0 && Gp(e) ? e : "unknown"];
}
function Xe({ column: e, children: a }) {
  const t = Wp[e];
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
function kC() {
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
function Kp({ server: e }) {
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
    /* @__PURE__ */ n(Xe, { column: "tools", children: e.tools.map((t) => zp(e.name, t)).join(" · ") })
  ] });
}
function Vp(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Yp(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Xp({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Jp({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Qp({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Zp({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Vp(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Yp(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Xp, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Up(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Jp, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Qp, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function $C(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zp, { ...e }) : /* @__PURE__ */ n(Kp, { ...e });
}
const eN = "_row_1h9nq_2", aN = "_headCell_1h9nq_14", nN = "_cell_1h9nq_15", tN = "_name_1h9nq_26", rN = "_consequence_1h9nq_32", lN = "_reason_1h9nq_38", oN = "_value_1h9nq_44", iN = "_webRow_1h9nq_60", sN = "_webSetting_1h9nq_71", cN = "_webName_1h9nq_79", dN = "_webConsequence_1h9nq_87", uN = "_webControl_1h9nq_93", hN = "_webState_1h9nq_106", mN = "_webChip_1h9nq_111", E = {
  row: eN,
  headCell: aN,
  cell: nN,
  name: tN,
  consequence: rN,
  reason: lN,
  value: oN,
  webRow: iN,
  webSetting: sN,
  webName: cN,
  webConsequence: dN,
  webControl: uN,
  webState: hN,
  webChip: mN
}, Nt = 104, yt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function wN({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(Bn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: E.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function _N({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = yt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: E.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: E.headCell, children: [
      /* @__PURE__ */ n("span", { className: E.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: E.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: E.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: E.cell, children: /* @__PURE__ */ n(wN, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: E.cell, style: { width: Nt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function kt(e, a) {
  return String(e ?? a);
}
function fN(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function vN(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? kt(e.value, "—");
}
function bN({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: E.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: E.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function gN(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(bN, { ...e });
  const l = fN(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: E.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(Bn, { options: l, value: kt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${E.webControl} ${E.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: vN(a) });
}
function pN({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${E.row} ${E.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: E.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${E.name} ${E.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${E.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: E.webControl, children: i(s) }) : /* @__PURE__ */ n(gN, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${E.webChip} ward-policy-chip`, style: { width: Nt }, children: /* @__PURE__ */ n(m, { ...yt[t], size: "tag" }) })
  ] });
}
function CC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(pN, { ...e }) : /* @__PURE__ */ n(_N, { ...e });
}
const NN = "_label_1o9za_7", yN = "_name_1o9za_15", kN = "_column_1o9za_24", $N = "_webFrame_1o9za_57", CN = "_webHead_1o9za_62", SN = "_webHeadLabel_1o9za_74", RN = "_webLabel_1o9za_112", TN = "_webColumns_1o9za_119", LN = "_webGroup_1o9za_125", EN = "_webPeople_1o9za_126", AN = "_webVia_1o9za_127", xN = "_webMeta_1o9za_156", j = {
  label: NN,
  name: yN,
  column: kN,
  webFrame: $N,
  webHead: CN,
  webHeadLabel: SN,
  webLabel: RN,
  webColumns: TN,
  webGroup: LN,
  webPeople: EN,
  webVia: AN,
  webMeta: xN
}, IN = {
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
      className: j.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function MN(e) {
  if (!e.matrixRole) return;
  const a = IN[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function qN({ node: e }) {
  const a = MN(e);
  return /* @__PURE__ */ o("span", { className: j.label, children: [
    /* @__PURE__ */ n("span", { className: j.name, children: e.name }),
    /* @__PURE__ */ n(PN, { role: a, node: e }),
    /* @__PURE__ */ n(Ma, { column: Ia[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ma, { column: Ia[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ma, { column: Ia[2], children: e.requestedVia ?? "" })
  ] });
}
function PN({ role: e, node: a }) {
  return /* @__PURE__ */ o(S, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function BN({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    jn,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(qN, { node: t }),
      children: s
    }
  );
}
function qa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function ON({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(qa, { className: `${j.webMeta} ${j.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(qa, { className: `${j.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(qa, { className: `${j.webMeta} ${j.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function DN() {
  return /* @__PURE__ */ o("div", { className: j.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: j.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: j.webColumns, children: [
      /* @__PURE__ */ n("span", { className: j.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: j.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: j.webVia, children: "Requested via" })
    ] })
  ] });
}
function HN({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${j.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function FN(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function jN({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: j.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(DN, {}),
    /* @__PURE__ */ n(Rc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      jn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(HN, { row: t }),
        detail: /* @__PURE__ */ n(ON, { row: t }),
        expanded: FN(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function SC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jN, { ...e }) : /* @__PURE__ */ n(BN, { ...e });
}
const WN = "_runbook_b9agc_2", zN = "_list_b9agc_7", GN = "_step_b9agc_15", UN = "_numeral_b9agc_21", KN = "_body_b9agc_28", VN = "_head_b9agc_34", YN = "_title_b9agc_40", XN = "_detail_b9agc_45", JN = "_actions_b9agc_50", QN = "_webList_b9agc_56", ZN = "_webStep_b9agc_60", ey = "_webBody_b9agc_66", ay = "_webTitle_b9agc_74", ny = "_webDetail_b9agc_78", T = {
  runbook: WN,
  list: zN,
  step: GN,
  numeral: UN,
  body: KN,
  head: VN,
  title: YN,
  detail: XN,
  actions: JN,
  webList: QN,
  webStep: ZN,
  webBody: ey,
  webTitle: ay,
  webDetail: ny
}, $t = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function Ct(e) {
  return String(e + 1).padStart(2, "0");
}
function ty({ step: e, index: a, connection: t }) {
  const r = $t[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: Ct(a) }),
    /* @__PURE__ */ o("span", { className: T.body, children: [
      /* @__PURE__ */ o("span", { className: T.head, children: [
        /* @__PURE__ */ n("span", { className: T.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        l && e.startedAt && /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: T.detail, children: e.detail })
    ] })
  ] });
}
function ry({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(ty, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function ly({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: Ct(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...$t[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n($e, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function oy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(ly, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function RC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(oy, { ...e }) : /* @__PURE__ */ n(ry, { ...e });
}
const iy = "_list_1gu6a_2", sy = "_check_1gu6a_10", cy = "_body_1gu6a_16", dy = "_text_1gu6a_23", uy = "_pending_1gu6a_32", hy = "_measured_1gu6a_37", Ke = {
  list: iy,
  check: sy,
  body: cy,
  text: dy,
  pending: uy,
  measured: hy
};
function my(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function wy({ check: e }) {
  const a = my(e.passed);
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
function TC({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(wy, { check: a }, a.text)) });
}
const _y = "_root_khinh_2", fy = "_list_khinh_10", vy = "_line_khinh_21", by = "_at_khinh_48", gy = "_text_khinh_52", py = "_foot_khinh_56", Ny = "_idle_khinh_68", yy = "_caret_khinh_76", ky = "_jump_khinh_83", me = {
  root: _y,
  list: fy,
  line: vy,
  at: by,
  text: gy,
  foot: py,
  idle: Ny,
  caret: yy,
  jump: ky
}, $y = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function nn(e) {
  return Number.isNaN(Date.parse(e)) ? "" : $y.format(new Date(e));
}
const Cy = { warn: "warning", ok: "ok" };
function Sy({ kind: e }) {
  const a = Cy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ry({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${nn(e)}` });
}
function Ty({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${nn(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(Ry, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const Ly = 8;
function Ey(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > Ly;
}
function Ay({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const St = Fe(null);
function LC({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = g(!1), i = Tn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(St.Provider, { value: i, children: t });
}
function xy() {
  const e = He(St), [a, t] = g(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function EC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = p(null), [i, s] = g(0), [c, d] = xy(), [u, h] = g(!1), f = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), Wa(() => {
    const N = l.current;
    N && !u && (N.scrollTop = N.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var H;
    const N = l.current;
    if (!N) return;
    const I = N.querySelectorAll("[data-consline-text]");
    (H = I.item(I.length - 1)) == null || H.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (N) => h(Ey(N.currentTarget)), children: e.map((N, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${N.kind}`, "data-kind": N.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: nn(N.at) }),
      /* @__PURE__ */ n(Sy, { kind: N.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: N.text })
    ] }, `${N.at}-${I}`)) }),
    /* @__PURE__ */ o(Ty, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(Ay, { shown: u, onJump: b })
    ] })
  ] });
}
const Iy = "_row_11jhe_2", My = "_head_11jhe_14", qy = "_author_11jhe_20", Py = "_eta_11jhe_25", By = "_edited_11jhe_26", Oy = "_body_11jhe_32", Dy = "_reason_11jhe_37", Hy = "_actions_11jhe_42", ge = {
  row: Iy,
  head: My,
  author: qy,
  eta: Py,
  edited: By,
  body: Oy,
  reason: Dy,
  actions: Hy
}, Fy = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function jy(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function Wy({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
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
function zy({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: ge.reason, id: a, children: e })
  ] });
}
function Gy(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Uy(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Wy, { ...e }) : /* @__PURE__ */ n(zy, { reason: e.unavailable, reasonId: e.unavailableId });
}
function AC(e) {
  const { comment: a } = e;
  Gy(e);
  const t = $(), r = `${t}-unavailable`, l = Fy[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${ge.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: ge.head, children: [
      /* @__PURE__ */ n("span", { className: ge.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: ge.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: ge.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: ge.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: ge.reason, id: t, children: jy(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: ge.actions, children: /* @__PURE__ */ n(Uy, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ky = "_root_c46wj_2", Vy = "_attach_c46wj_11", Yy = "_actions_c46wj_17", Xy = "_reply_c46wj_23", Jy = "_replyRow_c46wj_28", Qy = "_sendsAs_c46wj_42", Ye = {
  root: Ky,
  attach: Vy,
  actions: Yy,
  reply: Xy,
  replyRow: Jy,
  sendsAs: Qy
};
function Zy({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = g(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function xC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Zy, { ...e }) : /* @__PURE__ */ n(e1, { ...e });
}
function e1({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = g("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      In,
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
const a1 = "_list_1ih9e_2", n1 = "_item_1ih9e_6", t1 = "_body_1ih9e_22", r1 = "_text_1ih9e_28", l1 = "_evidence_1ih9e_37", o1 = "_consequence_1ih9e_49", i1 = "_note_1ih9e_54", Oe = {
  list: a1,
  item: n1,
  body: t1,
  text: r1,
  evidence: l1,
  consequence: o1,
  note: i1
};
function s1({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function $n({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function c1(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function d1({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ n("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n($n, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(S, { children: [
      /* @__PURE__ */ n($n, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Oe.consequence, children: c1(e.why) })
    ] })
  ] });
}
function u1({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(s1, { criterion: e }),
    /* @__PURE__ */ n(d1, { criterion: e })
  ] });
}
function IC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(u1, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const h1 = "_list_dwhoz_2", m1 = "_rung_dwhoz_6", w1 = "_name_dwhoz_18", _1 = "_actor_dwhoz_32", ca = {
  list: h1,
  rung: m1,
  name: w1,
  actor: _1
}, f1 = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function v1({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = f1[e.state];
  return /* @__PURE__ */ o("li", { className: ca.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ca.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ca.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function MC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ca.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(v1, { rung: a }, a.name)) });
}
const b1 = "_sheet_1fqco_2", g1 = "_title_1fqco_9", p1 = "_stage_1fqco_15", N1 = "_effects_1fqco_20", y1 = "_effect_1fqco_20", k1 = "_numeral_1fqco_31", $1 = "_effectText_1fqco_38", C1 = "_refusals_1fqco_43", S1 = "_reasons_1fqco_52", R1 = "_reason_1fqco_52", T1 = "_actions_1fqco_62", ue = {
  sheet: b1,
  title: g1,
  stage: p1,
  effects: N1,
  effect: y1,
  numeral: k1,
  effectText: $1,
  refusals: C1,
  reasons: S1,
  reason: R1,
  actions: T1
};
function L1({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function qC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), d = `${c}-refusal`, [u, h] = g(""), f = t.length > 0;
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
      us,
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
      /* @__PURE__ */ n(L1, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const E1 = "_list_1hvqu_2", A1 = "_path_1hvqu_7", x1 = "_head_1hvqu_21", I1 = "_label_1hvqu_28", M1 = "_consequence_1hvqu_35", q1 = "_ask_1hvqu_36", Ve = {
  list: E1,
  path: A1,
  head: x1,
  label: I1,
  consequence: M1,
  ask: q1
}, Fa = {
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
function P1({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Sn(a), size: "sm", onClick: () => t(e.kind), children: Fa[e.kind] }) : /* @__PURE__ */ o(S, { children: [
    /* @__PURE__ */ n(_, { variant: Sn(a), size: "sm", disabled: !0, describedBy: r, children: Fa[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ve.ask, id: r, children: e.askInstead })
  ] });
}
function B1({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ve.path, "data-allowed": e.allowed, "data-role": Cn(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ve.head, children: [
      /* @__PURE__ */ n("span", { className: Ve.label, children: e.title ?? Fa[e.kind] }),
      /* @__PURE__ */ n(m, { role: Cn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ve.consequence, children: e.consequence }),
    /* @__PURE__ */ n(P1, { path: e, primary: a, onChoose: t })
  ] });
}
function PC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ve.list, children: e.map((t, r) => /* @__PURE__ */ n(B1, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const O1 = "_list_1nyt1_2", D1 = "_item_1nyt1_6", H1 = "_node_1nyt1_18", F1 = "_body_1nyt1_24", j1 = "_head_1nyt1_30", W1 = "_stage_1nyt1_36", z1 = "_version_1nyt1_41", G1 = "_sentence_1nyt1_49", U1 = "_meta_1nyt1_54", Ne = {
  list: O1,
  item: D1,
  node: H1,
  body: F1,
  head: j1,
  stage: W1,
  version: z1,
  sentence: G1,
  meta: U1
}, K1 = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function V1({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: Ne.head, children: [
    /* @__PURE__ */ n("span", { className: Ne.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: Ne.version, title: e.version, children: e.version }) : null
  ] });
}
function Y1({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${Ne.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${Ne.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: K1[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${Ne.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(V1, { entry: e }),
      /* @__PURE__ */ n("span", { className: Ne.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${Ne.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function BC({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${Ne.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Y1, { entry: a }, a.stage + String(t))) });
}
const X1 = "_thread_1kn6s_3", J1 = "_turn_1kn6s_8", Q1 = "_who_1kn6s_27", Z1 = "_body_1kn6s_32", da = {
  thread: X1,
  turn: J1,
  who: Q1,
  body: Z1
}, Rt = Fe(!1);
function OC({ children: e, density: a }) {
  return /* @__PURE__ */ n(Rt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${da.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function DC({ turn: e }) {
  if (!He(Rt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${da.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${da.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${da.body} ward-chat-body`, children: e.body })
  ] });
}
const ek = "_list_1rt9c_3", ak = "_row_1rt9c_7", nk = "_label_1rt9c_20", tk = "_n_1rt9c_26", rk = "_cause_1rt9c_33", Qe = {
  list: ek,
  row: ak,
  label: nk,
  n: tk,
  cause: rk
};
function lk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const ok = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function ik({ row: e, formatNumber: a }) {
  return lk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...ok[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(sk, { cause: e.cause })
  ] });
}
function sk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function HC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(ik, { row: t, formatNumber: a }, t.label)) });
}
const ck = "_root_1jxwp_2", dk = {
  root: ck
};
function FC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: dk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ta, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const uk = "_row_dhbre_3", hk = "_key_dhbre_13", mk = "_stack_dhbre_24", wk = "_value_dhbre_32", _k = "_evidence_dhbre_39", fk = "_mark_dhbre_47", Ue = {
  row: uk,
  key: hk,
  stack: mk,
  value: wk,
  evidence: _k,
  mark: fk
};
function vk({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Va, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function jC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(vk, { state: e.state }) })
  ] });
}
const bk = "_cell_1monp_2", gk = {
  cell: bk
}, pk = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Nk(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function yk(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function kk(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Nk(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function $k(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function WC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  yk(e, t);
  const r = $k(e);
  return /* @__PURE__ */ n(
    Cs,
    {
      label: "Rejection routing",
      columns: pk,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: gk.cell, "data-norerun": l.noRerun ? !0 : void 0, children: kk(l, i) }),
      empty: a ?? /* @__PURE__ */ n(hd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Ck = "_row_ute8v_2", Sk = "_title_ute8v_11", Rk = "_turns_ute8v_20", Tk = "_waiting_ute8v_21", Lk = "_resolved_ute8v_22", Ek = "_activity_ute8v_23", Ak = "_cost_ute8v_29", xk = "_link_ute8v_30", Ik = "_tableRow_ute8v_47", Mk = "_tableTitle_ute8v_59", qk = "_tableResolved_ute8v_64", Pk = "_tableLink_ute8v_68", Bk = "_tableMeta_ute8v_83", Ok = "_tableCost_ute8v_90", Dk = "_tableActivity_ute8v_91", Hk = "_tableState_ute8v_101", Fk = "_tableRecord_ute8v_112", O = {
  row: Ck,
  title: Sk,
  turns: Rk,
  waiting: Tk,
  resolved: Lk,
  activity: Ek,
  cost: Ak,
  link: xk,
  tableRow: Ik,
  tableTitle: Mk,
  tableResolved: qk,
  tableLink: Pk,
  tableMeta: Bk,
  tableCost: Ok,
  tableActivity: Dk,
  tableState: Hk,
  tableRecord: Fk
}, Tt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function jk(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Wk(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function zk(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Gk = { duplicate: "CLOSED · DUPLICATE" };
function Uk({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function Kk({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : re(e) });
}
function Vk({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function Yk({ session: e, href: a }) {
  const t = Tt[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: Wk(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      zk(e.resolved),
      /* @__PURE__ */ n(Uk, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Kk, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: jk(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Gk[e.state] ?? t.label }),
      /* @__PURE__ */ n(Vk, { link: e.link })
    ] }) })
  ] });
}
function Xk({ session: e }) {
  const a = Tt[e.state];
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
function zC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Yk, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Xk, { session: e.session });
}
const Jk = "_block_1yy2v_3", Qk = "_list_1yy2v_9", Zk = "_line_1yy2v_14", ja = {
  block: Jk,
  list: Qk,
  line: Zk
}, e$ = { warn: "warning", ok: "ok" };
function a$({ kind: e }) {
  const a = e$[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function n$({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ja.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(a$, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function GC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${ja.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: ja.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(n$, { line: t }, `${r}-${t.text}`)) }) });
}
const t$ = "_band_tt7hp_1", r$ = "_head_tt7hp_8", l$ = "_cell_tt7hp_19", o$ = "_index_tt7hp_35", i$ = "_title_tt7hp_42", s$ = "_note_tt7hp_48", c$ = "_cellTitle_tt7hp_53", d$ = "_cellBody_tt7hp_58", u$ = "_tag_tt7hp_64", be = {
  band: t$,
  head: r$,
  cell: l$,
  index: o$,
  title: i$,
  note: s$,
  cellTitle: c$,
  cellBody: d$,
  tag: u$
}, Rn = 4;
function UC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Rn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Rn}-cell grid`);
  return /* @__PURE__ */ o("section", { className: be.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.index, children: e }),
      /* @__PURE__ */ n("span", { className: be.title, children: a }),
      /* @__PURE__ */ n("span", { className: be.note, children: t })
    ] }),
    r.map((l) => /* @__PURE__ */ o("div", { className: be.cell, children: [
      /* @__PURE__ */ n("span", { className: be.cellTitle, children: l.title }),
      /* @__PURE__ */ n("span", { className: be.cellBody, children: l.body }),
      l.tag !== void 0 && /* @__PURE__ */ n("span", { className: be.tag, children: l.tag })
    ] }, l.title))
  ] });
}
export {
  I$ as ActionStack,
  EC as ActivityConsole,
  Sm as AgentCard,
  $$ as AppShell,
  wC as AppearanceStrip,
  UC as Band,
  E$ as BarChart,
  Kd as BoardColumn,
  V$ as BoardFootnote,
  Y$ as BoardHeader,
  H$ as BoardScroller,
  _ as Btn,
  p$ as CHIP_ROLES,
  wt as CREDENTIAL_COLUMNS,
  L$ as Callout,
  _C as CapabilityRow,
  DC as ChatMessage,
  In as Checkbox,
  m as Chip,
  AC as ClarificationRow,
  lC as ClauseRuleRow,
  rC as ClauseRules,
  Vn as ColourLadder,
  fC as ComponentRow,
  xC as Composer,
  J$ as ConfigRow,
  X$ as ConfigRowHead,
  Ya as ConnectionMark,
  LC as ConsoleAnnounceProvider,
  OC as Conversation,
  us as CostMeter,
  bC as CredentialRow,
  vC as CredentialRowHead,
  IC as CriteriaList,
  Nl as Crumb,
  HC as DeliveryHealth,
  W$ as DeniedState,
  oC as DryRunRail,
  hd as EmptyState,
  gC as EnvCard,
  A as Field,
  j$ as FilteredEmpty,
  O$ as FormStack,
  Ta as GateChecklist,
  MC as GateLadder,
  Cs as Grid,
  sC as HandoffRuleRow,
  iC as HandoffRules,
  Q$ as ItemDrawer,
  pC as KeyPanel,
  Gt as LIVE_EVENT_TYPES,
  Vh as LegacyBoardColumn,
  eC as LegacyBoardHeader,
  aC as LegacyConfigRow,
  tC as LegacyItemDrawer,
  Fh as LegacyOverCapNote,
  nC as LegacyPreviewRail,
  Gn as LegacyWorkCard,
  $e as LiveIndicator,
  z$ as LoadFailed,
  K$ as Loading,
  pt as MCP_SERVER_COLUMNS,
  Va as Mark,
  yC as MarkUpload,
  Ae as Marker,
  $C as McpServerRow,
  kC as McpServerRowHead,
  cC as NewStreamModal,
  _d as OverCapNote,
  na as Overlay,
  nw as PARTIAL_STEP_REASON,
  Nt as POLICY_CHIP_WIDTH,
  q$ as PageFrame,
  T$ as PageHeader,
  A$ as PlainList,
  CC as PolicyRow,
  Z$ as PreviewRail,
  Ia as ROLE_MATRIX_COLUMNS,
  ot as RULE_ACTIONS,
  Dn as Radio,
  FC as ReadyChecklist,
  B$ as RecordSection,
  qC as RequeueSheet,
  PC as ResolveBlock,
  jC as ResolvedFieldRow,
  SC as RoleMatrixRow,
  WC as RoutingTable,
  dC as RuleRow,
  RC as RunbookSteps,
  zt as STREAM_STEPS,
  D$ as SectionBand,
  mn as SectionHeader,
  Bn as SegmentedControl,
  zC as SessionRow,
  R$ as Sidebar,
  uC as StageColumn,
  F$ as StageGrid,
  BC as StageHistory,
  lf as StageListEditor,
  G$ as StaleStrip,
  Ca as StatStrip,
  hC as StreamRow,
  P$ as SubjectRail,
  De as Switch,
  S$ as TabLinks,
  x$ as TableHead,
  C$ as Tabs,
  mC as ToolRow,
  M$ as TopBar,
  Rc as Tree,
  jn as TreeRow,
  GC as TypedInputBlock,
  Fr as UNSAFE_HREF,
  TC as ValidationList,
  _$ as VisibilityProvider,
  f$ as Visible,
  g$ as WARD_VERSION,
  Ra as WorkCard,
  U$ as WriteUnavailableStrip,
  jk as agoSince,
  Pt as clock,
  kf as colourStatus,
  ae as count,
  se as duration,
  za as elapsed,
  b$ as eventSourceTransport,
  Na as isStreamStep,
  ya as isValidatedStreamStep,
  tw as ladderValidation,
  Up as mcpConnectionChip,
  zp as mcpToolName,
  re as money,
  we as ms,
  Wn as ordered,
  Ln as ratio,
  hg as restartLabel,
  W as safeHref,
  ce as stamp,
  xn as stream,
  y$ as streamChip,
  ka as streamChipProps,
  fe as streamColour,
  Kt as streamHex,
  N$ as streamVars,
  ia as useBorderFlash,
  Ft as useFocusTrap,
  k$ as useLiveFeed,
  v$ as useReturnFocus,
  pa as useRovingTabindex,
  Ga as useTicker,
  Bt as useVisible,
  G as v,
  NC as validateMark,
  aa as validatedStep,
  An as validatedStreamSteps
};
