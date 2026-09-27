import { jsx as n, Fragment as L, jsxs as l } from "react/jsx-runtime";
import { useMemo as rt, useContext as We, createContext as ze, useCallback as G, useEffect as x, useState as g, useRef as N, useLayoutEffect as lt, useId as k, Fragment as ot } from "react";
import { createPortal as it } from "react-dom";
function te(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ka = (e) => String(e).padStart(2, "0");
function Ba(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ka(a % 60)}s` : `${Math.floor(t / 60)}h ${Ka(t % 60)}m`;
}
const ct = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function re(e) {
  const a = ct.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function X(e) {
  return e > 0 && e < 5e-3 ? "<$0.01" : e < 10 ? e.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) : `$${Math.round(e).toLocaleString("en-US")}`;
}
function Z(e) {
  return Math.trunc(e).toLocaleString("en-US");
}
function wn(e, a) {
  return `${e} / ${a}`;
}
const st = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function dt(e) {
  return st.format(new Date(e));
}
const _n = ze(/* @__PURE__ */ new Set());
function uk({ hidden: e, children: a }) {
  const t = rt(() => new Set(e), [e]);
  return /* @__PURE__ */ n(_n.Provider, { value: t, children: a });
}
function ut(e) {
  return !We(_n).has(e);
}
function hk({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(L, { children: ut(e) ? a : t });
}
const ht = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function mt(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function wt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = mt(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function _t(e) {
  return { onKeyDown: G(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(ht));
      wt(t, e.current, r);
    },
    [e]
  ) };
}
function mk(e, a = !0) {
  x(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Ua = { ArrowUp: -1, ArrowDown: 1 }, Va = { ArrowLeft: -1, ArrowRight: 1 }, vt = (e, a, t) => Math.min(t, Math.max(a, e));
function ft(e, a) {
  if (a !== "horizontal" && e in Ua) return Ua[e];
  if (a !== "vertical" && e in Va) return Va[e];
}
function ma({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  lt(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], _ = o.current;
    o.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = G((d) => t(d), []), c = G((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = G(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = ft(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[vt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = G(
    (d) => ({
      tabIndex: d === a ? 0 : -1,
      ref: (h) => {
        h ? r.current.set(d, h) : (r.current.delete(d), d === a && (o.current = !0));
      },
      onFocus: () => t(d),
      "data-ward-roving": !0
    }),
    [a]
  );
  return { containerProps: { onKeyDown: s }, itemProps: u, setActive: i };
}
const wk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, _k = "0.2.0", vk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], bt = [1, 2, 3, 4, 5, 6], pt = [1, 2, 3], gt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
    surface3: "var(--ward-color-surface3)"
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
    skeletonBar: "var(--ward-height-skeletonBar)"
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
}, ue = {
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
function vn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function wa(e) {
  return bt.includes(e);
}
function _a(e) {
  return pt.includes(e);
}
function fk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function bk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const Nt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function yt(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return Nt[e];
}
function Ya(e) {
  return typeof e != "string" ? null : gt.includes(e) ? e : null;
}
function kt(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function $t(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Ct(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function St(e, a, t) {
  const r = kt(e);
  if (r === null) return null;
  const o = Ya(t) ?? Ya(r.type);
  return o === null ? null : { ...r, type: o, id: $t(r, a), at: Ct(r) };
}
function Rt(e, a) {
  return e >= ue.staleAfter ? "stale" : e >= ue.heartbeat && a === "live" ? "reconnecting" : null;
}
function Tt(e, a, t) {
  return e >= ue.heartbeat && !a && t !== null;
}
function pk(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), E = N(!1), ee = N("reconnecting"), ae = G(($) => {
    ee.current = $, r($);
  }, []), le = G(() => {
    s.current = Date.now();
  }, []), qe = G(($) => {
    for (const [F, me] of c.current)
      (me === "*" || $.itemKey === me) && F($);
  }, []), oe = G(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, F, me) => {
        const Se = St($, F, me);
        Se !== null && (Se.id && (u.current = Se.id), le(), E.current = !1, ae("live"), i(Se.at), qe(Se));
      },
      onOpen: () => {
        d.current = 0, E.current = !1, le(), ae("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, E.current = !0, ee.current !== "stale" && ae("reconnecting");
        const $ = Math.min(ue.reconnectBase * 2 ** d.current, ue.reconnectMax);
        d.current += 1, _.current = window.setTimeout(oe, $);
      }
    });
  }, [qe, ae, le, a, e]), Ie = G(($) => {
    E.current = !0, $.close(), h.current = null, _.current = window.setTimeout(oe, ue.reconnectBase);
  }, [oe]), Me = G(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return x(() => (oe(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = Rt($, ee.current);
    F && ae(F);
    const me = h.current;
    Tt($, E.current, me) && Ie(me);
  }, ue.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), E.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [oe, Ie, ae]), { connection: t, lastEventAt: o, subscribe: Me };
}
function Pa(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return x(() => {
    if (!a) return;
    const i = () => {
      document.visibilityState !== "hidden" && !document.hidden && o(Date.now());
    };
    i();
    const c = window.setInterval(i, ue.tick);
    return document.addEventListener("visibilitychange", i), () => {
      window.clearInterval(c), document.removeEventListener("visibilitychange", i);
    };
  }, [a, t]), Math.max(0, r - t);
}
function Lt() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ja(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function aa(e, a) {
  const t = N(0), r = G((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (Lt() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Ja(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Ja(c), ue.flash)));
  }, [a, e]);
  return x(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const At = "_root_1otpc_2", xt = {
  root: At
};
function Et(e, a, t, r, o) {
  const i = [Ba(a)];
  return e || i.push(`as of ${dt(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Pa(e, o), c = (a == null ? void 0 : a.at) ?? e, s = Et(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${xt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      re(e)
    ] })
  ] });
}
const qt = "_app_lrbcc_1", It = "_side_lrbcc_18", Mt = "_main_lrbcc_26", Bt = "_rail_lrbcc_33", Pt = "_page_lrbcc_40", Dt = "_root_lrbcc_91", Ot = "_topbar_lrbcc_98", Ht = "_mark_lrbcc_109", Ft = "_brand_lrbcc_116", jt = "_tagline_lrbcc_122", Wt = "_identity_lrbcc_128", zt = "_tools_lrbcc_129", Gt = "_actor_lrbcc_138", Kt = "_metadata_lrbcc_139", Ut = "_detail_lrbcc_155", Vt = "_nav_lrbcc_160", Yt = "_content_lrbcc_195", Jt = "_skip_lrbcc_218", D = {
  app: qt,
  side: It,
  main: Mt,
  rail: Bt,
  page: Pt,
  root: Dt,
  topbar: Ot,
  mark: Ht,
  brand: Ft,
  tagline: jt,
  identity: Wt,
  tools: zt,
  actor: Gt,
  metadata: Kt,
  detail: Ut,
  nav: Vt,
  content: Yt,
  skip: Jt
};
function Xt({ sidebar: e, header: a, children: t, rail: r }) {
  const o = r != null;
  return /* @__PURE__ */ l("div", { className: D.app, "data-rail": o ? "true" : "false", children: [
    /* @__PURE__ */ n("div", { className: D.side, children: e }),
    /* @__PURE__ */ l("main", { className: D.main, children: [
      a,
      /* @__PURE__ */ n("div", { className: D.page, children: t })
    ] }),
    o && /* @__PURE__ */ n("div", { className: D.rail, children: r })
  ] });
}
function Qt({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function la({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function Zt({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(la, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(la, { value: a, className: D.detail })
  ] });
}
function er(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(la, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(Qt, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(Zt, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(la, { value: e.tools, className: D.tools })
  ] });
}
function ar(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(er, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function nr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function gk(e) {
  return nr(e) ? /* @__PURE__ */ n(Xt, { ...e }) : /* @__PURE__ */ n(ar, { ...e });
}
const tr = "_btn_llheq_2", rr = "_primary_llheq_13", lr = "_secondary_llheq_23", or = "_ghost_llheq_28", ir = "_overflow_llheq_37", cr = "_sm_llheq_44", sr = "_disabled_llheq_48", Xe = {
  btn: tr,
  primary: rr,
  secondary: lr,
  ghost: or,
  overflow: ir,
  sm: cr,
  disabled: sr
};
function dr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function ur(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function hr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function mr(e) {
  return e.children ?? e.label;
}
function v(e) {
  hr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: dr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...ur(a, e.controls),
      children: mr(e)
    }
  );
}
function Da(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const wr = "_root_o4yib_2", _r = "_row_o4yib_8", vr = "_box_o4yib_14", fr = "_label_o4yib_21", br = "_lockedNote_o4yib_26", pr = "_consequence_o4yib_34", gr = "_sample_o4yib_69", Te = {
  root: wr,
  row: _r,
  box: vr,
  label: fr,
  lockedNote: br,
  consequence: pr,
  sample: gr
};
function Nr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function yr({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Te.consequence} ward-check-consequence`, children: a }) : null;
}
function kr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Te.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function $r({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Te.sample, "aria-hidden": "true", children: e }) : null;
}
function fn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = Nr(e);
  return /* @__PURE__ */ l("div", { className: `${Te.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Te.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Te.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Da(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Te.label, children: [
        e.label,
        /* @__PURE__ */ n(kr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n($r, { text: e.sample })
    ] }),
    /* @__PURE__ */ n(yr, { id: t, text: e.consequence })
  ] });
}
const Cr = "_chip_1073r_2", Sr = {
  chip: Cr
}, Rr = {
  gate: j.chip.gate,
  system: j.chip.system,
  write: j.chip.write,
  drift: j.chip.drift,
  done: j.chip.done,
  attention: j.chip.attention,
  failed: j.chip.failed,
  pending: j.chip.pending,
  running: j.chip.running,
  warn: j.chip.warn,
  meta: j.chip.meta,
  soft: j.chip.soft,
  quiet: j.chip.quiet
};
function Tr(e, a) {
  if (e === "stream") return Lr(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Rr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Lr(e) {
  if (!e || !_a(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = vn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Sr.chip} ward-chip ward-chip--${e}`, style: Tr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function va(e) {
  return typeof e == "number" && _a(e) ? e : null;
}
function $e(e, a) {
  const t = va(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function fa(e, a) {
  const t = va(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Ar = "_nav_fbsei_2", xr = "_list_fbsei_8", Er = "_item_fbsei_15", qr = "_link_fbsei_24", Ir = "_current_fbsei_33", Mr = "_chips_fbsei_37", Be = {
  nav: Ar,
  list: xr,
  item: Er,
  link: qr,
  current: Ir,
  chips: Mr
};
function Br({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Be.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Be.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Pr = "_field_1oadv_2", Dr = "_label_1oadv_8", Or = "_labelHidden_1oadv_15", Hr = "_control_1oadv_25", Fr = "_mono_1oadv_44", jr = "_area_1oadv_49", Wr = "_invalid_1oadv_56", ke = {
  field: Pr,
  label: Dr,
  labelHidden: Or,
  control: Hr,
  mono: Fr,
  area: jr,
  invalid: Wr
};
function zr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Gr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Kr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Ur = { input: zr, select: Gr, textarea: Kr };
function Vr(e, a, t) {
  const r = Ur[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Yr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Da(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Jr(e) {
  const a = e.mono ? [ke.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [ke.area] : [];
  return [ke.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Xr(e) {
  return e ? `${ke.label} ${ke.labelHidden} ward-field-label` : `${ke.label} ward-field-label`;
}
function A(e) {
  const a = k(), t = `${a}-msg`, r = Yr(e, a, t), o = Jr(e);
  return /* @__PURE__ */ l("div", { className: `${ke.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Xr(e.labelHidden), htmlFor: a, children: e.label }),
    Vr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${ke.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const Qr = "_strip_rg8pj_2", Zr = "_tab_rg8pj_12", el = "_count_rg8pj_34", La = {
  strip: Qr,
  tab: Zr,
  count: el
}, Xa = 7;
function al(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function nl(e) {
  return `${La.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Nk({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Xa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Xa} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = al(e, a);
  return x(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: nl(o),
      role: "tablist",
      "aria-label": r,
      "data-level": o,
      ...i.containerProps,
      children: e.map((s, u) => /* @__PURE__ */ l(
        "button",
        {
          id: `tab-${s.id}`,
          type: "button",
          role: "tab",
          className: `${La.tab} ward-tab`,
          "aria-selected": s.id === a,
          "aria-controls": `panel-${s.id}`,
          onClick: () => t(s.id),
          ...i.itemProps(u),
          children: [
            s.label,
            s.count === void 0 ? null : /* @__PURE__ */ l(L, { children: [
              " ",
              /* @__PURE__ */ n("span", { className: La.count, children: `· ${s.count}` })
            ] })
          ]
        },
        s.id
      ))
    }
  );
}
const tl = "_root_jem6y_2", rl = "_segment_jem6y_7", Qa = {
  root: tl,
  segment: rl
};
function bn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ma({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return x(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Qa.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Qa.segment,
      "aria-checked": u.value === a,
      disabled: o,
      "aria-describedby": i,
      onClick: () => t(u.value),
      ...c.itemProps(d),
      children: u.label
    },
    u.value
  )) });
}
const ll = "_sidebar_1jywv_3", ol = "_brand_1jywv_9", il = "_mark_1jywv_17", cl = "_word_1jywv_24", sl = "_nav_1jywv_30", dl = "_navItem_1jywv_38", ul = "_group_1jywv_50", hl = "_groupName_1jywv_57", ml = "_agents_1jywv_70", wl = "_agent_1jywv_70", _l = "_agentTop_1jywv_88", vl = "_dot_1jywv_95", fl = "_agentName_1jywv_107", bl = "_agentMeta_1jywv_120", pl = "_foot_1jywv_126", gl = "_footName_1jywv_132", Nl = "_footLinks_1jywv_139", yl = "_footLink_1jywv_139", kl = "_root_1jywv_153", $l = "_linkBrand_1jywv_162", Cl = "_label_1jywv_183", Sl = "_note_1jywv_188", Rl = "_footer_1jywv_202", C = {
  sidebar: ll,
  brand: ol,
  mark: il,
  word: cl,
  nav: sl,
  navItem: dl,
  group: ul,
  groupName: hl,
  new: "_new_1jywv_64",
  agents: ml,
  agent: wl,
  agentTop: _l,
  dot: vl,
  agentName: fl,
  agentMeta: bl,
  foot: pl,
  footName: gl,
  footLinks: Nl,
  footLink: yl,
  root: kl,
  linkBrand: $l,
  label: Cl,
  note: Sl,
  footer: Rl
};
function Tl({ agent: e }) {
  const a = e.paused === !0;
  return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ l(
    "a",
    {
      className: C.agent,
      href: e.href,
      "aria-current": e.current === !0 ? "page" : void 0,
      "data-paused": a ? "true" : void 0,
      children: [
        /* @__PURE__ */ l("span", { className: C.agentTop, children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: C.dot,
              "data-paused": a ? "true" : void 0,
              style: { "--dot": vn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Ll({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function Al({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
  if (!e) throw new Error("Sidebar: brand is required");
  return /* @__PURE__ */ l("nav", { className: C.sidebar, "aria-label": e, children: [
    /* @__PURE__ */ l("div", { className: C.brand, children: [
      /* @__PURE__ */ n("span", { className: C.mark }),
      /* @__PURE__ */ n("span", { className: C.word, children: e })
    ] }),
    /* @__PURE__ */ n("div", { className: C.nav, children: a.map((c) => /* @__PURE__ */ n("a", { className: C.navItem, href: c.href, "aria-current": c.current === !0 ? "page" : void 0, children: c.label }, c.href)) }),
    /* @__PURE__ */ l("div", { className: C.group, children: [
      /* @__PURE__ */ l("span", { className: C.groupName, children: [
        t,
        " · ",
        Z(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(Tl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Ll, { shared: i })
  ] });
}
function xl(e) {
  return e.destinations ?? e.items ?? [];
}
function El({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function ql({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Il({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Ml(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(El, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: xl(e).map((a) => /* @__PURE__ */ n(Il, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(ql, { children: e.children })
  ] });
}
function Bl(e) {
  return "agents" in e;
}
function yk(e) {
  return Bl(e) ? /* @__PURE__ */ n(Al, { ...e }) : /* @__PURE__ */ n(Ml, { ...e });
}
const Pl = "_mark_wlgi8_3", Dl = {
  mark: Pl
}, Ol = { met: "✓", unmet: "", failed: "✕" };
function Oa({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Dl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Ol[e]
    }
  );
}
const Hl = "_marker_br9fi_2", Fl = {
  marker: Hl
}, jl = {
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
  attention: "var(--ward-color-amber)",
  tick: "var(--ward-color-green)",
  box: "var(--ward-color-line2)"
};
function Ce({ size: e, kind: a, label: t }) {
  const r = { "--marker": jl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Fl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Wl = "_root_ti0pq_2", zl = "_chip_ti0pq_11", Gl = "_noCase_ti0pq_23", Qe = {
  root: Wl,
  chip: zl,
  noCase: Gl
};
function Kl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Ha({ connection: e, since: a, lastEventAt: t }) {
  const r = Kl(a, t), o = Pa(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Ce, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Ba(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    re(r)
  ] });
}
const Ul = "_root_11rs7_2", Vl = "_context_11rs7_12", Yl = "_row_11rs7_1", Jl = "_heading_11rs7_25", Xl = "_headingWrap_11rs7_33", Ql = "_chips_11rs7_38", Zl = "_title_11rs7_45", eo = "_consequence_11rs7_54", ao = "_actionsWrap_11rs7_59", no = "_actions_11rs7_59", to = "_action_11rs7_59", ro = "_overflowPanel_11rs7_78", lo = "_measure_11rs7_88", Y = {
  root: Ul,
  context: Vl,
  row: Yl,
  heading: Jl,
  headingWrap: Xl,
  chips: Ql,
  title: Zl,
  consequence: eo,
  actionsWrap: ao,
  actions: no,
  action: to,
  overflowPanel: ro,
  measure: lo
};
function oo({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: Y.heading, children: [
    /* @__PURE__ */ n("h1", { className: Y.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Y.consequence, children: a })
  ] });
}
function pn({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Y.action, "data-action": "", children: a }, t));
}
function io({ actions: e, collapsed: a, onOverflow: t, disclosure: r }) {
  return a ? t ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: t, children: "···" }) : /* @__PURE__ */ n(v, { variant: "overflow", onClick: r.toggle, expanded: r.open, controls: r.panelId, children: "···" }) : /* @__PURE__ */ n(pn, { actions: e });
}
function co({ actions: e, disclosure: a, onEscape: t }) {
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Y.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(pn, { actions: e }) });
}
function so(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function uo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Y.context, children: [
    /* @__PURE__ */ n(Br, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Y.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function ho(...e) {
  return e.some((a) => a === null);
}
function mo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function wo(e, a, t, r, o) {
  if (o === 0 || ho(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = mo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function _o(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function vo(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return x(() => {
    const s = a.current;
    if (!_o(s)) return;
    const u = () => c(wo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function fo({ connection: e }) {
  return e ? /* @__PURE__ */ n(Ha, { connection: e.connection, since: e.since }) : null;
}
function kk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], connection: i, onOverflow: c, density: s = "page" }) {
  const { rowRef: u, headingRef: d, actionsRef: h, measureRef: _, collapsed: b } = vo(o), { disclosure: E, close: ee } = so(b, h);
  return /* @__PURE__ */ l("header", { className: Y.root, "data-density": s, children: [
    /* @__PURE__ */ n(uo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Y.row, ref: u, children: [
      /* @__PURE__ */ n("div", { ref: d, className: Y.headingWrap, children: /* @__PURE__ */ n(oo, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Y.actionsWrap, children: [
        /* @__PURE__ */ n(fo, { connection: i }),
        /* @__PURE__ */ n("div", { className: Y.actions, ref: h, "data-ward-actions": !0, children: /* @__PURE__ */ n(io, { actions: o, collapsed: b, onOverflow: c, disclosure: E }) })
      ] })
    ] }),
    b && !c ? /* @__PURE__ */ n(co, { actions: o, disclosure: E, onEscape: ee }) : null,
    /* @__PURE__ */ n("div", { className: Y.measure, ref: _, "aria-hidden": "true", children: o.map((ae, le) => /* @__PURE__ */ n("span", { children: ae }, le)) })
  ] });
}
function gn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return x(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const bo = "_scrim_c7sqj_2", po = "_drawer_c7sqj_10", go = "_sheet_c7sqj_14", No = "_modal_c7sqj_18", yo = "_panel_c7sqj_23", ko = "_header_c7sqj_51", $o = "_title_c7sqj_59", Co = "_body_c7sqj_63", So = "_close_c7sqj_90", pe = {
  scrim: bo,
  drawer: po,
  sheet: go,
  modal: No,
  panel: yo,
  header: ko,
  title: $o,
  body: Co,
  close: So
}, Ro = ze(null), oa = [], ia = /* @__PURE__ */ new Map();
function To(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function Lo(e, a) {
  let t = ia.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ia.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Ao(e, a) {
  for (const t of Array.from(a.children))
    To(t) || Lo(e, t);
}
function xo(e) {
  for (const a of e.claims) {
    const t = ia.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ia.delete(a)));
  }
}
function Eo(e, a) {
  const t = { root: e, claims: [] };
  return oa.push(t), Ao(t, a), t;
}
function qo(e) {
  const a = oa.indexOf(e);
  a >= 0 && oa.splice(a, 1), xo(e);
}
function Za(e) {
  return e !== null && oa.at(-1) === e;
}
function Io(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, x(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Eo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = Za(s);
      qo(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), G(() => Za(r.current), []);
}
function Mo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Bo(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Po({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function Do(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Oo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function Ho(e) {
  const a = We(Ro);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = Ho(e.container), i = gn("(min-width: 768px)"), c = Mo(e.kind, i), s = Bo(e, r), u = _t(t), d = Io(a, o, e.returnFocusTo), h = G(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return x(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), x(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), it(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: Do(c),
        "data-ward-overlay-kind": c,
        "data-ward-overlay-root": "",
        onClick: h,
        children: /* @__PURE__ */ l(
          "div",
          {
            ref: t,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s.labelledBy,
            "aria-label": s.label,
            className: Oo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Po, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Fo = "_root_drrhx_2", jo = "_ticket_drrhx_15", Wo = "_body_drrhx_24", ya = {
  root: Fo,
  ticket: jo,
  body: Wo
};
function $k({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ya.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ya.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ya.body, children: t })
  ] });
}
const zo = "_root_1bfqw_2", Go = "_figure_1bfqw_7", Ko = "_of_1bfqw_13", Uo = "_bar_1bfqw_18", Vo = "_rows_1bfqw_38", Yo = "_row_1bfqw_38", Jo = "_label_1bfqw_49", Xo = "_amount_1bfqw_54", Ne = {
  root: zo,
  figure: Go,
  of: Ko,
  bar: Uo,
  rows: Vo,
  row: Yo,
  label: Jo,
  amount: Xo
};
function Qo({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${Ne.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${Ne.figure} ward-stat-value`, children: [
      X(e),
      " ",
      /* @__PURE__ */ l("span", { className: Ne.of, children: [
        "of ",
        X(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${Ne.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${X(e)} of ${X(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: Ne.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${Ne.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: Ne.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: Ne.amount, children: X(o.amount) })
    ] }, o.label)) })
  ] });
}
const Zo = "_frame_mg2jl_2", ei = "_table_mg2jl_6", ai = "_th_mg2jl_12", ni = "_td_mg2jl_13", ti = "_sort_mg2jl_47", ri = "_row_mg2jl_53", li = "_empty_mg2jl_61", ye = {
  frame: Zo,
  table: ei,
  th: ai,
  td: ni,
  sort: ti,
  row: ri,
  empty: li
}, oi = { asc: "ascending", desc: "descending" };
function ii(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return oi[a.direction];
}
function ci(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ye.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function si(e) {
  return e === void 0 ? void 0 : { width: e };
}
function di({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ye.th,
      style: si(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ii(e, a),
      children: ci(e, t)
    }
  );
}
function ui({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: ye.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ n("td", { className: ye.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function hi({
  label: e,
  columns: a,
  rows: t,
  rowId: r,
  renderCell: o,
  selectedId: i,
  lockedIds: c = [],
  sort: s,
  onSort: u,
  empty: d
}) {
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: ye.empty, children: d }) : /* @__PURE__ */ n("div", { className: ye.frame, children: /* @__PURE__ */ l("table", { className: ye.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ye.head, children: a.map((h) => /* @__PURE__ */ n(di, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(ui, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const mi = "_set_y5zy3_2", wi = "_legend_y5zy3_7", _i = "_row_y5zy3_15", vi = "_control_y5zy3_20", fi = "_input_y5zy3_26", bi = "_label_y5zy3_31", pi = "_consequence_y5zy3_36", Re = {
  set: mi,
  legend: wi,
  row: _i,
  control: vi,
  input: fi,
  label: bi,
  consequence: pi
};
function Nn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: Re.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Re.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Re.row, children: [
        /* @__PURE__ */ l("span", { className: Re.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Re.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Da(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Re.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Re.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const gi = "_root_1h1ot_2", Ni = "_head_1h1ot_11", yi = "_index_1h1ot_25", ki = "_dot_1h1ot_29", $i = "_note_1h1ot_34", Ci = "_counter_1h1ot_40", Si = "_trailing_1h1ot_48", Le = {
  root: gi,
  head: Ni,
  index: yi,
  dot: ki,
  note: $i,
  counter: Ci,
  trailing: Si
};
function Ri({ index: e }) {
  return e ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${Le.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: Le.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ti({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Le.counter, "aria-hidden": "true", children: e }) : null;
}
function Li({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${Le.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: Le.head, children: [
      /* @__PURE__ */ n(Ri, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: Le.note, children: t }),
    /* @__PURE__ */ n(Ti, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: Le.trailing, children: i })
  ] });
}
const Ai = "_strip_1qhvo_2", xi = "_cell_1qhvo_7", Ei = "_value_1qhvo_12", qi = "_label_1qhvo_27", Ze = {
  strip: Ai,
  cell: xi,
  value: Ei,
  label: qi
};
function Ii(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ba({ cells: e, divided: a = !1 }) {
  return Ii(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Mi = "_root_xk7sv_2", Bi = "_track_xk7sv_8", Pi = "_thumb_xk7sv_35", Di = "_labelHidden_xk7sv_53", Oi = "_label_xk7sv_53", Hi = "_lockedNote_xk7sv_68", Ae = {
  root: Mi,
  track: Bi,
  thumb: Pi,
  labelHidden: Di,
  label: Oi,
  lockedNote: Hi
};
function Fi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden}` : Ae.label;
}
function Ee({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
  const s = k(), u = o ? !0 : a, d = r || o;
  return /* @__PURE__ */ l("span", { className: `${Ae.root} ward-switchrow`, children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": u,
        "aria-label": e,
        "aria-labelledby": s,
        "aria-describedby": i,
        className: `${Ae.track} ward-switch`,
        "data-on": u,
        "data-locked": o ? !0 : void 0,
        disabled: d,
        onClick: () => !d && (t == null ? void 0 : t(!u)),
        children: /* @__PURE__ */ n("span", { className: Ae.thumb })
      }
    ),
    /* @__PURE__ */ l("span", { id: s, className: Fi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ae.lockedNote, children: "always on" })
    ] })
  ] });
}
const ji = "_bar_1u2kl_2", Wi = "_skip_1u2kl_11", zi = "_mark_1u2kl_22", Gi = "_nav_1u2kl_30", Ki = "_list_1u2kl_34", Ui = "_select_1u2kl_40", Vi = "_dest_1u2kl_47", Yi = "_actor_1u2kl_61", Ji = "_actorMark_1u2kl_74", Xi = "_actorLabel_1u2kl_79", Qi = "_tagline_1u2kl_98", ie = {
  bar: ji,
  skip: Wi,
  mark: zi,
  nav: Gi,
  list: Ki,
  select: Ui,
  dest: Vi,
  actor: Yi,
  actorMark: Ji,
  actorLabel: Xi,
  tagline: Qi
};
function Zi(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function ec(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Ck({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = ec(r);
  return /* @__PURE__ */ l("header", { className: ie.bar, children: [
    /* @__PURE__ */ n("a", { className: ie.skip, href: `#${c}`, children: "Skip to content" }),
    /* @__PURE__ */ n("span", { className: ie.mark, children: e }),
    o && /* @__PURE__ */ n("span", { className: ie.tagline, children: o }),
    /* @__PURE__ */ l("nav", { className: ie.nav, "aria-label": "Primary", children: [
      /* @__PURE__ */ n("ul", { className: ie.list, children: a.map((u) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(
        "a",
        {
          className: ie.dest,
          href: u.href,
          "aria-current": u.id === t ? "page" : void 0,
          onClick: () => i == null ? void 0 : i(u.id),
          children: u.label
        }
      ) }, u.id)) }),
      /* @__PURE__ */ n(
        "select",
        {
          className: ie.select,
          "aria-label": "Destination",
          value: t,
          onChange: (u) => i == null ? void 0 : i(u.target.value),
          children: a.map((u) => /* @__PURE__ */ n("option", { value: u.id, children: u.label }, u.id))
        }
      )
    ] }),
    s && /* @__PURE__ */ l("span", { className: ie.actor, children: [
      /* @__PURE__ */ n("span", { className: ie.actorLabel, children: s }),
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: Zi(s) })
    ] })
  ] });
}
const ac = "_tree_1lyby_2", nc = "_item_1lyby_6", tc = "_row_1lyby_10", rc = "_button_1lyby_22", ca = {
  tree: ac,
  item: nc,
  row: tc,
  button: rc
}, yn = ze(null);
function lc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(yn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ca.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const oc = { ArrowRight: !0, ArrowLeft: !1 };
function en(e) {
  return e ? !0 : void 0;
}
function ic(e, a) {
  const t = oc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function cc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function sc(e) {
  const a = [ca.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function dc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function uc(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function hc(e) {
  return typeof e == "string" ? e : void 0;
}
function mc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function wc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function kn(e) {
  const a = We(yn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = dc(e);
  return /* @__PURE__ */ l("li", { className: ca.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: sc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": en(e.unresolved),
        "data-inherited": en(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ca.button} ward-treeitem-btn`,
            onClick: () => cc(e),
            onKeyDown: (r) => ic(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: uc(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: hc(e.label), children: e.label }),
              /* @__PURE__ */ n(mc, { value: e.detail }),
              /* @__PURE__ */ n(wc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const _c = "_frame_9lntd_2", vc = "_subjectRail_9lntd_21", fc = "_subject_9lntd_21", bc = "_rail_9lntd_41", pc = "_record_9lntd_63", gc = "_recordBody_9lntd_68", Nc = "_band_9lntd_111", yc = "_bandBody_9lntd_120", kc = "_bandActions_9lntd_125", $c = "_scroller_9lntd_132", Cc = "_lanes_9lntd_150", de = {
  frame: _c,
  subjectRail: vc,
  subject: fc,
  rail: bc,
  record: pc,
  recordBody: gc,
  band: Nc,
  bandBody: yc,
  bandActions: kc,
  scroller: $c,
  lanes: Cc
};
function Sk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: de.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function an(e) {
  return e ? "true" : void 0;
}
function Rk({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: de.subjectRail, "data-ward-subject-rail": t, "data-ruled": an(i), children: [
    /* @__PURE__ */ n("div", { className: de.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: de.rail, "data-sticky": an(o), "aria-label": r, children: a })
  ] });
}
function Tk({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(Li, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const Sc = "_form_1j8ub_2", Rc = "_fields_1j8ub_9", Tc = "_actions_1j8ub_19", ka = {
  form: Sc,
  fields: Rc,
  actions: Tc
};
function Lk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ka.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ka.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ka.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function Ak({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const Lc = "(max-width: 767.98px)";
function Aa({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Ac({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Aa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function xk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = gn(Lc);
  return t === void 0 ? /* @__PURE__ */ n(Aa, { label: a, children: e }) : o ? /* @__PURE__ */ n(Ac, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Aa, { label: a, children: t.map((i) => /* @__PURE__ */ n(ot, { children: i.content }, i.id)) });
}
const xc = "_block_1o5o7_2", Ec = "_sentence_1o5o7_15", qc = "_meta_1o5o7_20", Ic = "_action_1o5o7_25", Mc = "_strip_1o5o7_29", Bc = "_loading_1o5o7_48", Pc = "_label_1o5o7_56", Dc = "_counter_1o5o7_63", he = {
  block: xc,
  sentence: Ec,
  meta: qc,
  action: Ic,
  strip: Mc,
  loading: Bc,
  label: Pc,
  counter: Dc
};
function Oc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function pa({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Oc, { action: a })
  ] });
}
function Hc(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Ek({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(pa, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function qk(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Ik({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Mk({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    " — showing snapshot from ",
    re(a)
  ] });
}
function Bk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Pk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  x(() => {
    const c = window.setTimeout(() => o(!0), ue.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Pa(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${he.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: he.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: he.counter, children: Ba(i) }) : null
  ] });
}
const Fc = "_note_tlubt_2", jc = {
  note: Fc
};
function Wc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: jc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const zc = "_card_12in3_2", Gc = "_hit_12in3_23", Kc = "_head_12in3_30", Uc = "_title_12in3_36", Vc = "_meta_12in3_44", Yc = "_fields_12in3_45", Jc = "_who_12in3_58", Xc = "_sep_12in3_65", Qc = "_mono_12in3_69", Zc = "_field_12in3_45", es = "_last_12in3_84", as = "_reason_12in3_96", K = {
  card: zc,
  hit: Gc,
  head: Kc,
  title: Uc,
  meta: Vc,
  fields: Yc,
  who: Jc,
  sep: Xc,
  mono: Qc,
  field: Zc,
  last: es,
  reason: as
}, ns = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function ts(e, a, t) {
  const r = aa(e, "blue"), o = aa(e, "orange"), i = aa(e, "green"), c = N(/* @__PURE__ */ new Set());
  x(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = ns[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const rs = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : X(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ls(e, a) {
  return rs[a](e);
}
function os({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: K.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ l("p", { className: K.meta, children: [
    /* @__PURE__ */ l("span", { className: K.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: K.meta, children: [
    /* @__PURE__ */ l("span", { className: K.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ l("span", { className: K.mono, children: [
      te(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function is({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: K.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function cs({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: K.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ss({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: K.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: K.field, children: ls(e, t) }, t)) });
}
const xa = (e) => e ? !0 : void 0;
function ds(e) {
  return { "--stream": $e(e.streamStep, "id") };
}
function us(e, a, t) {
  e == null || e(a, t);
}
function hs(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function ms({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: K.last, "data-stale": xa(a), children: t }) : null;
}
function ga(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  ts(r, t.key, e.feed);
  const o = hs(e.feed), i = ds(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: K.card,
      style: i,
      "data-selected": xa(e.selected),
      "data-flagged": xa(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: K.hit, onClick: (c) => us(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(is, { item: t }),
        /* @__PURE__ */ n("p", { className: K.title, children: t.title }),
        /* @__PURE__ */ n(os, { item: t, connection: o }),
        /* @__PURE__ */ n(cs, { reason: t.blockedReason }),
        /* @__PURE__ */ n(ss, { item: t, fields: a }),
        /* @__PURE__ */ n(ms, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const ws = "_column_14784_3", _s = "_head_14784_24", vs = "_label_14784_33", fs = "_count_14784_42", bs = "_list_14784_56", Ke = {
  column: ws,
  head: _s,
  label: vs,
  count: fs,
  list: bs
};
function $n(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ps({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function gs(e) {
  return /* @__PURE__ */ n("div", { className: Ke.list, role: "list", children: e.rows.map((a, t) => {
    var r;
    return /* @__PURE__ */ n(
      ga,
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
function Ns({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = $n(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ps, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n(gs, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Wc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const ys = "_foot_8qg4p_2", ks = "_note_8qg4p_13", $s = "_link_8qg4p_19", $a = {
  foot: ys,
  note: ks,
  link: $s
};
function Dk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: $a.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: $a.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: $a.link, href: e, children: "Configure board" })
  ] });
}
const Cs = "_head_1la6p_3", Ss = "_identity_1la6p_12", Rs = "_titleRow_1la6p_18", Ts = "_title_1la6p_18", Ls = "_key_1la6p_35", As = "_rollup_1la6p_45", xs = "_tools_1la6p_53", Es = "_swatch_1la6p_62", qs = "_mark_1la6p_69", ve = {
  head: Cs,
  identity: Ss,
  titleRow: Rs,
  title: Ts,
  key: Ls,
  rollup: As,
  tools: xs,
  swatch: Es,
  mark: qs
}, nn = "initials:";
function Is(e) {
  return e === void 0 ? "loaded this week unavailable" : `${Z(e)} loaded this week`;
}
function Ms(e) {
  const a = [`${Z(e.inFlight)} in flight`, Is(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${Z(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function Bs(e) {
  return e.startsWith(nn) ? e.slice(nn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Ps({ markRef: e, streamStep: a }) {
  const t = { "--stream": $e(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Bs(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function Ds({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Ok({
  stream: e,
  rollups: a,
  connection: t,
  lastEventAt: r,
  owners: o,
  owner: i,
  onOwnerChange: c,
  onConfigure: s,
  actions: u
}) {
  return /* @__PURE__ */ l("div", { className: ve.head, children: [
    /* @__PURE__ */ l("div", { className: ve.identity, children: [
      /* @__PURE__ */ l("div", { className: ve.titleRow, children: [
        /* @__PURE__ */ n(Ps, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: Ms(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(Ds, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Ha, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Os = "_head_kabyh_11", Hs = "_line_kabyh_12", Fs = "_cHandle_kabyh_33", js = "_cName_kabyh_38", Ws = "_nameLine_kabyh_46", zs = "_cLabel_kabyh_53", Gs = "_cCap_kabyh_58", Ks = "_cShown_kabyh_63", Us = "_name_kabyh_46", Vs = "_noCap_kabyh_85", Ys = "_state_kabyh_99", Js = "_handle_kabyh_104", Xs = "_sub_kabyh_118", I = {
  head: Os,
  line: Hs,
  cHandle: Fs,
  cName: js,
  nameLine: Ws,
  cLabel: zs,
  cCap: Gs,
  cShown: Ks,
  name: Us,
  noCap: Vs,
  state: Ys,
  handle: Js,
  sub: Xs
}, Qs = "can't be hidden or collapsed", Zs = "terminal · counted, not a column";
function Hk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function ed(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function ad(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function tn(e) {
  return e.gate ? Qs : e.terminal ? Zs : ad(e.agentsMounted);
}
function nd(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function td({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    tn(e) && /* @__PURE__ */ n("span", { className: I.sub, children: tn(e) })
  ] });
}
function rd(e) {
  return e === void 0 ? "" : String(e);
}
function ld(e) {
  return e === "" ? void 0 : Number(e);
}
function od({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => nd(t, a),
      children: "⠿"
    }
  ) });
}
function id({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: rd(a.cap), onChange: (r) => t({ ...a, cap: ld(r) }) }) });
}
function cd({ stage: e, config: a, onChange: t }) {
  const r = ed(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(Ee, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function sd(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Fk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": sd(e), children: [
    /* @__PURE__ */ n(od, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(td, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(id, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(cd, { stage: e, config: a, onChange: t })
  ] });
}
const dd = "_body_hn6d6_2", ud = "_head_hn6d6_9", hd = "_summary_hn6d6_19", md = "_block_hn6d6_20", wd = "_actionsBlock_hn6d6_21", _d = "_title_hn6d6_41", vd = "_note_hn6d6_46", fd = "_k_hn6d6_51", bd = "_kv_hn6d6_58", pd = "_row_hn6d6_64", gd = "_label_hn6d6_75", Nd = "_value_hn6d6_84", yd = "_quote_hn6d6_90", kd = "_actions_hn6d6_21", $d = "_resolve_hn6d6_103", M = {
  body: dd,
  head: ud,
  summary: hd,
  block: md,
  actionsBlock: wd,
  title: _d,
  note: vd,
  k: fd,
  kv: bd,
  row: pd,
  label: gd,
  value: Nd,
  quote: yd,
  actions: kd,
  resolve: $d
};
function Cd(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function Sd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Rd(e) {
  const a = va(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Td(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...fa(Rd(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Cd(e),
    ...Sd(e, a)
  ];
}
function Ld({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Ad({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function xd({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function jk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Td(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Ad, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(xd, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(Ld, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Ed = "_root_3azmy_2", qd = "_list_3azmy_7", Id = "_item_3azmy_12", Md = "_box_3azmy_18", Bd = "_text_3azmy_23", Pd = "_note_3azmy_28", Pe = {
  root: Ed,
  list: qd,
  item: Id,
  box: Md,
  text: Bd,
  note: Pd
};
function Na({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Pe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Pe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Pe.box, children: /* @__PURE__ */ n(Oa, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Pe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Pe.note} ward-checklist-note`, children: a })
  ] });
}
const Dd = "_rail_ke7ch_2", Od = "_k_ke7ch_11", Hd = "_head_ke7ch_19", Fd = "_section_ke7ch_25", jd = "_card_ke7ch_38", Wd = "_strip_ke7ch_42", zd = "_skeleton_ke7ch_56", Gd = "_skeletonLabel_ke7ch_70", Kd = "_bar_ke7ch_76", Ud = "_note_ke7ch_85", se = {
  rail: Dd,
  k: Od,
  head: Hd,
  section: Fd,
  card: jd,
  strip: Wd,
  skeleton: zd,
  skeletonLabel: Gd,
  bar: Kd,
  note: Ud
};
function Vd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ca({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function Yd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function Jd({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Ns, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function Xd(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(Jd, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Yd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Wk(e) {
  const a = Vd(e.onOpen), t = $n(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ca, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(ga, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ca, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(Xd, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ca, { title: "Effect of this config", children: /* @__PURE__ */ n(Na, { items: e.effects, density: "compact" }) })
  ] });
}
function Qd(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function Zd(e) {
  return Math.ceil(e.length / 2);
}
function eu(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Cn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function au(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Cn(e);
  o !== void 0 && t(o), r(eu(e.type));
}
function nu(e, a, t, r, o) {
  x(() => {
    if (e !== null)
      return e.subscribe(a, (i) => au(i, t, r, o));
  }, [e, a, t, r, o]);
}
function tu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function ru(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function lu(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function ou(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(Zd(a ?? [])) + ")"
  };
}
function iu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function cu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: X(e.cost) }) : null;
}
function su(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function du(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function uu(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function hu(e, a) {
  return a === void 0 ? e : Qd(e, a.ref);
}
function mu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Sn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = aa(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(tu(a));
  nu(e.feed, a.key, c, u, i);
  const d = ru(a, r), h = lu(a, t), _ = ou(a, e.fields), b = uu(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...mu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: hu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        iu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          cu(a, e.fields),
          su(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          du(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function wu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function _u(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function vu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function fu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(wu, { count: e.items.length, cap: e.column.cap });
}
function bu(e, a) {
  return e.roving ?? a;
}
function pu(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function gu(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Sn,
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
function Nu(e) {
  const a = k(), t = ma({ orientation: "vertical" }), r = bu(e, t), o = _u(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    vu(e.column, e.items.length, a),
    fu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...pu(e, t), children: gu(e, r) })
  ] });
}
function yu(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function ku(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function $u(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function zk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: yu(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      ku(e),
      $u(e.onConfigure),
      /* @__PURE__ */ n(Ha, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Cu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function Su(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(Ee, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(Ee, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Ru(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(L, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Gk(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(Cu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: Su(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(fn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Ru(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Kk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Sn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Nu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Tu(e, a) {
  const t = Cn(e);
  t !== void 0 && a(t);
}
function Lu(e, a, t) {
  x(() => {
    if (e != null)
      return e.subscribe(a, (r) => Tu(r, t));
  }, [e, a, t]);
}
function Au(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function xu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", X(e.cost)]), a;
}
function Eu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function qu(e, a) {
  return /* @__PURE__ */ l(L, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Uk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  Lu(e.feed, a.key, o);
  const i = [...Au(a), ...xu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Eu(t, r)
    ] }),
    qu(a, e.actions)
  ] });
}
const Iu = "_card_hvxp7_2", Mu = "_head_hvxp7_17", Bu = "_mark_hvxp7_25", Pu = "_name_hvxp7_37", Du = "_chips_hvxp7_48", Ou = "_description_hvxp7_54", Hu = "_run_hvxp7_59", Fu = "_sep_hvxp7_68", ju = "_facts_hvxp7_73", Wu = "_fact_hvxp7_73", zu = "_factLabel_hvxp7_86", Gu = "_factValue_hvxp7_90", Q = {
  card: Iu,
  head: Mu,
  mark: Bu,
  name: Pu,
  chips: Du,
  description: Ou,
  run: Hu,
  sep: Fu,
  facts: ju,
  fact: Wu,
  factLabel: zu,
  factValue: Gu
}, Ku = { live: "done", draft: "running", paused: "meta" };
function Uu(e) {
  return e === void 0 ? Q.card : `${Q.card} ${e}`;
}
function Vu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: Q.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Ku[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Yu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: Q.description, children: e });
}
function Ju({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: Q.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: Q.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function Xu({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: Q.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: Q.fact, children: [
    /* @__PURE__ */ n("dt", { className: Q.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: Q.factValue, children: a.value })
  ] }, a.label)) });
}
function Qu(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function Zu({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": $e(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Uu(c),
      style: s,
      "data-selected": u,
      "data-paused": Qu(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: Q.head, children: [
          /* @__PURE__ */ n("span", { className: Q.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${Q.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Yu, { description: e.description }),
        /* @__PURE__ */ n(Ju, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Vu, { versions: e.versions }),
        /* @__PURE__ */ n(Xu, { facts: i })
      ]
    }
  );
}
const eh = "_list_4dcyc_2", ah = "_row_4dcyc_11", nh = "_head_4dcyc_23", th = "_id_4dcyc_30", rh = "_lock_4dcyc_35", lh = "_reason_4dcyc_41", oh = "_remove_4dcyc_46", ih = "_clauses_4dcyc_50", ch = "_clause_4dcyc_50", sh = "_label_4dcyc_64", dh = "_cell_4dcyc_71", uh = "_value_4dcyc_76", ne = {
  list: eh,
  row: ah,
  head: nh,
  id: th,
  lock: rh,
  reason: lh,
  remove: oh,
  clauses: ih,
  clause: ch,
  label: sh,
  cell: dh,
  value: uh
}, Rn = ze(!1);
function Vk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Rn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function hh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function mh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function wh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(mh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function rn(e, a) {
  return e.locked ? void 0 : a;
}
function Yk({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Rn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = rn(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(wh, { rule: e, onRemove: rn(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(hh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const _h = "_ladder_wwnch_2", vh = "_cell_wwnch_7", fh = "_empty_wwnch_26", bh = "_name_wwnch_34", ph = "_holder_wwnch_40", gh = "_request_wwnch_46", Nh = "_swatches_wwnch_51", yh = "_swatch_wwnch_51", kh = "_tilesFrame_wwnch_78", $h = "_tiles_wwnch_78", Ch = "_tile_wwnch_78", Sh = "_bar_wwnch_117", Rh = "_hex_wwnch_128", Th = "_note_wwnch_138", R = {
  ladder: _h,
  cell: vh,
  empty: fh,
  name: bh,
  holder: ph,
  request: gh,
  swatches: Nh,
  swatch: yh,
  tilesFrame: kh,
  tiles: $h,
  tile: Ch,
  bar: Sh,
  hex: Rh,
  note: Th
}, Lh = "not validated — needs CVD matrix and dark stepping";
function Ah(e) {
  return e.reserved ? "reserved" : _a(e.step) ? "validated" : "partial";
}
function Tn(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function xh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Eh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Ce, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function qh(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Ih(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const ln = (e) => String(e).padStart(2, "0");
function Mh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Tn(e, void 0);
}
function Bh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${ln(e)}` : yt(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${ln(e)} · ${t}` })
  ] });
}
function Ph({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Ah(e), c = Tn(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Ih(s, u), "data-validation": i, style: xh(e, i), onClick: h, onKeyDown: (E) => qh(E, h) }, label: _, name: d, holder: c, validation: i, note: Mh(i, t, u), step: e.step };
}
const Dh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Bh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Eh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Oh(e) {
  return Dh[e.presentation](Ph(e));
}
function Hh(e) {
  for (const a of e)
    if (!a.reserved && !wa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Fh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function jh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Wh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function zh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Gh = { list: Fh, swatches: () => null, tiles: zh };
function Ln(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  Hh(e.steps);
  const r = jh(e), o = Gh[r], i = /* @__PURE__ */ l(L, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Oh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Wh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Kh = "_rail_1el2t_2", Uh = "_section_1el2t_12", Vh = "_sectionFlush_1el2t_22", Yh = "_head_1el2t_26", Jh = "_headLabel_1el2t_34", Xh = "_sample_1el2t_42", Qh = "_sampleLabel_1el2t_47", Zh = "_sampleTitle_1el2t_54", em = "_sampleMeta_1el2t_59", am = "_trace_1el2t_65", nm = "_traceHead_1el2t_70", tm = "_steps_1el2t_78", rm = "_step_1el2t_78", lm = "_stepTitle_1el2t_97", om = "_hollow_1el2t_107", im = "_stepBody_1el2t_115", cm = "_stepDetail_1el2t_127", sm = "_publish_1el2t_132", dm = "_reason_1el2t_138", um = "_note_1el2t_143", hm = "_reveal_1el2t_148", p = {
  rail: Kh,
  section: Uh,
  sectionFlush: Vh,
  head: Yh,
  headLabel: Jh,
  sample: Xh,
  sampleLabel: Qh,
  sampleTitle: Zh,
  sampleMeta: em,
  trace: am,
  traceHead: nm,
  steps: tm,
  step: rm,
  stepTitle: lm,
  hollow: om,
  stepBody: im,
  stepDetail: cm,
  publish: sm,
  reason: dm,
  note: um,
  reveal: hm
}, on = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, mm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, wm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, _m = { notSimulated: "not simulated", running: "running" };
function vm(e) {
  return e.presentation === "foundry";
}
function fm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function bm(e, a) {
  var r;
  const t = mm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function pm(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function gm(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Nm(e) {
  if (pm(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function ym(e) {
  const [a, t] = g(!1);
  x(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function km(e) {
  const a = _m[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Ce, { size: 6, kind: wm[e.kind], label: e.kind });
}
function $m(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Cm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function Sm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(ym, { kind: a.kind, children: [
    /* @__PURE__ */ n(km, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n($m, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Cm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Rm(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function An(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Rm(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(Sm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Tm(e) {
  return e.sample === void 0 ? null : /* @__PURE__ */ l("div", { className: `${p.sample} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.sampleLabel, children: "Sample item" }),
    /* @__PURE__ */ l("p", { className: p.sampleTitle, children: [
      e.sample.key,
      " · ",
      e.sample.title
    ] }),
    /* @__PURE__ */ l("p", { className: p.sampleMeta, children: [
      "replayed from ",
      e.sample.replayedFrom
    ] })
  ] });
}
function Lm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Am(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : X(e.run.cost), label: "Cost" }, { value: e.run.turns ? wn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function xm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: X(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: wn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Em(e) {
  const a = xm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function xn(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function qm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(xn, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Im(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(xn, { reason: e.reason, onPublish: e.onPublish }) });
}
function En(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: on[e.run.status].role, label: on[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Mm(e, a) {
  const [t, r] = g(e.steps);
  return x(() => r(e.steps), [e.steps]), x(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Bm(e) {
  var t;
  gm(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(En, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Tm, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Am, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist }) }),
    /* @__PURE__ */ n(qm, { reason: fm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Pm(e) {
  var r;
  const a = Mm(e.run, e.feed);
  Nm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(En, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(Lm, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Em, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Im, { reason: bm(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function Jk(e) {
  return vm(e) ? /* @__PURE__ */ n(Pm, { ...e }) : /* @__PURE__ */ n(Bm, { ...e });
}
const Dm = "_list_142ip_3", Om = "_row_142ip_9", Hm = "_condition_142ip_18", Fm = "_action_142ip_24", na = {
  list: Dm,
  row: Om,
  condition: Hm,
  action: Fm
}, qn = ze(!1);
function Xk({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(qn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: na.list, "aria-label": a, children: e }) });
}
function Qk({ rule: e }) {
  if (!We(qn)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: na.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: na.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: na.action, children: e.then })
  ] });
}
function Ea(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function In(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Mn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function cn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function jm(e) {
  return e === "up" ? "down" : "up";
}
function Wm(e, a) {
  const t = cn(e, a.id, a.direction) ?? cn(e, a.id, jm(a.direction));
  t == null || t.focus();
}
function Bn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return x(() => {
    e.current !== null && a !== null && Wm(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Pn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function sa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const zm = "_body_1h15q_2", Gm = "_title_1h15q_8", Km = "_section_1h15q_13", Um = "_legend_1h15q_18", Vm = "_stages_1h15q_26", Ym = "_stage_1h15q_26", Jm = "_stageIndex_1h15q_44", Xm = "_stageName_1h15q_50", Qm = "_footer_1h15q_59", Zm = "_note_1h15q_66", ew = "_reason_1h15q_71", aw = "_actions_1h15q_76", nw = "_webHead_1h15q_83", tw = "_kicker_1h15q_92", rw = "_webTitle_1h15q_99", lw = "_webBody_1h15q_105", ow = "_webSection_1h15q_109", iw = "_sectionHead_1h15q_121", cw = "_sectionNote_1h15q_129", sw = "_formLabel_1h15q_134", dw = "_identityRow_1h15q_139", uw = "_nameCell_1h15q_145", hw = "_keyCell_1h15q_150", mw = "_colourCell_1h15q_154", ww = "_colourStatus_1h15q_161", _w = "_webStages_1h15q_166", vw = "_webStageList_1h15q_172", fw = "_webStage_1h15q_166", bw = "_webIndex_1h15q_191", pw = "_webStageName_1h15q_196", gw = "_webMoves_1h15q_201", Nw = "_addStage_1h15q_215", yw = "_addStageButton_1h15q_223", kw = "_addStageNote_1h15q_231", $w = "_webFooter_1h15q_236", Cw = "_webFooterNotes_1h15q_244", Sw = "_webNote_1h15q_251", w = {
  body: zm,
  title: Gm,
  section: Km,
  legend: Um,
  stages: Vm,
  stage: Ym,
  stageIndex: Jm,
  stageName: Xm,
  footer: Qm,
  note: Zm,
  reason: ew,
  actions: aw,
  webHead: nw,
  kicker: tw,
  webTitle: rw,
  webBody: lw,
  webSection: ow,
  sectionHead: iw,
  sectionNote: cw,
  formLabel: sw,
  identityRow: dw,
  nameCell: uw,
  keyCell: hw,
  colourCell: mw,
  colourStatus: ww,
  webStages: _w,
  webStageList: vw,
  webStage: fw,
  webIndex: bw,
  webStageName: pw,
  webMoves: gw,
  addStage: Nw,
  addStageButton: yw,
  addStageNote: kw,
  webFooter: $w,
  webFooterNotes: Cw,
  webNote: Sw
}, Rw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], Dn = "not in catalogue";
function Tw(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${Dn}` }, ...t];
}
function Lw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${Dn}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Tw(t, e.name), invalid: i, onChange: r });
}
function On(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Aw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function xw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = On(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(Lw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(A, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Rw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Ew({ stages: e, onChange: a, catalogue: t }) {
  const r = Aw(e.length), o = Bn(), i = (s, u) => {
    const d = In(s, u);
    r.current = Ea(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Mn(On(e[s], s), d, e.length)), a(Ea(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(xw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Pn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const qw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Iw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Mw = "A new stream starts as a draft. Nothing runs on it until you publish it.", Bw = "Create is disabled: name the stream and give it a key first.", Pw = "reorder with the ↑ ↓ buttons · min 2";
function Fa(e, a) {
  return !e.reserved && _a(e.step) && a[e.step] === void 0;
}
function Dw(e, a) {
  const t = e.find((r) => Fa(r, a));
  return t ? t.step : 1;
}
function Ow({ stages: e, onMove: a }) {
  const t = Bn(), r = (o, i) => {
    const c = In(o, i);
    t.moved({ id: e[o].id, direction: i }, Mn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(sa, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(sa, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Pn, { text: t.announcement })
  ] });
}
function Hw({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Mw }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Fw(e, a) {
  return e !== "" && a !== "" ? null : Bw;
}
function jw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Iw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, E] = g(""), [ee, ae] = g(a[0].value), [le, qe] = g(() => Dw(t, r)), [oe, Ie] = g(e.stages ?? qw), [Me, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: ee, stages: oe, policy: Me }, me = Fw(h, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: E, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: ee, onChange: ae, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(Ln, { label: "Stream colour", steps: t, value: le, onChange: qe, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Ow, { stages: oe, onMove: (Se, tt) => Ie(Ea(oe, Se, tt)) })
    ] }),
    /* @__PURE__ */ n(Nn, { legend: "Loop policy", options: o, value: Me, onChange: $ }),
    /* @__PURE__ */ n(Hw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Hn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Ww = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function zw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Hn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Gw(e, a) {
  return Kw(e) && Uw(e, a) && Vw(e);
}
function Kw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Uw(e, a) {
  return e.colourStep !== null && Fa({ step: e.colourStep }, a);
}
function Vw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Yw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${Lh}.` : Fa({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function Jw({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function Xw({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(Jw, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Ww })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function Qw({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function Zw({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
  return /* @__PURE__ */ l("section", { className: w.webSection, children: [
    /* @__PURE__ */ n("h3", { className: w.kicker, children: "01 · Identity" }),
    /* @__PURE__ */ l("div", { className: w.identityRow, children: [
      /* @__PURE__ */ n("div", { className: w.nameCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Name", value: e, onChange: a }) }),
      /* @__PURE__ */ n("div", { className: w.keyCell, children: /* @__PURE__ */ n(A, { variant: "form", label: "Key", value: t, onChange: r, mono: !0 }) }),
      o
    ] }),
    i
  ] });
}
function e_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, E] = g("relay"), [ee, ae] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = zw(o, c, u, h, b, ee), qe = Gw(le, r), oe = ee.find(($) => $.kind === "agent" && $.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(Ln, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Me = /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Yw(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(Qw, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(Zw, { name: o, setName: i, streamKey: c, setKey: s, colour: Ie, owner: Me }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Pw })
        ] }),
        /* @__PURE__ */ n(Ew, { stages: ee, onChange: ae })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(Nn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Hn, onChange: E }) }),
      /* @__PURE__ */ n(Xw, { ready: qe, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function Zk(e) {
  return "presentation" in e ? /* @__PURE__ */ n(e_, { ...e }) : /* @__PURE__ */ n(jw, { ...e });
}
const a_ = "_row_bs8hc_2", n_ = "_cell_bs8hc_6", t_ = "_condition_bs8hc_11", r_ = "_action_bs8hc_18", l_ = "_contract_bs8hc_24", o_ = "_contractCondition_bs8hc_33", i_ = "_contractAction_bs8hc_39", U = {
  row: a_,
  cell: n_,
  condition: t_,
  action: r_,
  contract: l_,
  contractCondition: o_,
  contractAction: i_
}, Fn = ["advance", "block", "escalate", "requestReview"], sn = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function da(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function ja(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: U.action, children: sn[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: Fn.map((o) => ({ value: o, label: sn[o] }))
    }
  );
}
function c_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n("span", { className: U.condition, title: da(e, r), children: da(e, r) }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: U.cell, children: ja(e, a, t) })
  ] });
}
function s_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: U.row, children: [
    /* @__PURE__ */ l("td", { className: U.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: U.condition, children: da(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: U.cell, children: ja(e, a, t) })
  ] });
}
function d_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: U.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: U.contractCondition, children: da(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: U.contractAction, children: ja(e, a, t, !0) })
  ] });
}
const u_ = { two: s_, four: c_, contract: d_ };
function e1(e) {
  var t;
  if (!Fn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = u_[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const h_ = "_column_lurgk_2", m_ = "_head_lurgk_17", w_ = "_index_lurgk_23", __ = "_name_lurgk_29", v_ = "_meta_lurgk_38", f_ = "_mono_lurgk_43", b_ = "_gate_lurgk_50", p_ = "_reviewersLabel_lurgk_57", g_ = "_reviewers_lurgk_57", N_ = "_reviewer_lurgk_57", y_ = "_agents_lurgk_74", k_ = "_workflowColumn_lurgk_79", $_ = "_workflowHead_lurgk_96", C_ = "_stageRow_lurgk_102", S_ = "_stageLabel_lurgk_109", R_ = "_workflowTitle_lurgk_116", T_ = "_workflowMeta_lurgk_122", L_ = "_workflowGate_lurgk_127", A_ = "_gateNote_lurgk_135", x_ = "_cardNote_lurgk_140", E_ = "_reviewerList_lurgk_149", q_ = "_reviewerRow_lurgk_155", I_ = "_reviewerMark_lurgk_161", M_ = "_reviewerName_lurgk_171", B_ = "_terminalCard_lurgk_177", P_ = "_terminalCount_lurgk_186", D_ = "_workflowAgents_lurgk_192", O_ = "_mount_lurgk_198", y = {
  column: h_,
  head: m_,
  index: w_,
  name: __,
  meta: v_,
  mono: f_,
  gate: b_,
  reviewersLabel: p_,
  reviewers: g_,
  reviewer: N_,
  agents: y_,
  workflowColumn: k_,
  workflowHead: $_,
  stageRow: C_,
  stageLabel: S_,
  workflowTitle: R_,
  workflowMeta: T_,
  workflowGate: L_,
  gateNote: A_,
  cardNote: x_,
  reviewerList: E_,
  reviewerRow: q_,
  reviewerMark: I_,
  reviewerName: M_,
  terminalCard: B_,
  terminalCount: P_,
  workflowAgents: D_,
  mount: O_
}, H_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function Wa(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function jn(e) {
  return `${Math.round(e * 100)}%`;
}
function F_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ba, { cells: [
      { value: jn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: Z(e.count), label: "In stage" }
    ] })
  ] });
}
function j_({ stage: e }) {
  return /* @__PURE__ */ n(ba, { cells: [
    { value: Z(e.count), label: "In stage" },
    { value: Wa(e.closedThisWeek, Z), label: "Closed this week" }
  ] });
}
function W_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: H_[e.kind] })
  ] });
}
function z_({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      Z(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      te(e.medianWait),
      " median wait"
    ] })
  ] });
}
function G_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(F_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(j_, { stage: e }) : null;
}
function K_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function U_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(W_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(z_, { stage: e }),
    /* @__PURE__ */ n(G_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(Zu, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(K_, { onMount: t })
  ] });
}
const V_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Y_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function J_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Y_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: jn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function X_({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: Wa(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function Q_(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function Z_(e) {
  if (e.kind === "terminal") return `${Wa(e.closedThisWeek)} this week`;
  const a = Q_(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function ev({ stage: e, titleId: a }) {
  const t = V_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: Z_(e) })
  ] });
}
function av(e) {
  return e === "entry" || e === "agent";
}
function nv({ stage: e, onMount: a }) {
  return a === void 0 || !av(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function tv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(ev, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(J_, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(X_, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(nv, { stage: e, onMount: t })
  ] });
}
function rv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function a1(e) {
  return rv(e) ? /* @__PURE__ */ n(tv, { ...e }) : /* @__PURE__ */ n(U_, { ...e });
}
const lv = "_row_ve78g_6", ov = "_cell_ve78g_10", iv = "_name_ve78g_19", cv = "_chain_ve78g_26", sv = "_owner_ve78g_32", dv = "_mono_ve78g_38", uv = "_compactRow_ve78g_45", hv = "_compactCell_ve78g_54", mv = "_stack_ve78g_71", wv = "_stat_ve78g_78", _v = "_identityLine_ve78g_85", vv = "_identity_ve78g_85", fv = "_compactName_ve78g_103", bv = "_ownerLine_ve78g_117", pv = "_link_ve78g_130", gv = "_emptyChain_ve78g_136", Nv = "_arrow_ve78g_142", yv = "_muted_ve78g_143", kv = "_define_ve78g_148", $v = "_statValue_ve78g_155", Cv = "_policyId_ve78g_161", Sv = "_sub_ve78g_166", f = {
  row: lv,
  cell: ov,
  name: iv,
  chain: cv,
  owner: sv,
  mono: dv,
  compactRow: uv,
  compactCell: hv,
  stack: mv,
  stat: wv,
  identityLine: _v,
  identity: vv,
  compactName: fv,
  ownerLine: bv,
  link: pv,
  emptyChain: gv,
  arrow: Nv,
  muted: yv,
  define: kv,
  statValue: $v,
  policyId: Cv,
  sub: Sv
};
function Rv(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Tv(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function Lv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${e.members} members`;
}
function Av(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: Lv(e) })
  ] }) });
}
function xv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Ev(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : xv(e) });
}
function dn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function qv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Iv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Mv({ stream: e, href: a, presentation: t }) {
  const r = Tv(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": $e(e.streamStep, "chip") }, children: [
    Av(e, a),
    Ev(e.stages, a),
    dn(Iv(e.agents), e.agents === void 0 ? void 0 : Rv(e.agents), "—"),
    qv(e.policy),
    dn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Bv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function n1(e) {
  if (Bv(e)) return Mv(e);
  const { stream: a, href: t } = e;
  return /* @__PURE__ */ l("tr", { className: f.row, children: [
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("a", { className: f.name, href: t, children: a.name }),
      /* @__PURE__ */ n(m, { ...fa(a.key, a.streamStep) }),
      a.draft && /* @__PURE__ */ n(m, { role: "running", label: "DRAFT" })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ n("span", { className: f.chain, children: a.stages.map((r) => /* @__PURE__ */ n(m, { role: r.gate ? "gate" : "soft", label: r.name }, r.name)) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, children: /* @__PURE__ */ l("span", { className: f.mono, children: [
      a.agents.live,
      " live · ",
      a.agents.draft,
      " draft · ",
      a.agents.paused,
      " paused"
    ] }) }),
    /* @__PURE__ */ l("td", { className: f.cell, children: [
      /* @__PURE__ */ n("span", { className: f.owner, children: a.owner }),
      /* @__PURE__ */ l("span", { className: f.mono, children: [
        Z(a.members),
        " members"
      ] })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: Z(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : te(a.p50) }) })
  ] });
}
const Pv = "_row_1nbe9_2", Dv = "_name_1nbe9_15", Ov = "_scope_1nbe9_25", ua = {
  row: Pv,
  name: Dv,
  scope: Ov
};
function Hv(e) {
  return e === void 0 ? `${ua.row} ward-toolrow` : `${ua.row} ward-toolrow ${e}`;
}
function Fv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function jv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
        r.locked || o(i.target.checked);
      }
    }
  );
}
function Wv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function zv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ua.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Gv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function t1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Fv(e, t), c = Gv(t);
  return /* @__PURE__ */ l(c, { className: Hv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(jv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ua.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(zv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Wv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Kv = "_strip_1qtlf_2", Uv = "_head_1qtlf_10", Vv = "_name_1qtlf_16", Yv = "_chart_1qtlf_24", Jv = "_segment_1qtlf_30", Xv = "_detailedChart_1qtlf_36", Qv = "_rail_1qtlf_49", Zv = "_section_1qtlf_55", ef = "_label_1qtlf_66", af = "_note_1qtlf_83", V = {
  strip: Kv,
  head: Uv,
  name: Vv,
  chart: Yv,
  segment: Jv,
  detailedChart: Xv,
  rail: Qv,
  section: Zv,
  label: ef,
  note: af
}, nf = "No item in flight to preview.", tf = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.", rf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.", qa = [1, 2, 3, 4, 5, 6], ha = 100;
function lf(e, a) {
  return a.has(e) ? $e(e, "id") : "var(--ward-color-line)";
}
function of({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: V.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: qa.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: V.segment,
      x: o * ha,
      y: "0",
      width: ha,
      height: "8",
      fill: lf(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function cf(e) {
  const a = e.slice(0, qa.length);
  for (; a.length < qa.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function sf({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${V.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ha),
        y: "0",
        width: String(ha),
        height: "40",
        style: { fill: $e(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Wn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ea({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: V.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: V.label, children: e }),
    a
  ] });
}
function df({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: V.note, children: a ?? nf }) : /* @__PURE__ */ n(ga, { item: { ...e, streamStep: va(t.streamStep) }, onOpen: Wn(r), feed: null });
}
function uf({ draft: e }) {
  const a = { "--stream": $e(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: V.head, style: a, children: [
    /* @__PURE__ */ n(Ce, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
  ] });
}
function hf(e) {
  const a = cf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: V.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(df, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(uf, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(sf, { identities: a }),
      /* @__PURE__ */ n("p", { className: V.note, children: tf })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: V.note, children: rf }) })
  ] });
}
function mf({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": $e(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: V.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: V.head, children: [
      /* @__PURE__ */ n(Ce, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: V.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(ga, { item: { ...a, streamStep: e.streamStep }, onOpen: Wn(r) }),
    /* @__PURE__ */ n(of, { draft: e, streams: t })
  ] });
}
function r1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(hf, { ...e }) : /* @__PURE__ */ n(mf, { ...e });
}
const wf = "_row_ixlg5_6", _f = "_headCell_ixlg5_10", vf = "_cell_ixlg5_11", ff = "_name_ixlg5_23", bf = "_consequence_ixlg5_29", pf = "_governed_ixlg5_36", gf = "_control_ixlg5_42", Nf = "_byRole_ixlg5_48", yf = "_webControl_ixlg5_59", kf = "_webConsequence_ixlg5_65", $f = "_webGoverned_ixlg5_71", P = {
  row: wf,
  headCell: _f,
  cell: vf,
  name: ff,
  consequence: bf,
  governed: pf,
  control: gf,
  byRole: Nf,
  webControl: yf,
  webConsequence: kf,
  webGoverned: $f
};
function Cf({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      Ee,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function Sf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: P.headCell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: P.consequence, children: e.consequence }),
      /* @__PURE__ */ l("span", { className: P.governed, children: [
        "governed by ",
        e.governedBy,
        e.ticket ? ` · ${e.ticket}` : ""
      ] })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Cf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Rf(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Tf({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    Ee,
    {
      label: `${e} — step ${a.streamStep}`,
      checked: a.value === "on",
      disabled: t === void 0,
      onChange: (o) => t == null ? void 0 : t(a.streamStep, o ? "on" : "off")
    }
  );
  return a.value !== "pilot" ? r : /* @__PURE__ */ l("span", { className: `${P.webControl} ward-envrow`, children: [
    /* @__PURE__ */ n(m, { role: "running", label: "PILOT" }),
    r
  ] });
}
function Lf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Tf, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Rf(e) }) })
  ] });
}
function l1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Lf, { ...e }) : /* @__PURE__ */ n(Sf, { ...e });
}
const Af = "_row_vv64h_2", xf = "_cell_vv64h_6", Ef = "_name_vv64h_25", qf = "_note_vv64h_30", If = "_webName_vv64h_41", Mf = "_webMeta_vv64h_47", z = {
  row: Af,
  cell: xf,
  name: Ef,
  note: qf,
  webName: If,
  webMeta: Mf
}, zn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Bf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Pf({ component: e, onRestart: a }) {
  const t = k(), r = zn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: z.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: z.cell, "data-mono": "true", children: [
      Z(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { id: t, className: z.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: z.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function Df({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Bf(e.state) });
}
function Of({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...zn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(Df, { component: e, onRestart: a }) })
  ] });
}
function o1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Of, { ...e }) : /* @__PURE__ */ n(Pf, { ...e });
}
const Hf = "_row_1f1gp_7", Ff = "_cell_1f1gp_11", jf = "_next_1f1gp_28", Wf = "_headCell_1f1gp_38", zf = "_webId_1f1gp_77", Gf = "_webPurpose_1f1gp_83", Kf = "_webMeta_1f1gp_91", Uf = "_webUrgent_1f1gp_97", O = {
  row: Hf,
  cell: Ff,
  next: jf,
  headCell: Wf,
  webId: zf,
  webPurpose: Gf,
  webMeta: Kf,
  webUrgent: Uf
}, Vf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Yf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Gn = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], Jf = Object.fromEntries(Gn.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = Jf[e];
  return /* @__PURE__ */ n(
    "td",
    {
      className: O.cell,
      style: t.width ? { width: t.width } : void 0,
      "data-drop": t.dropPriority,
      "data-mono": t.mono,
      children: a
    }
  );
}
function i1() {
  return /* @__PURE__ */ n("tr", { children: Gn.map((e) => /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: O.headCell,
      style: e.width ? { width: e.width } : void 0,
      "data-drop": e.dropPriority,
      "data-align": e.align,
      children: e.header
    },
    e.key
  )) });
}
function Xf({ cred: e }) {
  const a = Vf[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function Qf({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function Zf({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(Qf, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Yf[e.state] }) })
  ] });
}
function c1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zf, { ...e }) : /* @__PURE__ */ n(Xf, { ...e });
}
const eb = "_card_17zba_2", ab = "_head_17zba_11", nb = "_env_17zba_18", tb = "_version_17zba_25", rb = "_meta_17zba_32", lb = "_webCard_17zba_37", ob = "_webRow_17zba_47", ib = "_webTitle_17zba_55", cb = "_webLine_17zba_65", sb = "_webVersion_17zba_72", db = "_webMeta_17zba_77", W = {
  card: eb,
  head: ab,
  env: nb,
  version: tb,
  meta: rb,
  webCard: lb,
  webRow: ob,
  webTitle: ib,
  webLine: cb,
  webVersion: sb,
  webMeta: db
}, Kn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function ub({ env: e }) {
  const a = Kn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
  return /* @__PURE__ */ l("section", { className: W.card, "aria-label": e.env.toUpperCase(), children: [
    /* @__PURE__ */ l("div", { className: W.head, children: [
      /* @__PURE__ */ n("span", { className: W.env, children: e.env.toUpperCase() }),
      /* @__PURE__ */ n(m, { role: a.role, label: a.label })
    ] }),
    /* @__PURE__ */ n("p", { className: W.version, children: e.version }),
    /* @__PURE__ */ l("p", { className: W.meta, children: [
      "deployed ",
      re(e.deployedAt)
    ] }),
    t && /* @__PURE__ */ n("p", { className: W.meta, children: t })
  ] });
}
function hb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function mb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Kn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: hb(e) })
  ] });
}
function s1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(mb, { ...e }) : /* @__PURE__ */ n(ub, { ...e });
}
const wb = "_upload_erepj_2", _b = "_preview_erepj_7", vb = "_mark_erepj_17", fb = "_empty_erepj_22", bb = "_actions_erepj_28", pb = "_input_erepj_33", gb = "_reasons_erepj_41", Nb = "_reason_erepj_41", yb = "_accepted_erepj_57", J = {
  upload: wb,
  preview: _b,
  mark: vb,
  empty: fb,
  actions: bb,
  input: pb,
  reasons: gb,
  reason: Nb,
  accepted: yb
}, Un = 1.5, Vn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Un}px at ${Vn}px`];
function kb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function $b(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Cb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function Sb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Rb(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Vn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Un;
  }) ? [Ye[3]] : [];
}
function d1(e) {
  const a = $b(e);
  if (a === null) return kb();
  const t = [...Cb(a), ...Sb(a, e), ...Rb(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Tb = "Mark accepted.";
function Lb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: J.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: J.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: J.empty }) });
}
function Ab(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function xb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Eb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: J.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: J.result, role: "status", children: /* @__PURE__ */ n("p", { className: J.accepted, children: Tb }) }) : /* @__PURE__ */ n("div", { className: J.result, role: "status", children: /* @__PURE__ */ n("ul", { className: J.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: J.reason, children: a }, a)) }) });
}
function qb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Eb, { result: e }) : /* @__PURE__ */ n("p", { className: `${J.result} ${Ab(e, t)}`, role: "status", children: xb(e, t) });
}
function u1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: J.upload, children: [
    /* @__PURE__ */ n(Lb, { current: e }),
    /* @__PURE__ */ l("div", { className: J.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: J.input,
          type: "file",
          accept: "image/svg+xml",
          "aria-label": "Mark file",
          onChange: (u) => {
            var d;
            return s((d = u.target.files) == null ? void 0 : d[0]);
          }
        }
      ),
      /* @__PURE__ */ n(v, { onClick: () => {
        var u;
        return (u = o.current) == null ? void 0 : u.click();
      }, children: "Upload SVG" }),
      /* @__PURE__ */ n(v, { variant: "ghost", onClick: t, children: (r == null ? void 0 : r.useInitialsLabel) ?? "Use initials" })
    ] }),
    /* @__PURE__ */ n(qb, { result: i, presentation: r })
  ] });
}
const Ib = "_row_1wp9s_7", Mb = "_cell_1wp9s_11", Bb = "_head_1wp9s_28", Pb = "_name_1wp9s_34", Db = "_pinned_1wp9s_42", Ob = "_headCell_1wp9s_49", Hb = "_webName_1wp9s_88", Fb = "_webMeta_1wp9s_95", jb = "_webWarn_1wp9s_103", q = {
  row: Ib,
  cell: Mb,
  head: Bb,
  name: Pb,
  pinned: Db,
  headCell: Ob,
  webName: Hb,
  webMeta: Fb,
  webWarn: jb
}, za = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Yn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Wb = Object.fromEntries(Yn.map((e) => [e.key, e]));
function zb(e, a) {
  return `mcp.${e}.${a}`;
}
function Gb(e) {
  return Object.keys(za).includes(e);
}
function Kb(e) {
  return za[e !== void 0 && Gb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = Wb[e];
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
function h1() {
  return /* @__PURE__ */ n("tr", { children: Yn.map((e) => /* @__PURE__ */ n(
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
function Ub({ server: e }) {
  const a = za[e.connection];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l(Ge, { column: "name", children: [
      /* @__PURE__ */ l("span", { className: q.head, children: [
        /* @__PURE__ */ n("span", { className: q.name, children: e.name }),
        /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() })
      ] }),
      e.pinned && /* @__PURE__ */ l("span", { className: q.pinned, children: [
        "pinned ",
        e.pinned
      ] })
    ] }),
    /* @__PURE__ */ n(Ge, { column: "connection", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(Ge, { column: "transport", children: e.transport }),
    /* @__PURE__ */ n(Ge, { column: "credentialId", children: e.credentialId }),
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => zb(e.name, t)).join(" · ") })
  ] });
}
function Vb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Yb(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function Jb({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function Xb({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function Qb({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function Zb({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Vb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Yb(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(Jb, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Kb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(Xb, { server: e, onRestart: a }),
      /* @__PURE__ */ n(Qb, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function m1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Zb, { ...e }) : /* @__PURE__ */ n(Ub, { ...e });
}
const ep = "_row_1h9nq_2", ap = "_headCell_1h9nq_14", np = "_cell_1h9nq_15", tp = "_name_1h9nq_26", rp = "_consequence_1h9nq_32", lp = "_reason_1h9nq_38", op = "_value_1h9nq_44", ip = "_webRow_1h9nq_60", cp = "_webSetting_1h9nq_71", sp = "_webName_1h9nq_79", dp = "_webConsequence_1h9nq_87", up = "_webControl_1h9nq_93", hp = "_webState_1h9nq_106", mp = "_webChip_1h9nq_111", T = {
  row: ep,
  headCell: ap,
  cell: np,
  name: tp,
  consequence: rp,
  reason: lp,
  value: op,
  webRow: ip,
  webSetting: cp,
  webName: sp,
  webConsequence: dp,
  webControl: up,
  webState: hp,
  webChip: mp
}, Jn = 104, Xn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function wp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(Ee, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(bn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function _p({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Xn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(wp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Jn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function Qn(e, a) {
  return String(e ?? a);
}
function vp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function fp(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? Qn(e.value, "—");
}
function bp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(Ee, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function pp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(bp, { ...e });
  const o = vp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(bn, { options: o, value: Qn(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: fp(a) });
}
function gp({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(pp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Jn }, children: /* @__PURE__ */ n(m, { ...Xn[t], size: "tag" }) })
  ] });
}
function w1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(gp, { ...e }) : /* @__PURE__ */ n(_p, { ...e });
}
const Np = "_label_1o9za_7", yp = "_name_1o9za_15", kp = "_column_1o9za_24", $p = "_webFrame_1o9za_57", Cp = "_webHead_1o9za_62", Sp = "_webHeadLabel_1o9za_74", Rp = "_webLabel_1o9za_112", Tp = "_webColumns_1o9za_119", Lp = "_webGroup_1o9za_125", Ap = "_webPeople_1o9za_126", xp = "_webVia_1o9za_127", Ep = "_webMeta_1o9za_156", H = {
  label: Np,
  name: yp,
  column: kp,
  webFrame: $p,
  webHead: Cp,
  webHeadLabel: Sp,
  webLabel: Rp,
  webColumns: Tp,
  webGroup: Lp,
  webPeople: Ap,
  webVia: xp,
  webMeta: Ep
}, qp = {
  platformAdmin: { role: "gate", label: "PLATFORM ADMIN" },
  approver: { role: "running", label: "APPROVER" },
  streamAdmin: { role: "meta", label: "STREAM ADMIN" },
  member: { role: "meta", label: "MEMBER" },
  viewer: { role: "meta", label: "VIEWER" }
}, Sa = [
  { key: "adGroup", header: "AD group", width: 228, mono: !0 },
  { key: "people", header: "People", width: 92, align: "end", dropPriority: 2 },
  { key: "requestedVia", header: "Requested via", width: 168, mono: !0, dropPriority: 1 }
];
function Ra({ column: e, children: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: H.column,
      style: { width: e.width },
      "data-drop": e.dropPriority,
      "data-mono": e.mono,
      "data-align": e.align,
      children: a
    }
  );
}
function Ip(e) {
  if (!e.matrixRole) return;
  const a = qp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Mp({ node: e }) {
  const a = Ip(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Bp, { role: a, node: e }),
    /* @__PURE__ */ n(Ra, { column: Sa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ra, { column: Sa[1], children: e.people === void 0 ? "" : Z(e.people) }),
    /* @__PURE__ */ n(Ra, { column: Sa[2], children: e.requestedVia ?? "" })
  ] });
}
function Bp({ role: e, node: a }) {
  return /* @__PURE__ */ l(L, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Pp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    kn,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Mp, { node: t }),
      children: c
    }
  );
}
function Ta({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function Dp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Op() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function Hp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Fp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function jp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Op, {}),
    /* @__PURE__ */ n(lc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      kn,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(Hp, { row: t }),
        detail: /* @__PURE__ */ n(Dp, { row: t }),
        expanded: Fp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function _1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(jp, { ...e }) : /* @__PURE__ */ n(Pp, { ...e });
}
const Wp = "_runbook_b9agc_2", zp = "_list_b9agc_7", Gp = "_step_b9agc_15", Kp = "_numeral_b9agc_21", Up = "_body_b9agc_28", Vp = "_head_b9agc_34", Yp = "_title_b9agc_40", Jp = "_detail_b9agc_45", Xp = "_actions_b9agc_50", Qp = "_webList_b9agc_56", Zp = "_webStep_b9agc_60", eg = "_webBody_b9agc_66", ag = "_webTitle_b9agc_74", ng = "_webDetail_b9agc_78", S = {
  runbook: Wp,
  list: zp,
  step: Gp,
  numeral: Kp,
  body: Up,
  head: Vp,
  title: Yp,
  detail: Jp,
  actions: Xp,
  webList: Qp,
  webStep: Zp,
  webBody: eg,
  webTitle: ag,
  webDetail: ng
}, Zn = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function et(e) {
  return String(e + 1).padStart(2, "0");
}
function tg({ step: e, index: a, connection: t }) {
  const r = Zn[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: et(a) }),
    /* @__PURE__ */ l("span", { className: S.body, children: [
      /* @__PURE__ */ l("span", { className: S.head, children: [
        /* @__PURE__ */ n("span", { className: S.title, children: e.title }),
        /* @__PURE__ */ n(m, { role: r.role, label: r.label }),
        o && e.startedAt && /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t })
      ] }),
      /* @__PURE__ */ n("span", { className: S.detail, children: e.detail })
    ] })
  ] });
}
function rg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(tg, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function lg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: et(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...Zn[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function og({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(lg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function v1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(og, { ...e }) : /* @__PURE__ */ n(rg, { ...e });
}
const ig = "_list_1gu6a_2", cg = "_check_1gu6a_10", sg = "_body_1gu6a_16", dg = "_text_1gu6a_23", ug = "_pending_1gu6a_32", hg = "_measured_1gu6a_37", He = {
  list: ig,
  check: cg,
  body: sg,
  text: dg,
  pending: ug,
  measured: hg
};
function mg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function wg({ check: e }) {
  const a = mg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${He.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Oa, { state: a.state, label: a.label }),
    /* @__PURE__ */ l("span", { className: He.body, children: [
      /* @__PURE__ */ n("span", { className: He.text, children: e.text }),
      e.passed === null && e.runsWhen && /* @__PURE__ */ l("span", { className: He.pending, children: [
        "runs when ",
        e.runsWhen
      ] })
    ] }),
    e.measured && /* @__PURE__ */ n("span", { className: He.measured, children: e.measured })
  ] });
}
function f1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(wg, { check: a }, a.text)) });
}
const _g = "_root_16pdz_2", vg = "_list_16pdz_9", fg = "_line_16pdz_16", bg = "_at_16pdz_43", pg = "_text_16pdz_47", gg = "_foot_16pdz_51", Ng = "_idle_16pdz_62", yg = "_caret_16pdz_69", kg = "_jump_16pdz_76", fe = {
  root: _g,
  list: vg,
  line: fg,
  at: bg,
  text: pg,
  foot: gg,
  idle: Ng,
  caret: yg,
  jump: kg
}, $g = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ga(e) {
  return Number.isNaN(Date.parse(e)) ? "" : $g.format(new Date(e));
}
const Cg = { warn: "warning", ok: "ok" };
function Sg({ kind: e }) {
  const a = Cg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Rg({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ga(e)}` });
}
function Tg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Ga(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ n(Rg, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function b1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = g(0), s = e.at(-1);
  x(() => {
    c(e.length);
  }, [e.length]);
  const u = () => {
    var _;
    const d = o.current;
    if (!d) return;
    d.scrollTop = d.scrollHeight;
    const h = d.querySelectorAll("[data-consline-text]");
    (_ = h.item(h.length - 1)) == null || _.focus();
  };
  return /* @__PURE__ */ l("div", { className: fe.root, children: [
    /* @__PURE__ */ n("ol", { className: fe.list, ref: o, "aria-live": "off", "aria-label": r, children: e.map((d, h) => /* @__PURE__ */ l("li", { className: `${fe.line} ward-consline ward-reveal ward-consline--${d.kind}`, "data-kind": d.kind, "data-revealed": h < i, children: [
      /* @__PURE__ */ n("span", { className: fe.at, children: Ga(d.at) }),
      /* @__PURE__ */ n(Sg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(Tg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const Lg = "_row_11jhe_2", Ag = "_head_11jhe_14", xg = "_author_11jhe_20", Eg = "_eta_11jhe_25", qg = "_edited_11jhe_26", Ig = "_body_11jhe_32", Mg = "_reason_11jhe_37", Bg = "_actions_11jhe_42", _e = {
  row: Lg,
  head: Ag,
  author: xg,
  eta: Eg,
  edited: qg,
  body: Ig,
  reason: Mg,
  actions: Bg
}, Pg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function Dg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Og({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function Hg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function Fg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function jg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Og, { ...e }) : /* @__PURE__ */ n(Hg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function p1(e) {
  const { comment: a } = e;
  Fg(e);
  const t = k(), r = `${t}-unavailable`, o = Pg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: Dg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(jg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Wg = "_root_c46wj_2", zg = "_attach_c46wj_11", Gg = "_actions_c46wj_17", Kg = "_reply_c46wj_23", Ug = "_replyRow_c46wj_28", Vg = "_sendsAs_c46wj_42", je = {
  root: Wg,
  attach: zg,
  actions: Gg,
  reply: Kg,
  replyRow: Ug,
  sendsAs: Vg
};
function Yg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function g1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Yg, { ...e }) : /* @__PURE__ */ n(Jg, { ...e });
}
function Jg({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      fn,
      {
        label: `Requeue ${r.agent} after posting`,
        consequence: r.consequence,
        checked: r.checked,
        onChange: r.onChange
      }
    ),
    /* @__PURE__ */ l("div", { className: je.actions, children: [
      /* @__PURE__ */ n(v, { variant: "primary", onClick: () => o(a, c), children: `Post as ${a}` }),
      i && /* @__PURE__ */ n(v, { variant: "ghost", onClick: () => i(c), children: "Save draft" })
    ] })
  ] });
}
const Xg = "_list_1ih9e_2", Qg = "_item_1ih9e_6", Zg = "_body_1ih9e_22", eN = "_text_1ih9e_28", aN = "_evidence_1ih9e_37", nN = "_consequence_1ih9e_49", tN = "_note_1ih9e_54", xe = {
  list: Xg,
  item: Qg,
  body: Zg,
  text: eN,
  evidence: aN,
  consequence: nN,
  note: tN
};
function rN({ criterion: e }) {
  return /* @__PURE__ */ n(Ce, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function un({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function lN(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function oN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: xe.body, children: [
    /* @__PURE__ */ n("span", { className: xe.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(un, { text: " — " }),
      /* @__PURE__ */ n("code", { className: xe.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(L, { children: [
      /* @__PURE__ */ n(un, { text: " · " }),
      /* @__PURE__ */ n("span", { className: xe.consequence, children: lN(e.why) })
    ] })
  ] });
}
function iN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: xe.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(rN, { criterion: e }),
    /* @__PURE__ */ n(oN, { criterion: e })
  ] });
}
function N1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${xe.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(iN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: xe.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const cN = "_list_dwhoz_2", sN = "_rung_dwhoz_6", dN = "_name_dwhoz_18", uN = "_actor_dwhoz_32", ta = {
  list: cN,
  rung: sN,
  name: dN,
  actor: uN
}, hN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function mN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = hN[e.state];
  return /* @__PURE__ */ l("li", { className: ta.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ta.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ta.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function y1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ta.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(mN, { rung: a }, a.name)) });
}
const wN = "_sheet_1fqco_2", _N = "_title_1fqco_9", vN = "_stage_1fqco_15", fN = "_effects_1fqco_20", bN = "_effect_1fqco_20", pN = "_numeral_1fqco_31", gN = "_effectText_1fqco_38", NN = "_refusals_1fqco_43", yN = "_reasons_1fqco_52", kN = "_reason_1fqco_52", $N = "_actions_1fqco_62", ce = {
  sheet: wN,
  title: _N,
  stage: vN,
  effects: fN,
  effect: bN,
  numeral: pN,
  effectText: gN,
  refusals: NN,
  reasons: yN,
  reason: kN,
  actions: $N
};
function CN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function k1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: ce.sheet, children: [
    /* @__PURE__ */ l("h2", { className: ce.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ce.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ce.effects, children: a.map((b, E) => /* @__PURE__ */ l("li", { className: ce.effect, children: [
      /* @__PURE__ */ n("span", { className: ce.numeral, children: String(E + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ce.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      Qo,
      {
        spent: r.spent,
        ceiling: r.ceiling,
        breakdown: [
          { label: "This requeue adds", amount: r.more },
          { label: "Item total so far", amount: r.itemTotal }
        ]
      }
    ),
    /* @__PURE__ */ n(A, { kind: "textarea", label: "Note for the agent", value: d, onChange: h }),
    _ && /* @__PURE__ */ l("div", { className: ce.refusals, children: [
      /* @__PURE__ */ n(m, { role: "meta", label: "REFUSED" }),
      /* @__PURE__ */ n("ul", { className: ce.reasons, children: t.map((b, E) => /* @__PURE__ */ n("li", { className: ce.reason, id: E === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ce.actions, children: [
      /* @__PURE__ */ n(CN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const SN = "_list_1hvqu_2", RN = "_path_1hvqu_7", TN = "_head_1hvqu_21", LN = "_label_1hvqu_28", AN = "_consequence_1hvqu_35", xN = "_ask_1hvqu_36", Fe = {
  list: SN,
  path: RN,
  head: TN,
  label: LN,
  consequence: AN,
  ask: xN
}, Ia = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function hn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function EN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ia[e.kind] }) : /* @__PURE__ */ l(L, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ia[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function qN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": hn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ia[e.kind] }),
      /* @__PURE__ */ n(m, { role: hn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(EN, { path: e, primary: a, onChoose: t })
  ] });
}
function $1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(qN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const IN = "_list_qjv4r_2", MN = "_item_qjv4r_6", BN = "_node_qjv4r_18", PN = "_body_qjv4r_24", DN = "_head_qjv4r_30", ON = "_stage_qjv4r_36", HN = "_version_qjv4r_41", FN = "_sentence_qjv4r_49", jN = "_meta_qjv4r_54", be = {
  list: IN,
  item: MN,
  node: BN,
  body: PN,
  head: DN,
  stage: ON,
  version: HN,
  sentence: FN,
  meta: jN
}, WN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function zN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function GN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Ce, { size: 9, kind: WN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(zN, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${X(e.cost)}`
      ] })
    ] })
  ] });
}
function C1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(GN, { entry: a }, a.stage + String(t))) });
}
const KN = "_thread_1kn6s_3", UN = "_turn_1kn6s_8", VN = "_who_1kn6s_27", YN = "_body_1kn6s_32", ra = {
  thread: KN,
  turn: UN,
  who: VN,
  body: YN
}, at = ze(!1);
function S1({ children: e, density: a }) {
  return /* @__PURE__ */ n(at.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ra.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function R1({ turn: e }) {
  if (!We(at)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ra.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ra.who} ward-chat-who`, children: [
      e.author,
      " · ",
      re(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ra.body} ward-chat-body`, children: e.body })
  ] });
}
const JN = "_list_1rt9c_3", XN = "_row_1rt9c_7", QN = "_label_1rt9c_20", ZN = "_n_1rt9c_26", ey = "_cause_1rt9c_33", Ue = {
  list: JN,
  row: XN,
  label: QN,
  n: ZN,
  cause: ey
};
function ay(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const ny = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function ty({ row: e, formatNumber: a }) {
  return ay(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Ce, { size: 8, ...ny[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(ry, { cause: e.cause })
  ] });
}
function ry({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function T1({ rows: e, formatNumber: a = Z }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(ty, { row: t, formatNumber: a }, t.label)) });
}
const ly = "_root_1jxwp_2", oy = {
  root: ly
};
function L1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: oy.root, "data-density": o, children: [
    /* @__PURE__ */ n(Na, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const iy = "_row_dhbre_3", cy = "_key_dhbre_13", sy = "_stack_dhbre_24", dy = "_value_dhbre_32", uy = "_evidence_dhbre_39", hy = "_mark_dhbre_47", Oe = {
  row: iy,
  key: cy,
  stack: sy,
  value: dy,
  evidence: uy,
  mark: hy
};
function my({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Oa, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function A1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(my, { state: e.state }) })
  ] });
}
const wy = "_cell_1monp_2", _y = {
  cell: wy
}, vy = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function fy(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function by(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function py(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: fy(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function gy(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function x1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  by(e, t);
  const r = gy(e);
  return /* @__PURE__ */ n(
    hi,
    {
      label: "Rejection routing",
      columns: vy,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: _y.cell, "data-norerun": o.noRerun ? !0 : void 0, children: py(o, i) }),
      empty: a ?? /* @__PURE__ */ n(Hc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Ny = "_row_ute8v_2", yy = "_title_ute8v_11", ky = "_turns_ute8v_20", $y = "_waiting_ute8v_21", Cy = "_resolved_ute8v_22", Sy = "_activity_ute8v_23", Ry = "_cost_ute8v_29", Ty = "_link_ute8v_30", Ly = "_tableRow_ute8v_47", Ay = "_tableTitle_ute8v_59", xy = "_tableResolved_ute8v_64", Ey = "_tableLink_ute8v_68", qy = "_tableMeta_ute8v_83", Iy = "_tableCost_ute8v_90", My = "_tableActivity_ute8v_91", By = "_tableState_ute8v_101", Py = "_tableRecord_ute8v_112", B = {
  row: Ny,
  title: yy,
  turns: ky,
  waiting: $y,
  resolved: Cy,
  activity: Sy,
  cost: Ry,
  link: Ty,
  tableRow: Ly,
  tableTitle: Ay,
  tableResolved: xy,
  tableLink: Ey,
  tableMeta: qy,
  tableCost: Iy,
  tableActivity: My,
  tableState: By,
  tableRecord: Py
}, nt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function Dy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Oy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function Hy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Fy = { duplicate: "CLOSED · DUPLICATE" };
function jy({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function Wy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : X(e) });
}
function zy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Gy({ session: e, href: a }) {
  const t = nt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Oy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      Hy(e.resolved),
      /* @__PURE__ */ n(jy, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Wy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: Dy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Fy[e.state] ?? t.label }),
      /* @__PURE__ */ n(zy, { link: e.link })
    ] }) })
  ] });
}
function Ky({ session: e }) {
  const a = nt[e.state];
  return /* @__PURE__ */ l("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : X(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: re(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function E1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Gy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Ky, { session: e.session });
}
const Uy = "_block_1yy2v_3", Vy = "_list_1yy2v_9", Yy = "_line_1yy2v_14", Ma = {
  block: Uy,
  list: Vy,
  line: Yy
}, Jy = { warn: "warning", ok: "ok" };
function Xy({ kind: e }) {
  const a = Jy[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Qy({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ma.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(Xy, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function q1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ma.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ma.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(Qy, { line: t }, `${r}-${t.text}`)) }) });
}
const Zy = "_band_tt7hp_1", ek = "_head_tt7hp_8", ak = "_cell_tt7hp_19", nk = "_index_tt7hp_35", tk = "_title_tt7hp_42", rk = "_note_tt7hp_48", lk = "_cellTitle_tt7hp_53", ok = "_cellBody_tt7hp_58", ik = "_tag_tt7hp_64", we = {
  band: Zy,
  head: ek,
  cell: ak,
  index: nk,
  title: tk,
  note: rk,
  cellTitle: lk,
  cellBody: ok,
  tag: ik
}, mn = 4;
function I1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== mn)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${mn}-cell grid`);
  return /* @__PURE__ */ l("section", { className: we.band, "aria-label": `${e} ${a}`, children: [
    /* @__PURE__ */ l("div", { className: we.head, children: [
      /* @__PURE__ */ n("span", { className: we.index, children: e }),
      /* @__PURE__ */ n("span", { className: we.title, children: a }),
      /* @__PURE__ */ n("span", { className: we.note, children: t })
    ] }),
    r.map((o) => /* @__PURE__ */ l("div", { className: we.cell, children: [
      /* @__PURE__ */ n("span", { className: we.cellTitle, children: o.title }),
      /* @__PURE__ */ n("span", { className: we.cellBody, children: o.body }),
      o.tag !== void 0 && /* @__PURE__ */ n("span", { className: we.tag, children: o.tag })
    ] }, o.title))
  ] });
}
export {
  b1 as ActivityConsole,
  Zu as AgentCard,
  gk as AppShell,
  r1 as AppearanceStrip,
  I1 as Band,
  Ns as BoardColumn,
  Dk as BoardFootnote,
  Ok as BoardHeader,
  xk as BoardScroller,
  v as Btn,
  vk as CHIP_ROLES,
  Gn as CREDENTIAL_COLUMNS,
  $k as Callout,
  l1 as CapabilityRow,
  R1 as ChatMessage,
  fn as Checkbox,
  m as Chip,
  p1 as ClarificationRow,
  Yk as ClauseRuleRow,
  Vk as ClauseRules,
  Ln as ColourLadder,
  o1 as ComponentRow,
  g1 as Composer,
  Fk as ConfigRow,
  Hk as ConfigRowHead,
  Ha as ConnectionMark,
  S1 as Conversation,
  Qo as CostMeter,
  c1 as CredentialRow,
  i1 as CredentialRowHead,
  N1 as CriteriaList,
  Br as Crumb,
  T1 as DeliveryHealth,
  qk as DeniedState,
  Jk as DryRunRail,
  Hc as EmptyState,
  s1 as EnvCard,
  A as Field,
  Ek as FilteredEmpty,
  Lk as FormStack,
  Na as GateChecklist,
  y1 as GateLadder,
  hi as Grid,
  Qk as HandoffRuleRow,
  Xk as HandoffRules,
  jk as ItemDrawer,
  gt as LIVE_EVENT_TYPES,
  Nu as LegacyBoardColumn,
  zk as LegacyBoardHeader,
  Gk as LegacyConfigRow,
  Uk as LegacyItemDrawer,
  wu as LegacyOverCapNote,
  Kk as LegacyPreviewRail,
  Sn as LegacyWorkCard,
  ge as LiveIndicator,
  Ik as LoadFailed,
  Pk as Loading,
  Yn as MCP_SERVER_COLUMNS,
  Oa as Mark,
  u1 as MarkUpload,
  Ce as Marker,
  m1 as McpServerRow,
  h1 as McpServerRowHead,
  Zk as NewStreamModal,
  Wc as OverCapNote,
  Je as Overlay,
  Lh as PARTIAL_STEP_REASON,
  Jn as POLICY_CHIP_WIDTH,
  Sk as PageFrame,
  kk as PageHeader,
  w1 as PolicyRow,
  Wk as PreviewRail,
  Sa as ROLE_MATRIX_COLUMNS,
  Fn as RULE_ACTIONS,
  Nn as Radio,
  L1 as ReadyChecklist,
  Tk as RecordSection,
  k1 as RequeueSheet,
  $1 as ResolveBlock,
  A1 as ResolvedFieldRow,
  _1 as RoleMatrixRow,
  x1 as RoutingTable,
  e1 as RuleRow,
  v1 as RunbookSteps,
  bt as STREAM_STEPS,
  Ak as SectionBand,
  Li as SectionHeader,
  bn as SegmentedControl,
  E1 as SessionRow,
  yk as Sidebar,
  a1 as StageColumn,
  C1 as StageHistory,
  Ew as StageListEditor,
  Mk as StaleStrip,
  ba as StatStrip,
  n1 as StreamRow,
  Rk as SubjectRail,
  Ee as Switch,
  Nk as Tabs,
  t1 as ToolRow,
  Ck as TopBar,
  lc as Tree,
  kn as TreeRow,
  q1 as TypedInputBlock,
  f1 as ValidationList,
  uk as VisibilityProvider,
  hk as Visible,
  _k as WARD_VERSION,
  ga as WorkCard,
  Bk as WriteUnavailableStrip,
  Dy as agoSince,
  dt as clock,
  Yw as colourStatus,
  Z as count,
  te as duration,
  Ba as elapsed,
  wk as eventSourceTransport,
  wa as isStreamStep,
  _a as isValidatedStreamStep,
  Ah as ladderValidation,
  Kb as mcpConnectionChip,
  zb as mcpToolName,
  X as money,
  ue as ms,
  $n as ordered,
  wn as ratio,
  Bf as restartLabel,
  re as stamp,
  vn as stream,
  bk as streamChip,
  fa as streamChipProps,
  $e as streamColour,
  yt as streamHex,
  fk as streamVars,
  aa as useBorderFlash,
  _t as useFocusTrap,
  pk as useLiveFeed,
  mk as useReturnFocus,
  ma as useRovingTabindex,
  Pa as useTicker,
  ut as useVisible,
  j as v,
  d1 as validateMark,
  va as validatedStep,
  pt as validatedStreamSteps
};
