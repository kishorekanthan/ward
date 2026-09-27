import { jsx as n, Fragment as x, jsxs as l } from "react/jsx-runtime";
import { useMemo as ot, useContext as We, createContext as ze, useCallback as K, useEffect as E, useState as g, useRef as N, useLayoutEffect as it, useId as k, Fragment as ct } from "react";
import { createPortal as st } from "react-dom";
function te(e) {
  if (e < 6e4) return `${(e / 1e3).toFixed(1).replace(/\.0$/, "")}s`;
  const a = Math.floor(e / 6e4);
  if (a < 60) return `${a}m`;
  const t = Math.floor(e / 36e5);
  return t < 24 ? `${t}h ${a % 60}m` : `${Math.floor(t / 24)}d ${t % 24}h`;
}
const Ua = (e) => String(e).padStart(2, "0");
function Pa(e) {
  const a = Math.floor(Math.max(0, e) / 1e3);
  if (a < 60) return `${a}s`;
  const t = Math.floor(a / 60);
  return t < 60 ? `${t}m ${Ua(a % 60)}s` : `${Math.floor(t / 60)}h ${Ua(t % 60)}m`;
}
const dt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/London",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
function re(e) {
  const a = dt.formatToParts(new Date(e)), t = (r) => {
    var o;
    return ((o = a.find((i) => i.type === r)) == null ? void 0 : o.value) ?? "";
  };
  return `${t("day")} ${t("month")} ${t("hour")}:${t("minute")}`;
}
function Q(e) {
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
function vn(e, a) {
  return `${e} / ${a}`;
}
const ut = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  hour12: !1
});
function ht(e) {
  return ut.format(new Date(e));
}
const fn = ze(/* @__PURE__ */ new Set());
function _k({ hidden: e, children: a }) {
  const t = ot(() => new Set(e), [e]);
  return /* @__PURE__ */ n(fn.Provider, { value: t, children: a });
}
function mt(e) {
  return !We(fn).has(e);
}
function vk({ id: e, children: a, fallback: t = null }) {
  return /* @__PURE__ */ n(x, { children: mt(e) ? a : t });
}
const wt = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function _t(e, a, t, r) {
  return e.shiftKey ? document.activeElement === t ? r : void 0 : document.activeElement === r || !a.contains(document.activeElement) ? t : void 0;
}
function vt(e, a, t) {
  const r = t[0], o = t[t.length - 1];
  if (!r || !o) {
    e.preventDefault();
    return;
  }
  const i = _t(e, a, r, o);
  i && (e.preventDefault(), i.focus());
}
function ft(e) {
  return { onKeyDown: K(
    (t) => {
      if (t.key !== "Tab" || !e.current) return;
      const r = Array.from(e.current.querySelectorAll(wt));
      vt(t, e.current, r);
    },
    [e]
  ) };
}
function fk(e, a = !0) {
  E(() => {
    if (!a) return;
    const t = document.activeElement;
    return () => {
      var o, i;
      (i = (o = (typeof e == "function" ? e() : e) ?? t) == null ? void 0 : o.focus) == null || i.call(o);
    };
  }, [a, e]);
}
const Va = { ArrowUp: -1, ArrowDown: 1 }, Ya = { ArrowLeft: -1, ArrowRight: 1 }, bt = (e, a, t) => Math.min(t, Math.max(a, e));
function pt(e, a) {
  if (a !== "horizontal" && e in Va) return Va[e];
  if (a !== "vertical" && e in Ya) return Ya[e];
}
function ma({ orientation: e = "both" } = {}) {
  const [a, t] = g(0), r = N(/* @__PURE__ */ new Map()), o = N(!1);
  it(() => {
    var b;
    const d = Array.from(r.current.keys());
    if (d.length === 0 || d.includes(a)) return;
    const h = d[0], _ = o.current;
    o.current = !1, t(h), _ && ((b = r.current.get(h)) == null || b.focus());
  });
  const i = K((d) => t(d), []), c = K((d) => {
    var h;
    t(d), (h = r.current.get(d)) == null || h.focus();
  }, []), s = K(
    (d) => {
      const h = Array.from(r.current.keys());
      if (h.length === 0) return;
      const _ = Math.max(0, h.indexOf(a)), b = pt(d.key, e);
      b !== void 0 ? (d.preventDefault(), c(h[bt(_ + b, 0, h.length - 1)])) : d.key === "Home" ? (d.preventDefault(), c(h[0])) : d.key === "End" && (d.preventDefault(), c(h[h.length - 1]));
    },
    [a, c, e]
  ), u = K(
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
const bk = (e, a, t) => {
  const r = new EventSource(e), o = (i) => t.onEvent(i.data, i.lastEventId, i.type);
  r.onmessage = o;
  for (const i of ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"])
    r.addEventListener(i, o);
  return r.onopen = () => t.onOpen(), r.onerror = () => t.onError(), { close: () => r.close() };
}, pk = "0.2.0", gk = ["gate", "system", "write", "drift", "done", "attention", "failed", "pending", "running", "warn", "meta", "soft", "quiet", "stream"], gt = [1, 2, 3, 4, 5, 6], Nt = [1, 2, 3], yt = ["run.started", "run.step", "run.finding", "run.finished", "item.moved", "item.updated", "snapshot", "heartbeat"], j = {
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
function bn(e) {
  return {
    id: `var(--ward-stream-${e}-id)`,
    chip: `var(--ward-stream-${e}-chip)`,
    chipText: `var(--ward-stream-${e}-chipText)`
  };
}
function wa(e) {
  return gt.includes(e);
}
function _a(e) {
  return Nt.includes(e);
}
function Nk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return { "--stream": `var(--ward-stream-${e}-chip)`, "--streamText": `var(--ward-stream-${e}-chipText)`, "--streamId": `var(--ward-stream-${e}-id)` };
}
function yk(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return `var(--ward-stream-${e}-chip)`;
}
const kt = { 1: "#00897B", 2: "#7038C8", 3: "#BF5310", 4: "#1C6FB8", 5: "#8A6A00", 6: "#A02C6B" };
function $t(e) {
  if (!wa(e)) throw new Error("unvalidated stream step");
  return kt[e];
}
function Ja(e) {
  return typeof e != "string" ? null : yt.includes(e) ? e : null;
}
function Ct(e) {
  try {
    const a = JSON.parse(e);
    return typeof a == "object" && a !== null ? a : null;
  } catch {
    return null;
  }
}
function St(e, a) {
  return a !== "" ? a : typeof e.id == "string" ? e.id : "";
}
function Rt(e) {
  return typeof e.at == "string" ? e.at : (/* @__PURE__ */ new Date()).toISOString();
}
function Tt(e, a, t) {
  const r = Ct(e);
  if (r === null) return null;
  const o = Ja(t) ?? Ja(r.type);
  return o === null ? null : { ...r, type: o, id: St(r, a), at: Rt(r) };
}
function Lt(e, a) {
  return e >= ue.staleAfter ? "stale" : e >= ue.heartbeat && a === "live" ? "reconnecting" : null;
}
function xt(e, a, t) {
  return e >= ue.heartbeat && !a && t !== null;
}
function kk(e, a) {
  const [t, r] = g("reconnecting"), [o, i] = g(null), c = N(/* @__PURE__ */ new Map()), s = N(0), u = N(""), d = N(0), h = N(null), _ = N(0), b = N(0), L = N(!1), G = N("reconnecting"), J = K(($) => {
    G.current = $, r($);
  }, []), le = K(() => {
    s.current = Date.now();
  }, []), Ne = K(($) => {
    for (const [F, me] of c.current)
      (me === "*" || $.itemKey === me) && F($);
  }, []), oe = K(() => {
    h.current = a(e, { lastEventId: u.current }, {
      onEvent: ($, F, me) => {
        const Re = Tt($, F, me);
        Re !== null && (Re.id && (u.current = Re.id), le(), L.current = !1, J("live"), i(Re.at), Ne(Re));
      },
      onOpen: () => {
        d.current = 0, L.current = !1, le(), J("live");
      },
      onError: () => {
        var F;
        (F = h.current) == null || F.close(), h.current = null, L.current = !0, G.current !== "stale" && J("reconnecting");
        const $ = Math.min(ue.reconnectBase * 2 ** d.current, ue.reconnectMax);
        d.current += 1, _.current = window.setTimeout(oe, $);
      }
    });
  }, [Ne, J, le, a, e]), Ie = K(($) => {
    L.current = !0, $.close(), h.current = null, _.current = window.setTimeout(oe, ue.reconnectBase);
  }, [oe]), Me = K(($, F) => (c.current.set(F, $), () => {
    c.current.delete(F);
  }), []);
  return E(() => (oe(), b.current = window.setInterval(() => {
    const $ = Date.now() - s.current, F = Lt($, G.current);
    F && J(F);
    const me = h.current;
    xt($, L.current, me) && Ie(me);
  }, ue.tick), () => {
    var $;
    window.clearInterval(b.current), window.clearTimeout(_.current), L.current = !1, ($ = h.current) == null || $.close(), h.current = null;
  }), [oe, Ie, J]), { connection: t, lastEventAt: o, subscribe: Me };
}
function Da(e, a) {
  const t = new Date(e).getTime(), [r, o] = g(() => Date.now());
  return E(() => {
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
function At() {
  return typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Xa(e) {
  e.classList.remove("ward-border-flash"), e.removeAttribute("data-flash");
}
function aa(e, a) {
  const t = N(0), r = K((o) => {
    const i = o ?? a, c = e.current;
    c !== null && i !== void 0 && (At() || (c.style.setProperty("--ward-flash-colour", `var(--ward-color-${i})`), c.style.setProperty("--flash", `var(--ward-color-${i})`), c.classList.add("ward-border-flash"), c.setAttribute("data-flash", "true"), c.addEventListener("animationend", () => Xa(c), { once: !0 }), window.clearTimeout(t.current), t.current = window.setTimeout(() => Xa(c), ue.flash)));
  }, [a, e]);
  return E(() => () => window.clearTimeout(t.current), []), a === void 0 ? (o) => r(o) : () => r(a);
}
const Et = "_root_1otpc_2", qt = {
  root: Et
};
function It(e, a, t, r, o) {
  const i = [Pa(a)];
  return e || i.push(`as of ${ht(t)}`), r && i.push(`turn ${r[0]}/${r[1]}`), o && i.push(o.label), i;
}
function ge({ startedAt: e, lastEvent: a, connection: t, turn: r }) {
  const o = t !== "stale", i = Da(e, o), c = (a == null ? void 0 : a.at) ?? e, s = It(o, i, c, r, a);
  return /* @__PURE__ */ l("span", { className: `${qt.root} ward-liveind`, role: "timer", children: [
    /* @__PURE__ */ n("span", { "aria-hidden": "true", children: s.join(" · ") }),
    /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
      "started ",
      re(e)
    ] })
  ] });
}
const Mt = "_app_lrbcc_1", Bt = "_side_lrbcc_18", Pt = "_main_lrbcc_26", Dt = "_rail_lrbcc_33", Ot = "_page_lrbcc_40", Ht = "_root_lrbcc_91", Ft = "_topbar_lrbcc_98", jt = "_mark_lrbcc_109", Wt = "_brand_lrbcc_116", zt = "_tagline_lrbcc_122", Gt = "_identity_lrbcc_128", Kt = "_tools_lrbcc_129", Ut = "_actor_lrbcc_138", Vt = "_metadata_lrbcc_139", Yt = "_detail_lrbcc_155", Jt = "_nav_lrbcc_160", Xt = "_content_lrbcc_195", Qt = "_skip_lrbcc_218", D = {
  app: Mt,
  side: Bt,
  main: Pt,
  rail: Dt,
  page: Ot,
  root: Ht,
  topbar: Ft,
  mark: jt,
  brand: Wt,
  tagline: zt,
  identity: Gt,
  tools: Kt,
  actor: Ut,
  metadata: Vt,
  detail: Yt,
  nav: Jt,
  content: Xt,
  skip: Qt
};
function Zt({ sidebar: e, header: a, children: t, rail: r }) {
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
function er({ destinations: e, active: a }) {
  return /* @__PURE__ */ n("nav", { className: D.nav, "aria-label": "Primary", children: e.map((t) => /* @__PURE__ */ n("a", { href: t.href, "aria-current": t.id === a ? "page" : void 0, children: t.label }, t.id)) });
}
function la({ value: e, className: a }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: a, children: e });
}
function ar({ actor: e, metadata: a }) {
  return e === void 0 && a === void 0 ? null : /* @__PURE__ */ l("span", { className: D.metadata, children: [
    /* @__PURE__ */ n(la, { value: e, className: D.actor }),
    e !== void 0 && a !== void 0 ? /* @__PURE__ */ n("span", { "aria-hidden": "true", children: " · " }) : null,
    /* @__PURE__ */ n(la, { value: a, className: D.detail })
  ] });
}
function nr(e) {
  return /* @__PURE__ */ l("header", { className: D.topbar, children: [
    /* @__PURE__ */ n("span", { className: D.mark, "data-ward-shell-mark": "", "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: D.brand, children: e.brand ?? "Trellis" }),
    /* @__PURE__ */ n(la, { value: e.tagline, className: D.tagline }),
    /* @__PURE__ */ n(er, { destinations: e.destinations ?? [], active: e.active ?? "" }),
    /* @__PURE__ */ n("span", { className: D.identity, children: /* @__PURE__ */ n(ar, { actor: e.actor, metadata: e.metadata }) }),
    /* @__PURE__ */ n(la, { value: e.tools, className: D.tools })
  ] });
}
function tr(e) {
  const a = k();
  return /* @__PURE__ */ l("div", { className: `${D.root} ward-root`, "data-ward-shell": "", children: [
    /* @__PURE__ */ n("a", { className: D.skip, href: `#${a}`, children: "Skip to content" }),
    /* @__PURE__ */ n(nr, { ...e }),
    /* @__PURE__ */ n("div", { id: a, className: D.content, children: e.children })
  ] });
}
function rr(e) {
  return "sidebar" in e && e.sidebar !== void 0;
}
function $k(e) {
  return rr(e) ? /* @__PURE__ */ n(Zt, { ...e }) : /* @__PURE__ */ n(tr, { ...e });
}
const lr = "_btn_llheq_2", or = "_primary_llheq_13", ir = "_secondary_llheq_23", cr = "_ghost_llheq_28", sr = "_overflow_llheq_37", dr = "_sm_llheq_44", ur = "_disabled_llheq_48", Xe = {
  btn: lr,
  primary: or,
  secondary: ir,
  ghost: cr,
  overflow: sr,
  sm: dr,
  disabled: ur
};
function hr(e, a, t, r) {
  const o = a === "sm" ? [Xe.sm, "ward-btn--sm"] : [], i = t ? [Xe.disabled] : [];
  return [Xe.btn, Xe[e], "ward-btn", `ward-btn--${e}`, ...o, ...i, r ?? ""].filter(Boolean).join(" ");
}
function mr(e, a) {
  return e !== "overflow" ? {} : a ? { "aria-label": "More actions" } : { "aria-label": "More actions", "aria-haspopup": "menu" };
}
function wr(e) {
  if (e.disabled && !e.describedBy) throw new Error("Btn: a disabled button must name its reason via describedBy");
}
function _r(e) {
  return e.children ?? e.label;
}
function v(e) {
  wr(e);
  const a = e.variant ?? "secondary", t = e.size ?? "md", r = e.disabled ?? !1;
  return /* @__PURE__ */ n(
    "button",
    {
      type: e.type ?? "button",
      className: hr(a, t, r, e.className),
      "data-ward-btn": a,
      "data-ward-size": t,
      disabled: r,
      "aria-describedby": e.describedBy,
      onClick: e.onClick,
      "aria-expanded": e.expanded,
      "aria-controls": e.controls,
      ...mr(a, e.controls),
      children: _r(e)
    }
  );
}
function Oa(...e) {
  const a = e.filter((t) => t !== void 0 && t !== "");
  return a.length === 0 ? void 0 : a.join(" ");
}
const vr = "_root_o4yib_2", fr = "_row_o4yib_8", br = "_box_o4yib_14", pr = "_label_o4yib_21", gr = "_lockedNote_o4yib_26", Nr = "_consequence_o4yib_34", yr = "_sample_o4yib_69", Le = {
  root: vr,
  row: fr,
  box: br,
  label: pr,
  lockedNote: gr,
  consequence: Nr,
  sample: yr
};
function kr(e) {
  return e.locked ? { checked: !0, disabled: !0 } : { checked: e.checked, disabled: e.disabled ?? !1 };
}
function $r({ id: e, text: a }) {
  return a ? /* @__PURE__ */ n("p", { id: e, className: `${Le.consequence} ward-check-consequence`, children: a }) : null;
}
function Cr({ locked: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Le.lockedNote} ward-check-note`, children: "always shown" }) : null;
}
function Sr({ text: e }) {
  return e ? /* @__PURE__ */ n("span", { className: Le.sample, "aria-hidden": "true", children: e }) : null;
}
function pn(e) {
  const a = k(), t = e.consequence ? `${a}-note` : void 0, r = kr(e);
  return /* @__PURE__ */ l("div", { className: `${Le.root} ward-checkrow`, "data-ward-checkbox": "", "data-locked": e.locked || void 0, "data-variant": e.variant, children: [
    /* @__PURE__ */ l("span", { className: Le.row, children: [
      /* @__PURE__ */ n(
        "input",
        {
          id: a,
          type: "checkbox",
          className: `${Le.box} ward-field-option`,
          checked: r.checked,
          disabled: r.disabled,
          onChange: (o) => {
            var i;
            return !r.disabled && ((i = e.onChange) == null ? void 0 : i.call(e, o.target.checked));
          },
          "aria-describedby": Oa(t, e.describedBy)
        }
      ),
      /* @__PURE__ */ l("label", { htmlFor: a, className: Le.label, children: [
        e.label,
        /* @__PURE__ */ n(Cr, { locked: e.locked })
      ] }),
      /* @__PURE__ */ n(Sr, { text: e.sample })
    ] }),
    /* @__PURE__ */ n($r, { id: t, text: e.consequence })
  ] });
}
const Rr = "_chip_1073r_2", Tr = {
  chip: Rr
}, Lr = {
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
function xr(e, a) {
  if (e === "stream") return Ar(a);
  if (a) throw new Error("Chip: streamStep is only valid when role is 'stream'");
  const t = Lr[e];
  return { "--ward-chip-bg": t.bg, "--ward-chip-fg": t.fg, "--ward-chip-line": t.line };
}
function Ar(e) {
  if (!e || !_a(e))
    throw new Error(`Chip: stream step ${String(e)} is not validated — add its measured dark pair to tokens.json first`);
  const a = bn(e);
  return { "--ward-chip-bg": a.chip, "--ward-chip-fg": a.chipText, "--ward-chip-line": a.chip };
}
function m({ role: e, label: a, streamStep: t, size: r }) {
  if (!a) throw new Error("Chip: label is required");
  return /* @__PURE__ */ n("span", { className: `${Tr.chip} ward-chip ward-chip--${e}`, style: xr(e, t), "data-ward-chip": e, "data-size": r, children: a });
}
function va(e) {
  return typeof e == "number" && _a(e) ? e : null;
}
function Ce(e, a) {
  const t = va(e);
  return t === null ? "var(--ward-color-line2)" : `var(--ward-stream-${t}-${a})`;
}
function fa(e, a) {
  const t = va(a);
  return t === null ? { role: "meta", label: e } : { role: "stream", label: e, streamStep: t };
}
const Er = "_nav_fbsei_2", qr = "_list_fbsei_8", Ir = "_item_fbsei_15", Mr = "_link_fbsei_24", Br = "_current_fbsei_33", Pr = "_chips_fbsei_37", Be = {
  nav: Er,
  list: qr,
  item: Ir,
  link: Mr,
  current: Br,
  chips: Pr
};
function Dr({ path: e, chips: a }) {
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ l("nav", { "aria-label": "Breadcrumb", className: Be.nav, children: [
    /* @__PURE__ */ n("ol", { className: Be.list, children: e.map((t, r) => /* @__PURE__ */ n("li", { className: Be.item, children: r < e.length - 1 ? t.href ? /* @__PURE__ */ n("a", { className: Be.link, href: t.href, children: t.label }) : t.label : /* @__PURE__ */ n("span", { className: Be.current, "aria-current": "page", children: t.label }) }, t.label)) }),
    a != null && a.length ? /* @__PURE__ */ n("span", { className: `${Be.chips} ward-chiprow`, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] }) });
}
const Or = "_field_1oadv_2", Hr = "_label_1oadv_8", Fr = "_labelHidden_1oadv_15", jr = "_control_1oadv_25", Wr = "_mono_1oadv_44", zr = "_area_1oadv_49", Gr = "_invalid_1oadv_56", $e = {
  field: Or,
  label: Hr,
  labelHidden: Fr,
  control: jr,
  mono: Wr,
  area: zr,
  invalid: Gr
};
function Kr({ controlProps: e, cls: a }) {
  return /* @__PURE__ */ n("input", { className: a, ...e });
}
function Ur({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("select", { className: t, ...a, children: (e.options ?? []).map((r) => /* @__PURE__ */ n("option", { value: r.value, children: r.label }, r.value)) });
}
function Vr({ props: e, controlProps: a, cls: t }) {
  return /* @__PURE__ */ n("textarea", { className: t, rows: e.rows ?? 3, ...a });
}
const Yr = { input: Kr, select: Ur, textarea: Vr };
function Jr(e, a, t) {
  const r = Yr[e.kind ?? "input"];
  return /* @__PURE__ */ n(r, { props: e, controlProps: a, cls: t });
}
function Xr(e, a, t) {
  const r = e.invalid ? "true" : void 0;
  return {
    id: a,
    value: e.value,
    disabled: e.disabled,
    placeholder: e.placeholder,
    "aria-invalid": r,
    "aria-describedby": Oa(r ? t : void 0, e.describedBy),
    onChange: (o) => {
      var i;
      return (i = e.onChange) == null ? void 0 : i.call(e, o.target.value);
    }
  };
}
function Qr(e) {
  const a = e.mono ? [$e.mono, "ward-field-input--mono"] : [], t = e.kind === "textarea" ? [$e.area] : [];
  return [$e.control, "ward-field-input", ...a, ...t].filter(Boolean).join(" ");
}
function Zr(e) {
  return e ? `${$e.label} ${$e.labelHidden} ward-field-label` : `${$e.label} ward-field-label`;
}
function A(e) {
  const a = k(), t = `${a}-msg`, r = Xr(e, a, t), o = Qr(e);
  return /* @__PURE__ */ l("div", { className: `${$e.field} ward-field`, "data-ward-field": "", "data-variant": e.variant, children: [
    /* @__PURE__ */ n("label", { className: Zr(e.labelHidden), htmlFor: a, children: e.label }),
    Jr(e, r, o),
    e.invalid && /* @__PURE__ */ n("p", { id: t, className: `${$e.invalid} ward-field-error`, children: e.invalid })
  ] });
}
const el = "_strip_rg8pj_2", al = "_tab_rg8pj_12", nl = "_count_rg8pj_34", La = {
  strip: el,
  tab: al,
  count: nl
}, Qa = 7;
function tl(e, a) {
  const t = e.findIndex((r) => r.id === a);
  return t < 0 ? 0 : t;
}
function rl(e) {
  return `${La.strip} ward-tabs${e === 2 ? " ward-tabs--level2" : ""}`;
}
function Ck({ tabs: e, active: a, onChange: t, label: r = "Tabs", level: o = 1 }) {
  if (e.length > Qa) throw new Error(`Tabs: ${e.length} tabs exceeds the cap of ${Qa} — the set is fixed`);
  const i = ma({ orientation: "horizontal" }), c = tl(e, a);
  return E(() => i.setActive(c), [i.setActive, c]), /* @__PURE__ */ n(
    "div",
    {
      className: rl(o),
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
            s.count === void 0 ? null : /* @__PURE__ */ l(x, { children: [
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
const ll = "_root_jem6y_2", ol = "_segment_jem6y_7", Za = {
  root: ll,
  segment: ol
};
function gn({ options: e, value: a, onChange: t, label: r = "Options", disabled: o = !1, describedBy: i }) {
  if (e.length < 2 || e.length > 3)
    throw new Error(`SegmentedControl: ${e.length} options — the control takes 2 or 3`);
  const c = ma({ orientation: "horizontal" }), s = Math.max(0, e.findIndex((u) => u.value === a));
  return E(() => c.setActive(s), [c.setActive, s]), /* @__PURE__ */ n("div", { className: `${Za.root} ward-segmented`, role: "radiogroup", "aria-label": r, ...c.containerProps, children: e.map((u, d) => /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      role: "radio",
      className: Za.segment,
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
const il = "_sidebar_1jywv_3", cl = "_brand_1jywv_9", sl = "_mark_1jywv_17", dl = "_word_1jywv_24", ul = "_nav_1jywv_30", hl = "_navItem_1jywv_38", ml = "_group_1jywv_50", wl = "_groupName_1jywv_57", _l = "_agents_1jywv_70", vl = "_agent_1jywv_70", fl = "_agentTop_1jywv_88", bl = "_dot_1jywv_95", pl = "_agentName_1jywv_107", gl = "_agentMeta_1jywv_120", Nl = "_foot_1jywv_126", yl = "_footName_1jywv_132", kl = "_footLinks_1jywv_139", $l = "_footLink_1jywv_139", Cl = "_root_1jywv_153", Sl = "_linkBrand_1jywv_162", Rl = "_label_1jywv_183", Tl = "_note_1jywv_188", Ll = "_footer_1jywv_202", C = {
  sidebar: il,
  brand: cl,
  mark: sl,
  word: dl,
  nav: ul,
  navItem: hl,
  group: ml,
  groupName: wl,
  new: "_new_1jywv_64",
  agents: _l,
  agent: vl,
  agentTop: fl,
  dot: bl,
  agentName: pl,
  agentMeta: gl,
  foot: Nl,
  footName: yl,
  footLinks: kl,
  footLink: $l,
  root: Cl,
  linkBrand: Sl,
  label: Rl,
  note: Tl,
  footer: Ll
};
function xl({ agent: e }) {
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
              style: { "--dot": bn(e.streamStep).id }
            }
          ),
          /* @__PURE__ */ n("span", { className: C.agentName, children: e.label })
        ] }),
        /* @__PURE__ */ n("span", { className: C.agentMeta, children: e.meta })
      ]
    }
  ) });
}
function Al({ shared: e }) {
  return e ? /* @__PURE__ */ l("div", { className: C.foot, children: [
    /* @__PURE__ */ n("span", { className: C.footName, children: e.heading }),
    /* @__PURE__ */ n("div", { className: C.footLinks, children: e.links.map((a) => /* @__PURE__ */ n("a", { className: C.footLink, href: a.href, children: a.label }, a.href)) })
  ] }) : null;
}
function El({ brand: e, nav: a, agentsHeading: t, agents: r, newAction: o, shared: i }) {
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
        ae(r.length)
      ] }),
      o && /* @__PURE__ */ n("a", { className: C.new, href: o.href, children: o.label })
    ] }),
    /* @__PURE__ */ n("ul", { className: C.agents, children: r.map((c) => /* @__PURE__ */ n(xl, { agent: c }, c.href)) }),
    /* @__PURE__ */ n(Al, { shared: i })
  ] });
}
function ql(e) {
  return e.destinations ?? e.items ?? [];
}
function Il({ brand: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.linkBrand, children: e });
}
function Ml({ children: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: C.footer, children: e });
}
function Bl({ link: e, active: a }) {
  return /* @__PURE__ */ l("a", { href: e.href, "aria-current": a ? "page" : void 0, children: [
    /* @__PURE__ */ n("span", { className: C.label, children: e.label }),
    e.note === void 0 ? null : /* @__PURE__ */ n("span", { className: C.note, children: e.note })
  ] });
}
function Pl(e) {
  return /* @__PURE__ */ l("aside", { className: `${C.root} ward-sidebar`, "data-ward-sidebar": !0, children: [
    /* @__PURE__ */ n(Il, { brand: e.brand }),
    /* @__PURE__ */ n("nav", { "aria-label": e.label ?? "Sidebar", children: ql(e).map((a) => /* @__PURE__ */ n(Bl, { link: a, active: a.id === e.active }, a.id)) }),
    /* @__PURE__ */ n(Ml, { children: e.children })
  ] });
}
function Dl(e) {
  return "agents" in e;
}
function Sk(e) {
  return Dl(e) ? /* @__PURE__ */ n(El, { ...e }) : /* @__PURE__ */ n(Pl, { ...e });
}
const Ol = "_mark_wlgi8_3", Hl = {
  mark: Ol
}, Fl = { met: "✓", unmet: "", failed: "✕" };
function Ha({ state: e, label: a }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: Hl.mark,
      "data-state": e,
      "data-testid": "mark",
      role: a ? "img" : void 0,
      "aria-label": a,
      "aria-hidden": a ? void 0 : !0,
      children: Fl[e]
    }
  );
}
const jl = "_marker_br9fi_2", Wl = {
  marker: jl
}, zl = {
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
function Se({ size: e, kind: a, label: t }) {
  const r = { "--marker": zl[a], width: e, height: e };
  return /* @__PURE__ */ n(
    "span",
    {
      className: `${Wl.marker} ward-marker ward-marker--${a}`,
      style: r,
      "data-testid": "marker",
      role: t ? "img" : void 0,
      "aria-label": t,
      "aria-hidden": t ? void 0 : !0
    }
  );
}
const Gl = "_root_ti0pq_2", Kl = "_chip_ti0pq_11", Ul = "_noCase_ti0pq_23", Qe = {
  root: Gl,
  chip: Kl,
  noCase: Ul
};
function Vl(e, a) {
  return e ?? a ?? (/* @__PURE__ */ new Date()).toISOString();
}
function Fa({ connection: e, since: a, lastEventAt: t }) {
  const r = Vl(a, t), o = Da(r, e === "reconnecting");
  return e === "live" ? /* @__PURE__ */ l("span", { className: `${Qe.root} ward-connection`, role: "status", children: [
    /* @__PURE__ */ n(Se, { size: 6, kind: "green" }),
    "LIVE"
  ] }) : e === "reconnecting" ? /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "RECONNECTING ·",
    " ",
    /* @__PURE__ */ n("span", { className: Qe.noCase, children: Pa(o) })
  ] }) : /* @__PURE__ */ l("span", { className: `${Qe.chip} ward-connection`, role: "status", children: [
    "STALE · as of ",
    re(r)
  ] });
}
const Yl = "_root_11rs7_2", Jl = "_context_11rs7_12", Xl = "_row_11rs7_1", Ql = "_heading_11rs7_25", Zl = "_headingWrap_11rs7_33", eo = "_chips_11rs7_38", ao = "_title_11rs7_45", no = "_consequence_11rs7_54", to = "_actionsWrap_11rs7_59", ro = "_actions_11rs7_59", lo = "_action_11rs7_59", oo = "_overflowPanel_11rs7_78", io = "_measure_11rs7_88", Z = {
  root: Yl,
  context: Jl,
  row: Xl,
  heading: Ql,
  headingWrap: Zl,
  chips: eo,
  title: ao,
  consequence: no,
  actionsWrap: to,
  actions: ro,
  action: lo,
  overflowPanel: oo,
  measure: io
};
function co({ title: e, consequence: a }) {
  return /* @__PURE__ */ l("div", { className: Z.heading, children: [
    /* @__PURE__ */ n("h1", { className: Z.title, children: e }),
    a && /* @__PURE__ */ n("p", { className: Z.consequence, children: a })
  ] });
}
function xa({ actions: e }) {
  return e.map((a, t) => /* @__PURE__ */ n("span", { className: Z.action, "data-action": "", children: a }, t));
}
function en({ disclosure: e }) {
  return /* @__PURE__ */ n(v, { variant: "overflow", onClick: e.toggle, expanded: e.open, controls: e.panelId, children: "···" });
}
function so({ actions: e, hasMore: a, collapsed: t, onOverflow: r, disclosure: o }) {
  return t ? r ? /* @__PURE__ */ n(v, { variant: "overflow", onClick: r, children: "···" }) : /* @__PURE__ */ n(en, { disclosure: o }) : a ? [/* @__PURE__ */ n(en, { disclosure: o }, "more"), /* @__PURE__ */ n(xa, { actions: e }, "actions")] : /* @__PURE__ */ n(xa, { actions: e });
}
function uo(e, a, t, r) {
  return t ? r ? null : [...e, ...a] : e.length > 0 ? e : null;
}
function ho({ actions: e, disclosure: a, onEscape: t }) {
  if (e === null) return null;
  const r = (o) => {
    o.key === "Escape" && t();
  };
  return /* @__PURE__ */ n("div", { id: a.panelId, className: Z.overflowPanel, "data-ward-overflow-panel": "", hidden: !a.open, onKeyDown: r, children: /* @__PURE__ */ n(xa, { actions: e }) });
}
function mo(e, a) {
  const t = k(), [r, o] = g(!1), i = r && e;
  return { disclosure: { open: i, panelId: t, toggle: () => o(!i) }, close: () => {
    var u, d;
    o(!1), (d = (u = a.current) == null ? void 0 : u.querySelector("button")) == null || d.focus();
  } };
}
function wo({ crumb: e, chips: a }) {
  return /* @__PURE__ */ l("div", { className: Z.context, children: [
    /* @__PURE__ */ n(Dr, { path: e }),
    a != null && a.length ? /* @__PURE__ */ n("div", { className: Z.chips, children: a.map((t) => /* @__PURE__ */ n(m, { ...t }, t.label)) }) : null
  ] });
}
function _o(...e) {
  return e.some((a) => a === null);
}
function vo(e) {
  return Number.parseFloat(getComputedStyle(e).columnGap) || 0;
}
function fo(e, a, t, r, o) {
  if (o === 0 || _o(a, t, r)) return !1;
  const [i, c, s] = [a, t, r], u = vo(e), d = Math.max(0, e.clientWidth - i.offsetWidth - u);
  return s.offsetWidth > d || c.scrollWidth > c.clientWidth + 1;
}
function bo(e) {
  return e !== null && typeof ResizeObserver < "u";
}
function po(e) {
  const a = N(null), t = N(null), r = N(null), o = N(null), [i, c] = g(!1);
  return E(() => {
    const s = a.current;
    if (!bo(s)) return;
    const u = () => c(fo(s, t.current, r.current, o.current, e.length)), d = new ResizeObserver(u);
    return d.observe(s), u(), () => d.disconnect();
  }, [e]), { rowRef: a, headingRef: t, actionsRef: r, measureRef: o, collapsed: i };
}
function go({ actions: e, hasMore: a, measureRef: t }) {
  return /* @__PURE__ */ l("div", { className: Z.measure, ref: t, "aria-hidden": "true", children: [
    a ? /* @__PURE__ */ n("span", { children: /* @__PURE__ */ n(v, { variant: "overflow", children: "···" }) }) : null,
    e.map((r, o) => /* @__PURE__ */ n("span", { children: r }, o))
  ] });
}
function No({ connection: e }) {
  return e ? /* @__PURE__ */ n(Fa, { connection: e.connection, since: e.since }) : null;
}
function Rk({ crumb: e, chips: a, title: t, consequence: r, actions: o = [], more: i = [], connection: c, onOverflow: s, density: u = "page" }) {
  const { rowRef: d, headingRef: h, actionsRef: _, measureRef: b, collapsed: L } = po(o), G = i.length > 0, { disclosure: J, close: le } = mo(L || G, _), Ne = uo(i, o, L, s);
  return /* @__PURE__ */ l("header", { className: Z.root, "data-density": u, children: [
    /* @__PURE__ */ n(wo, { crumb: e, chips: a }),
    /* @__PURE__ */ l("div", { className: Z.row, ref: d, children: [
      /* @__PURE__ */ n("div", { ref: h, className: Z.headingWrap, children: /* @__PURE__ */ n(co, { title: t, consequence: r }) }),
      /* @__PURE__ */ l("div", { className: Z.actionsWrap, children: [
        /* @__PURE__ */ n(No, { connection: c }),
        /* @__PURE__ */ n("div", { className: Z.actions, ref: _, "data-ward-actions": !0, children: /* @__PURE__ */ n(so, { actions: o, hasMore: G, collapsed: L, onOverflow: s, disclosure: J }) })
      ] })
    ] }),
    /* @__PURE__ */ n(ho, { actions: Ne, disclosure: J, onEscape: le }),
    /* @__PURE__ */ n(go, { actions: o, hasMore: G, measureRef: b })
  ] });
}
function Nn(e) {
  const [a, t] = g(() => {
    var r;
    return ((r = window.matchMedia) == null ? void 0 : r.call(window, e).matches) ?? !1;
  });
  return E(() => {
    var i;
    const r = (i = window.matchMedia) == null ? void 0 : i.call(window, e);
    if (!r) return;
    const o = (c) => t(c.matches);
    return r.addEventListener("change", o), t(r.matches), () => r.removeEventListener("change", o);
  }, [e]), a;
}
const yo = "_scrim_c7sqj_2", ko = "_drawer_c7sqj_10", $o = "_sheet_c7sqj_14", Co = "_modal_c7sqj_18", So = "_panel_c7sqj_23", Ro = "_header_c7sqj_51", To = "_title_c7sqj_59", Lo = "_body_c7sqj_63", xo = "_close_c7sqj_90", pe = {
  scrim: yo,
  drawer: ko,
  sheet: $o,
  modal: Co,
  panel: So,
  header: Ro,
  title: To,
  body: Lo,
  close: xo
}, Ao = ze(null), oa = [], ia = /* @__PURE__ */ new Map();
function Eo(e) {
  return e.hasAttribute("data-ward-overlay-root");
}
function qo(e, a) {
  let t = ia.get(a);
  t || (t = { owners: /* @__PURE__ */ new Set(), wasInert: a.hasAttribute("inert") }, ia.set(a, t)), !t.owners.has(e) && (t.owners.add(e), e.claims.push(a), a.setAttribute("inert", ""));
}
function Io(e, a) {
  for (const t of Array.from(a.children))
    Eo(t) || qo(e, t);
}
function Mo(e) {
  for (const a of e.claims) {
    const t = ia.get(a);
    t && (t.owners.delete(e), !(t.owners.size > 0) && (t.wasInert || a.removeAttribute("inert"), ia.delete(a)));
  }
}
function Bo(e, a) {
  const t = { root: e, claims: [] };
  return oa.push(t), Io(t, a), t;
}
function Po(e) {
  const a = oa.indexOf(e);
  a >= 0 && oa.splice(a, 1), Mo(e);
}
function an(e) {
  return e !== null && oa.at(-1) === e;
}
function Do(e, a, t) {
  const r = N(null), o = N(t);
  return o.current = t, E(() => {
    const i = e.current;
    if (!i) return;
    const c = document.activeElement, s = Bo(i, a);
    return r.current = s, () => {
      var d, h;
      const u = an(s);
      Po(s), r.current = null, u && ((h = (d = o.current ?? c) == null ? void 0 : d.focus) == null || h.call(d));
    };
  }, [a]), K(() => an(r.current), []);
}
function Oo(e, a) {
  return e === "modal" && !a ? "sheet" : e;
}
function Ho(e, a) {
  return e.title !== void 0 ? { labelledBy: a, label: void 0 } : e.labelledBy !== void 0 ? { labelledBy: e.labelledBy, label: void 0 } : { labelledBy: void 0, label: e.label ?? "Dialog" };
}
function Fo({ props: e, titleId: a }) {
  return e.title === void 0 ? /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, "data-untitled": "", "data-flush": e.flush || void 0, children: e.children }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("header", { className: `${pe.header} ward-drawer-head`, children: /* @__PURE__ */ n("h2", { className: `${pe.title} ward-drawer-title ward-truncate`, id: a, children: e.title }) }),
    /* @__PURE__ */ n("div", { className: `${pe.body} ward-drawer-body`, children: e.children })
  ] });
}
function jo(e) {
  return `${pe.scrim} ${pe[e]} ward-overlay-scrim ward-overlay-scrim--${e}`;
}
function Wo(e, a) {
  const t = e === "drawer" ? "" : ` ward-overlay-panel--${e}`, r = a ? " ward-overlay-panel--wide" : "";
  return `${pe.panel} ${pe[e]} ward-overlay-panel${t}${r}`;
}
function zo(e) {
  const a = We(Ao);
  return e ?? a ?? document.body;
}
function Je(e) {
  const a = N(null), t = N(null), r = k(), o = zo(e.container), i = Nn("(min-width: 768px)"), c = Oo(e.kind, i), s = Ho(e, r), u = ft(t), d = Do(a, o, e.returnFocusTo), h = K(() => {
    d() && e.onClose();
  }, [e.onClose, d]);
  return E(() => {
    var _, b;
    d() && ((b = (_ = t.current) == null ? void 0 : _.querySelector("button")) == null || b.focus());
  }, [d]), E(() => {
    const _ = (b) => {
      b.key === "Escape" && h();
    };
    return document.addEventListener("keydown", _), () => document.removeEventListener("keydown", _);
  }, [h]), st(
    /* @__PURE__ */ n(
      "div",
      {
        ref: a,
        className: jo(c),
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
            className: Wo(c, e.wide),
            "data-wide": e.wide || void 0,
            onClick: (_) => _.stopPropagation(),
            onKeyDown: (_) => d() && u.onKeyDown(_),
            children: [
              /* @__PURE__ */ n("button", { type: "button", className: `${pe.close} ward-btn ward-btn--sm ward-btn--ghost`, "aria-label": e.closeLabel ?? "Close", onClick: h, children: e.closeLabel ?? "✕" }),
              /* @__PURE__ */ n(Fo, { props: e, titleId: r })
            ]
          }
        )
      }
    ),
    o
  );
}
const Go = "_root_drrhx_2", Ko = "_ticket_drrhx_15", Uo = "_body_drrhx_24", ya = {
  root: Go,
  ticket: Ko,
  body: Uo
};
function Tk({ variant: e = "info", ticket: a, children: t }) {
  if (!a) throw new Error("Callout: a callout must cite the ticket that decided it");
  return /* @__PURE__ */ l("aside", { className: `${ya.root} ward-callout${e === "warn" ? " ward-callout--warn" : ""}`, role: "note", "data-variant": e, children: [
    /* @__PURE__ */ n("span", { className: `${ya.ticket} ward-callout-ticket`, children: a }),
    /* @__PURE__ */ n("div", { className: ya.body, children: t })
  ] });
}
const Vo = "_root_1bfqw_2", Yo = "_figure_1bfqw_7", Jo = "_of_1bfqw_13", Xo = "_bar_1bfqw_18", Qo = "_rows_1bfqw_38", Zo = "_row_1bfqw_38", ei = "_label_1bfqw_49", ai = "_amount_1bfqw_54", ye = {
  root: Vo,
  figure: Yo,
  of: Jo,
  bar: Xo,
  rows: Qo,
  row: Zo,
  label: ei,
  amount: ai
};
function ni({ spent: e, ceiling: a, breakdown: t }) {
  const r = a > 0 ? Math.min(e / a, 1) : 0;
  return /* @__PURE__ */ l("div", { className: `${ye.root} ward-costmeter`, children: [
    /* @__PURE__ */ l("p", { className: `${ye.figure} ward-stat-value`, children: [
      Q(e),
      " ",
      /* @__PURE__ */ l("span", { className: ye.of, children: [
        "of ",
        Q(a)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "meter",
      {
        className: `${ye.bar} ward-costbar`,
        min: 0,
        max: a,
        value: e,
        "aria-valuetext": `${Q(e)} of ${Q(a)}`,
        style: { "--share": `${r * 100}%` }
      }
    ),
    t && /* @__PURE__ */ n("ul", { className: ye.rows, children: t.map((o) => /* @__PURE__ */ l("li", { className: `${ye.row} ward-costrow`, children: [
      /* @__PURE__ */ n("span", { className: ye.label, children: o.label }),
      /* @__PURE__ */ n("span", { className: ye.amount, children: Q(o.amount) })
    ] }, o.label)) })
  ] });
}
const ti = "_frame_mg2jl_2", ri = "_table_mg2jl_6", li = "_th_mg2jl_12", oi = "_td_mg2jl_13", ii = "_sort_mg2jl_47", ci = "_row_mg2jl_53", si = "_empty_mg2jl_61", ke = {
  frame: ti,
  table: ri,
  th: li,
  td: oi,
  sort: ii,
  row: ci,
  empty: si
}, di = { asc: "ascending", desc: "descending" };
function ui(e, a) {
  if (!(a === void 0 || a.key !== e.key))
    return di[a.direction];
}
function hi(e, a) {
  return e.sortable && a ? /* @__PURE__ */ n("button", { type: "button", className: ke.sort, onClick: () => a(e.key), children: e.header }) : e.header;
}
function mi(e) {
  return e === void 0 ? void 0 : { width: e };
}
function wi({ column: e, sort: a, onSort: t }) {
  return /* @__PURE__ */ n(
    "th",
    {
      scope: "col",
      className: ke.th,
      style: mi(e.width),
      "data-align": e.align,
      "data-drop": e.dropPriority,
      "aria-sort": ui(e, a),
      children: hi(e, t)
    }
  );
}
function _i({ row: e, props: a }) {
  const t = a.rowId(e), r = (a.lockedIds ?? []).includes(t);
  return /* @__PURE__ */ n(
    "tr",
    {
      className: ke.row,
      "data-selected": t === a.selectedId ? !0 : void 0,
      "data-locked": r ? !0 : void 0,
      inert: r ? !0 : void 0,
      children: a.columns.map((o) => /* @__PURE__ */ n("td", { className: ke.td, "data-align": o.align, "data-mono": o.mono, "data-drop": o.dropPriority, children: a.renderCell(e, o.key) }, o.key))
    }
  );
}
function vi({
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
  return t.length === 0 ? /* @__PURE__ */ n("div", { className: ke.empty, children: d }) : /* @__PURE__ */ n("div", { className: ke.frame, children: /* @__PURE__ */ l("table", { className: ke.table, "aria-label": e, children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: ke.head, children: a.map((h) => /* @__PURE__ */ n(wi, { column: h, sort: s, onSort: u }, h.key)) }) }),
    /* @__PURE__ */ n("tbody", { children: t.map((h) => /* @__PURE__ */ n(_i, { row: h, props: { label: e, columns: a, rows: t, rowId: r, renderCell: o, selectedId: i, lockedIds: c, sort: s, onSort: u, empty: d } }, r(h))) })
  ] }) });
}
const fi = "_set_y5zy3_2", bi = "_legend_y5zy3_7", pi = "_row_y5zy3_15", gi = "_control_y5zy3_20", Ni = "_input_y5zy3_26", yi = "_label_y5zy3_31", ki = "_consequence_y5zy3_36", Te = {
  set: fi,
  legend: bi,
  row: pi,
  control: gi,
  input: Ni,
  label: yi,
  consequence: ki
};
function yn({ legend: e, options: a, value: t, onChange: r, disabled: o, name: i, describedBy: c, variant: s }) {
  const u = k(), d = i ?? u;
  return /* @__PURE__ */ l("fieldset", { className: Te.set, "data-variant": s, children: [
    /* @__PURE__ */ n("legend", { className: Te.legend, children: e }),
    a.map((h) => {
      const _ = `${d}-${h.value}`, b = h.consequence ? `${_}-note` : void 0;
      return /* @__PURE__ */ l("div", { className: Te.row, children: [
        /* @__PURE__ */ l("span", { className: Te.control, children: [
          /* @__PURE__ */ n(
            "input",
            {
              id: _,
              type: "radio",
              name: d,
              className: Te.input,
              value: h.value,
              checked: t === h.value,
              disabled: o,
              "aria-describedby": Oa(b, c),
              onChange: () => !o && (r == null ? void 0 : r(h.value))
            }
          ),
          /* @__PURE__ */ n("label", { htmlFor: _, className: Te.label, children: h.label })
        ] }),
        h.consequence && /* @__PURE__ */ n("p", { id: b, className: `${Te.consequence} ward-check-consequence`, children: h.consequence })
      ] }, h.value);
    })
  ] });
}
const $i = "_root_1h1ot_2", Ci = "_head_1h1ot_11", Si = "_index_1h1ot_25", Ri = "_dot_1h1ot_29", Ti = "_note_1h1ot_34", Li = "_counter_1h1ot_40", xi = "_trailing_1h1ot_48", xe = {
  root: $i,
  head: Ci,
  index: Si,
  dot: Ri,
  note: Ti,
  counter: Li,
  trailing: xi
};
function Ai({ index: e }) {
  return e ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${xe.index} ward-sh-index`, children: e }),
    /* @__PURE__ */ n("span", { className: xe.dot, "aria-hidden": "true", children: "·" })
  ] }) : null;
}
function Ei({ counter: e }) {
  return e ? /* @__PURE__ */ n("span", { className: xe.counter, "aria-hidden": "true", children: e }) : null;
}
function qi({ title: e, index: a, note: t, counter: r, kind: o = "micro", trailing: i }) {
  return /* @__PURE__ */ l("div", { className: `${xe.root} ward-sh`, "data-kind": o, children: [
    /* @__PURE__ */ l("h2", { className: xe.head, children: [
      /* @__PURE__ */ n(Ai, { index: a }),
      e,
      r && /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
        " · ",
        r
      ] })
    ] }),
    t && /* @__PURE__ */ n("span", { className: xe.note, children: t }),
    /* @__PURE__ */ n(Ei, { counter: r }),
    i === void 0 ? null : /* @__PURE__ */ n("span", { className: xe.trailing, children: i })
  ] });
}
const Ii = "_strip_1qhvo_2", Mi = "_cell_1qhvo_7", Bi = "_value_1qhvo_12", Pi = "_label_1qhvo_27", Ze = {
  strip: Ii,
  cell: Mi,
  value: Bi,
  label: Pi
};
function Di(e) {
  if (e.length < 2 || e.length > 4)
    throw new Error(`StatStrip: ${e.length} cells — the strip takes two to four`);
  if (e.filter((a) => a.accent).length > 1) throw new Error("StatStrip: only the cell carrying the argument may be accented");
}
function ba({ cells: e, divided: a = !1 }) {
  return Di(e), /* @__PURE__ */ n("dl", { className: `${Ze.strip} ward-statstrip`, "data-divided": a || void 0, children: e.map((t) => /* @__PURE__ */ l("div", { className: Ze.cell, "data-accent": t.accent, children: [
    /* @__PURE__ */ n("dd", { className: `${Ze.value} ward-stat-value${t.accent ? ` ward-stat-accent--${t.accent}` : ""}`, children: t.value }),
    /* @__PURE__ */ n("dt", { className: `${Ze.label} ward-stat-label`, children: t.label })
  ] }, t.label)) });
}
const Oi = "_root_xk7sv_2", Hi = "_track_xk7sv_8", Fi = "_thumb_xk7sv_35", ji = "_labelHidden_xk7sv_53", Wi = "_label_xk7sv_53", zi = "_lockedNote_xk7sv_68", Ae = {
  root: Oi,
  track: Hi,
  thumb: Fi,
  labelHidden: ji,
  label: Wi,
  lockedNote: zi
};
function Gi(e) {
  return e ? `${Ae.label} ${Ae.labelHidden}` : Ae.label;
}
function qe({ label: e, checked: a, onChange: t, disabled: r, locked: o, describedBy: i, labelHidden: c }) {
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
    /* @__PURE__ */ l("span", { id: s, className: Gi(c), children: [
      e,
      o && /* @__PURE__ */ n("span", { className: Ae.lockedNote, children: "always on" })
    ] })
  ] });
}
const Ki = "_bar_1u2kl_2", Ui = "_skip_1u2kl_11", Vi = "_mark_1u2kl_22", Yi = "_nav_1u2kl_30", Ji = "_list_1u2kl_34", Xi = "_select_1u2kl_40", Qi = "_dest_1u2kl_47", Zi = "_actor_1u2kl_61", ec = "_actorMark_1u2kl_74", ac = "_actorLabel_1u2kl_79", nc = "_tagline_1u2kl_98", ie = {
  bar: Ki,
  skip: Ui,
  mark: Vi,
  nav: Yi,
  list: Ji,
  select: Xi,
  dest: Qi,
  actor: Zi,
  actorMark: ec,
  actorLabel: ac,
  tagline: nc
};
function tc(e) {
  return e.split(/\s+/).slice(0, 2).map((a) => a[0] ?? "").join("").toUpperCase();
}
function rc(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.label;
}
function Lk({ wordmark: e = "Trellis", destinations: a, active: t, actor: r, tagline: o, onNavigate: i, skipTo: c = "main" }) {
  const s = rc(r);
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
      /* @__PURE__ */ n("span", { className: ie.actorMark, "aria-hidden": "true", children: tc(s) })
    ] })
  ] });
}
const lc = "_tree_1lyby_2", oc = "_item_1lyby_6", ic = "_row_1lyby_10", cc = "_button_1lyby_22", ca = {
  tree: lc,
  item: oc,
  row: ic,
  button: cc
}, kn = ze(null);
function sc({ label: e, children: a }) {
  const { containerProps: t, itemProps: r } = ma({ orientation: "vertical" });
  return /* @__PURE__ */ n(kn.Provider, { value: r, children: /* @__PURE__ */ n("ul", { className: ca.tree, role: "tree", "aria-label": e, ...t, children: a }) });
}
const dc = { ArrowRight: !0, ArrowLeft: !1 };
function nn(e) {
  return e ? !0 : void 0;
}
function uc(e, a) {
  const t = dc[e.key];
  !a.leaf && a.onToggle && t !== void 0 && !!a.expanded !== t && a.onToggle();
}
function hc(e) {
  var a, t;
  e.leaf || (a = e.onToggle) == null || a.call(e), (t = e.onSelect) == null || t.call(e);
}
function mc(e) {
  const a = [ca.row, "ward-treerow"];
  return e.unresolved && a.push("ward-treerow--unresolved"), e.inherited && a.push("ward-treerow--inherited"), a.join(" ");
}
function wc(e) {
  return e.leaf ? void 0 : !!e.expanded;
}
function _c(e) {
  return e.leaf ? "·" : e.expanded ? "▾" : "▸";
}
function vc(e) {
  return typeof e == "string" ? e : void 0;
}
function fc({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-treeitem-mark ward-truncate", children: e });
}
function bc({ unresolved: e, inherited: a }) {
  const t = [e ? "unresolved" : "", a ? "inherited" : ""].filter(Boolean).join(", ");
  return t === "" ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: t });
}
function $n(e) {
  const a = We(kn);
  if (!a) throw new Error("TreeRow: must be rendered inside a Tree");
  const t = wc(e);
  return /* @__PURE__ */ l("li", { className: ca.item, role: "none", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: mc(e),
        role: "treeitem",
        style: { "--depth": e.depth },
        "aria-level": e.depth + 1,
        "aria-expanded": t,
        "data-depth": e.depth,
        "data-unresolved": nn(e.unresolved),
        "data-inherited": nn(e.inherited),
        children: /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: `${ca.button} ward-treeitem-btn`,
            onClick: () => hc(e),
            onKeyDown: (r) => uc(r, e),
            ...a(e.index),
            children: [
              /* @__PURE__ */ n("span", { className: "ward-treeitem-mark", "aria-hidden": "true", children: _c(e) }),
              /* @__PURE__ */ n("span", { className: "ward-truncate", title: vc(e.label), children: e.label }),
              /* @__PURE__ */ n(fc, { value: e.detail }),
              /* @__PURE__ */ n(bc, { unresolved: e.unresolved, inherited: e.inherited })
            ]
          }
        )
      }
    ),
    t && e.children ? /* @__PURE__ */ n("ul", { role: "group", children: e.children }) : null
  ] });
}
const pc = "_frame_9lntd_2", gc = "_subjectRail_9lntd_21", Nc = "_subject_9lntd_21", yc = "_rail_9lntd_41", kc = "_record_9lntd_63", $c = "_recordBody_9lntd_68", Cc = "_band_9lntd_111", Sc = "_bandBody_9lntd_120", Rc = "_bandActions_9lntd_125", Tc = "_scroller_9lntd_132", Lc = "_lanes_9lntd_150", de = {
  frame: pc,
  subjectRail: gc,
  subject: Nc,
  rail: yc,
  record: kc,
  recordBody: $c,
  band: Cc,
  bandBody: Sc,
  bandActions: Rc,
  scroller: Tc,
  lanes: Lc
};
function xk({ children: e, as: a = "main", inset: t = "page" }) {
  return /* @__PURE__ */ n(a, { className: de.frame, "data-ward-page-frame": "", "data-inset": t, children: e });
}
function tn(e) {
  return e ? "true" : void 0;
}
function Ak({ children: e, rail: a, width: t = "preview", railLabel: r = "Supporting details", sticky: o, ruled: i }) {
  return /* @__PURE__ */ l("div", { className: de.subjectRail, "data-ward-subject-rail": t, "data-ruled": tn(i), children: [
    /* @__PURE__ */ n("div", { className: de.subject, children: e }),
    /* @__PURE__ */ n("aside", { className: de.rail, "data-sticky": tn(o), "aria-label": r, children: a })
  ] });
}
function Ek({ title: e, children: a, note: t, trailing: r, pad: o = "block", label: i }) {
  return /* @__PURE__ */ l("section", { className: de.record, "aria-label": i, "data-ward-record-section": "", children: [
    /* @__PURE__ */ n(qi, { kind: "key", title: e, note: t, trailing: r }),
    /* @__PURE__ */ n("div", { className: de.recordBody, "data-pad": o, children: a })
  ] });
}
const xc = "_form_1j8ub_2", Ac = "_fields_1j8ub_9", Ec = "_actions_1j8ub_19", ka = {
  form: xc,
  fields: Ac,
  actions: Ec
};
function qk({ label: e, children: a, actions: t, onSubmit: r }) {
  const o = (i) => {
    i.preventDefault(), r == null || r();
  };
  return /* @__PURE__ */ l("form", { className: ka.form, "aria-label": e, onSubmit: o, "data-ward-form-stack": "", children: [
    /* @__PURE__ */ n("div", { className: ka.fields, children: a }),
    t == null ? null : /* @__PURE__ */ n("div", { className: ka.actions, role: "group", "aria-label": `${e} actions`, children: t })
  ] });
}
function Ik({ children: e, actions: a, label: t }) {
  return /* @__PURE__ */ l("section", { className: de.band, "aria-label": t, "data-ward-section-band": "", children: [
    /* @__PURE__ */ n("div", { className: de.bandBody, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: de.bandActions, children: a })
  ] });
}
const qc = "(max-width: 767.98px)";
function Aa({ label: e, children: a }) {
  return /* @__PURE__ */ n("div", { className: de.scroller, role: "region", "aria-label": e, tabIndex: 0, "data-ward-board-scroller": "", children: a });
}
function Ic({ lanes: e, label: a, laneLabel: t }) {
  const [r, o] = g(null), i = e.find((s) => s.id === r) ?? e[0], c = e.map((s) => ({ value: s.id, label: `${s.label} · ${s.count}` }));
  return /* @__PURE__ */ l("div", { className: de.lanes, "data-ward-board-lanes": "", children: [
    /* @__PURE__ */ n(A, { kind: "select", label: t, value: (i == null ? void 0 : i.id) ?? "", options: c, onChange: o }),
    /* @__PURE__ */ n(Aa, { label: a, children: i == null ? void 0 : i.content })
  ] });
}
function Mk({ children: e, label: a = "Workflow board", lanes: t, laneLabel: r = "Column" }) {
  const o = Nn(qc);
  return t === void 0 ? /* @__PURE__ */ n(Aa, { label: a, children: e }) : o ? /* @__PURE__ */ n(Ic, { lanes: t, label: a, laneLabel: r }) : /* @__PURE__ */ n(Aa, { label: a, children: t.map((i) => /* @__PURE__ */ n(ct, { children: i.content }, i.id)) });
}
const Mc = "_block_1o5o7_2", Bc = "_sentence_1o5o7_15", Pc = "_meta_1o5o7_20", Dc = "_action_1o5o7_25", Oc = "_strip_1o5o7_29", Hc = "_loading_1o5o7_48", Fc = "_label_1o5o7_56", jc = "_counter_1o5o7_63", he = {
  block: Mc,
  sentence: Bc,
  meta: Pc,
  action: Dc,
  strip: Oc,
  loading: Hc,
  label: Fc,
  counter: jc
};
function Wc({ action: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: he.action, children: /* @__PURE__ */ n(v, { onClick: e.onClick, children: e.label }) });
}
function pa({ sentence: e, action: a, children: t, role: r = "status", tone: o }) {
  return /* @__PURE__ */ l("div", { className: `${he.block} ward-state`, role: r, "data-tone": o, children: [
    /* @__PURE__ */ n("p", { className: he.sentence, children: e }),
    t,
    /* @__PURE__ */ n(Wc, { action: a })
  ] });
}
function zc(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Bk({ sentence: e, total: a, action: t }) {
  return /* @__PURE__ */ n(pa, { sentence: e, action: t, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "0 of ",
    a,
    " match the filter"
  ] }) });
}
function Pk(e) {
  return /* @__PURE__ */ n(pa, { ...e });
}
function Dk({ sentence: e, at: a, onRetry: t }) {
  return /* @__PURE__ */ n(pa, { role: "alert", tone: "failed", sentence: e, action: { label: "Retry", onClick: t }, children: /* @__PURE__ */ l("p", { className: he.meta, children: [
    "failed at ",
    re(a)
  ] }) });
}
function Ok({ lastReachableAt: e, snapshotAt: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "status", "data-tone": "warn", children: [
    "Live data stopped ",
    re(e),
    " — showing snapshot from ",
    re(a)
  ] });
}
function Hk({ queued: e, since: a }) {
  return /* @__PURE__ */ l("div", { className: he.strip, role: "alert", "data-tone": "failed", children: [
    "Writes unavailable — ",
    e,
    " requests queued since ",
    re(a)
  ] });
}
function Fk({ label: e, startedAt: a }) {
  const t = N(a ?? (/* @__PURE__ */ new Date()).toISOString()), [r, o] = g(!1);
  E(() => {
    const c = window.setTimeout(() => o(!0), ue.load);
    return () => window.clearTimeout(c);
  }, []);
  const i = Da(t.current, r);
  return /* @__PURE__ */ l("div", { className: `${he.loading} ward-state`, "aria-busy": "true", role: "status", children: [
    /* @__PURE__ */ n("span", { className: he.label, children: e }),
    r ? /* @__PURE__ */ n("span", { className: he.counter, children: Pa(i) }) : null
  ] });
}
const Gc = "_note_tlubt_2", Kc = {
  note: Gc
};
function Uc({ label: e, count: a, cap: t }) {
  return /* @__PURE__ */ l("p", { className: Kc.note, role: "status", children: [
    e,
    " is over cap now — ",
    a,
    " items against ",
    t
  ] });
}
const Vc = "_card_12in3_2", Yc = "_hit_12in3_23", Jc = "_head_12in3_30", Xc = "_title_12in3_36", Qc = "_meta_12in3_44", Zc = "_fields_12in3_45", es = "_who_12in3_58", as = "_sep_12in3_65", ns = "_mono_12in3_69", ts = "_field_12in3_45", rs = "_last_12in3_84", ls = "_reason_12in3_96", U = {
  card: Vc,
  hit: Yc,
  head: Jc,
  title: Xc,
  meta: Qc,
  fields: Zc,
  who: es,
  sep: as,
  mono: ns,
  field: ts,
  last: rs,
  reason: ls
}, os = {
  "run.step": "blue",
  "run.finding": "orange",
  "run.finished": "green"
};
function is(e, a, t) {
  const r = aa(e, "blue"), o = aa(e, "orange"), i = aa(e, "green"), c = N(/* @__PURE__ */ new Set());
  E(() => {
    if (!t) return;
    const s = { blue: r, orange: o, green: i };
    return t.subscribe(a, (u) => {
      if (c.current.has(u.id)) return;
      c.current.add(u.id);
      const d = os[u.type];
      d && s[d]();
    });
  }, [r, t, i, a, o]);
}
const cs = {
  key: (e) => e.key,
  lastAgentAction: (e) => e.lastAgentAction ?? "",
  cost: (e) => e.cost === void 0 ? "" : Q(e.cost),
  jiraLink: (e) => e.jiraKey ?? ""
};
function ss(e, a) {
  return cs[a](e);
}
function ds({ item: e, connection: a }) {
  const t = /* @__PURE__ */ n("span", { className: U.sep, "aria-hidden": "true", children: "·" });
  return e.run ? /* @__PURE__ */ l("p", { className: U.meta, children: [
    /* @__PURE__ */ l("span", { className: U.who, children: [
      "waits on ",
      e.run.agent
    ] }),
    t,
    /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: a, turn: e.run.turn, lastEvent: e.run.lastStep })
  ] }) : /* @__PURE__ */ l("p", { className: U.meta, children: [
    /* @__PURE__ */ l("span", { className: U.who, children: [
      "waits on ",
      e.waitsOn
    ] }),
    t,
    /* @__PURE__ */ l("span", { className: U.mono, children: [
      te(e.timeInStage),
      " in stage"
    ] })
  ] });
}
function us({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: U.head, children: [
    e.flagged && /* @__PURE__ */ n(m, { role: "drift", label: "DRIFT FLAG" }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function hs({ reason: e }) {
  return e ? /* @__PURE__ */ l("p", { className: U.reason, children: [
    "Blocked: ",
    e
  ] }) : null;
}
function ms({ item: e, fields: a }) {
  return a.length === 0 ? null : /* @__PURE__ */ n("p", { className: U.fields, children: a.map((t) => /* @__PURE__ */ n("span", { className: U.field, children: ss(e, t) }, t)) });
}
const Ea = (e) => e ? !0 : void 0;
function ws(e) {
  return { "--stream": Ce(e.streamStep, "id") };
}
function _s(e, a, t) {
  e == null || e(a, t);
}
function vs(e) {
  return (e == null ? void 0 : e.connection) ?? "live";
}
function fs({ item: e, stale: a }) {
  var r, o;
  const t = ((o = (r = e.run) == null ? void 0 : r.lastStep) == null ? void 0 : o.label) ?? e.finding;
  return t ? /* @__PURE__ */ n("p", { className: U.last, "data-stale": Ea(a), children: t }) : null;
}
function ga(e) {
  const a = e.fields ?? [], t = e.item, r = N(null);
  is(r, t.key, e.feed);
  const o = vs(e.feed), i = ws(t);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: r,
      role: e.inList ? "listitem" : void 0,
      "data-ward-card": t.key,
      className: U.card,
      style: i,
      "data-selected": Ea(e.selected),
      "data-flagged": Ea(t.flagged),
      children: [
        /* @__PURE__ */ n("button", { type: "button", className: U.hit, onClick: (c) => _s(e.onOpen, t.key, c.currentTarget), ...e.rovingProps, children: /* @__PURE__ */ l("span", { className: "ward-visually-hidden", children: [
          t.key,
          " ",
          t.title
        ] }) }),
        /* @__PURE__ */ n(us, { item: t }),
        /* @__PURE__ */ n("p", { className: U.title, children: t.title }),
        /* @__PURE__ */ n(ds, { item: t, connection: o }),
        /* @__PURE__ */ n(hs, { reason: t.blockedReason }),
        /* @__PURE__ */ n(ms, { item: t, fields: a }),
        /* @__PURE__ */ n(fs, { item: t, stale: o === "stale" })
      ]
    }
  );
}
const bs = "_column_14784_3", ps = "_head_14784_24", gs = "_label_14784_33", Ns = "_count_14784_42", ys = "_list_14784_56", Ke = {
  column: bs,
  head: ps,
  label: gs,
  count: Ns,
  list: ys
};
function Cn(e, a) {
  return [...e].sort((t, r) => a === "oldest" ? r.timeInStage - t.timeInStage : t.timeInStage - r.timeInStage);
}
function ks({ column: e, count: a, id: t }) {
  return /* @__PURE__ */ l("div", { className: Ke.head, children: [
    /* @__PURE__ */ n("h2", { className: Ke.label, id: t, title: e.label, children: e.label }),
    e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
    /* @__PURE__ */ l("span", { className: Ke.count, children: [
      a,
      e.cap === void 0 ? null : ` / ${e.cap}`
    ] })
  ] });
}
function $s(e) {
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
function Cs({ column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, onKeyDown: u }) {
  const d = k(), h = e.cap !== void 0 && a.length > e.cap, _ = Cn(a, r);
  return /* @__PURE__ */ l("section", { className: Ke.column, "aria-labelledby": d, "data-gate": e.gate ? !0 : void 0, "data-overcap": h ? !0 : void 0, onKeyDown: u, children: [
    /* @__PURE__ */ n(ks, { column: e, count: a.length, id: d }),
    /* @__PURE__ */ n($s, { column: e, items: a, fields: t, sort: r, onOpen: o, selectedKey: i, feed: c, roving: s, rows: _ }),
    h && /* @__PURE__ */ n(Uc, { label: e.label, count: a.length, cap: e.cap })
  ] });
}
const Ss = "_foot_8qg4p_2", Rs = "_note_8qg4p_13", Ts = "_link_8qg4p_19", $a = {
  foot: Ss,
  note: Rs,
  link: Ts
};
function jk({ configureHref: e }) {
  return /* @__PURE__ */ l("footer", { className: $a.foot, "data-ward-board-footnote": "", children: [
    /* @__PURE__ */ n("p", { className: $a.note, children: "Columns, labels and caps come from this stream's board config. Personal filters aren't saved to it." }),
    e === void 0 ? null : /* @__PURE__ */ n("a", { className: $a.link, href: e, children: "Configure board" })
  ] });
}
const Ls = "_head_1la6p_3", xs = "_identity_1la6p_12", As = "_titleRow_1la6p_18", Es = "_title_1la6p_18", qs = "_key_1la6p_35", Is = "_rollup_1la6p_45", Ms = "_tools_1la6p_53", Bs = "_swatch_1la6p_62", Ps = "_mark_1la6p_69", ve = {
  head: Ls,
  identity: xs,
  titleRow: As,
  title: Es,
  key: qs,
  rollup: Is,
  tools: Ms,
  swatch: Bs,
  mark: Ps
}, rn = "initials:";
function Ds(e) {
  return e === void 0 ? "loaded this week unavailable" : `${ae(e)} loaded this week`;
}
function Os(e) {
  const a = [`${ae(e.inFlight)} in flight`, Ds(e.loadedThisWeek)];
  return e.agentsWorking !== void 0 && a.push(`${ae(e.agentsWorking)} agents working`), e.p50 !== void 0 && a.push(`P50 ${te(e.p50)}`), e.p90 !== void 0 && a.push(`P90 ${te(e.p90)}`), a.join(" · ");
}
function Hs(e) {
  return e.startsWith(rn) ? e.slice(rn.length).split(/[\s_-]+/).filter(Boolean).slice(0, 2).map((t) => t[0].toUpperCase()).join("") : "";
}
function Fs({ markRef: e, streamStep: a }) {
  const t = { "--stream": Ce(a, "id") };
  return e ? /* @__PURE__ */ n("span", { className: `${ve.mark} ward-stream-mark`, style: t, "data-mark-ref": e, "aria-hidden": "true", children: Hs(e) }) : /* @__PURE__ */ n("span", { className: ve.swatch, style: t, "data-ward-stream-swatch": "", "aria-hidden": "true" });
}
function js({ owners: e, owner: a, onOwnerChange: t }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: a ?? e[0].value, onChange: t, options: e });
}
function Wk({
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
        /* @__PURE__ */ n(Fs, { markRef: e.markRef, streamStep: e.streamStep }),
        /* @__PURE__ */ n("h1", { className: ve.title, children: e.name }),
        /* @__PURE__ */ n("span", { className: ve.key, children: e.key })
      ] }),
      /* @__PURE__ */ n("p", { className: ve.rollup, "aria-live": "polite", children: Os(a) })
    ] }),
    /* @__PURE__ */ l("div", { className: ve.tools, tabIndex: 0, role: "region", "aria-label": "Board header controls", children: [
      /* @__PURE__ */ n(js, { owners: o, owner: i, onOwnerChange: c }),
      s === void 0 ? null : /* @__PURE__ */ n(v, { onClick: s, children: "Configure board" }),
      u,
      /* @__PURE__ */ n(Fa, { connection: t, since: r ?? void 0 })
    ] })
  ] });
}
const Ws = "_head_kabyh_11", zs = "_line_kabyh_12", Gs = "_cHandle_kabyh_33", Ks = "_cName_kabyh_38", Us = "_nameLine_kabyh_46", Vs = "_cLabel_kabyh_53", Ys = "_cCap_kabyh_58", Js = "_cShown_kabyh_63", Xs = "_name_kabyh_46", Qs = "_noCap_kabyh_85", Zs = "_state_kabyh_99", ed = "_handle_kabyh_104", ad = "_sub_kabyh_118", I = {
  head: Ws,
  line: zs,
  cHandle: Gs,
  cName: Ks,
  nameLine: Us,
  cLabel: Vs,
  cCap: Ys,
  cShown: Js,
  name: Xs,
  noCap: Qs,
  state: Zs,
  handle: ed,
  sub: ad
}, nd = "can't be hidden or collapsed", td = "terminal · counted, not a column";
function zk() {
  return /* @__PURE__ */ l("div", { className: I.head, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: I.cHandle }),
    /* @__PURE__ */ n("span", { className: I.cName, children: "Stage" }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: "Column label" }),
    /* @__PURE__ */ n("span", { className: I.cCap, children: "WIP cap" }),
    /* @__PURE__ */ n("span", { className: I.cShown, children: "Shown" })
  ] });
}
function rd(e, a) {
  return e.gate ? { shown: !0, state: "locked" } : e.terminal ? { shown: !1, state: "off" } : { shown: a, state: a ? "on" : "off" };
}
function ld(e) {
  if (e !== 0)
    return e === 1 ? "1 agent mounted" : `${e} agents mounted`;
}
function ln(e) {
  return e.gate ? nd : e.terminal ? td : ld(e.agentsMounted);
}
function od(e, a) {
  e.key === "ArrowUp" && (a == null || a(-1)), e.key === "ArrowDown" && (a == null || a(1));
}
function id({ stage: e }) {
  return /* @__PURE__ */ l("span", { className: I.cName, children: [
    /* @__PURE__ */ l("span", { className: I.nameLine, children: [
      /* @__PURE__ */ n("span", { className: I.name, children: e.name }),
      e.gate && /* @__PURE__ */ n(m, { role: "gate", label: "HUMAN GATE", size: "tag" })
    ] }),
    ln(e) && /* @__PURE__ */ n("span", { className: I.sub, children: ln(e) })
  ] });
}
function cd(e) {
  return e === void 0 ? "" : String(e);
}
function sd(e) {
  return e === "" ? void 0 : Number(e);
}
function dd({ name: e, onReorder: a }) {
  return /* @__PURE__ */ n("span", { className: I.cHandle, children: /* @__PURE__ */ n(
    "button",
    {
      type: "button",
      className: I.handle,
      "aria-label": `Reorder ${e}`,
      onKeyDown: (t) => od(t, a),
      children: "⠿"
    }
  ) });
}
function ud({ stage: e, config: a, onChange: t }) {
  return e.terminal ? /* @__PURE__ */ n("span", { className: `${I.cCap} ${I.noCap}`, "aria-hidden": "true", children: "—" }) : /* @__PURE__ */ n("span", { className: I.cCap, children: /* @__PURE__ */ n(A, { kind: "input", label: "WIP cap", labelHidden: !0, placeholder: "none", value: cd(a.cap), onChange: (r) => t({ ...a, cap: sd(r) }) }) });
}
function hd({ stage: e, config: a, onChange: t }) {
  const r = rd(e, a.shown);
  return /* @__PURE__ */ l("span", { className: I.cShown, children: [
    /* @__PURE__ */ n(qe, { label: "Shown as a column", labelHidden: !0, checked: r.shown, locked: e.gate, disabled: e.terminal, onChange: (o) => t({ ...a, shown: o }) }),
    /* @__PURE__ */ n("span", { className: I.state, "aria-hidden": "true", children: r.state })
  ] });
}
function md(e) {
  return e.gate ? "gate" : e.terminal ? "terminal" : void 0;
}
function Gk({ stage: e, config: a, onChange: t, onReorder: r }) {
  return /* @__PURE__ */ l("div", { className: I.line, "data-kind": md(e), children: [
    /* @__PURE__ */ n(dd, { name: e.name, onReorder: r }),
    /* @__PURE__ */ n(id, { stage: e }),
    /* @__PURE__ */ n("span", { className: I.cLabel, children: /* @__PURE__ */ n(A, { kind: "input", label: "Column label", labelHidden: !0, value: a.label, onChange: (o) => t({ ...a, label: o }) }) }),
    /* @__PURE__ */ n(ud, { stage: e, config: a, onChange: t }),
    /* @__PURE__ */ n(hd, { stage: e, config: a, onChange: t })
  ] });
}
const wd = "_body_hn6d6_2", _d = "_head_hn6d6_9", vd = "_summary_hn6d6_19", fd = "_block_hn6d6_20", bd = "_actionsBlock_hn6d6_21", pd = "_title_hn6d6_41", gd = "_note_hn6d6_46", Nd = "_k_hn6d6_51", yd = "_kv_hn6d6_58", kd = "_row_hn6d6_64", $d = "_label_hn6d6_75", Cd = "_value_hn6d6_84", Sd = "_quote_hn6d6_90", Rd = "_actions_hn6d6_21", Td = "_resolve_hn6d6_103", M = {
  body: wd,
  head: _d,
  summary: vd,
  block: fd,
  actionsBlock: bd,
  title: pd,
  note: gd,
  k: Nd,
  kv: yd,
  row: kd,
  label: $d,
  value: Cd,
  quote: Sd,
  actions: Rd,
  resolve: Td
};
function Ld(e) {
  return e.blockedReason ? [["Blocked", e.blockedReason]] : [];
}
function xd(e, a) {
  if (!e.run) return [];
  const t = (a == null ? void 0 : a.connection) ?? "live";
  return [["Running", /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: t, turn: e.run.turn, lastEvent: e.run.lastStep }, "l")]];
}
function Ad(e) {
  const a = va(e);
  return a === null ? "NO COLOUR" : `STEP ${a}`;
}
function Ed(e, a) {
  return [
    ["Stream", e.streamName ?? /* @__PURE__ */ n(m, { ...fa(Ad(e.streamStep), e.streamStep) }, "s")],
    ["Workflow", e.workflow],
    ["State", e.stateLabel],
    ["Time in stage", te(e.timeInStage)],
    ["Waits on", e.run ? e.run.agent : e.waitsOn],
    ...Ld(e),
    ...xd(e, a)
  ];
}
function qd({ resolve: e, label: a }) {
  return e == null ? null : /* @__PURE__ */ l("section", { className: M.resolve, "aria-label": a, children: [
    /* @__PURE__ */ n("h3", { className: M.k, children: a }),
    e
  ] });
}
function Id({ item: e }) {
  const a = e.run ? { role: "running", label: "AGENT WORKING" } : e.state;
  return /* @__PURE__ */ l("div", { className: M.head, children: [
    /* @__PURE__ */ n(m, { role: "meta", label: e.key }),
    a && /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function Md({ item: e }) {
  return e.agentSentence ? /* @__PURE__ */ l("div", { className: M.block, children: [
    /* @__PURE__ */ n("p", { className: M.k, children: "What the agent says" }),
    /* @__PURE__ */ n("p", { className: M.quote, children: e.agentSentence }),
    e.agentMeta && /* @__PURE__ */ n("p", { className: M.note, children: e.agentMeta })
  ] }) : null;
}
function Kk({ item: e, actions: a, onClose: t, returnFocusTo: r, feed: o, resolve: i, resolveLabel: c, actionsNote: s }) {
  const u = k(), d = Ed(e, o);
  return /* @__PURE__ */ n(Je, { kind: "drawer", labelledBy: u, onClose: t, returnFocusTo: r, flush: !0, children: /* @__PURE__ */ l("div", { className: M.body, children: [
    /* @__PURE__ */ n(Id, { item: e }),
    /* @__PURE__ */ l("div", { className: M.summary, children: [
      /* @__PURE__ */ n("h2", { className: M.title, id: u, children: e.title }),
      e.summary && /* @__PURE__ */ n("p", { className: M.note, children: e.summary })
    ] }),
    /* @__PURE__ */ n("dl", { className: M.kv, children: d.map(([h, _]) => /* @__PURE__ */ l("div", { className: M.row, children: [
      /* @__PURE__ */ n("dt", { className: M.label, children: h }),
      /* @__PURE__ */ n("dd", { className: M.value, children: _ })
    ] }, h)) }),
    /* @__PURE__ */ n(Md, { item: e }),
    /* @__PURE__ */ l("div", { className: M.actionsBlock, children: [
      /* @__PURE__ */ n("div", { className: M.actions, children: a }),
      s && /* @__PURE__ */ n("p", { className: M.note, children: s })
    ] }),
    /* @__PURE__ */ n(qd, { resolve: i, label: c ?? "Ways out of this hold" })
  ] }) });
}
const Bd = "_root_3azmy_2", Pd = "_list_3azmy_7", Dd = "_item_3azmy_12", Od = "_box_3azmy_18", Hd = "_text_3azmy_23", Fd = "_note_3azmy_28", Pe = {
  root: Bd,
  list: Pd,
  item: Dd,
  box: Od,
  text: Hd,
  note: Fd
};
function Na({ items: e, note: a, density: t }) {
  return /* @__PURE__ */ l("div", { className: Pe.root, "data-density": t, children: [
    /* @__PURE__ */ n("ul", { className: `${Pe.list} ward-checklist`, children: e.map((r) => /* @__PURE__ */ l("li", { className: `${Pe.item} ward-checklist-item`, "data-met": r.met, children: [
      /* @__PURE__ */ n("span", { role: "checkbox", "aria-checked": r.met, "aria-disabled": "true", "aria-label": r.text, className: Pe.box, children: /* @__PURE__ */ n(Ha, { state: r.met ? "met" : "unmet" }) }),
      /* @__PURE__ */ n("span", { className: Pe.text, children: r.text })
    ] }, r.text)) }),
    a !== void 0 && /* @__PURE__ */ n("p", { className: `${Pe.note} ward-checklist-note`, children: a })
  ] });
}
const jd = "_rail_ke7ch_2", Wd = "_k_ke7ch_11", zd = "_head_ke7ch_19", Gd = "_section_ke7ch_25", Kd = "_card_ke7ch_38", Ud = "_strip_ke7ch_42", Vd = "_skeleton_ke7ch_56", Yd = "_skeletonLabel_ke7ch_70", Jd = "_bar_ke7ch_76", Xd = "_note_ke7ch_85", se = {
  rail: jd,
  k: Wd,
  head: zd,
  section: Gd,
  card: Kd,
  strip: Ud,
  skeleton: Vd,
  skeletonLabel: Yd,
  bar: Jd,
  note: Xd
};
function Qd(e) {
  return (a) => e == null ? void 0 : e(a);
}
function Ca({ title: e, children: a }) {
  return /* @__PURE__ */ l("section", { className: se.section, "aria-label": e, children: [
    /* @__PURE__ */ n("h3", { className: se.k, children: e }),
    a
  ] });
}
function Zd({ column: e, count: a }) {
  return /* @__PURE__ */ l("div", { className: se.skeleton, "data-kind": e.gate ? "gate" : void 0, children: [
    /* @__PURE__ */ n("span", { className: se.skeletonLabel, children: e.label }),
    /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: `${a} ${a === 1 ? "item" : "items"}` }),
    Array.from({ length: a }, (t, r) => /* @__PURE__ */ n("span", { className: se.bar, "aria-hidden": "true" }, r))
  ] });
}
function eu({ draft: e, sample: a, open: t, feed: r }) {
  return e.columns.map((o) => /* @__PURE__ */ n(Cs, { column: o, items: a.filter((i) => i.stage === o.id), fields: e.fields, sort: e.sort, onOpen: t, feed: r }, o.id));
}
function au(e) {
  return e.strip !== "skeleton" ? /* @__PURE__ */ n(eu, { draft: e.draft, sample: e.sample, open: e.open, feed: e.feed }) : e.draft.columns.map((a) => /* @__PURE__ */ n(Zd, { column: a, count: e.sample.filter((t) => t.stage === a.id).length }, a.id));
}
function Uk(e) {
  const a = Qd(e.onOpen), t = Cn(e.sample, e.draft.sort)[0];
  return /* @__PURE__ */ l("aside", { className: se.rail, "aria-label": "Preview", children: [
    /* @__PURE__ */ n("h2", { className: `${se.k} ${se.head}`, children: "Live preview" }),
    /* @__PURE__ */ n(Ca, { title: "Card", children: /* @__PURE__ */ n("div", { className: se.card, children: t && /* @__PURE__ */ n(ga, { item: t, fields: e.draft.fields, onOpen: a, feed: e.feed }) }) }),
    /* @__PURE__ */ l(Ca, { title: `Columns · ${e.draft.columns.length} shown`, children: [
      /* @__PURE__ */ n("div", { className: se.strip, role: "group", "aria-label": "Column preview", tabIndex: 0, "data-strip": e.strip ?? "cards", children: /* @__PURE__ */ n(au, { ...e, open: a }) }),
      e.columnsNote === void 0 ? null : /* @__PURE__ */ n("p", { className: se.note, children: e.columnsNote })
    ] }),
    /* @__PURE__ */ n(Ca, { title: "Effect of this config", children: /* @__PURE__ */ n(Na, { items: e.effects, density: "compact" }) })
  ] });
}
function nu(e, a) {
  return (t) => {
    e.current = t, a(t);
  };
}
function tu(e) {
  return Math.ceil(e.length / 2);
}
function ru(e) {
  return e === "run.finding" ? "orange" : e === "run.finished" ? "green" : "blue";
}
function Sn(e) {
  return e.step === void 0 ? void 0 : e.step.label;
}
function lu(e, a, t, r) {
  if (a.current.has(e.id)) return;
  a.current.add(e.id);
  const o = Sn(e);
  o !== void 0 && t(o), r(ru(e.type));
}
function ou(e, a, t, r, o) {
  E(() => {
    if (e !== null)
      return e.subscribe(a, (i) => lu(i, t, r, o));
  }, [e, a, t, r, o]);
}
function iu(e) {
  return e.run === void 0 ? void 0 : e.run.lastStep;
}
function cu(e, a) {
  return a ? { role: "running", label: "AGENT WORKING" } : e.state ?? { role: "pending", label: e.key };
}
function su(e, a) {
  return a !== void 0 ? te(e.timeInStage) + " · waits on " + a.agent : te(e.timeInStage) + " · waiting on " + e.waitsOn;
}
function du(e, a) {
  return {
    "--stream": `var(--ward-stream-${e.streamStep}-chip)`,
    minHeight: "calc(" + j.height.card + " + " + j.height.cardRow + " * " + String(tu(a ?? [])) + ")"
  };
}
function uu(e, a) {
  return /* @__PURE__ */ n("span", { className: (a ?? []).includes("key") ? "ward-workcard-meta" : "ward-visually-hidden", children: e.key });
}
function hu(e, a) {
  return e.cost !== void 0 && (a ?? []).includes("cost") ? /* @__PURE__ */ n(m, { role: "meta", label: Q(e.cost) }) : null;
}
function mu(e, a) {
  return e.jiraKey !== void 0 && (a ?? []).includes("jiraLink") ? /* @__PURE__ */ n(m, { role: "meta", label: e.jiraKey }) : null;
}
function wu(e, a, t, r) {
  return e === void 0 ? null : /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: r }, connection: t ?? "live", turn: e.turn });
}
function _u(e, a, t) {
  return a === void 0 ? e.finding ?? "" : t ?? "";
}
function vu(e, a) {
  return a === void 0 ? e : nu(e, a.ref);
}
function fu(e) {
  return e.rovingItem ?? { tabIndex: e.tabIndex ?? 0 };
}
function Ve(e) {
  return e === !0 ? "true" : void 0;
}
function Rn(e) {
  const a = e.item, t = a.run, r = t !== void 0, o = N(null), i = aa(o), c = N(/* @__PURE__ */ new Set()), [s, u] = g(iu(a));
  ou(e.feed, a.key, c, u, i);
  const d = cu(a, r), h = su(a, t), _ = du(a, e.fields), b = _u(a, t, s);
  return /* @__PURE__ */ n("li", { role: "listitem", style: { listStyle: "none" }, children: /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      ...fu(e),
      className: "ward-workcard",
      "data-flagged": Ve(a.flagged),
      "data-selected": Ve(e.selected),
      style: _,
      ref: vu(o, e.rovingItem),
      onClick: () => e.onOpen(a.key),
      children: [
        uu(a, e.fields),
        /* @__PURE__ */ n("span", { className: "ward-workcard-title ward-truncate", title: a.title, children: a.title }),
        a.flagged === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: "drift flag" }) : null,
        /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
          /* @__PURE__ */ n(m, { role: d.role, label: d.label }),
          hu(a, e.fields),
          mu(a, e.fields)
        ] }),
        /* @__PURE__ */ n("span", { className: "ward-workcard-meta ward-truncate", title: h, children: h }),
        /* @__PURE__ */ l("span", { className: "ward-workcard-lastrow", children: [
          wu(t, s, e.connection, a.changedAt),
          b !== "" ? /* @__PURE__ */ n("span", { className: "ward-truncate", title: b, children: b }) : null
        ] })
      ]
    }
  ) });
}
function bu({ count: e, cap: a }) {
  return /* @__PURE__ */ n("p", { className: "ward-overcap", role: "status", children: String(e) + " items in a column capped at " + String(a) + " — move " + String(e - a) + " out or raise the cap" });
}
function pu(e) {
  return e.column.cap !== void 0 && e.items.length > e.column.cap;
}
function gu(e, a, t) {
  return /* @__PURE__ */ l("div", { className: "ward-boardcol-head", children: [
    /* @__PURE__ */ n("span", { id: t, className: "ward-boardcol-label", title: e.label, children: e.label }),
    /* @__PURE__ */ l("span", { className: "ward-chiprow", children: [
      e.gate === !0 ? /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }) : null,
      /* @__PURE__ */ n(m, { role: "meta", label: String(a) })
    ] })
  ] });
}
function Nu(e, a) {
  return !a || e.column.cap === void 0 ? null : /* @__PURE__ */ n(bu, { count: e.items.length, cap: e.column.cap });
}
function yu(e, a) {
  return e.roving ?? a;
}
function ku(e, a) {
  return e.roving === void 0 ? a.containerProps : {};
}
function $u(e, a) {
  return e.items.map((t, r) => /* @__PURE__ */ n(
    Rn,
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
function Cu(e) {
  const a = k(), t = ma({ orientation: "vertical" }), r = yu(e, t), o = pu(e);
  return /* @__PURE__ */ l("section", { className: "ward-boardcol", "aria-labelledby": a, "data-overcap": Ve(o), "data-gate": Ve(e.column.gate), children: [
    gu(e.column, e.items.length, a),
    Nu(e, o),
    /* @__PURE__ */ n("ul", { role: "list", className: "ward-boardcol-list", ...ku(e, t), children: $u(e, r) })
  ] });
}
function Su(e) {
  let a = "in flight " + String(e.inFlight) + " · loaded this week " + String(e.loadedThisWeek) + " · agents working " + String(e.agentsWorking);
  return e.p50 !== void 0 && (a += " · p50 " + te(e.p50)), e.p90 !== void 0 && (a += " · p90 " + te(e.p90)), a;
}
function Ru(e) {
  return e.owners === void 0 || e.owners.length === 0 ? null : /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: e.owner ?? e.owners[0], options: e.owners.map((a) => ({ value: a, label: a })), onChange: e.onOwnerChange });
}
function Tu(e) {
  return e === void 0 ? null : /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", label: "Configure board", onClick: e });
}
function Vk(e) {
  return /* @__PURE__ */ l("header", { className: "ward-boardheader", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
        /* @__PURE__ */ n(m, { role: "stream", label: e.stream.name, streamStep: e.stream.streamStep }),
        /* @__PURE__ */ n(m, { role: "meta", label: e.stream.key })
      ] }),
      /* @__PURE__ */ n("div", { className: "ward-rollup", "aria-live": "polite", children: Su(e.rollups) })
    ] }),
    /* @__PURE__ */ l("div", { className: "ward-chiprow", children: [
      Ru(e),
      Tu(e.onConfigure),
      /* @__PURE__ */ n(Fa, { connection: e.connection, lastEventAt: e.lastEventAt })
    ] })
  ] });
}
function Lu(e) {
  return e.gate === !0 || e.terminal === !0 || (e.agentsMounted ?? 0) > 0;
}
function xu(e) {
  return e.stage.gate === !0 ? /* @__PURE__ */ n(qe, { label: e.stage.name + " gate", checked: !0, onChange: void 0, locked: !0 }) : /* @__PURE__ */ n(qe, { label: e.stage.terminal === !0 ? "terminal stage" : e.stage.name, checked: e.config.shown, onChange: (a) => e.onChange({ ...e.config, shown: a }) });
}
function Au(e) {
  const a = e.agentsMounted ?? 0;
  return /* @__PURE__ */ l(x, { children: [
    a > 0 ? /* @__PURE__ */ n(m, { role: "running", label: String(a) + " AGENTS" }) : null,
    e.terminal === !0 ? /* @__PURE__ */ n(m, { role: "soft", label: "TERMINAL" }) : null
  ] });
}
function Yk(e) {
  const a = e.stage;
  return /* @__PURE__ */ l("div", { className: "ward-configrow", "data-mandatory": Ve(Lu(a)), children: [
    /* @__PURE__ */ n("span", { className: "ward-configrow-handle", "aria-hidden": "true", children: "⠿" }),
    /* @__PURE__ */ n("span", { className: "ward-truncate", title: e.config.label, children: e.config.label }),
    /* @__PURE__ */ n("span", { children: xu(e) }),
    /* @__PURE__ */ n(A, { kind: "input", label: "Cap", mono: !0, value: e.config.cap ?? "", disabled: a.gate === !0, onChange: (t) => e.onChange({ ...e.config, cap: t }) }),
    /* @__PURE__ */ n(pn, { label: "Shown on cards", checked: e.config.shown, disabled: !0, locked: !0 }),
    Au(a),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " up", disabled: e.onMoveUp === void 0, onClick: e.onMoveUp, children: "↑" }),
    /* @__PURE__ */ n("button", { type: "button", className: "ward-configrow-handle", "aria-label": "Move " + a.name + " down", disabled: e.onMoveDown === void 0, onClick: e.onMoveDown, children: "↓" })
  ] });
}
function Jk(e) {
  const a = e.sample[0];
  return /* @__PURE__ */ l("aside", { "aria-label": "Preview", className: "ward-previewrail", children: [
    a !== void 0 ? /* @__PURE__ */ n(Rn, { item: a, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null }) : null,
    /* @__PURE__ */ n(Cu, { column: { id: "preview", label: e.columnLabel, cap: e.cap, gate: e.gate }, items: e.sample, fields: e.fields, onOpen: (t) => {
      var r;
      return (r = e.onOpen) == null ? void 0 : r.call(e, t);
    }, feed: null, selectedKey: null }),
    /* @__PURE__ */ n("ul", { style: { margin: 0, padding: 0, listStyle: "none" }, children: e.effects.map((t) => /* @__PURE__ */ l("li", { className: "ward-effect", children: [
      /* @__PURE__ */ n("span", { className: t.met ? "ward-marker ward-marker--tick" : "ward-marker ward-marker--hollow", role: "img", "aria-label": t.met ? "met" : "unmet" }),
      /* @__PURE__ */ n("span", { children: t.text })
    ] }, t.text)) })
  ] });
}
function Eu(e, a) {
  const t = Sn(e);
  t !== void 0 && a(t);
}
function qu(e, a, t) {
  E(() => {
    if (e != null)
      return e.subscribe(a, (r) => Eu(r, t));
  }, [e, a, t]);
}
function Iu(e) {
  const a = [["key", e.key]];
  return e.stream !== void 0 && a.push(["stream", e.stream.name]), e.workflow !== void 0 && a.push(["workflow", e.workflow]), e.state !== void 0 && a.push(["state", e.state.label]), a;
}
function Mu(e) {
  const a = [];
  return e.timeInStage !== void 0 && a.push(["time in stage", te(e.timeInStage)]), e.waitsOn !== void 0 && a.push(["waits on", e.waitsOn]), e.cost !== void 0 && a.push(["cost", Q(e.cost)]), a;
}
function Bu(e, a) {
  return e === void 0 ? null : /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: /* @__PURE__ */ n(ge, { startedAt: e.startedAt, lastEvent: a === void 0 ? void 0 : { label: a, at: e.startedAt }, connection: "live", turn: e.turn }) });
}
function Pu(e, a) {
  return /* @__PURE__ */ l(x, { children: [
    e.state !== void 0 ? /* @__PURE__ */ n(m, { role: e.state.role, label: e.state.label }) : null,
    e.agentSay !== void 0 ? /* @__PURE__ */ n("blockquote", { className: "ward-agentsay", children: e.agentSay }) : null,
    a !== void 0 && a.length > 0 ? /* @__PURE__ */ n("div", { className: "ward-drawer-actions", children: a }) : null
  ] });
}
function Xk(e) {
  var c;
  const a = e.item, t = a.run, [r, o] = g((c = a.run) == null ? void 0 : c.lastStep);
  qu(e.feed, a.key, o);
  const i = [...Iu(a), ...Mu(a)];
  return /* @__PURE__ */ l(Je, { kind: "drawer", title: a.title, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ l("dl", { className: "ward-kv", children: [
      i.map((s) => /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("dt", { children: s[0] }),
        /* @__PURE__ */ n("dd", { className: "ward-truncate", title: String(s[1]), children: s[1] })
      ] }, s[0])),
      Bu(t, r)
    ] }),
    Pu(a, e.actions)
  ] });
}
const Du = "_card_hvxp7_2", Ou = "_head_hvxp7_17", Hu = "_mark_hvxp7_25", Fu = "_name_hvxp7_37", ju = "_chips_hvxp7_48", Wu = "_description_hvxp7_54", zu = "_run_hvxp7_59", Gu = "_sep_hvxp7_68", Ku = "_facts_hvxp7_73", Uu = "_fact_hvxp7_73", Vu = "_factLabel_hvxp7_86", Yu = "_factValue_hvxp7_90", ee = {
  card: Du,
  head: Ou,
  mark: Hu,
  name: Fu,
  chips: ju,
  description: Wu,
  run: zu,
  sep: Gu,
  facts: Ku,
  fact: Uu,
  factLabel: Vu,
  factValue: Yu
}, Ju = { live: "done", draft: "running", paused: "meta" };
function Xu(e) {
  return e === void 0 ? ee.card : `${ee.card} ${e}`;
}
function Qu({ versions: e }) {
  return /* @__PURE__ */ n("div", { className: ee.chips, children: e.map((a) => /* @__PURE__ */ n(m, { role: Ju[a.status], size: "tag", label: a.label ?? `${a.v} ${a.status.toUpperCase()}` }, a.v)) });
}
function Zu({ description: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("p", { className: ee.description, children: e });
}
function eh({ run: e, connection: a, lastEvent: t }) {
  return e === void 0 ? null : /* @__PURE__ */ l("p", { className: ee.run, children: [
    "working on ",
    e.itemKey,
    /* @__PURE__ */ n("span", { className: ee.sep, "aria-hidden": "true", children: "·" }),
    /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: a ?? "live", lastEvent: t, turn: e.turn })
  ] });
}
function ah({ facts: e }) {
  return e === void 0 || e.length === 0 ? null : /* @__PURE__ */ n("dl", { className: ee.facts, children: e.map((a) => /* @__PURE__ */ l("div", { className: ee.fact, children: [
    /* @__PURE__ */ n("dt", { className: ee.factLabel, children: a.label }),
    /* @__PURE__ */ n("dd", { className: ee.factValue, children: a.value })
  ] }, a.label)) });
}
function nh(e) {
  return e.length > 0 && e.every((a) => a.status === "paused") ? !0 : void 0;
}
function th({ agent: e, href: a, selected: t, connection: r = "live", lastEvent: o, facts: i, className: c }) {
  const s = { "--stream": Ce(e.streamStep, "id") }, u = t ? "true" : void 0;
  return /* @__PURE__ */ l(
    "article",
    {
      "aria-current": u,
      className: Xu(c),
      style: s,
      "data-selected": u,
      "data-paused": nh(e.versions),
      children: [
        /* @__PURE__ */ l("h3", { className: ee.head, children: [
          /* @__PURE__ */ n("span", { className: ee.mark, "aria-hidden": "true" }),
          /* @__PURE__ */ n("a", { className: `${ee.name} ward-rowlink`, href: a, "aria-current": u, children: e.name })
        ] }),
        /* @__PURE__ */ n(Zu, { description: e.description }),
        /* @__PURE__ */ n(eh, { run: e.run, connection: r, lastEvent: o }),
        /* @__PURE__ */ n(Qu, { versions: e.versions }),
        /* @__PURE__ */ n(ah, { facts: i })
      ]
    }
  );
}
const rh = "_list_4dcyc_2", lh = "_row_4dcyc_11", oh = "_head_4dcyc_23", ih = "_id_4dcyc_30", ch = "_lock_4dcyc_35", sh = "_reason_4dcyc_41", dh = "_remove_4dcyc_46", uh = "_clauses_4dcyc_50", hh = "_clause_4dcyc_50", mh = "_label_4dcyc_64", wh = "_cell_4dcyc_71", _h = "_value_4dcyc_76", ne = {
  list: rh,
  row: lh,
  head: oh,
  id: ih,
  lock: ch,
  reason: sh,
  remove: dh,
  clauses: uh,
  clause: hh,
  label: mh,
  cell: wh,
  value: _h
}, Tn = ze(!1);
function Qk({ children: e, label: a = "Rules" }) {
  return /* @__PURE__ */ n(Tn.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: ne.list, "aria-label": a, children: e }) });
}
function vh({ clause: e, ruleId: a, onChange: t }) {
  if (!t) return /* @__PURE__ */ n("span", { className: ne.value, children: e.value });
  const r = e.options ? "select" : "input";
  return /* @__PURE__ */ n(A, { kind: r, labelHidden: !0, label: `${a} ${e.label}`, value: e.value, options: e.options, invalid: e.invalid, onChange: (o) => t(e.key, o) });
}
function fh({ reason: e }) {
  return /* @__PURE__ */ l("span", { className: ne.lock, children: [
    /* @__PURE__ */ n(m, { role: "quiet", label: "Locked" }),
    e && /* @__PURE__ */ n("span", { className: ne.reason, children: e })
  ] });
}
function bh({ rule: e, onRemove: a }) {
  return /* @__PURE__ */ l("span", { className: ne.head, children: [
    /* @__PURE__ */ n("span", { className: ne.id, children: e.id }),
    e.locked && /* @__PURE__ */ n(fh, { reason: e.lockedReason }),
    a && /* @__PURE__ */ n("span", { className: ne.remove, children: /* @__PURE__ */ l(v, { variant: "ghost", size: "sm", onClick: a, children: [
      "Remove ",
      e.id
    ] }) })
  ] });
}
function on(e, a) {
  return e.locked ? void 0 : a;
}
function Zk({ rule: e, onChange: a, onRemove: t }) {
  if (!We(Tn)) throw new Error("ClauseRuleRow: must be rendered inside ClauseRules");
  const r = on(e, a);
  return /* @__PURE__ */ l("li", { className: ne.row, "data-locked": e.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(bh, { rule: e, onRemove: on(e, t) }),
    /* @__PURE__ */ n("dl", { className: ne.clauses, children: e.clauses.map((o) => /* @__PURE__ */ l("div", { className: ne.clause, children: [
      /* @__PURE__ */ n("dt", { className: ne.label, children: o.label }),
      /* @__PURE__ */ n("dd", { className: ne.cell, children: /* @__PURE__ */ n(vh, { clause: o, ruleId: e.id, onChange: r }) })
    ] }, o.key)) })
  ] });
}
const ph = "_ladder_wwnch_2", gh = "_cell_wwnch_7", Nh = "_empty_wwnch_26", yh = "_name_wwnch_34", kh = "_holder_wwnch_40", $h = "_request_wwnch_46", Ch = "_swatches_wwnch_51", Sh = "_swatch_wwnch_51", Rh = "_tilesFrame_wwnch_78", Th = "_tiles_wwnch_78", Lh = "_tile_wwnch_78", xh = "_bar_wwnch_117", Ah = "_hex_wwnch_128", Eh = "_note_wwnch_138", R = {
  ladder: ph,
  cell: gh,
  empty: Nh,
  name: yh,
  holder: kh,
  request: $h,
  swatches: Ch,
  swatch: Sh,
  tilesFrame: Rh,
  tiles: Th,
  tile: Lh,
  bar: xh,
  hex: Ah,
  note: Eh
}, qh = "not validated — needs CVD matrix and dark stepping";
function Ih(e) {
  return e.reserved ? "reserved" : _a(e.step) ? "validated" : "partial";
}
function Ln(e, a) {
  return a !== void 0 && e !== "reserved" ? `taken by ${a}` : e === "reserved" ? "reserved" : e === "partial" ? "not validated" : "free";
}
function Mh(e, a) {
  return a === "reserved" ? {} : { "--stream": `var(--ward-stream-${e.step}-id)` };
}
function Bh({ validation: e }) {
  return e === "validated" ? /* @__PURE__ */ n(Se, { size: 14, kind: "stream" }) : /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" });
}
function Ph(e, a) {
  e.key !== "Enter" && e.key !== " " || (e.preventDefault(), a());
}
function Dh(e, a) {
  return {
    "aria-checked": a,
    "aria-disabled": e || void 0,
    tabIndex: e ? -1 : 0,
    "data-checked": a ? "true" : void 0,
    "data-unavailable": e ? "true" : void 0
  };
}
const cn = (e) => String(e).padStart(2, "0");
function Oh(e, a, t) {
  return e === "reserved" ? "Reserved — needs revalidation" : t ? "yours" : a ?? Ln(e, void 0);
}
function Hh({ step: e, validation: a, note: t }) {
  const r = a === "reserved";
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: r ? `step ${cn(e)}` : $t(e) }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: r ? t : `Step ${cn(e)} · ${t}` })
  ] });
}
function Fh({ step: e, value: a, taken: t, onChange: r, presentation: o }) {
  const i = Ih(e), c = Ln(i, t), s = c !== "free", u = a === e.step, d = e.name ?? `Step ${e.step}`, h = () => {
    s || r(e.step);
  }, _ = `${d} — ${o === "tiles" && u ? "yours" : c}`;
  return { shared: { role: "radio", "aria-label": _, ...Dh(s, u), "data-validation": i, style: Mh(e, i), onClick: h, onKeyDown: (L) => Ph(L, h) }, label: _, name: d, holder: c, validation: i, note: Oh(i, t, u), step: e.step };
}
const jh = {
  swatches: (e) => /* @__PURE__ */ n("span", { ...e.shared, title: e.label, className: `${R.swatch} ward-ladder-cell` }),
  tiles: (e) => /* @__PURE__ */ n("span", { ...e.shared, className: `${R.tile} ward-ladder-cell`, children: /* @__PURE__ */ n(Hh, { step: e.step, validation: e.validation, note: e.note }) }),
  list: (e) => /* @__PURE__ */ l("span", { ...e.shared, className: `${R.cell} ward-ladder-cell`, children: [
    /* @__PURE__ */ n(Bh, { validation: e.validation }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: e.name }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: e.holder })
  ] })
};
function Wh(e) {
  return jh[e.presentation](Fh(e));
}
function zh(e) {
  for (const a of e)
    if (!a.reserved && !wa(a.step)) throw new Error("colour ladder renders token steps only");
}
function Gh() {
  return /* @__PURE__ */ l("div", { className: `${R.cell} ward-ladder-cell ${R.request}`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.empty} ward-ladder-swatch ward-ladder-swatch--empty`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.name} ward-ladder-name`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.holder} ward-ladder-holder`, children: "Ask design for a new step" })
  ] });
}
function Kh(e) {
  return ("presentation" in e ? e.presentation : void 0) ?? "list";
}
const Uh = { list: R.ladder, swatches: R.swatches, tiles: R.tilesFrame };
function Vh() {
  return /* @__PURE__ */ l("div", { className: `${R.tile} ward-ladder-cell`, "data-validation": "request", children: [
    /* @__PURE__ */ n("span", { className: `${R.bar} ward-ladder-bar`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: `${R.hex} ward-ladder-hex`, children: "request" }),
    /* @__PURE__ */ n("span", { className: `${R.note} ward-ladder-note`, children: "Ask design for a new step" })
  ] });
}
const Yh = { list: Gh, swatches: () => null, tiles: Vh };
function xn(e) {
  const a = e.takenBy ?? {}, t = (c) => {
    var s;
    (s = e.onChange) == null || s.call(e, c);
  };
  zh(e.steps);
  const r = Kh(e), o = Yh[r], i = /* @__PURE__ */ l(x, { children: [
    e.steps.map((c) => /* @__PURE__ */ n(Wh, { step: c, value: e.value, taken: a[c.step], onChange: t, presentation: r }, c.step)),
    /* @__PURE__ */ n(o, {})
  ] });
  return /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": e.label ?? "Stream colour — validated steps only", className: `${Uh[r]} ward-ladder`, children: r === "tiles" ? /* @__PURE__ */ n("div", { className: R.tiles, children: i }) : i });
}
const Jh = "_rail_1el2t_2", Xh = "_section_1el2t_12", Qh = "_sectionFlush_1el2t_22", Zh = "_head_1el2t_26", em = "_headLabel_1el2t_34", am = "_sample_1el2t_42", nm = "_sampleLabel_1el2t_47", tm = "_sampleTitle_1el2t_54", rm = "_sampleMeta_1el2t_59", lm = "_trace_1el2t_65", om = "_traceHead_1el2t_70", im = "_steps_1el2t_78", cm = "_step_1el2t_78", sm = "_stepTitle_1el2t_97", dm = "_hollow_1el2t_107", um = "_stepBody_1el2t_115", hm = "_stepDetail_1el2t_127", mm = "_publish_1el2t_132", wm = "_reason_1el2t_138", _m = "_note_1el2t_143", vm = "_reveal_1el2t_148", p = {
  rail: Jh,
  section: Xh,
  sectionFlush: Qh,
  head: Zh,
  headLabel: em,
  sample: am,
  sampleLabel: nm,
  sampleTitle: tm,
  sampleMeta: rm,
  trace: lm,
  traceHead: om,
  steps: im,
  step: cm,
  stepTitle: sm,
  hollow: dm,
  stepBody: um,
  stepDetail: hm,
  publish: mm,
  reason: wm,
  note: _m,
  reveal: vm
}, sn = {
  passed: { role: "done", label: "PASSED" },
  failed: { role: "failed", label: "FAILED" },
  running: { role: "running", label: "RUNNING" },
  notRun: { role: "pending", label: "NOT RUN" }
}, fm = { running: "dry run in progress", notRun: "dry run has not run yet", failed: "dry run failed" }, bm = { ok: "greenFill", finding: "orangeFill", action: "blue" }, pm = { notSimulated: "not simulated", running: "running" };
function gm(e) {
  return e.presentation === "foundry";
}
function Nm(e, a) {
  if (e.status === "running") return "Publish is disabled: dry run in progress.";
  const t = a.filter((r) => !r.met);
  return t.length > 0 ? `Publish is disabled: ${t.length} of ${a.length} gate conditions unmet — ${t[0].text}` : e.status === "passed" ? null : "Publish is disabled: the dry run has not passed.";
}
function ym(e, a) {
  var r;
  const t = fm[e.status];
  return t !== void 0 ? t : ((r = a.find((o) => !o.met)) == null ? void 0 : r.text) ?? null;
}
function km(e) {
  return (e.status === "passed" || e.status === "failed") && (e.gateCount ?? 0) > 0;
}
function $m(e, a) {
  if (a.length > 0 && !e.steps.some((t) => t.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Cm(e) {
  if (km(e) && !e.steps.some((a) => a.kind === "notSimulated")) throw new Error("DryRunRail: a gate exists, so the trace must carry a notSimulated step — a human wait is never simulated");
}
function Sm(e) {
  const [a, t] = g(!1);
  E(() => t(!0), []);
  const r = e.kind === "running" ? "step" : void 0;
  return /* @__PURE__ */ n("li", { className: `${p.step} ${p.reveal} ward-dryrun-step ward-reveal`, "data-in": a ? "true" : void 0, "data-kind": e.kind, "aria-current": r, children: e.children });
}
function Rm(e) {
  const a = pm[e.kind];
  return a !== void 0 ? /* @__PURE__ */ n("span", { className: p.hollow, "data-hollow": "true", role: "img", "aria-label": a }) : /* @__PURE__ */ n(Se, { size: 6, kind: bm[e.kind], label: e.kind });
}
function Tm(e) {
  return e.detail === void 0 ? null : /* @__PURE__ */ l("span", { className: p.stepDetail, children: [
    e.foundry ? " · " : "",
    e.detail
  ] });
}
function Lm(e) {
  return e.kind === "running" && e.run.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns }) : null;
}
function xm(e) {
  const { step: a } = e;
  return /* @__PURE__ */ l(Sm, { kind: a.kind, children: [
    /* @__PURE__ */ n(Rm, { kind: a.kind }),
    /* @__PURE__ */ l("span", { className: p.stepBody, "data-current": a.kind === "running" ? "true" : void 0, children: [
      /* @__PURE__ */ n("span", { className: p.stepTitle, children: a.title }),
      /* @__PURE__ */ n(Tm, { detail: a.detail, foundry: e.foundry })
    ] }),
    /* @__PURE__ */ n(Lm, { run: e.run, kind: a.kind, connection: e.connection })
  ] });
}
function Am(e, a) {
  const t = ["Trace", `${e.length} step${e.length === 1 ? "" : "s"}`];
  return a !== void 0 && t.push(te(a)), t.join(" · ");
}
function An(e) {
  const a = k();
  return e.steps.length === 0 ? null : /* @__PURE__ */ l("section", { className: `${p.trace} ${p.section}`, children: [
    /* @__PURE__ */ n("p", { className: p.traceHead, id: a, children: Am(e.steps, e.run.durationMs) }),
    /* @__PURE__ */ n("ol", { className: p.steps, "aria-labelledby": a, children: e.steps.map((t, r) => /* @__PURE__ */ n(xm, { ...e, step: t }, t.title + String(r))) })
  ] });
}
function Em(e) {
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
function qm(e) {
  if (e.sample === void 0) return null;
  const a = e.sample.replayedFrom === void 0 ? "" : " · replayed from " + re(e.sample.replayedFrom);
  return /* @__PURE__ */ n("p", { className: `${p.sampleMeta} ${p.section} ward-dryrun-sample`, children: "Sample item: " + e.sample.key + " · " + e.sample.title + a + " · no writes committed" });
}
function Im(e) {
  const a = [{ value: e.run.cost === void 0 ? "—" : Q(e.run.cost), label: "Cost" }, { value: e.run.turns ? vn(e.run.turns[0], e.run.turns[1]) : "—", label: "Turns used" }];
  return /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function Mm(e) {
  const a = [];
  return e.cost !== void 0 && a.push({ value: Q(e.cost), label: "Cost" }), e.turns !== void 0 && a.push({ value: vn(e.turns[0], e.turns[1]), label: "Turns used" }), a;
}
function Bm(e) {
  const a = Mm(e.run);
  return a.length === 0 ? null : a.length === 1 ? /* @__PURE__ */ l("p", { className: p.section, children: [
    /* @__PURE__ */ n("span", { className: "ward-stat-value", children: a[0].value }),
    " ",
    /* @__PURE__ */ n("span", { className: "ward-stat-label", children: a[0].label })
  ] }) : /* @__PURE__ */ n("div", { className: p.sectionFlush, children: /* @__PURE__ */ n(ba, { divided: !0, cells: a }) });
}
function En(e) {
  const a = k();
  return e.reason !== null ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: `${p.reason} ward-checklist-note`, id: a, children: e.reason }),
    /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", disabled: !0, describedBy: a })
  ] }) : /* @__PURE__ */ n(v, { variant: "primary", label: "Publish", onClick: e.onPublish });
}
function Pm(e) {
  return /* @__PURE__ */ l("div", { className: `${p.publish} ${p.section}`, children: [
    /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }),
    /* @__PURE__ */ n("p", { className: p.note, children: e.note })
  ] });
}
function Dm(e) {
  return e.onPublish === void 0 ? null : /* @__PURE__ */ n("div", { className: `${p.publish} ${p.section}`, children: /* @__PURE__ */ n(En, { reason: e.reason, onPublish: e.onPublish }) });
}
function qn(e) {
  return /* @__PURE__ */ l("div", { className: `${p.head} ${p.section}`, children: [
    e.foundry && /* @__PURE__ */ n("span", { className: p.headLabel, children: "Dry run" }),
    /* @__PURE__ */ n(m, { role: sn[e.run.status].role, label: sn[e.run.status].label }),
    e.run.status === "running" && e.run.startedAt !== void 0 && /* @__PURE__ */ n(ge, { startedAt: e.run.startedAt, connection: e.connection, turn: e.run.turns })
  ] });
}
function Om(e, a) {
  const [t, r] = g(e.steps);
  return E(() => r(e.steps), [e.steps]), E(() => {
    if (!((a == null ? void 0 : a.subscribe) === void 0 || e.status !== "running"))
      return a.subscribe("*", (o) => {
        (o.type === "run.step" || o.type === "run.finding") && r((i) => {
          var c, s;
          return [...i, { kind: o.type === "run.finding" ? "finding" : "action", title: ((c = o.step) == null ? void 0 : c.label) ?? "step", detail: (s = o.step) == null ? void 0 : s.tool }];
        });
      });
  }, [a, e.status]), t;
}
function Hm(e) {
  var t;
  $m(e.run, e.checklist);
  const a = ((t = e.feed) == null ? void 0 : t.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !1, connection: a }),
    /* @__PURE__ */ n(Em, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: e.run.steps, connection: a, foundry: !1 }),
    /* @__PURE__ */ n(Im, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist }) }),
    /* @__PURE__ */ n(Pm, { reason: Nm(e.run, e.checklist), note: e.publishNote, onPublish: e.onPublish })
  ] });
}
function Fm(e) {
  var r;
  const a = Om(e.run, e.feed);
  Cm(e.run);
  const t = ((r = e.feed) == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("aside", { className: `${p.rail} ward-dryrun`, "aria-label": "Dry run", children: [
    /* @__PURE__ */ n(qn, { run: e.run, foundry: !0, connection: t }),
    /* @__PURE__ */ n(qm, { sample: e.run.sample }),
    /* @__PURE__ */ n(An, { run: e.run, steps: a, connection: t, foundry: !0 }),
    /* @__PURE__ */ n(Bm, { run: e.run }),
    /* @__PURE__ */ n("div", { className: p.section, children: /* @__PURE__ */ n(Na, { items: e.checklist, note: e.publishNote }) }),
    /* @__PURE__ */ n(Dm, { reason: ym(e.run, e.checklist), onPublish: e.onPublish })
  ] });
}
function e1(e) {
  return gm(e) ? /* @__PURE__ */ n(Fm, { ...e }) : /* @__PURE__ */ n(Hm, { ...e });
}
const jm = "_list_142ip_3", Wm = "_row_142ip_9", zm = "_condition_142ip_18", Gm = "_action_142ip_24", na = {
  list: jm,
  row: Wm,
  condition: zm,
  action: Gm
}, In = ze(!1);
function a1({ children: e, label: a = "Handoff rules" }) {
  return /* @__PURE__ */ n(In.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: na.list, "aria-label": a, children: e }) });
}
function n1({ rule: e }) {
  if (!We(In)) throw new Error("HandoffRuleRow: must be rendered inside HandoffRules");
  return /* @__PURE__ */ l("li", { className: na.row, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: na.condition, children: e.when }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: na.action, children: e.then })
  ] });
}
function qa(e, a, t) {
  if (t < 0 || t >= e.length) return e;
  const r = e.slice(), [o] = r.splice(a, 1);
  return r.splice(t, 0, o), r;
}
function Mn(e, a) {
  return a === "up" ? e - 1 : e + 1;
}
function Bn(e, a, t) {
  return `${e} moved to position ${a + 1} of ${t}.`;
}
function dn(e, a, t) {
  return e.querySelector(`[data-move="${a}-${t}"]`);
}
function Km(e) {
  return e === "up" ? "down" : "up";
}
function Um(e, a) {
  const t = dn(e, a.id, a.direction) ?? dn(e, a.id, Km(a.direction));
  t == null || t.focus();
}
function Pn() {
  const e = N(null), [a, t] = g(null), [r, o] = g("");
  return E(() => {
    e.current !== null && a !== null && Um(e.current, a);
  }, [a]), { root: e, announcement: r, moved: (c, s) => {
    t(c), o(s);
  } };
}
function Dn({ text: e }) {
  return /* @__PURE__ */ n("p", { role: "status", "aria-live": "polite", className: "ward-visually-hidden", children: e });
}
function sa({ id: e, name: a, direction: t, onMove: r }) {
  return /* @__PURE__ */ n("button", { type: "button", className: "ward-btn ward-btn--sm ward-btn--ghost", "data-move": `${e}-${t}`, "aria-label": `Move ${a} ${t}`, onClick: r, children: /* @__PURE__ */ n("span", { "aria-hidden": "true", children: t === "up" ? "↑" : "↓" }) });
}
const Vm = "_body_1h15q_2", Ym = "_title_1h15q_8", Jm = "_section_1h15q_13", Xm = "_legend_1h15q_18", Qm = "_stages_1h15q_26", Zm = "_stage_1h15q_26", ew = "_stageIndex_1h15q_44", aw = "_stageName_1h15q_50", nw = "_footer_1h15q_59", tw = "_note_1h15q_66", rw = "_reason_1h15q_71", lw = "_actions_1h15q_76", ow = "_webHead_1h15q_83", iw = "_kicker_1h15q_92", cw = "_webTitle_1h15q_99", sw = "_webBody_1h15q_105", dw = "_webSection_1h15q_109", uw = "_sectionHead_1h15q_121", hw = "_sectionNote_1h15q_129", mw = "_formLabel_1h15q_134", ww = "_identityRow_1h15q_139", _w = "_nameCell_1h15q_145", vw = "_keyCell_1h15q_150", fw = "_colourCell_1h15q_154", bw = "_colourStatus_1h15q_161", pw = "_webStages_1h15q_166", gw = "_webStageList_1h15q_172", Nw = "_webStage_1h15q_166", yw = "_webIndex_1h15q_191", kw = "_webStageName_1h15q_196", $w = "_webMoves_1h15q_201", Cw = "_addStage_1h15q_215", Sw = "_addStageButton_1h15q_223", Rw = "_addStageNote_1h15q_231", Tw = "_webFooter_1h15q_236", Lw = "_webFooterNotes_1h15q_244", xw = "_webNote_1h15q_251", w = {
  body: Vm,
  title: Ym,
  section: Jm,
  legend: Xm,
  stages: Qm,
  stage: Zm,
  stageIndex: ew,
  stageName: aw,
  footer: nw,
  note: tw,
  reason: rw,
  actions: lw,
  webHead: ow,
  kicker: iw,
  webTitle: cw,
  webBody: sw,
  webSection: dw,
  sectionHead: uw,
  sectionNote: hw,
  formLabel: mw,
  identityRow: ww,
  nameCell: _w,
  keyCell: vw,
  colourCell: fw,
  colourStatus: bw,
  webStages: pw,
  webStageList: gw,
  webStage: Nw,
  webIndex: yw,
  webStageName: kw,
  webMoves: $w,
  addStage: Cw,
  addStageButton: Sw,
  addStageNote: Rw,
  webFooter: Tw,
  webFooterNotes: Lw,
  webNote: xw
}, Aw = [
  { value: "entry", label: "entry" },
  { value: "agent", label: "agent allowed" },
  { value: "gate", label: "human gate" },
  { value: "terminal", label: "terminal" }
], On = "not in catalogue";
function Ew(e, a) {
  const t = e.map((r) => ({ value: r, label: r }));
  return e.includes(a) ? t : [{ value: a, label: `${a || "(unnamed)"} — ${On}` }, ...t];
}
function qw({ stage: e, index: a, catalogue: t, onName: r }) {
  const o = `Stage ${a + 1} name`;
  if (!t) return /* @__PURE__ */ n(A, { variant: "inline", labelHidden: !0, placeholder: "Name this stage", label: o, value: e.name, onChange: r });
  const i = t.includes(e.name) ? void 0 : `${e.name || "This stage"} is ${On}`;
  return /* @__PURE__ */ n(A, { variant: "inline", kind: "select", labelHidden: !0, label: o, value: e.name, options: Ew(t, e.name), invalid: i, onChange: r });
}
function Hn(e, a) {
  return e.name || `stage ${a + 1}`;
}
function Iw(e) {
  const a = N([]), t = N(0);
  for (; a.current.length < e; ) a.current.push(`stage-row-${t.current++}`);
  return a.current.length > e && (a.current = a.current.slice(0, e)), a;
}
function Mw({ id: e, stage: a, index: t, total: r, catalogue: o, onReplace: i, onMove: c }) {
  const s = Hn(a, t), u = a.kind === "gate";
  return /* @__PURE__ */ l("li", { className: `${w.webStage} ward-stageedit`, "data-gate": u ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: w.webIndex, "aria-hidden": "true", children: String(t + 1) }),
    /* @__PURE__ */ n("div", { className: w.webStageName, children: /* @__PURE__ */ n(qw, { stage: a, index: t, catalogue: o, onName: (d) => i({ ...a, name: d }) }) }),
    /* @__PURE__ */ n(A, { variant: u ? "tagGate" : "tag", labelHidden: !0, kind: "select", label: `Stage ${t + 1} kind`, value: a.kind, options: Aw, onChange: (d) => i({ ...a, kind: d }) }),
    /* @__PURE__ */ l("span", { className: w.webMoves, children: [
      t > 0 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "up", onMove: () => c("up") }),
      t < r - 1 && /* @__PURE__ */ n(sa, { id: e, name: s, direction: "down", onMove: () => c("down") })
    ] })
  ] });
}
function Bw({ stages: e, onChange: a, catalogue: t }) {
  const r = Iw(e.length), o = Pn(), i = (s, u) => {
    const d = Mn(s, u);
    r.current = qa(r.current, s, d), o.moved({ id: r.current[d], direction: u }, Bn(Hn(e[s], s), d, e.length)), a(qa(e, s, d));
  }, c = (s, u) => a(e.map((d, h) => h === s ? u : d));
  return /* @__PURE__ */ l("div", { className: w.webStages, children: [
    /* @__PURE__ */ n("ol", { ref: o.root, className: w.webStageList, "aria-label": "Workflow stages in order", children: e.map((s, u) => /* @__PURE__ */ n(Mw, { id: r.current[u], stage: s, index: u, total: e.length, catalogue: t, onReplace: (d) => c(u, d), onMove: (d) => i(u, d) }, r.current[u])) }),
    /* @__PURE__ */ n(Dn, { text: o.announcement }),
    /* @__PURE__ */ l("p", { className: w.addStage, children: [
      /* @__PURE__ */ n("button", { type: "button", className: w.addStageButton, onClick: () => a([...e, { name: "", kind: "agent" }]), children: "+ Add stage" }),
      /* @__PURE__ */ n("span", { className: w.addStageNote, children: "· a human gate can't be removed once items have passed through it" })
    ] })
  ] });
}
const Pw = [
  { id: "intake", name: "Intake" },
  { id: "build", name: "In progress" },
  { id: "review", name: "Review", gate: !0 },
  { id: "done", name: "Done" }
], Dw = [
  { value: "advance", label: "Advance on a met contract", consequence: "An item leaves the stage without a person once every criterion is met." },
  { value: "review", label: "Hold every item at the gate", consequence: "Every item waits for a named reviewer, whatever the agent found." },
  { value: "block", label: "Block on a finding", consequence: "One finding holds the item until a person resolves it." }
], Ow = "A new stream starts as a draft. Nothing runs on it until you publish it.", Hw = "Create is disabled: name the stream and give it a key first.", Fw = "reorder with the ↑ ↓ buttons · min 2";
function ja(e, a) {
  return !e.reserved && _a(e.step) && a[e.step] === void 0;
}
function jw(e, a) {
  const t = e.find((r) => ja(r, a));
  return t ? t.step : 1;
}
function Ww({ stages: e, onMove: a }) {
  const t = Pn(), r = (o, i) => {
    const c = Mn(o, i);
    t.moved({ id: e[o].id, direction: i }, Bn(e[o].name, c, e.length)), a(o, c);
  };
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("ol", { ref: t.root, className: w.stages, "aria-label": "Stages in order", children: e.map((o, i) => /* @__PURE__ */ l("li", { className: w.stage, "data-gate": o.gate ? !0 : void 0, children: [
      /* @__PURE__ */ n("span", { className: w.stageIndex, children: String(i + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: w.stageName, children: o.name }),
      o.gate && /* @__PURE__ */ n(m, { role: "gate", label: "GATE" }),
      i > 0 && /* @__PURE__ */ n(sa, { id: o.id, name: o.name, direction: "up", onMove: () => r(i, "up") }),
      i < e.length - 1 && /* @__PURE__ */ n(sa, { id: o.id, name: o.name, direction: "down", onMove: () => r(i, "down") })
    ] }, o.id)) }),
    /* @__PURE__ */ n(Dn, { text: t.announcement })
  ] });
}
function zw({ reason: e, onCreate: a, onDraft: t }) {
  const r = k();
  return /* @__PURE__ */ l("div", { className: w.footer, children: [
    /* @__PURE__ */ n("p", { className: w.note, children: Ow }),
    e && /* @__PURE__ */ n("p", { className: w.reason, id: r, children: e }),
    /* @__PURE__ */ l("div", { className: w.actions, children: [
      /* @__PURE__ */ n(v, { variant: "secondary", onClick: t, children: "Save draft" }),
      e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: r, children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", onClick: a, children: "Create stream" })
    ] })
  ] });
}
function Gw(e, a) {
  return e !== "" && a !== "" ? null : Hw;
}
function Kw(e) {
  const { owners: a, ladder: t, takenBy: r = {}, policies: o = Dw, onCreate: i, onDraft: c, onClose: s, returnFocusTo: u } = e, d = k(), [h, _] = g(""), [b, L] = g(""), [G, J] = g(a[0].value), [le, Ne] = g(() => jw(t, r)), [oe, Ie] = g(e.stages ?? Pw), [Me, $] = g(o[0].value), F = { name: h, key: b, streamStep: le, owner: G, stages: oe, policy: Me }, me = Gw(h, b);
  return /* @__PURE__ */ n(Je, { kind: "modal", labelledBy: d, onClose: s, returnFocusTo: u, children: /* @__PURE__ */ l("div", { className: w.body, children: [
    /* @__PURE__ */ n("h2", { className: w.title, id: d, children: "New stream" }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Identity" }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Stream name", value: h, onChange: _ }),
      /* @__PURE__ */ n(A, { kind: "input", label: "Key", value: b, onChange: L, mono: !0 }),
      /* @__PURE__ */ n(A, { kind: "select", label: "Owner", value: G, onChange: J, options: a })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Colour" }),
      /* @__PURE__ */ n(xn, { label: "Stream colour", steps: t, value: le, onChange: Ne, takenBy: r })
    ] }),
    /* @__PURE__ */ l("fieldset", { className: w.section, children: [
      /* @__PURE__ */ n("legend", { className: w.legend, children: "Stages" }),
      /* @__PURE__ */ n(Ww, { stages: oe, onMove: (Re, lt) => Ie(qa(oe, Re, lt)) })
    ] }),
    /* @__PURE__ */ n(yn, { legend: "Loop policy", options: o, value: Me, onChange: $ }),
    /* @__PURE__ */ n(zw, { reason: me, onCreate: () => i(F), onDraft: () => c(F) })
  ] }) });
}
const Fn = [
  { value: "relay", label: "All writes go through relay", consequence: "At-least-once, deduped on req_hash. Agents never touch Foundry or Jira directly." },
  { value: "direct", label: "Direct writes, per-agent approval", consequence: "Needs a second admin to co-sign each grant." },
  { value: "readonly", label: "Read-only stream", consequence: "Agents can observe and report; nothing leaves Trellis." }
], Uw = "A stream can't be published without at least two stages and one named owner, a colour step and a key.";
function Vw(e, a, t, r, o, i) {
  var s;
  const c = ((s = Fn.find((u) => u.value === o)) == null ? void 0 : s.value) ?? "relay";
  return { name: e, key: a, owner: t, colourStep: r, writePolicyMode: c, stages: i };
}
function Yw(e, a) {
  return Jw(e) && Xw(e, a) && Qw(e);
}
function Jw(e) {
  return e.name.trim() !== "" && e.key.trim() !== "" && e.owner !== "";
}
function Xw(e, a) {
  return e.colourStep !== null && ja({ step: e.colourStep }, a);
}
function Qw(e) {
  return e.stages.length >= 2 && e.stages.every((a) => a.name.trim() !== "");
}
function Zw(e, a) {
  return e === null ? `Colour: none picked — choose a free validated step; steps 4–6 are ${qh}.` : ja({ step: e }, a) ? `Colour: step ${e} — validated and free.` : `Colour: step ${e} cannot be used.`;
}
function e_({ stage: e }) {
  return e ? /* @__PURE__ */ l("p", { className: w.webNote, children: [
    "Next: mount your first agent on ",
    /* @__PURE__ */ n("b", { children: e.name }),
    ". Nothing runs until you publish it."
  ] }) : /* @__PURE__ */ n("p", { className: w.webNote, children: "Add a stage an agent can run on." });
}
function a_({ ready: e, draft: a, agentStage: t, onCreate: r, onDraft: o, reasonId: i }) {
  return /* @__PURE__ */ l("div", { className: w.webFooter, children: [
    /* @__PURE__ */ l("div", { className: w.webFooterNotes, children: [
      /* @__PURE__ */ n(e_, { stage: t }),
      !e && /* @__PURE__ */ n("p", { id: i, className: w.reason, children: Uw })
    ] }),
    o && /* @__PURE__ */ n(v, { variant: "secondary", onClick: () => o(a), children: "Save draft" }),
    e ? /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(a), children: "Create stream" }) : /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: i, children: "Create stream" })
  ] });
}
function n_({ titleId: e }) {
  return /* @__PURE__ */ l("header", { className: w.webHead, children: [
    /* @__PURE__ */ n("span", { className: w.kicker, children: "Studio / Streams" }),
    /* @__PURE__ */ n("h2", { id: e, className: w.webTitle, children: "New stream" })
  ] });
}
function t_({ name: e, setName: a, streamKey: t, setKey: r, colour: o, owner: i }) {
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
function r_(e) {
  const a = k(), t = k(), r = e.takenBy ?? {}, [o, i] = g(""), [c, s] = g(""), [u, d] = g(e.owners[0] ?? ""), [h, _] = g(null), [b, L] = g("relay"), [G, J] = g([{ name: "", kind: "entry" }, { name: "", kind: "agent" }]), le = Vw(o, c, u, h, b, G), Ne = Yw(le, r), oe = G.find(($) => $.kind === "agent" && $.name.trim() !== ""), Ie = /* @__PURE__ */ l("div", { className: w.colourCell, children: [
    /* @__PURE__ */ n("span", { className: w.formLabel, children: "Colour" }),
    /* @__PURE__ */ n(xn, { presentation: "swatches", label: "Stream colour — validated steps only", steps: e.ladder, value: h, onChange: _, takenBy: r })
  ] }), Me = /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n("p", { className: w.colourStatus, "data-colour-status": "", children: Zw(h, r) }),
    /* @__PURE__ */ n(A, { variant: "form", kind: "select", label: "Owner — accountable for every agent published here", value: u, options: e.owners.map(($) => ({ value: $, label: $ })), onChange: d })
  ] });
  return /* @__PURE__ */ l(Je, { kind: "modal", wide: !0, flush: !0, labelledBy: t, onClose: e.onClose, returnFocusTo: e.returnFocusTo, children: [
    /* @__PURE__ */ n(n_, { titleId: t }),
    /* @__PURE__ */ l("div", { className: w.webBody, children: [
      /* @__PURE__ */ n(t_, { name: o, setName: i, streamKey: c, setKey: s, colour: Ie, owner: Me }),
      /* @__PURE__ */ l("section", { className: w.webSection, children: [
        /* @__PURE__ */ l("div", { className: w.sectionHead, children: [
          /* @__PURE__ */ n("h3", { className: w.kicker, children: "02 · Workflow stages" }),
          /* @__PURE__ */ n("span", { className: w.sectionNote, children: Fw })
        ] }),
        /* @__PURE__ */ n(Bw, { stages: G, onChange: J })
      ] }),
      /* @__PURE__ */ n("section", { className: w.webSection, children: /* @__PURE__ */ n(yn, { variant: "cards", legend: "03 · Write policy — inherited by every agent on this stream", value: b, options: Fn, onChange: L }) }),
      /* @__PURE__ */ n(a_, { ready: Ne, draft: le, agentStage: oe, onCreate: e.onCreate, onDraft: e.onDraft, reasonId: a })
    ] })
  ] });
}
function t1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(r_, { ...e }) : /* @__PURE__ */ n(Kw, { ...e });
}
const l_ = "_row_bs8hc_2", o_ = "_cell_bs8hc_6", i_ = "_condition_bs8hc_11", c_ = "_action_bs8hc_18", s_ = "_contract_bs8hc_24", d_ = "_contractCondition_bs8hc_33", u_ = "_contractAction_bs8hc_39", V = {
  row: l_,
  cell: o_,
  condition: i_,
  action: c_,
  contract: s_,
  contractCondition: d_,
  contractAction: u_
}, jn = ["advance", "block", "escalate", "requestReview"], un = {
  advance: "Advance",
  block: "Block",
  escalate: "Escalate",
  requestReview: "Request review"
};
function da(e, a) {
  return (a == null ? void 0 : a.conditionText) ?? `${e.when.field} ${e.when.op} ${e.when.value}`;
}
function Wa(e, a, t, r) {
  return t || !a ? /* @__PURE__ */ n("span", { className: V.action, children: un[e.then] }) : /* @__PURE__ */ n(
    A,
    {
      kind: "select",
      label: "Then",
      labelHidden: r,
      value: e.then,
      onChange: (o) => a({ ...e, then: o }),
      options: jn.map((o) => ({ value: o, label: un[o] }))
    }
  );
}
function h_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n("span", { className: V.condition, title: da(e, r), children: da(e, r) }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: /* @__PURE__ */ n(m, { role: "system", label: "THEN" }) }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function m_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("tr", { className: V.row, children: [
    /* @__PURE__ */ l("td", { className: V.cell, children: [
      /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
      /* @__PURE__ */ n("span", { className: V.condition, children: da(e, r) })
    ] }),
    /* @__PURE__ */ n("td", { className: V.cell, children: Wa(e, a, t) })
  ] });
}
function w_({ rule: e, onChange: a, readOnly: t, presentation: r }) {
  return /* @__PURE__ */ l("li", { className: V.contract, children: [
    /* @__PURE__ */ n(m, { role: "system", label: "WHEN" }),
    /* @__PURE__ */ n("span", { className: V.contractCondition, children: da(e, r) }),
    /* @__PURE__ */ n(m, { role: "meta", label: "THEN" }),
    /* @__PURE__ */ n("span", { className: V.contractAction, children: Wa(e, a, t, !0) })
  ] });
}
const __ = { two: m_, four: h_, contract: w_ };
function r1(e) {
  var t;
  if (!jn.includes(e.rule.then)) throw new Error(`RuleRow: '${e.rule.then}' is not a contract action`);
  const a = __[((t = e.presentation) == null ? void 0 : t.cellLayout) ?? "two"];
  return /* @__PURE__ */ n(a, { ...e });
}
const v_ = "_column_lurgk_2", f_ = "_head_lurgk_17", b_ = "_index_lurgk_23", p_ = "_name_lurgk_29", g_ = "_meta_lurgk_38", N_ = "_mono_lurgk_43", y_ = "_gate_lurgk_50", k_ = "_reviewersLabel_lurgk_57", $_ = "_reviewers_lurgk_57", C_ = "_reviewer_lurgk_57", S_ = "_agents_lurgk_74", R_ = "_workflowColumn_lurgk_79", T_ = "_workflowHead_lurgk_96", L_ = "_stageRow_lurgk_102", x_ = "_stageLabel_lurgk_109", A_ = "_workflowTitle_lurgk_116", E_ = "_workflowMeta_lurgk_122", q_ = "_workflowGate_lurgk_127", I_ = "_gateNote_lurgk_135", M_ = "_cardNote_lurgk_140", B_ = "_reviewerList_lurgk_149", P_ = "_reviewerRow_lurgk_155", D_ = "_reviewerMark_lurgk_161", O_ = "_reviewerName_lurgk_171", H_ = "_terminalCard_lurgk_177", F_ = "_terminalCount_lurgk_186", j_ = "_workflowAgents_lurgk_192", W_ = "_mount_lurgk_198", y = {
  column: v_,
  head: f_,
  index: b_,
  name: p_,
  meta: g_,
  mono: N_,
  gate: y_,
  reviewersLabel: k_,
  reviewers: $_,
  reviewer: C_,
  agents: S_,
  workflowColumn: R_,
  workflowHead: T_,
  stageRow: L_,
  stageLabel: x_,
  workflowTitle: A_,
  workflowMeta: E_,
  workflowGate: q_,
  gateNote: I_,
  cardNote: M_,
  reviewerList: B_,
  reviewerRow: P_,
  reviewerMark: D_,
  reviewerName: O_,
  terminalCard: H_,
  terminalCount: F_,
  workflowAgents: j_,
  mount: W_
}, z_ = { entry: "ENTRY", agent: "AGENT", gate: "GATE", terminal: "TERMINAL" };
function za(e, a = String) {
  return e === void 0 ? "—" : a(e);
}
function Wn(e) {
  return `${Math.round(e * 100)}%`;
}
function G_({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.gate, "data-panel": "gate", children: [
    /* @__PURE__ */ n("p", { className: y.reviewersLabel, children: "Reviewers" }),
    /* @__PURE__ */ n("ul", { className: y.reviewers, children: a.map((t) => /* @__PURE__ */ n("li", { className: y.reviewer, children: t }, t)) }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ n(ba, { cells: [
      { value: Wn(e.gateShare), label: "Gate share", accent: "amber" },
      { value: ae(e.count), label: "In stage" }
    ] })
  ] });
}
function K_({ stage: e }) {
  return /* @__PURE__ */ n(ba, { cells: [
    { value: ae(e.count), label: "In stage" },
    { value: za(e.closedThisWeek, ae), label: "Closed this week" }
  ] });
}
function U_({ stage: e, titleId: a }) {
  return /* @__PURE__ */ l("header", { className: y.head, children: [
    /* @__PURE__ */ n("span", { className: y.index, children: String(e.index).padStart(2, "0") }),
    /* @__PURE__ */ n("h3", { className: y.name, id: a, children: e.name }),
    /* @__PURE__ */ n(m, { role: e.kind === "gate" ? "gate" : "soft", label: z_[e.kind] })
  ] });
}
function V_({ stage: e }) {
  return /* @__PURE__ */ l("p", { className: y.meta, children: [
    /* @__PURE__ */ l("span", { className: y.mono, children: [
      ae(e.count),
      " in stage"
    ] }),
    e.medianWait === void 0 ? null : /* @__PURE__ */ l("span", { className: y.mono, children: [
      te(e.medianWait),
      " median wait"
    ] })
  ] });
}
function Y_({ stage: e }) {
  return e.kind === "gate" ? /* @__PURE__ */ n(G_, { stage: e }) : e.kind === "terminal" ? /* @__PURE__ */ n(K_, { stage: e }) : null;
}
function J_({ onMount: e }) {
  return e ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: () => e(), children: "Mount an agent" }) : null;
}
function X_({ stage: e, agents: a = [], onMount: t, feed: r }) {
  const o = k(), i = (r == null ? void 0 : r.connection) ?? "live";
  return /* @__PURE__ */ l("section", { className: y.column, "aria-labelledby": o, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(U_, { stage: e, titleId: o }),
    /* @__PURE__ */ n(V_, { stage: e }),
    /* @__PURE__ */ n(Y_, { stage: e }),
    /* @__PURE__ */ n("div", { className: y.agents, children: a.map((c) => /* @__PURE__ */ n(th, { ...c, connection: i }, c.agent.id)) }),
    /* @__PURE__ */ n(J_, { onMount: t })
  ] });
}
const Q_ = {
  gate: { role: "gate", label: "HUMAN GATE" },
  terminal: { role: "quiet", label: "TERMINAL" }
};
function Z_({ reviewers: e }) {
  return /* @__PURE__ */ n("ul", { className: y.reviewerList, children: e.map((a, t) => /* @__PURE__ */ l("li", { className: y.reviewerRow, children: [
    /* @__PURE__ */ n("span", { className: y.reviewerMark, "aria-hidden": "true", children: a.initials }),
    /* @__PURE__ */ n("span", { className: y.reviewerName, children: a.name })
  ] }, `${t}-${a.name}`)) });
}
function ev({ stage: e }) {
  const a = e.reviewers ?? [];
  return /* @__PURE__ */ l("div", { className: y.workflowGate, "data-panel": "gate", children: [
    /* @__PURE__ */ l("p", { className: y.gateNote, children: [
      "No agent can advance an item out of this stage.",
      a.length === 0 ? null : " Reviewers:"
    ] }),
    a.length === 0 ? null : /* @__PURE__ */ n(Z_, { reviewers: a }),
    e.gateShare === void 0 ? null : /* @__PURE__ */ l("p", { className: y.cardNote, "data-accent": "amber", children: [
      /* @__PURE__ */ n("span", { children: Wn(e.gateShare) }),
      " of elapsed time is spent here"
    ] })
  ] });
}
function av({ stage: e }) {
  return /* @__PURE__ */ l("div", { className: y.terminalCard, children: [
    /* @__PURE__ */ n("span", { className: y.terminalCount, children: za(e.closedThisWeek) }),
    /* @__PURE__ */ n("span", { className: y.cardNote, children: "items closed this week" })
  ] });
}
function nv(e = 0) {
  return `${e} ${e === 1 ? "item" : "items"}`;
}
function tv(e) {
  if (e.kind === "terminal") return `${za(e.closedThisWeek)} this week`;
  const a = nv(e.count);
  return e.medianWait === void 0 ? a : `${a} · median wait ${e.medianWait}`;
}
function rv({ stage: e, titleId: a }) {
  const t = Q_[e.kind];
  return /* @__PURE__ */ l("header", { className: y.workflowHead, children: [
    /* @__PURE__ */ l("span", { className: y.stageRow, children: [
      /* @__PURE__ */ l("span", { className: y.stageLabel, id: `${a}-index`, children: [
        "Stage ",
        String(e.index).padStart(2, "0")
      ] }),
      t === void 0 ? null : /* @__PURE__ */ n(m, { ...t, size: "tag" })
    ] }),
    /* @__PURE__ */ n("h3", { id: a, className: y.workflowTitle, children: e.name }),
    /* @__PURE__ */ n("span", { className: y.workflowMeta, children: tv(e) })
  ] });
}
function lv(e) {
  return e === "entry" || e === "agent";
}
function ov({ stage: e, onMount: a }) {
  return a === void 0 || !lv(e.kind) ? null : /* @__PURE__ */ n("button", { type: "button", className: y.mount, onClick: () => a(e.index), children: "+ Mount agent" });
}
function iv({ stage: e, agentCards: a, onMount: t }) {
  const r = k();
  return /* @__PURE__ */ l("section", { className: y.workflowColumn, "aria-labelledby": `${r}-index ${r}`, "data-kind": e.kind, children: [
    /* @__PURE__ */ n(rv, { stage: e, titleId: r }),
    e.kind === "gate" ? /* @__PURE__ */ n(ev, { stage: e }) : null,
    e.kind === "terminal" ? /* @__PURE__ */ n(av, { stage: e }) : null,
    a === void 0 ? null : /* @__PURE__ */ n("div", { className: y.workflowAgents, children: a }),
    /* @__PURE__ */ n(ov, { stage: e, onMount: t })
  ] });
}
function cv(e) {
  return "presentation" in e && e.presentation.mode === "workflow";
}
function l1(e) {
  return cv(e) ? /* @__PURE__ */ n(iv, { ...e }) : /* @__PURE__ */ n(X_, { ...e });
}
const sv = "_row_ve78g_6", dv = "_cell_ve78g_10", uv = "_name_ve78g_19", hv = "_chain_ve78g_26", mv = "_owner_ve78g_32", wv = "_mono_ve78g_38", _v = "_compactRow_ve78g_45", vv = "_compactCell_ve78g_54", fv = "_stack_ve78g_71", bv = "_stat_ve78g_78", pv = "_identityLine_ve78g_85", gv = "_identity_ve78g_85", Nv = "_compactName_ve78g_103", yv = "_ownerLine_ve78g_117", kv = "_link_ve78g_130", $v = "_emptyChain_ve78g_136", Cv = "_arrow_ve78g_142", Sv = "_muted_ve78g_143", Rv = "_define_ve78g_148", Tv = "_statValue_ve78g_155", Lv = "_policyId_ve78g_161", xv = "_sub_ve78g_166", f = {
  row: sv,
  cell: dv,
  name: uv,
  chain: hv,
  owner: mv,
  mono: wv,
  compactRow: _v,
  compactCell: vv,
  stack: fv,
  stat: bv,
  identityLine: pv,
  identity: gv,
  compactName: Nv,
  ownerLine: yv,
  link: kv,
  emptyChain: $v,
  arrow: Cv,
  muted: Sv,
  define: Rv,
  statValue: Tv,
  policyId: Lv,
  sub: xv
};
function Av(e) {
  const a = [`${e.live} live`];
  return e.draft > 0 && a.push(`${e.draft} draft`), e.paused > 0 && a.push(`${e.paused} paused`), a.join(" · ");
}
function Ev(e) {
  return e === void 0 ? f.compactRow : `${f.compactRow} ${e}`;
}
function zn(e) {
  return `${ae(e)} ${e === 1 ? "member" : "members"}`;
}
function qv(e) {
  return e.members === void 0 ? e.owner : `${e.owner} · ${zn(e.members)}`;
}
function Iv(e, a) {
  const t = e.draft === !0;
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: /* @__PURE__ */ l("span", { className: f.stack, children: [
    /* @__PURE__ */ l("span", { className: f.identityLine, children: [
      /* @__PURE__ */ n("span", { className: `${f.identity} ward-identity`, "data-draft": t, "aria-hidden": "true" }),
      /* @__PURE__ */ n("a", { className: `${f.compactName} ward-rowlink`, href: a, "data-draft": t, children: e.name }),
      /* @__PURE__ */ n(m, { role: "meta", size: "tag", label: t ? `${e.key} · DRAFT` : e.key })
    ] }),
    /* @__PURE__ */ n("span", { className: f.ownerLine, children: qv(e) })
  ] }) });
}
function Mv(e) {
  return /* @__PURE__ */ n("span", { className: `${f.chain} ward-chiprow`, children: e.map((a, t) => /* @__PURE__ */ l("span", { className: f.link, children: [
    t === 0 ? null : /* @__PURE__ */ n("span", { className: f.arrow, "aria-hidden": "true", children: "→" }),
    /* @__PURE__ */ n(m, { role: a.gate === !0 ? "gate" : "soft", size: "tag", label: a.name }),
    a.gate === !0 ? /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: " (human gate)" }) : null
  ] }, `${a.name}${t}`)) });
}
function Bv(e, a) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e.length === 0 ? /* @__PURE__ */ l("span", { className: f.emptyChain, children: [
    /* @__PURE__ */ n("span", { className: f.muted, children: "No stages yet" }),
    /* @__PURE__ */ n("a", { className: f.define, href: a, children: "Define workflow" })
  ] }) : Mv(e) });
}
function hn(e, a, t) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: t }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: `${f.statValue} ward-stat-value`, children: e }),
    a === void 0 ? null : /* @__PURE__ */ n("span", { className: f.sub, children: a })
  ] }) });
}
function Pv(e) {
  return /* @__PURE__ */ n("td", { className: f.compactCell, children: e === void 0 ? /* @__PURE__ */ n("span", { className: f.muted, children: "not set" }) : /* @__PURE__ */ l("span", { className: f.stat, children: [
    /* @__PURE__ */ n("span", { className: f.policyId, children: e.id }),
    /* @__PURE__ */ n("span", { className: f.sub, children: e.summary })
  ] }) });
}
function Dv(e) {
  return e === void 0 ? void 0 : String(e.live + e.draft + e.paused);
}
function Ov({ stream: e, href: a, presentation: t }) {
  const r = Ev(t.className);
  return /* @__PURE__ */ l("tr", { className: `${r} ward-streamrow`, "data-draft": e.draft === !0, style: { "--stream": Ce(e.streamStep, "chip") }, children: [
    Iv(e, a),
    Bv(e.stages, a),
    hn(Dv(e.agents), e.agents === void 0 ? void 0 : Av(e.agents), "—"),
    Pv(e.policy),
    hn(e.inFlight === void 0 ? void 0 : String(e.inFlight), e.p50 === void 0 ? void 0 : `P50 ${e.p50}`, "—")
  ] });
}
function Hv(e) {
  var a;
  return ((a = e.presentation) == null ? void 0 : a.columns) === 5;
}
function o1(e) {
  if (Hv(e)) return Ov(e);
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
      /* @__PURE__ */ n("span", { className: f.mono, children: zn(a.members) })
    ] }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: ae(a.inFlight) }) }),
    /* @__PURE__ */ n("td", { className: f.cell, "data-align": "end", children: /* @__PURE__ */ n("span", { className: f.mono, children: a.p50 === void 0 ? "" : te(a.p50) }) })
  ] });
}
const Fv = "_row_1nbe9_2", jv = "_name_1nbe9_15", Wv = "_scope_1nbe9_25", ua = {
  row: Fv,
  name: jv,
  scope: Wv
};
function zv(e) {
  return e === void 0 ? `${ua.row} ward-toolrow` : `${ua.row} ward-toolrow ${e}`;
}
function Gv(e, a) {
  return e.grant !== "locked" ? { locked: !1 } : { locked: !0, reason: e.reason ?? (a == null ? void 0 : a.lockedReasonFallback) ?? "locked by stream policy" };
}
function Kv({ id: e, reasonId: a, tool: t, state: r, onChange: o }) {
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
function Uv({ classification: e }) {
  return /* @__PURE__ */ n(m, { role: e === "write" ? "write" : "meta", label: e.toUpperCase() });
}
function Vv({ tool: e, state: a, reasonId: t }) {
  const r = a.reason ?? e.scope;
  return /* @__PURE__ */ n("span", { id: a.locked ? t : void 0, className: `${ua.scope} ward-tooldetail ward-truncate`, title: r, children: r });
}
function Yv(e) {
  return (e == null ? void 0 : e.as) === "li" ? "li" : "div";
}
function i1({ tool: e, onChange: a, presentation: t }) {
  const r = k(), o = k(), i = Gv(e, t), c = Yv(t);
  return /* @__PURE__ */ l(c, { className: zv(t == null ? void 0 : t.className), "data-locked": i.locked ? "true" : void 0, children: [
    /* @__PURE__ */ n(Kv, { id: r, reasonId: o, tool: e, state: i, onChange: a }),
    /* @__PURE__ */ n("label", { htmlFor: r, className: `${ua.name} ward-toolname`, children: e.name }),
    /* @__PURE__ */ n(Vv, { tool: e, state: i, reasonId: o }),
    /* @__PURE__ */ n(Uv, { classification: e.classification }),
    i.locked ? /* @__PURE__ */ n(m, { role: "meta", label: "LOCKED" }) : null
  ] });
}
const Jv = "_strip_1qtlf_2", Xv = "_head_1qtlf_10", Qv = "_name_1qtlf_16", Zv = "_chart_1qtlf_24", ef = "_segment_1qtlf_30", af = "_detailedChart_1qtlf_36", nf = "_rail_1qtlf_49", tf = "_section_1qtlf_55", rf = "_label_1qtlf_66", lf = "_note_1qtlf_83", Y = {
  strip: Jv,
  head: Xv,
  name: Qv,
  chart: Zv,
  segment: ef,
  detailedChart: af,
  rail: nf,
  section: tf,
  label: rf,
  note: lf
}, of = "No item in flight to preview.", cf = "This is the view the validation exists for — six adjacent segments, direct-labelled, no legend to lean on.", sf = "The action blue, the navy gate chip, the state colours and every rule stay fixed. A stream owns a colour and a mark — not a theme. Two teams theming the same product produces two products.", Ia = [1, 2, 3, 4, 5, 6], ha = 100;
function df(e, a) {
  return a.has(e) ? Ce(e, "id") : "var(--ward-color-line)";
}
function uf({ draft: e, streams: a }) {
  const t = /* @__PURE__ */ new Set([e.streamStep, ...a.map((r) => r.streamStep)]);
  return /* @__PURE__ */ n("svg", { className: Y.chart, viewBox: "0 0 600 8", preserveAspectRatio: "none", role: "img", "aria-label": "Stream colours in use", children: Ia.map((r, o) => /* @__PURE__ */ n(
    "rect",
    {
      className: Y.segment,
      x: o * ha,
      y: "0",
      width: ha,
      height: "8",
      fill: df(r, t),
      "data-draft": r === e.streamStep ? !0 : void 0
    },
    r
  )) });
}
function hf(e) {
  const a = e.slice(0, Ia.length);
  for (; a.length < Ia.length; ) a.push({ key: "—", name: "unclaimed", streamStep: null });
  return a;
}
function mf({ identities: e }) {
  return /* @__PURE__ */ l("figure", { className: `${Y.detailedChart} ward-appearance-chart`, children: [
    /* @__PURE__ */ n("svg", { viewBox: "0 0 600 40", role: "img", "aria-label": "Overview chart segments", children: e.map((a, t) => /* @__PURE__ */ n(
      "rect",
      {
        x: String(t * ha),
        y: "0",
        width: String(ha),
        height: "40",
        style: { fill: Ce(a.streamStep, "chip") }
      },
      a.key + String(t)
    )) }),
    /* @__PURE__ */ n("figcaption", { className: "ward-seglabels", children: e.map((a, t) => /* @__PURE__ */ n("span", { className: "ward-seglabel", title: a.name, children: a.key }, a.key + String(t))) })
  ] });
}
function Gn(e) {
  return (a) => e == null ? void 0 : e(a);
}
function ea({ label: e, children: a }) {
  const t = k();
  return /* @__PURE__ */ l("section", { className: Y.section, "aria-labelledby": t, children: [
    /* @__PURE__ */ n("h4", { id: t, className: Y.label, children: e }),
    a
  ] });
}
function wf({ sample: e, sampleEmpty: a, draft: t, onOpen: r }) {
  return e === void 0 ? /* @__PURE__ */ n("p", { className: Y.note, children: a ?? of }) : /* @__PURE__ */ n(ga, { item: { ...e, streamStep: va(t.streamStep) }, onOpen: Gn(r), feed: null });
}
function _f({ draft: e }) {
  const a = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("p", { className: Y.head, style: a, children: [
    /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
    /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
    /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
  ] });
}
function vf(e) {
  const a = hf(e.identities ?? [e.draft, ...e.streams]), t = a[0];
  return /* @__PURE__ */ l("div", { className: Y.rail, role: "group", "aria-label": "Appearance", children: [
    /* @__PURE__ */ n(ea, { label: "Board card", children: /* @__PURE__ */ n(wf, { ...e, draft: t }) }),
    /* @__PURE__ */ n(ea, { label: "Streams index row", children: /* @__PURE__ */ n(_f, { draft: t }) }),
    /* @__PURE__ */ l(ea, { label: "Overview chart segment", children: [
      /* @__PURE__ */ n(mf, { identities: a }),
      /* @__PURE__ */ n("p", { className: Y.note, children: cf })
    ] }),
    /* @__PURE__ */ n(ea, { label: "Not themeable", children: /* @__PURE__ */ n("p", { className: Y.note, children: sf }) })
  ] });
}
function ff({ draft: e, sample: a, streams: t, onOpen: r }) {
  const o = { "--stream": Ce(e.streamStep, "id") };
  return /* @__PURE__ */ l("section", { className: Y.strip, "aria-label": "Appearance", style: o, children: [
    /* @__PURE__ */ l("div", { className: Y.head, children: [
      /* @__PURE__ */ n(Se, { size: 8, kind: "stream" }),
      /* @__PURE__ */ n("span", { className: Y.name, children: e.name }),
      /* @__PURE__ */ n(m, { ...fa(e.key, e.streamStep) })
    ] }),
    a === void 0 ? null : /* @__PURE__ */ n(ga, { item: { ...a, streamStep: e.streamStep }, onOpen: Gn(r) }),
    /* @__PURE__ */ n(uf, { draft: e, streams: t })
  ] });
}
function c1(e) {
  return e.presentation === "detailed" ? /* @__PURE__ */ n(vf, { ...e }) : /* @__PURE__ */ n(ff, { ...e });
}
const bf = "_row_ixlg5_6", pf = "_headCell_ixlg5_10", gf = "_cell_ixlg5_11", Nf = "_name_ixlg5_23", yf = "_consequence_ixlg5_29", kf = "_governed_ixlg5_36", $f = "_control_ixlg5_42", Cf = "_byRole_ixlg5_48", Sf = "_webControl_ixlg5_59", Rf = "_webConsequence_ixlg5_65", Tf = "_webGoverned_ixlg5_71", P = {
  row: bf,
  headCell: pf,
  cell: gf,
  name: Nf,
  consequence: yf,
  governed: kf,
  control: $f,
  byRole: Cf,
  webControl: Sf,
  webConsequence: Rf,
  webGoverned: Tf
};
function Lf({
  capability: e,
  cell: a,
  onChange: t
}) {
  return a.value === "byRole" ? /* @__PURE__ */ n("span", { className: P.byRole, children: "by role" }) : /* @__PURE__ */ l("span", { className: P.control, children: [
    /* @__PURE__ */ n(
      qe,
      {
        label: `${e.name} — ${a.stream}`,
        checked: a.value !== "off",
        onChange: (r) => t(a.streamStep, r)
      }
    ),
    a.value === "pilot" && /* @__PURE__ */ n(m, { role: "running", label: "PILOT" })
  ] });
}
function xf({ capability: e, cells: a, onChange: t }) {
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
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Lf, { capability: e, cell: r, onChange: t }) }, r.streamStep))
  ] });
}
function Af(e) {
  return e.ticket === void 0 ? e.governedBy : `${e.governedBy} · ${e.ticket}`;
}
function Ef({ name: e, cell: a, onChange: t }) {
  if (a.value === "byRole") return /* @__PURE__ */ n("span", { className: `${P.webControl} ${P.byRole} ward-envrow`, children: "by role" });
  const r = /* @__PURE__ */ n(
    qe,
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
function qf({ capability: e, cells: a, onChange: t }) {
  return /* @__PURE__ */ l("tr", { className: P.row, children: [
    /* @__PURE__ */ l("td", { className: P.cell, children: [
      /* @__PURE__ */ n("span", { className: P.name, children: e.name }),
      /* @__PURE__ */ n("p", { className: `${P.webConsequence} ward-policy-consequence`, children: e.consequence })
    ] }),
    a.map((r) => /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n(Ef, { name: e.name, cell: r, onChange: t }) }, String(r.streamStep))),
    /* @__PURE__ */ n("td", { className: P.cell, children: /* @__PURE__ */ n("span", { className: `${P.webGoverned} ward-cellmeta`, children: Af(e) }) })
  ] });
}
function s1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(qf, { ...e }) : /* @__PURE__ */ n(xf, { ...e });
}
const If = "_row_vv64h_2", Mf = "_cell_vv64h_6", Bf = "_name_vv64h_25", Pf = "_note_vv64h_30", Df = "_webName_vv64h_41", Of = "_webMeta_vv64h_47", z = {
  row: If,
  cell: Mf,
  name: Bf,
  note: Pf,
  webName: Df,
  webMeta: Of
}, Kn = {
  ready: { role: "done", label: "READY" },
  drainFirst: { role: "attention", label: "DRAIN FIRST" },
  restartDue: { role: "failed", label: "RESTART DUE" }
};
function Hf(e) {
  return e === "drainFirst" ? "Drain & restart" : "Restart";
}
function Ff({ component: e, onRestart: a }) {
  const t = k(), r = Kn[e.state], o = e.state === "drainFirst";
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: z.name, children: e.name }) }),
    /* @__PURE__ */ l("td", { className: z.cell, "data-mono": "true", children: [
      ae(e.pods),
      " pods"
    ] }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { role: r.role, label: r.label }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { id: t, className: z.note, children: e.note }) }),
    /* @__PURE__ */ n("td", { className: z.cell, "data-align": "end", children: o ? /* @__PURE__ */ n(v, { size: "sm", disabled: !0, describedBy: t, children: "Restart" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart" }) })
  ] });
}
function jf({ component: e, onRestart: a }) {
  return a === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: Hf(e.state) });
}
function Wf({ component: e, onRestart: a }) {
  return /* @__PURE__ */ l("tr", { className: z.row, children: [
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webName} ward-toolname`, children: e.name }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n("span", { className: `${z.webMeta} ward-cellmeta ward-truncate`, title: e.note, children: `${e.pods} · ${e.note}` }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(m, { ...Kn[e.state] }) }),
    /* @__PURE__ */ n("td", { className: z.cell, children: /* @__PURE__ */ n(jf, { component: e, onRestart: a }) })
  ] });
}
function d1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Wf, { ...e }) : /* @__PURE__ */ n(Ff, { ...e });
}
const zf = "_row_1f1gp_7", Gf = "_cell_1f1gp_11", Kf = "_next_1f1gp_28", Uf = "_headCell_1f1gp_38", Vf = "_webId_1f1gp_77", Yf = "_webPurpose_1f1gp_83", Jf = "_webMeta_1f1gp_91", Xf = "_webUrgent_1f1gp_97", O = {
  row: zf,
  cell: Gf,
  next: Kf,
  headCell: Uf,
  webId: Vf,
  webPurpose: Yf,
  webMeta: Jf,
  webUrgent: Xf
}, Qf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP OWNED" }
}, Zf = {
  healthy: { role: "done", label: "HEALTHY" },
  rotateSoon: { role: "attention", label: "ROTATE SOON" },
  rotateNow: { role: "failed", label: "ROTATE NOW" },
  idpOwned: { role: "meta", label: "IDP-OWNED" },
  configured: { role: "meta", label: "CONFIGURED" }
}, Un = [
  { key: "purpose", header: "Purpose" },
  { key: "id", header: "Credential", width: 168, mono: !0 },
  { key: "state", header: "State", width: 106 },
  { key: "cls", header: "Class", width: 112 },
  { key: "tier", header: "Tier", width: 124, dropPriority: 2 },
  { key: "next", header: "Next rotation", width: 96, mono: !0, dropPriority: 1 }
], eb = Object.fromEntries(Un.map((e) => [e.key, e]));
function De({ column: e, children: a }) {
  const t = eb[e];
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
function u1() {
  return /* @__PURE__ */ n("tr", { children: Un.map((e) => /* @__PURE__ */ n(
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
function ab({ cred: e }) {
  const a = Qf[e.state];
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n(De, { column: "purpose", children: e.purpose }),
    /* @__PURE__ */ n(De, { column: "id", children: e.id }),
    /* @__PURE__ */ n(De, { column: "state", children: /* @__PURE__ */ n(m, { role: a.role, label: a.label }) }),
    /* @__PURE__ */ n(De, { column: "cls", children: /* @__PURE__ */ n(m, { role: e.cls === "write" ? "write" : "meta", label: e.cls.toUpperCase() }) }),
    /* @__PURE__ */ n(De, { column: "tier", children: e.tier }),
    /* @__PURE__ */ n(De, { column: "next", children: /* @__PURE__ */ n("span", { className: O.next, "data-urgent": e.state === "rotateNow" ? !0 : void 0, children: e.next }) })
  ] });
}
function nb({ cred: e }) {
  return e.state !== "rotateNow" ? /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.next }) : /* @__PURE__ */ n("span", { className: `${O.webMeta} ${O.webUrgent} ward-cellmeta ward-redink`, style: { color: "var(--ward-color-red)" }, children: e.next });
}
function tb({ cred: e }) {
  return /* @__PURE__ */ l("tr", { className: O.row, children: [
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webId} ward-toolname`, children: e.id }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webPurpose} ward-resfield-value ward-truncate`, title: e.purpose, children: e.purpose }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { role: e.cls.includes("WRITE") ? "write" : "meta", label: e.cls }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n("span", { className: `${O.webMeta} ward-cellmeta`, children: e.tier }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(nb, { cred: e }) }),
    /* @__PURE__ */ n("td", { className: O.cell, children: /* @__PURE__ */ n(m, { ...Zf[e.state] }) })
  ] });
}
function h1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(tb, { ...e }) : /* @__PURE__ */ n(ab, { ...e });
}
const rb = "_card_17zba_2", lb = "_head_17zba_11", ob = "_env_17zba_18", ib = "_version_17zba_25", cb = "_meta_17zba_32", sb = "_webCard_17zba_37", db = "_webRow_17zba_47", ub = "_webTitle_17zba_55", hb = "_webLine_17zba_65", mb = "_webVersion_17zba_72", wb = "_webMeta_17zba_77", W = {
  card: rb,
  head: lb,
  env: ob,
  version: ib,
  meta: cb,
  webCard: sb,
  webRow: db,
  webTitle: ub,
  webLine: hb,
  webVersion: mb,
  webMeta: wb
}, Vn = {
  current: { role: "done", label: "CURRENT" },
  soaking: { role: "running", label: "SOAKING" },
  live: { role: "done", label: "LIVE" }
};
function _b({ env: e }) {
  const a = Vn[e.state], t = [e.by, e.ticket].filter(Boolean).join(" · ");
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
function vb(e) {
  const a = e.by !== void 0 ? `promoted by ${e.by}` : null;
  return [re(e.deployedAt), a, e.ticket].filter((t) => t !== null).join(" · ");
}
function fb(e) {
  return /* @__PURE__ */ l("article", { className: `${W.webCard} ward-envcard`, children: [
    /* @__PURE__ */ l("span", { className: `${W.webRow} ward-envrow`, children: [
      /* @__PURE__ */ n("span", { className: `${W.webTitle} ward-stagecol-title`, children: e.env }),
      /* @__PURE__ */ n(m, { ...Vn[e.state] })
    ] }),
    /* @__PURE__ */ n("span", { className: `${W.version} ${W.webVersion} ${W.webLine} ward-envmeta`, children: e.version }),
    /* @__PURE__ */ n("span", { className: `${W.meta} ${W.webMeta} ${W.webLine} ward-cellmeta`, children: vb(e) })
  ] });
}
function m1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(fb, { ...e }) : /* @__PURE__ */ n(_b, { ...e });
}
const bb = "_upload_erepj_2", pb = "_preview_erepj_7", gb = "_mark_erepj_17", Nb = "_empty_erepj_22", yb = "_actions_erepj_28", kb = "_input_erepj_33", $b = "_reasons_erepj_41", Cb = "_reason_erepj_41", Sb = "_accepted_erepj_57", X = {
  upload: bb,
  preview: pb,
  mark: gb,
  empty: Nb,
  actions: yb,
  input: kb,
  reasons: $b,
  reason: Cb,
  accepted: Sb
}, Yn = 1.5, Jn = 22, Ye = ["multiple fills", "embedded rasters", "text elements", `a stroke under ${Yn}px at ${Jn}px`];
function Rb() {
  return { ok: !1, reasons: [Ye[1]] };
}
function Tb(e) {
  try {
    return new DOMParser().parseFromString(e, "image/svg+xml").querySelector("svg");
  } catch {
    return null;
  }
}
function Lb(e) {
  return new Set(
    Array.from(e.querySelectorAll("[fill]")).map((t) => t.getAttribute("fill") ?? "").filter((t) => t !== "" && t !== "none")
  ).size > 1 ? [Ye[0]] : [];
}
function xb(e, a) {
  const t = [];
  return e.querySelector("image") !== null && t.push(Ye[1]), e.querySelector("text") !== null && t.push(Ye[2]), (e.querySelector("script, foreignObject") !== null || /on[a-z]+\s*=/i.test(a)) && t.push("script elements or event handlers"), t;
}
function Ab(e) {
  const a = (e.getAttribute("viewBox") ?? "").split(/[\s,]+/).map(Number), t = Math.max(...a.filter((o) => Number.isFinite(o) && o > 0), 0), r = t > 0 ? Jn / t : 1;
  return Array.from(e.querySelectorAll("[stroke-width]")).some((o) => {
    const i = Number(o.getAttribute("stroke-width"));
    return Number.isFinite(i) && i * r < Yn;
  }) ? [Ye[3]] : [];
}
function w1(e) {
  const a = Tb(e);
  if (a === null) return Rb();
  const t = [...Lb(a), ...xb(a, e), ...Ab(a)];
  return t.length === 0 ? { ok: !0, svg: e } : { ok: !1, reasons: t };
}
const Eb = "Mark accepted.";
function qb({ current: e }) {
  const a = e ? `data:image/svg+xml;utf8,${encodeURIComponent(e.svg)}` : void 0;
  return /* @__PURE__ */ n("div", { className: X.preview, style: { "--mark": e == null ? void 0 : e.colour }, children: a ? /* @__PURE__ */ n("img", { className: X.mark, src: a, alt: "Current mark" }) : /* @__PURE__ */ n("span", { className: X.empty }) });
}
function Ib(e, a) {
  const t = e === null ? "idle" : e.ok ? "accepted" : "rejected";
  return a.classNames[t];
}
function Mb(e, a) {
  return e === null ? a.idle : e.ok ? a.accepted : a.rejected(e.reasons);
}
function Bb({ result: e }) {
  return e === null ? /* @__PURE__ */ n("div", { className: X.result, role: "status" }) : e.ok && e.reasons.length === 0 ? /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("p", { className: X.accepted, children: Eb }) }) : /* @__PURE__ */ n("div", { className: X.result, role: "status", children: /* @__PURE__ */ n("ul", { className: X.reasons, "data-rejected": e.ok ? void 0 : !0, children: e.reasons.map((a) => /* @__PURE__ */ n("li", { className: X.reason, children: a }, a)) }) });
}
function Pb({ result: e, presentation: a }) {
  const t = a == null ? void 0 : a.status;
  return t === void 0 ? /* @__PURE__ */ n(Bb, { result: e }) : /* @__PURE__ */ n("p", { className: `${X.result} ${Ib(e, t)}`, role: "status", children: Mb(e, t) });
}
function _1({ current: e, onUpload: a, onUseInitials: t, presentation: r }) {
  const o = N(null), [i, c] = g(null), s = (u) => {
    if (u === void 0) return;
    const d = a(u);
    d instanceof Promise ? d.then(c) : c(d);
  };
  return /* @__PURE__ */ l("div", { className: X.upload, children: [
    /* @__PURE__ */ n(qb, { current: e }),
    /* @__PURE__ */ l("div", { className: X.actions, children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: o,
          className: X.input,
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
    /* @__PURE__ */ n(Pb, { result: i, presentation: r })
  ] });
}
const Db = "_row_1wp9s_7", Ob = "_cell_1wp9s_11", Hb = "_head_1wp9s_28", Fb = "_name_1wp9s_34", jb = "_pinned_1wp9s_42", Wb = "_headCell_1wp9s_49", zb = "_webName_1wp9s_88", Gb = "_webMeta_1wp9s_95", Kb = "_webWarn_1wp9s_103", q = {
  row: Db,
  cell: Ob,
  head: Hb,
  name: Fb,
  pinned: jb,
  headCell: Wb,
  webName: zb,
  webMeta: Gb,
  webWarn: Kb
}, Ga = {
  healthy: { role: "done", label: "HEALTHY" },
  degraded: { role: "attention", label: "DEGRADED" },
  failed: { role: "failed", label: "FAILED" },
  unknown: { role: "pending", label: "UNKNOWN" }
}, Xn = [
  { key: "name", header: "Server", width: 196 },
  { key: "connection", header: "Connection", width: 120 },
  { key: "transport", header: "Transport", width: 118, mono: !0 },
  { key: "credentialId", header: "Credential", width: 108, mono: !0, dropPriority: 2 },
  { key: "tools", header: "Tools", mono: !0, dropPriority: 1 }
], Ub = Object.fromEntries(Xn.map((e) => [e.key, e]));
function Vb(e, a) {
  return `mcp.${e}.${a}`;
}
function Yb(e) {
  return Object.keys(Ga).includes(e);
}
function Jb(e) {
  return Ga[e !== void 0 && Yb(e) ? e : "unknown"];
}
function Ge({ column: e, children: a }) {
  const t = Ub[e];
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
function v1() {
  return /* @__PURE__ */ n("tr", { children: Xn.map((e) => /* @__PURE__ */ n(
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
function Xb({ server: e }) {
  const a = Ga[e.connection];
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
    /* @__PURE__ */ n(Ge, { column: "tools", children: e.tools.map((t) => Vb(e.name, t)).join(" · ") })
  ] });
}
function Qb(e) {
  return `${e.transport ?? ""} · ${e.credential_id ?? ""}`;
}
function Zb(e) {
  var a;
  return (((a = e.write_tools) == null ? void 0 : a.length) ?? 0) > 0 ? { role: "write", label: "WRITE CLASS" } : { role: "meta", label: "READ ONLY" };
}
function ep({ pinned: e }) {
  return e === null ? /* @__PURE__ */ n("span", { className: `${q.webWarn} ward-warnink`, children: "unpinned" }) : /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: e });
}
function ap({ server: e, onRestart: a }) {
  var t;
  return a === void 0 ? null : ((t = e.restart) == null ? void 0 : t.implemented) !== !0 ? /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: "Restart unavailable — no supervisor configured" }) : /* @__PURE__ */ n(v, { size: "sm", onClick: () => a(e.name), children: "Restart server" });
}
function np({ name: e, pinned: a, onPin: t }) {
  return a !== null || t === void 0 ? null : /* @__PURE__ */ n(v, { size: "sm", onClick: () => t(e), children: "Pin version" });
}
function tp({ server: e, onRestart: a, onPin: t }) {
  const r = e.pinned_version ?? null, o = e.tools ?? [];
  return /* @__PURE__ */ l("tr", { className: q.row, children: [
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n("span", { className: `${q.webName} ward-toolname`, children: e.name }),
      /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta`, children: Qb(e) })
    ] }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n("span", { className: `${q.webMeta} ward-cellmeta ward-truncate`, title: o.map((i) => i.tool).join(", "), children: `${o.length} discovered` }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Zb(e) }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(ep, { pinned: r }) }),
    /* @__PURE__ */ n("td", { className: q.cell, children: /* @__PURE__ */ n(m, { ...Jb(e.connection) }) }),
    /* @__PURE__ */ l("td", { className: q.cell, children: [
      /* @__PURE__ */ n(ap, { server: e, onRestart: a }),
      /* @__PURE__ */ n(np, { name: e.name, pinned: r, onPin: t })
    ] })
  ] });
}
function f1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(tp, { ...e }) : /* @__PURE__ */ n(Xb, { ...e });
}
const rp = "_row_1h9nq_2", lp = "_headCell_1h9nq_14", op = "_cell_1h9nq_15", ip = "_name_1h9nq_26", cp = "_consequence_1h9nq_32", sp = "_reason_1h9nq_38", dp = "_value_1h9nq_44", up = "_webRow_1h9nq_60", hp = "_webSetting_1h9nq_71", mp = "_webName_1h9nq_79", wp = "_webConsequence_1h9nq_87", _p = "_webControl_1h9nq_93", vp = "_webState_1h9nq_106", fp = "_webChip_1h9nq_111", T = {
  row: rp,
  headCell: lp,
  cell: op,
  name: ip,
  consequence: cp,
  reason: sp,
  value: dp,
  webRow: up,
  webSetting: hp,
  webName: mp,
  webConsequence: wp,
  webControl: _p,
  webState: vp,
  webChip: fp
}, Qn = 104, Zn = {
  inherited: { role: "meta", label: "INHERITED" },
  overridden: { role: "running", label: "OVERRIDDEN" },
  locked: { role: "meta", label: "LOCKED" },
  derived: { role: "soft", label: "DERIVED" }
};
function bp({ control: e, name: a, locked: t, describedBy: r }) {
  return e.kind === "switch" ? /* @__PURE__ */ n(qe, { label: a, checked: e.checked, locked: t || void 0, onChange: e.onChange, describedBy: r }) : e.kind === "segment" ? /* @__PURE__ */ n(gn, { label: a, options: e.options, value: e.value, onChange: e.onChange, disabled: t, describedBy: r }) : /* @__PURE__ */ n("span", { className: T.value, "data-locked": t ? !0 : void 0, children: e.text });
}
function pp({ setting: e, control: a, inheritance: t, reason: r }) {
  if (t === "locked" && !r) throw new Error("PolicyRow: a locked setting must say why in the row");
  const o = k(), i = Zn[t], c = t === "locked";
  return /* @__PURE__ */ l("tr", { className: T.row, "data-inheritance": t, children: [
    /* @__PURE__ */ l("th", { scope: "row", className: T.headCell, children: [
      /* @__PURE__ */ n("span", { className: T.name, children: e.name }),
      /* @__PURE__ */ n("span", { className: T.consequence, children: e.consequence }),
      r && /* @__PURE__ */ n("span", { id: o, className: T.reason, children: r })
    ] }),
    /* @__PURE__ */ n("td", { className: T.cell, children: /* @__PURE__ */ n(bp, { control: a, name: e.name, locked: c, describedBy: c ? o : void 0 }) }),
    /* @__PURE__ */ n("td", { className: T.cell, style: { width: Qn }, children: /* @__PURE__ */ n(m, { role: i.role, label: i.label }) })
  ] });
}
function et(e, a) {
  return String(e ?? a);
}
function gp(e, a) {
  return e.kind === "segment" && !a ? e.options : void 0;
}
function Np(e) {
  var t;
  const a = e.kind === "segment" ? (t = e.options) == null ? void 0 : t.find((r) => r.value === e.value) : void 0;
  return (a == null ? void 0 : a.label) ?? et(e.value, "—");
}
function yp({ control: e, name: a, locked: t, describedBy: r, onChange: o }) {
  const i = e.value === !0;
  return /* @__PURE__ */ l("span", { className: T.webControl, children: [
    /* @__PURE__ */ n(qe, { label: a, labelHidden: !0, checked: i, locked: t, describedBy: r, onChange: (c) => o == null ? void 0 : o(c) }),
    /* @__PURE__ */ n("span", { className: T.webState, "aria-hidden": "true", children: t || i ? "on" : "off" })
  ] });
}
function kp(e) {
  const { control: a, locked: t, onChange: r } = e;
  if (a.kind === "switch") return /* @__PURE__ */ n(yp, { ...e });
  const o = gp(a, t);
  return o !== void 0 ? /* @__PURE__ */ n("span", { className: T.webControl, "data-kind": "segment", children: /* @__PURE__ */ n(gn, { options: o, value: et(a.value, ""), onChange: (i) => r == null ? void 0 : r(i) }) }) : /* @__PURE__ */ n("span", { className: `${T.webControl} ${T.value} ward-envmeta`, "data-locked": t ? !0 : void 0, children: Np(a) });
}
function $p({ setting: e, control: a, inheritance: t, reason: r, onChange: o, renderControl: i }) {
  const c = k(), s = t === "locked";
  return /* @__PURE__ */ l("div", { className: `${T.row} ${T.webRow} ward-policyrow`, "data-inheritance": t, children: [
    /* @__PURE__ */ l("span", { className: T.webSetting, children: [
      /* @__PURE__ */ n("span", { className: `${T.name} ${T.webName}`, children: e.name }),
      /* @__PURE__ */ l("p", { id: c, className: `${T.webConsequence} ward-policy-consequence`, children: [
        e.consequence,
        r !== void 0 ? " " + r : null
      ] })
    ] }),
    i ? /* @__PURE__ */ n("span", { className: T.webControl, children: i(c) }) : /* @__PURE__ */ n(kp, { control: a, name: e.name, locked: s, describedBy: s ? c : void 0, onChange: o }),
    /* @__PURE__ */ n("span", { className: `${T.webChip} ward-policy-chip`, style: { width: Qn }, children: /* @__PURE__ */ n(m, { ...Zn[t], size: "tag" }) })
  ] });
}
function b1(e) {
  return "presentation" in e ? /* @__PURE__ */ n($p, { ...e }) : /* @__PURE__ */ n(pp, { ...e });
}
const Cp = "_label_1o9za_7", Sp = "_name_1o9za_15", Rp = "_column_1o9za_24", Tp = "_webFrame_1o9za_57", Lp = "_webHead_1o9za_62", xp = "_webHeadLabel_1o9za_74", Ap = "_webLabel_1o9za_112", Ep = "_webColumns_1o9za_119", qp = "_webGroup_1o9za_125", Ip = "_webPeople_1o9za_126", Mp = "_webVia_1o9za_127", Bp = "_webMeta_1o9za_156", H = {
  label: Cp,
  name: Sp,
  column: Rp,
  webFrame: Tp,
  webHead: Lp,
  webHeadLabel: xp,
  webLabel: Ap,
  webColumns: Ep,
  webGroup: qp,
  webPeople: Ip,
  webVia: Mp,
  webMeta: Bp
}, Pp = {
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
function Dp(e) {
  if (!e.matrixRole) return;
  const a = Pp[e.matrixRole];
  if (!a) throw new Error(`RoleMatrixRow: '${e.matrixRole}' is not a Trellis role`);
  return a;
}
function Op({ node: e }) {
  const a = Dp(e);
  return /* @__PURE__ */ l("span", { className: H.label, children: [
    /* @__PURE__ */ n("span", { className: H.name, children: e.name }),
    /* @__PURE__ */ n(Hp, { role: a, node: e }),
    /* @__PURE__ */ n(Ra, { column: Sa[0], children: e.adGroup ?? "" }),
    /* @__PURE__ */ n(Ra, { column: Sa[1], children: e.people === void 0 ? "" : ae(e.people) }),
    /* @__PURE__ */ n(Ra, { column: Sa[2], children: e.requestedVia ?? "" })
  ] });
}
function Hp({ role: e, node: a }) {
  return /* @__PURE__ */ l(x, { children: [
    e && /* @__PURE__ */ n(m, { role: e.role, label: e.label }),
    a.floor && /* @__PURE__ */ n(m, { role: "soft", label: "FLOOR" }),
    a.unresolved && /* @__PURE__ */ n(m, { role: "warn", label: "UNRESOLVED" })
  ] });
}
function Fp({ index: e, depth: a, node: t, expanded: r, leaf: o, onToggle: i, children: c }) {
  return /* @__PURE__ */ n(
    $n,
    {
      index: e,
      depth: a,
      leaf: o,
      expanded: r,
      onToggle: i,
      unresolved: t.unresolved,
      inherited: t.inherited,
      label: /* @__PURE__ */ n(Op, { node: t }),
      children: c
    }
  );
}
function Ta({ className: e, text: a }) {
  return /* @__PURE__ */ n("span", { className: e, title: a, children: a });
}
function jp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webColumns} ward-rolecols`, children: [
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webGroup} ward-cellmeta ward-truncate`, text: e.group ?? "—" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webPeople} ward-rolepeople ward-truncate`, text: e.people ?? "" }),
    /* @__PURE__ */ n(Ta, { className: `${H.webMeta} ${H.webVia} ward-cellmeta ward-truncate`, text: e.requestedVia ?? "" })
  ] });
}
function Wp() {
  return /* @__PURE__ */ l("div", { className: H.webHead, "aria-hidden": "true", children: [
    /* @__PURE__ */ n("span", { className: H.webHeadLabel, children: "Scope → role → person" }),
    /* @__PURE__ */ l("span", { className: H.webColumns, children: [
      /* @__PURE__ */ n("span", { className: H.webGroup, children: "AD group" }),
      /* @__PURE__ */ n("span", { className: H.webPeople, children: "People" }),
      /* @__PURE__ */ n("span", { className: H.webVia, children: "Requested via" })
    ] })
  ] });
}
function zp({ row: e }) {
  return /* @__PURE__ */ l("span", { className: `${H.webLabel} ward-envrow`, children: [
    /* @__PURE__ */ n("span", { children: e.label }),
    e.role !== void 0 ? /* @__PURE__ */ n(m, { role: e.role.role, label: e.role.label }) : null,
    e.state === "floor" ? /* @__PURE__ */ n(m, { role: "meta", label: "implicit floor" }) : null
  ] });
}
function Gp(e) {
  return e.expanded ?? (e.leaf === !0 ? void 0 : !1);
}
function Kp({ rows: e, label: a }) {
  return /* @__PURE__ */ l("div", { className: H.webFrame, "data-ward-rolematrix": "", children: [
    /* @__PURE__ */ n(Wp, {}),
    /* @__PURE__ */ n(sc, { label: a ?? "Role matrix", children: e.map((t, r) => /* @__PURE__ */ n(
      $n,
      {
        depth: t.depth,
        label: /* @__PURE__ */ n(zp, { row: t }),
        detail: /* @__PURE__ */ n(jp, { row: t }),
        expanded: Gp(t),
        leaf: t.leaf === !0,
        unresolved: t.state === "unresolved",
        inherited: t.state === "inherited",
        index: r
      },
      t.label + String(r)
    )) })
  ] });
}
function p1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(Kp, { ...e }) : /* @__PURE__ */ n(Fp, { ...e });
}
const Up = "_runbook_b9agc_2", Vp = "_list_b9agc_7", Yp = "_step_b9agc_15", Jp = "_numeral_b9agc_21", Xp = "_body_b9agc_28", Qp = "_head_b9agc_34", Zp = "_title_b9agc_40", eg = "_detail_b9agc_45", ag = "_actions_b9agc_50", ng = "_webList_b9agc_56", tg = "_webStep_b9agc_60", rg = "_webBody_b9agc_66", lg = "_webTitle_b9agc_74", og = "_webDetail_b9agc_78", S = {
  runbook: Up,
  list: Vp,
  step: Yp,
  numeral: Jp,
  body: Xp,
  head: Qp,
  title: Zp,
  detail: eg,
  actions: ag,
  webList: ng,
  webStep: tg,
  webBody: rg,
  webTitle: lg,
  webDetail: og
}, at = {
  done: { role: "done", label: "DONE" },
  running: { role: "running", label: "RUNNING" },
  pending: { role: "pending", label: "PENDING" }
};
function nt(e) {
  return String(e + 1).padStart(2, "0");
}
function ig({ step: e, index: a, connection: t }) {
  const r = at[e.state], o = e.state === "running";
  return /* @__PURE__ */ l("li", { className: S.step, "aria-current": o ? "step" : void 0, children: [
    /* @__PURE__ */ n("span", { className: S.numeral, children: nt(a) }),
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
function cg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: S.list, children: e.map((r, o) => /* @__PURE__ */ n(ig, { step: r, index: o, connection: t }, r.title)) }),
    a && /* @__PURE__ */ n("div", { className: S.actions, children: a })
  ] });
}
function sg({ step: e, index: a, connection: t }) {
  return /* @__PURE__ */ l("li", { className: `${S.step} ${S.webStep} ward-runbook-step`, children: [
    /* @__PURE__ */ n("span", { className: `${S.numeral} ward-runbook-num`, style: { color: "var(--ward-color-muted)" }, children: nt(a) }),
    /* @__PURE__ */ l("span", { className: `${S.body} ${S.webBody}`, children: [
      /* @__PURE__ */ l("span", { className: `${S.head} ward-envrow`, children: [
        /* @__PURE__ */ n("span", { className: `${S.title} ${S.webTitle}`, children: e.title }),
        /* @__PURE__ */ n(m, { ...at[e.state] }),
        e.state === "running" && e.startedAt !== void 0 ? /* @__PURE__ */ n(ge, { startedAt: e.startedAt, connection: t }) : null
      ] }),
      /* @__PURE__ */ n("span", { className: `${S.detail} ${S.webDetail} ward-runbook-detail`, children: e.detail })
    ] })
  ] });
}
function dg({ steps: e, actions: a, connection: t = "live" }) {
  return /* @__PURE__ */ l("div", { className: S.runbook, children: [
    /* @__PURE__ */ n("ol", { className: `${S.list} ${S.webList} ward-runbook`, children: e.map((r, o) => /* @__PURE__ */ n(sg, { step: r, index: o, connection: t }, r.title)) }),
    a !== void 0 ? /* @__PURE__ */ n("span", { className: `${S.actions} ward-clarity-actions`, children: a }) : null
  ] });
}
function g1(e) {
  return "presentation" in e ? /* @__PURE__ */ n(dg, { ...e }) : /* @__PURE__ */ n(cg, { ...e });
}
const ug = "_list_1gu6a_2", hg = "_check_1gu6a_10", mg = "_body_1gu6a_16", wg = "_text_1gu6a_23", _g = "_pending_1gu6a_32", vg = "_measured_1gu6a_37", He = {
  list: ug,
  check: hg,
  body: mg,
  text: wg,
  pending: _g,
  measured: vg
};
function fg(e) {
  return e === null ? { state: "unmet", label: "pending" } : e ? { state: "met", label: "passed" } : { state: "failed", label: "failed" };
}
function bg({ check: e }) {
  const a = fg(e.passed);
  return /* @__PURE__ */ l("li", { className: `${He.check} ward-checklist-item`, "data-pending": e.passed === null ? !0 : void 0, children: [
    /* @__PURE__ */ n(Ha, { state: a.state, label: a.label }),
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
function N1({ checks: e }) {
  return /* @__PURE__ */ n("ul", { className: `${He.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(bg, { check: a }, a.text)) });
}
const pg = "_root_16pdz_2", gg = "_list_16pdz_9", Ng = "_line_16pdz_16", yg = "_at_16pdz_43", kg = "_text_16pdz_47", $g = "_foot_16pdz_51", Cg = "_idle_16pdz_62", Sg = "_caret_16pdz_69", Rg = "_jump_16pdz_76", fe = {
  root: pg,
  list: gg,
  line: Ng,
  at: yg,
  text: kg,
  foot: $g,
  idle: Cg,
  caret: Sg,
  jump: Rg
}, Tg = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: !1
});
function Ka(e) {
  return Number.isNaN(Date.parse(e)) ? "" : Tg.format(new Date(e));
}
const Lg = { warn: "warning", ok: "ok" };
function xg({ kind: e }) {
  const a = Lg[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function Ag({ at: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { children: `last event ${Ka(e)}` });
}
function Eg({ connection: e, idleSince: a, last: t, children: r }) {
  const o = [a, t == null ? void 0 : t.at, ""].find(Boolean), i = {
    stale: `no new events — as of ${Ka(o)}`,
    live: "waiting for the next event…",
    reconnecting: "waiting for the next event…"
  }[e];
  return /* @__PURE__ */ l("p", { className: `${fe.foot} ward-consline ward-consline--dim`, children: [
    /* @__PURE__ */ n("span", { className: `${fe.caret} ward-caret`, "aria-hidden": "true" }),
    /* @__PURE__ */ n("span", { className: fe.idle, children: i }),
    /* @__PURE__ */ n(Ag, { at: t == null ? void 0 : t.at }),
    r
  ] });
}
function y1({ lines: e, connection: a, idleSince: t, label: r = "Live activity" }) {
  const o = N(null), [i, c] = g(0), s = e.at(-1);
  E(() => {
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
      /* @__PURE__ */ n("span", { className: fe.at, children: Ka(d.at) }),
      /* @__PURE__ */ n(xg, { kind: d.kind }),
      /* @__PURE__ */ n("span", { className: fe.text, "data-consline-text": !0, tabIndex: -1, children: d.text })
    ] }, `${d.at}-${h}`)) }),
    /* @__PURE__ */ n(Eg, { connection: a, idleSince: t, last: s, children: /* @__PURE__ */ n("button", { type: "button", className: `${fe.jump} ward-consjump`, onClick: u, children: "Jump to latest" }) })
  ] });
}
const qg = "_row_11jhe_2", Ig = "_head_11jhe_14", Mg = "_author_11jhe_20", Bg = "_eta_11jhe_25", Pg = "_edited_11jhe_26", Dg = "_body_11jhe_32", Og = "_reason_11jhe_37", Hg = "_actions_11jhe_42", _e = {
  row: qg,
  head: Ig,
  author: Mg,
  eta: Bg,
  edited: Pg,
  body: Dg,
  reason: Og,
  actions: Hg
}, Fg = {
  queued: { role: "running", label: "QUEUED" },
  delivered: { role: "done", label: "DELIVERED" },
  retrying: { role: "attention", label: "RETRYING" },
  failed: { role: "failed", label: "FAILED" }
};
function jg(e) {
  return {
    queued: `Still in the outbox — editing replaces the queued row and recomputes req_hash, so ${e} receives one comment, not two.`,
    delivered: `Already in ${e}, so an edit is a ${e} edit: it will show as edited by you there, and the original stays in the audit row.`,
    retrying: `Edit is unavailable mid-flight: a delivery may already have reached ${e}. Cancel first, then edit.`,
    failed: "Delivery failed — edit and resend, or cancel the delivery."
  };
}
function Wg({ comment: e, reasonId: a, onEdit: t, onWithdraw: r, onCancelDelivery: o, onViewOriginal: i }) {
  return e.delivery === "queued" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] }) : e.delivery === "delivered" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t, children: "Edit" }),
    e.originalId !== void 0 ? /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: i, children: "View original" }) : null
  ] }) : e.delivery === "retrying" ? /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: o, children: "Cancel delivery" })
  ] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "secondary", size: "sm", onClick: t, children: "Edit" }),
    /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: r, children: "Withdraw" })
  ] });
}
function zg({ reason: e, reasonId: a }) {
  return /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: a, children: "Edit" }),
    /* @__PURE__ */ n("span", { className: _e.reason, id: a, children: e })
  ] });
}
function Gg(e) {
  if (e.unavailable === void 0 && e.onEdit === void 0)
    throw new Error("ClarificationRow: an editable comment needs onEdit, or must say why editing is unavailable");
}
function Kg(e) {
  return e.unavailable === void 0 ? /* @__PURE__ */ n(Wg, { ...e }) : /* @__PURE__ */ n(zg, { reason: e.unavailable, reasonId: e.unavailableId });
}
function k1(e) {
  const { comment: a } = e;
  Gg(e);
  const t = k(), r = `${t}-unavailable`, o = Fg[a.delivery];
  return /* @__PURE__ */ l("div", { className: `${_e.row} ward-clarityrow`, "data-delivery": a.delivery, "data-queued": a.delivery === "queued" ? "true" : void 0, children: [
    /* @__PURE__ */ l("div", { className: _e.head, children: [
      /* @__PURE__ */ n("span", { className: _e.author, children: a.author }),
      /* @__PURE__ */ n(m, { role: o.role, label: o.label }),
      /* @__PURE__ */ n("span", { className: _e.eta, children: a.etaOrAttempt }),
      a.editedAt !== void 0 ? /* @__PURE__ */ n("span", { className: _e.edited, children: "edited " + a.editedAt }) : null
    ] }),
    /* @__PURE__ */ n("p", { className: _e.body, children: a.body }),
    /* @__PURE__ */ n("p", { className: _e.reason, id: t, children: jg(e.tracker ?? "Jira")[a.delivery] }),
    /* @__PURE__ */ n("div", { className: _e.actions, children: /* @__PURE__ */ n(Kg, { ...e, reasonId: t, unavailableId: r }) })
  ] });
}
const Ug = "_root_c46wj_2", Vg = "_attach_c46wj_11", Yg = "_actions_c46wj_17", Jg = "_reply_c46wj_23", Xg = "_replyRow_c46wj_28", Qg = "_sendsAs_c46wj_42", je = {
  root: Ug,
  attach: Vg,
  actions: Yg,
  reply: Jg,
  replyRow: Xg,
  sendsAs: Qg
};
function Zg({ placeholder: e, asUser: a, onPost: t }) {
  const [r, o] = g(""), i = k();
  return /* @__PURE__ */ l("div", { className: je.reply, "data-ward-composer": "reply", children: [
    /* @__PURE__ */ l("div", { className: je.replyRow, children: [
      /* @__PURE__ */ n(A, { variant: "reply", labelHidden: !0, placeholder: e, label: e, value: r, onChange: o, describedBy: i }),
      /* @__PURE__ */ n(v, { variant: "ghost", describedBy: i, onClick: () => t(a, r), children: "Send" })
    ] }),
    /* @__PURE__ */ n("p", { id: i, className: je.sendsAs, children: `Sends as ${a}.` })
  ] });
}
function $1(e) {
  return e.variant === "reply" ? /* @__PURE__ */ n(Zg, { ...e }) : /* @__PURE__ */ n(eN, { ...e });
}
function eN({ placeholder: e, asUser: a, attachTo: t, requeueAfter: r, onPost: o, onDraft: i }) {
  const [c, s] = g("");
  return /* @__PURE__ */ l("div", { className: je.root, children: [
    /* @__PURE__ */ n(A, { kind: "textarea", label: e, value: c, onChange: s }),
    t && /* @__PURE__ */ l("div", { className: je.attach, children: [
      /* @__PURE__ */ n(m, { role: "soft", label: t.label }),
      /* @__PURE__ */ n(v, { variant: "ghost", size: "sm", onClick: t.onChange, children: "Change" })
    ] }),
    r && /* @__PURE__ */ n(
      pn,
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
const aN = "_list_1ih9e_2", nN = "_item_1ih9e_6", tN = "_body_1ih9e_22", rN = "_text_1ih9e_28", lN = "_evidence_1ih9e_37", oN = "_consequence_1ih9e_49", iN = "_note_1ih9e_54", Ee = {
  list: aN,
  item: nN,
  body: tN,
  text: rN,
  evidence: lN,
  consequence: oN,
  note: iN
};
function cN({ criterion: e }) {
  return /* @__PURE__ */ n(Se, { size: 14, kind: e.met ? "tick" : "box", label: e.met ? "met" : "unmet" });
}
function mn({ text: e }) {
  return /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: e });
}
function sN(e) {
  return e ? `${e} — keeps the item held` : "keeps the item held";
}
function dN({ criterion: e }) {
  return /* @__PURE__ */ l("span", { className: Ee.body, children: [
    /* @__PURE__ */ n("span", { className: Ee.text, children: e.text }),
    e.evidence ? /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(mn, { text: " — " }),
      /* @__PURE__ */ n("code", { className: Ee.evidence, title: e.evidence, children: e.evidence })
    ] }) : null,
    e.met ? null : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ n(mn, { text: " · " }),
      /* @__PURE__ */ n("span", { className: Ee.consequence, children: sN(e.why) })
    ] })
  ] });
}
function uN({ criterion: e }) {
  return /* @__PURE__ */ l("li", { className: Ee.item, "data-met": e.met, role: "checkbox", "aria-checked": e.met, "aria-disabled": "true", children: [
    /* @__PURE__ */ n(cN, { criterion: e }),
    /* @__PURE__ */ n(dN, { criterion: e })
  ] });
}
function C1({ criteria: e }) {
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ n("ul", { className: `${Ee.list} ward-checklist`, children: e.map((a) => /* @__PURE__ */ n(uN, { criterion: a }, a.text)) }),
    e.some((a) => !a.met) ? /* @__PURE__ */ n("p", { className: Ee.note, children: "A criterion with no evidence keeps the item held — nothing advances until it has evidence or a human overrides it on the record." }) : null
  ] });
}
const hN = "_list_dwhoz_2", mN = "_rung_dwhoz_6", wN = "_name_dwhoz_18", _N = "_actor_dwhoz_32", ta = {
  list: hN,
  rung: mN,
  name: wN,
  actor: _N
}, vN = {
  passed: { role: "done", label: "PASSED" },
  waiting: { role: "attention", label: "WAITING" },
  pending: { role: "pending", label: "PENDING" }
};
function fN({ rung: e }) {
  if (e.state === "waiting" && !e.actor)
    throw new Error(`GateLadder: the waiting rung "${e.name}" names no actor — a wait always names who it waits on`);
  const a = vN[e.state];
  return /* @__PURE__ */ l("li", { className: ta.rung, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: ta.name, children: e.name }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label }),
    /* @__PURE__ */ n("span", { className: `${ta.actor} ward-cellmeta`, children: e.actor ?? "—" })
  ] });
}
function S1({ rungs: e }) {
  return /* @__PURE__ */ n("ol", { className: `${ta.list} ward-gateladder`, children: e.map((a) => /* @__PURE__ */ n(fN, { rung: a }, a.name)) });
}
const bN = "_sheet_1fqco_2", pN = "_title_1fqco_9", gN = "_stage_1fqco_15", NN = "_effects_1fqco_20", yN = "_effect_1fqco_20", kN = "_numeral_1fqco_31", $N = "_effectText_1fqco_38", CN = "_refusals_1fqco_43", SN = "_reasons_1fqco_52", RN = "_reason_1fqco_52", TN = "_actions_1fqco_62", ce = {
  sheet: bN,
  title: pN,
  stage: gN,
  effects: NN,
  effect: yN,
  numeral: kN,
  effectText: $N,
  refusals: CN,
  reasons: SN,
  reason: RN,
  actions: TN
};
function LN({ refused: e, reasonId: a, note: t, onRequeue: r }) {
  return e ? /* @__PURE__ */ n(v, { variant: "primary", disabled: !0, describedBy: a, children: "Requeue" }) : r === void 0 ? null : /* @__PURE__ */ n(v, { variant: "primary", onClick: () => r(t === "" ? void 0 : t), children: "Requeue" });
}
function R1({ run: e, effects: a, refusals: t, cost: r, onRequeue: o, onClose: i, returnFocusTo: c }) {
  const s = k(), u = `${s}-refusal`, [d, h] = g(""), _ = t.length > 0;
  return /* @__PURE__ */ n(Je, { kind: "sheet", labelledBy: s, onClose: i, returnFocusTo: c, children: /* @__PURE__ */ l("div", { className: ce.sheet, children: [
    /* @__PURE__ */ l("h2", { className: ce.title, id: s, children: [
      "Requeue ",
      e.agent
    ] }),
    /* @__PURE__ */ n("p", { className: ce.stage, children: e.stage }),
    /* @__PURE__ */ n("ol", { className: ce.effects, children: a.map((b, L) => /* @__PURE__ */ l("li", { className: ce.effect, children: [
      /* @__PURE__ */ n("span", { className: ce.numeral, children: String(L + 1).padStart(2, "0") }),
      /* @__PURE__ */ n("span", { className: ce.effectText, children: b })
    ] }, b)) }),
    /* @__PURE__ */ n(
      ni,
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
      /* @__PURE__ */ n("ul", { className: ce.reasons, children: t.map((b, L) => /* @__PURE__ */ n("li", { className: ce.reason, id: L === 0 ? u : void 0, children: b.reason }, b.reason)) })
    ] }),
    /* @__PURE__ */ l("div", { className: ce.actions, children: [
      /* @__PURE__ */ n(LN, { refused: _, reasonId: u, note: d, onRequeue: o }),
      /* @__PURE__ */ n(v, { onClick: i, children: "Cancel" })
    ] })
  ] }) });
}
const xN = "_list_1hvqu_2", AN = "_path_1hvqu_7", EN = "_head_1hvqu_21", qN = "_label_1hvqu_28", IN = "_consequence_1hvqu_35", MN = "_ask_1hvqu_36", Fe = {
  list: xN,
  path: AN,
  head: EN,
  label: qN,
  consequence: IN,
  ask: MN
}, Ma = {
  clarify: "Ask a clarifying question",
  requeue: "Requeue the agent",
  override: "Override and advance"
};
function wn(e) {
  return e === "APPROVER" ? "write" : "meta";
}
function BN({ path: e, primary: a, onChoose: t }) {
  const r = k();
  return e.allowed ? /* @__PURE__ */ n(v, { variant: a ? "primary" : "secondary", size: "sm", onClick: () => t(e.kind), children: Ma[e.kind] }) : /* @__PURE__ */ l(x, { children: [
    /* @__PURE__ */ n(v, { variant: "primary", size: "sm", disabled: !0, describedBy: r, children: Ma[e.kind] }),
    /* @__PURE__ */ n("span", { className: Fe.ask, id: r, children: e.askInstead })
  ] });
}
function PN({ path: e, primary: a, onChoose: t }) {
  if (!e.allowed && !e.askInstead)
    throw new Error(`ResolveBlock: the ${e.kind} path is not yours to take and names nobody to ask — askInstead is required`);
  return /* @__PURE__ */ l("li", { className: Fe.path, "data-allowed": e.allowed, "data-role": wn(e.requiredRole), children: [
    /* @__PURE__ */ l("span", { className: Fe.head, children: [
      /* @__PURE__ */ n("span", { className: Fe.label, children: e.title ?? Ma[e.kind] }),
      /* @__PURE__ */ n(m, { role: wn(e.requiredRole), label: e.requiredRole })
    ] }),
    /* @__PURE__ */ n("span", { className: Fe.consequence, children: e.consequence }),
    /* @__PURE__ */ n(BN, { path: e, primary: a, onChoose: t })
  ] });
}
function T1({ paths: e, onChoose: a }) {
  return /* @__PURE__ */ n("ul", { className: Fe.list, children: e.map((t, r) => /* @__PURE__ */ n(PN, { path: t, primary: r === 0, onChoose: a }, t.kind)) });
}
const DN = "_list_qjv4r_2", ON = "_item_qjv4r_6", HN = "_node_qjv4r_18", FN = "_body_qjv4r_24", jN = "_head_qjv4r_30", WN = "_stage_qjv4r_36", zN = "_version_qjv4r_41", GN = "_sentence_qjv4r_49", KN = "_meta_qjv4r_54", be = {
  list: DN,
  item: ON,
  node: HN,
  body: FN,
  head: jN,
  stage: WN,
  version: zN,
  sentence: GN,
  meta: KN
}, UN = {
  done: "tick",
  hold: "attention",
  pending: "hollow"
};
function VN({ entry: e }) {
  return /* @__PURE__ */ l("span", { className: be.head, children: [
    /* @__PURE__ */ n("span", { className: be.stage, children: e.stage }),
    e.version ? /* @__PURE__ */ n("span", { className: be.version, title: e.version, children: e.version }) : null
  ] });
}
function YN({ entry: e }) {
  if (!e.actor)
    throw new Error(`StageHistory: the "${e.stage}" entry names no actor — every entry names who or what acted`);
  return /* @__PURE__ */ l("li", { className: `${be.item} ward-history-entry`, "data-state": e.state, "data-hold": e.state === "hold" ? "true" : void 0, children: [
    /* @__PURE__ */ n("span", { className: `${be.node} ward-history-node`, children: /* @__PURE__ */ n(Se, { size: 9, kind: UN[e.state], label: e.state }) }),
    /* @__PURE__ */ l("span", { className: `${be.body} ward-history-stage`, children: [
      /* @__PURE__ */ n(VN, { entry: e }),
      /* @__PURE__ */ n("span", { className: be.sentence, children: e.sentence }),
      /* @__PURE__ */ l("span", { className: `${be.meta} ward-history-meta`, children: [
        `${re(e.at)} · ${e.actor}`,
        e.cost === void 0 ? "" : ` · ${Q(e.cost)}`
      ] })
    ] })
  ] });
}
function L1({ entries: e }) {
  return /* @__PURE__ */ n("ol", { className: `${be.list} ward-history`, children: e.map((a, t) => /* @__PURE__ */ n(YN, { entry: a }, a.stage + String(t))) });
}
const JN = "_thread_1kn6s_3", XN = "_turn_1kn6s_8", QN = "_who_1kn6s_27", ZN = "_body_1kn6s_32", ra = {
  thread: JN,
  turn: XN,
  who: QN,
  body: ZN
}, tt = ze(!1);
function x1({ children: e, density: a }) {
  return /* @__PURE__ */ n(tt.Provider, { value: !0, children: /* @__PURE__ */ n("ol", { className: `${ra.thread} ward-chat`, "aria-label": "Conversation", "data-density": a, children: e }) });
}
function A1({ turn: e }) {
  if (!We(tt)) throw new Error("ChatMessage: must be rendered inside a Conversation");
  return /* @__PURE__ */ l("li", { className: `${ra.turn} ward-chatmsg`, "data-side": e.role, "data-turn": e.role, children: [
    /* @__PURE__ */ l("span", { className: `${ra.who} ward-chat-who`, children: [
      e.author,
      " · ",
      re(e.at)
    ] }),
    /* @__PURE__ */ n("p", { className: `${ra.body} ward-chat-body`, children: e.body })
  ] });
}
const ey = "_list_1rt9c_3", ay = "_row_1rt9c_7", ny = "_label_1rt9c_20", ty = "_n_1rt9c_26", ry = "_cause_1rt9c_33", Ue = {
  list: ey,
  row: ay,
  label: ny,
  n: ty,
  cause: ry
};
function ly(e) {
  if (e.failed && !e.cause) throw new Error(`DeliveryHealth: the failed row "${e.label}" names no cause`);
}
const oy = { failed: { kind: "red", label: "failed" }, ok: { kind: "green", label: "ok" } };
function iy({ row: e, formatNumber: a }) {
  return ly(e), /* @__PURE__ */ l("li", { className: `${Ue.row} ward-healthrow`, "data-failed": e.failed ? "true" : null, children: [
    /* @__PURE__ */ n(Se, { size: 8, ...oy[e.failed ? "failed" : "ok"] }),
    /* @__PURE__ */ n("span", { className: Ue.label, children: e.label }),
    /* @__PURE__ */ n("span", { className: `${Ue.n} ward-stat-value`, children: a(e.n) }),
    /* @__PURE__ */ n(cy, { cause: e.cause })
  ] });
}
function cy({ cause: e }) {
  return e ? /* @__PURE__ */ n("span", { className: `${Ue.cause} ward-healthrow-cause`, children: e }) : null;
}
function E1({ rows: e, formatNumber: a = ae }) {
  return /* @__PURE__ */ n("ul", { className: `${Ue.list} ward-checklist`, children: e.map((t) => /* @__PURE__ */ n(iy, { row: t, formatNumber: a }, t.label)) });
}
const sy = "_root_1jxwp_2", dy = {
  root: sy
};
function q1({ items: e, note: a, actionLabel: t = "Review & create", onAction: r, density: o }) {
  return /* @__PURE__ */ l("div", { className: dy.root, "data-density": o, children: [
    /* @__PURE__ */ n(Na, { items: e, note: a, density: o }),
    /* @__PURE__ */ n(v, { variant: o === "rail" ? "secondary" : "primary", onClick: r, children: t })
  ] });
}
const uy = "_row_dhbre_3", hy = "_key_dhbre_13", my = "_stack_dhbre_24", wy = "_value_dhbre_32", _y = "_evidence_dhbre_39", vy = "_mark_dhbre_47", Oe = {
  row: uy,
  key: hy,
  stack: my,
  value: wy,
  evidence: _y,
  mark: vy
};
function fy({ state: e }) {
  return e === "confirm" ? /* @__PURE__ */ n(m, { role: "warn", label: "CONFIRM" }) : /* @__PURE__ */ n(Ha, { state: e === "resolved" ? "met" : "unmet", label: e === "resolved" ? "Resolved" : "Unresolved" });
}
function I1({ field: e }) {
  return /* @__PURE__ */ l("li", { className: `${Oe.row} ward-resfield`, "data-state": e.state, children: [
    /* @__PURE__ */ n("span", { className: `${Oe.key} ward-resfield-key`, children: e.key }),
    /* @__PURE__ */ l("span", { className: `${Oe.stack} ward-resfield-stack`, children: [
      /* @__PURE__ */ n("span", { className: `${Oe.value} ward-resfield-value`, children: e.value }),
      e.evidence && /* @__PURE__ */ n("span", { className: `${Oe.evidence} ward-resfield-evidence`, title: e.evidence, children: e.evidence })
    ] }),
    /* @__PURE__ */ n("span", { className: `${Oe.mark} ward-resfield-mark`, children: /* @__PURE__ */ n(fy, { state: e.state }) })
  ] });
}
const by = "_cell_1monp_2", py = {
  cell: by
}, gy = [
  { key: "rejectedBy", header: "Rejected by" },
  { key: "reEntersAt", header: "Re-enters at" },
  { key: "skips", header: "Skips" },
  { key: "typedInput", header: "Typed input", mono: !0 }
];
function Ny(e) {
  return e.noRerun ? e.why ? `No rerun — ${e.why}` : "No rerun" : e.reEntersAt ?? "—";
}
function yy(e, a) {
  const t = e.find((r) => r.noRerun && !r.why);
  if (a && t) throw new Error(`RoutingTable: the "${t.rejectedBy}" row never reruns and says nothing about why`);
}
function ky(e, a) {
  return {
    rejectedBy: e.rejectedBy,
    reEntersAt: Ny(e),
    skips: e.skips ?? "—",
    typedInput: e.typedInput
  }[a] ?? "—";
}
function $y(e) {
  return e.map((a, t) => ({ ...a, id: a.id ?? String(t) }));
}
function M1({ rows: e, empty: a, requireNoRerunReason: t = !0 }) {
  yy(e, t);
  const r = $y(e);
  return /* @__PURE__ */ n(
    vi,
    {
      label: "Rejection routing",
      columns: gy,
      rows: r,
      rowId: (o) => o.id,
      renderCell: (o, i) => /* @__PURE__ */ n("span", { className: py.cell, "data-norerun": o.noRerun ? !0 : void 0, children: ky(o, i) }),
      empty: a ?? /* @__PURE__ */ n(zc, { sentence: "No rejection route is configured for this stream yet." })
    }
  );
}
const Cy = "_row_ute8v_2", Sy = "_title_ute8v_11", Ry = "_turns_ute8v_20", Ty = "_waiting_ute8v_21", Ly = "_resolved_ute8v_22", xy = "_activity_ute8v_23", Ay = "_cost_ute8v_29", Ey = "_link_ute8v_30", qy = "_tableRow_ute8v_47", Iy = "_tableTitle_ute8v_59", My = "_tableResolved_ute8v_64", By = "_tableLink_ute8v_68", Py = "_tableMeta_ute8v_83", Dy = "_tableCost_ute8v_90", Oy = "_tableActivity_ute8v_91", Hy = "_tableState_ute8v_101", Fy = "_tableRecord_ute8v_112", B = {
  row: Cy,
  title: Sy,
  turns: Ry,
  waiting: Ty,
  resolved: Ly,
  activity: xy,
  cost: Ay,
  link: Ey,
  tableRow: qy,
  tableTitle: Iy,
  tableResolved: My,
  tableLink: By,
  tableMeta: Py,
  tableCost: Dy,
  tableActivity: Oy,
  tableState: Hy,
  tableRecord: Fy
}, rt = {
  open: { role: "pending", label: "OPEN" },
  draft: { role: "running", label: "DRAFT" },
  created: { role: "done", label: "CREATED" },
  duplicate: { role: "meta", label: "DUPLICATE" },
  expired: { role: "meta", label: "EXPIRED" }
};
function jy(e) {
  if (e === "") return "—";
  const a = Math.floor((Date.now() - new Date(e).getTime()) / 6e4);
  if (a < 1) return "just now";
  if (a < 60) return `${a}m ago`;
  const t = Math.floor(a / 60);
  return t < 24 ? `${t}h ago` : `${Math.floor(t / 24)}d ago`;
}
function Wy(e) {
  return `${e.turns} ${e.turns === 1 ? "turn" : "turns"}${e.turnsNote === void 0 ? "" : ` · ${e.turnsNote}`}`;
}
function zy(e) {
  const a = e.join(", ");
  return a === "" ? "nothing resolved" : a;
}
const Gy = { duplicate: "CLOSED · DUPLICATE" };
function Ky({ value: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("span", { className: B.tableMeta, children: `waiting on ${e}` });
}
function Uy({ value: e }) {
  return /* @__PURE__ */ n("td", { className: B.tableCost, children: e === void 0 ? null : Q(e) });
}
function Vy({ link: e }) {
  return e === void 0 ? null : /* @__PURE__ */ n("a", { className: B.tableRecord, href: e.href, children: `→ ${e.key}` });
}
function Yy({ session: e, href: a }) {
  const t = rt[e.state];
  return /* @__PURE__ */ l("tr", { className: B.tableRow, "data-state": e.state, children: [
    /* @__PURE__ */ l("td", { className: B.tableTitle, children: [
      /* @__PURE__ */ n("a", { className: B.tableLink, href: a, children: e.title }),
      /* @__PURE__ */ n("span", { className: B.tableMeta, children: Wy(e) })
    ] }),
    /* @__PURE__ */ l("td", { className: B.tableResolved, children: [
      zy(e.resolved),
      /* @__PURE__ */ n(Ky, { value: e.waitingOn })
    ] }),
    /* @__PURE__ */ n(Uy, { value: e.cost }),
    /* @__PURE__ */ n("td", { className: B.tableActivity, children: jy(e.lastActivity) }),
    /* @__PURE__ */ n("td", { className: B.tableState, children: /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(m, { role: t.role, label: Gy[e.state] ?? t.label }),
      /* @__PURE__ */ n(Vy, { link: e.link })
    ] }) })
  ] });
}
function Jy({ session: e }) {
  const a = rt[e.state];
  return /* @__PURE__ */ l("div", { className: B.row, "data-state": e.state, tabIndex: 0, role: "region", "aria-label": e.title, children: [
    /* @__PURE__ */ n("span", { className: B.title, children: e.title }),
    /* @__PURE__ */ n("span", { className: B.turns, children: `${e.turns} turns` }),
    /* @__PURE__ */ n("span", { className: B.waiting, children: e.waitingOn ?? "" }),
    /* @__PURE__ */ n("span", { className: B.resolved, children: e.resolved.join(" · ") }),
    /* @__PURE__ */ n("span", { className: B.cost, "data-testid": "session-cost", children: e.cost === void 0 ? "" : Q(e.cost) }),
    /* @__PURE__ */ n("span", { className: B.activity, children: re(e.lastActivity) }),
    e.link && /* @__PURE__ */ n("a", { className: B.link, href: e.link.href, children: e.link.key }),
    /* @__PURE__ */ n(m, { role: a.role, label: a.label })
  ] });
}
function B1(e) {
  return e.presentation === "table" ? /* @__PURE__ */ n(Yy, { session: e.session, href: e.href }) : /* @__PURE__ */ n(Jy, { session: e.session });
}
const Xy = "_block_1yy2v_3", Qy = "_list_1yy2v_9", Zy = "_line_1yy2v_14", Ba = {
  block: Xy,
  list: Qy,
  line: Zy
}, ek = { warn: "warning", ok: "ok" };
function ak({ kind: e }) {
  const a = ek[e];
  return a === void 0 ? null : /* @__PURE__ */ n("span", { className: "ward-visually-hidden", children: a });
}
function nk({ line: e }) {
  const a = e.kind === "tool" ? "field" : e.kind;
  return /* @__PURE__ */ l("li", { className: `${Ba.line} ward-typed-line ward-typed-line--${a}`, "data-kind": a, children: [
    /* @__PURE__ */ n(ak, { kind: a }),
    /* @__PURE__ */ n("span", { "data-typed-text": !0, children: e.text })
  ] });
}
function P1({ lines: e, label: a = "Typed input the agent receives" }) {
  return /* @__PURE__ */ n("div", { className: `${Ba.block} ward-typed`, children: /* @__PURE__ */ n("ol", { className: Ba.list, "aria-label": a, children: e.map((t, r) => /* @__PURE__ */ n(nk, { line: t }, `${r}-${t.text}`)) }) });
}
const tk = "_band_tt7hp_1", rk = "_head_tt7hp_8", lk = "_cell_tt7hp_19", ok = "_index_tt7hp_35", ik = "_title_tt7hp_42", ck = "_note_tt7hp_48", sk = "_cellTitle_tt7hp_53", dk = "_cellBody_tt7hp_58", uk = "_tag_tt7hp_64", we = {
  band: tk,
  head: rk,
  cell: lk,
  index: ok,
  title: ik,
  note: ck,
  cellTitle: sk,
  cellBody: dk,
  tag: uk
}, _n = 4;
function D1({ index: e, title: a, note: t, cells: r }) {
  if (r.length !== _n)
    throw new Error(`Band: ${r.length} cells — the band is a fixed ${_n}-cell grid`);
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
  y1 as ActivityConsole,
  th as AgentCard,
  $k as AppShell,
  c1 as AppearanceStrip,
  D1 as Band,
  Cs as BoardColumn,
  jk as BoardFootnote,
  Wk as BoardHeader,
  Mk as BoardScroller,
  v as Btn,
  gk as CHIP_ROLES,
  Un as CREDENTIAL_COLUMNS,
  Tk as Callout,
  s1 as CapabilityRow,
  A1 as ChatMessage,
  pn as Checkbox,
  m as Chip,
  k1 as ClarificationRow,
  Zk as ClauseRuleRow,
  Qk as ClauseRules,
  xn as ColourLadder,
  d1 as ComponentRow,
  $1 as Composer,
  Gk as ConfigRow,
  zk as ConfigRowHead,
  Fa as ConnectionMark,
  x1 as Conversation,
  ni as CostMeter,
  h1 as CredentialRow,
  u1 as CredentialRowHead,
  C1 as CriteriaList,
  Dr as Crumb,
  E1 as DeliveryHealth,
  Pk as DeniedState,
  e1 as DryRunRail,
  zc as EmptyState,
  m1 as EnvCard,
  A as Field,
  Bk as FilteredEmpty,
  qk as FormStack,
  Na as GateChecklist,
  S1 as GateLadder,
  vi as Grid,
  n1 as HandoffRuleRow,
  a1 as HandoffRules,
  Kk as ItemDrawer,
  yt as LIVE_EVENT_TYPES,
  Cu as LegacyBoardColumn,
  Vk as LegacyBoardHeader,
  Yk as LegacyConfigRow,
  Xk as LegacyItemDrawer,
  bu as LegacyOverCapNote,
  Jk as LegacyPreviewRail,
  Rn as LegacyWorkCard,
  ge as LiveIndicator,
  Dk as LoadFailed,
  Fk as Loading,
  Xn as MCP_SERVER_COLUMNS,
  Ha as Mark,
  _1 as MarkUpload,
  Se as Marker,
  f1 as McpServerRow,
  v1 as McpServerRowHead,
  t1 as NewStreamModal,
  Uc as OverCapNote,
  Je as Overlay,
  qh as PARTIAL_STEP_REASON,
  Qn as POLICY_CHIP_WIDTH,
  xk as PageFrame,
  Rk as PageHeader,
  b1 as PolicyRow,
  Uk as PreviewRail,
  Sa as ROLE_MATRIX_COLUMNS,
  jn as RULE_ACTIONS,
  yn as Radio,
  q1 as ReadyChecklist,
  Ek as RecordSection,
  R1 as RequeueSheet,
  T1 as ResolveBlock,
  I1 as ResolvedFieldRow,
  p1 as RoleMatrixRow,
  M1 as RoutingTable,
  r1 as RuleRow,
  g1 as RunbookSteps,
  gt as STREAM_STEPS,
  Ik as SectionBand,
  qi as SectionHeader,
  gn as SegmentedControl,
  B1 as SessionRow,
  Sk as Sidebar,
  l1 as StageColumn,
  L1 as StageHistory,
  Bw as StageListEditor,
  Ok as StaleStrip,
  ba as StatStrip,
  o1 as StreamRow,
  Ak as SubjectRail,
  qe as Switch,
  Ck as Tabs,
  i1 as ToolRow,
  Lk as TopBar,
  sc as Tree,
  $n as TreeRow,
  P1 as TypedInputBlock,
  N1 as ValidationList,
  _k as VisibilityProvider,
  vk as Visible,
  pk as WARD_VERSION,
  ga as WorkCard,
  Hk as WriteUnavailableStrip,
  jy as agoSince,
  ht as clock,
  Zw as colourStatus,
  ae as count,
  te as duration,
  Pa as elapsed,
  bk as eventSourceTransport,
  wa as isStreamStep,
  _a as isValidatedStreamStep,
  Ih as ladderValidation,
  Jb as mcpConnectionChip,
  Vb as mcpToolName,
  Q as money,
  ue as ms,
  Cn as ordered,
  vn as ratio,
  Hf as restartLabel,
  re as stamp,
  bn as stream,
  yk as streamChip,
  fa as streamChipProps,
  Ce as streamColour,
  $t as streamHex,
  Nk as streamVars,
  aa as useBorderFlash,
  ft as useFocusTrap,
  kk as useLiveFeed,
  fk as useReturnFocus,
  ma as useRovingTabindex,
  Da as useTicker,
  mt as useVisible,
  j as v,
  w1 as validateMark,
  va as validatedStep,
  Nt as validatedStreamSteps
};
