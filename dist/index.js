import { jsx as n, Fragment as R, jsxs as o } from "react/jsx-runtime";
import { useMemo as Rn, useContext as je, createContext as He, useCallback as X, useEffect as x, useState as p, useRef as y, useLayoutEffect as Ha, useId as $, Children as St, Fragment as Rt } from "react";
import { createPortal as Tt } from "react-dom";
function se(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const an = (e) => String(e).padStart(2, "0");
function Fa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${an(a % 60)}s` : `${Math.floor(t / 60)}h ${an(t % 60)}m`;
}
const Et = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function ce(e) {
  const a = Et.formatToParts(new Date(e)), t = (r) => {
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
function Tn(e, a) {
  return `${e} / ${a}`;
}
const Lt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function At(e) {
  return Lt.format(new Date(e));
}
const En = He(/* @__PURE__ */ new Set());
function t$({ hidden: e, children: a }) {
  const t = Rn(() => new Set(e), [e]);
  return /* @__PURE__ */ n(En.Provider, { value: t, children: a });
}
function xt(e) {
  return !je(En).has(e);
}
function r$({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(R, { children: xt(e) ? a : t });
}
const It = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Mt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function qt(e, a, t) {
  const r = t[0], l = t[t.length - 1];
  if (!r || !l) {
    e.preventDefault();
    return;
  }
  const i = Mt(e, a, r, l);
  i && (e.preventDefault(), i.focus());
}
function Pt(e) {
  return { onKeyDown: X(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(It));
      qt(t, e.current, r);
    },
    [e]
  ) };
}
function l$(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var l, i;
      (i = (l = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : l.focus) == null || i.call(l);
    };
  }, [a, e]);
}
const nn = { ArrowUp: -1, ArrowDown: 1 }, tn = { ArrowLeft: -1, ArrowRight: 1 }, Bt = (e, a, t) => Math.min(t, Math.max(a, e));
function Ot(e, a) {
  if (a !== "horizontal" && e in nn) return nn[e];
  if (a !== "vertical" && e in tn) return tn[e];
}
function va({ orientation: e = "both" } = {}) {
  const [a, t] = p(0), r = y(/* @__PURE__ */ new Map()), l = y(!1);
  Ha(() => {
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
      const f = Math.max(0, h.indexOf(a)), b = Ot(u.key, e);
      b !== void 0 ? (u.preventDefault(), s(h[Bt(f + b, 0, h.length - 1)])) : u.key === "Home" ? (u.preventDefault(), s(h[0])) : u.key === "End" && (u.preventDefault(), s(h[h.length - 1]));
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
const o$ = (e, a, t) => {
  const r = new EventSource(e), l = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = l;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, l);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, i$ = "0.2.0", s$ = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], Dt = [1, 2, 3, 4, 5, 6], jt = [1, 2, 3], Ht = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], G = {
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
function Ln(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function ba(e) {
  return Dt.includes(e);
}
function pa(e) {
  return jt.includes(e);
}
function c$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function d$(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Ft = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function Wt(e) {
  if (!ba(e)) throw new Error("unvalidated stream step");
  return Ft[e];
}
function rn(e) {
  return typeof e != "string" ? null : Ht.includes(e) ? e : null;
}
function zt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function Gt(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ut(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Kt(e, a, t) {
  const r = zt(e);
  if (r === null) return null;
  const l = rn(t) ?? rn(r.type);
  return l === null ? null : { ...r, type: l, id: Gt(r, a), at: Ut(r) };
}
function Vt(e, a) {
  return e >= we.staleAfter ? "stale" : e >= we.heartbeat && a === "live" ? "reconnecting" : null;
}
function Yt(e, a, t) {
  return e >= we.heartbeat && !a && t !== null;
}
function u$(e, a) {
  const [t, r] = p("reconnecting"), [l, i] = p(null), s = y(/* @__PURE__ */ new Map()), c = y(0), d = y(""), u = y(0), h = y(null), f = y(0), b = y(0), g = y(!1), I = y("reconnecting"), j = X((C) => {
    I.current = C, r(C);
  }, []), oe = X(() => {
    c.current = Date.now();
  }, []), $e = X((C) => {
    for (const [z, fe] of s.current)
      (fe === "*" || C.itemKey === fe) && z(C);
  }, []), ne = X(() => {
    h.current = a(e, { lastEventId: d.current }, {
      onEvent: (C, z, fe) => {
        const xe = Kt(C, z, fe);
        xe !== null && (xe.id && (d.current = xe.id), oe(), g.current = !1, j("live"), i(xe.at), $e(xe));
      },
      onOpen: () => {
        u.current = 0, g.current = !1, oe(), j("live");
      },
      onError: () => {
        var z;
        (z = h.current) == null || z.close(), h.current = null, g.current = !0, I.current !== "stale" && j("reconnecting");
        const C = Math.min(we.reconnectBase * 2 ** u.current, we.reconnectMax);
        u.current += 1, f.current = window.setTimeout(ne, C);
      }
    });
  }, [$e, j, oe, a, e]), Fe = X((C) => {
    g.current = !0, C.close(), h.current = null, f.current = window.setTimeout(ne, we.reconnectBase);
  }, [ne]), We = X((C, z) => (s.current.set(z, C), () => {
    s.current.delete(z);
  }), []);
  return x(() => (ne(), b.current = window.setInterval(() => {
    const C = Date.now() - c.current, z = Vt(C, I.current);
    z && j(z);
    const fe = h.current;
    Yt(C, g.current, fe) && Fe(fe);
  }, we.tick), () => {
    var C;
    window.clearInterval(b.current), window.clearTimeout(f.current), g.current = !1, (C = h.current) == null || C.close(), h.current = null;
  }), [ne, Fe, j]), { connection: t, lastEventAt: l, subscribe: We };
}
function Wa(e, a) {
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
function Xt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function la(e, a) {
  const t = y(0), r = X((l) => {
    const i = l ?? a, s = e.current;
    s !== null && i !== void 0 && (Xt() || (s.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), s.style.setProperty("--flash", `var(--ward-color-${i})`), s.classList.add("ward-border-flash"), s.setAttribute("data-flash", "true"), s.addEventListener("animationend", () => ln(s), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => ln(s), we.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (l) => r(l) : () => r(a);
}
const Jt = "_root_1otpc_2", Qt = {
  root: Jt
};
function Zt(e, a, t, r, l) {
  const i = [Fa(a)];
  return e || i.push(`as of ${At(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), l && i.push(l.label), i;
}
function ke({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const l = t !== "stale", i = Wa(e, l), s = (a == null ? void 0 : a.at) ?? e, c = Zt(l, i, s, r, a);
  return /* @__PURE__ */ o("span", { className: `${Qt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: c.join(" · ") }),
    /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
      "started ",
      ce(e)
    ] })
  ] });
}
const er = "_app_1g5ye_1", ar = "_side_1g5ye_18", nr = "_main_1g5ye_26", tr = "_rail_1g5ye_33", rr = "_page_1g5ye_40", lr = "_root_1g5ye_91", or = "_topbar_1g5ye_98", ir = "_mark_1g5ye_109", sr = "_brand_1g5ye_116", cr = "_tagline_1g5ye_122", dr = "_identity_1g5ye_128", ur = "_tools_1g5ye_129", hr = "_metadata_1g5ye_138", mr = "_actor_1g5ye_153", wr = "_detail_1g5ye_154", _r = "_nav_1g5ye_159", fr = "_content_1g5ye_194", vr = "_toolsPanel_1g5ye_210", br = "_skip_1g5ye_236", M = {
  app: er,
  side: ar,
  main: nr,
  rail: tr,
  page: rr,
  root: lr,
  topbar: or,
  mark: ir,
  brand: sr,
  tagline: cr,
  identity: dr,
  tools: ur,
  metadata: hr,
  actor: mr,
  detail: wr,
  nav: _r,
  content: fr,
  toolsPanel: vr,
  skip: br
}, pr = "_btn_j72f1_2", gr = "_primary_j72f1_13", yr = "_destructive_j72f1_24", Nr = "_secondary_j72f1_34", kr = "_ghost_j72f1_39", $r = "_overflow_j72f1_48", Cr = "_sm_j72f1_55", Sr = "_disabled_j72f1_59", aa = {
  btn: pr,
  primary: gr,
  destructive: yr,
  secondary: Nr,
  ghost: kr,
  overflow: $r,
  sm: Cr,
  disabled: Sr
};
function Rr(e, a, t, r) {
  const l = a === "sm" ? [aa.sm, "ward-btn--sm"] : [], i = t ? [aa.disabled] : [];
  return [aa.btn, aa[e], "ward-btn", `ward-btn--${e}`, ...l, ...i, r ?? ""].filter(Boolean).join(" ");
}
function Tr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function Er(e) {
  if (e.disabled && !e.describedBy && !e.disabledReason)
    throw new Error("Btn: a disabled button must name its reason via describedBy or disabledReason");
}
function Lr(e) {
  return e.disabled ? e.disabledReason : void 0;
}
function Ar(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
function xr(e, a, t) {
  return Ar(e.describedBy, a && t);
}
function Ir({ id: e, reason: a }) {
  return a ? /* @__PURE__ */ n("span", { id: e, className: "ward-visually-hidden", children: a }) : null;
}
function Mr(e) {
  return e.children ?? e.label;
}
function _(e) {
  Er(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1, l = Lr(e), i = $();
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: e.type ?? "button",
        className: Rr(a, t, r, e.className),
        "data-ward-btn": a,
        "data-ward-size": t,
        disabled: r,
        title: l,
        "aria-describedby": xr(e, l, i),
        onClick: e.onClick,
        "aria-expanded": e.expanded,
        "aria-controls": e.controls,
        ...Tr(a, e.controls),
        children: Mr(e)
      }
    ),
    /* @__PURE__ */ n(Ir, { id: i, reason: l })
  ] });
}
const qr = /^([a-z][a-z0-9+.-]*):/i, Pr = /* @__PURE__ */ new Set(["http", "https"]), Br = "#";
function Or(e) {
  var r, l;
  const a = e.replace(/[\t\n\r]/g, "");
  let t = 0;
  for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1;
  return (l = (r = qr.exec(a.slice(t))) == null ? void 0 : r[1]) == null ? void 0 : l.toLowerCase();
}
function W(e) {
  const a = Or(e);
  return a === void 0 || Pr.has(a) ? e : Br;
}
function za(e) {
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
function Dr({ sidebar: e, header: a, children: t, rail: r }) {
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
function jr({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: M.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: W(t.href), "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function Ia({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Hr({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ o("span", { className: M.metadata, children: [
    /* @__PURE__ */ n(Ia, { value: e, className: M.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(Ia, { value: a, className: M.detail })
  ] });
}
function Fr() {
  const e = za("(max-width: 767.98px)"), a = $(), t = y(null), [r, l] = p(!1);
  return { narrow: e, open: r, panelId: a, slotRef: t, toggle: () => l(!r), close: () => {
    var s, c;
    l(!1), (c = (s = t.current) == null ? void 0 : s.querySelector("button")) == null || c.focus();
  } };
}
function Wr({ tools: e, toolsLabel: a, menu: t }) {
  return e === void 0 ? null : t.narrow ? /* @__PURE__ */ n("span", { ref: t.slotRef, className: M.tools, children: /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.toggle, expanded: t.open, controls: t.panelId, children: a ?? "Settings" }) }) : /* @__PURE__ */ n("span", { className: M.tools, children: e });
}
function zr({ tools: e, menu: a }) {
  if (e === void 0 || !a.narrow) return null;
  const t = (r) => {
    r.key === "Escape" && a.close();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: M.toolsPanel, hidden: !a.open, onKeyDown: t, children: e });
}
function Gr(e) {
  return /* @__PURE__ */ o("header", { className: M.topbar, children: [
    /* @__PURE__ */ n("span", { className: M.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: M.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(Ia, { value: e.tagline, className: M.tagline }),
    /* @__PURE__ */ n(jr, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: M.identity, children: /* @__PURE__ */ n(Hr, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(Wr, { tools: e.tools, toolsLabel: e.toolsLabel, menu: e.menu })
  ] });
}
function Ur(e) {
  const a = $(), t = Fr();
  return /* @__PURE__ */ o("div", { className: `${M.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: M.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(Gr, { ...e, menu: t }),
    /* @__PURE__ */ n(zr, { tools: e.tools, menu: t }),
    /* @__PURE__ */ n("div", { id: a, className: M.content, children: e.children })
  ] });
}
function Kr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function h$(e) {
  return Kr(e) ? /* @__PURE__ */ n(Dr, { ...e }) : /* @__PURE__ */ n(Ur, { ...e });
}
function Ga(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const Vr = "_root_o4yib_2", Yr = "_row_o4yib_8", Xr = "_box_o4yib_14", Jr = "_label_o4yib_21", Qr = "_lockedNote_o4yib_26", Zr = "_consequence_o4yib_34", el = "_sample_o4yib_69", qe = {
  root: Vr,
  row: Yr,
  box: Xr,
  label: Jr,
  lockedNote: Qr,
  consequence: Zr,
  sample: el
};
function al(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function nl({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${qe.consequence} ward-check-consequence`, children: a }) : null;
}
function tl({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${qe.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function rl({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: qe.sample, "aria-hidden": "true", children: e }) : null;
}
function An(e) {
  const a = $(), t = e.consequence ? `${a}-note` : void 0, r = al(e);
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
          "aria-describedby": Ga(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ o("label", { htmlFor: a, className: qe.label, children: [
        e.label,
        /* @__PURE__ */ n(tl, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(rl, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(nl, { id: t, text: e.consequence })
  ] });
}
const ll = "_chip_1073r_2", ol = {
  chip: ll
}, il = {
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
function sl(e, a) {
  if (e === "stream") return cl(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = il[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function cl(e) {
  if (!e || !pa(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = Ln(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${ol.chip} ward-chip ward-chip--${e}`, style: sl(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function ga(e) {
  return typeof e == "number" && pa(e) ? e : null;
}
function Le(e, a) {
  const t = ga(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function ya(e, a) {
  const t = ga(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const dl = "_nav_j90m2_2", ul = "_list_j90m2_8", hl = "_item_j90m2_15", ml = "_link_j90m2_30", wl = "_sep_j90m2_40", _l = "_current_j90m2_44", fl = "_chips_j90m2_48", Ie = {
  nav: dl,
  list: ul,
  item: hl,
  link: ml,
  sep: wl,
  current: _l,
  chips: fl
};
function vl({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ o("nav", { "aria-label": "Breadcrumb", className: Ie.nav, children: [
    /* @__PURE__ */ n("ol", { className: Ie.list, children: e.map((t, r) => /* @__PURE__ */ o("li", { className: Ie.item, children: [
      r > 0 ? /* @__PURE__ */ n("span", { className: Ie.sep, "aria-hidden": "true", children: "›" }) : null,
      r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: `${Ie.link} ward-target`, href: W(t.href), children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Ie.current, "aria-current": "page", children: t.label })
    ] }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Ie.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const bl = "_field_fy549_2", pl = "_label_fy549_8", gl = "_labelHidden_fy549_15", yl = "_control_fy549_25", Nl = "_mono_fy549_44", kl = "_area_fy549_49", $l = "_invalid_fy549_56", Ee = {
  field: bl,
  label: pl,
  labelHidden: gl,
  control: yl,
  mono: Nl,
  area: kl,
  invalid: $l
}, Cl = {
  type: "password",
  autoComplete: "new-password",
  spellCheck: !1,
  "data-1p-ignore": "",
  "data-lpignore": "true"
};
function Sl({ props: e, controlProps: a, cls: t }) {
  const r = e.secret ? Cl : {};
  return /* @__PURE__ */ n("input", { className: t, ...r, ...a });
}
function Rl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Tl({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const El = { input: Sl, select: Rl, textarea: Tl };
function Ll(e, a, t) {
  const r = El[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Al(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Ga(r ? t : void 0, e.describedBy),
    onChange: (l) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, l.target.value);
    }
  };
}
function xl(e) {
  const a = e.mono ? [Ee.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [Ee.area] : [];
  return [Ee.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Il(e) {
  return e ? `${Ee.label} ${Ee.labelHidden} ward-field-label` : `${Ee.label} ward-field-label`;
}
function A(e) {
  const a = $(), t = `${a}-msg`, r = Al(e, a, t), l = xl(e);
  return /* @__PURE__ */ o("div", { className: `${Ee.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Il(e.labelHidden), htmlFor: a, children: e.label }),
    Ll(e, r, l),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${Ee.invalid} ward-field-error`, children: e.invalid })
  ] });
}
function Ml(e) {
  const a = e.scrollWidth - e.clientWidth - e.scrollLeft;
  return { start: e.scrollLeft > 1, end: a > 1 };
}
function xn(e) {
  const a = Ml(e);
  return e.toggleAttribute("data-fade-start", a.start), e.toggleAttribute("data-fade-end", a.end), a;
}
function Ua(e, a, t) {
  x(() => {
    const r = e.current;
    if (!r) return;
    const l = () => {
      const s = xn(r);
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
const ql = "_strip_tivso_2", Pl = "_tab_tivso_26", Bl = "_count_tivso_49", Ma = {
  strip: ql,
  tab: Pl,
  count: Bl
}, on = 7;
function Ol(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function Dl(e) {
  return `${Ma.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function jl(e, a) {
  const t = Number.parseFloat(getComputedStyle(e).scrollPaddingInlineStart) || 0, r = a.getBoundingClientRect().left - e.getBoundingClientRect().left, l = r + a.getBoundingClientRect().width;
  return r < t ? e.scrollLeft + r - t : l > e.clientWidth - t ? e.scrollLeft + l - e.clientWidth + t : null;
}
function Hl(e, a) {
  Ha(() => {
    const t = e.current, r = t == null ? void 0 : t.querySelectorAll('[role="tab"]')[a];
    if (!t || !r) return;
    const l = jl(t, r);
    l !== null && (t.scrollLeft = Math.max(0, l)), xn(t);
  }, [e, a]);
}
function m$({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: l = 1 }) {
  if (e.length > on) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${on} — the set is fixed`);
  const i = va({ orientation: "horizontal" }), s = Ol(e, a);
  x(() => i.setActive(s), [i.setActive, s]);
  const c = y(null);
  return Ua(c, e.length), Hl(c, s), /* @__PURE__ */ n(
    "div",
    {
      ref: c,
      className: Dl(l),
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
          className: `${Ma.tab} ward-tab`,
          "aria-selected": d.id === a,
          "aria-controls": `panel-${d.id}`,
          onClick: () => t(d.id),
          ...i.itemProps(u),
          children: [
            d.label,
            d.count === void 0 ? null : /* @__PURE__ */ o(R, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: Ma.count, children: `· ${d.count}` })
            ] })
          ]
        },
        d.id
      ))
    }
  );
}
const Fl = "_root_jem6y_2", Wl = "_segment_jem6y_7", sn = {
  root: Fl,
  segment: Wl
};
function In({ options: e, value: a, onChange: t, label: r = "Options", disabled: l = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const s = va({ orientation: "horizontal" }), c = Math.max(0, e.findIndex((d) => d.value === a));
  return x(() => s.setActive(c), [s.setActive, c]), /* @__PURE__ */ n("div", { className: `${sn.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...s.containerProps, children: e.map((d, u) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: sn.segment,
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
const zl = "_sidebar_1g24y_3", Gl = "_brand_1g24y_9", Ul = "_mark_1g24y_17", Kl = "_word_1g24y_24", Vl = "_nav_1g24y_30", Yl = "_navItem_1g24y_38", Xl = "_group_1g24y_50", Jl = "_groupName_1g24y_57", Ql = "_agents_1g24y_70", Zl = "_agent_1g24y_70", eo = "_agentTop_1g24y_88", ao = "_dot_1g24y_95", no = "_agentName_1g24y_107", to = "_agentMeta_1g24y_120", ro = "_foot_1g24y_126", lo = "_footName_1g24y_132", oo = "_footLinks_1g24y_139", io = "_footLink_1g24y_139", so = "_root_1g24y_153", co = "_linkBrand_1g24y_162", uo = "_label_1g24y_183", ho = "_note_1g24y_188", mo = "_footer_1g24y_202", S = {
  sidebar: zl,
  brand: Gl,
  mark: Ul,
  word: Kl,
  nav: Vl,
  navItem: Yl,
  group: Xl,
  groupName: Jl,
  new: "_new_1g24y_64",
  agents: Ql,
  agent: Zl,
  agentTop: eo,
  dot: ao,
  agentName: no,
  agentMeta: to,
  foot: ro,
  footName: lo,
  footLinks: oo,
  footLink: io,
  root: so,
  linkBrand: co,
  label: uo,
  note: ho,
  footer: mo
};
function wo({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ o(
    "a",
    {
      className: S.agent,
      href: W(e.href),
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ o("span", { className: S.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: S.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": Ln(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: S.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: S.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function _o({ shared: e }) {
  return e ? /* @__PURE__ */ o("div", { className: S.foot, children: [
    /* @__PURE__ */ n("span", { className: S.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: S.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: `${S.footLink} ward-target`, href: W(a.href), children: a.label }, a.href)) })
  ] }) : null;
}
function fo({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: l, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ o("nav", { className: S.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ o("div", { className: S.brand, children: [
      /* @__PURE__ */ n("span", { className: S.mark }),
      /* @__PURE__ */ n("span", { className: S.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: S.nav, children: a.map((s) => /* @__PURE__ */ n("a", { className: S.navItem, href: W(s.href), "aria-current": s.current === !0 ? "page" : void 0, children: s.label }, s.href)) }),
    /* @__PURE__ */ o("div", { className: S.group, children: [
      /* @__PURE__ */ o("span", { className: S.groupName, children: [
        t,
        " · ",
        ae(r.length)
      ] }),
      l && /* @__PURE__ */ n("a", { className: S.new, href: W(l.href), children: l.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: S.agents, children: r.map((s) => /* @__PURE__ */ n(wo, { agent: s }, s.href)) }),
    /* @__PURE__ */ n(_o, { shared: i })
  ] });
}
function vo(e) {
  return e.destinations ?? e.items ?? [];
}
function bo({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: S.linkBrand, children: e });
}
function po({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: S.footer, children: e });
}
function go({ link: e, active: a }) {
  return /* @__PURE__ */ o("a", { href: W(e.href), "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: S.note, children: e.note })
  ] });
}
function yo(e) {
  return /* @__PURE__ */ o("aside", { className: `${S.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(bo, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: vo(e).map((a) => /* @__PURE__ */ n(go, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(po, { children: e.children })
  ] });
}
function No(e) {
  return "agents" in e;
}
function w$(e) {
  return No(e) ? /* @__PURE__ */ n(fo, { ...e }) : /* @__PURE__ */ n(yo, { ...e });
}
const ko = "_mark_wlgi8_3", $o = {
  mark: ko
}, Co = { met: "✓", unmet: "", failed: "✕" };
function Ka({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: $o.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Co[e]
    }
  );
}
const So = "_marker_br9fi_2", Ro = {
  marker: So
}, To = {
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
  const r = { "--marker": To[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Ro.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Eo = "_root_ti0pq_2", Lo = "_chip_ti0pq_11", Ao = "_noCase_ti0pq_23", na = {
  root: Eo,
  chip: Lo,
  noCase: Ao
};
function xo(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Va({ connection: e, since: a, lastEventAt: t }) {
  const r = xo(a, t), l = Wa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ o("span", { className: `${na.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ae, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: na.noCase, children: Fa(l) })
  ] }) : /* @__PURE__ */ o("span", { className: `${na.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    ce(r)
  ] });
}
const Io = "_root_k8vuh_2", Mo = "_context_k8vuh_12", qo = "_row_k8vuh_1", Po = "_heading_k8vuh_25", Bo = "_headingWrap_k8vuh_33", Oo = "_chips_k8vuh_38", Do = "_title_k8vuh_45", jo = "_consequence_k8vuh_54", Ho = "_actionsWrap_k8vuh_59", Fo = "_actions_k8vuh_59", Wo = "_action_k8vuh_59", zo = "_overflowPanel_k8vuh_78", Go = "_measureClip_k8vuh_89", Uo = "_measure_k8vuh_89", Z = {
  root: Io,
  context: Mo,
  row: qo,
  heading: Po,
  headingWrap: Bo,
  chips: Oo,
  title: Do,
  consequence: jo,
  actionsWrap: Ho,
  actions: Fo,
  action: Wo,
  overflowPanel: zo,
  measureClip: Go,
  measure: Uo
};
function Ko({ title: e, consequence: a, consequenceHint: t }) {
  return /* @__PURE__ */ o("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, title: t, children: a })
  ] });
}
function qa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function cn({ disclosure: e }) {
  return /* @__PURE__ */ n(_, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function Vo({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: l }) {
  return t ? r ? /* @__PURE__ */ n(_, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(cn, { disclosure: l }) : a ? [/* @__PURE__ */ n(cn, { disclosure: l }, "more"), /* @__PURE__ */ n(qa, { actions: e }, "actions")] : /* @__PURE__ */ n(qa, { actions: e });
}
function Yo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function Xo({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (l) => {
    l.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(qa, { actions: e }) });
}
function Jo(e, a) {
  const t = $(), [r, l] = p(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => l(!i) }, close: () => {
    var d, u;
    l(!1), (u = (d = a.current) == null ? void 0 : d.querySelector("button")) == null || u.focus();
  } };
}
function Qo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ o("div", { className: Z.context, children: [
    /* @__PURE__ */ n(vl, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function Zo(...e) {
  return e.some((a) => a === null);
}
function ei(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function ai(e, a, t, r, l) {
  if (l === 0 || Zo(a, t, r)) return !1;
  const [i, s, c] = [a, t, r], d = ei(e), u = Math.max(0, e.clientWidth - i.offsetWidth - d);
  return c.offsetWidth > u || s.scrollWidth > s.clientWidth + 1;
}
function ni(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function ti(e) {
  const a = y(null), t = y(null), r = y(null), l = y(null), [i, s] = p(!1);
  return x(() => {
    const c = a.current;
    if (!ni(c)) return;
    const d = () => s(ai(c, t.current, r.current, l.current, e.length)), u = new ResizeObserver(d);
    return u.observe(c), d(), () => u.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: l, collapsed: i };
}
function ri({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ n("div", { className: Z.measureClip, children: /* @__PURE__ */ o("div", { className: Z.measure, ref: t, "aria-hidden": "true", "data-ward-measure": !0, children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(_, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, l) => /* @__PURE__ */ n("span", { children: r }, l))
  ] }) });
}
function li({ connection: e }) {
  return e ? /* @__PURE__ */ n(Va, { connection: e.connection, since: e.since }) : null;
}
function _$({ crumb: e, chips: a, title: t, consequence: r, consequenceHint: l, actions: i = [], more: s = [], connection: c, onOverflow: d, density: u = "page" }) {
  const { rowRef: h, headingRef: f, actionsRef: b, measureRef: g, collapsed: I } = ti(i), j = s.length > 0, { disclosure: oe, close: $e } = Jo(I || j, b), ne = Yo(s, i, I, d);
  return /* @__PURE__ */ o("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(Qo, { crumb: e, chips: a }),
    /* @__PURE__ */ o("div", { className: Z.row, ref: h, children: [
      /* @__PURE__ */ n("div", { ref: f, className: Z.headingWrap, children: /* @__PURE__ */ n(Ko, { title: t, consequence: r, consequenceHint: l }) }),
      /* @__PURE__ */ o("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(li, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: b, "data-ward-actions": !0, children: /* @__PURE__ */ n(Vo, { actions: i, hasMore: j, collapsed: I, onOverflow: d, disclosure: oe }) })
      ] })
    ] }),
    /* @__PURE__ */ n(Xo, { actions: ne, disclosure: oe, onEscape: $e }),
    /* @__PURE__ */ n(ri, { actions: i, hasMore: j, measureRef: g })
  ] });
}
const oi = "_scrim_c7sqj_2", ii = "_drawer_c7sqj_10", si = "_sheet_c7sqj_14", ci = "_modal_c7sqj_18", di = "_panel_c7sqj_23", ui = "_header_c7sqj_51", hi = "_title_c7sqj_59", mi = "_body_c7sqj_63", wi = "_close_c7sqj_90", ye = {
  scrim: oi,
  drawer: ii,
  sheet: si,
  modal: ci,
  panel: di,
  header: ui,
  title: hi,
  body: mi,
  close: wi
}, _i = He(null), ca = [], da = /* @__PURE__ */ new Map();
function fi(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function vi(e, a) {
  let t = da.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, da.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function bi(e, a, t) {
  for (const r of Array.from(a.children))
    r !== t && !fi(r) && vi(e, r);
}
function pi(e, a) {
  let t = null, r = a;
  for (; r; ) {
    if (bi(e, r, t), r === document.body) return;
    t = r, r = r.parentElement;
  }
}
function gi(e) {
  for (const a of e.claims) {
    const t = da.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), da.delete(a)));
  }
}
function yi(e, a) {
  const t = { root: e, claims: [] };
  return ca.push(t), pi(t, a), t;
}
function Ni(e) {
  const a = ca.indexOf(e);
  a >= 0 && ca.splice(a, 1), gi(e);
}
function dn(e) {
  return e !== null && ca.at(-1) === e;
}
function ki(e, a, t) {
  const r = y(null), l = y(t);
  return l.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const s = document.activeElement, c = yi(i, a);
    return r.current = c, () => {
      var u, h;
      const d = dn(c);
      Ni(c), r.current = null, d && ((h = (u = l.current ?? s) == null ? void 0 : u.focus) == null || h.call(u));
    };
  }, [a]), X(() => dn(r.current), []);
}
function $i(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ci(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Si({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("header", { className: `${ye.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${ye.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${ye.body} ward-drawer-body`, children: e.children })
  ] });
}
function Ri(e) {
  return `${ye.scrim} ${ye[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Ti(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${ye.panel} ${ye[e]} ward-overlay-panel${t}${r}`;
}
function Ei(e) {
  const a = je(_i);
  return e ?? a ?? document.body;
}
function ea(e) {
  const a = y(null), t = y(null), r = $(), l = Ei(e.container), i = za("(min-width: 768px)"), s = $i(e.kind, i), c = Ci(e, r), d = Pt(t), u = ki(a, l, e.returnFocusTo), h = X(() => {
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
  }, [h]), Tt(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Ri(s),
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
            className: Ti(s, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (f) => f.stopPropagation(),
            onKeyDown: (f) => u() && d.onKeyDown(f),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${ye.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Si, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    l
  );
}
const Li = "_root_drrhx_2", Ai = "_ticket_drrhx_15", xi = "_body_drrhx_24", Sa = {
  root: Li,
  ticket: Ai,
  body: xi
};
function f$({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ o("aside", { className: `${Sa.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${Sa.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: Sa.body, children: t })
  ] });
}
const Ii = "_root_bf1pc_2", Mi = "_table_bf1pc_9", qi = "_caption_bf1pc_14", Pi = "_series_bf1pc_23", Bi = "_category_bf1pc_31", Oi = "_cell_bf1pc_39", Di = "_track_bf1pc_45", ji = "_lane_bf1pc_52", Hi = "_bar_bf1pc_56", Fi = "_value_bf1pc_63", Wi = "_swatch_bf1pc_70", zi = "_empty_bf1pc_78", V = {
  root: Ii,
  table: Mi,
  caption: qi,
  series: Pi,
  category: Bi,
  cell: Oi,
  track: Di,
  lane: ji,
  bar: Hi,
  value: Fi,
  swatch: Wi,
  empty: zi
}, Gi = "—", un = 6;
function Ui(e, a) {
  if (a.length < 1 || a.length > un)
    throw new Error(`BarChart: ${a.length} series; the chart takes one to ${un}`);
  const t = a.find((r) => r.values.length !== e.length);
  if (t) throw new Error(`BarChart: series "${t.name}" has ${t.values.length} values for ${e.length} categories`);
}
function Ki(e) {
  return Math.max(0, ...e.flatMap((a) => a.values.map((t) => t ?? 0)));
}
function Mn(e, a) {
  return a > 1 ? e + 1 : void 0;
}
function Vi(e, a) {
  return e !== null && a > 0 ? e / a * 100 : 0;
}
function Yi({ value: e, top: a, step: t, format: r, missing: l }) {
  const i = Vi(e, a), s = { "--share": `${i}%` };
  return /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ o("span", { className: V.track, children: [
    /* @__PURE__ */ n("span", { className: V.lane, children: i > 0 ? /* @__PURE__ */ n("span", { className: `${V.bar} ward-barchart-bar`, "data-step": t, style: s, "aria-hidden": "true" }) : null }),
    /* @__PURE__ */ n("span", { className: V.value, children: e === null ? l : r(e) })
  ] }) });
}
function Xi({ series: e }) {
  return /* @__PURE__ */ n(R, { children: e.map((a, t) => /* @__PURE__ */ o("th", { scope: "col", className: V.series, children: [
    e.length > 1 ? /* @__PURE__ */ n("span", { className: V.swatch, "data-step": Mn(t, e.length), "aria-hidden": "true" }) : null,
    a.name
  ] }, a.name)) });
}
function Ji({ title: e, empty: a = "Nothing to chart yet." }) {
  return /* @__PURE__ */ o("section", { className: `${V.root} ward-barchart`, "aria-label": e, children: [
    /* @__PURE__ */ n("p", { className: V.caption, children: e }),
    /* @__PURE__ */ n("p", { className: V.empty, children: a })
  ] });
}
function Qi({ title: e, categories: a, series: t, top: r, format: l = ae, categoryHead: i = "Category", missing: s = Gi }) {
  return /* @__PURE__ */ n("div", { className: `${V.root} ward-barchart`, children: /* @__PURE__ */ o("table", { className: V.table, children: [
    /* @__PURE__ */ n("caption", { className: V.caption, children: e }),
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "col", className: V.series, children: /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: i }) }),
      /* @__PURE__ */ n(Xi, { series: t })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: a.map((c, d) => /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ n("th", { scope: "row", className: V.category, children: c }),
      t.map((u, h) => /* @__PURE__ */ n(Yi, { value: u.values[d], top: r, step: Mn(h, t.length), format: l, missing: s }, u.name))
    ] }, c)) })
  ] }) });
}
function v$(e) {
  Ui(e.categories, e.series);
  const a = Ki(e.series);
  return a === 0 ? /* @__PURE__ */ n(Ji, { title: e.title, empty: e.empty }) : /* @__PURE__ */ n(Qi, { ...e, top: a });
}
const Zi = "_root_1bfqw_2", es = "_figure_1bfqw_7", as = "_of_1bfqw_13", ns = "_bar_1bfqw_18", ts = "_rows_1bfqw_38", rs = "_row_1bfqw_38", ls = "_label_1bfqw_49", os = "_amount_1bfqw_54", Ce = {
  root: Zi,
  figure: es,
  of: as,
  bar: ns,
  rows: ts,
  row: rs,
  label: ls,
  amount: os
};
function is({ spent: e, ceiling: a, breakdown: t }) {
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
const ss = "_frame_mg2jl_2", cs = "_table_mg2jl_6", ds = "_th_mg2jl_12", us = "_td_mg2jl_13", hs = "_sort_mg2jl_47", ms = "_row_mg2jl_53", ws = "_empty_mg2jl_61", Re = {
  frame: ss,
  table: cs,
  th: ds,
  td: us,
  sort: hs,
  row: ms,
  empty: ws
}, _s = { asc: "ascending", desc: "descending" };
function fs(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return _s[a.direction];
}
function vs(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: Re.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function bs(e) {
  return e === void 0 ? void 0 : { width: e };
}
function ps({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: Re.th,
      style: bs(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": fs(e, a),
      children: vs(e, t)
    }
  );
}
function gs({ row: e, props: a }) {
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
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: Re.head, children: a.map((h) => /* @__PURE__ */ n(ps, { column: h, sort: c, onSort: d }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(gs, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: l, selectedId: i, lockedIds: s, sort: c, onSort: d, empty: u } }, r(h))) })
  ] }) });
}
const Ns = "_list_v0s52_2", ks = {
  list: Ns
};
function b$({ children: e, label: a }) {
  return /* @__PURE__ */ n("ul", { className: ks.list, role: "list", "aria-label": a, "data-ward-plain-list": "", children: e });
}
const $s = "_label_1u62a_2", Cs = {
  label: $s
};
function p$({ columns: e }) {
  return /* @__PURE__ */ n("thead", { "data-ward-table-head": "", children: /* @__PURE__ */ n("tr", { children: e.map((a) => /* @__PURE__ */ n("th", { scope: "col", title: a.header, style: a.width === void 0 ? void 0 : { width: a.width }, children: /* @__PURE__ */ n("span", { className: Cs.label, children: a.header }) }, a.key)) }) });
}
const Ss = "_stack_bp6a0_2", Rs = {
  stack: Ss
};
function g$({ children: e }) {
  return /* @__PURE__ */ n("span", { className: Rs.stack, "data-ward-action-stack": "", children: e });
}
const Ts = "_set_y5zy3_2", Es = "_legend_y5zy3_7", Ls = "_row_y5zy3_15", As = "_control_y5zy3_20", xs = "_input_y5zy3_26", Is = "_label_y5zy3_31", Ms = "_consequence_y5zy3_36", Me = {
  set: Ts,
  legend: Es,
  row: Ls,
  control: As,
  input: xs,
  label: Is,
  consequence: Ms
};
function qn({ legend: e, options: a, value: t, onChange: r, disabled: l, name: i, describedBy: s, variant: c }) {
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
              "aria-describedby": Ga(b, s),
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
const qs = "_root_1pyf1_2", Ps = "_head_1pyf1_11", Bs = "_index_1pyf1_31", Os = "_dot_1pyf1_35", Ds = "_note_1pyf1_40", js = "_counter_1pyf1_46", Hs = "_trailing_1pyf1_54", Pe = {
  root: qs,
  head: Ps,
  index: Bs,
  dot: Os,
  note: Ds,
  counter: js,
  trailing: Hs
};
function Fs({ index: e }) {
  return e ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${Pe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Pe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ws({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Pe.counter, "aria-hidden": "true", children: e }) : null;
}
function hn({ title: e, index: a, note: t, counter: r, kind: l = "micro", trailing: i }) {
  return /* @__PURE__ */ o("div", { className: `${Pe.root} ward-sh`, "data-kind": l, children: [
    /* @__PURE__ */ o("h2", { className: Pe.head, children: [
      /* @__PURE__ */ n(Fs, { index: a }),
      e,
      r && /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Pe.note, children: t }),
    /* @__PURE__ */ n(Ws, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Pe.trailing, children: i })
  ] });
}
const zs = "_strip_1cw2w_2", Gs = "_cell_1cw2w_7", Us = "_value_1cw2w_12", Ks = "_link_1cw2w_28", Vs = "_linkValue_1cw2w_37", Ys = "_label_1cw2w_48", Te = {
  strip: zs,
  cell: Gs,
  value: Us,
  link: Ks,
  linkValue: Vs,
  label: Ys
};
function Xs(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
const Pn = (e) => `${Te.value} ward-stat-value${e.accent ? ` ward-stat-accent--${e.accent}` : ""}`;
function Js({ cell: e }) {
  return /* @__PURE__ */ o("div", { className: Te.cell, "data-accent": e.accent, children: [
    /* @__PURE__ */ n("dd", { className: Pn(e), title: e.hint, children: e.value }),
    /* @__PURE__ */ n("dt", { className: `${Te.label} ward-stat-label`, children: e.label })
  ] });
}
function Qs({ cell: e, href: a }) {
  return /* @__PURE__ */ o("div", { className: Te.cell, "data-accent": e.accent, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ n("dt", { className: "ward-visually-hidden", children: e.label }),
    /* @__PURE__ */ n("dd", { className: Pn(e), title: e.hint, children: /* @__PURE__ */ o("a", { className: `${Te.link} ward-stat-link`, href: W(a), "aria-label": `${e.label}: ${e.value}`, children: [
      /* @__PURE__ */ n("span", { className: Te.linkValue, children: e.value }),
      /* @__PURE__ */ n("span", { className: `${Te.label} ward-stat-label`, children: e.label })
    ] }) })
  ] });
}
function Na({ cells: e, divided: a = !1 }) {
  return Xs(e), /* @__PURE__ */ n("dl", { className: `${Te.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => t.href === void 0 ? /* @__PURE__ */ n(Js, { cell: t }, t.label) : /* @__PURE__ */ n(Qs, { cell: t, href: t.href }, t.label)) });
}
const Zs = "_root_xk7sv_2", ec = "_track_xk7sv_8", ac = "_thumb_xk7sv_35", nc = "_labelHidden_xk7sv_53", tc = "_label_xk7sv_53", rc = "_lockedNote_xk7sv_68", Be = {
  root: Zs,
  track: ec,
  thumb: ac,
  labelHidden: nc,
  label: tc,
  lockedNote: rc
};
function lc(e) {
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
    /* @__PURE__ */ o("span", { id: c, className: lc(s), children: [
      e,
      l && /* @__PURE__ */ n("span", { className: Be.lockedNote, children: "always on" })
    ] })
  ] });
}
const oc = "_bar_1o04s_2", ic = "_skip_1o04s_11", sc = "_mark_1o04s_22", cc = "_nav_1o04s_30", dc = "_list_1o04s_34", uc = "_select_1o04s_40", hc = "_dest_1o04s_47", mc = "_actor_1o04s_75", wc = "_actorMark_1o04s_88", _c = "_actorLabel_1o04s_93", fc = "_tagline_1o04s_112", de = {
  bar: oc,
  skip: ic,
  mark: sc,
  nav: cc,
  list: dc,
  select: uc,
  dest: hc,
  actor: mc,
  actorMark: wc,
  actorLabel: _c,
  tagline: fc
};
function vc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function bc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function y$({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: l, onNavigate: i, skipTo: s = "main" }) {
  const c = bc(r);
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
      /* @__PURE__ */ n("span", { className: de.actorMark, "aria-hidden": "true", children: vc(c) })
    ] })
  ] });
}
const pc = "_tree_1lyby_2", gc = "_item_1lyby_6", yc = "_row_1lyby_10", Nc = "_button_1lyby_22", ua = {
  tree: pc,
  item: gc,
  row: yc,
  button: Nc
}, Bn = He(null);
function kc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = va({ orientation: "vertical" });
  return /* @__PURE__ */ n(Bn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ua.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const $c = { ArrowRight: !0, ArrowLeft: !1 };
function mn(e) {
  return e ? !0 : void 0;
}
function Cc(e, a) {
  const t = $c[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function Sc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function Rc(e) {
  const a = [ua.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function Tc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function Ec(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function Lc(e) {
  return typeof e == "string" ? e : void 0;
}
function Ac({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function xc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function On(e) {
  const a = je(Bn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = Tc(e);
  return /* @__PURE__ */ o("li", { className: ua.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: Rc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": mn(e.unresolved),
        "data-inherited": mn(e.inherited),
        children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            className: `${ua.button} ward-treeitem-btn`,
            onClick: () => Sc(e),
            onKeyDown: (r) => Cc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: Ec(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: Lc(e.label), children: e.label }),
              /* @__PURE__ */ n(Ac, { value: e.detail }),
              /* @__PURE__ */ n(xc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const Ic = "_frame_1fj9j_2", Mc = "_subjectRail_1fj9j_22", qc = "_subject_1fj9j_22", Pc = "_rail_1fj9j_42", Bc = "_record_1fj9j_64", Oc = "_recordBody_1fj9j_69", Dc = "_stageGrid_1fj9j_118", jc = "_band_1fj9j_144", Hc = "_bandBody_1fj9j_153", Fc = "_bandActions_1fj9j_158", Wc = "_scroller_1fj9j_166", zc = "_board_1fj9j_192", Gc = "_laneCount_1fj9j_200", Uc = "_lanes_1fj9j_210", Y = {
  frame: Ic,
  subjectRail: Mc,
  subject: qc,
  rail: Pc,
  record: Bc,
  recordBody: Oc,
  stageGrid: Dc,
  band: jc,
  bandBody: Hc,
  bandActions: Fc,
  scroller: Wc,
  board: zc,
  laneCount: Gc,
  lanes: Uc
};
function N$({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: Y.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function wn(e) {
  return e ? "true" : void 0;
}
function k$({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: l, ruled: i }) {
  return /* @__PURE__ */ o("div", { className: Y.subjectRail, "data-ward-subject-rail": t, "data-ruled": wn(i), children: [
    /* @__PURE__ */ n("div", { className: Y.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: Y.rail, "data-sticky": wn(l), "aria-label": r, children: a })
  ] });
}
function $$({ title: e, children: a, note: t, trailing: r, pad: l = "block", label: i, empty: s, measure: c }) {
  return s === "inline" ? /* @__PURE__ */ n("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", "data-empty": "inline", children: /* @__PURE__ */ n(hn, { kind: "key", title: e, note: a, trailing: r }) }) : /* @__PURE__ */ o("section", { className: Y.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(hn, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: Y.recordBody, "data-pad": l, "data-measure": c, children: a })
  ] });
}
const Kc = "_form_1j8ub_2", Vc = "_fields_1j8ub_9", Yc = "_actions_1j8ub_19", Ra = {
  form: Kc,
  fields: Vc,
  actions: Yc
};
function C$({ label: e, children: a, actions: t, onSubmit: r }) {
  const l = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ o("form", { className: Ra.form, "aria-label": e, onSubmit: l, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: Ra.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: Ra.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function S$({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ o("section", { className: Y.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: Y.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: Y.bandActions, children: a })
  ] });
}
const Xc = "(max-width: 767.98px)";
function Ya({ label: e, children: a, laneCount: t, onOverflow: r }) {
  const l = y(null);
  Ua(l, t ?? St.count(a), r);
  const i = t === void 0 ? void 0 : { "--ward-board-lanes": t };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", style: i, children: a });
}
function Jc({ lanes: e, label: a, laneLabel: t }) {
  const [r, l] = p(null), i = e.find((c) => c.id === r) ?? e[0], s = e.map((c) => ({ value: c.id, label: `${c.label} · ${c.count}` }));
  return /* @__PURE__ */ o("div", { className: Y.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: s, onChange: l }),
    /* @__PURE__ */ n(Ya, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Qc({ lanes: e, label: a }) {
  const [t, r] = p(!1);
  return /* @__PURE__ */ o("div", { className: Y.board, "data-ward-board": "", children: [
    /* @__PURE__ */ o("p", { className: Y.laneCount, "data-ward-board-lane-count": "", hidden: !t, children: [
      e.length,
      " lanes"
    ] }),
    /* @__PURE__ */ n(Ya, { label: a, laneCount: e.length, onOverflow: r, children: e.map((l) => /* @__PURE__ */ n(Rt, { children: l.content }, l.id)) })
  ] });
}
function R$({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const l = za(Xc);
  return t === void 0 ? /* @__PURE__ */ n(Ya, { label: a, children: e }) : l ? /* @__PURE__ */ n(Jc, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Qc, { lanes: t, label: a });
}
function T$({ columns: e, children: a, label: t = "Stages", floor: r = "stage" }) {
  const l = y(null), i = Math.max(e, 1);
  Ua(l, i);
  const s = { "--ward-stage-grid-columns": i };
  return /* @__PURE__ */ n("div", { ref: l, className: Y.stageGrid, role: "region", "aria-label": t, tabIndex: 0, "data-ward-stage-grid": "", "data-floor": r, style: s, children: a });
}
const Zc = "_block_1o5o7_2", ed = "_sentence_1o5o7_15", ad = "_meta_1o5o7_20", nd = "_action_1o5o7_25", td = "_strip_1o5o7_29", rd = "_loading_1o5o7_48", ld = "_label_1o5o7_56", od = "_counter_1o5o7_63", _e = {
  block: Zc,
  sentence: ed,
  meta: ad,
  action: nd,
  strip: td,
  loading: rd,
  label: ld,
  counter: od
};
function id({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: _e.action, children: /* @__PURE__ */ n(_, { onClick: e.onClick, children: e.label }) });
}
function ka({ sentence: e, action: a, children: t, role: r = "status", tone: l, kind: i }) {
  return /* @__PURE__ */ o("div", { className: `${_e.block} ward-state${i === void 0 ? "" : ` ${i}`}`, role: r, "data-tone": l, children: [
    /* @__PURE__ */ n("p", { className: _e.sentence, children: e }),
    t,
    /* @__PURE__ */ n(id, { action: a })
  ] });
}
function sd(e) {
  return /* @__PURE__ */ n(ka, { ...e, kind: "ward-emptystate" });
}
function E$({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(ka, { sentence: e, action: t, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function L$(e) {
  return /* @__PURE__ */ n(ka, { ...e });
}
function A$({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(ka, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ o("p", { className: _e.meta, children: [
    "failed at ",
    ce(a)
  ] }) });
}
function x$({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    ce(e),
    ". Showing snapshot from ",
    ce(a)
  ] });
}
function I$({ queued: e, since: a }) {
  return /* @__PURE__ */ o("div", { className: _e.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable: ",
    e,
    " requests queued since ",
    ce(a)
  ] });
}
function M$({ label: e, startedAt: a }) {
  const t = y(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, l] = p(!1);
  x(() => {
    const s = window.setTimeout(() => l(!0), we.load);
    return () => window.clearTimeout(s);
  }, []);
  const i = Wa(t.current, r);
  return /* @__PURE__ */ o("div", { className: `${_e.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: _e.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: _e.counter, children: Fa(i) }) : null
  ] });
}
const cd = "_note_tlubt_2", dd = {
  note: cd
};
function ud({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ o("p", { className: dd.note, role: "status", children: [
    e,
    " is over cap now: ",
    a,
    " items against ",
    t
  ] });
}
const hd = "_card_12in3_2", md = "_hit_12in3_23", wd = "_head_12in3_30", _d = "_title_12in3_36", fd = "_meta_12in3_44", vd = "_fields_12in3_45", bd = "_who_12in3_58", pd = "_sep_12in3_65", gd = "_mono_12in3_69", yd = "_field_12in3_45", Nd = "_last_12in3_84", kd = "_reason_12in3_96", J = {
  card: hd,
  hit: md,
  head: wd,
  title: _d,
  meta: fd,
  fields: vd,
  who: bd,
  sep: pd,
  mono: gd,
  field: yd,
  last: Nd,
  reason: kd
}, $d = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function Cd(e, a, t) {
  const r = la(e, "blue"), l = la(e, "orange"), i = la(e, "green"), s = y(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const c = { blue: r, orange: l, green: i };
    return t.subscribe(a, (d) => {
      if (s.current.has(d.id)) return;
      s.current.add(d.id);
      const u = $d[d.type];
      u && c[u]();
    });
  }, [r, t, i, a, l]);
}
const Sd = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : re(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function Rd(e, a) {
  return Sd[a](e);
}
function Td({ item: e, connection: a }) {
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
function Ld({ reason: e }) {
  return e ? /* @__PURE__ */ o("p", { className: J.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function Ad({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: J.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: J.field, children: Rd(e, t) }, t)) });
}
const Pa = (e) => e ? !0 : void 0;
function xd(e) {
  return { "--stream": Le(e.streamStep, "id") };
}
function Id(e, a, t) {
  e == null || e(a, t);
}
function Md(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function qd({ item: e, stale: a }) {
  var r, l;
  const t = ((l = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : l.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: J.last, "data-stale": Pa(a), children: t }) : null;
}
function $a(e) {
  const a = e.fields ?? [], t = e.item, r = y(null);
  Cd(r, t.key, e.feed);
  const l = Md(e.feed), i = xd(t);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: J.card,
      style: i,
      "data-selected": Pa(e.selected),
      "data-flagged": Pa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: J.hit, onClick: (s) => Id(e.onOpen, t.key, s.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ o("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(Ed, { item: t }),
        /* @__PURE__ */ n("p", { className: J.title, children: t.title }),
        /* @__PURE__ */ n(Td, { item: t, connection: l }),
        /* @__PURE__ */ n(Ld, { reason: t.blockedReason }),
        /* @__PURE__ */ n(Ad, { item: t, fields: a }),
        /* @__PURE__ */ n(qd, { item: t, stale: l === "stale" })
      ]
    }
  );
}
const Pd = "_column_10sxg_3", Bd = "_head_10sxg_24", Od = "_label_10sxg_33", Dd = "_count_10sxg_42", jd = "_list_10sxg_56", Je = {
  column: Pd,
  head: Bd,
  label: Od,
  count: Dd,
  list: jd
};
function Dn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function Hd({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ o("div", { className: Je.head, children: [
    /* @__PURE__ */ n("h2", { className: Je.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ o("span", { className: Je.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function Fd(e) {
  return /* @__PURE__ */ n("div", { className: Je.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      $a,
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
function Wd({ column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, onKeyDown: d }) {
  const u = $(), h = e.cap !== void 0 && a.length > e.cap, f = Dn(a, r);
  return /* @__PURE__ */ o("section", { className: Je.column, "aria-labelledby": u, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: d, children: [
    /* @__PURE__ */ n(Hd, { column: e, count: a.length, id: u }),
    /* @__PURE__ */ n(Fd, { column: e, items: a, fields: t, sort: r, onOpen: l, selectedKey: i, feed: s, roving: c, rows: f }),
    h && /* @__PURE__ */ n(ud, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const zd = "_foot_8qg4p_2", Gd = "_note_8qg4p_13", Ud = "_link_8qg4p_19", Ta = {
  foot: zd,
  note: Gd,
  link: Ud
};
function q$({ configureHref: e }) {
  return /* @__PURE__ */ o("footer", { className: Ta.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: Ta.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${Ta.link} ward-target`, href: W(e), children: "Configure board" })
  ] });
}
const Kd = "_head_1la6p_3", Vd = "_identity_1la6p_12", Yd = "_titleRow_1la6p_18", Xd = "_title_1la6p_18", Jd = "_key_1la6p_35", Qd = "_rollup_1la6p_45", Zd = "_tools_1la6p_53", eu = "_swatch_1la6p_62", au = "_mark_1la6p_69", pe = {
  head: Kd,
  identity: Vd,
  titleRow: Yd,
  title: Xd,
  key: Jd,
  rollup: Qd,
  tools: Zd,
  swatch: eu,
  mark: au
}, _n = "initials:";
function nu(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function tu(e) {
  const a = [nu(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${se(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${se(e.p90)}`), a.join(" · ");
}
function ru(e) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ o("span", { title: e.inFlightHint, children: [
      ae(e.inFlight),
      " in flight"
    ] }),
    " · ",
    tu(e)
  ] });
}
function lu(e) {
  return e.startsWith(_n) ? e.slice(_n.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function ou({ markRef: e, streamStep: a }) {
  const t = { "--stream": Le(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${pe.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: lu(e) }) : /* @__PURE__ */ n("span", { className: pe.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function iu({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function P$({
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
        /* @__PURE__ */ n(ou, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: pe.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: pe.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: pe.rollup, "aria-live": "polite", children: ru(a) })
    ] }),
    /* @__PURE__ */ o("div", { className: pe.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(iu, { owners: l, owner: i, onOwnerChange: s }),
      c === void 0 ? null : /* @__PURE__ */ n(_, { onClick: c, children: "Configure board" }),
      d,
      /* @__PURE__ */ n(Va, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const su = "_head_kabyh_11", cu = "_line_kabyh_12", du = "_cHandle_kabyh_33", uu = "_cName_kabyh_38", hu = "_nameLine_kabyh_46", mu = "_cLabel_kabyh_53", wu = "_cCap_kabyh_58", _u = "_cShown_kabyh_63", fu = "_name_kabyh_46", vu = "_noCap_kabyh_85", bu = "_state_kabyh_99", pu = "_handle_kabyh_104", gu = "_sub_kabyh_118", P = {
  head: su,
  line: cu,
  cHandle: du,
  cName: uu,
  nameLine: hu,
  cLabel: mu,
  cCap: wu,
  cShown: _u,
  name: fu,
  noCap: vu,
  state: bu,
  handle: pu,
  sub: gu
}, yu = "can't be hidden or collapsed", Nu = "terminal · counted, not a column";
function B$() {
  return /* @__PURE__ */ o("div", { className: P.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: P.cHandle }),
    /* @__PURE__ */ n("span", { className: P.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: P.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: P.cShown, children: "Shown" })
  ] });
}
function ku(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function $u(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function fn(e) {
  return e.gate ? yu : e.terminal ? Nu : $u(e.agentsMounted);
}
function Cu(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function Su({ stage: e }) {
  return /* @__PURE__ */ o("span", { className: P.cName, children: [
    /* @__PURE__ */ o("span", { className: P.nameLine, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    fn(e) && /* @__PURE__ */ n("span", { className: P.sub, children: fn(e) })
  ] });
}
function Ru(e) {
  return e === void 0 ? "" : String(e);
}
function Tu(e) {
  return e === "" ? void 0 : Number(e);
}
function Eu({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: P.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: P.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => Cu(t, a),
      children: "⠿"
    }
  ) });
}
function Lu({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${P.cCap} ${P.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: P.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: Ru(a.cap), onChange: (r) => t({ ...a, cap: Tu(r) }) }) });
}
function Au({ stage: e, config: a, onChange: t }) {
  const r = ku(e, a.shown);
  return /* @__PURE__ */ o("span", { className: P.cShown, children: [
    /* @__PURE__ */ n(De, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (l) => t({ ...a, shown: l }) }),
    /* @__PURE__ */ n("span", { className: P.state, "aria-hidden": "true", children: r.state })
  ] });
}
function xu(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function O$({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ o("div", { className: P.line, "data-kind": xu(e), children: [
    /* @__PURE__ */ n(Eu, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(Su, { stage: e }),
    /* @__PURE__ */ n("span", { className: P.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (l) => t({ ...a, label: l }) }) }),
    /* @__PURE__ */ n(Lu, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(Au, { stage: e, config: a, onChange: t })
  ] });
}
const Iu = "_body_hn6d6_2", Mu = "_head_hn6d6_9", qu = "_summary_hn6d6_19", Pu = "_block_hn6d6_20", Bu = "_actionsBlock_hn6d6_21", Ou = "_title_hn6d6_41", Du = "_note_hn6d6_46", ju = "_k_hn6d6_51", Hu = "_kv_hn6d6_58", Fu = "_row_hn6d6_64", Wu = "_label_hn6d6_75", zu = "_value_hn6d6_84", Gu = "_quote_hn6d6_90", Uu = "_actions_hn6d6_21", Ku = "_resolve_hn6d6_103", B = {
  body: Iu,
  head: Mu,
  summary: qu,
  block: Pu,
  actionsBlock: Bu,
  title: Ou,
  note: Du,
  k: ju,
  kv: Hu,
  row: Fu,
  label: Wu,
  value: zu,
  quote: Gu,
  actions: Uu,
  resolve: Ku
};
function Vu(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Yu(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Xu(e) {
  const a = ga(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Ju(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...ya(Xu(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", se(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Vu(e),
    ...Yu(e, a)
  ];
}
function Qu({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ o("section", { className: B.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: B.k, children: a }),
    e
  ] });
}
function Zu({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ o("div", { className: B.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function eh({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ o("div", { className: B.block, children: [
    /* @__PURE__ */ n("p", { className: B.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: B.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: B.note, children: e.agentMeta })
  ] }) : null;
}
function D$({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: l, resolve: i, resolveLabel: s, actionsNote: c }) {
  const d = $(), u = Ju(e, l);
  return /* @__PURE__ */ n(ea, { kind: "drawer", labelledBy: d, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ o("div", { className: B.body, children: [
    /* @__PURE__ */ n(Zu, { item: e }),
    /* @__PURE__ */ o("div", { className: B.summary, children: [
      /* @__PURE__ */ n("h2", { className: B.title, id: d, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: B.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: B.kv, children: u.map(([h, f]) => /* @__PURE__ */ o("div", { className: B.row, children: [
      /* @__PURE__ */ n("dt", { className: B.label, children: h }),
      /* @__PURE__ */ n("dd", { className: B.value, children: f })
    ] }, h)) }),
    /* @__PURE__ */ n(eh, { item: e }),
    /* @__PURE__ */ o("div", { className: B.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: B.actions, children: a }),
      c && /* @__PURE__ */ n("p", { className: B.note, children: c })
    ] }),
    /* @__PURE__ */ n(Qu, { resolve: i, label: s ?? "Ways out of this hold" })
  ] }) });
}
const ah = "_root_3azmy_2", nh = "_list_3azmy_7", th = "_item_3azmy_12", rh = "_box_3azmy_18", lh = "_text_3azmy_23", oh = "_note_3azmy_28", ze = {
  root: ah,
  list: nh,
  item: th,
  box: rh,
  text: lh,
  note: oh
};
function Ca({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ o("div", { className: ze.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${ze.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ o("li", { className: `${ze.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: ze.box, children: /* @__PURE__ */ n(Ka, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: ze.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${ze.note} ward-checklist-note`, children: a })
  ] });
}
const ih = "_rail_ke7ch_2", sh = "_k_ke7ch_11", ch = "_head_ke7ch_19", dh = "_section_ke7ch_25", uh = "_card_ke7ch_38", hh = "_strip_ke7ch_42", mh = "_skeleton_ke7ch_56", wh = "_skeletonLabel_ke7ch_70", _h = "_bar_ke7ch_76", fh = "_note_ke7ch_85", he = {
  rail: ih,
  k: sh,
  head: ch,
  section: dh,
  card: uh,
  strip: hh,
  skeleton: mh,
  skeletonLabel: wh,
  bar: _h,
  note: fh
};
function vh(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ea({ title: e, children: a }) {
  return /* @__PURE__ */ o("section", { className: he.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: he.k, children: e }),
    a
  ] });
}
function bh({ column: e, count: a }) {
  return /* @__PURE__ */ o("div", { className: he.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: he.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: he.bar, "aria-hidden": "true" }, r))
  ] });
}
function ph({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((l) => /* @__PURE__ */ n(Wd, { column: l, items: a.filter((i) => i.stage === l.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, l.id));
}
function gh(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(ph, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(bh, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function j$(e) {
  const a = vh(e.onOpen), t = Dn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ o("aside", { className: he.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${he.k} ${he.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ea, { title: "Card", children: /* @__PURE__ */ n("div", { className: he.card, children: t && /* @__PURE__ */ n($a, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ o(Ea, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: he.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(gh, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: he.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ea, { title: "Effect of this config", children: /* @__PURE__ */ n(Ca, { items: e.effects, density: "compact" }) })
  ] });
}
function yh(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Nh(e) {
  return Math.ceil(e.length / 2);
}
function kh(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function jn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function $h(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const l = jn(e);
  l !== void 0 && t(l), r(kh(e.type));
}
function Ch(e, a, t, r, l) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => $h(i, t, r, l));
  }, [e, a, t, r, l]);
}
function Sh(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function Rh(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function Th(e, a) {
  return a !== void 0 ? se(e.timeInStage) + " · waits on " + a.agent : se(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function Eh(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + G.height.card + " + " + G.height.cardRow + " * " + String(Nh(a ?? [])) + ")"
  };
}
function Lh(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function Ah(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: re(e.cost) }) : null;
}
function xh(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function Ih(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function Mh(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function qh(e, a) {
  return a === void 0 ? e : yh(e, a.ref);
}
function Ph(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ze(e) {
  return e === !0 ? "true" : void 0;
}
function Hn(e) {
  const a = e.item, t = a.run, r = t !== void 0, l = y(null), i = la(l), s = y(/* @__PURE__ */ new Set()), [c, d] = p(Sh(a));
  Ch(e.feed, a.key, s, d, i);
  const u = Rh(a, r), h = Th(a, t), f = Eh(a, e.fields), b = Mh(a, t, c);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      ...Ph(e),
      className: "ward-workcard",
      "data-flagged": Ze(a.flagged),
      "data-selected": Ze(e.selected),
      style: f,
      ref: qh(l, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        Lh(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: u.role, label: u.label }),
          Ah(a, e.fields),
          xh(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ o("span", { className: "ward-workcard-lastrow", children: [
          Ih(t, c, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function Bh({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + ". Move " + String(e - a) + " out or raise the cap." });
}
function Oh(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function Dh(e, a, t) {
  return /* @__PURE__ */ o("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function jh(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(Bh, { count: e.items.length, cap: e.column.cap });
}
function Hh(e, a) {
  return e.roving ?? a;
}
function Fh(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function Wh(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Hn,
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
function zh(e) {
  const a = $(), t = va({ orientation: "vertical" }), r = Hh(e, t), l = Oh(e);
  return /* @__PURE__ */ o("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ze(l), "data-gate": Ze(e.column.gate), children: [
    Dh(e.column, e.items.length, a),
    jh(e, l),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...Fh(e, t), children: Wh(e, r) })
  ] });
}
function Gh(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + se(e.p50)), e.p90 !== void 0 && (a += " · p90 " + se(e.p90)), a;
}
function Uh(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Kh(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function H$(e) {
  return /* @__PURE__ */ o("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Gh(e.rollups) })
    ] }),
    /* @__PURE__ */ o("div", { className: "ward-chiprow", children: [
      Uh(e),
      Kh(e.onConfigure),
      /* @__PURE__ */ n(Va, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Vh(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Yh(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(De, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(De, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Xh(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ o(R, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function F$(e) {
  const a = e.stage;
  return /* @__PURE__ */ o("div", { className: "ward-configrow", "data-mandatory": Ze(Vh(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Yh(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(An, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Xh(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function W$(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ o("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Hn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(zh, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ o("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Jh(e, a) {
  const t = jn(e);
  t !== void 0 && a(t);
}
function Qh(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Jh(r, t));
  }, [e, a, t]);
}
function Zh(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function em(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", se(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", re(e.cost)]), a;
}
function am(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ke, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function nm(e, a) {
  return /* @__PURE__ */ o(R, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function z$(e) {
  var s;
  const a = e.item, t = a.run, [r, l] = p((s = a.run) == null ? void 0 : s.lastStep);
  Qh(e.feed, a.key, l);
  const i = [...Zh(a), ...em(a)];
  return /* @__PURE__ */ o(ea, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ o("dl", { className: "ward-kv", children: [
      i.map((c) => /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ n("dt", { children: c[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(c[1]), children: c[1] })
      ] }, c[0])),
      am(t, r)
    ] }),
    nm(a, e.actions)
  ] });
}
const tm = "_card_d2vbe_2", rm = "_head_d2vbe_22", lm = "_mark_d2vbe_30", om = "_name_d2vbe_42", im = "_chips_d2vbe_63", sm = "_description_d2vbe_69", cm = "_run_d2vbe_74", dm = "_sep_d2vbe_83", um = "_facts_d2vbe_88", hm = "_fact_d2vbe_88", mm = "_factLabel_d2vbe_101", wm = "_factValue_d2vbe_105", le = {
  card: tm,
  head: rm,
  mark: lm,
  name: om,
  chips: im,
  description: sm,
  run: cm,
  sep: dm,
  facts: um,
  fact: hm,
  factLabel: mm,
  factValue: wm
}, _m = { live: "done", draft: "running", paused: "meta" };
function fm(e) {
  return e === void 0 ? le.card : `${le.card} ${e}`;
}
function vm({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: le.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: _m[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function bm({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: le.description, children: e });
}
function pm({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ o("p", { className: le.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: le.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function gm({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: le.facts, children: e.map((a) => /* @__PURE__ */ o("div", { className: le.fact, children: [
    /* @__PURE__ */ n("dt", { className: le.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: le.factValue, children: a.value })
  ] }, a.label)) });
}
function ym(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Nm({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: l, facts: i, className: s }) {
  const c = { "--stream": Le(e.streamStep, "id") }, d = t ? "true" : void 0;
  return /* @__PURE__ */ o(
    "article",
    {
      "aria-current": d,
      className: fm(s),
      style: c,
      "data-selected": d,
      "data-paused": ym(e.versions),
      "data-ward-rowlink": !0,
      children: [
        /* @__PURE__ */ o("h3", { className: le.head, children: [
          /* @__PURE__ */ n("span", { className: le.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${le.name} ward-rowlink ward-target`, href: W(a), "aria-current": d, children: e.name })
        ] }),
        /* @__PURE__ */ n(bm, { description: e.description }),
        /* @__PURE__ */ n(pm, { run: e.run, connection: r, lastEvent: l }),
        /* @__PURE__ */ n(vm, { versions: e.versions }),
        /* @__PURE__ */ n(gm, { facts: i })
      ]
    }
  );
}
const km = "_list_4dcyc_2", $m = "_row_4dcyc_11", Cm = "_head_4dcyc_23", Sm = "_id_4dcyc_30", Rm = "_lock_4dcyc_35", Tm = "_reason_4dcyc_41", Em = "_remove_4dcyc_46", Lm = "_clauses_4dcyc_50", Am = "_clause_4dcyc_50", xm = "_label_4dcyc_64", Im = "_cell_4dcyc_71", Mm = "_value_4dcyc_76", ie = {
  list: km,
  row: $m,
  head: Cm,
  id: Sm,
  lock: Rm,
  reason: Tm,
  remove: Em,
  clauses: Lm,
  clause: Am,
  label: xm,
  cell: Im,
  value: Mm
}, Fn = He(!1);
function G$({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Fn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ie.list, "aria-label": a, children: e }) });
}
function qm({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ie.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (l) => t(e.key, l) });
}
function Pm({ reason: e }) {
  return /* @__PURE__ */ o("span", { className: ie.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ie.reason, children: e })
  ] });
}
function Bm({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ o("span", { className: ie.head, children: [
    /* @__PURE__ */ n("span", { className: ie.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(Pm, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ie.remove, children: /* @__PURE__ */ o(_, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function vn(e, a) {
  return e.locked ? void 0 : a;
}
function U$({ rule: e, onChange: a, onRemove: t }) {
  if (!je(Fn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = vn(e, a);
  return /* @__PURE__ */ o("li", { className: ie.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Bm, { rule: e, onRemove: vn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ie.clauses, children: e.clauses.map((l) => /* @__PURE__ */ o("div", { className: ie.clause, children: [
      /* @__PURE__ */ n("dt", { className: ie.label, children: l.label }),
      /* @__PURE__ */ n("dd", { className: ie.cell, children: /* @__PURE__ */ n(qm, { clause: l, ruleId: e.id, onChange: r }) })
    ] }, l.key)) })
  ] });
}
const Om = "_ladder_wwnch_2", Dm = "_cell_wwnch_7", jm = "_empty_wwnch_26", Hm = "_name_wwnch_34", Fm = "_holder_wwnch_40", Wm = "_request_wwnch_46", zm = "_swatches_wwnch_51", Gm = "_swatch_wwnch_51", Um = "_tilesFrame_wwnch_78", Km = "_tiles_wwnch_78", Vm = "_tile_wwnch_78", Ym = "_bar_wwnch_117", Xm = "_hex_wwnch_128", Jm = "_note_wwnch_138", E = {
  ladder: Om,
  cell: Dm,
  empty: jm,
  name: Hm,
  holder: Fm,
  request: Wm,
  swatches: zm,
  swatch: Gm,
  tilesFrame: Um,
  tiles: Km,
  tile: Vm,
  bar: Ym,
  hex: Xm,
  note: Jm
}, Qm = "not validated yet, pending a CVD matrix and dark stepping";
function Zm(e) {
  return e.reserved ? "reserved" : pa(e.step) ? "validated" : "partial";
}
function Wn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function ew(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function aw({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ae, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function nw(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function tw(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const bn = (e) => String(e).padStart(2, "0");
function rw(e, a, t) {
  return e === "reserved" ? "Reserved until revalidated" : t ? "yours" : a ?? Wn(e, void 0);
}
function lw({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: r ? `step ${bn(e)}` : Wt(e) }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: r ? t : `Step ${bn(e)} · ${t}` })
  ] });
}
function ow({ step: e, value: a, taken: t, onChange: r, presentation: l }) {
  const i = Zm(e), s = Wn(i, t), c = s !== "free", d = a === e.step, u = e.name ?? `Step ${e.step}`, h = () => {
    c || r(e.step);
  }, f = `${u} · ${l === "tiles" && d ? "yours" : s}`;
  return { shared: { role: "radio", "aria-label": f, ...tw(c, d), "data-validation": i, style: ew(e, i), onClick: h, onKeyDown: (g) => nw(g, h) }, label: f, name: u, holder: s, validation: i, note: rw(i, t, d), step: e.step };
}
const iw = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${E.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${E.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(lw, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ o("span", { ...e.shared, className: `${E.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(aw, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function sw(e) {
  return iw[e.presentation](ow(e));
}
function cw(e) {
  for (const a of e)
    if (!a.reserved && !ba(a.step)) throw new Error("colour ladder renders token steps only");
}
function dw() {
  return /* @__PURE__ */ o("div", { className: `${E.cell} ward-ladder-cell ${E.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function uw(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const hw = { list: E.ladder, swatches: E.swatches, tiles: E.tilesFrame };
function mw() {
  return /* @__PURE__ */ o("div", { className: `${E.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${E.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${E.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${E.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const ww = { list: dw, swatches: () => null, tiles: mw };
function zn(e) {
  const a = e.takenBy ?? {}, t = (s) => {
    var c;
    (c = e.onChange) == null || c.call(e, s);
  };
  cw(e.steps);
  const r = uw(e), l = ww[r], i = /* @__PURE__ */ o(R, { children: [
    e.steps.map((s) => /* @__PURE__ */ n(sw, { step: s, value: e.value, taken: a[s.step], onChange: t, presentation: r }, s.step)),
    /* @__PURE__ */ n(l, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour, validated steps only", className: `${hw[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: E.tiles, children: i }) : i });
}
const _w = "_rail_1el2t_2", fw = "_section_1el2t_12", vw = "_sectionFlush_1el2t_22", bw = "_head_1el2t_26", pw = "_headLabel_1el2t_34", gw = "_sample_1el2t_42", yw = "_sampleLabel_1el2t_47", Nw = "_sampleTitle_1el2t_54", kw = "_sampleMeta_1el2t_59", $w = "_trace_1el2t_65", Cw = "_traceHead_1el2t_70", Sw = "_steps_1el2t_78", Rw = "_step_1el2t_78", Tw = "_stepTitle_1el2t_97", Ew = "_hollow_1el2t_107", Lw = "_stepBody_1el2t_115", Aw = "_stepDetail_1el2t_127", xw = "_publish_1el2t_132", Iw = "_reason_1el2t_138", Mw = "_note_1el2t_143", qw = "_reveal_1el2t_148", N = {
  rail: _w,
  section: fw,
  sectionFlush: vw,
  head: bw,
  headLabel: pw,
  sample: gw,
  sampleLabel: yw,
  sampleTitle: Nw,
  sampleMeta: kw,
  trace: $w,
  traceHead: Cw,
  steps: Sw,
  step: Rw,
  stepTitle: Tw,
  hollow: Ew,
  stepBody: Lw,
  stepDetail: Aw,
  publish: xw,
  reason: Iw,
  note: Mw,
  reveal: qw
}, pn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, Pw = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, Bw = { ok: "greenFill", finding: "orangeFill", action: "blue" }, Ow = { notSimulated: "not simulated", running: "running" };
function Dw(e) {
  return e.presentation === "foundry";
}
function jw(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet: ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function Hw(e, a) {
  var r;
  const t = Pw[e.status];
  return t !== void 0 ? t : ((r = a.find((l) => !l.met)) == null ? void 0 : r.text) ?? null;
}
function Fw(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function Ww(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function zw(e) {
  if (Fw(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Gw(e) {
  const [a, t] = p(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${N.step} ${N.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Uw(e) {
  const a = Ow[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: N.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ae, { size: 6, kind: Bw[e.kind], label: e.kind });
}
function Kw(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ o("span", { className: N.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Vw(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Yw(e) {
  const { step: a } = e;
  return /* @__PURE__ */ o(Gw, { kind: a.kind, children: [
    /* @__PURE__ */ n(Uw, { kind: a.kind }),
    /* @__PURE__ */ o("span", { className: N.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: N.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Kw, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Vw, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Xw(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(se(a)), t.join(" · ");
}
function Gn(e) {
  const a = $();
  return e.steps.length === 0 ? null : /* @__PURE__ */ o("section", { className: `${N.trace} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.traceHead, id: a, children: Xw(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: N.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Yw, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Jw(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ o("div", { className: `${N.sample} ${N.section}`, children: [
    /* @__PURE__ */ n("p", { className: N.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ o("p", { className: N.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ o("p", { className: N.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Qw(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + ce(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${N.sampleMeta} ${N.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Zw(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : re(e.run.cost), label: "Cost" }, { value: e.run.turns ? Tn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function e_(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: re(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: Tn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function a_(e) {
  const a = e_(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ o("p", { className: N.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: N.sectionFlush, children: /* @__PURE__ */ n(Na, { divided: !0, cells: a }) });
}
function Un(e) {
  const a = $();
  return e.reason !== null ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: `${N.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(_, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function n_(e) {
  return /* @__PURE__ */ o("div", { className: `${N.publish} ${N.section}`, children: [
    /* @__PURE__ */ n(Un, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: N.note, children: e.note })
  ] });
}
function t_(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${N.publish} ${N.section}`, children: /* @__PURE__ */ n(Un, { reason: e.reason, onPublish: e.onPublish }) });
}
function Kn(e) {
  return /* @__PURE__ */ o("div", { className: `${N.head} ${N.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: N.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: pn[e.run.status].role, label: pn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ke, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function r_(e, a) {
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
function l_(e) {
  var t;
  Ww(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Kn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Jw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Gn, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Zw, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist }) }),
    /* @__PURE__ */ n(n_, { reason: jw(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function o_(e) {
  var r;
  const a = r_(e.run, e.feed);
  zw(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("aside", { className: `${N.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(Kn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Qw, { sample: e.run.sample }),
    /* @__PURE__ */ n(Gn, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(a_, { run: e.run }),
    /* @__PURE__ */ n("div", { className: N.section, children: /* @__PURE__ */ n(Ca, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(t_, { reason: Hw(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function K$(e) {
  return Dw(e) ? /* @__PURE__ */ n(o_, { ...e }) : /* @__PURE__ */ n(l_, { ...e });
}
const i_ = "_list_142ip_3", s_ = "_row_142ip_9", c_ = "_condition_142ip_18", d_ = "_action_142ip_24", oa = {
  list: i_,
  row: s_,
  condition: c_,
  action: d_
}, Vn = He(!1);
function V$({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(Vn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: oa.list, "aria-label": a, children: e }) });
}
function Y$({ rule: e }) {
  if (!je(Vn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ o("li", { className: oa.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: oa.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: oa.action, children: e.then })
  ] });
}
function Ba(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [l] = r.splice(a, 1);
  return r.splice(t, 0, l), r;
}
function Yn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Xn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function gn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function u_(e) {
  return e === "up" ? "down" : "up";
}
function h_(e, a) {
  const t = gn(e, a.id, a.direction) ?? gn(e, a.id, u_(a.direction));
  t == null || t.focus();
}
function Jn() {
  const e = y(null), [a, t] = p(null), [r, l] = p("");
  return x(() => {
    e.current !== null && a !== null && h_(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (s, c) => {
    t(s), l(c);
  } };
}
function Qn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function ha({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const m_ = "_body_1h15q_2", w_ = "_title_1h15q_8", __ = "_section_1h15q_13", f_ = "_legend_1h15q_18", v_ = "_stages_1h15q_26", b_ = "_stage_1h15q_26", p_ = "_stageIndex_1h15q_44", g_ = "_stageName_1h15q_50", y_ = "_footer_1h15q_59", N_ = "_note_1h15q_66", k_ = "_reason_1h15q_71", $_ = "_actions_1h15q_76", C_ = "_webHead_1h15q_83", S_ = "_kicker_1h15q_92", R_ = "_webTitle_1h15q_99", T_ = "_webBody_1h15q_105", E_ = "_webSection_1h15q_109", L_ = "_sectionHead_1h15q_121", A_ = "_sectionNote_1h15q_129", x_ = "_formLabel_1h15q_134", I_ = "_identityRow_1h15q_139", M_ = "_nameCell_1h15q_145", q_ = "_keyCell_1h15q_150", P_ = "_colourCell_1h15q_154", B_ = "_colourStatus_1h15q_161", O_ = "_webStages_1h15q_166", D_ = "_webStageList_1h15q_172", j_ = "_webStage_1h15q_166", H_ = "_webIndex_1h15q_191", F_ = "_webStageName_1h15q_196", W_ = "_webMoves_1h15q_201", z_ = "_addStage_1h15q_215", G_ = "_addStageButton_1h15q_223", U_ = "_addStageNote_1h15q_231", K_ = "_webFooter_1h15q_236", V_ = "_webFooterNotes_1h15q_244", Y_ = "_webNote_1h15q_251", w = {
  body: m_,
  title: w_,
  section: __,
  legend: f_,
  stages: v_,
  stage: b_,
  stageIndex: p_,
  stageName: g_,
  footer: y_,
  note: N_,
  reason: k_,
  actions: $_,
  webHead: C_,
  kicker: S_,
  webTitle: R_,
  webBody: T_,
  webSection: E_,
  sectionHead: L_,
  sectionNote: A_,
  formLabel: x_,
  identityRow: I_,
  nameCell: M_,
  keyCell: q_,
  colourCell: P_,
  colourStatus: B_,
  webStages: O_,
  webStageList: D_,
  webStage: j_,
  webIndex: H_,
  webStageName: F_,
  webMoves: W_,
  addStage: z_,
  addStageButton: G_,
  addStageNote: U_,
  webFooter: K_,
  webFooterNotes: V_,
  webNote: Y_
}, X_ = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Zn = "not in catalogue";
function J_(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} · ${Zn}` }, ...t];
}
function Q_({ stage: e, index: a, catalogue: t, onName: r }) {
  const l = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: l, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Zn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: l, value: e.name, options: J_(t, e.name), invalid: i, onChange: r });
}
function et(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Z_(e) {
  const a = y([]), t = y(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function ef({ id: e, stage: a, index: t, total: r, catalogue: l, onReplace: i, onMove: s }) {
  const c = et(a, t), d = a.kind === "gate";
  return /* @__PURE__ */ o("li", { className: `${w.webStage} ward-stageedit`, "data-gate": d ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Q_, { stage: a, index: t, catalogue: l, onName: (u) => i({ ...a, name: u }) }) }),
    /* @__PURE__ */ n(A, { variant: d ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: X_, onChange: (u) => i({ ...a, kind: u }) }),
    /* @__PURE__ */ o("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "up", onMove: () => s("up") }),
      t < r - 1 && /* @__PURE__ */ n(ha, { id: e, name: c, direction: "down", onMove: () => s("down") })
    ] })
  ] });
}
function af({ stages: e, onChange: a, catalogue: t }) {
  const r = Z_(e.length), l = Jn(), i = (c, d) => {
    const u = Yn(c, d);
    r.current = Ba(r.current, c, u), l.moved({ id: r.current[u], direction: d }, Xn(et(e[c], c), u, e.length)), a(Ba(e, c, u));
  }, s = (c, d) => a(e.map((u, h) => h === c ? d : u));
  return /* @__PURE__ */ o("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: l.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((c, d) => /* @__PURE__ */ n(ef, { id: r.current[d], stage: c, index: d, total: e.length, catalogue: t, onReplace: (u) => s(d, u), onMove: (u) => i(d, u) }, r.current[d])) }),
    /* @__PURE__ */ n(Qn, { text: l.announcement }),
    /* @__PURE__ */ o("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const nf = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], tf = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], rf = "A new stream starts as a draft. Nothing runs on it until you publish it.", lf = "Create is disabled: name the stream and give it a key first.", of = "reorder with the ↑ ↓ buttons · min 2";
function Xa(e, a) {
  return !e.reserved && pa(e.step) && a[e.step] === void 0;
}
function sf(e, a) {
  const t = e.find((r) => Xa(r, a));
  return t ? t.step : 1;
}
function cf({ stages: e, onMove: a }) {
  const t = Jn(), r = (l, i) => {
    const s = Yn(l, i);
    t.moved({ id: e[l].id, direction: i }, Xn(e[l].name, s, e.length)), a(l, s);
  };
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((l, i) => /* @__PURE__ */ o("li", { className: w.stage, "data-gate": l.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: l.name }),
      l.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(ha, { id: l.id, name: l.name, direction: "down", onMove: () => r(i, "down") })
    ] }, l.id)) }),
    /* @__PURE__ */ n(Qn, { text: t.announcement })
  ] });
}
function df({ reason: e, onCreate: a, onDraft: t }) {
  const r = $();
  return /* @__PURE__ */ o("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: rf }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ o("div", { className: w.actions, children: [
      /* @__PURE__ */ n(_, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function uf(e, a) {
  return e !== "" && a !== "" ? null : lf;
}
function hf(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: l = tf, onCreate: i, onDraft: s, onClose: c, returnFocusTo: d } = e, u = $(), [h, f] = p(""), [b, g] = p(""), [I, j] = p(a[0].value), [oe, $e] = p(() => sf(t, r)), [ne, Fe] = p(e.stages ?? nf), [We, C] = p(l[0].value), z = { name: h, key: b, streamStep: oe, owner: I, stages: ne, policy: We }, fe = uf(h, b);
  return /* @__PURE__ */ n(ea, { kind: "modal", labelledBy: u, onClose: c, returnFocusTo: d, children: /* @__PURE__ */ o("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: u, children: "New stream" }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: f }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: g, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: I, onChange: j, options: a })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(zn, { label: "Stream colour", steps: t, value: oe, onChange: $e, takenBy: r })
    ] }),
    /* @__PURE__ */ o("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(cf, { stages: ne, onMove: (xe, Ct) => Fe(Ba(ne, xe, Ct)) })
    ] }),
    /* @__PURE__ */ n(qn, { legend: "Loop policy", options: l, value: We, onChange: C }),
    /* @__PURE__ */ n(df, { reason: fe, onCreate: () => i(z), onDraft: () => s(z) })
  ] }) });
}
const at = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], mf = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function wf(e, a, t, r, l, i) {
  var c;
  const s = ((c = at.find((d) => d.value === l)) == null ? void 0 : c.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: s, stages: i };
}
function _f(e, a) {
  return ff(e) && vf(e, a) && bf(e);
}
function ff(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function vf(e, a) {
  return e.colourStep !== null && Xa({ step: e.colourStep }, a);
}
function bf(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function pf(e, a) {
  return e === null ? `Colour: none picked. Choose a free validated step; steps 4–6 are ${Qm}.` : Xa({ step: e }, a) ? `Colour: step ${e} is validated and free.` : `Colour: step ${e} cannot be used.`;
}
function gf({ stage: e }) {
  return e ? /* @__PURE__ */ o("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function yf({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: l, reasonId: i }) {
  return /* @__PURE__ */ o("div", { className: w.webFooter, children: [
    /* @__PURE__ */ o("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(gf, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: mf })
    ] }),
    l && /* @__PURE__ */ n(_, { variant: "secondary", onClick: () => l(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Nf({ titleId: e }) {
  return /* @__PURE__ */ o("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function kf({ name: e, setName: a, streamKey: t, setKey: r, colour: l, owner: i }) {
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
function $f(e) {
  const a = $(), t = $(), r = e.takenBy ?? {}, [l, i] = p(""), [s, c] = p(""), [d, u] = p(e.owners[0] ?? ""), [h, f] = p(null), [b, g] = p("relay"), [I, j] = p([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), oe = wf(l, s, d, h, b, I), $e = _f(oe, r), ne = I.find((C) => C.kind === "agent" && C.name.trim() !== ""), Fe = /* @__PURE__ */ o("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(zn, { presentation: "swatches", label: "Stream colour, validated steps only", steps: e.ladder, value: h, onChange: f, takenBy: r })
  ] }), We = /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: pf(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner, accountable for every agent published here", value: d, options: e.owners.map((C) => ({ value: C, label: C })), onChange: u })
  ] });
  return /* @__PURE__ */ o(ea, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Nf, { titleId: t }),
    /* @__PURE__ */ o("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(kf, { name: l, setName: i, streamKey: s, setKey: c, colour: Fe, owner: We }),
      /* @__PURE__ */ o("section", { className: w.webSection, children: [
        /* @__PURE__ */ o("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: of })
        ] }),
        /* @__PURE__ */ n(af, { stages: I, onChange: j })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(qn, { variant: "cards", legend: "03 · Write policy, inherited by every agent on this stream", value: b, options: at, onChange: g }) }),
      /* @__PURE__ */ n(yf, { ready: $e, draft: oe, agentStage: ne, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function X$(e) {
  return "presentation" in e ? /* @__PURE__ */ n($f, { ...e }) : /* @__PURE__ */ n(hf, { ...e });
}
const Cf = "_row_bs8hc_2", Sf = "_cell_bs8hc_6", Rf = "_condition_bs8hc_11", Tf = "_action_bs8hc_18", Ef = "_contract_bs8hc_24", Lf = "_contractCondition_bs8hc_33", Af = "_contractAction_bs8hc_39", Q = {
  row: Cf,
  cell: Sf,
  condition: Rf,
  action: Tf,
  contract: Ef,
  contractCondition: Lf,
  contractAction: Af
}, nt = ["advance", "block", "escalate", "requestReview"], yn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function ma(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Ja(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: Q.action, children: yn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (l) => a({ ...e, then: l }),
      options: nt.map((l) => ({ value: l, label: yn[l] }))
    }
  );
}
function xf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n("span", { className: Q.condition, title: ma(e, r), children: ma(e, r) }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function If({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("tr", { className: Q.row, children: [
    /* @__PURE__ */ o("td", { className: Q.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: Q.condition, children: ma(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: Q.cell, children: Ja(e, a, t) })
  ] });
}
function Mf({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ o("li", { className: Q.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractCondition, children: ma(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: Q.contractAction, children: Ja(e, a, t, !0) })
  ] });
}
const qf = { two: If, four: xf, contract: Mf };
function J$(e) {
  var t;
  if (!nt.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = qf[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const Pf = "_column_k4nls_2", Bf = "_head_k4nls_17", Of = "_index_k4nls_23", Df = "_name_k4nls_29", jf = "_meta_k4nls_38", Hf = "_mono_k4nls_43", Ff = "_gate_k4nls_50", Wf = "_reviewersLabel_k4nls_57", zf = "_reviewers_k4nls_57", Gf = "_reviewer_k4nls_57", Uf = "_agents_k4nls_74", Kf = "_workflowColumn_k4nls_79", Vf = "_workflowHead_k4nls_96", Yf = "_stageRow_k4nls_102", Xf = "_stageLabel_k4nls_109", Jf = "_workflowTitle_k4nls_116", Qf = "_workflowMeta_k4nls_122", Zf = "_workflowGate_k4nls_127", ev = "_gateNote_k4nls_135", av = "_cardNote_k4nls_140", nv = "_reviewerList_k4nls_145", tv = "_reviewerRow_k4nls_151", rv = "_reviewerMark_k4nls_157", lv = "_reviewerName_k4nls_167", ov = "_terminalCard_k4nls_173", iv = "_terminalCount_k4nls_182", sv = "_workflowAgents_k4nls_188", cv = "_mount_k4nls_194", k = {
  column: Pf,
  head: Bf,
  index: Of,
  name: Df,
  meta: jf,
  mono: Hf,
  gate: Ff,
  reviewersLabel: Wf,
  reviewers: zf,
  reviewer: Gf,
  agents: Uf,
  workflowColumn: Kf,
  workflowHead: Vf,
  stageRow: Yf,
  stageLabel: Xf,
  workflowTitle: Jf,
  workflowMeta: Qf,
  workflowGate: Zf,
  gateNote: ev,
  cardNote: av,
  reviewerList: nv,
  reviewerRow: tv,
  reviewerMark: rv,
  reviewerName: lv,
  terminalCard: ov,
  terminalCount: iv,
  workflowAgents: sv,
  mount: cv
}, dv = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Qa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function tt(e) {
  return `${Math.round(e * 100)}%`;
}
function uv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: k.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: k.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: k.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(Na, { cells: [
      { value: tt(e.gateShare), label: "Gate share" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function hv({ stage: e }) {
  return /* @__PURE__ */ n(Na, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: Qa(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function mv({ stage: e, titleId: a }) {
  return /* @__PURE__ */ o("header", { className: k.head, children: [
    /* @__PURE__ */ n("span", { className: k.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: k.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: dv[e.kind] })
  ] });
}
function wv({ stage: e }) {
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
function _v({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(uv, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(hv, { stage: e }) : null;
}
function fv({ onMount: e }) {
  return e ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function vv({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const l = $(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ o("section", { className: k.column, "aria-labelledby": l, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(mv, { stage: e, titleId: l }),
    /* @__PURE__ */ n(wv, { stage: e }),
    /* @__PURE__ */ n(_v, { stage: e }),
    /* @__PURE__ */ n("div", { className: k.agents, children: a.map((s) => /* @__PURE__ */ n(Nm, { ...s, connection: i }, s.agent.id)) }),
    /* @__PURE__ */ n(fv, { onMount: t })
  ] });
}
const bv = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function pv({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: k.reviewerList, children: e.map((a, t) => /* @__PURE__ */ o("li", { className: k.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: k.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: k.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function gv({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ o("div", { className: k.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ o("p", { className: k.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(pv, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ o("p", { className: k.cardNote, "data-note": "gate-share", children: [
      /* @__PURE__ */ n("span", { children: tt(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function yv(e) {
  return e === void 0 ? "items closed this week" : `items closed · ${e} ${e === 1 ? "rollback" : "rollbacks"}`;
}
function Nv({ stage: e }) {
  return /* @__PURE__ */ o("div", { className: k.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: k.terminalCount, children: Qa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: k.cardNote, children: yv(e.rolledBackThisWeek) })
  ] });
}
function kv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function $v(e) {
  if (e.kind === "terminal") return `${Qa(e.closedThisWeek)} this week`;
  const a = kv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function Cv({ stage: e, titleId: a }) {
  const t = bv[e.kind];
  return /* @__PURE__ */ o("header", { className: k.workflowHead, children: [
    /* @__PURE__ */ o("span", { className: k.stageRow, children: [
      /* @__PURE__ */ o("span", { className: k.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: k.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: k.workflowMeta, children: $v(e) })
  ] });
}
function Sv(e) {
  return e === "entry" || e === "agent";
}
function Rv({ stage: e, onMount: a }) {
  return a === void 0 || !Sv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: `${k.mount} ward-target`, onClick: () => a(e.index), children: "+ Mount agent" });
}
function Tv({ stage: e, agentCards: a, onMount: t }) {
  const r = $();
  return /* @__PURE__ */ o("section", { className: k.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(Cv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(gv, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(Nv, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: k.workflowAgents, children: a }),
    /* @__PURE__ */ n(Rv, { stage: e, onMount: t })
  ] });
}
function Ev(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function Q$(e) {
  return Ev(e) ? /* @__PURE__ */ n(Tv, { ...e }) : /* @__PURE__ */ n(vv, { ...e });
}
const Lv = "_row_1jw40_6", Av = "_name_1jw40_12", xv = "_compactRow_1jw40_13", Iv = "_compactName_1jw40_13", Mv = "_cell_1jw40_30", qv = "_chain_1jw40_45", Pv = "_owner_1jw40_51", Bv = "_mono_1jw40_57", Ov = "_compactCell_1jw40_79", Dv = "_stack_1jw40_96", jv = "_stat_1jw40_103", Hv = "_identityLine_1jw40_110", Fv = "_identity_1jw40_110", Wv = "_ownerLine_1jw40_137", zv = "_link_1jw40_150", Gv = "_gateMark_1jw40_156", Uv = "_emptyChain_1jw40_161", Kv = "_arrow_1jw40_167", Vv = "_muted_1jw40_168", Yv = "_define_1jw40_173", Xv = "_statValue_1jw40_180", Jv = "_policyId_1jw40_186", Qv = "_sub_1jw40_191", v = {
  row: Lv,
  name: Av,
  compactRow: xv,
  compactName: Iv,
  cell: Mv,
  chain: qv,
  owner: Pv,
  mono: Bv,
  compactCell: Ov,
  stack: Dv,
  stat: jv,
  identityLine: Hv,
  identity: Fv,
  ownerLine: Wv,
  link: zv,
  gateMark: Gv,
  emptyChain: Uv,
  arrow: Kv,
  muted: Vv,
  define: Yv,
  statValue: Xv,
  policyId: Jv,
  sub: Qv
};
function rt(e) {
  var c;
  if (e.target.closest("[data-raised]") === null) return;
  const { ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i } = e, s = { bubbles: !0, cancelable: !0, ctrlKey: a, metaKey: t, shiftKey: r, altKey: l, button: i };
  (c = e.currentTarget.querySelector("a")) == null || c.dispatchEvent(new MouseEvent("click", s));
}
function Zv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function eb(e) {
  return e === void 0 ? v.compactRow : `${v.compactRow} ${e}`;
}
function lt(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function ab(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${lt(e.members)}`;
}
function nb(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: /* @__PURE__ */ o("span", { className: v.stack, children: [
    /* @__PURE__ */ o("span", { className: v.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${v.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${v.compactName} ward-rowlink ward-target`, href: W(a), "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: v.ownerLine, children: ab(e) })
  ] }) });
}
function ot({ name: e, gate: a, size: t }) {
  return /* @__PURE__ */ o(R, { children: [
    a ? /* @__PURE__ */ n("span", { className: v.gateMark, "aria-hidden": "true", "data-gate-mark": !0, children: "◆" }) : null,
    /* @__PURE__ */ n(m, { role: a ? "gate" : "soft", size: t, label: e }),
    a ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] });
}
function tb(e) {
  return /* @__PURE__ */ n("span", { className: `${v.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ o("span", { className: v.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: v.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(ot, { name: a.name, gate: a.gate === !0, size: "tag" })
  ] }, `${a.name}${t}`)) });
}
function rb(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e.length === 0 ? /* @__PURE__ */ o("span", { className: v.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: v.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("span", { className: v.define, children: "Define workflow" })
  ] }) : tb(e) });
}
function it(e) {
  return e === void 0 ? void 0 : !0;
}
function Nn(e, a, t, r) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: t }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: `${v.statValue} ward-stat-value`, title: r, "data-raised": it(r), children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: v.sub, children: a })
  ] }) });
}
function lb(e) {
  return /* @__PURE__ */ n("td", { className: v.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: v.muted, children: "not set" }) : /* @__PURE__ */ o("span", { className: v.stat, children: [
    /* @__PURE__ */ n("span", { className: v.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: v.sub, children: e.summary })
  ] }) });
}
function ob(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function ib({ stream: e, href: a, presentation: t }) {
  const r = eb(t.className);
  return /* @__PURE__ */ o("tr", { className: `${r} ward-streamrow`, onClick: rt, "data-ward-rowlink": !0, "data-draft": e.draft === !0, style: { "--stream": Le(e.streamStep, "chip") }, children: [
    nb(e, a),
    rb(e.stages),
    Nn(ob(e.agents), e.agents === void 0 ? void 0 : Zv(e.agents), "—"),
    lb(e.policy),
    Nn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—", e.inFlightHint)
  ] });
}
function sb(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function Z$(e) {
  if (sb(e)) return ib(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ o("tr", { className: v.row, onClick: rt, "data-ward-rowlink": !0, children: [
    /* @__PURE__ */ o("td", { className: v.cell, children: [
      /* @__PURE__ */ n("a", { className: `${v.name} ward-target`, href: W(t), children: a.name }),
      /* @__PURE__ */ n(m, { ...ya(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, children: /* @__PURE__ */ n("span", { className: v.chain, children: a.stages.map((r) => /* @__PURE__ */ n("span", { className: v.link, children: /* @__PURE__ */ n(ot, { name: r.name, gate: r.gate }) }, r.name)) }) }),
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
      /* @__PURE__ */ n("span", { className: v.mono, children: lt(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, title: a.inFlightHint, "data-raised": it(a.inFlightHint), children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: v.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: v.mono, children: a.p50 === void 0 ? "" : se(a.p50) }) })
  ] });
}
const cb = "_row_mdce7_2", db = "_name_mdce7_16", ub = "_scope_mdce7_24", wa = {
  row: cb,
  name: db,
  scope: ub
};
function hb(e) {
  return e === void 0 ? `${wa.row} ward-toolrow` : `${wa.row} ward-toolrow ${e}`;
}
function mb(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function wb({ id: e, reasonId: a, tool: t, state: r, onChange: l }) {
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
function _b({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function fb({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${wa.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function vb(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function eC({ tool: e, onChange: a, presentation: t }) {
  const r = $(), l = $(), i = mb(e, t), s = vb(t);
  return /* @__PURE__ */ o(s, { className: hb(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(wb, { id: r, reasonId: l, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${wa.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(fb, { tool: e, state: i, reasonId: l }),
    /* @__PURE__ */ n(_b, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const bb = "_strip_1qtlf_2", pb = "_head_1qtlf_10", gb = "_name_1qtlf_16", yb = "_chart_1qtlf_24", Nb = "_segment_1qtlf_30", kb = "_detailedChart_1qtlf_36", $b = "_rail_1qtlf_49", Cb = "_section_1qtlf_55", Sb = "_label_1qtlf_66", Rb = "_note_1qtlf_83", ee = {
  strip: bb,
  head: pb,
  name: gb,
  chart: yb,
  segment: Nb,
  detailedChart: kb,
  rail: $b,
  section: Cb,
  label: Sb,
  note: Rb
}, Tb = "No item in flight to preview.", Eb = "This is the view the validation exists for: six adjacent segments, direct-labelled, no legend to lean on.", Lb = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark, not a theme. Two teams theming the same product produces two products.", Oa = [1, 2, 3, 4, 5, 6], _a = 100;
function Ab(e, a) {
  return a.has(e) ? Le(e, "id") : "var(--ward-color-line)";
}
function xb({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: ee.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Oa.map((r, l) => /* @__PURE__ */ n(
    "rect",
    {
      className: ee.segment,
      x: l * _a,
      y: "0",
      width: _a,
      height: "8",
      fill: Ab(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function Ib(e) {
  const a = e.slice(0, Oa.length);
  for (; a.length < Oa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function Mb({ identities: e }) {
  return /* @__PURE__ */ o("figure", { className: `${ee.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * _a),
        y: "0",
        width: String(_a),
        height: "40",
        style: { fill: Le(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function st(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ta({ label: e, children: a }) {
  const t = $();
  return /* @__PURE__ */ o("section", { className: ee.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: ee.label, children: e }),
    a
  ] });
}
function qb({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: ee.note, children: a ?? Tb }) : /* @__PURE__ */ n($a, { item: { ...e, streamStep: ga(t.streamStep) }, onOpen: st(r), feed: null });
}
function Pb({ draft: e }) {
  const a = { "--stream": Le(e.streamStep, "id") };
  return /* @__PURE__ */ o("p", { className: ee.head, style: a, children: [
    /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
  ] });
}
function Bb(e) {
  const a = Ib(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ o("div", { className: ee.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ta, { label: "Board card", children: /* @__PURE__ */ n(qb, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ta, { label: "Streams index row", children: /* @__PURE__ */ n(Pb, { draft: t }) }),
    /* @__PURE__ */ o(ta, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(Mb, { identities: a }),
      /* @__PURE__ */ n("p", { className: ee.note, children: Eb })
    ] }),
    /* @__PURE__ */ n(ta, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: ee.note, children: Lb }) })
  ] });
}
function Ob({ draft: e, sample: a, streams: t, onOpen: r }) {
  const l = { "--stream": Le(e.streamStep, "id") };
  return /* @__PURE__ */ o("section", { className: ee.strip, "aria-label": "Appearance", style: l, children: [
    /* @__PURE__ */ o("div", { className: ee.head, children: [
      /* @__PURE__ */ n(Ae, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: ee.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...ya(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n($a, { item: { ...a, streamStep: e.streamStep }, onOpen: st(r) }),
    /* @__PURE__ */ n(xb, { draft: e, streams: t })
  ] });
}
function aC(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(Bb, { ...e }) : /* @__PURE__ */ n(Ob, { ...e });
}
const Db = "_row_ixlg5_6", jb = "_headCell_ixlg5_10", Hb = "_cell_ixlg5_11", Fb = "_name_ixlg5_23", Wb = "_consequence_ixlg5_29", zb = "_governed_ixlg5_36", Gb = "_control_ixlg5_42", Ub = "_byRole_ixlg5_48", Kb = "_webControl_ixlg5_59", Vb = "_webConsequence_ixlg5_65", Yb = "_webGoverned_ixlg5_71", D = {
  row: Db,
  headCell: jb,
  cell: Hb,
  name: Fb,
  consequence: Wb,
  governed: zb,
  control: Gb,
  byRole: Ub,
  webControl: Kb,
  webConsequence: Vb,
  webGoverned: Yb
};
function Xb({
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
function Jb({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Xb, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Qb(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Zb({ name: e, cell: a, onChange: t }) {
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
function ep({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ o("tr", { className: D.row, children: [
    /* @__PURE__ */ o("td", { className: D.cell, children: [
      /* @__PURE__ */ n("span", { className: D.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${D.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n(Zb, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: D.cell, children: /* @__PURE__ */ n("span", { className: `${D.webGoverned} ward-cellmeta`, children: Qb(e) }) })
  ] });
}
function nC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(ep, { ...e }) : /* @__PURE__ */ n(Jb, { ...e });
}
const ap = "_row_vv64h_2", np = "_cell_vv64h_6", tp = "_name_vv64h_25", rp = "_note_vv64h_30", lp = "_webName_vv64h_41", op = "_webMeta_vv64h_47", K = {
  row: ap,
  cell: np,
  name: tp,
  note: rp,
  webName: lp,
  webMeta: op
}, ct = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function ip(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function sp({ component: e, onRestart: a }) {
  const t = $(), r = ct[e.state], l = e.state === "drainFirst";
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
function cp({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: ip(e.state) });
}
function dp({ component: e, onRestart: a }) {
  return /* @__PURE__ */ o("tr", { className: K.row, children: [
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n("span", { className: `${K.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(m, { ...ct[e.state] }) }),
    /* @__PURE__ */ n("td", { className: K.cell, children: /* @__PURE__ */ n(cp, { component: e, onRestart: a }) })
  ] });
}
function tC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dp, { ...e }) : /* @__PURE__ */ n(sp, { ...e });
}
const up = "_row_1f1gp_7", hp = "_cell_1f1gp_11", mp = "_next_1f1gp_28", wp = "_headCell_1f1gp_38", _p = "_webId_1f1gp_77", fp = "_webPurpose_1f1gp_83", vp = "_webMeta_1f1gp_91", bp = "_webUrgent_1f1gp_97", H = {
  row: up,
  cell: hp,
  next: mp,
  headCell: wp,
  webId: _p,
  webPurpose: fp,
  webMeta: vp,
  webUrgent: bp
}, pp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, gp = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, dt = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], yp = Object.fromEntries(dt.map((e) => [e.key, e]));
function Ge({ column: e, children: a }) {
  const t = yp[e];
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
function rC() {
  return /* @__PURE__ */ n("tr", { children: dt.map((e) => /* @__PURE__ */ n(
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
function Np({ cred: e }) {
  const a = pp[e.state];
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n(Ge, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(Ge, { column: "id", children: e.id }),
    /* @__PURE__ */ n(Ge, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ge, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(Ge, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(Ge, { column: "next", children: /* @__PURE__ */ n("span", { className: H.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function kp({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${H.webMeta} ${H.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function $p({ cred: e }) {
  return /* @__PURE__ */ o("tr", { className: H.row, children: [
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n("span", { className: `${H.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(kp, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: H.cell, children: /* @__PURE__ */ n(m, { ...gp[e.state] }) })
  ] });
}
function lC(e) {
  return "presentation" in e ? /* @__PURE__ */ n($p, { ...e }) : /* @__PURE__ */ n(Np, { ...e });
}
const Cp = "_card_17zba_2", Sp = "_head_17zba_11", Rp = "_env_17zba_18", Tp = "_version_17zba_25", Ep = "_meta_17zba_32", Lp = "_webCard_17zba_37", Ap = "_webRow_17zba_47", xp = "_webTitle_17zba_55", Ip = "_webLine_17zba_65", Mp = "_webVersion_17zba_72", qp = "_webMeta_17zba_77", U = {
  card: Cp,
  head: Sp,
  env: Rp,
  version: Tp,
  meta: Ep,
  webCard: Lp,
  webRow: Ap,
  webTitle: xp,
  webLine: Ip,
  webVersion: Mp,
  webMeta: qp
}, ut = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function Pp({ env: e }) {
  const a = ut[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function Bp(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [ce(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function Op(e) {
  return /* @__PURE__ */ o("article", { className: `${U.webCard} ward-envcard`, children: [
    /* @__PURE__ */ o("span", { className: `${U.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${U.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...ut[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${U.version} ${U.webVersion} ${U.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${U.meta} ${U.webMeta} ${U.webLine} ward-cellmeta`, children: Bp(e) })
  ] });
}
function oC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Op, { ...e }) : /* @__PURE__ */ n(Pp, { ...e });
}
const Dp = "_panel_1hmja_2", jp = "_line_1hmja_8", Hp = "_actions_1hmja_14", ra = {
  panel: Dp,
  line: jp,
  actions: Hp
};
function iC(e) {
  return /* @__PURE__ */ o("div", { className: ra.panel, children: [
    /* @__PURE__ */ n("p", { className: ra.line, children: e.status }),
    /* @__PURE__ */ n(A, { kind: "input", label: "New " + e.label.toLowerCase(), value: e.value, onChange: e.onChange, secret: !0 }),
    /* @__PURE__ */ n("div", { className: ra.actions, children: e.actions }),
    /* @__PURE__ */ n("p", { role: "status", className: ra.line, children: e.note ?? "" })
  ] });
}
const Fp = "_upload_erepj_2", Wp = "_preview_erepj_7", zp = "_mark_erepj_17", Gp = "_empty_erepj_22", Up = "_actions_erepj_28", Kp = "_input_erepj_33", Vp = "_reasons_erepj_41", Yp = "_reason_erepj_41", Xp = "_accepted_erepj_57", te = {
  upload: Fp,
  preview: Wp,
  mark: zp,
  empty: Gp,
  actions: Up,
  input: Kp,
  reasons: Vp,
  reason: Yp,
  accepted: Xp
}, ht = 1.5, mt = 22, fa = "script elements or event handlers", Se = "links or external references", Ne = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${ht}px at ${mt}px`], Jp = [Ne[1], Ne[2], fa, Se], Qp = /* @__PURE__ */ new Map([
  ["image", Ne[1]],
  ["text", Ne[2]],
  ["tspan", Ne[2]],
  ["textPath", Ne[2]],
  ["script", fa],
  ["foreignObject", fa],
  ["a", Se],
  ["use", Se],
  ["style", Se],
  ["feImage", Se],
  ["set", Se]
]), Zp = "http://www.w3.org/2000/svg", eg = "http://www.w3.org/2000/xmlns/", ag = /* @__PURE__ */ new Set([
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
]), ng = /* @__PURE__ */ new Set([
  "viewBox",
  "width",
  "height",
  "preserveAspectRatio",
  "version",
  "id",
  "class",
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
]), tg = /url\(\s*(['"]?)#[^'"()\\\s]*\1\s*\)/gi, rg = /url\s*\(|['"\\]/i;
function lg() {
  return { ok: !1, reasons: [Ne[1]] };
}
function wt(e) {
  return e.namespaceURI === Zp || e.namespaceURI === null;
}
function og(e) {
  try {
    const a = new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    return a.localName === "svg" && wt(a) ? a : null;
  } catch {
    return null;
  }
}
function ig(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ne[0]] : [];
}
function sg(e) {
  return Qp.get(e.localName) ?? (e.localName.startsWith("animate") ? Se : void 0);
}
function cg(e) {
  return rg.test(e.replace(tg, ""));
}
function dg(e) {
  return /^on/i.test(e.localName) ? fa : e.localName === "href" || cg(e.value) ? Se : void 0;
}
function ug(e) {
  const a = /* @__PURE__ */ new Set();
  for (const t of [e, ...Array.from(e.querySelectorAll("*"))]) {
    a.add(sg(t));
    for (const r of Array.from(t.attributes)) a.add(dg(r));
  }
  return Jp.filter((t) => a.has(t));
}
function hg(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((l) => Number.isFinite(l) && l > 0), 0), r = t > 0 ? mt / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((l) => {
    const i = Number(l.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < ht;
  }) ? [Ne[3]] : [];
}
function mg(e) {
  if (e.namespaceURI === eg) return !0;
  const a = e.localName;
  return e.namespaceURI === null && (ng.has(a) || a.startsWith("stroke"));
}
function wg(e) {
  if (e.nodeType === Node.TEXT_NODE) return !0;
  const a = e;
  return e.nodeType === Node.ELEMENT_NODE && wt(a) && ag.has(a.localName);
}
function _g(e, a) {
  wg(a) ? a.nodeType === Node.ELEMENT_NODE && _t(a) : e.removeChild(a);
}
function _t(e) {
  for (const a of Array.from(e.attributes)) mg(a) || e.removeAttributeNode(a);
  for (const a of Array.from(e.childNodes)) _g(e, a);
  return e;
}
function sC(e) {
  const a = og(e);
  if (a === null) return lg();
  const t = [...ig(a), ...ug(a), ...hg(a)];
  return t.length > 0 ? { ok: !1, reasons: t } : { ok: !0, svg: new XMLSerializer().serializeToString(_t(a)) };
}
const fg = "Mark accepted.";
function vg({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: te.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: te.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: te.empty }) });
}
function bg(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function pg(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function gg({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: te.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("p", { className: te.accepted, children: fg }) }) : /* @__PURE__ */ n("div", { className: te.result, role: "status", children: /* @__PURE__ */ n("ul", { className: te.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: te.reason, children: a }, a)) }) });
}
function yg({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(gg, { result: e }) : /* @__PURE__ */ n("p", { className: `${te.result} ${bg(e, t)}`, role: "status", children: pg(e, t) });
}
function cC({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const l = y(null), [i, s] = p(null), c = (d) => {
    if (d === void 0) return;
    const u = a(d);
    u instanceof Promise ? u.then(s) : s(u);
  };
  return /* @__PURE__ */ o("div", { className: te.upload, children: [
    /* @__PURE__ */ n(vg, { current: e }),
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
    /* @__PURE__ */ n(yg, { result: i, presentation: r })
  ] });
}
const Ng = "_row_1wp9s_7", kg = "_cell_1wp9s_11", $g = "_head_1wp9s_28", Cg = "_name_1wp9s_34", Sg = "_pinned_1wp9s_42", Rg = "_headCell_1wp9s_49", Tg = "_webName_1wp9s_88", Eg = "_webMeta_1wp9s_95", Lg = "_webWarn_1wp9s_103", q = {
  row: Ng,
  cell: kg,
  head: $g,
  name: Cg,
  pinned: Sg,
  headCell: Rg,
  webName: Tg,
  webMeta: Eg,
  webWarn: Lg
}, Za = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, ft = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ag = Object.fromEntries(ft.map((e) => [e.key, e]));
function xg(e, a) {
  return `mcp.${e}.${a}`;
}
function Ig(e) {
  return Object.keys(Za).includes(e);
}
function Mg(e) {
  return Za[e !== void 0 && Ig(e) ? e : "unknown"];
}
function Xe({ column: e, children: a }) {
  const t = Ag[e];
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
function dC() {
  return /* @__PURE__ */ n("tr", { children: ft.map((e) => /* @__PURE__ */ n(
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
function qg({ server: e }) {
  const a = Za[e.connection];
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
    /* @__PURE__ */ n(Xe, { column: "tools", children: e.tools.map((t) => xg(e.name, t)).join(" · ") })
  ] });
}
function Pg(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Bg(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Og({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Dg({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable: no supervisor configured" }) : /* @__PURE__ */ n(_, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function jg({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(_, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Hg({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, l = e.tools ?? [];
  return /* @__PURE__ */ o("tr", { className: q.row, children: [
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Pg(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: l.map((i) => i.tool).join(", "), children: `${l.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Bg(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Og, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Mg(e.connection) }) }),
    /* @__PURE__ */ o("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Dg, { server: e, onRestart: a }),
      /* @__PURE__ */ n(jg, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function uC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Hg, { ...e }) : /* @__PURE__ */ n(qg, { ...e });
}
const Fg = "_row_1h9nq_2", Wg = "_headCell_1h9nq_14", zg = "_cell_1h9nq_15", Gg = "_name_1h9nq_26", Ug = "_consequence_1h9nq_32", Kg = "_reason_1h9nq_38", Vg = "_value_1h9nq_44", Yg = "_webRow_1h9nq_60", Xg = "_webSetting_1h9nq_71", Jg = "_webName_1h9nq_79", Qg = "_webConsequence_1h9nq_87", Zg = "_webControl_1h9nq_93", ey = "_webState_1h9nq_106", ay = "_webChip_1h9nq_111", L = {
  row: Fg,
  headCell: Wg,
  cell: zg,
  name: Gg,
  consequence: Ug,
  reason: Kg,
  value: Vg,
  webRow: Yg,
  webSetting: Xg,
  webName: Jg,
  webConsequence: Qg,
  webControl: Zg,
  webState: ey,
  webChip: ay
}, vt = 104, bt = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function ny({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(De, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(In, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: L.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function ty({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const l = $(), i = bt[t], s = t === "locked";
  return /* @__PURE__ */ o("tr", { className: L.row, "data-inheritance": t, children: [
    /* @__PURE__ */ o("th", { scope: "row", className: L.headCell, children: [
      /* @__PURE__ */ n("span", { className: L.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: L.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: l, className: L.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: L.cell, children: /* @__PURE__ */ n(ny, { control: a, name: e.name, locked: s, describedBy: s ? l : void 0 }) }),
    /* @__PURE__ */ n("td", { className: L.cell, style: { width: vt }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function pt(e, a) {
  return String(e ?? a);
}
function ry(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function ly(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? pt(e.value, "—");
}
function oy({ control: e, name: a, locked: t, describedBy: r, onChange: l }) {
  const i = e.value === !0;
  return /* @__PURE__ */ o("span", { className: L.webControl, children: [
    /* @__PURE__ */ n(De, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (s) => l == null ? void 0 : l(s) }),
    /* @__PURE__ */ n("span", { className: L.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function iy(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(oy, { ...e });
  const l = ry(a, t);
  return l !== void 0 ? /* @__PURE__ */ n("span", { className: L.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(In, { options: l, value: pt(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${L.webControl} ${L.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: ly(a) });
}
function sy({ setting: e, control: a, inheritance: t, reason: r, onChange: l, renderControl: i }) {
  const s = $(), c = t === "locked";
  return /* @__PURE__ */ o("div", { className: `${L.row} ${L.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ o("span", { className: L.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${L.name} ${L.webName}`, children: e.name }),
      /* @__PURE__ */ o("p", { id: s, className: `${L.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: L.webControl, children: i(s) }) : /* @__PURE__ */ n(iy, { control: a, name: e.name, locked: c, describedBy: c ? s : void 0, onChange: l }),
    /* @__PURE__ */ n("span", { className: `${L.webChip} ward-policy-chip`, style: { width: vt }, children: /* @__PURE__ */ n(m, { ...bt[t], size: "tag" }) })
  ] });
}
function hC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(sy, { ...e }) : /* @__PURE__ */ n(ty, { ...e });
}
const cy = "_label_1o9za_7", dy = "_name_1o9za_15", uy = "_column_1o9za_24", hy = "_webFrame_1o9za_57", my = "_webHead_1o9za_62", wy = "_webHeadLabel_1o9za_74", _y = "_webLabel_1o9za_112", fy = "_webColumns_1o9za_119", vy = "_webGroup_1o9za_125", by = "_webPeople_1o9za_126", py = "_webVia_1o9za_127", gy = "_webMeta_1o9za_156", F = {
  label: cy,
  name: dy,
  column: uy,
  webFrame: hy,
  webHead: my,
  webHeadLabel: wy,
  webLabel: _y,
  webColumns: fy,
  webGroup: vy,
  webPeople: by,
  webVia: py,
  webMeta: gy
}, yy = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, La = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Aa({ column: e, children: a }) {
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
function Ny(e) {
  if (!e.matrixRole) return;
  const a = yy[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function ky({ node: e }) {
  const a = Ny(e);
  return /* @__PURE__ */ o("span", { className: F.label, children: [
    /* @__PURE__ */ n("span", { className: F.name, children: e.name }),
    /* @__PURE__ */ n($y, { role: a, node: e }),
    /* @__PURE__ */ n(Aa, { column: La[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Aa, { column: La[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Aa, { column: La[2], children: e.requestedVia ?? "" })
  ] });
}
function $y({ role: e, node: a }) {
  return /* @__PURE__ */ o(R, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Cy({ index: e, depth: a, node: t, expanded: r, leaf: l, onToggle: i, children: s }) {
  return /* @__PURE__ */ n(
    On,
    {
      index: e,
      depth: a,
      leaf: l,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(ky, { node: t }),
      children: s
    }
  );
}
function xa({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Sy({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(xa, { className: `${F.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(xa, { className: `${F.webMeta} ${F.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Ry() {
  return /* @__PURE__ */ o("div", { className: F.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: F.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ o("span", { className: F.webColumns, children: [
      /* @__PURE__ */ n("span", { className: F.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: F.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: F.webVia, children: "Requested via" })
    ] })
  ] });
}
function Ty({ row: e }) {
  return /* @__PURE__ */ o("span", { className: `${F.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Ey(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Ly({ rows: e, label: a }) {
  return /* @__PURE__ */ o("div", { className: F.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Ry, {}),
    /* @__PURE__ */ n(kc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      On,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Ty, { row: t }),
        detail: /* @__PURE__ */ n(Sy, { row: t }),
        expanded: Ey(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function mC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Ly, { ...e }) : /* @__PURE__ */ n(Cy, { ...e });
}
const Ay = "_runbook_b9agc_2", xy = "_list_b9agc_7", Iy = "_step_b9agc_15", My = "_numeral_b9agc_21", qy = "_body_b9agc_28", Py = "_head_b9agc_34", By = "_title_b9agc_40", Oy = "_detail_b9agc_45", Dy = "_actions_b9agc_50", jy = "_webList_b9agc_56", Hy = "_webStep_b9agc_60", Fy = "_webBody_b9agc_66", Wy = "_webTitle_b9agc_74", zy = "_webDetail_b9agc_78", T = {
  runbook: Ay,
  list: xy,
  step: Iy,
  numeral: My,
  body: qy,
  head: Py,
  title: By,
  detail: Oy,
  actions: Dy,
  webList: jy,
  webStep: Hy,
  webBody: Fy,
  webTitle: Wy,
  webDetail: zy
}, gt = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function yt(e) {
  return String(e + 1).padStart(2, "0");
}
function Gy({ step: e, index: a, connection: t }) {
  const r = gt[e.state], l = e.state === "running";
  return /* @__PURE__ */ o("li", { className: T.step, "aria-current": l ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: T.numeral, children: yt(a) }),
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
function Uy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: T.list, children: e.map((r, l) => /* @__PURE__ */ n(Gy, { step: r, index: l, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: T.actions, children: a })
  ] });
}
function Ky({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ o("li", { className: `${T.step} ${T.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${T.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: yt(a) }),
    /* @__PURE__ */ o("span", { className: `${T.body} ${T.webBody}`, children: [
      /* @__PURE__ */ o("span", { className: `${T.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${T.title} ${T.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...gt[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ke, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${T.detail} ${T.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function Vy({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ o("div", { className: T.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${T.list} ${T.webList} ward-runbook`, children: e.map((r, l) => /* @__PURE__ */ n(Ky, { step: r, index: l, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${T.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function wC(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Vy, { ...e }) : /* @__PURE__ */ n(Uy, { ...e });
}
const Yy = "_list_1gu6a_2", Xy = "_check_1gu6a_10", Jy = "_body_1gu6a_16", Qy = "_text_1gu6a_23", Zy = "_pending_1gu6a_32", eN = "_measured_1gu6a_37", Ke = {
  list: Yy,
  check: Xy,
  body: Jy,
  text: Qy,
  pending: Zy,
  measured: eN
};
function aN(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function nN({ check: e }) {
  const a = aN(e.passed);
  return /* @__PURE__ */ o("li", { className: `${Ke.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ka, { state: a.state, label: a.label }),
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
function _C({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${Ke.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(nN, { check: a }, a.text)) });
}
const tN = "_root_khinh_2", rN = "_list_khinh_10", lN = "_line_khinh_21", oN = "_at_khinh_48", iN = "_text_khinh_52", sN = "_foot_khinh_56", cN = "_idle_khinh_68", dN = "_caret_khinh_76", uN = "_jump_khinh_83", me = {
  root: tN,
  list: rN,
  line: lN,
  at: oN,
  text: iN,
  foot: sN,
  idle: cN,
  caret: dN,
  jump: uN
}, hN = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function en(e) {
  return Number.isNaN(Date.parse(e)) ? "" : hN.format(new Date(e));
}
const mN = { warn: "warning", ok: "ok" };
function wN({ kind: e }) {
  const a = mN[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function _N({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${en(e)}` });
}
function fN({ connection: e, idleSince: a, last: t, children: r }) {
  const l = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events as of ${en(l)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ o("p", { className: `${me.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${me.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: me.idle, children: i }),
    /* @__PURE__ */ n(_N, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
const vN = 8;
function bN(e) {
  return e.scrollHeight - e.scrollTop - e.clientHeight > vN;
}
function pN({ shown: e, onJump: a }) {
  return e ? /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consjump`, onClick: a, children: "Jump to latest" }) : null;
}
const Nt = He(null);
function fC({ announce: e, onAnnounceChange: a, children: t }) {
  const [r, l] = p(!1), i = Rn(() => ({
    announce: e ?? r,
    setAnnounce: (s) => {
      l(s), a == null || a(s);
    }
  }), [e, r, a]);
  return /* @__PURE__ */ n(Nt.Provider, { value: i, children: t });
}
function gN() {
  const e = je(Nt), [a, t] = p(!1);
  return e ? [e.announce, e.setAnnounce] : [a, t];
}
function vC({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const l = y(null), [i, s] = p(0), [c, d] = gN(), [u, h] = p(!1), f = e.at(-1);
  x(() => {
    s(e.length);
  }, [e.length]), Ha(() => {
    const g = l.current;
    g && !u && (g.scrollTop = g.scrollHeight);
  }, [e.length, u]);
  const b = () => {
    var j;
    const g = l.current;
    if (!g) return;
    const I = g.querySelectorAll("[data-consline-text]");
    (j = I.item(I.length - 1)) == null || j.focus(), h(!1);
  };
  return /* @__PURE__ */ o("div", { className: me.root, children: [
    /* @__PURE__ */ n("ol", { className: me.list, ref: l, "aria-live": c ? "polite" : "off", "aria-label": r, onScroll: (g) => h(bN(g.currentTarget)), children: e.map((g, I) => /* @__PURE__ */ o("li", { className: `${me.line} ward-consline ward-reveal ward-consline--${g.kind}`, "data-kind": g.kind, "data-revealed": I < i, children: [
      /* @__PURE__ */ n("span", { className: me.at, children: en(g.at) }),
      /* @__PURE__ */ n(wN, { kind: g.kind }),
      /* @__PURE__ */ n("span", { className: me.text, "data-consline-text": !0, tabIndex: -1, children: g.text })
    ] }, `${g.at}-${I}`)) }),
    /* @__PURE__ */ o(fN, { connection: a, idleSince: t, last: f, children: [
      /* @__PURE__ */ n("button", { type: "button", className: `${me.jump} ward-consannounce`, "aria-pressed": c, onClick: () => d(!c), children: "Read new events" }),
      /* @__PURE__ */ n(pN, { shown: u, onJump: b })
    ] })
  ] });
}
const yN = "_row_11jhe_2", NN = "_head_11jhe_14", kN = "_author_11jhe_20", $N = "_eta_11jhe_25", CN = "_edited_11jhe_26", SN = "_body_11jhe_32", RN = "_reason_11jhe_37", TN = "_actions_11jhe_42", be = {
  row: yN,
  head: NN,
  author: kN,
  eta: $N,
  edited: CN,
  body: SN,
  reason: RN,
  actions: TN
}, EN = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function LN(e) {
  return {
    queued: `Still in the outbox. Editing replaces it, so ${e} gets one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed. Edit and resend, or cancel the delivery."
  };
}
function AN({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: l, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: l, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function xN({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: be.reason, id: a, children: e })
  ] });
}
function IN(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function MN(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(AN, { ...e }) : /* @__PURE__ */ n(xN, { reason: e.unavailable, reasonId: e.unavailableId });
}
function bC(e) {
  const { comment: a } = e;
  IN(e);
  const t = $(), r = `${t}-unavailable`, l = EN[a.delivery];
  return /* @__PURE__ */ o("div", { className: `${be.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ o("div", { className: be.head, children: [
      /* @__PURE__ */ n("span", { className: be.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: l.role, label: l.label }),
      /* @__PURE__ */ n("span", { className: be.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: be.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: be.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: be.reason, id: t, children: LN(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: be.actions, children: /* @__PURE__ */ n(MN, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const qN = "_root_c46wj_2", PN = "_attach_c46wj_11", BN = "_actions_c46wj_17", ON = "_reply_c46wj_23", DN = "_replyRow_c46wj_28", jN = "_sendsAs_c46wj_42", Ye = {
  root: qN,
  attach: PN,
  actions: BN,
  reply: ON,
  replyRow: DN,
  sendsAs: jN
};
function HN({ placeholder: e, asUser: a, onPost: t }) {
  const [r, l] = p(""), i = $();
  return /* @__PURE__ */ o("div", { className: Ye.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ o("div", { className: Ye.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: l, describedBy: i }),
      /* @__PURE__ */ n(_, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: Ye.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function pC(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(HN, { ...e }) : /* @__PURE__ */ n(FN, { ...e });
}
function FN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: l, onDraft: i }) {
  const [s, c] = p("");
  return /* @__PURE__ */ o("div", { className: Ye.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: s, onChange: c }),
    t && /* @__PURE__ */ o("div", { className: Ye.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(_, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      An,
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
const WN = "_list_1ih9e_2", zN = "_item_1ih9e_6", GN = "_body_1ih9e_22", UN = "_text_1ih9e_28", KN = "_evidence_1ih9e_37", VN = "_consequence_1ih9e_49", YN = "_note_1ih9e_54", Oe = {
  list: WN,
  item: zN,
  body: GN,
  text: UN,
  evidence: KN,
  consequence: VN,
  note: YN
};
function XN({ criterion: e }) {
  return /* @__PURE__ */ n(Ae, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function kn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function JN(e) {
  return e ? `${e} · keeps the item held` : "keeps the item held";
}
function QN({ criterion: e }) {
  return /* @__PURE__ */ o("span", { className: Oe.body, children: [
    /* @__PURE__ */ n("span", { className: Oe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("code", { className: Oe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ n(kn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Oe.consequence, children: JN(e.why) })
    ] })
  ] });
}
function ZN({ criterion: e }) {
  return /* @__PURE__ */ o("li", { className: Oe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(XN, { criterion: e }),
    /* @__PURE__ */ n(QN, { criterion: e })
  ] });
}
function gC({ criteria: e }) {
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Oe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(ZN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Oe.note, children: "A criterion with no evidence keeps the item held. Nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const ek = "_list_dwhoz_2", ak = "_rung_dwhoz_6", nk = "_name_dwhoz_18", tk = "_actor_dwhoz_32", ia = {
  list: ek,
  rung: ak,
  name: nk,
  actor: tk
}, rk = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function lk({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = rk[e.state];
  return /* @__PURE__ */ o("li", { className: ia.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ia.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ia.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function yC({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ia.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(lk, { rung: a }, a.name)) });
}
const ok = "_sheet_1fqco_2", ik = "_title_1fqco_9", sk = "_stage_1fqco_15", ck = "_effects_1fqco_20", dk = "_effect_1fqco_20", uk = "_numeral_1fqco_31", hk = "_effectText_1fqco_38", mk = "_refusals_1fqco_43", wk = "_reasons_1fqco_52", _k = "_reason_1fqco_52", fk = "_actions_1fqco_62", ue = {
  sheet: ok,
  title: ik,
  stage: sk,
  effects: ck,
  effect: dk,
  numeral: uk,
  effectText: hk,
  refusals: mk,
  reasons: wk,
  reason: _k,
  actions: fk
};
function vk({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(_, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(_, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function NC({ run: e, effects: a, refusals: t, cost: r, onRequeue: l, onClose: i, returnFocusTo: s }) {
  const c = $(), d = `${c}-refusal`, [u, h] = p(""), f = t.length > 0;
  return /* @__PURE__ */ n(ea, { kind: "sheet", labelledBy: c, onClose: i, returnFocusTo: s, children: /* @__PURE__ */ o("div", { className: ue.sheet, children: [
    /* @__PURE__ */ o("h2", { className: ue.title, id: c, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ue.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ue.effects, children: a.map((b, g) => /* @__PURE__ */ o("li", { className: ue.effect, children: [
      /* @__PURE__ */ n("span", { className: ue.numeral, children: String(g + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ue.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      is,
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
      /* @__PURE__ */ n("ul", { className: ue.reasons, children: t.map((b, g) => /* @__PURE__ */ n("li", { className: ue.reason, id: g === 0 ? d : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ o("div", { className: ue.actions, children: [
      /* @__PURE__ */ n(vk, { refused: f, reasonId: d, note: u, onRequeue: l }),
      /* @__PURE__ */ n(_, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const bk = "_list_1hvqu_2", pk = "_path_1hvqu_7", gk = "_head_1hvqu_21", yk = "_label_1hvqu_28", Nk = "_consequence_1hvqu_35", kk = "_ask_1hvqu_36", Ve = {
  list: bk,
  path: pk,
  head: gk,
  label: yk,
  consequence: Nk,
  ask: kk
}, Da = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function $n(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function Cn(e) {
  return e ? "primary" : "secondary";
}
function $k({ path: e, primary: a, onChoose: t }) {
  const r = $();
  return e.allowed ? /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", onClick: () => t(e.kind), children: Da[e.kind] }) : /* @__PURE__ */ o(R, { children: [
    /* @__PURE__ */ n(_, { variant: Cn(a), size: "sm", disabled: !0, describedBy: r, children: Da[e.kind] }),
    /* @__PURE__ */ n("span", { className: Ve.ask, id: r, children: e.askInstead })
  ] });
}
function Ck({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ o("li", { className: Ve.path, "data-allowed": e.allowed, "data-role": $n(e.requiredRole), children: [
    /* @__PURE__ */ o("span", { className: Ve.head, children: [
      /* @__PURE__ */ n("span", { className: Ve.label, children: e.title ?? Da[e.kind] }),
      /* @__PURE__ */ n(m, { role: $n(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Ve.consequence, children: e.consequence }),
    /* @__PURE__ */ n($k, { path: e, primary: a, onChoose: t })
  ] });
}
function kC({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Ve.list, children: e.map((t, r) => /* @__PURE__ */ n(Ck, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const Sk = "_list_1nyt1_2", Rk = "_item_1nyt1_6", Tk = "_node_1nyt1_18", Ek = "_body_1nyt1_24", Lk = "_head_1nyt1_30", Ak = "_stage_1nyt1_36", xk = "_version_1nyt1_41", Ik = "_sentence_1nyt1_49", Mk = "_meta_1nyt1_54", ge = {
  list: Sk,
  item: Rk,
  node: Tk,
  body: Ek,
  head: Lk,
  stage: Ak,
  version: xk,
  sentence: Ik,
  meta: Mk
}, qk = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function Pk({ entry: e }) {
  return /* @__PURE__ */ o("span", { className: ge.head, children: [
    /* @__PURE__ */ n("span", { className: ge.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: ge.version, title: e.version, children: e.version }) : null
  ] });
}
function Bk({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ o("li", { className: `${ge.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${ge.node} ward-history-node`, children: /* @__PURE__ */ n(Ae, { size: 9, kind: qk[e.state], label: e.state }) }),
    /* @__PURE__ */ o("span", { className: `${ge.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(Pk, { entry: e }),
      /* @__PURE__ */ n("span", { className: ge.sentence, children: e.sentence }),
      /* @__PURE__ */ o("span", { className: `${ge.meta} ward-history-meta`, children: [
        `${ce(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${re(e.cost)}`
      ] })
    ] })
  ] });
}
function $C({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ge.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(Bk, { entry: a }, a.stage + String(t))) });
}
const Ok = "_thread_1kn6s_3", Dk = "_turn_1kn6s_8", jk = "_who_1kn6s_27", Hk = "_body_1kn6s_32", sa = {
  thread: Ok,
  turn: Dk,
  who: jk,
  body: Hk
}, kt = He(!1);
function CC({ children: e, density: a }) {
  return /* @__PURE__ */ n(kt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${sa.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function SC({ turn: e }) {
  if (!je(kt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ o("li", { className: `${sa.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ o("span", { className: `${sa.who} ward-chat-who`, children: [
      e.author,
      " · ",
      ce(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${sa.body} ward-chat-body`, children: e.body })
  ] });
}
const Fk = "_list_1rt9c_3", Wk = "_row_1rt9c_7", zk = "_label_1rt9c_20", Gk = "_n_1rt9c_26", Uk = "_cause_1rt9c_33", Qe = {
  list: Fk,
  row: Wk,
  label: zk,
  n: Gk,
  cause: Uk
};
function Kk(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const Vk = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function Yk({ row: e, formatNumber: a }) {
  return Kk(e), /* @__PURE__ */ o("li", { className: `${Qe.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ae, { size: 8, ...Vk[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Qe.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Qe.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(Xk, { cause: e.cause })
  ] });
}
function Xk({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Qe.cause} ward-healthrow-cause`, children: e }) : null;
}
function RC({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Qe.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(Yk, { row: t, formatNumber: a }, t.label)) });
}
const Jk = "_root_1jxwp_2", Qk = {
  root: Jk
};
function TC({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: l }) {
  return /* @__PURE__ */ o("div", { className: Qk.root, "data-density": l, children: [
    /* @__PURE__ */ n(Ca, { items: e, note: a, density: l }),
    /* @__PURE__ */ n(_, { variant: l === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const Zk = "_row_dhbre_3", e1 = "_key_dhbre_13", a1 = "_stack_dhbre_24", n1 = "_value_dhbre_32", t1 = "_evidence_dhbre_39", r1 = "_mark_dhbre_47", Ue = {
  row: Zk,
  key: e1,
  stack: a1,
  value: n1,
  evidence: t1,
  mark: r1
};
function l1({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ka, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function EC({ field: e }) {
  return /* @__PURE__ */ o("li", { className: `${Ue.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Ue.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ o("span", { className: `${Ue.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Ue.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Ue.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Ue.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(l1, { state: e.state }) })
  ] });
}
const o1 = "_cell_1monp_2", i1 = {
  cell: o1
}, s1 = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function c1(e) {
  return e.noRerun ? e.why ? `No rerun: ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function d1(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function u1(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: c1(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function h1(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function LC({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  d1(e, t);
  const r = h1(e);
  return /* @__PURE__ */ n(
    ys,
    {
      label: "Rejection routing",
      columns: s1,
      rows: r,
      rowId: (l) => l.id,
      renderCell: (l, i) => /* @__PURE__ */ n("span", { className: i1.cell, "data-norerun": l.noRerun ? !0 : void 0, children: u1(l, i) }),
      empty: a ?? /* @__PURE__ */ n(sd, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const m1 = "_row_ute8v_2", w1 = "_title_ute8v_11", _1 = "_turns_ute8v_20", f1 = "_waiting_ute8v_21", v1 = "_resolved_ute8v_22", b1 = "_activity_ute8v_23", p1 = "_cost_ute8v_29", g1 = "_link_ute8v_30", y1 = "_tableRow_ute8v_47", N1 = "_tableTitle_ute8v_59", k1 = "_tableResolved_ute8v_64", $1 = "_tableLink_ute8v_68", C1 = "_tableMeta_ute8v_83", S1 = "_tableCost_ute8v_90", R1 = "_tableActivity_ute8v_91", T1 = "_tableState_ute8v_101", E1 = "_tableRecord_ute8v_112", O = {
  row: m1,
  title: w1,
  turns: _1,
  waiting: f1,
  resolved: v1,
  activity: b1,
  cost: p1,
  link: g1,
  tableRow: y1,
  tableTitle: N1,
  tableResolved: k1,
  tableLink: $1,
  tableMeta: C1,
  tableCost: S1,
  tableActivity: R1,
  tableState: T1,
  tableRecord: E1
}, $t = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function L1(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function A1(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function x1(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const I1 = { duplicate: "CLOSED · DUPLICATE" };
function M1({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: O.tableMeta, children: `waiting on ${e}` });
}
function q1({ value: e }) {
  return /* @__PURE__ */ n("td", { className: O.tableCost, children: e === void 0 ? null : re(e) });
}
function P1({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: `${O.tableRecord} ward-target`, href: W(e.href), children: `→ ${e.key}` });
}
function B1({ session: e, href: a }) {
  const t = $t[e.state];
  return /* @__PURE__ */ o("tr", { className: O.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ o("td", { className: O.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: `${O.tableLink} ward-target`, href: W(a), children: e.title }),
      /* @__PURE__ */ n("span", { className: O.tableMeta, children: A1(e) })
    ] }),
    /* @__PURE__ */ o("td", { className: O.tableResolved, children: [
      x1(e.resolved),
      /* @__PURE__ */ n(M1, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(q1, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: O.tableActivity, children: L1(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: O.tableState, children: /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: I1[e.state] ?? t.label }),
      /* @__PURE__ */ n(P1, { link: e.link })
    ] }) })
  ] });
}
function O1({ session: e }) {
  const a = $t[e.state];
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
function AC(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(B1, { session: e.session, href: e.href }) : /* @__PURE__ */ n(O1, { session: e.session });
}
const D1 = "_block_1yy2v_3", j1 = "_list_1yy2v_9", H1 = "_line_1yy2v_14", ja = {
  block: D1,
  list: j1,
  line: H1
}, F1 = { warn: "warning", ok: "ok" };
function W1({ kind: e }) {
  const a = F1[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function z1({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ o("li", { className: `${ja.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(W1, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function xC({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${ja.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: ja.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(z1, { line: t }, `${r}-${t.text}`)) }) });
}
const G1 = "_band_tt7hp_1", U1 = "_head_tt7hp_8", K1 = "_cell_tt7hp_19", V1 = "_index_tt7hp_35", Y1 = "_title_tt7hp_42", X1 = "_note_tt7hp_48", J1 = "_cellTitle_tt7hp_53", Q1 = "_cellBody_tt7hp_58", Z1 = "_tag_tt7hp_64", ve = {
  band: G1,
  head: U1,
  cell: K1,
  index: V1,
  title: Y1,
  note: X1,
  cellTitle: J1,
  cellBody: Q1,
  tag: Z1
}, Sn = 4;
function IC({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== Sn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${Sn}-cell grid`);
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
  g$ as ActionStack,
  vC as ActivityConsole,
  Nm as AgentCard,
  h$ as AppShell,
  aC as AppearanceStrip,
  IC as Band,
  v$ as BarChart,
  Wd as BoardColumn,
  q$ as BoardFootnote,
  P$ as BoardHeader,
  R$ as BoardScroller,
  _ as Btn,
  s$ as CHIP_ROLES,
  dt as CREDENTIAL_COLUMNS,
  f$ as Callout,
  nC as CapabilityRow,
  SC as ChatMessage,
  An as Checkbox,
  m as Chip,
  bC as ClarificationRow,
  U$ as ClauseRuleRow,
  G$ as ClauseRules,
  zn as ColourLadder,
  tC as ComponentRow,
  pC as Composer,
  O$ as ConfigRow,
  B$ as ConfigRowHead,
  Va as ConnectionMark,
  fC as ConsoleAnnounceProvider,
  CC as Conversation,
  is as CostMeter,
  lC as CredentialRow,
  rC as CredentialRowHead,
  gC as CriteriaList,
  vl as Crumb,
  RC as DeliveryHealth,
  L$ as DeniedState,
  K$ as DryRunRail,
  sd as EmptyState,
  oC as EnvCard,
  A as Field,
  E$ as FilteredEmpty,
  C$ as FormStack,
  Ca as GateChecklist,
  yC as GateLadder,
  ys as Grid,
  Y$ as HandoffRuleRow,
  V$ as HandoffRules,
  D$ as ItemDrawer,
  iC as KeyPanel,
  Ht as LIVE_EVENT_TYPES,
  zh as LegacyBoardColumn,
  H$ as LegacyBoardHeader,
  F$ as LegacyConfigRow,
  z$ as LegacyItemDrawer,
  Bh as LegacyOverCapNote,
  W$ as LegacyPreviewRail,
  Hn as LegacyWorkCard,
  ke as LiveIndicator,
  A$ as LoadFailed,
  M$ as Loading,
  ft as MCP_SERVER_COLUMNS,
  Ka as Mark,
  cC as MarkUpload,
  Ae as Marker,
  uC as McpServerRow,
  dC as McpServerRowHead,
  X$ as NewStreamModal,
  ud as OverCapNote,
  ea as Overlay,
  Qm as PARTIAL_STEP_REASON,
  vt as POLICY_CHIP_WIDTH,
  N$ as PageFrame,
  _$ as PageHeader,
  b$ as PlainList,
  hC as PolicyRow,
  j$ as PreviewRail,
  La as ROLE_MATRIX_COLUMNS,
  nt as RULE_ACTIONS,
  qn as Radio,
  TC as ReadyChecklist,
  $$ as RecordSection,
  NC as RequeueSheet,
  kC as ResolveBlock,
  EC as ResolvedFieldRow,
  mC as RoleMatrixRow,
  LC as RoutingTable,
  J$ as RuleRow,
  wC as RunbookSteps,
  Dt as STREAM_STEPS,
  S$ as SectionBand,
  hn as SectionHeader,
  In as SegmentedControl,
  AC as SessionRow,
  w$ as Sidebar,
  Q$ as StageColumn,
  T$ as StageGrid,
  $C as StageHistory,
  af as StageListEditor,
  x$ as StaleStrip,
  Na as StatStrip,
  Z$ as StreamRow,
  k$ as SubjectRail,
  De as Switch,
  p$ as TableHead,
  m$ as Tabs,
  eC as ToolRow,
  y$ as TopBar,
  kc as Tree,
  On as TreeRow,
  xC as TypedInputBlock,
  Br as UNSAFE_HREF,
  _C as ValidationList,
  t$ as VisibilityProvider,
  r$ as Visible,
  i$ as WARD_VERSION,
  $a as WorkCard,
  I$ as WriteUnavailableStrip,
  L1 as agoSince,
  At as clock,
  pf as colourStatus,
  ae as count,
  se as duration,
  Fa as elapsed,
  o$ as eventSourceTransport,
  ba as isStreamStep,
  pa as isValidatedStreamStep,
  Zm as ladderValidation,
  Mg as mcpConnectionChip,
  xg as mcpToolName,
  re as money,
  we as ms,
  Dn as ordered,
  Tn as ratio,
  ip as restartLabel,
  W as safeHref,
  ce as stamp,
  Ln as stream,
  d$ as streamChip,
  ya as streamChipProps,
  Le as streamColour,
  Wt as streamHex,
  c$ as streamVars,
  la as useBorderFlash,
  Pt as useFocusTrap,
  u$ as useLiveFeed,
  l$ as useReturnFocus,
  va as useRovingTabindex,
  Wa as useTicker,
  xt as useVisible,
  G as v,
  sC as validateMark,
  ga as validatedStep,
  jt as validatedStreamSteps
};
